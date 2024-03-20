//var hostInit = "/IntranetMedc";
//var hostInit = "";

$(function () {

    $('#Fechainicio').datepicker(dataCalendar);
    $('#Fechafin').datepicker(dataCalendar);
    //cargarCampaniasOpera();
    //cargarUsuarios();
})

//Funcion para generar reporte con XMLHttpRequest
function cargarReporte02() {
    var fi = formatDate(document.getElementById('Fechainicio').value);
    var ff = formatDate(document.getElementById('Fechafin').value);
    //console.log(fi + "\n" + ff);
    var json = {
        Fechainicio: fi,
        Fechafin: ff
    }

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Reportes/CargarReporte02/";

    if ((fi != "31/12/1900") & (ff != "31/12/1900")) {
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                var html = '<table id="example" class="table table-bordered table-hover text-center" style="margin-top:15px">';
                html += '<thead class="">';
                html += '<tr>';
                html += '<th>';
                html += '# Empleado';
                html += '</th>';
                html += '<th>';
                html += 'Nombre 1';
                html += '</th>';
                html += '<th>';
                html += 'Nombre 2';
                html += '</th>';
                html += '<th>';
                html += 'Apellido Paterno';
                html += '</th>';
                html += '<th>';
                html += 'Apellido materno';
                html += '</th>';
                html += '<th>';
                html += 'Tipo de baja';
                html += '</th>';
                html += '<th>';
                html += 'Motivo de baja';
                html += '</th>';
                html += '<th>';
                html += 'Fecha de baja';
                html += '</th>';
                html += '</tr>';
                html += '</thead>';
                html += '<tbody class="tbody">';
                var i;
                for (i = 0; i < result.length; i++) {
                    html += '<tr>';
                    html += '<td>' + result[i].NumeroEmpleado + '</td>';
                    html += '<td>' + result[i].Nombre_1 + '</td>';
                    html += '<td>' + result[i].Nombre_2 + '</td>';
                    html += '<td>' + result[i].APaterno + '</td>';
                    html += '<td>' + result[i].AMaterno + '</td>';
                    html += '<td>' + result[i].TipoBaja + '</td>';
                    html += '<td>' + result[i].MotivoBaja + '</td>';
                    html += '<td>' + result[i].FBaja.substring(0,10) + '</td>';
                    html += '</tr>';
                }
                html += '</tbody>';
                html += '</table>';

                $('#tabla').html(html);

                $('#example').DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        'excel', 'print'
                    ]
                });
            }
        };

        xml.open("POST", url, true);
        xml.setRequestHeader('Content-Type', 'application/json');
        xml.send(JSON.stringify(json));
    } else {
        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
        document.getElementById('myModalLabel').innerHTML = "Advertencia";
        document.getElementById('infoModal').innerHTML = "Debe ingresar rango de fechas para generar el reporte";
    }
}

//Función para generar reporte de permanencia del empleado
function reportePermanencia() {
    var fi = formatDate(document.getElementById('Fechainicio').value);
    var ff = formatDate(document.getElementById('Fechafin').value);
    //console.log(fi + "\n" + ff);
    var json = {
        Fechainicio: fi,
        Fechafin: ff
    }

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Reportes/ReportePermanencia/";

    if ((fi != "31/12/1900") & (ff != "31/12/1900")) {
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                var html = '<table id="example" class="table table-bordered table-hover" style="margin-top:15px">';
                html += '<thead class="text-center">';
                html += '<tr>';
                html += '<th>';
                html += '# Empleado';
                html += '</th>';
                html += '<th>';
                html += 'Nombre 1';
                html += '</th>';
                html += '<th>';
                html += 'Nombre 2';
                html += '</th>';
                html += '<th>';
                html += 'Apellido Paterno';
                html += '</th>';
                html += '<th>';
                html += 'Apellido materno';
                html += '</th>';
                html += '<th>';
                html += 'Tipo de baja';
                html += '</th>';
                html += '<th>';
                html += 'Motivo de baja';
                html += '</th>';
                html += '<th>';
                html += 'Fecha de baja';
                html += '</th>';
                html += '<th>';
                html += 'Permanencia en la empresa (días)';
                html += '</th>';
                html += '</tr>';
                html += '</thead>';
                html += '<tbody class="tbody">';
                var i;
                for (i = 0; i < result.length; i++) {
                    html += '<tr>';
                    html += '<td>' + result[i].NumeroEmpleado + '</td>';
                    html += '<td>' + result[i].Nombre_1 + '</td>';
                    html += '<td>' + result[i].Nombre_2 + '</td>';
                    html += '<td>' + result[i].APaterno + '</td>';
                    html += '<td>' + result[i].AMaterno + '</td>';
                    html += '<td>' + result[i].TipoBaja + '</td>';
                    html += '<td>' + result[i].MotivoBaja + '</td>';
                    html += '<td>' + result[i].FBaja.substring(0, 10) + '</td>';
                    html += '<td>' + result[i].DiasT + '</td>';
                    html += '</tr>';
                }
                html += '</tbody>';
                html += '</table>';

                $('#tabla').html(html);

                $('#example').DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        'excel', 'print'
                    ]
                });
            }
        };

        xml.open("POST", url, true);
        xml.setRequestHeader('Content-Type', 'application/json');
        xml.send(JSON.stringify(json));
    } else {
        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
        document.getElementById('myModalLabel').innerHTML = "Advertencia";
        document.getElementById('infoModal').innerHTML = "Debe ingresar los criterios necesarios para generar el reporte";
    }
}

