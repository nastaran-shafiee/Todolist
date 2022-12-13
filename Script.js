const API_URL = "https://6396e1e077359127a0255a95.mockapi.io";
const title1 = document.getElementById("title");
const description1 = document.getElementById("description");
const time1 = document.getElementById("time");
const button = document.getElementById("btn");
const form1 = document.getElementById("form1");
const containerTodo = document.getElementById("containerTodo");
DEFAULT_PAGE_SIZE = 4;
let total1;

async function fetchTodoInformations() {
  try {
    const response = await fetch(`${API_URL}/todolist`);
    const data = await response.json();
    test(fetchTodoInformations);
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

// console.log(fetchTodoInformations());
// console.log("salam");
// console.log(array.length);

// let countData = result.length;
// console.log(countData);

async function addToDom(item) {
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
    <p>
  ${item.description}
    </p>
  </div>`;
  containerTodo.insertAdjacentHTML("beforeend", html);
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

const sports = ["soccer", "baseball"];
const total = sports.push("football", "swimming");
console.log(sports.length);
