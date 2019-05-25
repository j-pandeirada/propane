var id_inc = 0;

/*
var task1 = createTaskObject("queijo",id_inc,"todo");id_inc=id_inc+1;
var task2 = createTaskObject("cebola",id_inc,"todo");id_inc=id_inc+1;
var task3 = createTaskObject("amor",id_inc,"doing");id_inc=id_inc+1;
var task4 = createTaskObject("coragem",id_inc,"doing");id_inc=id_inc+1;
var task5 = createTaskObject("sabor",id_inc,"doing");id_inc=id_inc+1;
var task6 = createTaskObject("lol",id_inc,"done");id_inc=id_inc+1;

var project_obj ={
    name:"Project 1",
    todo_list:[task1,task2],
    doing_list:[task3,task4,task5],
    done_list:[task6]     
};
*/



//as long as the page loads OR project is selected:
//get project object from localstorage
var retrievedObject = localStorage.getItem('Project 1');
var project_obj = JSON.parse(retrievedObject);

loadProject(project_obj);


//when app is closed OR project changes
//refresh current project object:
    //refresh lists
    //save object in localstorage
        //localStorage.setItem('proj1', JSON.stringify(project_obj));



window.onbeforeunload = function(){
    //refresh project object
    project_obj = saveProject(project_obj);
    //save it in localstorage
    localStorage.setItem(project_obj.name, JSON.stringify(project_obj));
}


//gathers displayed information in webpage,in order to refresh project object
function saveProject(proj){
    //refresh project name
    ///????

    //for each list, refresh object list field
    proj.todo_list=[];
    proj.doing_list=[];
    proj.done_list=[];

    container = document.querySelector(".todo-container");
    todo_list = container.querySelector(".todo-list");
    
    for(var i=0;i<todo_list.childNodes.length;i++){
        var item = todo_list.childNodes[i];
        var task_text = item.childNodes[0].childNodes[0].data;
        proj.todo_list.push(createTaskObject(task_text,item.id,"todo"));
    }

    container = document.querySelector(".doing-container");
    todo_list = container.querySelector(".todo-list");
    
    for(var i=0;i<todo_list.childNodes.length;i++){
        var item = todo_list.childNodes[i];
        var task_text = item.childNodes[0].childNodes[0].data;
        proj.doing_list.push(createTaskObject(task_text,item.id,"doing"));
    }

    container = document.querySelector(".done-container");
    todo_list = container.querySelector(".todo-list");
    
    for(var i=0;i<todo_list.childNodes.length;i++){
        var item = todo_list.childNodes[i];
        var task_text = item.childNodes[0].childNodes[0].data;
        proj.todo_list.push(createTaskObject(task_text,item.id,"done"));
    }

    return proj;
}


//when project gets selected, this function populates all lists in webpage
function loadProject(proj){
    
    //clear current lists
    container = document.querySelector(".todo-container");
    todo_list = container.querySelector(".todo-list");
    todo_list.innerHTML="";

    container = document.querySelector(".doing-container");
    todo_list = container.querySelector(".todo-list");
    todo_list.innerHTML="";

    container = document.querySelector(".done-container");
    todo_list = container.querySelector(".todo-list");
    todo_list.innerHTML="";

    //populate lists with new project
    for (var i=0;i<proj.todo_list.length;i++){
        list_item = createTodoListElem(proj.todo_list[i]);
        moveItemToList(proj.todo_list[i].status,list_item);
    }

    for (var i=0;i<proj.doing_list.length;i++){
        list_item = createTodoListElem(proj.doing_list[i]);
        moveItemToList(proj.doing_list[i].status,list_item);
    }

    for (var i=0;i<proj.done_list.length;i++){
        list_item = createTodoListElem(proj.done_list[i]);
        moveItemToList(proj.done_list[i].status,list_item);
    }
}

