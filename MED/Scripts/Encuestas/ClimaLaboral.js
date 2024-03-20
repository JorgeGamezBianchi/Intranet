//Funcion para buscar solo datos necesarios para la evaluacion 
function buscarEmpleadoEvaluacion(emple) {
    var json = { NumeroEmpleado: emple }

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/BuscarEmpleado/";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result.id_Empleado == 0) {
                alertify.alert("No hay datos disponibles");
            } else {
                document.getElementById('id_Empleado').value = result.id_Empleado;
                //document.getElementById('FIngreso').value = formatDate(result.FIngreso);
                //document.getElementById('Edad').value = result.Edad;
                //document.getElementById('Departamento').value = result.IdDepartamento;
                //document.getElementById('Direccion').value = result.IDDireccion;
                //document.getElementById("Campania").value = result.Campania;
            }
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

//Funcion para dar inicio con la evaluacion
function IniciarEvaluacionClimaLab() {
    var g = document.getElementById('Genero').value;
    var e = document.getElementById('Edad').value;
    var ne = document.getElementById('Nivel_Estudios').value;
    var c = document.getElementById('Centro').value;
    var t = document.getElementById('Turno_clima').value;
    var an = document.getElementById('Antiguedad').value;
    var st = document.getElementById('Staff').value;
    var r = document.getElementById('RVT').value;
    var ji = document.getElementById('Jefe_Inmediato').value;

    if (g != 0 && e != 0 && ne != 0 && c != 0 && t != 0 && an != 0 && st != 0 &&  ji != 0 ) {
        
        var xml = new XMLHttpRequest();
        var url = hostInit + "/Encuestas/IniciarEvaluacionClimaLaboral";
        var json = {
            Id_Empleado: document.getElementById('id_Empleado').value,
            Genero: g,
            Edad: e,
            Nivel_estudio: ne,
            Centro: c,
            Turno: t,
            Antiguedad:an,
            Staff:st,
            RVT:r,
            Jefe_inmediato: ji
        }
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var r = JSON.parse(this.responseText);
                if (r != 0) {
                    document.getElementById('Id_encuesta').value = r;
                    document.getElementById('DivEvaluacion').hidden = false;
                    document.getElementById('btnIniciarEnc').hidden = true;
                    CargarEvaluacionClimaLaboral();
                } else {
                    alertify.error("error al insertar datos")
                }
            }
        };
        xml.open("POST", url, true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(json));
    } else {
        alertify.alert("Favor de seleccionar los datos que se le solicitan (Genero, Edad, Nivel de Estudios, Centro, Turno, Antigüedad, STAFF, Jefe inmediato)");
    }
}

