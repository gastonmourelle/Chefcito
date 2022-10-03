window.fn = {};
var paginas = [];
var datosIngredientes;
var todosLosIngredientes = [];
var misIngredientes = [];
var misRecetasFavoritas = [];
var misRecetasHistorial = [];
var misRecetasMasTarde = [];

var salado;
var dulce;
var agridulce;
// var basico;
// var intermedio;
// var avanzado;
var sinGluten;
var sinAzucar;
var sinSal;
var vegetariano;
var vegano;
var tiempoLimite;
var tiempoMax=0;

var idUsuario;

var recordar = false;
var listaRecordar;

var filtro = [];

window.fn.open = function () {
    var menu = document.getElementById('menu');
    menu.open();
};

window.fn.load = function (page) {
    var content = $("#content")[0];
//    var content = document.getElementById('content');
    //document.getElementById('content').load("home.html");
//    var menu = document.getElementById('menu');
    content.load(page)
            .then(menu.close.bind(menu));
};

document.addEventListener("init", inicializarPagina);



function inicializarPagina(evt) {
    paginas.push(evt.target.id);
    var destino = evt.target.id;
    switch (destino) {
        case "login":
            $("#pMensaje").hide();
            $("#btnIngresar").click(ingresarAplicacion);
            $("#crearUsuario").click(crearUsuario);
            $("#recordar").change(recordarUser);
            listarRecordar();
//            autoInicioSesión();


//            buscarIngredientes();
            break;

        case "registro":
            $(".atras").click(volver);
            $("#btnAgregarUsuario").click(agregarUsuario);
            $("#txtNombreNuevo").keyup(validarNombreUser);
            $("#txtUsuarioNuevo").keyup(validarUserUser);
            $("#txtContraseniaNuevo").keyup(validarPassUser);
            habilitarAgregarUsuario();

            break;

        case "perfil":
//            alert(datosUsuario.id);
        
        $(".heladera").click(irHeladera);
        $(".config").click(irConfig);
        $(".atras").click(volver);
        $("#btnAgregarRecetas").click(irAgregarRecetas);
//        $("#fotoPerfilUsuario").append('<img src="' + datosUsuario.foto + '">');
        $("#fotoPerfilUsuario").append('<img src="http://cda2020.develotion.com/apps/220111_app/' + datosUsuario.foto + '">');
        $("#perfil h1").text(datosUsuario.nombre);
        $("#perfil h4").text("@"+datosUsuario.usuario);
        //<img src="http://cda2020.develotion.com/apps/220111_app/' + datosUsuario.foto + '">
//            buscarIngredientes();

//  Probando vaciar coincidencias
        for (var i = 0; i < datosRecetas.lista.length; i++) {
            datosRecetas.lista[i].ctdadIngCoincidentes = 0;
        }

        //Comparacion
        for (var recetas = 0; recetas < datosRecetas.lista.length; recetas++) {
            for (var ingReceta = 0; ingReceta < datosRecetas.lista[recetas].arrIngredientes.length; ingReceta++) {
                for (var ingHeladera = 0; ingHeladera < misIngredientes.length; ingHeladera++) {
                    if (datosRecetas.lista[recetas].arrIngredientes[ingReceta].indexOf(misIngredientes[ingHeladera].ingrediente) !== -1) {
                        datosRecetas.lista[recetas].ctdadIngCoincidentes++;
                    }
                }
            }
        }

        for (var i = 0; i < datosRecetas.lista.length; i++) {
            datosRecetas.lista[i].porcentajeCoincidencia = datosRecetas.lista[i].ctdadIngCoincidentes * 100 / datosRecetas.lista[i].ctdadIngredientes;
        }

//            imprimir favoritas que es la primera a la que llegamos
        for (var i = 0; i < datosRecetas.lista.length; i++) {
            for (var e = 0; e < misRecetasFavoritas.length; e++) {
                if (misRecetasFavoritas[e]['rFavorita'] === datosRecetas.lista[i].id) {
                    $("#resultadosPerfil").append('<div class="receta"><div class="imgReceta" id="' + datosRecetas.lista[i].id + '"><img src="http://cda2020.develotion.com/apps/220111_app/' + datosRecetas.lista[i].imagenes + '"><div class="mascara"><p class="mascaraTiempo"><strong>' + datosRecetas.lista[i].tiempo + '</strong> min</p><p class="mascaraHabilidad">' + datosRecetas.lista[i].habilidad + '</p></div></div><div class="progressbar" id="' + datosRecetas.lista[i].id + 'Prog"></div><h2 id="' + datosRecetas.lista[i].id + 'Nomb">' + datosRecetas.lista[i].nombre + '</h2></div>');
                    $("#" + datosRecetas.lista[i].id + "Prog.progressbar").progressbar({value: parseInt(datosRecetas.lista[i].porcentajeCoincidencia)});
//                ocultarCaracteres();
                    var texto = $("#" + datosRecetas.lista[i].id + "Nomb").text();
                    var caracteresNombre = texto.length;
                    var caracteresMax = 17;
                    if (caracteresNombre > caracteresMax) {
                        var resultado = texto.substring(0, caracteresMax) + "...";
                        $("#" + datosRecetas.lista[i].id + "Nomb").text(resultado);
                    }
                }
            }
        }
        $("#misRecetas #hechas h3").text(misRecetasHistorial.length);
        $("#misRecetas #favoritas h3").text(misRecetasFavoritas.length);
        $("#misRecetas #guardadas h3").text(misRecetasMasTarde.length);
        $("#masTarde").click(cargarMasTarde);
        $("#historial").click(cargarHistorial);
        $("#favorita").click(cargarFavoritas);
//                $("#resultadosComparar").append('<p>' + datosRecetas.lista[i].nombre + '</p><input id=' + datosRecetas.lista[i].id + ' value="detalle" class="detalle"><div class="progressbar"></div>');
        function cargarMasTarde() {
            $("#resultadosPerfil").empty();
            for (var i = 0; i < datosRecetas.lista.length; i++) {
                for (var e = 0; e < misRecetasMasTarde.length; e++) {
                    if (misRecetasMasTarde[e]['rMasTarde'] === datosRecetas.lista[i].id) {
                        $("#resultadosPerfil").append('<div class="receta"><div class="imgReceta" id="' + datosRecetas.lista[i].id + '"><img src="http://cda2020.develotion.com/apps/220111_app/' + datosRecetas.lista[i].imagenes + '"><div class="mascara"><p class="mascaraTiempo"><strong>' + datosRecetas.lista[i].tiempo + ' </strong>min</p><p class="mascaraHabilidad">' + datosRecetas.lista[i].habilidad + '</p></div></div><div class="progressbar" id="' + datosRecetas.lista[i].id + 'Prog"></div><h2 id="' + datosRecetas.lista[i].id + 'Nomb">' + datosRecetas.lista[i].nombre + '</h2></div>');
                        $("#" + datosRecetas.lista[i].id + "Prog.progressbar").progressbar({value: parseInt(datosRecetas.lista[i].porcentajeCoincidencia)});
//                ocultarCaracteres();
                        var texto = $("#" + datosRecetas.lista[i].id + "Nomb").text();
                        var caracteresNombre = texto.length;
                        var caracteresMax = 17;
                        if (caracteresNombre > caracteresMax) {
                            var resultado = texto.substring(0, caracteresMax) + "...";
                            $("#" + datosRecetas.lista[i].id + "Nomb").text(resultado);
                        }

                    }
                }

            }
            $(".imgReceta").click(cargaDetalle);
        }
        function cargarHistorial() {
            $("#resultadosPerfil").empty();
            for (var i = 0; i < datosRecetas.lista.length; i++) {
                for (var e = 0; e < misRecetasHistorial.length; e++) {
                    if (misRecetasHistorial[e]['rHistorial'] === datosRecetas.lista[i].id) {
                        $("#resultadosPerfil").append('<div class="receta"><div class="imgReceta" id="' + datosRecetas.lista[i].id + '"><img src="http://cda2020.develotion.com/apps/220111_app/' + datosRecetas.lista[i].imagenes + '"><div class="mascara"><p class="mascaraTiempo"> <strong>' + datosRecetas.lista[i].tiempo + ' </strong>min</p><p class="mascaraHabilidad">' + datosRecetas.lista[i].habilidad + '</p></div></div><div class="progressbar" id="' + datosRecetas.lista[i].id + 'Prog"></div><h2 id="' + datosRecetas.lista[i].id + 'Nomb">' + datosRecetas.lista[i].nombre + '</h2></div>');
                        $("#" + datosRecetas.lista[i].id + "Prog.progressbar").progressbar({value:
                                parseInt(datosRecetas.lista[i].porcentajeCoincidencia)});
//                ocultarCaracteres();
                            var texto = $("#" + datosRecetas.lista[i].id + "Nomb").text();
                            var caracteresNombre = texto.length;
                            var caracteresMax = 17;
                            if (caracteresNombre > caracteresMax) {
                                var resultado = texto.substring(0, caracteresMax) + "...";
                                $("#" + datosRecetas.lista[i].id + "Nomb").text(resultado);
                            }

                        }
                        
                    }
                }
                
                $(".imgReceta").click(cargaDetalle);
            }
            function cargarFavoritas() {
                $("#resultadosPerfil").empty();
                for (var i = 0; i < datosRecetas.lista.length; i++) {
                    for (var e = 0; e < misRecetasFavoritas.length; e++) {
                        if (misRecetasFavoritas[e]['rFavorita'] === datosRecetas.lista[i].id) {
                            $("#resultadosPerfil").append('<div class="receta"><div class="imgReceta" id="' + datosRecetas.lista[i].id + '"><img src="http://cda2020.develotion.com/apps/220111_app/' + datosRecetas.lista[i].imagenes + '"><div class="mascara"><p class="mascaraTiempo"><strong>' + datosRecetas.lista[i].tiempo + '</strong> min</p><p class="mascaraHabilidad">' + datosRecetas.lista[i].habilidad + '</p></div></div><div class="progressbar" id="' + datosRecetas.lista[i].id + 'Prog"></div><h2 id="' + datosRecetas.lista[i].id + 'Nomb">' + datosRecetas.lista[i].nombre + '</h2></div>');
                            $("#" + datosRecetas.lista[i].id + "Prog.progressbar").progressbar({value: parseInt(datosRecetas.lista[i].porcentajeCoincidencia)});
//                ocultarCaracteres();
                            var texto = $("#" + datosRecetas.lista[i].id + "Nomb").text();
                            var caracteresNombre = texto.length;
                            var caracteresMax = 17;
                            if (caracteresNombre > caracteresMax) {
                                var resultado = texto.substring(0, caracteresMax) + "...";
                                $("#" + datosRecetas.lista[i].id + "Nomb").text(resultado);
                            }
                        }
                    }

                }
                $(".imgReceta").click(cargaDetalle);
            }

            $(".imgReceta").click(cargaDetalle);


            break;
            case"agregarRecetas":
            $(".atras").click(volver);
            $(".heladera").click(irHeladera);
            $(".perfil").click(irPerfil);
            $("#btnAgregar").click(agregarReceta);
            consultaRecetas();
            $("#btnAgregar").click(irHeladera);
            habilitarIngresarRecetas();
            $("#txtNombre").keyup(validarNombreReceta);
            $("#txtIngredientes").keyup(validarIngredientesReceta);
            $("#txtTiempo").keyup(validarTiempoReceta);
            $("#txtIngredientes2").keyup(validarIngredientes2Receta);
            $("#txtPreparacion").keyup(validarPreparacionReceta);

            break;

        case "configuracion":
            $("#txtNombreEditar").val(datosUsuario.nombre);
            $("#txtUsuarioEditar").val(datosUsuario.usuario);
            idUsuario=datosUsuario.id;

            $(".heladera").click(irHeladera);
            $(".perfil").click(irPerfil);
            $(".atras").click(volver);
            $("#btnVolver").click(volverLogin);
            $("#guardarDatos").click(usuarioEditado);
            $("#eliminarDatos").click(eliminarUsuario);
//            buscarIngredientes();
//            $("#hBienvenida").html("Bienvenido/a " + nombre);



            break;

        case"heladera":
            $(".perfil").click(irPerfil);
            todosLosIngredientes = [];
            for (var i = 0; i < datosIngredientes.lista.length; i++) {
                todosLosIngredientes.push(datosIngredientes.lista[i].nombre);
            }
            $("#dBuscar").html("<div class='ui-widget'><input id='tags' placeholder='Ingredientes' type='text'></div>");
            armarAutocomplete();
            listarMisIngredientes();
            $("#siguiente").click(cargarFiltros);
            listarFavoritas();
            listarHistorial();
            listarMasTarde();
            break;

        case"filtros":
        for(var i = 0; i < datosRecetas.lista.length; i++){
            if(parseInt(datosRecetas.lista[i].tiempo)>tiempoMax){
                tiempoMax=parseInt(datosRecetas.lista[i].tiempo);
            }
            console.log(tiempoMax);
        }
        $("#tiempo").attr("max",tiempoMax);
        $("#tiempo").attr("value",tiempoMax);
        $("#mostrarValor").html("<b>"+tiempoMax+"</b><span> min</span></p>");
        tiempoLimite = $("#mostrarValor").text();
            mostrarValueSlider();
        function mostrarValueSlider() {
            $("#tiempo").on("input", function () {
                $(this).next("#mostrarValor").html("<b>"+this.value + "</b> min");
                tiempoLimite = $("#mostrarValor").text();
            });
        }

            // $(".habFiltros").click(function(){
            //     $(".habFiltros").each(function(){
            //         $(this).prop('checked', false); 
            //     }); 
            //     $(this).prop('checked', true);
            // });
            // $(".claFiltros").click(function(){
            //     $(".claFiltros").each(function(){
            //         $(this).prop('checked', false); 
            //     }); 
            //     $(this).prop('checked', true);
            // });
            $(".atras").click(volver);
            $("#comparar").click(compararIngredientes);
            $(".heladera").click(irHeladera);
            $(".perfil").click(irPerfil);

            filtro = [];
            for (var i = 0; i < datosRecetas.lista.length; i++) {
                filtro.push(datosRecetas.lista[i]);
            }



//            console.log(filtro);

//
            // $("#fBasico").change(elegirBasico);
            // $("#fIntermedio").change(elegirIntermedio);
            // $("#fAvanzado").change(elegirAvanzado);
            $("#fSalado").change(elegirSalado);
            $("#fDulce").change(elegirDulce);
            $("#fAgridulce").change(elegirAgridulce);
            $("#sinGluten").change(elegirGluten);
            $("#sinAzucar").change(elegirAzucar);
            $("#sinSal").change(elegirSal);
            $("#vegano").change(elegirVegano);
            $("#vegetariano").change(elegirVegetariano);

            // function elegirBasico() {
            //     if ($("#fBasico").is(":checked")) {
            //         basico = true;
            //     } else if ($("#fBasico").is(":not(checked)")) {
            //         basico = false;
            //     }
            // }

            // function elegirIntermedio() {
            //     if ($("#fIntermedio").is(":checked")) {
            //         intermedio = true;
            //     } else if ($("#fIntermedio").is(":not(checked)")) {
            //         intermedio = false;
            //     }
            // }

            // function elegirAvanzado() {
            //     if ($("#fAvanzado").is(":checked")) {
            //         avanzado = true;
            //     } else if ($("#fAvanzado").is(":not(checked)")) {
            //         avanzado = false;
            //     }
            // }

            function elegirSalado() {
                if ($("#fSalado").is(":checked")) {
                    salado = true;
                } else if ($("#fSalado").is(":not(checked)")) {
                    salado = false;
                }
            }

            function elegirDulce() {
                if ($("#fDulce").is(":checked")) {
                    dulce = true;
                } else if ($("#fDulce").is(":not(checked)")) {
                    dulce = false;
                }
            }

            function elegirAgridulce() {
                if ($("#fAgridulce").is(":checked")) {
                    agridulce = true;
                } else if ($("#fAgridulce").is(":not(checked)")) {
                    agridulce = false;
                }
            }

            function elegirGluten() {
                if ($("#sinGluten").is(":checked")) {
                    sinGluten = true;
                } else if ($("#sinGluten").is(":not(checked)")) {
                    sinGluten = false;
                }
            }

            function elegirAzucar() {
                if ($("#sinAzucar").is(":checked")) {
                    sinAzucar = true;
                } else if ($("#sinAzucar").is(":not(checked)")) {
                    sinAzucar = false;
                }
            }

            function elegirSal() {
                if ($("#sinSal").is(":checked")) {
                    sinSal = true;
                } else if ($("#sinSal").is(":not(checked)")) {
                    sinSal = false;
                }
            }

            function elegirVegano() {
                if ($("#vegano").is(":checked")) {
                    vegano = true;
                } else if ($("#vegano").is(":not(checked)")) {
                    vegano = false;
                }
            }

            function elegirVegetariano() {
                if ($("#vegetariano").is(":checked")) {
                    vegetariano = true;
                } else if ($("#vegetariano").is(":not(checked)")) {
                    vegetariano = false;
                }
            }



//            var recetas = [
//                {nombre: "brownie de chocolate", vegetariano: "si", calificacion: "4"},
//                {nombre: "churros", vegetariano: "si", calificacion: "3"},
//                {nombre: "asado de tira", vegetariano: "no", calificacion: "5"},];
//            var recetasVegetarianas = recetas.filter(function (filtrado) {
//                return filtrado.vegetariano === "si" && filtrado.calificacion > 3;
//            })
//            console.log(recetas);
//            console.log(recetasVegetarianas); && ||

            break;

        case"resultados":
            $(".atras").click(volver);
            $(".heladera").click(irHeladera);
            $(".perfil").click(irPerfil);
//            filtro=[];
//            
//            for (var i = 0; i < datosRecetas.lista.length; i++) {
//                filtro.push(datosRecetas.lista[i]);
//            }

            // if (basico === true) {
            //     filtrarBasico();
            // }
            // if (intermedio === true) {
            //     filtrarIntermedio();
            // }
            // if (avanzado === true) {
            //     filtrarAvanzado();
            // }

            if (salado === true && dulce === false && agridulce === false) {
                filtrarSalado();
            }
            if (dulce === true && salado === false && agridulce === false) {
                filtrarDulce();
            }
            if (agridulce === true && salado === false && dulce === false) {
                filtrarAgridulce();
            }

            if (salado === true && dulce === true && agridulce === false) {
                filtrarSaladoDulce();
            }
            if (dulce === true && salado === false && agridulce === true) {
                filtrarDulceAgridulce();
            }
            if (agridulce === true && salado === true && dulce === false) {
                filtrarAgridulceSalado();
            }
            if (sinGluten === true) {
                filtrarGluten();
            }
            if (sinAzucar === true) {
                filtrarAzucar();
            }
            if (sinSal === true) {
                filtrarSal();
            }
            if (vegetariano === true) {
                filtrarVegetariano();
            }
            if (vegano === true) {
                filtrarVegano();
            }

            // function filtrarBasico() {
            //     filtro = filtro.filter(function (filtrado) {
            //         return filtrado.habilidad === "Básico";
            //     });
            // }

            // function filtrarIntermedio() {
            //     filtro = filtro.filter(function (filtrado) {
            //         return filtrado.habilidad === "Intermedio";
            //     });
            // }

            // function filtrarAvanzado() {
            //     filtro = filtro.filter(function (filtrado) {
            //         return filtrado.habilidad === "Avanzado";
            //     });
            // }

            function filtrarSalado() {
                filtro = filtro.filter(function (filtrado) {
                    return filtrado.clasificacion === "Salado";
                });
            }

            function filtrarDulce() {
                filtro = filtro.filter(function (filtrado) {
                    return filtrado.clasificacion === "Dulce";
                });
            }

            function filtrarAgridulce() {
                filtro = filtro.filter(function (filtrado) {
                    return filtrado.clasificacion === "Agridulce";
                });
            }
            function filtrarSaladoDulce() {
                filtro = filtro.filter(function (filtrado) {
                    return filtrado.clasificacion === "Salado" || filtrado.clasificacion === "Dulce";
                });
            }

            function filtrarDulceAgridulce() {
                filtro = filtro.filter(function (filtrado) {
                    return filtrado.clasificacion === "Dulce" || filtrado.clasificacion === "Agridulce";
                });
            }

            function filtrarAgridulceSalado() {
                filtro = filtro.filter(function (filtrado) {
                    return filtrado.clasificacion === "Agridulce" || filtrado.clasificacion === "Salado";
                });
            }

            function filtrarGluten() {
//                alert(sinGluten);
                filtro = filtro.filter(function (filtrado) {
                    return filtrado.gluten === "no";
                });
//                console.log(filtro);
            }

            function filtrarAzucar() {
//                alert(sinGluten);
                filtro = filtro.filter(function (filtrado) {
                    return filtrado.azucar === "no";
                });
//                console.log(filtro);
            }

            function filtrarSal() {
//                alert(sinGluten);
                filtro = filtro.filter(function (filtrado) {
                    return filtrado.sal === "no";
                });
//                console.log(filtro);
            }

            function filtrarVegano() {
                filtro = filtro.filter(function (filtrado) {
                    return filtrado.vegano === "si";
                });
//                console.log(filtro);
            }

            function filtrarVegetariano() {
                filtro = filtro.filter(function (filtrado) {
                    return filtrado.vegetariano === "si";
                });
//                console.log(filtro);
            }

            // basico = false;
            // intermedio = false;
            // avanzado = false;
            salado = false;
            dulce = false;
            agridulce = false;
            sinGluten = false;
            sinAzucar = false;
            sinSal = false;
            vegetariano = false;
            vegano = false;

//            Vaciar coincidencias
            for (var i = 0; i < filtro.length; i++) {
                filtro[i].ctdadIngCoincidentes = 0;
            }

            //Comparacion
            for (var recetas = 0; recetas < filtro.length; recetas++) {
                for (var ingReceta = 0; ingReceta < filtro[recetas].arrIngredientes.length; ingReceta++) {
                    for (var ingHeladera = 0; ingHeladera < misIngredientes.length; ingHeladera++) {
                        if (filtro[recetas].arrIngredientes[ingReceta].indexOf(misIngredientes[ingHeladera].ingrediente) !== -1) {
                            filtro[recetas].ctdadIngCoincidentes++;
                        }
                    }
                }
            }

            for (var i = 0; i < filtro.length; i++) {
                filtro[i].porcentajeCoincidencia = filtro[i].ctdadIngCoincidentes * 100 / filtro[i].ctdadIngredientes;
            }
            //ordenar
            filtro.sort(criterio);
            //imprimir
            
            $("#ilResultados").show();

            for (var i = 0; i < filtro.length; i++) {
                if (filtro[i].porcentajeCoincidencia > 50 && parseInt(filtro[i].tiempo) <= parseInt(tiempoLimite)){
                    $("#ilResultados").hide();
//                $("#resultadosComparar").append('<p>' + datosRecetas.lista[i].nombre + '</p><input id=' + datosRecetas.lista[i].id + ' value="detalle" class="detalle"><div class="progressbar"></div>');
                $("#resultadosComparar").append('<div class="receta"><div class="imgReceta" id="' + filtro[i].id + '"><img src="http://cda2020.develotion.com/apps/220111_app/' + filtro[i].imagenes + '"><div class="mascara"><p class="mascaraTiempo"><strong>' + filtro[i].tiempo + '</strong> min</p><p class="mascaraHabilidad">' + filtro[i].habilidad + '</p></div></div><div class="progressbar" id="' + filtro[i].id + 'Prog"></div><h2 id="' + filtro[i].id + 'Nomb">' + filtro[i].nombre + '</h2></div>');
                $("#" + filtro[i].id + "Prog.progressbar").progressbar({value: parseInt(filtro[i].porcentajeCoincidencia)});
//                ocultarCaracteres();
                var texto = $("#" + filtro[i].id + "Nomb").text();
                var caracteresNombre = texto.length;
                var caracteresMax = 17;
                if (caracteresNombre > caracteresMax) {
                    var resultado = texto.substring(0, caracteresMax) + "...";
                    $("#" + filtro[i].id + "Nomb").text(resultado);
                }
            }
        }

            $(".imgReceta").click(cargaDetalle);

            break;

        case"detalle":
            $(".atras").click(volver);
            $(".heladera").click(irHeladera);
            $(".perfil").click(irPerfil);
            for (var i = 0; i < datosRecetas.lista.length; i++) {

                if (datosRecetas.lista[i].id === idReceta) {
                    var preparacionSeparada = [];
                    preparacionSeparada = datosRecetas.lista[i].preparacion.split("\n");
                    $("#detalleImg").append("<img src='http://cda2020.develotion.com/apps/220111_app/" + datosRecetas.lista[i].imagenes + "'><div id='detalleMascara'></div>");
                    $("#detalleReceta h2").text(datosRecetas.lista[i].nombre);

                    $("#fila1").append("<img src='img/relojDetalle.svg'><p><b>"+datosRecetas.lista[i].tiempo+"</b> min</p><p id='imgPrueba'></p><p>"+datosRecetas.lista[i].clasificacion+"</p><p><img src='img/gorroNivel.svg'>"+datosRecetas.lista[i].habilidad+"</p>");

                    if(datosRecetas.lista[i].clasificacion === "Agridulce"){
                        $("#imgPrueba").append("<img src='img/salado.svg'><img src='img/dulce.svg'>");
                    }
                    if(datosRecetas.lista[i].clasificacion === "Salado"){
                        $("#imgPrueba").append("<img src='img/salado.svg'>");
                    }
                    if(datosRecetas.lista[i].clasificacion === "Dulce"){
                        $("#imgPrueba").append("<img src='img/dulce.svg'>");
                    }

                    if (datosRecetas.lista[i].azucar === "no"){
                        $("#fila2").append("<p>Sin azúcar</p>");
                    }
                    if (datosRecetas.lista[i].gluten === "no"){
                        $("#fila2").append("<p>Sin gluten</p>");
                    }
                    if (datosRecetas.lista[i].sal === "no"){
                        $("#fila2").append("<p>Sin sal</p>");
                    }
                    if (datosRecetas.lista[i].vegano === "si"){
                        $("#fila2").append("<p>Vegano</p>");
                    }
                    if (datosRecetas.lista[i].vegetariano === "si" && datosRecetas.lista[i].vegano === "no"){
                        $("#fila2").append("<p>Vegetariano</p>");
                    }

                    $("#circuloPorcentaje").append('<div class="containerCirc"><div class="gauge-container"><svg class="gauge" viewBox="0 0 150 150"><circle class="rail" r="67" cx="75" cy="75"></circle><circle class="progress" r="67" data-target="' + parseInt(datosRecetas.lista[i].porcentajeCoincidencia) + '" cx="75" cy="75"></circle></svg><span class="center percentage"><span class="value">0</span><span class="percentSymbol">%</span></span></div></div>');
//                    $(".fav").append("<input type='checkbox' data-idFav='"+idReceta+"' class='favorita'> ");
                    
                    var ingredientes2Separados = [];
                    ingredientes2Separados = datosRecetas.lista[i].ingredientes2.split(";");
                    for (var j = 0; j < ingredientes2Separados.length; j++) {
                        $("#ingredientes").append("<li>- " + ingredientes2Separados[j] + "</li>");
                    }

                    for (var h = 0; h < preparacionSeparada.length; h++) {
                        $("#preparacion").append("<p>" + preparacionSeparada[h] + "</p>");
                    }

                    $(".fav .ks-cboxtags").append("<li class='rFav'><input type='checkbox' data-idFav='" + idReceta + "' class='favorita'><label data-idFav='" + idReceta + "'></label></li>");
                    $(".fav .ks-cboxtags").append("<li class='rHist'><input type='checkbox' data-idHist='" + idReceta + "' class='historial'><label data-idHist='" + idReceta + "'></label></li>");
                    $(".fav .ks-cboxtags").append("<li class='rLate'><input type='checkbox' data-idLate='" + idReceta + "' class='masTarde'><label data-idLate='" + idReceta + "'></label></li>");
                    animarCirculo();
                }
            }
            for (var e = 0; e < misRecetasFavoritas.length; e++) {
                if (misRecetasFavoritas[e]['rFavorita'] === idReceta) {
//                        $(".fav .ks-cboxtags").html("<input type='checkbox' data-idFav='"+idReceta+"' class='favorita' checked> ");
                    $(".fav .ks-cboxtags li.rFav").html("<input type='checkbox' data-idFav='" + idReceta + "' class='favorita' checked><label data-idFav='" + idReceta + "'></label>");
                }
            }

            for (var o = 0; o < misRecetasHistorial.length; o++) {
                if (misRecetasHistorial[o]['rHistorial'] === idReceta) {
//                        $(".fav .ks-cboxtags").html("<input type='checkbox' data-idFav='"+idReceta+"' class='favorita' checked> ");
                    $(".fav .ks-cboxtags li.rHist").html("<input type='checkbox' data-idHist='" + idReceta + "' class='historial' checked><label data-idHist='" + idReceta + "'></label>");
                }
            }

            for (var h = 0; h < misRecetasMasTarde.length; h++) {
                if (misRecetasMasTarde[h]['rMasTarde'] === idReceta) {
//                        $(".fav .ks-cboxtags").html("<input type='checkbox' data-idFav='"+idReceta+"' class='favorita' checked> ");
                    $(".fav .ks-cboxtags li.rLate").html("<input type='checkbox' data-idLate='" + idReceta + "' class='masTarde' checked><label data-idLate='" + idReceta + "'></label>");
                }
            }


            recetaFavorita();
            recetaHistorial();
            recetaMasTarde();
            break;
    }
}

