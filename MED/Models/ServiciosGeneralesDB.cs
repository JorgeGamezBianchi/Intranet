using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Data;

namespace MED.Models
{
    public class ServiciosGeneralesDB
    {
        string cs = ConfigurationManager.ConnectionStrings["MED"].ConnectionString;

        //Metodo que guarda informacion del rondin y/o incidencia
        public int GuardarRondin(tbl_BitacorasRondines b)
        {
            int i = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_InsetaBitacorasRondines", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Usuario", b.Usuario);
                com.Parameters.AddWithValue("@MotivoCaptura", b.MotivoCaptura);
                if (b.Reporta == 0)
                {
                    com.Parameters.AddWithValue("@Reporta", DBNull.Value);

                }
                else {
                    com.Parameters.AddWithValue("@Reporta", b.Reporta);
                }
                com.Parameters.AddWithValue("@Actividad", b.Actividad_Incidencia);
                com.Parameters.AddWithValue("@Persona", b.Persona);
                com.Parameters.AddWithValue("@Direccion", b.Direccion);
                com.Parameters.AddWithValue("@Departamento", b.Departamento);
                com.Parameters.AddWithValue("@FechaIncidente", b.FechaIncidente);
                if (b.Campana != 0)
                {
                    com.Parameters.AddWithValue("@Campana", b.Campana);
                }
                else
                {
                    com.Parameters.AddWithValue("@Campana", 0);
                }
                com.Parameters.AddWithValue("@Hora", b.Hora);
                if (b.Observaciones != null)
                {
                    com.Parameters.AddWithValue("@Observaciones", b.Observaciones);
                }
                else
                {
                    com.Parameters.AddWithValue("@Observaciones", DBNull.Value);
                }
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        i = Convert.ToInt32(rdr["Mensaje"]);
                    }
                }
                else
                {
                    i = 0;
                }
            }
                return i;
        }

        //Metodo que trae los empleados que tienen el puesto de Guardias
        public List<tbl_Empleados> CargarGuardias()
        {
            List<tbl_Empleados> lst = new List<tbl_Empleados>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CargarGuardias", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Empleados {
                        id_Empleado = Convert.ToInt32(rdr["id_Empleado"]),
                        Nombre_1 = rdr["Nombre"].ToString()
                    });
                }
            }
            return lst;
        }

        //Consulta y regresa información para generar tabla con los reportes que aun no son revisados
        public List<tbl_BitacorasRondines> GenerarRevisionRondines(tbl_BitacorasRondines b)
        {
            List<tbl_BitacorasRondines> lst = new List<tbl_BitacorasRondines>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_ReporteRevisionRondines", con);
                com.CommandType = CommandType.StoredProcedure;
                if (b.Usuario != "")
                {
                    com.Parameters.AddWithValue("@NumEmp", b.Usuario);
                }
                else
                {
                    com.Parameters.AddWithValue("@NumEmp", DBNull.Value);
                }
                if (b.Departamento != 0)
                {
                    com.Parameters.AddWithValue("@area", b.Departamento);
                }
                else
                {
                    com.Parameters.AddWithValue("@area", DBNull.Value);
                }
                if (b.Fechainicio != "31/12/1900")
                {
                    com.Parameters.AddWithValue("@FechaInicio", b.Fechainicio);
                }
                else
                {
                    com.Parameters.AddWithValue("@FechaInicio", DBNull.Value);
                }
                if (b.Fechafin != "31/12/1900")
                {
                    com.Parameters.AddWithValue("@FechaFin", b.Fechafin);
                }
                else
                {
                    com.Parameters.AddWithValue("@FechaFin", DBNull.Value);
                }

                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_BitacorasRondines
                    {
                        IdR = Convert.ToInt32(rdr["IdR"]),
                        Usuario = rdr["Usuario"].ToString(),
                        FechaInsercion = rdr["FechaInsercion"].ToString(),
                        FechaIncidente = rdr["FechaIncidente"].ToString(),
                        MotivoCaptura = rdr["MotivoCaptura"].ToString(),
                        ReportaR = rdr["Reporta"].ToString(),
                        Actividad_Incidencia = rdr["Actividad/Incidencia"].ToString(),
                        Persona = rdr["Persona"].ToString(),
                        DireccionR = rdr["Direccion"].ToString(),
                        DepartamentoR = rdr["Departamento"].ToString(),
                        CampanaR = rdr["Campania"].ToString(),
                        Hora = rdr["Hora"].ToString(),
                        Observaciones = rdr["Observaciones"].ToString(),
                    });
                }
            }
            return lst;
        }

        //Funcion para guardar la revision de los rondines
        public int GuardarRevisionRondin(tbl_RevisionRondines r)
        {
            int i = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_InsertarRevision", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@IdR", r.IdR);
                com.Parameters.AddWithValue("@Usuario", r.Usuario);
                com.Parameters.AddWithValue("@Revision", r.Revision);
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        //HommeOffice
        public int Inserta_HommeOffice(tbl_HomeOffice h)
        {
            int i = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_HomeOffice", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_Empleado", h.Id_Empleado);
                com.Parameters.AddWithValue("@p1", h.P1);
                com.Parameters.AddWithValue("@p2", h.P2);
                com.Parameters.AddWithValue("@p3", h.P3);
                com.Parameters.AddWithValue("@p4", h.P4);
                if (h.Telefono == null)
                {
                    com.Parameters.AddWithValue("@Tel", DBNull.Value);
                }
                else
                {
                    com.Parameters.AddWithValue("@Tel", h.Telefono);
                }
                com.Parameters.AddWithValue("@Id_campana", h.Id_campana);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    i = Convert.ToInt32(rdr["Salida"]);
                }
            }
                return i;
        }

        //Metodo para cargar el combo de tipo de compra
        public List<cat_TipoCompra> CargarTipoCompra()
        {
            List<cat_TipoCompra> lst = new List<cat_TipoCompra>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("select * from cat_TipoCompra",con);
                com.CommandType = CommandType.Text;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_TipoCompra {
                        Id = Convert.ToInt32(rdr["Id"]),
                        Tipo = rdr["Tipo"].ToString()
                    });
                }
            }
                return lst;
        } 
        
        //Metodo para cargar el combo de productos
        public List<cat_SubtipoCompra> CargarProductos(int id)
        {
            List<cat_SubtipoCompra> lst = new List<cat_SubtipoCompra>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("select * from cat_SubtipoCompra where Tipo = "+id,con);
                com.CommandType = CommandType.Text;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_SubtipoCompra
                    {
                        Id = Convert.ToInt32(rdr["Id"]),
                        subtipo = rdr["subtipo"].ToString()
                    });
                }
            }
                return lst;
        }

        //Metodo para insertar una solicitud de compra
        public string InsertarSolicitud(tbl_SolicitudCompras sc)
        {
            string folio = "";
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("isp_GuardarSolicituCompras",con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Solicitante",sc.Solicitante);
                com.Parameters.AddWithValue("@Direccion",sc.Direccion);
                com.Parameters.AddWithValue("@Departamento", sc.Departamento);
                com.Parameters.AddWithValue("@Tipo", sc.Tipo);
                com.Parameters.AddWithValue("@Subtipo", sc.Subtipo);
                com.Parameters.AddWithValue("@Razon", sc.Razon);
                //com.Parameters.AddWithValue("@FechaRequesicion", sc.FechaRequesicion);
                com.Parameters.AddWithValue("@Prioridad", sc.Prioridad);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    folio = (rdr["Folio"] != DBNull.Value) ? rdr["Folio"].ToString() : ""; 
                }
            }
                return folio;
        }

        //Metodo para cargar las solicitudes de compra pendientes
        public List<SolicitudPendiente> CargarSolicitudesPendientes()
        {
            List<SolicitudPendiente> solicitud = new List<SolicitudPendiente>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_CargarSolicitudesPendientes", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    solicitud.Add(new SolicitudPendiente
                    {
                        Folio = rdr["FolioCompra"].ToString(),
                        Solicitante = rdr["NombreCompleto"].ToString(),
                        FechaSolicitud = Convert.ToDateTime(rdr["FechaRequesicion"]),
                        Descripcion = rdr["Razon"].ToString(),
                        Prioridad = rdr["Prioridad"].ToString()

                    });
                }
                con.Close();
            }
            return solicitud;
        }

        //Metodo para cambiar el estatus de solicitud de compra
        public int CambiarEstatusSolicitud(string folio, string estatus)
        {
            int row = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand comm = new SqlCommand("usp_ActualizarEstatusSolicitud", con);
                comm.CommandType = CommandType.StoredProcedure;
                comm.Parameters.AddWithValue("@FolioCompra", folio);
                comm.Parameters.AddWithValue("@Estatus", estatus);
                row = comm.ExecuteNonQuery();
                con.Close();
            }
            return row;
        }
    }
}