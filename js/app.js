
const form = document.querySelector(".form");
const inputEl = document.querySelector("#input");
const btnEl = document.querySelector("#btn");
const list = document.querySelector("#list");

const all =  document.querySelector(".all")
const complate =  document.querySelector(".Complated")
const unComplate =  document.querySelector(".unComplated")



const template = document.querySelector("#template").content;

list.addEventListener("mouseenter", ()=>{
    
        if(list.childNodes.length == 0){
            list.innerHTML = " There is nothing !"
        };
    
})


const getFromStorage = JSON.parse(window.localStorage.getItem("todoList"));
const todos = getFromStorage ||[];
render(todos , list)

// delete and complate 

list.addEventListener("click", evt => {
  if(evt.target.matches(".delBTN")){
      const btnDeleteId = evt.target.dataset.btnDeleteId;
      const findIndex = todos.findIndex(find => find.id == btnDeleteId);
      todos.splice(findIndex, 1);
      render(todos, list);

      const addToStorage = window.localStorage.setItem("todoList",  JSON.stringify(todos))
     

  }
  if (evt.target.matches(".check")) {
      const inputCheckedId = evt.target.dataset.inputComplateId;
      const findElement = todos.find( elem => elem.id ==inputCheckedId);
      findElement.isComplate = !findElement.isComplate;
      render(todos, list);
      
      const addToStorage = window.localStorage.setItem("todoList",  JSON.stringify(todos))
  }
})

// render

    function render(todos , list) {
        list.innerHTML = null ; 
        const fragment = document.createDocumentFragment();

        const allCount = todos.length;
        all.textContent = allCount;

       const isComplateCount = todos.filter(count => count.isComplate === true).length;
       complate.textContent = isComplateCount;

       const unComplateCount = allCount - isComplateCount;
       unComplate.textContent = unComplateCount
       

        todos.forEach(objTodo=>{
            const clone = template.cloneNode(true);

            const todoItemStyle = clone.querySelector(".todoItem")
            
            const title = clone.querySelector(".title");
            title.textContent = objTodo.title;

            const btnDelete = clone.querySelector(".delBTN");
            btnDelete.dataset.btnDeleteId = objTodo.id;

            const inputComplate = clone.querySelector(".check");
            inputComplate.dataset.inputComplateId = objTodo.id;

            if (objTodo.isComplate) {
                inputComplate.checked = true;
                todoItemStyle.style.color = "green"
                todoItemStyle.style.border = 2
                todoItemStyle.style.borderColor = "green"
                todoItemStyle.style.backgroundColor = "greenyellow"

                
            }

            fragment.appendChild(clone)
        })
        list.appendChild(fragment);
    }


// submit

form.addEventListener("submit", evt => {
    evt.preventDefault();

if (inputEl.value == "") {
    alert("Add task !!! or write something ")
}else{
    const objTodo = {
        id: todos.length  > 0 ? todos[todos.length -1].id + 1 : 1,
        title: inputEl.value.trim(),
        isComplate: false 
    }
    todos.push(objTodo);
}
render(todos,list)

const addToStorage = window.localStorage.setItem("todoList",JSON.stringify(todos))
inputEl.value = null;
})

const boxBtns = document.querySelector(".allBtns");
boxBtns.addEventListener("click", evt => {
    if(evt.target.matches(".btnAll")){
        render(todos, list);
    };
    if (evt.target.matches(".btnComplated")) {
        const complated = todos.filter(complate => complate.isComplate == true)
        render(complated,list)
    }
    if (evt.target.matches(".btnUnComplated")) {
        const uncomplate = todos.filter(uncomplate =>uncomplate.isComplate == false)
        render(uncomplate, list)
    }
})

