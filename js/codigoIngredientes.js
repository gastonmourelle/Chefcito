buscarIngredientes();
var todosLosIngredientes=[];

function buscarIngredientes() {
    $.ajax({
        url: "http://cda2020.develotion.com/apps/220111_app/ingredientes.php",
//        url: "api/ingredientes.php",
        type: "GET",
        dataType: "JSON",
        success: levantarIngredientes,
        beforeSend: cargandoIngredientes

    });
}

function cargandoIngredientes() {
    $("#listaIngredientes").text("Cargando ingredientes");
}

function levantarIngredientes(resp) {
    $("#listaIngredientes").text("");
    datosIngredientes = resp;
    for (var i = 0; i < resp.lista.length; i++) {
        todosLosIngredientes.push(resp.lista[i].nombre);
        $("#listaIngredientes").append("<li>"+resp.lista[i].nombre+"<input type='button' class='elim' value='X' data-id='" + resp.lista[i].id + "'><a href='editarIng.html?id=" + resp.lista[i].id + "' id='" + resp.lista[i].id + "' class='editar'>Editar</a></li>");
    }
    $(".elim").click(eliminarIngredienteReal);
}

$("#btnAgregar").click(agregarIngrediente);
function agregarIngrediente() {
    var nombreCampo = $("#txtNombre").val();
    $.ajax({
        url: "http://cda2020.develotion.com/apps/220111_app/ingredientes.php",
//         url: "api/ingredientes.php",
        type: "POST",
        dataType: "JSON",
        data:{
              nombreEq: nombreCampo
        },
        success: ingredienteIngresado

    });
}


function ingredienteIngresado(resp) {
    $("#pMensaje").html(resp.mensaje);
//    location.reload(true);
}

//___________Eliminar recetas___________


function eliminarIngredienteReal() {
    var id = $(this).attr("data-id");
    $.ajax({
        url: "http://cda2020.develotion.com/apps/220111_app/ingredientes.php",
//        url: "api/ingredientes.php",
        type: "DELETE",
        dataType: "JSON",
        data: {
            idIngrediente: id
        },
        success: ingredienteEliminado
    });
}

function ingredienteEliminado(resp) {
    location.reload(true);
//    console.log(resp);

}