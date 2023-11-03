var count = 0;
var tasks = [];
var editingTask = false



const taskList = document.querySelector('.task-list')
const addTask = document.querySelector('.addtask')

// positionoing tasks in the descending order of time


function setTaskPosition(task){
  
  // requirements
  // whenever the time is changed
  // when task relocates iteself it should be in the view

  // if the time is 1 then it should be after 23 
  // task after the time passed should always be at the lowest
;

  
  taskIndex = tasks.indexOf(task)
  
  var hours = parseInt(task.childNodes[0].childNodes[0].value , 10)
  var minutes  = parseInt(task.childNodes[0].childNodes[2].value , 10) 
  
  if (isNaN(minutes)) {
    minutes = 0
  }
  var insertPos = count - 1
  var time = new Date()
  var currHour = time.getHours() 

  // finding position to insert 
  for ( var i = count-1 ; i >= 0 ; i--) {
    if( (parseInt(tasks[i].childNodes[0].childNodes[0].value) > hours  ||
   /*  && parseInt(task.getAttribute("isPassed")) == 1 && parseInt(tasks[i].getAttribute("isPassed")) == 1) 
    || (parseInt(tasks[i].childNodes[0].childNodes[0].value) > hours && parseInt(task.getAttribute("isPassed")) == 0 
    && parseInt(tasks[i].getAttribute("isPassed")) == 0)  || (parseInt(tasks[i].childNodes[0].childNodes[0].value) == hours 
    && parseInt(tasks[i].childNodes[0].childNodes[2].value) > minutes ) ||*/ (parseInt(tasks[i].childNodes[0].childNodes[0].value) 
    == hours &&  parseInt(tasks[i].childNodes[0].childNodes[2].value) >= minutes ))) {
      insertPos = i
    }
  }
  
  console.log(hours , minutes , insertPos)
  if (insertPos != count - 1 && taskIndex != insertPos) {
    console.log("triggered")
    tasks.splice(taskIndex , 1)
    tasks.splice(insertPos , 0 , task)
    

    if (insertPos === 0) {
        taskList.insertBefore(task , tasks[1])
    }
    else{
      taskList.insertBefore(task , tasks[insertPos + 1])
    }
  }
}

// positions all elements
function positionAllTasks() {
  for( var i = 0 ; i < tasks.length ; i++) {
    setTaskPosition(tasks[i])
    deselectTask(tasks[i])
  }
  
  
}

// creates new task element 
function newTaskElement () {
  editingTask = true

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

    hoursInput.addEventListener('input', function() {
      // Ensure the input value is within the range 0-23
      const value = parseInt(this.value, 10);
      if (isNaN(value) || value < 0) {
        this.value = '';
      }
      else if (value == '' || value == 0){
        this.value = '00';
      } 
      else if (value > 23) {
        this.value = '';
      }
    });

    

    minutesInput.addEventListener('input', function() {
      // Ensure the input value is within the range 0-60
      const value = parseInt(this.value, 10);
      if (isNaN(value) || value < 0) {
        this.value = '';
      }
      else if (value == '' || value == 0){
        this.value = '00';
      } 
      else if (value > 60) {
        this.value = '';
      }
    });
    var time = new Date()
    var currHour = time.getHours() 
    var currMinutes = time.getMinutes()

    // checks and registers if the input time is passed or not
    minutesInput.addEventListener('blur', function(){
      if ( hoursInput.value < currHour || (hoursInput.value < currHour &&minutesInput.value < currMinutes)) {
        hoursInput.parentNode.parentNode.setAttribute("ispassed" , 1)
      }
      else{
        hoursInput.parentNode.parentNode.setAttribute("ispassed" , 0)
      }
      console.log("passed?",parseInt(task.getAttribute("isPassed")))
  
      positionAllTasks()
      setTimeout(() => {
        pos = tasks.indexOf(timeLimit.parentNode)
        selectTask(tasks[pos])
      }, 100);
    });

    

    // Create textarea input field
    const taskInput = document.createElement('textarea');
    taskInput.setAttribute('rows', '1');
    taskInput.setAttribute('class', 'task-input');
    taskInput.setAttribute('maxlength', '90');
    taskInput.setAttribute('type', 'text');

    taskInput.addEventListener('keydown', function(event) {     // removes the next line feature of the enter key 
      if (event.key === 'Enter' && event.shiftKey === false  || (event.key === 'Tab')) { 
        taskInput.disabled = true;
        setTimeout(() => {
          editingTask = false
        }, 100);
      }
      else if((event.key === 'Enter') && (event.shiftKey === true)){
        taskInput.disabled = true;
        editingTask = false
        addNewTask()
      }
    });

    taskInput.addEventListener( 'input' , () => {             // keeps the height of the textarea dynamic resulting in changing the height of 
      const task = taskInput.closest('.task');                // complete task element
      taskInput.rows = 1;
      const rows = taskInput.scrollHeight / taskInput.clientHeight - 0.07;
      taskInput.rows = Math.max(1 , Math.ceil(rows));
  
      task.style.height = (rows * 20) + 'px'; 
  })
    
    // creates the element for end time of the task (shows the time when the task is completed )
    const timeEnd = document.createElement('time')  
    timeEnd.setAttribute( 'class' , 'time end')
    task.appendChild(timeLimit)
    task.appendChild(taskInput)
    task.appendChild(timeEnd)
    return [task , hoursInput ]
}

