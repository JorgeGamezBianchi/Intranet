$(function () {
    $('#FNacimiento').datepicker(dataCalendar);
    $('#FIngreso').datepicker(dataCalendar);
    $('#FBaja').datepicker(dataCalendar);
    $('#FAltaIMSS').datepicker(dataCalendar);
    $('#FInsercion').datepicker(dataCalendar);
    $('#FFirmaBaja').datepicker(dataCalendar);
})


//Funcion para agregar un empleado
function InsertarEmpleado() {

    var json = {
        NumeroEmpleado: document.getElementById('NumeroEmpleado').value,
        Site: document.getElementById('Site').value,
        IMSS: document.getElementById('IMSS').value,
        Puesto: document.getElementById('Puesto').value,
        APaterno: document.getElementById('APaterno').value,
        AMaterno: document.getElementById('AMaterno').value,
        Nombre_1: document.getElementById('Nombre_1').value,
        Nombre_2: nom2 = document.getElementById('Nombre_2').value,
        Recluto: document.getElementById('Recluto').value,
        Genero: document.getElementById('Genero').value,
        RFC: document.getElementById('RFC').value,
        Homoclave: document.getElementById('Homoclave').value,
        CURP: document.getElementById('CURP').value,
        FNacimiento: formatDate(document.getElementById('FNacimiento').value),
        FIngreso: formatDate(document.getElementById('FIngreso').value),
        FBaja: formatDate(document.getElementById('FBaja').value),
        Turno: document.getElementById('Turno').value,
        NumeroCuenta: document.getElementById('NumeroCuenta').value,
        CLABE: document.getElementById('CLABE').value,
        Banco: document.getElementById('Banco').value,
        TelefonoFijo: document.getElementById('TelefonoFijo').value,
        TelefonoMovil: document.getElementById('TelefonoMovil').value,
        ElaboroContrato: document.getElementById('ElaboroContrato').value,
        Diagnostico: document.getElementById('Diagnostico').value,
        PrimerEmpleo: document.getElementById('PrimerEmpleo').value,
        ExperienciaEnCallCenter: document.getElementById('ExperienciaCallCenter').value,
        EstadoCivil: document.getElementById('EstadoCivil').value,
        Hijos: document.getElementById('Hijos').value,
        UltimoGradoEstudios: document.getElementById('UltimoGradoDeEstudios').value,
        Especialidad: document.getElementById('Especialidad').value,
        FuenteReclutamiento: document.getElementById('FuenteReclutamiento').value,
        FAltaIMSS: formatDate(document.getElementById('FAltaIMSS').value),
        Estatus: 1,
        Calle: document.getElementById('Calle').value,
        Numero: document.getElementById('Numero').value,
        Colonia: document.getElementById('Colonia').value,
        Delegacion: document.getElementById('Delegacion').value,
        Ciudad: document.getElementById('Ciudad').value,
        CP: document.getElementById('CP').value,
        IdDireccion: document.getElementById('Direccion').value,
        IdDepartamento: document.getElementById('Departamento').value,
        Usuario: sessionStorage.getItem('usuario'),
        SueldoDiario: document.getElementById('SueldoDiario').value,
        Campania: document.getElementById("Campania").value,
        Celular2: document.getElementById('Celular2').value,
        Enfermedad: document.getElementById('Enfermedad').value,
        OtraEnfermedad: document.getElementById('OtraEnfermedad').value,
        Alergias: document.getElementById('Alergias').value,
        AlregiaC: document.getElementById('AlregiaC').value,
        OtroGrado: document.getElementById('OtroGrado').value,
        TituloObtenido: document.getElementById('TituloObtenido').value,
        ContactoEmergencia1: document.getElementById('ContactoEmergencia1').value,
        TelefonoEmergencia1: document.getElementById('TelefonoEmergencia1').value,
        ContactoEmergencia2: document.getElementById('ContactoEmergencia2').value,
        TelefonoEmergencia2: document.getElementById('TelefonoEmergencia2').value,
        PasatiempoFav: document.getElementById('PasatiempoFav').value,
        DeporteFav: document.getElementById('DeporteFav').value,
        Talento: document.getElementById('Talento').value,
        Instrumento: document.getElementById('Instrumento').value,
        OtroTalento: document.getElementById('OtroTalento').value,
        TipoNomina: document.getElementById('TipoNomina').value,
        Sdo_Diario_Asimilados: document.getElementById('Sdo_Diario_Asimilados').value,
        Sdo_Diario_IMSS: document.getElementById('Sdo_Diario_IMSS').value,
        Sdo_quincenal: document.getElementById('Sdo_Quincenal').value,
        Infonavit: document.getElementById('CreditoInfonavit').value,
        Fonacot: document.getElementById('Fonacot').value,
        Pensionado: document.getElementById('Pensionado').value,
        
    };
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/InsertarEmpleado";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result.NumeroEmpleado == "") {
                document.getElementById('myModal1').style.display = 'block';
                document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                document.getElementById('myModalLabel').innerHTML = "Advertencia";
                document.getElementById('infoModal').innerHTML = "Empleado ya existe en la base de datos";

                document.getElementById('RFC').value = "";
                document.getElementById('RFC').focus();
            } else {
                if (document.getElementById('Hijos').value > 0) {
                    document.getElementById('id_Empleado').value = result.id_Empleado;
                    TraerHijos();
                    //document.getElementById('myModal1').style.display = 'block';
                    //document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                    //document.getElementById('myModalLabel').innerHTML = "Correcto";
                    //document.getElementById('infoModal').innerHTML = "Empleado registrado con exito <br /> Número de empleado asignado: " + result.NumeroEmpleado;
                    //LimpiarCampos();

                    alertify.alert("Notificación","Empleado registrado con exito <br /> Número de empleado asignado: " + result.NumeroEmpleado).set({
                        'invokeOnCloseOff': true, 'onok': function () {
                            location.reload();
                        }
                    });
                } else {
                    //document.getElementById('myModal1').style.display = 'block';
                    //document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                    //document.getElementById('myModalLabel').innerHTML = "Correcto";
                    //document.getElementById('infoModal').innerHTML = "Empleado registrado con exito <br /> Número de empleado asignado: " + result.NumeroEmpleado;
                    //LimpiarCampos();


                    alertify.alert("Notificación", "Empleado registrado con exito <br /> Número de empleado asignado: " + result.NumeroEmpleado).set({
                        'invokeOnCloseOff': true, 'onok': function () {
                            location.reload();
                        }
                    });
                }
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

//Función para actualizar los datos del empleado
function ActualizarEmpleado() {
    var json = {
        id_Empleado: document.getElementById('id_Empleado').value,
        NumeroEmpleado: document.getElementById('NumeroEmpleado').value,
        Site: document.getElementById('Site').value,
        IMSS: document.getElementById('IMSS').value,
        Puesto: document.getElementById('Puesto').value,
        APaterno: document.getElementById('APaterno').value,
        AMaterno: document.getElementById('AMaterno').value,
        Nombre_1: document.getElementById('Nombre_1').value,
        Nombre_2: nom2 = document.getElementById('Nombre_2').value,
        Recluto: document.getElementById('Recluto').value,
        Genero: document.getElementById('Genero').value,
        RFC: document.getElementById('RFC').value,
        Homoclave: document.getElementById('Homoclave').value,
        CURP: document.getElementById('CURP').value,
        FNacimiento: formatDate(document.getElementById('FNacimiento').value),
        FIngreso: formatDate(document.getElementById('FIngreso').value),
        FBaja: formatDate(document.getElementById('FBaja').value),
        Turno: document.getElementById('Turno').value,
        NumeroCuenta: document.getElementById('NumeroCuenta').value,
        CLABE: document.getElementById('CLABE').value,
        Banco: document.getElementById('Banco').value,
        TelefonoFijo: document.getElementById('TelefonoFijo').value,
        TelefonoMovil: document.getElementById('TelefonoMovil').value,
        ElaboroContrato: document.getElementById('ElaboroContrato').value,
        Diagnostico: document.getElementById('Diagnostico').value,
        PrimerEmpleo: document.getElementById('PrimerEmpleo').value,
        ExperienciaEnCallCenter: document.getElementById('ExperienciaCallCenter').value,
        EstadoCivil: document.getElementById('EstadoCivil').value,
        Hijos: document.getElementById('Hijos').value,
        UltimoGradoEstudios: document.getElementById('UltimoGradoDeEstudios').value,
        Especialidad: document.getElementById('Especialidad').value,
        FuenteReclutamiento: document.getElementById('FuenteReclutamiento').value,
        CapturaPlantilla: document.getElementById('CapturaPlantilla').value,
        FAltaIMSS: formatDate(document.getElementById('FAltaIMSS').value),
        Estatus: document.getElementById('Estatus').value,
        Calle: document.getElementById('Calle').value,
        Numero: document.getElementById('Numero').value,
        Colonia: document.getElementById('Colonia').value,
        Delegacion: document.getElementById('Delegacion').value,
        Ciudad: document.getElementById('Ciudad').value,
        CP: document.getElementById('CP').value,
        IdDireccion: document.getElementById('Direccion').value,
        IdDepartamento: document.getElementById('Departamento').value,
        Usuario: sessionStorage.getItem('usuario'),
        SueldoDiario: document.getElementById('SueldoDiario').value,
        Campania: document.getElementById("Campania").value,
        Celular2: document.getElementById('Celular2').value,
        Enfermedad: document.getElementById('Enfermedad').value,
        OtraEnfermedad: document.getElementById('OtraEnfermedad').value,
        Alergias: document.getElementById('Alergias').value,
        AlregiaC: document.getElementById('AlregiaC').value,
        OtroGrado: document.getElementById('OtroGrado').value,
        TituloObtenido: document.getElementById('TituloObtenido').value,
        ContactoEmergencia1: document.getElementById('ContactoEmergencia1').value,
        TelefonoEmergencia1: document.getElementById('TelefonoEmergencia1').value,
        ContactoEmergencia2: document.getElementById('ContactoEmergencia2').value,
        TelefonoEmergencia2: document.getElementById('TelefonoEmergencia2').value,
        PasatiempoFav: document.getElementById('PasatiempoFav').value,
        DeporteFav: document.getElementById('DeporteFav').value,
        Talento: document.getElementById('Talento').value,
        Instrumento: document.getElementById('Instrumento').value,
        OtroTalento: document.getElementById('OtroTalento').value,
        TipoNomina: document.getElementById('TipoNomina').value,
        Sdo_Diario_Asimilados: document.getElementById('Sdo_Diario_Asimilados').value,
        Sdo_Diario_IMSS: document.getElementById('Sdo_Diario_IMSS').value,
        Sdo_quincenal: document.getElementById('Sdo_quincenal').value,
        Infonavit: document.getElementById('CreditoInfonavit').value,
        Fonacot: document.getElementById('Fonacot').value,
        Pensionado: document.getElementById('Pensionado').value,
    };

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/ActulalizarEmpleado";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result == 2) {
                document.getElementById('myModal1').style.display = 'block';
                document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                document.getElementById('myModalLabel').innerHTML = "Advertencia";
                document.getElementById('infoModal').innerHTML = "Error al actualizar datos del empleado";
            } else {
                document.getElementById('myModal1').style.display = 'block';
                document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                document.getElementById('myModalLabel').innerHTML = "Correcto";
                document.getElementById('infoModal').innerHTML = "Datos del empleado actualizados correctamente";
                LimpiarCamposEmp();
                document.getElementById('btn_InsEmp').style.display = 'block';
                document.getElementById('btn_Upd').style.display = 'none';
                document.getElementById('btn-baja').style.display = "none";
            }
        }
    };

    xml.open('POST', url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

//Función para buscar empleado
function buscarEmpleado(emple) {
    var json = { NumeroEmpleado: emple }

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/BuscarEmpleado/";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result.id_Empleado == 0) {
                document.getElementById('myModal1').style.display = 'block';
                document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                document.getElementById('myModalLabel').innerHTML = "Advertencia";
                document.getElementById('infoModal').innerHTML = "Numero de empleado no existe en la base";
            } else {

                document.getElementById('collapse').className = "collapse show panel-collapse in";
                document.getElementById('id_Empleado').value = result.id_Empleado;
                document.getElementById('divNumeroEmpleado').hidden = false;
                document.getElementById('NumeroEmpleado').value = result.NumeroEmpleado;
                document.getElementById('NumeroEmpleado').disabled = true;
                document.getElementById('Site').value = result.Site;
                document.getElementById('IMSS').value = result.IMSS;
                document.getElementById('Puesto').value = result.Puesto;
                document.getElementById('APaterno').value = result.APaterno;
                document.getElementById('AMaterno').value = result.AMaterno;
                document.getElementById('Nombre_1').value = result.Nombre_1;
                document.getElementById('Nombre_2').value = result.Nombre_2;
                document.getElementById('Recluto').value = result.Recluto;
                document.getElementById('Genero').value = result.Genero;
                document.getElementById('RFC').value = result.RFC;
                document.getElementById('Homoclave').value = result.Homoclave;
                document.getElementById('CURP').value = result.CURP;
                document.getElementById('FNacimiento').value = formatDate(result.FNacimiento);
                document.getElementById('FIngreso').value = formatDate(result.FIngreso);
                document.getElementById('FBaja').value = formatDate(result.FBaja);
                document.getElementById('Turno').value = result.Turno;
                document.getElementById('NumeroCuenta').value = result.NumeroCuenta;
                document.getElementById('CLABE').value = result.CLABE;
                document.getElementById('Banco').value = result.Banco;
                document.getElementById('TelefonoFijo').value = result.TelefonoFijo;
                document.getElementById('TelefonoMovil').value = result.TelefonoMovil;
                document.getElementById('ElaboroContrato').value = result.ElaboroContrato;
                document.getElementById('Diagnostico').value = result.Diagnostico;
                document.getElementById('PrimerEmpleo').value = result.PrimerEmpleo;
                document.getElementById('divEdad').hidden = false;
                document.getElementById('Edad').value = result.Edad;
                document.getElementById('ExperienciaCallCenter').value = result.ExperienciaEnCallCenter;
                document.getElementById('EstadoCivil').value = result.EstadoCivil;
                document.getElementById('Hijos').value = result.Hijos;
                document.getElementById('UltimoGradoDeEstudios').value = result.UltimoGradoEstudios;
                document.getElementById('Especialidad').value = result.Especialidad;
                document.getElementById('FuenteReclutamiento').value = result.FuenteReclutamiento;
                document.getElementById('divCapturaPlantilla').hidden = false;
                document.getElementById('CapturaPlantilla').value = result.CapturaPlantilla;
                document.getElementById('FAltaIMSS').value = formatDate(result.FAltaIMSS);
                document.getElementById('divEstatus').hidden = false;
                document.getElementById('Estatus').value = result.Estatus;
                document.getElementById('divFInsercion').hidden = false;
                document.getElementById('FInsercion').value = formatDate(result.FInsercion);
                document.getElementById('Calle').value = result.Calle;
                document.getElementById('Numero').value = result.Numero;
                document.getElementById('Colonia').value = result.Colonia;
                document.getElementById('Delegacion').value = result.Delegacion;
                document.getElementById('Ciudad').value = result.Ciudad;
                document.getElementById('CP').value = result.CP;
                document.getElementById('Departamento').value = result.IdDepartamento;
                document.getElementById('Direccion').value = result.IDDireccion;
                document.getElementById('FFirmaBaja').value = formatDate(result.FFirmaBaja);
                document.getElementById('MotivoBaja').value = result.MotivoBaja;
                document.getElementById('TelefonoContacto').value = result.TelefonoContacto;
                document.getElementById('Observaciones').value = result.Observaciones;
                document.getElementById('SueldoDiario').value = result.SueldoDiario;
                document.getElementById("Campania").value = result.Campania;
                document.getElementById('tituloEmpleado').innerHTML = 'Actualizar datos del empleado';
                document.getElementById('InsEmp').className = "col-md-3";
                document.getElementById('cancelarEmp').className = "col-md-3";
                document.getElementById('bajaEmp').style.display = 'block';
                document.getElementById('btn_InsEmp').style.display = 'none';
                document.getElementById('btn_Upd').style.display = 'block';
                document.getElementById('NumeroEmpleadob').value = "";
                document.getElementById('APaternob').value = "";
                document.getElementById('AMaternob').value = "";
                document.getElementById('Nombre_1b').value = "";
                document.getElementById('Nombre_2b').value = "";
                document.getElementById('ResultadoB').innerHTML = "";
                document.getElementById('datosBuscarEmp').hidden = true;

                document.getElementById('TipoNomina').value = (result.TipoNomina == "") ? "0" : result.TipoNomina;
                document.getElementById('Sdo_Diario_IMSS').value = result.Sdo_Diario_IMSS;
                document.getElementById('Sdo_Diario_Asimilados').value = result.Sdo_Diario_Asimilados;
                document.getElementById('Celular2').value = result.Celular2;
                document.getElementById('Enfermedad').value = (result.Enfermedad == "") ? "0" : result.TipoNomina;
                document.getElementById('OtraEnfermedad').value = result.OtraEnfermedad;
                document.getElementById('Alergias').value = (result.Alergias == "") ? "0" : result.Alergias;
                document.getElementById('AlregiaC').value = result.AlregiaC;
                document.getElementById('OtroGrado').value = result.OtroGrado;
                document.getElementById('TituloObtenido').value = result.TituloObtenido;
                document.getElementById('ContactoEmergencia1').value = result.ContactoEmergencia1;
                document.getElementById('TelefonoEmergencia1').value = result.TelefonoEmergencia1;
                document.getElementById('ContactoEmergencia2').value = result.ContactoEmergencia2;
                document.getElementById('TelefonoEmergencia2').value = result.TelefonoEmergencia2;
                document.getElementById('PasatiempoFav').value = result.PasatiempoFav;
                document.getElementById('DeporteFav').value = result.DeporteFav;
                document.getElementById('Talento').value = (result.Talento == "") ? "0" : result.Talento;
                document.getElementById('Instrumento').value = result.Instrumento;
                document.getElementById('OtroTalento').value = result.OtroTalento;
                document.getElementById('Sdo_Quincenal').value = result.Sdo_quincenal;
                document.getElementById('CreditoInfonavit').value = result.Infonavit ? "" : result.Infonavit;
                document.getElementById('Fonacot').value = result.Fonacot ? "" : result.Fonacot;
                document.getElementById('Pensionado').value = result.Pensionado ? "0" : result.Pensionado;
            }
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

//Función para mostrar collapse de datos de la baja y cambiar el onclick del boton
function bajaEmp() {
    document.getElementById('datosBajaEmp').hidden = false;
    document.getElementById('btn-baja').style.display = "none";
    document.getElementById('btn-baja1').style.display = "block";
}

//Funcion para dar de baja un empleaado (baja logica)
function bajaEmpleado() {
    var json = {
        NumeroEmpleado: document.getElementById('NumeroEmpleado').value,
        FBaja: formatDate(document.getElementById('FBaja').value),
        FFirmaBaja: formatDate(document.getElementById('FFirmaBaja').value),
        MotivoBaja: document.getElementById('MotivoBaja').value,
        TipoBaja: document.getElementById('TipoBaja').value,
        TelefonoContacto: document.getElementById('TelefonoContacto').value,
        Observaciones: document.getElementById('Observaciones').value,
        AutorizoBaja: sessionStorage.getItem('usuario'),
        Usuario: sessionStorage.getItem('usuario')
    }

    //$.ajax({
    //    url: hostInit + "/Empleados/BajaEmpleado",
    //    data: JSON.stringify(json),
    //    type: "POST",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        if (result == 4) {
    //            document.getElementById('myModal1').style.display = 'block';
    //            document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
    //            document.getElementById('myModalLabel').innerHTML = "Advertencia";
    //            document.getElementById('infoModal').innerHTML = "Error al dar de baja al empleado";
    //            //alert("Error al dar de baja al empleado");
    //        }
    //        if (result == 3) {
    //            document.getElementById('myModal1').style.display = 'block';
    //            document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
    //            document.getElementById('myModalLabel').innerHTML = "Advertencia";
    //            document.getElementById('infoModal').innerHTML = "Empleado ya esta dado de baja";
    //        }
    //        else {
    //            document.getElementById('myModal1').style.display = 'block';
    //            document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
    //            document.getElementById('myModalLabel').innerHTML = "Correcto";
    //            document.getElementById('infoModal').innerHTML = "Baja del empleado correcta";
    //            //alert("Datos actualizados correctamente");
    //            document.getElementById('btn-baja').style.display = "block";
    //            document.getElementById('btn-baja1').style.display = "none";
    //            document.getElementById('datosBajaEmp').hidden = true;
    //            document.getElementById('bajaEmp').style.display = 'none';
    //            document.getElementById('btn_InsEmp').style.display = 'block';
    //            document.getElementById('btn_Upd').style.display = 'none';
    //            document.getElementById('InsEmp').className = "col-md-4";
    //            document.getElementById('cancelarEmp').className = "col-md-4";
    //            LimpiarCampos();
    //        }
    //    }
    //});

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/BajaEmpleado";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result == 4) {
                document.getElementById('myModal1').style.display = 'block';
                document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                document.getElementById('myModalLabel').innerHTML = "Advertencia";
                document.getElementById('infoModal').innerHTML = "Error al dar de baja al empleado";
            }else if (result == 3) {
                document.getElementById('myModal1').style.display = 'block';
                document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                document.getElementById('myModalLabel').innerHTML = "Advertencia";
                document.getElementById('infoModal').innerHTML = "Empleado ya esta dado de baja";
            }
            else {
                document.getElementById('myModal1').style.display = 'block';
                document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                document.getElementById('myModalLabel').innerHTML = "Correcto";
                document.getElementById('infoModal').innerHTML = "Baja del empleado correcta";
                document.getElementById('btn-baja').style.display = "block";
                document.getElementById('btn-baja1').style.display = "none";
                document.getElementById('datosBajaEmp').hidden = true;
                document.getElementById('bajaEmp').style.display = 'none';
                document.getElementById('btn_InsEmp').style.display = 'block';
                document.getElementById('btn_Upd').style.display = 'none';
                document.getElementById('InsEmp').className = "col-md-4";
                document.getElementById('cancelarEmp').className = "col-md-4";
                LimpiarCamposEmp();
            }
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}


