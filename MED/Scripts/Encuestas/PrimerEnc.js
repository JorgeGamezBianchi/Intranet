//Funcion para cargar las preguntas de la primer encuesta encuesta
function Cargar_PrimerEnc() {
    var url = hostInit + "/Encuestas/Cargar_Guias/";
    var xml = new XMLHttpRequest();
    var json = {
        Id_Examen: 13//document.getElementById('Id_Examen').value
    }
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var r = JSON.parse(this.responseText);
            if (r.length > 0) {
                var html = '<table class="table table-hover table-bordered table-responsive-md"  id="example"  style="margin-top:15px; font-size:16px">';
                html += '<thead class="text-center" style="background-color:steelblue; color:white">';
                html += '<tr>';
                html += '<th>';
                html += '<h6 ><strong>PREGUNTA</strong></h6>';
                html += '</th>';
                html += '<th>';
                html += '<h6><strong>RESPUESTA</strong></h6>';
                html += '</th>';
                html += '</thead>';
                html += '<tbody >';
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>I.- Acontecimiento traumático severo</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 1) {
                        html += '<tr class="seccion1">';
                        html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                        html += '<td>';
                        html += '<select id="Respuesta" name="sec1" class="form-control" onchange="ValEnc_Sec1()">'
                        html += '<option value="Seleccione" selected >Seleccione</option>';
                        html += '<option value="No">No</option>';
                        html += '<option value="Si">Si</option>';
                        html += '</select>';
                        html += '</td>';
                        html += '</tr>';
                    }
                }
                html += '<tr id="seccion2tr" hidden=true><td id="tdseccion2" colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>II.- Recuerdos persistentes sobre el acontecimiento (durante el último mes):</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 2) {
                        html += '<tr hidden=true class="seccion2" >';
                        html += '<td > <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                        html += '<td>';
                        html += '<select id="Respuesta" name="sec2" class="form-control">'
                        html += '<option value="Seleccione" selected >Seleccione</option>';
                        html += '<option value="No">No</option>';
                        html += '<option value="Si">Si</option>';
                        html += '</select>';
                        html += '</td>';
                        html += '</tr>';
                    }
                }

                html += '<tr id="seccion3tr" hidden><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>III.- Esfuerzo por evitar circunstancias parecidas o asociadas al acontecimiento (durante el último mes):</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 3) {
                        html += '<tr class="seccion3" hidden >';
                        html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                        html += '<td>';
                        html += '<select id="Respuesta" name="sec3" class="form-control">'
                        html += '<option value="Seleccione" selected >Seleccione</option>';
                        html += '<option value="No">No</option>';
                        html += '<option value="Si" >Si</option>';
                        html += '</select>';
                        html += '</td>';
                        html += '</tr>';
                    }
                }
                html += '<tr id="seccion4tr" hidden><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>IV.- Afectación (durante el último mes):</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 4) {
                        html += '<tr class="seccion4" hidden>';
                        html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                        html += '<td>';
                        html += '<select id="Respuesta" name="sec4" class="form-control">'
                        html += '<option value="Seleccione" selected >Seleccione</option>';
                        html += '<option value="No">No</option>';
                        html += '<option value="Si">Si</option>';
                        html += '</select>';
                        html += '</td>';
                        html += '</tr>';
                    }
                }
                html += '<div>';
                html += '</tbody>';
                html += '</table><br />';
                document.getElementById('tabla').innerHTML = html;
                ValEnc_Sec1();
                document.getElementById('Instrucciones').hidden = true;
                document.getElementById('btn_PrimEnc').hidden = false;
            } else {
                alertify.error("Error");
            }
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

//Funcion para Iniciar la encuesta
function Iniciar_PrimerEnc1() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Encuestas/Iniciar_PrimerEnc";
    var json = {
        NumeroEmpleado: sessionStorage.getItem('usuario'),
        Puesto: sessionStorage.getItem('puesto')
    }
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var r = JSON.parse(this.responseText);
          
            if (r == 1) {
                alertify.alert('La encuesta ya ha sido realizada.');
            }
            else {
                console.log(r);
                document.getElementById('Id_cuestionario').value = r;
                document.getElementById('Div_PrimerEnc').hidden = false;
                document.getElementById('btn_IniciarEnc').hidden = true;
                Cargar_PrimerEnc();
            }
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

//Funcion para traer todas las respuestas de la encuesta

