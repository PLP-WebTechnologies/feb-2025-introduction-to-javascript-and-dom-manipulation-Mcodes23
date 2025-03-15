fetch("http://localhost:3000/users")
  .then((response) => response.json())
  .then((users) => {
    window.userData = users;
  })
  .catch((error) => console.error("Error loading users:", error));

function filterData() {
  const users = window.userData;
  const filterType = document.getElementById("filter-options").value;
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  if (filterType === "active") {
    // Filter active users
    const activeUsers = users.filter((user) =>
      user.posts.some((post) => new Date(post.timestamp) >= oneWeekAgo)
    );

    outputDiv.innerHTML =
      `<h3>Active Users:</h3>` +
      activeUsers
        .map(
          (user) => `
              <div class="user-box">
                  <strong>${user.name}</strong> (${user.location}) 
                  <p>Friends: ${user.friends.length}</p>
              </div>
          `
        )
        .join("");
  } else if (filterType === "popular") {
    // Filter popular posts (from active users) with 10+ likes
    const activeUsers = users.filter((user) =>
      user.posts.some((post) => new Date(post.timestamp) >= oneWeekAgo)
    );

    const popularPosts = activeUsers.flatMap((user) =>
      user.posts.filter((post) => post.likes >= 10)
    );

    outputDiv.innerHTML =
      `<h3>Popular Posts:</h3>` +
      popularPosts
        .map(
          (post) => `
              <div class="user-box">
                  <p>${post.content}</p>
                  <p><strong>Likes:</strong> ${post.likes}</p>
              </div>
          `
        )
        .join("");
  } else if (filterType === "average") {
    // Calculate average likes per active user
    const activeUsers = users.filter((user) =>
      user.posts.some((post) => new Date(post.timestamp) >= oneWeekAgo)
    );

    const popularPosts = activeUsers.flatMap((user) =>
      user.posts.filter((post) => post.likes >= 10)
    );

    const totalLikes = popularPosts.reduce((sum, post) => sum + post.likes, 0);
    const avgLikes =
      activeUsers.length > 0 ? (totalLikes / activeUsers.length).toFixed(2) : 0;

    outputDiv.innerHTML = `<h3>Average Likes per Active User:</h3><p>${avgLikes} Likes</p>`;
  } else {
    // Show all users
    outputDiv.innerHTML =
      `<h3>All Users:</h3>` +
      users
        .map(
          (user) => `
              <div class="user-box">
                  <strong>${user.name}</strong> (${user.location}) 
                  <p>Friends: ${user.friends.length}</p>
              </div>
          `
        )
        .join("");
  }
}