//Función que carga el Select del genero del empleado
function cargarGeneros() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/CargarGeneros";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '';
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].Valor + '">' + result[i].Texto + '</option>';
            }
            document.getElementById('Genero').innerHTML = opt;
        }
    };

    xml.open("GET", url, true);
    xml.send();
}

//Función que carga el Select de Estado civil del empleado
function cargarEstadosCiviles() {

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/CargarEstadosCiviles";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '';
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].id_EstadoCivil + '">' + result[i].EstadoCivil + '</option>';
            }
            document.getElementById('EstadoCivil').innerHTML = opt;
        }
    };

    xml.open("GET", url, true);
    xml.send();
}

//Función que carga el Select de Estudios
function cargarEstudios() {

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/CargarEstudios";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '';
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].Id_Estudios + '">' + result[i].NivelAcademico + '</option>';
            }
            document.getElementById('UltimoGradoDeEstudios').innerHTML = opt;
        }
    };

    xml.open("GET", url, true);
    xml.send();
}
//Función que carga el Select de bancos
function cargarBancos() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/CargarBancos";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '';
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].id_Banco + '">' + result[i].Banco + '</option>';
            }
            document.getElementById('Banco').innerHTML = opt;
        }
    };

    xml.open("GET", url, true);
    xml.send();
}

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