function ValidaRespuestas_PrimerEnc() {
    var r = document.querySelectorAll('select[name="sec1"]');
    var t = document.querySelectorAll('select[name="sec2"]');
    var n = document.querySelectorAll('select[name="sec3"]');
    var m = document.querySelectorAll('select[name="sec4"]');

    var cont1 = 0;
    var cont2 = 0;
    var cont3 = 0;
    var cont4 = 0;
    var cont5 = 0;
    var cont6 = 0;
    var cont7 = 0;
    var cont8 = 0;

    for (var i = 0; i < r.length; i++) {
        if (r[i].value == "Si") {
            cont1++;
        }
        else if (r[i].value == "Seleccione") {
            cont5++;
           
        }

      
    }
    for (var i = 0; i < t.length; i++) {
        if (t[i].value == "Si") {
            cont2++;
        }
         else if (t[i].value == "Seleccione") {
            cont6++;
        }
    }
    for (var i = 0; i < n.length; i++) {
        if (n[i].value == "Si") {
            cont3++;
        }
        else if (n[i].value == "Seleccione") {
            cont7++;
        }

    }
    for (var i = 0; i < m.length; i++) {
        if (m[i].value == "Si") {
            cont4++;
        }
        else if (m[i].value == "Seleccione") {
            cont8++;
        }
    }
    var ac = "";
    if (cont1 == 0) {
        ac = "No";
    } else if (cont2 >= 1) {
        ac = "Si";
    } else if (cont3 >= 3) {
        ac = "Si";
    } else if (cont4 >= 2) {
        ac = "Si";
    } else {
        ac = "No";
    }
   
     if (cont5 !=0) {
        alertify.alert('Debe contestar todas las preguntas de la sección I');
    } 
     else if (cont1 > 0 && ( cont6 != 0 || cont7 != 0 || cont8 != 0 )){
        alertify.alert('Se cuenta con una respuesta "Si" en la primera sección, favor de contestar las secciones II,III y IV');         
        
    } 
     

    else {
        var p = document.querySelectorAll('input[id="Id_pregunta"]');
        var r = document.querySelectorAll('select[id="Respuesta"]');
        for (var i = 0; i < p.length; i++) {
            EnviarRespuestas_Encuestas(p[i].value, r[i].value, ac, 13);
        }
        if (cont1 == 0) {
            alertify.alert("No se requiere atención clinica");
        } else if (cont2 >= 1) {
            alertify.alert("Se requiere atención clínica");
        } else if (cont3 >= 3) {
            alertify.alert("Se requiere atención clínica");
        } else if (cont4 >= 2) {
            alertify.alert("Se requiere atención clínica");
        } else {
            alertify.alert("No se requiere atención clínica");
        }

        document.getElementById('tabla').innerHTML = "";
        //document.getElementById('Id_Examen').value = 14;
        document.getElementById('btn_PrimEnc').hidden = true;
        alertify.alert("Concluyo la primer encuesta, se iniciará la segunda encuesta");
        //Cargar_SegundaEnc();
        Cargar_TerceraEnc(); 
    }
}

