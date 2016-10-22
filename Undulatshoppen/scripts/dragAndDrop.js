function addDnDHandlers() {

    var productimages = document.getElementById("produkbillede");

    var indkøbskurvDropzone = document.getElementById("indkøbskurv");
    var indkøbskurv = document.querySelectorAll("#indkøbskurv ul")[0];
    /* konstruktor for local storage*/
    var Kurv = (function() {
        this.products = new Array();

    });
    /*konstruktor*/

    var Produkt = (function(id, price) {
        this.produktId = id;
        this.price = price;
    });

    var currentKurv = null;
    currentKurv = JSON.parse(localStorage.getItem('kurv'));
    if (!currentKurv) {
        createEmptyKurv();
    }
    /* synkroniser UI , bliver implemnteret nederst*/
         UpdateIndkøbsKurvUI();
         currentKurv.addProduct = function(product) {
         currentKurv.products.push(product);

        localStorage.setItem("indkøbskurv", JSON.stringify(currentKurv));
    }


    for (var i = 0; i < productimages.length; i++) {
        productimages[i].addEventListener("dragstart", function(ev) {
            ev.dataTransfer.effectAllowed = 'copy';
            ev.dataTransfer.setData("Text", this.getAttribute("id"));
        }, false);
    }

    indkøbskurvDropzone.addEventListener("dragover", function(ev) {
        if (ev.preventDefault)
            ev.preventDefault();
        ev.dataTransfer.dropEffect = "copy";
        return false;
    }, false);

    indkøbskurvDropzone.addEventListener("drop", function(ev) {
        if (ev.stopPropagation)
            ev.stopPropagation();

        var produktID = ev.dataTransfer.getData("Text");
        var element = document.getElementById(produktID);

        addProductToIndkøbskurv(element, produktID);
        ev.stopPropagation();

        return false;

    }, false);

    function addProductToIndkøbskurv(item, id) {
        var price = item.getAttribute("produktpris");

        var product = new Product(id, price);
        currentKurv.addProduct(product);

        UpdateIndkøbsKurvUI();
    } 
    /*local storage*/
    function createEmptyKurv() {
        localStorage.clear();
        localStorage.setItem("kurv", JSON.stringify(new Kurv()));
        currentKurv = JSON.parse(localStorage.getItem("kurv"));
    }

    function UpdateIndkøbsKurv() {

        indkøbskurv.innerHTML = "";
        for (var i = 0; i < currentKurv.products.length; i++) {
            var liElement = document.createElement("li");
            liElement.innerHTML = currentKurv.products[i].produktId + currentKurv.products[i].getItem("kurv");
                indkøbskurv.appendChild(liElement);
        }
        
    }

}