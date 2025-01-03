// Access To Elements We Will Use Them

let titleInput= document.querySelector(".title");
let priceInput= document.querySelector(".price");
let taxesInput= document.querySelector(".taxes");
let adsInput= document.querySelector(".ads");
let discountInput= document.querySelector(".discount");
let calcClass= Array.from(document.querySelectorAll(".calc"));
let totalValue= document.querySelector(".total");
let countInput= document.querySelector(".count");
let categoryInput= document.querySelector(".category");
let createButton= document.querySelector(".create");
let updateButton= document.querySelector(".update");
let searchInput= document.querySelector(".search");
let allSearchButton= Array.from(document.querySelectorAll(".search-box button"));
let deleteButton= document.querySelector(".delete");
let countItemsSpan= document.querySelector(".count-items");
let tbody= document.querySelector("tbody");

// Part Of Varibales

let arrayOfData= [];
let countOfProduct, id=1, discount, total, indexProductUpdate;

if (window.localStorage.getItem("productsData")){
  arrayOfData= JSON.parse(window.localStorage.getItem("productsData"));
  updateCountOfItemsAndId();
}

// Main Code

// Calc The Total By Entering Data 
priceInput.oninput= function (){
  calcTotal();
}

taxesInput.oninput= function (){
  calcTotal();
}

adsInput.oninput= function (){
  calcTotal();
}

discountInput.oninput= function (){
  calcTotal();
}

// Creat Product And Add To Table When Reloading The Website
createProductsFromLoacaStorage();

// Creat Product And Add To Table
createButton.onclick= function (){
  if (titleInput.value !== "" && priceInput.value !== "" && taxesInput.value !== "" && adsInput.value !== "" && categoryInput.value !== ""){

    if (countInput.value !== ""){
      countOfProduct= parseInt(countInput.value);
    }
    else {
      countOfProduct= 1;
    }

    for (let x=0 ; x<countOfProduct ; x++){
      // Creat Tr
      let tr= document.createElement("tr");

      // Create Table Id
      let tdId= document.createElement("td");
      tdId.innerHTML= id;
      id+=1;
      tdId.setAttribute("class","table-id");

      // Create Table Title
      let tdTitle= document.createElement("td");
      tdTitle.innerHTML= titleInput.value;
      tdTitle.setAttribute("class","table-title");

      // Creat Table Price
      let tdPrice= document.createElement("td");
      tdPrice.innerHTML= priceInput.value;
      tdPrice.setAttribute("class","table-price");

      // Creat Table Taxes
      let tdTaxes= document.createElement("td");
      tdTaxes.innerHTML= taxesInput.value;
      tdTaxes.setAttribute("class","table-taxes");

      // Creat Table Ads
      let tdAds= document.createElement("td");
      tdAds.innerHTML= adsInput.value;
      tdAds.setAttribute("class","table-ads");

      // Creat Table Discount
      let tdDiscount= document.createElement("td");
      if (discountInput.value !== ""){
        discount= discountInput.value
        tdDiscount.innerHTML= `${discount}%`;
      }
      else {
        discount= 0;
        tdDiscount.innerHTML= discount;
      }
      tdDiscount.setAttribute("class","table-discount");

      // Creat Table Total
      let tdTotal= document.createElement("td");
      tdTotal.innerHTML= total;
      tdTotal.setAttribute("class","table-total");

      // Creat Table Category
      let tdCategory= document.createElement("td");
      tdCategory.innerHTML= categoryInput.value;
      tdCategory.setAttribute("class","table-category");

      // Creat Table update
      let tdUpdate= document.createElement("td");
      let buttonOne= document.createElement("button");

      buttonOne.setAttribute("class", "button");
      buttonOne.classList.add("table-update");
      buttonOne.innerHTML= "update";
      tdUpdate.setAttribute("class","icon-update");

      tdUpdate.appendChild(buttonOne);

      // Creat Table Delete
      let tdDelete= document.createElement("td");
      let buttonTwo= document.createElement("button");

      buttonTwo.setAttribute("class", "button");
      buttonTwo.classList.add("table-delete");
      buttonTwo.innerHTML= "delete";
      tdDelete.setAttribute("class","icon-delete");

      tdDelete.appendChild(buttonTwo);

      // Add All Td Element To Tr In Tbody
      tr.appendChild(tdId);
      tr.appendChild(tdTitle);
      tr.appendChild(tdPrice);
      tr.appendChild(tdTaxes);
      tr.appendChild(tdAds);
      tr.appendChild(tdDiscount);
      tr.appendChild(tdTotal);
      tr.appendChild(tdCategory);
      tr.appendChild(tdUpdate);
      tr.appendChild(tdDelete);

      // Add Tr Element To Tbody
      tbody.appendChild(tr);

      // Storage Data in Local Storage
      let data= {
        idProduct: id - 1,
        titleProduct: `${titleInput.value}`,
        priceProduct: `${priceInput.value}`,
        taxesProduct: `${taxesInput.value}`,
        adsProduct: `${adsInput.value}`,
        discountProduct: `${discount}`,
        totalProduct: `${total}`;
        categoryProduct: `${categoryInput.value}`,
      }
      arrayOfData.push(data);

      window.localStorage.setItem("productsData", JSON.stringify(arrayOfData));
    }

    countItemsSpan.innerHTML= `(${id - 1})`;
    // Make All Inputs Empty
    makeAllInputsEmpty();

    window.location.reload();
  }
}

