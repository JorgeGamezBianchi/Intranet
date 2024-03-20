function LimpiarCampos() {
    document.getElementById("nombreCurso").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("id_Curso").value = "";
    document.getElementById("id_Programa").value = "";
    document.getElementById("Actividad").value = "";
    document.getElementById("Actividad").hidden = true;
    document.getElementById("TiempoAct").value = "";
    document.getElementById("TiempoAct").hidden = true;
    document.getElementById("divActividad").innerHTML = "";
    document.getElementById("cerrarCurso").style.display = "block";
    $("#modalCurso").modal("hide")
}



//MUESTRA EL MODAL PARA AGREGAR PROGRAMAS
function mostrarModal() {
    document.getElementById("nombre").value = "";
    document.getElementById("numEmpleado").value = sessionStorage.getItem('usuario');
    $("#modalPrograma").modal("show");
}



//CIERRA EL MODAL PARA AGREGAR PROGRAMAS
function cierraModal() {
    document.getElementById("nombre").value = "";
    document.getElementById("numEmpleado").value = sessionStorage.getItem('usuario');
    $("#modalPrograma").modal("hide");
}



//VALIDA QUE TENGA EL NOMBRE UN PROGRAMA NUEVO
function validarCampo() {
    if (document.getElementById('nombre').value != "") {
        CrearPrograma();
    } else {
        alertify.error("¡Error, debe llenar todos los campos!");
    }
}



//CREA EL PROGRAMA NUEVO EN LAS VENTANA DE PROGRAMAS
function CrearPrograma() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Curso/CrearPrograma";
    var json = {
        Nombre: document.getElementById('nombre').value,
        NumEmpleado: document.getElementById('numEmpleado').value
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var result = JSON.parse(this.responseText);
            if (result == 1) {
                $("#modalPrograma").modal("hide");
                alertify.success('¡Exitoso, se agrego el registro correctamente!');
                setTimeout(function () {
                    window.location.reload(true);
                }, 1000);
            }
            else {
                $("#modalPrograma").modal("hide");
                alertify.error("¡Error, no se pudo guardar el programa!");
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}



//ELIMINA EL PROGRAMA AGREGADO DE L AVENTANA PROGRAMAS
function EliminarPrograma(id) {
    alertify.confirm('Confirmación', 'Se eliminarán todos los cursos ¿Estas seguro?',
        function () {
            var xml = new XMLHttpRequest();
            var url = hostInit + "/Curso/EliminarPrograma";
            var json = {
                idPrograma: id
            };
            xml.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText);
                    if (result == 1) {

                        alertify.success('¡Exitoso, se eliminó el registro correctamente!');
                        setTimeout(function () {
                            window.location.reload(true);
                        }, 1000);
                    }
                    else {
                        alertify.error("¡Error, no se pudo eliminar el programa!");
                    }
                }
            };
            xml.open("POST", url, true);
            xml.setRequestHeader("Content-Type", "application/json");
            xml.send(JSON.stringify(json));
        },
        function () {
            alertify.error('Se cancelo la operación');
        });

}



//Agregar mas filas dinamicamente con un boton para agregar inputs DE PDF
function AgregaVistaContenido() {
    var inputs = document.getElementsByName('file').length;
    inputs++;
    var out = '<div class="row" id="contArchivo' + inputs + '">';
    out += '<div class="form-group col-md-8">';
    out += '<input class="form-control file" style="margin-bottom:10px; font-size:14px;" type="file" name="file" accept=".mp4, .pdf" /> ';
    out += ' </div>';
    out += '<div class="form-group col-md-3" style="padding-left:0px !important;">'
    out += '<input type="number" class="form-control" style ="font-size:14px; margin-rigth:5px; margin-left:5px;" name="tiempo" title="Agrega tiempo en minutos si es necesario, para el cambio automático del pdf" placeholder="Tiempo"/>';
    out += '</div>';
    out += '<div class="form-group col-md-1" style="padding:0px;">';
    out += '<button title="Eliminar" onclick="EliminarSelectHTML(' + inputs + ','+1+')" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>';
    out += '</div>';
    out += '</div>';
    $('#contenido').append(out);
}



