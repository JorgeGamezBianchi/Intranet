//Función que carga el Select del genero del empleado
//function cargarGeneros_UPD() {
//    var xml = new XMLHttpRequest();
//    var url = hostInit + "/Empleados/CargarGeneros";

//    xml.onreadystatechange = function () {
//        if (this.readyState == 4 && this.status == 200) {
//            var result = JSON.parse(this.responseText);
//            var opt = '';
//            for (var i = 0; i < result.length; i++) {
//                opt += '<option value="' + result[i].Valor + '">' + result[i].Texto + '</option>';
//            }
//            document.getElementById('Sexo').innerHTML = opt;
//        }
//    };

//    xml.open("GET", url, true);
//    xml.send();
//}

//Función que carga el Select de Estado civil del empleado
//function cargarEstadosCiviles_UPD() {

//    var xml = new XMLHttpRequest();
//    var url = hostInit + "/Empleados/CargarEstadosCiviles";

//    xml.onreadystatechange = function () {
//        if (this.readyState == 4 && this.status == 200) {
//            var result = JSON.parse(this.responseText);
//            var opt = '';
//            for (var i = 0; i < result.length; i++) {
//                opt += '<option value="' + result[i].id_EstadoCivil + '">' + result[i].EstadoCivil + '</option>';
//            }
//            document.getElementById('EstadoCivil').innerHTML = opt;
//        }
//    };

//    xml.open("GET", url, true);
//    xml.send();
//}

//Función que carga el Select de Estudios


//-----Metodo para llenar select de Camapañas
function CargarCamapanas_Emp() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Operacion/CargarCampanias";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '<option value="0">Sin campaña</option>';
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].Id_Campania + '">' + result[i].Campania + '</option>';
            }
            document.getElementById('IdCampana').innerHTML = opt;
        }
    };

    xml.open("GET", url, true);
    xml.send();
}



//Funcion para carcar Select de los Site
//function cargarSite() {

//    var xml = new XMLHttpRequest();
//    var url = hostInit + "/Empleados/Site";

//    xml.onreadystatechange = function () {
//        if (this.readyState == 4 && this.status == 200) {
//            var result = JSON.parse(this.responseText);
//            var opt = '';
//            for (var i = 0; i < result.length; i++) {
//                opt += '<option value="' + result[i].Id_plaza + '">' + result[i].Plaza + '</option>';
//            }
//            document.getElementById('Site').innerHTML = opt;
//        }
//    };
//    xml.open("GET", url, true);
//    xml.send();
//}


//Función que carga el Select con los puestos
//function cargarPuesto() {
//    var xml = new XMLHttpRequest();
//    var url = hostInit + "/Empleados/Puesto";

//    xml.onreadystatechange = function () {
//        if (this.readyState == 4 && this.status == 200) {
//            var result = JSON.parse(this.responseText);
//            var opt = '<option value="0">Seleccione</option>';
//            for (var i = 0; i < result.length; i++) {
//                opt += '<option value="' + result[i].id_Puesto + '">' + result[i].Puesto + '</option>';
//            }
//            document.getElementById('Puesto').innerHTML = opt;
//        }
//    };
//    xml.open("GET", url, true);
//    xml.send();
//}

//Funcion que carga el Select con los turnos
//function cargarTurnos() {

//    var xml = new XMLHttpRequest();
//    var url = hostInit + "/Empleados/Turno";

//    xml.onreadystatechange = function () {
//        if (this.readyState == 4 && this.status == 200) {
//            var result = JSON.parse(this.responseText);
//            var opt = '';
//            for (var i = 0; i < result.length; i++) {
//                opt += '<option value="' + result[i].id_Turno + '">' + result[i].Turno + '</option>';
//            }
//            document.getElementById('Turno').innerHTML = opt;
//        }
//    };
//    xml.open("GET", url, true);
//    xml.send();
//}


