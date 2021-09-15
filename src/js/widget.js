// Edit icon image credit: https://commons.wikimedia.org/wiki/File:Edit_icon_(the_Noun_Project_30184).svg
// Trash icon image credit: https://www.iconfinder.com/icons/115789/trash_icon
// option to clear all data entries?

let button = document.getElementById("submitBtn");
let fName = document.getElementById("fName");
let lName = document.getElementById("lName");
let email = document.getElementById("email");
let level = document.getElementById("level");
let table = document.getElementById("table");

// Set size for edit/trash icons
var iconSize = '18px';

// Editing: True if currently editing table, False otherwise
let editing = false;
let currRow = '';

// Add event listeners
button.addEventListener("click", addStudent);
fName.addEventListener("click", newEntry);
lName.addEventListener("click", newEntry);
email.addEventListener("click", newEntry);
level.addEventListener("click", newEntry);

// Click "+" button: add new student and change button appearance
function addStudent() {
    
    // Validate input
    // Alert for any error
    if (validateInput() == true) {
        window.alert("Please fix red field(s).")
        return;
    }

    // Change button appearance
    button.style.color = "white";
    button.style.backgroundColor ="#4a4a4a";
    // Change "+"" to check mark
    button.textContent =  "\u2713";
    button.style.fontWeight = "normal";
    button.style.fontSize = "18px";

    // Update table
    // If editing row, only change selected row
    if (editing == true) {
        editTable();
        editing = false;
    // Otherwise add a new row
    } else {
        addRow();
    }

    // Reset input value
    fName.value = "";
    lName.value = "";
    email.value = "";
}

// New entry: resets button appearance
// Occurs when user clicks any of the input values on the form
function newEntry() {
    button.style.color = "#4a4a4a";
    button.style.backgroundColor = "white";
    button.textContent = "+";
    button.style.fontWeight = "bold";
    button.style.fontSize = "20px";
}

// Add new row in table with user input
function addRow() {
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);

    // Fill table cells with user input
    cell1.textContent = fName.value;
    cell2.textContent = lName.value;
    cell3.textContent = email.value;

    var grade = document.createElement("p");
    grade.textContent = level.value;
    cell4.appendChild(grade);

    // Add color to level
    grade.classList.add("grade");
    console.log(level.value);
    switch(level.value) {
        case 'Freshman':
            // Color: Green
            grade.classList.add("freshman");
            break;
        case 'Sophomore':
            // Color: Orange
            grade.classList.add("sophomore");
            break;
        case "Junior":
            // Color: Purple
            grade.classList.add("junior");
            break;
            // Color: Blue
        case "Senior":
            grade.classList.add("senior");
            break;
        default:
            break;
    }
 
    // Add edit icon to row
    var edit = document.createElement('img');
    edit.src = "./img/edit.png";
    edit.style.width = iconSize;
    edit.style.height = iconSize;
    edit.style.padding = '0px 5px';
    edit.addEventListener("click", editEntry);
    cell5.appendChild(edit);
    cell5.style.textAlign = "center";

    // Add trash icon to row
    var trash = document.createElement('img');
    trash.src = "./img/trash.png";
    trash.style.width = iconSize;
    trash.style.height = iconSize;
    trash.style.padding = '0px 5px';
    trash.addEventListener("click", deleteEntry);
    cell5.appendChild(trash);
}

// Delete row if trash icon is clicked
function deleteEntry() {
    var index = this.parentNode.parentNode.rowIndex;
    table.deleteRow(index);
}

// Edit button clicked
// Fill form with values from the row being edited
function editEntry() {
    row = this.parentNode.parentNode;
    document.getElementById("fName").value = row.cells[0].textContent;
    document.getElementById("lName").value = row.cells[1].textContent;
    document.getElementById("email").value = row.cells[2].textContent;
    document.getElementById("level").value = row.cells[3].textContent;
    
    // Color selected row
    row.style.backgroundColor = '#f6f6f3';
    editing = true;

    // Reset appearance of '+' button
    newEntry();
}

// Enter edited input into selected row
function editTable() {
    table.rows[row.rowIndex].cells[0].textContent = fName.value;
    table.rows[row.rowIndex].cells[1].textContent = lName.value;
    table.rows[row.rowIndex].cells[2].textContent = email.value;
    table.rows[row.rowIndex].cells[3].textContent = level.value;
}

// Validate input
// Checks if fields are missing or invalid format
// Error: outline input field(s) in red
function validateInput() {
    var error = true;
    // Check if any of the fields are empty
    if (fName.value == "") {
        fName.classList.add("error");
    }
    if (lName.value == "") {
        lName.classList.add("error");
    }
    // Also check if email is in valid format
    if (email.value == "" || checkEmail() == false) {
        email.classList.add("error");
    }
    else {
        error = false;
    }
    return error;
}

// Validate email format 
// Check if email is in format string@string.string
function checkEmail() {
    var format = /\S+@\S+\.\S+/;
    return format.test(email.value);
}