//ons.ready(function () {
//    ons.setDefaultDeviceBackButtonListener(function (event) {
//        volver();
//        /*ons.notification.confirm('Do you want to close the app?') // Ask for confirmation
//         .then(function (index) {
//         if (index === 1) { // OK button
//         navigator.app.exitApp(); // Close the app
//         }
//         });*/
//    });
//});



function volver() {
    paginas.pop();
    $("#content")[0].load(paginas[paginas.length - 1] + ".html");
    paginas.pop();
}

function volverLogin() {
//    listaRecordar=[];
    db.transaction(eliminarRecordarSql, errorTns, exitoEliminarRecordar);
    document.getElementById('content').load("login.html");
    

}

function eliminarRecordarSql(tx){
     tx.executeSql("DELETE FROM datosUser");
}

function exitoEliminarRecordar(){
    exitoCrearTablas();
}

//    $(".heladera").click(irHeladera);
function irHeladera() {
    (document.getElementById('content').load("heladera.html"));
}

function irPerfil() {
    (document.getElementById('content').load("perfil.html"));
}

function irAgregarRecetas() {
    (document.getElementById('content').load("agregarRecetas.html"));
}

function irConfig() {
    (document.getElementById('content').load("configuracion.html"));
}

var user = $("#txtUsuario").val();
var pass = $("#txtContrasenia").val();