//Función que limpia los campos de texto
function LimpiarCampos_Emp() {
    document.getElementById('NumeroEmpleado').value = "";
    document.getElementById('Site').value = 0;
    document.getElementById('Puesto').value = 0;
    document.getElementById('NombreCompleto').value = "";
    document.getElementById('Sexo').value = 0;
    document.getElementById('FNacimiento').value = "";
    document.getElementById('FIngreso').value = "";
    document.getElementById('Turno').value = 0;
    document.getElementById('TelefonoFijo').value = "";
    document.getElementById('Celular1').value = "";
    document.getElementById('Celular1').value = "";
    document.getElementById('Enfermedad').value = 0;
    document.getElementById('OtraEnfermedad').value = "";
    document.getElementById('Edad').value = "";
    document.getElementById('EstadoCivil').value = 0;
    document.getElementById('Hijos').value = "";
    document.getElementById('UltimoGradoDeEstudios').value = 0;
    document.getElementById('OtroGrado').value = "";
    document.getElementById('TituloObtenido').value = "";
    document.getElementById('ContactoEmergencia1').value = "";
    document.getElementById('TelefonoEmergencia1').value = "";
    document.getElementById('ContactoEmergencia2').value = "";
    document.getElementById('TelefonoEmergencia2').value = "";
    document.getElementById('FIngreso').value = "";
    document.getElementById('Calle').value = "";
    document.getElementById('Numero').value = "";
    document.getElementById('Colonia').value = "";
    document.getElementById('Delegacion').value = "";
    document.getElementById('Ciudad').value = "";
    document.getElementById('CP').value = "";
    document.getElementById('IdCampana').value = "";
    document.getElementById('PasatiempoFav').value = "";
    document.getElementById('DeporteFav').value = "";
    document.getElementById('Alergias').value = 0;
    document.getElementById('AlregiaC').value = "";
    document.getElementById('Talento').value = 0;
    document.getElementById('Instrumento').value = "";
    document.getElementById('Div_Instrumento').hidden = true;
    document.getElementById('OtroTalento').value = "";
    document.getElementById('Div_OtroTalento').hidden = true;
    document.getElementById('Div_Alergia').hidden = true;
    document.getElementById('Div_OtraEnfermedad').hidden = true;
    document.getElementById('Div_OtroGrado').hidden = true;
}

// Solo numeros 

//function numeros(e) {
//    var tecla = e.keyCode;

//    if (tecla == 8 || tecla == 9 || tecla == 13) {
//        return true;
//    }

//    var patron = /[0-9]/;
//    var tecla_final = String.fromCharCode(tecla);
//    return patron.test(tecla_final);
//}

// Solo numeros 

//function numeros_Sueldo(e) {
//    var tecla = e.keyCode;

//    if (tecla == 8 || tecla == 9 || tecla == 13) {
//        return true;
//    }

//    var patron = /[0-9.]/;
//    var tecla_final = String.fromCharCode(tecla);
//    return patron.test(tecla_final);
//}

////solo letras
//function letras(e) {
//    var tecla = e.keyCode;
//    patron = /^[a-zA-ZáéíóúAÉÍÓÚÑñ ]+$/;
//    tecla_final = String.fromCharCode(tecla);
//    return patron.test(tecla_final);
//}
//Calcular Edad

//function CalcularEdad() {
//    var FechaNaci = document.getElementById('FNacimiento').value;
//    var fechaNace = new Date(FechaNaci);
//    var fechaActual = new Date();
//    var mes = fechaActual.getMonth();
//    var dia = fechaActual.getDate();
//    var año = fechaActual.getFullYear();
//    fechaActual.setDate(dia);
//    fechaActual.setMonth(mes);
//    fechaActual.setFullYear(año);
//    edad = Math.floor(((fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365));
//    document.getElementById('Edad').value = edad;
//}

//-------------------------------funciones para ocultar o mostrar los campos para agregar datos en cuales sean necesarios (opcion otro u alergia epecificar------------------

