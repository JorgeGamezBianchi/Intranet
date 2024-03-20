using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Helpers;
using System.Text;
using static MED.Models.TablasCuestionarios;

namespace MED.Models
{
    public class EncuestasDB
    {
        string cs = ConfigurationManager.ConnectionStrings["MED"].ConnectionString;

        //Metodo para cargar el primer cuestionario 
        public List<cat_Seccion> Cargar_Guias(tbl_Examenes e)
        {
            List<cat_Seccion> lst = new List<cat_Seccion>();
            using (SqlConnection con= new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CargarGuiaRef1", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_Examen", e.Id_Examen);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_Seccion {
                        Id_seccion = Convert.ToInt32(rdr["Id_seccion"]),
                        Seccion = rdr["Seccion"].ToString(),
                        Id_pregunta = Convert.ToInt32(rdr["Id_pregunta"]),
                        Pregunta = rdr["Pregunta"].ToString()
                    });
                }
            }
                return lst;
        }

        //Metodo que guarda las respuestas del cuestionario 1
        public int GuardarRespuestas_Enc(tbl_ValoresGuiaRef1 r)
        {
            int i = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_GuardarGuiaRef1", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_cuestionario", r.Id_cuestionario);
                com.Parameters.AddWithValue("@Id_pregunta", r.Id_pregunta);
                if (r.Respuesta == "s")
                {
                    com.Parameters.AddWithValue("@Respuesta", DBNull.Value);
                }
                else
                {
                    com.Parameters.AddWithValue("@Respuesta", r.Respuesta);
                }
                if (r.AtencionClinica == "" || r.AtencionClinica == null)
                {
                    com.Parameters.AddWithValue("@AtencionClinica", DBNull.Value);
                }
                else
                {
                    com.Parameters.AddWithValue("@AtencionClinica", r.AtencionClinica);
                }
                
                com.Parameters.AddWithValue("@Id_Examen", r.Id_Examen);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    i = Convert.ToInt32(rdr["Mensaje"]);
                }
            }
                return i;
        }

        //metodo para realizar la inserción del inicio del examen, regresa el ID de la encuesta
        public int Iniciar_PrimerEnc(tbl_Empleados e)
        {
            int i = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CrearGuiaRef1", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@NumEmpleado", e.NumeroEmpleado);
                com.Parameters.AddWithValue("@IdPuesto", e.Puesto);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                   

                    if (Convert.ToInt32(rdr["Id_cuestionario"]) == 1) 
                    {

                        i = 1;
                    }
                    else
                    {
                        i = Convert.ToInt32(rdr["Id_cuestionario"]);
                    }
                }
            }
                return i;
        }

        public int IniciarEvaluacionLFDPPP(Iniciar inicio)
        {
            int idEvaluacion = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("isp_EvaluacionOMultiple", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@NumEmpleado", inicio.NumeroEmpleado);
                com.Parameters.AddWithValue("@Id_Examen", inicio.IdExamen);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    idEvaluacion = Convert.ToInt32(rdr["Id_Evaluacion"]);
                }
            }
            return idEvaluacion;
        }

        public List<tbl_EvaluacionPreguntas> ObtenerPreguntasEvaluacion(int idExamen)
        {
            List<tbl_EvaluacionPreguntas> lst = new List<tbl_EvaluacionPreguntas>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_CargarPreguntasEvaluacion", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_Examen", idExamen);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_EvaluacionPreguntas
                    {
                        IdRespuesta = Convert.ToInt32(rdr["Id_Respuesta"]),
                        Grupo = Convert.ToInt32(rdr["Grupo"]),
                        Pregunta = rdr["Pregunta"].ToString(),
                        Respuesta = rdr["Respuesta"].ToString()
                    });
                }
                con.Close();
            }
            return lst;
        }

        public List<tbl_EvaluacionRespuestas> ObtenerRespuestasEvaluacion(int idExamen)
        {
            List<tbl_EvaluacionRespuestas> lst = new List<tbl_EvaluacionRespuestas>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_CargarRespuestasEvaluacion", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_Examen", idExamen);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_EvaluacionRespuestas
                    {
                        Grupo = Convert.ToInt32(rdr["Grupo"]),
                        Opcion = rdr["Opcion"].ToString(),
                        Respuesta = rdr["Respuesta"].ToString()
                    });
                }
            }
            return lst;
        }

        public int GuardarEvaluacion(int idExamen, string grupo, string opcion)
        {
            var row = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("isp_InsertarRespuestasEvaluacion", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_Evaluacion", idExamen);
                com.Parameters.AddWithValue("@Grupo", grupo);
                com.Parameters.AddWithValue("@Opcion", opcion);
                row = com.ExecuteNonQuery();
            }
            return row;
        }


        ////EVALUACION

        public int IniciarEvaluacion(Iniciar inicio)
        {
            int idEvaluacion = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("isp_EvaluacionOMultiple2", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@NumEmpleado", inicio.NumeroEmpleado);
                com.Parameters.AddWithValue("@Id_Examen", inicio.IdExamen);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    idEvaluacion = Convert.ToInt32(rdr["Id_Evaluacion"]);
                }
            }
            return idEvaluacion;
        }

        public int GuardarEva(int idExamen, string grupo, string opcion, int IdCurso)
        {
            var row = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("isp_InsertarRespuestasEvaluacion2", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_Evaluacion", idExamen);
                com.Parameters.AddWithValue("@Grupo", grupo);
                com.Parameters.AddWithValue("@Opcion", opcion);
                com.Parameters.AddWithValue("@IdCurso", IdCurso);
                row = com.ExecuteNonQuery();
            }
            return row;
        }

        //--------------------------------------Evaluacion de clima laboral 2020

        //Guarda los datos para iniciar la evaluación
        public int IniciarEvaluacionClimaLaboral(tbl_ClimaLaboral_Dic2021 ev)
        {
            int i = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("isp_EncustaAmbienteLaboral", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_Empleado", ev.Id_Empleado);
                com.Parameters.AddWithValue("@Genero", ev.Genero);
                com.Parameters.AddWithValue("@Edad", ev.Edad);
                com.Parameters.AddWithValue("@Nivel_estudio", ev.Nivel_estudio);
                com.Parameters.AddWithValue("@Centro", ev.Centro);
                com.Parameters.AddWithValue("@Turno", ev.Turno);
                com.Parameters.AddWithValue("@Antiguedad", ev.Antiguedad);
                com.Parameters.AddWithValue("@Staff", ev.Staff);
                com.Parameters.AddWithValue("@RVT", ev.RVT);
                com.Parameters.AddWithValue("@Jefe_inmediato", ev.Jefe_inmediato);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    i = Convert.ToInt32(rdr["Id_Encusta"]);
                }
            }
                return i;
        }

        //Trae las preguntas para la evaluación
        public List<cat_PreguntasAmbienteLaboral> CargarEvaluacionClimaLa()
        {
            List<cat_PreguntasAmbienteLaboral> lst = new List<cat_PreguntasAmbienteLaboral>();
            using (SqlConnection con  = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_CargarPreguntasAmbienteLaboral", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while(rdr.Read())
                {
                    lst.Add(new cat_PreguntasAmbienteLaboral
                    {
                        Id_Pregunta = Convert.ToInt32(rdr["Id_Pregunta"]),
                        Factor = Convert.ToInt32(rdr["Id_Factor"]),
                        Pregunta = rdr["Pregunta"].ToString()
                    });
                }
            }
                return lst;
        }

        //Guardar las respuestas de la evaluacion de clima laboral
        public int GuardarEvaluacionClimaLaboral(tbl_RespuestasAmbienteLaboral r)
        {
            int i = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("isp_tbl_RespuestasAmbienteLaboral",con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_Encuesta",r.Id_Encuesta);
                com.Parameters.AddWithValue("@Id_Pregunta",r.Id_Pregunta);
                if (r.Respuesta != "" || r.Respuesta != "0")
                {
                    com.Parameters.AddWithValue("@Respuestas", r.Respuesta);
                }
                else
                {
                    com.Parameters.AddWithValue("@Respuestas", DBNull.Value);
                }
                i = com.ExecuteNonQuery();
            }
                return i;
        }
    }
}