//Función para generar reporte de altas por fechas
function reporteAltas() {
    var fi = formatDate(document.getElementById('Fechainicio').value);
    var ff = formatDate(document.getElementById('Fechafin').value);
    //console.log(fi + "\n" + ff);
    var json = {
        Fechainicio: fi,
        Fechafin: ff
    }

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Reportes/ReporteAlta/";

    if ((fi != "31/12/1900") & (ff != "31/12/1900")) {
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                var html = '<table id="example" class="table table-bordered table-hover" style="margin-top:15px">';
                html += '<thead class="text-center">';
                html += '<tr>';
                html += '<th># Empleado</th>';
                html += '<th>Nombre completo</th>';
                html += '<th>Site</th>';
                html += '<th>Número de IMSS</th>';
                html += '<th>Puesto</th>';
                html += '<th>Dirección</th>';
                html += '<th>Departamento</th>';
                html += '<th>Recluto</th>';
                html += '<th>Sexo</th>';
                html += '<th>RFC</th>';
                html += '<th>Homoclave</th>';
                html += '<th>CURP</th>';
                html += '<th>Fecha de nacimiento</th>';
                html += '<th>Fecha de ingreso</th>';
                html += '<th>Turno</th>';
                html += '<th>Domicilio</th>';
                html += '<th>Teléfono fijo</th>';
                html += '<th>Teléfono movil</th>';
                html += '<th>Elaboro contrato</th>';
                html += '<th>Diagnostico</th>';
                html += '<th>Edad</th>';
                html += '<th>Primer empleo</th>';
                html += '<th>Experiencia en Call Center</th>';
                html += '<th>Estado civil</th>';
                html += '<th>Hijos</th>';
                html += '<th>Ultimo grado de estudios</th>';
                html += '<th>Especialidad</th>';
                html += '<th>Fuente de reclutamiento</th>';
                html += '<th>Captura plantilla</th>';
                html += '<th>Fecha del alta en IMSS</th>';
                html += '<th>Fecha de inserción</th>';
                html += '<th>Campaña</th>';
                html += '<th>Tipo de nomina</th>';
                html += '<th>CLABE</th>';
                html += '<th>Sueldo diario</th>';
                html += '<th>Banco</th>';
                html += '</tr>';
                html += '</thead>';
                html += '<tbody class="tbody">';
                var i;
                for (i = 0; i < result.length; i++) {
                    html += '<tr>';
                    html += '<td>' + result[i].NumeroEmpleado + '</td>';
                    html += '<td>' + result[i].Nombre_1 + '</td>';
                    html += '<td>' + result[i].Site + '</td>';
                    html += '<td>' + result[i].IMSS + '</td>';
                    html += '<td>' + result[i].Puesto + '</td>';
                    html += '<td>' + result[i].IDDireccion + '</td>';
                    html += '<td>' + result[i].IdDepartamento + '</td>';
                    html += '<td>' + result[i].Recluto + '</td>';
                    html += '<td>' + result[i].Genero + '</td>';
                    html += '<td>' + result[i].RFC + '</td>';
                    html += '<td>' + result[i].Homoclave + '</td>';
                    html += '<td>' + result[i].CURP + '</td>';
                    html += '<td>' + result[i].FNacimiento.substring(0, 10) + '</td>';
                    html += '<td>' + result[i].FIngreso.substring(0,10) + '</td>';
                    html += '<td>' + result[i].Turno + '</td>';
                    html += '<td>' + result[i].Direccion + '</td>';
                    html += '<td>' + result[i].TelefonoFijo + '</td>';
                    html += '<td>' + result[i].TelefonoMovil + '</td>';
                    html += '<td>' + result[i].ElaboroContrato + '</td>';
                    if (result[i].Diagnostico != "Seleccione") {
                        html += '<td>' + result[i].Diagnostico + '</td>';
                    } else { html += '<td></td>';}
                    html += '<td>' + result[i].Edad + '</td>';
                    html += '<td>' + result[i].PrimerEmpleo + '</td>';
                    html += '<td>' + result[i].ExperienciaEnCallCenter + '</td>';
                    html += '<td>' + result[i].EstadoCivil + '</td>';
                    html += '<td>' + result[i].Hijos + '</td>';
                    html += '<td>' + result[i].UltimoGradoEstudios + '</td>';
                    html += '<td>' + result[i].Especialidad + '</td>';
                    html += '<td>' + result[i].FuenteReclutamiento + '</td>';
                    html += '<td>' + result[i].CapturaPlantilla + '</td>';
                    if (formatDate(result[i].FAltaIMSS) != "31/12/1900") {
                        html += '<td>' + result[i].FAltaIMSS.substring(0,10) + '</td>';
                    } else {
                        html += '<td></td>';
                    }
                    html += '<td>' + result[i].FInsercion.substring(0, 10) + '</td>';
                    html += '<td>' + result[i].Campania + '</td>';
                    html += '<td>' + result[i].TipoNomina + '</td>';
                    html += '<td>' + result[i].CLABE + '</td>';
                    html += '<td>' + result[i].SueldoDiario + '</td>';
                    html += '<td>' + result[i].Banco + '</td>';
                    html += '</tr>';
                }
                html += '</tbody>';
                html += '</table>';

                $('#tabla').html(html);

                $('#example').DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        'excel', 'print'
                    ]
                });
            }
        };

        xml.open("POST", url, true);
        xml.setRequestHeader('Content-Type', 'application/json');
        xml.send(JSON.stringify(json));
    } else {
        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
        document.getElementById('myModalLabel').innerHTML = "Advertencia";
        document.getElementById('infoModal').innerHTML = "Debe ingresar los criterios necesarios para generar el reporte";
    }
}

