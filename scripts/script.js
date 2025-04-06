// First function: Fetch user data from API
async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    document.getElementById("usersContainer").innerHTML =
      '<p class="error">Failed to load user data. Please try again later.</p>';
  }
}

// Second function: Display users on the page
function displayUsers(users) {
  const container = document.getElementById("usersContainer");
  container.innerHTML = "";

  users.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.className = "user-card";

    userCard.innerHTML = `
                <h2>${user.name}</h2>
                <p><strong>Username:</strong> ${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                
                <div class="additional-info" id="info-${user.id}">
                    <p><strong>City:</strong> ${user.address.city}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                    <p><strong>Company:</strong> ${user.company.name}</p>
                </div>
                
                <button class="toggle-btn" data-userid="${user.id}">Show More</button>
            `;

    container.appendChild(userCard);
  });

  // Add event listeners to all buttons
  document.querySelectorAll(".toggle-btn").forEach((button) => {
    button.addEventListener("click", toggleAdditionalInfo);
  });
}

// Helper function to toggle additional info
function toggleAdditionalInfo(event) {
  const userId = event.target.getAttribute("data-userid");
  const infoDiv = document.getElementById(`info-${userId}`);
  const button = event.target;

  if (infoDiv.style.display === "block") {
    infoDiv.style.display = "none";
    button.textContent = "Show More";
  } else {
    infoDiv.style.display = "block";
    button.textContent = "Show Less";
  }
}

// Initialize the page
document.addEventListener("DOMContentLoaded", fetchUsers);

console.dir(document);