// Choose The Type Of Product Search
allSearchButton.forEach((button) => {
  button.addEventListener("click", (eve) => {
    allSearchButton.forEach((button) => {
      button.classList.remove("active");
    })
    eve.currentTarget.classList.add("active");
  })
})

// Search On Product
searchInput.oninput= function (){
  searchForAProduct();
}

// Delete All Products
deleteButton.onclick= function (){
  if (tbody.hasChildNodes){
    let allTrIntbody= Array.from(document.querySelectorAll("tbody tr"));
    
    allTrIntbody.forEach((ele) => {
      ele.remove();
    })

    // Remove Data From Local Storage
    window.localStorage.clear();
    // Update Value Of Count Items
    countItemsSpan.innerHTML= "(0)";
  }
}

// Update One Product
updateOneProduct();
updateButton.onclick= function (){

  createButton.style.cssText= "display: block";
  updateButton.style.cssText= "display: none ; ";

  // Store New Values
  arrayOfData[indexProductUpdate].titleProduct= `${titleInput.value}`;
  arrayOfData[indexProductUpdate].priceProduct= `${priceInput.value}`;
  arrayOfData[indexProductUpdate].taxesProduct= `${taxesInput.value}`;
  arrayOfData[indexProductUpdate].adsProduct= `${adsInput.value}`;
  arrayOfData[indexProductUpdate].discountProduct= `${discountInput.value}`;
  arrayOfData[indexProductUpdate].categoryProduct= `${categoryInput.value}`;
  calcTotal();
  arrayOfData[indexProductUpdate].totalProduct= `${total}`;

  window.localStorage.setItem("productsData", JSON.stringify(arrayOfData));

  // Print New Values 
  tbody.innerHTML= "";
  totalValue.innerHTML= "Total:";
  makeAllInputsEmpty();
  createProductsFromLoacaStorage();

  window.location.reload();
}

// Delete One Porduct
deleteOnProduct();

// Part Of Functions

function calcTotal (){
  total= 0;
  calcClass.forEach((input) => {
    if (input.value != ""){
      total+= parseInt(input.value);
      totalValue.innerHTML= `Total: ${total}`;
    }
  })
  tempTotal= total;
  if (discountInput.value != ""){
    total= total-(total * (parseInt(discountInput.value) / 100));
    totalValue.innerHTML= `Total: ${total}`;
  }
  else {
    total= tempTotal;
    totalValue.innerHTML= `Total: ${tempTotal}`;
  }
}

function makeAllInputsEmpty(){
  titleInput.value= "";
  priceInput.value= "";
  taxesInput.value= "";
  adsInput.value= "";
  discountInput.value= "";
  countInput.value= "";
  categoryInput.value= "";
}

function createProductsFromLoacaStorage(){
  for (let x=0 ; x<arrayOfData.length ; x++){
    // Creat Tr
    let tr= document.createElement("tr");

    // Create Table Id
    let tdId= document.createElement("td");
    tdId.innerHTML= arrayOfData[x].idProduct;
    tdId.setAttribute("class","table-id");

    // Create Table Title
    let tdTitle= document.createElement("td");
    tdTitle.innerHTML= arrayOfData[x].titleProduct;
    tdTitle.setAttribute("class","table-title");

    // Creat Table Price
    let tdPrice= document.createElement("td");
    tdPrice.innerHTML= arrayOfData[x].priceProduct;
    tdPrice.setAttribute("class","table-price");

    // Creat Table Taxes
    let tdTaxes= document.createElement("td");
    tdTaxes.innerHTML= arrayOfData[x].taxesProduct;
    tdTaxes.setAttribute("class","table-taxes");

    // Creat Table Ads
    let tdAds= document.createElement("td");
    tdAds.innerHTML= arrayOfData[x].adsProduct;
    tdAds.setAttribute("class","table-ads");

    // Creat Table Discount
    let tdDiscount= document.createElement("td");
    tdDiscount.innerHTML= `${arrayOfData[x].discountProduct}%`;

    // Creat Table Total
    let tdTotal= document.createElement("td");
    tdTotal.innerHTML= arrayOfData[x].totalProduct;
    tdTotal.setAttribute("class","table-total");

    // Creat Table Category
    let tdCategory= document.createElement("td");
    tdCategory.innerHTML= arrayOfData[x].categoryProduct;
    tdCategory.setAttribute("class","table-category");

    // Creat Table update
    let tdUpdate= document.createElement("td");
    let buttonOne= document.createElement("button");

    buttonOne.setAttribute("class", "button");
    buttonOne.classList.add("table-update");
    buttonOne.innerHTML= "update";
    tdUpdate.setAttribute("class","icon-update");

    tdUpdate.appendChild(buttonOne);

    // Creat Table update
    let tdDelete= document.createElement("td");
    let buttonTwo= document.createElement("button");

    buttonTwo.setAttribute("class", "button");
    buttonTwo.classList.add("table-delete");
    buttonTwo.innerHTML= "delete";
    tdDelete.setAttribute("class","icon-delete");

    tdDelete.appendChild(buttonTwo);

    // Add All Td Element To Tr In Tbody
    tr.appendChild(tdId);
    tr.appendChild(tdTitle);
    tr.appendChild(tdPrice);
    tr.appendChild(tdTaxes);
    tr.appendChild(tdAds);
    tr.appendChild(tdDiscount);
    tr.appendChild(tdTotal);
    tr.appendChild(tdCategory);
    tr.appendChild(tdUpdate);
    tr.appendChild(tdDelete);

    // Add Tr Element To Tbody
    tbody.appendChild(tr);
  }
}