//Función para generar reporte por usuario (altas, bajas)
function ReporteUsuario() {
    var fi = formatDate(document.getElementById('Fechainicio').value);
    var ff = formatDate(document.getElementById('Fechafin').value);
    var tipoRep = document.getElementById('tipoReporte').value;
    //var NumEmp = document.getElementById('usuarioReporte').value;
    //console.log(fi + "\n" + ff);
    var json = {
        Fechainicio: fi,
        Fechafin: ff,
        tipoReporte: tipoRep,
        numUsuario: document.getElementById('usuarioReporte').value
    }
    console.log(JSON.stringify(json));
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Reportes/ReporteUsuario/";

    if ((fi != "31/12/1900") & (ff != "31/12/1900") & (tipoRep != 0) /*& (NumEmp != 0)*/) {
        if (tipoRep == 2) {
            xml.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText);
                    var html = '<table id="example" class="table table-bordered table-hover text-center" style="margin-top:15px">';
                    html += '<thead class="">';
                    html += '<tr>';
                    html += '<th>';
                    html += '# Empleado';
                    html += '</th>';
                    html += '<th>';
                    html += 'Nombre 1';
                    html += '</th>';
                    html += '<th>';
                    html += 'Nombre 2';
                    html += '</th>';
                    html += '<th>';
                    html += 'Apellido Paterno';
                    html += '</th>';
                    html += '<th>';
                    html += 'Apellido materno';
                    html += '</th>';
                    html += '<th>';
                    html += 'Tipo de baja';
                    html += '</th>';
                    html += '<th>';
                    html += 'Motivo de baja';
                    html += '</th>';
                    html += '<th>';
                    html += 'Fecha de baja';
                    html += '</th>';
                    html += '<th>';
                    html += 'Autorizo la baja';
                    html += '</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody class="tbody">';
                    var i;
                    for (i = 0; i < result.length; i++) {
                        html += '<tr>';
                        html += '<td>' + result[i].NumeroEmpleado + '</td>';
                        html += '<td>' + result[i].Nombre_1 + '</td>';
                        html += '<td>' + result[i].Nombre_2 + '</td>';
                        html += '<td>' + result[i].APaterno + '</td>';
                        html += '<td>' + result[i].AMaterno + '</td>';
                        html += '<td>' + result[i].TipoBaja + '</td>';
                        html += '<td>' + result[i].MotivoBaja + '</td>';
                        html += '<td>' + result[i].FBaja.substring(0, 10) + '</td>';
                        html += '<td>' + result[i].AutorizoBaja + '</td>';
                        html += '</tr>';
                    }
                    html += '</tbody>';
                    html += '</table>';

                    $('#tabla').html(html);

                    $('#example').DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                            'excel', 'print'
                        ]
                    });
                }
            };
        } else {
            xml.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText);
                    var html = '<table id="example" class="table table-bordered table-hover text-center" style="margin-top:15px">';
                    html += '<thead class="">';
                    html += '<tr>';
                    html += '<th>';
                    html += '# Empleado';
                    html += '</th>';
                    html += '<th>';
                    html += 'Nombre 1';
                    html += '</th>';
                    html += '<th>';
                    html += 'Nombre 2';
                    html += '</th>';
                    html += '<th>';
                    html += 'Apellido Paterno';
                    html += '</th>';
                    html += '<th>';
                    html += 'Apellido materno';
                    html += '</th>';
                    html += '<th>';
                    html += 'Fecha de ingreso';
                    html += '</th>';
                    html += '<th>';
                    html += 'Usuario';
                    html += '</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody class="tbody">';
                    var i;
                    for (i = 0; i < result.length; i++) {
                        html += '<tr>';
                        html += '<td>' + result[i].NumeroEmpleado + '</td>';
                        html += '<td>' + result[i].Nombre_1 + '</td>';
                        html += '<td>' + result[i].Nombre_2 + '</td>';
                        html += '<td>' + result[i].APaterno + '</td>';
                        html += '<td>' + result[i].AMaterno + '</td>';
                        html += '<td>' + formatDate(result[i].FIngreso) + '</td>';
                        html += '<td>' + result[i].usuario + '</td>';
                        //html += '<td>' + formatDate(result[i].FBaja) + '</td>';
                        //html += '<td>' + result[i].AutorizoBaja + '</td>';
                        html += '</tr>';
                    }
                    html += '</tbody>';
                    html += '</table>';

                    $('#tabla').html(html);

                    $('#example').DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                            'excel', 'print'
                        ]
                    });
                }
            };
        }
        

        xml.open("POST", url, true);
        xml.setRequestHeader('Content-Type', 'application/json');
        xml.send(JSON.stringify(json));
    } else {
        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
        document.getElementById('myModalLabel').innerHTML = "Advertencia";
        document.getElementById('infoModal').innerHTML = "Debe ingresar los criterios necesarios para generar el reporte";
    }
}

