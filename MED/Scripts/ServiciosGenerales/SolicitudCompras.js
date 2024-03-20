//Funcion para cargar los datos de un empleado en especifico, por el numero de empleado
function BuscarDatos_Empleado() {
    var url = hostInit + "/Empleados/BuscarDatos_Empleado";
    var xml = new XMLHttpRequest();
    var json = {
        num_emp: sessionStorage.getItem('usuario')
    }

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var r = JSON.parse(this.responseText)
            document.getElementById('id_Empleado').value = r.id_Empleado
            document.getElementById("Puesto").value = r.Puesto;
            document.getElementById("Direccion").value = r.IDDireccion;
            document.getElementById("Departamento").value = r.IdDepartamento;
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

//Funcion para cargar el combo de tipo de compra
function CargarTipoCompra() {
    var url = hostInit + "/ServiciosGenerales/CargarTipoCompra";
    var xml = new XMLHttpRequest();

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var r = JSON.parse(this.responseText);
            var opt = '<option value="0">Seleccione</option>';
            for (var i = 0; i < r.length; i++) {
                opt += '<option value="' + r[i].Id + '">' + r[i].Tipo + '</value>';
            }
            document.getElementById("Tipo").innerHTML = opt;
        }
    };

    xml.open("GET", url, true);
    xml.send();
}

//funcion para llenar el combo de productos dependiendo del tipo de compra
function CargarProductos() {
    var url = hostInit + "/ServiciosGenerales/CargarProductos";
    var xml = new XMLHttpRequest();
    var json = {
        id: document.getElementById('Tipo').value
    }

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var r = JSON.parse(this.responseText);
            var opt = '<option value="0">Seleccione</option>'
            for (var i = 0; i < r.length; i++) {
                opt += '<option value ="' + r[i].Id + '">' + r[i].subtipo + '</option>';
            }

            document.getElementById('subtipo').innerHTML = opt;
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

//Funcion que valida los campos y envia la informacion para guardar la solicitud
function GuardarSolicitud() {
    var tipo = document.getElementById('Tipo').value;
    var pro = document.getElementById('subtipo').value;
    var ra = document.getElementById('Razon').value;
    var pri = document.getElementById('Prioridad').value;

    if (tipo != 0 && pro != 0 && ra != "" && pri != 0) {
        var url = hostInit + "/ServiciosGenerales/InsertarSolicitud";
        var xml = new XMLHttpRequest();
        var json = {
            Solicitante: document.getElementById('id_Empleado').value,
            Direccion: document.getElementById('Direccion').value,
            Departamento: document.getElementById('Departamento').value,
            Tipo: tipo,
            Subtipo: pro,
            Razon: ra,
            //FechaRequesicion: formatDate(document.getElementById('FechaRequesicion').value),
            Prioridad: pri
        }

        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var r = JSON.parse(this.responseText);
                console.log(r);
                if (r != "") {
                    alertify.alert("Notificación", "Solicitud guardada con exito. <br /> El folio de la solicitud es: " + r).set({
                        'invokeOnCloseOff': true, 'onok': function () {
                            location.reload();
                        }
                    });
                } else {
                    alertify.alert("Error", "Se ha producido un error al guardar la solicitud.");
                }
            }
        };

        xml.open("POST", url, true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(json));
    } else {
        alertify.alert("Alerta", "Favor de llenar todos los campos para guardar la solicitud");
    }
}
// <-- Administrar las solicitudes de compra pendientes -->

//Metodo para cancelar o aprobar la solicitud
function ValidarSolicitud(folio, estatus) {
    alertify.confirm("¿Estas seguro de cancelar la solicitud?",
        function () {
            GuardarSolicitud(folio, estatus);
        },
        function () {
            alertify.error('Petición cancelada');
        });
}

//Metodo para guardar el estatus de la solicitus, si aprobado o denegado
function GuardarSolicitud(folio, estatus) {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/ServiciosGenerales/CambiarEstatusSolicitud";
    var json = {
        folio: folio,
        estatus: estatus
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var result = JSON.parse(this.responseText);
            if (result == 1 && estatus == "APROBADA") {
                alertify.success('¡Correcto, la solicitud se ha aprobado!');
                setTimeout(function () {
                    window.location.reload(true);
                }, 1000);
            }
            else if (result == 1 && estatus == "RECHAZADA") {
                alertify.success('¡Correcto, la solicitud se ha rechazado!');
                setTimeout(function () {
                    window.location.reload(true);
                }, 1000);
            }
            else {
                alertify.error("¡Error, no se pudo realizar la operación!");
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}