//Funcion para carcar Select de los Site
function cargarSite() {
    
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/Site";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '';
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="'+result[i].Id_plaza+'">' + result[i].Plaza + '</option>';
            }
            document.getElementById('Site').innerHTML = opt;
        }
    };
    xml.open("GET", url, true);
    xml.send();
}


//Función que carga el Select con los puestos
function cargarPuesto() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/Puesto";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '<option value="0">Seleccione</option>';
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].id_Puesto + '">' + result[i].Puesto + '</option>';
            }
            document.getElementById('Puesto').innerHTML = opt;
            //document.getElementById('PuestoSolicitado').innerHTML = opt;
        }
    };
    xml.open("GET", url, true);
    xml.send();
}

//Funcion que carga el Select con los turnos
function cargarTurnos() {

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/Turno";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '';
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].id_Turno + '">' + result[i].Turno + '</option>';
            }
            document.getElementById('Turno').innerHTML = opt;
        }
    };
    xml.open("GET", url, true);
    xml.send();
}

//Funcion que carga el Select con los estatus 
function cargarEstatus() {
    
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/Estatus";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '';
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].id_Estatus + '">' + result[i].EstatusMed + '</option>';
            }
            document.getElementById('Estatus').innerHTML = opt;
        }
    };
    xml.open("GET", url, true);
    xml.send();
}

//Funcion que carga el Select de Reclutamiento
function cargarFReclutamiento() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/FReclutamiento";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '';
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].id_FuenteReclutamiento + '">' + result[i].FuenteReclutamiento + '</option>';
            }
            document.getElementById('FuenteReclutamiento').innerHTML = opt;
        }
    };
    xml.open("GET", url, true);
    xml.send();
}

//Función que carga los select con el nombre de los empleados
function cargarEmpleado() {

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/CargarEmpleados";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '<option value="0">Seleccione</option>';
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].id_Empleado + '">' + result[i].Nombre_1 + ' ' + result[i].Nombre_2 + ' ' + result[i].APaterno + ' ' + result[i].AMaterno + '</option>';
            }
            document.getElementById('ElaboroContrato').innerHTML = opt;
            document.getElementById('CapturaPlantilla').innerHTML = opt;
        }
    };
    xml.open("GET", url, true);
    xml.send();
}

//Funcion que carga los select de los proveedores
function cargarRecluto() {

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/CargarProveedores";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '<option value="0">Seleccione</option>';
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].id_Proveedor + '">' + result[i].Proveedor + '</option>';
            }
            document.getElementById('Recluto').innerHTML = opt;
        }
    };
    xml.open("GET", url, true);
    xml.send();
}

//Funcion que carga catalog de estatus reclutamiento
function cargarEstatusReclutamiento() {

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/CargarEstatusReclu";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '<option value="0">Seleccione</option>';
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].ID_EstatusReclu + '">' + result[i].Estatus + '</option>';
            }
            document.getElementById('EstatusReclutamiento').innerHTML = opt;
        }
    };
    xml.open("GET", url, true);
    xml.send();
}


//Funcion para cargar el segmento
function cargarSegmento() {
    var xml = new XMLHttpRequest();
    var url = hostInit + '/Empleados/CargarSegmento';
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '<option value="0">Seleccione</option>';
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].ID_Segmento + '">' + result[i].Segmento + '</option>';
            }
            document.getElementById('Segmento').innerHTML = opt;
        }
    };
    xml.open("GET", url, true);
    xml.send();
}



//Funcion que carga el Select de Si No
function cargarSiNo() {

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/CargarSiNo";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '';
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].Valor + '">' + result[i].Respuesta + '</option>';
            }
            document.getElementById('ControlMedico').innerHTML = opt;
            document.getElementById('ExperienciaCallCenter').innerHTML = opt;
            document.getElementById('PrimerEmpleo').innerHTML = opt;
            document.getElementById('Hijos2').innerHTML = opt;
        }
    };
    xml.open("GET", url, true);
    xml.send();
}