//Función para generar Reporte por motivo, campaña y fechas
function ReporteMCF() {
    var fi = formatDate(document.getElementById('Fechainicio').value);
    var ff = formatDate(document.getElementById('Fechafin').value);
    var motivo = document.getElementById('MotivoBaja').value;
    var campania = document.getElementById('Operacion').value;
    var json = {
        Fechainicio: fi,
        Fechafin: ff,
        MotivoBaja: motivo,
        IdDepartamento: campania
    };

    xml = new XMLHttpRequest();
    url = hostInit + "/Reportes/ReporteMCF/";

    if ((fi != "31/12/1900") & (ff != "31/12/1900") & (motivo != 0) & (campania != 0)) {
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                var html = '<table id="example" class="table table-bordered table-hover" style="margin-top:15px">';
                html += '<thead class="text-center">';
                html += '<tr>';
                html += '<th>';
                html += '# Empleado';
                html += '</th>';
                html += '<th>';
                html += 'Nombre 1';
                html += '</th>';
                html += '<th>';
                html += 'Nombre 2';
                html += '</th>';
                html += '<th>';
                html += 'Apellido Paterno';
                html += '</th>';
                html += '<th>';
                html += 'Apellido materno';
                html += '</th>';
                html += '<th>';
                html += 'Tipo de la baja';
                html += '</th>';
                html += '<th>';
                html += 'Motivo de la baja';
                html += '</th>';
                html += '<th>';
                html += 'Fecha de la baja';
                html += '</th>';
                html += '<th>';
                html += 'Campaña';
                html += '</th>';
                html += '</tr>';
                html += '</thead>';
                html += '<tbody class="tbody">';
                var i;
                for (i = 0; i < result.length; i++) {
                    html += '<tr>';
                    html += '<td>' + result[i].NumeroEmpleado + '</td>';
                    html += '<td>' + result[i].Nombre_1 + '</td>';
                    html += '<td>' + result[i].Nombre_2 + '</td>';
                    html += '<td>' + result[i].APaterno + '</td>';
                    html += '<td>' + result[i].AMaterno + '</td>';
                    html += '<td>' + result[i].TipoBaja + '</td>';
                    html += '<td>' + result[i].MotivoBaja + '</td>';
                    html += '<td>' + result[i].FBaja.substring(0, 10) + '</td>';
                    html += '<td>' + result[i].Campania + '</td>';
                    html += '</tr>';
                }
                html += '</tbody>';
                html += '</table>';

                $('#tabla').html(html);

                $('#example').DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        'excel', 'print'
                    ]
                });

            }
        };
        xml.open("POST", url, true);
        xml.setRequestHeader('Content-Type', 'application/json');
        xml.send(JSON.stringify(json));
    } else {
        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
        document.getElementById('myModalLabel').innerHTML = "Advertencia";
        document.getElementById('infoModal').innerHTML = "Debe ingresar los criterios necesarios para generar el reporte";
    }
     
}

//Función para generar Reporte por campaña y por cargo 
function ReporteCampañaCargo() {
    var fi = formatDate(document.getElementById('Fechainicio').value);
    var ff = formatDate(document.getElementById('Fechafin').value);
    var tipoRep = document.getElementById('tipoReporte').value;
    var campania = document.getElementById('Operacion').value;
    var puesto = document.getElementById('Puesto').value;
    var json = {
        Fechainicio: fi,
        Fechafin: ff,
        tipoReporte: tipoRep,
        IdDepartamento: campania,
        puesto: puesto
    }

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Reportes/ReporteCampañiaCargo/";

    if ((fi != "31/12/1900") & (ff != "31/12/1900") & (tipoRep != 0) & (campania != 0) & (puesto != 0)) {
        if (tipoRep == 2) {
            xml.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText);
                    var html = '<table id="example" class="table table-bordered table-hover text-center" style="margin-top:15px">';
                    html += '<thead class="">';
                    html += '<tr>';
                    html += '<th>';
                    html += '# Empleado';
                    html += '</th>';
                    html += '<th>';
                    html += 'Nombre 1';
                    html += '</th>';
                    html += '<th>';
                    html += 'Nombre 2';
                    html += '</th>';
                    html += '<th>';
                    html += 'Apellido Paterno';
                    html += '</th>';
                    html += '<th>';
                    html += 'Apellido materno';
                    html += '</th>';
                    html += '<th>';
                    html += 'Tipo de baja';
                    html += '</th>';
                    html += '<th>';
                    html += 'Motivo de baja';
                    html += '</th>';
                    html += '<th>';
                    html += 'Fecha de baja';
                    html += '</th>';
                    html += '<th>';
                    html += 'Área/Departamento';
                    html += '</th>';
                    html += '<th>';
                    html += 'Puesto';
                    html += '</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody class="tbody">';
                    var i;
                    for (i = 0; i < result.length; i++) {
                        html += '<tr>';
                        html += '<td>' + result[i].NumeroEmpleado + '</td>';
                        html += '<td>' + result[i].Nombre_1 + '</td>';
                        html += '<td>' + result[i].Nombre_2 + '</td>';
                        html += '<td>' + result[i].APaterno + '</td>';
                        html += '<td>' + result[i].AMaterno + '</td>';
                        html += '<td>' + result[i].TipoBaja + '</td>';
                        html += '<td>' + result[i].MotivoBaja + '</td>';
                        html += '<td>' + result[i].FBaja.substring(0, 10) + '</td>';
                        html += '<td>' + result[i].Descripcion + '</td>';
                        html += '<td>' + result[i].Puesto + '</td>';
                        html += '</tr>';
                    }
                    html += '</tbody>';
                    html += '</table>';

                    $('#tabla').html(html);

                    $('#example').DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                            'excel', 'print'
                        ]
                    });
                }
            };
        }

        else {
            xml.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText);
                    var html = '<table id="example" class="table table-bordered table-hover text-center" style="margin-top:15px">';
                    html += '<thead class="">';
                    html += '<tr>';
                    html += '<th>';
                    html += '# Empleado';
                    html += '</th>';
                    html += '<th>';
                    html += 'Nombre 1';
                    html += '</th>';
                    html += '<th>';
                    html += 'Nombre 2';
                    html += '</th>';
                    html += '<th>';
                    html += 'Apellido Paterno';
                    html += '</th>';
                    html += '<th>';
                    html += 'Apellido materno';
                    html += '</th>';
                    html += '<th>';
                    html += 'Fecha de ingreso';
                    html += '</th>';
                    html += '<th>';
                    html += 'Área/Departamento';
                    html += '</th>';
                    html += '<th>';
                    html += 'Puesto';
                    html += '</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody class="tbody">';
                    var i;
                    for (i = 0; i < result.length; i++) {
                        html += '<tr>';
                        html += '<td>' + result[i].NumeroEmpleado + '</td>';
                        html += '<td>' + result[i].Nombre_1 + '</td>';
                        html += '<td>' + result[i].Nombre_2 + '</td>';
                        html += '<td>' + result[i].APaterno + '</td>';
                        html += '<td>' + result[i].AMaterno + '</td>';
                        html += '<td>' + formatDate(result[i].FIngreso) + '</td>';
                        html += '<td>' + result[i].Descripcion + '</td>';
                        html += '<td>' + result[i].Puesto + '</td>';
                        html += '</tr>';
                    }
                    html += '</tbody>';
                    html += '</table>';

                    $('#tabla').html(html);

                    $('#example').DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                            'excel', 'print'
                        ]
                    });
                }
            };
        }


        xml.open("POST", url, true);
        xml.setRequestHeader('Content-Type', 'application/json');
        xml.send(JSON.stringify(json));
    } else {
        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
        document.getElementById('myModalLabel').innerHTML = "Advertencia";
        document.getElementById('infoModal').innerHTML = "Debe ingresar los criterios necesarios para generar el reporte";
    }
}

