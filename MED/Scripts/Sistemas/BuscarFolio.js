function CargarFolio() {
    document.getElementById("divFolio").innerHTML = "";
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Sistemas/CargarFolio";
    var json = {
        folio: document.getElementById('Folio').value
    };
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            if (myArr != "") {


                let html = document.getElementById("divFolio").innerHTML;

                html += '<table class=" table table:hover table-striped text-center" style="margin-left:10px; margin-top:10px;">';
                html += '<thead style=" color:steelblue;font-style:italic; font:bold;text-align:center; class="tblHead">';
                html += '<tr >';
                html += '<td>FOLIO ECS+</td>';
                html += '<td>TELÉFONO</td>';
                html += '<td>FECHA VENTA</td>';
                html += '<td>FECHA PROCESO</td>';
                html += '<td>CAMPAÑA</td>';
                html += '<td>PRODUCTO</td>';
               
                html += '<td>SITE</td>';
               
                html += '</tr>';
                html += '</thead>';
                html += '<tbody>';

                for (var i = 0; i < myArr.length; i++) {
                    html += '<tr>';
                    html += '<td>' + myArr[i].FOLIO + '</td>';
                    html += '<td>' + myArr[i].TELEFONO + '</td>';
                    html += '<td>' + myArr[i].F_VENTA + '</td>';
                    html += '<td>' + myArr[i].F_PROCESOS + '</td>';
                    html += '<td>' + myArr[i].CAMPAÑA + '</td>';
                    html += '<td>' + myArr[i].PRODUCTO + '</td>';
                  
                    html += '<td>' + myArr[i].SITE + '</td>';
                 
                    html += '</tr>';
                }
                html += '</tbody>';
                html += '</table>';
                document.getElementById('divFolio').innerHTML = html;

            } else {
                document.getElementById("divFolio").innerHTML = "";
                alertify.warning("No hay coincidencia");
            }
        } else if (this.status == 500) {
            alertify.warning("¡Error", "no se puede conectar a la base de datos!");
        }
    };
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(json));
}
