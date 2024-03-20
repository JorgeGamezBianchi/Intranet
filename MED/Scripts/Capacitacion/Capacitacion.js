//var hostInit = "/IntranetMedc";
//var hostInit = "";
var cont = 1;

$(function () {
    //cargarRespuestas();
    if (cont >= 5) {
        con = 1;
    }

    if (IdExamen > 0) {
        IdExamen = 0
    }
})




//Función que inserta las respuestas del usuario
function InsertarRespuesta() {
    var respuestaUser = document.getElementById('respuestaUser').value;
    var audio = document.getElementById('IDaudio').value;
    var campania = document.getElementById('campania').value;

    if (respuestaUser == -1) {
        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
        document.getElementById('myModalLabel').innerHTML = "Advertencia";
        document.getElementById('infoModal').innerHTML = "Elija una respuesta";
    }
    else {
        var json = {
            Id_Examen: IdExamen,
            RespuestaUser: respuestaUser,
            Audio: audio,
            Campania: campania
        };

        var xml = new XMLHttpRequest();
        var url = hostInit + "/Capacitacion/InsertarRespuesta";

        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                if (result.Code != respuestaUser) {
                    document.getElementById('myModal1').style.display = 'block';
                    document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                    document.getElementById('myModalLabel').innerHTML = "Advertencia";
                    document.getElementById('infoModal').innerHTML = "Respuesta incorrecta";
                    document.getElementById('respuestaU').className = 'col-lg-4';
                    document.getElementById('respuestaC').hidden = false;
                    document.getElementById('respuesta1').value = result.Descripcion;
                    document.getElementById('respuestaUser').disabled = true;
                    document.getElementById('continuar').disabled = false;
                    document.getElementById('insertarResp').disabled = true;
                } else {
                    document.getElementById('myModal1').style.display = 'block';
                    document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                    document.getElementById('myModalLabel').innerHTML = "Correcto";
                    document.getElementById('infoModal').innerHTML = "Respuesta correcta";
                    document.getElementById('respuestaU').className = 'col-lg-4';
                    document.getElementById('respuestaC').hidden = false;
                    document.getElementById('respuesta1').value = result.Descripcion;
                    document.getElementById('continuar').disabled = false;
                    document.getElementById('insertarResp').disabled = true;
                    document.getElementById('respuestaUser').disabled = true;
                }
            }
        };

        xml.open("POST", url, true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(json));
    }
}


//Función que carga el Select de las respuestas
function cargarRespuestas() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Capacitacion/CargarRespuestas";
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '<option value="-1" selected>Seleccione</option>';
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].Code + '">' + result[i].Descripcion + '</option>';
            }
            document.getElementById('respuestaUser').innerHTML = opt;
            document.getElementById('respuesta1').innerHTML = opt;
        }
    };

    xml.open("GET", url, true);
    xml.send();
}

//Accion del boton de siguiente
function siguiente2() {
    var audio = document.getElementById('IDaudio').value;
    
    if (cont <= 4) {
        
        document.getElementById('audio' + cont).style.display = "none";
        audio++;
        cont++;
        document.getElementById('audioTitulo').innerHTML = "Audio " + cont;
        document.getElementById('IDaudio').value = audio;
        document.getElementById('audio' + cont).hidden = false;

        document.getElementById('continuar').disabled = true;
        document.getElementById('respuestaU').className = 'col-lg-6';
        document.getElementById('respuestaC').hidden = true;
        document.getElementById('respuestaUser').disabled = false;
        document.getElementById('respuestaUser').value = -1;
        document.getElementById('insertarResp').disabled = false;
    } else {
        document.getElementById('continuar').hidden = true;
        document.getElementById('btnFinalizar').hidden = false;
    }
}

//--------------------------Cuestionario Seguridad Información---------------------------------
var IdExamen; //Variable global donde se guarda el Id generado al comenzar el examen
var score; //Variable global donde se guarda el score del examen

//Funcion para validar los selects previos al examen
function ValidarExam() {
    if (document.getElementById('Direccion').value != 0 && document.getElementById('Departamento').value != 0) {
        if (document.getElementById('Departamento').value == 14 && document.getElementById('Campania').value != 0) {
            LlenarTblExamen();
        } else if (document.getElementById('Departamento').value != 14) {
            LlenarTblExamen();
        } else {
            alertify.alert("Si su departamento es Operaciones, favor de seleccionar la campaña");
        }

    } else {
        alertify.alert("Seleccionar la dirección y el departamento al que se pertenece");
    }
}
//Funcion que llena la tabla de examen
function LlenarTblExamen() {
    var json = {
        Id_Examen: document.getElementById('Id_Examen').value,
        NumEmpleado: sessionStorage.getItem('usuario'),
        IdDepartamento: document.getElementById('Departamento').value,
        IdCampana: document.getElementById('Campania').value
    };
    
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Capacitacion/LlenarTblExamen";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resultado = JSON.parse(this.responseText);
            console.log(resultado);

            if (resultado.ID != 0) {
                //alert("Respuestas insertadas");
                IdExamen = resultado.ID;
                document.getElementById('btnLlenar').style.display = "none";
                document.getElementById('qsi').hidden = false;
            } else {
                alert("Error al inserta tbl_Examen");
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(json));
}

