document.addEventListener('DOMContentLoaded', () => {
   
    // fetch data(json) from router IP address, port:5000
    fetch('http://localhost:5000/getAll')
    .then(response => response.json());

    close_btn.style.visibility = 'hidden';
    cash.value = "";
    search_box.value = "";
});

const close_btn = search_form.close_btn;

var clear_data = document.getElementById("clear_data");
var search_box = search_form.search_box;

var items_result =  document.getElementById("items_result");
var num_items =  document.getElementById("num_items");
var itemsAdded = 0;

var cash = document.getElementById("cash_input_box");
var total = document.getElementById("total");
var change = document.getElementById("change");

var total_price = 0;

var table = document.getElementById('cart_search_table').getElementsByTagName('tbody')[0];
var cart_table = document.getElementById('cart_table').getElementsByTagName('tbody')[0];

function btn_setVisibility() {
    if (!search_box.value) close_btn.style.visibility = 'hidden';
    else close_btn.style.visibility = 'visible';
} // controls search box close button visibility

function searchForItem() {
    let search_key = search_box.value;

    if (!search_key) {
        return; // if the search term is an empty string don't bother making a request 
    }

    fetch('http://localhost:5000/search/' + search_key)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));

    /* fetch call disabled as no database exists
    * // fetch data(json) from router IP address, port:5000
    */
}

function clearData() {
    table.innerHTML = "<tr><td></td></tr>";
    items_result.innerHTML = "All Items Cleared!";
} // clear HTML table results 

function clearCart() {
    cart_table.innerHTML = "";
    cash.value = "";

    itemsAdded = 0;
    num_items.innerHTML = itemsAdded;

    total_price = 0;
    total.innerHTML = "R " + total_price;
    change.innerHTML = "R " + total_price;
} // clear HTML cart table items 

function calculateChange() {
    if (cash.value) 
        change.innerHTML =  "R " + (Number(cash.value) - total_price).toFixed(2);
}

function increaseItemPrice(btn) {
    
    let row = btn.parentNode.parentNode;

    let qty = Number(row.cells[5].innerHTML); // cell 5 in HTML table
    let item_price = row.cells[7].innerHTML;
    item_price = Number( item_price.replace(/[^\d.-]/g, '') );

    // check if only one item is added
    if (qty == 1) {
        row.cells[7].innerHTML = "R " + (item_price + item_price).toFixed(2); 
        total_price += item_price;

    }else { 
        // more than one item already exits
        // increment item price with its unit value
        row.cells[7].innerHTML = "R " + (item_price + item_price/qty).toFixed(2);
        total_price += item_price/qty;
    }

    total.innerHTML ="R " + total_price.toFixed(2);
    calculateChange();

    row.cells[5].innerHTML = ++qty;
}

function decreaseItemPrice(btn) {
    
    let row = btn.parentNode.parentNode;

    let qty = Number(row.cells[5].innerHTML); // cell 5 in HTML table
    let item_price = row.cells[7].innerHTML;
    item_price = Number( item_price.replace(/[^\d.-]/g, '') );

    // check if only one item is left
    if (qty == 1) removeCartItem(btn); 
    else {
        // more than one item already exits
        // decrement item price with its unit value
        row.cells[7].innerHTML = "R " + (item_price - item_price/qty).toFixed(2);
        total_price -= item_price/qty;
    }

    total.innerHTML ="R " + total_price.toFixed(2);
    calculateChange();

    row.cells[5].innerHTML = --qty;
}

function loadHTMLTable(data) {
    table.innerHTML = "";

    for (let obj of data) {

        let newRow = table.insertRow(table.rows.length);

        // hide product id from displaying in the table
        newRow.innerHTML += `<tr> 
                    <td hidden>${obj.prod_ID}</td> 
                    <td>${obj.prod_name}</td>
                    <td>${obj.prod_category}</td>
                    <td>${obj.prod_size}</td>
                    <td>R ${obj.prod_sellingPrice}</td>
                    <td><input class='add-btn' type='button' onclick='getHTMLTableData()' value='Add'></td>
                    </tr>`;
    }
    
    items_result =  document.getElementById("items_result");
    items_result.innerHTML = data.length + " Item(s) found";

    // search_box.value = ""; 

    getHTMLTableData();
} // load HTML search table with results

function getHTMLTableData() {
    let rowData;

    for (let i = 0; i < table.rows.length; i++) {
       
        table.rows[i].onclick = function() {

            rowData = [ this.cells[0].innerHTML,
                this.cells[1].innerHTML,
                this.cells[2].innerHTML,
                this.cells[3].innerHTML,
                this.cells[4].innerHTML,
            ];

            let prod_id = this.cells[0].innerHTML;

            if ( !itemExists(prod_id) ) {
                let item_price = this.cells[4].innerHTML;
                item_price = Number( item_price.replace(/[^\d.-]/g, '') );

                total_price += item_price;
                total.innerHTML ="R " + total_price.toFixed(2);
                calculateChange();

                addCartItem(rowData);
            }   
        }
    }
}

function itemExists(prod_id) {

    if ( cart_table.rows.length > 1 ) {
        for (let i = 1; i < cart_table.rows.length; i++) {
            let row_prod_id = cart_table.rows[i].cells[0].innerHTML;

            if (row_prod_id === prod_id) return true;
        }
    }

    return false;
}

function addCartItem(rowData) {

    let newRow = cart_table.insertRow(cart_table.rows.length);
    newRow.innerHTML += "<tr>";
    newRow.innerHTML += `<td hidden>${rowData[0]}</td>`;
        
    for (let i = 1; i < rowData.length; i++) {
        if (i == 4) {
            newRow.innerHTML += "<td><input id='minus' onclick='decreaseItemPrice(this)'  type='button' value='-'></td>";
            newRow.innerHTML += "<td id='qty'>1</td>";
            newRow.innerHTML += "<td><input id='plus' onclick='increaseItemPrice(this)' type='button' value='+'></td>";   
        }

        newRow.innerHTML += `<td>${rowData[i]}</td>`;   
    }

    newRow.innerHTML += "<td><input onclick='removeCartItem(this)' class='remove-btn' type='button' value='Remove'></td>";
    newRow.innerHTML += "</tr>";

    num_items.innerHTML = ++itemsAdded;
}

function removeCartItem(btn) {

    let row = btn.parentNode.parentNode;

    let item_price = row.cells[7].innerHTML;
    item_price = Number( item_price.replace(/[^\d.-]/g, '') );

    total_price -= item_price;
    total.innerHTML ="R " + total_price.toFixed(2);
    calculateChange();

    num_items.innerHTML = --itemsAdded;

    row.parentNode.removeChild(row);
} 

let timer = null;

const delaySearch = () => {
    
    clearTimeout(timer);
    timer = setTimeout(searchForItem, 1000);
}