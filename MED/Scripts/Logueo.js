//var hostInit = "/IntranetMED";
var hostInit = "";


//variable para contar numero de intentos para ingresar
//var cont = 0;

//Se le asigna un evento al input del pass
function initLogueo() {
    var p = document.getElementById("pass");
    p.onkeypress = function (evt) {
        if (evt.key === "Enter" || evt.keyIdentifier === "Enter") {
            iniciarSesion();
        }
    }
}

//Función para Iniciar sesion
function iniciarSesion() {
    var usuario = document.getElementById("username").value;
    var pass = document.getElementById("pass").value;
    if (usuario === "") {
        document.getElementById("errorUserName").innerHTML = "Ingrese usuario por favor";
        document.getElementById("username").focus();
        return;
    }
    if (pass === "") {
        document.getElementById("errorPassword").innerHTML = "Ingrese su contraseña por favor";
        document.getElementById("pass").focus();
        return;
    }
    var json = {
        usuario: usuario,
        pass: pass
    };
    var xml = new XMLHttpRequest();
    var url = hostInit + "/Logueo/Logueo";
    xml.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.opcion == 1) {
                //cont++;
                alertify.alert('Aviso', 'Usuario o contraseña incorrectos');
                document.getElementById("username").value = "";
                document.getElementById("pass").value = "";
                document.getElementById("username").focus();
                 return;
            }
            else if (response.opcion == 2) {
                alertify.alert("Es necesario cambiar su contraseña");
                document.getElementById("username").disabled = true;
                document.getElementById("pass").disabled = true;
                document.getElementById("ingresar").style.display = 'none';
                document.getElementById("labeluser").style.display = 'none';
                document.getElementById("labelpass").style.display = 'none';
                document.getElementById("username1").value = usuario;
                document.getElementById("old_pass").value = pass;
                //document.getElementById("bloqueo").innerHTML = "Es necesario cambiar su contraseña.";
                document.getElementById("actualizarPass").style.display = 'block';
                return;
            }
            else if (response.opcion == 4) {
                document.getElementById("username").style.display = 'none';
                document.getElementById("pass").style.display = 'none';
                document.getElementById("labeluser").style.display = 'none';
                document.getElementById("labelpass").style.display = 'none';
                document.getElementById("ingresar").style.display = 'none';
                document.getElementById('iconuser').style.display = "none";
                document.getElementById('iconpass').style.display = "none";
                document.getElementById("bloqueo").innerHTML = "Su cuenta esta en estado inactivo, por favor comunicarse con el administrador.";
            }
            else {
                alertify.confirm('Mensaje', 'Usted es el empleado: ' + response.Nombre1 + " " + response.Nombre2 + " " + response.APaterno + " " + response.AMaterno, function () {
                document.getElementById('iniciarS').style.display = 'none';
                document.getElementById('spanHeader').style.display = 'block';
                document.getElementById('mySidenav').style.display = 'block';
                document.getElementById('nomUsuario').style.display = 'block';
                //document.getElementById('working').style.display = 'block';
                document.getElementById('btnCerrarS').style.display = 'block';
                sessionStorage.setItem('usuario', usuario);
                sessionStorage.setItem('puesto', response.id_puesto);
                sessionStorage.setItem('nombreU', response.Nombre1 + " " + response.Nombre2 + " " + response.APaterno + " " + response.AMaterno);
                document.getElementById('nomUsuario').innerHTML = "Bienvenido: " + sessionStorage.getItem('usuario') + "-" + sessionStorage.getItem('nombreU');

                    //USUARIO DESARROLLADOR ADMINISTRADOR
                    if (sessionStorage.getItem('usuario') == 'ARM') {
                        console.log("DESARROLLADOR ADMIN");
                        /*document.getElementById('principal').hidden = false;*/
                        document.getElementById('OptMenu_RH').hidden = false;
                        document.getElementById('OptMenu_Capa').hidden = false;
                        document.getElementById('OptMenu_Cursos').hidden = false;
                        document.getElementById('OptMenu_ST').hidden = false;
                        document.getElementById('OptMenu_Ope').hidden = false;
                        document.getElementById('OptMenu_SG').hidden = false;
                        document.getElementById('OptMenu_Enc').hidden = false;
                        document.getElementById('OptMenuPass').hidden = false;
                        document.getElementById('MenuCalidad').hidden = false;
                        document.getElementById('OptMenuFolo').hidden = false;
                        document.getElementById('OptMenu').hidden = false;
                        //document.getElementById("ULSopo").children[0].style.display = "none";
                    }

                    //USUARIO DESARROLLADOR PRUEBAS (ADRIANA)
                    if (sessionStorage.getItem('usuario') == 53602 ) {
                        console.log("PRUEBAS");
                        document.getElementById('OptMenu_RH').hidden = false;
                        document.getElementById('OptMenu_Capa').hidden = false;
                        document.getElementById('OptMenu_Cursos').hidden = false;
                        document.getElementById('OptMenu_ST').hidden = false;
                        document.getElementById('OptMenu_Ope').hidden = false;
                        document.getElementById('OptMenu_SG').hidden = false;
                        document.getElementById('OptMenu_Enc').hidden = false;
                        document.getElementById('OptMenuPass').hidden = false;
                        document.getElementById('MenuCalidad').hidden = false;
                        document.getElementById('OptMenuFolo').hidden = false;
                        document.getElementById('OptMenu').hidden = false;
                        //document.getElementById("ULSopo").children[0].style.display = "none";
                    }

                    //USUARIOS CAPACITACIÓN
                    if (sessionStorage.getItem('usuario') == 52258 || sessionStorage.getItem('usuario') == 56869) {
                        console.log("CAPACITACION");
                        document.getElementById('OptMenu_RH').hidden = true;
                        document.getElementById('OptMenu_Capa').hidden = false;
                        document.getElementById('OptMenu_Cursos').hidden = false;
                        document.getElementById('OptMenu_ST').hidden = true;
                        document.getElementById('OptMenu_Ope').hidden = true;
                        document.getElementById('OptMenu_SG').hidden = true;
                        document.getElementById('OptMenu_Enc').hidden = true;
                        document.getElementById('OptMenuPass').hidden = true;
                        document.getElementById('MenuCalidad').hidden = true;
                        document.getElementById('OptMenuFolo').hidden = true;
                        document.getElementById('OptMenu').hidden = false;
                    }

                    //USUARIOS CALIDAD
                    if (sessionStorage.getItem('usuario') == 7068 || sessionStorage.getItem('puesto') == 34) {
                        console.log("CALIDAD");
                        document.getElementById('OptMenu_RH').hidden = true;
                        document.getElementById('OptMenu_Capa').hidden = true;
                        document.getElementById('OptMenu_Cursos').hidden = true;
                        document.getElementById('OptMenu_ST').hidden = true;
                        document.getElementById('OptMenu_Ope').hidden = true;
                        document.getElementById('OptMenu_SG').hidden = true;
                        document.getElementById('OptMenu_Enc').hidden = true;
                        document.getElementById('OptMenuPass').hidden = true;
                        document.getElementById('MenuCalidad').hidden = false;
                        document.getElementById('OptMenuFolo').hidden = true;
                        document.getElementById('OptMenu').hidden = false;
                    }

                    //USUARIO CAPITAL HUMANO ADMINISTRADOR
                    if (sessionStorage.getItem('usuario') == 2180) {
                        console.log("DESARROLLADOR ADMIN");
                        document.getElementById('OptMenu_RH').hidden = false;
                        document.getElementById('OptMenu_Capa').hidden = false;
                        document.getElementById('OptMenu_Cursos').hidden = false;
                        document.getElementById('OptMenu_ST').hidden = true;
                        document.getElementById('OptMenu_Ope').hidden = false;
                        document.getElementById('OptMenu_SG').hidden = false;
                        document.getElementById('OptMenu_Enc').hidden = false;
                        document.getElementById('OptMenuPass').hidden = true;
                        document.getElementById('MenuCalidad').hidden = false;
                        document.getElementById('OptMenuFolo').hidden = true;
                        document.getElementById('OptMenu').hidden = false;
                        //document.getElementById("ULSopo").children[0].style.display = "none";
                    }

                    //PUESTO CANDIDATO
                    if (sessionStorage.getItem('puesto') == 33) {
                        console.log("Entro en puesto 33");
                        document.getElementById('OptMenu_RH').hidden = true;
                        document.getElementById('OptMenu_Capa').hidden = true;
                        document.getElementById('OptMenu_ST').hidden = true;
                        document.getElementById('OptMenu_Ope').hidden = true;
                        document.getElementById('OptMenu_SG').hidden = true;
                        document.getElementById('OptMenu_Enc').hidden = true;
                        document.getElementById("UlCursos").children[1].style.display = "none";
                        document.getElementById("UlCursos").children[2].style.display = "none";
                        document.getElementById("UlCursos").children[3].style.display = "none";
                        document.getElementById('MenuCalidad').hidden = true;
                        document.getElementById('OptMenuFolo').hidden = true;
                    }

                    //PUESTO RVT y VALIDADOR
                    if (sessionStorage.getItem('puesto') == 25 || sessionStorage.getItem('puesto') == 28) {
                        console.log("Entro en puesto 25");
                        document.getElementById('OptMenu_RH').hidden = true;
                        document.getElementById('OptMenu_Capa').hidden = false;
                        document.getElementById('OptMenu_ST').hidden = true;
                        document.getElementById('OptMenu_Ope').hidden = true;
                        document.getElementById('OptMenu_SG').hidden = true;
                        document.getElementById('OptMenu_Enc').hidden = false;
                        document.getElementById('OptMenuFolo').hidden = true;
                        document.getElementById('MenuCalidad').hidden = true;
                        document.getElementById("UlCalidad").children[0].style.display = "none";
                        document.getElementById("UlCalidad").children[1].style.display = "none";
                        document.getElementById("UlCalidad").children[2].style.display = "none";
                        document.getElementById("UlCursos").children[1].style.display = "none";
                        document.getElementById("UlCursos").children[2].style.display = "none";
                        document.getElementById("UlCursos").children[3].style.display = "none";
                        document.getElementById("UlCursos").children[4].style.display = "none";
                        document.getElementById("UlCursos").children[5].style.display = "none";
                        document.getElementById("UlEncuestas").children[0].style.display = "none";
                        document.getElementById("UlEncuestas").children[1].style.display = "none";
                        document.getElementById("UlEncuestas").children[2].style.display = "none";
                        document.getElementById("UlEncuestas").children[3].style.display = "none";
                    }

                    document.getElementById('OptMenu_Enc').hidden = true;
                    document.getElementById("UlEncuestas").children[0].style.display = "none";
                    document.getElementById("UlEncuestas").children[1].style.display = "none";
                    document.getElementById("UlEncuestas").children[2].style.display = "none";
                    document.getElementById("UlEncuestas").children[3].style.display = "none";
                },
                    function () {
                        cerrarSesion();
                        location.href = hostInit + "/Logueo/Login";
                    }
                );
        }
    };
    xml.open('POST', url, true);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(json));
}