//handle add button -> add new task to todo list of current project
document.getElementById("add-button").onclick = function(){
    const task_text = document.getElementById("task-textfield").value;
    if(task_text != ""){
        id_inc = id_inc+1;
        task_obj = createTaskObject(task_text,id_inc,"todo");
        list_item = createTodoListElem(task_obj);
        moveItemToList(task_obj.status,list_item);
        //clear textbox
        document.getElementById("task-textfield").value = "";
    }
}

//given id,inserted text, and status, create task object
function createTaskObject(task_text,id,status){
    var task = {
        text: task_text,
        id: id,
        status: status
    };

    return task;
}

//create the todoitem li element
function createTodoListElem(task_obj){
    
    //create the li object
    var item = document.createElement("li");
    item.setAttribute("class","todo-item");
    item.setAttribute("id",task_obj.id);
    //text div
    var text_div = document.createElement("div");
    text_div.setAttribute("class","task-text-container");
    text_div.innerHTML = task_obj.text;
    //button panel div
    button_panel = createButtonPanelDiv(task_obj.status);
    //glue stuff to get complete todoitem
    item.appendChild(text_div);
    item.appendChild(button_panel);

    return item;
}

//add li element to the correct container
function moveItemToList(status,item){
    //use task_obj.status to select the column:todo,doing,done - container
    //put it inside the correct container
    if(status == "todo"){
        container = document.querySelector(".todo-container");
    } else if(status == "doing"){
        container = document.querySelector(".doing-container");
    } else if(status == "done"){
        container = document.querySelector(".done-container");
    }

    todo_list = container.querySelector(".todo-list");
    todo_list.appendChild(item);
}

/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// BUTTON CREATION AND HANDLING////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


//create button panel div given a task_status
function createButtonPanelDiv(status){
    var button_panel = document.createElement("div");
    button_panel.appendChild(createUpButton());
    button_panel.appendChild(createDownButton());
    if(status == "todo"){
        button_panel.setAttribute("class","todo-button-panel");
        button_panel.appendChild(createRightButton());
    } else if(status == "doing"){
        button_panel.setAttribute("class","doing-button-panel");
        button_panel.appendChild(createLeftButton());
        button_panel.appendChild(createRightButton());
    } else if(status == "done"){
        button_panel.setAttribute("class","done-button-panel");
        button_panel.appendChild(createLeftButton());
    }
    button_panel.appendChild(createRemoveButton());
    return button_panel;
}

////////////////////////////////////////////////////////////////////////////////////////////
///////////FUNCTIONS TO CREATE DIFFERENT BUTTONS AND HANDLE THEM////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////


/////////remove button////////////////////////////////////////////
function createRemoveButton(){
    button = document.createElement("button");
    button.setAttribute("type","button");
    button.setAttribute("class","btn remove-btn");

    span = document.createElement("span");
    span.setAttribute("class","fas fa-trash");
    span.setAttribute("aria-hidden","true");

    button.appendChild(span);
    button.addEventListener('click',handleRemoveButton);

    return button;
}

//function handler for when a remove button gets clicked
function handleRemoveButton(){
    //get the list item where the button is included
    var item = this.offsetParent;
    var parent = item.parentNode;
    //remove that item from the current list
    parent.removeChild(item);
}

///////////////////////////////////////////////////////////////////

/////////up button/////////////////////////////////////////////////
function createUpButton(){
    button = document.createElement("button");
    button.setAttribute("type","button");
    button.setAttribute("class","btn up-btn");

    span = document.createElement("span");
    span.setAttribute("class","fas fa-arrow-circle-up");
    span.setAttribute("aria-hidden","true");

    button.appendChild(span);
    button.addEventListener('click',handleUpButton);

    return button;
}

