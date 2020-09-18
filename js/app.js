function load() {
  const $form = document.getElementById("js_form-task");
  const $containerTask = document.getElementById("js_container-task");

  function templateTask(taskValue, $container) {
    return ($container.innerHTML += `
      <li class="print-task-item">
        <span>
          <input type="checkbox" />
          ${taskValue}
        </span>
        <section class="buttons-actions">
          <div id="js_delete">
            <i class="far fa-trash-alt"></i>
          </div>
          <div id="js_edit">
            <i class="fas fa-pencil-alt"></i>
          </div>
        </section>
      </li>
    `);
  }

  function eventDeleteTask($btnDelete) {
    $btnDelete.forEach((element) => {
      element.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Click Eliminar");
      });
    });
  }

  function eventEditTask($btnEdit) {
    $btnEdit.forEach((element) => {
      element.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Click edit");
      });
    });
  }

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData($form);
    const inputTaskValue = data.get("text_Task");
    templateTask(inputTaskValue, $containerTask);

    const $btnDelete = document.querySelectorAll("#js_delete");
    eventDeleteTask($btnDelete);

    const $editButton = document.querySelectorAll("#js_edit");
    eventEditTask($editButton);

    document.getElementById("input-task").value = "";
  });
}

load();