//Funcion que carga el Select de Tipo Regimen
function cargarTipoRegimen() {

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/CargarTipoRegimen";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = "<option value='0'>Seleccione</option>";
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].ID_TipoRegimen + '">' + result[i].Tipo_Regimen + '</option>';
            }
            document.getElementById('tipoRegimenCIF').innerHTML = opt;
        }
    };
    xml.open("GET", url, true);
    xml.send();
}


//Funcion para cargar el select de diagnostico
function cargarDiagnosticos() {

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/CargarDiagnosticos";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '';
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].id_Diagnostico + '">' + result[i].Diagnostico + '</option>';
            }
            document.getElementById('Diagnostico').innerHTML = opt;
        }
    };
    xml.open("GET", url, true);
    xml.send();
}

//Funcion para cargar el select de Motivo de baja
function cargarMotivoBajas() {
    var xmlhttp = new XMLHttpRequest();
    var url = hostInit + "/Empleados/cargarMotivoBaja";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            var out = "";
            var i;
            for (i = 0; i < myArr.length; i++) {
                out += '<option value="' + myArr[i].Id_Motivo + '">' + myArr[i].Motivo + '</option>';
            }
            document.getElementById("MotivoBaja").innerHTML = out;
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}
//Función para cargar el select de tipo de baja
function cargarTipoBaja() {
    var xmlhttp = new XMLHttpRequest();
    var url = hostInit + "/Empleados/cargarTipoBaja";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            var out = "";
            var i;
            for (i = 0; i < myArr.length; i++) {
                out += '<option value="' + myArr[i].Id_TipoBaja + '">' + myArr[i].TipoBaja + '</option>';
            }
            document.getElementById("TipoBaja").innerHTML = out;
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

//Funcion que carga el select de Direccion
function cargarDireccion() {
    var xmlhttp = new XMLHttpRequest();
    var url = hostInit + "/Empleados/CargarDireccion";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            var out = "";
            var i;
            for (i = 0; i < myArr.length; i++) {
                out += '<option value="' + myArr[i].IDDireccion + '">' + myArr[i].Descripcion + '</option>';
            }
            document.getElementById("Direccion").innerHTML = out;
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}
//Function para cargar el select con todos los departamentos
function cargarDepartamento() {


    var direc = ["Administración y Finanzas", "Contraloría", "Comercial", "Calidad", "Recursos Humanos", "Proyectos", "Operaciones", "Seguridad de la Información", "Tecnologías de la Información"];
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/CargarDepartamentos2/";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            if (myArr != "") {
                var c = 0;
                var out = "<option value='0'>Seleccione</option>";
                do {
                    out += '<optgroup label="' + direc[c] + '">';
                    for (var i = 0; i < myArr.length; i++) {
                        if (myArr[i].IDDireccion == c + 1) {
                            out += '<option value="' + myArr[i].IDDepartamento + '">' + myArr[i].Descripcion + '</option>';
                        }
                    }
                    out += '</optgroup>';
                    c++;
                } while (c < direc.length);
                document.getElementById("Departamento").innerHTML = out;
            } else {
                document.getElementById('Departamento').innerHTML = "<option value='0'>Selecciona</option>";
            }
        }
    };

    xml.open("GET", url, true);
    xml.send();
}

//Función que valida que los campos que son requeridos no esten vacios
//var campos = ["Apellido Paterno", "Apellido Materno", "Nombre", "Fecha de nacimiento", "Genero", "Número de seguro social", "CURP", "RFC", "Estado civil", "Ultimo grado de estudios",
//    "Calle", "Número de vivienda", "Colonia", "Ciudad", "CP", "NumeroEmpleado", "Site", "Turno", "Reclutador", "Dirección","Departamento", "Puesto", "Fuente de reclutamiento", "Elaboró contrato", "Primer Empleo",
//    "Experiencia en call center", "Fecha de ingreso", "Banco", "Número de cuenta", "CLABE"];

var campos = ["Apellido Paterno", "Apellido Materno", "Nombre", "Fecha de nacimiento", "Genero",
    "Calle", "Número de vivienda", "Colonia", "Ciudad", "NumeroEmpleado", "Turno", "Puesto", "Fecha de ingreso","Sueldo Diario"];
