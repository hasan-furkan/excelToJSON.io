let selectedFile;
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data=[{
    "name":"hfk",
    "data":"scd",
    "abc":"sdef"
}]


document.getElementById('button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if(selectedFile){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
            let data = event.target.result;
            let workbook = XLSX.read(data,{type:"binary"});
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
            });
        }
    }
});


function copy() {
    const copyText = document.getElementById("jsondata").textContent;
    const textArea = document.createElement('textarea');
    textArea.textContent = copyText;
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");

    document.getElementById("success").style.display = "block"
    document.getElementById("success").innerHTML = "copy to clipboard"

    setTimeout(() => {
        document.getElementById("success").style.display = "none"

    } , 1000)

}