//Funcion para documento de contratos
function Contrato() {
    var fi = formatDate(document.getElementById('Fechainicio').value);
    var ff = formatDate(document.getElementById('Fechafin').value);
    var numEmp = document.getElementById('NumEmpleado').value;
    var apat = document.getElementById('APaterno').value;
    var amat = document.getElementById('AMaterno').value;
    var nom1 = document.getElementById('Nombre_1').value;
    var nom2 = document.getElementById('Nombre_2').value;
    
    var json = {
        Fechainicio: fi,
        Fechafin: ff,
        numUsuario: numEmp,
        APaterno: apat,
        AMaterno: amat,
        Nombre_1: nom1,
        Nombre_2: nom2
    };

    xml = new XMLHttpRequest();
    url = hostInit + "/Reportes/Contratos/";

    //if (((fi != "31/12/1900") & (ff != "31/12/1900")) || (numEmp.value != null) || (apat.value != null) || (amat.value != null) || (nom1.value != null) || (nom2.value != null)) {
    //    console.log(fi + '\n' + ff + '\n' + numEmp + '\n' + apat + "\n" + amat + "\n" + nom1 + "\n" + nom2);
    if ((fi !== "31/12/1900") & (ff !== "31/12/1900")) {
        console.log(fi + '\n' + ff + '\n' + numEmp + '\n' + apat + "\n" + amat + "\n" + nom1 + "\n" + nom2);
            Con(json);
    } else if ((numEmp !== "")) {
        console.log(fi + '\n' + ff + '\n' + numEmp + '\n' + apat + "\n" + amat + "\n" + nom1 + "\n" + nom2);
            Con(json);
    } else if ((apat !== "")) {
        console.log(fi + '\n' + ff + '\n' + numEmp + '\n' + apat + "\n" + amat + "\n" + nom1 + "\n" + nom2);
            Con(json);
    } else if ((amat !== "")) {
        console.log(fi + '\n' + ff + '\n' + numEmp + '\n' + apat + "\n" + amat + "\n" + nom1 + "\n" + nom2);
            Con(json);
    } else if ((nom1 !== "")) {
        console.log(fi + '\n' + ff + '\n' + numEmp + '\n' + apat + "\n" + amat + "\n" + nom1 + "\n" + nom2);
            Con(json);
    } else if ((nom2 !== "")) {
        console.log(fi + '\n' + ff + '\n' + numEmp + '\n' + apat + "\n" + amat + "\n" + nom1 + "\n" + nom2);
            Con(json);
        } else {
            document.getElementById('myModal1').style.display = 'block';
            document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
            document.getElementById('myModalLabel').innerHTML = "Advertencia";
            document.getElementById('infoModal').innerHTML = "Debe escoger al menos un filtro para generar la busqueda";
        }
    //} else {
    //    document.getElementById('myModal1').style.display = 'block';
    //    document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
    //    document.getElementById('myModalLabel').innerHTML = "Advertencia";
    //    document.getElementById('infoModal').innerHTML = "Debe escoger al menos un filtro para generar la busqueda";
    //}
    
}
//Funcion para crear documento de contrato
function Con(json) {
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var html = '<table id="example" class="table table-bordered table-hover" style="margin-top:15px">';
            html += '<thead class="text-center">';
            html += '<tr>';
            html += '<th>';
            html += 'NombreCompleto';
            html += '</th>';
            html += '<th>';
            html += 'Dirección';
            html += '</th>';
            html += '<th>';
            html += 'Fecha Ingreso';
            html += '</th>';
            html += '<th>';
            html += 'RFC';
            html += '</th>';
            html += '<th>';
            html += 'Salario Diario';
            html += '</th>';
            html += '<th>';
            html += 'Puesto';
            html += '</th>';
            html += '<th>';
            html += 'Sexo';
            html += '</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody class="tbody">';
            var i;
            for (i = 0; i < result.length; i++) {
                html += '<tr>';
                html += '<td>' + result[i].Nombre_1 + '</td>';
                html += '<td>' + result[i].Direccion + '</td>';
                html += '<td>' + result[i].FIngreso.substring(0, 10) + '</td>';
                html += '<td>' + result[i].RFC + '</td>';
                html += '<td>' + result[i].SueldoDiario + '</td>';
                html += '<td>' + result[i].Puesto + '</td>';
                html += '<td>' + result[i].Genero + '</td>';
                html += '</tr>';
            }
            html += '</tbody>';
            html += '</table>';

            $('#tabla').html(html);

            $('#example').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'excel'
                ]
            });

        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(json));
}

