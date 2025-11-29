// Save a single login session
export function saveUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));

  // Save into user list also
  let users = loadAllUsers();
  users.push(user);
  localStorage.setItem("allUsers", JSON.stringify(users));
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

export function logoutUser() {
  localStorage.removeItem("currentUser");
}

// ---------------- USERS LIST ----------------
export function loadAllUsers() {
  return JSON.parse(localStorage.getItem("allUsers") || "[]");
}

export function deleteUser(index) {
  let users = loadAllUsers();
  users.splice(index, 1);
  localStorage.setItem("allUsers", JSON.stringify(users));
}

export function isAdmin() {
  const user = getCurrentUser();
  return user?.role === "admin";
}