//ELIMINAR EL CAMPO PARA SUBIR UN PDF
function EliminarSelectHTML(id, accion) {
    if (accion == 1) {
        document.getElementById("contArchivo" + id).remove();
        var inputs = document.getElementsByName('file').length;
        if (inputs == 0 && document.getElementById("id_Curso").value != "") {
            document.getElementById("cerrarCurso").style.display = "none";
        }
    } else if (accion == 2) {
        document.getElementById("divActividad").innerHTML = "";
        document.getElementById("no").checked = true;
    } 
}



//MUESTRA MODAL DONDE SE AGREGA LOS CURSOS PDF Y EXCEL
function MostrarModalCurso(id) {
    document.getElementById("titulo").innerHTML = "Crear Curso";
    document.getElementById("id_Curso").value = "";
    document.getElementById('id_Programa').value = id;
    document.getElementById('nombreCurso').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('contenido').innerHTML = "";
    document.getElementById("no").checked = true;
    document.getElementById("Actividad").hidden = true;
    document.getElementById("Actividad").value = "";
    document.getElementById("cerrarCurso").hidden = false;
    $("#modalCurso").modal("show");
}



//CARGA LOS CURSOS QUE SE CREAN EN "AGREGAR PROGRAMA" Y SE MUESTRAN EN LA PARTE DE ABAJO
function CargarCursos(id) {
    document.getElementById("cursos").innerHTML = "";
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Curso/CargarCursos";
    var json = {
        idPrograma: id
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            if (myArr != "") {
             
                for (var i = 0; i < myArr.length; i++) {
                    MostrarCursosHTML(myArr[i].Id_curso, myArr[i].Nombre_Curso, i, myArr[i].Descripcion, id);

                    for (var j = 0; j < myArr[i].Archivos.length; j++) {
                        MostrarContenidoHTML(myArr[i].Archivos[j].Nombre_archivo, i, myArr[i].Archivos[j].Tipo, myArr[i].Nombre_Curso);
                    }
                }
            } else {
                document.getElementById("cursos").innerHTML = "";
                alertify.warning("¡Lo siento, no tienes ningún curso creado!");
            }
        } else if (this.status == 500) {
            alertify.warning("¡Error", "no se puede conectar a la base de datos!");
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}



//Cargar los cursos para verlos en la parte baja de los programas y poder editarlos o eliminarlos 
function MostrarCursosHTML(id, nombreCurso, i, descripcion, idPrograma) {
    var out = document.getElementById("cursos").innerHTML;
    out += '    <div class="col-md-8 col-md-offset-2" style="margin-bottom: 20px;">';
    out += '       <div class="panel panel-info">';
    out += '            <div class="row align-items-center" style="background-color:#4682b4; border-radius: 5px; padding: 3px; font-size:20px;">';
    out += '                <div class="col-md-10" style="color: white">';
    out += '                    ' + nombreCurso + '';
    out += '                </div>';
    out += "                <div clas='col-md-1' title='Editar' style='color:white;' onclick =\"EditarCurso('" + nombreCurso + "','" + id + "','" + descripcion + "','" + idPrograma + "')\">";
    out += '                    <span class="col-md-1 btn far fa-edit" style="cursor: pointer;color: white; padding-right: 5px"></span>';
    out += '                </div>';
    out += "                <div clas='col-md-1' style='color:white;' title='Eliminar' onclick=\"EliminarCurso('" + nombreCurso + "','" + id + "','" + idPrograma + "')\">";
    out += '                    <span class="col-md-1 btn fas fa-trash-alt" style="cursor: pointer;color: white; padding-right: 5px"></span>';
    out += '                </div>';
    out += '                <div clas="col-md-1" style="color:white;" title="Expandir">';
    out += '                    <span data-toggle="collapse" class="col-md-1 btn" href="#collapse' + i + '" style="cursor: pointer;color: white; padding-right: 5px">&#9776;</span>';
    out += '                </div>';
    out += '            </div>';
    out += '            <div class="collapse" id="collapse' + i + '">';
    out += '                <div class="panel-body">';
    out += '                    <div class="row align-items-center" style="justify-content: center !important;">';
    out += '                        <div class="col-md-5 form-group" id="divContenido">';
    out += '                            <table class="table table:hover table-striped text-center" style="margin-left:10px; margin-top:10px;"><thead><tr><td style="background-color: #4682b4; font-weight: bold;  color:black; opacity:0.6;">Nombre del Contenido</td><td style="background-color: #4682b4; opacity:0.6;"></td></tr></thead>';
    out += '                            <tbody id="contenido' + i + '">';
    out += '                            </tbody ></table > ';
    out += '                        </div>';
    out += '                    </div>';
    out += '                </div>';
    out += '            </div>';
    out += '        </div>';
    out += '    </div>';
    out += '<br />';
    out += '<br />';
    document.getElementById("cursos").innerHTML = out;
}



//CREA EL LISTADO DE LOS CURSOS DE UN PROGRAMA DONDE VIENE EL PDF
function MostrarContenidoHTML(archivo, cont, tipo,nombreCurso) {
    out = document.getElementById("contenido" + cont).innerHTML;
    out += '<tr><td class="col-md-11">' + archivo + '</td>';
    if (tipo == "Contenido") {
        out += "<td class='col-md-1'><button title='Ver Contenido' onclick=\"VerContenido('" + archivo + "','" + nombreCurso + "')\"  class='btn' style='background:#4682b4; color:white;'><i class='fas fa-eye'></i></button></td >";
    } else {
        out += '<td></td>';
    }
    out += '</tr > ';
    document.getElementById("contenido" + cont).innerHTML = out;
}



//MUESTRA EL CURSO DEL PROGRAMA SELECCIONADO EN PDF
function VerContenido(archivo,nombreCurso) {
    document.getElementById("divDocumento").innerHTML = "";
    document.getElementById("TituloDocumento").innerHTML = archivo;
    var salida = document.getElementById("divDocumento").innerHTML;
    var n = archivo.includes(".pdf");
    
    if (n) {
        salida += "<object style='width:770px; height:500px;' data='" + hostInit + "/Media/ArchivosCursos/" + nombreCurso + "/" + archivo + "' type='application/pdf'></object>";
        document.getElementById("divDocumento").innerHTML = salida;
    } else {
        salida += "<iframe src='" + hostInit + "/Media/ArchivosCursos/" + nombreCurso + "/" + archivo + "'  style='width:770px; height:400px;' controls></iframe>";
        document.getElementById("divDocumento").innerHTML = salida;
    }
    $("#modalDocumento").modal();
}



//FUNCION PARA EDITAR EL CURSO DE UN PROGRAMA SELECCIONADO EN LA PARTE DE ABAJO
function EditarCurso(nombreCurso, id, descripcion,idPrograma) {
    document.getElementById("contenido").innerHTML = "";
    document.getElementById("titulo").innerHTML = "Editar Curso";
    document.getElementById("nombreCurso").value = nombreCurso;
    document.getElementById("no").checked = true;
    document.getElementById("descripcion").value = descripcion;
    document.getElementById("id_Curso").value = id;
    document.getElementById("divActividad").hidden = false;
    document.getElementById("id_Programa").value = idPrograma;
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Curso/CargarArchivos";
    var json = {
        idCurso: id
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var myArr = JSON.parse(this.responseText);
            if (myArr != "") {
                for (var j = 0; j < myArr.length; j++) {
                    if (myArr[j].Tipo == "Contenido") {
                        MostrarContenidosHTMLModal(nombreCurso, myArr[j].Nombre_archivo, myArr[j].Id_archivo);
                    }
                    else {
                        document.getElementById("si").checked = true;
                        MostrarActividadHTML(nombreCurso, myArr[j].Nombre_archivo, myArr[j].Id_archivo, myArr[j].Id_examen);
                        document.getElementById("divActividad").hidden = false;
                    }
                }
                $("#modalCurso").modal();
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}



//MUESTRA EL MODAL PARA EDITAR EL PDF Y EL EXCEL DE UN CURSO
function MostrarContenidosHTMLModal(nombreCurso, nombreArchivo, id) {
    var accion = 1;
    var inputs = document.getElementsByName('file').length;
    inputs++;
    var out = '<div class="row" id="contArchivo' + inputs + '">';
    out += '<div class="form-group col-md-9">';
    out += '<input style="padding:0px !important; font-size:small !important;" type="text" name="file" disabled  value="' + nombreArchivo + '"/> ';
    out += ' </div>';
    out += '<div class="form-group col-md-2">';
    out += "<button type='button' title='Eliminar' onclick=\"ValidarAccion('" + nombreCurso + "','" + nombreArchivo + "','" + inputs + "','" + id + "','" + accion+"','"+0+"')\" class='btn btn-danger' style = 'width:80%' > <i class='fas fa-trash-alt'></i></button >";
    out += '</div>';
    out += '</div>';
    $('#contenido').append(out);
}



//CARGA EL EXCEL DEL CURSO PARA MOSTRARLO
function MostrarActividadHTML(nombreCurso, nombreArchivo, idArchivo,idExamen) {
    var accion = 2;
    var inputs = 0;
    var out = '';
    out += '<div class="form-group col-md-8">';
    out += '<input id="inputActividad" style="padding:0px !important; font-size:small !important;" type="text" name="Actividad" disabled value="' + nombreArchivo + '"/> ';
    out += '<input type="hidden" id="idActividad" value="' + idArchivo + '" />';
    out += '</div>';
    out += '<div class="form-group col-md-2">';
    out += "<button type='button' title='Eliminar' onclick=\"ValidarAccion('" + nombreCurso + "','" + nombreArchivo + "','" + inputs + "','" + idArchivo + "','" + accion + "','" + idExamen + "')\" class='btn btn-danger' style = 'width:90%' > <i class='fas fa-trash-alt'></i></button >";   
    out += '</div>';
    document.getElementById("divActividad").innerHTML = out;
}



//VALIDAR LA ACCION DE ELIMINAR UN CURSO Y MANDA EL MENSAJE DE CONFIRMACION
function ValidarAccion(nombreCurso, nombreArchivo, cont, idArchivo,accion,idExamen) {
    alertify.confirm('Confirmación', 'Este archivo no podrá recuperarse ¿Estas seguro?',
        function () {
            var xml = new XMLHttpRequest();
            var url = hostInit + "/Curso/EliminarArchivoPorId";
            var json = {
                idArchivo: idArchivo,
                nombreCurso: nombreCurso,
                nombreArchivo: nombreArchivo,
                idExamen: idExamen
            };
            xml.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText);
                    if (result == 1) {
                        EliminarSelectHTML(cont,accion);
                    }
                }
            };
            xml.open("POST", url, true);
            xml.setRequestHeader("Content-Type", "application/json");
            xml.send(JSON.stringify(json));
        },
        function () {
            if (accion == 2) {
                document.getElementById("si").checked = true;
            }
        });
}



