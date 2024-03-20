//var hostInit = "/IntranetMedc";
//var hostInit = "";


//Función para buscar empleado para el horario
function buscarEmpleadoControlPlantillaOpe() {
    var numEmp = document.getElementById('numEmp').value;
    var json = { NumeroEmpleado: numEmp }

    if (numEmp != "") {

        $.ajax({
            url: hostInit + "/Empleados/BuscarEmpleado/",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(json),
            success: function (result) {
                if (result.id_Empleado == 0) {
                    document.getElementById('myModal1').style.display = 'block';
                    document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                    document.getElementById('myModalLabel').innerHTML = "Advertencia";
                    document.getElementById('infoModal').innerHTML = "Numero de empleado no existe en la base";
                    document.getElementById('numEmp').value = "";
                    //alert("Numero de empleado no existe en la base");
                } else if (result.Horario == 2) {
                    document.getElementById('myModal1').style.display = 'block';
                    document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                    document.getElementById('myModalLabel').innerHTML = "Advertencia";
                    document.getElementById('infoModal').innerHTML = "Empleado ya cuenta con horario definido";
                } else {
                    document.getElementById('datos').hidden = false;
                    document.getElementById('id_Empleado').value = result.id_Empleado;
                    document.getElementById('Puesto').value = result.Puesto;
                    document.getElementById('APaterno').value = result.APaterno;
                    document.getElementById('AMaterno').value = result.AMaterno;
                    document.getElementById('Nombre_1').value = result.Nombre_1;
                    document.getElementById('Nombre_2').value = result.Nombre_2;
                    document.getElementById('Departamento').value = result.IdDepartamento;
                    document.getElementById('numEmp').value = "";
                }
            },
        });
    } else {
        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
        document.getElementById('myModalLabel').innerHTML = "Advertencia";
        document.getElementById('infoModal').innerHTML = "Debe ingresar el número de empleado para realizar la busqueda";
        //alert("Debe ingresar un RFC de algún empleado para realizar la busqueda");
        document.getElementById('numEmp').focus();
    }
}

//Funcion que carga el select de las campañas
function cargarCampanias() {
    $.ajax({
        url: hostInit + "/Operacion/CargarCampanias",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            var option = '<option value="0">Seleccione</option>';
            $.each(result, function (key, item) {
                option += '<option value="' + item.Id_Campania + '">' + item.Campania + '</option>';
            });
            document.getElementById('Campania').innerHTML = option;
            document.getElementById('CampaniaAsignar').innerHTML = option;
        }
    });
}

//Funcion que carga los supervisores dependiendo la camapaña
function CargarSupervisoresCamapana() {

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Operacion/CargarSupervisoresCamapana/";

    var json = {
        Id_Campania: document.getElementById('Campania').value
    }

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            if (myArr != "") {
                var out = "<option value='0'>Seleccione</option>";
                var i;
                for (i = 0; i < myArr.length; i++) {
                    out += '<option value="' + myArr[i].id_Empleado + '">' + myArr[i].Nombre_1 + '</option>';
                }
                document.getElementById("Supervisor").innerHTML = out;
            } else {
                alertify.error("Error al cargar los supervisores de campaña");
            }
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(json));
}

//Funcion que carga los RVTs dependiendo del supervisor seleccionado
function CargarRVTs() {
    var json = {
        id_Empleado: document.getElementById('Supervisor').value
    }

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Operacion/CargarRvts/";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            if (myArr != "") {
                document.getElementById('Coordinador').innerHTML = '<strong>COORDINADOR:</strong> '+ myArr[0].Nombre_2;
                document.getElementById('Gerente').innerHTML = '<strong>GERENTE:</strong> '+ myArr[0].AMaterno;
                document.getElementById('Director').innerHTML = '<strong>DIRECTOR:</strong> '+ myArr[0].CURP;
                var out = '<table id="tblAsignados" class="table table-hover table-striped text-center" style="margin-left:10px; width:45%;">';
                out += '<thead>';
                out += '<tr style="color:steelblue; font-weight:700">';
                out += '<td>';
                out += 'NO. DE EMPLEADO';
                out += '</td>';
                out += '<td>';
                out += 'NOMBRE DEL RVT';
                out += '</td>';
                out += '<td>';
                out += 'CAMBIO';
                out += '</td>';
                out += '</tr>';
                out += '</thead>';
                out += '<tbody id="cuerpo_Tabla">';
                var i;
                for (i = 0; i < myArr.length; i++) {
                    out += '<tr>';
                    out += '<td>';
                    out += '<input id="IdJerarquia" hidden value="' + myArr[i].IdDepartamento+'" />';
                    out += '<label id="NoEmp">' + myArr[i].NumeroEmpleado + '</label>';
                    out += '</td>';
                    out += '<td>';
                    out += '<label id="rvt">' + myArr[i].Nombre_1 +'</label>';
                    out += '</td>';
                    out += '<td>';
                    out += '<input type="checkbox" value="' + myArr[i].id_Empleado + '" id="Cambio" onchange="SeleccionarRVT()"/>';
                    out += '</td>';
                    out += '</tr>';
                }
                out += '</tbody>'
                out += '</table>';
                document.getElementById("RVTs").innerHTML = out;
                
                $('#tblAsignados').DataTable();
            } else {
                alertify.error("Error al cargar los RVTs de campaña");
            }
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(json));
}

