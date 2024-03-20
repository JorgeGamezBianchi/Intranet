function IniciarEvaluacion() {
    var id = 16;
    var usuario = sessionStorage.getItem('usuario');
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Encuestas/IniciarEvaluacionLFDPPP";
    var json = {
        NumeroEmpleado: usuario,
        IdExamen: id
    }
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result > 0) {
                document.getElementById('btnIniciarEva').hidden = true;
                CargarEvalucion(result);
                document.getElementById('btnEvaluacion').hidden = false;
            } else {
                alertify.warning("¡Lo siento, no se inicio la encuesta!");
            }
        } else if (this.status == 500) {
            mostrarAlert("Error", "no se puede conectar a la base de datos");
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

function CargarEvalucion(idEvaluacion) {
    document.getElementById('Id_cuestionario').value = idEvaluacion;
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Encuestas/CargarEvaluacionLFDPPP";
    var json = {
        idExamen: 16
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            if (myArr != "") {
                var re = 11;
                for (var i = 0; i < myArr.Preguntas.length; i++) {
                    mostrarEvaluacionHTML(myArr.Preguntas[i], myArr.Respuestas, re);
                    document.getElementById('DivEvaluacion').hidden = false;
                    re++;
                }
            } else {
                alertify.warning("¡Lo siento, hubo un error!");
            }
        } else if (this.status == 500) {
            alertify.warning("¡Error, no se puede conectar a la base de datos!");
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

function mostrarEvaluacionHTML(preguntas, respuestas, cont) {
    out = document.getElementById("tablaEvaluacion").innerHTML;
    out += '<div class="modal-dialog modal-xl">';
    out += '    <div class="modal-content" style="width:100%; height:100%">';
    out += '        <div id="modalHeader" class="modal-header justify-content-center" style="background-color:lightgray">';
    out += '            <h4 class=" col-md-10 modal-title text-center" id=""><strong>' + preguntas.Pregunta+'</strong></h4>';
    out += '        </div>';
    out += '        <div name="pregunta" class="modal-body text-justify">';
    out += '            <input type="radio" value="0" name="radio' + cont + '" checked hidden />';
    
    for (var i = 0; i < respuestas.length; i++) {
        if (preguntas.Grupo == respuestas[i].Grupo) {
            //console.log(respuestas[i].Grupo);
            out += '            <label class="container" name="radios">';
            out += '                <input type="radio" value="' + respuestas[i].Opcion+'" name="radio' + respuestas[i].Grupo+'">';
            out += '                    <span class="checkmark"></span>';
            out += '   ' + respuestas[i].Respuesta + '';
            out += '            </label>';
        }
        
    }
    out += '       </div>';
    out += '    </div>';
    out += '</div>';
    document.getElementById("tablaEvaluacion").innerHTML = out;
}

function ValidaRespuestasEvaluacion(id) {

    if (document.querySelector('input[name="radio11"]:checked').value != 0 &&
        document.querySelector('input[name="radio12"]:checked').value != 0 &&
        document.querySelector('input[name="radio13"]:checked').value != 0 &&
        document.querySelector('input[name="radio14"]:checked').value != 0 &&
        document.querySelector('input[name="radio15"]:checked').value != 0 &&
        document.querySelector('input[name="radio16"]:checked').value != 0 &&
        document.querySelector('input[name="radio17"]:checked').value != 0 &&
        document.querySelector('input[name="radio18"]:checked').value != 0 &&
        document.querySelector('input[name="radio19"]:checked').value != 0 &&
        document.querySelector('input[name="radio20"]:checked').value != 0) {

        let idEvaluacion = document.getElementById('Id_cuestionario').value;
        var r = document.querySelectorAll('input[type="radio"]:checked');
        var respuestas = document.getElementsByName("radios");
        //console.log(respuestas);
        //console.log(r);
        for (var i = 0; i < r.length; i++) {
            mandarJsonEvaluacion(idEvaluacion, (i + 11), r[i].value);
        }
        alertify.warning("¡Terminaste la encuesta exitosamente!");
        setTimeout(function () {
            window.location.reload(true);
        }, 1000);
    } else {
        alertify.error("¡Debe contestar todas las preguntas!");
    }
}

function mandarJsonEvaluacion(idExamen, grupo, opcion) {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Encuestas/GuardarEvaluacion";
    var json = {
        idExamen: idExamen,
        grupo: grupo,
        opcion: opcion
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            console.log(result);
           
        }
        
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}