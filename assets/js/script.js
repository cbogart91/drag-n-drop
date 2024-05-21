// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const formEl = $('filledModal');
const taskEl = $('taskTitle');
const dueEl = $('taskDueDate');
const descriptionEl = $('taskDescription');

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const card =$(`
  <div class="card${c} " id='${task[ID]}'>
  <div class="card-body">
  <h5 class ="card-title">${task[TITLE]}</h5>
  <h6 class="card-subtitle">$dayjs(
    dayjs(task[DUEDATE])
  ).format('MM/DD/YYYY')}</h6>
  <p class='card-text'>${task[DESCRIPTION]}</p>
  <button class='btn-delete btn btn-primary" data-id="${task[ID]}">Delete</button>
  </div>
  </div>
`)
.data('text', task[ID])
.draggable({
  cursor: "move",
  revert: true,
});
return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
const handleAddTask = function(event){
  event.preventDefault();
  const task = taskEl.val();
  const due = dueEl.val();
  const description = descriptionEl.val();

  if (!task || !due || description) {
    console.log("Please fill out the form completely!");
    return;
  }
printCard(task, due, description);
}

formEl.on('submit', handleAddTask);

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}



// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

$(function () {
    $('#datepicker').datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });

