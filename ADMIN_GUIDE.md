# EduPreneurX Admin Dashboard Guide

## 🎉 Setup Complete!

Your EduPreneurX website now has a fully functional admin dashboard with Convex database integration!

## 🌐 Access Your Application

### Main Website
- **Local:** http://localhost:3000
- **Network:** http://192.168.100.20:3000

### Admin Dashboard
- **URL:** http://localhost:3000/admin
- **Default PIN:** 1234

## 🔐 Admin Dashboard Access

### Change Your Admin PIN

1. Open `.env.local` file
2. Change the `ADMIN_PIN` value:
   ```env
   ADMIN_PIN=your-new-pin-here
   ```
3. Restart the development server

### Login to Dashboard

1. Go to http://localhost:3000/admin
2. Enter your PIN (default: 1234)
3. Click "Access Dashboard"

## 📊 Dashboard Features

### Statistics Overview
- **Total Submissions** - See all submissions at a glance
- **Applications** - Track program applications
- **Reservations** - Monitor seat reservations
- **Enquiries** - View general enquiries

### Filtering & Search
- **Filter by Type:** Applications, Reservations, Enquiries, Interest, Payment Inquiries
- **Search:** Find submissions by name, email, or reference number

### Submission Management

#### View Submission Details
- Click "View" button on any submission
- See complete submission information
- View all form fields and messages

#### Update Status
In the detail modal, update submission status to:
- **New** - Just received
- **Contacted** - You've reached out to them
- **In Progress** - Processing their request
- **Completed** - Finished handling
- **Rejected** - Not proceeding

#### Delete Submissions
- Click "Delete Submission" in the detail modal
- Confirm deletion
- Submission is permanently removed

## 📝 How Submissions Work

### User Flow
1. User fills out form on website (Apply, Reserve, etc.)
2. Form data is submitted to Convex database
3. User receives reference number (e.g., EduPX05102025XXXX)
4. Submission appears instantly in admin dashboard

### Submission Types
- **application** - Program applications
- **reservation** - Seat reservations
- **enquiry** - General questions
- **interest** - Interest expressions
- **payment-inquiry** - Payment questions

## 🗄️ Database (Convex)

### What is Convex?
Convex is a real-time database that replaces Google Sheets for storing submissions.

### Benefits
- ✅ Real-time updates (no refresh needed)
- ✅ Fast and scalable
- ✅ Built-in security
- ✅ TypeScript type safety
- ✅ Free tier available

### Accessing Your Data
- **Convex Dashboard:** https://dashboard.convex.dev
- **Your Deployment:** dev:cautious-emu-310
- **Team:** shakil1004

## 🚀 Development Workflow

### Start Development Servers

You need to run TWO servers:

#### 1. Start Convex (in one terminal)
```bash
cd C:\Users\pc\Desktop\edupreneur\edupreneur-nextjs
npx convex dev
```

#### 2. Start Next.js (in another terminal)
```bash
cd C:\Users\pc\Desktop\edupreneur\edupreneur-nextjs
npm run dev
```

**Both servers must be running for the app to work!**

### Making Changes

#### Update Schema (Database Structure)
1. Edit `convex/schema.ts`
2. Convex will auto-deploy changes
3. Check terminal for confirmation

#### Add New Functions
1. Edit `convex/submissions.ts`
2. Add new queries or mutations
3. Import in components: `api.submissions.yourFunction`

#### Update Dashboard UI
1. Edit `app/admin/page.tsx` for logic
2. Edit `app/admin/admin.module.css` for styling

## 📱 Testing the Complete Flow

### Test Submission
1. Go to http://localhost:3000
2. Click "Apply Now" on any program
3. Fill out the form
4. Submit
5. Note your reference number

### Verify in Dashboard
1. Go to http://localhost:3000/admin
2. Enter PIN: 1234
3. You should see your submission!
4. Click "View" to see details
5. Try changing the status
6. Try the search and filters

## 🔒 Security Notes

### Production Deployment
Before deploying to production:

1. **Change the PIN**
   - Use a strong 6-8 digit PIN
   - Never commit PIN to Git

2. **Implement Server-Side Auth**
   - Current PIN check is client-side only
   - For production, add API route to verify PIN server-side

3. **Add Rate Limiting**
   - Prevent brute force attacks on PIN
   - Implement in API routes

4. **Use Environment Variables**
   - Never hardcode sensitive values
   - Use `.env.local` (not committed to Git)

## 🐛 Troubleshooting

### "Convex is not defined" Error
- Make sure Convex dev server is running: `npx convex dev`
- Check `.env.local` has `NEXT_PUBLIC_CONVEX_URL`

### Forms Not Submitting
- Open browser console (F12)
- Check for error messages
- Verify Convex server is running

### Dashboard Shows No Data
- Make sure you've submitted at least one form
- Check Convex dashboard: https://dashboard.convex.dev
- Verify database has data in "submissions" table

### PIN Not Working
- Check `.env.local` file for `ADMIN_PIN` value
- Default is 1234
- Clear browser cache and try again

## 📁 Project Structure

```
edupreneur-nextjs/
├── app/
│   ├── admin/
│   │   ├── page.tsx          # Admin dashboard
│   │   └── admin.module.css  # Dashboard styles
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── ConvexClientProvider.tsx
├── components/
│   ├── FormModal.tsx          # Form with Convex integration
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   └── ProgramCard.tsx
├── convex/
│   ├── schema.ts              # Database schema
│   ├── submissions.ts         # Database functions
│   └── _generated/            # Auto-generated files
├── .env.local                 # Environment variables (not in Git)
└── package.json
```

## 🎯 Next Steps

### Recommended Enhancements

1. **Email Notifications**
   - Send emails when new submissions arrive
   - Use services like SendGrid, Resend, or AWS SES

2. **Export Data**
   - Add CSV/Excel export functionality
   - Generate reports

3. **Advanced Filtering**
   - Filter by date range
   - Filter by program
   - Filter by country

4. **Submission Notes**
   - Add internal notes to submissions
   - Track communication history

5. **Multi-Admin Support**
   - Create admin user accounts
   - Role-based permissions

## 📞 Support

For issues or questions:
- Check Convex docs: https://docs.convex.dev
- Check Next.js docs: https://nextjs.org/docs

## 🎊 Congratulations!

You now have a fully functional admin dashboard with:
- ✅ Real-time database (Convex)
- ✅ PIN-protected access
- ✅ Complete submission management
- ✅ Search and filtering
- ✅ Status tracking
- ✅ Responsive design

Happy managing! 🚀