//Funcion que carga los supervisores dependiendo la camapaña (Destino)
function CargarSupervisoresCamapanaDestino() {

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Operacion/CargarSupervisoresCamapana/";

    var json = {
        Id_Campania: document.getElementById('CampaniaAsignar').value
    }

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            if (myArr != "") {
                var out = "<option value='0'>Seleccione</option>";
                var i;
                for (i = 0; i < myArr.length; i++) {
                    out += '<option value="' + myArr[i].id_Empleado + '">' + myArr[i].Nombre_1 + '</option>';
                }
                document.getElementById("SupervisorAsignar").innerHTML = out;
            } else {
                alertify.error("Error al cargar los supervisores de campaña");
            }
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(json));
}

//Funcion que carga los RVTs dependiendo del supervisor seleccionado
function CargarCGD() {
    var json = {
        id_Empleado: document.getElementById('SupervisorAsignar').value
    }

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Operacion/CargarRvts/";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            if (myArr != "") {
                document.getElementById('CoordinadorDestino').innerHTML = '<strong>COORDINADOR:</strong> ' + myArr[0].Nombre_2;
                document.getElementById("IDCoordinador").value = myArr[0].CapturaPlantilla ; //Asigna el ID del Corrdinador
                document.getElementById('GerenteDestino').innerHTML = '<strong>GERENTE:</strong> ' + myArr[0].AMaterno;
                document.getElementById("IDGerente").value = myArr[0].ElaboroContrato; // Asigna el ID del gerente
                document.getElementById('DirectorDestino').innerHTML = '<strong>DIRECTOR:</strong> ' + myArr[0].CURP;
                document.getElementById("IDDirector").value = myArr[0].EstadoCivil; //Asigna el ID del Director
            } else {
                alertify.error("Error al cargar los RVTs de campaña");
            }
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(json));
}

//Función para mandar los RVTs asignados
function AsignarRVTs() {
    let rvtId = document.querySelectorAll('input[id="Cambio"]');
    let rvtNom = document.querySelectorAll('label[id="rvt"]');
    let num = document.querySelectorAll('label[id="NoEmp"]');
    var html = "";
    for (var i = 0; i < rvtId.length; i++) {
        if (rvtId[i].checked) {
            html += '<tr><td style="width:30px"><label id="NumAsignado">' + num[i].textContent + '</label></td><td><label id="rvtAsignado">' + rvtNom[i].textContent + '</label><button type="button" value="' + rvtId[i].value + '" class="btn" style="color:red; margin-left:5px; width:10px" onclick="BorrarAsignacion(this.value)"><i class="fas fa-times"></i></button></td></tr>';
        }
    }
    document.getElementById('RVTsAsignados').innerHTML = html;
    document.getElementById("Cambiarcampana").hidden = false;
}

//Funcion para eliminar RVT asignado en el cambio de campaña
function BorrarAsignacion(valor) {
    //alertify.success(valor);
    let lbl = document.querySelectorAll('label[id="rvtAsignado"]');
    let rvtId = document.querySelectorAll('input[id="Cambio"]');
    let rvtNom = document.querySelectorAll('label[id="rvt"]');
    let num = document.querySelectorAll('label[id="NoEmp"]');
    let numA = document.querySelectorAll('label[id="NumAsignado"]');

    for (var i = 0; i < rvtId.length; i++) {
        if (rvtId[i].value == valor) {
            rvtId[i].checked = false;
            rvtNom[i].style = "text-decoration:none";
            num[i].style = "text-decoration:none";
            if (lbl[i].nextElementSibling.click) {
                lbl[i].style = "text-decoration:line-through";
                numA[i].style = "text-decoration:line-through";
            }
        }
    }

    var c = document.querySelectorAll('input[id="Cambio"]:checked');

    if (c.length <= 0) {

        document.getElementById('btnAsignar1').disabled = true;
    } else {
        document.getElementById('btnAsignar1').disabled = false;
    }
}