function ingresarAplicacion() {
    user = $("#txtUsuario").val();
    pass = $("#txtContrasenia").val();
    $.ajax({
        url: "http://cda2020.develotion.com/apps/220111_app/usuarios.php",
//        url: "api/usuarios.php",
        type: "GET",
        dataType: "JSON",
        data: {
            userData: user,
            passData: pass
        },
        success: irBienvenida,
        error: mostrarErrorInicio
    });

}

function mostrarErrorInicio(){
    $("#loginIncorrecto").text("Contraseña o usuario incorrecto");
}

//CREAR USUARIO

function crearUsuario() {

    document.getElementById('content').load("registro.html");
}


function editarUsuario(){
            $("#txtNombreEditar").val(datosUsuario.nombre);
            $("#txtContraseniaEditar").val(datosUsuario.pass);
}



function usuarioEditado(){
    var nombreCampo=$("#txtNombreEditar").val();
    var contraseniaCampo=$("#txtContraseniaEditar").val();
    var idCampo=idUsuario;
     $.ajax({
                url: "http://cda2020.develotion.com/apps/220111_app/editUsuario.php",
//                url: "api/editUsuario.php",
                type: "POST",
                dataType: "JSON",
                data: {
                    nombreEq: nombreCampo,
                    passEq: contraseniaCampo,
                    idEq:idCampo
                },
                success: usuarioEditadoListo

            });
}

