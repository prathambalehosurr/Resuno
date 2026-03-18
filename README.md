<div align="center">

![Resuno Banner](./assets/banner.png)

# 🚀 Resuno
**The Ultimate AI-Powered Interview Preparation Platform**

[**Live Demo**](https://resuno-frontend.vercel.app) • [**Backend API**](https://resuno.onrender.com)

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## ✨ Key Features

- 🧠 **AI-Powered Analysis**: Deep analysis of your resume vs. job description using **Google Gemini 2.5 Flash**.
- 🎯 **Match Score**: Instant calculation of your profile's compatibility with the target role.
- ⚡ **Interactive Flashcards**: Practice with high-probability Technical and Behavioral questions.
- 📅 **7-Day Preparation Roadmap**: A personalized, day-by-day study plan to master your interview.
- 📄 **ATS-Optimized Resumes**: Automatically generate professional, ATS-friendly resumes in PDF format using **Puppeteer**.
- 🌓 **Premium UI/UX**: Futuristic design with seamless dark/light mode and smooth transitions.
- 🔐 **Secure Authentication**: Robust user management with JWT and report history.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Vanilla CSS & SCSS (Modern dark/light theme)
- **Navigation**: React Router 7
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js & Express 5
- **Database**: MongoDB (Mongoose)
- **AI Engine**: Google Gemini 2.5 Flash
- **Tools**: Puppeteer (PDF generation), Zod (Schema validation), Multer (File uploads)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prathambalehosurr/Resuno.git
   cd Resuno
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   # Create a .env file with your GOOGLE_GENAI_API_KEY and MONGO_URI
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../Frontend
   npm install
   npm run dev
   ```

---

## 🌎 Deployment

### Backend (Render)
- **Framework**: Node.js
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Recommended Environments**: `MONGO_URI`, `GOOGLE_GENAI_API_KEY`, `JWT_SECRET`, `FRONTEND_URL`.

### Frontend (Vercel)
- **Framework**: Vite
- **Root Directory**: `Frontend`
- **Recommended Environments**: `VITE_API_URL`.

---

## 📸 Screenshots

| Dashboard | Interview Report |
| :---: | :---: |
| ![Dashboard Placeholder](https://via.placeholder.com/400x250?text=Dashboard) | ![Report Placeholder](https://via.placeholder.com/400x250?text=Report) |

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the ISC License.

---

<div align="center">
Built with ❤️ by the Resuno Team
</div>