//Funcion para eliminar RVT asignado en el cambio de campaña
function BorrarAsignacionCampana(valor) {
    //alertify.success(valor);
    let lbl = document.querySelectorAll('label[id="rvtAsignadoC"]');
    let rvtId = document.querySelectorAll('input[id="Asignar"]');
    let rvtNom = document.querySelectorAll('label[id="rvtSC"]');
    let num = document.querySelectorAll('label[id="NoEmpSC"]');
    let numA = document.querySelectorAll('label[id="NumAsignadoC"]');

    for (var i = 0; i < rvtId.length; i++) {
        if (rvtId[i].value == valor) {
            rvtId[i].checked = false;
            rvtNom[i].style = "text-decoration:none";
            num[i].style = "text-decoration:none";
            if (lbl[i].nextElementSibling.click) {
                lbl[i].style = "text-decoration:line-through";
                numA[i].style = "text-decoration:line-through";
            }
        }
    }
}

//Funcion para llenar la tabla con los RVTs no asignados
function CargarRVTsSinAsignar() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Operacion/CargarRVTsSinAsignar";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            if (myArr != "") {
                var out = '<table id="tablaPrueba" class="table table-hover table-striped text-center" style="margin-left:10px; width:43%;">';
                out += '<thead>';
                out += '<tr style="color:steelblue; font-weight:700">';
                out += '<td>';
                out += 'No. DE EMPLEADO';
                out += '</td>';
                out += '<td>';
                out += 'NOMBRE DEL RVT';
                out += '</td>';
                out += '<td>';
                out += 'CAMBIO';
                out += '</td>';
                out += '</tr>';
                out += '</thead>';
                out += '<tbody>';
                var i;
                for (i = 0; i < myArr.length; i++) {
                    out += '<tr>';
                    out += '<td style="width:30px">';
                    out += '<input id="IdJerarquiaSC" hidden value="' + myArr[i].IdDepartamento + '" />';
                    out += '<label id="NoEmpSC">' + myArr[i].NumeroEmpleado + '</label>';
                    out += '</td>';
                    out += '<td>';
                    out += '<label id="rvtSC">' + myArr[i].Nombre_1 + '</label>';
                    out += '</td>';
                    out += '<td>';
                    out += '<input type="checkbox" value="' + myArr[i].id_Empleado + '" id="Asignar" onchange="SeleccionarRVTsnCampana()"/>';
                    out += '</td>';
                    out += '</tr>';
                }
                out += '</tbody>'
                out += '</table>';
                
                document.getElementById("SinAsignar").innerHTML = out;
                $('#tablaPrueba').DataTable({
                    
                });
            } else {
                alertify.error("No hay RVTs sin campaña");
            }
        }
    };

    xml.open("GET", url, true);
    xml.send();
}

//Selecciona y tacha los datos de la tabla del RVT seleccionado con campaña
function SeleccionarRVT() {
    //RVTs checkeados
    var check = document.querySelectorAll('input[id="Cambio"]');
    var rvt = document.querySelectorAll('label[id="rvt"]');
    let num = document.querySelectorAll('label[id="NoEmp"]');
    var i;
    
    for (i = 0; i < check.length; i++) {
        if (check[i].checked == true) {
            rvt[i].style = "text-decoration:line-through";
            num[i].style = "text-decoration:line-through";
        } else {
            rvt[i].style = "text-decoration:none";
            num[i].style = "text-decoration:none";
        }
    }
    
    var c = document.querySelectorAll('input[id="Cambio"]:checked');
    
    if (c.length <= 0) {
        
        document.getElementById('btnAsignar1').disabled = true;
    } else {
        document.getElementById('btnAsignar1').disabled = false;
    }
    
}

