function GuardarRondin() {
    var campos = ["Motivo de captura","Actividad/Incidencia", "Persona", "Direccion","Departamento","Fecha", "Hora"]
    var inputs = document.getElementsByName('obg');
    if (
        document.getElementById('Actividad_Incidencia').value != "" && document.getElementById('Persona').value != ""
        && document.getElementById('Direccion').value != 0 && document.getElementById('Departamento').value != 0
        && document.getElementById('Hora').value != "" && document.getElementById('MotivoCaptura').value != 0
        && document.getElementById('FechaIncidente').value != ""
    ) {
        

        var xml = new XMLHttpRequest();
        var url = hostInit + "/ServiciosGenerales/GuardarRondin";

        var json = {
            Usuario: sessionStorage.getItem('usuario'),
            MotivoCaptura: document.getElementById('MotivoCaptura').value,
            Reporta: document.getElementById('Reporta').value,
            Actividad_Incidencia: document.getElementById('Actividad_Incidencia').value,
            Persona: document.getElementById('Persona').value,
            Direccion: document.getElementById('Direccion').value,
            Departamento: document.getElementById('Departamento').value,
            Campana: document.getElementById('Campania').value,
            Hora: document.getElementById('Hora').value,
            Observaciones: document.getElementById('Observaciones').value,
            FechaIncidente: formatDate(document.getElementById('FechaIncidente').value)
        }

        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                if (result == 1) {
                    document.getElementById('myModal1').style.display = 'block';
                    document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                    document.getElementById('myModalLabel').innerHTML = "Correcto!";
                    document.getElementById('infoModal').innerHTML = "Información guardada";
                    CancelarRondin();
                } else {
                    alertify.error("Error al guardar Rondin");
                }
            }
        };

        xml.open('POST', url, true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(json));
    } else {
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value == "" || inputs[i].value == 0) {
                document.getElementById('myModal1').style.display = 'block';
                document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                document.getElementById('myModalLabel').innerHTML = "Advertencia";
                document.getElementById('infoModal').innerHTML = "Falta llenar campo de " + campos[i];
                inputs[i].focus();
                break;
            }
        }
    }
}

function CancelarRondin() {
    document.getElementById('Actividad_Incidencia').value = "";
    document.getElementById('Persona').value = "";
    document.getElementById('Direccion').value = 0;
    document.getElementById('Departamento').innerHTML = "<option value='0'>Seleccione</option>";
    document.getElementById('Campania').value = 0;
    if (!document.getElementById('Campania').disabled) {
        document.getElementById('Campania').disabled = true;
    }
    document.getElementById('Hora').value = "";
    document.getElementById('Observaciones').value = "";
    $('#FechaIncidente').datepicker(dataCalendar).datepicker("setDate", new Date());
    document.getElementById('MotivoCaptura').value = 0;
    document.getElementById('Reporta').value = 0;
    if (!document.getElementById('Reporta').disabled) {
        document.getElementById('Reporta').disabled = true;
    }
}

function ActDesacCampania() {
    if (document.getElementById('Departamento').value != 14) {
        document.getElementById('Campania').disabled = true;
        document.getElementById('Campania').value = 0;
    } else {
        document.getElementById('Campania').disabled = false;
    }
}

// funcion para habilitar y/o deshabilitar el combo de quien reporta
function HabilitaCampoReporta() {
    if (document.getElementById('MotivoCaptura').value == "Rondin") {
        document.getElementById('Reporta').disabled = false;
    } else {
        document.getElementById('Reporta').disabled = true;
    }
}

//Fucion para cargar los empleados que tienen el puesto de guardias
function CargarGuardias() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/ServiciosGenerales/CargarGuardias";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '<option value="0" selected>Seleccione</option>'
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].id_Empleado + '">' + result[i].Nombre_1 + '</option>';
            }

            document.getElementById('Reporta').innerHTML = opt;
        }
    };

    xml.open("GET", url, true);
    xml.send();
}

