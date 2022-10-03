
//alert(ruta);




$.ajax({
//    url: "http://cda2020.develotion.com/apps/220111_app/usuarios.php",
    url: "api/usuarios.php",
    type: "GET",
    dataType: "JSON",
    success: mostrarUsuarios

});

var datosUsuarios;
function mostrarUsuarios(rep){
    datosUsuarios=rep;
    editarUsuario();
}

var idUsuario;
idUsuario=datosUsuarios.lista[0].id;
function editarUsuario(){
            $("#txtNombreUs").val(datosUsuarios.lista[0].nombre);
            $("#txtUsuario").val(datosUsuarios.lista[0].user);
            $("#txtContraseniaUs").val(datosUsuarios.lista[0].pass);
}

$("#guardarDatos").click(usuarioEditado);


function usuarioEditado(){
    var nombreCampo=$("#txtNombreEditar").val();
    var usuarioCampo=$("#txtUsuarioEditar").val();
    var contraseniaCampo=$("#txtContraseniaEditar").val();
    var idCampo=idUsuario;
     $.ajax({
//                url: "http://cda2020.develotion.com/apps/220111_app/editUsuario.php",
                url: "api/editUsuario.php",
                type: "POST",
                dataType: "JSON",
                data: {
                    nombreEq: nombreCampo,
                    userEq: usuarioCampo,
                    passEq: contraseniaCampo,
                    idEq:idCampo
                },
                success: usuarioEditadoListo

            });
}

function usuarioEditadoListo(){
    alert("se editó usuario");
//        document.getElementById('content').load("perfil.html");

}


