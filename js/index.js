"use strict";
let listInput = document.getElementById("listInput");
let addItem = document.getElementById("add");
let tasksContainer = document.getElementById("tasksContainer");
let index
let listItems = []
if (localStorage.getItem("listItems")) {
    listItems = JSON.parse(localStorage.getItem("listItems"))
    displayData()
}
// getting input
function inputValue() {
    let labelValue = listInput.value
    if (labelValue) {
        listItems.push({
            task: labelValue,
            completed: false
        })
    }
    displayData()
    localStorage.setItem("listItems", JSON.stringify(listItems))

}
function taskValidate() {
    var regex = /^.{2,17}$/gm;
    if (regex.test(listInput.value)) {
        listInput.classList.add("is-valid")
        listInput.classList.remove("is-invalid")
        return true;
    }
    else {
        listInput.classList.add("is-invalid")
        listInput.classList.remove("is-valid")
        return false;
    }
}

//  make input empty
function clearInputValue() {
    listInput.value = "";
}
//Display data
function displayData() {
    let cartona = '';
    listItems.forEach((item, index) => {
        let checkClass = item.completed ? "checked" : "";
        let lineThrough = item.completed ? "text-decoration-line-through" : "";
        let opacity = item.completed ? "opacity-50" : "";
        let ordering = item.completed && `style = "order: ${listItems.length};"`
        cartona += `<li class=" ${opacity}  " ${ordering}><button class="  my-4 ${checkClass}" onclick="completed(${index})"></button><span class="${lineThrough} ">${item.task}
                    </span> 
                    <div 
class="ms-auto editing"><button  onclick="handleUpdate(${index})"><i class="fa-solid fa-pen-to-square text-warning"></i></button><button  onclick="deleteTask(${index})"><i class="fa-solid fa-x  text-danger"></i></button></div></li>`;
    })
    tasksContainer.innerHTML = cartona
    let deleteAllBtn = document.getElementById("deleteAll");
    if (listItems.length > 0) {
        deleteAllBtn.classList.remove("d-none");
    } else {
        deleteAllBtn.classList.add("d-none");
        addItem.classList.remove("bg-warning")
        addItem.innerHTML = "Add"

    }
}
// add a task
addItem.addEventListener("click", () => {
    if (taskValidate() && !addItem.classList.contains("bg-warning")) {
        inputValue();
        clearInputValue();
        ShowingMsg("Successfully Added", "bg-success")
    }
    else if (taskValidate() && addItem.classList.contains("bg-warning")) {
        update(index);
        clearInputValue();
        ShowingMsg("Successfully Updated", "bg-warning")
    }
    else {
        alert("Task name should contain 2 to 17 char")
    }

})
//updating
function handleUpdate(i) {
    index = i;

    listInput.value = listItems[i].task
    addItem.classList.toggle("bg-warning")
    addItem.innerHTML = "Update"
}
function update(index) {
    if (addItem.classList.contains("bg-warning")) {
        let updatedItems = listItems

        updatedItems[index].task = listInput.value
        localStorage.setItem("listItems", JSON.stringify(updatedItems))
        displayData()
        addItem.classList.toggle("bg-warning")
        addItem.innerHTML = "Add"

        listInput.value
    }
}

// mark as completed
function completed(i) {
    listItems[i].completed = !listItems[i].completed;
    displayData();
    localStorage.setItem("listItems", JSON.stringify(listItems))
    if (listItems[i].completed) { ShowingMsg("Completed", "bg-warning") }

}
//Delete Task

function deleteTask(i) {
    listItems.splice(i, 1);
    displayData();
    localStorage.setItem("listItems", JSON.stringify(listItems))
    ShowingMsg("Deleted", "bg-danger")
}
// deleting all

document.getElementById("deleteAll").addEventListener("click", () => {
    listItems = [];
    displayData();
    localStorage.setItem("listItems", JSON.stringify(listItems))
    ShowingMsg("All Tasks Deleted", "bg-danger")
})

// alert
function ShowingMsg(msg, bg) {
    let alertBox = document.getElementById("alertBox")
    let customAlert = document.createElement("div");
    customAlert.classList.add("customAlert", "mb-3", "rounded", "bg-white")

    customAlert.innerHTML = `        <h5 class=" px-2 py-2">${msg}</h5>
        <div class=" ${bg} "></div>`
    alertBox.appendChild(customAlert)
    // tasksContainer.after(customAlert);
    setTimeout(() => { customAlert.classList.toggle("d-none") }, 3000)
}