function validarCamposEmp() {
    if (
        //(document.getElementById('APaterno').value != "") & (document.getElementById('AMaterno').value != "")
        //& (document.getElementById('Nombre_1').value != "") & (document.getElementById('FNacimiento').value != "")
        //& (document.getElementById('IMSS').value != "") & (document.getElementById('CURP').value != "")
        //& (document.getElementById('RFC').value != "") & (document.getElementById('Calle').value != "")
        //& (document.getElementById('FIngreso').value != "") & (document.getElementById('NumeroCuenta').value != "")
        //& (document.getElementById('CLABE').value != "") & (document.getElementById('Site').value != 0)
        //& (document.getElementById('Puesto').value != 0) & (document.getElementById('Genero').value != 0)
        //& (document.getElementById('Turno').value != 0) & (document.getElementById('Banco').value != 0)
        //& (document.getElementById('PrimerEmpleo').value != 0) & (document.getElementById('PrimerEmpleo').value != 0)
        //& (document.getElementById('ExperienciaCallCenter').value != 0) & (document.getElementById('EstadoCivil').value != 0)
        //& (document.getElementById('UltimoGradoDeEstudios').value != 0) & (document.getElementById('FuenteReclutamiento').value != 0)
        //& (document.getElementById('Numero').value != "") & (document.getElementById('Recluto').value != 0)
        //& (document.getElementById('ElaboroContrato').value != 0) & (document.getElementById('Colonia').value != "")
        //& (document.getElementById('Ciudad').value != "") & (document.getElementById('CP').value != "")
        //& (document.getElementById('Direccion').value != 0) & (document.getElementById('NumeroEmpleado').value != "")
        //& (document.getElementById('Departamento').value != 0)

          (document.getElementById('APaterno').value != "")   & (document.getElementById('AMaterno').value != "")
        & (document.getElementById('Nombre_1').value != "")   & (document.getElementById('FNacimiento').value != "")
        & (document.getElementById('Puesto').value != 0)      & (document.getElementById('Genero').value != 0)
        & (document.getElementById('Calle').value != "")      & (document.getElementById('Numero').value != "")
        & (document.getElementById('Colonia').value != "")    & (document.getElementById('Ciudad').value != "")
        & (document.getElementById('Turno').value != 0)       & (document.getElementById('NumeroEmpleado').value != "")
        & (document.getElementById('FIngreso').value != "")   & (document.getElementById('SueldoDiario').value != "")

    ) {
        if (document.getElementById('Hijos').value > 0 && !ValidaHijos()) {
            alertify.alert("Se indico que se tiene hij@s y no se agrego su edad.Favor de ingresar la fecha de nacimiento de sus hij@s");
            ModalHijos();
        } else {
            InsertarEmpleado();
        }
       
    } else {
        var inputs = document.getElementsByName('obg');
        /*console.log(inputs);*/
        for (var i = 0; i < inputs.length; i++) {

            if (inputs[i].value == "" || inputs[i].value == 0) {
                console.log("Falta " + campos[i]);
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

//Función que valida que los campos que son requeridos no esten vacios Al actualizar

function validarCamposEmpUpd() {
    if (

        //(document.getElementById('APaterno').value != "") & (document.getElementById('AMaterno').value != "")
        //& (document.getElementById('Nombre_1').value != "") & (document.getElementById('FNacimiento').value != "")
        //& (document.getElementById('IMSS').value != "") & (document.getElementById('CURP').value != "")
        //& (document.getElementById('RFC').value != "") & (document.getElementById('Calle').value != "")
        //& (document.getElementById('FIngreso').value != "") & (document.getElementById('NumeroCuenta').value != "")
        //& (document.getElementById('CLABE').value != "") & (document.getElementById('Site').value != 0)
        //& (document.getElementById('Puesto').value != 0) & (document.getElementById('Genero').value != 0)
        //& (document.getElementById('Turno').value != 0) & (document.getElementById('Banco').value != 0)
        //& (document.getElementById('PrimerEmpleo').value != 0) & (document.getElementById('PrimerEmpleo').value != 0)
        //& (document.getElementById('ExperienciaCallCenter').value != 0) & (document.getElementById('EstadoCivil').value != 0)
        //& (document.getElementById('UltimoGradoDeEstudios').value != 0) & (document.getElementById('FuenteReclutamiento').value != 0)
        //& (document.getElementById('Numero').value != "") & (document.getElementById('Recluto').value != 0)
        //& (document.getElementById('ElaboroContrato').value != 0) & (document.getElementById('Direccion').value != 0)
        //& (document.getElementById('Departamento').value != 0) & (document.getElementById('Colonia').value != "")
        //& (document.getElementById('Ciudad').value != "") & (document.getElementById('CP').value != "")
        //& (document.getElementById('Direccion').value != 0) & (document.getElementById('NumeroEmpleado').value != "")
        //& (document.getElementById('Departamento').value != 0)

        (document.getElementById('APaterno').value != "") & (document.getElementById('AMaterno').value != "")
        & (document.getElementById('Nombre_1').value != "") & (document.getElementById('FNacimiento').value != "")
        & (document.getElementById('Puesto').value != 0) & (document.getElementById('Genero').value != 0)
        & (document.getElementById('Calle').value != "") & (document.getElementById('Numero').value != "")
        & (document.getElementById('Colonia').value != "") & (document.getElementById('Ciudad').value != "")
        & (document.getElementById('Turno').value != 0) & (document.getElementById('NumeroEmpleado').value != "")
        & (document.getElementById('FIngreso').value != "") & (document.getElementById('SueldoDiario').value != "")
    ) {
        ActualizarEmpleado()
    } else {
        var inputs = document.getElementsByName('obg');
        for (var i = 0; i < inputs.length; i++) {

            if (inputs[i].value == "" || inputs[i].value == 0) {
                //console.log("Falta " + campos[i]);
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


//Función para validar campos de la baja
function validarCamposBaja() {
    if ((document.getElementById('FBaja').value != "") & (document.getElementById('FFirmaBaja').value != "")
        & (document.getElementById('TipoBaja').value != 0) & (document.getElementById('MotivoBaja').value != 0)
    ) {
        bajaEmpleado();
    }
    else {
        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('infoModal').innerHTML = "Faltan campos por llenar en el área de datos de la baja";
    }
}


//formatea cuialquier fecha
function formatDate(date) {
    var dateResult = '';
    if (date == null || date === "") { dateResult = "31/12/1900"; }
    else {
        try {
            var temp1 = date.split(' ')[0];
            var arr = temp1.split('-');
            if (arr.length > 1) {
                var fech;
                if (arr[0].length > 2) {
                    fech = arr[0] + '/' + arr[1] + '/' + arr[2];
                } else {
                    fech = arr[2] + '/' + arr[1] + '/' + arr[0];
                }
                dateResult = fech;
            } else {
                arr = temp1.split('/');
                if (arr.length > 0) {
                    var fech;
                    if (arr[0].length > 2) {
                        fech = arr[0] + '/' + arr[1] + '/' + arr[2];
                    } else {
                        fech = arr[2] + '/' + arr[1] + '/' + arr[0];
                    }
                    dateResult = fech;
                } else {
                    dateResult = arr;
                }
            }
        } catch (Exception) {
            try {
                var arr = date.split('-');
                if (arr.length > 0) {
                    var fech = arr[0] + '/' + arr[1] + '/' + arr[2];
                    dateResult = fech;
                } else {
                    dateResult = arr;
                }
            } catch (Exception) {
                dateResult = date;
            }
        }
    }
    return dateResult;
}
//Función que limpia los campos de texto
function LimpiarCamposEmp() {
    document.getElementById('NumeroEmpleado').value = "";
    document.getElementById('Site').value = 0;
    document.getElementById('IMSS').value = "";
    document.getElementById('Puesto').value = 0;
    document.getElementById('APaterno').value = "";
    document.getElementById('AMaterno').value = "";
    document.getElementById('Nombre_1').value = "";
    document.getElementById('Nombre_2').value = "";
    document.getElementById('Recluto').value = 0;
    document.getElementById('Genero').value = 0;
    document.getElementById('RFC').value = "";
    document.getElementById('Homoclave').value = "";
    document.getElementById('CURP').value = "";
    document.getElementById('FNacimiento').value = "";
    document.getElementById('FIngreso').value = "";
    document.getElementById('FBaja').value = "";
    document.getElementById('Turno').value = 0;
    document.getElementById('NumeroCuenta').value = "";
    document.getElementById('CLABE').value = "";
    document.getElementById('Banco').value = 0;
    document.getElementById('TelefonoFijo').value = "";
    document.getElementById('TelefonoMovil').value = "";
    document.getElementById('ElaboroContrato').value = 0;
    document.getElementById('Diagnostico').value = "0";
    document.getElementById('PrimerEmpleo').value = 0;
    document.getElementById('Edad').value = "";
    document.getElementById('ExperienciaCallCenter').value = 0;
    document.getElementById('EstadoCivil').value = 0;
    document.getElementById('Hijos').value = "";
    document.getElementById('UltimoGradoDeEstudios').value = 0;
    document.getElementById('Especialidad').value = "";
    document.getElementById('FuenteReclutamiento').value = 0;
    document.getElementById('CapturaPlantilla').value = "0";
    document.getElementById('FAltaIMSS').value = "";
    document.getElementById('Estatus').value = 0;
    document.getElementById('FInsercion').value = "";
    //document.getElementById('numEmp').value = "";
    document.getElementById('Calle').value = "";
    document.getElementById('Numero').value = "";
    document.getElementById('Colonia').value = "";
    document.getElementById('Delegacion').value = "";
    document.getElementById('Ciudad').value = "";
    document.getElementById('CP').value = "";
    document.getElementById('Direccion').value = 0;
    document.getElementById('Departamento').value = 0;
    //document.getElementById('Campania').value = "";
    document.getElementById('FFirmaBaja').value = "";
    document.getElementById('MotivoBaja').value = "";
    document.getElementById('TelefonoContacto').value = "";
    document.getElementById('Observaciones').value = "";

    document.getElementById('Campania').value = 0;
    document.getElementById('TipoNomina').value = 0;
    document.getElementById('Sdo_Diario_IMSS').value = "";
    document.getElementById('Sdo_Diario_Asimilados').value = "";
    document.getElementById('SueldoDiario').value = "";
    document.getElementById('Celular2').value = "";
    document.getElementById('Enfermedad').value = 0;
    document.getElementById('OtraEnfermedad').value = "";
    document.getElementById('Alergias').value = 0;
    document.getElementById('AlregiaC').value = "";
    document.getElementById('OtroGrado').value = "";
    document.getElementById('TituloObtenido').value = "";
    document.getElementById('ContactoEmergencia1').value = "";
    document.getElementById('TelefonoEmergencia1').value = "";
    document.getElementById('ContactoEmergencia2').value = "";
    document.getElementById('TelefonoEmergencia2').value = "";
    document.getElementById('PasatiempoFav').value = "";
    document.getElementById('DeporteFav').value = "";
    document.getElementById('Talento').value = 0;
    document.getElementById('Instrumento').value = "";
    document.getElementById('OtroTalento').value = "";
    document.getElementById('Sdo_Quincenal').value = "";
    document.getElementById('CreditoInfonavit').value = "";
    document.getElementById('Fonacot').value = "";
    document.getElementById('Pensionado').value = "";


}

function LlenarCampos() {
    //document.getElementById('NumeroEmpleado').value = 53602;
    document.getElementById('Site').value = 1;
    document.getElementById('IMSS').value = "12345678912345678912";
    document.getElementById('Puesto').value = 5;
    document.getElementById('APaterno').value = "Perez";
    document.getElementById('AMaterno').value = "Sosa";
    document.getElementById('Nombre_1').value = "Maria";
    document.getElementById('Nombre_2').value = "Juana";
    document.getElementById('Recluto').value = 1;
    document.getElementById('Genero').value = 2;
    document.getElementById('RFC').value = "PESO19940121";
    document.getElementById('Homoclave').value = "GY7";
    document.getElementById('CURP').value = "PESO19940121MDFR1012";
    document.getElementById('FNacimiento').value = "02/05/1999";
    document.getElementById('FIngreso').value = "02/05/2018";
    document.getElementById('FBaja').value = "";
    document.getElementById('Turno').value = 1;
    document.getElementById('NumeroCuenta').value = "12345678912345678912";
    document.getElementById('CLABE').value = "12345678912345678912";
    document.getElementById('Banco').value = 3;
    document.getElementById('TelefonoFijo').value = "54284258";
    document.getElementById('TelefonoMovil').value = "551484856";
    document.getElementById('ElaboroContrato').value = 1;
    document.getElementById('Diagnostico').value = 32;
    document.getElementById('PrimerEmpleo').value = 1;
    document.getElementById('Edad').value = 20;
    document.getElementById('ExperienciaCallCenter').value = 2;
    document.getElementById('EstadoCivil').value = 3;
    document.getElementById('Hijos').value = 0;
    document.getElementById('UltimoGradoDeEstudios').value = 4;
    document.getElementById('Especialidad').value = "NINGUNA";
    document.getElementById('FuenteReclutamiento').value = 5;
    document.getElementById('CapturaPlantilla').value = 1;
    document.getElementById('FAltaIMSS').value = "02/05/2018";
    document.getElementById('Estatus').value = 3;
    document.getElementById('FInsercion').value = "02/05/2018";
}


// Solo numeros 
function numeros(e) {
    var tecla = e.keyCode;
    if (tecla == 8 || tecla == 9 || tecla == 13) {
        return true;
    }
    var patron = /[0-9]/;
    var tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}


// Solo numeros 
function numeros_Sueldo(e) {
    var tecla = e.keyCode;
    if (tecla == 8 || tecla == 9 || tecla == 13) {
        return true;
    }
    var patron = /[0-9.]/;
    var tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}


//solo letras
function letras(e) {
    var tecla = e.keyCode;
    patron = /^[a-zA-ZáéíóúAÉÍÓÚÑñ ]+$/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

//Calcular Edad

function CalcularEdad() {
    var FechaNaci = document.getElementById('FNacimiento').value;
    var FNace = new Date(FechaNaci);
    var fechaActual = new Date();
    var mes = fechaActual.getMonth();
    var dia = fechaActual.getDate();
    var año = fechaActual.getFullYear();
    fechaActual.setDate(dia);
    fechaActual.setMonth(mes);
    fechaActual.setFullYear(año);
    edad = Math.floor(((fechaActual - FNace) / (1000 * 60 * 60 * 24) / 365));
    document.getElementById('Edad').value = edad;
}
//Funcion para mostrar los campos para buscar empleados
function BuscarCampos() {
    document.getElementById('datosBuscarEmp').hidden = false;
    document.getElementById('collapse5').className = "collapse show panel-collapse in";
}


// Funcion par cargar el resultado de la busqueda de los empleados
function cargarBuscarEmpleados() {
    var numEmp = document.getElementById('NumeroEmpleadob').value;
    var nom1 = document.getElementById('Nombre_1b').value;
    var nom2 = document.getElementById('Nombre_2b').value;
    var apep = document.getElementById('APaternob').value;
    var amat = document.getElementById('AMaternob').value;


    if (numEmp != "" || nom1 != "" || nom2 != "" || apep != "" || amat != "") { }


    var buscar = {
        NumeroEmpleado: numEmp,
        APaterno: apep,
        AMaterno: amat,
        Nombre_1: nom1,
        Nombre_2: nom2
    }

    var xmlhttp = new XMLHttpRequest();

    var url = hostInit + "/Empleados/BuscarEmpleados";
    if (numEmp != "" || nom1 != "" || nom2 != "" || apep != "" || amat != "") {
        xmlhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                var EMP = JSON.parse(this.responseText);
                var option = "<option value='0'>Seleccione</option>";
                var i;
                for (i = 0; i < EMP.length; i++) {
                    option += '<option value="' + EMP[i].NumeroEmpleado + '">' + EMP[i].Nombre_1 + ' ' + EMP[i].Nombre_2 + ' ' + EMP[i].APaterno + ' ' + EMP[i].AMaterno + '</option>';
                }
                document.getElementById("ResultadoB").innerHTML = option;
            }
        };
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send(JSON.stringify(buscar));
    } else {
        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
        document.getElementById('myModalLabel').innerHTML = "Advertencia";
        document.getElementById('infoModal').innerHTML = "Debe llenar al menos un campo para realizar la busqueda";
    }
}


 //Funcion par cargar busqueda de los empleados a dar de BAJA
function cargarBuscarEmpleadosBaja() {
    var numEmp = document.getElementById('numEmpleado').value;
    var json = {
        NumeroEmpleado: numEmp
    }
    var xmlhttp = new XMLHttpRequest();
    var url = hostInit + "/Empleados/BuscarEmpleadosBaja";
    if (numEmp != "") {
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                var html = '<table id="tableEmpleadoBaja" class="table table-bordered table-hover" style="margin-top:15px">';
                    html += '<thead class="text-center table-primary">';
                    html += '<tr>';
                    html += '<th> No. Empleado </th>';
                    html += '<th> Nombre Comleto</th>';
                    html += '<th> RFC </th>';
                    html += '<th> Puesto </th>';
                    html += '<th> Turno </th>';
                    html += '<th> Campaña </th>';
                    html += '<th> Fecha Ingreso </th>';
                    html += '<th> Antigüedad </th>';
                    html += '<th> Estatus </th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody class="tbody">';
                var i;
                for (i = 0; i < result.length; i++) {
                    html += '<tr>';
                    html += '<td>' + result[i].NumeroEmpleado + '</td>';
                    html += '<td>' + result[i].NombreCompleto + '</td>';
                    html += '<td>' + result[i].RFC + '</td>';
                    html += '<td>' + result[i].Puesto + '</td>';
                    html += '<td>' + result[i].Turno + '</td>';
                    html += '<td>' + result[i].Campania + '</td>';
                    html += '<td>' + result[i].FIngreso + '</td>';
                    html += '<td>' + result[i].Antiguedad + ' años</td>';
                    html += '<td>' + result[i].Estatus + '</td>';
                    html += '</tr>';
                }
                html += '</tbody>';
                html += '</table>';

                $('#tablaEmpleados').html(html);

                $('#tablaEmpleados').DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        'excel'
                    ]
                });
                document.getElementById("numEmpleado").value = "";
            }
        };
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(json));
    } else {
        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
        document.getElementById('myModalLabel').innerHTML = "Advertencia";
        document.getElementById('infoModal').innerHTML = "Debe llenar campo para realizar la busqueda";
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------*/

//function CargarCalificacionesCurso() {
//    if (document.getElementById('Fechainicio').value != "" || document.getElementById('Fechafin').value != "" || document.getElementById('idCurso').value != 0) {
//        if (document.getElementById('idCurso').value != 0) {
//            var xml = new XMLHttpRequest();
//            var url = hostInit + "/Curso/CargarCursosConCalificaciones";
//            var json = {
//                IdCurso: document.getElementById('idCurso').value,
//                FechaInicio: formatDate(document.getElementById('Fechainicio').value),
//                FechaFin: formatDate(document.getElementById('Fechafin').value)
//            }
//            xml.onreadystatechange = function () {
//                if (this.readyState == 4 && this.status == 200) {
//                    var result = JSON.parse(this.responseText);
//                    var html = '<table id="tableCalifica" class="table table-bordered table-hover" style="margin-top:15px">';
//                    html += '<thead class="text-center table-dark">';
//                    html += '<tr>';
//                    html += '<th> No. Empleado </th>';
//                    html += '<th> Nombre </th>';
//                    html += '<th> RFC </th>';
//                    html += '<th> Puesto </th>';
//                    html += '<th> Turno </th>';
//                    html += '<th> Supervisor </th>';
//                    html += '<th> Tipo Curso </th>';
//                    html += '<th> Nombre del Curso </th>';
//                    html += '<th> Campaña </th>';
//                    html += '<th> Fecha Ingreso </th>';
//                    html += '<th> Antigüedad </th>';
//                    html += '<th> Calificacion </th>';
//                    html += '<th> Fecha Certificacion </th>';
//                    html += '<th> Estatus </th>';
//                    html += '<th> Certificado </th>';
//                    html += '</tr>';
//                    html += '</thead>';
//                    html += '<tbody class="tbody">';
//                    var i;
//                    for (i = 0; i < result.length; i++) {
//                        html += '<tr>';
//                        html += '<td>' + result[i].NumEmpleado + '</td>';
//                        html += '<td>' + result[i].NombreCompleto + '</td>';
//                        html += '<td>' + result[i].RFC + '</td>';
//                        html += '<td>' + result[i].Puesto + '</td>';
//                        html += '<td>' + result[i].Turno + '</td>';
//                        html += '<td>' + result[i].Supervisor + '</td>';
//                        html += '<td>' + result[i].Tipo + '</td>';
//                        html += '<td>' + result[i].Curso + '</td>';
//                        html += '<td>' + result[i].Campana + '</td>';
//                        html += '<td>' + result[i].FechaIngreso + '</td>';
//                        html += '<td>' + result[i].Antiguedad + ' años</td>';
//                        html += '<td>' + result[i].Calificacion + '</td>';
//                        html += '<td>' + result[i].FechaCertificado + '</td>';
//                        html += '<td>' + result[i].Aprobado + '</td>';
//                        if (result[i].Aprobado == "APROBADO") {
//                            html += "<td><button title='Ver Certificado' onclick=\"VerCertificadoAdmin('" + result[i].FechaCertificado + "','" + result[i].Calificacion + "','" + result[i].NombreCompleto + "','" + result[i].Leyenda + "','" + result[i].Descripcion + "')\" class='btn' style='background:#4682b4; color:white; width: 50px;'><i class='fas fa-eye'></i></button></td>";
//                        } else {
//                            html += '<td></td>';
//                        }

//                        html += '</tr>';
//                    }
//                    html += '</tbody>';
//                    html += '</table>';

//                    $('#tablaCalificaciones').html(html);

//                    $('#tableCalifica').DataTable({
//                        dom: 'Bfrtip',
//                        buttons: [
//                            'excel'
//                        ]
//                    });
//                    document.getElementById("idCurso").value = 0;
//                    document.getElementById("Fechainicio").value = "";
//                    document.getElementById("Fechafin").value = "";
//                }
//            };

//            xml.open("POST", url, true);
//            xml.setRequestHeader("Content-Type", "application/json");
//            xml.send(JSON.stringify(json));
//        } else {
//            alertify.error("Debes ingresar el curso a buscar");
//        }

//    } else {
//        alertify.error("Ingresar al menos un criterio para generar el reporte");
//    }
//}


//Método que manda a llamar la busqueda de la información del empleado seleccionado
function SeleccionaEmpleadoBus() {
    var emple = document.getElementById('ResultadoB').value;
    buscarEmpleado(emple);
}

//Select dinamico de Direccion => Departamento
function SelectDinamicoDireccion() {
    var opt = document.getElementById('Direccion').value;
    var json = {
        IDDireccion: opt
    }
    var direc = ["Administración y Finanzas", "Contraloría", "Comercial", "Calidad", "Recursos Humanos", "Proyectos", "Operaciones", "Seguridad de la Información", "Tecnologías de la Información"];
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/CargarDepartamentos/";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            if (myArr != "") {
                console.log(myArr[0].IDDireccion);
                var out = '<option value="0">Seleccione</option>';
                out += '<optgroup label="' + direc[myArr[0].IDDireccion  -1 ] + '">';
                var i;
                for (i = 0; i < myArr.length; i++) {
                    out += '<option value="' + myArr[i].IDDepartamento + '">' + myArr[i].Descripcion + '</option>';
                }
                out += "</optgroup>";
                document.getElementById("Departamento").innerHTML = out;
            } else {
                document.getElementById('Departamento').innerHTML = "<option value='0'>Selecciona</option>";
            }
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(json));
}

//Método que manda a llamar la busqueda de la información del empleado seleccionado
function SeleccionaEmpleadoBus_Sueldo() {
    var emple = document.getElementById('ResultadoB').value;
    buscarEmpleado_Sueldo(emple);
}

//Función para buscar empleado, y poder ingresar su sueldo
function buscarEmpleado_Sueldo(emple) {
    var json = { NumeroEmpleado: emple }

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/BuscarEmpleado/";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result.id_Empleado == 0) {
                document.getElementById('myModal1').style.display = 'block';
                document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                document.getElementById('myModalLabel').innerHTML = "Advertencia";
                document.getElementById('infoModal').innerHTML = "Numero de empleado no existe en la base";
            } else {
                document.getElementById('Div_Sueldo').hidden = false;
                document.getElementById('collapse').className = "collapse show panel-collapse in";
                document.getElementById('id_Empleado').value = result.id_Empleado;
                document.getElementById('NumeroEmpleado').value = result.NumeroEmpleado;
                document.getElementById('APaterno').value = result.APaterno;
                document.getElementById('AMaterno').value = result.AMaterno;
                document.getElementById('Nombre_1').value = result.Nombre_1;
                document.getElementById('Nombre_2').value = result.Nombre_2;
                document.getElementById('TipoNomina').value = result.TipoNomina;
                if (result.TipoNomina == "ASIMILADOS") {
                    document.getElementById("Div_Asimilados").hidden = false;
                } else if (result.TipoNomina == "IMSS") {
                    document.getElementById("Div_IMSS").hidden = false;
                } else if (result.TipoNomina == "AMBAS") {
                    document.getElementById("Div_IMSS").hidden = false;
                    document.getElementById("Div_Asimilados").hidden = false;
                }
                document.getElementById('Sdo_Diario_Asimilados').value = result.Sdo_Diario_Asimilados;
                document.getElementById('Sdo_Diario_IMSS').value = result.Sdo_Diario_IMSS;
                document.getElementById('ResultadoB').innerHTML = "";
                document.getElementById('datosBuscarEmp').hidden = true;
            }
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

//Función para Insertar los datos del sueldo del empleado
function Insertar_Sueldo() {
    if (document.getElementById('TipoNomina').value != 0 && ((document.getElementById('Sdo_Diario_Asimilados').value != "" || document.getElementById('Sdo_Diario_Asimilados').value != "0") || (document.getElementById('Sdo_Diario_IMSS').value != "" || document.getElementById('Sdo_Diario_IMSS').value != "0"))) {
        var xml = new XMLHttpRequest();
        var url = hostInit + "/Empleados/Insertar_Sueldo";
        var json = {
            Id_Empleado: document.getElementById('id_Empleado').value,
            //Banco: document.getElementById('Banco').value,
            //CLABE: document.getElementById('CLABE').value,
            //NumeroCuenta: document.getElementById('NumeroCuenta').value,
            TipoNomina: document.getElementById('TipoNomina').value,
            Sdo_Diario_Asimilados: document.getElementById('Sdo_Diario_Asimilados').value,
            Sdo_Diario_IMSS: document.getElementById('Sdo_Diario_IMSS').value
        }

        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                console.log(result);
                if (result == 1 || result == 2) {
                    alertify.alert("Información guardada con exito");
                    Limpiar_RegistroSueldo();
                } else {
                    alertify.error("Error al guardar información");
                }
            }
        };

        xml.open("POST", url, true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(json));
    } else {
        alertify.alert("Ingresar los datos solicitados");
    }
}

