function load() {
  const $form = document.getElementById("js_form-task");
  const $containerTask = document.getElementById("js_container-task");
  const $btnSubmit = document.querySelector("#js_btn-send");

  function templateTask(taskValue, $container) {
    return ($container.innerHTML += `
      <li class="print-task-item">
        <span>
          <input type="checkbox" />
          <span class="task">${taskValue}</span>
          <input type="text" id="js_input-edit" />
        </span>
        <section class="buttons-actions">
          <div id="js_delete"></div>
          <div id="js_edit"></div>
          <div id="js_update" style="display: none;"></div>
        </section>
      </li>
    `);
  }

  function deleteTask(event) {
    const btnContent = event.target.parentNode;
    const item = btnContent.parentNode;
    const ul = item.parentNode;
    ul.removeChild(item);
  }

  function editTask(event) {
    const btnContent = event.target.parentNode;
    const item = btnContent.parentNode;
    let text = item.querySelector(".task").textContent.trim();
    const $btnEdit = document.querySelector("#js_edit");
    const $btnUpdate = document.querySelector("#js_update");
    const editInput = document.querySelector("#js_input-edit");
    $btnEdit.style.display = "none";
    $btnUpdate.style.display = "flex";

    item.classList.add("active-edit__mode");
    editInput.setAttribute("value", text);

    $btnUpdate.addEventListener("click", () => {
      console.log("Click");
      item.querySelector(".task").textContent = editInput.value;
      item.classList.remove("active-edit__mode");
      $btnEdit.style.display = "flex";
      $btnUpdate.style.display = "none";
    });
  }

  //Submit a newTask
  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData($form);
    const inputTaskValue = data.get("text_Task");
    const $messageEmptyTask = document.getElementById("js_message-empty-task");
    $messageEmptyTask.classList.remove("active");
    document.getElementById("input-task").value = "";
    templateTask(inputTaskValue, $containerTask);

    //Delete a task
    const $btnDelete = document.querySelectorAll("#js_delete");
    $btnDelete.forEach((element) => {
      element.addEventListener("click", deleteTask);
    });

    //Edit task
    const $btnEdit = document.querySelectorAll("#js_edit");
    $btnEdit.forEach((element) => {
      element.addEventListener("click", editTask);
    });
  });
}

load();
