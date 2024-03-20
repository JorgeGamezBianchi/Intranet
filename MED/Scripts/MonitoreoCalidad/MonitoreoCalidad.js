
var resta = 0; //Variable que revisara quien realizo la ultima resta del monitoreo del RVT
var suma = 0; //Variable que revisara quien realizo la ultima suma del monitoreo del RVT

var camposMoni = ["Tipo de llamada", "Serie", "Folio", "Fecha venta", "Fecha evaluación", "Tipificacion RVT", "Tipificación Correcta", "¿Tipifico correctamente?", "Descripción de la llamada del RVT", "Feedback del RVT"]
var camposVenta = ["Seleccionar al Validador", "Descripción de la llamada del Validador", "Feedback del Validador"]

var moniECSR = ["Supervisor", "Validador", "STATUS DEL TRÁMITE", "MONITOREO/CALIBRACIÓN", "Analista", "# CENTRO AUTORIZADO", "NIVEL DE SATISFACCIÓN", "AUDIO CLIENTE", "AUDIO EJECUTIVO", "AUDIO VALIDADOR", "Llamadas de Seg", "FECHA VENTA", "FECHA ESCUCHA", "ID (DIRECTO)", "ID Centro", "COMENTARIOS", "TIPIFICACIÓN", "TIPIFICACIÓN CENTRO", "TIPIFICACIÓN CORRECTA"]
var moniECSV = ["NOMBRE DE EL SUPERVISOR", "NOMBRE DE EL VALIDADOR", "AUDIO VALIDADOR"]

var nom;
var va2 = 0;
var va = 0;
var sumaEstVta = 0;
var sumaTotVali = 0;
var sumaTotalVenta = 0;
var sumaTotCali = 0;

let errorCriticoVenta = [];
let errorCriticoVali = [];
let legalVentaAux = [];
let legalValiAux = [];

const txtAyuda = [
    "Gracias por tomar la llamada, nos interesa mucho apoyarle y por eso queremos brindarle información valiosa sobre una oferta que tenemos para usted.¿me permite continuar ?",
    "Le informo que la llamada será grabada con fines de calidad para garantizarle un mejor servicio",
    "Le recordamos que en Citibanamex y Tarjetas Banamex sus datos están protegidos. Puede consultar el aviso de privacidad en www.citibanamex.com/avisodeprivacidad o en la sucursal de su preferencia"];

const rubrosCalidad = [46, 48,];//Rubros que califican a Total Calidad
const rubrosVenta = [43, 47, 49, 50, 51, 52, 50, 51, 52, 53];//Rubros que califican a Estructura de Venta
const idMonitoreoVenta = [606, 607, 642];//Id monitoreo que califica a Estructura Venta
const legalesVenta = [586, 588, 590, 591];//Id de monitoreo asignados a Legales de Venta
const legalesVali = [663, 664, 669, 681, 690];//Id de monitoreo asignados a Legales de Validacion
const criticoVenta = [657, 658, 659, 660, 661, 662];//Id de monitoreo asignados a Errores de venta
const criticoVali = [713, 714, 715, 716, 717, 718];//Id de monitoreo asignados a Errores de validacion

/*------------------------- Inician modificaciones Jorge y Pablo -------------------------*/

//Guarda la cedula 
//incompleto Pablo
//valida si es venta o no para guardar el area de Validacion
function InsertarTablasMonitoreo() {
    let campana = document.getElementById('Campana');
    let nombreEjecutivo = document.getElementById('BuscaRFC');
    let supervisor = document.getElementById("Id_Supervisor");
    let validador = document.getElementById("NombValiECS");
    let statusTramite = document.getElementById("statusTramite");
    let monitoreoCalibra = document.getElementById("monitoreoCalibracion");
    let centroAutori = document.getElementById("centroAutorizado");
    let satisfaccion = document.getElementById("satisfaccion");
    let audioC = document.getElementById("AudioC");
    let audioE = document.getElementById("AudioE");
    let audioV = document.getElementById("AudioV");
    let llamadaSeg = document.getElementById("llamadaSeg");
    let fechaVenta = document.getElementById("FechaVentaECS");
    let fechaEscucha = document.getElementById("FechaEscuECS");
    let idDirecto = document.getElementById("idDirecto");
    let idCentro = document.getElementById("idCentro");
    let txtComentarios = document.getElementById("txtComentarios");
    let tipiECS = document.getElementById("TipiECS");
    let tipiCentro = document.getElementById("TipiCentro");
    let tipiCorrecta = document.getElementById("TipiCorrecta");
    let estructuraVta = document.getElementById("estructuraVta");
    let totalCalidad = document.getElementById("totalCalidad");
    let totalVenta = document.getElementById("TotalVenta");
    let totalValidacion = document.getElementById("totalValidacion");
    let totalLlamada = document.getElementById("totalLlamada");
    let idCenErrorCriticoVentatro = document.getElementById("ErrorCriticoVenta");
    let errorCriticoValidacion = document.getElementById("ErrorCriticoValidacion");
    let scriptUsado = document.getElementById("scriptUsado");

    var xml = new XMLHttpRequest();
    var url = hostInit + "/MonitoreoCalidad/InsertarMonitoreo";
    var json = {
        NomEjecutivo: document.getElementById('BuscaRFC').value,
        NomSuper: document.getElementById('Id_Supervisor').value,
        NomValidador: document.getElementById('NombValiECS').value,
        StatusTram: document.getElementById('statusTramite').value,
        Monitoreo: document.getElementById('monitoreoCalibracion').value,
        Anaista: document.getElementById('analistaCal').value,
        Centro: document.getElementById('centroAutorizado').value,
        Satisfaccion: document.getElementById('satisfaccion').value,
        AudioCliente: document.getElementById('AudioC').value,
        AudioEjecutivo: document.getElementById('AudioE').value,
        AudioValidador: document.getElementById('AudioV').value,
        LlamadaSeg: document.getElementById('llamadaSeg').value,
        FechaVta: document.getElementById('FechaVentaECS').value,
        FechaEscucha: document.getElementById('FechaEscuECS').value,
        IdDirecto: document.getElementById('idDirecto').value,
        IdCentro: document.getElementById('idCentro').value,
        Comentarios: document.getElementById('txtComentarios').value,
        Tipificacion: document.getElementById('TipiECS').value,
        TipificacionCentro: document.getElementById('TipiCentro').value,
        TipificacionCorrecta: document.getElementById('TipiCorrecta').value,
        EstructuraVenta: document.getElementById('estructuraVta').value,
        TotalCalidad: document.getElementById('totalCalidad').value,
        TotaValidacion: document.getElementById('totalValidacion').value,
        TotalVenta: document.getElementById('TotalVenta').value,
        TotalLlamada: document.getElementById('totalLlamada').innerHTML,
        ErrorCritico: document.getElementById('ErrorCriticoECS').value,
        Script: document.getElementById('scriptUsado').value
    }

    if (document.getElementById('Campana').value != null) {

        if (document.getElementById('NomRVTECS').value != ""
            && document.getElementById('Id_Supervisor').value != 0
            && document.getElementById('NombValiECS').value != 0
            && document.getElementById('statusTramite').value != ""
            && document.getElementById('monitoreoCalibracion').value != ""
            && document.getElementById('analistaCal').value != ""
            && document.getElementById('centroAutorizado').value != ""
            && document.getElementById('satisfaccion').value != ""
            && document.getElementById('AudioC').value != 0
            && document.getElementById('AudioE').value != 0
            && document.getElementById('AudioV').value != 0
            && document.getElementById('llamadaSeg').value != ""
            && document.getElementById('FechaVentaECS').value != ""
            && document.getElementById('FechaEscuECS').value != ""
            && document.getElementById('idDirecto').value != ""
            && document.getElementById('idCentro').value != ""
            && document.getElementById('txtComentarios').value != ""
            && document.getElementById('TipiECS').value != 0
            && document.getElementById('TipiCentro').value != 0
            && document.getElementById('TipiCorrecta').value != 0
            && document.getElementById('estructuraVta').value != ""
            && document.getElementById('totalCalidad').value != ""
            && document.getElementById('TotalVenta').value != ""
            && document.getElementById('totalLlamada').value != ""
            && document.getElementById('ErrorCriticoECS').value != ""
            && document.getElementById('scriptUsado').value != "") {
            //Valida si la llamada es venta o no, si es venta manda la calificación del validador
            if (document.getElementById('statusTramite').value == "Venta Declinada"
                || document.getElementById('statusTramite').value == "Venta Precreada"
                || document.getElementById('statusTramite').value == "Sin status") {

                //Valida que los datos del validador esten llenos
                if (document.getElementById('Id_Supervisor').value != 0 && document.getElementById('NombValiECS').value != 0) {

                    if (document.getElementById('TotalVenta').value == 0 || document.getElementById('totalValidacion').value == 0) {
                        alertify.confirm('Alerta', 'Se obtuvo un error critico. ¿Está seguro de guardar el monitoreo?', function () {
                            xml.onreadystatechange = function () {

                                if (this.readyState == 4 && this.status == 200) {
                                    var result = JSON.parse(this.responseText);
                                    if (result.IdVariable != 0) {
                                        document.getElementById('idVariableECS').value = result.IdVariable;
                                        //Manda las respuestas del RVT 
                                        //Trae todos select del monitoreo de los RVTs con sus valores
                                        let y = document.querySelectorAll('select[id="CumplimientoRVTECS"]');
                                        //Trae todos los IDs de las preguntas del los RVTs
                                        let n = document.querySelectorAll('input[id="IdMonitoreoRVTECS"]');
                                        var op = $('select[id="CumplimientoRVTECS"] option:selected');
                                        for (var z = 0; z < y.length; z++) {
                                            //Manda los datos al metodo para mandar las respuestas RVTs
                                            MandarRespuestas(document.getElementById('idVariableECS').value, n[z].value, y[z].value, op[z].textContent);
                                        }

                                        //Manda las respuestas del Validador
                                        //Trae todos select del monitoreo de los RVTs con sus valores
                                        let val = document.querySelectorAll('select[id="CumplimientoValECS"]');
                                        //Trae todos los IDs de las preguntas del los RVTs
                                        let m = document.querySelectorAll('input[id="IdMonitoreoValECS"]');
                                        var opv = $('select[id="CumplimientoValECS"] option:selected');
                                        for (var i = 0; i < val.length; i++) {
                                            //Manda los datos al metodo para mandar las respuestas RVTs
                                            MandarRespuestas(document.getElementById('idVariableECS').value, m[i].value, val[i].value, opv[i].textContent);
                                        }

                                        document.getElementById('myModal1').style.display = 'block';
                                        document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                                        document.getElementById('myModalLabel').innerHTML = "¡Correcto!";
                                        document.getElementById('infoModal').innerHTML = "Evaluación de monitoreo guardado exitosamente!";
                                        document.getElementById('MONITOREO').hidden = true;
                                        document.getElementById('Campana').value = 0;
                                        document.getElementById('Campana').disabled = true;
                                        LimpiarCamposMonitoreoCali();
                                        setTimeout(function () {
                                            window.location.reload(true);
                                        }, 3000);
                                    }
                                    else {
                                        document.getElementById('myModal1').style.display = 'block';
                                        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                                        document.getElementById('myModalLabel').innerHTML = "Advertencia";
                                        document.getElementById('infoModal').innerHTML = "Error al insertar";
                                    }
                                }
                            };
                            xml.open("POST", url, true);
                            xml.setRequestHeader('Content-Type', 'application/json');
                            xml.send(JSON.stringify(json));
                        }, function () {
                            alertify.error('Cancel')
                        });
                    }

                    else {
                        xml.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                var result = JSON.parse(this.responseText);
                                if (result.IdVariable != 0) {
                                    document.getElementById('idVariableECS').value = result.IdVariable;
                                    //Manda las respuestas del RVT
                                    //Trae todos select del monitoreo de los RVTs con sus valores
                                    let y = document.querySelectorAll('select[id="CumplimientoRVTECS"]');
                                    //Trae todos los IDs de las preguntas del los RVTs
                                    let n = document.querySelectorAll('input[id="IdMonitoreoRVTECS"]');
                                    var op = $('select[id="CumplimientoRVTECS"] option:selected');
                                    for (var z = 0; z < y.length; z++) {
                                        //Manda los datos al metodo para mandar las respuestas RVTs
                                        MandarRespuestas(document.getElementById('idVariableECS').value, n[z].value, y[z].value, op[z].textContent);
                                        console.log(n[z].textContent);
                                    }

                                    //Manda las respuestas del Validador
                                    //Trae todos select del monitoreo de los RVTs con sus valores
                                    let val = document.querySelectorAll('select[id="CumplimientoValECS"]');
                                    //Trae todos los IDs de las preguntas del los RVTs
                                    let m = document.querySelectorAll('input[id="IdMonitoreoValECS"]');
                                    var opv = $('select[id="CumplimientoValECS"] option:selected');
                                    for (var i = 0; i < val.length; i++) {
                                        //Manda los datos al metodo para mandar las respuestas RVTs
                                        MandarRespuestas(document.getElementById('idVariableECS').value, m[i].value, val[i].value, opv[i].textContent);
                                    }

                                    document.getElementById('myModal1').style.display = 'block';
                                    document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                                    document.getElementById('myModalLabel').innerHTML = "¡Correcto!";
                                    document.getElementById('infoModal').innerHTML = "Evaluación de monitoreo guardado exitosamente!";
                                    document.getElementById('MONITOREO').hidden = true;
                                    document.getElementById('Campana').value = 0;
                                    document.getElementById('Campana').disabled = true;
                                    LimpiarCamposMonitoreoCali();
                                    setTimeout(function () {
                                        window.location.reload(true);
                                    }, 3000);
                                }
                                else {
                                    document.getElementById('myModal1').style.display = 'block';
                                    document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                                    document.getElementById('myModalLabel').innerHTML = "Advertencia";
                                    document.getElementById('infoModal').innerHTML = "Error al insertar";
                                }
                            }
                        };
                        xml.open("POST", url, true);
                        xml.setRequestHeader('Content-Type', 'application/json');
                        xml.send(JSON.stringify(json));
                    }
                }

                //Else de la validacion de los campos de validacion
                else {
                    var inputs = document.getElementsByName('ventaecs');
                    for (var i = 0; i < inputs.length; i++) {

                        if (inputs[i].value == "" || inputs[i].value == 0) {
                            //console.log("Falta " + campos[i]);
                            document.getElementById('myModal1').style.display = 'block';
                            document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                            document.getElementById('myModalLabel').innerHTML = "Advertencia";
                            document.getElementById('infoModal').innerHTML = "Falta llenar campo de " + moniECSV[i];
                            inputs[i].focus();
                            break;
                        }
                    }
                }
            }
            //Else de la validacion del tipo de llamada
            else {
                if (document.getElementById('TotalVenta').value == 0) {
                    alertify.confirm('Alerta', 'Se obtuvo un error critico. ¿Está seguro de guardar el monitoreo?', function () {
                        xml.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                var result = JSON.parse(this.responseText);
                                if (result.IdVariable != 0) {
                                    document.getElementById('idVariableECS').value = result.IdVariable;

                                    //Manda las respuestas del RVT
                                    //Trae todos select del monitoreo de los RVTs con sus valores
                                    let y = document.querySelectorAll('select[id="CumplimientoRVTECS"]');
                                    //Trae todos los IDs de las preguntas del los RVTs
                                    let n = document.querySelectorAll('input[id="IdMonitoreoRVTECS"]');
                                    var op = $('select[id="CumplimientoRVTECS"] option:selected');
                                    for (var z = 0; z < y.length; z++) {
                                        //Manda los datos al metodo para mandar las respuestas RVTs
                                        MandarRespuestas(document.getElementById('idVariableECS').value, n[z].value, y[z].value, op[z].textContent);
                                    }
                                    document.getElementById('myModal1').style.display = 'block';
                                    document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                                    document.getElementById('myModalLabel').innerHTML = "¡Correcto!";
                                    document.getElementById('infoModal').innerHTML = "Evaluación de monitoreo guardado exitosamente!";
                                    document.getElementById('MONITOREO').hidden = true;
                                    document.getElementById('Campana').value = 0;
                                    document.getElementById('Campana').disabled = true;
                                    LimpiarCamposMonitoreoCali();
                                    setTimeout(function () {
                                        window.location.reload(true);
                                    }, 3000);
                                }
                                else {
                                    document.getElementById('myModal1').style.display = 'block';
                                    document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                                    document.getElementById('myModalLabel').innerHTML = "Advertencia";
                                    document.getElementById('infoModal').innerHTML = "Error al insertar";
                                }
                            }//IF
                        };
                        xml.open("POST", url, true);
                        xml.setRequestHeader('Content-Type', 'application/json');
                        xml.send(JSON.stringify(json));
                    }, function () {
                        alertify.error('Cancel')
                    });
                }//IF

                else {
                    xml.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            var result = JSON.parse(this.responseText);
                            if (result.IdVariable != 0) {
                                document.getElementById('idVariableECS').value = result.IdVariable;
                                //Manda las respuestas del RVT
                                //Trae todos select del monitoreo de los RVTs con sus valores
                                let y = document.querySelectorAll('select[id="CumplimientoRVTECS"]');
                                //Trae todos los IDs de las preguntas del los RVTs
                                let n = document.querySelectorAll('input[id="IdMonitoreoRVTECS"]');
                                var op = $('select[id="CumplimientoRVTECS"] option:selected');
                                for (var z = 0; z < y.length; z++) {
                                    //Manda los datos al metodo para mandar las respuestas RVTs
                                    MandarRespuestas(document.getElementById('idVariableECS').value, n[z].value, y[z].value, op[z].textContent);
                                }
                                document.getElementById('myModal1').style.display = 'block';
                                document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                                document.getElementById('myModalLabel').innerHTML = "¡Correcto!";
                                document.getElementById('infoModal').innerHTML = "Evaluación de monitoreo guardado exitosamente!";
                                document.getElementById('MONITOREO').hidden = true;
                                document.getElementById('Campana').value = 0;
                                document.getElementById('Campana').disabled = true;
                                LimpiarCamposMonitoreoCali();
                                setTimeout(function () {
                                    window.location.reload(true);
                                }, 3000);
                            }

                            else {
                                document.getElementById('myModal1').style.display = 'block';
                                document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                                document.getElementById('myModalLabel').innerHTML = "Advertencia";
                                document.getElementById('infoModal').innerHTML = "Error al insertar";
                            }
                        }//IF
                    };
                    xml.open("POST", url, true);
                    xml.setRequestHeader('Content-Type', 'application/json');
                    xml.send(JSON.stringify(json));
                }
            }
        }//IF

        //Else de los primeros campos obligatorios
        else {
            var inputs = document.getElementsByName('obgECS');
            for (var i = 0; i < inputs.length; i++) {

                if (inputs[i].value == "" || inputs[i].value == 0) {
                    //console.log("Falta " + campos[i]);
                    document.getElementById('myModal1').style.display = 'block';
                    document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                    document.getElementById('myModalLabel').innerHTML = "Advertencia";
                    document.getElementById('infoModal').innerHTML = "Falta llenar campo de " + moniECSR[i];
                    inputs[i].focus();
                    break;
                }
            }
        }
    }



    else {
        if (document.getElementById('statusTramite').value != 0
            && document.getElementById('Serie').value != ""
            && document.getElementById('Folio').value != ""
            && document.getElementById('FechaVenta').value != ""
            && document.getElementById('FechaEva').value != ""
            && document.getElementById('TipificacionRVT').value != ""
            && document.getElementById('TipificacionCorrecta').value != ""
            && document.getElementById('RVTTipiCorrect').value != 0
            && document.getElementById('DescripcionLlamadaRVT').value != ""
            && document.getElementById('FeedbakRVT').value != "") {

            //Valida si la llamada es venta o no, si es venta manda la calificación del validador
            if (document.getElementById('TipoLlamada').value == "VENTA") {
                //Valida que los datos del validaro esten llenos
                if (document.getElementById('NombVali').value != 0 && document.getElementById('DescripcionLlamadaValidador').value != "" && document.getElementById('FeedbakValidador').value != "") {
                    if (document.getElementById('CalificacionRVT').value == 0 || document.getElementById('CalificacionVal').value == 0) {
                        alertify.confirm('Alerta', 'Se obtuvo un error critico. ¿Está seguro de guardar el monitoreo?', function () {
                            xml.onreadystatechange = function () {
                                if (this.readyState == 4 && this.status == 200) {
                                    var result = JSON.parse(this.responseText);
                                    if (result.IdVariable != 0) {
                                        document.getElementById('idVariable').value = result.IdVariable;
                                        //Manda las respuestas del RVT
                                        //Trae todos select del monitoreo de los RVTs con sus valores
                                        let y = document.querySelectorAll('select[id="CumplimientoRVT"]');
                                        //Trae todos los IDs de las preguntas del los RVTs
                                        let n = document.querySelectorAll('input[id="IdMonitoreoRVT"]');
                                        var oprvt = $('select[id="CumplimientoRVT"] option:selected');
                                        for (var z = 0; z < y.length; z++) {
                                            //Manda los datos al metodo para mandar las respuestas RVTs
                                            MandarRespuestas(document.getElementById('idVariable').value, n[z].value, y[z].value, oprvt[z].textContent);
                                        }

                                        //Manda las respuestas del Validador
                                        //Trae todos select del monitoreo de los RVTs con sus valores
                                        let val = document.querySelectorAll('select[id="CumplimientoValidador"]');
                                        //Trae todos los IDs de las preguntas del los RVTs
                                        let m = document.querySelectorAll('input[id="IdMonitoreoVal"]');
                                        var opval = $('select[id="CumplimientoValidador"] option:selected');
                                        for (var i = 0; i < val.length; i++) {
                                            //Manda los datos al metodo para mandar las respuestas RVTs
                                            MandarRespuestas(document.getElementById('idVariable').value, m[i].value, val[i].value, opval[i].textContent);
                                        }

                                        document.getElementById('myModal1').style.display = 'block';
                                        document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                                        document.getElementById('myModalLabel').innerHTML = "¡Correcto!";
                                        document.getElementById('infoModal').innerHTML = "Evaluación de monitoreo guardado exitosamente!";
                                        document.getElementById('MONITOREO').hidden = true;
                                        document.getElementById('Campana').value = 0;
                                        document.getElementById('Campana').disabled = true;
                                        LimpiarCamposMonitoreoCali();
                                        setTimeout(function () {
                                            window.location.reload(true);
                                        }, 3000);
                                    }

                                    else {
                                        document.getElementById('myModal1').style.display = 'block';
                                        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                                        document.getElementById('myModalLabel').innerHTML = "Advertencia";
                                        document.getElementById('infoModal').innerHTML = "Error al insertar";
                                    }
                                }
                            };
                            xml.open("POST", url, true);
                            xml.setRequestHeader('Content-Type', 'application/json');
                            xml.send(JSON.stringify(json));
                        }, function () {
                            alertify.error('Cancel')
                        });
                    }

                    else {
                        xml.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                var result = JSON.parse(this.responseText);
                                if (result.IdVariable != 0) {
                                    document.getElementById('idVariable').value = result.IdVariable;
                                    //Manda las respuestas del RVT
                                    //Trae todos select del monitoreo de los RVTs con sus valores
                                    let y = document.querySelectorAll('select[id="CumplimientoRVT"]');
                                    //Trae todos los IDs de las preguntas del los RVTs
                                    let n = document.querySelectorAll('input[id="IdMonitoreoRVT"]');
                                    var oprvt = $('select[id="CumplimientoRVT"] option:selected');
                                    for (var z = 0; z < y.length; z++) {
                                        //Manda los datos al metodo para mandar las respuestas RVTs
                                        MandarRespuestas(document.getElementById('idVariable').value, n[z].value, y[z].value, oprvt[z].textContent);
                                    }

                                    //Manda las respuestas del Validador
                                    //Trae todos select del monitoreo de los RVTs con sus valores
                                    let val = document.querySelectorAll('select[id="CumplimientoValidador"]');
                                    //Trae todos los IDs de las preguntas del los RVTs
                                    let m = document.querySelectorAll('input[id="IdMonitoreoVal"]');
                                    var opval = $('select[id="CumplimientoValidador"] option:selected');
                                    for (var i = 0; i < val.length; i++) {
                                        //Manda los datos al metodo para mandar las respuestas RVTs
                                        MandarRespuestas(document.getElementById('idVariable').value, m[i].value, val[i].value, opval[i].textContent);
                                    }

                                    document.getElementById('myModal1').style.display = 'block';
                                    document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                                    document.getElementById('myModalLabel').innerHTML = "¡Correcto!";
                                    document.getElementById('infoModal').innerHTML = "Evaluación de monitoreo guardado exitosamente!";
                                    document.getElementById('MONITOREO').hidden = true;
                                    document.getElementById('Campana').value = 0;
                                    document.getElementById('Campana').disabled = true;
                                    LimpiarCamposMonitoreoCali();
                                    setTimeout(function () {
                                        window.location.reload(true);
                                    }, 3000);
                                }

                                else {
                                    document.getElementById('myModal1').style.display = 'block';
                                    document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                                    document.getElementById('myModalLabel').innerHTML = "Advertencia";
                                    document.getElementById('infoModal').innerHTML = "Error al insertar";
                                }
                            }
                        };
                        xml.open("POST", url, true);
                        xml.setRequestHeader('Content-Type', 'application/json');
                        xml.send(JSON.stringify(json));
                    }

                }

                //Else de la validacion de los campos de validacion
                else {
                    var inputs = document.getElementsByName('venta');
                    for (var i = 0; i < inputs.length; i++) {

                        if (inputs[i].value == "" || inputs[i].value == 0) {
                            //console.log("Falta " + campos[i]);
                            document.getElementById('myModal1').style.display = 'block';
                            document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                            document.getElementById('myModalLabel').innerHTML = "Advertencia";
                            document.getElementById('infoModal').innerHTML = "Falta llenar campo de " + camposVenta[i];
                            inputs[i].focus();
                            break;
                        }
                    }
                }
            }

            //Else de la validacion del tipo de llamada
            else {
                if (document.getElementById('CalificacionRVT').value == 0) {
                    alertify.confirm('Alerta', 'Se obtuvo un error critico. ¿Está seguro de guardar el monitoreo?', function () {
                        xml.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                var result = JSON.parse(this.responseText);
                                if (result.IdVariable != 0) {
                                    document.getElementById('idVariable').value = result.IdVariable;
                                    //Manda las respuestas del RVT
                                    //Trae todos select del monitoreo de los RVTs con sus valores
                                    let y = document.querySelectorAll('select[id="CumplimientoRVT"]');
                                    //Trae todos los IDs de las preguntas del los RVTs
                                    let n = document.querySelectorAll('input[id="IdMonitoreoRVT"]');
                                    var oprvt = $('select[id="CumplimientoRVT"] option:selected');
                                    for (var z = 0; z < y.length; z++) {
                                        //Manda los datos al metodo para mandar las respuestas RVTs
                                        MandarRespuestas(document.getElementById('idVariable').value, n[z].value, y[z].value, oprvt[z].textContent);
                                    }
                                    document.getElementById('myModal1').style.display = 'block';
                                    document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                                    document.getElementById('myModalLabel').innerHTML = "¡Correcto!";
                                    document.getElementById('infoModal').innerHTML = "Evaluación de monitoreo guardado exitosamente!";
                                    document.getElementById('MONITOREO').hidden = true;
                                    document.getElementById('Campana').value = 0;
                                    document.getElementById('Campana').disabled = true;
                                    LimpiarCamposMonitoreoCali();
                                    setTimeout(function () {
                                        window.location.reload(true);
                                    }, 3000);
                                }
                                else {
                                    document.getElementById('myModal1').style.display = 'block';
                                    document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                                    document.getElementById('myModalLabel').innerHTML = "Advertencia";
                                    document.getElementById('infoModal').innerHTML = "Error al insertar";
                                }
                            }
                        };
                        xml.open("POST", url, true);
                        xml.setRequestHeader('Content-Type', 'application/json');
                        xml.send(JSON.stringify(json));
                    }, function () {
                        alertify.error('Cancel')
                    });
                }

                else {
                    xml.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            var result = JSON.parse(this.responseText);
                            if (result.IdVariable != 0) {
                                document.getElementById('idVariable').value = result.IdVariable;
                                //Manda las respuestas del RVT
                                //Trae todos select del monitoreo de los RVTs con sus valores
                                let y = document.querySelectorAll('select[id="CumplimientoRVT"]');
                                //Trae todos los IDs de las preguntas del los RVTs
                                let n = document.querySelectorAll('input[id="IdMonitoreoRVT"]');
                                var oprvt = $('select[id="CumplimientoRVT"] option:selected');
                                for (var z = 0; z < y.length; z++) {
                                    //Manda los datos al metodo para mandar las respuestas RVTs
                                    MandarRespuestas(document.getElementById('idVariable').value, n[z].value, y[z].value, oprvt[z].textContent);
                                }
                                document.getElementById('myModal1').style.display = 'block';
                                document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                                document.getElementById('myModalLabel').innerHTML = "¡Correcto!";
                                document.getElementById('infoModal').innerHTML = "Evaluación de monitoreo guardado exitosamente!";
                                document.getElementById('MONITOREO').hidden = true;
                                document.getElementById('Campana').value = 0;
                                document.getElementById('Campana').disabled = true;
                                LimpiarCamposMonitoreoCali();
                                setTimeout(function () {
                                    window.location.reload(true);
                                }, 3000);
                            }
                            else {
                                document.getElementById('myModal1').style.display = 'block';
                                document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                                document.getElementById('myModalLabel').innerHTML = "Advertencia";
                                document.getElementById('infoModal').innerHTML = "Error al insertar";
                            }
                        }
                    };
                    xml.open("POST", url, true);
                    xml.setRequestHeader('Content-Type', 'application/json');
                    xml.send(JSON.stringify(json));
                }
            }

        }

        //Else de los primeros campos obligatorios
        else {
            var inputs = document.getElementsByName('obg');
            for (var i = 0; i < inputs.length; i++) {

                if (inputs[i].value == "" || inputs[i].value == 0) {
                    //console.log("Falta " + campos[i]);
                    document.getElementById('myModal1').style.display = 'block';
                    document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                    document.getElementById('myModalLabel').innerHTML = "Advertencia";
                    document.getElementById('infoModal').innerHTML = "Falta llenar campo de " + camposMoni[i];
                    inputs[i].focus();
                    break;
                }
            }
        }
    }
}

