let draggableItems = document.getElementsByClassName('task');
let dropableDivs = document.getElementsByClassName("swim-lane");

function dragCb(event) {
    event.target.classList.add("is-dragging");
}

function dragendCB(event) {
    event.target.classList.remove("is-dragging");

}

for (let task of draggableItems) {
    task.addEventListener("dragstart", dragCb);
    task.addEventListener("dragend", dragendCB);
}

for (let dropableDiv of dropableDivs) {

    dropableDiv.addEventListener("dragover", function dragoverCB(event) {
        event.preventDefault()
        const currentTask = document.querySelector(".is-dragging");
        console.log(currentTask);

        const bottomTask = insertAboveTask(dropableDiv, event.clientY);

        if (!bottomTask) dropableDiv.appendChild(currentTask);
        else dropableDiv.insertBefore(currentTask, bottomTask);


    });
}

function insertAboveTask(dropableDiv, mouseY) {

    const currentDroppableDivTasks = 
       dropableDiv.getElementsByClassName("task");
    
    let closestTask=null;
    let closestOffset = Number.NEGATIVE_INFINITY;
    
    for( let task of currentDroppableDivTasks) {
        const { top } = task.getBoundingClientRect();

        const offset = mouseY - top;
        
        if (offset< 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    }

    return closestTask;
}

console.log();





