using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Net.Mail;
using System.Net;

namespace MED.Models
{
    public class OperacionBD
    {
        readonly string cs = ConfigurationManager.ConnectionStrings["MED"].ConnectionString;

        //Metodo que carga las campañas que se encuentran activas
        public List<cat_Campanias> CargarCampanias()
        {
            List<cat_Campanias> lst = new List<cat_Campanias>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CatCampanias", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_Campanias
                    {
                        Id_Campania = Convert.ToInt32(rdr["Id_Campania"]),
                        Campania = rdr["Campania"].ToString()
                    });
                }
            }
            return lst;
        }

        //Metodo que carga a los supervisores dependiendo la campaña
        public List<tbl_Empleados> CargarSupervisoresCamapana(cat_Campanias c)
        {
            List<tbl_Empleados> lst = new List<tbl_Empleados>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CargarSuper",con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@IdCampana", c.Id_Campania);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Empleados {
                        id_Empleado = Convert.ToInt32(rdr["id_Empleado"]),
                        Nombre_1 = rdr["NombreSupervisor"].ToString()
                    });
                }
            }
                return lst;
        }

        //Metodo que carga a los RVTs que se encuentran en la campaña seleccionada y a cargo del supervisor seleccionado
        public List<tbl_Empleados> CargarRVTs(tbl_Empleados e)
        {
            List<tbl_Empleados> lst = new List<tbl_Empleados>();
            using (SqlConnection con= new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CargarRVTs",con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@IdSupervisor",e.id_Empleado);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Empleados {
                        id_Empleado = Convert.ToInt32(rdr["id_Empleado"]),
                        NumeroEmpleado = rdr["NumEmpleado"].ToString(),
                        Nombre_1 = rdr["RVT"].ToString(),//GUARDA NOMBRE COMPLETO DE RVT
                        Nombre_2 = rdr["COORDINADOR"].ToString(),//GUARDA NOMBRE COMPLETO DE COORDINADOR
                        CapturaPlantilla = Convert.ToInt32(rdr["IDCoordinador"]), //GUARDA EL ID DEL COORDINADOR
                        APaterno = rdr["SUPERVISOR"].ToString(),//GUARDA NOMBRE COMPLETO DE SUPERVISOR
                        Banco = Convert.ToInt32(rdr["IDSupervisor"]),//GUARDA EL ID DEL SUPERVISOR
                        AMaterno = rdr["GERENTE"].ToString(),//GUARDA NOMBRE COMPLETO DE GERENTE
                        ElaboroContrato = Convert.ToInt32(rdr["IDGerente"]), //GUARDA EL ID DEL GERENTE
                        CURP = rdr["DIRECTOR"].ToString(),//GUARDA NOMBRE COMPLETO DE DIRECTOR
                        EstadoCivil = Convert.ToInt32(rdr["IDDirector"]), //GUARDA EL ID DEL DIRECTOR
                        IdDepartamento = Convert.ToInt32(rdr["IdJerarquia"])//GUARDA ID DE LA JERARQUIA
                    });
                }
            }
            return lst;
        }

        //Metodo para cargar los RVTs sin campaña asignada
        public List<tbl_Empleados> CargarRVTsSinAsignar()
        {
            List<tbl_Empleados> lst = new List<tbl_Empleados>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_RVTsSinAsignar", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Empleados {
                        NumeroEmpleado = rdr["NumEmpleado"].ToString(),
                        id_Empleado = Convert.ToInt32(rdr["id_Empleado"]),
                        Nombre_1 = rdr["Nombre"].ToString(),//Guarda nombre completo del RVT
                        IdDepartamento = Convert.ToInt32(rdr["IdJerarquia"]) //Guarda el IdJerarquia
                    });
                }
            }
            return lst;
        }

        //Metodo para realizar la baja operacional
        public string BajaOperacional(tbl_Empleados e)
        {
            string mensaje = "";
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ZKTime.dbo.spd_upd_EstatusUsuario", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@usr", e.RFC);
                com.Parameters.AddWithValue("@mov ", 0);
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        mensaje = rdr["Mensaje"].ToString();
                    }
                }
            }
                return mensaje;
        }

        //Envia datos para asignación de campaña a un RVT 
        public bool AsignarCampana(tbl_Empleados emp)
        {
            bool i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_AsignarCampanaRVT", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@IdJerarquia", emp.IdDepartamento);
                com.Parameters.AddWithValue("@IDEmpleado", emp.id_Empleado);
                com.Parameters.AddWithValue("@IDCampana", emp.IDDireccion);
                com.Parameters.AddWithValue("@Estatus", 0);
                com.Parameters.AddWithValue("@IDSupervisor", emp.ElaboroContrato);
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.HasRows)
                {
                    i = true;
                }
                else
                {
                    i=false;
                }
            }
            return i;
        }

        //Envia la informacion para la autorizacion del cambio de campaña
        public int CambioCampana(tbl_ControlPlantilla cp)
        {
            int i = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_InsertarControlPlantilla", con);
                com.CommandType = CommandType.StoredProcedure;
                //com.Parameters.AddWithValue("@FechaInicial", cp.Fechainicial);
                com.Parameters.AddWithValue("@IdUsuarioAutorizo", DBNull.Value);
                com.Parameters.AddWithValue("@IdPuestoAutorizo", DBNull.Value);
                com.Parameters.AddWithValue("@IdCamapana", cp.IdCampana);
                com.Parameters.AddWithValue("@IdEmpleado", cp.IdEmpleado);
                com.Parameters.AddWithValue("@IdPuesto", 25);
                com.Parameters.AddWithValue("@IdEmpleadoJefe", cp.IdEmpleadoJefe);
                com.Parameters.AddWithValue("@IdPuestoJefe", 27);
                com.Parameters.AddWithValue("@Serie", cp.Serie);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    i = 1;
                }
            }
                return i;
        }

        //Metodo que carga el combo con los cambios solicitados 
        public List<tbl_ControlPlantilla> CargarComboCambios(tbl_Empleados emp)
        {
            List<tbl_ControlPlantilla> lst = new List<tbl_ControlPlantilla>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CargarAutorizacionPendiente", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@IdUsuario", emp.id_Empleado);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_ControlPlantilla {
                        Fecha = rdr["Fecha"].ToString(),
                        Campana = rdr["Campania"].ToString(),
                        Serie = Convert.ToInt32(rdr["Serie"])
                    });
                }
            }
                return lst;
        }

        //Metodo para cargar la lista de los rvts que seran cambiados de campaña y esperan aoturización
        public List<tbl_ControlPlantilla> CargarRvts_CambioCampana(tbl_ControlPlantilla cp)
        {
            List<tbl_ControlPlantilla> lst = new List<tbl_ControlPlantilla>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CargarRVTAutorizar", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Serie", cp.Serie);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_ControlPlantilla
                    {
                        //Falta el ID de la campaña destino 
                        IdJerarquia = (rdr["IdJerarquia"] != DBNull.Value) ? Convert.ToInt32(rdr["IdJerarquia"]) : 0,
                        IdEmpleado = Convert.ToInt32(rdr["id_Empleado"]),
                        NumEmpleado = (rdr["NumEmpleado"] != DBNull.Value) ? rdr["NumEmpleado"].ToString() : "",
                        CampanaOrigen = (rdr["CampanaOrigen"] != DBNull.Value) ? rdr["CampanaOrigen"].ToString() : "",
                        RVT = (rdr["RVT"] != DBNull.Value) ? rdr["RVT"].ToString() : "",
                        COORDINADORORIGEN = (rdr["COORDINADORORIGEN"] != DBNull.Value) ? rdr["COORDINADORORIGEN"].ToString() : "",
                        SUPERVISORORIGEN = (rdr["SUPERVISORORIGEN"] != DBNull.Value) ? rdr["SUPERVISORORIGEN"].ToString() : "",
                        GERENTEORIGEN = (rdr["GERENTEORIGEN"] != DBNull.Value) ? rdr["GERENTEORIGEN"].ToString() : "",
                        DIRECTORORIGEN = (rdr["DIRECTORORIGEN"] != DBNull.Value) ? rdr["DIRECTORORIGEN"].ToString() : "",
                        IdCampanaDestino = (rdr["IdCampanaDestino"] != DBNull.Value) ? Convert.ToInt32(rdr["IdCampanaDestino"]) : 0,
                        CampanaDestino = (rdr["CampanaDestino"] != DBNull.Value) ? rdr["CampanaDestino"].ToString() : "",
                        IdSupervisorDestino = (rdr["IdSupervisorDestino"] != DBNull.Value) ? Convert.ToInt32(rdr["IdSupervisorDestino"]) : 0,
                        SUPERVISORDESTINO = (rdr["SUPERVISORDESTINO"] != DBNull.Value) ? rdr["SUPERVISORDESTINO"].ToString() : "",
                        IDCoordinadorDestino = (rdr["IDCoordinadorDestino"] != DBNull.Value) ? Convert.ToInt32(rdr["IDCoordinadorDestino"]) : 0,
                        COORDINADORDESTINO = (rdr["COORDINADORDESTINO"] != DBNull.Value) ? rdr["COORDINADORDESTINO"].ToString() : "",
                        IDGerenteDestino = (rdr["IDGerenteDestino"] != DBNull.Value) ? Convert.ToInt32(rdr["IDGerenteDestino"]) : 0,
                        GERENTEDESTINO = (rdr["GERENTEDESTINO"] != DBNull.Value) ? rdr["GERENTEDESTINO"].ToString() : "",
                        IDDIrectorDestino = (rdr["IDDIrectorDestino"] != DBNull.Value) ? Convert.ToInt32(rdr["IDDIrectorDestino"]) : 0,
                        DIRECTORDESTINO = (rdr["DIRECTORDESTINO"] != DBNull.Value) ? rdr["DIRECTORDESTINO"].ToString() : "",
                    });
                }
            }
            return lst;
        }

        //Metodo que realiza la autorizacion o negacion del cambio de campaña
        public int Autorizar_Negar_Cambio(tbl_ControlPlantilla cp)
        {
            //Fecha_Max_ControlPlantilla(cp.IdEmpleado); //--> Llamada a metodo prueba
            int i = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_ActualizarPlantilla", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@IDEmpleado", cp.IdEmpleado);
                if (cp.IdSupervisorDestino != 0)
                {
                    com.Parameters.AddWithValue("@IDSupervisor", cp.IdSupervisorDestino);
                }
                else
                {
                    com.Parameters.AddWithValue("@IDSupervisor", DBNull.Value);
                }
                
                com.Parameters.AddWithValue("@NumAutorizo", cp.IdUsuarioAutorizo);
                if (cp.IDGerenteDestino != 0)
                {
                    com.Parameters.AddWithValue("@IDGerente", cp.IDGerenteDestino);
                }
                else
                {
                    com.Parameters.AddWithValue("@IDGerente", DBNull.Value);
                }
                if (cp.IDDIrectorDestino != 0)
                {
                    com.Parameters.AddWithValue("@IDDirector", cp.IDDIrectorDestino);
                }
                else
                {
                    com.Parameters.AddWithValue("@IDDirector", DBNull.Value);
                }
                if (cp.IdCampanaDestino != 0)
                {
                    com.Parameters.AddWithValue("@IDCampana", cp.IdCampanaDestino);
                }
                else
                {
                    com.Parameters.AddWithValue("@IDCampana", DBNull.Value);
                }
                
                com.Parameters.AddWithValue("@Estatus", cp.Estatus);
                com.Parameters.AddWithValue("@IDJerarquia", cp.IdJerarquia);
                com.Parameters.AddWithValue("@Serie", cp.Serie);
                com.Parameters.AddWithValue("@IdPuestoAutorizo", cp.IdPuestoAutorizo);
                i = com.ExecuteNonQuery();
            }
                return i;
        }

        //Prueba de consulta de fecha mayor en tabla de Control_Plantilla
        public void Fecha_Max_ControlPlantilla(int id_emp)
        {
            string fecha = "";
            using (SqlConnection con = new SqlConnection(cs))
            {
                string sql = "select max(FechaInicial) as Fecha from tbl_ControlPlantilla where IdEmpleado= "+id_emp+" and FechaFinal is null";
                con.Open();
                SqlCommand com = new SqlCommand(sql,con);
                com.CommandType = CommandType.Text;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    fecha = rdr["Fecha"].ToString();
                }
                string fecha2 = fecha.Substring(0, 19);

                string sql2 = "UPDATE tbl_ControlPlantilla set [FechaFinal] = getdate() WHERE IdEmpleado= "+id_emp+" and Fechainicial ='"+ fecha2+"' and FechaFinal is NULL";
                SqlCommand com2 = new SqlCommand(sql2, con);
                com2.CommandType = CommandType.Text;
                com2.ExecuteNonQuery();
            }
                
        }

        //Prueba correo
        public int RespuestaCorreo_Autorizacion(tbl_Empleados e)
        {
            int i = 0;
            if (e.EstadoCivil == 2) //Valida la autorizacion, en caso de ser 2 fue autorizado el cambio
            {
                MailMessage msg = new MailMessage();

                msg.To.Add(new MailAddress("jose_tun_g@outlook.com"));

                msg.From = new MailAddress("germanmxm@outlook.com");

                msg.Subject = "Respuesta de la solicitud del cambio de campaña para los RVTs";

                msg.Body = "El cambio ha sido autorizado";

                SmtpClient clienteSmtp = new SmtpClient("vps.medc.com.mx");

                try
                {
                    clienteSmtp.Send(msg);
                    i = 1;
                }
                catch (Exception ex)
                {
                    Console.Write(ex.Message);
                    Console.ReadLine();
                }
            }else if (e.EstadoCivil == 1) //En caso de ser 1 es la notificación del cambio de campaña
            {
                MailMessage msg = new MailMessage();

                msg.To.Add(new MailAddress("germanmxm@outlook.com"));

                msg.From = new MailAddress("germanmxm@outlook.com");

                msg.Subject = "Solicitud de cambio de campaña para los RVTs";

                msg.Body = "Tiene una solicitud nueva para dar su autorización del cambio de campaña";

                SmtpClient clienteSmtp = new SmtpClient("vps.medc.com.mx");

                try
                {
                    clienteSmtp.Send(msg);
                    i = 1;
                }
                catch (Exception ex)
                {
                    Console.Write(ex.Message);
                    Console.ReadLine();
                }

                //MailMessage email = new MailMessage();
                //email.To.Add(new MailAddress("germangarciag@outlook.com"));
                //email.From = new MailAddress("germanmxm@outlook.com");
                //email.Subject = "Asunto ( " + DateTime.Now.ToString("dd / MMM / yyy hh:mm:ss") + " ) ";
                //email.Body = "Cualquier contenido en <b>HTML</b> para enviarlo por correo electrónico.";
                //email.IsBodyHtml = true;
                //email.Priority = MailPriority.Normal;
                //SmtpClient smtp = new SmtpClient();
                //smtp.Host = "Smtp.live.com";
                //smtp.Port = 2525;
                //smtp.EnableSsl = false;
                //smtp.UseDefaultCredentials = false;
                //smtp.Credentials = new NetworkCredential("germangarciag@outlook.com", "mexamafia444");
                //string output = null;
                //try
                //{
                //    smtp.Send(email);
                //    email.Dispose();
                //    output = "Corre electrónico fue enviado satisfactoriamente.";
                //}
                //catch (Exception ex)
                //{
                //    output = "Error enviando correo electrónico: " + ex.Message;
                //}

                //Console.WriteLine(output);

            }
            else // en caso de ser 3 es denegada
            {
                MailMessage msg = new MailMessage();

                msg.To.Add(new MailAddress("germanmxm@outlook.com"));

                msg.From = new MailAddress("germanmxm@outlook.com");

                msg.Subject = "Respuesta de la solicitud del cambio de campaña para los RVTs";

                msg.Body = "El cambio ha sido negado";

                SmtpClient clienteSmtp = new SmtpClient("vps.medc.com.mx");

                try
                {
                    clienteSmtp.Send(msg);
                    i = 2;
                }
                catch (Exception ex)
                {
                    Console.Write(ex.Message);
                    Console.ReadLine();
                }
            }
            //SmtpClient smtpserver = new SmtpClient();
            //MailMessage mail = new MailMessage();
            //smtpserver.Port = 465;
            //smtpserver.Host = "vps.medc.com.mx";
            //mail.From = new MailAddress("emontiel@medc.com.mx", "Correo");
            //mail.IsBodyHtml = true;
            //mail.To.Add("emontiel@medc.com.mx");
            ////mail.CC.Add("correocopia@correo.com");
            //mail.Subject = "Informació de correo";
            //mail.Priority = MailPriority.High;
            //mail.Body = "Correo prueba";
            //smtpserver.Send(mail);
            return i;
        }

        //Manda el correo para notificar que se tiene una solicitud de cambio de campaña para RVTs
        public int Notificar_Cambio(tbl_Empleados em)
        {
            int i = 0;
            MailMessage msg = new MailMessage();

            msg.To.Add(new MailAddress("germanmxm@outlook.com"));

            msg.From = new MailAddress("germanmxm@outlook.com");

            msg.Subject = "Solicitud de cambio de campaña para los RVTs";

            msg.Body = "Tiene una solicitud nueva para dar su autorización del cambio de campaña";

            SmtpClient clienteSmtp = new SmtpClient("outlook.live.com");

            try
            {
                clienteSmtp.Send(msg);
                i = 1;
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
                Console.ReadLine();
            }
            return i;
        }

        //Codigo Prueba
    //    MailMessage msg = new MailMessage();

    //    msg.To = "devjoker@djk.com";

    //msg.From = "Administrador@djk.com";

    //msg.Subject = "El asunto del mail";

    //msg.Body = "Este es el contenido del email";

    //msg.Priority = MailPriority.High;

    //msg.BodyFormat = MailFormat.Text ; //o MailFormat.Html 

     

    //SmtpMail.SmtpServer = "WIN02"; // El servidor de correo

    //try

    //{

    //    SmtpMail.Send(msg); 

    //}

    //catch (Exception ex)

    //{

    //    Console.WriteLine(ex.Message );

    //    Console.ReadLine(); 

    //} 
    }
}