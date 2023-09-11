var count = 0;
var tasks = [];



const taskList = document.querySelector('.task-list')
const addTask = document.querySelector('.addtask')

// creates new task element 
function newTaskElement () {

    const val = count
    count += 1                                              // increments the count of the task by 1

    /* task tag  */
    const task = document.createElement('div')              
    task.setAttribute('class' , 'task')
    task.setAttribute('id' , `task${count}`)
    task.setAttribute( 'complete' , 'false')

    // timelimit ( it holds the hr and min time to address the time limit given to the task)
    const timeLimit = document.createElement('time');
    timeLimit.setAttribute('class', 'time limit');
    // hours field
    const hoursInput = document.createElement('input');
    hoursInput.setAttribute('maxlength', '2');

    const colon = document.createTextNode(':');
    // minutes field
    const minutesInput = document.createElement('input');
    minutesInput.setAttribute('maxlength', '2');

    // adding all the elements to the time tag 
    timeLimit.appendChild(hoursInput);
    timeLimit.appendChild(colon);
    timeLimit.appendChild(minutesInput);

    // Create textarea input field
    const taskInput = document.createElement('textarea');
    taskInput.setAttribute('rows', '1');
    taskInput.setAttribute('class', 'task-input');
    taskInput.setAttribute('maxlength', '90');
    taskInput.setAttribute('type', 'text');

    taskInput.addEventListener('keydown', function(event) {     // removes the next line feature of the enter key 
      if (event.key === 'Enter' && event.shiftKey === false) { 
        taskInput.disabled = true;
      }
      else if((event.key === 'Enter') && (event.shiftKey === true)){
        addNewTask()
      }
    });

    setTimeout(() => {
      tasks[val][1] = 1
    }, 120000);

    taskInput.addEventListener( 'input' , () => {             // keeps the height of the textarea dynamic resulting in changing the height of 
      const task = taskInput.closest('.task');                // complete task element
      taskInput.rows = 1;
      const rows = taskInput.scrollHeight / taskInput.clientHeight - 0.07;
      taskInput.rows = Math.max(1 , Math.ceil(rows));
  
      task.style.height = (rows * 20) + 'px'; 
      console.log(val)
  })
    
    // creates the element for end time of the task (shows the time when the task is completed )
    const timeEnd = document.createElement('time')  
    timeEnd.setAttribute( 'class' , 'time end')
    task.appendChild(timeLimit)
    task.appendChild(taskInput)
    task.appendChild(timeEnd)

    return [task , hoursInput,val]
}

// complete functionality When pressed enter on selected task it marks it as complete
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && event.shiftKey === false) {
      if (tasks[pos][1] === 1 && tasks[pos][0].getAttribute('complete') === 'false') {
          tasks[pos][0].setAttribute('complete', 'true'); // Mark the task as complete
          console.log(tasks[pos][0].getAttribute('complete'));
          var timeend = tasks[pos][0].childNodes[2]
          var time = new Date()
          timeend.appendChild(
            document.createTextNode(
                time.getHours() + ' : '  + time.getMinutes() 
            )
          )
      }
  }
});


/* adds new task by pressing the addtask button   */
addTask.addEventListener('click', addNewTask )

function addNewTask() {
  const ele = newTaskElement(); // Create a new task element
  taskList.appendChild(ele[0]); // Append the new task element to the taskList
  ele[1].focus()

  tasks.push([ele[0] , 0])
  
};

/* 
  Selecting the element

- default element will be selected
  [ selected element will have class value selected be added in the class ,
    when the attribute is deselected the selected will be removed from the class name ]

- pressing up/left button select the before element
    - if the element is the first element then last nothing will be done
- pressing down/right button will select the next element
    - if selected element will be the last element then nothing will be done
    
  */

/* selects the provided task
  it adds the 'selected' name into the class name that way we apply css of selected element */
function selectTask( task ) {
  task.childNodes[0].focus()
  task.setAttribute( 'class' , 'task selected')
  task.scrollIntoView({ behavior: 'smooth', block: 'center' });
}


/* selects the provided task
  it removes the 'selected' name into the class name that way we apply css of selected element */
function deselectTask ( task ) {
  task.setAttribute('class' , 'task')
}



var pos = 0 // sets 1st element as default element 
// handles the selections of the tasks
document.addEventListener( 'keydown' , function(event) {
  if (event.key === 'Delete') {
    tasks[pos][0].parentNode.removeChild(tasks[pos][0])
    tasks.splice(pos , 1)
    console.log(pos , count)

    count -= 1;

    if(pos === tasks.length && pos !== 0){
      pos -= 1;
    }
  }

  selectTask(tasks[pos][0])
  
  // arrow up
  if (event.key === 'ArrowUp'){
    if( pos === 0) {
      
    }
    else{
      deselectTask(tasks[pos][0])
      pos -= 1;
      selectTask(tasks[pos][0])
    }
  }

  // arrow down
  else if (event.key === 'ArrowDown'){
    if( pos === tasks.length-1) {
      
    }
    else{
      deselectTask(tasks[pos][0])
      pos += 1;
      selectTask(tasks[pos][0])
    }
  }
})

var time = new Date()
console.log(time.getHours() + ' ' + time.getMinutes())