function OtroEstudio() {
    let opt = document.getElementById('UltimoGradoDeEstudios').value;
    if (opt == 19) {
        document.getElementById('Div_OtroGrado').hidden = false;
    } else {
        document.getElementById('Div_OtroGrado').value = "";
        document.getElementById('Div_OtroGrado').hidden = true;
    }
}

function Definir_Enfermedad() {
    let otra = document.getElementById('Enfermedad').value;
    if (otra == "otra") {
        document.getElementById('Div_OtraEnfermedad').hidden = false;
    } else {
        document.getElementById('OtraEnfermedad').value = "";
        document.getElementById('Div_OtraEnfermedad').hidden = true;
    }
}

function Alergia() {
    let al = document.getElementById('Alergias').value;
    if (al == "Si") {
        document.getElementById('Div_Alergia').hidden = false;
    } else {
        document.getElementById('AlregiaC').value = "";
        document.getElementById('Div_Alergia').hidden = true;
    }
}

function DefinirTalento() {
    let otro = document.getElementById('Talento').value;
    if (otro == "otro") {
        document.getElementById('Div_OtroTalento').hidden = false;
        document.getElementById('Instrumento').value = "";
        document.getElementById('Div_Instrumento').hidden = true;
    } else if (otro == "Tocar instrumento") {
        document.getElementById('Div_Instrumento').hidden = false;
        document.getElementById('OtroTalento').value = "";
        document.getElementById('Div_OtroTalento').hidden = true;
    } else {
        document.getElementById('OtroTalento').value = "";
        document.getElementById('Div_OtroTalento').hidden = true;
        document.getElementById('Instrumento').value = "";
        document.getElementById('Div_Instrumento').hidden = true;
    }
}

//------------------------------ Terminan las funciones de validaciones ------------------------------------