// complete functionality When pressed enter on selected task it marks it as complete
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && event.shiftKey === false && event.ctrlKey === false && editingTask === false) {
    // Handle Enter key without Shift (e.g., marking as complete)
    if (tasks[pos].getAttribute('complete') === 'false') {
      tasks[pos].setAttribute('complete', 'true'); // Mark the task as complete
      console.log(tasks[pos].getAttribute('complete'));
      var timeend = tasks[pos].childNodes[2];
      var time = new Date();
      timeend.appendChild(
        document.createTextNode(
          time.getHours() + ' : '  + time.getMinutes() 
        )
      );
    }
  }
  else if (event.key === 'Enter' && event.ctrlKey === true && editingTask === false) {
    // Handle Enter key with Ctrl (e.g., marking as incomplete)
    if (tasks[pos].getAttribute('complete') === 'true') {
      tasks[pos].setAttribute('complete', 'false'); 
      // Remove the child node here
      var timeend = tasks[pos].childNodes[2];
      timeend.removeChild(timeend.firstChild);
    }
  }
});


/* adds new task by pressing the addtask button   */
addTask.addEventListener('click', addNewTask )

function addNewTask() {
  const ele = newTaskElement(); // Create a new task element
  taskList.appendChild(ele[0]); // Append the new task element to the taskList
  ele[1].focus()

  tasks.push(ele[0]) 
  
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
  task.setAttribute( 'class' , 'task selected')
  task.scrollIntoView({ behavior: 'smooth', block: 'center' });
  console.log( task.getAttribute("id"))
}


/* selects the provided task
  it removes the 'selected' name into the class name that way we apply css of selected element */
function deselectTask ( task ) {
  task.setAttribute('class' , 'task')
}



var pos = 0 // sets 1st element as default element 
// handles the selections of the tasks
document.addEventListener( 'keydown' , function(event) {
  if (event.key === 'Delete' || event.key === 'ArrowUp' || event.key === 'ArrowDown' ){
  if (event.key === 'Delete') {
    tasks[pos].parentNode.removeChild(tasks[pos])
    tasks.splice(pos , 1)
    console.log(pos , count)

    count -= 1;

    if(pos === tasks.length && pos !== 0){
      pos -= 1;
    }

    if(editingTask == true) {
      editingTask = false
    }
  }
  
  // arrow up
  if (event.key === 'ArrowUp'){
    if( pos === 0) {
      
    }
    else{
      deselectTask(tasks[pos])
      pos -= 1;
      selectTask(tasks[pos])
    }
  }

  // arrow down
  else if (event.key === 'ArrowDown'){
    if( pos === tasks.length-1) {
      
    }
    else{
      deselectTask(tasks[pos])
      pos += 1;
      selectTask(tasks[pos])
    }
  }
}
})

var time = new Date()
console.log(time.getHours() + ' ' + time.getMinutes())