//Guardar la cedula ---> pruebas Pablo
function pruebasGuardadoPablo() {
    let nombreEjecutivo = document.getElementById('BuscaRFC');
    let campana = document.getElementById('Campana');    
    let supervisor = document.getElementById("Id_Supervisor");
    let validador = document.getElementById("NombValiECS");
    let analistaCal = document.getElementById("analistaCal");
    let statusTramite = document.getElementById("statusTramite");
    let monitoreoCalibra = document.getElementById("monitoreoCalibracion");
    let satisfaccion = document.getElementById("satisfaccion");
    let centroAutori = document.getElementById("centroAutorizado");
    let idDirecto = document.getElementById("idDirecto");
    let idCentro = document.getElementById("idCentro");
    let llamadaSeg = document.getElementById("llamadaSeg");
    let audioC = document.getElementById("AudioC");
    let audioE = document.getElementById("AudioE");
    let audioV = document.getElementById("AudioV");    
    let fechaVenta = document.getElementById("FechaVentaECS");
    let fechaEscucha = document.getElementById("FechaEscuECS");    
    let txtComentarios = document.getElementById("txtComentarios");
    let tipiECS = document.getElementById("TipiECS");
    let tipiCentro = document.getElementById("TipiCentro");
    let tipiCorrecta = document.getElementById("TipiCorrecta");
    let estructuraVta = document.getElementById("estructuraVta");
    let totalCalidad = document.getElementById("totalCalidad");
    let totalVenta = document.getElementById("TotalVenta");
    let totalValidacion = document.getElementById("totalValidacion");
    let totalLlamada = document.getElementById("totalLlamada");
    let idCenErrorCriticoVentatro = document.getElementById("ErrorCriticoVenta");
    let errorCriticoValidacion = document.getElementById("ErrorCriticoValidacion");
    let scriptUsado = document.getElementById("scriptUsado");
    let btn_GuardaMC = document.getElementById("btn_GuardaMC");

    let valOfrecimiento = [];
    let nullOfrecimiento = [];
    let valValidacion = [];
    let nullValidacion = [];
    let valEtiquetaRVT = [];
    let nullEtiquetaRVT = [];
    let valEtiquetaVAL = [];
    let nullEtiquetaVAL = [];

    let datos = false;
    let ofrecimientoGuardar = false;
    let validacionGuardar = false;
    let etiquetaRVTGuardar = false;
    let etiquetaVALGuardar = false;
    let errorVenta = false;
    let errorValidacion = false;

    //Comprobar que los campos tienen informacion
    if (monitoreoCalibra.value === '0') {
        alertify.alert("Datos incompletos", "Falta seleccionar Monitoreo/Calibracion", function () { })
    }else if (supervisor.value === '0') {
        alertify.alert("Datos incompletos", "Falta seleccionar Supervisor", function () { })
    } else if (validador.value === '0') {
        alertify.alert("Datos incompletos", "Falta seleccionar Validador", function () { })
    } else if (centroAutori.value === '0') {
        alertify.alert("Datos incompletos", "Falta seleccionar Centro Autorizado", function () { })
    } else if (satisfaccion.value === '0') {
        alertify.alert("Datos incompletos", "Falta seleccionar Nivel de Satisfaccion", function () { })
    } else if (audioC.value === '0') {
        alertify.alert("Datos incompletos", "Falta seleccionar Audio Cliente", function () { })
    } else if (audioE.value === '0') {
        alertify.alert("Datos incompletos", "Falta seleccionar Audio Ejecutivo", function () { })
    } else if (audioV.value === '0') {
        alertify.alert("Datos incompletos", "Falta seleccionar Audio Validador", function () { })
    } else if (llamadaSeg.value === '') {
        alertify.alert("Datos incompletos", "Falta ingresar Llamadas de seg.", function () { })
    } else if (fechaVenta.value === '') {
        alertify.alert("Datos incompletos", "Falta seleccionar Fecha Venta", function () { })
    } else if (fechaEscucha.value === '') {
        alertify.alert("Datos incompletos", "Falta seleccionar Fecha Escucha", function () { })
    } else if (idDirecto.value === '') {
        alertify.alert("Datos incompletos", "Falta ingresar ID Directo", function () { })
    } else if (idCentro.value === '') {
        alertify.alert("Datos incompletos", "Falta ingresar ID Centro", function () { })
    } else if (tipiCentro.value === '0') {
        alertify.alert("Datos incompletos", "Falta seleccionar Tipificación Centro", function () { })
    } else if (tipiCorrecta.value === '0') {
        alertify.alert("Datos incompletos", "Falta seleccionar Tipificación Correcta", function () { })
    } else if (scriptUsado.value === '') {
        alertify.alert("Datos incompletos", "Falta ingresar Script Utilizado", function () { })
    } else if (txtComentarios.value === '') {
        alertify.alert("Datos incompletos", "Falta ingresar Comentarios", function () { })
    } else {
        datos = true;
    }

    //Comprobar que todas las preguntas tienen respuesta
    //Para ofrecimiento
    if (datos == true) {
        valOfrecimiento = document.querySelectorAll('select[name="Ofrecimiento"]');

        for (let valor of valOfrecimiento) {
            if (valor.value == '') {
                nullOfrecimiento.push(0);
            }
        }

        if (nullOfrecimiento.length > 0) {
            alertify.alert("Calificaciones incompletas", "Falta asignar una calificación en Monitoreo RVT (Ofrecimiento)", function () { })
        } else {
            ofrecimientoGuardar = true;
        }
    }
    //Para Etiqueta RVT
    if (ofrecimientoGuardar == true && datos == true) {
        valEtiquetaRVT = document.querySelectorAll('select[name="EtiquetaRVT"]');

        for (let valor of valEtiquetaRVT) {
            if (valor.value == '') {
                nullEtiquetaRVT.push(0);
            }
        }

        if (nullEtiquetaRVT.length > 0) {
            alertify.alert("Calificaciones incompletas", "Falta asignar una calificación en Monitoreo RVT (Etiqueta Telefónica)", function () { })
        } else {
            etiquetaRVTGuardar = true;
        }
    }
    //Para Validacion
    if (etiquetaRVTGuardar == true && ofrecimientoGuardar == true && datos == true) {
        if (statusTramite.value == 1) {
            validacionGuardar = true;
        } else {
            valValidacion = document.querySelectorAll('select[name="Validacion"]');

            for (let valor of valValidacion) {
                if (valor.value == '') {
                    nullValidacion.push(0);
                }
            }

            if (nullValidacion.length > 0) {
                alertify.alert("Calificaciones incompletas", "Falta asignar una calificación en Monitoreo Validación (Validación)", function () { })
            } else {
                validacionGuardar = true;
            }
        }
    }
    //Para Etiqueta VAL
    if (validacionGuardar == true && etiquetaRVTGuardar == true && ofrecimientoGuardar == true && datos == true) {
        if (statusTramite.value == 1) {
            etiquetaVALGuardar = true;
        } else {
            valEtiquetaVAL = document.querySelectorAll('select[name="EtiquetaVAL"]');

            for (let valor of valEtiquetaVAL) {
                if (valor.value == '') {
                    nullEtiquetaVAL.push(0);
                }
            }

            if (nullEtiquetaVAL.length > 0) {
                alertify.alert("Calificaciones incompletas", "Falta asignar una calificación en Monitoreo Validación (Etiqueta Telefónica)", function () { })
            } else {
                etiquetaVALGuardar = true;
            }
        }
    }

    if (idCenErrorCriticoVentatro.value != '') {
        alertify.confirm("Confirmar Error Critico de Venta", 'Desea guardar la Cédula con el Error: "' + idCenErrorCriticoVentatro.value + ' ?"',
            function () {
                errorVenta = true;
            },
            function () {
                errorVenta = false;
            });
    }
    if (statusTramite.value != 1) {
        if (errorCriticoValidacion.value != '') {
            alertify.confirm("Confirmar Error Critico de Validación", 'Desea guardar la Cédula con el Error: ' + errorCriticoValidacion.value + '?',
                function () {
                    errorValidacion = true;
                },
                function () {
                    errorValidacion = false;
                });
        }
    } else {
        errorValidacion = true;
    }
    
    if (errorValidacion == true && errorVenta == true && etiquetaVALGuardar == true && validacionGuardar == true && etiquetaRVTGuardar == true && ofrecimientoGuardar == true && datos == true) {
        alertify.alert("Guardar Cédula", "Cédula guardada correctamente", function () { })
    }
}

//Verifica la Campaña y el Centro Autorizado 
function ValidaCampañaCentro() {
    let centroAutorizado = document.getElementById('centroAutorizado2');
    let campana = document.getElementById('Campana');
    let moniDos = document.getElementById("moniDos");

    if (campana.value != '' && centroAutorizado.value != '0') {
        alertify.confirm("Confirmación de Datos", "Seleccionaste la Campaña: " + campana.options[campana.selectedIndex].text + " y el Centro: " + centroAutorizado.options[centroAutorizado.selectedIndex].text,
            function () {
                moniDos.hidden = false;
                centroAutorizado.disabled = true;
                campana.disabled = true;
            },
            function () {
                campana.value = 0;
                campana.focus();
                centroAutorizado.value = '';
                centroAutorizado.disabled = true;
            }
        );
    }
}

//Oculta y Desoculta los encabezados de Azul
function OcuDesEnc() {
    let datEje = document.getElementById('datEje');
    let datEje2 = document.getElementById('datEje2');
    let campana = document.getElementById('Campana');
    let campana2 = document.getElementById('Campana2');
    let centroAutorizado2 = document.getElementById("centroAutorizado2");
    let centroAutorizado = document.getElementById("centroAutorizado");
    let nombreEjecutivo = document.getElementById('BuscaRFC').value;

    datEje.hidden = true;
    datEje2.hidden = false;
    campana2.value = campana.value;
    centroAutorizado.innerHTML = centroAutorizado2.innerHTML;
    centroAutorizado.disabled = true;
    centroAutorizado.value = centroAutorizado2.value;
}


//Buscar empleado por ID o RFC
function BuscaEmpleadoIDRFC() {    
    let nombreEjecutivo = document.getElementById('BuscaRFC2').value;    
    let campana = document.getElementById('Campana');
    let centroAutorizado2 = document.getElementById("centroAutorizado2");
    let moniDosNom = document.getElementById("moniDosNom");
    let moniDos = document.getElementById("moniDos");

    let neNum = parseInt(nombreEjecutivo);
    let neStr = nombreEjecutivo.toUpperCase();

    const regexid = /^[0-9]*$/;
    const regexrfc = /^[A-Z&Ñ]{4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/;

    if (campana.value == '32' || centroAutorizado2.value == '1' || centroAutorizado2.value == '2') {
        if (nombreEjecutivo != '') {
            if (regexid.test(neNum)) {
                buscarEmpleadoMoniID();
                OcuDesEnc();
                CargarValoresMonitoreo();                
                CargarEjeMoni();
            } else if (regexrfc.test(neStr)) {
                buscarEmpleadoMoniRFC();
                OcuDesEnc();
                CargarValoresMonitoreo();                
                CargarEjeMoni();
            } else {
                alertify.alert("Información Incorrecta", "La informacion dada no es un ID o RFC válido", function () {
                });
            }
        } else {
            alertify.alert("Falta Información", "Debes de ingresar el ID o el RFC del Empleado.", function () {
            });
        }
    } else {
        if (nombreEjecutivo != '') {
            if (regexrfc.test(neStr)) {
                buscarEmpleadoMoniRFC();
                OcuDesEnc();
                CargarValoresMonitoreo();                
                CargarEjeMoni();
            } else {
                alertify.confirm("Información Incorrecta", "La informacion dada no es un ID o RFC válido ó No existe el registro. ¿Desea  ingresar el nombre?",
                    function () {                        
                        moniDos.hidden = true;
                        moniDosNom.hidden = false;
                    }
                    , function () {
                        document.getElementById('BuscaRFC2').value = '';
                });
            }
        } else {
            alertify.alert("Falta Información", "Debes de ingresar el ID o el RFC del Empleado.", function () {
            });
        }
    }
}


//Asigna el nombre del ejecutivo
function AsignaEje() {
    let buscaRFC3 = document.getElementById('BuscaRFC3');
    let buscaRFC = document.getElementById('BuscaRFC');

    buscaRFC.innerText = buscaRFC3.value;
    OcuDesEnc();
    CargarValoresMonitoreo();
    CargarEjeMoni();
}


//Cargar centro autorizado
function CargarCentroAutorizado() {
    let centroAutorizado = document.getElementById('centroAutorizado2');
    let campana = document.getElementById('Campana');

    centroAutorizado.disabled = false;

    if (campana.value == 27) {
        var xml = new XMLHttpRequest();
        var url = hostInit + "/MonitoreoCalidad/CargarCentroAutorizado";

        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                var opt;
                for (var i = 0; i < result.length; i++) {
                    opt += '<option value="' + result[i].Id_plaza + '" text="' + result[i].Plaza + '">' + result[i].Plaza + '</option>';
                }
                centroAutorizado.innerHTML = opt;
            }
        };
        xml.open("GET", url, true);
        xml.send();
    } else {
        var opt;
        opt += '<option value="0" selected disabled hidden>Seleccione</option>';
        opt += '<option value="1" >SA</option>';
        opt += '<option value="2" >SJ</option>';        
        centroAutorizado.innerHTML = opt;
    }
}    


//Verifica el estatus del tramite
function ValidaEstatusTramite() {
    let estatusTramite = document.getElementById("statusTramite");
    let tipiForm = document.getElementById("tipiForm");
    let restForm = document.getElementById("restForm");
    let tabVali = document.getElementById("TabVali");
    let menu1 = document.getElementById("menu1");
    let validador = document.getElementById("NombValiECS");
    let semaforo = document.getElementById("Semaforo_Calidad");
    let caliTotVali = document.getElementById("caliTotVali");
    let caliTotVali2 = document.getElementById("caliTotVali2");    

    if (estatusTramite.value != '0') {
        alertify.confirm("Confirmar Estatus del Trámite", 'El tramite seleccionado es: "' + estatusTramite.options[estatusTramite.selectedIndex].text + '"',
            function () {
                tipiForm.disabled = false;
                tipiForm.hidden = false;
                restForm.disabled = false;
                restForm.hidden = false;
                estatusTramite.disabled = true;                
                if (estatusTramite.value == 1) {
                    tabVali.hidden = true;
                    menu1.hidden = true;
                    validador.disabled = true;
                    validador.value = '';
                    semaforo.style.fontSize = '20px';
                    caliTotVali.hidden = true;
                    caliTotVali2.hidden = false;                    
                } else {
                    tabVali.hidden = false;
                    menu1.hidden = false;
                }
            },
            function () {
                estatusTramite.selectedIndex = '0';
            });
    } else {
        alertify.alert("Selecciona el Tipo de Tramite", "Debes de seleccionar un Tipo de Tramite.", function () {
            estatusTramite.focus();            
        });
    }
    CargaLegalesVentVali();
}


//Oculta o Desoculta los campos de error
function OcuDesErr() {
    let ecVa1 = document.getElementById('ecVa1');
    let ecVa2 = document.getElementById('ecVa2');
    let ecVe1 = document.getElementById('ecVe1');
    let ecVe2 = document.getElementById('ecVe2');
    let errorCriticoValidacion = document.getElementById('ErrorCriticoValidacion');
    let errorCriticoVenta = document.getElementById('ErrorCriticoVenta');

    if (errorCriticoVenta.value == '' && errorCriticoValidacion.value == '') {
        ecVe1.hidden = true;
        ecVe2.hidden = true;
        ecVa1.hidden = true;
        ecVa2.hidden = true;
    } else if (errorCriticoVenta.value != '' && errorCriticoValidacion.value == '') {
        ecVe1.hidden = false;
        ecVe2.hidden = true;
        ecVa1.hidden = true;
        ecVa2.hidden = false;
    } else if (errorCriticoVenta.value == '' && errorCriticoValidacion.value != '') {
        ecVe1.hidden = true;
        ecVe2.hidden = false;
        ecVa1.hidden = false;
        ecVa2.hidden = true;
    } else {
        ecVe1.hidden = false;
        ecVe2.hidden = true;
        ecVa1.hidden = false;
        ecVa2.hidden = true;
    }
}


//verifica que los errores criticos de validacion esten en 0
function ErrorCriticoVali() {
    let totVal = document.getElementById('totalValidacion');

    let cero = [];

    for (let iderr of criticoVali) {
        if (document.getElementById('ValCombo' + iderr).value === "1") {
            cero.push(1);
        } else {
            cero.push(0);
        }
    }
    if (cero.includes(1)) {
        totVal.value = 0;
    } else {
        PromedioTotalVali();
        TotalLlamadaFinal();
    };
    OcuDesErr();
}


//verifica que los errores criticos de venta esten en 0
function ErrorCriticoVenta() {
    let totVen = document.getElementById('TotalVenta');
    let cero = [];

    for (let iderr of criticoVenta) {
        if (document.getElementById('Combo' + iderr).value === "1") {
            cero.push(1);
        } else {
            cero.push(0);
        }
    }

    if (cero.includes(1)) {
        totVen.value = 0;
    } else {
        PromedioTotalVenta();
        TotalLlamadaFinal();
    };

    OcuDesErr();

}

//Cargar nomEjeForm y moniForm
function CargarEjeMoni() {
    let moniForm = document.getElementById("moniForm");
    let buscaEje = document.getElementById('BuscaRFC');
    let coments = document.getElementById("coments");

    coments.hidden = false;
    buscaEje.disabled = true;
    moniForm.hidden = false;
    moniForm.disabled = false;

}

//Busca el empleado por ID
function buscarEmpleadoMoniID() {
    let centroAutorizado2 = document.getElementById('centroAutorizado2');
    let buscaRFC2 = document.getElementById('BuscaRFC2');
    let buscaRFC = document.getElementById('BuscaRFC');

    let buscaRFC2Str = buscaRFC2.value.toString();
    let centroAutorizado2Int = parseInt(centroAutorizado2.value)
    let nombreEje;

    var xml = new XMLHttpRequest();
    var url = hostInit + "/MonitoreoCalidad/BuscarEmpleadoMoniID";

    var json = {
        NumeroEmpleado: buscaRFC2Str,
        Site: centroAutorizado2Int
    }
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result.id_Empleado != 0) {
                if (result.Nombre_2 != '') {
                    nombreEje = result.Nombre_1 + " " + result.Nombre_2 + " " + result.APaterno + " " + result.AMaterno;
                } else {
                    nombreEje = result.Nombre_1 + " " + result.APaterno + " " + result.AMaterno;
                }
                buscaRFC.innerText = nombreEje;
            } else {
                alertify.error("No hay ninguna coincidencia");
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(json));
}

//Busca el empleado por RFC
function buscarEmpleadoMoniRFC() {
    let centroAutorizado2 = document.getElementById('centroAutorizado2');
    let buscaRFC2 = document.getElementById('BuscaRFC2');
    let buscaRFC = document.getElementById('BuscaRFC');

    let buscaRFC2Str = buscaRFC2.value.toString();
    let centroAutorizado2Int = parseInt(centroAutorizado2.value)
    let nombreEje;


    var xml = new XMLHttpRequest();
    var url = hostInit + "/MonitoreoCalidad/BuscarEmpleadoMoniRFC";

    var json = {
        RFC: buscaRFC2Str,
        Site: centroAutorizado2Int
    }
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result.id_Empleado != 0) {
                if (result.Nombre_2 != '') {
                    nombreEje = result.Nombre_1 + " " + result.Nombre_2 + " " + result.APaterno + " " + result.AMaterno;
                } else {
                    nombreEje = result.Nombre_1 + " " + result.APaterno + " " + result.AMaterno;
                }
                buscaRFC.innerText = nombreEje;
            } else {
                alertify.error("No hay ninguna coincidencia");
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(json));
}

//Carga los valores del monitoreo de calidad
function CargarValoresMonitoreo() {

    let camp = document.getElementById('Campana')

    var xml = new XMLHttpRequest();
    var url = hostInit + "/MonitoreoCalidad/CargarValoresMonitoreo";

    var json = {
        Id_Campana: camp.value
    }
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);

            /*if (camp == 26 || camp == 27 || camp == 32) {*/
            if (camp != null) {
                camp.disabled = true;
                //document.getElementById('MONITOREO').hidden = true;
                //document.getElementById('MONITOREOECS').hidden = false;
                //document.getElementById('DatosMonRVT').hidden = true;
                //document.getElementById('DatosMonRVTECS').hidden = false;

                document.getElementById('ConRVT').style.display = 'none';
                document.getElementById('TipificacionRVT').style.display = 'none';
                document.getElementById('TipificacionCorrecta').style.display = 'none';
                document.getElementById('RVTTipiCorrect').style.display = 'none';
                document.getElementById('lblTipificacionRVT').style.display = 'none';
                document.getElementById('lblTipificacionCorrecta').style.display = 'none';
                document.getElementById('lblRVTTipiCorrect').style.display = 'none';
                document.getElementById('lblComentarios').style.display = 'block';
                document.getElementById('Comentarios').style.display = 'block';
                document.getElementById('lblDescripcionLlamadaRVT').style.display = 'none';
                document.getElementById('DescripcionLlamadaRVT').style.display = 'none';
                document.getElementById('DescripcionLlamadaValidador').style.display = 'none';
                document.getElementById('lblFeedbak').style.display = 'none';
                document.getElementById('FeedbakRVT').style.display = 'none';
                document.getElementById('FeedbakValidador').style.display = 'none';
                
                var c = 0;
                var html = '<table  id="example"  style="margin-top:15px; font-size:12px">';
                html += '<thead class="text-center" style="background-color:steelblue; color:white">';
                html += '<tr>';
                html += '<th>';
                html += '<h6 ><strong>RUBRO</strong></h6>';
                html += '</th>';
                html += '<th>';
                html += '<h6><strong>VARIABLE</strong></h6>';
                html += '</th>';
                html += '<th>';
                html += '<h6><strong>CUMPLIMIENTO</strong></h6>';
                html += '</th>';
                html += '<th>';
                html += '<h6><strong>PONDERACIÓN</strong></h6>';
                html += '</th>';
                html += '</thead>';
                html += '<tbody class="tbody">';
                html += '<tr><td colspan="4" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>OFRECIMIENTO</h6></td></tr>';
                for (var i = 0; i < result.length; i++) {
                    if (result[i].Id_Departamento == 14 && result[i].Atributo == "OFRECIMIENTO")
                    {
                        if (result[i].MaxPonderacion == -1)
                        {
                            html += '<tr>';
                            html += '<td colspan="4" style=" color:steelblue;font-style:italic; font:bold;text-align:center;><input hidden value="' + result[i].IdMonitoreo + '"/>' + result[i].Variable + '</td>';
                            html += '</tr>';
                        }
                        else
                        {
                            html += '<tr>';
                            html += '<td id="R' + result[i].IdRubro + '">' + result[i].Rubro + '</td>';
                            if (legalesVenta.includes(result[i].IdMonitoreo)) {
                                legalVentaAux.push(result[i].Variable);
                                if (result[i].IdMonitoreo == 588) {
                                    html += '<td style=background-color:#FCF3CF><abbr title="' + txtAyuda[1] + '" ><input hidden id="IdMonitoreoRVTECS' + result[i].IdMonitoreo + '" value="' + result[i].Variable + '" />' + result[i].Variable + '</abbr></td>';
                                    html += '<td style="heigth:20%;background-color:#FCF3CF">'
                                } else if (result[i].IdMonitoreo == 591){
                                    html += '<td style=background-color:#FCF3CF><abbr title="' + txtAyuda[2] + '" ><input hidden id="IdMonitoreoRVTECS' + result[i].IdMonitoreo + '" value="' + result[i].Variable + '" />' + result[i].Variable + '</abbr></td>';
                                    html += '<td style="heigth:20%;background-color:#FCF3CF">'
                                } else {
                                    html += '<td style=background-color:#FCF3CF><input hidden id="IdMonitoreoRVTECS' + result[i].IdMonitoreo + '" value="' + result[i].Variable + '" />' + result[i].Variable + '</td>';
                                    html += '<td style="heigth:20%;background-color:#FCF3CF">'
                                }
                            } else if (rubrosVenta.includes(result[i].IdRubro) || idMonitoreoVenta.includes(result[i].IdMonitoreo)) {
                                if (result[i].IdMonitoreo == 589) {
                                    html += '<td style=background-color:lightsteelblue><abbr title="' + txtAyuda[0] + '" ><input hidden id="IdMonitoreoRVTECS' + result[i].IdMonitoreo + '" value="' + result[i].Variable + '" />' + result[i].Variable + '</abbr></td>';
                                    html += '<td style="heigth:20%;background-color:lightsteelblue">'
                                } else {
                                    html += '<td style=background-color:lightsteelblue><input hidden id="IdMonitoreoRVTECS" value="' + result[i].IdMonitoreo + '" />' + result[i].Variable + '</td>';
                                    html += '<td style="heigth:20%;background-color:lightsteelblue">'
                                }                                
                            } else {
                                html += '<td style=background-color:gainsboro><input hidden id="IdMonitoreoRVTECS" value="' + result[i].IdMonitoreo + '"/>' + result[i].Variable + '</td>';
                                html += '<td style="heigth:20%;background-color:gainsboro">'
                            }                  
                            html += '<select id="Combo' + result[i].IdMonitoreo + '" name="Ofrecimiento" onfocus="anteriorV(this.options[this.selectedIndex].value)" onchange="cambioValor(' + result[i].IdMonitoreo + ',' + result[i].MaxPonderacion + ', ' + result[i].IdRubro + ')">';

                            if (result[i].MaxPonderacion == 0)
                            {
                                if (legalesVenta.includes(result[i].IdMonitoreo)) {
                                    html += '<option value="" selected disabled hidden></option>';
                                    html += '<option text="NO"   value="0">NO</option>';
                                    html += '<option text="SI"   value="1">SI</option>';
                                    html += '<option text="N/A" value="N/A">N/A</option>';
                                } else {
                                    html += '<option value="" selected disabled hidden></option>';
                                    html += "<option text='NO'   value='1'>NO</option>";
                                    html += "<option text='SI'   value='0'>SI</option>";
                                    html += "<option text='N/A' value='0'>N/A</option>";
                                }                                
                            }
                            else
                            {
                                if (legalesVenta.includes(result[i].IdMonitoreo)) {
                                    html += '<option value="" selected disabled hidden></option>';
                                    html += '<option text="NO"   value="0">NO</option>';
                                    html += '<option text="SI"   value="1">SI</option>';
                                    html += '<option text="N/A" value="N/A">N/A</option>';
                                } else {
                                    html += '<option value="" selected disabled hidden></option>';
                                    html += '<option text="NO"   value="1">NO</option>';
                                    html += '<option text="SI"   value="0">SI</option>';
                                    html += '<option text="N/A" value="0">N/A</option>';
                                }                                
                            }
                            html += '</select>'
                            html += '</td>';
                            if (legalesVenta.includes(result[i].IdMonitoreo)){
                                html += '<td id="valor' + result[i].IdMonitoreo + '" class="CalificaVenta" style="text-align:center;background-color:#FCF3CF" ></td>';
                                //html += '<td id="valor' + result[i].IdMonitoreo + '" style="text-align:center;background-color:#FCF3CF" >' + result[i].MinPonderacion + '</td>';

                            } else if (rubrosVenta.includes(result[i].IdRubro) || idMonitoreoVenta.includes(result[i].IdMonitoreo)) {
                                html += '<td id="valor' + result[i].IdMonitoreo + '" class="CalificaVenta" style="text-align:center;background-color:lightsteelblue" >' + result[i].MinPonderacion + '</td>';
                            } else {
                                html += '<td id="valor' + result[i].IdMonitoreo + '" class="CalificaVenta" style="text-align:center;background-color:gainsboro " >' + result[i].MinPonderacion + '</td>';
                            }
                            html += '</tr>';
                        }
                    }
                }

                html += '<tr><td colspan="4" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>ETIQUETA TELEFONICA</h6></td></tr>';
                for (i = 0; i < result.length; i++) {
                    if (result[i].Id_Departamento == 14 && result[i].Atributo == "ETIQUETA TELEFONICA") {
                        if (result[i].MaxPonderacion == -1) {
                            html += '<tr>';
                            html += '<td colspan="4" style=" color:steelblue;font-style:italic; font:bold;text-align:center;><input hidden value="' + result[i].IdMonitoreo + '"/>' + result[i].Variable + '</td>';
                            html += '</tr>';
                        }
                        else {
                            html += '<tr>';
                            html += '<td id="R' + result[i].IdRubro + '">' + result[i].Rubro + '</td>';
                            html += '<td style="background-color:lightsteelblue"><input hidden id="IdMonitoreoRVTECS" value="' + result[i].IdMonitoreo + '"/>' + result[i].Variable + '</td>';
                            html += '<td style="heigth:20%;background-color:lightsteelblue">'
                            html += '<select id="Combo' + result[i].IdMonitoreo + '" name="EtiquetaRVT" onfocus="anteriorV(this.options[this.selectedIndex].value)" onchange="cambioValor(' + result[i].IdMonitoreo + ',' + result[i].MaxPonderacion + ', ' + result[i].IdRubro + ')">';

                                if (result[i].MaxPonderacion == 0) {
                                    html += '<option value="" selected disabled hidden></option>';
                                    html += "<option text='NO'   value='1'>NO</option>";
                                    html += "<option text='SI'   value='0'>SI</option>";
                                    html += "<option text='N/A' value='0'>N/A</option>";
                                }
                                else
                                {
                                    html += '<option value="" selected disabled hidden></option>';
                                    html += '<option text="NO"   value="1">NO</option>';
                                    html += '<option text="SI"   value="0">SI</option>';
                                    html += '<option text="N/A" value="0">N/A</option>';
                                }
                            html += '</select>'
                            html += '</td>';
                            html += '<td id="valor' + result[i].IdMonitoreo + '" class="CalificaVenta" style="text-align:center;background-color:lightsteelblue" >' + result[i].MinPonderacion + '</td>';
                            html += '</tr>';
                        }
                    }
                }

                html += '<tr><td colspan="4" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>ERROR CRITICO </h6></td></tr>';
                for (var i = 0; i < result.length; i++) {
                    if (result[i].Id_Departamento == 14 && result[i].Atributo == "ERROR CRITICO") {
                        if (result[i].MaxPonderacion == -1) {
                            html += '<tr>';
                            html += '<td colspan="4" style=" color:steelblue;font-style:italic; font:bold;text-align:center;><input hidden value="' + result[i].IdMonitoreo + '"/>' + result[i].Variable + '</td>';
                            html += '</tr>';
                        } else {
                            html += '<tr>';
                            html += '<td id="R">' + result[i].Rubro + '</td>';
                            html += '<td style="background-color:yellow"><input hidden id="IdMonitoreoRVTECS" value="' + result[i].IdMonitoreo + '"/>' + result[i].Variable + '</td>';
                            html += '<td style="heigth:20%;background-color:yellow">'
                            html += "<select id='Combo" + result[i].IdMonitoreo + "' name='SPrecisionRVT' onfocus='anteriorV(this.options[this.selectedIndex].value)' onchange=\"cambioErrorVenta(" + result[i].IdMonitoreo + ",'" + result[i].Variable + "')\">";

                            if (result[i].MaxPonderacion == 0) {
                                html += '<option text="NO"  value="0" selected onclick=\"CumpleErrorCRVTECS(this.value ,"' + result[i].Variable + '")\'>NO</option>';
                                html += '<option text="SI" value="1"  onclick=\"CumpleErrorCRVTECS(this.value ,"' + result[i].Variable + '")\'>SI</option>';
                                html += '<option text="N/A" value="N/A"  onclick=\"CumpleErrorCRVTECS(this.value,"' + result[i].Variable + '")\'>N/A</option>';
                            }
                            html += '</select>'
                            html += '</td>';
                            html += '<td id="valor' + result[i].IdMonitoreo + '" style="text-align:center;background-color:yellow " >' + result[i].MaxPonderacion + '</td>';
                            html += '</tr>';
                        }
                    }
                }
                html += '</tbody>';
                html += '</table><br />';
                document.getElementById('Operacion').innerHTML = html;



                var html2 = '<table id="example2"  style="margin-top:15px;margin-left:30px; font-size:12px">';
                html2 += '<thead class="text-center" style="background-color:steelblue; color:white">';
                html2 += '<tr>';
                html2 += '<th>';
                html2 += '<h6 ><strong>RUBRO</strong></h6>';
                html2 += '</th>';
                html2 += '<th>';
                html2 += '<h6><strong>VARIABLE</strong></h6>';
                html2 += '</th>';
                html2 += '<th>';
                html2 += '<h6><strong>CUMPLIMIENTO</strong></h6>';
                html2 += '</th>';
                html2 += '<th>';
                html2 += '<h6><strong>PONDERACIÓN</strong></h6>';
                html2 += '</th>';
                html2 += '</thead>';
                html2 += '<tbody class="tbody">';
                var j;

                html2 += '<tr><td colspan="4" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>VALIDACIÓN DE INFORMACIÓN</h6></td></tr>';
                for (j = 0; j < result.length; j++) {
                    if (result[j].Id_Departamento == 26 && result[j].Atributo == "VALIDACION DE INFORMACION") {
                        if (result[j].MaxPonderacion == -1) {
                            html2 += '<tr>';
                            html2 += '<td colspan="4" style=" color:steelblue;font-style:italic; font:bold;text-align:center;><input hidden  value="' + result[j].IdMonitoreo + '"/>' + result[j].Variable + '</td>';
                            html2 += '</tr>';
                        } else {
                            html2 += '<tr>';
                            html2 += '<td id="RV' + result[j].IdRubro + '">' + result[j].Rubro + '</td>';
                            if (legalesVali.includes(result[j].IdMonitoreo)) {
                                legalValiAux.push(result[j].Variable);
                                html2 += '<td style="background-color:#FCF3CF"><input hidden id="IdMonitoreoValECS' + result[j].IdMonitoreo + '" value="' + result[j].Variable + '"/>' + result[j].Variable + '</td>';
                                html2 += '<td style="heigth:20%;background-color:#FCF3CF">'
                            } else {
                                html2 += '<td><input hidden id="IdMonitoreoValECS" value="' + result[j].IdMonitoreo + '"/>' + result[j].Variable + '</td>';
                                html2 += '<td style="heigth:20%">'
                            }
                            
                            html2 += '<select id="ValCombo' + result[j].IdMonitoreo + '"  name="Validacion" onfocus="anteriorV2(this.options[this.selectedIndex].value)" onchange="cambioValorVal(' + result[j].IdMonitoreo + ',' + result[j].MaxPonderacion + ')">';
                            if (result[j].MaxPonderacion == 0) {
                                if (legalesVali.includes(result[j].IdMonitoreo)) {
                                    html2 += '<option value="" selected disabled hidden></option>';
                                    html2 += '<option text="0"   value="0" >NO</option>';
                                    html2 += '<option text="1"   value="1">SI</option>';
                                    html2 += '<option text="N/A" value="N/A">N/A</option>';
                                } else {
                                    html2 += '<option value="" selected disabled hidden></option>';
                                    html2 += "<option text='0'   value='1'>NO</option>";
                                    html2 += "<option text='1'   value='0'>SI</option>";                                    
                                    html2 += "<option text='N/A' value='0'>N/A</option>";
                                }                                
                            }
                            else {
                                if (legalesVali.includes(result[j].IdMonitoreo)) {
                                    html2 += '<option value="" selected disabled hidden></option>';
                                    html += '<option text="0"   value="0">NO</option>';
                                    html += '<option text="1"   value="1">SI</option>';
                                    html += '<option text="N/A" value="N/A">N/A</option>';
                                } else {
                                    html2 += '<option value="" selected disabled hidden></option>';
                                    html2 += '<option text="0" value="1">NO</option>';
                                    html2 += '<option text="1" value="0">SI</option>';                                    
                                    html2 += '<option text="N/A" value="0">N/A</option>';
                                }                                
                            }
                            html2 += '</select>'
                            html2 += '</td>';
                            if (legalesVali.includes(result[j].IdMonitoreo)) {
                                html2 += '<td id="sum' + result[j].IdMonitoreo + '" class="CalificaVali" style="text-align:center;background-color:#FCF3CF" " ></td>';
                                //html2 += '<td id="sum' + result[j].IdMonitoreo + '" style="text-align:center;background-color:#FCF3CF" " >' + result[j].MinPonderacion + '</td>';

                            } else {
                                html2 += '<td id="sum' + result[j].IdMonitoreo + '" class="CalificaVali" style="text-align:center; " >' + result[j].MinPonderacion + '</td>';
                            }                            
                            html2 += '</tr>';
                        }
                    }
                }

                html2 += '<tr><td colspan="4" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>ETIQUETA TELEFONICA</h6></td></tr>';
                for (j = 0; j < result.length; j++) {
                    if (result[j].Id_Departamento == 26 && result[j].Atributo == "ETIQUETA TELEFONICA") {
                        if (result[j].MaxPonderacion == -1) {
                            html2 += '<tr>';
                            html2 += '<td colspan="4" style=" color:steelblue;font-style:italic; font:bold;text-align:center;><input hidden  value="' + result[j].IdMonitoreo + '"/>' + result[j].Variable + '</td>';
                            html2 += '</tr>';
                        }
                        else {
                            html2 += '<tr>';
                            html2 += '<td id="RV' + result[j].IdRubro + '">' + result[j].Rubro + '</td>';
                            html2 += '<td><input hidden id="IdMonitoreoValECS" value="' + result[j].IdMonitoreo + '"/>' + result[j].Variable + '</td>';
                            html2 += '<td style="heigth:20%">'
                            html2 += '<select id="ValCombo' + result[j].IdMonitoreo + '" name="EtiquetaVAL" onfocus="anteriorV(this.options[this.selectedIndex].value)" onchange="cambioValorVal(' + result[j].IdMonitoreo + ',' + result[j].MaxPonderacion + ')">';

                            if (result[j].MaxPonderacion == 0) {
                                html2 += '<option value="" selected disabled hidden></option>';
                                html2 += "<option text='0'  value='1'>NO</option>";
                                html2 += "<option text='1' value='0'>SI</option>";                                
                                html2 += "<option text='N/A' value='0'>N/A</option>";
                            }
                            else {
                                html2 += '<option value="" selected disabled hidden></option>';
                                html2 += '<option text="0" value="1">NO</option>';
                                html2 += '<option text="1" value="0">SI</option>';                                
                                html2 += '<option text="N/A" value="0">N/A</option>';
                            }
                            html2 += '</select>'
                            html2 += '</td>';
                            html2 += '<td id="sum' + result[j].IdMonitoreo + '" class="CalificaVali" style="text-align:center" >' + result[j].MinPonderacion + '</td>';
                            html2 += '</tr>';
                        }
                    }
                }

                html2 += '<tr><td colspan="4" style="background-color:#d9d9d9; color:steelblue; font:bold;text-align:center;"><h6>ERROR CRITICO</h6></td></tr>';
                for (j = 0; j < result.length; j++) {
                    if (result[j].Id_Departamento == 26 && result[j].Atributo == "ERROR CRITICO") {
                        if (result[j].MaxPonderacion == -1) {
                            html2 += '<tr>';
                            html2 += '<td colspan="4" style=" color:steelblue;font-style:italic; font:bold;text-align:center;><input hidden  value="' + result[j].IdMonitoreo + '"/>' + result[j].Variable + '</td>';
                            html2 += '</tr>';
                        }
                        else {
                            html2 += '<tr>';
                            html2 += '<td id="R2">' + result[j].Rubro + '</td>';
                            html2 += '<td style="background-color:yellow"><input hidden id="IdMonitoreoValECS" value="' + result[j].IdMonitoreo + '"/>' + result[j].Variable + '</td>';
                            html2 += '<td style="heigth:20%;background-color:yellow">'
                            html2 += "<select id='ValCombo" + result[j].IdMonitoreo + "' name='SPrecisionRVT' onfocus='anteriorV2(this.options[this.selectedIndex].value)' onchange=\"cambioErrorVali(" + result[j].IdMonitoreo + ",'" + result[j].Variable + "')\">";
                    
                            if (result[j].MaxPonderacion == 0) {
                                html2 += '<option text="0" value="0"  selected>NO</option>';
                                html2 += '<option text="1" value="1">SI</option>';                                
                                html2 += '<option text="N/A" value="N/A">N/A</option>';
                            } else {
                                html2 += '<option text="0" value="0"  selected>NO</option>';
                                html2 += '<option text="1" value="1">SI</option>';                                
                                html2 += '<option text="N/A" value="N/A">N/A</option>';
                            }
                            html2 += '</select>'
                            html2 += '</td>';
                            html2 += '<td id="sum' + result[j].IdMonitoreo + '" style="text-align:center;background-color:yellow " >' + result[j].MinPonderacion + '</td>';
                            html2 += '</tr>';
                        }
                    }
                }

                html2 += '</tbody>';
                html2 += '</table> <br />';
                //document.getElementById('ConRVT').hidden = false;
                document.getElementById('Validacion').innerHTML = html2;
                autoMergeByRow('example', 0, 0, -1);
                autoMergeByRow('example2', 0, 0, -1);
            }
            
            else {
                alertify.error("No hay monitoreo para esa campaña");
                setTimeout(function () {
                    window.location.reload(true);
                }, 1000);
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(json)); 
}