//Funcion que se ejecuta en cuanto el usuario entre en la página y cargue la información que se tiene de ese usuario
function CargarDatos_Emp() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/Buscar_Info_Emp";
    var json = {
        NumEmpleado: sessionStorage.getItem('usuario')
    }
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result.length != 0) {
                //console.log(result);
                document.getElementById("Id_Empleado").value = result.Id_Empleado;
                document.getElementById('NumeroEmpleado').value = result.NumEmpleado;
                document.getElementById('Site').value = result.Site;

                document.getElementById('Puesto').value = result.Puesto;
                document.getElementById('NombreCompleto').value = result.NombreCompleto;
                //document.getElementById('AMaterno').value = result.AMaterno;
                //document.getElementById('Nombre_1').value = result.Nombre_1;
                //document.getElementById('Nombre_2').value = result.Nombre_2;

                document.getElementById('Sexo').value = result.Sexo;


                document.getElementById('FNacimiento').value = formatDate(result.FNacimiento);
                document.getElementById('FIngreso').value = formatDate(result.FIngreso);
                document.getElementById('IdCampana').value = result.IdCampana;
                document.getElementById('Turno').value = result.Turno;
                //document.getElementById('TelefonoFijo').value = result.TelefonoFijo;
                //document.getElementById('Celular1').value = result.Celular1;
                //document.getElementById('Celular1').value = result.Celular2;
                //document.getElementById('Enfermedad').value = result.Enfermedad;
                //if (result.OtraEnfermedad != null || result.OtraEnfermedad != "") {
                //    document.getElementById('Div_OtraEnfermedad').hidden = false;
                //    document.getElementById('OtraEnfermedad').value = result.OtraEnfermedad;
                //} else {
                //    document.getElementById('OtraEnfermedad').value = "";
                //}

                //document.getElementById('Edad').value = result.Edad;

                //document.getElementById('EstadoCivil').value = result.EstadoCivil;
                //document.getElementById('Hijos').value = result.Hijos;
                //document.getElementById('UltimoGradoDeEstudios').value = result.UltimoGradoDeEstudios;
                //if (result.OtroGrado != "") {
                //    document.getElementById('Div_OtroGrado').hidden = false;
                //    document.getElementById('OtroGrado').value = result.OtroGrado;
                //} else {
                //    document.getElementById('OtroGrado').value = "";
                //}

                //document.getElementById('TituloObtenido').value = result.TituloObtenido;
                //document.getElementById('ContactoEmergencia1').value = result.ContactoEmergencia1;
                //document.getElementById('TelefonoEmergencia1').value = result.TelefonoEmergencia1;
                //document.getElementById('ContactoEmergencia2').value = result.ContactoEmergencia2;
                //document.getElementById('TelefonoEmergencia2').value = result.TelefonoEmergencia2;
                //document.getElementById('Calle').value = result.Calle;
                //document.getElementById('Numero').value = result.Numero;
                //document.getElementById('Colonia').value = result.Colonia;
                //document.getElementById('Delegacion').value = result.Delegacion;
                //document.getElementById('Ciudad').value = result.Ciudad;
                //document.getElementById('CP').value = result.CP;

                //document.getElementById('PasatiempoFav').value = result.PasatiempoFav;
                //document.getElementById('DeporteFav').value = result.DeporteFav;
                //document.getElementById('Alergias').value = result.Alergias;
                //if (result.AlergiaC != "") {
                //    document.getElementById('Div_Alergia').hidden = false;
                //    document.getElementById('AlregiaC').value = result.AlergiaC;
                //} else {
                //    document.getElementById('AlregiaC').value = "";
                //}

                //document.getElementById('Talento').value = result.Talento;
                //if (result.Instrumento != "") {
                //    document.getElementById('Instrumento').value = result.Intrumento;
                //    document.getElementById('Div_Instrumento').hidden = false;
                //} else {
                //    document.getElementById('Instrumento').value = "";
                //}
                //if (result.OtroTalento != "") {
                //    document.getElementById('OtroTalento').value = result.OtroTalento;
                //    document.getElementById('Div_OtroTalento').hidden = false;
                //} else {
                //    document.getElementById('OtroTalento').value = "";
                //}

                CalcularEdad();
            } else {
                alertify.alert("Error al buscar datos del empleado");
            }
        }
    }

    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

//funcion Para validar los campos, que no vayan vacios
function ValidarDatos_Emp_UPD() {
    if (document.getElementById('Calle').value != "" && document.getElementById('Numero').value != "" && document.getElementById('Colonia').value != ""
        && document.getElementById('Ciudad').value != "" && document.getElementById('CP').value != ""
        && document.getElementById('Celular1').value != "" && document.getElementById('Enfermedad').value != 0 && document.getElementById('Alergias').value != 0
        && document.getElementById('EstadoCivil').value != 0 && document.getElementById('Hijos').value != "" && document.getElementById('UltimoGradoDeEstudios').value != 0
        && document.getElementById('TituloObtenido').value != "" && document.getElementById('ContactoEmergencia1').value != "" && document.getElementById('TelefonoEmergencia1').value != ""
        && document.getElementById('PasatiempoFav').value != "" && document.getElementById('DeporteFav').value != "" && document.getElementById('Talento').value != 0
    ) {
        if (document.getElementById('Enfermedad').value == "otra" && document.getElementById('OtraEnfermedad').value == "") {
            alertify.alert("Favor de especificar la enfermedad");
            document.getElementById('OtraEnfermedad').focus();
        } else if (document.getElementById('OtroGrado').value == "" && document.getElementById('UltimoGradoDeEstudios').value == "otro") {
            alertify.alert("Favor de especificar el grado");
            document.getElementById('OtroGrado').focus();
        } else if (document.getElementById('Alergias').value == "Si" && document.getElementById('AlregiaC').value == "") {
            alertify.alert("Favor de especificar alergia");
            document.getElementById('AlregiaC').focus();
        } else if (document.getElementById('Talento').value == "otro" && document.getElementById('OtroTalento').value == "") {
            alertify.alert("Favor de especificar el talento");
            document.getElementById('OtroTalento').focus();
        } else if (document.getElementById('Talento').value == "Tocar instrumento" && document.getElementById('Instrumento').value == "") {
            alertify.alert("Favor de especificar el campo de que intrumento toca");
        } else if (document.getElementById('Hijos').value > 0 && !ValidaHijos()) {
            alertify.alert("Se indico que se tiene hij@s y no se agrego su edad.Favor de ingresar la fecha de nacimiento de sus hij@s");
            ModalHijos();
        } else {
            ActualizarDatos_Emp();
        }


    } else {
        alertify.alert("Favor de revisar los campos, e ingresar la información solicitada");
    }
}