//Funcion que revisa si existe session iniciada 
function Session() {
    if (sessionStorage.getItem('usuario') != null) {
        document.getElementById('spanHeader').style.display = 'block';
        document.getElementById('mySidenav').style.display = 'block';
        document.getElementById('nomUsuario').style.display = 'block';
        //document.getElementById('working').style.display = 'block';
        document.getElementById('btnCerrarS').style.display = 'block';
        document.getElementById('nomUsuario').innerHTML = "Bienvenido: " + sessionStorage.getItem('usuario') + "-" + sessionStorage.getItem('nombreU');


        //USUARIO DESARROLLADOR ADMINISTRADOR
        if (sessionStorage.getItem('usuario') == 60965 || sessionStorage.getItem('usuario') == 62271) {
            console.log("DESARROLLADOR ADMIN");
            document.getElementById('OptMenu_RH').hidden = false;
            document.getElementById('OptMenu_Capa').hidden = false;
            document.getElementById('OptMenu_Cursos').hidden = false;
            document.getElementById('OptMenu_ST').hidden = false;
            document.getElementById('OptMenu_Ope').hidden = false;
            document.getElementById('OptMenu_SG').hidden = false;
            document.getElementById('OptMenu_Enc').hidden = false;
            document.getElementById('OptMenuPass').hidden = false;
            document.getElementById('MenuCalidad').hidden = false;
            document.getElementById('OptMenuFolo').hidden = false;
            document.getElementById('OptMenu').hidden = false;
            //document.getElementById("ULSopo").children[0].style.display = "none";
        }

        //USUARIO DESARROLLADOR PRUEBAS (ADRIANA)
        if (sessionStorage.getItem('usuario') == 53602 || sessionStorage.getItem('usuario') == 999999) {
            console.log("PRUEBAS");
            document.getElementById('OptMenu_RH').hidden = false;
            document.getElementById('OptMenu_Capa').hidden = false;
            document.getElementById('OptMenu_Cursos').hidden = false;
            document.getElementById('OptMenu_ST').hidden = false;
            document.getElementById('OptMenu_Ope').hidden = false;
            document.getElementById('OptMenu_SG').hidden = false;
            document.getElementById('OptMenu_Enc').hidden = false;
            document.getElementById('OptMenuPass').hidden = false;
            document.getElementById('MenuCalidad').hidden = false;
            document.getElementById('OptMenuFolo').hidden = false;
            document.getElementById('OptMenu').hidden = false;
            //document.getElementById("ULSopo").children[0].style.display = "none";
        }

        //USUARIO CAPITAL HUMANO ADMINISTRADOR
        if (sessionStorage.getItem('usuario') == 2180) {
            console.log("DESARROLLADOR ADMIN");
            document.getElementById('OptMenu_RH').hidden = false;
            document.getElementById('OptMenu_Capa').hidden = false;
            document.getElementById('OptMenu_Cursos').hidden = false;
            document.getElementById('OptMenu_ST').hidden = true;
            document.getElementById('OptMenu_Ope').hidden = false;
            document.getElementById('OptMenu_SG').hidden = false;
            document.getElementById('OptMenu_Enc').hidden = false;
            document.getElementById('OptMenuPass').hidden = true;
            document.getElementById('MenuCalidad').hidden = false;
            document.getElementById('OptMenuFolo').hidden = true;
            document.getElementById('OptMenu').hidden = false;
            //document.getElementById("ULSopo").children[0].style.display = "none";
        }

        //USUARIOS CAPACITACIÓN
        if (sessionStorage.getItem('usuario') == 52258 || sessionStorage.getItem('usuario') == 56869) {
            console.log("CAPACITACION");
            document.getElementById('OptMenu_RH').hidden = true;
            document.getElementById('OptMenu_Ope').hidden = true;
            document.getElementById('OptMenu_SG').hidden = true;
            document.getElementById('OptMenu_ST').hidden = false;
            document.getElementById("ULSopo").children[0].style.display = "none";
            document.getElementById('MenuCalidad').hidden = true;
            document.getElementById('OptMenuFolo').hidden = true;
        }

        //USUARIOS CALIDAD
        if (sessionStorage.getItem('usuario') == 7068 || sessionStorage.getItem('puesto') == 34) {
            console.log("CALIDAD");
            document.getElementById('OptMenu_RH').hidden = true;
            document.getElementById('OptMenu_Capa').hidden = true;
            document.getElementById('OptMenu_Cursos').hidden = true;
            document.getElementById('OptMenu_ST').hidden = true;
            document.getElementById('OptMenu_Ope').hidden = true;
            document.getElementById('OptMenu_SG').hidden = true;
            document.getElementById('OptMenu_Enc').hidden = true;
            document.getElementById('OptMenuPass').hidden = true;
            document.getElementById('MenuCalidad').hidden = false;
            document.getElementById('OptMenuFolo').hidden = true;
            document.getElementById('OptMenu').hidden = false;
        }

        if (sessionStorage.getItem('puesto') == 25 || sessionStorage.getItem('puesto') == 28) {
            console.log("Entra pueto 25");
            document.getElementById('OptMenu_RH').hidden = true;
            document.getElementById('OptMenu_Capa').hidden = true;
            document.getElementById('OptMenu_ST').hidden = true;
            document.getElementById('OptMenu_Ope').hidden = true;
            document.getElementById('OptMenu_SG').hidden = true;
            document.getElementById('OptMenu_Enc').hidden = false;
            document.getElementById('OptMenuFolo').hidden = true;
            document.getElementById('MenuCalidad').hidden = true;
            document.getElementById("UlCalidad").children[0].style.display = "none";
            document.getElementById("UlCalidad").children[1].style.display = "none";
            document.getElementById("UlCalidad").children[2].style.display = "none";
            document.getElementById("UlCursos").children[1].style.display = "none";
            document.getElementById("UlCursos").children[2].style.display = "none";
            document.getElementById("UlCursos").children[3].style.display = "none";
            document.getElementById("UlCursos").children[4].style.display = "none";
            document.getElementById("UlCursos").children[5].style.display = "none";
            document.getElementById("UlEncuestas").children[0].style.display = "none";
            document.getElementById("UlEncuestas").children[1].style.display = "none";
            document.getElementById("UlEncuestas").children[2].style.display = "none";
            document.getElementById("UlEncuestas").children[3].style.display = "none";
        }

        document.getElementById('OptMenu_Enc').hidden = true;
        document.getElementById("UlEncuestas").children[0].style.display = "none";
        document.getElementById("UlEncuestas").children[1].style.display = "none";
        document.getElementById("UlEncuestas").children[2].style.display = "none";
        document.getElementById("UlEncuestas").children[3].style.display = "none";
    }
    else {
        //location.href = "http://172.16.0.20/IntranetMedc/#";
        location.href = hostInit + "/Logueo/Login";
    }
}


