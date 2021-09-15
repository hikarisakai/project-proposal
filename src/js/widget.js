// option to clear all data entries?

let button = document.getElementById("submitBtn");
let fName = document.getElementById("fName");
let lName = document.getElementById("lName");
let email = document.getElementById("email");
let level = document.getElementById("level");
let table = document.getElementById("table");

// Add event listeners
button.addEventListener("click", addStudent);
fName.addEventListener("click", newEntry);
lName.addEventListener("click", newEntry);
email.addEventListener("click", newEntry);
level.addEventListener("click", newEntry);

// Click "+" button: add new student and change button appearance
function addStudent() {
    // Validate input
    // If empty, outline input box in red
    let error = false;
    if (fName.value == "") {
        fName.classList.add("error");
        error = true;
    }
    if (lName.value == "") {
        lName.classList.add("error");
        error = true;
    }
    if (email.value == "") {
        email.classList.add("error");
        error = true;
    }
    if (error == true) {
        window.alert("Please fill missing field(s).")
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
    addRow();

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

    // Add color to levels in table
    grade.classList.add("grade");
    console.log(level.value);
    switch(level.value) {
        case 'Freshman':
            grade.classList.add("freshman");
            break;
        case 'Sophomore':
            grade.classList.add("sophomore");
            break;
        case "Junior":
            grade.classList.add("junior");
            break;
        case "Senior":
            grade.classList.add("senior");
            break;
        default:
            break;
    }
    

    // Add edit icon
    var edit = document.createElement('img');
    edit.src = "./img/edit.png";
    edit.style.width = '15px';
    edit.style.height = '15px';
    cell5.appendChild(edit);
}
