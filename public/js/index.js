document.addEventListener('DOMContentLoaded', () => {
    // fetch products.json data 
    fetch('http://localhost:5000/getAll')
    .then(response => response.json());

    close_btn.style.visibility = 'hidden';
    search_box.value = ""; // clear search box
});   

const close_btn = search_form.close_btn;
var clear_data = document.getElementById("clear_data");
var search_box = search_form.search_box;
var items_result =  document.getElementById("items_result");

function btn_setVisibility() {
    if (!search_box.value) close_btn.style.visibility = 'hidden';
    else close_btn.style.visibility = 'visible';
} // controls search box close button visibility

function clearData() {
    let table = document.getElementById('search_table').getElementsByTagName('tbody')[0];
    table.innerHTML = "<tr><td></td></tr>";
    items_result.innerHTML = "All Items Cleared!";
} // clear HTML table results 

function searchForItem() {

    let search_key = search_box.value;
    // if the search key is empty don't make a request 
    if (!search_key) return; 

    fetch('http://localhost:5000/search/' + search_key)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

function delaySearch(timer = null) {
    clearTimeout(timer);
    timer = setTimeout(searchForItem, 1000);
}

function loadHTMLTable(data) {
    const table = document.getElementById('search_table').getElementsByTagName('tbody')[0];
    table.innerHTML = "";

    for (let obj of data) {
        let newRow = table.insertRow(table.rows.length);
        newRow.innerHTML += `<tr> 
                    <td>${obj.prod_name}</td>
                    <td>${obj.prod_category}</td>
                    <td>${obj.prod_size}</td>
                    <td>R ${obj.prod_sellingPrice}</td> </tr>`;
    }
    
    // TODO 
    // Show results in user friendly way
    items_result =  document.getElementById("items_result");
    items_result.innerHTML = data.length + " Item(s) found";
} // load HTML search table with results