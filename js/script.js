document.addEventListener('DOMContentLoaded', () => {

    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Bascula modelo: 423',
            imagen: 'Basculas/bascula.png',
            precio: 2349
        },
        {
            id: 2,
            nombre: 'Bascula modelo: 231',
            imagen: 'Basculas/Bascula1.png ',
            precio: 9000
        },
        {
            id: 3,
            nombre: 'Bascula modelo 235',
            imagen: 'Basculas/bascula2.png',
            precio: 9000
        },
        {
            id: 4,
            nombre: 'Bascula modelo 4911',
            imagen: 'Basculas/bascula3.png',
            precio: 4032
        }

    ];

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;

    // Funciones

    /**
    * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
    */
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('col4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('imgFluid');
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${divisa}${" "+info.precio}`;
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = 'agregar';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    function anyadirProductoAlCarrito(evento) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Actualizamos el carrito 
        //renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();
    }

    /**
    * Dibuja todos los productos guardados en el carrito
    */
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        // Renderizamos el precio total en el HTML
        DOMtotal.textContent = calcularTotal();
    }

    /**
    * Evento para borrar un elemento del carrito
    */
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();

    }

    /**
     * Calcula el precio total teniendo en cuenta los productos repetidos
     */
    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    /**
    * Varia el carrito y vuelve a dibujarlo
    */
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        // Borra LocalStorage
        localStorage.clear();

    }

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (miLocalStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }
    var x=carrito
//Formularios
function escribe() {
    var age = document.getElementById("tdc");
    escribir = document.getElementById("caja")
    var elements = document.getElementById("carrito").innerHTML;
    var total = document.getElementById("total").calcularTotal;
    const img = document.createElement('img')
    var img2 = document.createElement('img'); // Uso DOM HTMLImageElement
    img2.src = '/img/logoHG.png';
    var logo = document.body.appendChild(img2);

    datosCliente = "<p>" +"<h4>Nombre del cliente: </h4>" + document.datos.name.value +" " + document.datos.lastName.value +"</p>"
    miCalle = "<p>" + document.datos.street.value + "</p>"
    domicilio= "<p>"+"<h4>Domicilio: </h4>"+ document.datos.street.value +", "+document.datos.colonia.value+", "+
    document.datos.municipio.value+", "+document.datos.estado.value+", "+document.datos.cp.value+"</p>"
    miColonia = "<p>" + document.datos.colonia.value + "</p>"
    miEstado = "<p>" + document.datos.estado.value + "</p>"
    miMunicipio = "<p>" + document.datos.municipio.value + "</p>"
    miCP = "<p>" + document.datos.cp.value + "</p>"
    miEMail = "<p>" + document.datos.mail.value + "</p>"
    miTelefono = "<p>" + age.value + "</p>"
    document.documentElement.innerHTML =
    document.write("<link rel='stylesheet'  class='CSS/style.css'>");
    document.write("<div id='app'; class='col-11'>");
    document.write("<h1>Factura</h1>");
    document.write("<div class='row my-3'>");
    document.write("<div class='col-10'>"); 
    document.write("<h2>Home Zoo</h2>");
    document.write("<img class='logoHeader' src='/img/logoHG.png' width='45wh' height='35vh display='inline-flexbox' position='relative'/>")
    document.write("<p>Av. cda Santa Cruz #4</p>");
    document.write("<p>San Miguel Topilejo</p>");
    document.write("<p>Tlalpan</p>");
    document.write("<p>CDMX</p>");
    document.write("<p>CP: 14500</p>");
    document.write("</div>");
    document.write("<div class='col-2'>");
    document.write("</div>");
    document.write("</div>");

    document.write("<hr />");
    document.write("<h5>N° de factura: 103</h5>");
    document.write("<h5>Fecha: 09/06/2021</h5>");
    document.write("<hr />");
    
    document.write("<div class='row fact-info mt-3'>");
    document.write("<div class='col-3'>");
    document.write("<h3>Facturar a</h3>");
    document.write("<p>"+datosCliente+"</p>");
    document.write("<p>"+domicilio+"</p>");
    document.write("</div>");
    document.write("<div class='col-3'>");
    document.write("<h5>Fecha de vencimiento: 09/06/2021</h5>");
    document.write("</div>");
    document.write("</div>");   

    document.write("<div class='row my-5'>");
    document.write("<table class='table table-borderless factura'>");
    document.write("<thead>");
    document.write("<tr>");
    document.write(elements);
    document.write("</tr>");
    document.write("</thead>");
    document.write("<div class=\"\">");
    

    document.write("<p></p>");
    document.write("<p></p>");
 
    
    document.write("<thead>");
    document.write("<tr>");
    document.write("");
    document.write("");

    document.write("<hr>");

    /*
    document.documentElement.innerHTML = document.getElementById("total").value + miTitulo  + miCalle + miColonia + miEstado + miMunicipio + miCP
    + miTelefono + miEMail
    escribir.innerHTML = miTitulo + miClave + miCalle + miColonia + miEstado + miMunicipio + miCP
    + miTelefono + miEMail */
    }
    var formaP;
window.onload = function() {
document.datos.ver.onclick = escribe
}
    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
}); 

//pagos
$(document).ready(function() {
    $("#opcion1").click(function() {
    $("#div1").show();
    $("#div2").hide();
    $("#div3").hide();
    $("#div4").hide();
    $("#div5").hide();
    $("#div6").hide();
    $("#div7").hide();

  });
  $("#opcion2").click(function() {
    $("#div1").hide();
    $("#div2").show();
    $("#div3").hide();
    $("#div4").hide();
    $("#div5").hide();
    $("#div6").hide();
    $("#div7").hide();
  });
  $("#opcion3").click(function() {
    $("#div1").hide();
    $("#div2").hide();
    $("#div3").show();
    $("#div4").hide();
    $("#div5").hide();
    $("#div6").hide();
    $("#div7").hide();
  }); 
  $("#opcion4").click(function() {
    $("#div1").hide();
    $("#div2").hide();
    $("#div3").hide();
    $("#div4").show();
    $("#div5").hide();
    $("#div6").hide();
    $("#div7").hide();
  }); 
  $("#opcion5").click(function() {
    $("#div1").hide();
    $("#div2").hide();
    $("#div3").hide();
    $("#div4").hide();
    $("#div5").show();
    $("#div6").hide();
    $("#div7").hide();
  });  
  $("#opcion6").click(function() {
    $("#div1").hide();
    $("#div2").hide();
    $("#div3").hide();
    $("#div4").hide();
    $("#div5").hide();
    $("#div6").show();
    $("#div7").hide();
  }); 
  $("#opcion7").click(function() {
    $("#div1").hide();
    $("#div2").hide();
    $("#div3").hide();
    $("#div4").hide();
    $("#div5").hide();
    $("#div6").hide();
    $("#div7").show();
  });        
});