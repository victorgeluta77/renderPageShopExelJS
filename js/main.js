
const url = '../file/text.txt';

const mainShop = document.querySelector('.main_shop');

 async  function readfile(url){
    let text = await fetch(url);
    console.log(text.status);
    let textDani;
    if (text.status == 200)textDani = await text.text(); 
    console.log(textDani);
 }

 readfile(url);

const exelfile = '../file/dani.xlsx';

async function readExel(url){
      let textE = await fetch(url); // return respons
      let textExel = await textE.arrayBuffer(); // read respons as ArrayBuffer- exel. file is  binary type
      let data = new Uint8Array(textExel); // read data as earch number from 0 to 255
      let workbook =  XLSX.read(data,{type : "array"}); // conver data to array
      console.log(workbook);
      let XL_row_object = []; 
      console.log(workbook.SheetNames);  
    
     workbook.SheetNames.forEach(function(sheetName) {
        // Here is your object
        if (sheetName == 'shop'){
             XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]); 
        }         
        // var json_object = JSON.stringify(XL_row_object);
        
     });

     renderShop(XL_row_object);
};

readExel(exelfile);
//  let workbook = XLSX.readfile(ArrayBuffer,{type : "binary"});
//  console.log(workbook);

function renderShop (exelData){
    console.log(exelData);
    exelData.forEach(item=>{
        const div = document.createElement('div');
        div.className = 'product_shop';
        div.innerHTML = `
        <img src="${item.img}" alt="">;
        <p>name : ${item.name}</p>
        <p>code : ${item.code}</p>
        <p>price : ${item.price} &#8372/kg. </p>
        `;
        mainShop.append(div);
    });
   
}