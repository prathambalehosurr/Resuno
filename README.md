<div align="center">

![Resuno Banner](./assets/banner.png)

# 🚀 Resuno

**Resuno** is a premium, AI-powered interview preparation platform designed to help candidates bridge the gap between their resume and their dream job. By leveraging the power of **Google Gemini 2.5 Flash**, Resuno generates tailored interview strategies, interactive prep materials, and ATS-optimized resumes.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)

### Deploy it now

| Service | Deploy |
| :------ | :----- |
| 🖥️ **Backend** (Render) | [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/prathambalehosurr/Resuno) |
| ⚡ **Frontend** (Vercel) | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/prathambalehosurr/Resuno) |

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

> **Recommended free-tier stack**
> - **Backend** → [Render.com](https://render.com) (free web service, supports Puppeteer/Chrome)
> - **Frontend** → [Vercel](https://vercel.com) (free hobby plan, zero-config Vite support)
> - **Database** → [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free M0 cluster, 512 MB)

Resuno is split into two independently deployed services. Deploy the backend first so you have a URL to give to the frontend.

### Step 1 — Database (MongoDB Atlas)

1. Sign up at <https://www.mongodb.com/cloud/atlas> and create a free **M0** cluster.
2. Under **Database Access**, create a user with *Read and write* privileges.
3. Under **Network Access**, add Render's IP ranges. If you are on Render's free plan (which uses dynamic IPs), you can temporarily allow `0.0.0.0/0` and tighten this later once you upgrade to a paid plan with static IPs.
4. Copy the **connection string** (`mongodb+srv://...`) — you'll need it in Step 2.

### Step 2 — Backend (Render)

**Option A — One-click deploy** (recommended)

Click the button in the badge table above, or go to:
```
https://render.com/deploy?repo=https://github.com/prathambalehosurr/Resuno
```
Render reads the `render.yaml` at the repo root and prompts you to fill in only the secrets.

**Option B — Manual**

1. Go to <https://dashboard.render.com> → **New Web Service** → connect this GitHub repo.
2. Set **Root Directory** to `Backend`.
3. Set **Build Command** to `npm install` and **Start Command** to `npm start`.
4. Choose the **Free** plan.

**Environment variables** (set in either Option A or B):

| Variable | Value |
| :------- | :---- |
| `GOOGLE_GENAI_API_KEY` | Your [Gemini API key](https://aistudio.google.com/app/apikey) |
| `MONGO_URI` | `mongodb+srv://...` from Atlas |
| `JWT_SECRET` | Any random string of **at least 32 characters** (Render can auto-generate) |
| `FRONTEND_URL` | Your Vercel URL (set after Step 3, e.g. `https://resuno.vercel.app`) |
| `COOKIE_SAME_SITE` | `none` |
| `COOKIE_SECURE` | `true` |
| `NODE_ENV` | `production` |

After deploy, note the service URL (e.g. `https://resuno-backend.onrender.com`).

### Step 3 — Frontend (Vercel)

1. Go to <https://vercel.com/new> → **Import** this GitHub repository.
2. Leave **Root Directory** as `/` (the root `vercel.json` already points Vercel at `Frontend/dist`).
3. Add the environment variable:

   | Variable | Value |
   | :------- | :---- |
   | `VITE_API_URL` | Your Render backend URL (e.g. `https://resuno-backend.onrender.com`) |

4. Click **Deploy** — Vercel runs `npm run build` and serves `Frontend/dist` automatically.

### Step 4 — Wire them together

After Vercel finishes:
1. Copy your Vercel URL (e.g. `https://resuno.vercel.app`).
2. In Render → **Environment** for your backend service, update `FRONTEND_URL` to that URL.
3. Render redeploys automatically (or click **Manual Deploy**).

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
