# Employee & Task Manager

A full-stack web application for managing employees and their tasks. Built with FastAPI for the backend and React for the frontend, featuring JWT-based authentication and SQLite database.

## 🎯 Features

- **User Authentication**: JWT-based login with Argon2 password hashing
- **Employee Management**: Create, view, and delete employees with email validation
- **Task Management**: Create, update, and delete tasks with status tracking
- **Real-time Updates**: Automatic data refresh after operations
- **Security**: Protected API endpoints with JWT verification

## 🛠️ Tech Stack

- **Backend**: FastAPI 0.122.0 + Uvicorn 0.38.0
- **Database**: SQLite with SQLAlchemy ORM 2.0.44
- **Frontend**: React 18 (CDN-based, no build step)
- **Authentication**: JWT with Argon2 password hashing
- **Validation**: Pydantic 2.12.4 with email validation

## 📋 Setup & Usage

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd d:\projects\employee-task-app
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv empvenv
   .\empvenv\Scripts\Activate.ps1  # Windows PowerShell
   ```

3. **Install dependencies & run**
   ```bash
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

4. **Access the app**
   - Open browser: `http://127.0.0.1:8000`
   - Database auto-creates on first run

### Quick Start

1. **Register & Login**
   - Create a new account with username and password
   - Token expires after 1 hour

2. **Add Employees**
   - Fill name, email, and role
   - Email is validated automatically

3. **Manage Tasks**
   - Create tasks and assign to employees
   - Click "Done" to mark task complete or "Delete" to remove
   - Status options: TODO, IN_PROGRESS, DONE

## 📁 Project Structure

```
app/
├── main.py              # FastAPI setup and routers
├── auth.py              # JWT and password hashing
├── database.py          # SQLAlchemy configuration
├── models.py            # Database models
├── schemas.py           # Pydantic validation schemas
├── crud.py              # Database operations
├── routers/
│   ├── auth.py          # Login/Register endpoints
│   ├── employees.py     # Employee endpoints
│   └── task.py          # Task endpoints
└── static/
    ├── index.html       # React entry point
    ├── app.js           # React components
    └── styles.css       # Styles
requirements.txt        # Dependencies
```

## 🔐 Authentication & API

**Authentication**: JWT tokens generated on login, required for all endpoints except `/api/auth/register` and `/api/auth/login`.

**Main Endpoints**:
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET/POST /api/employees/` - Employee operations
- `GET/POST/PUT/DELETE /api/employees/{id}` - Employee details
- `GET/POST /api/tasks/` - Task operations
- `GET/PUT/DELETE /api/tasks/{id}` - Task details

