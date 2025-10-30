# Business Information Update Guide

## 🚀 Quick Setup for Razorpay Live Activation

Your eProfile website is fully compliant with Razorpay requirements! You just need to replace placeholder information with your actual business details.

## 📋 What You Need

Before running the update script, gather this information:

### Required Information:

- **Complete Business Address** (with PIN code)
- **10-digit Phone Number** (without country code)
- **PAN Number**
- **Business Type** (Individual/Partnership/Private Limited/LLP)
- **City** (for legal jurisdiction)

### Optional (if applicable):

- **GST Number** (if GST registered)
- **Company Registration Number** (for companies/LLP)
- **CIN Number** (for Private Limited companies)

## 🛠️ Automated Update Process

### Step 1: Run the Update Script

```bash
node scripts/update-business-info.js
```

### Step 2: Follow the Prompts

The script will ask for:

1. Business address
2. Phone number
3. GST registration status
4. PAN number
5. Business type and registration details
6. City for legal jurisdiction

### Step 3: Review Updated Pages

After the script completes, review these pages:

- `/privacy` - Privacy Policy
- `/terms` - Terms of Service
- `/refund` - Refund Policy
- `/business-info` - Business Information
- `/contact` - Contact Information

## 📝 Manual Updates (if needed)

If you prefer manual updates, replace these placeholders:

### In All Legal Pages:

- `[Your Business Address]` → Your complete address
- `[Complete Business Address with PIN Code]` → Address with PIN
- `[Your 10-digit Phone Number]` → Your phone number
- `[Your Contact Number]` → Your contact number
- `[Your GST Number if applicable]` → Your GST number or "Not applicable"
- `[Your PAN Number]` → Your PAN number
- `[Your business registration details]` → Registration information
- `[Your City]` → Your city name

## ✅ Verification Checklist

After updating, verify:

- [ ] All placeholder text is replaced
- [ ] Phone numbers are formatted correctly (+91-XXXXXXXXXX)
- [ ] Email addresses are working
- [ ] Business address is complete with PIN code
- [ ] Legal jurisdiction city is correct
- [ ] GST number is accurate (if applicable)
- [ ] All pages load correctly

## 🎯 Next Steps After Update

1. **Test Your Website**

   - Check all legal pages load correctly
   - Verify contact forms work
   - Test payment flow

2. **Prepare Documents**

   - Gather business registration documents
   - Prepare bank account proof
   - Collect ID and address proofs

3. **Submit to Razorpay**
   - Login to Razorpay Dashboard
   - Go to Settings → Activate Live Mode
   - Upload documents and submit

## 📞 Support

If you need help:

- **Technical Issues:** Check `RAZORPAY_LIVE_REQUIREMENTS.md`
- **Razorpay Support:** support@razorpay.com
- **Script Issues:** Review the script output for error messages

## 🎉 You're Almost There!

Your website is fully compliant with Razorpay requirements. After updating the business information, you'll be ready to submit for live payment gateway approval!

**Estimated Timeline:**

- Information Update: 10 minutes
- Document Preparation: 1-2 hours
- Razorpay Review: 2-7 business days
