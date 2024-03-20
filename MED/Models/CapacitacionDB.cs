using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MED.Models
{
    
    public class CapacitacionDB
    {

        string cs = ConfigurationManager.ConnectionStrings["MED"].ConnectionString;

        public List<cat_Respuestas> CargarRespuestas()
        {
            List<cat_Respuestas> lst = new List<cat_Respuestas>();
            using(SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_catRespuestas", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_Respuestas {
                        Code = Convert.ToInt32(rdr["Code"]),
                        Descripcion = rdr["Descripcion"].ToString()
                    });
                }
            }
            return lst;
        }

        public cat_Respuestas InsertarRespuesta(tbl_RespuestasCampanias resp)
        {
            
            cat_Respuestas respuesta = new cat_Respuestas();
            using(SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_InsertarRespuestasCampanias", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_Audio", resp.Audio);
                com.Parameters.AddWithValue("@Id_Examen", resp.Id_Examen);
                com.Parameters.AddWithValue("@RespuestaUser", resp.RespuestaUser);
                com.Parameters.AddWithValue("@Id_Campania", resp.Campania);
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.HasRows)
                {
                    if (rdr.Read())
                    {
                        respuesta.Code = Convert.ToInt32(rdr["Code"]);
                        respuesta.Descripcion = rdr["Descripcion"].ToString();
                    }
                }
            }
            return respuesta;
        }
        //--------------------------Encuesta Seguridad de la información---------------------------

        public tbl_Examenes LlenarTblExamen(tbl_Examenes ex)
        {
            tbl_Examenes i = new tbl_Examenes();
            using(SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_InsertartblExamen", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_Examen", ex.Id_Examen);
                com.Parameters.AddWithValue("@NumEmpleado", ex.NumEmpleado);
                if (ex.IdCampana != 0)
                {
                    com.Parameters.AddWithValue("@IdCampana", ex.IdCampana);
                }
                else {
                    com.Parameters.AddWithValue("@IdCampana", DBNull.Value);
                }
                com.Parameters.AddWithValue("@IdDepartamento", ex.IdDepartamento);
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.HasRows)
                {
                    if (rdr.Read())
                    {
                        i.ID = Convert.ToInt32(rdr["ID"]);
                    }
                }
            }
            return i;
        }
       
        public int InsertarRespuestasQSI(tbl_QSegInf_Respuestas_Usuarios respuesta)
        {
            int resp = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_InsertarRespuestasQSegInf", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_Examen", respuesta.Id_Examen);
                com.Parameters.AddWithValue("@Grupo", respuesta.Grupo);
                com.Parameters.AddWithValue("@Opcion", respuesta.Opcion);
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.Read())
                {
                    resp = resp + Convert.ToInt32(rdr["Respuesta"]);
                } 
            }
            return resp;
        }

        public int Score(tbl_Examenes e)
        {
            int i = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_ScoreQSI", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@id_examen", e.Id_Examen);
                SqlDataReader rdr = com.ExecuteReader();
                while(rdr.Read())
                {
                    i = Convert.ToInt32(rdr["Score"]);
                }
            }
            return i;
        }

        public retro Calificar(retro r)
        {
            retro re = new retro();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_Calificar", con); //--Se utiliza la tabla de tbl_QSegInf_V1_respuestas
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Grupo", r.Grupo);
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.Read())
                {
                    re.Grupo = Convert.ToInt32(rdr["Grupo"]);
                    re.Respuesta = rdr["Respuesta"].ToString();
                    re.Descripcion = rdr["Descripcion"].ToString();
                }
            }
                return re;
        }
    }
}