//ELIMINA EL CURSO EN EL MODAL DE "VER CONTENIDO" EN LA PARTE DE ABAJO
function EliminarCurso(nombreCurso,idCurso,idPrograma) {
    alertify.confirm('Confirmación', 'Este curso no podrá recuperarse ¿Estas seguro?',
        function () {
            var xml = new XMLHttpRequest();
            var url = hostInit + "/Curso/EliminarCurso";
            var json = {
                nombreCurso: nombreCurso,
                idCurso: idCurso
            };
            xml.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText);
                    if (result > 1) {
                        CargarCursos(idPrograma);
                    }
                }
            };
            xml.open("POST", url, true);
            xml.setRequestHeader("Content-Type", "application/json");
            xml.send(JSON.stringify(json));
        },
        function () {
        });
}



//ABRE EL CAMPO PARA CREAR LA ACTIVIDAD DE EXCEL EN LAS OPCIONES DE SI o NO
function CrearActividad() {
    var input = document.getElementById("inputActividad");
    if (document.getElementById("si").checked && input == null) {
        document.getElementById("Actividad").hidden = false;
        document.getElementById("TiempoAct").hidden = false;
        document.getElementById('ActividadBit').value = 1;
    }
    else if (document.getElementById("si").checked && document.getElementById("inputActividad").value != "") {
        var nombreCurso = document.getElementById("nombreCurso").value;
        var nombre = document.getElementById("inputActividad").value;
        var id = document.getElementById("idActividad").value;
        ValidarAccion(nombreCurso, nombre, 0, id, 2,0);
    }
    else if (document.getElementById("no").checked && input == null) {
        document.getElementById("Actividad").hidden = true;
        document.getElementById("Actividad").value = "";
        document.getElementById("TiempoAct").hidden = true;
        document.getElementById("TiempoAct").value = "";
        document.getElementById('ActividadBit').value = 0;
    }
    else if (document.getElementById("no").checked && document.getElementById("inputActividad").value != "") {
        var nombreCurso = document.getElementById("nombreCurso").value;
        var nombre = document.getElementById("inputActividad").value;
        var id = document.getElementById("idActividad").value;
        ValidarAccion(nombreCurso, nombre, 0, id, 2,0);
    }
}






