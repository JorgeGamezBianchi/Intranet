
//Carga los cursos asignados de CANYRET del empleado
function CargarCursosAsignadosCANYRET() {
    document.getElementById("cursosNR").innerHTML = "";
    document.getElementById("cursosR").innerHTML = "";
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Curso/CargarCursosAsignados";
    var json = {
        //idPrograma: id,
        Usuario: sessionStorage.getItem('usuario'),
        Id:58
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var Array = JSON.parse(this.responseText);
            //console.log(Array);
            if (Array != "") {
                for (var i = 0; i < Array.length; i++) {
                    if (Array[i].Estatus == 0) { 
                        MostrarCursosAsignados(Array[i].Id_curso, Array[i].Nombre_Curso, Array[i].Estatus, i);
                        for (var j = 0; j < Array[i].Archivos.length; j++) {
                            
                            if (Array[i].Archivos[j].Tipo == "Contenido") {
                                MostrarContenidoCurso(Array[i].Nombre_Curso, Array[i].Descripcion, Array[i].Archivos[j].Nombre_archivo, Array[i].Archivos[j].Estado, Array[i].Archivos[j].Id_archivo, Array[i].Archivos[j].Tiempo, i, Array[i].Archivos[j].ID);
                                
                            }
                            else if (Array[i].Archivos[j].Tipo == "Actividad") {
                                MostrarActividad(Array[i].Nombre_Curso, Array[i].Archivos[j].Id_examen, i, Array[i].Id_curso, Array[i].Archivos[j].Id_archivo, Array[i].Archivos[j].Estado, Array[i].Archivos[j].Tiempo, Array[i].Archivos[j].ID);
                            }

                        }
                    }
                }
               

            } else {
                document.getElementById("cursos").innerHTML = "";
                alertify.warning("¡Lo siento, no tienes ningún curso asignado!");
            }
            MostrarCursosAsignadosRealizadosCANYRET();
        } else if (this.status == 500) {
            alertify.error("Error", "no se puede conectar a la base de datos");
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
    
}

//Carga los cursos asignados del empleado
function CargarCursosAsignados() {
    document.getElementById("cursosNR").innerHTML = "";
    document.getElementById("cursosR").innerHTML = "";
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Curso/CargarCursosAsignados";
    var json = {
        //idPrograma: id,
        Usuario: sessionStorage.getItem('usuario'),
        Id: 0
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var Array = JSON.parse(this.responseText);
            //console.log(Array);
            if (Array != "") {
                for (var i = 0; i < Array.length; i++) {
                    if (Array[i].Estatus == 0) {
                        MostrarCursosAsignados(Array[i].Id_curso, Array[i].Nombre_Curso, Array[i].Estatus, i);
                        for (var j = 0; j < Array[i].Archivos.length; j++) {

                            if (Array[i].Archivos[j].Tipo == "Contenido") {
                                MostrarContenidoCurso(Array[i].Nombre_Curso, Array[i].Descripcion, Array[i].Archivos[j].Nombre_archivo, Array[i].Archivos[j].Estado, Array[i].Archivos[j].Id_archivo, Array[i].Archivos[j].Tiempo, i, Array[i].Archivos[j].ID);

                            }
                            else if (Array[i].Archivos[j].Tipo == "Actividad") {
                                MostrarActividad(Array[i].Nombre_Curso, Array[i].Archivos[j].Id_examen, i, Array[i].Id_curso, Array[i].Archivos[j].Id_archivo, Array[i].Archivos[j].Estado, Array[i].Archivos[j].Tiempo, Array[i].Archivos[j].ID);
                            }

                        }
                    }
                }
            }
            else {
                document.getElementById("cursos").innerHTML = "";
                alertify.warning("¡Lo siento, no tienes ningún curso asignado!");
            }
            MostrarCursosAsignadosRealizados();
        } else if (this.status == 500) {
            alertify.error("Error", "no se puede conectar a la base de datos");
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}


function MostrarCursosAsignados(id, nombre, Estatus, i) {
    var out = document.getElementById("cursosNR").innerHTML;
    out += '    <div class="col-md-10 col-md-offset-2" style="margin-bottom: 20px;">';
    out += '       <div class="panel panel-info">';
    out += '            <div class="row align-items-center" style="background-color:#4682b4; border-radius: 5px; padding: 3px; font-size:20px;">';
    out += '                <div class="col-md-12" style="color: white">';
    out += '                    ' + nombre + '';
    out += '                </div>';
    out += '                <div clas="col-md-1" style="color:white;">';
    out += '                    <span data-bs-toggle="collapse" class="col-md-1" href="#collapse' + i + '" style="cursor: pointer;color: white; padding-right: 5px">&#9776;</span>';
    out += '                </div>';
    out += '            </div>';
    out += '            <div class="collapse panel-collapse in" id="collapse' + i + '">';
    out += '                <div class="panel-body">';
    out += '                    <div class="row align-items-center" style="justify-content: center !important;">';
    out += '                        <div class="col-md-10 form-group" id="divContenido">';
    out += '                            <table class=" row align-items-center table table:hover table-striped text-center style="justify-content: center !important;">';
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

    document.getElementById("cursosNR").innerHTML = out;
}

//Crea la tabla de los cursos que ya realizo el empleado
function MostrarCursosAsignadosRealizados() {

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Curso/CargarCursosRealizados";

    var json = {
        Usuario: sessionStorage.getItem('usuario'),
        Id: 0
    }
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var Array = JSON.parse(this.responseText);
            console.log(Array);
            console.log("MostrarCursosAsignadosRealizados");
            var out = document.getElementById("cursosR").innerHTML;

            out += '<div class="panel-body">';

            out += '<div  style="justify-content: center !important;">';
            out += ' <div class="col-md-10 row text-center justify-content-center" id="divContenido">';
            out += ' <table class="table table:hover table-striped text-center">';
            out += '<thead class="text-center" style="background-color:steelblue; color:white">';
            out += '<tr>';
            out += '<th>';
            out += '<h6 ><strong>ID</strong></h6>';
            out += '</th>';
            out += '<th>';
            out += '<h6><strong>NOMBRE DEL CURSO</strong></h6>';
            out += '</th>';
            out += '<th>';
            out += '<h6><strong>FECHA APLICACIÓN</strong></h6>';
            out += '</th>';
            out += '<th>';
            out += '<h6><strong>SCORE</strong></h6>';
            out += '</th>';
            out += '<th>';
            out += '<h6><strong>ESTATUS</strong></h6>';
            out += '</th>';
            out += '<th>';
            out += '<h6><strong>CERTIFICADO</strong></h6>';
            out += '</th>';
            out += '</tr>';
            out += '</thead>';
            out += '<tbody>';

            var i;

            //console.log(Array);
            for (i = 0; i < Array.length; i++) {
                
                for (var j = 0; j < Array[i].Curso.length; j++) {
                    out += '<tr>';
                    out += '<td style="text-align:center" ">' + (i + 1) + '</td>';
                    out += '<td>' + Array[i].Curso[j].Nombre_Curso + '</td>';
                    out += '<td>' + Array[i].Curso[j].FechaRealizado + '</td>';
                    out += '<td>' + Array[i].Curso[j].Score + '</td>';
                    out += '<td>' + Array[i].Curso[j].Status + '</td>';
                    out += "<td><button title='Ver Certificado' onclick=\"VerCertificado('" + Array[i].Curso[j].FechaRealizado + "','" + Array[i].Curso[j].Score + "','" + Array[i].Curso[j].IdExamen + "','" + Array[i].Id_CursoA + "','" + Array[i].Curso[j].Leyenda + "','" + Array[i].Curso[j].Descripcion + "')\" class='btn' style='background:#4682b4; color:white;'><i class='fas fa-eye'></i></button></td>";
                    out += '</tr>';
                }
            }
            out += '</tbody ></table > ';
            out += '</div>';
            out += '</div>';
            out += '</div>';
            out += '<br />';
            out += '<br />';
            document.getElementById("cursosR").innerHTML = out;
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(json));
}

//Crea la tabla de los cursos de CANYRET que ya realizo el empleado
function MostrarCursosAsignadosRealizadosCANYRET() {

    var xml = new XMLHttpRequest();
    var url = hostInit + "/Curso/CargarCursosRealizados";

    var json = {
        Usuario: sessionStorage.getItem('usuario'),
        Id: 58
    }
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var Array = JSON.parse(this.responseText);
            //console.log(Array);
            var out = document.getElementById("cursosR").innerHTML;
            out += '<div class="panel-body">';
            out += '<div  style="justify-content: center !important;">';
            out += ' <div class="col-md-10 row text-center justify-content-center" id="divContenido">';
            out += ' <table class="table table:hover table-striped text-center">';
            out += '<thead class="text-center" style="background-color:steelblue; color:white">';
            out += '<tr>';
            out += '<th>';
            out += '<h6 ><strong>ID</strong></h6>';
            out += '</th>';
            out += '<th>';
            out += '<h6><strong>NOMBRE DEL CURSO</strong></h6>';
            out += '</th>';
            out += '<th>';
            out += '<h6><strong>FECHA APLICACIÓN</strong></h6>';
            out += '</th>';
            out += '<th>';
            out += '<h6><strong>SCORE</strong></h6>';
            out += '</th>';
            out += '<th>';
            out += '<h6><strong>ESTATUS</strong></h6>';
            out += '</th>';
            out += '<th>';
            out += '<h6><strong>CERTIFICADO</strong></h6>';
            out += '</th>';
            out += '</tr>';
            out += '</thead>';
            out += '<tbody>';

            var i;

            console.log(Array);
            console.log("Cursos realizados CANYRET");
            for (i = 0; i < Array.length; i++) {
                for (var j = 0; j < Array[i].Curso.length; j++) {
                    if (Array[i].Curso[j].Id_curso == 58 || Array[i].Curso[j].Id_curso == 59 || Array[i].Curso[j].Id_curso == 60 || Array[i].Curso[j].Id_curso == 61) {
                        out += '<tr>';
                        out += '<td style="text-align:center" ">' + (i + 1) + '</td>';
                        out += '<td>' + Array[i].Curso[j].Nombre_Curso + '</td>';
                        out += '<td>' + Array[i].Curso[j].FechaRealizado + '</td>';
                        out += '<td>' + Array[i].Curso[j].Score + '</td>';
                        out += '<td>' + Array[i].Curso[j].Status + '</td>';
                        out += "<td><button title='Ver Certificado' onclick=\"VerCertificado('" + Array[i].Curso[j].FechaRealizado + "','" + Array[i].Curso[j].Score + "','" + Array[i].Curso[j].IdExamen + "','" + Array[i].Id_CursoA + "','" + Array[i].Curso[j].Leyenda + "','" + Array[i].Curso[j].Descripcion + "')\" class='btn' style='background:#4682b4; color:white;'><i class='fas fa-eye'></i></button></td>";
                        out += '</tr>';
                    }
                }
            }
            out += '</tbody ></table > ';
            out += '</div>';
            out += '</div>';
            out += '</div>';
            out += '<br />';
            out += '<br />';
            document.getElementById("cursosR").innerHTML = out;
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(json));
}