//Función que valida los radio y manda datos para llenar la tabla de las respuestas
function validarRadios() {

    if ((document.querySelector('input[name="radio1"]:checked').value !=0) &
        (document.querySelector('input[name="radio2"]:checked').value != 0) &
        (document.querySelector('input[name="radio3"]:checked').value != 0) &
        (document.querySelector('input[name="radio4"]:checked').value != 0) &
        (document.querySelector('input[name="radio5"]:checked').value != 0) &
        (document.querySelector('input[name="radio6"]:checked').value != 0) &
        (document.querySelector('input[name="radio7"]:checked').value != 0) &
        (document.querySelector('input[name="radio8"]:checked').value != 0) &
        (document.querySelector('input[name="radio9"]:checked').value != 0) &
        (document.querySelector('input[name="radio10"]:checked').value != 0)
    ) {
        var c = 1;
        let x = document.getElementsByClassName("modal-body");
        //let x = document.getElementsByName("pregunta");
        do {
            for (j = 0; j < x.length - 1; j++) {
                let y = x[j].querySelectorAll('input[type="radio"]:checked')
                for (z = 0; z < y.length; z++) {

                    //console.log(json.Id_Examen);
                    //console.log(json.Grupo);
                    //console.log(json.Opcion);
                    mandarJSON(IdExamen, j + 1, y[z].value);
                    c++
                }
                
            }
        } while (c == 10);
        
        var xml = new XMLHttpRequest();
        var url = hostInit + "/Capacitacion/Score";
        var json = {
            Id_Examen: IdExamen
        }
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200)
            {
                var result = JSON.parse(this.responseText);
                //alert("Su resultado es \n" + result + "/10");
                document.getElementById('myModal1').style.display = 'block';
                document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                document.getElementById('myModalLabel').innerHTML = "Resultado";
                document.getElementById('infoModal').innerHTML = "Su resultado es \n" + result + "/10";
                document.getElementById('modalFooter').hidden = false;
            }
        };

        xml.open("POST", url, true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(json));
    } else {
        //alert("Falta seleccionar una opción");

        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
        document.getElementById('myModalLabel').innerHTML = "Advertencia";
        document.getElementById('infoModal').innerHTML = "Todas las preguntas deben ser contestadas";
    }
}

function validarRadios2() {
    var id = IdExamen;
    var grupo = 1;
    var opc = document.querySelector('input[name="radio1"]:checked').value;

    mandarJSON(id, grupo, opc);
}

//Funcion que ejecuta la peticion y manda los datos para llenar la tabla
function mandarJSON(IdExamen,Grupo,Opcion) {
    var json = {
        Id_Examen: IdExamen,
        Grupo: Grupo,
        Opcion: Opcion
    };
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Capacitacion/InsertarRespuestasQSI";
            xml.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText);
                    //if (result == "Correcto") {
                    //    alert("Respuestas insertadas");
                    //} else {
                    //    alert("Error, respuestas no insertadas");
                    //}
                   
                }
            };
            xml.open("POST", url, true);
            xml.setRequestHeader('Content-Type', 'application/json');
            xml.send(JSON.stringify(json));
}


//Obtiene los radios seleccionados
function Retro() {
    let x = document.getElementsByClassName("modal-body");

    for (j = 0; j < x.length - 1; j++) {
        let y = x[j].querySelectorAll('input[type="radio"]:checked')
        for (z = 0; z < y.length; z++) {

            //console.log(json.Id_Examen);
            //console.log(json.Grupo);
            //console.log(json.Opcion);
            ObtenerRetro(j + 1, y[z].value);
        }
    }
}

//Hace la solicitud y trae los resultados del examen (retroalimentacion)
function ObtenerRetro(Grupo, Opcion) {
    var json = {
        Grupo: Grupo
    };

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Capacitacion/Calificar";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (Opcion == result.Respuesta) {
                document.getElementById('retro' + Grupo).hidden = false;
                document.getElementById('retro' + Grupo).className = "alert alert-success text-center"
                document.getElementById('retro' + Grupo).innerHTML = "<p><strong>Respuesta correcta</strong></br>La respuesta es: <strong>" + result.Descripcion + "</strong></p>";
            } else {
                document.getElementById('retro' + Grupo).hidden = false;
                document.getElementById('retro' + Grupo).className = "alert alert-warning text-center"
                document.getElementById('retro' + Grupo).innerHTML = "<p><strong>Respuesta incorrecta</strong></br>La respuesta es: <strong>" + result.Descripcion + "</strong></p>";
            }
        }
    };
    
    xml.open("POST", url, true);
    xml.setRequestHeader('Content-Type', 'application/json;');
    xml.send(JSON.stringify(json));
    document.getElementById('myModal1').style.display = 'none';
    document.getElementById('btnSig').hidden = true;
    document.getElementById('btnFinalizar').hidden = false;
    setTimeout(function () {
        cerrarSesion();
        //location.href = "http://172.16.0.20/IntranetMedc/#";
        location.href = hostInit + "/Logueo/Login";
    }, 100000);
}


