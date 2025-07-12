const goalInput = document.getElementById("goalInput");
const addBtn = document.getElementById("addBtn");
const goalList = document.getElementById("goalList");

let goals = JSON.parse(localStorage.getItem("goals")) || [];

function renderGoals() {
  goalList.innerHTML = "";
  goals.forEach((goal, index) => {
    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.textContent = goal.text;
    if (goal.done) textSpan.classList.add("done");

    textSpan.addEventListener("click", () => toggleGoal(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => deleteGoal(index));

    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    goalList.appendChild(li);
  });
}

function addGoal() {
  const text = goalInput.value.trim();
  if (!text) return;

  goals.push({ text, done: false });
  goalInput.value = "";
  updateStorage();
  renderGoals();
}

function toggleGoal(index) {
  goals[index].done = !goals[index].done;
  updateStorage();
  renderGoals();
}

function deleteGoal(index) {
  goals.splice(index, 1);
  updateStorage();
  renderGoals();
}

function updateStorage() {
  localStorage.setItem("goals", JSON.stringify(goals));
}

addBtn.addEventListener("click", addGoal);
goalInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addGoal();
});

renderGoals();