//Funcion para mostrar campos dependiendo del topo de nomina
function Tipo_Nomina() {
    var tipo = document.getElementById("TipoNomina").value;
    if (tipo == "IMSS") {
        document.getElementById("Div_Asimilados").hidden = true;
        document.getElementById("Div_IMSS").hidden = false;
        document.getElementById("Div_Sueldo_Quinc").hidden = false;
        document.getElementById("Sdo_Quincenal").value = "";
        document.getElementById("SueldoDiario").value = "";
        document.getElementById("Sdo_Diario_Asimilados").value = "";
        document.getElementById("Sdo_Diario_IMSS").value = "";
        document.getElementById("SueldoDiario").disabled = true;
    } else if (tipo == "ASIMILADOS") {
        document.getElementById("Div_IMSS").hidden = true;
        document.getElementById("Div_Asimilados").hidden = false;
        document.getElementById("Div_Sueldo_Quinc").hidden = true;
        document.getElementById("Sdo_Quincenal").value = "";
        document.getElementById("SueldoDiario").value = "";
        document.getElementById("Sdo_Diario_Asimilados").value = "";
        document.getElementById("Sdo_Diario_IMSS").value = "";
        document.getElementById("SueldoDiario").disabled = false;
    } else if (tipo == "AMBAS") {
        document.getElementById("Div_IMSS").hidden = false;
        document.getElementById("Div_Asimilados").hidden = false;
        document.getElementById("Div_Sueldo_Quinc").hidden = false;
        document.getElementById("Sdo_Quincenal").value = "";
        document.getElementById("SueldoDiario").value = "";
        document.getElementById("Sdo_Diario_Asimilados").value = "";
        document.getElementById("Sdo_Diario_IMSS").value = "";
        document.getElementById("SueldoDiario").disabled = true;
    } else {
        document.getElementById("Div_IMSS").hidden = true;
        document.getElementById("Div_Asimilados").hidden = true;
        document.getElementById("Div_Sueldo_Quinc").hidden = true;
        document.getElementById("Sdo_Quincenal").value = "";
        document.getElementById("SueldoDiario").value = "";
        document.getElementById("Sdo_Diario_Asimilados").value = "";
        document.getElementById("Sdo_Diario_IMSS").value = "";
        document.getElementById("SueldoDiario").disabled = true;
    }
}

