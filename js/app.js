const elYears = document.querySelector('.years');
const elMonth = document.querySelector('.month');
const elDays = document.querySelector('.days');
const elHours = document.querySelector('.hours');
const elMinutes = document.querySelector('.minutes');
const elSeconds = document.querySelector('.seconds');


function zero(num) {
  if(num >= 0 && num < 10) {
    return `0${num}`
  } else {
    return num;
  }
}

const nowMoth = [ 
'January',
'February ',
'March',
'April',
'May ',
'June',
'July',
'August',
'September',
'October',
'November ',
'December'
]

function newTime() {
  const elData = new Date();

  let years = elData.getFullYear();
  let month = nowMoth[elData.getMonth()];
  let todoMonth = elData.getMonth();
  let days = elData.getDate();
  let hours = elData.getHours();
  let minutes = elData.getMinutes();
  let seconds = elData.getSeconds();

  elYears.textContent = zero(years);
  elMonth.textContent = month;
  // elMonth.textContent = month;
  elDays.textContent = zero(days);
  elHours.textContent = zero(hours);
  elMinutes.textContent = zero(minutes);
  elSeconds.textContent = zero(seconds);

  return `${zero(hours)}:${zero(minutes)} / ${zero(days)}.${zero(todoMonth)}.${zero(years)}`
}

newTime();

setInterval(() => {
  newTime();
}, 1000);


const elForm = document.querySelector('.js-form');
const elModal = document.querySelector('.modal');

const elJsBtn = document.querySelector('.js-btn');
const elNewTodo = document.querySelector('.todolist');
const elJsInput = document.querySelector('.js-input');
const elClouthBnt = document.querySelector('.clouth-btn');
const elCreateMessage = document.querySelector('.create-message');

// Modal
const elModalForm = document.querySelector('.js-modal-form');
const elModalInput = document.querySelector('.js-modal-input');
const elModalButton = document.querySelector('.js-modal-button');
const elCloseModal = document.querySelector('.js-close-modal') 

let editItemId


let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : [];

// setItem
function setTodos() {
  localStorage.setItem('list', JSON.stringify(todos));
}

function showTodos() {
  const todos = JSON.parse(localStorage.getItem('list'));
  
  elNewTodo.innerHTML = '';

  todos.forEach((item, i) => {
    elNewTodo.innerHTML += `
      <li ondblclick="activeTodo(${i})" class="todolist__message ${item.completed == true ? 'completed' : ''}">
        <p class="todolist__content">${item.text}</p>
        <span class="todolist__time">${item.time}</span>
        <img onclick=(editModal(${i})) class="todolist__btn js-edit" src="img/edit.svg" alt="edit Icon" width="20" height="20">
        <img onclick=(deleteTodo(${i})) class="todolist__btn js-delete" src="img/deleted.svg" alt="delete Icon" width="20" height="20">
      </li>
    `
  })
}


// show error
function showMessage(where, message) {
  document.querySelector(`${where}`).textContent = message

  setTimeout(() => {
    document.querySelector(`${where}`).textContent = '';
  }, 2500);
}


elForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoText = elJsInput.value.trim()

  elForm.reset()
  if (todoText.length) {
    todos.push({text : todoText, time : newTime(), completed : false})
    setTodos();
    showTodos();
  } else {
    showMessage('.create-message', 'Please, enter some text ...');
  }  
})

// Edit Todo
elModalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoText = elModalInput.value.trim()

  elModalForm.reset()
  if (todoText.length) {
    todos.splice(editItemId, 1, {text : todoText, time : newTime(), completed : false})
    setTodos();
    showTodos();
    close();

  } else {
    showMessage('.modal__create-message', 'Please, enter some text ...');
  }  
})

// Delete function
function deleteTodo(id) {
  const deletedtodos = todos.filter((item, i) => {
    return i !== id;
  })

  todos = deletedtodos;
  setTodos();
  showTodos();
}
deleteTodo();

function activeTodo(id) {
  const completeTodos = todos.map((item, i) => {
    if(i == id) {
      return {...item, completed: item.completed ==  true ? false : true}
    } else {
      return {...item}
    }
  })

  todos = completeTodos;
  setTodos();
  showTodos();
}

function editModal(id) {
  open();
  editItemId = id
}

elCloseModal.addEventListener('click', () => {
  close()
})

function open() {
  elModal.classList.remove('hidden')
}

function close() {
  elModal.classList.add('hidden')
}


document.addEventListener('keydown', (e) => {
  if (e.which == 27) {
    close();
  }
})