function searchForAProduct(){

  allSearchButton.forEach((ele) => {
    if (ele.classList.contains("active")){
      if (ele.classList.contains("search-by-title")){
        let allProductsTitle= Array.from(document.querySelectorAll("tbody .table-title"));

        allProductsTitle.forEach((ele) => {
          ele.parentElement.style.cssText= "display: none";
        })

        allProductsTitle.forEach((ele) => {
          if (ele.innerHTML.startsWith(`${searchInput.value.toUpperCase()}`) || ele.innerHTML.startsWith(`${searchInput.value.toLowerCase()}`)){
            ele.parentElement.style.cssText= "display: table-ceil";
          }
        })
      }
      else {
        let allProductsCategory= Array.from(document.querySelectorAll("tbody .table-category"));

        allProductsCategory.forEach((ele) => {
          ele.parentElement.style.cssText= "display: none";
        })

        allProductsCategory.forEach((ele) => {
          if (ele.innerHTML.startsWith(`${searchInput.value.toUpperCase()}`) || ele.innerHTML.startsWith(`${searchInput.value.toLowerCase()}`)){
            ele.parentElement.style.cssText= "display: table-ceil";
          }
        })
      }
    }
  })
}

function updateOneProduct(){
  let allUpdateButton= Array.from(document.querySelectorAll(".table-update"));

  allUpdateButton.forEach((button) => {
    button.addEventListener("click", (eve) => {
      eve.currentTarget.style.cssText= "background-color: #758b82";
      let parentButton= eve.currentTarget.parentElement;

      for(let x=0 ; x<arrayOfData.length ; x++){
        if (arrayOfData[x].idProduct === parseInt(parentButton.parentElement.firstElementChild.innerHTML)){

          createButton.style.cssText= "display: none";
          updateButton.style.cssText= "display: block";

          titleInput.value= arrayOfData[x].titleProduct;
          priceInput.value= arrayOfData[x].priceProduct;
          taxesInput.value= arrayOfData[x].taxesProduct;
          adsInput.value= arrayOfData[x].adsProduct;
          discountInput.value= arrayOfData[x].discountProduct;
          totalValue.innerHTML= `Total: ${arrayOfData[x].totalProduct}`;
          categoryInput.value= arrayOfData[x].categoryProduct;

          indexProductUpdate= x;
          break;
        }
      }
    })
  })
}

function deleteOnProduct(){
  let allDeleteButton= Array.from(document.querySelectorAll("table .icon-delete"));
  allDeleteButton.forEach((button) => {
    button.onclick= function (){
      let trParent= button.parentElement;

      for(let x=0 ; x<arrayOfData.length ; x++){
        if (arrayOfData[x].idProduct == parseInt(trParent.firstElementChild.innerHTML)){
          // Delete The tr Element
          arrayOfData.splice(x,1);
          // Update Values Id In Array Data
          for (let y=0 ; y<arrayOfData.length ; y++){
            arrayOfData[y].idProduct= y+1;
          }
          // Clear The Content In Tbody Element
          tbody.innerHTML= "";
          if (arrayOfData.length >= 1){
            // Update Value Of Id And Count Of Items
            updateCountOfItemsAndId();
            // Store The New Array Data In Local Storage
            window.localStorage.setItem("productsData",JSON.stringify(arrayOfData));
            // Update The Table Of Products After The Delete
            createProductsFromLoacaStorage();
          }
          else {
            window.localStorage.clear();
            id= 1;
            countItemsSpan.innerHTML= `(${id - 1})`;
          }
          break;
        }
      }
      window.location.reload();
    }
  })
}

function updateCountOfItemsAndId(){
  id= arrayOfData[arrayOfData.length-1].idProduct + 1;
  countItemsSpan.innerHTML= `(${id - 1})`;
}