//Cargar legales Venta y Validacion
function CargaLegalesVentVali() {
    let legalesVentaEle = document.getElementById('LegalesVenta');
    let legalesValiEle = document.getElementById('LegalesValidacion');
    let estatusTramite = document.getElementById("statusTramite");
    let leVe1 = document.getElementById("leVe1");
    let leVe2 = document.getElementById("leVe2");
    let leVa1 = document.getElementById("leVa1");
    let leVa2 = document.getElementById("leVa2");

    let legalVentaStr = "";
    let legalValiStr = "";    

    for (let leg of legalVentaAux) {
        legalVentaStr = legalVentaStr + " -" + leg;
    }
    legalesVentaEle.value = legalVentaStr;

    if (estatusTramite.value == 1) {
        legalesValiEle.value == '';
    } else {
        for (let leg of legalValiAux) {
            legalValiStr = legalValiStr + " -" + leg;
        }
        legalesValiEle.value = legalValiStr;
    }

    if (legalesVentaEle.value == '' && legalesValiEle.value == '') {
        leVe1.hidden = true;
        leVe2.hidden = false;
        leVa1.hidden = true;
        leVa2.hidden = false;
    } else if (legalesVentaEle.value != '' && legalesValiEle.value == '') {
        leVe1.hidden = false;
        leVe2.hidden = true;
        leVa1.hidden = true;
        leVa2.hidden = false;
    } else if (legalesVentaEle.value == '' && legalesValiEle.value != '') {
        leVe1.hidden = true;
        leVe2.hidden = false;
        leVa1.hidden = false;
        leVa2.hidden = true;
    } else {
        leVe1.hidden = false;
        leVe2.hidden = true;
        leVa1.hidden = false;
        leVa2.hidden = true;
    }

}

//obtiene el valor anterior del combo en RVT
function anteriorV(v) {
    va = v;
}

//obtiene el valor anterior del combo en Validación
function anteriorV2(v) {
    va2 = v;
}

//obtiene calificaciones de monitoreo RVT
function cambioValor(moni, ponde, rubro) {
    let combo = document.getElementById('Combo' + moni);
    let valor = document.getElementById('valor' + moni);
    let totCali = document.getElementById('totalCalidad');
    let estVta = document.getElementById('estructuraVta');
    let idMonitoreoRVTECS = document.getElementById('IdMonitoreoRVTECS' + moni);

    let antes = va;
    let act = combo.value;
    let inde = 0;

    if (va == '' && act == 0) {
        antes = 1;
    }

    if (legalesVenta.includes(moni) == false) {
        //RUBROS AZULES 
        if ((rubro == 43) || (rubro == 47) || (rubro == 49) || (rubro == 50) || (rubro == 51) || (rubro == 52) || (rubro == 46 && moni == 606) || (rubro == 46 && moni == 607) || (rubro == 48 && moni == 642)) {
            if (antes == 1 && act == 0) {
                valor.innerHTML = ponde;
                sumaTotCali = sumaTotCali + ponde;
                totCali.value = sumaTotCali;
            } else if (antes == 0 && act == 1) {
                valor.innerHTML = 0;
                sumaTotCali = sumaTotCali - ponde;
                totCali.value = sumaTotCali;
            } else if (antes == 1 && act == 1) {
                valor.innerHTML = 0;
                totCali.value = sumaTotCali;
            }
        } //rubros que van a gris
        else if ((rubro == 46 && moni != 606) || (rubro == 46 && moni != 607) || (rubro == 48 && moni != 642)) {
            if (antes == 1 && act == 0) {
                valor.innerHTML = ponde;
                sumaEstVta = sumaEstVta + ponde;
                estVta.value = sumaEstVta;
            } else if (antes == 0 && act == 1) {
                valor.innerHTML = 0;
                sumaEstVta = sumaEstVta - ponde;
                estVta.value = sumaEstVta;
            } else if (antes == 1 && act == 1) {
                valor.innerHTML = 0;
                estVta.value = sumaEstVta;
            }
        }
        else {
            if (antes == 1 && act == 0) {
                valor.innerHTML = ponde;
                sumaEstVta = sumaEstVta + ponde;
                estVta.value = sumaEstVta;
            } else if (antes == 0 && act == 1) {
                valor.innerHTML = 0;
                sumaEstVta = sumaEstVta - ponde;
                estVta.value = sumaEstVta;
            } else if (antes == 1 && act == 1) {
                valor.innerHTML = 0;
                estVta.value = sumaEstVta;
            }
        }
    } else {
        if (antes == '1' && act == '0' || antes == 'N/A' && act == '0') {
            legalVentaAux.push(idMonitoreoRVTECS.value);
        } else if (antes == '' && act == '1' || antes == '' && act == 'N/A') {
            inde = legalVentaAux.indexOf(idMonitoreoRVTECS.value);
            legalVentaAux.splice(inde, 1);
        } 
    }

    combo.blur();
    PromedioTotalVenta();    
    ErrorCriticoVenta();
    TotalLlamadaFinal();
    CargaLegalesVentVali();
}

//obtiene calificaciones de monitoreo Validación
function cambioValorVal(moni, ponde) {
    let valCombo = document.getElementById('ValCombo' + moni);
    let sumVal = document.getElementById('sum' + moni);
    let totVal = document.getElementById('totalValidacion');
    let idMonitoreoValECS = document.getElementById('IdMonitoreoValECS' + moni);

    var antes = va2;
    var act = valCombo.value;
    let inde = 0;

    if (va2 == '' && act == 0) {
        antes = 1;
    }

    if (legalesVali.includes(moni) == false) {
        if (antes == 1 && act == 0) {
            sumVal.innerHTML = ponde;
            sumaTotVali = sumaTotVali + ponde;
            totVal.value = Math.floor(sumaTotVali);
        } else if (antes == 0 && act == 1) {
            sumVal.innerHTML = 0;
            sumaTotVali = sumaTotVali - ponde;
            totVal.value = Math.floor(sumaTotVali);
        } else if (antes == 1 && act == 1) {
            sumVal.innerHTML = 0;
            totVal.value = Math.floor(sumaTotVali);
        }
    } else {
        if (antes == '1' && act == '0' || antes == 'N/A' && act == '0') {
            legalVentaAux.push(idMonitoreoRVTECS.value);
        } else if (antes == '1' && act == '1' || antes == '1' && act == 'N/A') {
            inde = legalVentaAux.indexOf(idMonitoreoRVTECS.value);
            legalVentaAux.splice(inde, 1);
        }
    }

    valCombo.blur();
    PromedioTotalVali();
    ErrorCriticoVali();
    TotalLlamadaFinal();
    CargaLegalesVentVali();
}

//Validar Error critico en Validacion
function cambioErrorVali(mon, err) {
    let valCombo = document.getElementById('ValCombo' + mon);
    let sum = document.getElementById('sum' + mon);
    let errCriVal = document.getElementById("ErrorCriticoValidacion");

    var antes = va2;
    var act = valCombo.value;
    let errCri = "";
    let inde = 0;

    if ((antes == "0" && act == "1") || (antes == "N/A" && act == "1")) {
        errorCriticoVali.push(err)
        for (let erCi of errorCriticoVali) {
            errCri = errCri + " -" + erCi
        }
        errCriVal.value = errCri;
        sum.innerHTML = valCombo.value
    } else if ((antes == "0" && act == "N/A") || (antes == "N/A" && act == "0")) {
        sum.innerHTML = valCombo.value;
    } else if ((antes == "1" && act == "0") || (antes == "1" && act == "N/A")) {
        inde = errorCriticoVali.indexOf(err);
        errorCriticoVali.splice(inde, 1);
        for (let erCi of errorCriticoVali) {
            errCri = errCri + " -" + erCi
        }
        errCriVal.value = errCri;
        sum.innerHTML = valCombo.value;
    }

    valCombo.blur();
    ErrorCriticoVali()
    TotalLlamadaFinal()
}

//Validar Error critico en RVT
function cambioErrorVenta(mon, err) {   
    let erCriVen = document.getElementById("ErrorCriticoVenta");
    let combo = document.getElementById('Combo' + mon);
    let valor = document.getElementById('valor' + mon);    

    let antes = va;    
    let errCri = "";
    let act = combo.value;
    let inde = 0;
    
    if ((antes == "0" && act == "1") || (antes == "N/A" && act == "1")) {
        errorCriticoVenta.push(err)
        for (erCi of errorCriticoVenta) {
            errCri = errCri + " -" + erCi
        }
        erCriVen.value = errCri;
        valor.innerHTML = combo.value
    } else if ((antes == "0" && act == "N/A") || (antes == "N/A" && act == "0")) {
        valor.innerHTML = combo.value;
    } else if ((antes == "1" && act == "0") || (antes == "1" && act == "N/A")) {
        inde = errorCriticoVenta.indexOf(err);
        errorCriticoVenta.splice(inde, 1);
        for (erCi of errorCriticoVenta) {
            errCri = errCri + " -" + erCi
        }
        erCriVen.value = errCri;        
        valor.innerHTML = combo.value;
    }

    combo.blur();
    ErrorCriticoVenta();
    TotalLlamadaFinal();    
}

//Funcion para obtener calificacion de validacion
function PromedioTotalVali() {
    let totVal = document.getElementById('totalValidacion');
    let legalesNoValidacion = document.getElementById('LegalesNoValidacion');

    let cero = [];
    let sumaTotalArre = sumaTotVali.toFixed(2)

    for (let id of legalesVali) {
        if (document.getElementById('ValCombo' + id).value === '0') {
            cero.push(0);
        } else {
            cero.push(1);
        }
    }

    if (sumaTotalArre > 100) {
        sumaTotalArre = 100;
    }

    cero.includes(0) ? totVal.value = 0 : totVal.value = sumaTotalArre;
    Semaforo();
}

//Funcion para obtener calificacion de RVT
function PromedioTotalVenta() {
    let p = document.getElementById('estructuraVta').value;
    let e = document.getElementById('totalCalidad').value;
    let totVen = document.getElementById('TotalVenta');

    sumaTotalVenta = parseInt(p) + parseInt(e);
    let cero = [];
    let sumaTotalArre = (sumaTotalVenta / 2).toFixed(2);

    for (let id of legalesVenta) {
        if (document.getElementById('Combo' + id).value === '0') {
            cero.push(0);
        } else {
            cero.push(1);
        }
    }

    if (sumaTotalArre > 100) {
        sumaTotalArre = 100;
    }

    cero.includes(0) ? totVen.value = '0' : totVen.value = sumaTotalArre ;
    Semaforo();
}

//Total de la llamada
function TotalLlamadaFinal() {
    let totalLlamada = document.getElementById("totalLlamada");
    let totalValidacion = document.getElementById("totalValidacion").value;
    let totalVenta = document.getElementById("TotalVenta").value;
    let tipi = document.getElementById("TipiECS");
    let statusTramite = document.getElementById("statusTramite");

    let totLlama = (((parseInt(totalValidacion)) + (parseInt(totalVenta))) / 2);

    if (statusTramite.value == '1') {
        totLlama = totalVenta;
    }

    if (tipi.value == "INCORRECTA") {
        totalLlamada.innerHTML = 0;
    } else {
        if (totLlama > 100) {
            totLlama = 100;
        }
        totalLlamada.innerHTML = totLlama;
    }    
    Semaforo();
}

//Cargar tipificaciones Correcta
function CargarTipificacionesCor() {

    var xml = new XMLHttpRequest();
    var url = hostInit + "/MonitoreoCalidad/CargarTipificaciones";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '<option value="0" text="SELECCIONA" selected>SELECCIONA</option>'
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].ID_CALIFICACION + '" text="' + result[i].catalogo_de_estatus_operacion + '">' + result[i].catalogo_de_estatus_operacion + '</option>';
            }
            opt += '<option value="SIN TIPIFICAR" text="SIN TIPIFICAR" >SIN TIPIFICAR</option>'
            document.getElementById('TipiCorrecta').innerHTML = opt;
        }
    };
    xml.open("GET", url, true);
    xml.send();
}

//Cargar tipificaciones Centro
function CargarTipificacionesCen() {

    var xml = new XMLHttpRequest();
    var url = hostInit + "/MonitoreoCalidad/CargarTipificaciones";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '<option value="0" text="SELECCIONA" selected>SELECCIONA</option>'
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].ID_CALIFICACION + '" text="' + result[i].catalogo_de_estatus_operacion + '">' + result[i].catalogo_de_estatus_operacion + '</option>';
            }
            opt += '<option value="SIN TIPIFICAR" text="SIN TIPIFICAR" >SIN TIPIFICAR</option>'
            document.getElementById('TipiCentro').innerHTML = opt;
        }
    };
    xml.open("GET", url, true);
    xml.send();
}

//Funcion para validar la Tipificacion
function SeleccionaTipificacion() {
    let tipiEcs = document.getElementById("TipiECS");
    let tipiCentro = document.getElementById("TipiCentro");
    let tipiCorrecta = document.getElementById("TipiCorrecta");

    if ((tipiCentro.value === tipiCorrecta.value) && (tipiCentro.value != "SIN TIPIFICAR" && tipiCorrecta.value != "SIN TIPIFICAR") && (tipiCentro.value != 0 && tipiCorrecta.value != 0)) {
        tipiEcs.value = "CORRECTA";
    }
    else if (((tipiCentro.value != tipiCorrecta.value) && (tipiCentro.value != "SIN TIPIFICAR") && (tipiCorrecta.value != "SIN TIPIFICAR")) || (tipiCentro.value != "SIN TIPIFICAR" && tipiCorrecta.value === "SIN TIPIFICAR")){
        tipiEcs.value = "INCORRECTA";
    }
    else if (tipiCentro.value === "SIN TIPIFICAR") {
        tipiEcs.value = "SIN TIPIFICAR";
        tipiCorrecta.value = "SIN TIPIFICAR"
    }
    else if ((tipiCentro.value == 0 && tipiCorrecta.value == 0)) {
        tipiEcs.value = "";
    }
    TotalLlamadaFinal();
}

//Carga las campañas
function CargarCamapanas() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/MonitoreoCalidad/CargarCampanas";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '<option value="0" selected disabled hidden >Seleccione</option>';
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].Id_Campana + '">' + result[i].Nombre_Campana + '</option>';
            }
            document.getElementById('Campana').innerHTML = opt;
        }
    };
    xml.open("GET", url, true);
    xml.send();
}

//Cambia el estado del semaforo
function Semaforo() {
    let calif = document.getElementById("totalLlamada").innerHTML;
    let semaforo = document.getElementById("Semaforo_Calidad");
    let etiqueta = document.getElementById("califLlamada");

    semaforo.style.color = "black";

    if (calif < 80) {
        semaforo.style.backgroundColor = "red";
        etiqueta.innerHTML = "APLICA MALA VENTA";
    } else if ((80 <= calif) && (calif < 90)) {
        semaforo.style.backgroundColor = "yellow";
        etiqueta.innerHTML = "COACHING";
    } else if ((90 <= calif) && (calif < 100)) {
        semaforo.style.backgroundColor = '#ADFF2F';
        etiqueta.innerHTML = "CUMPLE CON PARÁMETROS DE CALIDAD";
    } else {
        semaforo.style.backgroundColor = "#32CD32";
        etiqueta.innerHTML = "FELICITACION Y LLAMADA EJEMPLO    ";
    }
}

//Valida que la fecha de Venta no sea mayor que la fecha de escucha
function fechaNoMayorVeEs() {
    let fechaVenta = document.getElementById("FechaVentaECS");
    let fechaEscucha = document.getElementById("FechaEscuECS");

    if (fechaVenta.value != '' && fechaEscucha.value != '') {
        if (fechaVenta.value > fechaEscucha.value) {
            alertify.alert("Inconsistencia de Fechas", "La fecha de Venta no puede ser mayor que la Fecha de Escucha", function () { fechaEscucha.value = ''; fechaVenta.value = ''; })
        }
    }
}

/*------------------------- Terminan modificaciones Jorge y Pablo -------------------------*/

/*----------------------- Inician funciones utilizadas sin modificar -----------------------*/

//Funcion que hace el llamado para llenar la tabla de Valores monitoreo
function MandarRespuestas(IdVariable, IdMonitoreo, Ponderacion, Respuesta) {
    var json = {
        IdVariable: IdVariable,
        IdMonitoreo: IdMonitoreo,
        Ponderacion: Ponderacion,
        Respuesta: Respuesta
    }

    var xml = new XMLHttpRequest();
    var url = hostInit + "/MonitoreoCalidad/InsertarTablaValoresMonitoreo";
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result != 0) {
                console.log("Respuestas insertadas");
            } else {
                console.log("Error, respuestas no insertadas");
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(json));
}

//Funcion para limpiar campos
function LimpiarCamposMonitoreoCali() {
    document.getElementById('BuscaRFC2').value == "";
    document.getElementById('Campana').value = 0;
    document.getElementById('Id_Supervisor').value = 0;
    document.getElementById('NombValiECS').value = 0;
    document.getElementById('statusTramite').value = 0;
    document.getElementById('monitoreoCalibracion').value = 0;
    document.getElementById('centroAutorizado').value == "";
    document.getElementById('satisfaccion').value = 0;
    document.getElementById('AudioC').value = 0;
    document.getElementById('AudioE').value = 0;
    document.getElementById('AudioV').value = 0;
    document.getElementById('llamadaSeg').value == "";
    document.getElementById('FechaVentaECS').value == "";
    document.getElementById('FechaEscuECS').value == "";
    document.getElementById('idDirecto').value == "";
    document.getElementById('idCentro').value == "";
    document.getElementById('txtComentarios').value == "";
    document.getElementById('TipiECS').value == "";
    document.getElementById('TipiCentro').value = 0;
    document.getElementById('TipiCorrecta').value = 0;
    document.getElementById('estructuraVta').value == 0;
    document.getElementById('totalCalidad').value == 0;
    document.getElementById('totalValidacion').value == 0;
    document.getElementById('TotalVenta').value == 0;
    document.getElementById('totalLlamada').innerHTML = 0;
    document.getElementById('ErrorCriticoVenta').value == "";
    document.getElementById('ErrorCriticoValidacion').value == "";
    document.getElementById('scriptUsado').value == "";



    //document.getElementById('NomRVTECS').value == "";
    //document.getElementById('Id_Supervisor').value = 0;
    //document.getElementById('NombValiECS').value = 0;
    //document.getElementById('statusTramite').value == "";
    //document.getElementById('monitoreoCalibracion').value == "";
    //document.getElementById('analistaCal').value == "";
    //document.getElementById('centroAutorizado').value == "";
    //document.getElementById('satisfaccion').value == "";
    //document.getElementById('AudioC').value = 0;
    //document.getElementById('AudioE').value = 0;
    //document.getElementById('AudioV').value = 0;
    //document.getElementById('llamadaSeg').value == "";
    //document.getElementById('FechaVentaECS').value == "";
    //document.getElementById('FechaEscuECS').value == "";
    //document.getElementById('idDirecto').value == "";
    //document.getElementById('idCentro').value == "";
    //document.getElementById('txtComentarios').value == "";
    //document.getElementById('TipiECS').value = 0;
    //document.getElementById('TipiCentro').value = 0;
    //document.getElementById('TipiCorrecta').value = 0;
    //document.getElementById('estructuraVta').value == "";
    //document.getElementById('totalCalidad').value == 0;
    //document.getElementById('TotalVenta').value == 0;
    //document.getElementById('totalLlamada').value = 0;
    ////document.getElementById('ErrorCriticoECS').value == "";
    //document.getElementById('scriptUsado').value == "";

    //document.getElementById('Operacion').innerHTML = "";
    //document.getElementById('Validacion').innerHTML = "";

    //document.getElementById('TipoLlamada').value = '0';
    //document.getElementById('Serie').value = "";
    //document.getElementById('Folio').value = "";
    //document.getElementById('Telefono').value = "";
    //document.getElementById('FechaVenta').value = "";

    //document.getElementById('CalificacionRVT').value = 0;
    //document.getElementById('CalificacionRVTF').value = 0;
    //document.getElementById('CalificacionVal').value = 0;
    //document.getElementById('CalificacionValF').value = 0;
    //document.getElementById('TotalVenta').value = 0;
    //document.getElementById('TotalVenta2').value = 0;
    //document.getElementById('TotalVal').value = 0;
    //document.getElementById('TotalVal2').value = 0;
    //document.getElementById('totalLlamada').value = 0;
    //document.getElementById('NombVali').value = 0;
    //document.getElementById('Operacion').innerHTML = "";
    //document.getElementById('Validacion').innerHTML = "";
    //document.getElementById('DescripcionLlamadaValidador').value = "";
    //document.getElementById('FeedbakValidador').value = "";
    //document.getElementById('NavValidacion').hidden = true;
    //document.getElementById('DescripcionLlamadaRVT').value = "";
    //document.getElementById('FeedbakRVT').value = "";
    //document.getElementById('ConRVT').hidden = true;
    //document.getElementById('MONITOREO').hidden = true;
    //document.getElementById('MONITOREOECS').hidden = true;
    //document.getElementById('Campana').value = 0;
    //document.getElementById('Campana').disabled = true;
    //document.getElementById('ErrorCriticoVenta').value = '2';
    //document.getElementById('ErrorCriticoVal').value = '2';
    //document.getElementById('ErrorCriticoECS').value = '';
    //document.getElementById('ErrorCriticoECSV').value = '';
    //document.getElementById('TipificacionRVT').value = "";
    //document.getElementById('TipificacionCorrecta').value = "";
    //document.getElementById('RVTTipiCorrect').value = '0';
    //document.getElementById('TipoLlamadaECS').value = '0';
    //document.getElementById('Comentarios').value = "";

    //Para regresar como esta todo
    //document.getElementById('CalificacionRVT').hidden = false;
    //document.getElementById('ErrorCriticoVenta').hidden = false;
    //document.getElementById('CalificacionVal').hidden = true;
    //document.getElementById('ErrorCriticoVal').hidden = true;
    //document.getElementById('lblCalPre').innerHTML = "CALIFICACIÓN VENTA";
    //document.getElementById('lblErrorCV').innerHTML = "ERROR CRÍTICO VENTA";
    //document.getElementById('Operacion').innerHTML = "";
    //document.getElementById('Validacion').innerHTML = "";
    //document.getElementById('DescripcionLlamadaRVT').style.display = 'block';
    //document.getElementById('DescripcionLlamadaValidador').style.display = 'none';
    //document.getElementById('FeedbakRVT').style.display = 'block';
    //document.getElementById('FeedbakValidador').style.display = 'none';
    //document.getElementById('lblNombVali').hidden = true;
    //document.getElementById('NombVali').hidden = true;
}

