# Job Recruitment Platform - Group 12

A modern web-based job recruitment system. The platform supports job seekers, recruiters, and admin roles with features like job posting, job applications, admin control, and profile management.

##  Features

-  Recruiter accounts to post, manage, and view applicants
-  Job seeker profiles and application forms
-  Job listings with filters (type, location, salary, etc.)
-  Admin dashboard to manage users and view contact messages
-  Secure form submissions and resume uploads
-  Contact Us functionality
-  Clean responsive frontend UI with React

##  Tech Stack

- **Frontend**: React, Vite, JSX, Tailwind CSS
- **Backend**: Node.js, Express (expected from structure)
- **Database**: MongoDB (assumed based on typical stack)
- **Other Tools**: Formik + Yup (form validation), file uploads

## Folder Structure 
Fron End

```
JobRecruitmentGroup_12/
├── public/
├── src/
│   ├── assets/images/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── .vscode/
├── package.json
├── vite.config.js
```
Back End
```
controllers/
├── adminController.js
├── applyController.js
├── contactController.js
├── jobController.js
├── userController.js

routes/
├── adminRoutes.js
├── applyRoutes.js
├── contactRoutes.js
├── jobRoutes.js
├── userRoutes.js

models/
├── userModel.js
├── jobModel.js
├── applicationModel.js
├── contactModel.js

middleware/
├── authMiddleware.js

uploads/ 
.env
index.js
```
## Installation

1. Clone the repository or download the ZIP.
2. Navigate to the project folder:
   ```bash
   cd JobRecruitmentGroup_12
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🧪 Usage

- Visit `http://localhost:5173` in your browser.
- Explore features as:
  - Recruiter (can post and manage jobs)
  - Job Seeker (can apply to jobs)
  - Admin (can manage users and view dashboard)



