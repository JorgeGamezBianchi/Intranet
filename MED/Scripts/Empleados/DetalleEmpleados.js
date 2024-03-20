// Funcion par cargar el resultado de la busqueda de los empleados
function cargarDetalleEmpleado() {
    var numEmp = document.getElementById('numEmpleado').value;
    var buscar = {
        NumeroEmpleado: numEmp
    }

    var xmlhttp = new XMLHttpRequest();
    var url = hostInit + "/Empleados/CargarDetalleEmpleados";

    if (numEmp != "") {
        xmlhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                var emp = JSON.parse(this.responseText);
                var campos



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
