# 🚀 QuickPaste

A simple and fast web application to **share text and code online using a unique link**.

![QuickPaste Banner](https://raw.githubusercontent.com/pujaripunithkumar/quickpaste/main/public/banner.png)

[![DEMO](https://img.shields.io/badge/DEMO-TRY%20IT%20LIVE-70E000?style=for-the-badge&logo=vercel&logoColor=white)](https://quickpasteapp.vercel.app)
[![REACT](https://img.shields.io/badge/REACT-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![FASTAPI](https://img.shields.io/badge/FASTAPI-0.100%2B-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![POSTGRESQL](https://img.shields.io/badge/POSTGRESQL-SUPABASE-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://supabase.com/)

[![STATUS](https://img.shields.io/badge/STATUS-DEPLOYED-70E000?style=for-the-badge)](https://quickpasteapp.vercel.app)
[![GITHUB](https://img.shields.io/badge/GITHUB-SOURCE%20CODE-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pujaripunithkumar/quickpaste)

> *A lightweight, developer-focused web application to share text and code snippets instantly.*

---

## ✨ Features

* **Instant Sharing:** Create and share text or code snippets easily.
* **Unique URLs:** Automatically generate a shareable link for every paste.
* **One-Click Copy:** Easily copy content directly from the viewer.
* **Database Backed:** Stored reliably in PostgreSQL via Supabase.
* **Paste Expiration:** Optional expiration settings for temporary pastes.
* **Multi-Language Support:** Code syntax support for various programming languages.
* **Fast API Backend:** Powered by FastAPI for quick response times.
* **No Account Required:** Start sharing immediately without signing up.

---

## 🛠️ Tech Stack & Skills Breakdown

### 💻 Technologies & Frameworks

| Category | Skill / Tool |
| :--- | :--- |
| **Frontend** | React, Vite, JavaScript (ES6+), HTML5, CSS3, React Router |
| **Backend** | Python 3, FastAPI, RESTful APIs, SQLAlchemy, Uvicorn |
| **Database** | PostgreSQL, Supabase |
| **DevOps & Cloud** | Vercel, Render, Git, GitHub |

### 🧠 Core Competencies

* Full-Stack Web Development & System Architecture
* REST API Design & Integration
* Relational Database Modeling (ORM & SQL)
* Responsive UI/UX Design & Frontend Routing
* Environment Configuration & Cloud Deployment

---

## 🏗️ Architecture

```text
                 ┌─────────────────────┐
                 │        User         │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │    React + Vite     │
                 │      (Vercel)       │
                 └──────────┬──────────┘
                            │ REST API
                            ▼
                 ┌─────────────────────┐
                 │       FastAPI       │
                 │      (Render)       │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │    PostgreSQL /     │
                 │      Supabase       │
                 └─────────────────────┘

```
## 🔄 How It Works

1. Enter text or code snippet in the editor.
2. Select the syntax language and optional expiration timeframe.
3. Submit the paste to send it to the FastAPI backend.
4. Backend generates a unique ID and persists the content to PostgreSQL.
5. Receive your unique shareable URL to send to anyone.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Check API operational status |
| `GET` | `/db-test` | Test database connection health |
| `POST` | `/pastes` | Create a new paste |
| `GET` | `/pastes/{paste_id}` | Retrieve a specific paste |
| `DELETE` | `/pastes/{paste_id}` | Delete a specific paste |

---

## 📂 Project Structure

```text
quickpaste/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   └── models.py
│   │
│   ├── requirements.txt
│   ├── .env
│   └── .gitignore
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
├── package.json
├── vite.config.js
└── README.md
```
## 💡 Why QuickPaste?

QuickPaste is built to streamline quick text sharing. Instead of sending cluttered code blocks over messaging platforms or creating temporary files, QuickPaste delivers instant, lightweight, and clean URL links.

---

## 🔒 Security & Environment Variables

Never commit your local `.env` file, actual database passwords, or Supabase credentials directly to public source control. Keep `.env` listed in your `.gitignore` file at all times.

---

## 👨‍💻 Author

**Pujari Punith Kumar**  
GitHub: [https://github.com/pujaripunithkumar](https://github.com/pujaripunithkumar)

---
⭐ *If you find QuickPaste helpful, feel free to give the repository a star!*
