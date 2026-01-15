const loadUserBtn = document.getElementById("btnLoad");
const clearBtn = document.getElementById("btnClear");
const statusDiv = document.getElementById("status");
const resultDiv = document.getElementById("result");

loadUserBtn.addEventListener("click", async () => {
  statusDiv.textContent = "Loading...";
  loadUserBtn.disabled = true;

  resultDiv.classList.add("hidden");
  resultDiv.innerHTML = "";

  try {
    const res = await fetch("https://randomuser.me/api/");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const user = data.results[0];

    resultDiv.innerHTML = `
      <h2 class="text-lg font-semibold mb-2">
        ${user.name.title} ${user.name.first} ${user.name.last}
      </h2>
      <p class="mb-2">
        Email: ${user.email}
      </p>
      <img
        src="${user.picture.large}"
        alt="Avatar of ${user.name.first}"
        class="mx-auto rounded-full"
      />
    `;

    resultDiv.classList.remove("hidden");
    statusDiv.textContent = "Loaded successfully.";
  } catch (err) {
    statusDiv.textContent = `Error: ${err.message}`;
  } finally {
    loadUserBtn.disabled = false;
  }
});

clearBtn.addEventListener("click", () => {
  statusDiv.textContent = "";
  resultDiv.innerHTML = "";
  resultDiv.classList.add("hidden");
});
