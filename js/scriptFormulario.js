function escribe() {
    escribir = document.getElementById("caja")
    miTitulo = "<p>" + document.datos.name.value + "</p>"
    miClave = "<p>" + document.datos.lastName.value + "</p>"
    miCalle = "<p>" + document.datos.street.value + "</p>"
    miColonia = "<p>" + document.datos.colonia.value + "</p>"
    miEstado = "<p>" + document.datos.estado.value + "</p>"
    miMunicipio = "<p>" + document.datos.municipio.value + "</p>"
    miCP = "<p>" + document.datos.cp.value + "</p>"
    miTelefono = "<p>" + document.datos.phoneNumber.value + "</p>"
    miEMail = "<p>" + document.datos.mail.value + "</p>"
    escribir.innerHTML = miTitulo + miClave + miCalle + miColonia + miEstado + miMunicipio + miCP
    + miTelefono + miEMail
    }
window.onload = function() {
document.datos.ver.onclick = escribe
} 
