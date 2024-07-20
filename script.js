// Getting values from id and saving it to a variable
const productNameInput = document.getElementById("exampleDataList");
const quantityInput = document.getElementById("quantity");
const invoiceBody = document.getElementById("invoiceBody");
const totalAmountDisplay = document.getElementById("totalAmount");

// writing a function for getting product name and getting price of it
function priceInput(productNameInp) {
  if (productNameInp == "LIGHTRUN EDGE FORCE") {
    var priceIn = 2999;
  } else if (productNameInp == "RUNNING X 4D HEAT.RDY") {
    var priceIn = 919;
  } else if (productNameInp == "POMAZOR SHOES") {
    var priceIn = 1799;
  } else if (productNameInp == "QGRAPHIC TEE") {
    var priceIn = 3999;
  } else if (productNameInp == "TRAE YOUNG 3 SHOES") {
    var priceIn = 799;
  } else if (productNameInp == "ADICOLOR- BAG PACK") {
    var priceIn = 2999;
  }
  return priceIn;
}

// function WhenClicked(productNameInp) {
//   if (productNameInp == "LIGHTRUN EDGE FORCE") {
//     var priceIn = 2999;
//   } else if (productNameInp == "RUNNING X 4D HEAT.RDY") {
//     var priceIn = 919;
//   } else if (productNameInp == "POMAZOR SHOES") {
//     var priceIn = 1799;
//   } else if (productNameInp == "QGRAPHIC TEE") {
//     var priceIn = 3999;
//   } else if (productNameInp == "TRAE YOUNG 3 SHOES") {
//     var priceIn = 799;
//   } else if (productNameInp == "ADICOLOR- BAG PACK") {
//     var priceIn = 2999;
//   }
//   return priceIn;
//   alert("Added to Checkout");
// }
// writing a function to generate invoice of the sunmmary

function generateInvoice() {
  var invoiceTable = document.getElementById("invoice").outerHTML;
  var totalAmount = document.getElementById("totalAmount").innerHTML;

  var invoiceWindow = window.open("", "_blank");
  invoiceWindow.document.write("<style>");
  invoiceWindow.document.write("body { font-family: Arial, sans-serif; }");
  invoiceWindow.document.write(
    "table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }"
  );
  invoiceWindow.document.write(
    "th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }"
  );
  invoiceWindow.document.write("th { background-color: #f2f2f2; }");
  invoiceWindow.document.write("#totalAmount { font-weight: bold; }");
  invoiceWindow.document.write(
    "#invoiceTitle { text-align: center; background-color:green; color:white; font-size: 24px; margin-bottom: 20px; }"
  );
  invoiceWindow.document.write("</style>");
  invoiceWindow.document.write("</head><body>");
  invoiceWindow.document.write('<h1 id="invoiceTitle">Invoice</h1>');
  invoiceWindow.document.write("<table>");
  invoiceWindow.document.write("<tr>");
  invoiceWindow.document.write("<th> Product Name </th>");
  invoiceWindow.document.write("<th> Quantity</th>");
  invoiceWindow.document.write("<th> Price </th>");
  invoiceWindow.document.write("</tr>");

  // Iterate through the rows of the table
  var rows = invoiceBody.rows;
  for (let i = 0; i < rows.length; i++) {
    invoiceWindow.document.write("<tr>");

    // Iterate through the cells of the row, selecting only the first three cells
    for (let j = 0; j < 3; j++) {
      invoiceWindow.document.write("<td>");
      invoiceWindow.document.write(rows[i].cells[j].innerHTML);
      invoiceWindow.document.write("</td>");
    }

    invoiceWindow.document.write("</tr>");
  }

  invoiceWindow.document.write("</table>");
  invoiceWindow.document.write('<p id="totalAmount">' + totalAmount + "</p>");
  invoiceWindow.document.close();
  invoiceWindow.print();
}

// writing a function to clear the form
function clearForm() {
  productNameInput.value = "";
  quantityInput.value = "";
}

// writing a function Superior to other function where all the functions are called
function Addall() {
  addProductToTable();
  updateTotal();
  console.log("Added total");
  showInvoiceButton();
  console.log("Went to invoice button ");
}

// function to show invoice button
function showInvoiceButton() {
  invoiceButton.style.display = "block";
}

// function to add production to table when button is clicked
function addProductToTable() {
  const productName = productNameInput.value;
  const quantity = parseInt(quantityInput.value, 10);
  const priceInp = priceInput(productName);
  const total = quantity * priceInp;
  console.log(total);

  const newRow = invoiceBody.insertRow();
  newRow.insertCell().textContent = productName;
  newRow.insertCell().textContent = quantity;
  newRow.insertCell().textContent = Math.trunc(total.toFixed(2));
  const deleteButtonCell = newRow.insertCell();
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    delete_row(this);
    updateTotal();
  });
  deleteButtonCell.appendChild(deleteButton);

  clearForm();
}

// function to apdate the overall total
function updateTotal() {
  console.log("Has entered the function");
  let total = 0;
  const rows = invoiceBody.rows;
  console.log(rows.length);

  for (let i = 0; i < rows.length; i++) {
    const rowTotal = parseFloat(rows[i].cells[2].textContent);
    total += rowTotal;
  }

  totalAmountDisplay.textContent = `Total Amount: ₹${Math.trunc(
    total.toFixed(2)
  )}`;
}
function delete_row(e) {
  e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);
}
