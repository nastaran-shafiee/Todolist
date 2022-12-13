const API_URL = "https://6396e1e077359127a0255a95.mockapi.io";
const title1 = document.getElementById("title");
const description1 = document.getElementById("description");
const time1 = document.getElementById("time");
const button = document.getElementById("btn");
const form1 = document.getElementById("form1");
const containerTodo = document.getElementById("containerTodo");
DEFAULT_PAGE_SIZE = 4;
let total1;
let countData = 10;
async function fetchTodoInformations() {
  try {
    const response = await fetch(`${API_URL}/todolist`);
    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
  }
}

function test(data) {
  let array = [];
  let result = data.then((item) => {
    item.forEach((element) => {
      array.push(element);
    });
  });
  console.log(array);
}

function addToDom(item) {
  let time = item.createAt;
  console.log(time);
  const date = new Date(time);
  dateFormat =
    date.getHours() +
    ":" +
    date.getMinutes() +
    ", " +
    date.getDay() +
    "/ " +
    date.getMonth() +
    "/" +
    date.getYear();
  const html = `<div class="todo">
    <header>
     <div class="header1"> <input type="checkbox" id="checked" />
     <h3>${item.title}</h3>
     </div>
      <span>${dateFormat}</span>
    </header>
    <p class = "timer">time to do that in <span class= "timer1" > ${item.dueDate} </span></p>
    <div class="main">
    <p>
  ${item.description}
    </p>
    <div class="main2">
    <span class="material-symbols-outlined" id="edit" onclick="redirect(${item.id})"> edit </span>
   
    <button
      type="button"
      class="btn btn-danger btn-sm"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      
    >
   delete
    </button>


    </div>
    </div>
  </div>
  
  <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Deleet</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
          <p>do you want to delet this item</p>
          <p>${item.title}  <span>${item.dueDate}</span>  </p>
          </div>
          
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-danger" onclick="deleteProduct()" >Delete</button>
          </div>
        </div>
      </div>
    </div>
  
  
  `;
  containerTodo.insertAdjacentHTML("beforeend", html);
  // redirect(item.id);
}
readProducts();

//Read
async function readProducts(page = 1, queryParam) {
  containerTodo.innerHTML = " ";
  const param = queryParam ? `&name=${queryParam}` : "";
  try {
    const res = await fetch(
      `${API_URL}/todolist?page=${page}&limit=${DEFAULT_PAGE_SIZE}${param}`
    );
    const data = await res.json();
    data.forEach(addToDom);

    createPagination(countData, page);
  } catch (e) {
    console.log(e);
  }
}
// paigination;
function createPagination(productCount, currentPage) {
  const pageCount = Math.ceil(productCount / DEFAULT_PAGE_SIZE); //5/4
  let lis = " ";
  for (let i = 1; i <= pageCount; i++) {
    lis += `<li class="page-item ${
      i === currentPage ? "active" : " "
    }"><a href="#" class="page-link">${i}</a></li>`;
  }
  document.querySelector("ul.pagination").innerHTML = lis;
  console.log(2);
}

document.querySelector("ul.pagination").addEventListener("click", (e) => {
  const lis = document.querySelectorAll(".page-item");
  lis.forEach((li) => li.classList.remove("active"));
  e.target.parentElement.classList.add("active");
  const currentPage = Number(e.target.innerText);
  readProducts(currentPage);
  console.log("hi");
});

// remove------------------------------------------------
async function deleteProduct() {
  console.log("object");

  // try {
  //   await fetch(`${API_URL}/todolist/${productId}`, { method: "DELETE" });
  // } catch (e) {
  //   console.log(e.message);
  // }
}
