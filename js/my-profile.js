//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});

// Creo un arreglo vacío en donde voy a poner toda la información proveniente de mis inputs aquí para luego mostrarla en el local storage
var profile = {}

var datos = JSON.parse(localStorage.getItem("profile"));

  if (datos) {
    document.getElementById("nombre").value = datos.firstname;
    document.getElementById("apellido").value = datos.lastname;
    document.getElementById("edad").value = datos.age;
    document.getElementById("email").value = datos.email;
    document.getElementById("tel").value = datos.phone;
  }

//Funcion por la cual voy a obtener los valores de cada uno de los inputs, luego almacenarlos en el objeto "PROFILE" el cual contendrá toda esa información 

function SaveProfile(){
  
  profile.firstname = document.getElementById("nombre").value;
  profile.lastname= document.getElementById("apellido").value;
  profile.age = document.getElementById("edad").value;
  profile.email = document.getElementById ("email").value;
  profile.phone = document.getElementById("tel").value;
 // Una vez que tenga el objeto profile con toda la informacion completo, voy a pasar a transformar todos esos datos en una cadena de texto y guardarlo en el localstorage a ese objeto con el nombre nuevamente de profile
  localStorage.setItem("profile", JSON.stringify(profile));
} 

//Este es el evento por el cual al presionar el boton de guardar se va a ejecutar la función para guardar mis datos
document.getElementById("guardar").addEventListener("click",function(e){
  SaveProfile()
})
// Creo una variable constante para agarrar el elemento fotodeperfil
const Imagenactual = localStorage.getItem("fotoperfil");

//Evento por el cual al cargar una imagen desde mi input de file, va a tomar la imagen y la va a cargar para luego mostrarla en pantalla, almacena la imagen en el localstorage y luego la muestra
document.getElementById("pic").addEventListener("change", function(){
    const reader = new FileReader();       

    reader.addEventListener("load", () => {
        localStorage.setItem("fotoperfil", reader.result);
    });

    reader.readAsDataURL(this.files[0]);

    location.reload()
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    if (Imagenactual) {
        document.getElementById("fotomuestra").setAttribute("src", Imagenactual);
        document.getElementById("fotomuestra").style.display = "block";
    }
});