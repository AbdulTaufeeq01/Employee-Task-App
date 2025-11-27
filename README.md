# Employee & Task Manager

A full-stack web application for managing employees and their tasks. Built with FastAPI for the backend and React for the frontend, featuring JWT-based authentication and SQLite database.

## 🎯 Features

- **User Authentication**: JWT-based login system with secure password hashing using Argon2
- **Employee Management**: Create, view, and delete employee records with email validation
- **Task Management**: Create, assign, update, and delete tasks with status tracking
- **Real-time Updates**: Automatic data refresh after any operation
- **Responsive UI**: Clean, modern React frontend with intuitive forms and tables
- **Security**: CORS support, secure session management, and protected API endpoints

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI 0.122.0
- **Server**: Uvicorn 0.38.0
- **Database**: SQLite with SQLAlchemy ORM 2.0.44
- **Authentication**: Python-jose (JWT), Argon2 for password hashing
- **Validation**: Pydantic 2.12.4 with Email validation

### Frontend
- **Framework**: React 18 (CDN-based, no build step)
- **Styling**: Inline CSS with responsive design
- **HTTP Client**: Fetch API

### Python Dependencies
```
FastAPI
Uvicorn
SQLAlchemy
Pydantic
email-validator
argon2-cffi
python-multipart
python-jose[cryptography]
```

## 📋 Setup Instructions

### Prerequisites
- Python 3.9+
- pip or conda
- Windows/Mac/Linux

### Installation Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd d:\projects\employee-task-app
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv empvenv
   ```

3. **Activate the virtual environment**
   
   **Windows (PowerShell):**
   ```bash
   .\empvenv\Scripts\Activate.ps1
   ```
   
   **Windows (CMD):**
   ```bash
   empvenv\Scripts\activate.bat
   ```
   
   **Mac/Linux:**
   ```bash
   source empvenv/bin/activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the application**
   ```bash
   uvicorn app.main:app --reload
   ```

6. **Access the application**
   - Open your browser and navigate to: `http://127.0.0.1:8000`
   - The app will automatically create a SQLite database (`app.db`) on first run

## 🚀 Getting Started

### Create Your First User

1. **Register a new user**
   - You'll need to create a user account first
   - Register endpoint: `POST /api/auth/register`
   - Example: Username: `admin`, Password: `securepass123`

2. **Login**
   - Use your credentials to log in
   - The JWT token is stored in browser state (not in localStorage for security)
   - Token expires after 1 hour

### Managing Employees

1. **Add Employee**
   - Fill in Name, Email, and Role
   - Click "Add Employee"
   - Email validation is performed automatically

2. **View Employees**
   - See all employees in the table below the form
   - Includes ID, Name, Email, and Role

3. **Delete Employee**
   - Click "Delete" button in the Actions column
   - Deleting an employee will also remove associated tasks

### Managing Tasks

1. **Add Task**
   - Fill in Title (required)
   - Add optional Description, Status, Due Date, and Employee ID
   - Status options: TODO, IN_PROGRESS, DONE
   - Click "Add Task"

2. **View Tasks**
   - All tasks displayed in the table
   - Shows ID, Title, Status, and assigned Employee

3. **Update Task Status**
   - Click "Done" button to mark task as DONE
   - Click "Delete" to remove task

## 📁 Project Structure

```
employee-task-app/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app setup, routers, middleware
│   ├── auth.py                 # Authentication logic (JWT, password hashing)
│   ├── database.py             # SQLAlchemy setup, session management
│   ├── models.py               # SQLAlchemy models (User, Employee, Task)
│   ├── schemas.py              # Pydantic schemas for validation
│   ├── crud.py                 # Database CRUD operations
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── auth.py             # Login/Register endpoints
│   │   ├── employees.py        # Employee management endpoints
│   │   └── task.py             # Task management endpoints
│   └── static/
│       ├── index.html          # React app entry point
│       ├── app.js              # React components and logic
│       ├── styles.css          # (Optional) Global styles
├── empvenv/                    # Virtual environment
├── requirements.txt            # Python dependencies
└── README.md                   # This file
```

## 🔐 Authentication Flow

1. **User Registration**
   - User submits username and password
   - Password is hashed using Argon2 (modern, secure algorithm)
   - User record stored in database

2. **User Login**
   - User submits credentials
   - Password verified against stored hash
   - JWT token generated with 1-hour expiration
   - Token includes username in payload

