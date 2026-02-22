let table = document.getElementsByClassName("sheet-body")[0],
rows = document.getElementsByClassName("rows")[0],
columns = document.getElementsByClassName("columns")[0]
tableExists = false

const generateTable = () => {
    let rowsNumber = parseInt(rows.value), columnsNumber = parseInt(columns.value)
    
    // if input is empty
    if(!rowsNumber || !columnsNumber){
        swal("Oops!", "Please enter valid rows and columns numbers.", "warning");
        tableExists = false;
        return
    }
    table.innerHTML = ""
    for(let i=0; i< rowsNumber; i++){
        var tableRow = ""
        for(let j=0; j<columnsNumber; j++){
            tableRow += `<td contenteditable></td>`
        }
        table.innerHTML += tableRow
    }
    
    tableExists = true
    
}

const ExportToExcel = (type, fn, dl) => {
    if(!tableExists){
        swal("No Table Found!", "Please generate a table before exporting.", "error");
        return
    }
    var elt = table
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" })
    return dl ? XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' })
        : XLSX.writeFile(wb, fn || ('MyNewSheet.' + (type || 'xlsx')))
}