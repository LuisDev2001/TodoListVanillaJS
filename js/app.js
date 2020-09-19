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
          <div id="js_delete"></div>
          <div id="js_edit"></div>
        </section>
      </li>
    `);
  }

  function deleteTask(event) {
    event.preventDefault();
    const btnContent = event.target.parentNode;
    const item = btnContent.parentNode;
    const ul = item.parentNode;
    ul.removeChild(item);
  }

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
  });
}

load();
