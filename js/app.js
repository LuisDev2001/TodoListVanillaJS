(function load() {
  console.log("JS CONNECT :)");
  const $form = document.querySelector("#js_form-task");
  const $emptyContainer = document.querySelector("#js_message-empty-task");
  const $containerTask = document.querySelector("#js_container-task");
  const URL_API = "http://localhost:3000/response";

  /**
   * Function to get information from to API
   */
  async function getTaskAPI() {
    try {
      const data = await fetch(URL_API);
      const information = await data.json();
      return information;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Function to print Task from API
   */
  async function printTaskAPI() {
    $emptyContainer.classList.remove("active");
    const api_information = await getTaskAPI();
    for (const d of api_information) {
      console.log(d);
      let state_validation = {
        checked: "",
        classEnded: "",
      };

      //Validate state
      d.state
        ? (state_validation = { checked: "checked", classEnded: "ended" })
        : (state_validation = { checked: "", classEnded: "" });

      $containerTask.innerHTML += `
        <li class="print-task-item">
          <span>
            <input type="checkbox" ${state_validation.checked}/>
            <span class="task ${state_validation.classEnded}">${d.task}</span>
            <input type="text" class="input-edit" />
            <input type="hidden" class="task-id" value="${d.id}"/>
          </span>
          <section class="buttons-actions">
            <div class="js_delete"></div>
            <div class="js_edit"></div>
          </section>
        </li>      
      `;
    }
  }

  /**
   * Function to post task in my own API
   * @param {*} task
   */
  async function postTask(task) {
    try {
      const setting = {
        method: "POST",
        body: JSON.stringify({
          task: task,
          state: false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const data = await fetch(URL_API, setting);
      const information = await data.json();
      return information;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Function to delete task from my own API
   * @param {*} taskId
   */
  async function deleteTaskAPI(taskId) {
    try {
      const data = await fetch(`${URL_API}/${taskId}`, {
        method: "DELETE",
      });
      const information = data.json();
      return information;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateTaskAPI(taskId, task, stateTask) {
    try {
      const setting = {
        method: "PUT",
        body: JSON.stringify({
          task: task,
          state: stateTask,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const data = await fetch(`${URL_API}/${taskId}`, setting);
      const information = await data.json();
      return information;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Function to print HTML in DOM
   * @param {*} $container
   * @param {*} task
   */
  function printTaskHtml($container, task) {
    $container.innerHTML += `
      <li class="print-task-item">
        <span>
          <input type="checkbox"/>
          <span class="task">${task}</span>
          <input type="text" class="input-edit" />
        </span>
        <section class="buttons-actions">
          <div class="js_delete"></div>
          <div class="js_edit"></div>
        </section>
      </li>
    `;
  }

  /**
   * Function to delete task
   * @param {*} $btnDelete
   */
  async function deleteTask($btnDelete) {
    const ul = $btnDelete.target.parentNode.parentNode.parentNode;
    const li = $btnDelete.target.parentNode.parentNode;
    const taskId = li.querySelector(".task-id").value;
    console.log(taskId);
    ul.removeChild(li);
    await deleteTaskAPI(taskId);
  }

  /**
   * Function to edit task
   * @param {*} $btnEdit
   */
  function editTask($btnEdit) {
    const li = $btnEdit.target.parentNode.parentNode;
    const btnUpdateActive = li.querySelector(".js_edit");
    const textTaskSpan = li.querySelector(".task").innerText;
    const inputEdit = li.querySelector(".input-edit");
    inputEdit.value = textTaskSpan;
    inputEdit.setAttribute("value", textTaskSpan);
    btnUpdateActive.classList.add("update");
    li.classList.add("active-edit__mode");
  }

  /**
   * Function to update task
   * @param {*} $btnUpdate
   */
  async function updateTask($btnUpdate) {
    const li = $btnUpdate.target.parentNode.parentNode;
    const btnUpdateActive = li.querySelector(".js_edit");
    const textTaskSpan = li.querySelector(".task");
    const inputEdit = li.querySelector(".input-edit");
    const taskId = li.querySelector(".task-id").value;
    const inputCheckbox = li.querySelector("input[type='checkbox']").checked;

    textTaskSpan.textContent = inputEdit.value;
    btnUpdateActive.classList.remove("update");
    li.classList.remove("active-edit__mode");

    await updateTaskAPI(taskId, textTaskSpan.textContent, inputCheckbox);
  }

  /**
   * Function to check a task
   * @param {*} $checbox
   */
  function checkedTask($checbox) {
    const spanParent = $checbox.target.parentNode;
    const task = spanParent.querySelector(".task");
    const inputCheckbox = spanParent.querySelector("input[type='checkbox']");
    inputCheckbox.setAttribute("checked", "");
    task.classList.toggle("ended");
  }

  /**
   * Event for submit
   */
  $form.addEventListener("submit", async (event) => {
    event.preventDefault();
    //Start use FormData
    const data = new FormData($form);
    const taskText = data.get("text_Task");
    document.querySelector("#input-task").value = "";
    $emptyContainer.classList.remove("active");
    printTaskHtml($containerTask, taskText);
    await postTask(taskText);
  });

  $containerTask.addEventListener("click", (event) => {
    if (event.target.className === "js_delete") {
      deleteTask(event);
    } else if (event.target.className === "js_edit") {
      editTask(event);
    } else if (event.target.className === "js_edit update") {
      updateTask(event);
    } else if (event.target.type === "checkbox") {
      checkedTask(event);
    }
  });

  window.addEventListener("load", async () => {
    console.log("TAREAS CARGADAS...");
    await printTaskAPI();
  });
})();