//Función para validar campos de reporte de horarios
function ReporteHorarios() {
    if (document.querySelector('input[id="todos"]:checked')) {
        GenerarReporteHorarios();
    } else if (document.getElementById('NumEmpleado').value !== "") {
        GenerarReporteHorarios();
    } else if ((document.getElementById('Departamento').value != 0)) {
        GenerarReporteHorarios();
    } else {
        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
        document.getElementById('myModalLabel').innerHTML = "Advertencia";
        document.getElementById('infoModal').innerHTML = "Elija al menos un filtro para generar reporte";
    }
}

//Función para generar reporte de los horarios
function GenerarReporteHorarios() {
    var estatus;
    if ((document.querySelector('input[id="todos"]:checked'))) {
        estatus = document.querySelector('input[id="todos"]:checked').value;
    } else {
        estatus = 0;
    }
    var json = {
        NumeroEmpleado: document.getElementById('NumEmpleado').value,
        IdDepartamento: document.getElementById('Departamento').value,
        Estatus: estatus
    };

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Reportes/GenerarReportesHorarios/";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var html = '<table id="example" class="table table-bordered table-hover" style="margin-top:15px">';
            html += '<thead class="text-center">';
            html += '<tr>';
            html += '<th>';
            html += '# Empleado';
            html += '</th>';
            html += '<th>';
            html += 'Nombre Completo';
            html += '</th>';
            html += '<th>';
            html += 'Puesto';
            html += '</th>';
            html += '<th>';
            html += 'Días que labora';
            html += '</th>';
            html += '<th>';
            html += 'Turno';
            html += '</th>';
            html += '<th>';
            html += 'Entrada';
            html += '</th>';
            html += '<th>';
            html += 'Salida';
            html += '</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody class="tbody">';
            var i;
            for (i = 0; i < result.length; i++) {
                //if (result[i].value == null || result[i].vale === "") { result.[i] = "Descanso"; }
                html += '<tr>';
                html += '<td>' + result[i].NumeroEmpleado + '</td>';
                html += '<td>' + result[i].Nombre_1 + '</td>';
                html += '<td>' + result[i].Puesto + '</td>';
                html += '<td>' + result[i].Dias_labora + '</td>';
                html += '<td>' + result[i].TurnoH + '</td>';
                html += '<td>' + result[i].Entrada + '</td>';
                html += '<td>' + result[i].Salida + '</td>';
                html += '</tr>';
            }
            html += '</tbody>';
            html += '</table>';

            $('#tabla').html(html);

            $('#example').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'excel', 'print'
                ]
            });
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(json));
}

//function formatoHora(hora) {
//    var des = hora;
//    if (des === '00:00') {
//        des = 'DESCANSO'
//    }
//    return des;
//}

//Calendario
var currentDate = new Date();
var dataCalendar = {
    closeText: 'Cerrar',
    prevText: '< Ant',
    nextText: 'Sig >',
    currentText: 'Hoy',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    weekHeader: 'Sm',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: '',
    dateFormat: 'yy/mm/dd',
    changeMonth: true,
    changeYear: true,
    yearRange: "1900:2100",
    hideIfNoPrevNext: false,
    defaultDate: currentDate.getFullYear() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate(),
};

