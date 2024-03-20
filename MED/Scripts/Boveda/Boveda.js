function ValidarBoveda() {
    var numEmpleado = sessionStorage.getItem('usuario');
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Boveda/ValidarFrase";
    var json = {
        NumEmpleado: numEmpleado
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result == 0) {
                document.getElementById("AgregarCuenta").hidden = true;
                document.getElementById("divCuentas").hidden = true;
                document.getElementById("IniciarBoveda").hidden = false;
            }
            else {
                document.getElementById("IniciarBoveda").hidden = true;
                document.getElementById("AgregarCuenta").hidden = false;
                document.getElementById("divCuentas").hidden = false;
                document.getElementById("idFrase").value = result;
                CargarCuentas(result);
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}
function AbrirModal() {
    limpiarCampos();
    document.getElementById("TituloCuenta").innerHTML = "Guardar Cuenta";
    $('#modalCuenta').modal();
}

function AbrirModalFrase() {
    LimpiarCamposFrase();
    $('#modalFrase').modal();
}

function LimpiarCamposFrase(){
    document.getElementById("frase").value = "";
}

function GuardarFrase() {
    var numEmpleado = sessionStorage.getItem('usuario');
    var frase = document.getElementById('frase').value;
    if (frase == "") {
        alertify.error("¡Error, debe llenar el campo de LLAVE!");
    }
    else {
        var xml = new XMLHttpRequest();
        var url = hostInit + "/Boveda/GuardarFrase";
        var json = {
            NumEmpleado: numEmpleado,
            Frase: frase
        };
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                if (result == 1) {
                    $("#modalFrase").modal("hide");
                    alertify.success('¡Exitoso, la LLAVE se guardó correctamente!');
                    setTimeout(function () {
                        window.location.href = hostInit + "/Boveda/AdminBoveda";
                    }, 1500);
                }
                else {
                    $("#modalFrase").modal("hide");
                    alertify.error("¡Error, no se pudo guardar la LLAVE!");
                }
            }
        };
        xml.open("POST", url, true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(json));
    }
}

function CargarCuentas(idFrase) {
    document.getElementById("divCuentas").innerHTML = "";
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Boveda/CargarCuentas";
    var json = {
        idFrase: idFrase
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            if (myArr != "") {

                
                var htmlCuentas = document.getElementById("divCuentas").innerHTML;

                htmlCuentas += '<table class=" table table:hover table-striped text-center" style="margin-left:10px; margin-top:10px;">';
                htmlCuentas += '<thead class="tblHead">';
                htmlCuentas += '<tr>';
                htmlCuentas += '<td>Aplicacion</td>';
                htmlCuentas += '<td>Usuario</td>';
                htmlCuentas += '<td>Contraseña</td>';
                htmlCuentas += '<td></td>';
                htmlCuentas += '<td></td>';
                htmlCuentas += '<td></td>';
                htmlCuentas += '</tr>';
                htmlCuentas += '</thead>';
                htmlCuentas += '<tbody>';

                for (var i = 0; i < myArr.length; i++) {
                    htmlCuentas += '<tr>';
                    htmlCuentas += '<td>' + myArr[i].Aplicacion + '</td>';
                    htmlCuentas += '<td>' + myArr[i].Usuario + '</td>';
                    htmlCuentas += '<td style="font-size:20px; font-weight:bold">***********</td>';
                    htmlCuentas += "<td style='width:40px;'><button title='Actualizar' class='btn btn-info' onclick=\"LlenarDatosEdicion(" + myArr[i].IdBP +",'" + myArr[i].Aplicacion + "','" + myArr[i].Usuario + "')\"> <i class='far fa-edit'></i></button ></td > ";
                    htmlCuentas += '<td style="width:40px;"><button title="Eliminar" onclick="ValidarEliminarCuenta(' + myArr[i].IdBP+')" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></td>';
                    htmlCuentas += '<td style="width:40px;"><button title="Ver Contraseña" class="btn"  onclick="ValidarVerContrasena(' + myArr[i].IdBP +')" style="background:#4682b4; color:white;"><i class="fas fa-eye"></i></button></td>';
                    htmlCuentas += '</tr>';
                }
                htmlCuentas +='</tbody>';
                htmlCuentas += '</table>';
                document.getElementById('divCuentas').innerHTML = htmlCuentas;

            } else {
                document.getElementById("divCuentas").innerHTML = "";
                alertify.warning("¡Lo siento, no tienes ninguna cuenta guardada!");
            }
        } else if (this.status == 500) {
            alertify.warning("¡Error", "no se puede conectar a la base de datos!");
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

function limpiarCampos() {
    document.getElementById('aplicacion').value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("pass").value = "";
    document.getElementById("idCuenta").value = "";
}

function LlenarDatosEdicion(idBP, aplicacion, usuario) {
    alertify.prompt("¿Estas seguro que deseas editar esta cuenta?", "Ingresa tu LLAVE única",
        function (evt, value) {
            var xml = new XMLHttpRequest();
            var url = hostInit + "/Boveda/ValidarConsidenciasFrases";
            var id_frase = document.getElementById("idFrase").value;
            var json = {
                idFrase: id_frase,
                frase: value
            };
            xml.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText);
                    if (result == 1) {
                        document.getElementById("TituloCuenta").innerHTML = "Actualizar Cuenta";
                        document.getElementById("aplicacion").value = aplicacion;
                        document.getElementById("usuario").value = usuario;
                        document.getElementById("idCuenta").value = idBP;
                        document.getElementById("pass").value = "";
                        $('#modalCuenta').modal();
                    }
                    else {
                        alertify.error("¡Error, la LLAVE ingresada no es correcta!");
                    }
                }
            };
            xml.open("POST", url, true);
            xml.setRequestHeader("Content-Type", "application/json");
            xml.send(JSON.stringify(json));
        },
        function () {
            alertify.error('Operacion Cancelada');
        });
}