//Funcion para crear la tabla de la evaluacion
function CargarEvaluacionClimaLaboral() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Encuestas/CargarEvaluacionClimaLa";
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var r = JSON.parse(this.responseText);
            if (r.length <= 0) {
                alertify.error("Error al cargar la encuesta");
            } else {
                var opt = '<table style="margin-left:30px">';
                opt += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Motivacion y Ambiente de trabajo</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Factor == 1) {
                        opt += '<tr><td><input id="Id_Pregunta" value="' + r[i].Id_Pregunta + '" hidden>' + r[i].Pregunta +'</td><td><select id="Respuesta"><option value="EXCELENTE" selected>EXCELENTE</option><option value="BUENO">BUENO</option><option value="REGULAR">REGULAR</option><option value="MALO">MALO</option></select></td></tr>';
                    }
                }
                opt += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Capital Humano</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Factor == 2) {
                        opt += '<tr><td><input id="Id_Pregunta" value="' + r[i].Id_Pregunta + '" hidden>' + r[i].Pregunta + '</td><td><select id="Respuesta"><option value="EXCELENTE" selected>EXCELENTE</option><option value="BUENO">BUENO</option><option value="REGULAR">REGULAR</option><option value="MALO">MALO</option></select></td></tr>';
                    }
                }
                opt += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Seguridad e Higiene</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Factor == 4) {
                        opt += '<tr><td><input id="Id_Pregunta" value="' + r[i].Id_Pregunta + '" hidden>' + r[i].Pregunta + '</td><td><select id="Respuesta"><option value="EXCELENTE" selected>EXCELENTE</option><option value="BUENO">BUENO</option><option value="REGULAR">REGULAR</option><option value="MALO">MALO</option></select></td></tr>';
                    }
                }
                opt += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Infraestrucura</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Factor == 5) {
                        opt += '<tr><td><input id="Id_Pregunta" value="' + r[i].Id_Pregunta + '" hidden>' + r[i].Pregunta + '</td><td><select id="Respuesta"><option value="EXCELENTE" selected>EXCELENTE</option><option value="BUENO">BUENO</option><option value="REGULAR">REGULAR</option><option value="MALO">MALO</option></select></td></tr>';
                    }
                }
                opt += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Liderazgo del jefe inmediato</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Factor == 6) {
                        opt += '<tr><td><input id="Id_Pregunta" value="' + r[i].Id_Pregunta + '" hidden>' + r[i].Pregunta + '</td><td><select id="Respuesta"><option value="EXCELENTE" selected>EXCELENTE</option><option value="BUENO">BUENO</option><option value="REGULAR">REGULAR</option><option value="MALO">MALO</option></select></td></tr>';
                    }
                }
                opt += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Motivacion y Ambiente de trabajo</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Factor == 7) {
                        if (r[i].Id_Pregunta != 79) {
                            opt += '<tr><td><input id="Id_Pregunta" value="' + r[i].Id_Pregunta + '" hidden>' + r[i].Pregunta + '</td><td><select id="Respuesta"><option value="MUY DE ACUERDO" selected>MUY DE ACUERDO</option><option value="DE ACUERDO">DE ACUERDO</option><option value="NI DE ACUERDO NI EN DESACUERDO">NI DE ACUERDO NI EN DESACUERDO</option><option value="EN DESACUERDO">EN DESACUERDO</option></select></td></tr>';
                        } else {
                            opt += '<tr><td><input id="Id_Pregunta" value="' + r[i].Id_Pregunta + '" hidden>' + r[i].Pregunta + '</td><td><label style="margin-right:100px"><input type="checkbox" id="Preg38" value="Ambiente de trajo"/> Ambiente de trajo</label><br /><label style="margin-right:115px"><input type="checkbox" id="Preg38" value="Plan de carrera"/> Plan de carrera</label><br /><label style="margin-right:175px"><input type="checkbox" id="Preg38" value="Sueldo"/> Sueldo</label><br /><label style="margin-right:70px"><input type="checkbox" id="Preg38" value="Flexibilidad de horario"/> Flexibilidad de horario</label><br /><label style="margin-right:135px"><input type="checkbox" id="Preg38" value="Capacitación"/> Capacitación</label><br /><label style="margin-right:180px"><input type="checkbox" id="Preg38" value="Bonos"/> Bonos</label><br /><label style="margin-right:150px"><input type="checkbox" id="Preg38" value="Ubicación"/> Ubicación</label><br /><label style="margin-right:130px"><input type="checkbox" id="Preg38" value="Instalaciones"/> Instalaciones</label><br /><label style="margin-right:135px"><input type="checkbox" id="Preg38" value="Prestaciones"/> Prestaciones</label></td></tr>';
                        }
                    }
                }
                //opt += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>OBSERVACIONES O SUGERENCIAS</h6></td></tr>';
                //opt += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><input id="Id_Pregunta" value="86" hidden><textarea maxlength="300" id="Respuesta"></textarea></td></tr>';
                opt += '</table>';

                document.getElementById('tablaEvaluacion').innerHTML = opt;
            }
        }
    };

    xml.open("GET", url, true);
    xml.send();
}

//Valida que todas las preguntas sean contestadas
function ValidarRespuestasEvaluacionClima() {
    var r = document.querySelectorAll('[id="Respuesta"]');
    //var c = 0;
    var pregunta = document.querySelectorAll('[id="Id_Pregunta"]');
    let ch = $("input[type=checkbox]:checked");

    
    //for (var i = 0; i < r.length; i++) {
    //    if (i!=38) {
    //        if (r[i].value == 0) {
    //            c++;
    //        }
    //    }
    //}
    //if (c == 0) {
        if (ch.length > 3) {
            alertify.alert("Favor de seleccionar no más de 3 opciones")
        } else if (ch.length < 3) {
            alertify.alert("Favor de seleccionar al menos 3 opciones ")
        } else {
            for (var i = 0; i < pregunta.length; i++) {
                if (pregunta[i].value == "79") {
                    for (var n = 0; n < ch.length; n++) {
                        //console.log(55, ch[n].value, pregunta[i].value)
                        GuardarEvaluacionClimaLab(document.getElementById('Id_encuesta').value, ch[n].value, pregunta[i].value);
                        console.log("Correcto check")
                    }
                } else {
                    //console.log(55, r[i].value, pregunta[i].value);
                    GuardarEvaluacionClimaLab(document.getElementById('Id_encuesta').value, r[i].value, pregunta[i].value);
                    console.log("Correcto select")
                }
            }
            alertify.alert('Notificación', 'Respuestas de la evaluación guardadas con exito', function () {
                location.reload();
            });
        }
    //} else {
    //    alertify.alert("Favor de contestar todas las preguntas")
    //}
}

//Envia  las rspuestas de la evaluacion
function GuardarEvaluacionClimaLab(encuesta, respuesta, pregunta) {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Encuestas/GuardarEvaluacionClimaLaboral";
    var json = {
        Id_Encuesta: encuesta,
        Id_Pregunta: pregunta,
        Respuesta: respuesta
    }
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var r = JSON.parse(this.responseText);
            console.log(r);
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}