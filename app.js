document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: email,
      password: password,
      expiresInMins: 30,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        alert("Login successful!");

        const token = data.token;
        const refreshToken = data.refreshToken;

        fetchUserInfo(token);

        refreshAuthToken(refreshToken);
      } else {
        alert("Login failed: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
});

function fetchUserInfo(token) {
  fetch("https://dummyjson.com/auth/me", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("User Info:", data);
    })
    .catch((error) => {
      console.error("Error fetching user info:", error);
    });
}

function refreshAuthToken(refreshToken) {
  fetch("https://dummyjson.com/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: refreshToken,
      expiresInMins: 30,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Refreshed Token:", data);
    })
    .catch((error) => {
      console.error("Error refreshing token:", error);
    });
}

function cancelLogin() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}