function usuarioEditadoListo(){
    $("#datosEditados").text("Los datos se editaron correctamente");
//        document.getElementById('content').load("perfil.html");

}



function agregarUsuario() {
    var nombreCampo = $("#txtNombreNuevo").val();
    var usuarioCampo = $("#txtUsuarioNuevo").val();
    var contraseniaCampo = $("#txtContraseniaNuevo").val();
    var files = $('#fileFotoUser')[0].files[0];

    var fd = new FormData();
    fd.append('file', files);
    fd.append('nombreData', nombreCampo);
    fd.append('userData', usuarioCampo);
    fd.append('passData', contraseniaCampo);


    $.ajax({
//        url: "api/usuarios.php",
        url: "http://cda2020.develotion.com/apps/220111_app/usuarios.php",
        type: "POST",
        dataType: "JSON",
        data: fd
        ,
        contentType: false,
        processData: false,
        success: usuarioRegistrado,
//        success: irBienvenida,
        error: usuarioRegistrado

    });
}

var nombreUserValid;
var userUserValid;
var contraUserValid;

function validarNombreUser(){
     var nombre = $("#txtNombreNuevo").val();
     if(nombre==="" || nombre===" "){
        $("#txtNombreNuevo").addClass("red");
        $("#txtNombreNuevo").val("");
        $("#txtNombreNuevo").attr("placeholder", "El nombre no puede estar vacío");
        nombreUserValid=false;
    }
    else{
//        $("#txtIngredientes").css("background-color", "white");
        nombreUserValid=true;
    }
    habilitarAgregarUsuario();
}

