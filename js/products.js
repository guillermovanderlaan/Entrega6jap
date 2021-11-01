// Variables que van a determinar los criterios por los cuales se van a ordenar los filtros, tanto de precios como de relevancia.//

const ORDER_ASC_BY_PRICE = "Price+";
const ORDER_DESC_BY_PRICE = "Price-";
const ORDER_BY_RELEVANCY = "Relevancy";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array){
  let result = [];
  if (criteria === ORDER_ASC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ) return -1;
            if ( a.cost > b.cost ) return 1;
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ) return -1;
            if ( a.cost < b.cost ) return 1;
            return 0;
        });
    }else if (criteria === ORDER_BY_RELEVANCY){
        result = array.sort(function(a, b) {
          let aSold = parseInt(a.soldCount);
          let bSold = parseInt(b.soldCount);

          if ( aSold > bSold ) return -1;
          if ( aSold < bSold ) return 1;
            return 0;
        });
    }

  return result;
}


function showProductsList(){
  let htmlContentToAppend = "";

  for(product of currentProductsArray){ //Para cada producto de mi array de productos actuales
    const {cost, imgSrc, description, soldCount, name, currency} = product; // Desestructuracion de objeto,(para acceder mas facilmente a las propiedades del producto)
      
    if (((minCost == undefined) || (minCost != undefined && parseInt(cost) >= minCost)) && //Voy a mostrar el producto siempre y cuando:
        ((maxCost == undefined) || (maxCost != undefined && parseInt(cost) <= maxCost))){  //No haya un filtro puesto, o si el producto esta dentro de los rangos establecidos

        htmlContentToAppend += `
        <div class="col-md-4" style="display: inline-block;">    
        <a href= "product-info.html" class="card mb-4 shadow-sm custom-card">
            <img class="bd-placeholder-img card-img-top" src="${imgSrc}">
            <h3 class="ml-3 mr-3 mt-3 mb-0">${name} </h3>    
            <div class="card-body pt-1">
            <small class="text-muted"> ${soldCount} vendidos </small>
            <p class="card-text mt-3 mb-2">${description}</p>
            <small class="text-muted">${cost} ${currency} </small>
            </div>
        </a>
    </div>
        `
      }
      document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; //Inserto los htmls de mis productos en en div padre para mostrar.
  }
}

function sortAndShowProducts(sortCriteria, productsArray){
  currentSortCriteria = sortCriteria; //Establezco mi criterio de ordenamiento

  if(productsArray != undefined){
      currentProductsArray = productsArray; //Establezco mi array de productos siempre y cuando no este vacio
  }

  currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray); //Reordeno mis productos de acuerdo al criterio de ordenamiento establecido

  showProductsList(); //Muestro los productos ordenados
}


//Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado, 
// es decir, se encuentran todos los elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
      sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
    }
  });
  
  document.getElementById("sortAscPrice").addEventListener("click", () => {
    sortAndShowProducts(ORDER_ASC_BY_PRICE);
  });

  document.getElementById("sortDescPrice").addEventListener("click", () => {
      sortAndShowProducts(ORDER_DESC_BY_PRICE);
  });

  document.getElementById("sortBySoldCount").addEventListener("click", () => {
      sortAndShowProducts(ORDER_BY_RELEVANCY);
  });

  document.getElementById("clearRangeFilter").addEventListener("click", () => {
    document.getElementById("rangeFilterPriceMin").value = "";
    document.getElementById("rangeFilterPriceMax").value = "";

    minCost = undefined;
    maxCost = undefined;

    showProductsList();
  });



  document.getElementById("rangeFilterPrice").addEventListener("click", () => {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
    minCost = document.getElementById("rangeFilterPriceMin").value;
    maxCost = document.getElementById("rangeFilterPriceMax").value;

      if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0)
          minCost = parseInt(minCost);
      else
          minCost = undefined;

      if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0)
          maxCost = parseInt(maxCost);
      else
          maxCost = undefined;
      
      showProductsList();
  });
  
});