/*----------------------- Terminan funciones utilizadas sin modificar -----------------------*/

//Guarda la cedula 
//function InsertarTablasMonitoreo() {

//    var xml = new XMLHttpRequest();
//    var url = hostInit + "/MonitoreoCalidad/InsertarMonitoreo";
//    var json = {
//        NomEjecutivo: document.getElementById('BuscaRFC').value,
//        NomSuper: document.getElementById('Id_Supervisor').value,
//        NomValidador: document.getElementById('NombValiECS').value,
//        StatusTram: document.getElementById('statusTramite').value,
//        Monitoreo: document.getElementById('monitoreoCalibracion').value,
//        Anaista: document.getElementById('analistaCal').value,
//        Centro: document.getElementById('centroAutorizado').value,
//        Satisfaccion: document.getElementById('satisfaccion').value,
//        AudioCliente: document.getElementById('AudioC').value,
//        AudioEjecutivo: document.getElementById('AudioE').value,
//        AudioValidador: document.getElementById('AudioV').value,
//        LlamadaSeg: document.getElementById('llamadaSeg').value,
//        FechaVta: document.getElementById('FechaVentaECS').value,
//        FechaEscucha: document.getElementById('FechaEscuECS').value,
//        IdDirecto: document.getElementById('idDirecto').value,
//        IdCentro: document.getElementById('idCentro').value,
//        Comentarios: document.getElementById('txtComentarios').value,
//        Tipificacion: document.getElementById('TipiECS').value,
//        TipificacionCentro: document.getElementById('TipiCentro').value,
//        TipificacionCorrecta: document.getElementById('TipiCorrecta').value,
//        EstructuraVenta: document.getElementById('estructuraVta').value,
//        TotalCalidad: document.getElementById('totalCalidad').value,
//        TotaValidacion: document.getElementById('totalValidacion').value,
//        TotalVenta: document.getElementById('TotalVenta').value,
//        TotalLlamada: document.getElementById('totalLlamada').value,
//        ErrorCritico: document.getElementById('ErrorCriticoECS').value,
//        Script: document.getElementById('scriptUsado').value
        
//        //SuperRVT: document.getElementById('Id_Supervisor').value,
//        //StatusTramite: document.getElementById('statusTramite').value,
//        //Calibracion: document.getElementById('monitoreoCalibracion').value,
//        //Centro: document.getElementById('CentroAuto').value,
//        //NombreCliente: document.getElementById('NombreCliente').value,
//        //FolioECS: document.getElementById('FolioECS').value,
//        //Comentarios: document.getElementById('Comentarios').value,
//        //SuperVal: document.getElementById('Id_SupervisorVal').value,
//        //TotalLlamada: document.getElementById('totalLlamada').value,
//        //Telefonico: document.getElementById('NumTel').value,
//        //FechaVentaECS: document.getElementById('FechaVentaECS').value,
//        //FechaEscucha: document.getElementById('FechaEscuECS').value,
//        //CalificacionTotalRVT: document.getElementById('TotalVenta').value,
//        //ErrorCriticoRVTECS: document.getElementById('ErrorCriticoECS').value,
//        //CalificacionTotalValidador: document.getElementById('TotalVal').value,
//        //IdRVTECS: document.getElementById('IdRVT').value,
//        //IdVal_ECS: document.getElementById('NombValiECS').value,
//        //ErrorCriticoValECS: document.getElementById('ErrorCriticoECSV').value,
//        //TipiECS: document.getElementById('TipiECS').value,
//        //NivelS: document.getElementById('NivelS').value,
//        //audioc: document.getElementById('AudioC').value,
//        //audioe: document.getElementById('AudioE').value,
//        //audiov: document.getElementById('AudioV').value,

//        //Serie: document.getElementById('Serie').value,
//        //Folio: document.getElementById('Folio').value,
//        //Telefono: document.getElementById('Telefono').value,
//        //FechaVenta: document.getElementById('FechaVenta').value,
//        //FechaEva: document.getElementById('FechaEva').value,
//        //Id_Campana: document.getElementById('Campana').value,
//        //IdAnalista: sessionStorage.getItem('usuario'),
//        //IdRVT: document.getElementById('IdRVT').value,
//        //TipoLlamada: document.getElementById('TipoLlamada').value,
//        //TipificacionRVT: document.getElementById('TipificacionRVT').value,
//        //TipificacionCorrecta: document.getElementById('TipificacionCorrecta').value,
//        //RVTTipiCorrect: document.getElementById('RVTTipiCorrect').value,
//        //CalificacionRVT: document.getElementById('CalificacionRVT').value,
//        //ErrorCriticoRVT: document.getElementById('ErrorCriticoVenta').value,
//        //IdVal: document.getElementById('NombVali').value,
//        //CalificacionVal: document.getElementById('CalificacionVal').value,
//        //ErrorCriticoVal: document.getElementById('ErrorCriticoVal').value,
//        //DescripcionLlamadaRVT: document.getElementById('DescripcionLlamadaRVT').value,
//        //FeedbakRVT: document.getElementById('FeedbakRVT').value,
//        //DescripcionLlamadaValidador: document.getElementById('DescripcionLlamadaValidador').value,
//        //FeedbakValidador: document.getElementById('FeedbakValidador').value
//    }

//    if (document.getElementById('Campana').value != null)
//    {

//        if (
//            //document.getElementById('Id_Supervisor').value != 0
//            //&& document.getElementById('TipoLlamadaECS').value != 0
//            //&& document.getElementById('TipoLlamadaECS').value != 0
//            //&& document.getElementById('TipoMonitoreo').value != 0
//            //&& document.getElementById('BuscaRFC').value != ""
//            //&& document.getElementById('NombreCliente').value != ""
//            //&& document.getElementById('FechaVentaECS').value != ""
//            //&& document.getElementById('FechaEscuECS').value != ""
//            //&& document.getElementById('NivelS').value != 0
//            //&& document.getElementById('AudioC').value != 0
//            //&& document.getElementById('AudioE').value != 0
//            //&& document.getElementById('AudioV').value != 0
//            //&& document.getElementById('TipiECS').value != 0
//            //&& document.getElementById('Comentarios').value != 0

//            document.getElementById('NomRVTECS').value != ""
//            && document.getElementById('Id_Supervisor').value != 0
//            && document.getElementById('NombValiECS').value != 0
//            && document.getElementById('statusTramite').value != ""
//            && document.getElementById('monitoreoCalibracion').value != ""
//            && document.getElementById('analistaCal').value != ""
//            && document.getElementById('centroAutorizado').value != ""
//            && document.getElementById('satisfaccion').value != ""
//            && document.getElementById('AudioC').value != 0
//            && document.getElementById('AudioE').value != 0
//            && document.getElementById('AudioV').value != 0
//            && document.getElementById('llamadaSeg').value != ""
//            && document.getElementById('FechaVentaECS').value != ""
//            && document.getElementById('FechaEscuECS').value != ""
//            && document.getElementById('idDirecto').value != ""
//            && document.getElementById('idCentro').value != ""
//            && document.getElementById('txtComentarios').value != ""
//            && document.getElementById('TipiECS').value != 0
//            && document.getElementById('TipiCentro').value != 0
//            && document.getElementById('TipiCorrecta').value != 0
//            && document.getElementById('estructuraVta').value != ""
//            && document.getElementById('totalCalidad').value != ""
//            && document.getElementById('TotalVenta').value != ""
//            && document.getElementById('totalLlamada').value != ""
//            && document.getElementById('ErrorCriticoECS').value != ""
//            && document.getElementById('scriptUsado').value != "")
//        {
//            //Valida si la llamada es venta o no, si es venta manda la calificación del validador
//            if (document.getElementById('statusTramite').value == "Venta Declinada"
//                || document.getElementById('statusTramite').value == "Venta Precreada"
//                || document.getElementById('statusTramite').value == "Sin status")
//            {

//                //Valida que los datos del validador esten llenos
//                if (document.getElementById('Id_Supervisor').value != 0 && document.getElementById('NombValiECS').value != 0)
//                {

//                    if (document.getElementById('TotalVenta').value == 0 || document.getElementById('totalValidacion').value == 0)
//                    {
//                        alertify.confirm('Alerta', 'Se obtuvo un error critico. ¿Está seguro de guardar el monitoreo?', function () {
//                            xml.onreadystatechange = function () {

//                                if (this.readyState == 4 && this.status == 200)
//                                {
//                                    var result = JSON.parse(this.responseText);
//                                    if (result.IdVariable != 0)
//                                    {
//                                        document.getElementById('idVariableECS').value = result.IdVariable;
//                                        //Manda las respuestas del RVT 
//                                        //Trae todos select del monitoreo de los RVTs con sus valores
//                                        let y = document.querySelectorAll('select[id="CumplimientoRVTECS"]');
//                                        //Trae todos los IDs de las preguntas del los RVTs
//                                        let n = document.querySelectorAll('input[id="IdMonitoreoRVTECS"]');
//                                        var op = $('select[id="CumplimientoRVTECS"] option:selected');
//                                        for (var z = 0; z < y.length; z++) {
//                                            //Manda los datos al metodo para mandar las respuestas RVTs
//                                            MandarRespuestas(document.getElementById('idVariableECS').value, n[z].value, y[z].value, op[z].textContent);
//                                        }

//                                        //Manda las respuestas del Validador
//                                        //Trae todos select del monitoreo de los RVTs con sus valores
//                                        let val = document.querySelectorAll('select[id="CumplimientoValECS"]');
//                                        //Trae todos los IDs de las preguntas del los RVTs
//                                        let m = document.querySelectorAll('input[id="IdMonitoreoValECS"]');
//                                        var opv = $('select[id="CumplimientoValECS"] option:selected');
//                                        for (var i = 0; i < val.length; i++) {
//                                            //Manda los datos al metodo para mandar las respuestas RVTs
//                                            MandarRespuestas(document.getElementById('idVariableECS').value, m[i].value, val[i].value, opv[i].textContent);
//                                        }

//                                        document.getElementById('myModal1').style.display = 'block';
//                                        document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
//                                        document.getElementById('myModalLabel').innerHTML = "¡Correcto!";
//                                        document.getElementById('infoModal').innerHTML = "Evaluación de monitoreo guardado exitosamente!";
//                                        document.getElementById('MONITOREO').hidden = true;
//                                        document.getElementById('Campana').value = 0;
//                                        document.getElementById('Campana').disabled = true;
//                                        LimpiarCamposMonitoreoCali();
//                                        setTimeout(function () {
//                                            window.location.reload(true);
//                                        }, 3000);
//                                    }
//                                    else
//                                    {
//                                        document.getElementById('myModal1').style.display = 'block';
//                                        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
//                                        document.getElementById('myModalLabel').innerHTML = "Advertencia";
//                                        document.getElementById('infoModal').innerHTML = "Error al insertar";
//                                    }
//                                }
//                            };
//                            xml.open("POST", url, true);
//                            xml.setRequestHeader('Content-Type', 'application/json');
//                            xml.send(JSON.stringify(json));
//                        }, function () {
//                            alertify.error('Cancel')
//                        });
//                    }

//                    else
//                    {
//                        xml.onreadystatechange = function () {
//                            if (this.readyState == 4 && this.status == 200)
//                            {
//                                var result = JSON.parse(this.responseText);
//                                if (result.IdVariable != 0)
//                                {
//                                    document.getElementById('idVariableECS').value = result.IdVariable;
//                                    //Manda las respuestas del RVT
//                                    //Trae todos select del monitoreo de los RVTs con sus valores
//                                    let y = document.querySelectorAll('select[id="CumplimientoRVTECS"]');
//                                    //Trae todos los IDs de las preguntas del los RVTs
//                                    let n = document.querySelectorAll('input[id="IdMonitoreoRVTECS"]');
//                                    var op = $('select[id="CumplimientoRVTECS"] option:selected');
//                                    for (var z = 0; z < y.length; z++) {
//                                        //Manda los datos al metodo para mandar las respuestas RVTs
//                                        MandarRespuestas(document.getElementById('idVariableECS').value, n[z].value, y[z].value, op[z].textContent);
//                                        console.log(n[z].textContent);
//                                    }

//                                    //Manda las respuestas del Validador
//                                    //Trae todos select del monitoreo de los RVTs con sus valores
//                                    let val = document.querySelectorAll('select[id="CumplimientoValECS"]');
//                                    //Trae todos los IDs de las preguntas del los RVTs
//                                    let m = document.querySelectorAll('input[id="IdMonitoreoValECS"]');
//                                    var opv = $('select[id="CumplimientoValECS"] option:selected');
//                                    for (var i = 0; i < val.length; i++) {
//                                        //Manda los datos al metodo para mandar las respuestas RVTs
//                                        MandarRespuestas(document.getElementById('idVariableECS').value, m[i].value, val[i].value, opv[i].textContent);
//                                    }

//                                    document.getElementById('myModal1').style.display = 'block';
//                                    document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
//                                    document.getElementById('myModalLabel').innerHTML = "¡Correcto!";
//                                    document.getElementById('infoModal').innerHTML = "Evaluación de monitoreo guardado exitosamente!";
//                                    document.getElementById('MONITOREO').hidden = true;
//                                    document.getElementById('Campana').value = 0;
//                                    document.getElementById('Campana').disabled = true;
//                                    LimpiarCamposMonitoreoCali();
//                                    setTimeout(function () {
//                                        window.location.reload(true);
//                                    }, 3000);
//                                }
//                                else
//                                {
//                                    document.getElementById('myModal1').style.display = 'block';
//                                    document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
//                                    document.getElementById('myModalLabel').innerHTML = "Advertencia";
//                                    document.getElementById('infoModal').innerHTML = "Error al insertar";
//                                }
//                            }
//                        };
//                        xml.open("POST", url, true);
//                        xml.setRequestHeader('Content-Type', 'application/json');
//                        xml.send(JSON.stringify(json));
//                    }
//                }

//                //Else de la validacion de los campos de validacion
//                else
//                {
//                    var inputs = document.getElementsByName('ventaecs');
//                    for (var i = 0; i < inputs.length; i++) {

//                        if (inputs[i].value == "" || inputs[i].value == 0)
//                        {
//                            //console.log("Falta " + campos[i]);
//                            document.getElementById('myModal1').style.display = 'block';
//                            document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
//                            document.getElementById('myModalLabel').innerHTML = "Advertencia";
//                            document.getElementById('infoModal').innerHTML = "Falta llenar campo de " + moniECSV[i];
//                            inputs[i].focus();
//                            break;
//                        }
//                    }
//                }
//            }
//            //Else de la validacion del tipo de llamada
//            else
//            {
//                if (document.getElementById('TotalVenta').value == 0)
//                {
//                    alertify.confirm('Alerta', 'Se obtuvo un error critico. ¿Está seguro de guardar el monitoreo?', function () {
//                        xml.onreadystatechange = function () {
//                            if (this.readyState == 4 && this.status == 200)
//                            {
//                                var result = JSON.parse(this.responseText);
//                                if (result.IdVariable != 0)
//                                {
//                                    document.getElementById('idVariableECS').value = result.IdVariable;

//                                    //Manda las respuestas del RVT
//                                    //Trae todos select del monitoreo de los RVTs con sus valores
//                                    let y = document.querySelectorAll('select[id="CumplimientoRVTECS"]');
//                                    //Trae todos los IDs de las preguntas del los RVTs
//                                    let n = document.querySelectorAll('input[id="IdMonitoreoRVTECS"]');
//                                    var op = $('select[id="CumplimientoRVTECS"] option:selected');
//                                    for (var z = 0; z < y.length; z++) {
//                                        //Manda los datos al metodo para mandar las respuestas RVTs
//                                        MandarRespuestas(document.getElementById('idVariableECS').value, n[z].value, y[z].value, op[z].textContent);
//                                    }
//                                    document.getElementById('myModal1').style.display = 'block';
//                                    document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
//                                    document.getElementById('myModalLabel').innerHTML = "¡Correcto!";
//                                    document.getElementById('infoModal').innerHTML = "Evaluación de monitoreo guardado exitosamente!";
//                                    document.getElementById('MONITOREO').hidden = true;
//                                    document.getElementById('Campana').value = 0;
//                                    document.getElementById('Campana').disabled = true;
//                                    LimpiarCamposMonitoreoCali();
//                                    setTimeout(function () {
//                                        window.location.reload(true);
//                                    }, 3000);
//                                }
//                                else
//                                {
//                                    document.getElementById('myModal1').style.display = 'block';
//                                    document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
//                                    document.getElementById('myModalLabel').innerHTML = "Advertencia";
//                                    document.getElementById('infoModal').innerHTML = "Error al insertar";
//                                }
//                            }//IF
//                        };
//                        xml.open("POST", url, true);
//                        xml.setRequestHeader('Content-Type', 'application/json');
//                        xml.send(JSON.stringify(json));
//                    }, function () {
//                        alertify.error('Cancel')
//                    });
//                }//IF

//                else
//                {
//                    xml.onreadystatechange = function () {
//                        if (this.readyState == 4 && this.status == 200)
//                        {
//                            var result = JSON.parse(this.responseText);
//                            if (result.IdVariable != 0)
//                            {
//                                document.getElementById('idVariableECS').value = result.IdVariable;
//                                //Manda las respuestas del RVT
//                                //Trae todos select del monitoreo de los RVTs con sus valores
//                                let y = document.querySelectorAll('select[id="CumplimientoRVTECS"]');
//                                //Trae todos los IDs de las preguntas del los RVTs
//                                let n = document.querySelectorAll('input[id="IdMonitoreoRVTECS"]');
//                                var op = $('select[id="CumplimientoRVTECS"] option:selected');
//                                for (var z = 0; z < y.length; z++) {
//                                    //Manda los datos al metodo para mandar las respuestas RVTs
//                                    MandarRespuestas(document.getElementById('idVariableECS').value, n[z].value, y[z].value, op[z].textContent);
//                                }
//                                document.getElementById('myModal1').style.display = 'block';
//                                document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
//                                document.getElementById('myModalLabel').innerHTML = "¡Correcto!";
//                                document.getElementById('infoModal').innerHTML = "Evaluación de monitoreo guardado exitosamente!";
//                                document.getElementById('MONITOREO').hidden = true;
//                                document.getElementById('Campana').value = 0;
//                                document.getElementById('Campana').disabled = true;
//                                LimpiarCamposMonitoreoCali();
//                                setTimeout(function () {
//                                    window.location.reload(true);
//                                }, 3000);
//                            }

//                            else
//                            {
//                                document.getElementById('myModal1').style.display = 'block';
//                                document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
//                                document.getElementById('myModalLabel').innerHTML = "Advertencia";
//                                document.getElementById('infoModal').innerHTML = "Error al insertar";
//                            }
//                        }//IF
//                    };
//                    xml.open("POST", url, true);
//                    xml.setRequestHeader('Content-Type', 'application/json');
//                    xml.send(JSON.stringify(json));
//                }
//            }
//        }//IF

//        //Else de los primeros campos obligatorios
//        else
//        {
//            var inputs = document.getElementsByName('obgECS');
//            for (var i = 0; i < inputs.length; i++) {

//                if (inputs[i].value == "" || inputs[i].value == 0)
//                {
//                    //console.log("Falta " + campos[i]);
//                    document.getElementById('myModal1').style.display = 'block';
//                    document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
//                    document.getElementById('myModalLabel').innerHTML = "Advertencia";
//                    document.getElementById('infoModal').innerHTML = "Falta llenar campo de " + moniECSR[i];
//                    inputs[i].focus();
//                    break;
//                }
//            }
//        }
//    }



//    else
//    {
//        if (document.getElementById('statusTramite').value != 0
//            && document.getElementById('Serie').value != ""
//            && document.getElementById('Folio').value != ""
//            && document.getElementById('FechaVenta').value != ""
//            && document.getElementById('FechaEva').value != ""
//            && document.getElementById('TipificacionRVT').value != ""
//            && document.getElementById('TipificacionCorrecta').value != ""
//            && document.getElementById('RVTTipiCorrect').value != 0
//            && document.getElementById('DescripcionLlamadaRVT').value != ""
//            && document.getElementById('FeedbakRVT').value != "")
//        {

//            //Valida si la llamada es venta o no, si es venta manda la calificación del validador
//            if (document.getElementById('TipoLlamada').value == "VENTA")
//            { 
//                //Valida que los datos del validaro esten llenos
//                if (document.getElementById('NombVali').value != 0 && document.getElementById('DescripcionLlamadaValidador').value != "" && document.getElementById('FeedbakValidador').value != "")
//                { 
//                    if (document.getElementById('CalificacionRVT').value == 0 || document.getElementById('CalificacionVal').value == 0)
//                    {
//                        alertify.confirm('Alerta', 'Se obtuvo un error critico. ¿Está seguro de guardar el monitoreo?', function () {
//                            xml.onreadystatechange = function () {
//                                if (this.readyState == 4 && this.status == 200)
//                                {
//                                    var result = JSON.parse(this.responseText);
//                                    if (result.IdVariable != 0)
//                                    {
//                                        document.getElementById('idVariable').value = result.IdVariable;
//                                        //Manda las respuestas del RVT
//                                        //Trae todos select del monitoreo de los RVTs con sus valores
//                                        let y = document.querySelectorAll('select[id="CumplimientoRVT"]');
//                                        //Trae todos los IDs de las preguntas del los RVTs
//                                        let n = document.querySelectorAll('input[id="IdMonitoreoRVT"]');
//                                        var oprvt = $('select[id="CumplimientoRVT"] option:selected');
//                                        for (var z = 0; z < y.length; z++) {
//                                            //Manda los datos al metodo para mandar las respuestas RVTs
//                                            MandarRespuestas(document.getElementById('idVariable').value, n[z].value, y[z].value, oprvt[z].textContent);
//                                        }

//                                        //Manda las respuestas del Validador
//                                        //Trae todos select del monitoreo de los RVTs con sus valores
//                                        let val = document.querySelectorAll('select[id="CumplimientoValidador"]');
//                                        //Trae todos los IDs de las preguntas del los RVTs
//                                        let m = document.querySelectorAll('input[id="IdMonitoreoVal"]');
//                                        var opval = $('select[id="CumplimientoValidador"] option:selected');
//                                        for (var i = 0; i < val.length; i++) {
//                                            //Manda los datos al metodo para mandar las respuestas RVTs
//                                            MandarRespuestas(document.getElementById('idVariable').value, m[i].value, val[i].value, opval[i].textContent);
//                                        }

//                                        document.getElementById('myModal1').style.display = 'block';
//                                        document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
//                                        document.getElementById('myModalLabel').innerHTML = "¡Correcto!";
//                                        document.getElementById('infoModal').innerHTML = "Evaluación de monitoreo guardado exitosamente!";
//                                        document.getElementById('MONITOREO').hidden = true;
//                                        document.getElementById('Campana').value = 0;
//                                        document.getElementById('Campana').disabled = true;
//                                        LimpiarCamposMonitoreoCali();
//                                        setTimeout(function () {
//                                            window.location.reload(true);
//                                        }, 3000);
//                                    }

//                                    else
//                                    {
//                                        document.getElementById('myModal1').style.display = 'block';
//                                        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
//                                        document.getElementById('myModalLabel').innerHTML = "Advertencia";
//                                        document.getElementById('infoModal').innerHTML = "Error al insertar";
//                                    }
//                                }
//                            };
//                            xml.open("POST", url, true);
//                            xml.setRequestHeader('Content-Type', 'application/json');
//                            xml.send(JSON.stringify(json));
//                        }, function () {
//                            alertify.error('Cancel')
//                        });
//                    }

//                    else
//                    {
//                        xml.onreadystatechange = function () {
//                            if (this.readyState == 4 && this.status == 200)
//                            {
//                                var result = JSON.parse(this.responseText);
//                                if (result.IdVariable != 0)
//                                {
//                                    document.getElementById('idVariable').value = result.IdVariable;
//                                    //Manda las respuestas del RVT
//                                    //Trae todos select del monitoreo de los RVTs con sus valores
//                                    let y = document.querySelectorAll('select[id="CumplimientoRVT"]');
//                                    //Trae todos los IDs de las preguntas del los RVTs
//                                    let n = document.querySelectorAll('input[id="IdMonitoreoRVT"]');
//                                    var oprvt = $('select[id="CumplimientoRVT"] option:selected');
//                                    for (var z = 0; z < y.length; z++) {
//                                        //Manda los datos al metodo para mandar las respuestas RVTs
//                                        MandarRespuestas(document.getElementById('idVariable').value, n[z].value, y[z].value, oprvt[z].textContent);
//                                    }

//                                    //Manda las respuestas del Validador
//                                    //Trae todos select del monitoreo de los RVTs con sus valores
//                                    let val = document.querySelectorAll('select[id="CumplimientoValidador"]');
//                                    //Trae todos los IDs de las preguntas del los RVTs
//                                    let m = document.querySelectorAll('input[id="IdMonitoreoVal"]');
//                                    var opval = $('select[id="CumplimientoValidador"] option:selected');
//                                    for (var i = 0; i < val.length; i++) {
//                                        //Manda los datos al metodo para mandar las respuestas RVTs
//                                        MandarRespuestas(document.getElementById('idVariable').value, m[i].value, val[i].value, opval[i].textContent);
//                                    }

//                                    document.getElementById('myModal1').style.display = 'block';
//                                    document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
//                                    document.getElementById('myModalLabel').innerHTML = "¡Correcto!";
//                                    document.getElementById('infoModal').innerHTML = "Evaluación de monitoreo guardado exitosamente!";
//                                    document.getElementById('MONITOREO').hidden = true;
//                                    document.getElementById('Campana').value = 0;
//                                    document.getElementById('Campana').disabled = true;
//                                    LimpiarCamposMonitoreoCali();
//                                    setTimeout(function () {
//                                        window.location.reload(true);
//                                    }, 3000);
//                                }

//                                else
//                                {
//                                    document.getElementById('myModal1').style.display = 'block';
//                                    document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
//                                    document.getElementById('myModalLabel').innerHTML = "Advertencia";
//                                    document.getElementById('infoModal').innerHTML = "Error al insertar";
//                                }
//                            }
//                        };
//                        xml.open("POST", url, true);
//                        xml.setRequestHeader('Content-Type', 'application/json');
//                        xml.send(JSON.stringify(json));
//                    }

//                }

//                //Else de la validacion de los campos de validacion
//                else
//                { 
//                    var inputs = document.getElementsByName('venta');
//                    for (var i = 0; i < inputs.length; i++) {

//                        if (inputs[i].value == "" || inputs[i].value == 0)
//                        {
//                            //console.log("Falta " + campos[i]);
//                            document.getElementById('myModal1').style.display = 'block';
//                            document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
//                            document.getElementById('myModalLabel').innerHTML = "Advertencia";
//                            document.getElementById('infoModal').innerHTML = "Falta llenar campo de " + camposVenta[i];
//                            inputs[i].focus();
//                            break;
//                        }
//                    }
//                }
//            }

//            //Else de la validacion del tipo de llamada
//            else
//            {
//                if (document.getElementById('CalificacionRVT').value == 0)
//                {
//                    alertify.confirm('Alerta', 'Se obtuvo un error critico. ¿Está seguro de guardar el monitoreo?', function () {
//                        xml.onreadystatechange = function () {
//                            if (this.readyState == 4 && this.status == 200)
//                            {
//                                var result = JSON.parse(this.responseText);
//                                if (result.IdVariable != 0)
//                                {
//                                    document.getElementById('idVariable').value = result.IdVariable;
//                                    //Manda las respuestas del RVT
//                                    //Trae todos select del monitoreo de los RVTs con sus valores
//                                    let y = document.querySelectorAll('select[id="CumplimientoRVT"]');
//                                    //Trae todos los IDs de las preguntas del los RVTs
//                                    let n = document.querySelectorAll('input[id="IdMonitoreoRVT"]');
//                                    var oprvt = $('select[id="CumplimientoRVT"] option:selected');
//                                    for (var z = 0; z < y.length; z++) {
//                                        //Manda los datos al metodo para mandar las respuestas RVTs
//                                        MandarRespuestas(document.getElementById('idVariable').value, n[z].value, y[z].value, oprvt[z].textContent);
//                                    }
//                                    document.getElementById('myModal1').style.display = 'block';
//                                    document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
//                                    document.getElementById('myModalLabel').innerHTML = "¡Correcto!";
//                                    document.getElementById('infoModal').innerHTML = "Evaluación de monitoreo guardado exitosamente!";
//                                    document.getElementById('MONITOREO').hidden = true;
//                                    document.getElementById('Campana').value = 0;
//                                    document.getElementById('Campana').disabled = true;
//                                    LimpiarCamposMonitoreoCali();
//                                    setTimeout(function () {
//                                        window.location.reload(true);
//                                    }, 3000);
//                                }
//                                else
//                                {
//                                    document.getElementById('myModal1').style.display = 'block';
//                                    document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
//                                    document.getElementById('myModalLabel').innerHTML = "Advertencia";
//                                    document.getElementById('infoModal').innerHTML = "Error al insertar";
//                                }
//                            }
//                        };
//                        xml.open("POST", url, true);
//                        xml.setRequestHeader('Content-Type', 'application/json');
//                        xml.send(JSON.stringify(json));
//                    }, function () {
//                        alertify.error('Cancel')
//                    });
//                }

