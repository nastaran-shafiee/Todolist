const API_URL = "https://6396e1e077359127a0255a95.mockapi.io";
const title1 = document.getElementById("title");
const description1 = document.getElementById("description");
const time1 = document.getElementById("time");
const button = document.getElementById("btn");
const form1 = document.getElementById("form1");
const containerTodo = document.getElementById("containerTodo");
let DEFAULT_PAGE_SIZE = 4;

//read information--------------------------------------------------------------------------------------------------------------
function addToDom(item) {
  let time = item.createAt;
  let time2 = item.updateAt;
  //format of two time
  const date = new Date(time);
  const date2 = new Date(time2);
  let dateFormat =
    date.getHours() +
    ":" +
    date.getMinutes() +
    ", " +
    date.getDay() +
    "/ " +
    date.getMonth() +
    "/" +
    date.getFullYear();

  let dateFormat2 =
    date2.getHours() +
    ":" +
    date2.getMinutes() +
    ", " +
    date2.getDay() +
    "/ " +
    date2.getMonth() +
    "/" +
    date2.getFullYear();
  //html for add to dom
  const html = `<div class="todo">
      <header>
       <div class="header1"> <input type="checkbox" id="checked" />
       <h3>${item.title}</h3>
       </div >
        <span class="font" >created at : ${dateFormat}</span>
      </header>
      <div class = "timer"><p>time to do that in <span class= "timer1" > ${item.dueDate} </span></p> <span class="font" >edited at : ${dateFormat2}</span> </div>
      <div class="main">
      <p>
    ${item.description}
      </p>
      <div class="main2">
      <span class="material-symbols-outlined" id="edit" onclick="redirect(${item.id})"> edit </span>
      <span class="material-symbols-outlined btn2"  data-bs-toggle="modal"
      data-bs-target="#deleteModal"
      
     >
      delete
      </span>
     
     
  
    `;

  const html2 = `<div class="modal fade" id="deleteModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">Delete</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          // Are you sure you want to delete this item?
          <p> h ${item.title} </p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary "
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            data-bs-dismiss="modal"
            type="button"
            class="btn btn-danger"
            id="confirm-delete-btn"
            onclick="delet(${item.id})"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!--View Modal -->
  <div class="modal fade" id="viewModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="viewModalLabel">Details</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="card p-3 m-3">
            <div class="row">
              <div class="col-4"><strong>Description</strong></div>
              <div class="col-8" id="description"></div>
            </div>
          </div>
          <div class="card p-3 m-3">
            <div class="row">
              <div class="col-4"><strong>Department</strong></div>
              <div class="col-8" id="department"></div>
            </div>
          </div>
          <div class="card p-3 m-3">
            <div class="row">
              <div class="col-4"><strong>Material</strong></div>
              <div class="col-8" id="material"></div>
            </div>
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
        </div>
      </div>
    </div>
  </div>`;
  containerTodo.insertAdjacentHTML("beforeend", html);
  containerTodo.insertAdjacentHTML("beforeend", html2);
}

readProducts();

//Read--------------------------------------------------------------------------------------------------------
async function readProducts(page = localStorage.getItem("currentPage") ?? 1) {
  containerTodo.innerHTML = " ";

  try {
    const res = await fetch(`${API_URL}/todolist`);
    const data = await res.json();
    //pagination from client side
    let offset = (page - 1) * 4;
    let pageData = [];

    for (let i = offset; i < offset + DEFAULT_PAGE_SIZE; i++) {
      if (data.items[i] === undefined) break;
      pageData.push(data.items[i]);
    }
    //add to don
    pageData.forEach(addToDom);
    createPagination(data.items.length, page);
  } catch (e) {
    console.log(e);
  }
}
// paigination;-------------------------------------------------------------------------------------------------------------------
function createPagination(productCount, currentPage) {
  const pageCount = Math.ceil(productCount / DEFAULT_PAGE_SIZE); //5/4
  let lis = " ";
  for (let i = 1; i <= pageCount; i++) {
    lis += `<li class="page-item ${
      i === Number(currentPage) ? "active" : " "
    }"><a href="#" class="page-link">${i}</a></li>`;
  }
  document.querySelector("ul.pagination").innerHTML = lis;
}

document.querySelector("ul.pagination").addEventListener("click", (e) => {
  const lis = document.querySelectorAll(".page-item");

  lis.forEach((li) => li.classList.remove("active"));
  e.target.parentElement.classList.add("active");
  const currentPage = Number(e.target.innerText);
  localStorage.setItem("currentPage", currentPage);
  window.location = `http://127.0.0.1:5500/Todo.html?page=${currentPage}`;
  readProducts(currentPage);
});

// remove-------------------------------------------------------------------------------------------------------------------------------------------
async function deleteProduct(idproduct) {
  try {
    await fetch(`${API_URL}/todolist/${idproduct}`, { method: "DELETE" });
    console.log(idproduct);
    readProducts();
  } catch (e) {
    console.log(e.message);
  }
}

function delet(id) {
  deleteProduct(id);
}