//function handler for when a up button gets clicked
function handleUpButton(){
    //get the list item where the button is included
    var item = this.offsetParent;
    //get the complete list where the item belongs
    var itemlist = item.parentNode;

    //in the complete list, insert the clicked item before its previous sibling
    //unless its the first item in list -> with previousElementSibling null

    //if first item from list, append to the end
    if(item.previousElementSibling == null){
        itemlist.appendChild(item,itemlist.lastChild);
    }
    else{
        itemlist.insertBefore(item,item.previousElementSibling);
    }
}

///////////////////////////////////////////////////////////////////

/////////down button///////////////////////////////////////////////
function createDownButton(){
    button = document.createElement("button");
    button.setAttribute("type","button");
    button.setAttribute("class","btn down-btn");

    span = document.createElement("span");
    span.setAttribute("class","fas fa-arrow-circle-down");
    span.setAttribute("aria-hidden","true");

    button.appendChild(span);
    button.addEventListener('click',handleDownButton);

    return button;
}

//function handler for when a down button gets clicked
function handleDownButton(){
    //get the list item where the button is included
    var item = this.offsetParent;
    //get the complete list where the item belongs
    var itemlist = item.parentNode;

    //in the complete list, insert the clicked item after its next sibling
    //which is the same as insert next sibling before clicked item

    //unless its the last item in list -> with nextElementSibling null
    //if last item from list, insert before first item(index 3)
    if(item.nextElementSibling == null){
        itemlist.insertBefore(item,itemlist.childNodes[1]);
    }
    else{
        itemlist.insertBefore(item.nextElementSibling,item);
    }
}

///////////////////////////////////////////////////////////////////

/////////right button//////////////////////////////////////////////
function createRightButton(){
    button = document.createElement("button");
    button.setAttribute("type","button");
    button.setAttribute("class","btn right-btn");

    span = document.createElement("span");
    span.setAttribute("class","fas fa-arrow-circle-right");
    span.setAttribute("aria-hidden","true");

    button.appendChild(span);
    button.addEventListener('click',handleRightButton);
    return button;
}

//function handler for when a right button gets clicked
function handleRightButton(){
    //remove from current list
    //get the list item where the button is included
    var item = this.offsetParent;
    var parent = item.parentNode;
    //remove that item from the current list
    parent.removeChild(item);
    //create in next list:todo->doing, doing->done
    //dont forget to create the taskobject
    const task_text = item.childNodes[0].childNodes[0].data;
    if(parent.parentNode.className=="todo-container"){
        task_obj = createTaskObject(task_text,item.id,"doing");
    }
    else if(parent.parentNode.className=="doing-container"){
        task_obj = createTaskObject(task_text,item.id,"done");
    }

    list_item = createTodoListElem(task_obj);
    moveItemToList(task_obj.status,list_item);
}

///////////////////////////////////////////////////////////////////


/////////left button///////////////////////////////////////////////
function createLeftButton(){
    button = document.createElement("button");
    button.setAttribute("type","button");
    button.setAttribute("class","btn left-btn");

    span = document.createElement("span");
    span.setAttribute("class","fas fa-arrow-circle-left");
    span.setAttribute("aria-hidden","true");

    button.appendChild(span);
    button.addEventListener('click',handleLeftButton);
    return button;
}

//function handler for when a left button gets clicked
function handleLeftButton(){
    //remove from current list
    //get the list item where the button is included
    var item = this.offsetParent;
    var parent = item.parentNode;
    //remove that item from the current list
    parent.removeChild(item);
    //create in next list:todo->doing, doing->done
    //dont forget to create the taskobject
    const task_text = item.childNodes[0].childNodes[0].data;
    if(parent.parentNode.className=="doing-container"){
        task_obj = createTaskObject(task_text,item.id,"todo");
    }
    else if(parent.parentNode.className=="done-container"){
        task_obj = createTaskObject(task_text,item.id,"doing");
    }

    list_item = createTodoListElem(task_obj);
    moveItemToList(task_obj.status,list_item);
}

///////////////////////////////////////////////////////////////////

//things to add:
//add task with button and enter
