// Check whether the user is logged in
if (!isLoggedIn()) {
window.location.replace("login.html");
} else {
// Get the current login session
const session = getSession();

// Find the logged-in user's registered details
const users = getUsers();

const user = users.find(
    item => item.email === session.email
);

if (!user) {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.replace("login.html");
} else {
    // Display the logged-in user's username
    document.getElementById("welcome-message").textContent =
        `Welcome, ${user.username}!`;

    document.getElementById("username-display").textContent =
        user.username;

    // Display the logged-in user's email
    document.getElementById("email-display").textContent =
        user.email;
}

}

// Logout functionality
document.getElementById("logout-button").addEventListener(
"click",
function () {
sessionStorage.removeItem(SESSION_KEY);


    window.location.replace("login.html");
}

);
