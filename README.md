Kendall Manager Pro

A responsive and modern task management dashboard built with React, TypeScript, and Tailwind CSS.
The application supports user authentication, session expiry, protected routes, and responsive layouts optimized for desktop and mobile.

Features
Authentication System

Sign up and log in using local storage

Session tokens with 1-hour expiry

Inline password validation (uppercase, lowercase, number, symbol, and minimum 8 characters)

Real-time password confirmation validation

Protected Routes

Access to Dashboard and Manage Tickets only when logged in

Auto-redirect to login when session expires

Clear error message: “Your session has expired — please log in again.”

UI Components

Responsive Navbar with logo, navigation links, and login CTA

Footer aligned properly on all screen sizes

Adaptive layouts for mobile, tablet, and desktop

Error Handling

Network error fallback component

Toast notifications for success and error messages

Tech Stack
Category	Technologies
Frontend	React, TypeScript, Vite
Styling	Tailwind CSS
Notifications	react-hot-toast
Routing	react-router-dom v6

Project Structure
src/
├── components/
│   ├── Button.tsx
│   ├── Footer.tsx
│   ├── Input.tsx
│   ├── Navbar.tsx
│   └── NetworkError.tsx
│
├── pages/
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Dashboard.tsx
│   └── Tickets.tsx
│
├── routes/
│   └── ProtectedRoute.tsx
│
├── utils/
│   ├── auth.ts
│   └── validation.ts
│
├── App.tsx
└── main.tsx

Installation & Setup
1. Clone the Repository
git clone https://github.com/<your-username>/kendall-manager-pro.git
cd kendall-manager-pro

2. Install Dependencies
npm install

3. Start the Development Server
npm run dev


Then open your browser and go to:

http://localhost:5173

Authentication Workflow
Action	Description
Signup	User registers with email and password. Credentials are saved to local storage.
Login	Email and password are verified. A session token with a 1-hour expiry is set.
Protected Routes	If session is missing or expired, user is redirected to login.
Logout	Clears session data from local storage.

Password Validation Rules
A valid password must:

Contain at least 8 characters

Include one uppercase letter

Include one lowercase letter

Include one number

Include one special symbol (!@#$%^&*, etc.)

Match the confirm password field

Inline error messages clearly show missing requirements.

Navigation Behavior
Device	Behavior
Desktop (≥768px)	Displays logo, navigation links, and CTA login button
Mobile (<768px)	Displays logo and hamburger menu; navigation links slide down when toggled
Responsive Footer Behavior

On large screens: fixed at the bottom of the page

On smaller screens (e.g., iPad): remains pinned using a flex layout (min-h-screen structure)

Common Issues & Fixes
Issue	Cause	Solution
Session expired message appears immediately	Expiry timestamp is invalid or expired	Clear local storage and log in again
Mobile menu toggle works but links not visible	Text or background color conflict	Ensure bg-white and visible text colors (e.g., text-blue-600)
Footer not sticking to bottom	Missing parent min-h-screen + flex flex-col	Wrap layout with these classes in App.tsx
Build for Production
npm run build


The production-ready files will be in the dist/ directory.

To preview the production build locally:

npm run preview
