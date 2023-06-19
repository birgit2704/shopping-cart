// https://realtime-database-8b053-default-rtdb.europe-west1.firebasedatabase.app/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://realtime-database-8b053-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  addItemToShoppingListEl(inputValue);
  push(shoppingListInDB, inputValue);
  clearInputFieldEl();
});

onValue(shoppingListInDB, function (snapshot) {
  let storedItems = Object.values(snapshot.val());
  clearShoppingListEl();
  storedItems.forEach((item) => addItemToShoppingListEl(item));
  console.log(storedItems);
});

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function addItemToShoppingListEl(itemValue) {
  shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}