//Selecciona y tacha los datos de la tabla del RVT seleccionado sin campaña
function SeleccionarRVTsnCampana() {
    //RVTs checkeados
    var check = document.querySelectorAll('input[id="Asignar"]');
    var rvt = document.querySelectorAll('label[id="rvtSC"]');
    let num = document.querySelectorAll('label[id="NoEmpSC"]');
    var i;

    for (i = 0; i < check.length; i++) {
        if (check[i].checked == true) {
            rvt[i].style = "text-decoration:line-through";
            num[i].style = "text-decoration:line-through";
        } else {
            rvt[i].style = "text-decoration:none";
            num[i].style = "text-decoration:none";
        }
    }
    var c = document.querySelectorAll('input[id="Asignar"]:checked');

    if (c.length <= 0) {
        document.getElementById('btnAsignar2').disabled = true;
    } else {
        document.getElementById('btnAsignar2').disabled = false;
    }
}

//Funcion para preasignar los empleados sin campaña
function AsignarRVTsSinCampana() {
    let rvtId = document.querySelectorAll('input[id="Asignar"]');
    let rvtNom = document.querySelectorAll('label[id="rvtSC"]');
    let num = document.querySelectorAll('label[id="NoEmpSC"]');
    var html = "";
    for (var i = 0; i < rvtId.length; i++) {
        if (rvtId[i].checked) {
            html += '<tr><td style="width:30px"><label id="NumAsignadoC">' + num[i].textContent + '</label></td><td><label id="rvtAsignadoC">' + rvtNom[i].textContent + '</label><button type="button" value="' + rvtId[i].value + '" class="btn fas fa-times" style="color:red; margin-left:5px; width:10px" onclick="BorrarAsignacionCampana(this.value)"></button></td></tr>';
        }
    }
    if (rvtId.length <= 0) {
        document.getElementById("Asignarcampana").hidden = true;
    } else {
        document.getElementById("Asignarcampana").hidden = false;
    }
    document.getElementById('RVTsSinCampanaAsignados').innerHTML = html;
    
}

//Funcion valida que este seleccionada la campaña y un supervisor para asignar campaña a un RVT
function ValidarAsignacionCampana() {
    if (document.getElementById('Campania').value != 0 && document.getElementById('Supervisor').value != 0) {
        let rvt = document.querySelectorAll('input[id="Asignar"]');
        let jerar = document.querySelectorAll('input[id="IdJerarquiaSC"]');
        var c;
        for (var i = 0; i < rvt.length; i++) {
            if (rvt[i].checked == true) {
              c =  AsignarCampana(jerar[i].value, rvt[i].value, document.getElementById('Campania').value, document.getElementById('Supervisor').value);
            }
        }
        
        if (c) {
            document.getElementById('myModal1').style.display = 'block';
            document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
            document.getElementById('myModalLabel').innerHTML = "AVISO";
            document.getElementById('infoModal').innerHTML = "Asignación de campaña correcta";
        } else {
            alertify.error('Error al asignar camapaña');
        }
        
    } else {
        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
        document.getElementById('myModalLabel').innerHTML = "ADVERTENCIA";
        document.getElementById('infoModal').innerHTML = "Elegir campaña y supervisor al que se asignará";
    }
}

//Funcion que realiza la transacción para asignar la campaña
function AsignarCampana(Id_Jerarquia, id_Empleado, id_campana, id_supervisor) {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Operacion/AsignarCampana";
    var json = {
        IdDepartamento: Id_Jerarquia,
        id_Empleado: id_Empleado,
        IDDireccion: id_campana, //Lleva el ID de la campaña que se le asignara al empleado 
        ElaboroContrato: id_supervisor //Lleva el ID del supervisor que se le asignara 
    }
    var resultado;
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result) {
                resultado = true;
            } else {
                resultado = false;
            }
            //return resultado;
        }
    };
    //return resultado;
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