//                else
//                {
//                    xml.onreadystatechange = function () {
//                        if (this.readyState == 4 && this.status == 200)
//                        {
//                            var result = JSON.parse(this.responseText);
//                            if (result.IdVariable != 0)
//                            {
//                                document.getElementById('idVariable').value = result.IdVariable;
//                                //Manda las respuestas del RVT
//                                //Trae todos select del monitoreo de los RVTs con sus valores
//                                let y = document.querySelectorAll('select[id="CumplimientoRVT"]');
//                                //Trae todos los IDs de las preguntas del los RVTs
//                                let n = document.querySelectorAll('input[id="IdMonitoreoRVT"]');
//                                var oprvt = $('select[id="CumplimientoRVT"] option:selected');
//                                for (var z = 0; z < y.length; z++) {
//                                    //Manda los datos al metodo para mandar las respuestas RVTs
//                                    MandarRespuestas(document.getElementById('idVariable').value, n[z].value, y[z].value, oprvt[z].textContent);
//                                }
//                                document.getElementById('myModal1').style.display = 'block';
//                                document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
//                                document.getElementById('myModalLabel').innerHTML = "¡Correcto!";
//                                document.getElementById('infoModal').innerHTML = "Evaluación de monitoreo guardado exitosamente!";
//                                document.getElementById('MONITOREO').hidden = true;
//                                document.getElementById('Campana').value = 0;
//                                document.getElementById('Campana').disabled = true;
//                                LimpiarCamposMonitoreoCali();
//                                setTimeout(function () {
//                                    window.location.reload(true);
//                                }, 3000);
//                            }
//                            else
//                            {
//                                document.getElementById('myModal1').style.display = 'block';
//                                document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
//                                document.getElementById('myModalLabel').innerHTML = "Advertencia";
//                                document.getElementById('infoModal').innerHTML = "Error al insertar";
//                            }
//                        }
//                    };
//                    xml.open("POST", url, true);
//                    xml.setRequestHeader('Content-Type', 'application/json');
//                    xml.send(JSON.stringify(json));
//                }
//            }

//        }

//        //Else de los primeros campos obligatorios
//        else
//        {
//            var inputs = document.getElementsByName('obg');
//            for (var i = 0; i < inputs.length; i++) {

//                if (inputs[i].value == "" || inputs[i].value == 0)
//                {
//                    //console.log("Falta " + campos[i]);
//                    document.getElementById('myModal1').style.display = 'block';
//                    document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
//                    document.getElementById('myModalLabel').innerHTML = "Advertencia";
//                    document.getElementById('infoModal').innerHTML = "Falta llenar campo de " + camposMoni[i];
//                    inputs[i].focus();
//                    break;
//                }
//            }
//        }
//    }
//}

//Funcion que hace el llamado para llenar la tabla de Valores monitoreo
function MandarRespuestas(IdVariable, IdMonitoreo, Ponderacion, Respuesta) {
    var json = {
        IdVariable: IdVariable,
        IdMonitoreo: IdMonitoreo,
        Ponderacion: Ponderacion,
        Respuesta: Respuesta
    }

    var xml = new XMLHttpRequest();
    var url = hostInit + "/MonitoreoCalidad/InsertarTablaValoresMonitoreo";
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result != 0) {
                console.log("Respuestas insertadas");
            } else {
                console.log("Error, respuestas no insertadas");
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(json));
}

//Funcion para ordenar la tabla
function autoMergeByRow(tableId
    , rowStartIndex	// zero or positive
    , colStart		// zero or positive
    , colEnd		// equals to colStart or greater than colStart or negative
) {

    var trArr = $('#' + tableId).find('tr');			// rows array
    for (var rowIndex = rowStartIndex; rowIndex < trArr.length; rowIndex++) {
        var tdArr = $(trArr[rowIndex]).find('td');	// cols array of the row
        if (colEnd < 0) colEnd = tdArr.length - 1;		// if colEnd is negative, process at the end of the cols;
        for (var colIndex = colStart; colIndex < tdArr.length && colIndex <= colEnd; colIndex++) {
            var span = 1;
            var theCell = $(tdArr)[colIndex];
            if ($(theCell).attr('colspan')) { continue; }
            var cellBelow = $($(theCell).parent().next().children()[colIndex]);
            while (cellBelow != undefined && $(theCell).text() == $(cellBelow).text())
            {
                span++;
                cellBelow.hide();
                cellBelow = $($(cellBelow).parent().next().children()[colIndex]);
            }
            if (span > 1) $(theCell).attr('rowspan', span);
        }
    }
}

//Funcion para cargar el select de camapañas que se tienen monitoreos 
function CampanasMonitoreo() {
    if (document.getElementById('RFCRetro').value == "") {
        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center text-center";
        document.getElementById('myModalLabel').innerHTML = "Advertencia";
        document.getElementById('infoModal').innerHTML = "Ingresar RFC para realizar la busqueda";
    } 
    else {

        var json = {
            RFC: document.getElementById('RFCRetro').value
            //sessionStorage.getItem('idEmp');
        }
        console.log(document.getElementById('RFCRetro').value)
        //var idEmp = 226; //sessionStorage.getItem('idEmp'); 
        var xml = new XMLHttpRequest();
        var url = hostInit + "/MonitoreoCalidad/CampanasMonitoreo";

        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                console.log(result);
                if (result.length == 0) {
                    document.getElementById('myModal1').style.display = 'block';
                    document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center text-center";
                    document.getElementById('myModalLabel').innerHTML = "Advertencia";
                    document.getElementById('infoModal').innerHTML = "RFC no existe en la base de datos o No tiene ningún monitoreo pendiente";
                }
                else {
                    var opt = '<option value="0">SELECCIONE</option>';
                    for (var i = 0; i < result.length; i++) {
                        opt += '<option  value="' + result[i].IdVariable + '">' + result[i].Nombre_Campana + " --> " + result[i].FechaMonitoreo + '</option>';
                    }
                    document.getElementById('Campana').innerHTML = opt;

                    document.getElementById('ResultadosRVT').innerHTML = "";
                    document.getElementById('DescripcionLlamadaRVT').value = "";
                    document.getElementById('DescripcionLlamadaVali').value = "";
                    document.getElementById('FeedBackRVT').value = "";
                    document.getElementById('FeedBackVali').value = "";

                    document.getElementById('IdDepartamento').value = result[0].IdDepartamento;
                    document.getElementById('IdEmpleado').value = result[0].IdEmpleado;

                    if (result[0].IdDepartamento == 14) {
                        document.getElementById('Titulo').innerText = "RESULTADOS DE MONITOREO DE CALIDAD RVT";
                        ; document.getElementById('CompromisoRVT').style.display = 'block';
                        document.getElementById('RvtCompromiso').style.display = 'block';
                        document.getElementById('CompromisoValidador').style.display = 'none';
                        document.getElementById('ValidadorCompromiso').style.display = 'none';

                        document.getElementById('DescLlamadaRVT').style.display = 'block';
                        document.getElementById('DescripcionLlamadaRVT').style.display = 'block';
                        document.getElementById('DescLlamadaVali').style.display = 'none';
                        document.getElementById('DescripcionLlamadaVali').style.display = 'none';

                        document.getElementById('FeedB_RVT').style.display = 'block';
                        document.getElementById('FeedBackRVT').style.display = 'block';
                        document.getElementById('FeedB_Vali').style.display = 'none';
                        document.getElementById('FeedBackVali').style.display = 'none';
                    }
                    else {
                        document.getElementById('Titulo').innerText = "RESULTADOS DE MONITOREO DE CALIDAD VALIDADOR";
                        document.getElementById('CompromisoRVT').style.display = 'none';
                        document.getElementById('RvtCompromiso').style.display = 'none';
                        document.getElementById('CompromisoValidador').style.display = 'block';
                        document.getElementById('ValidadorCompromiso').style.display = 'block';

                        document.getElementById('DescLlamadaRVT').style.display = 'none';
                        document.getElementById('DescripcionLlamadaRVT').style.display = 'none';
                        document.getElementById('DescLlamadaVali').style.display = 'block';
                        document.getElementById('DescripcionLlamadaVali').style.display = 'block';

                        document.getElementById('FeedB_RVT').style.display = 'none';
                        document.getElementById('FeedBackRVT').style.display = 'none';
                        document.getElementById('FeedB_Vali').style.display = 'block';
                        document.getElementById('FeedBackVali').style.display = 'block';
                    }
                }
            }
        };
        xml.open("POST", url, true);
        xml.setRequestHeader('Content-Type', 'application/json');
        xml.send(JSON.stringify(json));
    }
}

//Funcion que guarda el compromiso o el desacuerdo del RVT
function GuardarCompromiso() {
    if (sessionStorage.getItem('puesto') == 25 || sessionStorage.getItem('puesto') == 28)
    {

        if (sessionStorage.getItem('puesto') == 25)
        {

            if ((document.getElementById('RvtCompromiso').value == ""))
            {
                var json = {
                    IdVariable: document.getElementById('CampanaO').value,
                    IdEmpleado: document.getElementById('IdEmpleadoO').value,
                    RvtCompromiso: document.getElementById('RvtCompromisoO').value,
                    ValidadorCompromiso: document.getElementById('ValidadorCompromisoO').value,
                }
                var xml = new XMLHttpRequest();
                var url = hostInit + "/MonitoreoCalidad/InsertarCompromiso";
                xml.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var result = JSON.parse(this.responseText);
                        if (result != 0 || result >= 0)
                        {
                            document.getElementById('myModal1').style.display = 'block';
                            document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                            document.getElementById('myModalLabel').innerHTML = "¡Correcto!";
                            document.getElementById('infoModal').innerHTML = "Información enviada correctamente";
                            LimpiarCompromiso();
                        }
                        else
                        {
                            document.getElementById('myModal1').style.display = 'block';
                            document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                            document.getElementById('myModalLabel').innerHTML = "Advertencia";
                            document.getElementById('infoModal').innerHTML = "Error al insertar información";
                        }
                    }
                };
                xml.open("POST", url, true);
                xml.setRequestHeader('Content-Type', 'application/json');
                xml.send(JSON.stringify(json));
            }
            else
            {
                document.getElementById('myModal1').style.display = 'block';
                document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                document.getElementById('myModalLabel').innerHTML = "Advertencia";
                document.getElementById('infoModal').innerHTML = "Llene el compromiso";
            }
        }
        else {

            if ((document.getElementById('ValidadorCompromiso').value == ""))
            {
                var json = {
                    IdVariable: document.getElementById('CampanaO').value,
                    IdEmpleado: document.getElementById('IdEmpleadoO').value,
                    RvtCompromiso: document.getElementById('RvtCompromisoO').value,
                    ValidadorCompromiso: document.getElementById('ValidadorCompromisoO').value,
                }
                var xml = new XMLHttpRequest();
                var url = hostInit + "/MonitoreoCalidad/InsertarCompromiso";
                xml.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var result = JSON.parse(this.responseText);
                        if (result != 0 || result >= 0) {
                            document.getElementById('myModal1').style.display = 'block';
                            document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                            document.getElementById('myModalLabel').innerHTML = "¡Correcto!";
                            document.getElementById('infoModal').innerHTML = "Información enviada correctamente";
                            LimpiarCompromiso();
                        } else {
                            document.getElementById('myModal1').style.display = 'block';
                            document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                            document.getElementById('myModalLabel').innerHTML = "Advertencia";
                            document.getElementById('infoModal').innerHTML = "Error al insertar información";
                        }
                    }
                };
                xml.open("POST", url, true);
                xml.setRequestHeader('Content-Type', 'application/json');
                xml.send(JSON.stringify(json));


            }
            else
            {
                document.getElementById('myModal1').style.display = 'block';
                document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                document.getElementById('myModalLabel').innerHTML = "Advertencia";
                document.getElementById('infoModal').innerHTML = "Llene el compromiso";
            }
        }
        }
    else {
        if ((document.getElementById('RvtCompromiso').value != "" || document.getElementById('ValidadorCompromiso').value != "") && document.getElementById('RFCRetro').value != "") {
            var json = {
                IdVariable: document.getElementById('Campana').value,
                IdEmpleado: document.getElementById('IdEmpleado').value,
                RvtCompromiso: document.getElementById('RvtCompromiso').value,
                ValidadorCompromiso: document.getElementById('ValidadorCompromiso').value,
            }

            var xml = new XMLHttpRequest();
            var url = hostInit + "/MonitoreoCalidad/InsertarCompromiso";
            xml.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText);
                    if (result != 0 || result >= 0) {
                        document.getElementById('myModal1').style.display = 'block';
                        document.getElementById('modalEmp').className = "modal-header alert-success justify-content-center";
                        document.getElementById('myModalLabel').innerHTML = "¡Correcto!";
                        document.getElementById('infoModal').innerHTML = "Información enviada correctamente";
                        LimpiarCompromiso();
                    } else {
                        document.getElementById('myModal1').style.display = 'block';
                        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
                        document.getElementById('myModalLabel').innerHTML = "Advertencia";
                        document.getElementById('infoModal').innerHTML = "Error al insertar información";
                    }
                }
            };
            xml.open("POST", url, true);
            xml.setRequestHeader('Content-Type', 'application/json');
            xml.send(JSON.stringify(json));
        } else {
            document.getElementById('myModal1').style.display = 'block';
            document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center";
            document.getElementById('myModalLabel').innerHTML = "Advertencia";
            document.getElementById('infoModal').innerHTML = "Llene todos los campos";
        }
    }
}

//Funcion para Restar la calificacion del Validador
function RestaVal(calificacion, r) {

    if (document.getElementById('CalificacionVal').value != 0) {
        if (resta != r) {
            var cal = document.getElementById('CalificacionVal').value;
            var calF = document.getElementById('CalificacionValF').value;
            var calFinal = parseFloat(calF) - parseFloat(calificacion);
            document.getElementById('CalificacionVal').value = Math.round(calFinal);
            document.getElementById('CalificacionValF').value = parseFloat(calFinal);
            // PromedioGralRVT();
            resta = r;
        }
    }
}

//Funcion para Restar la calificacion de Validacion
function RestaValECS(calificacion, r) {

    if (document.getElementById('TotalVal').value != 0) {
        if (resta != r) {
            if (va2 == "0") {

            } else {
                var cal = document.getElementById('TotalVal').value;
                var calF = document.getElementById('TotalVal2').value;
                var calFinal = parseFloat(calF) - parseFloat(calificacion);
                document.getElementById('TotalVal').value = Math.round(calFinal);
                document.getElementById('TotalVal2').value = parseFloat(calFinal);
                PromedioGralRVT();
                resta = r;
            }
        }
    }
}

//Funcion para Restar la calificacion del RVT 
function RestaRVTECS(calificacion, r) {

    if (document.getElementById('TotalVenta').value != 0) {
        if (resta != r) {
            if (va == "0") {
               
            } else {
                var cal = document.getElementById('TotalVenta').value;
                var calF = document.getElementById('TotalVenta2').value;
                var calFinal = parseFloat(calF) - parseFloat(calificacion);
                document.getElementById('TotalVenta').value = Math.round(calFinal);
                document.getElementById('TotalVenta2').value = parseFloat(calFinal);
                PromedioGralRVT();
                resta = r;
                //console.log(resta);
            }
        }
    }
}

//Funcion de prueba para el guardado de valores del RVT en el monitoreo
function GuardarValoresRVT() {
    var rvt = document.querySelectorAll('select[id="CumplimientoRVT"]');
    var m = document.querySelectorAll('input[id="IdMonitoreoRVT"]');
    for (var i = 0; i < rvt.length; i++) {
        console.log("1", m[i].value, rvt[i].value);
    }
    ValoresValidador();
}

//Funcion de prueba para el guardado de valores del validador en el monitoreo 
function ValoresValidador() {
    var val = document.getElementsByName('MandarPonderacionIntro');
    var m = document.querySelectorAll('input[id="IdMonitoreoValIntro"]');
    console.log("Validacion");
    console.error("Introduccion");
    for (var i = 0; i < val.length; i++) {
        console.log("Intro", "1", m[i].value, val[i].value);
    }

    var val = document.getElementsByName('MandarPonderacionVDG');
    var m = document.querySelectorAll('input[id="IdMonitoreoValVDG"]');
    console.error("Validacion de datos generales");
    for (var i = 0; i < val.length; i++) {
        console.log("VDG", "1", m[i].value, val[i].value);
    }

    var val = document.getElementsByName('MandarPonderacionCDC');
    var m = document.querySelectorAll('input[id="IdMonitoreoValCDC"]');
    console.error("Confirmacion de cita");
    for (var i = 0; i < val.length; i++) {
        console.log("CDC", "1", m[i].value, val[i].value);
    }

    var val = document.getElementsByName('MandarPonderacionDesp');
    var m = document.querySelectorAll('input[id="IdMonitoreoValDesp"]');
    console.error("Despedida");
    for (var i = 0; i < val.length; i++) {
        console.log("Despedida", "1", m[i].value, val[i].value);
    }

    var val = document.getElementsByName('MandarPonderacionADS');
    var m = document.querySelectorAll('input[id="IdMonitoreoValADS"]');
    console.error("Actitud de servicio");
    for (var i = 0; i < val.length; i++) {
        console.log("Actitud", "1", m[i].value, val[i].value);
    }

    var val = document.getElementsByName('MandarPonderacionComuni');
    var m = document.querySelectorAll('input[id="IdMonitoreoValComuni"]');
    console.error("Comunicacion");
    for (var i = 0; i < val.length; i++) {
        console.log("Comuni", "1", m[i].value, val[i].value);
    }

    var val = document.getElementsByName('MandarPonderacionEtiquetaT');
    var m = document.querySelectorAll('input[id="IdMonitoreoValEtiquetaT"]');
    console.error("Etiqueta telefonita");
    for (var i = 0; i < val.length; i++) {
        console.log("Etiqueta", "1", m[i].value, val[i].value);
    }

    var m = document.querySelectorAll('input[id="IdMonitoreoValError"]');
    console.error("Error critico");
    for (var i = 0; i < m.length; i++) {
        console.log("Error", "1", m[i].value, 0);
    }
}

//Función que muestra o esconde el Tab de validación dependiendo el tipo de llamada
function ValidarTipoLlamada() {
    if (document.getElementById('TipoLlamada').value == 'VENTA')
    {
        document.getElementById('NavValidacion').hidden = false;
    }
    else
    {
        document.getElementById('NavValidacion').hidden = true;
    }
}


//Funcion que carga los Validadores
function CargarValidadoresECS() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/MonitoreoCalidad/CargarVal";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '<option value="0" selected>Seleccione</option>'
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].id_Empleado + '">' + result[i].Nombre_1 + '</option>';
            }
            document.getElementById('NombValiECS').innerHTML = opt;
        }
    };
    xml.open("GET", url, true);
    xml.send();
}

//Funcion que carga los Super
function CargarSuper() {
    var xml = new XMLHttpRequest();
    var url = hostInit + "/MonitoreoCalidad/CargarSuper";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            var opt = '<option value="0" selected>Seleccione</option>'
            for (var i = 0; i < result.length; i++) {
                opt += '<option value="' + result[i].id_Empleado + '">' + result[i].Nombre_1 + '</option>';
            }
            document.getElementById('Id_Supervisor').innerHTML = opt;
        }
    };
    xml.open("GET", url, true);
    xml.send();
}

//Limpia los valores de compromiso
function LimpiarCompromiso() {
    document.getElementById('RFCRetro').value = "";
    document.getElementById('RvtCompromiso').value = "";
    document.getElementById('ValidadorCompromiso').value = "";
    document.getElementById('Campana').innerHTML = "";
    document.getElementById('ResultadosRVT').innerHTML = "";

    document.getElementById('DescripcionLlamadaRVT').value = "";
    document.getElementById('DescripcionLlamadaVali').value = "";
    document.getElementById('FeedBackRVT').value = "";
    document.getElementById('FeedBackVali').value = "";

    document.getElementById('RvtCompromisoO').value = "";
    document.getElementById('ValidadorCompromisoO').value = "";
    document.getElementById('CampanaO').innerHTML = "";
    document.getElementById('ResultadosRVTO').innerHTML = "";

    document.getElementById('DescripcionLlamadaRVTO').value = "";
    document.getElementById('DescripcionLlamadaValiO').value = "";
    document.getElementById('FeedBackRVTO').value = "";
    document.getElementById('FeedBackValiO').value = "";
}

//Funcion que hace el llamado para llenar la tabla de Valores monitoreo
function CargarTablaECS(campana) {
    var json = {
        Campana: campana
    }
    var xml = new XMLHttpRequest();
    var url = hostInit + "/MonitoreoCalidad/InsertarTablaValoresMonitoreo";
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result != 0) {
                var html = document.getElementById("example").innerHTML;
                for (var i = 0; i < result.length; i++) {
                    html += '<th>';
                    html += 'NOMBRE DEL EJECUTIVO';
                    html += '</th>';
                }
            }
            else {
                console.log("Error");
            }
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(json));
}

