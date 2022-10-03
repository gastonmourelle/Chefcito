var ruta = window.location.href;
var posicion = ruta.indexOf("=");
var idEdit = ruta.substring(posicion + 1);

//alert(ruta);




$.ajax({
    url: "http://cda2020.develotion.com/apps/220111_app/ingredientes.php",
//    url: "api/ingredientes.php",
    type: "GET",
    dataType: "JSON",
    success: mostrarIngredientes

});

var datosIngredientes;
function mostrarIngredientes(rep){
    datosIngredientes=rep;
    editarIngrediente();
}

function editarIngrediente(){
    for (var i = 0; i < datosIngredientes.lista.length; i++) {
        if (datosIngredientes.lista[i].id === idEdit) {
            $("#txtNombreIng").val(datosIngredientes.lista[i].nombre);
            }
}

$("#btnEditarIng").click(ingredienteEditado);
}

$.ajax({
    url: "http://cda2020.develotion.com/apps/220111_app/recetas.php",
//    url: "api/recetas.php",
    type: "GET",
    dataType: "JSON",
    success: mostrarRecetas

});

var datosRecetas;
function mostrarRecetas(respuesta) {
    datosRecetas = respuesta;
    editarReceta();
}



function editarReceta() {
//    idReceta = $(this).attr("id");

    for (var i = 0; i < datosRecetas.lista.length; i++) {
        if (datosRecetas.lista[i].id === idEdit) {
            $("#txtNombre").val(datosRecetas.lista[i].nombre);

            $("#sClasificacion").val();

            $("#txtPreparacion").val(datosRecetas.lista[i].preparacion);
            $("#txtTiempo").val(datosRecetas.lista[i].tiempo);

            if (datosRecetas.lista[i].habilidad === 'Básico') {
                $("#sHabilidad").append("<option value='Básico' selected>Básico</option><option value='Intermedio'>Intermedio</option><option value='Avanzado'>Avanzado</option>");
            } else if (datosRecetas.lista[i].habilidad === 'Intermedio') {
                $("#sHabilidad").append("<option value='Básico'>Básico</option><option value='Intermedio' selected>Intermedio</option><option value='Avanzado'>Avanzado</option>");
            } else {
                $("#sHabilidad").append("<option value='Básico'>Básico</option><option value='Intermedio'>Intermedio</option><option value='Avanzado' selected>Avanzado</option>");

            }
            
            if (datosRecetas.lista[i].clasificacion === 'Dulce') {
                $("#sClasificacion").append("<option value='Dulce' selected>Dulce</option><option value='Salado'>Salado</option><option value='Agridulce'>Agridulce</option>");
            } else if (datosRecetas.lista[i].clasificacion === 'Salado') {
                $("#sClasificacion").append("<option value='Dulce'>Dulce</option><option value='Salado' selected>Salado</option><option value='Agridulce'>Agridulce</option>");
            } else {
                $("#sClasificacion").append("<option value='Dulce'>Dulce</option><option value='Salado'>Salado</option><option value='Agridulce' selected>Agridulce</option>");

            }

            if (datosRecetas.lista[i].gluten === 'si') {
                $("#sGluten").append("<option value='si' selected>si</option><option value='no'>no</option>");
            } else {
                $("#sGluten").append("<option value='si'>si</option><option value='no' selected>no</option>");
            }

            if (datosRecetas.lista[i].azucar === 'si') {
                $("#sAzucar").append("<option value='si' selected>si</option><option value='no'>no</option>");
            } else {
                $("#sAzucar").append("<option value='si'>si</option><option value='no' selected>no</option>");
            }

            if (datosRecetas.lista[i].sal === 'si') {
                $("#sSal").append("<option value='si' selected>si</option><option value='no'>no</option>");
            } else {
                $("#sSal").append("<option value='si'>si</option><option value='no' selected>no</option>");
            }

            if (datosRecetas.lista[i].vegetariano === 'si') {
                $("#sVegetariano").append("<option value='si' selected>si</option><option value='no'>no</option>");
            } else {
                $("#sVegetariano").append("<option value='si'>si</option><option value='no' selected>no</option>");
            }

            if (datosRecetas.lista[i].vegano === 'si') {
                $("#sVegano").append("<option value='si' selected>si</option><option value='no'>no</option>");
            } else {
                $("#sVegano").append("<option value='si'>si</option><option value='no' selected>no</option>");
            }

            $("#txtIngredientes").val(datosRecetas.lista[i].ingredientes);
            $("#txtIngredientes2").val(datosRecetas.lista[i].ingredientes2);
//    var files = $('#fileFoto')[0].files[0];

$("#btnEditar").click(recetaEditada);

        }
    }
}

function ingredienteEditado(){
    var nombreCampo=$("#txtNombreIng").val();
     $.ajax({
                url: "http://cda2020.develotion.com/apps/220111_app/editIngredientes.php",
//        url: "api/editIngredientes.php",
                type: "POST",
                dataType: "JSON",
                data: {
                    nombreEq: nombreCampo,
                    idEq:idEdit
                },
                success: ingredienteEditadoListo

            });
}

function ingredienteEditadoListo(){
    window.location.replace("http://localhost:8080/chefcito9/ingresarIngrediente.html");
}

function recetaEditada(){
    var nombreCampo = $("#txtNombre").val();
            var clasificacionCampo = $("#sClasificacion").val();
            var preparacionCampo = $("#txtPreparacion").val();
            var tiempoCampo = $("#txtTiempo").val();
            var habilidadCampo = $("#sHabilidad").val();
            var glutenCampo = $("#sGluten").val();
            var diabetesCampo = $("#sAzucar").val();
            var salCampo = $("#sSal").val();
            var vegetarianoCampo = $("#sVegetariano").val();
            var veganoCampo = $("#sVegano").val();
            var ingredientesCampo = $("#txtIngredientes").val();
            var ingredientes2Campo = $("#txtIngredientes2").val();

            $.ajax({
                url: "http://cda2020.develotion.com/apps/220111_app/editRecetas.php",
//        url: "api/editRecetas.php",
                type: "POST",
                dataType: "JSON",
                data: {
                    nombreEq: nombreCampo,
                    clasificacionEq: clasificacionCampo,
                    preparacionEq: preparacionCampo,
                    tiempoEq: tiempoCampo,
                    habilidadEq: habilidadCampo,
                    glutenEq: glutenCampo,
                    diabetesEq: diabetesCampo,
                    salEq: salCampo,
                    vegetarianoEq: vegetarianoCampo,
                    veganoEq: veganoCampo,
                    ingredientesEq: ingredientesCampo,
                    ingredientes2Eq: ingredientes2Campo,
                    idEq:idEdit
                },
                success: recetaEditadaListo

            });

    
}

function recetaEditadaListo(){
    window.location.replace("http://localhost:8080/chefcito9/ingresarReceta.html");
}