function MostrarContenidoCurso(nombre, curso, archivo, Estado, IdArchivo, Tiempo, cont,ID) {
    out = document.getElementById("contenido" + cont).innerHTML;
    out += '<tr id"TituloCurso"><td>' + curso + '</td>';
    var pdf = new Array(".pdf");
    var video = new Array(".mp4");
    var valor2 = archivo.substring(archivo.lastIndexOf('.'));

    if (valor2 == pdf && Estado == "True") {
        out += "<td class='col-md-1'><button title='Ver Cursos' disabled class='btn' style='background:#4682b4; color:white;'  onclick=\"ValidarArchivo('" + nombre + "','" + archivo + "','" + curso + "','" + IdArchivo + "','" + Tiempo + "')\"><i class='fas fa-file-pdf'></i></button></td>";
    } else if (valor2 == pdf && (Estado == "False" || Estado == "0")) {
        out += "<td class='col-md-1'><button title='Ver Cursos'  class='btn' style='background:#4682b4; color:white;'  onclick=\"ValidarArchivo('" + nombre + "','" + archivo + "','" + curso + "','" + IdArchivo + "','" + Tiempo + "')\"><i class='fas fa-file-pdf'></i></button></td>";
    }
    else if (valor2 == video && Estado == "True") {
        out += "<td class='col-md-1'><button title='Ver Cursos' disabled  class='btn' style='background:#4682b4; color:white;'  onclick=\"ValidarArchivo('" + nombre + "','" + archivo + "','" + curso + "','" + IdArchivo + "','" + Tiempo + "')\"><i class='fas fa-video'></i></button></td>";
    }
    else if (valor2 == video && (Estado == "False" || Estado == "0")) {
        out += "<td class='col-md-1'><button title='Ver Cursos'   class='btn' style='background:#4682b4; color:white;'  onclick=\"ValidarArchivo('" + nombre + "','" + archivo + "','" + curso + "','" + IdArchivo + "','" + Tiempo + "')\"><i class='fas fa-video'></i></button></td>";
    }
    out += ' </tr > <input id="IDContenido" value="' + ID + '" hidden />';
    document.getElementById("contenido" + cont).innerHTML = out;
}


