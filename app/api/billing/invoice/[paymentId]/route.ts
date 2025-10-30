import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/api-utils'
import { createErrorResponse, handleApiError } from '@/lib/api-utils'
import { prisma } from '@/lib/prisma'
import puppeteer from 'puppeteer'

interface InvoiceData {
  paymentId: string
  orderId: string
  amount: number
  currency: string
  status: string
  plan: string
  paymentMethod?: string | null
  cardLast4?: string | null
  createdAt: Date
  user: {
    name?: string | null
    email: string
  }
}

// GET /api/billing/invoice/[paymentId] - Generate and download invoice PDF
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ paymentId: string }> }
) {
  try {
    const authResult = await requireAuth()
    if (!authResult.success) {
      return authResult.error
    }

    const { paymentId } = await params

    // Fetch payment record with user details
    const payment = await prisma.paymentHistory.findFirst({
      where: {
        paymentId,
        userId: authResult.userId, // Ensure user can only access their own invoices
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    if (!payment) {
      return createErrorResponse(
        'Payment record not found',
        'PAYMENT_NOT_FOUND',
        404
      )
    }

    // Only generate invoices for successful payments
    if (payment.status !== 'captured') {
      return createErrorResponse(
        'Invoice can only be generated for successful payments',
        'INVALID_PAYMENT_STATUS',
        400
      )
    }

    // Generate PDF invoice
    const pdfBuffer = await generateInvoicePDF(payment as InvoiceData)

    // Return PDF as response
    return new Response(pdfBuffer as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice-${paymentId}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Invoice generation error:', error)
    return handleApiError(error)
  }
}

async function generateInvoicePDF(payment: InvoiceData): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    const page = await browser.newPage()

    const htmlContent = generateInvoiceHTML(payment)

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
    })

    return Buffer.from(pdfBuffer)
  } finally {
    await browser.close()
  }
}

function generateInvoiceHTML(payment: InvoiceData): string {
  const amountInRupees = (payment.amount / 100).toFixed(2)
  const invoiceDate = payment.createdAt.toLocaleDateString('en-IN')
  const planName = payment.plan === 'PRO' ? 'Pro Plan' : 'Standard Plan'

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Invoice - ${payment.paymentId}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 20px;
          color: #333;
          line-height: 1.6;
        }
        .invoice-container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 3px solid #2563eb;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #2563eb;
        }
        .invoice-title {
          font-size: 24px;
          color: #374151;
        }
        .invoice-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }
        .detail-section h3 {
          color: #374151;
          margin-bottom: 10px;
          font-size: 16px;
        }
        .detail-section p {
          margin: 5px 0;
          color: #6b7280;
        }
        .payment-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }
        .payment-table th,
        .payment-table td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        .payment-table th {
          background-color: #f9fafb;
          font-weight: 600;
          color: #374151;
        }
        .total-section {
          text-align: right;
          margin-top: 20px;
        }
        .total-amount {
          font-size: 24px;
          font-weight: bold;
          color: #059669;
          margin-top: 10px;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          background-color: #d1fae5;
          color: #065f46;
        }
        .footer {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }
        .company-info {
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <div class="logo">eProfile</div>
          <div class="invoice-title">INVOICE</div>
        </div>

        <div class="invoice-details">
          <div class="detail-section">
            <h3>Bill To:</h3>
            <p><strong>${payment.user.name || 'Customer'}</strong></p>
            <p>${payment.user.email}</p>
          </div>
          <div class="detail-section">
            <h3>Invoice Details:</h3>
            <p><strong>Invoice #:</strong> ${payment.paymentId}</p>
            <p><strong>Order ID:</strong> ${payment.orderId}</p>
            <p><strong>Date:</strong> ${invoiceDate}</p>
            <p><strong>Status:</strong> <span class="status-badge">Paid</span></p>
          </div>
        </div>

        <table class="payment-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Plan</th>
              <th>Payment Method</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>eProfile ${planName} Subscription</td>
              <td>${planName}</td>
              <td>${formatPaymentMethod(payment.paymentMethod, payment.cardLast4)}</td>
              <td>₹${amountInRupees}</td>
            </tr>
          </tbody>
        </table>

        <div class="total-section">
          <p><strong>Subtotal: ₹${amountInRupees}</strong></p>
          <p>Tax: ₹0.00</p>
          <div class="total-amount">Total: ₹${amountInRupees}</div>
        </div>

        <div class="footer">
          <div class="company-info">
            <p><strong>eProfile</strong></p>
            <p>Digital Business Card Platform</p>
            <p>Thank you for your business!</p>
          </div>
          <p>This is a computer-generated invoice. No signature required.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function formatPaymentMethod(method?: string | null, cardLast4?: string | null): string {
  if (!method) return 'Online Payment'

  if (method === 'card' && cardLast4) {
    return `Card ending in ${cardLast4}`
  }

  switch (method.toLowerCase()) {
    case 'upi':
      return 'UPI'
    case 'netbanking':
      return 'Net Banking'
    case 'wallet':
      return 'Wallet'
    default:
      return method.charAt(0).toUpperCase() + method.slice(1)
  }
}