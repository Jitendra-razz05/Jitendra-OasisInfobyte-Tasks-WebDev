const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async function (event) {
event.preventDefault();

const username = document
    .getElementById("username")
    .value.trim();

const email = document
    .getElementById("email")
    .value.trim()
    .toLowerCase();

const password = document
    .getElementById("password")
    .value;

// Check empty fields
if (!username || !email || !password) {
    showMessage("Please fill in all fields.");
    return;
}

// Password must contain at least 8 characters and 1 number
if (password.length < 8 || !/[0-9]/.test(password)) {
    showMessage(
        "Password must be at least 8 characters and contain a number."
    );
    return;
}

// Check for duplicate username or email
const users = getUsers();

const duplicate = users.some(user =>
    user.username.toLowerCase() === username.toLowerCase() ||
    user.email === email
);

if (duplicate) {
    showMessage("Username or email already exists.");
    return;
}

try {
    const passwordHash = await hashPassword(password);

    users.push({
        username: username,
        email: email,
        passwordHash: passwordHash
    });

    saveUsers(users);

    showMessage(
        "Registration successful! Redirecting to login...",
        true
    );

    registerForm.reset();

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);

} catch {
    showMessage(
        "Password hashing failed. Please use a supported browser context."
    );
}


});
