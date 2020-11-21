(function load() {
  console.log("JS CONNECT! :)");
  const $form = document.getElementById("js_form-task");
  const $containerTask = document.getElementById("js_container-task");
  const $messageEmptyTask = document.getElementById("js_message-empty-task");

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
  function taskEnded($checkbox) {
    const contentCheckbox = $checkbox.target.parentNode;
    const task = contentCheckbox.querySelector(".task");
    const checkbox = contentCheckbox.querySelector("input[type='checkbox']");
    checkbox.setAttribute("checked", true);
    task.classList.toggle("ended");
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

  /**
   * Function to get task for my own bd
   */
  const getTask = async () => {
    const data = await fetch("./bd/bd.json");
    const information = await data.json();
    return information;
  };

  /**
   * Function to print information in to my structure
   */
  const printInformationBd = (async () => {
    const data = await getTask();
    for (const d of data) {
      $containerTask.innerHTML += `
        <li class="print-task-item">
          <span>
            <input type="checkbox" />
            <span class="task">${d.task}</span>
            <input type="text" class="input-edit" />
          </span>
          <section class="buttons-actions">
            <div class="js_delete"></div>
            <div class="js_edit_update"></div>
          </section>
        </li>        
      `;
    }
  })();

  /*const postTask = (async () => {
    const response = await fetch("./bd/bd.json", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: 3, task: "Prueba 3" }),
    });
    const data = await response.json();
    console.log(data);
  })();*/

  //Submit a newTask
  $form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData($form);
    const inputTaskValue = data.get("text_Task");
    $messageEmptyTask.classList.remove("active");
    document.getElementById("input-task").value = "";
    /**
     * When the form submit information print task in the list
     */
    templateTask(inputTaskValue, $containerTask);
  });

  if ($containerTask.querySelectorAll("li").length >= 0) {
    //Remove class active to empty content
    $messageEmptyTask.classList.remove("active");
  } else if ($containerTask.querySelectorAll("li").length === 0) {
    $messageEmptyTask.classList.add("active");
  }
})();
