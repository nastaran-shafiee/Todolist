const API_URL = "https://6396e1e077359127a0255a95.mockapi.io";
const title1 = document.getElementById("title");
const description1 = document.getElementById("description");
const time1 = document.getElementById("time");
const button = document.getElementById("btn");
const form1 = document.getElementById("form1");
const containerTodo = document.getElementById("containerTodo");
DEFAULT_PAGE_SIZE = 4;
const countData = 5;

//read
async function info() {
  try {
    const res = await fetch(`${API_URL}/todo`);
    const data = res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
info(),
  function format(e) {
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
  };
function add() {}