//Funcion para enviar las respuestas de la encuestas
function EnviarRespuestas_Encuestas(id_p, respuesta, ayuda, examen) {
    var xml = new XMLHttpRequest();
    var json = {
        Id_cuestionario: document.getElementById('Id_cuestionario').value,
        Id_pregunta: id_p,
        Respuesta: respuesta,
        Id_Examen: examen,
        AtencionClinica: ayuda
    }
    var url = hostInit + "/Encuestas/GuardarRespuestas_Enc";
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

//Validación para bloquear los select de las secciones I,II,III,IV en caso de que la seccion I sean todas "No"
function ValEnc_Sec1() {
    var c = false;

    var r = document.querySelectorAll('select[name="sec2"]');
    var t = document.querySelectorAll('select[name="sec1"]');
    var n = document.querySelectorAll('select[name="sec3"]');
    var m = document.querySelectorAll('select[name="sec4"]');

    for (var i = 0; i < t.length; i++) {
        if (t[i].value == "Si") {
            c = true;
            Mostrar_Secciones();
        }
    }
    console.log(c);
    if (!c) {
        Ocultar_Secciones();
        for (var i = 0; i < r.length; i++) {
            r[i].disabled = true;
        }
        for (var i = 0; i < n.length; i++) {
            n[i].disabled = true;
        }
        for (var i = 0; i < m.length; i++) {
            m[i].disabled = true;
        }
    } else {
        for (var i = 0; i < r.length; i++) {
            r[i].disabled = false;
        }
        for (var i = 0; i < n.length; i++) {
            n[i].disabled = false;
        }
        for (var i = 0; i < m.length; i++) {
            m[i].disabled = false;
        }
    }
}

function Mostrar_Secciones() {


    document.getElementById("seccion2tr").hidden = false;
    var r = document.querySelectorAll('.seccion2');   
    for (var i = 0; i < r.length; i++) {
        r[i].hidden = false;        
    }
    document.getElementById("seccion3tr").hidden = false;
    var r = document.querySelectorAll('.seccion3');
    for (var i = 0; i < r.length; i++) {
        r[i].hidden = false;
    }
    document.getElementById("seccion4tr").hidden = false;
    var r = document.querySelectorAll('.seccion4');
    for (var i = 0; i < r.length; i++) {
        r[i].hidden = false;
    }
 
}

function Ocultar_Secciones() {

    document.getElementById("seccion2tr").hidden = true;
    var r = document.querySelectorAll('.seccion2');
    for (var i = 0; i < r.length; i++) {
        r[i].hidden = true;       
    }
    document.getElementById("seccion3tr").hidden = true;
    var r = document.querySelectorAll('.seccion3');
    for (var i = 0; i < r.length; i++) {
        r[i].hidden = true;
    }
    document.getElementById("seccion4tr").hidden = true;
    var r = document.querySelectorAll('.seccion4');
    for (var i = 0; i < r.length; i++) {
        r[i].hidden = true;
    }
}

//Funcion para cargar las preguntas de la primer encuesta encuesta
function Cargar_SegundaEnc() {
    var url = hostInit + "/Encuestas/Cargar_Guias/";
    var xml = new XMLHttpRequest();
    var json = {
        Id_Examen: 14//document.getElementById('Id_Examen').value
    }
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var r = JSON.parse(this.responseText);
            if (r.length > 0) {
                var html = '<table  id="example"  style="margin-top:15px; margin-left:10%; font-size:14px">';
                html += '<thead class="text-center" style="background-color:steelblue; color:white">';
                html += '<tr>';
                html += '<th>';
                html += '<h6 ><strong>PREGUNTA</strong></h6>';
                html += '</th>';
                html += '<th>';
                html += '<h6><strong>RESPUESTA</strong></h6>';
                html += '</th>';
                html += '</thead>';
                html += '<tbody >';
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Para responder las preguntas siguientes considere las condiciones de su centro de trabajo, así como la cantidad y ritmo de trabajo.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 5) {
                        html += '<tr class="seccion5">';
                        html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                        html += '<td>';
                        html += '<select id="Respuesta" name="sec5" class="form-control" >'
                        html += '<option value="s" selected >Selecciona</option>';
                        html += '<option value="4">Siempre</option>';
                        html += '<option value="3">Casi siempre</option>';
                        html += '<option value="2">Algunas veces</option>';
                        html += '<option value="1">Casi nunca</option>';
                        html += '<option value="0">Nunca</option>';
                        html += '</select>';
                        html += '</td>';
                        html += '</tr>';
                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Para Las preguntas siguientes están relacionadas con las actividades que realiza en su trabajo y las responsabilidades que tiene.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 6) {
                        html += '<tr class="seccion6">';
                        html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                        html += '<td>';
                        html += '<select id="Respuesta" name="sec6" class="form-control" >'
                        html += '<option value="s" selected >Selecciona</option>';
                        html += '<option value="4">Siempre</option>';
                        html += '<option value="3">Casi siempre</option>';
                        html += '<option value="2">Algunas veces</option>';
                        html += '<option value="1">Casi nunca</option>';
                        html += '<option value="0">Nunca</option>';
                        html += '</select>';
                        html += '</td>';
                        html += '</tr>';
                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Las preguntas siguientes están relacionadas con el tiempo destinado a su trabajo y sus responsabilidades familiares.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 7) {
                        html += '<tr class="seccion7">';
                        html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                        html += '<td>';
                        html += '<select id="Respuesta" name="sec7" class="form-control" >'
                        html += '<option value="s" selected >Selecciona</option>';
                        html += '<option value="4">Siempre</option>';
                        html += '<option value="3">Casi siempre</option>';
                        html += '<option value="2">Algunas veces</option>';
                        html += '<option value="1">Casi nunca</option>';
                        html += '<option value="0">Nunca</option>';
                        html += '</select>';
                        html += '</td>';
                        html += '</tr>';
                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Las preguntas siguientes están relacionadas con las decisiones que puede tomar en su trabajo.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 8) {
                        html += '<tr class="seccion8">';
                        html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                        html += '<td>';
                        html += '<select id="Respuesta" name="sec8" class="form-control" >'
                        html += '<option value="s" selected >Selecciona</option>';
                        html += '<option value="0">Siempre</option>';
                        html += '<option value="1">Casi siempre</option>';
                        html += '<option value="2">Algunas veces</option>';
                        html += '<option value="3">Casi nunca</option>';
                        html += '<option value="4">Nunca</option>';
                        html += '</select>';
                        html += '</td>';
                        html += '</tr>';
                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Las preguntas siguientes están relacionadas con la capacitación e información que recibe sobre su trabajo.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 9) {
                        html += '<tr class="seccion9">';
                        html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                        html += '<td>';
                        html += '<select id="Respuesta" name="sec9" class="form-control" >'
                        html += '<option value="s" selected >Selecciona</option>';
                        html += '<option value="0">Siempre</option>';
                        html += '<option value="1">Casi siempre</option>';
                        html += '<option value="2">Algunas veces</option>';
                        html += '<option value="3">Casi nunca</option>';
                        html += '<option value="4">Nunca</option>';
                        html += '</select>';
                        html += '</td>';
                        html += '</tr>';
                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Las preguntas siguientes se refieren a las relaciones con sus compañeros de trabajo y su jefe.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 10) {
                        if (r[i].Pregunta == "Mi jefe tiene en cuenta mis puntos de vista y opiniones" ||
                            r[i].Pregunta == "Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo" ||
                            r[i].Pregunta == "Puedo confiar en mis compañeros de trabajo" ||
                            r[i].Pregunta == "Cuando tenemos que realizar trabajo de equipo los compañeros colaboran" ||
                            r[i].Pregunta == "Mis compañeros de trabajo me ayudan cuando tengo dificultades" ||
                            r[i].Pregunta == "En mi trabajo puedo expresarme libremente sin interrupciones") {
                            html += '<tr class="seccion10">';
                            html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                            html += '<td>';
                            html += '<select id="Respuesta" name="sec10" class="form-control" >'
                            html += '<option value="s" selected >Selecciona</option>';
                            html += '<option value="0">Siempre</option>';
                            html += '<option value="1">Casi siempre</option>';
                            html += '<option value="2">Algunas veces</option>';
                            html += '<option value="3">Casi nunca</option>';
                            html += '<option value="4">Nunca</option>';
                            html += '</select>';
                            html += '</td>';
                            html += '</tr>';
                        } else {
                            html += '<tr class="seccion10">';
                            html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                            html += '<td>';
                            html += '<select id="Respuesta" name="sec10" class="form-control" >'
                            html += '<option value="s" selected >Selecciona</option>';
                            html += '<option value="4">Siempre</option>';
                            html += '<option value="3">Casi siempre</option>';
                            html += '<option value="2">Algunas veces</option>';
                            html += '<option value="1">Casi nunca</option>';
                            html += '<option value="0">Nunca</option>';
                            html += '</select>';
                            html += '</td>';
                            html += '</tr>';
                        }
                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Las preguntas siguientes están relacionadas con la atención a clientes y usuarios.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 11) {

                        if (r[i].Pregunta == "En mi trabajo debo brindar servicio a clientes o usuarios") {
                            html += '<tr class="seccion11">';
                            html += '<td> <input id="" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                            html += '<td>';
                            html += '<select id="" name="sec11" class="form-control" onchange="Val_SeccOnce_SegEnc()" >'
                            html += '<option value="0" selected >Selecciona</option>';
                            html += '<option value="Si">Si</option>';
                            html += '<option value="No">No</option>';
                            html += '</select>';
                            html += '</td>';
                        } else {
                            html += '<tr class="seccion11">';
                            html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                            html += '<td>';
                            html += '<select id="Respuesta" name="sec11" class="form-control" >'
                            html += '<option value="s" selected >Selecciona</option>';
                            html += '<option value="4">Siempre</option>';
                            html += '<option value="3">Casi siempre</option>';
                            html += '<option value="2">Algunas veces</option>';
                            html += '<option value="1">Casi nunca</option>';
                            html += '<option value="0">Nunca</option>';
                            html += '</select>';
                            html += '</td>';
                            html += '</tr>';
                        }
                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Las siguientes preguntas están relacionadas con las actitudes de los trabajadores que supervisa.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 12) {
                        if (r[i].Pregunta == "Soy jefe de otros trabajadores") {
                            html += '<tr class="seccion12">';
                            html += '<td> <input id="" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                            html += '<td>';
                            html += '<select id="" name="sec12" class="form-control" onchange="Val_SeccDoce_SegEnc()">'
                            html += '<option value="0" selected >Selecciona</option>';
                            html += '<option value="Si">Si</option>';
                            html += '<option value="No">No</option>';
                            html += '</select>';
                            html += '</td>';
                        } else {
                            html += '<tr class="seccion12">';
                            html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                            html += '<td>';
                            html += '<select id="Respuesta" name="sec12" class="form-control" >'
                            html += '<option value="s" selected >Selecciona</option>';
                            html += '<option value="4">Siempre</option>';
                            html += '<option value="3">Casi siempre</option>';
                            html += '<option value="2">Algunas veces</option>';
                            html += '<option value="1">Casi nunca</option>';
                            html += '<option value="0">Nunca</option>';
                            html += '</select>';
                            html += '</td>';
                            html += '</tr>';
                        }
                    }
                }


                html += '</tbody>';
                html += '</table><br />';
                document.getElementById('tabla').innerHTML = html;
                document.getElementById('btn_SecEnc').hidden = false;
            } else {
                alertify.error("Error");
            }
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}
//Valida la seccion 11, en caso de que la primer respuesta sea "Si" se tiene que contestar las siguientes preguntas de esa seccion, de lo contrario se bloquean
function Val_SeccOnce_SegEnc() {
    var t = document.querySelectorAll('select[name="sec11"]');

    if (t[0].value == "No") {
        for (var i = 1; i < t.length; i++) {
            t[i].disabled = true;
            t[i].value = "s";
        }
        alertify.message('No será necesario contestar el resto de la seccion.');
    } else {
        for (var i = 1; i < t.length; i++) {
            t[i].disabled = false;
        }
        alertify.message('Será necesario contestar el resto de la seccion.');
    }
}
//Valida la seccion 12, en caso de que la primer respuesta sea "Si" se tiene que contestar las siguientes preguntas de esa seccion, de lo contrario se bloquean
function Val_SeccDoce_SegEnc() {
    var t = document.querySelectorAll('select[name="sec12"]');

    if (t[0].value == "No") {
        for (var i = 1; i < t.length; i++) {
            t[i].disabled = true;
            t[i].value = "s";
        }
        alertify.message('No será necesario contestar el resto de la sección. Puede dar por terminada la segunda parte de la encuesta.');
    } else {
        for (var i = 1; i < t.length; i++) {
            t[i].disabled = false;
        }
        alertify.message('Será necesario contestar el resto de la sección.');
    }
}

