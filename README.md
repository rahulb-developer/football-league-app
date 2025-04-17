# ⚽ Full-Stack Football League Web App

This project is a full-stack football web application that displays league standings, fixtures, and club profiles. It uses:

- **React** for the frontend (with Material UI & GSAP animations)
- **FastAPI** for the backend API
- **PostgreSQL** as the database
- **Docker Compose** for orchestration

---

## 📦 Tech Stack

| Layer         | Tech             |
| ------------- | ---------------- |
| Frontend      | React (Material UI, GSAP) |
| Backend       | FastAPI (Python) |
| Database      | PostgreSQL       |
| DB Admin Tool | Adminer          |
| Containerization | Docker + Docker Compose |

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Docker
- Docker Compose

---

## 🛠️ Project Structure
. ├── fastapi/ # Backend API │ └── Dockerfile │ └── app/ # Python codebase ├── web-app/ # React frontend │ └── Dockerfile │ └── public/ │ └── src/ ├── db/ │ └── init/ # SQL init scripts (e.g. query.sql) ├── docker-compose.yml └── README.md

---

## 🗄️ Database (PostgreSQL)

Your PostgreSQL database will be automatically created and initialized using the SQL scripts in `db/init/`.

## ⚙️ Environment Variables

Create a `.env` in `web-app/`:
REACT_APP_API_BASE_URL=http://localhost:8000

---

### 🧠 Backend (`fastapi` service)

- `PG_DBNAME=postgres`
- `PG_USER=postgres`
- `PG_PASSWORD=password`
- `PG_HOST=postgresdb`
- `APP_PORT=8000`

📘 API Docs:
Visit Swagger UI at:
- http://localhost:8000/docs#/
OR 
- http://your_pc_ip:8000/docs#/

---

### 🌐 Frontend (`web` service)

---

# 🧪 Running the app

- docker-compose down -v
- docker-compose up --build

This will:
- ✅ Start the PostgreSQL database
- ✅ Initialize it with SQL from db/init/
- ✅ Start FastAPI backend at http://localhost:8000
- ✅ Start React frontend at http://localhost:3000
- ✅ Start Adminer (DB GUI) at http://localhost:8080

- You can also use http://your_pc_ip:{port}

---

# 💡 Features:

- 🌍 Dashboard landing page

- 🏆 Standings table with filtering

- 📅 Match fixtures per club

- 📋 Club profiles with history

- 🎨 Responsive UI with animation (GSAP + MUI)

---

# 🙋‍♂️ Made By

# Rahul B

# Made with passion for ⚽ football and 💻 code.
