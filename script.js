import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"


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
    clearInputField()
    
})

function clearInputField(){
    inputFieldEl.value = ""
}

onValue(todoListInDb, function(snapshot){

    if (snapshot.exists()){
        let itemArray = Object.entries(snapshot.val())

        todoListEl.innerHTML = ""

        for(let i=0; i < itemArray.length; i++){
            let currentItem = itemArray[i]
            let currentitemId = currentItem[0]
            let currentitemValue = currentItem[1]

            inputValueAppear(currentItem)
        }
    } else {
        todoListEl.innerHTML="No items here..."
    }
})

function inputValueAppear(item){
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function(){
        let locationDatabase = ref(database, `todoList/${itemID}`) 
        remove(locationDatabase)
    })

    todoListEl.append(newEl)
}