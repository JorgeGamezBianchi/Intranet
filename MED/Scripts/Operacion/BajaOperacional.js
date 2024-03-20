//var hostInit = "/IntranetMedc";
//var hostInit = "";

//Funcion que valida que no este vacio el campo del RFC y realiza la transaccion
function BajaOperacional() {
    if (document.getElementById('RFCBaja').value != '') {
        alertify.confirm('Confirmación', '¿Esta seguro dar de baja al empleado?', function () {
            var json = {
                RFC: document.getElementById('RFCBaja').value
            }
            var xml = new XMLHttpRequest();
            var url = hostInit + "/Operacion/BajaOperacional/";

            xml.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText);
                    if (result != "") {
                        setTimeout(function () {
                            document.getElementById('myModal1').style.display = 'block';
                            document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                            document.getElementById('myModalLabel').innerHTML = "Resultado:";
                            document.getElementById('infoModal').innerHTML = "Transacción realizada correctamente<br />" + result;
                            document.getElementById('RFCBaja').value = "";
                        }, 1000);
                    } else {
                        //console.log("Error al dar de baja al empleado");
                        alertify.error('Error al dar de baja al empleado')
                    }
                }
            };

            xml.open("POST", url, true);
            xml.setRequestHeader('Content-Type', 'application/json');
            xml.send(JSON.stringify(json));
        }, function () {
            alertify.error('Se cancelo la operación');
        });
    } else {
        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
        document.getElementById('myModalLabel').innerHTML = "Advertencia";
        document.getElementById('infoModal').innerHTML = "Ingresar un RFC para realizar la operación"
    }
}


