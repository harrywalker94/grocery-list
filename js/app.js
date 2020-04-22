/* ========== Variables ========== */
// Add Grocery Items
const addAction = document.querySelector('.add-item-action');
const input = document.querySelector('.add-item-input');
const submit = document.querySelector('.add-item-submit');
// Remove Grocery Items
const list = document.querySelector('.grocery-list');
const displayAction = document.querySelector('.display-item-action');
const clear = document.querySelector('.display-item-clear');

/* ========== Event Listeners  ========== */
// Add Item
submit.addEventListener('click', addItem);
// Remove Item
list.addEventListener('click', removeItem);
// Display Local Storage
document.addEventListener('DOMContentLoaded', displayStorage) // Only when document has loaded, the function will run
// Remove all Items
clear.addEventListener('click', removeItems);


/* ========== Functions ========== */

// Add Item
function addItem(event) {
    event.preventDefault(); // Prevent default action of html button
    let value = input.value;
    // if/else statement - if the value is equal to none, add function showAction()
    if (value === '') {
        showAction(addAction, 'Please Add Grocery Item', false);
    } // 3 paraemtres to match the 3 parametres in showAction function.
    // If value is not equal to none, add showAction function and createItem function.
    else {
        showAction(addAction, `${value} added to grocery list`, true);
        createItem(value);
        updateStorage(value);
    }
}

// remove single item
function removeItem(event) {
    // console.log(event.target); - Shows the event clicked on in the DOM
    // console.log(event.target.parentElement); - Shows the event parent clicked on in the DOM
    event.preventDefault();

    let link = event.target.parentElement;
    if (link.classList.contains('grocery-item-link')) { // If the parent element ('a') contains class, delete
        let text = link.previousElementSibling.innerHTML; /* Delete 'grocery-item-link' previous sibling,
        the grocery item text. */
        let groceryItem = event.target.parentElement.parentElement;
        // remove from storage
        editStorage(text);
        // remove from list
        list.removeChild(groceryItem) // Remove whole element
        showAction(displayAction, `${text} removed from the list`, true)
    }

}

// Show Action
function showAction(element, text, value) // add three parameters to pass through the function
{
    if (value === true) { // If there is a grocery item ADD the class success
        element.classList.add('success');
        element.innerText = text; // The text we are passing in
        input.value = ''; // Clear input value of text once entered
        setTimeout(function () {
            element.classList.remove('success');
        }, 2000) // Remove after 2 seconds
    }
    else {
        element.classList.add('alert');
        element.innerText = text; // The text we are passing in
        input.value = ''; // Clear input value of text once entered
        setTimeout(function () {
            element.classList.remove('alert');
        }, 2000) // Remove after 2 seconds
    }
}

// Create Item
function createItem(value) {
    let parent = document.createElement('div'); // Create div element
    parent.classList.add('grocery-item'); // Add grocery-item to div

    /*
    let title = document.createElement('h4');
    title.classList.add('grocery-item-title');
     JavaScript allows for you to add each item seperately to append to the parent however,
     there is much easier way to do this */
    parent.innerHTML = `<h4 class="grocery-item-title">${value}</h4>
     <a href="#" class="grocery-item-link">
         <i class="fas fa-trash"></i>
     </a>`

    list.appendChild(parent) // Append the list variable ('.grocery-list') to parent variable
}

// update storage
function updateStorage(value) {
    let groceryList; // Empty variable
    let exists = localStorage.getItem('groceryList') // Check if item is in locale storage
    /* if (exists) { // If the groceryList does have a value set groceryList variable to array
        groceryList = JSON.parse(locateStorage.getItem('groceryList'))
    }
    else { 
        groceryList = [];
    }
}
*/
    // With the new ES6 features, the above statement can be written as such:
    groceryList = localStorage.getItem('groceryList') ? JSON.parse(localStorage.getItem('groceryList')) : []
    groceryList.push(value); // Push the value into the array
    localStorage.setItem('groceryList', JSON.stringify(groceryList))
}
// localStorage.clear() - This wipes whole storage, be careful when using

// Display local storage
/* This function allows the localStorage to store the grocery items, so even when page is refreshed,
 the items remain within the Grocery Item list.*/
function displayStorage() {
    let exists = localStorage.getItem('groceryList');

    if (exists) { // If there is anything in the local storage
        let storageItems = JSON.parse(localStorage.getItem('groceryList'));
        storageItems.forEach(function (element) {
            createItem(element)
        })
    }
}

// remove ALL items
function removeItems() {
    // console.log('orange');
    // When the clear button is clicked, remove items from local storage.
    localStorage.removeItem('groceryList');

    let items = document.querySelectorAll('.grocery-item'); /* Select all grocery items that have
    been added to the grocery list. */
    if (items.length > 0) { // If items length is more than 0
        showAction(displayAction, `All items removed`, false)
        console.log(items);
        items.forEach(function (element) { // Iterate through list
            list.removeChild(element); // Remove 1 by 1
        })
    }
    else {
        showAction(displayAction, `No more items to delete`, true) // No more items to remove
    }

}
// edit storage
function editStorage(item) {

    let groceryItems = JSON.parse(localStorage.getItem('groceryList'));
    console.log(groceryItems); // JSON parse grocery items

    let index = groceryItems.indexOf(item); // Find the index of each grocery item
    console.log(index);
    groceryItems.splice(index, 1); // Splice array, Delete 1 item from storage
    console.log(groceryItems);

    localStorage.removeItem('groceryList'); // Delete whole local storage grocery list
    localStorage.setItem('groceryList', JSON.stringify(groceryItems)) // Set back to empty array
}