function validarUserUser(){
     var user = $("#txtUsuarioNuevo").val();
     if(user==="" || user===" "){
        $("#txtUsuarioNuevo").addClass("red");
        $("#txtUsuarioNuevo").val("");
        $("#txtUsuarioNuevo").attr("placeholder", "El usuario no puede estar vacío");
        userUserValid=false;
    }
    else{
//        $("#txtIngredientes").css("background-color", "white");
        userUserValid=true;
    }
    habilitarAgregarUsuario();
}

function validarPassUser(){
     var pass = $("#txtContraseniaNuevo").val();
     if(pass==="" || pass===" "){
        $("#txtContraseniaNuevo").addClass("red");
        $("#txtContraseniaNuevo").val("");
        $("#ttxtContraseniaNuevo").attr("placeholder", "Introduzca una contraseña válida");
        contraUserValid=false;
    }
    else{
//        $("#txtIngredientes").css("background-color", "white");
        contraUserValid=true;
    }
    habilitarAgregarUsuario();
}


function habilitarAgregarUsuario(){
    if(contraUserValid===true && userUserValid===true && nombreUserValid===true){
        $("#btnAgregarUsuario").css("opacity", "1");
        $("#btnAgregarUsuario").removeAttr("disabled");
    }
    else{
       $("#btnAgregarUsuario").css("opacity", "0.5");
       $("#btnAgregarUsuario").attr("disabled", "disabled");
    }
}

function usuarioRegistrado(resp) {
//    $("#pMensaje2").html(resp.mensaje);
    document.getElementById('content').load("login.html");
}


var datosUsuario;

function irBienvenida(info) {
    datosUsuario = info;
//    idUsuario=datosUsuario.lista[0].id;
//    document.getElementById('content').load("heladera.html");
    buscarIngredientes();
    agregarRecordar();
}

function mostrarError(e) {
   alert("error"+e);
}

$.ajax({
    url: "http://cda2020.develotion.com/apps/220111_app/recetas.php",
//    url: "api/recetas.php",
    type: "GET",
    dataType: "JSON",
    success: mostrarRecetas

});

function consultaRecetas() {
$.ajax({
    url: "http://cda2020.develotion.com/apps/220111_app/recetas.php",
//    url: "api/recetas.php",
    type: "GET",
    dataType: "JSON",
    success: mostrarRecetas

});
}

var datosRecetas;

function mostrarRecetas(respuesta) {
    datosRecetas = respuesta;
//    console.log(equipos);
    $("#listaRecetas").empty();
    for (var i = 0; i < respuesta.lista.length; i++) {
        $("#listaRecetas").append("<li>" + respuesta.lista[i].nombre + "<input type='button' class='elim' value='X' data-id='" + respuesta.lista[i].id + "'><a href='editar.html?id=" + respuesta.lista[i].id + "' id='" + respuesta.lista[i].id + "' class='editar'>Editar</a></li>");
        respuesta.lista[i].arrIngredientes = respuesta.lista[i].ingredientes.split(",");
        respuesta.lista[i].ctdadIngredientes = respuesta.lista[i].arrIngredientes.length;
        respuesta.lista[i].ctdadIngCoincidentes = 0;
        respuesta.lista[i].porcentajeCoincidencia = 0;

    }
    $(".elim").click(eliminarReceta);
}

$("#btnAgregar").click(agregarReceta);

function agregarReceta() {
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
    var files = $('#fileFoto')[0].files[0];

    var fd = new FormData();
    fd.append('file', files);
    fd.append('nombreEq', nombreCampo);
    fd.append('clasificacionEq', clasificacionCampo);
    fd.append('preparacionEq', preparacionCampo);
    fd.append('tiempoEq', tiempoCampo);
    fd.append('habilidadEq', habilidadCampo);
    fd.append('glutenEq', glutenCampo);
    fd.append('diabetesEq', diabetesCampo);
    fd.append('salEq', salCampo);
    fd.append('vegetarianoEq', vegetarianoCampo);
    fd.append('veganoEq', veganoCampo);
    fd.append('ingredientesEq', ingredientesCampo);
    fd.append('ingredientes2Eq', ingredientes2Campo);

    $.ajax({
        url: "http://cda2020.develotion.com/apps/220111_app/recetas.php",
//         url: "api/recetas.php",
        type: "POST",
        dataType: "JSON",
        data:
//            nombreEq: nombreCampo,
//            clasificacionEq: clasificacionCampo,
//            preparacionEq: preparacionCampo,
//            tiempoEq: tiempoCampo,
//            habilidadEq: habilidadCampo,
//            glutenEq: glutenCampo,
//            diabetesEq: diabetesCampo,
//            vegetarianoEq: vegetarianoCampo,
//            veganoEq: veganoCampo,
//            ingredientesEq: ingredientesCampo,
//            ingredientes2Eq: ingredientes2Campo,
//            calificacionEq: calificacionCampo,
//            comentariosEq: comentariosCampo
                fd
        ,
        contentType: false,
        processData: false,
        success: recetaIngresada

    });
}