//Validación de la segunda encuesta al guardar las respuestas
function ValidaRespuestas_SegundaEnc() {
    //Traen en arreglos, todos los 'select' por secciones
    var a = document.querySelectorAll('select[name="sec5"]');
    var b = document.querySelectorAll('select[name="sec6"]');
    var c = document.querySelectorAll('select[name="sec7"]');
    var d = document.querySelectorAll('select[name="sec8"]');
    var e = document.querySelectorAll('select[name="sec9"]');
    var f = document.querySelectorAll('select[name="sec10"]');
    var g = document.querySelectorAll('select[name="sec11"]');
    var h = document.querySelectorAll('select[name="sec12"]');

    //Valiables que serviran como contadores
    var cont1 = 0;
    var cont2 = 0;
    var cont3 = 0;
    var cont4 = 0;
    var cont5 = 0;
    var cont6 = 0;
    var cont7 = 0;
    var cont8 = 0;

    //Se recorren los arreglos y s
    for (var i = 0; i < a.length; i++) {
        if (a[i].value != "s") {
            cont1++;
        }
    }
    for (var i = 0; i < b.length; i++) {
        if (b[i].value != "s") {
            cont2++;
        }
    }
    for (var i = 0; i < c.length; i++) {
        if (c[i].value != "s") {
            cont3++;
        }
    }
    for (var i = 0; i < d.length; i++) {
        if (d[i].value != "s") {
            cont4++;
        }
    }
    for (var i = 0; i < e.length; i++) {
        if (e[i].value != "s") {
            cont5++;
        }
    }
    for (var i = 0; i < f.length; i++) {
        if (f[i].value != "s") {
            cont6++;
        }
    }

    if (cont1 == a.length && cont2 == b.length && cont3 == c.length && cont4 == d.length && cont5 == e.length && cont6 == f.length && g[0].value != 0 && h[0].value != 0) {

        for (var i = 1; i < g.length; i++) {
            if (g[i].value != "s") {
                cont7++;
            }
        }
        for (var i = 1; i < h.length; i++) {
            if (h[i].value != "s") {
                cont8++;
            }
        }

        if (g[0].value == "Si" && cont7 != (g.length - 1)) {
            alertify.alert('Favor de contestar las preguntas de la sección "Las preguntas siguientes están relacionadas con la atención a clientes y usuarios."')
        } else if (h[0].value == "Si" && cont8 != (h.length - 1)) {
            alertify.alert('Favor de contestar las preguntas de la sección "Las siguientes preguntas están relacionadas con las actitudes de los trabajadores que supervisa."')
        } else {
            //alertify.success("Todo correcto");
            var p = document.querySelectorAll('input[id="Id_pregunta"]');
            var r = document.querySelectorAll('select[id="Respuesta"]');
            for (var i = 0; i < r.length; i++) {
                EnviarRespuestas_Encuestas(p[i].value, r[i].value, "", 14);
            }

            document.getElementById('tabla').innerHTML = "";
            document.getElementById('Id_Examen').value = 15;
            document.getElementById('btn_SecEnc').hidden = true;
            alertify.alert("Concluyo la segunda encuesta, se iniciará la tercer encuesta");
            Cargar_TerceraEnc();
        }
    } else {
        alertify.alert("Favor de contestar todas las preguntas");
    }
}