//----------JSON de arrays---------------------------------------------------------------
//let x = document.getElementsByClassName("modal-body");

//for (j = 0; j < x.length - 1; j++) {
//    let y = x[j].querySelectorAll('input[type="radio"]:checked')
//    for (z = 0; z < y.length; z++) {
//        //json[z+1] = JSON.stringify(resp);
//        r = `{ "IdExamen":${Id_Examen}, "Grupo":${j + 1}, "Respuesta":"${y[z].value}"}`;
//    }
//    //console.log(r);
//    json.push(JSON.parse(r));
//}
//console.log(json);

//----------------Arreglos con nombres de los audios----------------------------------
//var ECS = ['O_20999148Venta.wav',
//    'O_21062687NoCubreEdadRequerida.wav',
//    'O_21068110NoQuierePagarAnualidad.wav',
//    'O_21071220BuroExterno(LoIndicaCliente).wav',
//    'O_21106089Art44.wav'
//]

//var camp = {
//    "ECS":['O_20999148Venta.wav',
//        'O_21062687NoCubreEdadRequerida.wav',
//        'O_21068110NoQuierePagarAnualidad.wav',
//        'O_21071220BuroExterno(LoIndicaCliente).wav',
//        'O_21106089Art44.wav'
//    ],
//    "ADICIONALES": [
//        'O_21319414 Venta.wav',
//        'O_21363550 Cuenta Inactiva.wav',
//        'O_21363718 No desea compartir su linea de credito.wav',
//        'O_21363860 Cancelo su TDC Banamex.wav',
//        'O_21364637 no tiene tiempo.wav'
//    ],
//    "BALCOMECM": ['O_24274096 No permite dar información.wav',
//        'O_24274224 va cancelar su TDC banamex.wav',
//        'O_24280830 sin deudas en otras tarjetas.wav',
//        'O_24281107 solo cuenta con tarjeta banamex.wav',
//        'O_24380277 venta.wav'
//    ],
//    "BALCOMDISP": ['O_23998587 Ya cancelo su TDC Banamex.wav',
//        'O_24402241 Mala experiencia con Banamex.wav',
//        'O_24402359 No se encuentra.wav',
//        'O_24407721 Venta.wav',
//        'O_24410854 Acudira a sucursal a tramitar.wav'
//    ],
//    "DISPONIBLE": ['24312952 cliente molesto.wav',
//        '24313194 cliente no confia en la llamada.wav',
//        '24313413 el monto disponible no le es atractivo.wav',
//        '24313688 tarjeta inactiva.wav',
//        'Venta -24380236.wav'
//    ],
//    "CNC": ['O_30527670 - No se encuentra.wav',
//        'O_30537378-No tiene documentación.wav',
//        'O_30544190-Altas tasas de interes.wav',
//        'O_30566365-Canceló o cancelara instrumento de pago.wav',
//        'O_30585095-Problemas de búro.wav'
//    ],
//    "CPC": ['20998575 cliente con promesa de acudir.wav',
//        '21017037 cliente con promesa de acudir',
//        'Altas tasas de interes.wav',
//        'No lo necesita.wav',
//        'Ya cuenta con el producto.wav'
//    ],
//    "PAGARE": ['O_30585766_no le interesa por el momento.wav',
//        'O_30645904_cliente con promesa.wav',
//        'O_30647588_solicita volver a llamar.wav',
//        'O_30649863_ya cuenta con el producto ofrecido.wav',
//        'O_30652954_contacto efectivo_problemas económicos.wav'
//    ],
//    "PYME": ['O_30533199 No se encuentra.wav',
//        'O_30554757 altas tasas de interes.wav',
//        'O_30564822 no cubre con el perfil.wav',
//        'O_30587974 -Art.44-cliente molesto.wav',
//        'O_30666112 cliente con promesa de acudir.wav'
//    ],
//    "REDIS": ['30418296 Venta.wav',
//        'O_30528934 Cliente no permite realizar oferta.wav',
//        'O_30530772 No tiene tiempo.wav',
//        'O_30531087 Ya cuenta con el producto.wav',
//        'O_30566806 Prefiere otro credito.wav'
//    ]
//};