//Funcion que habilita o deshabilita el select de campania
function SelectCampania(){
    if (document.getElementById('Departamento').value == 14) {
        document.getElementById('Campania').disabled = false;
    } else {
        document.getElementById('Campania').value = 0;
        document.getElementById('Campania').disabled = true;
    }
}

//Function para el modal de los hijos 
function ModalHijos() {
    var h = document.getElementById('Hijos').value;
    if (h > 0) {
        document.getElementById('btn_ModalHijos').click();
        var inputs = '';
        for (var i = 0; i < h; i++) {
            inputs += '<label> Hijo ' + (i + 1) + ':</label>';
            inputs += '<input type="text" class="form-control" id="hijo' + (i + 1) + '" name="h" /><br />';
        }
        document.getElementById('body_ModalHijos').innerHTML = inputs;
        var n = document.querySelectorAll('input[name="h"]');
        for (var i = 0; i < n.length; i++) {
            $(n).datepicker(dataCalendar);
        }
    }
}

//Funcion que valida los campos de las edades de los hijos en caso de que se tenga hijos
function ValidaHijos() {
    var n = document.querySelectorAll('input[name="h"]');
    var h;
    for (var i = 0; i < n.length; i++) {
        if (n[i].value != "") {
            h = true;
        } else {
            return false;
            break;
        }
    }
    return h;
}


//Funcion que trae todos los hijos 
function TraerHijos() {
    var n = document.querySelectorAll('input[name="h"]');
    for (var i = 0; i < n.length; i++) {
        InsertarHijos(document.getElementById('id_Empleado').value, formatDate(n[i].value));
    }
}