//Funcion para cargar las preguntas de la primer encuesta encuesta
function Cargar_TerceraEnc() {
    var url = hostInit + "/Encuestas/Cargar_Guias/";
    var xml = new XMLHttpRequest();
    var json = {
        Id_Examen: 15//document.getElementById('Id_Examen').value
    }
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var r = JSON.parse(this.responseText);
            if (r.length > 0) {
                var html = '<table  id="example"  style="margin-top:15px; margin-left:10%; font-size:14px">';
                html += '<thead class="text-center" style="background-color:steelblue; color:white">';
                html += '<tr>';
                html += '<th>';
                html += '<h6 ><strong>PREGUNTA</strong></h6>';
                html += '</th>';
                html += '<th>';
                html += '<h6><strong>RESPUESTA</strong></h6>';
                html += '</th>';
                html += '</thead>';
                html += '<tbody >';
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 13) {
                        if (r[i].Pregunta == "El espacio donde trabajo me permite realizar mis actividades de manera segura e higiénica" || r[i].Pregunta == "Considero que en mi trabajo se aplican las normas de seguridad y salud en el trabajo") {
                            html += '<tr class="seccion13">';
                            html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                            html += '<td>';
                            html += '<select id="Respuesta" name="sec13" class="form-control" >'
                            html += '<option value="s" selected >Selecciona</option>';
                            html += '<option value="0">Siempre</option>';
                            html += '<option value="1">Casi siempre</option>';
                            html += '<option value="2">Algunas veces</option>';
                            html += '<option value="3">Casi nunca</option>';
                            html += '<option value="4">Nunca</option>';
                            html += '</select>';
                            html += '</td>';
                            html += '</tr>';
                        } else {
                            html += '<tr class="seccion13">';
                            html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                            html += '<td>';
                            html += '<select id="Respuesta" name="sec13" class="form-control" >'
                            html += '<option value="s" selected >Selecciona</option>';
                            html += '<option value="4">Siempre</option>';
                            html += '<option value="3">Casi siempre</option>';
                            html += '<option value="2">Algunas veces</option>';
                            html += '<option value="1">Casi nunca</option>';
                            html += '<option value="0">Nunca</option>';
                            html += '</select>';
                            html += '</td>';
                            html += '</tr>';
                        }
                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Para responder a las preguntas siguientes piense en la cantidad y ritmo de trabajo que tiene.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 14) {
                        html += '<tr class="seccion14">';
                        html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                        html += '<td>';
                        html += '<select id="Respuesta" name="sec14" class="form-control" >'
                        html += '<option value="s" selected >Selecciona</option>';
                        html += '<option value="4">Siempre</option>';
                        html += '<option value="3">Casi siempre</option>';
                        html += '<option value="2">Algunas veces</option>';
                        html += '<option value="1">Casi nunca</option>';
                        html += '<option value="0">Nunca</option>';
                        html += '</select>';
                        html += '</td>';
                        html += '</tr>';
                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Las preguntas siguientes están relacionadas con el esfuerzo mental que le exige su trabajo.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 15) {
                        html += '<tr class="seccion15">';
                        html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                        html += '<td>';
                        html += '<select id="Respuesta" name="sec15" class="form-control" >'
                        html += '<option value="s" selected >Selecciona</option>';
                        html += '<option value="4">Siempre</option>';
                        html += '<option value="3">Casi siempre</option>';
                        html += '<option value="2">Algunas veces</option>';
                        html += '<option value="1">Casi nunca</option>';
                        html += '<option value="0">Nunca</option>';
                        html += '</select>';
                        html += '</td>';
                        html += '</tr>';
                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Las preguntas siguientes están relacionadas con las actividades que realiza en su trabajo y las responsabilidades que tiene.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 6) {
                        html += '<tr class="seccion6">';
                        html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                        html += '<td>';
                        html += '<select id="Respuesta" name="sec6" class="form-control" >'
                        html += '<option value="s" selected >Selecciona</option>';
                        html += '<option value="0">Siempre</option>';
                        html += '<option value="1">Casi siempre</option>';
                        html += '<option value="2">Algunas veces</option>';
                        html += '<option value="3">Casi nunca</option>';
                        html += '<option value="4">Nunca</option>';
                        html += '</select>';
                        html += '</td>';
                        html += '</tr>';
                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Las preguntas siguientes están relacionadas con su jornada de trabajo.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 16) {
                        html += '<tr class="seccion16">';
                        html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                        html += '<td>';
                        html += '<select id="Respuesta" name="sec16" class="form-control" >'
                        html += '<option value="s" selected >Selecciona</option>';
                        html += '<option value="0">Siempre</option>';
                        html += '<option value="1">Casi siempre</option>';
                        html += '<option value="2">Algunas veces</option>';
                        html += '<option value="3">Casi nunca</option>';
                        html += '<option value="4">Nunca</option>';
                        html += '</select>';
                        html += '</td>';
                        html += '</tr>';
                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Las preguntas siguientes están relacionadas con las decisiones que puede tomar en su trabajo.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 8) {
                        html += '<tr class="seccion8">';
                        html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                        html += '<td>';
                        html += '<select id="Respuesta" name="sec8" class="form-control" >'
                        html += '<option value="s" selected >Selecciona</option>';
                        html += '<option value="0">Siempre</option>';
                        html += '<option value="1">Casi siempre</option>';
                        html += '<option value="2">Algunas veces</option>';
                        html += '<option value="3">Casi nunca</option>';
                        html += '<option value="4">Nunca</option>';
                        html += '</select>';
                        html += '</td>';
                        html += '</tr>';
                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Las preguntas siguientes están relacionadas con cualquier tipo de cambio que ocurra en su trabajo (considere los últimos cambios realizados).</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 17) {

                        if (r[i].Pregunta == "Los cambios que se presentan en mi trabajo dificultan mi labor") {
                            html += '<tr class="seccion17">';
                            html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                            html += '<td>';
                            html += '<select id="Respuesta" name="sec17" class="form-control" >'
                            html += '<option value="s" selected >Selecciona</option>';
                            html += '<option value="4">Siempre</option>';
                            html += '<option value="3">Casi siempre</option>';
                            html += '<option value="2">Algunas veces</option>';
                            html += '<option value="1">Casi nunca</option>';
                            html += '<option value="0">Nunca</option>';
                            html += '</select>';
                            html += '</td>';
                            html += '</tr>';
                        } else {
                            html += '<tr class="seccion17">';
                            html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                            html += '<td>';
                            html += '<select id="Respuesta" name="sec17" class="form-control" >'
                            html += '<option value="s" selected >Selecciona</option>';
                            html += '<option value="0">Siempre</option>';
                            html += '<option value="1">Casi siempre</option>';
                            html += '<option value="2">Algunas veces</option>';
                            html += '<option value="3">Casi nunca</option>';
                            html += '<option value="4">Nunca</option>';
                            html += '</select>';
                            html += '</td>';
                            html += '</tr>';
                        }
                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Las preguntas siguientes están relacionadas con la capacitación e información que recibe sobre su trabajo.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 9) {
                        html += '<tr class="seccion9">';
                        html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                        html += '<td>';
                        html += '<select id="Respuesta" name="sec9" class="form-control" >'
                        html += '<option value="s" selected >Selecciona</option>';
                        html += '<option value="0">Siempre</option>';
                        html += '<option value="1">Casi siempre</option>';
                        html += '<option value="2">Algunas veces</option>';
                        html += '<option value="3">Casi nunca</option>';
                        html += '<option value="4">Nunca</option>';
                        html += '</select>';
                        html += '</td>';
                        html += '</tr>';
                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Las preguntas siguientes están relacionadas con el o los jefes con quien tiene contacto.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 18) {
                        html += '<tr class="seccion18">';
                        html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                        html += '<td>';
                        html += '<select id="Respuesta" name="sec18" class="form-control" >'
                        html += '<option value="s" selected >Selecciona</option>';
                        html += '<option value="0">Siempre</option>';
                        html += '<option value="1">Casi siempre</option>';
                        html += '<option value="2">Algunas veces</option>';
                        html += '<option value="3">Casi nunca</option>';
                        html += '<option value="4">Nunca</option>';
                        html += '</select>';
                        html += '</td>';
                        html += '</tr>';
                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Las preguntas siguientes se refieren a las relaciones con sus compañeros.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 19) {
                        html += '<tr class="seccion19">';
                        html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                        html += '<td>';
                        html += '<select id="Respuesta" name="sec19" class="form-control" >'
                        html += '<option value="s" selected >Selecciona</option>';
                        html += '<option value="0">Siempre</option>';
                        html += '<option value="1">Casi siempre</option>';
                        html += '<option value="2">Algunas veces</option>';
                        html += '<option value="3">Casi nunca</option>';
                        html += '<option value="4">Nunca</option>';
                        html += '</select>';
                        html += '</td>';
                        html += '</tr>';
                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Las preguntas siguientes están relacionadas con la información que recibe sobre su rendimiento en el trabajo, el reconocimiento, el sentido de pertenencia y la estabilidad que le ofrece su trabajo.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 20) {
                        if (r[i].Pregunta == "En mi trabajo existe continua rotación de personal") {
                            html += '<tr class="seccion20">';
                            html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                            html += '<td>';
                            html += '<select id="Respuesta" name="sec20" class="form-control" >'
                            html += '<option value="s" selected >Selecciona</option>';
                            html += '<option value="4">Siempre</option>';
                            html += '<option value="3">Casi siempre</option>';
                            html += '<option value="2">Algunas veces</option>';
                            html += '<option value="1">Casi nunca</option>';
                            html += '<option value="0">Nunca</option>';
                            html += '</select>';
                            html += '</td>';
                            html += '</tr>';
                        } else {
                            html += '<tr class="seccion20">';
                            html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                            html += '<td>';
                            html += '<select id="Respuesta" name="sec20" class="form-control" >'
                            html += '<option value="s" selected >Selecciona</option>';
                            html += '<option value="0">Siempre</option>';
                            html += '<option value="1">Casi siempre</option>';
                            html += '<option value="2">Algunas veces</option>';
                            html += '<option value="3">Casi nunca</option>';
                            html += '<option value="4">Nunca</option>';
                            html += '</select>';
                            html += '</td>';
                            html += '</tr>';
                        }

                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>LasLas preguntas siguientes están relacionadas con actos de violencia laboral (malos tratos, acoso, hostigamiento, acoso psicológico).</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 21) {
                        if (r[i].Pregunta == "En mi trabajo puedo expresarme libremente sin interrupciones") {
                            html += '<tr class="seccion21">';
                            html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                            html += '<td>';
                            html += '<select id="Respuesta" name="sec21" class="form-control" >'
                            html += '<option value="s" selected >Selecciona</option>';
                            html += '<option value="0">Siempre</option>';
                            html += '<option value="1">Casi siempre</option>';
                            html += '<option value="2">Algunas veces</option>';
                            html += '<option value="3">Casi nunca</option>';
                            html += '<option value="4">Nunca</option>';
                            html += '</select>';
                            html += '</td>';
                            html += '</tr>';
                        } else {
                            html += '<tr class="seccion21">';
                            html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                            html += '<td>';
                            html += '<select id="Respuesta" name="sec21" class="form-control" >'
                            html += '<option value="s" selected >Selecciona</option>';
                            html += '<option value="4">Siempre</option>';
                            html += '<option value="3">Casi siempre</option>';
                            html += '<option value="2">Algunas veces</option>';
                            html += '<option value="1">Casi nunca</option>';
                            html += '<option value="0">Nunca</option>';
                            html += '</select>';
                            html += '</td>';
                            html += '</tr>';
                        }
                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Las preguntas siguientes están relacionadas con la atención a clientes y usuarios.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 11) {

                        if (r[i].Pregunta == "En mi trabajo debo brindar servicio a clientes o usuarios:") {
                            html += '<tr class="seccion11">';
                            html += '<td> <input id="" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                            html += '<td>';
                            html += '<select id="" name="sec11" class="form-control" onchange="Val_SeccOnce_SegEnc()" >'
                            html += '<option value="0" selected >Selecciona</option>';
                            html += '<option value="Si">Si</option>';
                            html += '<option value="No">No</option>';
                            html += '</select>';
                            html += '</td>';
                        } else {
                            html += '<tr class="seccion11">';
                            html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                            html += '<td>';
                            html += '<select id="Respuesta" name="sec11" class="form-control" >'
                            html += '<option value="s" selected >Selecciona</option>';
                            html += '<option value="4">Siempre</option>';
                            html += '<option value="3">Casi siempre</option>';
                            html += '<option value="2">Algunas veces</option>';
                            html += '<option value="1">Casi nunca</option>';
                            html += '<option value="0">Nunca</option>';
                            html += '</select>';
                            html += '</td>';
                            html += '</tr>';
                        }
                    }
                }
                html += '<tr><td colspan="2" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>Las siguientes preguntas están relacionadas con las actitudes de los trabajadores que supervisa.</h6></td></tr>';
                for (var i = 0; i < r.length; i++) {
                    if (r[i].Id_seccion == 12) {
                        if (r[i].Pregunta == "Soy jefe de otros trabajadores") {
                            html += '<tr class="seccion12">';
                            html += '<td> <input id="" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                            html += '<td>';
                            html += '<select id="" name="sec12" class="form-control" onchange="Val_SeccDoce_SegEnc()">'
                            html += '<option value="0" selected >Selecciona</option>';
                            html += '<option value="Si">Si</option>';
                            html += '<option value="No">No</option>';
                            html += '</select>';
                            html += '</td>';
                        } else {
                            html += '<tr class="seccion12">';
                            html += '<td> <input id="Id_pregunta" value="' + r[i].Id_pregunta + '" hidden /> ' + r[i].Pregunta + ' </td>';
                            html += '<td>';
                            html += '<select id="Respuesta" name="sec12" class="form-control" >'
                            html += '<option value="s" selected >Selecciona</option>';
                            html += '<option value="4">Siempre</option>';
                            html += '<option value="3">Casi siempre</option>';
                            html += '<option value="2">Algunas veces</option>';
                            html += '<option value="1">Casi nunca</option>';
                            html += '<option value="0">Nunca</option>';
                            html += '</select>';
                            html += '</td>';
                            html += '</tr>';
                        }
                    }
                }

                html += '</tbody>';
                html += '</table><br />';
                document.getElementById('tituloEmpleado').innerHTML = "CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL Y EVALUAR EL ENTORNO ORGANIZACIONAL EN LOS CENTROS DE TRABAJO";
                document.getElementById('tabla').innerHTML = html;
                document.getElementById('btn_TerEnc').hidden = false;
            } else {
                alertify.error("Error");
            }
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

