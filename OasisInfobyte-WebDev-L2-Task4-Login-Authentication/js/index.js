const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async function (event) {
event.preventDefault();


const email = document
    .getElementById("email")
    .value
    .trim()
    .toLowerCase();

const password = document
    .getElementById("password")
    .value;

// Check empty fields
if (!email || !password) {
    showMessage("Please enter your email and password.");
    return;
}

try {
    // Get registered users
    const users = getUsers();

    // Find user by email
    const user = users.find(
        item => item.email === email
    );

    // Show the same error for invalid credentials
    if (!user) {
        showMessage("Invalid email or password.");
        return;
    }

    // Hash the entered password
    const passwordHash = await hashPassword(password);

    // Verify password
    if (passwordHash !== user.passwordHash) {
        showMessage("Invalid email or password.");
        return;
    }

    // Create login session
    sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ email: user.email })
    );

    // Redirect to dashboard
    window.location.href = "dashboard.html";

} catch (error) {
    console.error(error);
    showMessage("Login failed. Please try again.");
}


});