////////-------------------- ASIGNACION DE CURSOS --------------------////////

//CARGA LOS EMPLEADOS DESDE QUE SE SELECCIONA EL ONCHANGE EN ASIGNARCURSO# / DIRECCION
function CargarEmp_Direccion(id) {
    //var id = document.getElementById('Direccion').value;
    try {
        if (id != 0) {
            var xml = new XMLHttpRequest();
            var url = hostInit + "/Curso/CargarEmp_Direccion";
            var json = {
                id: id
            }
            xml.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var r = JSON.parse(this.responseText);
                    if (r.length > 0) {
                        var opt = "";
                        for (var i = 0; i < r.length; i++) {
                            opt += "<tr><td>" + r[i].NumeroEmpleado + "</td><td>" + r[i].Nombre_2 + "</td><td>" + r[i].Nombre_1 + "</td><td><input type='checkbox' id='seleccion' value='" + r[i].id_Empleado + "'/></td></tr>";
                        }
                        document.getElementById('cuerpoTabla').innerHTML = opt;
                        document.getElementById('Tabla_Empleados').hidden = false;
                    } else {
                        document.getElementById('cuerpoTabla').innerHTML = "";
                    }
                }
            };
            xml.open('POST', url, true);
            xml.setRequestHeader('Content-Type', 'application/json');
            xml.send(JSON.stringify(json));
        }
    }
    catch (error) {
        console.log(error);
    }
}