//Funcion que manda e inserta los hijos
function InsertarHijos(Id_empleado, FechaNacHijo) {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/InsertaHijos";
    var json = {
        Id_Empleado: Id_empleado,
        FechaNacHijo: FechaNacHijo
    }
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var r = JSON.parse(this.responseText);
            if (r != "") {
                console.log("Correcto");
            } else {
                console.error("Error");
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

//Calcular el salario diario y quincenal
function calcularSalario() {
    var sdoMensual = document.getElementById('Sdo_Diario_IMSS').value;
    document.getElementById('Sdo_Quincenal').value = sdoMensual / 2;
    document.getElementById('SueldoDiario').value = sdoMensual / 30;
}


//Validar si estan los campos llenos
var datos =
    ['Recluto', 'FuenteReclutamiento', 'EstatusReclutamiento', 'Segmento', 'Puesto', 'FechaCapa', 'FechaCita', 'EstatusCita', 'APaterno', 'AMaterno', 'Nombre'
        , 'FNacimiento', 'Edad', 'Genero', 'TelFijo', 'TelMovil', 'TelRecados', 'PrimerEmpleo', 'ExperienciaCallCenter', 'EstadoCivil', 'Hijos2', 'UltimoGradoDeEstudios'
        , 'OtroGrado', 'Especialidad', 'TituloObtenido', 'Enfermedad', 'OtraEnfermedad', 'Alergias', 'AlregiaC', 'Credito', 'CredVig', 'ControlMedico', 'ContactoEmergencia1'
        , 'TelefonoEmergencia1', 'ContactoEmergencia2', 'TelefonoEmergencia2', 'tipoRegimenCIF', 'calleCIF', 'coloniaCIF', 'poblacionCIF', 'entidadCIF', 'cpCIF'
    ];
function validarCamposCan() {
    if ((document.getElementById('Recluto').value != 0)                     & (document.getElementById('FuenteReclutamiento').value != 0)
        & (document.getElementById('EstatusReclutamiento').value != 0)      & (document.getElementById('Segmento').value != 0)
        & (document.getElementById('Puesto').value != 0)                    & (document.getElementById('FechaCapa').value != "")
        & (document.getElementById('FechaCita').value != "")                & (document.getElementById('EstatusCita').value != 0)
        & (document.getElementById('APaterno').value != "")                 & (document.getElementById('AMaterno').value != "")
        & (document.getElementById('Nombre').value != "")                   & (document.getElementById('FNacimiento').value != "")
        & (document.getElementById('Edad').value != "")                     & (document.getElementById('Genero').value != 0)
        & (document.getElementById('TelFijo').value != "")                  & (document.getElementById('TelMovil').value != "")
        & (document.getElementById('TelRecados').value != "")               & (document.getElementById('PrimerEmpleo').value != 0)
        & (document.getElementById('ExperienciaCallCenter').value != 0)     & (document.getElementById('EstadoCivil').value != 0)
        & (document.getElementById('Hijos2').value != 0)                    & (document.getElementById('UltimoGradoDeEstudios').value != "")
        & (document.getElementById('OtroGrado').value != "")                & (document.getElementById('Especialidad').value != "")
        & (document.getElementById('TituloObtenido').value != "")           & (document.getElementById('Enfermedad').value != "")
        & (document.getElementById('OtraEnfermedad').value != 0)            & (document.getElementById('Alergias').value != "")
        & (document.getElementById('AlregiaC').value != "")                 & (document.getElementById('Credito').value != "")
        & (document.getElementById('CredVig').value != "")                  & (document.getElementById('ControlMedico').value != "")
        & (document.getElementById('ContactoEmergencia1').value != 0)       & (document.getElementById('TelefonoEmergencia1').value != "")
        & (document.getElementById('ContactoEmergencia2').value != "")      & (document.getElementById('TelefonoEmergencia2').value != "")
        & (document.getElementById('tipoRegimenCIF').value != 0)            & (document.getElementById('calleCIF').value != "")
        & (document.getElementById('coloniaCIF').value != 0)                & (document.getElementById('coloniaCIF').value != "")
        & (document.getElementById('poblacionCIF').value != "")             & (document.getElementById('entidadCIF').value != "")
        & (document.getElementById('cpCIF').value != 0))
    {
        InsertarCandidato();
    }
    else
    {
        var inputs = document.getElementsByName('obg');
        /*console.log(inputs);*/
        for (var i = 0; i < inputs.length; i++) {

            if (inputs[i].value == "" || inputs[i].value == 0) {
                console.log("Falta " + campos[i]);
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


//Funcion para agregar un empleado
function InsertarCandidato() {

    var json = {
        NumeroEmpleado: document.getElementById('NumeroEmpleado').value,
        Site: document.getElementById('Site').value,
        IMSS: document.getElementById('IMSS').value,
        Puesto: document.getElementById('Puesto').value,
        APaterno: document.getElementById('APaterno').value,
        AMaterno: document.getElementById('AMaterno').value,
        Nombre_1: document.getElementById('Nombre_1').value,
        Nombre_2: nom2 = document.getElementById('Nombre_2').value,
        Recluto: document.getElementById('Recluto').value,
        Genero: document.getElementById('Genero').value,
        RFC: document.getElementById('RFC').value,
        Homoclave: document.getElementById('Homoclave').value,
        CURP: document.getElementById('CURP').value,
        FNacimiento: formatDate(document.getElementById('FNacimiento').value),
        FIngreso: formatDate(document.getElementById('FIngreso').value),
        FBaja: formatDate(document.getElementById('FBaja').value),
        Turno: document.getElementById('Turno').value,
        NumeroCuenta: document.getElementById('NumeroCuenta').value,
        CLABE: document.getElementById('CLABE').value,
        Banco: document.getElementById('Banco').value,
        TelefonoFijo: document.getElementById('TelefonoFijo').value,
        TelefonoMovil: document.getElementById('TelefonoMovil').value,
        ElaboroContrato: document.getElementById('ElaboroContrato').value,
        Diagnostico: document.getElementById('Diagnostico').value,
        PrimerEmpleo: document.getElementById('PrimerEmpleo').value,
        ExperienciaEnCallCenter: document.getElementById('ExperienciaCallCenter').value,
        EstadoCivil: document.getElementById('EstadoCivil').value,
        Hijos: document.getElementById('Hijos').value,
        UltimoGradoEstudios: document.getElementById('UltimoGradoDeEstudios').value,
        Especialidad: document.getElementById('Especialidad').value,
        FuenteReclutamiento: document.getElementById('FuenteReclutamiento').value,
        FAltaIMSS: formatDate(document.getElementById('FAltaIMSS').value),
        Estatus: 1,
        Calle: document.getElementById('Calle').value,
        Numero: document.getElementById('Numero').value,
        Colonia: document.getElementById('Colonia').value,
        Delegacion: document.getElementById('Delegacion').value,
        Ciudad: document.getElementById('Ciudad').value,
        CP: document.getElementById('CP').value,
        IdDireccion: document.getElementById('Direccion').value,
        IdDepartamento: document.getElementById('Departamento').value,
        Usuario: sessionStorage.getItem('usuario'),
        SueldoDiario: document.getElementById('SueldoDiario').value,
        Campania: document.getElementById("Campania").value,
        Celular2: document.getElementById('Celular2').value,
        Enfermedad: document.getElementById('Enfermedad').value,
        OtraEnfermedad: document.getElementById('OtraEnfermedad').value,
        Alergias: document.getElementById('Alergias').value,
        AlregiaC: document.getElementById('AlregiaC').value,
        OtroGrado: document.getElementById('OtroGrado').value,
        TituloObtenido: document.getElementById('TituloObtenido').value,
        ContactoEmergencia1: document.getElementById('ContactoEmergencia1').value,
        TelefonoEmergencia1: document.getElementById('TelefonoEmergencia1').value,
        ContactoEmergencia2: document.getElementById('ContactoEmergencia2').value,
        TelefonoEmergencia2: document.getElementById('TelefonoEmergencia2').value,
        PasatiempoFav: document.getElementById('PasatiempoFav').value,
        DeporteFav: document.getElementById('DeporteFav').value,
        Talento: document.getElementById('Talento').value,
        Instrumento: document.getElementById('Instrumento').value,
        OtroTalento: document.getElementById('OtroTalento').value,
        TipoNomina: document.getElementById('TipoNomina').value,
        Sdo_Diario_Asimilados: document.getElementById('Sdo_Diario_Asimilados').value,
        Sdo_Diario_IMSS: document.getElementById('Sdo_Diario_IMSS').value,
        Sdo_quincenal: document.getElementById('Sdo_Quincenal').value,
        Infonavit: document.getElementById('CreditoInfonavit').value,
        Fonacot: document.getElementById('Fonacot').value,
        Pensionado: document.getElementById('Pensionado').value,

    };
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/InsertarEmpleado";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result.NumeroEmpleado == "") {
                document.getElementById('myModal1').style.display = 'block';
                document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                document.getElementById('myModalLabel').innerHTML = "Advertencia";
                document.getElementById('infoModal').innerHTML = "Empleado ya existe en la base de datos";

                document.getElementById('RFC').value = "";
                document.getElementById('RFC').focus();
            } else {
                if (document.getElementById('Hijos').value > 0) {
                    document.getElementById('id_Empleado').value = result.id_Empleado;
                    TraerHijos();
                    //document.getElementById('myModal1').style.display = 'block';
                    //document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                    //document.getElementById('myModalLabel').innerHTML = "Correcto";
                    //document.getElementById('infoModal').innerHTML = "Empleado registrado con exito <br /> Número de empleado asignado: " + result.NumeroEmpleado;
                    //LimpiarCampos();

                    alertify.alert("Notificación", "Empleado registrado con exito <br /> Número de empleado asignado: " + result.NumeroEmpleado).set({
                        'invokeOnCloseOff': true, 'onok': function () {
                            location.reload();
                        }
                    });
                } else {
                    //document.getElementById('myModal1').style.display = 'block';
                    //document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                    //document.getElementById('myModalLabel').innerHTML = "Correcto";
                    //document.getElementById('infoModal').innerHTML = "Empleado registrado con exito <br /> Número de empleado asignado: " + result.NumeroEmpleado;
                    //LimpiarCampos();


                    alertify.alert("Notificación", "Empleado registrado con exito <br /> Número de empleado asignado: " + result.NumeroEmpleado).set({
                        'invokeOnCloseOff': true, 'onok': function () {
                            location.reload();
                        }
                    });
                }
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}