var nombreValid=false;
var preparacionValid=false;
var tiempoValid=false;
var ingredientesValid=false;
var ingredientes2Valid=false;

function validarNombreReceta(){
     var nombreCampo = $("#txtNombre").val();
     if(nombreCampo==="" || nombreCampo===" "){
       
        $("#txtNombre").addClass("red");
        $("#txtNombre").val("");
        $("#txtNombre").attr("placeholder", "El nombre no puede estar vacío");
        nombreValid=false;
    }
    else{
//        $("#txtNombre").css("background-color", "white");
        nombreValid=true;
    }
    habilitarIngresarRecetas();
}

function validarTiempoReceta(){
     var tiempoCampo = $("#txtTiempo").val();
     if(tiempoCampo==="" || tiempoCampo===" "){
        $("#txtTiempo").addClass("red");
        $("#txtTiempo").val("");
        $("#txtTiempo").attr("placeholder", "El tiempo no puede estar vacío");
        tiempoValid=false;
    }
    else{
//        $("#txtTiempo").css("background-color", "white");
        tiempoValid=true;
    }
    habilitarIngresarRecetas();
}

function validarPreparacionReceta(){
    var preparacionCampo = $("#txtPreparacion").val();
     if(preparacionCampo==="" || preparacionCampo===" "){
        $("#txtPreparacion").addClass("red");
        $("#txtPreparacion").val("");
        $("#txtPreparacion").attr("placeholder", "La preparación no puede estar vacía");
        preparacionValid=false;
    }
    else{
//        $("#txtPreparacion").css("background-color", "white");
        preparacionValid=true;
    }
    habilitarIngresarRecetas();
}

function validarIngredientesReceta(){
     var ingredientesCampo = $("#txtIngredientes").val();
     if(ingredientesCampo==="" || ingredientesCampo===" "){
        $("#txtIngredientes").addClass("red");
        $("#txtIngredientes").val("");
        $("#txtIngredientes").attr("placeholder", "Los ingredientes no pueden estar vacíos");
        ingredientesValid=false;
    }
    else{
//        $("#txtIngredientes").css("background-color", "white");
        ingredientesValid=true;
    }
    habilitarIngresarRecetas();
}

function validarIngredientes2Receta(){
     var ingredientes2Campo = $("#txtIngredientes2").val();
     if(ingredientes2Campo==="" || ingredientes2Campo===" "){
        $("#txtIngredientes2").addClass("red");
        $("#txtIngredientes2").val("");
        $("#txtIngredientes2").attr("placeholder", "Los ingredientes no pueden estar vacíos");
        ingredientes2Valid=false;
    }
    else{
//        $("#txtIngredientes").css("background-color", "white");
        ingredientes2Valid=true;
    }
    habilitarIngresarRecetas();
}


function habilitarIngresarRecetas(){
    if(nombreValid===true && preparacionValid===true && ingredientesValid===true && ingredientes2Valid===true && tiempoValid===true){
        $("#btnAgregar").css("opacity", "1");
        $("#btnAgregar").removeAttr("disabled");
    }
    else{
       $("#btnAgregar").css("opacity", "0.5");
       $("#btnAgregar").attr("disabled", "disabled");
    }
//    $("#btnAgregar").click(agregarReceta);
}

function imgIngresada(resp) {
    $("#pMensaje").html(resp.mensaje);
//    location.reload(true);
}

function recetaIngresada(resp) {
    $("#pMensaje").html(resp.mensaje);
//    location.reload(true);
}

//___________Eliminar recetas___________

function eliminarReceta() {
    var id = $(this).attr("data-id");
    $.ajax({
        url: "http://cda2020.develotion.com/apps/220111_app/recetas.php",
//        url: "api/recetas.php",
        type: "DELETE",
        dataType: "JSON",
        data: {
            idReceta: id
        },
        success: recetaEliminada
    });
}

function eliminarUsuario() {
    var id = idUsuario;
    $.ajax({
        url: "http://cda2020.develotion.com/apps/220111_app/usuarios.php",
//        url: "api/usuarios.php",
        type: "DELETE",
        dataType: "JSON",
        data: {
            idUser: id
        },
        success: usuarioEliminado
    });
}

function recetaEliminada(resp) {
//    console.log(resp);

}

function usuarioEliminado(resp) {
    $("#datosEditados").text("El usuario se eliminó correctamente");
    document.getElementById('content').load("login.html");
    

}
//___________Tomar ingredientes___________
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
    $("#pMensaje").show();
}

//var ingrediente;


function levantarIngredientes(resp) {
    datosIngredientes = resp;
    document.getElementById('content').load("heladera.html");


//    for (var i = 0; i < resp.lista.length; i++) {
//        todosLosIngredientes.push(resp.lista[i].nombre);
//    }
//    $("#dBuscar").html("<div class='ui-widget'><label for='tags'>Ingredientes:</label><input id='tags'></div>");
//    armarAutocomplete();
//    listarMisIngredientes();

}

function armarAutocomplete() {
    $("#tags").autocomplete({
        source: todosLosIngredientes
    });
    $(".ui-menu").click(seleccionarIngrediente);
}

function cargarFiltros() {
    document.getElementById('content').load("filtros.html");
}

function compararIngredientes() {
    document.getElementById('content').load("resultados.html");
}

var idReceta;
function cargaDetalle() {
    idReceta = $(this).attr("id");
    document.getElementById('content').load("detalle.html");
}

function criterio(a, b) {
    var dev = 1;
    if (a.porcentajeCoincidencia > b.porcentajeCoincidencia) {
        dev = -1;
    }
    return dev;
}

function animarCirculo() {
    //last-of-type para usar con for (se animan todas). Sino, sacar y dejar .containerCirc o probar .containerCirc:first-of-type
    var secondGauge = document.querySelector('.containerCirc:last-of-type .progress');
    var secondTarget = parseInt(secondGauge.getAttribute('data-target'));
    var secondGaugeReadout = document.querySelector('.containerCirc:last-of-type .percentage > .value');


//variables
    var gaugeR = parseInt(document.querySelectorAll('circle')[0].getAttribute('r'));
    var gaugeC = gaugeR * Math.PI * 2;
    var animationDuration = 1.5;

//init svg circles
    var circles = document.querySelectorAll('circle');
    var gauges = document.querySelectorAll('.progress');
    TweenMax.set(circles, {
        strokeDashoffset: gaugeC
    });

    TweenMax.set(gauges, {
        attr: {
            'stroke-dasharray': gaugeC + ' ' + gaugeC
        }
    });

//calculate the offset
    function calculateOffset(t, c) {

        var target = c - (c * t) / 100;
        return target;

    }

//timeline
    var tl = new TimelineMax();

//second gauge animation
    tl.to(secondGauge, animationDuration, {

        strokeDashoffset: calculateOffset(secondTarget, gaugeC),
        ease: Power3.easeInOut,
        onUpdate: function () {

            var currentStrokeOffset = parseInt(secondGauge.style.strokeDashoffset);
            secondGaugeReadout.textContent = Math.round(100 - (currentStrokeOffset * 100) / gaugeC);

        }

    });
}


//Base de datos interna ingredientes
var db = window.openDatabase("USUARIO", "1.0", "Base de ingredientes", 1024 * 1024 * 5, crearTablas);

