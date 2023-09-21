import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://project-cb272-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const todoListInDb = ref(database, "todoList")

const inputFieldEl = document.getElementById("input-field")
const listBtnEl = document.getElementById("list-btn")
const todoListEl = document.getElementById("todo-list")

listBtnEl.addEventListener("click", function(){
    let listValue = inputFieldEl.value
    push(todoListInDb, listValue)
    todoListEl.innerHTML += `<li> ${listValue} </li>`
})