//Funcion para cargar los cursos dependiendo el programa seleccionado
function Cargar_Cursos_Programas() {
    var p = document.getElementById('Id_programa').value;

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Curso/Cargar_CursosPrograma";
    var json = {
        id: p
    }

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var r = JSON.parse(this.responseText);
            if (r.length > 0) {
                var opt = '<option value="0">Selecciona</option>';
                for (var i = 0; i < r.length; i++) {
                    opt += '<option value="' + r[i].Id_curso + '">' + r[i].Nombre_Curso + '</option>';
                }
                document.getElementById('Id_curso').innerHTML = opt;
                document.getElementById('Id_curso').disabled = false;
            } else {
                document.getElementById('Id_curso').innerHTML = '<option value="0">Selecciona</option>';
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}



//Funcion que carga la tabla con los empleados que tengan la direccion y departamentos seleccionados
function Cargar_EmpDirecDepart() {
    var dir = document.getElementById('Direccion').value;
    var dep = document.getElementById('Departamento').value;

    if (dir != 0) {
        var xml = new XMLHttpRequest();
        var url = hostInit + "/Curso/Cargar_EmpDirecDepart";
        var json = {
            id_dir: dir,
            id_dep: dep
        }
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var r = JSON.parse(this.responseText);
                if (r.length > 0) {
                    var opt = "";
                    for (var i = 0; i < r.length; i++) {
                        opt += "<tr><td>" + r[i].NumeroEmpleado + "</td><td>" + r[i].Nombre_2 + "</td><td>" + r[i].Nombre_1 + "</td><td><input type='checkbox' id='seleccion' value='" + r[i].id_Empleado + "'/></td></tr>";
                    }
                    document.getElementById('cuerpoTabla').innerHTML = opt;
                } else {
                    document.getElementById('cuerpoTabla').innerHTML = "";
                }
            }
        };

        xml.open("POST", url, true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(json));
    } else {
        alertify.error("Favor de seleccionar primero una dirección");
    }
}