function crearTablas() {
    db.transaction(crearTablasSql, errorTns, exitoCrearTablas);
}

function crearTablasSql(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS misIngredientes (id INTEGER PRIMARY KEY, ingrediente VARCHAR(255))");
    tx.executeSql("CREATE TABLE IF NOT EXISTS historial (id INTEGER PRIMARY KEY, rHistorial VARCHAR(255))");
    tx.executeSql("CREATE TABLE IF NOT EXISTS favoritas (id INTEGER PRIMARY KEY, rFavorita VARCHAR(255))");
    tx.executeSql("CREATE TABLE IF NOT EXISTS masTarde (id INTEGER PRIMARY KEY, rMasTarde VARCHAR(255))");
    tx.executeSql("CREATE TABLE IF NOT EXISTS datosUser (id INTEGER PRIMARY KEY, nombre VARCHAR(255), password VARCHAR(255), recordar VARCHAR(255))");
}

function errorTns(e) {
    alert("ERROR: " + e.code);
}

function exitoCrearTablas() {
   db.transaction(agergarUserFictSql, errorTns, agergarUserFictRealizado);
}

function agergarUserFictRealizado(){
}

function agergarUserFictSql(tx){
   tx.executeSql("INSERT INTO datosUser (nombre, password, recordar) VALUES (?,?,?)", ["user", "pass", "false"]);

}

var ingrediente;

function seleccionarIngrediente() {
//    ingrediente = $("#txtTarea").val();
    if (ingrediente !== "") {
        ingrediente = $("#tags").val();
        misIngredientes.push(ingrediente);
        var posicionIngrediente = todosLosIngredientes.indexOf(ingrediente);
        if (posicionIngrediente >= 0) {
            todosLosIngredientes.splice(posicionIngrediente, 1);
        }

//        ingrediente = $("#tags").autocomplete( "option", "disabled" );
//        $("#tags").autocomplete( "option", "disabled", true );

        $("#tags").val("");
        $("#tags").focus();

    }
    db.transaction(agregarIngredienteSql, errorTns, agregarTareaFinalizado);
}

function agregarIngredienteSql(tx) {
    tx.executeSql("INSERT INTO misIngredientes (ingrediente) VALUES (?)", [ingrediente]);
}

function agregarTareaFinalizado() {
    listarMisIngredientes();
}


function listarMisIngredientes() {
    db.transaction(listarMisIngredientesSql, errorTns, ingredientesListados);
}

function listarMisIngredientesSql(tx) {
    tx.executeSql("SELECT * FROM misIngredientes", [], armarListaIngredientes);
}

function armarListaIngredientes(tx, resultados) {
    $("#dIngredientes").empty();
    misIngredientes = [];
    $("#ilHeladera").hide();
    if (misIngredientes.length === 0){
        $("#ilHeladera").show();
        $("#siguiente").hide();
    }
    for (var i = 0; i < resultados.rows.length; i++) {
        misIngredientes.push(resultados.rows.item(i));
        misIngredientes.sort(criterio2);
//        $("#dIngredientes").append("<div>" + resultados.rows.item(i).ingrediente +
//                " <input type='button' data-idIng='" + resultados.rows.item(i).id + "' value='X' class='eliminar'></div>");
//        misIngredientes.push(resultados.rows.item(i).ingrediente);

//        misIngredientes.push(resultados.rows.item(i));
//        misIngredientes.sort(criterio2);

        var posicionIngrediente = todosLosIngredientes.indexOf(resultados.rows.item(i).ingrediente);
        if (posicionIngrediente >= 0) {
            todosLosIngredientes.splice(posicionIngrediente, 1);
        }
    }
    for (var i = 0; i < resultados.rows.length; i++) {
        $("#dIngredientes").append("<div>" + misIngredientes[i].ingrediente +
                " <input type='button' data-idIng='" + misIngredientes[i].id + "' value='X' class='eliminar'></div>");
//        $("#dIngredientes").append("<div>" + resultados.rows.item(i).ingrediente +
//                " <input type='button' data-idIng='" + resultados.rows.item(i).id + "' value='X' class='eliminar'></div>");

    }

    $(".eliminar").click(eliminarIngrediente);
    if (misIngredientes.length > 0){
        $("#ilHeladera").hide();
        $("#siguiente").show();
    }
}

//ordenar alfabeticamente los ingredientes cuando los imprimo
function criterio2(a, b) {
    var dev = 1;
    if (a.ingrediente < b.ingrediente) {
        dev = -1;
    }
    return dev;
}

function ingredientesListados() {

}

var idIngrediente;
function eliminarIngrediente() {
    idIngrediente = $(this).attr("data-idIng");
    //alert(id);
    db.transaction(eliminarIngredienteSql, errorTns, exitoEliminarIngrediente);
}

function eliminarIngredienteSql(tx) {
    idIngrediente = parseInt(idIngrediente);
    for (var i = 0; i < misIngredientes.length; i++) {
        if (misIngredientes[i].id === idIngrediente) {
            todosLosIngredientes.push(misIngredientes[i].ingrediente);
        }
    }

    tx.executeSql("DELETE FROM misIngredientes WHERE id = ?", [idIngrediente]);
    $("#tags").autocomplete("destroy");
    armarAutocomplete();

}

function exitoEliminarIngrediente() {
    //alert("Tarea eliminada");
    listarMisIngredientes();

}

function recordarUser() {
    if ($("#recordar").is(":checked")) {
        recordar = true;
//                    agregarRecordar();
    } else if ($("#recordar").is(":not(checked)")) {
        recordar = false;
//                    eliminarRecordar();
    }

    console.log(recordar);
}

function agregarRecordar() {
    db.transaction(agregarRecordarSql, errorTns, agregarRecordarFinalizado);
    recordarUser();
}
function agregarRecordarSql(tx) {
    
//    var id;
//    id=x-1;
//    id="1";
    tx.executeSql("INSERT INTO datosUser (nombre, password, recordar) VALUES (?,?,?)", [user, pass, recordar]);
//    tx.executeSql("DELETE FROM datosUser WHERE id = ?", [id]);
}
function agregarRecordarFinalizado() {
    db.transaction(elimRecordarSql, errorTns, eliminarRec);
}

function eliminarRec(){
    
}

function elimRecordarSql(tx){
    tx.executeSql("SELECT * FROM datosUser", [], elimRecordarRealizar);
}

function elimRecordarRealizar(tx, resultados){
    var id;
//    id=(resultados.rows.item(0).id) -1;
    id=(resultados.rows.item(0).id);
//    alert(id);
    tx.executeSql("DELETE FROM datosUser WHERE id = ?", [id]);
    
}

function listarRecordar() {
    db.transaction(listarRecordarSql, errorTns, recordarListado);
}
//function listarFavoritas() {
//    db.transaction(listarFavoritasSql, errorTns, favoritasListadas);
//}
//
function recordarListado() {

}
//
function listarRecordarSql(tx) {
    tx.executeSql("SELECT * FROM datosUser", [], armarListaRecordar);
}

function armarListaRecordar(tx, resultados) {
    listaRecordar = [];
    if(resultados.rows.length>0){
       for (var i = 0; i < resultados.rows.length; i++) {
        listaRecordar.push(resultados.rows.item(i));
    }
    console.log(listaRecordar);
    autoInicioSesión(); 
    }
    
}

function autoInicioSesión() {
    var ultimaPosicion = (listaRecordar.length) - 1;
//    alert(ultimaPosicion);
    if (listaRecordar[ultimaPosicion]["recordar"] === "true") {
        $("#txtUsuario").val(listaRecordar[ultimaPosicion]["nombre"]);
        $("#txtContrasenia").val(listaRecordar[ultimaPosicion]["password"]);
        $("#recuerdo").html('<label for="recordar" class="checkbox checkbox--material"><input type="checkbox" checked class="checkbox__input checkbox--material__input" id="recordar"><div class="checkbox__checkmark checkbox--material__checkmark"></div>Recordar contraseña</label>');
        ingresarAplicacion();

    }

}

