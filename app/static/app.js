const { useState, useEffect } = React;

function App() {
    const [token, setToken] = useState(null);
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [employees, setEmployees] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [empForm, setEmpForm] = useState({ name: "", email: "", role: "" });
    const [taskForm, setTaskForm] = useState({
        title: "",
        description: "",
        status: "TODO",
        due_date: "",
        employee_id: ""
    });

    const authHeaders = () => {
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    // LOGIN
    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new URLSearchParams();
        formData.append("username", loginUsername);
        formData.append("password", loginPassword);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: formData.toString(),
            });

            if (!res.ok) {
                setLoginStatus("Login failed.");
                return;
            }

            const data = await res.json();
            setToken(data.access_token);
            setLoginStatus("Login successful!");
            loadEmployees(data.access_token);
            loadTasks(data.access_token);
        } catch (err) {
            setLoginStatus("Error: " + err.message);
        }
    };

    // LOAD EMPLOYEES
    const loadEmployees = async (authToken) => {
        try {
            const headers = authToken 
                ? { Authorization: `Bearer ${authToken}` } 
                : authHeaders();
            const res = await fetch("/api/employees/", { headers });
            const data = await res.json();
            setEmployees(data);
        } catch (err) {
            console.error("Error loading employees:", err);
        }
    };

    // LOAD TASKS
    const loadTasks = async (authToken) => {
        try {
            const headers = authToken 
                ? { Authorization: `Bearer ${authToken}` } 
                : authHeaders();
            const res = await fetch("/api/tasks/", { headers });
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            console.error("Error loading tasks:", err);
        }
    };

    // ADD EMPLOYEE
    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
            await fetch("/api/employees/", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    ...authHeaders() 
                },
                body: JSON.stringify(empForm),
            });
            setEmpForm({ name: "", email: "", role: "" });
            loadEmployees(token);
        } catch (err) {
            console.error("Error adding employee:", err);
        }
    };

    // DELETE EMPLOYEE
    const deleteEmployee = async (id) => {
        try {
            await fetch(`/api/employees/${id}`, {
                method: "DELETE",
                headers: authHeaders(),
            });
            loadEmployees(token);
            loadTasks(token);
        } catch (err) {
            console.error("Error deleting employee:", err);
        }
    };

    // ADD TASK
    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...taskForm,
                due_date: taskForm.due_date ? new Date(taskForm.due_date).toISOString() : null,
                employee_id: taskForm.employee_id ? parseInt(taskForm.employee_id) : null
            };
            await fetch("/api/tasks/", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    ...authHeaders() 
                },
                body: JSON.stringify(payload),
            });
            setTaskForm({
                title: "",
                description: "",
                status: "TODO",
                due_date: "",
                employee_id: ""
            });
            loadTasks(token);
        } catch (err) {
            console.error("Error adding task:", err);
        }
    };

    // DELETE TASK
    const deleteTask = async (id) => {
        try {
            await fetch(`/api/tasks/${id}`, {
                method: "DELETE",
                headers: authHeaders(),
            });
            loadTasks(token);
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    // MARK TASK DONE
    const markTaskDone = async (id) => {
        try {
            await fetch(`/api/tasks/${id}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json", 
                    ...authHeaders() 
                },
                body: JSON.stringify({ status: "DONE" }),
            });
            loadTasks(token);
        } catch (err) {
            console.error("Error updating task:", err);
        }
    };

    // LOGOUT
    const handleLogout = () => {
        setToken(null);
        setLoginStatus("");
        setLoginUsername("");
        setLoginPassword("");
    };

    if (!token) {
        return React.createElement(
            "div",
            { style: styles.container },
            React.createElement("h1", { style: styles.title }, "Employee & Task Manager"),
            React.createElement(
                "div",
                { style: styles.card },
                React.createElement("h2", null, "Login"),
                React.createElement(
                    "form",
                    { onSubmit: handleLogin, style: styles.form },
                    React.createElement("input", {
                        type: "text",
                        placeholder: "Username",
                        value: loginUsername,
                        onChange: (e) => setLoginUsername(e.target.value),
                        required: true,
                        style: styles.input,
                    }),
                    React.createElement("input", {
                        type: "password",
                        placeholder: "Password",
                        value: loginPassword,
                        onChange: (e) => setLoginPassword(e.target.value),
                        required: true,
                        style: styles.input,
                    }),
                    React.createElement("button", { type: "submit", style: styles.button }, "Login")
                ),
                loginStatus && React.createElement("p", { style: styles.status }, loginStatus)
            )
        );
    }

    return React.createElement(
        "div",
        { style: styles.container },
        React.createElement("h1", { style: styles.title }, "Employee & Task Manager"),
        React.createElement(
            "div",
            { style: styles.header },
            React.createElement("p", { style: styles.welcomeText }, "Logged in successfully!"),
            React.createElement(
                "button",
                { onClick: handleLogout, style: { ...styles.button, ...styles.logoutBtn } },
                "Logout"
            )
        ),
        React.createElement(
            "div",
            { style: styles.card },
            React.createElement("h2", null, "Add Employee"),
            React.createElement(
                "form",
                { onSubmit: handleAddEmployee, style: styles.form },
                React.createElement("input", {
                    type: "text",
                    placeholder: "Name",
                    value: empForm.name,
                    onChange: (e) => setEmpForm({ ...empForm, name: e.target.value }),
                    required: true,
                    style: styles.input,
                }),
                React.createElement("input", {
                    type: "email",
                    placeholder: "Email",
                    value: empForm.email,
                    onChange: (e) => setEmpForm({ ...empForm, email: e.target.value }),
                    required: true,
                    style: styles.input,
                }),
                React.createElement("input", {
                    type: "text",
                    placeholder: "Role",
                    value: empForm.role,
                    onChange: (e) => setEmpForm({ ...empForm, role: e.target.value }),
                    required: true,
                    style: styles.input,
                }),
                React.createElement("button", { type: "submit", style: styles.button }, "Add Employee")
            ),
            React.createElement(
                "table",
                { style: styles.table },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        { style: styles.tableHeader },
                        React.createElement("th", { style: styles.th }, "ID"),
                        React.createElement("th", { style: styles.th }, "Name"),
                        React.createElement("th", { style: styles.th }, "Email"),
                        React.createElement("th", { style: styles.th }, "Role"),
                        React.createElement("th", { style: styles.th }, "Actions")
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    employees.map((e) =>
                        React.createElement(
                            "tr",
                            { key: e.id, style: styles.tableRow },
                            React.createElement("td", { style: styles.td }, e.id),
                            React.createElement("td", { style: styles.td }, e.name),
                            React.createElement("td", { style: styles.td }, e.email),
                            React.createElement("td", { style: styles.td }, e.role),
                            React.createElement(
                                "td",
                                { style: styles.td },
                                React.createElement(
                                    "button",
                                    {
                                        onClick: () => deleteEmployee(e.id),
                                        style: styles.deleteBtn,
                                    },
                                    "Delete"
                                )
                            )
                        )
                    )
                )
            )
        ),
        React.createElement(
            "div",
            { style: styles.card },
            React.createElement("h2", null, "Add Task"),
            React.createElement(
                "form",
                { onSubmit: handleAddTask, style: styles.form },
                React.createElement("input", {
                    type: "text",
                    placeholder: "Title",
                    value: taskForm.title,
                    onChange: (e) => setTaskForm({ ...taskForm, title: e.target.value }),
                    required: true,
                    style: styles.input,
                }),
                React.createElement("input", {
                    type: "text",
                    placeholder: "Description",
                    value: taskForm.description,
                    onChange: (e) => setTaskForm({ ...taskForm, description: e.target.value }),
                    style: styles.input,
                }),
                React.createElement(
                    "select",
                    {
                        value: taskForm.status,
                        onChange: (e) => setTaskForm({ ...taskForm, status: e.target.value }),
                        style: styles.input,
                    },
                    React.createElement("option", { value: "TODO" }, "TODO"),
                    React.createElement("option", { value: "IN_PROGRESS" }, "IN_PROGRESS"),
                    React.createElement("option", { value: "DONE" }, "DONE")
                ),
                React.createElement("input", {
                    type: "datetime-local",
                    value: taskForm.due_date,
                    onChange: (e) => setTaskForm({ ...taskForm, due_date: e.target.value }),
                    style: styles.input,
                }),
                React.createElement("input", {
                    type: "number",
                    placeholder: "Employee ID (optional)",
                    value: taskForm.employee_id,
                    onChange: (e) => setTaskForm({ ...taskForm, employee_id: e.target.value }),
                    style: styles.input,
                }),
                React.createElement("button", { type: "submit", style: styles.button }, "Add Task")
            ),
            React.createElement(
                "table",
                { style: styles.table },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        { style: styles.tableHeader },
                        React.createElement("th", { style: styles.th }, "ID"),
                        React.createElement("th", { style: styles.th }, "Title"),
                        React.createElement("th", { style: styles.th }, "Status"),
                        React.createElement("th", { style: styles.th }, "Employee"),
                        React.createElement("th", { style: styles.th }, "Actions")
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    tasks.map((t) =>
                        React.createElement(
                            "tr",
                            { key: t.id, style: styles.tableRow },
                            React.createElement("td", { style: styles.td }, t.id),
                            React.createElement("td", { style: styles.td }, t.title),
                            React.createElement("td", { style: styles.td }, t.status),
                            React.createElement(
                                "td",
                                { style: styles.td },
                                t.employee ? t.employee.name : "Unassigned"
                            ),
                            React.createElement(
                                "td",
                                { style: styles.td },
                                React.createElement(
                                    "button",
                                    {
                                        onClick: () => markTaskDone(t.id),
                                        style: styles.doneBtn,
                                    },
                                    "Done"
                                ),
                                React.createElement(
                                    "button",
                                    {
                                        onClick: () => deleteTask(t.id),
                                        style: styles.deleteBtn,
                                    },
                                    "Delete"
                                )
                            )
                        )
                    )
                )
            )
        )
    );
}

const styles = {
    container: {
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh"
    },
    title: {
        marginBottom: "20px",
        color: "#333"
    },
    card: {
        padding: "20px",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "4px",
        marginBottom: "20px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    input: {
        padding: "8px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px"
    },
    button: {
        padding: "10px 15px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        transition: "background-color 0.3s"
    },
    deleteBtn: {
        padding: "6px 12px",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "12px",
        marginRight: "5px"
    },
    doneBtn: {
        padding: "6px 12px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "12px",
        marginRight: "5px"
    },
    logoutBtn: {
        backgroundColor: "#6c757d",
        width: "auto"
    },
    table: {
        borderCollapse: "collapse",
        width: "100%",
        marginTop: "20px"
    },
    tableHeader: {
        backgroundColor: "#f5f5f5"
    },
    th: {
        border: "1px solid #ddd",
        padding: "12px",
        textAlign: "left",
        fontWeight: "bold"
    },
    td: {
        border: "1px solid #ddd",
        padding: "12px"
    },
    tableRow: {
        backgroundColor: "#fff"
    },
    status: {
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "#d4edda",
        border: "1px solid #c3e6cb",
        borderRadius: "4px",
        color: "#155724"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
    },
    welcomeText: {
        margin: 0,
        color: "#28a745",
        fontSize: "16px"
    }
};

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
