const USERS_KEY = "auth_users";
const SESSION_KEY = "auth_session";

// Get registered users
function getUsers() {
try {
const users = JSON.parse(
localStorage.getItem(USERS_KEY) || "[]"
);

    return Array.isArray(users) ? users : [];
} catch {
    return [];
}


}

// Save registered users
function saveUsers(users) {
localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Create SHA-256 password hash
async function hashPassword(password) {
const data = new TextEncoder().encode(password);


const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    data
);

const hashArray = Array.from(new Uint8Array(hashBuffer));

return hashArray
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");


}

// Show a message
function showMessage(text, success = false) {
const message = document.getElementById("message");


message.textContent = text;
message.classList.toggle("success", success);

}

// Get logged-in session
function getSession() {
try {
return JSON.parse(
sessionStorage.getItem(SESSION_KEY) || "null"
);
} catch {
return null;
}
}

// Check whether the session belongs to a registered user
function isLoggedIn() {
const session = getSession();


if (!session || typeof session.email !== "string") {
    return false;
}

return getUsers().some(user =>
    user.email === session.email
);


}