//Funcion que Valida que este seleccionada la campaña y validador de destino para el RVT
function ValidarCambioCampana() {
    if (document.getElementById('CampaniaAsignar').value != 0 && document.getElementById('SupervisorAsignar').value != 0) {
        RespuestaCorreo_Autorizacion();
        let rvt = document.querySelectorAll('input[id="Cambio"]');
        let jerar = document.querySelectorAll('input[id="IdJerarquia"]');
        var aleatorio = Math.round(Math.random() * 100000);
        //-->Recorrer arreglo con los datos del RVT
        for (var i = 0; i < rvt.length; i++) {
            if (rvt[i].checked) {
                console.log(rvt[i].value);
                CambioCampana(rvt[i].value, document.getElementById('CampaniaAsignar').value, aleatorio);
            }
        }
        alertify.alert('Aviso', 'Cambio solicitado, esperando respuesta de autorización', function () { location.reload(); });
        //alertify.confirm("Cambio solicitado, esperando respuesta de autorización", location.reload())
        //    document.getElementById('myModal1').style.display = 'block';
        //    document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
        //    document.getElementById('myModalLabel').innerHTML = "AVISO";
        //document.getElementById('infoModal').innerHTML = "Asignación de campaña correcta";
        
        
    } else {
        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
        document.getElementById('myModalLabel').innerHTML = "ADVERTENCIA";
        document.getElementById('infoModal').innerHTML = "Elegir campaña y supervisor al que se cambiará";
    }
}

//Funcion para realizar la transacción de cambio de campaña
function CambioCampana(IdEmpleado, idCampana, aleatorio) {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Operacion/CambioCampana";
    
    var json = {
        IdCampana: idCampana,
        IdEmpleado: IdEmpleado,
        IdEmpleadoJefe: document.getElementById('SupervisorAsignar').value,
        Serie: aleatorio
    }

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            
            //if (result == 0) {
            //    alertify.success("Cambio solicitado, esperando respuesta de autorización");
            //} else {
            //    alertify.error("Error al solicitar cambio");
            //}
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

//Funcion que trae la informacion de los RVTs que seran cambiados de campaña y crea la tabla
function CargarRvts_CambioCampana() {
    var serie = document.getElementById("Cambios").value;
    if (serie != 0) {
        var xml = new XMLHttpRequest();
        var url = hostInit + "/Operacion/CargarRvts_CambioCampana";
        var json = {
            Serie: serie
        }
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                document.getElementById('Datos_Cambio_Camp').hidden = false;
                document.getElementById("CampanaOrigen").innerHTML = result[0].CampanaOrigen;
                document.getElementById("COORDINADORORIGEN").innerHTML = result[0].COORDINADORORIGEN;
                document.getElementById("SUPERVISORORIGEN").innerHTML = result[0].SUPERVISORORIGEN;
                document.getElementById("GERENTEORIGEN").innerHTML = result[0].GERENTEORIGEN;
                document.getElementById("DIRECTORORIGEN").innerHTML = result[0].DIRECTORORIGEN;
                document.getElementById("CampanaDestino").innerHTML = result[0].CampanaDestino;
                document.getElementById("IdSupervisorDestino").value = result[0].IdSupervisorDestino;
                document.getElementById("SUPERVISORDESTINO").innerHTML = result[0].SUPERVISORDESTINO;
                document.getElementById("IDCoordinadorDestino").value = result[0].IDCoordinadorDestino;
                document.getElementById("COORDINADORDESTINO").innerHTML = result[0].COORDINADORDESTINO;
                document.getElementById("IDGerenteDestino").value = result[0].IDGerenteDestino;
                document.getElementById("GERENTEDESTINO").innerHTML = result[0].GERENTEDESTINO;
                document.getElementById("IDDIrectorDestino").value = result[0].IDDIrectorDestino;
                document.getElementById("DIRECTORDESTINO").innerHTML = result[0].DIRECTORDESTINO;
                document.getElementById("IdCampanaDestino").value = result[0].IdCampanaDestino;
                var html = '<table id="example" class="table table-bordered table-hover" style="margin-top:15px">';
                html += '<thead class="text-center">';
                html += '<tr>';
                html += '<th>';
                html += '#Empleado';
                html += '</th>';
                html += '<th>';
                html += 'RVT';
                html += '</th>';
                //html += '<th>';
                //html += 'Fecha de Incidencia';
                //html += '</th>';
                //html += '<th>';
                //html += 'Motivo de captura';
                //html += '</th>';
                //html += '<th>';
                //html += 'Reporta';
                //html += '</th>';
                //html += '<th>';
                //html += 'Actividad/Incidencia';
                //html += '</th>';
                //html += '<th>';
                //html += 'Persona';
                //html += '</th>';
                //html += '<th>';
                //html += 'Dirección';
                //html += '</th>';
                //html += '<th>';
                //html += 'Departamento';
                //html += '</th>';
                //html += '<th>';
                //html += 'Campaña';
                //html += '</th>';
                //html += '<th>';
                //html += 'Hora';
                //html += '</th>';
                //html += '<th>';
                //html += 'Observaciones';
                //html += '</th>';
                html += '</tr>';
                html += '</thead>';
                html += '<tbody class="tbody">';
                var i;
                for (i = 0; i < result.length; i++) {
                    html += '<tr>';
                    html += '<td> <input id="IdJerarquia" hidden value="' + result[i].IdJerarquia + '"  /> <input id="IdEmpleado" hidden value="' + result[i].IdEmpleado + '" />' + result[i].NumEmpleado + '</td>';
                    html += '<td>' + result[i].RVT + '</td>';
                    //html += '<td>' + result[i].FechaIncidente + '</td>';
                    //html += '<td>' + result[i].MotivoCaptura + '</td>';
                    //if (result[i].ReportaR == null || result[i].ReportaR == "") {
                    //    html += '<td>  </td>';
                    //} else {
                    //    html += '<td>' + result[i].ReportaR + '</td>';
                    //}
                    //html += '<td>' + result[i].Actividad_Incidencia + '</td>';
                    //html += '<td>' + result[i].Persona + '</td>';
                    //html += '<td>' + result[i].DireccionR + '</td>';
                    //html += '<td>' + result[i].DepartamentoR + '</td>';
                    //if (result[i].CampanaR === "Seleccione") {
                    //    html += '<td> Sin Campaña</td>';
                    //} else {
                    //    html += '<td>' + result[i].CampanaR + '</td>';
                    //}
                    //html += '<td>' + result[i].Hora + '</td>';
                    //html += '<td>' + result[i].Observaciones + '</td>';
                    html += '</tr>';
                }
                html += '</tbody>';
                html += '</table>';

                $('#tabla').html(html);

                $('#example').DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                    ]
                });
            }
        };

        xml.open("POST", url, true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(json))
    } else {
        alertify.alert("Favor de seleccionar una opción valida");
    }
}

