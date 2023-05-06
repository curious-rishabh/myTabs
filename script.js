const InputBtn = document.getElementById("input-btn");
let myTabs = ["Billionaire"];
const InputEl = document.getElementById("input-el");
const ul = document.getElementById("list");
// get tabs from localStorage: JSON.parse()
const tabsFromLocalStorage = JSON.parse(localStorage.getItem("myTabs"));
const DeleteBtn = document.getElementById("delete-btn");
const SaveTab = document.getElementById("save-btn");

if (tabsFromLocalStorage) {
  myTabs = tabsFromLocalStorage;
  renderTabs(myTabs);
}

SaveTab.addEventListener("click", function () {
  // Grab URL of current tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myTabs.push(tabs[0].url);
    localStorage.setItem("myTabs", JSON.stringify(myTabs));
    renderTabs(myTabs);
  });
});

function renderTabs(Tabs) {
  let listItems = "";
  for (let i = 0; i < Tabs.length; i++) {
    // REMEMBER

    // ul.innerHTML += "<li>" + myTabs[i] + "</li>";
    // OR
    // const li = document.createElement("li");
    // li.textContent = myTabs[i];
    // ul.append(li);

    // listItems += "<li><a href='" + myTabs[i] + "'>" + myTabs[i] + "</a>";
    // Or
    // Template String/Literals
    listItems += `
    <li>
    <a href='${Tabs[i]}'>${Tabs[i]}</a>
    </li>
    `;
    console.log(listItems);
  }
  ul.innerHTML = listItems;
}

// listen to double clicks
DeleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myTabs = [];
  renderTabs(myTabs);
});

InputBtn.addEventListener("click", function () {
  myTabs.push(InputEl.value);
  localStorage.setItem("myTabs", JSON.stringify(myTabs));
  // clear input field
  InputEl.value = "";
  renderTabs(myTabs);
});

// convert string to array
// myTabs = JSON.parse(myTabs);
// myTabs.push("RB");
// convert array to string
// myTabs = JSON.stringify(myTabs);
// console.log(typeof myTabs);