//Funcion validar las respuestas del Tercer cuestionario
function ValidaRespuestas_TercerEnc() {
    var a = document.querySelectorAll('select[name="sec13"]')
    var b = document.querySelectorAll('select[name="sec14"]')
    var c = document.querySelectorAll('select[name="sec15"]')
    var d = document.querySelectorAll('select[name="sec6"]')
    var e = document.querySelectorAll('select[name="sec16"]')
    var f = document.querySelectorAll('select[name="sec8"]')
    var g = document.querySelectorAll('select[name="sec17"]')
    var h = document.querySelectorAll('select[name="sec9"]')
    var j = document.querySelectorAll('select[name="sec18"]')
    var k = document.querySelectorAll('select[name="sec19"]')
    var l = document.querySelectorAll('select[name="sec20"]')
    var m = document.querySelectorAll('select[name="sec21"]')
    var n = document.querySelectorAll('select[name="sec11"]')
    var o = document.querySelectorAll('select[name="sec12"]')

    var cont1 = 0;
    var cont2 = 0;
    var cont3 = 0;
    var cont4 = 0;
    var cont5 = 0;
    var cont6 = 0;
    var cont7 = 0;
    var cont8 = 0;
    var cont9 = 0;
    var cont10 = 0;
    var cont11 = 0;
    var cont12 = 0;
    var cont13 = 0;
    var cont14 = 0;

    for (var i = 0; i < a.length; i++) {
        if (a[i].value != "s") {
            cont1++;
        }
    }
    for (var i = 0; i < b.length; i++) {
        if (b[i].value != "s") {
            cont2++;
        }
    }
    for (var i = 0; i < c.length; i++) {
        if (c[i].value != "s") {
            cont3++;
        }
    }
    for (var i = 0; i < d.length; i++) {
        if (d[i].value != "s") {
            cont4++;
        }
    }
    for (var i = 0; i < e.length; i++) {
        if (e[i].value != "s") {
            cont5++;
        }
    }
    for (var i = 0; i < f.length; i++) {
        if (f[i].value != "s") {
            cont6++;
        }
    }
    for (var i = 0; i < g.length; i++) {
        if (g[i].value != "s") {
            cont7++;
        }
    }
    for (var i = 0; i < h.length; i++) {
        if (h[i].value != "s") {
            cont8++;
        }
    }
    for (var i = 0; i < j.length; i++) {
        if (j[i].value != "s") {
            cont9++;
        }
    }
    for (var i = 0; i < k.length; i++) {
        if (k[i].value != "s") {
            cont10++;
        }
    }
    for (var i = 0; i < l.length; i++) {
        if (l[i].value != "s") {
            cont11++;
        }
    }
    for (var i = 0; i < m.length; i++) {
        if (m[i].value != "s") {
            cont12++;
        }
    }

    if (cont1 == a.length && cont2 == b.length && cont3 == c.length && cont4 == d.length && cont5 == e.length && cont6 == f.length
        && cont7 == g.length && cont8 == h.length && cont9 == j.length && cont10 == k.length && cont11 == l.length && cont12 == m.length
        && n[0].value != "s" && o[0].value != "s"
    ) {
        for (var i = 1; i < n.length; i++) {
            if (n[i].value != "s") {
                cont13++;
            }
        }
        for (var i = 1; i < o.length; i++) {
            if (o[i].value != "s") {
                cont14++;
            }
        }
        if (n[0].value == "Si" && cont13 != (n.length - 1)) {
            alertify.alert('Favor de contestar las preguntas de la sección "Las preguntas siguientes están relacionadas con la atención a clientes y usuarios."')
        } else if (o[0].value == "Si" && cont14 != (o.length - 1)) {
            alertify.alert('Favor de contestar las preguntas de la sección "Las siguientes preguntas están relacionadas con las actitudes de los trabajadores que supervisa."')
        } else {

            var p = document.querySelectorAll('input[id="Id_pregunta"]');
            var r = document.querySelectorAll('select[id="Respuesta"]');
            for (var i = 0; i < r.length; i++) {
                EnviarRespuestas_Encuestas(p[i].value, r[i].value, "", 15);
            }

            document.getElementById('tabla').innerHTML = "";
            document.getElementById('Id_Examen').value = 13;
            document.getElementById('Id_cuestionario').value = 0;
            document.getElementById('Div_PrimerEnc').hidden = true;
            document.getElementById('tituloEmpleado').innerHTML = "CUESTIONARIO PARA IDENTIFICAR A LOS TRABAJADORES QUE FUERON SUJETOS A ACONTECIMIENTOS TRAUMÁTICOS SEVEROS";
            document.getElementById('btn_IniciarEnc').hidden = false;
            alertify.alert("Se guardaron exitosamente las respuestas, ha concluido las encuestas");
        }
    } else {
        alertify.alert("Favor de contestar todas las preguntas de la encuesta");
    }
}