//var hostInit = "/IntranetMedc";
//var hostInit = "";

//Metodo para insertar los horarios
function InsertarHorario(json) {

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Horarios/InsertarHorarios";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result == 1) {
                document.getElementById('myModal1').style.display = 'block';
                document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                document.getElementById('myModalLabel').innerHTML = "Correcto";
                document.getElementById('infoModal').innerHTML = "Se inserto correctamente el horario del empleado";
                document.getElementById('datos').hidden = true;
            } else {
                //alert("Empleado ya cuenta con horario definido");
                document.getElementById('myModal1').style.display = 'block';
                document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                document.getElementById('myModalLabel').innerHTML = "Advertencia";
                document.getElementById('infoModal').innerHTML = "Empleado ya cuenta con un horario definido";
            }
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(json));

}

//Función para buscar empleado para el horario
function buscarEmpleadoHorario() {
    var numEmp = document.getElementById('numEmp').value;
    console.log(numEmp);
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

//Funcion para validar los radios 
function ValidarHorario() {
    var id = document.getElementById('id_Empleado').value;
    var d = document.querySelector('input[name="radio2"]:checked').value;
    var t = document.querySelector('input[name="radio1"]:checked').value;
    var e, s;
    if (d != 0 ) {
        if (t != 0) {
            if (t == "TM") {
                e = "09:00";
                s = "03:00";
            } else if (t == "TV") {
                e = "03:00";
                s = "09:00";
            } else if (t == "TC-1") {
                e = "09:00";
                s = "07:00";
            } else if (t == "TC-2") {
                e = "11:00";
                s = "09:00";
            } else if (t == "TI-1") {
                e = "11:00";
                s = "05:00";
            } else if (t == "TI-2") {
                e = "12:00";
                s = "06:00";
            } else {
                e = "01:00";
                s = "07:00";
            }

            var json = {
                Id_Empleado: id,
                Dias_labora: d,
                Turno: t,
                Entrada: e,
                Salida: s
            }
            InsertarHorario(json);
            //alert("Días que labora: " + d + "\nTurno: " + t + "\nHorario: " + "\nEntrada - " + e + "\nSalida- " + s);
        } else
        {
            document.getElementById('myModal1').style.display = 'block';
            document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
            document.getElementById('myModalLabel').innerHTML = "Advertencia";
            document.getElementById('infoModal').innerHTML = "Debe ingresar el horario del empleado";
        }
    } else {
        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
        document.getElementById('myModalLabel').innerHTML = "Advertencia";
        document.getElementById('infoModal').innerHTML = "Debe ingresar los días de la semana que labora el empleado";
    }

}


