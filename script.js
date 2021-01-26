const inputBox=document.querySelector(".inputfield input");
const add8tn = document.querySelector(".inputfield button");
const todoList = document.querySelector(".todoList");
const deleteA = document.querySelector(".footer button");
inputBox.onkeyup = ()=>{
    let userData = inputBox.value;//getting user  entered value
    if(userData.trim() != 0){ //if user values are not only spaces
    add8tn.classList.add("active");//active add button
    }else{
        add8tn.classList.remove("active"); 
    }   
}
//if userclick on the add button
add8tn.onclick = ()=>{
    let userData=inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");//getting localStorage
    if(getLocalStorage == null){ //if localStorage is null
        listArr = []; //creating blank array
    }else{
        listArr=JSON.parse(getLocalStorage); //transforming json string into a js object
    }
    listArr.push(userData);
        localStorage.setItem("New Todo",JSON.stringify(listArr));
        showtask();//calling showtask function
}

function showtask(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting local storage
    if(getLocalStorage == null){
        listArr=[]; //creating blank array
         }else{
            listArr = JSON.parse(getLocalStorage);
        }
        const pendingNum = document.querySelector(".pendingNum");
        pendingNum.textContent = listArr.length; // passing the length value in pending Num
        if(listArr.length > 0){
            deleteA.classList.add("active");//active the clear all button
        }else{
            deleteA.classList.remove("active");//unactive the clear all button
        }
        let newLiTag = '';
        listArr.forEach((element, index) => {
            newLiTag += `<li>${element} <span onclick = "deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;   
        });
        todoList.innerHTML= newLiTag;//adding new li tag inside ul tag
    }
    function deleteTask(index){
        let getLocalStorage = localStorage.getItem("New Todo"); //getting local storage
        listArr = JSON.parse(getLocalStorage);
        listArr.splice(index,1);//delete particular indexed li
        //after remove the li again update the local storage
        localStorage.setItem("New Todo",JSON.stringify(listArr));
        showtask();//calling showtask function
    }
    //delete all tasks function
    deleteA.onclick = () =>{
        listArr =[]; // empty an array
        //after delete all tasks again update the local storage
        localStorage.setItem("New Todo",JSON.stringify(listArr));//transforming js object into a json string
        showtask();//calling showTasks function
    }
    