//Funcion para cargar el select con los usuarios que pueden realizar altas y bajas
function cargarUsuarios() {
    var xmlhttp = new XMLHttpRequest();
    var url = hostInit + "/Reportes/carcarUsuarios";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            var out = "<option value='0'>Seleccione</option>";
            var i;
            for (i = 0; i < myArr.length; i++) {
                out += '<option value="' + myArr[i].Usuario + '">' + myArr[i].Nombre + ' ' + myArr[i].Ape_pat + ' ' + myArr[i].Ape_mat + '</option>';
            }
            document.getElementById("usuarioReporte").innerHTML = out;
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

//Funcion para cargar el select de las campañas de operacion
function cargarCampaniasOpera() {
    var xmlhttp = new XMLHttpRequest();
    var url = hostInit + "/Reportes/CargarOperacion";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            var out = "<option value='0'>Seleccione</option>";
            var i;
            for (i = 0; i < myArr.length; i++) {
                out += '<option value="' + myArr[i].IDDepartamento + '">' + myArr[i].Descripcion + '</option>';
            }
            document.getElementById("Operacion").innerHTML = out;
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


//Funcion crear el reporte de Bitacora de rondines
function GenerarReporteRondines() {
    if (
        document.getElementById('numEmp').value != "" || document.getElementById('Fechainicio').value != ""
        || document.getElementById('Fechafin').value != "" || document.getElementById('Departamento').value != 0
    ) {
        var xml = new XMLHttpRequest();
        var url = hostInit + "/Reportes/GenerarReporteRondin";
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
                    //if (result[i].value == null || result[i].vale === "") { result.[i] = "Descanso"; }
                    html += '<tr>';
                    html += '<td>' + result[i].Usuario + '</td>';
                    html += '<td>' + result[i].FechaInsercion.substring(0, 10) + '</td>';
                    html += '<td>' + result[i].FechaIncidente + '</td>';
                    html += '<td>' + result[i].MotivoCaptura.substring(0, 10) + '</td>';
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

                $('#tabla').html(html);

                $('#example').DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        'excel', 'print'
                    ]
                });
            }
        };

        xml.open("POST", url, true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(json));
    } else {
        alertify.error("Ingresar al menos un criterio para generar el reporte");
    }
}

//Funcion para limpiar campos del reporte de Rondines
function CancelarReporteRondin() {
    document.getElementById('numEmp').value = "";
    document.getElementById('Fechainicio').value = "";
    document.getElementById('Fechafin').value = "";
    document.getElementById('Departamento').value = 0;
}