//Función para actulizar password del usuario, cuando su fecha ha caducado
function vCambioContra() {
    var usuario = document.getElementById("username1").value;
    var old_pass = document.getElementById("old_pass").value;
    var newpass = document.getElementById("newPass").value;
    var newpass1 = document.getElementById("newPass1").value;

    var json = {
        usuario: usuario,
        newpass: newpass
    };

    if (newpass != "" && newPass1 != "") { //Verifica que los campos no esten vacios
        if (newpass != usuario && newpass1 != usuario) { // Verifica que la contraseña no sea igual que el usuario
            if (newpass != old_pass && newpass1 != old_pass) { //Verifica que la contraseña no sea la misma que la anterior
                if (newpass == newpass1) { // Verifica que las contraseñas coincidan
                    if (newpass.length >= 8 && newpass1.length >= 8) { // Verifica la longitud de la contraseña
                        var xml = new XMLHttpRequest();
                        var url = hostInit + "/Logueo/vCambioContra";

                        xml.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                var result = JSON.parse(this.responseText);
                                if (result === 1) {
                                    alertify.alert("Contraseña modificada correctamente", function () {
                                        location.href = hostInit + "/Logueo/Login";
                                    });
                                } else {
                                    alertify.error('Error al actualizar contraseña');
                                }
                            }
                        };

                        xml.open("POST", url, true);
                        xml.setRequestHeader("Content-Type", "application/json");
                        xml.send(JSON.stringify(json));

                    } else {
                        
                        document.getElementById('Error_Upd_Pass').innerHTML = "La contraseña debe contener al menos 8 caracteres";
                    }
                } else {
                    
                    document.getElementById('Error_Upd_Pass').innerHTML = "Las contraseñas no coinciden, favor de corroborarlas";
                }
            } else {
                
                document.getElementById('Error_Upd_Pass').innerHTML = "La contraseña no puede ser la misma que la anterior";
            }
        } else {
            
            document.getElementById('Error_Upd_Pass').innerHTML = "La contraseña no puede ser la misma que el usuario";
        }
    }else {
        document.getElementById('Error_Upd_Pass').innerHTML = "Ingresar una nueva contraseña y confirmar la misma";
    }

}


// Ingreso de usuario en mayusculas
function mayus1(e) {
    e.value = e.value.toUpperCase();
}


function cerrarSesion() {
    sessionStorage.clear();
}


//Función para poder definir que tipo de menu se va a mostrar al usuario
function DefinirPuesto(puesto) {
    if (puesto == 9 || puesto == 10 || puesto == 11) { // Desarrollador JR, SR y Director

    } else if (puesto == 25 || puesto == 28) { //RVT y Validador

    } else if (puesto == 4) { // Auxiliar (suponiendo que sea RH)

    } else if (puesto == 7) { //Coordinador

    } else if (puesto == 18) { //Gerente

    } else if (puesto == 19) { // Instructor

    }
}