//Funcion para gerenerar layout
function CrearLayoutMonitoreo() {
    if (document.getElementById('Campana').value != 0) {
        var xml = new XMLHttpRequest();
        var url = hostInit + "/MonitoreoCalidad/CrearLayoutMonitoreo";
        var json = {
            Id_Campana: document.getElementById('Campana').value,
            FechaInicio: document.getElementById('FechaInicio').value,
            FechaFin: document.getElementById('FechaFin').value,
            IdAnalista: sessionStorage.getItem('usuario')
        }
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);

                var html = '<table id="example" class="table table-bordered table-hover" style="margin-top:15px">';
                html += '<thead class="text-center" style="background-color:steelblue; color:white; font-weight:bold">';
                var campana = document.getElementById('Campana').value;
                if (campana == 26 || campana == 27 || campana == 32) {
                    html += '<tr>';
                    html += '<th>';
                    html += 'STATUS DEL TRÁMITE';
                    html += '</th>';
                    html += '<th>';
                    html += 'MONITOREO / CALIBRACIÓN';
                    html += '</th>';
                    html += '<th>';
                    html += 'NOMBRE DEL EJECUTIVO';
                    html += '</th>';
                    html += '<th>';
                    html += 'NOMBRE DEL SUPERVISOR';
                    html += '</th>';
                    html += '<th>';
                    html += 'NOMBRE DEL VALIDADOR';
                    html += '</th>';
                    html += '<th>';
                    html += 'NOMBRE DEL SUPERVISOR';
                    html += '</th>';
                    html += '<th>';
                    html += 'CAMPAÑA / # CENTRO AUTORIZADO';
                    html += '</th>';
                    html += '<th>';
                    html += 'ANALISTA DE CALIDAD';
                    html += '</th>';
                    html += '<th>';
                    html += 'NOMBRE DEL CLIENTE';
                    html += '</th>';
                    html += '<th>';
                    html += 'FECHA VENTA';
                    html += '</th>';
                    html += '<th>';
                    html += 'FECHA ESCUCHA';
                    html += '</th>';
                    html += '<th>';
                    html += '# TELEFONICO';
                    html += '</th>';
                    html += '<th>';
                    html += 'FOLIO ECS';
                    html += '</th>';
                    html += '<th>';
                    html += 'NIVEL DE SATISFACIÓN';
                    html += '</th>';
                    html += '<th>';
                    html += 'AUDIO CLIENTE';
                    html += '</th>';
                    html += '<th>';
                    html += 'AUDIO EJECUTIVO';
                    html += '</th>';
                    html += '<th>';
                    html += 'AUDIO VALIDADOR';
                    html += '</th>';
                    html += '<th>';
                    html += 'COMENTARIOS';
                    html += '</th>';
                    html += '<th>';
                    html += 'VENTA';
                    html += '</th>';
                    html += '<th>';
                    html += 'VALIDACIÓN';
                    html += '</th>';
                    html += '<th>';
                    html += 'CALIFICACIÓN TOTAL';
                    html += '</th>';
                    html += '<th>';
                    html += 'ERROR CRÍTICO RVT';
                    html += '</th>';
                    html += '<th>';
                    html += 'ERROR CRÍTICO VALIDADOR';
                    html += '</th>';
                    html += '<th>';
                    html += 'TIPIFICACIÓN';
                    html += '</th>';
                    html += '<th>';
                    html += 'Presentación Institucional (RVT menciona su Nombre, Apellido y saluda cordialmente)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Menciona el Número del Centro Telefónico Autorizado';
                    html += '</th>';
                    html += '<th>';
                    html += 'La llamada sera grabada con fines de calidad en el servicio';
                    html += '</th>';
                    html += '<th>';
                    html += 'Menciona motivo de llamada (script)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Menciona Artículo 44 : "¿Desea que se le ofrezca el producto de tarjeta de crédito?" (MA / PAS), "¿Desea mas información sobre dicho producto? (PAP)"';
                    html += '</th>';
                    html += '<th>';
                    html += 'Menciona Aviso de Privacidad (Script)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Sondeo de Duplicidad (Trámite previo no mayor a 6 meses)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Sondeo de Problemas ante Buró de Crédito en los últimos 6 años / Continúa proceso correctamente de acuerdo a la situación del Cliente (término de llamada en caso de buró de crédito)';
                    html += '</th>';
                    html += '<th>';
                    html += '¿Cuenta con IFE / INE vigente? * Indicar IFE/INE como Identificación para Mexicanos, y para extranjeros Pasaporte y tarjeta de residente permanente. Comprobante de domicilio capturar igual al que presentará en sucursal';
                    html += '</th>';
                    html += '<th>';
                    html += 'Sondeo de Ingresos (Mensuales Totales)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Edad';
                    html += '</th>';
                    html += '<th>';
                    html += '¿Es Usted Titular de alguna Tarjeta de Crédito vigente, otorgada por algún Banco?';
                    html += '</th>';
                    html += '<th>';
                    html += 'Solicitar 4 Digitos de la Tarjeta';
                    html += '</th>';
                    html += '<th>';
                    html += '¿Tiene Usted alguna Tarjeta de Credito Vigente con algun Comercio o Proveedor de Servicios en donde sea el Titular? ';
                    html += '</th>';
                    html += '<th>';
                    html += 'Menciona el proceso de Solicitud de Trámite de TC. Se refiere a la respuesta inmediata del trámite (Respuesta de eclipse)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Sondeo de Necesidades del Cliente';
                    html += '</th>';
                    html += '<th>';
                    html += 'Aplica Cierre de venta Efectivo. (Máximo 3 veces y utiliza beneficios de tener una Tarjeta de Crédito Citibanamex)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Realiza Manejo de Objeciones. (Máximo 3 veces y utiliza argumentos en realción a las necesidades del Cliente)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Crea escenarios reales del uso de Tarjeta de Crédito Citibanamex (en caso de ser necesario)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Perfila correctamente (sondea para perfilar), menciona y captura Producto Ofertado';
                    html += '</th>';
                    html += '<th>';
                    html += 'Beneficos y/o Promociones';
                    html += '</th>';
                    html += '<th>';
                    html += '*Nombre completo';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Fecha de Nacimiento';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Nacionalidad';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Estado Civil';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Escolaridad';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Número de Dependientes';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Domicilio: CAPTURAR TAL CUAL APARECE EN EL QUE LLEVARAN A SUCURSAL (Calle, Num Exterior, Num Interior; CP, Colonia/Fracc, Del/Mpo, Estado). ';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Tipo de Vivienda';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Tiempo de Residencia';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Clave Lada y Telefono Particular';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Clave Lada y Teléfono Celular';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Correo Electrónico';
                    html += '</th>';
                    html += '<th>';
                    html += '*SOLICITA CURP';
                    html += '</th>';
                    html += '<th>';
                    html += 'Confirma Tipo de Comprobante de Domicilio';
                    html += '</th>';
                    html += '<th>';
                    html += '* RFC';
                    html += '</th>';
                    html += '<th>';
                    html += '* Homoclave';
                    html += '</th>';
                    html += '<th>';
                    html += '* Nombre de la empresa o Empleador';
                    html += '</th>';
                    html += '<th>';
                    html += '* Domicilio Laboral ';
                    html += '</th>';
                    html += '<th>';
                    html += '*Actividad / Giro del Negocio';
                    html += '</th>';
                    html += '<th>';
                    html += '* Ocupación / Profesión';
                    html += '</th>';
                    html += '<th>';
                    html += '* Clave Lada y Telefono Laboral y Extensión';
                    html += '</th>';
                    html += '<th>';
                    html += '* Años de Antigüedad';
                    html += '</th>';
                    html += '<th>';
                    html += '* Tipo de Comprobante de Ingreso que presentaria en sucursal';
                    html += '</th>';
                    html += '<th>';
                    html += 'Solicita referencia 1 y captura datos de la misma ( parentesco y telefono)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Solicita referencia 2 y captura datos de la misma ( parentesco y telefono)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Nombre de Tarjeta de Crédito';
                    html += '</th>';
                    html += '<th>';
                    html += 'Costo de Anualidad';
                    html += '</th>';
                    html += '<th>';
                    html += 'CAT';
                    html += '</th>';
                    html += '<th>';
                    html += 'Tasa de Interes ponderada';
                    html += '</th>';
                    html += '<th>';
                    html += 'Vigencia';
                    html += '</th>';
                    html += '<th>';
                    html += 'Explica transferencia a validacion para terminar trámite';
                    html += '</th>';
                    html += '<th>';
                    html += 'Menciona la entrega de plástico en sucursal';
                    html += '</th>';
                    html += '<th>';
                    html += 'Confirma Documentación Solicitada';
                    html += '</th>';
                    html += '<th>';
                    html += 'Despedida Institucional (Indica transferencia de llamada con Ejecutivo de Validación, RVT indica su Nombre y Número de Centro Autorizado)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Establece un trato cordial, amable formal y respetuoso  (muestra actitud de servicio)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Resuelve de forma clara y oportuna las consultas del cliente';
                    html += '</th>';
                    html += '<th>';
                    html += 'Conserva la calma e integridad ante situaciones difíciles';
                    html += '</th>';
                    html += '<th>';
                    html += 'Escucha activa (muestra atención a la información brindada por cliente) ';
                    html += '</th>';
                    html += '<th>';
                    html += 'Es claro y certero en la información que proporciona al cliente';
                    html += '</th>';
                    html += '<th>';
                    html += 'Demuestra conocimiento y manejo del producto';
                    html += '</th>';
                    html += '<th>';
                    html += 'Utiliza un vocabulario profesional, claro (dicción, sin groserías o maltrato  al cliente)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Intensidad y tono de voz';
                    html += '</th>';
                    html += '<th>';
                    html += 'Personaliza la llamada  mínimo 3 veces (por nombre o apellido)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Utiliza adecuadamente el tiempo de espera / Utiliza el mute de forma adecuada';
                    html += '</th>';
                    html += '<th>';
                    html += 'Orden en la llamada, legales y apego a script';
                    html += '</th>';
                    html += '<th>';
                    html += 'Genera una falsa expectativa (Proporciona Información errónea) sobre el producto';
                    html += '</th>';
                    html += '<th>';
                    html += 'Maltrato al cliente';
                    html += '</th>';
                    html += '<th>';
                    html += 'Demeritan o Incitan a la cancelación o mal uso de todo producto Citibanamex';
                    html += '</th>';
                    html += '<th>';
                    html += 'Interacción abandonada o cortada por AT';
                    html += '</th>';
                    html += '<th>';
                    html += 'Brinda información a terceros no autorizados';
                    html += '</th>';
                    html += '<th>';
                    html += 'Venta Dolosa';
                    html += '</th>';
                    html += '<th>';
                    html += 'Presentación Institucional: Saluda Cordialmente, Agradece Tiempo en espera y Menciona su Nombre con Apellido y Num de Centro Autorizado';
                    html += '</th>';
                    html += '<th>';
                    html += 'Solicita Autorización para grabar Audio';
                    html += '</th>';
                    html += '<th>';
                    html += 'Sondeo de Duplicidad (Trámite previo no mayor a 6 meses)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Sondeo de Problemas ante Buró de Crédito';
                    html += '</th>';
                    html += '<th>';
                    html += '¿Cuenta con IFE / INE vigente? * Indicar IFE/INE como Identificación para Mexicanos, y para extranjeros Pasaporte y tarjeta de residente permanente. Comprobante de domicilio capturar igual al que presentará en sucursal';
                    html += '</th>';
                    html += '<th>';
                    html += 'Continúa proceso correctamente de acuerdo a la situación del Cliente (término de llamada en caso de buró de credito)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Menciona Párrafo Completo con Aviso de Privacidad';
                    html += '</th>';
                    html += '<th>';
                    html += 'Nombre de Tarjeta de Crédito';
                    html += '</th>';
                    html += '<th>';
                    html += 'Costo de Anualidad';
                    html += '</th>';
                    html += '<th>';
                    html += 'CAT';
                    html += '</th>';
                    html += '<th>';
                    html += 'Tasa de Interes ponderada';
                    html += '</th>';
                    html += '<th>';
                    html += 'Vigencia';
                    html += '</th>';
                    html += '<th>';
                    html += 'Nombre completo';
                    html += '</th>';
                    html += '<th>';
                    html += 'Domicilio (Calle, Num Exterior, Num Interior; CP, Del/Mpo, Estado, Colonia/Fracc)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Teléfonos (LADA, Tel Particular, Num Celular)';
                    html += '</th>';
                    html += '<th>';
                    html += '* CURP';
                    html += '</th>';
                    html += '<th>';
                    html += '* RFC';
                    html += '</th>';
                    html += '<th>';
                    html += '* Homoclave';
                    html += '</th>';
                    html += '<th>';
                    html += 'Solicita Autorización para grabar Audio';
                    html += '</th>';
                    html += '<th>';
                    html += '¿Es usted titular de alguna Tarjeta de Crédito vigente otorgada por algún Banco?';
                    html += '</th>';
                    html += '<th>';
                    html += 'R= Si *Ingresa los últimos cuatro digitos de su tarjeta de credito e Institución';
                    html += '</th>';
                    html += '<th>';
                    html += '¿Es titular de alguna Tarjeta de Credito Vigente otorgada por algun Comercio o Proveedor de Servicios (Tarjeta Departamental)? ';
                    html += '</th>';
                    html += '<th>';
                    html += 'R= Si Ingresa los últimos cuatro digitos de tu tarjeta de credito e Institución';
                    html += '</th>';
                    html += '<th>';
                    html += '¿Es titular y actualmente se encuentra pagando un crédito hipotecario con un banco en los últimos 2 años?';
                    html += '</th>';
                    html += '<th>';
                    html += 'R= Si Ingresa Banco';
                    html += '</th>';
                    html += '<th>';
                    html += '¿Ha adquirido un automóvil con algún Crédito Bancario en los últimos dos años?';
                    html += '</th>';
                    html += '<th>';
                    html += 'R= Si Ingresa Banco';
                    html += '</th>';
                    html += '<th>';
                    html += 'Solicita Autorización para dar Hit en Buró de Crédito';
                    html += '</th>';
                    html += '<th>';
                    html += 'Menciona Párrafo Completo de SOFOM';
                    html += '</th>';
                    html += '<th>';
                    html += '* SOLICITA Clave de Elector (Inicia con clave de Seccion en la parte frontal) SE DEBE DE MENCIONAR EN TODAS LAS LLAMADAS';
                    html += '</th>';
                   
                    html += '<th>';
                    html += '* Confirma Tipo de Comprobante de Domicilio ';
                    html += '</th>';
                    html += '<th>';
                    html += 'Indica y Explica al cliente el Respuesta Final de su solicitud, de acuerdo al  resultado proporcionado por Eclipse';
                    html += '</th>';
                    html += '<th>';
                    html += 'Si el trámite esta declinado por Buró, indica leyenda de script y teléfono (en caso de que aplique)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Confirma - Refuerza Documentación Solicitada ';
                    html += '</th>';
                    html += '<th>';
                    html += 'Agenda cita en sucursal para recoger Tarjeta lo antes posible (Response)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Proporciona Número de Folio emitido por Eclipse';
                    html += '</th>';
                    html += '<th>';
                    html += 'Alta de banca electronica para mayor control de sus cuentas';
                    html += '</th>';
                    html += '<th>';
                    html += 'Despedida Institucional indica su Nombre y Número de Centro Autorizado)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Establece un trato cordial, amable formal y respetuoso  (muestra actitud de servicio)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Resuelve de forma clara y oportuna las consultas del cliente';
                    html += '</th>';
                    html += '<th>';
                    html += 'Conserva la calma e integridad ante situaciones difíciles';
                    html += '</th>';
                    html += '<th>';
                    html += 'Escucha activa (muestra atención a la información brindada por cliente) ';
                    html += '</th>';
                    html += '<th>';
                    html += 'Es claro y certero en la información que proporciona al cliente';
                    html += '</th>';
                    html += '<th>';
                    html += 'Demuestra conocimiento y manejo del producto';
                    html += '</th>';
                    html += '<th>';
                    html += 'Utiliza un vocabulario profesional, claro (dicción, sin groserías o maltrato  al cliente)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Intensidad y tono de voz';
                    html += '</th>';
                    html += '<th>';
                    html += 'Personaliza la llamada  mínimo 3 veces (por nombre o apellido)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Utiliza adecuadamente el tiempo de espera / Utiliza el mute de forma adecuada';
                    html += '</th>';
                    html += '<th>';
                    html += 'Orden en la llamada, legales y apego a script';
                    html += '</th>';
                    html += '<th>';
                    html += 'Genera una falsa expectativa del producto ';
                    html += '</th>';
                    html += '<th>';
                    html += 'Maltrato al cliente';
                    html += '</th>';
                    html += '<th>';
                    html += 'Demeritan o incitan a la cancelación o mal uso de todo producto Citibanamex';
                    html += '</th>';
                    html += '<th>';
                    html += 'Interacción abandonada o cortada por AT';
                    html += '</th>';
                    html += '<th>';
                    html += 'Brinda información a terceros no autorizados';
                    html += '</th>';
                    html += '<th>';
                    html += 'Venta Dolosa';
                    html += '</th>';
                    html += '<th>';
                    html += 'Compromiso RVT';
                    html += '</th>';
                    html += '<th>';
                    html += 'Compromiso Validador';
                    html += '</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody class="tbody">';
                    var i;
                    for (i = 0; i < result.length; i++) {
                        html += '<tr>';
                        html += '<td>' + result[i].StatusTramite + '</td>';
                        html += '<td>' + result[i].Calibracion + '</td>';
                        html += '<td>' + result[i].NombreRVT + '</td>';
                        html += '<td>' + result[i].SuperRVT + '</td>';
                        html += '<td>' + result[i].NombreValidador + '</td>';
                        html += '<td>' + result[i].SuperVal + '</td>';
                        html += '<td>' + result[i].Centro + '</td>';
                        html += '<td>' + result[i].NombreAnalista + '</td>';
                        html += '<td>' + result[i].NombreCliente + '</td>';
                        html += '<td>' + formatDate(result[i].FechaVenta) + '</td>';
                        html += '<td>' + formatDate(result[i].FechaEva) + '</td>';
                        html += '<td>' + result[i].Telefonico + '</td>';
                        html += '<td>' + result[i].FolioECS + '</td>';
                        html += '<td>' + result[i].NivelS + '</td>';
                        html += '<td>' + result[i].audioc + '</td>';
                        html += '<td>' + result[i].audioe + '</td>';
                        html += '<td>' + result[i].audiov + '</td>';
                        html += '<td>' + result[i].Comentarios + '</td>';

                        html += '<td>' + result[i].CalificacionRVT + '</td>';
                        html += '<td>' + result[i].CalificacionVal + '</td>';
                        html += '<td>' + result[i].TotalLlamada + '</td>';
                        html += '<td>' + result[i].ErrorCriticoRVTECS + '</td>';
                        html += '<td>' + result[i].ErrorCriticoValECS + '</td>';
                        html += '<td>' + result[i].TipiECS + '</td>';

                        html += '<td>' + result[i].Pregunta1 + '</td>'
                        html += '<td>' + result[i].Pregunta2 + '</td>'
                        html += '<td>' + result[i].Pregunta3 + '</td>';
                        html += '<td>' + result[i].Pregunta4 + '</td>';
                        html += '<td>' + result[i].Pregunta5 + '</td>';
                        html += '<td>' + result[i].Pregunta6 + '</td>';
                        html += '<td>' + result[i].Pregunta7 + '</td>';
                        html += '<td>' + result[i].Pregunta8 + '</td>';
                        html += '<td>' + result[i].Pregunta9 + '</td>';
                        html += '<td>' + result[i].Pregunta10 + '</td>';
                        html += '<td>' + result[i].Pregunta11 + '</td>';
                        html += '<td>' + result[i].Pregunta12 + '</td>';
                        html += '<td>' + result[i].Pregunta13 + '</td>';
                        html += '<td>' + result[i].Pregunta14 + '</td>';
                        html += '<td>' + result[i].Pregunta15 + '</td>';
                        html += '<td>' + result[i].Pregunta16 + '</td>';
                        html += '<td>' + result[i].Pregunta17 + '</td>';
                        html += '<td>' + result[i].Pregunta18 + '</td>';
                        html += '<td>' + result[i].Pregunta19 + '</td>';
                        html += '<td>' + result[i].Pregunta20 + '</td>';
                        html += '<td>' + result[i].Pregunta21 + '</td>';
                        html += '<td>' + result[i].Pregunta22 + '</td>';
                        html += '<td>' + result[i].Pregunta23 + '</td>';
                        html += '<td>' + result[i].Pregunta24 + '</td>';
                        html += '<td>' + result[i].Pregunta25 + '</td>';
                        html += '<td>' + result[i].Pregunta26 + '</td>';
                        html += '<td>' + result[i].Pregunta27 + '</td>';
                        html += '<td>' + result[i].Pregunta28 + '</td>';
                        html += '<td>' + result[i].Pregunta29 + '</td>';
                        html += '<td>' + result[i].Pregunta30 + '</td>';
                        html += '<td>' + result[i].Pregunta31 + '</td>';
                        html += '<td>' + result[i].Pregunta32 + '</td>';
                        html += '<td>' + result[i].Pregunta33 + '</td>';
                        html += '<td>' + result[i].Pregunta34 + '</td>';
                        html += '<td>' + result[i].Pregunta35 + '</td>';
                        html += '<td>' + result[i].Pregunta36 + '</td>';

                        html += '<td>' + result[i].Pregunta37 + '</td>';
                        html += '<td>' + result[i].Pregunta38 + '</td>';
                        html += '<td>' + result[i].Pregunta39 + '</td>';
                        html += '<td>' + result[i].Pregunta40 + '</td>';
                        html += '<td>' + result[i].Pregunta41 + '</td>';
                        html += '<td>' + result[i].Pregunta42 + '</td>';
                        html += '<td>' + result[i].Pregunta43 + '</td>';
                        html += '<td>' + result[i].Pregunta44 + '</td>';
                        html += '<td>' + result[i].Pregunta45 + '</td>';
                        html += '<td>' + result[i].Pregunta46 + '</td>';
                        html += '<td>' + result[i].Pregunta47 + '</td>';
                        html += '<td>' + result[i].Pregunta48 + '</td>';
                        html += '<td>' + result[i].Pregunta49 + '</td>';
                        html += '<td>' + result[i].Pregunta50 + '</td>';
                        html += '<td>' + result[i].Pregunta51 + '</td>';
                        html += '<td>' + result[i].Pregunta52 + '</td>';
                        html += '<td>' + result[i].Pregunta53 + '</td>';
                        html += '<td>' + result[i].Pregunta54 + '</td>';
                        html += '<td>' + result[i].Pregunta55 + '</td>';
                        html += '<td>' + result[i].Pregunta56 + '</td>';
                        html += '<td>' + result[i].Pregunta57 + '</td>';
                        html += '<td>' + result[i].Pregunta58 + '</td>';
                        html += '<td>' + result[i].Pregunta59 + '</td>';
                        html += '<td>' + result[i].Pregunta60 + '</td>';
                        html += '<td>' + result[i].Pregunta61 + '</td>';
                        html += '<td>' + result[i].Pregunta62 + '</td>';
                        html += '<td>' + result[i].Pregunta63 + '</td>';
                        html += '<td>' + result[i].Pregunta64 + '</td>';
                        html += '<td>' + result[i].Pregunta65 + '</td>';
                        html += '<td>' + result[i].Pregunta66 + '</td>';
                        html += '<td>' + result[i].Pregunta67 + '</td>';
                        html += '<td>' + result[i].Pregunta68 + '</td>';
                        html += '<td>' + result[i].Pregunta69 + '</td>';
                        html += '<td>' + result[i].Pregunta70 + '</td>';
                        html += '<td>' + result[i].Pregunta71 + '</td>';
                        html += '<td>' + result[i].Pregunta72 + '</td>';
                        html += '<td>' + result[i].Pregunta73 + '</td>';
                        html += '<td>' + result[i].Pregunta74 + '</td>';
                        html += '<td>' + result[i].Pregunta75 + '</td>';
                        html += '<td>' + result[i].Pregunta76 + '</td>';
                        html += '<td>' + result[i].Pregunta77 + '</td>';
                        html += '<td>' + result[i].Pregunta78 + '</td>';
                        html += '<td>' + result[i].Pregunta79 + '</td>';
                        html += '<td>' + result[i].Pregunta80 + '</td>';
                        html += '<td>' + result[i].Pregunta81 + '</td>';
                        html += '<td>' + result[i].Pregunta82 + '</td>';
                        html += '<td>' + result[i].Pregunta83 + '</td>';
                        html += '<td>' + result[i].Pregunta84 + '</td>';
                        html += '<td>' + result[i].Pregunta85 + '</td>';
                        html += '<td>' + result[i].Pregunta86 + '</td>';
                        html += '<td>' + result[i].Pregunta87 + '</td>';
                        html += '<td>' + result[i].Pregunta88 + '</td>';
                        html += '<td>' + result[i].Pregunta89 + '</td>';
                        html += '<td>' + result[i].Pregunta90 + '</td>';
                        html += '<td>' + result[i].Pregunta91 + '</td>';
                        html += '<td>' + result[i].Pregunta92 + '</td>';
                        html += '<td>' + result[i].Pregunta93 + '</td>';
                        html += '<td>' + result[i].Pregunta94 + '</td>';
                        html += '<td>' + result[i].Pregunta95 + '</td>';
                        html += '<td>' + result[i].Pregunta96 + '</td>';
                        html += '<td>' + result[i].Pregunta97 + '</td>';
                        html += '<td>' + result[i].Pregunta98 + '</td>';
                        html += '<td>' + result[i].Pregunta99 + '</td>';
                        html += '<td>' + result[i].Pregunta100 + '</td>';
                        html += '<td>' + result[i].Pregunta101 + '</td>';
                        html += '<td>' + result[i].Pregunta102 + '</td>';
                        html += '<td>' + result[i].Pregunta103 + '</td>';
                        html += '<td>' + result[i].Pregunta104 + '</td>';
                        html += '<td>' + result[i].Pregunta105 + '</td>';
                        html += '<td>' + result[i].Pregunta106 + '</td>';
                        html += '<td>' + result[i].Pregunta107 + '</td>';
                        html += '<td>' + result[i].Pregunta108 + '</td>';
                        html += '<td>' + result[i].Pregunta109 + '</td>';
                        html += '<td>' + result[i].Pregunta110 + '</td>';
                        html += '<td>' + result[i].Pregunta111 + '</td>';
                        html += '<td>' + result[i].Pregunta112 + '</td>';
                        html += '<td>' + result[i].Pregunta113 + '</td>';
                        html += '<td>' + result[i].Pregunta114 + '</td>';
                        html += '<td>' + result[i].Pregunta115 + '</td>';
                        html += '<td>' + result[i].Pregunta116 + '</td>';
                        html += '<td>' + result[i].Pregunta117 + '</td>';
                        html += '<td>' + result[i].Pregunta118 + '</td>';
                        html += '<td>' + result[i].Pregunta119 + '</td>';
                        html += '<td>' + result[i].Pregunta120 + '</td>';
                        html += '<td>' + result[i].Pregunta121 + '</td>';
                        html += '<td>' + result[i].Pregunta122 + '</td>';
                        html += '<td>' + result[i].Pregunta123 + '</td>';
                        html += '<td>' + result[i].Pregunta124 + '</td>';
                        html += '<td>' + result[i].Pregunta125 + '</td>';
                        html += '<td>' + result[i].Pregunta126 + '</td>';
                        html += '<td>' + result[i].Pregunta127 + '</td>';
                        html += '<td>' + result[i].RvtCompromiso + '</td>';
                        html += '<td>' + result[i].ValidadorCompromiso + '</td>';
                        html += '</tr>';
                    }

                    html += '</tbody>';
                    html += '</table>';

                    $('#tabla').html(html);

                    $('#example').DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                            'excel', 'print'
                        ]
                    });
                }

                else {
                    html += '<tr>';
                    html += '<th>';
                    html += 'SERIE';
                    html += '</th>';
                    html += '<th>';
                    html += 'FOLIO';
                    html += '</th>';
                    html += '<th>';
                    html += 'TELÉFONO';
                    html += '</th>';
                    html += '<th>';
                    html += 'FECHA VENTA';
                    html += '</th>';
                    html += '<th>';
                    html += 'FECHA EVALUACIÓN';
                    html += '</th>';
                    html += '<th>';
                    html += 'CAMPAÑA';
                    html += '</th>';
                    html += '<th>';
                    html += 'NOMBRE AUDITOR';
                    html += '</th>';
                    html += '<th>';
                    html += 'NOMBRE RVT';
                    html += '</th>';
                    html += '<th>';
                    html += 'TIPO LLAMADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'TIÍFICACIÓN RVT';
                    html += '</th>';
                    html += '<th>';
                    html += 'TIPIFICACIÓN CORRECTA';
                    html += '</th>';
                    html += '<th>';
                    html += '¿RVT TIPIFICO CORRECTAMENTE?';
                    html += '</th>';
                    html += '<th>';
                    html += 'CALIFICACIÓN VENTA';
                    html += '</th>';
                    html += '<th>';
                    html += ' ERROR CRÍTICO VENTA';
                    html += '</th>';
                    html += '<th>';
                    html += 'DESCRIPCIÓN LLAMADA RVT';
                    html += '</th>';
                    html += '<th>';
                    html += 'FEEDBACK RVT';
                    html += '</th>';
                    html += '<th>';
                    html += 'COMPROMISO RVT';
                    html += '</th>';
                    
                    html += '<th>';
                    html += 'NOMBRE VALIDADOR';
                    html += '</th>';
                    html += '<th>';
                    html += 'CALIFICACIÓN VALIDACIÓN';
                    html += '</th>';
                    html += '<th>';
                    html += 'ERROR CRÍTICO VALIDACIÓN';
                    html += '</th>';
                    html += '<th>';
                    html += 'DESCRIPCIÓN LLAMADA VALIDADOR';
                    html += '</th>';
                    html += '<th>';
                    html += 'FEEDBACK VALIDADOR';
                    html += '</th>';
                    html += '<th>';
                    html += 'COMPROMISO VALIDADOR';
                    html += '</th>';

                    html += '<th>';
                    html += 'PRESENTACIÓNINSTITUCIONAL';
                    html += '</th>';
                    html += '<th>';
                    html += 'IDENTIFICA AL TITULAR';
                    html += '</th>';
                    html += '<th>';
                    html += 'MENCIONA MOTIVO DE LA LLAMADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'SONDEA QUE CLIENTE CUMPLA CON REQUISITOS';
                    html += '</th>';
                    html += '<th>';
                    html += 'PERFILA';
                    html += '</th>';
                    html += '<th>';
                    html += 'SONDEO AL CLIENTE';
                    html += '</th>';
                    html += '<th>';
                    html += 'MENCIONA CONDICIONES DE OFERTA';
                    html += '</th>';
                    html += '<th>';
                    html += 'MENCIONA PAGOS APROXIMADOS';
                    html += '</th>';
                    html += '<th>';
                    html += 'REALIZA CIERRE DE VENTA';
                    html += '</th>';
                    html += '<th>';
                    html += 'MANEJO DE OBJECIONES (POR LO MENOS 2)';
                    html += '</th>';
                    html += '<th>';
                    html += 'UTILIZA VENTAJAS Y BENEFICIOS';
                    html += '</th>';
                    html += '<th>';
                    html += 'CREA ESCENARIOS';
                    html += '</th>';
                    html += '<th>';
                    html += 'SUCURSAL';
                    html += '</th>';
                    html += '<th>';
                    html += 'INFORMA QUE SE TRANSFERIRA A VALIDACION / SE DESPIDE INSTITUCIONALMENTE';
                    html += '</th>';
                    html += '<th>';
                    html += 'RESPETO Y CORTESÍA';
                    html += '</th>';
                    html += '<th>';
                    html += 'EMPATÍA';
                    html += '</th>';
                    html += '<th>';
                    html += 'ASERTIVIDAD';
                    html += '</th>';
                    html += '<th>';
                    html += 'ESCUCHA ACTIVA';
                    html += '</th>';
                    html += '<th>';
                    html += 'INTENSIDAD Y TONO DE VOZ';
                    html += '</th>';
                    html += '<th>';
                    html += 'LENGUAJE';
                    html += '</th>';
                    html += '<th>';
                    html += 'PERSONALIZA LA LLAMADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'TIEMPOS DE ESPERA';
                    html += '</th>';
                    html += '<th>';
                    html += 'SEGURIDAD Y CONFIANZA';
                    html += '</th>';
                    html += '<th>';
                    html += 'MALTRATO AL CLIENTE';
                    html += '</th>';
                    html += '<th>';
                    html += 'GENERA FALSAS EXPECTATIVAS';
                    html += '</th>'; 
                    html += '<th>';
                    html += 'VENTA SIN COMPROMISO O FORZADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'INTERACCIÓN ABANDONADA O CORTADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'TIPIFICA REGISTRO DE FORMA INCORRECTA';
                    html += '</th>';
                    html += '<th>';
                    html += 'DEMERITA A LA EMPRESA O ÁREAS COLABORADORAS';
                    html += '</th>';
                    html += '<th>';
                    html += 'PROMUEVE LA CANCELACIÓN DE ALGÚN PRODUCTO DE CITIBANAMEX';
                    html += '</th>';
                    html += '<th>';
                    html += 'NO CONFIRMA LA ACEPTACION DEL PRODUCTO';
                    html += '</th>';
                    html += '<th>';
                    html += 'OMITE MENCIONAR LEYENDA DE LA LLAMADA SERÁ GRABADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'OMITE MENCIONAR ARTICULO 44';
                    html += '</th>';
                    html += '<th>';
                    html += 'OMITE MENCIONAR AVISO DE PRIVACIDAD';
                    html += '</th>';
                    html += '<th>';
                    html += 'MIENTE O TERGIVERSA INFORMACION';
                    html += '</th>';
                    html += '<th>';
                    html += 'BRINDA INFORMACIÓN A TERCEROS';
                    html += '</th>';
                    html += '<th>';
                    html += 'PRESENTACIÓN INSTITUCIONAL';
                    html += '</th>';
                    html += '<th>';
                    html += 'IDENTIFICA AL TITULAR';
                    html += '</th>';
                    html += '<th>';
                    html += 'CONFIRMA PRODUCTO QUE TRAMITARA';
                    html += '</th>';
                    html += '<th>';
                    html += 'CONFIRMA DATOS DE OFERTA';
                    html += '</th>';
                    html += '<th>';
                    html += 'CONFIRMA COMISIONES';
                    html += '</th>';
                    html += '<th>';
                    html += 'CONFIRMA LEYENDA DE ACEPTACION';
                    html += '</th>';
                    html += '<th>';
                    html += 'SUCURSAL';
                    html += '</th>';
                    html += '<th>';
                    html += 'SE DESPIDE INSTITUCIONALMENTE';
                    html += '</th>';
                    html += '<th>';
                    html += 'RESPETO Y CORTESÍA';
                    html += '</th>';
                    html += '<th>';
                    html += 'EMPATÍA';
                    html += '</th>';
                    html += '<th>';
                    html += 'ASERTIVIDAD';
                    html += '</th>';
                    html += '<th>';
                    html += 'ESCUCHA ACTIVA';
                    html += '</th>';
                    html += '<th>';
                    html += 'INTENSIDAD Y TONO DE VOZ';
                    html += '</th>';
                    html += '<th>';
                    html += 'LENGUAJE';
                    html += '</th>';
                    html += '<th>';
                    html += 'PERSONALIZA LA LLAMADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'TIEMPOS DE ESPERA';
                    html += '</th>';
                    html += '<th>';
                    html += 'SEGURIDAD Y CONFIANZA';
                    html += '</th>';
                    html += '<th>';
                    html += 'MALTRATO AL CLIENTE';
                    html += '</th>';
                    html += '<th>';
                    html += 'GENERA FALSAS EXPECTATIVAS';
                    html += '</th>';
                    html += '<th>';
                    html += 'VENTA SIN COMPROMISO O FORZADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'INTERACCIÓN ABANDONADA O CORTADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'TIPIFICA REGISTRO DE FORMA INCORRECTA';
                    html += '</th>';
                    html += '<th>';
                    html += 'DEMERITA A LA EMPRESA O ÁREAS COLABORADORAS';
                    html += '</th>';
                    html += '<th>';
                    html += 'PROMUEVE LA CANCELACIÓN DE ALGÚN PRODUCTO DE CITIBANAMEX';
                    html += '</th>';
                    html += '<th>';
                    html += 'OMITE MENCIONAR LEYENDA DE LA LLAMADA SERÁ GRABADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'OMITE MENCIONAR AVISO DE PRIVACIDAD';
                    html += '</th>';
                    html += '<th>';
                    html += 'AUTENTICA AL CLIENTE';
                    html += '</th>';
                    html += '<th>';
                    html += 'MIENTE O TERGIVERSA INFORMACION';
                    html += '</th>';
                    html += '<th>';
                    html += 'BRINDA INFORMACIÓN A TERCEROS';
                    html += '</th>';

                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody class="tbody">';
                    var i;
                    for (i = 0; i < result.length; i++) {
                        html += '<tr>';
                        html += '<td>' + result[i].Serie + '</td>';
                        html += '<td>' + result[i].Folio + '</td>';
                        html += '<td>' + result[i].Telefono + '</td>';
                        html += '<td>' + formatDate(result[i].FechaVenta) + '</td>';
                        html += '<td>' + formatDate(result[i].FechaEva) + '</td>';
                        html += '<td>' + result[i].Campana + '</td>';
                        html += '<td>' + result[i].NombreAnalista + '</td>';
                        html += '<td>' + result[i].NombreRVT + '</td>';
                        html += '<td>' + result[i].TipoLlamada + '</td>';
                        html += '<td>' + result[i].TipificacionRVT + '</td>';
                        html += '<td>' + result[i].TipificacionCorrecta + '</td>';
                        html += '<td>' + result[i].RVTTipiCorrect + '</td>';
                        html += '<td>' + result[i].CalificacionRVT + '</td>';
                        html += '<td>' + result[i].ErrorCriticoRVT + '</td>';
                        html += '<td>' + result[i].DescripcionLlamadaRVT + '</td>';
                        html += '<td>' + result[i].FeedbakRVT + '</td>';
                        html += '<td>' + result[i].RvtCompromiso + '</td>';
                        html += '<td>' + result[i].NombreValidador + '</td>';
                        html += '<td>' + result[i].CalificacionVal + '</td>';
                        html += '<td>' + result[i].ErrorCriticoVal + '</td>';
                       
                        html += '<td>' + result[i].DescripcionLlamadaValidador + '</td>';
                        html += '<td>' + result[i].FeedbakValidador + '</td>';
                        html += '<td>' + result[i].ValidadorCompromiso + '</td>';

                        html += '<td>' + result[i].Pregunta1 + '</td>'
                        html += '<td>' + result[i].Pregunta2 + '</td>'
                        html += '<td>' + result[i].Pregunta3 + '</td>';
                        html += '<td>' + result[i].Pregunta4 + '</td>';
                        html += '<td>' + result[i].Pregunta5 + '</td>';
                        html += '<td>' + result[i].Pregunta6 + '</td>';
                        html += '<td>' + result[i].Pregunta7 + '</td>';
                        html += '<td>' + result[i].Pregunta8 + '</td>';
                        html += '<td>' + result[i].Pregunta9 + '</td>';
                        html += '<td>' + result[i].Pregunta10 + '</td>';
                        html += '<td>' + result[i].Pregunta11 + '</td>';
                        html += '<td>' + result[i].Pregunta12 + '</td>';
                        html += '<td>' + result[i].Pregunta13 + '</td>';
                        html += '<td>' + result[i].Pregunta14 + '</td>';
                        html += '<td>' + result[i].Pregunta15 + '</td>';
                        html += '<td>' + result[i].Pregunta16 + '</td>';
                        html += '<td>' + result[i].Pregunta17 + '</td>';
                        html += '<td>' + result[i].Pregunta18 + '</td>';
                        html += '<td>' + result[i].Pregunta19 + '</td>';
                        html += '<td>' + result[i].Pregunta20 + '</td>';
                        html += '<td>' + result[i].Pregunta21 + '</td>';
                        html += '<td>' + result[i].Pregunta22 + '</td>';
                        html += '<td>' + result[i].Pregunta23 + '</td>';
                        html += '<td>' + result[i].Pregunta24 + '</td>';
                        html += '<td>' + result[i].Pregunta25 + '</td>';
                        html += '<td>' + result[i].Pregunta26 + '</td>';
                        html += '<td>' + result[i].Pregunta27 + '</td>';
                        html += '<td>' + result[i].Pregunta28 + '</td>';
                        html += '<td>' + result[i].Pregunta29 + '</td>';
                        html += '<td>' + result[i].Pregunta30 + '</td>';
                        html += '<td>' + result[i].Pregunta31 + '</td>';
                        html += '<td>' + result[i].Pregunta32 + '</td>';
                        html += '<td>' + result[i].Pregunta33 + '</td>';
                        html += '<td>' + result[i].Pregunta34 + '</td>';
                        html += '<td>' + result[i].Pregunta35 + '</td>';
                        html += '<td>' + result[i].Pregunta36 + '</td>';

                        html += '<td>' + result[i].Pregunta37 + '</td>';
                        html += '<td>' + result[i].Pregunta38 + '</td>';
                        html += '<td>' + result[i].Pregunta39 + '</td>';
                        html += '<td>' + result[i].Pregunta40 + '</td>';
                        html += '<td>' + result[i].Pregunta41 + '</td>';
                        html += '<td>' + result[i].Pregunta42 + '</td>';
                        html += '<td>' + result[i].Pregunta43 + '</td>';
                        html += '<td>' + result[i].Pregunta44 + '</td>';
                        html += '<td>' + result[i].Pregunta45 + '</td>';
                        html += '<td>' + result[i].Pregunta46 + '</td>';
                        html += '<td>' + result[i].Pregunta47 + '</td>';
                        html += '<td>' + result[i].Pregunta48 + '</td>';
                        html += '<td>' + result[i].Pregunta49 + '</td>';
                        html += '<td>' + result[i].Pregunta50 + '</td>';
                        html += '<td>' + result[i].Pregunta51 + '</td>';
                        html += '<td>' + result[i].Pregunta52 + '</td>';
                        html += '<td>' + result[i].Pregunta53 + '</td>';
                        html += '<td>' + result[i].Pregunta54 + '</td>';
                        html += '<td>' + result[i].Pregunta55 + '</td>';
                        html += '<td>' + result[i].Pregunta56 + '</td>';
                        html += '<td>' + result[i].Pregunta57 + '</td>';
                        html += '<td>' + result[i].Pregunta58 + '</td>';
                        html += '<td>' + result[i].Pregunta59 + '</td>';
                        html += '<td>' + result[i].Pregunta60 + '</td>';
                        html += '<td>' + result[i].Pregunta61 + '</td>';
                        html += '<td>' + result[i].Pregunta62 + '</td>';
                        html += '<td>' + result[i].Pregunta63 + '</td>';
                        html += '<td>' + result[i].Pregunta64 + '</td>';
                        html += '<td>' + result[i].Pregunta65 + '</td>';
                        html += '</tr>';
                    }

                    html += '</tbody>';
                    html += '</table>';

                    $('#tabla').html(html);

                    $('#example').DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                            'excel', 'print'
                        ]
                    });
                }
            }
        };
        xml.open("POST", url, true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(json));
    } else {
        alertify.error("Ingresar al menos un criterio para generar el reporte");
    }
}


