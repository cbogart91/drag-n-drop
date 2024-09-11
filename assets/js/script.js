// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
let tasks = taskList || [];



// Todo: create a function to generate a unique task id
function generateTaskId() {
  localStorage.setItem('nextId', JSON.stringify(nextId + 1));
  return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard({ id, taskTitle, taskDueDate, taskDescription }, isDone) {
  const newTaskCard = $(`
    <div class='card task-card mb-3 draggable ${!isDone && compareDates(taskDueDate).cardBg}' data-task='${id}'>
      <h4 class='card-header'>${taskTitle}</h4>
      <div class='card-body'>
        <p>${taskDescription}</p>
        <p>${dayjs(taskDueDate).format('MM/DD/YYYY')}</p>
        <button class='btn btn-danger ${!isDone && compareDates(taskDueDate).btnBorder}'>Delete</button>
      </div>
    </div>
  `);

  newTaskCard.find('button').on('click', handleDeleteTask);
  return newTaskCard;
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  $('#todo-cards').html('');
  $('#in-progress-cards').html('');
  $('#done-cards').html('');

  tasks.forEach((task) => {
    const taskCard = createTaskCard(task, task.isDone);
    if (task.isDone) {
      $('#done-cards').append(taskCard);
    } else if (task.inProgress) {
      $('#in-progress-cards').append(taskCard);
    } else {
      $('#todo-cards').append(taskCard);
    }
  });

  // Make task cards draggable
  $('.draggable').draggable({
    revert: 'invalid',
    helper: 'clone',
    start: function(event, ui) {
      $(ui.helper).addClass('dragging');
    },
    stop: function(event, ui) {
      $(ui.helper).removeClass('dragging');
    }
  });
}
  // Todo: create a function to handle adding a new task
  function handleAddTask(event) {
    event.preventDefault();
  
    const form = event.target;
    $(form).addClass('was-validated');
  
    if (!form.checkValidity()) {
      return;
    }
  
    const taskTitle = $(form).find('input[name="taskTitle"]').val();
    const taskDueDate = $(form).find('input[name="taskDueDate"]').val();
    const taskDescription = $(form).find('textarea[name="taskDescription"]').val();
    const newTask = {
      id: generateTaskId(),
      taskTitle,
      taskDueDate,
      taskDescription,
      status: 'to-do',
    };
  
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
  }
  
  // Todo: create a function to handle deleting a task
  function handleDeleteTask(event) {
    const deleteCardId = $(event.target).closest('.task-card').data('task');
    tasks = tasks.filter((task) => task.id !== deleteCardId);
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
  }
  
  
  
  // Todo: create a function to handle dropping a task into a new status lane
  function handleDrop(event, ui) {
    const taskId = ui.draggable.data('task');
    const newStatus = event.target.id;

    tasks.forEach((task) => {
      if (task.id === taskId) {
        if (newStatus === 'done') {
          task.isDone = true;
          task.inProgress = false;
        } else if (newStatus === 'in-progress') {
          task.isDone = false;
          task.inProgress = true;
        } else {
          task.isDone = false;
          task.inProgress = false;
        }
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
  }
  
  // Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
  $(document).ready(function () {
    $('#taskForm').on('submit', handleAddTask);
  
    $(function() {
      $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
      });
    });
  
    if (!taskList) {
      tasks = [];
    } else {
      tasks = taskList;
    }
      renderTaskList();
  });


  // Function to compare dates and return appropriate classes
function compareDates(dueDate) {
  const currentDate = dayjs();
  const taskDueDate = dayjs(dueDate);

  if (taskDueDate.isBefore(currentDate, 'day')) {
    return {
      cardBg: 'bg-danger',
      btnBorder: 'border-danger'
    };
  } else if (taskDueDate.isSame(currentDate, 'day')) {
    return {
      cardBg: 'bg-warning',
      btnBorder: 'border-warning'
    };
  } else {
    return {
      cardBg: 'bg-success',
      btnBorder: 'border-success'
    };
  }
}
