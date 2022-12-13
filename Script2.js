const API_URL = "https://6396e1e077359127a0255a95.mockapi.io";
const title1 = document.getElementById("title");
const description1 = document.getElementById("description");
const time1 = document.getElementById("time");
const button = document.getElementById("btn");
const form1 = document.getElementById("form1");
const containerTodo = document.getElementById("containerTodo");
DEFAULT_PAGE_SIZE = 4;
const countData = 9;
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
