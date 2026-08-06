# Joba Description

Joba is a full-stack web application built with **Next.js**, designed to extract and analyze key information from job descriptions using AI.

The project is built on a modern architecture, containerized with **Docker**, and automatically deployed to a production server via **GitHub Actions CI/CD**.

**Live Demo:** [joba.chato.sbs](https://joba.chato.sbs)

---

## Key Features

- **Smart Poster and Text Extraction:** Extract qualifications, responsibilities, and key requirements from job description text or posters in a single step.
- **Effortless Organization:** Joba automatically structures and organizes extracted results neatly into the database.
- **Google Calendar Integration:** Schedule interview reminders seamlessly with built-in Google Calendar integration.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend & Backend** | Next.js (React.js, API Routes) |
| **Database** | MongoDB |
| **Containerization** | Docker & Docker Compose |
| **Web Server / Proxy** | Nginx (Reverse Proxy + SSL) |
| **CI/CD & DevOps** | GitHub Actions, SSH, VPS |

---

##  Local Development Guide

Prerequisites: Ensure **Node.js** (v18+) or **Docker** is installed on your machine.

### 1. Clone Repository
```bash
git clone [https://github.com/yasminm85/joba-app.git](https://github.com/yasminm85/joba-app.git)
cd joba-app
```

### 2. Configure Environment Variables
```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/joba_db

AUTH_SECRET=your_super_secret_auth_key
NEXTAUTH_SECRET=your_super_secret_auth_key

NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

### 3. Run the Application
```bash
npm install
npm run dev
```
Open your browser and navigate to http://localhost:3000
