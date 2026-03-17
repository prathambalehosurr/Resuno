<div align="center">

![Resuno Banner](./assets/banner.png)

# 🚀 Resuno

**Resuno** is a premium, AI-powered interview preparation platform designed to help candidates bridge the gap between their resume and their dream job. By leveraging the power of **Google Gemini 2.5 Flash**, Resuno generates tailored interview strategies, interactive prep materials, and ATS-optimized resumes.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)

</div>

---

## ✨ Key Features

- 🧠 **AI-Powered Analysis**: Deep analysis of your resume vs. job description using state-of-the-art AI.
- 🎯 **Match Score**: Instant calculation of your profile's compatibility with the target role.
- ⚡ **Interactive Flashcards**: Practice with high-probability Technical and Behavioral questions.
- 📅 **7-Day Preparation Roadmap**: A personalized, day-by-day study plan to master your interview.
- 📄 **ATS-Optimized Resumes**: Automatically generate professional, ATS-friendly resumes in PDF format.
- 🌓 **Premium UI/UX**: Futuristic design with seamless dark/light mode and smooth transitions.
- 🔐 **Secure Authentication**: Robust user management and report history.

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19 (Vite)
- **Styling**: Vanilla CSS & SCSS
- **Navigation**: React Router 7
- **State Management**: Context API
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
- MongoDB
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
   cp ../.env.example .env   # fill in GOOGLE_GENAI_API_KEY, MONGO_URI, JWT_SECRET, FRONTEND_URL
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../Frontend
   npm install
   cp .env.example .env.local   # set VITE_API_URL=http://localhost:3000
   npm run dev
   ```

---

## ☁️ Deployment

Resuno is split into two independently deployed services.

### Backend — Railway / Render

1. Create a new service pointing to the `Backend` directory (or use the root and set the start command to `npm start`).
2. Set the following environment variables in your hosting dashboard:
   ```
   GOOGLE_GENAI_API_KEY=<your key>
   MONGO_URI=<mongodb+srv://...>
   JWT_SECRET=<random secret>
   FRONTEND_URL=<https://your-frontend-domain.vercel.app>
   COOKIE_SAME_SITE=none
   COOKIE_SECURE=true
   PORT=3000
   ```
3. The start command is `npm start` (runs `node server.js`).

### Frontend — Vercel

1. Import the repository into Vercel.
2. Set the **Root Directory** to `Frontend` (or use the root-level `vercel.json` which already points to `Frontend/dist`).
3. Add the environment variable:
   ```
   VITE_API_URL=<https://your-backend-domain.up.railway.app>
   ```
4. Deploy — Vercel will run `npm run build` and serve the output from `Frontend/dist`.

---

## 📸 Screenshots

_(Add placeholders here for your actual screenshots)_

|                                  Dashboard                                   |                            Interview Report                            |
| :--------------------------------------------------------------------------: | :--------------------------------------------------------------------: |
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