//Funcion para sacar el reporte de las encuestas de salida de los trabajadores
function ReporteEncuestaSalida() {
    var fi = formatDate(document.getElementById('Fechainicio').value);
    var ff = formatDate(document.getElementById('Fechafin').value);

    var json = {
        Fechainicio: fi,
        Fechafin: ff
    }

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Reportes/CargarReporteEncuestaSalida/";
    if ((fi != "31/12/1900") & (ff != "31/12/1900")) {
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                var html = '<table id="example" class="table table-bordered table-hover" style="margin-top:15px">';
                html += '<thead class="text-center">';
                html += '<tr>';
                html += '<th>No. Empleado</th>';
                html += '<th>Nombre completo</th>';
                html += '<th>Motivo de Baja</th>';
                html += '<th>Otro motivo de baja</th>';
                html += '<th>¿Recibió inducción a la empresa?</th>';
                html += '<th>¿Recibió capacitación de acuerdo a su puesto?</th>';
                html += '<th>¿Hubo algún incumplimiento por parte de la empresa?</th>';
                html += '<th>¿Cuál?</th>';
                html += '<th>¿Contaste con la información suficiente sobre los resultados de la empresa?</th>';
                html += '<th>¿La empresa, escucho tus problemas, ideas y sugerencias?</th>';
                html += '<th>¿La empresa respondió a tus problemas, ideas y sugerencias?</th>';
                html += '<th>¿Consideras que la empresa te comunicó sus planes y objetivos a tiempo?</th>';
                html += '<th>¿Contaste con un plan de trabajo?</th>';
                html += '<th>¿Contaste con una retroalimentación de tu supervisor?</th>';
                html += '<th>¿Eran seguras las condiciones físicas de tú área de trabajo?</th>';
                html += '<th>¿Eran adecuadas las  condiciones ambientales del área de trabajo?</th>';
                html += '<th>¿Consideras que los sueldos de MED Marketing son competitivos?</th>';
                html += '<th>De ser posible ¿volverías a trabajar con nosotros?</th>';
                html += '<th>Mencione los tres aspectos de MED Marketing que más te gustaron:</th>';
                html += '<th>Mencione los tres aspectos de MED Marketing que menos le gustaron:</th>';
                html += '<th>Condiciones fisicas de los baños</th>';
                html += '<th>Condiciones de las herramientas de trabajo</th>';
                html += '<th>Limpieza de lugar de trabajo</th>';
                html += '<th>Limpieza del comedor</th>';
                html += '<th>Horarios de comida</th>';
                html += '<th>Te proporciono el equipo necesario para trabajar</th>';
                html += '<th>Te proporciono los datos e información que necesitabas para hacer tú trabajo</th>';
                html += '<th>Te apoyo para desarrollar tú trabajo</th>';
                html += '<th>Me reconoció y estimulo mis logros</th>';
                html += '<th>Fomenta el trabajo en equipo</th>';
                html += '<th>Evaluó mi desempeño conforme al programa establecido</th>';
                html += '<th>Retroalimento a tiempo mi desempeño</th>';
                html += '<th>Me trato con dignidad y respeto</th>';
                html += '<th>Tomo decisiones justas y equitativas para todo, sin favoritismos</th>';
                html += '<th>Escuchó mis ideas y sugerencias</th>';
                html += '<th>¿Fuiste promovido durante el tiempo en que trabajaste para MED Marketing?</th>';
                html += '<th>Razón</th>';
                html += '<th>Comentarios del entrevistado</th>';
                html += '</tr>';
                html += '</thead>';
                html += '<tbody class="tbody">';
                var i;
                for (i = 0; i < result.length; i++) {
                    html += '<tr>';
                    if (result[i].UltimoDiaLaborado != "") {
                        html += '<td>' + result[i].NoEmpleado + '</td>'
                    } else {
                        html += '<td>' + '<input type="button" onclick="MostrarModalEntrevistador(' + result[i].IdEntrevista + ')" class="btn btn-info" value =' + result[i].NoEmpleado +'>' + '</td>';
                    }
                    html += '<td>' + result[i].NombreCompleto + '</td>';
                    html += '<td>' + result[i].MotivoBaja + '</td>';
                    html += '<td>' + result[i].OtroMotivo + '</td>';
                    html += '<td>' + result[i].Pregunta1 + '</td>';
                    html += '<td>' + result[i].Pregunta2 + '</td>';
                    html += '<td>' + result[i].Pregunta3 + '</td>';
                    html += '<td>' + result[i].Pregunta4 + '</td>';
                    html += '<td>' + result[i].Pregunta5 + '</td>';
                    html += '<td>' + result[i].Pregunta6 + '</td>';
                    html += '<td>' + result[i].Pregunta7 + '</td>';
                    html += '<td>' + result[i].Pregunta8 + '</td>';
                    html += '<td>' + result[i].Pregunta9 + '</td>';
                    html += '<td>' + result[i].Pregunta10 + '</td>';
                    html += '<td>' + result[i].Pregunta11 + '</td>';
                    html += '<td>' + result[i].Pregunta12 + '</td>';
                    html += '<td>' + result[i].Pregunta13 + '</td>';
                    html += '<td>' + result[i].Pregunta14 + '</td>';
                    html += '<td>' + result[i].Pregunta15 + '</td>';
                    html += '<td>' + result[i].Pregunta16 + '</td>';
                    html += '<td>' + result[i].Pregunta17 + '</td>';
                    html += '<td>' + result[i].Pregunta18 + '</td>';
                    html += '<td>' + result[i].Pregunta19 + '</td>';
                    html += '<td>' + result[i].Pregunta20 + '</td>';
                    html += '<td>' + result[i].Pregunta21 + '</td>';
                    html += '<td>' + result[i].Pregunta22 + '</td>';
                    html += '<td>' + result[i].Pregunta23 + '</td>';
                    html += '<td>' + result[i].Pregunta24 + '</td>';
                    html += '<td>' + result[i].Pregunta25 + '</td>';
                    html += '<td>' + result[i].Pregunta26 + '</td>';
                    html += '<td>' + result[i].Pregunta27 + '</td>';
                    html += '<td>' + result[i].Pregunta28 + '</td>';
                    html += '<td>' + result[i].Pregunta29 + '</td>';
                    html += '<td>' + result[i].Pregunta30 + '</td>';
                    html += '<td>' + result[i].Pregunta31 + '</td>';
                    html += '<td>' + result[i].Pregunta32 + '</td>';
                    html += '<td>' + result[i].Pregunta33 + '</td>';
                    html += '<td>' + result[i].Pregunta34 + '</td>';
                    html += '</tr>';
                }
                html += '</tbody>';
                html += '</table>';

                $('#tabla').html(html);

                $('#example').DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        'excel', 'print'
                    ]
                });
            }
        };

        xml.open("POST", url, true);
        xml.setRequestHeader('Content-Type', 'application/json');
        xml.send(JSON.stringify(json));
    }
        else {
            document.getElementById('myModal1').style.display = 'block';
            document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
            document.getElementById('myModalLabel').innerHTML = "Advertencia";
            document.getElementById('infoModal').innerHTML = "Debe ingresar los criterios necesarios para generar el reporte";
        }
}

function MostrarModalEntrevistador(idEntrevista) {
    LimpiarDatosEntrevistador();
    document.getElementById("IdEntrevista").value = idEntrevista;
    $("#modalEntrevistador").modal();
}

function GuardarEntrevistador() {
    
    if (document.getElementById("UltimoDiaLaborado").value != "") {
        var noEmpleado = sessionStorage.getItem('usuario');
        var xml = new XMLHttpRequest();
        var url = hostInit + "/Reportes/GuardarDatosEntrevistador";
        var json = {
            IdEntrevista: document.getElementById("IdEntrevista").value,
            NumEmpleado: noEmpleado,
            UltimoDiaLaborado: document.getElementById('UltimoDiaLaborado').value,
            Comentarios: document.getElementById('ComentariosEntrevistador').value
        };
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                var result = JSON.parse(this.responseText);
                if (result == 1) {
                    $("#modalEntrevistador").modal("hide");
                    alertify.success('¡Exitoso, se actualizo el registro correctamente!');
                    setTimeout(function () {
                        ReporteEncuestaSalida();
                    }, 1000);
                }
                else {
                    $("#modalEntrevistador").modal("hide");
                    alertify.error("¡Error, no se pudo actualizar el registro!");
                }
            }
        };
        xml.open("POST", url, true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(json));

    } else {
        alertify.error("¡Error, debe llenar la fecha del último día laborado!");
    }
}

function LimpiarDatosEntrevistador() {
    document.getElementById("UltimoDiaLaborado").value = "";
    document.getElementById("ComentariosEntrevistador").value = "";
    document.getElementById("IdEntrevista").value = "";
}