//Busca el empleado 
function buscarEmpleadoMC() {
    if (document.getElementById('BuscaRFC').value == "") {
        document.getElementById('myModal1').style.display = 'block';
        document.getElementById('modalEmp').className = "modal-header alert-warning justify-content-center text-center";
        document.getElementById('myModalLabel').innerHTML = "Advertencia";
        document.getElementById('infoModal').innerHTML = "Ingresar RFC para realizar la busqueda";
    } else {
        var xml = new XMLHttpRequest();
        var url = hostInit + "/MonitoreoCalidad/BuscarEmpleado";
        var json = {
            RFC: document.getElementById('BuscaRFC').value
        }
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                if (result.id_Empleado != 0) {
                    document.getElementById('MONITOREOECS').hidden = false;
                    document.getElementById('tabMoni').hidden = false;
                    document.getElementById('BuscaRFC').value = "";
                    document.getElementById('IdRVT').value = result.id_Empleado;
                    document.getElementById('IdRVTECS').value = result.id_Empleado;
                    document.getElementById('NomRVT').innerHTML = result.Nombre_1;
                    document.getElementById('NomRVTECS').innerHTML = result.Nombre_1;
                    nom = result.Nombre_1;
                } else {
                    alertify.error("No hay ninguna coincidencia");
                }
            }
        };
        xml.open("POST", url, true);
        xml.setRequestHeader('Content-Type', 'application/json');
        xml.send(JSON.stringify(json));
    }
}

//Funcion para gerenerar layout general
function CrearLayoutGeneralMonitoreo() {
    if (document.getElementById('Campanas').value != 0) {
        var xml = new XMLHttpRequest();
        var url = hostInit + "/MonitoreoCalidad/CrearLayoutMonitoreoGeneral";
        var json = {
            Id_Campana: document.getElementById('Campanas').value,
            FechaInicio: document.getElementById('FechaInicio').value,
            FechaFin: document.getElementById('FechaFin').value
           
        }
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);

                var html = '<table id="example" class="table table-bordered table-hover" style="margin-top:15px">';
                html += '<thead class="text-center" style="background-color:steelblue; color:white; font-weight:bold">';
                
                var campana = document.getElementById('Campanas').value;
                if (campana == 2 ) {
                    html += '<tr>';
                    html += '<th>';
                    html += 'CAMPAÑA';
                    html += '</th>';
                    html += '<th>';
                    html += 'STATUS DEL TRÁMITE';
                    html += '</th>';
                    html += '<th>';
                    html += 'MONITOREO / CALIBRACIÓN';
                    html += '</th>';
                    html += '<th>';
                    html += 'NOMBRE DEL EJECUTIVO';
                    html += '</th>';
                    html += '<th>';
                    html += 'NOMBRE DEL SUPERVISOR';
                    html += '</th>';
                    html += '<th>';
                    html += 'NOMBRE DEL VALIDADOR';
                    html += '</th>';
                    html += '<th>';
                    html += 'NOMBRE DEL SUPERVISOR';
                    html += '</th>';
                    html += '<th>';
                    html += 'CAMPAÑA / # CENTRO AUTORIZADO';
                    html += '</th>';
                    html += '<th>';
                    html += 'ANALISTA DE CALIDAD';
                    html += '</th>';
                    html += '<th>';
                    html += 'NOMBRE DEL CLIENTE';
                    html += '</th>';
                    html += '<th>';
                    html += 'FECHA VENTA';
                    html += '</th>';
                    html += '<th>';
                    html += 'FECHA ESCUCHA';
                    html += '</th>';
                    html += '<th>';
                    html += '# TELEFONICO';
                    html += '</th>';
                    html += '<th>';
                    html += 'FOLIO ECS';
                    html += '</th>';
                    html += '<th>';
                    html += 'NIVEL DE SATISFACIÓN';
                    html += '</th>';
                    html += '<th>';
                    html += 'AUDIO CLIENTE';
                    html += '</th>';
                    html += '<th>';
                    html += 'AUDIO EJECUTIVO';
                    html += '</th>';
                    html += '<th>';
                    html += 'AUDIO VALIDADOR';
                    html += '</th>';
                    html += '<th>';
                    html += 'COMENTARIOS';
                    html += '</th>';
                    html += '<th>';
                    html += 'VENTA';
                    html += '</th>';
                    html += '<th>';
                    html += 'VALIDACIÓN';
                    html += '</th>';
                    html += '<th>';
                    html += 'CALIFICACIÓN TOTAL';
                    html += '</th>';
                    html += '<th>';
                    html += 'ERROR CRÍTICO RVT';
                    html += '</th>';
                    html += '<th>';
                    html += 'ERROR CRÍTICO VALIDADOR';
                    html += '</th>';
                    html += '<th>';
                    html += 'TIPIFICACIÓN';
                    html += '</th>';
                    html += '<th>';
                    html += 'Presentación Institucional (RVT menciona su Nombre, Apellido y saluda cordialmente)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Menciona el Número del Centro Telefónico Autorizado';
                    html += '</th>';
                    html += '<th>';
                    html += 'La llamada sera grabada con fines de calidad en el servicio';
                    html += '</th>';
                    html += '<th>';
                    html += 'Menciona motivo de llamada (script)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Menciona Artículo 44 : "¿Desea que se le ofrezca el producto de tarjeta de crédito?" (MA / PAS), "¿Desea mas información sobre dicho producto? (PAP)"';
                    html += '</th>';
                    html += '<th>';
                    html += 'Menciona Aviso de Privacidad (Script)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Sondeo de Duplicidad (Trámite previo no mayor a 6 meses)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Sondeo de Problemas ante Buró de Crédito en los últimos 6 años / Continúa proceso correctamente de acuerdo a la situación del Cliente (término de llamada en caso de buró de crédito)';
                    html += '</th>';
                    html += '<th>';
                    html += '¿Cuenta con IFE / INE vigente? * Indicar IFE/INE como Identificación para Mexicanos, y para extranjeros Pasaporte y tarjeta de residente permanente. Comprobante de domicilio capturar igual al que presentará en sucursal';
                    html += '</th>';
                    html += '<th>';
                    html += 'Sondeo de Ingresos (Mensuales Totales)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Edad';
                    html += '</th>';
                    html += '<th>';
                    html += '¿Es Usted Titular de alguna Tarjeta de Crédito vigente, otorgada por algún Banco?';
                    html += '</th>';
                    html += '<th>';
                    html += 'Solicitar 4 Digitos de la Tarjeta';
                    html += '</th>';
                    html += '<th>';
                    html += '¿Tiene Usted alguna Tarjeta de Credito Vigente con algun Comercio o Proveedor de Servicios en donde sea el Titular? ';
                    html += '</th>';
                    html += '<th>';
                    html += 'Menciona el proceso de Solicitud de Trámite de TC. Se refiere a la respuesta inmediata del trámite (Respuesta de eclipse)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Sondeo de Necesidades del Cliente';
                    html += '</th>';
                    html += '<th>';
                    html += 'Aplica Cierre de venta Efectivo. (Máximo 3 veces y utiliza beneficios de tener una Tarjeta de Crédito Citibanamex)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Realiza Manejo de Objeciones. (Máximo 3 veces y utiliza argumentos en realción a las necesidades del Cliente)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Crea escenarios reales del uso de Tarjeta de Crédito Citibanamex (en caso de ser necesario)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Perfila correctamente (sondea para perfilar), menciona y captura Producto Ofertado';
                    html += '</th>';
                    html += '<th>';
                    html += 'Beneficos y/o Promociones';
                    html += '</th>';
                    html += '<th>';
                    html += '*Nombre completo';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Fecha de Nacimiento';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Nacionalidad';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Estado Civil';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Escolaridad';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Número de Dependientes';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Domicilio: CAPTURAR TAL CUAL APARECE EN EL QUE LLEVARAN A SUCURSAL (Calle, Num Exterior, Num Interior; CP, Colonia/Fracc, Del/Mpo, Estado). ';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Tipo de Vivienda';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Tiempo de Residencia';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Clave Lada y Telefono Particular';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Clave Lada y Teléfono Celular';
                    html += '</th>';
                    html += '<th>';
                    html += ' *Correo Electrónico';
                    html += '</th>';
                    html += '<th>';
                    html += '*SOLICITA CURP';
                    html += '</th>';
                    html += '<th>';
                    html += 'Confirma Tipo de Comprobante de Domicilio';
                    html += '</th>';
                    html += '<th>';
                    html += '* RFC';
                    html += '</th>';
                    html += '<th>';
                    html += '* Homoclave';
                    html += '</th>';
                    html += '<th>';
                    html += '* Nombre de la empresa o Empleador';
                    html += '</th>';
                    html += '<th>';
                    html += '* Domicilio Laboral ';
                    html += '</th>';
                    html += '<th>';
                    html += '*Actividad / Giro del Negocio';
                    html += '</th>';
                    html += '<th>';
                    html += '* Ocupación / Profesión';
                    html += '</th>';
                    html += '<th>';
                    html += '* Clave Lada y Telefono Laboral y Extensión';
                    html += '</th>';
                    html += '<th>';
                    html += '* Años de Antigüedad';
                    html += '</th>';
                    html += '<th>';
                    html += '* Tipo de Comprobante de Ingreso que presentaria en sucursal';
                    html += '</th>';
                    html += '<th>';
                    html += 'Solicita referencia 1 y captura datos de la misma ( parentesco y telefono)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Solicita referencia 2 y captura datos de la misma ( parentesco y telefono)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Nombre de Tarjeta de Crédito';
                    html += '</th>';
                    html += '<th>';
                    html += 'Costo de Anualidad';
                    html += '</th>';
                    html += '<th>';
                    html += 'CAT';
                    html += '</th>';
                    html += '<th>';
                    html += 'Tasa de Interes ponderada';
                    html += '</th>';
                    html += '<th>';
                    html += 'Vigencia';
                    html += '</th>';
                    html += '<th>';
                    html += 'Explica transferencia a validacion para terminar trámite';
                    html += '</th>';
                    html += '<th>';
                    html += 'Menciona la entrega de plástico en sucursal';
                    html += '</th>';
                    html += '<th>';
                    html += 'Confirma Documentación Solicitada';
                    html += '</th>';
                    html += '<th>';
                    html += 'Despedida Institucional (Indica transferencia de llamada con Ejecutivo de Validación, RVT indica su Nombre y Número de Centro Autorizado)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Establece un trato cordial, amable formal y respetuoso  (muestra actitud de servicio)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Resuelve de forma clara y oportuna las consultas del cliente';
                    html += '</th>';
                    html += '<th>';
                    html += 'Conserva la calma e integridad ante situaciones difíciles';
                    html += '</th>';
                    html += '<th>';
                    html += 'Escucha activa (muestra atención a la información brindada por cliente) ';
                    html += '</th>';
                    html += '<th>';
                    html += 'Es claro y certero en la información que proporciona al cliente';
                    html += '</th>';
                    html += '<th>';
                    html += 'Demuestra conocimiento y manejo del producto';
                    html += '</th>';
                    html += '<th>';
                    html += 'Utiliza un vocabulario profesional, claro (dicción, sin groserías o maltrato  al cliente)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Intensidad y tono de voz';
                    html += '</th>';
                    html += '<th>';
                    html += 'Personaliza la llamada  mínimo 3 veces (por nombre o apellido)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Utiliza adecuadamente el tiempo de espera / Utiliza el mute de forma adecuada';
                    html += '</th>';
                    html += '<th>';
                    html += 'Orden en la llamada, legales y apego a script';
                    html += '</th>';
                    html += '<th>';
                    html += 'Genera una falsa expectativa (Proporciona Información errónea) sobre el producto';
                    html += '</th>';
                    html += '<th>';
                    html += 'Maltrato al cliente';
                    html += '</th>';
                    html += '<th>';
                    html += 'Demeritan o Incitan a la cancelación o mal uso de todo producto Citibanamex';
                    html += '</th>';
                    html += '<th>';
                    html += 'Interacción abandonada o cortada por AT';
                    html += '</th>';
                    html += '<th>';
                    html += 'Brinda información a terceros no autorizados';
                    html += '</th>';
                    html += '<th>';
                    html += 'Venta Dolosa';
                    html += '</th>';
                    html += '<th>';
                    html += 'Presentación Institucional: Saluda Cordialmente, Agradece Tiempo en espera y Menciona su Nombre con Apellido y Num de Centro Autorizado';
                    html += '</th>';
                    html += '<th>';
                    html += 'Solicita Autorización para grabar Audio';
                    html += '</th>';
                    html += '<th>';
                    html += 'Sondeo de Duplicidad (Trámite previo no mayor a 6 meses)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Sondeo de Problemas ante Buró de Crédito';
                    html += '</th>';
                    html += '<th>';
                    html += '¿Cuenta con IFE / INE vigente? * Indicar IFE/INE como Identificación para Mexicanos, y para extranjeros Pasaporte y tarjeta de residente permanente. Comprobante de domicilio capturar igual al que presentará en sucursal';
                    html += '</th>';
                    html += '<th>';
                    html += 'Continúa proceso correctamente de acuerdo a la situación del Cliente (término de llamada en caso de buró de credito)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Menciona Párrafo Completo con Aviso de Privacidad';
                    html += '</th>';
                    html += '<th>';
                    html += 'Nombre de Tarjeta de Crédito';
                    html += '</th>';
                    html += '<th>';
                    html += 'Costo de Anualidad';
                    html += '</th>';
                    html += '<th>';
                    html += 'CAT';
                    html += '</th>';
                    html += '<th>';
                    html += 'Tasa de Interes ponderada';
                    html += '</th>';
                    html += '<th>';
                    html += 'Vigencia';
                    html += '</th>';
                    html += '<th>';
                    html += 'Nombre completo';
                    html += '</th>';
                    html += '<th>';
                    html += 'Domicilio (Calle, Num Exterior, Num Interior; CP, Del/Mpo, Estado, Colonia/Fracc)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Teléfonos (LADA, Tel Particular, Num Celular)';
                    html += '</th>';
                    html += '<th>';
                    html += '* CURP';
                    html += '</th>';
                    html += '<th>';
                    html += '* RFC';
                    html += '</th>';
                    html += '<th>';
                    html += '* Homoclave';
                    html += '</th>';
                    html += '<th>';
                    html += 'Solicita Autorización para grabar Audio';
                    html += '</th>';
                    html += '<th>';
                    html += '¿Es usted titular de alguna Tarjeta de Crédito vigente otorgada por algún Banco?';
                    html += '</th>';
                    html += '<th>';
                    html += 'R= Si *Ingresa los últimos cuatro digitos de su tarjeta de credito e Institución';
                    html += '</th>';
                    html += '<th>';
                    html += '¿Es titular de alguna Tarjeta de Credito Vigente otorgada por algun Comercio o Proveedor de Servicios (Tarjeta Departamental)? ';
                    html += '</th>';
                    html += '<th>';
                    html += 'R= Si Ingresa los últimos cuatro digitos de tu tarjeta de credito e Institución';
                    html += '</th>';
                    html += '<th>';
                    html += '¿Es titular y actualmente se encuentra pagando un crédito hipotecario con un banco en los últimos 2 años?';
                    html += '</th>';
                    html += '<th>';
                    html += 'R= Si Ingresa Banco';
                    html += '</th>';
                    html += '<th>';
                    html += '¿Ha adquirido un automóvil con algún Crédito Bancario en los últimos dos años?';
                    html += '</th>';
                    html += '<th>';
                    html += 'R= Si Ingresa Banco';
                    html += '</th>';
                    html += '<th>';
                    html += 'Solicita Autorización para dar Hit en Buró de Crédito';
                    html += '</th>';
                    html += '<th>';
                    html += 'Menciona Párrafo Completo de SOFOM';
                    html += '</th>';
                    html += '<th>';
                    html += '* SOLICITA Clave de Elector (Inicia con clave de Seccion en la parte frontal) SE DEBE DE MENCIONAR EN TODAS LAS LLAMADAS';
                    html += '</th>';
                    html += '<th>';
                    html += '* Confirma Tipo de Comprobante de Domicilio ';
                    html += '</th>';
                    html += '<th>';
                    html += 'Indica y Explica al cliente el Respuesta Final de su solicitud, de acuerdo al  resultado proporcionado por Eclipse';
                    html += '</th>';
                    html += '<th>';
                    html += 'Si el trámite esta declinado por Buró, indica leyenda de script y teléfono (en caso de que aplique)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Confirma - Refuerza Documentación Solicitada ';
                    html += '</th>';
                    html += '<th>';
                    html += 'Agenda cita en sucursal para recoger Tarjeta lo antes posible (Response)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Proporciona Número de Folio emitido por Eclipse';
                    html += '</th>';
                    html += '<th>';
                    html += 'Alta de banca electronica para mayor control de sus cuentas';
                    html += '</th>';
                    html += '<th>';
                    html += 'Despedida Institucional indica su Nombre y Número de Centro Autorizado)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Establece un trato cordial, amable formal y respetuoso  (muestra actitud de servicio)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Resuelve de forma clara y oportuna las consultas del cliente';
                    html += '</th>';
                    html += '<th>';
                    html += 'Conserva la calma e integridad ante situaciones difíciles';
                    html += '</th>';
                    html += '<th>';
                    html += 'Escucha activa (muestra atención a la información brindada por cliente) ';
                    html += '</th>';
                    html += '<th>';
                    html += 'Es claro y certero en la información que proporciona al cliente';
                    html += '</th>';
                    html += '<th>';
                    html += 'Demuestra conocimiento y manejo del producto';
                    html += '</th>';
                    html += '<th>';
                    html += 'Utiliza un vocabulario profesional, claro (dicción, sin groserías o maltrato  al cliente)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Intensidad y tono de voz';
                    html += '</th>';
                    html += '<th>';
                    html += 'Personaliza la llamada  mínimo 3 veces (por nombre o apellido)';
                    html += '</th>';
                    html += '<th>';
                    html += 'Utiliza adecuadamente el tiempo de espera / Utiliza el mute de forma adecuada';
                    html += '</th>';
                    html += '<th>';
                    html += 'Orden en la llamada, legales y apego a script';
                    html += '</th>';
                    html += '<th>';
                    html += 'Genera una falsa expectativa del producto ';
                    html += '</th>';
                    html += '<th>';
                    html += 'Maltrato al cliente';
                    html += '</th>';
                    html += '<th>';
                    html += 'Demeritan o incitan a la cancelación o mal uso de todo producto Citibanamex';
                    html += '</th>';
                    html += '<th>';
                    html += 'Interacción abandonada o cortada por AT';
                    html += '</th>';
                    html += '<th>';
                    html += 'Brinda información a terceros no autorizados';
                    html += '</th>';
                    html += '<th>';
                    html += 'Venta Dolosa';
                    html += '</th>';
                    html += '<th>';
                    html += 'Compromiso RVT';
                    html += '</th>';
                    html += '<th>';
                    html += 'Compromiso Validador';
                    html += '</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody class="tbody">';
                    var i;
                    for (i = 0; i < result.length; i++) {
                        html += '<tr>';
                        html += '<td>' + result[i].Campana + '</td>';
                        html += '<td>' + result[i].StatusTramite + '</td>';
                        html += '<td>' + result[i].Calibracion + '</td>';
                        html += '<td>' + result[i].NombreRVT + '</td>';
                        html += '<td>' + result[i].SuperRVT + '</td>';
                        html += '<td>' + result[i].NombreValidador + '</td>';
                        html += '<td>' + result[i].SuperVal + '</td>';
                        html += '<td>' + result[i].Centro + '</td>';
                        html += '<td>' + result[i].NombreAnalista + '</td>';
                        html += '<td>' + result[i].NombreCliente + '</td>';
                        html += '<td>' + formatDate(result[i].FechaVenta) + '</td>';
                        html += '<td>' + formatDate(result[i].FechaEva) + '</td>';
                        html += '<td>' + result[i].Telefonico + '</td>';
                        html += '<td>' + result[i].FolioECS + '</td>';
                        html += '<td>' + result[i].NivelS + '</td>';
                        html += '<td>' + result[i].audioc + '</td>';
                        html += '<td>' + result[i].audioe + '</td>';
                        html += '<td>' + result[i].audiov + '</td>';
                        html += '<td>' + result[i].Comentarios + '</td>';
                        html += '<td>' + result[i].CalificacionRVT + '</td>';
                        html += '<td>' + result[i].CalificacionVal + '</td>';
                        html += '<td>' + result[i].TotalLlamada + '</td>';
                        html += '<td>' + result[i].ErrorCriticoRVTECS + '</td>';
                        html += '<td>' + result[i].ErrorCriticoValECS + '</td>';
                        html += '<td>' + result[i].TipiECS + '</td>';
                        html += '<td>' + result[i].Pregunta1 + '</td>'
                        html += '<td>' + result[i].Pregunta2 + '</td>'
                        html += '<td>' + result[i].Pregunta3 + '</td>';
                        html += '<td>' + result[i].Pregunta4 + '</td>';
                        html += '<td>' + result[i].Pregunta5 + '</td>';
                        html += '<td>' + result[i].Pregunta6 + '</td>';
                        html += '<td>' + result[i].Pregunta7 + '</td>';
                        html += '<td>' + result[i].Pregunta8 + '</td>';
                        html += '<td>' + result[i].Pregunta9 + '</td>';
                        html += '<td>' + result[i].Pregunta10 + '</td>';
                        html += '<td>' + result[i].Pregunta11 + '</td>';
                        html += '<td>' + result[i].Pregunta12 + '</td>';
                        html += '<td>' + result[i].Pregunta13 + '</td>';
                        html += '<td>' + result[i].Pregunta14 + '</td>';
                        html += '<td>' + result[i].Pregunta15 + '</td>';
                        html += '<td>' + result[i].Pregunta16 + '</td>';
                        html += '<td>' + result[i].Pregunta17 + '</td>';
                        html += '<td>' + result[i].Pregunta18 + '</td>';
                        html += '<td>' + result[i].Pregunta19 + '</td>';
                        html += '<td>' + result[i].Pregunta20 + '</td>';
                        html += '<td>' + result[i].Pregunta21 + '</td>';
                        html += '<td>' + result[i].Pregunta22 + '</td>';
                        html += '<td>' + result[i].Pregunta23 + '</td>';
                        html += '<td>' + result[i].Pregunta24 + '</td>';
                        html += '<td>' + result[i].Pregunta25 + '</td>';
                        html += '<td>' + result[i].Pregunta26 + '</td>';
                        html += '<td>' + result[i].Pregunta27 + '</td>';
                        html += '<td>' + result[i].Pregunta28 + '</td>';
                        html += '<td>' + result[i].Pregunta29 + '</td>';
                        html += '<td>' + result[i].Pregunta30 + '</td>';
                        html += '<td>' + result[i].Pregunta31 + '</td>';
                        html += '<td>' + result[i].Pregunta32 + '</td>';
                        html += '<td>' + result[i].Pregunta33 + '</td>';
                        html += '<td>' + result[i].Pregunta34 + '</td>';
                        html += '<td>' + result[i].Pregunta35 + '</td>';
                        html += '<td>' + result[i].Pregunta36 + '</td>';
                        html += '<td>' + result[i].Pregunta37 + '</td>';
                        html += '<td>' + result[i].Pregunta38 + '</td>';
                        html += '<td>' + result[i].Pregunta39 + '</td>';
                        html += '<td>' + result[i].Pregunta40 + '</td>';
                        html += '<td>' + result[i].Pregunta41 + '</td>';
                        html += '<td>' + result[i].Pregunta42 + '</td>';
                        html += '<td>' + result[i].Pregunta43 + '</td>';
                        html += '<td>' + result[i].Pregunta44 + '</td>';
                        html += '<td>' + result[i].Pregunta45 + '</td>';
                        html += '<td>' + result[i].Pregunta46 + '</td>';
                        html += '<td>' + result[i].Pregunta47 + '</td>';
                        html += '<td>' + result[i].Pregunta48 + '</td>';
                        html += '<td>' + result[i].Pregunta49 + '</td>';
                        html += '<td>' + result[i].Pregunta50 + '</td>';
                        html += '<td>' + result[i].Pregunta51 + '</td>';
                        html += '<td>' + result[i].Pregunta52 + '</td>';
                        html += '<td>' + result[i].Pregunta53 + '</td>';
                        html += '<td>' + result[i].Pregunta54 + '</td>';
                        html += '<td>' + result[i].Pregunta55 + '</td>';
                        html += '<td>' + result[i].Pregunta56 + '</td>';
                        html += '<td>' + result[i].Pregunta57 + '</td>';
                        html += '<td>' + result[i].Pregunta58 + '</td>';
                        html += '<td>' + result[i].Pregunta59 + '</td>';
                        html += '<td>' + result[i].Pregunta60 + '</td>';
                        html += '<td>' + result[i].Pregunta61 + '</td>';
                        html += '<td>' + result[i].Pregunta62 + '</td>';
                        html += '<td>' + result[i].Pregunta63 + '</td>';
                        html += '<td>' + result[i].Pregunta64 + '</td>';
                        html += '<td>' + result[i].Pregunta65 + '</td>';
                        html += '<td>' + result[i].Pregunta66 + '</td>';
                        html += '<td>' + result[i].Pregunta67 + '</td>';
                        html += '<td>' + result[i].Pregunta68 + '</td>';
                        html += '<td>' + result[i].Pregunta69 + '</td>';
                        html += '<td>' + result[i].Pregunta70 + '</td>';
                        html += '<td>' + result[i].Pregunta71 + '</td>';
                        html += '<td>' + result[i].Pregunta72 + '</td>';
                        html += '<td>' + result[i].Pregunta73 + '</td>';
                        html += '<td>' + result[i].Pregunta74 + '</td>';
                        html += '<td>' + result[i].Pregunta75 + '</td>';
                        html += '<td>' + result[i].Pregunta76 + '</td>';
                        html += '<td>' + result[i].Pregunta77 + '</td>';
                        html += '<td>' + result[i].Pregunta78 + '</td>';
                        html += '<td>' + result[i].Pregunta79 + '</td>';
                        html += '<td>' + result[i].Pregunta80 + '</td>';
                        html += '<td>' + result[i].Pregunta81 + '</td>';
                        html += '<td>' + result[i].Pregunta82 + '</td>';
                        html += '<td>' + result[i].Pregunta83 + '</td>';
                        html += '<td>' + result[i].Pregunta84 + '</td>';
                        html += '<td>' + result[i].Pregunta85 + '</td>';
                        html += '<td>' + result[i].Pregunta86 + '</td>';
                        html += '<td>' + result[i].Pregunta87 + '</td>';
                        html += '<td>' + result[i].Pregunta88 + '</td>';
                        html += '<td>' + result[i].Pregunta89 + '</td>';
                        html += '<td>' + result[i].Pregunta90 + '</td>';
                        html += '<td>' + result[i].Pregunta91 + '</td>';
                        html += '<td>' + result[i].Pregunta92 + '</td>';
                        html += '<td>' + result[i].Pregunta93 + '</td>';
                        html += '<td>' + result[i].Pregunta94 + '</td>';
                        html += '<td>' + result[i].Pregunta95 + '</td>';
                        html += '<td>' + result[i].Pregunta96 + '</td>';
                        html += '<td>' + result[i].Pregunta97 + '</td>';
                        html += '<td>' + result[i].Pregunta98 + '</td>';
                        html += '<td>' + result[i].Pregunta99 + '</td>';
                        html += '<td>' + result[i].Pregunta100 + '</td>';
                        html += '<td>' + result[i].Pregunta101 + '</td>';
                        html += '<td>' + result[i].Pregunta102 + '</td>';
                        html += '<td>' + result[i].Pregunta103 + '</td>';
                        html += '<td>' + result[i].Pregunta104 + '</td>';
                        html += '<td>' + result[i].Pregunta105 + '</td>';
                        html += '<td>' + result[i].Pregunta106 + '</td>';
                        html += '<td>' + result[i].Pregunta107 + '</td>';
                        html += '<td>' + result[i].Pregunta108 + '</td>';
                        html += '<td>' + result[i].Pregunta109 + '</td>';
                        html += '<td>' + result[i].Pregunta110 + '</td>';
                        html += '<td>' + result[i].Pregunta111 + '</td>';
                        html += '<td>' + result[i].Pregunta112 + '</td>';
                        html += '<td>' + result[i].Pregunta113 + '</td>';
                        html += '<td>' + result[i].Pregunta114 + '</td>';
                        html += '<td>' + result[i].Pregunta115 + '</td>';
                        html += '<td>' + result[i].Pregunta116 + '</td>';
                        html += '<td>' + result[i].Pregunta117 + '</td>';
                        html += '<td>' + result[i].Pregunta118 + '</td>';
                        html += '<td>' + result[i].Pregunta119 + '</td>';
                        html += '<td>' + result[i].Pregunta120 + '</td>';
                        html += '<td>' + result[i].Pregunta121 + '</td>';
                        html += '<td>' + result[i].Pregunta122 + '</td>';
                        html += '<td>' + result[i].Pregunta123 + '</td>';
                        html += '<td>' + result[i].Pregunta124 + '</td>';
                        html += '<td>' + result[i].Pregunta125 + '</td>';
                        html += '<td>' + result[i].Pregunta126 + '</td>';
                        html += '<td>' + result[i].Pregunta127 + '</td>';
                        html += '<td>' + result[i].RvtCompromiso + '</td>';
                        html += '<td>' + result[i].ValidadorCompromiso + '</td>';
                        html += '</tr>';
                    }
                    html += '</tbody>';
                    html += '</table>';

                    $('#tabla').html(html);
                    $('#example').DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                            'excel', 'print'
                        ]
                    });
                }

                else if (campana == 1)
                {
                    html += '<tr>';
                    //html += '<th style="writing-mode: vertical-lr;transform:rotate(180deg);">';
                    html += '<th>';
                    html += 'SERIE';
                    html += '</th>';
                    html += '<th>';
                    html += 'FOLIO';
                    html += '</th>';
                    html += '<th>';
                    html += 'TELÉFONO';
                    html += '</th>';
                    html += '<th>';
                    html += 'FECHA VENTA';
                    html += '</th>';
                    html += '<th>';
                    html += 'FECHA EVALUACIÓN';
                    html += '</th>';
                    html += '<th>';
                    html += 'CAMPAÑA';
                    html += '</th>';
                    html += '<th>';
                    html += 'NOMBRE AUDITOR';
                    html += '</th>';
                    html += '<th>';
                    html += 'NOMBRE RVT';
                    html += '</th>';
                    html += '<th>';
                    html += 'TIPO LLAMADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'TIÍFICACIÓN RVT';
                    html += '</th>';
                    html += '<th>';
                    html += 'TIPIFICACIÓN CORRECTA';
                    html += '</th>';
                    html += '<th>';
                    html += '¿RVT TIPIFICO CORRECTAMENTE?';
                    html += '</th>';
                    html += '<th>';
                    html += 'CALIFICACIÓN VENTA';
                    html += '</th>';
                    html += '<th>';
                    html += ' ERROR CRÍTICO VENTA';
                    html += '</th>';
                    html += '<th>';
                    html += 'DESCRIPCIÓN LLAMADA RVT';
                    html += '</th>';
                    html += '<th>';
                    html += 'FEEDBACK RVT';
                    html += '</th>';
                    html += '<th>';
                    html += 'COMPROMISO RVT';
                    html += '</th>';

                    html += '<th>';
                    html += 'NOMBRE VALIDADOR';
                    html += '</th>';
                    html += '<th>';
                    html += 'CALIFICACIÓN VALIDACIÓN';
                    html += '</th>';
                    html += '<th>';
                    html += 'ERROR CRÍTICO VALIDACIÓN';
                    html += '</th>';
                    html += '<th>';
                    html += 'DESCRIPCIÓN LLAMADA VALIDADOR';
                    html += '</th>';
                    html += '<th>';
                    html += 'FEEDBACK VALIDADOR';
                    html += '</th>';
                    html += '<th>';
                    html += 'COMPROMISO VALIDADOR';
                    html += '</th>';

                    html += '<th>';
                    html += 'PRESENTACIÓNINSTITUCIONAL';
                    html += '</th>';
                    html += '<th>';
                    html += 'IDENTIFICA AL TITULAR';
                    html += '</th>';
                    html += '<th>';
                    html += 'MENCIONA MOTIVO DE LA LLAMADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'SONDEA QUE CLIENTE CUMPLA CON REQUISITOS';
                    html += '</th>';
                    html += '<th>';
                    html += 'PERFILA';
                    html += '</th>';
                    html += '<th>';
                    html += 'SONDEO AL CLIENTE';
                    html += '</th>';
                    html += '<th>';
                    html += 'MENCIONA CONDICIONES DE OFERTA';
                    html += '</th>';
                    html += '<th>';
                    html += 'MENCIONA PAGOS APROXIMADOS';
                    html += '</th>';
                    html += '<th>';
                    html += 'REALIZA CIERRE DE VENTA';
                    html += '</th>';
                    html += '<th>';
                    html += 'MANEJO DE OBJECIONES (POR LO MENOS 2)';
                    html += '</th>';
                    html += '<th>';
                    html += 'UTILIZA VENTAJAS Y BENEFICIOS';
                    html += '</th>';
                    html += '<th>';
                    html += 'CREA ESCENARIOS';
                    html += '</th>';
                    html += '<th>';
                    html += 'SUCURSAL';
                    html += '</th>';
                    html += '<th>';
                    html += 'INFORMA QUE SE TRANSFERIRA A VALIDACION / SE DESPIDE INSTITUCIONALMENTE';
                    html += '</th>';
                    html += '<th>';
                    html += 'RESPETO Y CORTESÍA';
                    html += '</th>';
                    html += '<th>';
                    html += 'EMPATÍA';
                    html += '</th>';
                    html += '<th>';
                    html += 'ASERTIVIDAD';
                    html += '</th>';
                    html += '<th>';
                    html += 'ESCUCHA ACTIVA';
                    html += '</th>';
                    html += '<th>';
                    html += 'INTENSIDAD Y TONO DE VOZ';
                    html += '</th>';
                    html += '<th>';
                    html += 'LENGUAJE';
                    html += '</th>';
                    html += '<th>';
                    html += 'PERSONALIZA LA LLAMADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'TIEMPOS DE ESPERA';
                    html += '</th>';
                    html += '<th>';
                    html += 'SEGURIDAD Y CONFIANZA';
                    html += '</th>';
                    html += '<th>';
                    html += 'MALTRATO AL CLIENTE';
                    html += '</th>';
                    html += '<th>';
                    html += 'GENERA FALSAS EXPECTATIVAS';
                    html += '</th>';
                    html += '<th>';
                    html += 'VENTA SIN COMPROMISO O FORZADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'INTERACCIÓN ABANDONADA O CORTADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'TIPIFICA REGISTRO DE FORMA INCORRECTA';
                    html += '</th>';
                    html += '<th>';
                    html += 'DEMERITA A LA EMPRESA O ÁREAS COLABORADORAS';
                    html += '</th>';
                    html += '<th>';
                    html += 'PROMUEVE LA CANCELACIÓN DE ALGÚN PRODUCTO DE CITIBANAMEX';
                    html += '</th>';
                    html += '<th>';
                    html += 'NO CONFIRMA LA ACEPTACION DEL PRODUCTO';
                    html += '</th>';
                    html += '<th>';
                    html += 'OMITE MENCIONAR LEYENDA DE LA LLAMADA SERÁ GRABADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'OMITE MENCIONAR ARTICULO 44';
                    html += '</th>';
                    html += '<th>';
                    html += 'OMITE MENCIONAR AVISO DE PRIVACIDAD';
                    html += '</th>';
                    html += '<th>';
                    html += 'MIENTE O TERGIVERSA INFORMACION';
                    html += '</th>';
                    html += '<th>';
                    html += 'BRINDA INFORMACIÓN A TERCEROS';
                    html += '</th>';
                    html += '<th>';
                    html += 'PRESENTACIÓN INSTITUCIONAL';
                    html += '</th>';
                    html += '<th>';
                    html += 'IDENTIFICA AL TITULAR';
                    html += '</th>';
                    html += '<th>';
                    html += 'CONFIRMA PRODUCTO QUE TRAMITARA';
                    html += '</th>';
                    html += '<th>';
                    html += 'CONFIRMA DATOS DE OFERTA';
                    html += '</th>';
                    html += '<th>';
                    html += 'CONFIRMA COMISIONES';
                    html += '</th>';
                    html += '<th>';
                    html += 'CONFIRMA LEYENDA DE ACEPTACION';
                    html += '</th>';
                    html += '<th>';
                    html += 'SUCURSAL';
                    html += '</th>';
                    html += '<th>';
                    html += 'SE DESPIDE INSTITUCIONALMENTE';
                    html += '</th>';
                    html += '<th>';
                    html += 'RESPETO Y CORTESÍA';
                    html += '</th>';
                    html += '<th>';
                    html += 'EMPATÍA';
                    html += '</th>';
                    html += '<th>';
                    html += 'ASERTIVIDAD';
                    html += '</th>';
                    html += '<th>';
                    html += 'ESCUCHA ACTIVA';
                    html += '</th>';
                    html += '<th>';
                    html += 'INTENSIDAD Y TONO DE VOZ';
                    html += '</th>';
                    html += '<th>';
                    html += 'LENGUAJE';
                    html += '</th>';
                    html += '<th>';
                    html += 'PERSONALIZA LA LLAMADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'TIEMPOS DE ESPERA';
                    html += '</th>';
                    html += '<th>';
                    html += 'SEGURIDAD Y CONFIANZA';
                    html += '</th>';
                    html += '<th>';
                    html += 'MALTRATO AL CLIENTE';
                    html += '</th>';
                    html += '<th>';
                    html += 'GENERA FALSAS EXPECTATIVAS';
                    html += '</th>';
                    html += '<th>';
                    html += 'VENTA SIN COMPROMISO O FORZADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'INTERACCIÓN ABANDONADA O CORTADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'TIPIFICA REGISTRO DE FORMA INCORRECTA';
                    html += '</th>';
                    html += '<th>';
                    html += 'DEMERITA A LA EMPRESA O ÁREAS COLABORADORAS';
                    html += '</th>';
                    html += '<th>';
                    html += 'PROMUEVE LA CANCELACIÓN DE ALGÚN PRODUCTO DE CITIBANAMEX';
                    html += '</th>';
                    html += '<th>';
                    html += 'OMITE MENCIONAR LEYENDA DE LA LLAMADA SERÁ GRABADA';
                    html += '</th>';
                    html += '<th>';
                    html += 'OMITE MENCIONAR AVISO DE PRIVACIDAD';
                    html += '</th>';
                    html += '<th>';
                    html += 'AUTENTICA AL CLIENTE';
                    html += '</th>';
                    html += '<th>';
                    html += 'MIENTE O TERGIVERSA INFORMACION';
                    html += '</th>';
                    html += '<th>';
                    html += 'BRINDA INFORMACIÓN A TERCEROS';
                    html += '</th>';

                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody class="tbody">';
                    var i;
                    for (i = 0; i < result.length; i++) {
                        html += '<tr>';
                        html += '<td>' + result[i].Serie + '</td>';
                        html += '<td>' + result[i].Folio + '</td>';
                        html += '<td>' + result[i].Telefono + '</td>';
                        html += '<td>' + formatDate(result[i].FechaVenta) + '</td>';
                        html += '<td>' + formatDate(result[i].FechaEva) + '</td>';
                        html += '<td>' + result[i].Campana + '</td>';
                        html += '<td>' + result[i].NombreAnalista + '</td>';
                        html += '<td>' + result[i].NombreRVT + '</td>';
                        html += '<td>' + result[i].TipoLlamada + '</td>';
                        html += '<td>' + result[i].TipificacionRVT + '</td>';
                        html += '<td>' + result[i].TipificacionCorrecta + '</td>';
                        html += '<td>' + result[i].RVTTipiCorrect + '</td>';
                        html += '<td>' + result[i].CalificacionRVT + '</td>';
                        html += '<td>' + result[i].ErrorCriticoRVT + '</td>';
                        html += '<td>' + result[i].DescripcionLlamadaRVT + '</td>';
                        html += '<td>' + result[i].FeedbakRVT + '</td>';
                        html += '<td>' + result[i].RvtCompromiso + '</td>';
                        html += '<td>' + result[i].NombreValidador + '</td>';
                        html += '<td>' + result[i].CalificacionVal + '</td>';
                        html += '<td>' + result[i].ErrorCriticoVal + '</td>';

                        html += '<td>' + result[i].DescripcionLlamadaValidador + '</td>';
                        html += '<td>' + result[i].FeedbakValidador + '</td>';
                        html += '<td>' + result[i].ValidadorCompromiso + '</td>';

                        html += '<td>' + result[i].Pregunta1 + '</td>'
                        html += '<td>' + result[i].Pregunta2 + '</td>'
                        html += '<td>' + result[i].Pregunta3 + '</td>';
                        html += '<td>' + result[i].Pregunta4 + '</td>';
                        html += '<td>' + result[i].Pregunta5 + '</td>';
                        html += '<td>' + result[i].Pregunta6 + '</td>';
                        html += '<td>' + result[i].Pregunta7 + '</td>';
                        html += '<td>' + result[i].Pregunta8 + '</td>';
                        html += '<td>' + result[i].Pregunta9 + '</td>';
                        html += '<td>' + result[i].Pregunta10 + '</td>';
                        html += '<td>' + result[i].Pregunta11 + '</td>';
                        html += '<td>' + result[i].Pregunta12 + '</td>';
                        html += '<td>' + result[i].Pregunta13 + '</td>';
                        html += '<td>' + result[i].Pregunta14 + '</td>';
                        html += '<td>' + result[i].Pregunta15 + '</td>';
                        html += '<td>' + result[i].Pregunta16 + '</td>';
                        html += '<td>' + result[i].Pregunta17 + '</td>';
                        html += '<td>' + result[i].Pregunta18 + '</td>';
                        html += '<td>' + result[i].Pregunta19 + '</td>';
                        html += '<td>' + result[i].Pregunta20 + '</td>';
                        html += '<td>' + result[i].Pregunta21 + '</td>';
                        html += '<td>' + result[i].Pregunta22 + '</td>';
                        html += '<td>' + result[i].Pregunta23 + '</td>';
                        html += '<td>' + result[i].Pregunta24 + '</td>';
                        html += '<td>' + result[i].Pregunta25 + '</td>';
                        html += '<td>' + result[i].Pregunta26 + '</td>';
                        html += '<td>' + result[i].Pregunta27 + '</td>';
                        html += '<td>' + result[i].Pregunta28 + '</td>';
                        html += '<td>' + result[i].Pregunta29 + '</td>';
                        html += '<td>' + result[i].Pregunta30 + '</td>';
                        html += '<td>' + result[i].Pregunta31 + '</td>';
                        html += '<td>' + result[i].Pregunta32 + '</td>';
                        html += '<td>' + result[i].Pregunta33 + '</td>';
                        html += '<td>' + result[i].Pregunta34 + '</td>';
                        html += '<td>' + result[i].Pregunta35 + '</td>';
                        html += '<td>' + result[i].Pregunta36 + '</td>';

                        html += '<td>' + result[i].Pregunta37 + '</td>';
                        html += '<td>' + result[i].Pregunta38 + '</td>';
                        html += '<td>' + result[i].Pregunta39 + '</td>';
                        html += '<td>' + result[i].Pregunta40 + '</td>';
                        html += '<td>' + result[i].Pregunta41 + '</td>';
                        html += '<td>' + result[i].Pregunta42 + '</td>';
                        html += '<td>' + result[i].Pregunta43 + '</td>';
                        html += '<td>' + result[i].Pregunta44 + '</td>';
                        html += '<td>' + result[i].Pregunta45 + '</td>';
                        html += '<td>' + result[i].Pregunta46 + '</td>';
                        html += '<td>' + result[i].Pregunta47 + '</td>';
                        html += '<td>' + result[i].Pregunta48 + '</td>';
                        html += '<td>' + result[i].Pregunta49 + '</td>';
                        html += '<td>' + result[i].Pregunta50 + '</td>';
                        html += '<td>' + result[i].Pregunta51 + '</td>';
                        html += '<td>' + result[i].Pregunta52 + '</td>';
                        html += '<td>' + result[i].Pregunta53 + '</td>';
                        html += '<td>' + result[i].Pregunta54 + '</td>';
                        html += '<td>' + result[i].Pregunta55 + '</td>';
                        html += '<td>' + result[i].Pregunta56 + '</td>';
                        html += '<td>' + result[i].Pregunta57 + '</td>';
                        html += '<td>' + result[i].Pregunta58 + '</td>';
                        html += '<td>' + result[i].Pregunta59 + '</td>';
                        html += '<td>' + result[i].Pregunta60 + '</td>';
                        html += '<td>' + result[i].Pregunta61 + '</td>';
                        html += '<td>' + result[i].Pregunta62 + '</td>';
                        html += '<td>' + result[i].Pregunta63 + '</td>';
                        html += '<td>' + result[i].Pregunta64 + '</td>';
                        html += '<td>' + result[i].Pregunta65 + '</td>';

                        html += '</tr>';
                    }

                    html += '</tbody>';
                    html += '</table>';

                    $('#tabla').html(html);

                    $('#example').DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                            'excel', 'print'
                        ]
                    });
                }
            }
        };
        xml.open("POST", url, true);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(JSON.stringify(json));
    } else {
        alertify.error("Ingresar al menos un criterio para generar el reporte");
    }
}

