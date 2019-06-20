const todoForm = document.querySelector(".toDoForm");
const todoinput = todoForm.querySelector("input");
const todoList = document.querySelector("#todo");

const TODOS_LS = "toDos";

let toDos = [];

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(todo) {
            paintToDo(todo.text);
        });
    }
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const newId = toDos.length + 1;
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(span);
    li.id = newId;
    li.addEventListener("click", deleteToDo);
    todoList.appendChild(li);
    const todoObj = {
        text: text,
        id: newId
    }
    toDos.push(todoObj);
    saveToDos();
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    li.removeChild(btn);

    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(btn.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = todoinput.value;
    paintToDo(currentValue);
    todoinput.value = "";
}

function init() {
    loadToDos();
    todoForm.addEventListener("submit", handleSubmit);
}

init();