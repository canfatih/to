//elementleri seçtik.
const form =document.querySelector("#todo-form");
const todo=document.querySelector("#todo");
const cardbodyfirst=document.querySelectorAll(".card-body")[0];
const cardbodysecond =document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const todolist=document.querySelector(".list-group");
const clearbutton=document.querySelector("#clear-todos");



eventlisteners();


function eventlisteners(){//tüm eventleri eklemelik

    form.addEventListener("submit",addtodo);
    document.addEventListener("DOMContentLoaded",loadalltodostouı);
    document.addEventListener("click",deletetodo);
    filter.addEventListener("keyup",filtertodos);
    clearbutton.addEventListener("click",clearalltodos);
}

function clearalltodos(e){

if(confirm("tümünü silmek istediğinize emin misiniz?")){

    // todolist.innerHTML=""; yavaş çalışır
    while(todolist.firstElementChild !=null){

        todolist.removeChild(todolist.firstElementChild);
    }
    localStorage.removeItem("todos");
}


}






function filtertodos(e){
  const filtervalue = e.target.value.toLowerCase();
  const listitems = document.querySelectorAll(".list-group-item");
 
listitems.forEach(function(listitem){
    const text=listitem.textContent.toLowerCase();

if(text.indexOf(filtervalue)===-1){
//bulamazsa yani
listitem.setAttribute("style","display:none !important");

}
else{
    listitem.setAttribute("style","display:block");
}
}



)};




function deletetodo(e){
if(e.target.className === "fa fa-remove"){

    e.target.parentElement.parentElement.remove();
    deletetodofromstorage(e.target.parentElement.parentElement.textContent);

}

function deletetodofromstorage(deletetodo){

    let todos=gettodosfromstorage();

todos.forEach(function(todo,index){

    if(todo===deletetodo){
        todos.splice(index,1);//arraydan todoyu silebiliriz.
    }
});
 localStorage.setItem("todos",JSON.stringify(todos));
}


}
function loadalltodostouı(){
let todos =gettodosfromstorage();


todos.forEach(function(todo) {
    addtodoUI(todo);
});

}
function addtodo(e){
    const newtodo= todo.value.trim();
     if(newtodo===""){
         
         showAlert("danger","lütfen bir todo girin.");
     }

    else{
        addtodoUI(newtodo);
        addtodoToStorage(newtodo);
    }
    
     
     e.preventDefault();
    }
    function gettodosfromstorage(){//storageden bütün todoları alır.
        let todos;
        if(localStorage.getItem("todos")===null){
            todos =[];
        }
        else{
            todos=JSON.parse(localStorage.getItem("todos"))
        }
        return todos;
    }
function addtodoToStorage(newtodo){
    let todos=gettodosfromstorage();

    todos.push(newtodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}
    function showAlert(type,message){

        const alert=document.createElement("div");
        alert.className="alert alert-danger";
        alert.textContent=message;
        cardbodyfirst.appendChild(alert);
     //sett timeout metodu kullanıyocaz.
     //2 yolu var 1000 yazısı 1000 mili saniye yani 1 sn sonra çalışıcak demek.
     setTimeout(function() {
         alert.remove();
     },1000);
    }



    function addtodoUI(newtodo){//string değerlerini list item olarak UI arayüze ekleyecek.
      /* <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>
                        */
    //listitem oluşturma
     const listitem =document.createElement("li");
     //link oluşturma
     const link=document.createElement("a");
     link.href="#";
     link.className="delete-item";
     link.innerHTML="<i class = 'fa fa-remove'></i>";
     listitem.className="list-group-item d-flex justify-content-between";
     //textnode ekleme
     listitem.appendChild(document.createTextNode(newtodo));
     listitem.appendChild(link);
     //todo list e list item ı ekleme.
     todolist.appendChild(listitem);
     todo.value="";
     
    }