function recetaFavorita() {
    if ($(".rFav .favorita").is(":checked")) {
        $(".fav .rFav label").click(eliminarRecetaFavorita);
    } else {
        $(".fav .rFav label").click(agregarRecetaFavorita);
    }
}

var idFavorita;
function agregarRecetaFavorita() {
    db.transaction(agregarRecetaFavoritaSql, errorTns, agregarRecetaFavoritaFinalizado);
    idFavorita = $(this).attr("data-idFav");
//    $(".fav").html("<input type='checkbox' data-idFav='"+idReceta+"' class='favorita' checked>");
    $(".fav .ks-cboxtags li.rFav").html("<input type='checkbox' data-idFav='" + idReceta + "' class='favorita' checked><label data-idFav='" + idReceta + "'></label>");
    recetaFavorita();

}

function eliminarRecetaFavorita() {
    db.transaction(eliminarRecetaFavoritaSql, errorTns, eliminarRecetaFavoritaFinalizado);
    idFavorita = $(this).attr("data-idFav");
    $(".fav .ks-cboxtags li.rFav").html("<input type='checkbox' data-idFav='" + idReceta + "' class='favorita'><label data-idFav='" + idReceta + "'></label>");
    recetaFavorita();

}

function agregarRecetaFavoritaSql(tx) {
    tx.executeSql("INSERT INTO favoritas (rFavorita) VALUES (?)", [idFavorita]);
    listarFavoritas();
}

function agregarRecetaFavoritaFinalizado() {
//    alert("Agrega");
}

function listarFavoritas() {
    db.transaction(listarFavoritasSql, errorTns, favoritasListadas);
}

function favoritasListadas() {

}

function listarFavoritasSql(tx) {
    tx.executeSql("SELECT * FROM favoritas", [], armarListaFavoritas);
}

function armarListaFavoritas(tx, resultados) {
    misRecetasFavoritas = [];
    for (var i = 0; i < resultados.rows.length; i++) {
        misRecetasFavoritas.push(resultados.rows.item(i));
    }
}


function eliminarRecetaFavoritaSql(tx) {
    var id;
    for (var i = 0; i < misRecetasFavoritas.length; i++) {
        if (misRecetasFavoritas[i]["rFavorita"] === idFavorita) {
            id = misRecetasFavoritas[i]["id"];
        }
    }
    tx.executeSql("DELETE FROM favoritas WHERE id = ?", [id]);
    listarFavoritas();
}

function eliminarRecetaFavoritaFinalizado() {
//    alert("Borra");
}



function recetaHistorial() {
    if ($(".rHist .historial").is(":checked")) {
        $(".fav .rHist label").click(eliminarRecetaHistorial);
    } else {
        $(".fav .rHist label").click(agregarRecetaHistorial);
    }
}

var idHistorial;
function agregarRecetaHistorial() {
    db.transaction(agregarRecetaHistorialSql, errorTns, agregarRecetaHistorialFinalizado);
    idHistorial = $(this).attr("data-idHist");
//    $(".fav").html("<input type='checkbox' data-idFav='"+idReceta+"' class='favorita' checked>");
    $(".fav .ks-cboxtags li.rHist").html("<input type='checkbox' data-idHist='" + idReceta + "' class='historial' checked><label data-idHist='" + idReceta + "'></label>");
    recetaHistorial();

}

function eliminarRecetaHistorial() {
    db.transaction(eliminarRecetaHistorialSql, errorTns, eliminarRecetaHistorialFinalizado);
    idHistorial = $(this).attr("data-idHist");
    $(".fav .ks-cboxtags li.rHist").html("<input type='checkbox' data-idHist='" + idReceta + "' class='historial'><label data-idHist='" + idReceta + "'></label>");
    recetaHistorial();

}

function agregarRecetaHistorialSql(tx) {
    tx.executeSql("INSERT INTO historial (rHistorial) VALUES (?)", [idHistorial]);
    listarHistorial();
}

function agregarRecetaHistorialFinalizado() {
//    alert("Agrega his");
}

function listarHistorial() {
    db.transaction(listarHistorialSql, errorTns, historialListadas);
}

function historialListadas() {

}

function listarHistorialSql(tx) {
    tx.executeSql("SELECT * FROM historial", [], armarListaHistorial);
}

function armarListaHistorial(tx, resultados) {
    misRecetasHistorial = [];
    for (var i = 0; i < resultados.rows.length; i++) {
        misRecetasHistorial.push(resultados.rows.item(i));
    }
}


function eliminarRecetaHistorialSql(tx) {
    var id;
    for (var i = 0; i < misRecetasHistorial.length; i++) {
        if (misRecetasHistorial[i]["rHistorial"] === idHistorial) {
            id = misRecetasHistorial[i]["id"];
        }
    }
    tx.executeSql("DELETE FROM historial WHERE id = ?", [id]);
    listarHistorial();
}

function eliminarRecetaHistorialFinalizado() {
//    alert("BorraHis");
}


function recetaMasTarde() {
    if ($(".rLate .masTarde").is(":checked")) {
        $(".fav .rLate label").click(eliminarRecetaMasTarde);
    } else {
        $(".fav .rLate label").click(agregarRecetaMasTarde);
    }
}

var idMasTarde;
function agregarRecetaMasTarde() {
    db.transaction(agregarRecetaMasTardeSql, errorTns, agregarRecetaMasTardeFinalizado);
    idMasTarde = $(this).attr("data-idLate");
//    $(".fav").html("<input type='checkbox' data-idFav='"+idReceta+"' class='favorita' checked>");
    $(".fav .ks-cboxtags li.rLate").html("<input type='checkbox' data-idLate='" + idReceta + "' class='masTarde' checked><label data-idLate='" + idReceta + "'></label>");
    recetaMasTarde();

}

function eliminarRecetaMasTarde() {
    db.transaction(eliminarRecetaMasTardelSql, errorTns, eliminarRecetaMasTardeFinalizado);
    idMasTarde = $(this).attr("data-idLate");
    $(".fav .ks-cboxtags li.rLate").html("<input type='checkbox' data-idLate='" + idReceta + "' class='masTarde'><label data-idLate='" + idReceta + "'></label>");
    recetaMasTarde();

}

function agregarRecetaMasTardeSql(tx) {
    tx.executeSql("INSERT INTO masTarde (rMasTarde) VALUES (?)", [idMasTarde]);
    listarMasTarde();
}

function agregarRecetaMasTardeFinalizado() {
//    alert("Agrega later");
}

function listarMasTarde() {
    db.transaction(listarMasTardeSql, errorTns, masTardeListadas);
}

function masTardeListadas() {

}

function listarMasTardeSql(tx) {
    tx.executeSql("SELECT * FROM masTarde", [], armarListaMasTarde);
}

function armarListaMasTarde(tx, resultados) {
    misRecetasMasTarde = [];
    for (var i = 0; i < resultados.rows.length; i++) {
        misRecetasMasTarde.push(resultados.rows.item(i));
    }
}


function eliminarRecetaMasTardelSql(tx) {
    var id;
    for (var i = 0; i < misRecetasMasTarde.length; i++) {
        if (misRecetasMasTarde[i]["rMasTarde"] === idMasTarde) {
            id = misRecetasMasTarde[i]["id"];
        }
    }
    tx.executeSql("DELETE FROM masTarde WHERE id = ?", [id]);
    listarMasTarde();
}

function eliminarRecetaMasTardeFinalizado() {
//    alert("Borra late");
}