//Funcion para traer los datos 1x1 de el IdJerarquina, IdEmpleado y el estatus
function TraerDatos_Autorizar_Cambio(estatus) {
    var IdJerarquia = document.querySelectorAll('input[id="IdJerarquia"]');
    var IdEmpleado = document.querySelectorAll('input[id="IdEmpleado"]');
    for (var i = 0; i < IdJerarquia.length; i++) {
        //setTimeout(function () {
            Autorizar_Negar_Cambio(IdJerarquia[i].value, IdEmpleado[i].value, estatus);
        //}, 3000);
        
        //console.log(IdJerarquia[i].value, IdEmpleado[i].value, estatus);
    }
    document.getElementById('Correo').value = estatus;
    RespuestaCorreo_Autorizacion();
}

//Funcion para realizar la tranzaccion de la autorizacion 
function Autorizar_Negar_Cambio(IdJerarquia, IdEmpleado, Estatus) {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Operacion/Autorizar_Negar_Cambio";
    var json = {
        IdEmpleado: IdEmpleado,
        IdSupervisorDestino: document.getElementById('IdSupervisorDestino').value,
        IdUsuarioAutorizo: sessionStorage.getItem('usuario'),
        IDGerenteDestino: document.getElementById('IDGerenteDestino').value,
        IDDIrectorDestino: document.getElementById('IDDIrectorDestino').value,
        IdCampanaDestino: document.getElementById('IdCampanaDestino').value,
        Estatus: Estatus,
        IdJerarquia: IdJerarquia,
        Serie: document.getElementById('Cambios').value,
        IdPuestoAutorizo: sessionStorage.getItem('puesto')
    }

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            console.log(result);
            if (result != 0) {
                alertify.success("Cambio correcto");
                document.getElementById('Datos_Cambio_Camp').hidden = true;
                CargarComboCambios();
            } else {
                alertify.error("Error al cambiar campaña");
            }
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

//Funcion para mandar correo de respuesta de la autorizacion
function RespuestaCorreo_Autorizacion() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Operacion/RespuestaCorreo_Autorizacion";
    var json = {
        EstadoCivil: document.getElementById('Correo').value
    }

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

//Funcion para mandar el correo de notificacion del cambio de campaña
function Notificar_Cambio() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Operacion/Notificar_Cambio";
    var json = {
        EstadoCivil: document.getElementById('Correo').value
    }

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

function Notificar_Solicitud_Cambio() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Operacion/Notificar_Solicitud_Cambio";
    var json = {
        EstadoCivil: 1
    }

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