//Funcion que carga la tabla con los empleados dependiendo de la campaña
function Cargar_EmpCamp() {
    var camp = document.getElementById('Campania').value;
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Curso/Cargar_EmpCamp";
    var json = {
        id_camp: camp
    }
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var r = JSON.parse(this.responseText);
            if (r.length > 0) {
                var opt = "";
                for (var i = 0; i < r.length; i++) {
                    opt += "<tr><td>" + r[i].NumeroEmpleado + "</td><td>" + r[i].Nombre_2 + "</td><td>" + r[i].Nombre_1 + "</td><td><input type='checkbox' id='seleccion' value='" + r[i].id_Empleado + "'/></td></tr>";
                }
                document.getElementById('cuerpoTabla').innerHTML = opt;
            } else {
                document.getElementById('cuerpoTabla').innerHTML = "";
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}



//Funcion que carga a un empleado en especifico buscado por medio del numero de empleado 
function Buscar_Emp_Curso() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Curso/Buscar_Emp";
    var json = {
        num_emp: document.getElementById('num_emp').value
    }

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var r = JSON.parse(this.responseText);
            if (r.id_Empleado == 0) {
                alertify.alert("No hay coincidencias con ese número de empleado");
            } else {
                var opt = "<tr><td>" + r.NumeroEmpleado + "</td><td>" + r.Nombre_2 + "</td><td>" + r.Nombre_1 + "</td><td><input type='checkbox' id='seleccion' value='" + r.id_Empleado + "'/></td></tr>";
                document.getElementById('Tabla_Empleados').hidden = false;
                document.getElementById('cuerpoTabla').innerHTML = opt;
            }
        }
    };

    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}



//Funcion para seleccionar todos los check
function Seleccionar_Todo() {
    var c = document.getElementById('seleccionT');
    var ch = document.querySelectorAll("input[id='seleccion']");
    if (c.checked) {
        for (var i = 0; i < ch.length; i++) {
            ch[i].checked = true;
        }
    } else {
        for (var i = 0; i < ch.length; i++) {
            ch[i].checked = false;
        }
    }
}



//Funcion para validar los datos necesarios para la asignación de un curso
function Validar_AsignarCurso() {
    var p = document.getElementById('Id_programa').value;
    var c = document.getElementById('Id_curso').value;

    if (p != 0 && c != 0) {
        var emp = document.querySelectorAll("input[id='seleccion']:checked");
        console.log(emp);
        if (emp != null) {
            for (var i = 0; i < emp.length; i++) {
                Asignar_Curso(c, emp[i].value)
            }
            alertify.alert("Curso asignado correctamente");
            Limpiar_AsignarCurso();
        } else {
            alertify.alert("Favor de seleccionar uno o más empleados para asignarles el curso");
        }
    } else {
        alertify.alert("Favor de seleccionar un programa y un curso para asignar");
    }

}



