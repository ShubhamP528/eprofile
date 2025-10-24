import Razorpay from 'razorpay'

// Initialize Razorpay instance
export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// Razorpay configuration for client-side
export const razorpayConfig = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
}

// Plan configurations
export const subscriptionPlans = {
    PRO: {
        amount: 29900, // ₹299 in paise (Razorpay uses paise)
        currency: 'INR',
        name: 'ProCard Pro Plan',
        description: 'Monthly subscription to ProCard Pro features',
        duration: 30, // days
    }
}

// Helper function to ensure receipt is within 40 character limit
function validateReceipt(receipt: string): string {
    if (receipt.length <= 40) {
        return receipt
    }
    // If too long, truncate and add hash for uniqueness
    const hash = receipt.slice(-8) // Last 8 chars as simple hash
    return receipt.slice(0, 31) + '_' + hash // 31 + 1 + 8 = 40 chars
}

// Create Razorpay order
export async function createRazorpayOrder(amount: number, currency = 'INR', receipt?: string) {
    try {
        // Generate short receipt if not provided (max 40 chars)
        const defaultReceipt = `ord_${Date.now().toString().slice(-10)}`
        const finalReceipt = validateReceipt(receipt || defaultReceipt)

        const order = await razorpay.orders.create({
            amount: amount, // amount in paise
            currency,
            receipt: finalReceipt,
            payment_capture: true, // auto capture
        })

        return {
            success: true,
            order,
        }
    } catch (error) {
        console.error('Razorpay order creation failed:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create order',
        }
    }
}

// Verify Razorpay payment signature
export function verifyRazorpaySignature(
    orderId: string,
    paymentId: string,
    signature: string
): boolean {
    try {
        const crypto = require('crypto')
        const body = orderId + '|' + paymentId
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest('hex')

        return expectedSignature === signature
    } catch (error) {
        console.error('Signature verification failed:', error)
        return false
    }
}

// Get payment details
export async function getPaymentDetails(paymentId: string) {
    try {
        const payment = await razorpay.payments.fetch(paymentId)
        return {
            success: true,
            payment,
        }
    } catch (error) {
        console.error('Failed to fetch payment details:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch payment',
        }
    }
}