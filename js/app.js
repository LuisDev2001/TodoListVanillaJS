(function load() {
  console.log("JS CONNECT! :)");
  const $form = document.getElementById("js_form-task");
  const $containerTask = document.getElementById("js_container-task");

  /**
   * Function to print a new task
   * @param {*} taskValue
   * @param {*} $container
   */
  function templateTask(taskValue, $container) {
    return ($container.innerHTML += `
      <li class="print-task-item">
        <span>
          <input type="checkbox" />
          <span class="task">${taskValue}</span>
          <input type="text" class="input-edit" />
        </span>
        <section class="buttons-actions">
          <div class="js_delete"></div>
          <div class="js_edit_update"></div>
        </section>
      </li>
    `);
  }

  /**
   * Action for delete a task
   * @param {*} $btnDelete
   */
  function deleteTask($btnDelete) {
    const btnContent = $btnDelete.target.parentNode;
    const li = btnContent.parentNode;
    const ul = li.parentNode;
    ul.removeChild(li);
  }

  /**
   * Action for edit and Update Task
   * @param {*} $btnEdit
   */
  function editAndUpdateTask($btnEdit) {
    const btnContent = $btnEdit.target.parentNode;
    const $btnEditUpdate = btnContent.querySelector(".js_edit_update");
    const li = btnContent.parentNode;
    const task = li.querySelector(".task");
    //This is the old value
    const oldValue = task.innerText.trim();
    const inputEdit = li.querySelector(".input-edit");
    //Set attribute for save value
    inputEdit.setAttribute("value", oldValue);
    //Get new value for the input
    const newValue = inputEdit.value;
    //Replace new task in the span element
    task.innerText = newValue;
    li.classList.toggle("active-edit__mode");
    $btnEditUpdate.classList.toggle("active");
  }

  /**
   * Event for put line-through in a text
   * @param {*} $checbox
   */
  function taskEnded($checbox) {
    const contetnCheckbox = $checbox.target.parentNode;
    const task = contetnCheckbox.querySelector(".task");
    task.classList.add("ended");
  }

  $containerTask.addEventListener("click", (event) => {
    /**
     * Event for delete, edit and update buttons a task
     */
    if (event.target.className === "js_delete") {
      console.log("Eliminar");
      deleteTask(event);
    } else if (
      event.target.className === "js_edit_update" ||
      event.target.className === "js_edit_update active"
    ) {
      console.log("Editar and update");
      editAndUpdateTask(event);
    } else if (event.target.type === "checkbox") {
      console.log("Task ended");
      taskEnded(event);
    } else {
      return false;
    }
  });

  //Submit a newTask
  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event);
    const data = new FormData($form);
    const inputTaskValue = data.get("text_Task");
    const $messageEmptyTask = document.getElementById("js_message-empty-task");
    $messageEmptyTask.classList.remove("active");
    document.getElementById("input-task").value = "";
    /**
     * When the form submit information print task in the list
     */
    templateTask(inputTaskValue, $containerTask);
  });
})();