function MostrarActividad(curso, IdExamen, cont, IdCurso, IdArchivo, Estado, Tiempo,ID) {
    out = document.getElementById("contenido" + cont).innerHTML;
    out += '</br>'
    out += '<tr id"TituloActividad"><td>' + 'Evaluación: ' + curso + '</td>';
    if (Estado == "True") {
        out += "<td class='col-md-1'><button title='Actividad' disabled  class='btn' style='background:#17A2B8; color:white;'  onclick=\"VerActividad('" + IdExamen + "','" + curso + "','" + IdCurso + "','" + IdArchivo + "','" + Estado + "','" + Tiempo + "')\"><i class='fas fa-tasks'></i></button></td>";
    } else {
        out += "<td class='col-md-1'><button title='Actividad'  class='btn' style='background:#17A2B8; color:white;'  onclick=\"VerActividad('" + IdExamen + "','" + curso + "','" + IdCurso + "','" + IdArchivo + "','" + Estado + "','" + Tiempo + "')\"><i class='fas fa-tasks'></i></button></td>";
    }
    out += ' </tr >';
    document.getElementById('IdActividad').value = ID;
    document.getElementById("contenido" + cont).innerHTML = out;
}


//Funcion para validar la extension del archivo

function ValidarArchivo(nombre, archivo, curso, IdArchivo, Tiempo) {
    var validExts = new Array(".pdf", ".mp4", ".avi");
    var pdf = new Array(".pdf");
    var video = new Array(".mp4", ".avi");
    var valor2 = archivo.substring(archivo.lastIndexOf('.'));

    if (validExts.indexOf(valor2) < 0) {
        alert("El archivo seleccionado no tiene una extensión valida " +
            validExts.toString() + " types.");
    }
    else if (valor2 == pdf) {
        startPdf(nombre, archivo, curso, IdArchivo, Tiempo);
    }
    else if (video.indexOf(valor2) == ".mp4" || ".avi") {
        Video(nombre, archivo, curso, IdArchivo);
    }
}

