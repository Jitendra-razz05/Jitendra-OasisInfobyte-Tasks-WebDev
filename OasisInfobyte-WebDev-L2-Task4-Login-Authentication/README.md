# 🔐 Login Authentication System

A simple and responsive Login Authentication System developed using HTML, CSS, and JavaScript. This project allows users to register an account, log in with their credentials, access a protected dashboard, and log out securely within a browser-based demonstration.

## 📌 Project Overview

The Login Authentication System provides a basic authentication workflow with registration, login validation, password hashing, session management, and logout functionality.

Users can create an account using their username, email address, and password. After successful registration, they can log in using their email and password to access a personalized dashboard displaying their username and email address.

This project was developed to understand the fundamentals of authentication, client-side form validation, browser storage, and session handling.

## 🌐 Live Demo

## 📂 GitHub Repository

## ✨ Features

- **User Registration:** Create an account using a username, email, and password.
- **Form Validation:** Check for empty fields and validate password requirements.
- **Password Validation:** Require a minimum of 8 characters and at least one number.
- **Duplicate Account Prevention:** Check whether the username or email is already registered.
- **Password Hashing:** Use the SHA-256 algorithm to hash passwords before storing them.
- **User Login:** Authenticate registered users using their email and password.
- **Error Handling:** Display a common error message for invalid login credentials.
- **Session Management:** Use `sessionStorage` to maintain the current login session.
- **Protected Dashboard:** Redirect users to the login page when a valid session is missing.
- **Personalized Dashboard:** Display the logged-in user's username and email.
- **Logout Functionality:** Clear the current login session and redirect to the login page.
- **Responsive Design:** Provide a user-friendly interface for desktop and mobile screens.

## 🛠️ Technologies Used

| Technology     | Purpose                                            |
| -------------- | -------------------------------------------------- |
| HTML5          | Structure of the web pages                         |
| CSS3           | Styling, layout, animations, and responsive design |
| JavaScript     | Form validation and authentication logic           |
| Web Crypto API | SHA-256 password hashing                           |
| localStorage   | Store registered user data in the browser          |
| sessionStorage | Store the current login session                    |

## 📁 Project Structure

```text
Login-Authentication/
│
├── index.html
├── register.html
├── dashboard.html
├── README.md
│
├── css/
│   └── style.css
│
└── js/
    ├── auth.js
    ├── login.js
    ├── register.js
    └── dashboard.js
```

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### Step 1: Download or Clone the Project

Download the project files or clone the repository to your computer.

```bash
git clone YOUR_REPOSITORY_URL
```

Replace `YOUR_REPOSITORY_URL` with your actual Git repository URL.

### Step 2: Open the Project

Open the project folder in Visual Studio Code.

### Step 3: Check the File Structure

Make sure the HTML files, CSS folder, and JavaScript folder are arranged as shown in the project structure above.

### Step 4: Run the Application

Open `index.html` using the Live Server extension in Visual Studio Code.

Using a local development server is recommended because the Web Crypto API may not work in every browser context.

### Step 5: Register and Log In

1. Open the registration page.
2. Enter a username, email address, and password.
3. Complete the registration.
4. Return to the login page.
5. Enter the registered email and password.
6. Access the dashboard after successful authentication.
7. Click the Logout button to end the current session.

## 🔄 How the Project Works

### 1. User Registration

The user enters a username, email address, and password in the registration form.

The `register.js` file validates the input, checks for duplicate usernames and email addresses, hashes the password, and saves the registered user information using `localStorage`.

### 2. User Login

The user enters their registered email address and password.

The `login.js` file finds the registered account, hashes the entered password, and compares the result with the stored password hash.

If the credentials are valid, the application creates a login session and redirects the user to the dashboard.

### 3. Dashboard Access

The `dashboard.js` file checks the current session and verifies that the corresponding registered user exists.

The dashboard displays the logged-in user's username and email address.

If a valid session is missing, the application redirects the user to the login page.

### 4. Logout

When the user clicks the Logout button, the application removes the current session from `sessionStorage` and redirects the user to the login page.

## 📄 File Descriptions

| File              | Description                                                                   |
| ----------------- | ----------------------------------------------------------------------------- |
| `index.html`      | Contains the login form                                                       |
| `register.html`   | Contains the user registration form                                           |
| `dashboard.html`  | Displays the personalized dashboard                                           |
| `css/style.css`   | Defines the styling and responsive layout                                     |
| `js/auth.js`      | Provides shared functions for user data, password hashing, and session checks |
| `js/register.js`  | Handles registration and form validation                                      |
| `js/login.js`     | Handles login verification and session creation                               |
| `js/dashboard.js` | Handles dashboard access, user information, and logout                        |

## 🔒 Security Considerations

This project is intended for learning and demonstration purposes.

- Passwords are hashed using SHA-256 rather than being stored as plain text.
- Registered user information is stored in browser `localStorage`.
- The current login session is stored in browser `sessionStorage`.
- Client-side authentication can be bypassed or manipulated by users.
- SHA-256 alone is not recommended for production password storage.
- A production application should use server-side authentication, secure password hashing such as Argon2id or bcrypt, and server-enforced access controls.

**Important:** This project demonstrates basic authentication concepts and should not be used to protect sensitive user information in a production environment.

## 🎯 Learning Outcomes

Through this project, I learned how to:

- Build login and registration forms using HTML.
- Style responsive web pages using CSS.
- Validate user input using JavaScript.
- Store and retrieve browser data using `localStorage`.
- Manage browser sessions using `sessionStorage`.
- Hash passwords using the Web Crypto API.
- Implement basic login and logout workflows.
- Display user-specific information on a dashboard.
- Organize a project into separate HTML, CSS, and JavaScript files.

## 🚀 Future Improvements

Potential improvements include:

- Integrating a backend authentication system.
- Using a database to store user accounts.
- Implementing server-side password hashing.
- Adding email verification and password reset functionality.
- Introducing secure server-managed sessions.
- Adding automated tests for registration and login.

## 👨‍💻 Author

**Jitendra Rajpurohit**

Web Development Project

## 📜 License

This project was created for educational and learning purposes.
