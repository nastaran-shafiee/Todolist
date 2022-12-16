const API_URL = "https://6396e1e077359127a0255a95.mockapi.io";
const title1 = document.getElementById("title");
const description1 = document.getElementById("description");
const time1 = document.getElementById("time");
const button = document.getElementById("btn");
const form1 = document.getElementById("form1");
const containerTodo = document.getElementById("containerTodo");
let DEFAULT_PAGE_SIZE = 4;
const countData = 9;
const btn1 = document.getElementById("btn1");
async function fetchTodoInformations() {
  try {
    const response = await fetch(`${API_URL}/todolist`);
    const data = response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}
//create--------------------------------------------------------------------------
form1.addEventListener("submit", (e) => {
  e.preventDefault();

  const newProduct = gatherFormData(e);

  create(newProduct);
});

async function create(newProduct) {
  try {
    await fetch(`${API_URL}/todolist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newProduct),
    });
  } catch (error) {
    console.log(error);
  }
}
function gatherFormData(e) {
  const { dueDate, title, description, createAt, updateAt, checked, id } =
    e.target;
  return {
    dueDate: time1.value,
    title: title1.value,
    description: description1.value,
    createAt: new Date(),
    updateAt: new Date(),
    checked: false,
    id: new Date(),
  };
}
function myFunction() {
  let x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
  setTimeout(() => {
    document.location.reload();
  }, 4000);
}

//edit--------------------------------------------------------------------------------------------------------------------------------------------
const queryString = window.location.search;
const urlParam = new URLSearchParams(queryString).get("id");

async function readProduct(id) {
  try {
    const res = await fetch(`${API_URL}/todolist/${id}`);
    const data = await res.json();
    if (res.status === 404) {
      window.location.replace(`http://127.0.0.1:5500/404.html`);
    } else if (res.status === 500) {
      let url = window.location.href.split("?");
      if (url[1]) {
        window.location = url[0];
      }
    } else {
      if (urlParam) {
        document.getElementById("btn1").hidden = false;
        document.getElementById("btn").hidden = true;

        addToDom2(data);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function addToDom2(item) {
  title1.value = item.title;
  description1.value = item.description;
  time1.value = item.dueDate;
}
readProduct(urlParam);

btn1.addEventListener("click", (e) => {
  e.preventDefault();
  updateProduct(urlParam);
});

function gatherEditFormData() {
  return {
    title: title1.value,
    description: description1.value,
    dueDate: time1.value,
    updateAt: new Date(),
  };
}
async function updateProduct(id) {
  const updatedProduct1 = gatherEditFormData();
  console.log(updatedProduct1);
  try {
    const res = await fetch(`${API_URL}/todolist/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedProduct1),
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.log(error.message);
  }
}

function myFunction2() {
  let x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
  setTimeout(() => {
    window.location.replace(`http://127.0.0.1:5500/Home.html`);
  }, 4000);
}
