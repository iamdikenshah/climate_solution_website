# Google Forms Setup Guide

This guide will help you connect your website's contact form to Google Forms so that all submissions are automatically saved to a Google Sheet.

## Step 1: Create a Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Click **"+ Blank"** to create a new form
3. Name your form (e.g., "Climate Solutions Contact Form")

## Step 2: Add Form Questions

Add the following questions in this exact order:

1. **Short answer** - Label: "Full Name"
2. **Short answer** - Label: "Email Address"
3. **Short answer** - Label: "Phone Number"
4. **Short answer** - Label: "Company Name"
5. **Multiple choice** - Label: "Subject"
   - Options:
     - General Inquiry
     - Service Information
     - Project Consultation
     - Partnership Opportunity
     - Technical Support
     - Other
6. **Paragraph** - Label: "Message"

Mark questions 1, 2, 5, and 6 as **Required** (toggle the "Required" switch)

## Step 3: Get the Form Action URL

1. Click **Send** button (top right)
2. Click the **< >** (Link icon)
3. Copy the link - it looks like: `https://docs.google.com/forms/d/e/FORM_ID/viewform`
4. Modify the URL by replacing `/viewform` with `/formResponse`
   - Final URL: `https://docs.google.com/forms/d/e/FORM_ID/formResponse`

## Step 4: Get Entry IDs for Each Field

1. Open your form in edit mode
2. Click the three dots (⋮) on the first question
3. Select **"Get pre-filled link"**
4. Fill in dummy data for ALL fields
5. Click **"Get link"** at the bottom
6. Copy the generated URL

The URL will look like:
```
https://docs.google.com/forms/d/e/FORM_ID/viewform?usp=pp_url&entry.123456789=John&entry.987654321=john@email.com...
```

Extract the entry IDs (the numbers after `entry.`):
- `entry.123456789` = Full Name
- `entry.987654321` = Email Address
- `entry.111111111` = Phone Number
- `entry.222222222` = Company Name
- `entry.333333333` = Subject
- `entry.444444444` = Message

## Step 5: Update Your Website Code

Open `pages/contact.html` and find the form. Replace the placeholder entry IDs with your actual ones:

**Replace:**
```html
<input type="text" id="name" name="entry.NAME_ENTRY_ID" ...>
```

**With:**
```html
<input type="text" id="name" name="entry.123456789" ...>
```

Do this for all 6 fields:
- `entry.NAME_ENTRY_ID` → `entry.123456789` (your Full Name entry ID)
- `entry.EMAIL_ENTRY_ID` → `entry.987654321` (your Email entry ID)
- `entry.PHONE_ENTRY_ID` → `entry.111111111` (your Phone entry ID)
- `entry.COMPANY_ENTRY_ID` → `entry.222222222` (your Company entry ID)
- `entry.SUBJECT_ENTRY_ID` → `entry.333333333` (your Subject entry ID)
- `entry.MESSAGE_ENTRY_ID` → `entry.444444444` (your Message entry ID)

Also update the form action:
```html
<form id="contact-form" action="https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse" method="POST" target="hidden_iframe">
```

## Step 6: Link to Google Sheets (Optional)

1. Open your Google Form
2. Click **Responses** tab
3. Click the Google Sheets icon (Create Spreadsheet)
4. Choose "Create a new spreadsheet"
5. Click **Create**

Now all form submissions will be automatically saved to Google Sheets!

## Testing

1. Open your contact page
2. Fill out the form with test data
3. Click "Send Message"
4. Check your Google Form responses or linked Google Sheet
5. You should see the test submission

## Troubleshooting

**Form doesn't submit:**
- Make sure all entry IDs match exactly (including the dots)
- Check the form action URL is correct
- Verify the form method is "POST"

**No data appears in Google Sheets:**
- Check if the Google Sheet is properly linked to the form
- Verify the field names in the form match the question order

**Success message doesn't show:**
- The hidden iframe should trigger after submission
- Check browser console for JavaScript errors

## Common Issues

### CORS Errors
Google Forms may block submissions from certain domains. If this happens:
1. Open the form settings
2. Under "Responses", enable "Collect email addresses" (optional)
3. Make sure your form is set to accept responses

### Form Validation
The JavaScript validation runs before submission. If fields are invalid, the form won't submit to Google Forms until all required fields are properly filled.

---

## Quick Reference

Current form structure:
1. Full Name (required)
2. Email Address (required)
3. Phone Number (optional)
4. Company Name (optional)
5. Subject (required)
6. Message (required, min 10 characters)

All submissions are validated client-side before being sent to Google Forms.