//Funcion que manda la información para asignar el curso
function Asignar_Curso(c, emp) {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Curso/Asignar_Curso";
    var json = {
        id_curso: c,
        id_emp: emp,
        capacitador: sessionStorage.getItem('usuario')
    }

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var r = JSON.parse(this.responseText);
            console.log(r);
            if (r == 1) {
                alertify.success("Curso asignado correctamente");
            } else if (r = 2) {
                alertify.alert("Usuario cuenta con mismo curso sin terminar. Favor de terminar el curso antes asignado, antes de asignar uno nuevo");
            } else {
                alertify.error("Error al asignar");
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}



//Funcion que limpia los campos de la asignacion de un curso
function Limpiar_AsignarCurso() {
    document.getElementById('Id_programa').value = 0;
    document.getElementById('Id_curso').value = 0;
    document.getElementById('Id_curso').disabled = true;
    document.getElementById('num_emp').value = "";
    document.getElementById('Tabla_Empleados').hidden = true;
    document.getElementById('Direccion').value = 0;
    document.getElementById('Campania').value = 0;
    document.getElementById('Campania').disabled = true;
}



//Funcion para cargar los cursos calificados
function CargarCalificacionesCurso() {
    if  (document.getElementById('Fechainicio').value != "" || document.getElementById('Fechafin').value != "" || document.getElementById('idCurso').value != 0)
    {
        if (document.getElementById('idCurso').value != 0) {
            var xml = new XMLHttpRequest();
            var url = hostInit + "/Curso/CargarCursosConCalificaciones";
            var json = {
                IdCurso: document.getElementById('idCurso').value,
                FechaInicio: formatDate(document.getElementById('Fechainicio').value),
                FechaFin: formatDate(document.getElementById('Fechafin').value)
            }
            xml.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText);
                    var html = '<table id="tableCalifica" class="table table-bordered table-hover" style="margin-top:15px">';
                    html += '<thead class="text-center table-dark">';
                    html += '<tr>';
                    html += '<th> No. Empleado </th>';
                    html += '<th> Nombre </th>';
                    html += '<th> RFC </th>';
                    html += '<th> Puesto </th>';
                    html += '<th> Turno </th>';
                    html += '<th> Supervisor </th>';
                    html += '<th> Tipo Curso </th>';
                    html += '<th> Nombre del Curso </th>';
                    html += '<th> Campaña </th>';
                    html += '<th> Fecha Ingreso </th>';
                    html += '<th> Antigüedad </th>';
                    html += '<th> Calificacion </th>';
                    html += '<th> Fecha Certificacion </th>';
                    html += '<th> Estatus </th>';
                    html += '<th> Certificado </th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody class="tbody">';
                    var i;
                    for (i = 0; i < result.length; i++) {
                        html += '<tr>';
                        html += '<td>' + result[i].NumEmpleado + '</td>';
                        html += '<td>' + result[i].NombreCompleto + '</td>';
                        html += '<td>' + result[i].RFC + '</td>';
                        html += '<td>' + result[i].Puesto + '</td>';
                        html += '<td>' + result[i].Turno + '</td>';
                        html += '<td>' + result[i].Supervisor + '</td>';
                        html += '<td>' + result[i].Tipo + '</td>';
                        html += '<td>' + result[i].Curso + '</td>';
                        html += '<td>' + result[i].Campana + '</td>';
                        html += '<td>' + result[i].FechaIngreso + '</td>';
                        html += '<td>' + result[i].Antiguedad + ' años</td>';
                        html += '<td>' + result[i].Calificacion + '</td>';
                        html += '<td>' + result[i].FechaCertificado + '</td>';
                        html += '<td>' + result[i].Aprobado + '</td>';
                        if (result[i].Aprobado == "APROBADO") {
                            html += "<td><button title='Ver Certificado' onclick=\"VerCertificadoAdmin('" + result[i].FechaCertificado + "','" + result[i].Calificacion + "','" + result[i].NombreCompleto + "','" + result[i].Leyenda + "','" + result[i].Descripcion + "')\" class='btn' style='background:#4682b4; color:white; width: 50px;'><i class='fas fa-eye'></i></button></td>";
                        } else {
                            html += '<td></td>';
                        }
                        
                        html += '</tr>';
                    }
                    html += '</tbody>';
                    html += '</table>';

                    $('#tablaCalificaciones').html(html);
                   
                    $('#tableCalifica').DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                            'excel'
                        ]
                    });
                    document.getElementById("idCurso").value = 0;
                    document.getElementById("Fechainicio").value = "";
                    document.getElementById("Fechafin").value = "";
                }
            };

            xml.open("POST", url, true);
            xml.setRequestHeader("Content-Type", "application/json");
            xml.send(JSON.stringify(json));
        } else {
            alertify.error("Debes ingresar el curso a buscar");
        }

    } else {
        alertify.error("Ingresar al menos un criterio para generar el reporte");
    }
}