//Funcion generar reporte de rondines sin revisar
function GenerarRevisionRondines() {
    if (
        document.getElementById('numEmp').value != "" || document.getElementById('Fechainicio').value != ""
        || document.getElementById('Fechafin').value != "" || document.getElementById('Departamento').value != 0
    ) {
        var xml = new XMLHttpRequest();
        var url = hostInit + "/ServiciosGenerales/GenerarRevisionRondines";
        var json = {
            Usuario: document.getElementById('numEmp').value,
            Departamento: document.getElementById('Departamento').value,
            Fechainicio: formatDate(document.getElementById('Fechainicio').value),
            Fechafin: formatDate(document.getElementById('Fechafin').value),
        }
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                var html = '<table id="example" class="table table-bordered table-hover" style="margin-top:15px">';
                html += '<thead class="text-center">';
                html += '<tr>';
                html += '<th>';
                html += 'Revisado';
                html += '</th>';
                html += '<th>';
                html += 'Usuario';
                html += '</th>';
                html += '<th>';
                html += 'Fecha de Inserción';
                html += '</th>';
                html += '<th>';
                html += 'Fecha de Incidencia';
                html += '</th>';
                html += '<th>';
                html += 'Motivo de captura';
                html += '</th>';
                html += '<th>';
                html += 'Reporta';
                html += '</th>';
                html += '<th>';
                html += 'Actividad/Incidencia';
                html += '</th>';
                html += '<th>';
                html += 'Persona';
                html += '</th>';
                html += '<th>';
                html += 'Dirección';
                html += '</th>';
                html += '<th>';
                html += 'Departamento';
                html += '</th>';
                html += '<th>';
                html += 'Campaña';
                html += '</th>';
                html += '<th>';
                html += 'Hora';
                html += '</th>';
                html += '<th>';
                html += 'Observaciones';
                html += '</th>';
                html += '</tr>';
                html += '</thead>';
                html += '<tbody class="tbody">';
                var i;
                for (i = 0; i < result.length; i++) {
                    html += '<tr>';
                    html += '<td class="text-center" style="padding:20px"> <input type="checkbox" name="Revision" value="1"/> </td>';
                    html += '<td>' + result[i].Usuario + '<input name="IdR" value="' + result[i].IdR+'" hidden></td>';
                    html += '<td>' + result[i].FechaInsercion + '</td>';
                    html += '<td>' + result[i].FechaIncidente + '</td>';
                    html += '<td>' + result[i].MotivoCaptura + '</td>';
                    if (result[i].ReportaR == null || result[i].ReportaR == "") {
                        html += '<td>  </td>';
                    } else {
                        html += '<td>' + result[i].ReportaR + '</td>';
                    }
                    html += '<td>' + result[i].Actividad_Incidencia + '</td>';
                    html += '<td>' + result[i].Persona + '</td>';
                    html += '<td>' + result[i].DireccionR + '</td>';
                    html += '<td>' + result[i].DepartamentoR + '</td>';
                    if (result[i].CampanaR === "Seleccione") {
                        html += '<td> Sin Campaña</td>';
                    } else {
                        html += '<td>' + result[i].CampanaR + '</td>';
                    }
                    html += '<td>' + result[i].Hora + '</td>';
                    html += '<td>' + result[i].Observaciones + '</td>';
                    html += '</tr>';
                }
                html += '</tbody>';
                html += '</table>';

                $('#tablaRevision').html(html);

                $('#example').DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        
                    ]
                });
                document.getElementById('BtnGuardarRevision').hidden = false;
            }
        };

        xml.open("POST", url, true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(json));
    } else {
        alertify.error("Ingresar al menos un criterio para generar el reporte");
    }
}

//Funcion para validar la revision de rondines 
function ValidarRevisionRondines() {
    var r = document.querySelectorAll('input[type="checkbox"]:checked');
    if (r.length != 0) {
        var IdR = document.getElementsByName('IdR');
        var rs = document.querySelectorAll('input[type="checkbox"]');
        var c = 0;
        for (var i = 0; i < rs.length; i++) {
            if (rs[i].checked) {
                GuardarRevisionRondin(IdR[i].value, sessionStorage.getItem('usuario'), rs[i].value);
                c++;
            }
        }
        if (c > 0) {
            document.getElementById('tablaRevision').innerHTML = "";
            document.getElementById('BtnGuardarRevision').hidden = true;
            document.getElementById('myModal1').style.display = 'block';
            document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
            document.getElementById('myModalLabel').innerHTML = "Correcto";
            document.getElementById('infoModal').innerHTML = "Revisión de rondines se guardo correctamente";
        } else {
            alertify.error("Error en el contador");
        }
    } else {
        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
        document.getElementById('myModalLabel').innerHTML = "Advertencia";
        document.getElementById('infoModal').innerHTML = "No hay ninguna casilla de revisión seleccionada";
    }
}

//Funcion para guardar la revison de rondines
function GuardarRevisionRondin(IdR, usuario, r) {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/ServiciosGenerales/GuardarRevisionRondin";
    var json = {
        IdR: IdR,
        Usuario: usuario,
        Revision: r
    }

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result != 0) {

            } else {
                alertify.error("Error al guardar la revision del rondin");
            }
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}