//Funcion para enviar los datos para la actualización de informacion 
function ActualizarDatos_Emp() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Empleados/ActualizarDatos_Emp_T";
    var json = {
        Id_Empleado: document.getElementById('Id_Empleado').value,
        Calle: document.getElementById('Calle').value,
        Numero: document.getElementById('Numero').value,
        Colonia: document.getElementById('Colonia').value,
        Delegacion: document.getElementById('Delegacion').value,
        Ciudad: document.getElementById('Ciudad').value,
        CP: document.getElementById('CP').value,
        TelefonoFijo: document.getElementById('TelefonoFijo').value,
        Celular1: document.getElementById('Celular1').value,
        Celular2: document.getElementById('Celular2').value,
        Enfermedad: document.getElementById('Enfermedad').value,
        OtraEnfermedad: document.getElementById('OtraEnfermedad').value,
        Alergias: document.getElementById('Alergias').value,
        AlregiaC: document.getElementById('AlregiaC').value,
        Edad: document.getElementById('Edad').value,
        EstadoCivil: document.getElementById('EstadoCivil').value,
        Hijos: document.getElementById('Hijos').value,
        UltimoGradoEstudios: document.getElementById('UltimoGradoDeEstudios').value,
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
        OtroTalento: document.getElementById('OtroTalento').value
    }

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            console.log(result);
            if (result == 1) {
                if (document.getElementById('Hijos').value > 0) {
                    TraerHijos();
                } else {
                    alertify.alert("Datos actualizados");
                    LimpiarCampos_Emp();
                }
            } else {
                alertify.error("Error al actualizar de la información");
            }
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

//Funcion que trae todos los hijos 
//function TraerHijos() {
//    var n = document.querySelectorAll('input[name="h"]');
//    for (var i = 0; i < n.length; i++) {
//        InsertarHijos(document.getElementById('id_Empleado').value, formatDate(n[i].value));
//    }
//    alertify.alert("Datos actualizados");
//    LimpiarCampos_Emp();
//}

//Funcion que manda e inserta los hijos
//function InsertarHijos(Id_empleado, FechaNacHijo) {
//    var xml = new XMLHttpRequest();
//    var url = hostInit + "/Empleados/InsertaHijos";
//    var json = {
//        Id_Empleado: Id_empleado,
//        FechaNacHijo: FechaNacHijo
//    }
//    xml.onreadystatechange = function () {
//        if (this.readyState == 4 && this.status == 200) {
//            var r = JSON.parse(this.responseText);
//            if (r != "") {
//                console.log("Correcto");
//            } else {
//                console.error("Error");
//            }
//        }
//    };
//    xml.open("POST", url, true);
//    xml.setRequestHeader("Content-Type", "application/json");
//    xml.send(JSON.stringify(json));
//}

//Funcion que valida los campos de las edades de los hijos en caso de que se tenga hijos
//function ValidaHijos() {
//    var n = document.querySelectorAll('input[name="h"]');
//    var h;
//    for (var i = 0; i < n.length;i++) {
//        if (n[i].value != "") {
//            h = true;
//        } else {
//            return false;
//            break;
//        }
//    }
//    return h;
//}