//Funcion para cargar los cursos calificados por busqueda de Numero de empleado
function CargarCalificacionesCursoXNumEmp() {
    if (document.getElementById('NumEmpCali').value != "" || document.getElementById('RFCcali').value != ""  )
    {
        if (document.getElementById('NumEmpCali').value != "" && document.getElementById('RFCcali').value != "") {
            alertify.error("Elija solo un solo parametro de busqueda");
            
        } else {
            var xml = new XMLHttpRequest();
            var url = hostInit + "/Curso/CargarCursosConCalificacionesxNumEmp";
            var json = {
                NumEmp: document.getElementById("NumEmpCali").value,
                RFC: document.getElementById("RFCcali").value
            }
            xml.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText);
                    console.log(result[0].Leyenda);
                    var html = '<table id="tableCalifica" class="table table-bordered table-hover" style="margin-top:15px">';
                    html += '<thead class="text-center">';
                    html += '<tr>';
                    html += '<th>';
                    html += 'No. Empleado';
                    html += '</th>';
                    html += '<th>';
                    html += 'RFC';
                    html += '</th>';
                    html += '<th>';
                    html += 'Nombre';
                    html += '</th>';
                    html += '<th>';
                    html += 'Nombre Evaluación';
                    html += '</th>';
                    html += '<th>';
                    html += 'Calificacion';
                    html += '</th>';
                    html += '<th>';
                    html += 'Fecha Aplicación';
                    html += '</th>';
                    html += '<th>';
                    html += 'Tipo Curso';
                    html += '</th>';
                    html += '<th>';
                    html += 'Certificado';
                    html += '</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody class="tbody">';
                    var i;
                    for (i = 0; i < result.length; i++) {
                        html += '<tr>';
                        html += '<td>' + result[i].NumEmpleado + '</td>';
                        html += '<td>' + result[i].RFC + '</td>';
                        html += '<td>' + result[i].NombreCompleto + '</td>';
                        html += '<td>' + result[i].Curso + '</td>';
                        html += '<td>' + result[i].Calificacion + '</td>';
                        html += '<td>' + result[i].FechaCertificado + '</td>';
                        html += '<td>' + result[i].Tipo + '</td>';
                        if (result[i].Aprobado == "APROBADO") {
                            html += "<td><button title='Ver Certificado' onclick=\"VerCertificadoAdmin('" + result[i].FechaCertificado + "','" + result[i].Calificacion + "','" + result[i].NombreCompleto + "','" + result[i].Leyenda + "','" + result[i].Descripcion + "')\" class='btn' style='background:#4682b4; color:white; width: 50px;'><i class='fas fa-eye'></i></button></td>";
                        } else {
                            html += '<td></td>';
                        }
                        html += '</tr>';
                    }
                    html += '</tbody>';
                    html += '</table>';

                    $('#tablaCalificaciones').html(html);

                    $('#tableCalifica').DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                            'excel'
                        ]
                    });
                    document.getElementById("NumEmpCali").value = "";
                }
            };

            xml.open("POST", url, true);
            xml.setRequestHeader("Content-Type", "application/json");
            xml.send(JSON.stringify(json));
        }
    } else {
        alertify.error("Elija un parametro de busqueda");
    }
}



//Este metodo es para que el admin pueda ver los certificados de todos los que lo realizaron
function VerCertificadoAdmin( fecha, score, nombre,Leyenda,Descripcion) {

    var s = score;
    var n = nombre;
    if (s >= 80) {
        var es_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
        if (es_chrome) {
            window.open(hostInit + "/Curso/Certificado", n, Descripcion, fecha, s, Leyenda);
            var data = { 'key1': n, 'key2': Descripcion, 'key3': fecha, 'key4': s, 'key5': Leyenda };
            localStorage.setItem("object_name", JSON.stringify(data));
        } else {
            window.open(hostInit + "/Curso/Certificado", n, Descripcion, fecha, s, Leyenda);
            var data = { 'key1': n, 'key2': Descripcion, 'key3': fecha, 'key4': s, 'key5': Leyenda };
            localStorage.setItem("object_name", JSON.stringify(data));
        }
    }
}


