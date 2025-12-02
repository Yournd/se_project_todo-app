import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({ 
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    inputValues.id = uuidv4();
    inputValues.completed = false;
    const newTodo = generateTodo(inputValues);
    section.addItem(newTodo);
    todoCounter.updateTotal(true);
    addTodoPopup.close();
    newTodoValidator.resetValidation();
  }
});
addTodoPopup.setEventListeners();

function handleCheck(completed) {
  todoCounter.updateCompleted(!completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
    todoCounter.updateTotal(false);
  } else {
    todoCounter.updateTotal(false);
  }
}

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  
  return todoElement;
};
  
  addTodoButton.addEventListener("click", () => {
    addTodoPopup.open();
  });

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list"
});

section.renderItems();