//Funcion para limpiar campos del reporte de Rondines
function CancelarLayoutCalidad() {

    document.getElementById('Campana').value = '0';
    document.getElementById('FechaInicio').value = '';
    document.getElementById('FechaFin').value = '';
    document.getElementById('tabla').innerHTML = "";
}

//Funcion para generar calificacion del RVT
//function CalificacionRVT() {
//    var sum = 0;
//    var x = document.getElementsByClassName('tbody');

//    for (j = 0; j < x.length; j++) {
//        let y = x[j].querySelectorAll('input[type="radio"]:checked');

//        for (z = 0; z < y.length - 1; z++) {
//            console.log(y[z].value);
//            sum += +(y[z].value);
//        }
//    }
//    document.getElementById('CalficacionRVT').value = sum;
//    document.getElementById('BuscaRFC').focus();
//}


//Funcion para Sumar la calidicacion del RVT
//function SumaRVT(calificacion, r) {

//    if (document.getElementById('TotalLlamada').value != 0) {
//        //console.log(document.getElementById('CumplimientoRVT').value);

//        if (suma != r) {
//            var cal = document.getElementById('CalificacionRVT').value;
//            var calF = document.getElementById('CalificacionRVTF').value;
//            var calFinal = parseFloat(calF) + parseFloat(calificacion);
//            if (parseFloat(calFinal) > 100) {
//                document.getElementById('CalificacionRVT').value = 100;
//                document.getElementById('CalificacionRVTF').value = 100;
//            } else {
//                document.getElementById('CalificacionRVT').value = Math.round(calFinal);
//                document.getElementById('CalificacionRVTF').value = parseFloat(calFinal);
//                //PromedioGralRVT();
//                suma = r;
//            }
//        }
//    }
//}

////Funcion para Sumar la calidicacion del Validador
//function SumaVal(calificacion, r) {

//    if (document.getElementById('CalificacionVal').value != 0) {
//        if (suma != r) {
//            var cal = document.getElementById('CalificacionVal').value;
//            var calF = document.getElementById('CalificacionValF').value;
//            var calFinal = parseFloat(calF) + parseFloat(calificacion);
//            if (parseFloat(calFinal) > 100) {
//                document.getElementById('CalificacionVal').value = 100;
//                document.getElementById('CalificacionValF').value = 100;
//            } else {
//                document.getElementById('CalificacionVal').value = Math.round(calFinal);
//                document.getElementById('CalificacionValF').value = parseFloat(calFinal);
//                //PromedioGralRVT();
//                suma = r;
//            }
//        }
//    }
//}

//Funcion que carga los Super Val
//function CargarSuperVal() {
//    var xml = new XMLHttpRequest();
//    var url = hostInit + "/MonitoreoCalidad/CargarSuper";

//    xml.onreadystatechange = function () {
//        if (this.readyState == 4 && this.status == 200) {
//            var result = JSON.parse(this.responseText);
//            var opt = '<option value="0" selected>Seleccione</option>'
//            for (var i = 0; i < result.length; i++) {
//                opt += '<option value="' + result[i].id_Empleado + '">' + result[i].Nombre_1 + '</option>';
//            }
//            document.getElementById('Id_SupervisorVal').innerHTML = opt;
//        }
//    };
//    xml.open("GET", url, true);
//    xml.send();
//}

//Función que muestra o esconde el Tab de validación dependiendo el tipo de llamada ECS
//function ValidarTipoLlamadaECS() {
//    if (document.getElementById('statusTramite').value == "Venta Declinada"
//        || document.getElementById('statusTramite').value == "Venta Precreada"
//        || document.getElementById('statusTramite').value == "Sin status") {

//        document.getElementById('NavValidacion').hidden = false;
//    }
//    else
//    {
//        document.getElementById('NavValidacion').hidden = true;
//    }
//}

//Funcion que carga los Validadores
//function CargarValidadores() {
//    var xml = new XMLHttpRequest();
//    var url = hostInit + "/MonitoreoCalidad/CargarVal";

//    xml.onreadystatechange = function () {
//        if (this.readyState == 4 && this.status == 200) {
//            var result = JSON.parse(this.responseText);
//            var opt = '<option value="0" selected>Seleccione</option>'
//            for (var i = 0; i < result.length; i++) {
//                opt += '<option value="' + result[i].id_Empleado + '">' + result[i].Nombre_1 + '</option>';
//            }
//            document.getElementById('NombVali').innerHTML = opt;
//        }
//    };
//    xml.open("GET", url, true);
//    xml.send();
//}

//Funcion cumplimiento de Error Critico RVT
//var ecpRVT = 0;
//var ecpRVTF = 0;
//function CumpleErrorCriticoRVT(error) {
//    //console.log(error);
//    //console.log(ecpRVT);
//    if (error == 1) {
//        ecpRVT = document.getElementById('CalificacionRVT').value;
//        ecpRVTF = document.getElementById('CalificacionRVTF').value;
//        if (document.getElementById('CalificacionRVT').value != 0) {
//            document.getElementById('CalificacionRVT').value = 0;
//            document.getElementById('CalificacionRVTF').value = 0;
//            document.getElementById('ErrorCriticoVenta').value = '1';
//            //PromedioGralRVT();
//        }
//    } else {
//        document.getElementById('CalificacionRVT').value = ecpRVT;
//        document.getElementById('CalificacionRVTF').value = parseFloat(ecpRVTF);
//        document.getElementById('ErrorCriticoVenta').value = '2';
//        //PromedioGralRVT();
//    }
//}

////Funcion cumplimiento de Error Critico RVT ECS

//function CumpleErrorCRVTECS(error, variable) {
//    //var ecpRVT = 0;
//    //var ecpRVTF = 0;

//    if (error == 1)
//    {
//        ecpRVT = document.getElementById('TotalVenta').value;
//        ecpRVTF = document.getElementById('TotalVenta2').value;
//        //var op = $('select[id="CumplimientoRVTECS"] option:selected'); 
//        console.log(variable);
//        if (document.getElementById('TotalVenta').value != 0)
//        {
//            document.getElementById('TotalVenta').value = 0;
//            document.getElementById('TotalVenta2').value = 0;
//            document.getElementById('ErrorCriticoECS').value = variable;
//            PromedioGralRVT();
//        }
//    }
//    else
//    {
//        document.getElementById('TotalVenta').value = ecpRVT;
//        document.getElementById('TotalVenta2').value = parseFloat(ecpRVTF);
//        document.getElementById('ErrorCriticoECS').value = '';
//        PromedioGralRVT();
//    }
//}

//function CumpleErrorCRVTECS2(error, variable) {
//    //var ecpRVT = 0;
//    //var ecpRVTF = 0;
//    if (error == 1) {
//        ecpRVT = document.getElementById('TotalVenta').value;
//        ecpRVTF = document.getElementById('TotalVenta2').value;
//        var op = $('select[id="CumplimientoRVTECS"] option:selected');
//        console.log(variable);

//        if (document.getElementById('TotalVenta').value != 0) {
//            document.getElementById('TotalVenta').value = 0;
//            document.getElementById('TotalVenta2').value = 0;
//            PromedioGralRVT();
//        }
//    } else {
//        document.getElementById('TotalVenta').value = ecpRVT;
//        document.getElementById('TotalVenta2').value = parseFloat(ecpRVTF);
//        PromedioGralRVT();
//    }
//}

////Funcion cumplimiento de Error Critico Validador
//var ecpVal = 0;
//var ecpValF = 0;
//function CumpleErrorCriticoVal(error) {

//    //console.log(error);
//    //console.log(ecpRVT);
//    if (error == 1) {
//        ecpVal = document.getElementById('CalificacionVal').value;
//        ecpValF = document.getElementById('CalificacionValF').value;
//        if (document.getElementById('CalificacionVal').value != 0) {
//            document.getElementById('CalificacionVal').value = 0;
//            document.getElementById('CalificacionValF').value = 0;
//            document.getElementById('ErrorCriticoVal').value = '1';
//            //PromedioGralRVT();
//        }
//    } else {
//        document.getElementById('CalificacionVal').value = ecpVal;
//        document.getElementById('CalificacionValF').value = parseFloat(ecpValF);
//        document.getElementById('ErrorCriticoVal').value = '2';
//        //PromedioGralRVT();
//    }
//}

////Funcion cumplimiento de Error Critico Val ECS
//function CumpleErrorCriticoValECS(error, varibale) {
//    //var ecpValTECS = 0;
//    //var ecpValFECS = 0;
//    //console.log(error);
//    //console.log(ecpRVT);
//    if (error == 1) {
//        ecpValTECS = document.getElementById('TotalVal').value;
//        ecpValFECS = document.getElementById('TotalVal2').value;
//        if (document.getElementById('TotalVal').value != 0) {
//            document.getElementById('TotalVal').value = 0;
//            document.getElementById('TotalVal2').value = 0;
//            document.getElementById('ErrorCriticoECSV').value = varibale;
//            PromedioGralRVT();
//        }
//    } else {
//        document.getElementById('TotalVal').value = ecpValTECS;
//        document.getElementById('TotalVal2').value = parseFloat(ecpValFECS);
//        document.getElementById('ErrorCriticoECSV').value = '';
//        PromedioGralRVT();
//    }
//}

//Funcion para Sumar la calidicacion del RVT
//calificacion = ponderacion y r = idMonitoreo como respuesta
//function SumaRVTECS(calificacion, r) {
//    //let y = document.querySelectorAll('select[id="CumplimientoRVTECS"]')
//    //var op = $('select[id="CumplimientoRVTECS"] option:selected');
//    if (document.getElementById('estructuraVta').value == 0) {
//        if (suma != r) {
//            if (va == "1" || va == "N/A") {
//            }
//            else {
//                var cal = document.getElementById('estructuraVta').value;
//                var calFinal = parseFloat(cal) + parseFloat(calificacion);
//                if (parseFloat(calFinal) > 100) {
//                    document.getElementById('estructuraVta').value = 100;
//                }
//                else {
//                    document.getElementById('estructuraVta').value = Math.round(calFinal);
//                    PromedioGralRVT();
//                    suma = r;
//                }
//            }
//        }
//    }
//}

//Funcion para Sumar la calidicacion del Validador ECS
//calificacion = ponderacion y r = idMonitoreo como respuesta
//function SumaValECS(calificacion, r) {
//    if (document.getElementById('TotalVal').value != 0) {
//        if (suma != r) {
//            if (va2 == "1" || va2 == "N/A") {

//            } else {
//                var cal = document.getElementById('TotalVal').value;
//                var calF = document.getElementById('TotalVal2').value;
//                var calFinal = parseFloat(calF) + parseFloat(calificacion);
//                if (parseFloat(calFinal) > 100) {
//                    document.getElementById('TotalVal').value = 100;
//                    document.getElementById('TotalVal2').value = 100;
//                } else {
//                    document.getElementById('TotalVal').value = Math.round(calFinal);
//                    document.getElementById('TotalVal2').value = parseFloat(calFinal);
//                    PromedioGralRVT();
//                    suma = r;
//                }
//            }
//        }
//    }
//}

//Funcion para Restar la calificacion del RVT 
//function RestaRVT(calificacion, r) {

//    if (document.getElementById('CalificacionRVT').value != 0) {
//        if (resta != r) {
//            var cal = document.getElementById('CalificacionRVT').value;
//            var calF = document.getElementById('CalificacionRVTF').value;
//            var calFinal = parseFloat(calF) - parseFloat(calificacion);
//            document.getElementById('CalificacionRVT').value = Math.round(calFinal);
//            document.getElementById('CalificacionRVTF').value = parseFloat(calFinal);
//            // PromedioGralRVT();
//            resta = r;
//        }
//    }
//}

//Funcion para insertar en tbl_Monitoreo




//function CumpleErrorCriticoValECS2(error, varibale) {
//    //var ecpValTECS = 0;
//    //var ecpValFECS = 0;
//    //console.log(error);
//    //console.log(ecpRVT);
//    if (error == 1) {
//        ecpValTECS = document.getElementById('TotalVal').value;
//        ecpValFECS = document.getElementById('TotalVal2').value;
//        if (document.getElementById('TotalVal').value != 0) {
//            document.getElementById('TotalVal').value = 0;
//            document.getElementById('TotalVal2').value = 0;
//            document.getElementById('ErrorCriticoECSV').value = varibale;
//            PromedioGralRVT();
//        }
//    } else {
//        document.getElementById('TotalVal').value = ecpValTECS;
//        document.getElementById('TotalVal2').value = parseFloat(ecpValFECS);
//        document.getElementById('ErrorCriticoECSV').value = '';
//        PromedioGralRVT();
//    }
//}

//Funcion para Sumar la calificacion del RVT en Estilo
//function SumaEstiloRVT(calificacion) {
//    resta = 0;
//    if (document.getElementById('CalificacionEstiloRVT').value != 0) {
//        var cal = document.getElementById('CalificacionEstiloRVT').value;
//        var calFinal = parseInt(cal) + parseInt(calificacion);
//        if (calFinal > 100) {
//            document.getElementById('CalificacionEstiloRVT').value = 100;
//        } else {
//            document.getElementById('CalificacionEstiloRVT').value = calFinal;
//            // PromedioGralRVT();
//        }
//    }
//}

//Funcion para Restar la calidicacion del RVT Estilo
//function RestaEstiloRVT(calificacion, r) {
//    if (document.getElementById('CalificacionEstiloRVT').value != 0) {
//        if (resta != r) {
//            var cal = document.getElementById('CalificacionEstiloRVT').value;
//            var calFinal = parseInt(cal) - parseInt(calificacion);
//            document.getElementById('CalificacionEstiloRVT').value = calFinal;
//            // PromedioGralRVT();
//            resta = r;
//        }
//    }
//}

//Funcion cumplimiento de Error Critico Estilo
//function CumpleErrorCriticoEstiloRVT(error) {
//    if (error == 0) {
//        ecpRVT = document.getElementById('CalificacionEstiloRVT').value;
//        if (document.getElementById('CalificacionEstiloRVT').value != 0) {
//            document.getElementById('CalificacionEstiloRVT').value = 0;
//            // PromedioGralRVT();
//        }
//    } else {
//        document.getElementById('CalificacionEstiloRVT').value = ecpRVT;
//        // PromedioGralRVT();
//    }
//}