3. **Protected Endpoints**
   - All API endpoints (except `/api/auth/register` and `/api/auth/login`) require JWT token
   - Token passed in Authorization header: `Bearer <token>`
   - Backend validates token before processing request

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Employees
- `GET /api/employees/` - List all employees
- `POST /api/employees/` - Create new employee
- `GET /api/employees/{id}` - Get employee by ID
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

### Tasks
- `GET /api/tasks/` - List all tasks
- `POST /api/tasks/` - Create new task
- `GET /api/tasks/{id}` - Get task by ID
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

## 🎨 Frontend Features

### React Implementation
- **State Management**: Uses React Hooks (useState) for local state
- **No Build Step**: Uses CDN-loaded React 18 with `React.createElement()`
- **Real-time Updates**: Data automatically refreshes after any operation
- **Error Handling**: Try-catch blocks with user-friendly error messages
- **Cache Control**: Middleware ensures fresh files are always loaded

### Styling
- Clean, professional design with blue/green color scheme
- Responsive tables with proper spacing
- Consistent button styling (primary blue, danger red, success green)
- Hover effects and visual feedback

## 💾 Database

### SQLite
- Lightweight, file-based database (`app.db`)
- No external database setup required
- Automatically created on first run

### Models
- **User**: username, hashed_password, created_at
- **Employee**: name, email, role, created_at
- **Task**: title, description, status, due_date, employee_id, created_at

## 🔍 Assumptions & Design Decisions

### Assumptions
1. **Single-User Per Session**: Token stored in React state, not persistent
2. **Email Validation**: Uses pydantic EmailStr for proper email validation
3. **SQLite for Simplicity**: Single-file database for easy deployment
4. **No API Rate Limiting**: Assumed development/testing environment
5. **CORS Allowed**: All origins allowed for frontend flexibility

### Bonus Features Implemented

1. **Argon2 Password Hashing**
   - Industry-standard, memory-hard algorithm
   - More secure than traditional bcrypt
   - Handles large passwords without truncation issues

2. **Email Validation**
   - Uses `email-validator` library with Pydantic
   - Validates email format and domain during employee creation

3. **JWT Authentication**
   - Token expiration (1 hour)
   - Secure credentials with Bearer scheme
   - Stateless authentication

4. **Cache Control Middleware**
   - Prevents browser caching of static files
   - Ensures fresh assets always loaded during development
   - Added Cache-Control, Pragma, and Expires headers

5. **React Without Build Tools**
   - Uses CDN-hosted React and React-DOM
   - No npm, no webpack, no build step needed
   - `React.createElement()` API instead of JSX for compatibility

6. **Comprehensive Error Handling**
   - Try-catch blocks in all async operations
   - User-friendly error messages
   - Console logging for debugging

7. **Responsive Design**
   - Mobile-friendly layout
   - Flexible tables and forms
   - Proper spacing and typography

## 🚦 Running the Application

### Development Mode (with Auto-Reload)
```bash
uvicorn app.main:app --reload
```

### Production Mode
```bash
uvicorn app.main:app
```

### Specify Host and Port
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 📸 Screenshots & Usage

### 1. Login Screen
- Username and password input fields
- Login button
- Error message display (if login fails)

### 2. Main Dashboard (After Login)
- Logout button (top-right)
- "Add Employee" section with form and table
- "Add Task" section with form and table

### 3. Employee Management
- Form to add new employee (Name, Email, Role)
- Table showing all employees with delete option
- Real-time updates after add/delete

### 4. Task Management
- Form to add new task (Title, Description, Status, Due Date, Employee ID)
- Table showing all tasks with Done/Delete options
- Status tracking (TODO, IN_PROGRESS, DONE)
- Employee assignment (can be unassigned)

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Use a different port
uvicorn app.main:app --port 8001
```

### Virtual Environment Issues
```bash
# Deactivate and reactivate
deactivate
.\empvenv\Scripts\Activate.ps1
```

### Database Issues
```bash
# Delete the database to reset
del app.db
# Restart the app to create a fresh database
```

### Missing Dependencies
```bash
# Reinstall all requirements
pip install -r requirements.txt --force-reinstall
```

## 📝 Notes

- The application uses UTC timezone for all timestamps
- Passwords are securely hashed and never stored in plain text
- JWT tokens expire after 1 hour of inactivity
- All API responses include proper HTTP status codes
- CORS headers allow cross-origin requests from any origin

## 🤝 Contributing

This is a demonstration project. Feel free to:
- Add additional features (filtering, sorting, pagination)
- Improve the UI with CSS frameworks (Tailwind, Bootstrap)
- Add unit tests
- Implement database migrations
- Add role-based access control (RBAC)