function ValidarCuenta() {
    var aplicacion = document.getElementById("aplicacion").value;
    var usuario = document.getElementById("usuario").value;
    var pass = document.getElementById("pass").value;
    var idCuenta = document.getElementById("idCuenta").value;
    if (aplicacion == "" || usuario == "" || pass == "") {
        alertify.error("¡Error, debe llenar todos los campos!");
    } else {
        if (idCuenta == "") {
            GuardarCuenta();
        } else {
            ActualizarCuenta();
        }
    }
}

function GuardarCuenta() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Boveda/GuardarCuenta";
    var id_frase = document.getElementById("idFrase").value;
    var json = {
        IdFrase: document.getElementById("idFrase").value,
        Aplicacion: document.getElementById("aplicacion").value,
        Usuario: document.getElementById("usuario").value,
        Pass: document.getElementById("pass").value,
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result == 1) {
                $("#modalCuenta").modal("hide");
                limpiarCampos();
                alertify.success('¡Exitoso, la cuenta se guardó correctamente!');
                setTimeout(function () {
                    CargarCuentas(id_frase);
                }, 1500);
            }
            else {
                $("#modalCuenta").modal("hide");
                alertify.error("¡Error, no se pudo guardar la cuenta!");
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

function ActualizarCuenta() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Boveda/ActualizarCuenta";
    var id_frase = document.getElementById("idFrase").value;
    var pass = (document.getElementById("pass").value).includes("*") == true ? "" : document.getElementById("pass").value
    var json = {
        IdFrase: document.getElementById("idFrase").value,
        Aplicacion: document.getElementById("aplicacion").value,
        Usuario: document.getElementById("usuario").value,
        Pass: pass,
        IdBP: document.getElementById("idCuenta").value,
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result == 1) {
                $("#modalCuenta").modal("hide");
                limpiarCampos();
                alertify.success('¡Exitoso, la cuenta se actualizó correctamente!');
                setTimeout(function () {
                    CargarCuentas(id_frase);
                }, 1500);
            }
            else {
                $("#modalCuenta").modal("hide");
                alertify.error("¡Error, no se pudo guardar la cuenta!");
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

function ValidarEliminarCuenta(idCuenta) {
    alertify.prompt("¿Estas seguro que deseas eliminar esta registro? No podrás recuperar la cuenta", "Ingresa tu LLAVE única",
        function (evt, value) {
            var xml = new XMLHttpRequest();
            var url = hostInit + "/Boveda/ValidarConsidenciasFrases";
            var id_frase = document.getElementById("idFrase").value;
            var json = {
                idFrase: id_frase,
                frase: value
            };
            xml.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText);
                    if (result == 1) {
                        EliminarCuenta(idCuenta);
                    }
                    else {
                        alertify.error("¡Error, la LLAVE ingresada no es correcta!");
                    }
                }
            };
            xml.open("POST", url, true);
            xml.setRequestHeader("Content-Type", "application/json");
            xml.send(JSON.stringify(json));
        },
        function () {
            alertify.error('Operacion Cancelada');
        });
}
function EliminarCuenta(idCuenta) {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Boveda/EliminarCuenta";
    var id_frase = document.getElementById("idFrase").value;
    var json = {
        idCuenta: idCuenta,
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result == 1) {
                alertify.success('¡Exitoso, la cuenta se eliminó correctamente!');
                setTimeout(function () {
                    CargarCuentas(id_frase);
                }, 1500);
            }
            else {
                alertify.error("¡Error, no se pudo eliminar la cuenta!");
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}

function ValidarVerContrasena(idCuenta) {
    alertify.prompt("", "Ingresa tu LLAVE única",
        function (evt, value) {
            var xml = new XMLHttpRequest();
            var url = hostInit + "/Boveda/ValidarConsidenciasFrases";
            var id_frase = document.getElementById("idFrase").value;
            var json = {
                idFrase: id_frase,
                frase: value
            };
            xml.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText);
                    if (result == 1) {
                        VerContrasena(idCuenta,value);
                    }
                    else {
                        alertify.error("¡Error, la LLAVE ingresada no es correcta!");
                    }
                }
            };
            xml.open("POST", url, true);
            xml.setRequestHeader("Content-Type", "application/json");
            xml.send(JSON.stringify(json));
        },
        function () {
            alertify.error('Operacion Cancelada');
        });
}

function VerContrasena(idCuenta,valor) {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Boveda/ObtenerPass";
    var json = {
        idCuenta: idCuenta,
        frase: valor

    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result != "") {
                document.getElementById("muestraPass").value = result;
                $("#modalMostrarPass").modal();
            }
            else {
                alertify.error("¡Error, no se pudo consultar la contraseña!");
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}