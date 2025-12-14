# 🌟 Roozgar Job Portal

Roozgar is a modern, responsive job portal built to connect job seekers with recruiters seamlessly. It leverages a modern tech stack for a smooth user experience, authentication, and real-time data handling.

---

## 🚀 Features

* **User Authentication**: Secure login and registration using **Clerk Authentication**.
* **Job Listings**: Browse, search, and filter jobs posted by recruiters.
* **Company Profiles**: Recruiters can showcase company information.
* **Database & Storage**: All data is stored in **Supabase**, including job listings, user profiles, and uploaded assets.
* **Responsive UI**: Beautiful and consistent design using **Shadcn UI** components.
* **Deployment**: Fully hosted on **Vercel** for fast, global access.

---

## 🛠 Tech Stack

| Layer              | Technology    |
| ------------------ | ------------- |
| Frontend           | **React.js**  |
| UI                 | **Shadcn UI** |
| Authentication     | **Clerk**     |
| Database & Storage | **Supabase**  |
| Hosting            | **Vercel**    |

---

## 🎨 UI & UX

* Clean, minimal design for easy navigation.
* Fully responsive layout for mobile and desktop.
* Modern components with consistent styling powered by Shadcn UI.

---

## 💻 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js >= 18.x
* npm or yarn
* Supabase account (for database & storage)
* Clerk account (for authentication)

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/roozgar-job-portal.git
cd roozgar-job-portal
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Configure environment variables**
   Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
CLERK_FRONTEND_API=your_clerk_frontend_api
```

4. **Run locally**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app in action.

---

## 📦 Deployment

The app is ready for deployment on **Vercel**:

1. Connect your GitHub repository to Vercel.
2. Add environment variables in Vercel dashboard (same as `.env`).
3. Deploy, and your job portal will be live globally.

---

## 📝 Folder Structure

```
/src
  /components   # Reusable UI components
  /pages        # Next.js pages
  /hooks        # Custom React hooks
  /api          # API functions (Supabase queries)
  /styles       # Global and Shadcn UI styles
```

---

## 🔒 Security

* Authentication handled by **Clerk** (secure, GDPR-compliant).
* Database policies in **Supabase** ensure role-based access to jobs and user data.

---

## 👨‍💻 Future Improvements

* Add job application tracking for users.
* Candidate can apply to jobs and manage their job applications
* Recruiter can see application and manage their companies 
* Enable recruiters to manage multiple job postings.
* Advanced search and filter options.

---

## 📌 Conclusion

Roozgar Job Portal is a modern, secure, and scalable job platform designed to connect talent with opportunity efficiently. It’s built with a focus on clean design, reliable authentication, and easy deployment.