var pagina1 = 0;
var pagina2 = 0;

// Funcion para preparar el canvas para cargar el pdf
const PDFStart = nameRoute => {
    let loadingTask = pdfjsLib.getDocument(nameRoute),
        pdfDoc = null,
        canvas = document.querySelector('#cnv'),
        ctx = canvas.getContext('2d'),
        scale = 2.5,
        numPage = 1;

    const GeneratePDF = numPage => {

        pdfDoc.getPage(numPage).then(page => {

            let viewport = page.getViewport({ scale: scale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            let renderContext = {
                canvasContext: ctx,
                viewport: viewport
            }

            page.render(renderContext);

        })
        document.querySelector('#npages').innerHTML = 'Página' + numPage + '/';
        document.querySelector('#pages').innerHTML = pdfDoc.numPages;
        Paginas(numPage, pdfDoc.numPages);
        //run_clock('clockdiv', deadline);
        var TiempoP = document.getElementById("Tiempo").value;

        if (TiempoP != 0) {
            Tiempo(TiempoP);
           // console.log('Entra al if');
        } else {
            document.getElementById("time").hidden = true;
            document.getElementById('prev').disabled = false;
        }
    }


    const PrevPage = () => {
        if (numPage === 1) {
            return
        }
        numPage--;
        GeneratePDF(numPage);
    }

    const NextPage = () => {
        if (numPage >= pdfDoc.numPages) {

            return
        }
        numPage++;
        GeneratePDF(numPage);
        resetPage();
    }
    document.querySelector('#prev').addEventListener('click', PrevPage)
    document.querySelector('#next').addEventListener('click', NextPage)
    loadingTask.promise.then(pdfDoc_ => {
        pdfDoc = pdfDoc_;
        document.querySelector('#npages').innerHTML = pdfDoc.numPages;
        GeneratePDF(numPage)
    });
}


let fp;

function Paginas(pagina, paginas) {
    if (pagina == paginas) {
        fp = "True";

        document.getElementById('Id_estatusP').value = fp;
    }
    else {
        fp = "False";
        document.getElementById('Id_estatusP').value = fp;
    }
}


function ValidaFinalPdf(fp) {

    var IdArchivo = document.getElementById('Id_archivoP').value;
    var ID = document.getElementById('IDContenido').value;
    GuardarEstatus(IdArchivo, fp, ID);
    setTimeout(function () {
        Regresar();
    }, 1000);
}


//Funcion para cargar el video
function Video(nombre, archivo, curso, IdArchivo) {
    document.getElementById('tituloC').innerHTML = curso;

    document.getElementById('cursos').hidden = true;
    document.getElementById('CursoV').hidden = false;
    out = document.getElementById("CursoV").innerHTML;
    out += ' <div class="row align-items-center justify-content-center">';
    out += '<div class=" row align-items-center justify-content-center col-md-9">';
    out += ' </div>';
    out += '<div class=" row align-items-center justify-content-center col-md-3">';
    out += "<button  onclick=\"ValidarFinalVideo('" + IdArchivo + "')\" title='Regresar'  class='button-pill button-primary col-md-3' id='atras' style='width:10%;margin-left:110px'><i class='fas fa-arrow-alt-circle-left'></i></button>";
    out += '</div>';
    out += '</div>';
    out += '</br>'
    out += '<video id="video" width="400" controls autoplay><source src="../Media/ArchivosCursos/' + nombre + '/' + archivo + '" type="video/mp4">'
    out += '</video >'
    out += '<input id="Id_archivoV" hidden />'
    out += '<input id="Id_estatusV" hidden />'
    document.getElementById("CursoV").innerHTML = out;
    document.getElementById('Id_archivoV').value = IdArchivo;

}


function VerActividad(IdExamen, curso, IdCurso, IdArchivo, Estado, Tiempo) {
    document.getElementById('Actividad').hidden = false;
    document.getElementById('cursos').hidden = true;
    document.getElementById('Id_Examen').value = IdExamen;
    document.getElementById('tituloC').innerHTML = "Evaluación: " + curso;
    document.getElementById('Id_Curso').value = IdCurso;
    document.getElementById('Id_archivoE').value = IdArchivo;
    document.getElementById('TiempoA').value = Tiempo;
}


///////////////////EVALUACION
function IniciarEvaluacionC() {
    var id = document.getElementById('Id_Examen').value;
    var usuario = sessionStorage.getItem('usuario');
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Encuestas/IniciarEvaluacion";
    var json = {
        NumeroEmpleado: usuario,
        IdExamen: id
    }
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result > 0) {
                document.getElementById('btnIniciarEva').hidden = true;
                CargarEvalucionC(result);
                document.getElementById('btnEvaluacion').hidden = false;
                var ti = document.getElementById('TiempoA').value;
                if (ti != 0) {

                } else {
                    document.getElementById("timeA").hidden = true;
                }
            } else {
                alertify.warning("¡Lo siento, no se inicio la encuesta!");
            }
        } else if (this.status == 500) {
            alertify.warning("¡Error, no se puede conectar a la base de datos!");
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}


function CargarEvalucionC(idEvaluacion) {
    document.getElementById('Id_cuestionario').value = idEvaluacion;
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Encuestas/CargarEvaluacion";
    var json = {
        idExamen: document.getElementById('Id_Examen').value
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            if (myArr != "") {
                //var re = 11;
                for (var i = 0; i < myArr.Preguntas.length; i++) {
                    mostrarEvaluacion(myArr.Preguntas[i], myArr.Respuestas, myArr.Preguntas[i].Grupo);
                    document.getElementById('DivEvaluacion').hidden = false;
                }
            } else {
                alertify.warning("¡Lo siento, hubo un error!");
            }
        } else if (this.status == 500) {
            alertify.warning("¡Error, no se puede conectar a la base de datos!");
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}


function mostrarEvaluacion(preguntas, respuestas, Grupo) {
    out = document.getElementById("tablaEvaluacion").innerHTML;
    out += ' <label id="score" style="margin-left:10px;color:red;font-size:40px;" hidden><strong></strong></label>';
    out += '<div class="modal-dialog modal-xl">';
    out += '    <div class="modal-content" style="width:100%; height:100%">';
    out += '        <div id="modalHeader" class="modal-header justify-content-center" style="background-color:lightgray">';
    out += '            <h4 class=" col-md-10 modal-title text-center" id=""><strong>' + preguntas.Pregunta + '</strong></h4>';
    out += '        </div>';
    out += '        <div name="pregunta" class="modal-body text-justify">';
    out += '            <input type="radio" value="0" name="radio' + Grupo + '" hidden checked />';

    for (var i = 0; i < respuestas.length; i++) {
        if (preguntas.Grupo == respuestas[i].Grupo) {
            //console.log(respuestas[i].Grupo);
            out += '<label class="container" name="radios">';
            out += '<input type="radio" value="' + respuestas[i].Opcion + '" name="radio' + respuestas[i].Grupo + '">';
            out += '<span class="checkmark"></span>';
            out += '' + respuestas[i].Respuesta + '';
            out += '</label>';
        }
    }
    out += '</div>';
    out += '</div>';
    out += '</div>';
    out += '<div id="retro' + Grupo + '" class="alert alert-success text-center" hidden > '
    for (var i = 0; i < respuestas.length; i++) {
        if (preguntas.Grupo == respuestas[i].Grupo) {
            //console.log(respuestas[i].Grupo);
        }
    }
    out += '</div>'
    document.getElementById("tablaEvaluacion").innerHTML = out;
}



//Hace la solicitud y trae los resultados del examen (retroalimentacion)
function ObtenerRetroa(Grupo, numero) {
    var json = {
        Grupo: Grupo,
        idEvaluacion: document.getElementById('Id_cuestionario').value
    };
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Curso/Calificar";
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            document.getElementById('score').hidden = false;
            document.getElementById('score').innerHTML = "Score : " + result.Score + "/" + numero + "";
            document.getElementById('btnEvaluacion').hidden = true;
            document.getElementById('btnFinalizar').hidden = false;

            if (result.Retroalimentacion != "") {
                if (result.Respuesta == 1) {
                    document.getElementById('retro' + Grupo).hidden = false;
                    document.getElementById('retro' + Grupo).className = "alert alert-success text-center"
                    document.getElementById('retro' + Grupo).innerHTML = "<p><strong>Respuesta correcta</strong></p>";
                } else {
                    document.getElementById('retro' + Grupo).hidden = false;
                    document.getElementById('retro' + Grupo).className = "alert alert-warning text-center"
                    document.getElementById('retro' + Grupo).innerHTML = "<p><strong>Respuesta incorrecta</strong></br>La respuesta es: <strong>" + result.Retroalimentacion + "</strong></p>";
                }
            }
            ValidarCalificacion(result.Score, numero);
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader('Content-Type', 'application/json;');
    xml.send(JSON.stringify(json));
    
}


function ValidarCalificacion(score, numero) {
    var calificacion = (score * 100) / numero;
    //console.log(calificacion);
    let cal = "";

    if (calificacion >= 80) {
        alertify.alert('', '¡FELICIDADES APROBO!', function () {

        });
        cal = "ACREDITADO";
        UpdateEstatus(cal);
    } else {
        alertify
            .alert('', 'CALIFICACIÓN NO APROBATORIA', function () {

            });
        cal = "NO ACREDITADO";
        UpdateEstatus(cal);
    }
}


function UpdateEstatus(c) {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Curso/UpdateEstatus";
    var json = {
        IdVariable: document.getElementById('Id_cuestionario').value,
        calificacion: c
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}


function CargarGrupo() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Encuestas/CargarGrupo";
    var json = {
        idExamen: document.getElementById('Id_Examen').value
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            if (myArr != "") {
                var cont = 0;
                var preguntas;
                for (var i = 0; i < myArr.Preguntas.length; i++) {
                    preguntas = myArr.Preguntas.length;
                    //ValidaRespuestasEvaluacion2(myArr.Preguntas[i].Grupo, myArr.Preguntas.length);
                    if (document.querySelector('input[name="radio' + myArr.Preguntas[i].Grupo + '"]:checked').value != 0) {
                        cont++;
                    } else {
                        cont + 1

                    }
                }

                if (cont == preguntas) {
                    let idEvaluacion = document.getElementById('Id_cuestionario').value;
                    let IdCurso = document.getElementById('Id_Curso').value;
                    var r = document.querySelectorAll('input[type="radio"]:checked');
                    var respuestas = document.getElementsByName("radios");

                    for (var i = 0; i < myArr.Preguntas.length; i++) {
                        //console.log(idEvaluacion, myArr.Preguntas[i].Grupo, r[i].value);
                        mandarJsonEvaluacion2(idEvaluacion, myArr.Preguntas[i].Grupo, r[i].value, IdCurso);
                    }
                    let Id_estatusE;
                    Id_estatusE = "True";
                    var IdArchivo = document.getElementById('Id_archivoE').value;
                    document.getElementById('Id_estatusE').value = Id_estatusE;
                    var ID = document.getElementById("IdActividad").value;
                    GuardarEstatus(IdArchivo, Id_estatusE, ID);
                    alertify.warning("¡Terminaste la encuesta exitosamente!");
                    for (var i = 0; i < myArr.Preguntas.length; i++) {
                        ObtenerRetroa(myArr.Preguntas[i].Grupo, myArr.Preguntas.length);
                        //Retro(myArr.Preguntas[i].Grupo);
                    }
                    //setTimeout(function () {
                    //    window.location.reload(true);
                    //}, 2000);
                } else {
                    alertify.error("¡Debes contestar todas las preguntas!");
                }
            } else {
                alertify.warning("¡Lo siento, hubo un error!");
            }

        } else if (this.status == 500) {
            alertify.warning("¡Error, no se puede conectar a la base de datos!");
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}



function mandarJsonEvaluacion2(idExamen, grupo, opcion, IdCurso) {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Encuestas/GuardarEva";
    var json = {
        idExamen: idExamen,
        grupo: grupo,
        opcion: opcion,
        IdCurso: IdCurso
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}



function Regresar() {
    setTimeout(function () {
        window.location.reload(true);
    }, 1000);
}


let EstatusVideo = "";
function ValidarFinalVideo(IdArchivo) {
    var video = document.getElementById('video');
    EstatusVideo = video.ended;
    document.getElementById('Id_estatusV').value = EstatusVideo;
    //console.log(EstatusVideo);
    GuardarEstatus(IdArchivo, EstatusVideo);
    setTimeout(function () {
        Regresar();
    }, 1000);
}


function GuardarEstatus(IdArchivo, EstatusVideo, ID) {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Curso/GuardarEstatus";
    var json = {
        NumEmpleado: sessionStorage.getItem('usuario'),
        IdArchivo: IdArchivo,
        EstatusVideo: EstatusVideo,
        ID: ID
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}


function ActualizarEstatus() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Curso/GuardarEstatus";
    var json = {
        NumEmpleado: sessionStorage.getItem('usuario'),
        IdArchivo: IdArchivo,
        EstatusVideo: EstatusVideo,
        ID: ID
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}


////////TIEMPO
var secondsRemaining;
var intervalHandle;

function resetPage() {
    var m = document.getElementById('time');
    var timeDisplay = m;
    timeDisplay.innerHTML = "0:00";
    clearInterval(intervalHandle);
}


function tick() {
    // grab the h1
    var m = document.getElementById('time');
    var timeDisplay = m;

    // turn the seconds into mm:ss
    var min = Math.floor(secondsRemaining / 60);
    var sec = secondsRemaining - (min * 60);

    //add a leading zero (as a string value) if seconds less than 10
    if (sec < 10) {
        sec = "0" + sec;
    }

    // concatenate with colon
    var message = min.toString() + ":" + sec;

    // now change the display
    timeDisplay.innerHTML = message;

    // stop is down to zero
    if (secondsRemaining === 0 || secondsRemaining < 0) {
        document.getElementById('next').click();
        clearInterval(intervalHandle);
        resetPage();
    }

    if (secondsRemaining < 0) {
        timeDisplay.innerHTML = "0:00"
        timeDisplay.hidden = true;
        document.getElementById('Regresar').click();
    }
    //subtract from seconds remaining
    secondsRemaining--;
}


function Tiempo(minutos) {
    document.getElementById('prev').disabled = true;
    var minutes = minutos;
    // segundos
    secondsRemaining = minutes * 60;

    //every second, call the "tick" function
    // have to make it into a variable so that you can stop the interval later!!!
    intervalHandle = setInterval(tick, 1000);
}


function ta() {
    // grab the h1
    var m = document.getElementById('timeA');
    var timeDisplay = m;

    // turn the seconds into mm:ss
    var min = Math.floor(secondsRemaining / 60);
    var sec = secondsRemaining - (min * 60);

    //add a leading zero (as a string value) if seconds less than 10
    if (sec < 10) {
        sec = "0" + sec;
    }

    // concatenate with colon
    var message = min.toString() + ":" + sec;

    // now change the display
    timeDisplay.innerHTML = message;
    //console.log(message);

    // stop is down to zero
    if (secondsRemaining === 0 || secondsRemaining < 0) {

        document.getElementById('btnEvaluacion').click();

        clearInterval(intervalHandle);
        resetPage();
    }

    if (secondsRemaining < 0) {

        timeDisplay.innerHTML = "0:00"
        timeDisplay.hidden = true;
        document.getElementById('btnEvaluacion').click();
    }

    //subtract from seconds remaining
    secondsRemaining--;
}

function TiempoActividad(minutos) {

    var minutes = minutos;
    // segundos
    secondsRemaining = minutes * 60;

    //every second, call the "tick" function
    // have to make it into a variable so that you can stop the interval later!!!
    intervalHandle = setInterval(ta, 1000);
}


function startPdf(nombre, archivo, curso, IdArchivo, Tiempo) {
    document.getElementById('cursos').hidden = true;
    document.getElementById('CursoA').hidden = false;
    PDFStart('../Media/ArchivosCursos/' + nombre + '/' + archivo + '');
    document.getElementById('tituloC').innerHTML = curso;
    document.getElementById('Id_archivoP').value = IdArchivo;
    document.getElementById('Tiempo').value = Tiempo;
}



/// Ver certificado
function VerCertificado( fecha, score, idexamen, ID, Leyenda, Descripcion) {
    //$("#modalCertificado").modal();
    var s = score;
    var n = sessionStorage.getItem('nombreU');
    
    if (s >= 80) {

        //var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        var es_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
        if (es_chrome) {
            window.open(hostInit + "/Curso/CertificadoC", n, Descripcion, fecha, s, Leyenda);
            var data = { 'key1': n, 'key2': Descripcion, 'key3': fecha, 'key4': s, 'key5': Leyenda };
            localStorage.setItem("object_name", JSON.stringify(data));
        } else {
            window.open(hostInit + "/Curso/Certificado", n, Descripcion, fecha, s, Leyenda);
            var data = { 'key1': n, 'key2': Descripcion, 'key3': fecha, 'key4': s, 'key5': Leyenda };
            localStorage.setItem("object_name", JSON.stringify(data));
        }
    }
    else {
        Intentos(idexamen, fecha, ID);
    }
}


function Intentos(idexamen, fecha,ID) {
    //console.log(ID);
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Curso/IntentosEvaluacion";
    var json = {
        idexamen: idexamen,
        NumEmpleado: sessionStorage.getItem('usuario'),
        ID: ID
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            alertify.message('Tiene otro intento para responder la actividad');
            setTimeout(function () {
                window.location.reload(true);
            }, 1000);
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}