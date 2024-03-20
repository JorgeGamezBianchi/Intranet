using LinqToExcel;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common.CommandTrees.ExpressionBuilder;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;

namespace MED.Models
{
    public class CursosDB
    {
        string cs = ConfigurationManager.ConnectionStrings["MED"].ConnectionString;

        public int CrearPrograma(string nombre, string numEmpleado)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_InsertarPrograma", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Nombre", nombre);
                com.Parameters.AddWithValue("@NumEmpleado", numEmpleado);
                i = com.ExecuteNonQuery();
                con.Close();
            }
            return i;
        }


        public int EliminarPrograma(string idPrograma)
        {
            var cursos = CargarCursos(idPrograma);
            for (int i = 0; i < cursos.Count; i++)
            {
                EliminarCurso(cursos[i].Id_curso, cursos[i].Nombre_Curso);
            }

            int row;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("dsp_EliminarPrograma", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_programa", idPrograma);
                row = com.ExecuteNonQuery();
                con.Close();
            }
            return row;
        }


        public List<tbl_Programa> CargarProgramas()
        {
            List<tbl_Programa> lst = new List<tbl_Programa>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_CargarProgramas", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Programa
                    {
                        Id_programa = Convert.ToInt32(rdr["Id_programa"]),
                        Nombre = rdr["Nombre"].ToString(),
                        NombreEmpleado = rdr["NombreCompleto"].ToString(),
                        FechaInsercion = Convert.ToDateTime(rdr["FCreacion"])
                    });
                }
                con.Close();
            }
            return lst;
        }


        public int CrearCurso(CursoArchivo curso)
        {
            var id = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("isp_InsertarCurso", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_programa", curso.Id_programa);
                com.Parameters.AddWithValue("@Nombre_curso", curso.Nombre_Curso);
                com.Parameters.AddWithValue("@Descripcion", curso.Descripcion);
                com.Parameters.AddWithValue("@Id_tipo_curso", curso.id_tipo_curso);
                com.Parameters.AddWithValue("@Leyenda", curso.Leyenda);
                com.Parameters.AddWithValue("@Actividad", curso.ActividadBit);
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.HasRows)
                {
                    if (rdr.Read())
                    {
                        id = Convert.ToInt32(rdr["Id_curso"]);
                    }
                }
                con.Close();
            }
            return id;
        }

        public int ActualizarCurso(CursoArchivo curso)
        {
            var row = 0;
            string nuevaRuta = HttpContext.Current.Server.MapPath("/Media/ArchivosCursos/" + curso.Nombre_Curso);
            //string nuevaRuta = "C:/proyectos/MED_Intranet/MED/Media/ArchivosCursos/" + curso.Nombre_Curso;
            var cursoDB = CargarCursoPorId(curso.Id_curso);
            string rutaActual = HttpContext.Current.Server.MapPath("/Media/ArchivosCursos/" + cursoDB.Nombre_Curso);
            //string rutaActual = "C:/proyectos/MED_Intranet/MED/Media/ArchivosCursos/" + cursoDB.Nombre_Curso;
            if (curso.Nombre_Curso != cursoDB.Nombre_Curso)
            {
                Directory.Move(rutaActual, nuevaRuta);
            }

            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_ActualizarCurso", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_curso", curso.Id_curso);
                com.Parameters.AddWithValue("@Nombre_curso", curso.Nombre_Curso);
                com.Parameters.AddWithValue("@Descripcion", curso.Descripcion);
                row = com.ExecuteNonQuery();
                con.Close();
            }
            return row;
        }

        public tbl_Curso CargarCursoPorId(int idCurso)
        {
            tbl_Curso lst = new tbl_Curso();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_ObtenerCursoPorId", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_curso", idCurso);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Id_curso = Convert.ToInt32(rdr["Id_curso"]);
                    lst.Nombre_Curso = rdr["Nombre_curso"].ToString();
                    lst.Descripcion = rdr["Descripcion"].ToString();
                }
                con.Close();
            }
            return lst;

        }
        public List<CursoConArchivos> CargarCursos(string idPrograma)
        {
            List<CursoConArchivos> lst = new List<CursoConArchivos>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_ObtenerCursos", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_programa", idPrograma);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new CursoConArchivos
                    {

                        Id_curso = Convert.ToInt32(rdr["Id_curso"]),
                        Nombre_Curso = rdr["Nombre_curso"].ToString(),
                        Descripcion = rdr["Descripcion"].ToString()
                    });
                }
                con.Close();
                for (int i = 0; i < lst.Count; i++)
                {
                    lst[i].Archivos = CargarArchivos(lst[i].Id_curso);
                }

            }
            return lst;
        }

        public int EliminarCurso(int idCurso, string nombreCurso)
        {
            var row = 0;
            //string rutaSitio = "C:/proyectos/MED_Intranet/MED/Media/ArchivosCursos/" + nombreCurso;
            string rutaSitio = HttpContext.Current.Server.MapPath("/Media/ArchivosCursos/" + nombreCurso);
            if (Directory.Exists(rutaSitio))
            {
                Directory.Delete(rutaSitio, true);
            }
            var idExamen = ObtenerActividad(idCurso);

            if (idExamen > 0)
            {
                EliminarExamen(idExamen);
            }

            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("dsp_EliminarCurso", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_curso", idCurso);
                row = com.ExecuteNonQuery();
                con.Close();
            }
            return row;
        }

        public int ObtenerActividad(int idCurso)
        {
            var idExamen = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_ObtenerActividad", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_curso", idCurso);
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.HasRows)
                {
                    if (rdr.Read())
                    {
                        idExamen = Convert.ToInt32(rdr["Id_examen"]);
                    }
                }
                con.Close();
            }
            return idExamen;
        }
        public int GuardarArchivo(HttpPostedFileBase file, string nombreCurso, int idCurso, string tipo, string descripcion, int tiempo)
        {
            var row = 0;
            try
            {

                //string rutaSitio = "C:/proyectos/MED_Intranet/MED/Media/ArchivosCursos/" + nombreCurso;
                string rutaSitio = HttpContext.Current.Server.MapPath("/Media/ArchivosCursos/" + nombreCurso);
                if (!Directory.Exists(rutaSitio))
                {
                    Directory.CreateDirectory(rutaSitio);
                }

                string pathUrl = Path.Combine(rutaSitio, file.FileName);
                file.SaveAs(pathUrl);
                var idExamen = 0;
                if (tipo == "Actividad")
                {

                    idExamen = CrearExamen(nombreCurso, descripcion);
                    if (idExamen > 0)
                    {
                        var grupo = ObtenerUltimoGrupo();
                        var book = new ExcelQueryFactory(pathUrl);
                        var correcto = LeerPreguntasExcel(book, grupo, idExamen);
                        if (correcto == 1)
                        {
                            LeerRespuestasExcel(book, grupo);
                        }
                    }
                }

                using (SqlConnection con = new SqlConnection(cs))
                {
                    con.Open();
                    SqlCommand com = new SqlCommand("isp_InsertarArchivo", con);
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.AddWithValue("@Id_curso", idCurso);
                    com.Parameters.AddWithValue("@Nombre_archivo", file.FileName);
                    com.Parameters.AddWithValue("@Ruta", rutaSitio);
                    com.Parameters.AddWithValue("@Tipo", tipo);
                    com.Parameters.AddWithValue("@Id_examen", idExamen);
                    com.Parameters.AddWithValue("@Tiempo", tiempo);
                    row = com.ExecuteNonQuery();
                    con.Close();
                }
            }
            catch (Exception)
            {
                row = 0;
            }
            return row;
        }

        public List<tbl_Archivo> CargarArchivos(int idCurso)
        {
            List<tbl_Archivo> lst = new List<tbl_Archivo>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_ObtenerContenidos", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_curso", idCurso);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Archivo
                    {
                        Id_archivo = Convert.ToInt32(rdr["Id_archivo"]),
                        Nombre_archivo = rdr["Nombre_archivo"].ToString(),
                        Tipo = rdr["Tipo"].ToString(),
                        Id_examen = Convert.ToInt32(rdr["Id_examen"])
                    });
                }
                con.Close();
            }
            return lst;
        }

        public int EliminarArchivo(int idArchivo, string nombreCurso, string nombreArchivo, int idExamen)
        {
            var row = 0;
            string rutaSitio = HttpContext.Current.Server.MapPath("/Media/ArchivosCursos/" + nombreCurso + "/" + nombreArchivo);
            //string rutaSitio = "C:/proyectos/MED_Intranet/MED/Media/ArchivosCursos/" + nombreCurso + "/" + nombreArchivo;
            File.Delete(rutaSitio);

            EliminarExamen(idExamen);
            using (SqlConnection conn = new SqlConnection(cs))
            {
                conn.Open();
                SqlCommand comm = new SqlCommand("dsp_EliminarArchivo", conn);
                comm.CommandType = CommandType.StoredProcedure;
                comm.Parameters.AddWithValue("@Id_archivo", idArchivo);
                row = comm.ExecuteNonQuery();
                conn.Close();
            }
            return row;
        }

        public int ObtenerUltimoGrupo()
        {
            var grupo = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_ObtenerUltimoGrupo", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.HasRows)
                {
                    if (rdr.Read())
                    {
                        grupo = Convert.ToInt32(rdr["Grupo"]);
                    }
                }
                con.Close();
                return grupo;
            }
        }

        public int CrearExamen(string nombre, string descripcion)
        {
            var idExamen = 0;
            using (SqlConnection conn = new SqlConnection(cs))
            {
                conn.Open();
                SqlCommand comm = new SqlCommand("isp_InsertarExamen", conn);
                comm.CommandType = CommandType.StoredProcedure;
                comm.Parameters.AddWithValue("@NombreExamen", nombre);
                comm.Parameters.AddWithValue("@Descripcion", descripcion);
                SqlDataReader rdr = comm.ExecuteReader();
                if (rdr.HasRows)
                {
                    if (rdr.Read())
                    {
                        idExamen = Convert.ToInt32(rdr["Id_Examen"]);
                    }
                }
                conn.Close();
            }

            return idExamen;
        }

        public int LeerPreguntasExcel(ExcelQueryFactory excel, int grupo, int idExamen)
        {
            var contador = 0;
            var correcto = 0;
            var preguntas = (from fila in excel.Worksheet("Hoja1")
                             let item = new Tbl_Pregunta
                             {
                                 Pregunta = fila[0].Cast<string>(),
                                 Respuesta = fila[1].Cast<string>(),
                                 Retroalimentacion = fila[2].Cast<string>() ?? ""
                             }
                             select item).ToList();

            for (int i = 0; i < preguntas.Count; i++)
            {
                contador++;
                preguntas[i].Grupo = grupo + contador;
                preguntas[i].IdExamen = idExamen;
                if (preguntas[i].Pregunta != null)
                {
                    correcto = GuardarPreguntas(preguntas[i]);
                }
            }
            //return 1;
            return correcto;
        }

        public void LeerRespuestasExcel(ExcelQueryFactory excel, int grupo)
        {
            var contador = 1;
            var veces = 1;
            var respuestas = (from fila in excel.Worksheet("Hoja2")
                              let item2 = new Tbl_Respuesta
                              {
                                  Opcion = fila[0].Cast<string>(),
                                  Respuesta = fila[1].Cast<string>()
                              }
                              select item2).ToList();

            var idRespuesta = ConsultarTotalRespuestas();

            for (int j = 0; j < respuestas.Count; j++)
            {
                if (veces <= 3)
                {
                    respuestas[j].Grupo = grupo + contador;
                    idRespuesta++;
                    respuestas[j].IdRespuesta = idRespuesta;
                    if (respuestas[j].Opcion != null)
                    {
                        GuardarRespuestas(respuestas[j]);
                    }
                    veces++;
                }
                else
                {
                    contador++;
                    respuestas[j].Grupo = grupo + contador;
                    idRespuesta++;
                    respuestas[j].IdRespuesta = idRespuesta;
                    if (respuestas[j].Opcion != null)
                    {
                        GuardarRespuestas(respuestas[j]);
                    }
                    veces = 2;
                }
            }
        }

        public int GuardarPreguntas(Tbl_Pregunta pregunta)
        {
            var row = 0;
            using (SqlConnection conn = new SqlConnection(cs))
            {
                conn.Open();
                SqlCommand comm = new SqlCommand("isp_GuardarPreguntas", conn);
                comm.CommandType = CommandType.StoredProcedure;
                comm.Parameters.AddWithValue("@Grupo", pregunta.Grupo);
                comm.Parameters.AddWithValue("@Pregunta", pregunta.Pregunta);
                comm.Parameters.AddWithValue("@Respuesta", pregunta.Respuesta);
                comm.Parameters.AddWithValue("@Id_Examen", pregunta.IdExamen);
                comm.Parameters.AddWithValue("@Retroalimentacion", pregunta.Retroalimentacion);
                row = comm.ExecuteNonQuery();
                conn.Close();
            }
            return row;
        }

        public void GuardarRespuestas(Tbl_Respuesta respuesta)
        {
            using (SqlConnection conn = new SqlConnection(cs))
            {
                conn.Open();
                SqlCommand comm = new SqlCommand("isp_GuardarRespuestas", conn);
                comm.CommandType = CommandType.StoredProcedure;
                comm.Parameters.AddWithValue("@Id_Respuesta", respuesta.IdRespuesta);
                comm.Parameters.AddWithValue("@Grupo", respuesta.Grupo);
                comm.Parameters.AddWithValue("@Opcion", respuesta.Opcion);
                comm.Parameters.AddWithValue("@Respuesta", respuesta.Respuesta);
                comm.ExecuteNonQuery();
                conn.Close();
            }
        }

        public void EliminarExamen(int idExamen)
        {
            EncuestasDB obj = new EncuestasDB();
            var preguntas = obj.ObtenerPreguntasEvaluacion(idExamen);
            for (int i = 0; i < preguntas.Count; i++)
            {
                EliminarRespuestas(preguntas[i].Grupo);
            }
            using (SqlConnection conn = new SqlConnection(cs))
            {
                conn.Open();
                SqlCommand comm = new SqlCommand("dsp_EliminarExamen", conn);
                comm.CommandType = CommandType.StoredProcedure;
                comm.Parameters.AddWithValue("@Id_Examen", idExamen);
                comm.ExecuteNonQuery();
                conn.Close();
            }

        }

        public void EliminarRespuestas(int grupo)
        {
            using (SqlConnection conn = new SqlConnection(cs))
            {
                conn.Open();
                SqlCommand comm = new SqlCommand("dsp_EliminarRespuestas", conn);
                comm.CommandType = CommandType.StoredProcedure;
                comm.Parameters.AddWithValue("@Grupo", grupo);
                comm.ExecuteNonQuery();
                conn.Close();
            }
        }

        public int ConsultarTotalRespuestas()
        {
            var total = 0;
            using (SqlConnection conn = new SqlConnection(cs))
            {
                conn.Open();
                SqlCommand comm = new SqlCommand("ssp_ConsultarTotalRespuestas", conn);
                comm.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = comm.ExecuteReader();
                if (rdr.HasRows)
                {
                    if (rdr.Read())
                    {
                        total = Convert.ToInt32(rdr["Total"]);
                    }
                }
                conn.Close();
            }

            return total;
        }


        public List<tbl_Curso> CargarTotalCursos()
        {
            List<tbl_Curso> lst = new List<tbl_Curso>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_ObtenerTotalCursos", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Curso
                    {

                        Id_curso = Convert.ToInt32(rdr["Id_curso"]),
                        Nombre_Curso = rdr["Nombre_curso"].ToString(),
                    });
                }
                con.Close();

            }
            return lst;
        }

        ///////////////////////////////////////CARGAR CURSOS ASIGNADOS
        public List<CursoConArchivos> CargarCursosAsignados(string Usuario, int id)
        {
            List<CursoConArchivos> lst = new List<CursoConArchivos>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_ObtenerCursoAsignado2", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Usuario", Usuario);
                com.Parameters.AddWithValue("@IdCurso", id);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new CursoConArchivos
                    {
                        Id_curso = Convert.ToInt32(rdr["Id_curso"]),
                        Nombre_Curso = rdr["Nombre_curso"].ToString(),
                        Descripcion = rdr["Descripcion"].ToString(),
                        Estatus = Convert.ToInt32(rdr["EstadoFinal"])

                    });
                }
                con.Close();
                for (int i = 0; i < lst.Count; i++)
                {
                    lst[i].Archivos = CargarArchivosEstatus(lst[i].Id_curso, Usuario);
                }
            }
            return lst;
        }

        public List<tbl_Archivo> CargarArchivosEstatus(int idCurso, string Usuario)
        {
            List<tbl_Archivo> lst = new List<tbl_Archivo>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_ObtenerContenidosEstatus", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_curso", idCurso);
                com.Parameters.AddWithValue("@Usuario", Usuario);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Archivo
                    {
                        Id_archivo = Convert.ToInt32(rdr["Id_archivo"]),
                        Nombre_archivo = rdr["Nombre_archivo"].ToString(),
                        Tipo = rdr["Tipo"].ToString(),
                        Id_examen = Convert.ToInt32(rdr["Id_examen"]),
                        Estado = rdr["Estado"].ToString(),
                        Tiempo = (rdr["Tiempo"] != DBNull.Value) ? Convert.ToInt32(rdr["Tiempo"]) : 0,
                        ID = Convert.ToInt32(rdr["ID"].ToString())

                    });
                }
                con.Close();
            }
            return lst;
        }

        //Metodo para traer los cursos realizados
        public List<tbl_Curso> CargarArchivosEstatusR(int idCurso, string Usuario)
        {
            List<tbl_Curso> lst = new List<tbl_Curso>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_ObtenerContenidosEstatusR", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_CursoA", idCurso);
                com.Parameters.AddWithValue("@Usuario", Usuario);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Curso
                    {
                        //Id_archivo = Convert.ToInt32(rdr["Id_archivo"]),
                        //Nombre_archivo = rdr["Nombre_archivo"].ToString(),
                        //Tipo = rdr["Tipo"].ToString(),
                        //Id_examen = Convert.ToInt32(rdr["Id_examen"]),
                        //Estado = rdr["Estado"].ToString(),
                        //Tiempo = (rdr["Tiempo"] != DBNull.Value) ? Convert.ToInt32(rdr["Tiempo"]) : 0,
                        //ID = Convert.ToInt32(rdr["ID"].ToString())
                        Nombre_Curso = rdr["Nombre_Curso"].ToString(),
                        FechaRealizado = Convert.ToDateTime(rdr["FInsersion"]).ToString("dd/MM/yyyy"),
                        Score =(rdr["Calificacion"] != DBNull.Value) ? Convert.ToInt32(rdr["Calificacion"]) : 1,
                        Status = rdr["Estatus"].ToString(),
                        IdExamen = Convert.ToInt32(rdr["Id_examen"]),
                        Id_curso = Convert.ToInt32(rdr["Id_curso"]),
                        Leyenda = (rdr["Leyenda"] != DBNull.Value) ? rdr["Leyenda"].ToString() : "",
                        Descripcion = rdr["Descripcion"].ToString()
                    });
                }
                con.Close();
            }
            return lst;
        }
        public int GuardarEstatus(string NumEmpleado, int IdArchivo, string EstatusVideo, int ID)
        {
            int i = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_GuardarEstatus", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@NumEmpleado", NumEmpleado);
                com.Parameters.AddWithValue("@IdArchivo", IdArchivo);
                com.Parameters.AddWithValue("@EstatusVideo", EstatusVideo);
                com.Parameters.AddWithValue("@ID", ID);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    i = Convert.ToInt32(rdr["Mensaje"]);
                }
            }
            return i;
        }

        public int IntentosEvaluacion(int idexamen, string NumEmpleado, string fecha, int ID)
        {
            int i = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_IntentosEvaluacion", con);
                com.CommandType = CommandType.StoredProcedure;

                com.Parameters.AddWithValue("@idexamen", idexamen);
                com.Parameters.AddWithValue("@usuario", NumEmpleado);
                //DateTime f = Convert.ToDateTime(fecha);

                //string fe = f.Year.ToString() + "-";
                //fe += (f.Month.ToString().Length < 2) ? "0" + f.Month.ToString() + "-" : f.Month.ToString() + "-";
                //fe += (f.Day.ToString().Length < 2) ? "0" + f.Day.ToString()  : f.Day.ToString();

                com.Parameters.AddWithValue("@ID", ID);

                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    if (Convert.ToInt32(rdr["Mensaje"]) == 1)
                    {
                        i = 1;
                    }
                    //i = (rdr["Intentos"] != DBNull.Value) ? Convert.ToInt32(rdr["Intentos"]) : 1;
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
                SqlCommand com = new SqlCommand("ssp_CalificarEvaluacion", con); //--Se utiliza la tabla de tbl_QSegInf_V1_respuestas
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Grupo", r.Grupo);
                com.Parameters.AddWithValue("@IdEvaluacion", r.IdEvaluacion);
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.Read())
                {
                    re.Grupo = Convert.ToInt32(rdr["Grupo"]);
                    re.Respuesta = rdr["Respuesta"].ToString();
                    if (rdr["Retroalimentacion"] == DBNull.Value)
                    {
                        re.Retroalimentacion = "";
                    }
                    else { re.Retroalimentacion = rdr["Retroalimentacion"].ToString(); }

                    re.Score = Convert.ToInt32(rdr["Score"]);
                }
            }
            return re;
        }



        public List<tbl_Curso> CargarCursosRealizados(string Usuario, int id)
        {
            List<tbl_Curso> lst = new List<tbl_Curso>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_CursoRealizado", con);
                com.CommandType = CommandType.StoredProcedure;

                com.Parameters.AddWithValue("@usuario", Usuario);
                com.Parameters.AddWithValue("@IdCurso", id);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Curso
                    {

                        //Nombre_Curso = rdr["Nombre_Curso"].ToString(),
                        //FechaRealizado = Convert.ToDateTime(rdr["FInsersion"]).ToString("dd/MM/yyyy"),
                        //Score = Convert.ToInt32(rdr["Calificacion"]),
                        //Status = rdr["Estatus"].ToString(),
                        //IdExamen = Convert.ToInt32(rdr["Id_examen"]),
                        //Id_curso = Convert.ToInt32(rdr["Id_curso"])
                        Id_CursoA = Convert.ToInt32(rdr["Id_CursoAsignado"])
                    }); ;
                }
                con.Close();
                for (int i = 0; i < lst.Count; i++)
                {
                    lst[i].Curso = CargarArchivosEstatusR(lst[i].Id_CursoA, Usuario);
                }
            }
            return lst;
        }

        //Actualiza si aprobo o no
        public int UpdateEstatus(int IdVariable, string calificacion)
        {
            int i = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_EstatusCurso", con);
                com.CommandType = CommandType.StoredProcedure;

                com.Parameters.AddWithValue("@IdVariable", IdVariable);
                com.Parameters.AddWithValue("@Estatus", calificacion);

                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    i = Convert.ToInt32(rdr["Mensaje"]);
                }
            }
            return i;
        }



        /////////////////////////////-------------------------Metodos para la asignación de cursos

        //Cargar los empleados que pertenecen a la direccion seleccionada
        public List<tbl_Empleados> CargarEmp_Direccion(int id)
        {
            List<tbl_Empleados> lst = new List<tbl_Empleados>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_CargarEmp_Direccion", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@id_direc", id);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Empleados
                    {
                        id_Empleado = Convert.ToInt32(rdr["id_Empleado"]),
                        Nombre_1 = rdr["NombreEmp"].ToString(),
                        NumeroEmpleado = rdr["NumEmpleado"].ToString(),
                        Nombre_2 = rdr["Puesto"].ToString()
                    });
                }
                con.Close();
            }
            return lst;
        }



        //Metodo que trae a los empleados dependiendo de la direccion y del departamento seleccionado
        public List<tbl_Empleados> Cargar_EmpDirecDepart(int id_dir, int id_dep)
        {
            List<tbl_Empleados> lst = new List<tbl_Empleados>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                //string sql = "select concat(Nombre_1,' ',Nombre_2,' ',APaterno,' ',AMaterno) as NombreEmp,id_Empleado, NumEmpleado, p.Puesto from tbl_empleados e inner join cat_Puestos p on e.Puesto = p.id_Puesto where IdDireccion = " + id_dir+" and IdDepartamento =" + id_dep;
                con.Open();
                SqlCommand com = new SqlCommand("ssp_Cargar_EmpDirecDepart", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@id_dir", id_dir);
                com.Parameters.AddWithValue("@id_dep", id_dep);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Empleados
                    {
                        id_Empleado = Convert.ToInt32(rdr["id_Empleado"]),
                        Nombre_1 = rdr["NombreEmp"].ToString(),
                        NumeroEmpleado = rdr["NumEmpleado"].ToString(),
                        Nombre_2 = rdr["Puesto"].ToString()
                    });
                }
            }
            return lst;
        }

        //Metodo que trae los empleados de acuerdo a la campaña
        public List<tbl_Empleados> Cargar_EmpCamp(int camp)
        {
            List<tbl_Empleados> lst = new List<tbl_Empleados>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                //string sql = "select e.id_Empleado,concat(Nombre_1,' ',Nombre_2,' ',APaterno,' ',AMaterno) as NombreEmp, NumEmpleado, pu.Puesto from tbl_Empleados e inner join tbl_PuestosCamapanas pc on e.id_Empleado = pc.IDEmpleado inner join cat_Puestos pu on e.Puesto = pu.id_Puesto where pc.IDCampana = " + camp;
                con.Open();
                SqlCommand com = new SqlCommand("ssp_Cargar_EmpCamp", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@camp", camp);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Empleados
                    {
                        id_Empleado = Convert.ToInt32(rdr["id_Empleado"]),
                        Nombre_1 = rdr["NombreEmp"].ToString(),
                        NumeroEmpleado = rdr["NumEmpleado"].ToString(),
                        Nombre_2 = rdr["Puesto"].ToString() //Guarda el puesto
                    });
                }
            }

            return lst;
        }

        //Metodo que carga los cursos dependiendo el programa 
        public List<tbl_Curso> Cargar_CursosPrograma(int id)
        {
            List<tbl_Curso> lst = new List<tbl_Curso>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                //string sql = "select c.Id_curso, Nombre_curso from tbl_Curso c inner join tbl_Programa p on c.Id_programa = p.Id_programa where p.Id_programa = "+ id;
                con.Open();
                SqlCommand com = new SqlCommand("ssp_Cargar_CursosPrograma", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@id_programa", id);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Curso
                    {
                        Id_curso = Convert.ToInt32(rdr["Id_curso"]),
                        Nombre_Curso = rdr["Nombre_Curso"].ToString()
                    });
                }
            }
            return lst;
        }

        //Metodo para buscar a un empleado en especifico por su numero de empleado
        public tbl_Empleados Buscar_Emp(string num_emp)
        {
            tbl_Empleados emp = new tbl_Empleados();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_BuscarEmp", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@num_emp", num_emp);
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        emp.id_Empleado = Convert.ToInt32(rdr["id_Empleado"]);
                        emp.Nombre_1 = rdr["NombreEmp"].ToString();
                        emp.NumeroEmpleado = rdr["NumEmpleado"].ToString();
                        emp.Nombre_2 = rdr["Puesto"].ToString();
                    }
                }
                else
                {
                    emp.id_Empleado = 0;
                }
            }
            return emp;
        }
        //Metodo que inserta en la tabla de [tbl_CursosAsignados] para asignar un curso
        public int Asignar_Curso(int id_curso, string usuario, string capacitador)
        {
            int c = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                //string sql = "insert into tbl_CursosAsignados (Id_curso,Usuario,Estatus,Capacitador,FInsertado) values ("+id_curso+","+Id_emp+",0,"+capacitador+",GETDATE())";
                con.Open();
                SqlCommand com = new SqlCommand("isp_Asignar_Curso2", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@id_curso", id_curso);
                com.Parameters.AddWithValue("@usuario", usuario);
                com.Parameters.AddWithValue("@capacitador", capacitador);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    c = Convert.ToInt32(rdr["resp"]);
                }
                //c += com.ExecuteNonQuery();
            }
            return c;
        }

        public List<CursosConCalificacion> CargarCursosConCalificacion(FiltroCursos filtro)
        {
            List<CursosConCalificacion> lst = new List<CursosConCalificacion>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_CargarCursosConCalificacion", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@IdCurso", filtro.IdCurso);
                if (filtro.FechaInicio != "31/12/1900")
                {
                    com.Parameters.AddWithValue("@FechaInicio", filtro.FechaInicio);
                }
                else
                {
                    com.Parameters.AddWithValue("@FechaInicio", DBNull.Value);
                }
                if (filtro.FechaFin != "31/12/1900")
                {
                    com.Parameters.AddWithValue("@FechaFin", filtro.FechaFin);
                }
                else
                {
                    com.Parameters.AddWithValue("@FechaFin", DBNull.Value);
                }
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new CursosConCalificacion
                    {
                        NumEmpleado = rdr["NumEmpleado"].ToString(),
                        RFC = rdr["RFC"].ToString(),
                        NombreCompleto = rdr["Nombre"].ToString(),
                        Puesto = rdr["Puesto"].ToString(),                      
                        Turno = (rdr["Turno"] != DBNull.Value) ? rdr["Turno"].ToString() : "",
                        Supervisor = (rdr["Supervisor"] != DBNull.Value) ? rdr["Supervisor"].ToString() : "",
                        Campana = (rdr["Campania"] != DBNull.Value) ? rdr["Campania"].ToString() : "",
                        Calificacion = Convert.IsDBNull(rdr["Calificacion"]) ? 0 : Convert.ToInt32(rdr["Calificacion"]),
                        FechaCertificado = Convert.IsDBNull(rdr["Calificacion"]) ? "" : (Convert.ToInt32(rdr["Calificacion"]) >= 80 ? rdr["Tiempofin"].ToString().Substring(0,10) : ""),
                        Aprobado = Convert.IsDBNull(rdr["Calificacion"]) ? "NO APROBADO" : (Convert.ToInt32(rdr["Calificacion"]) >= 80 ? "APROBADO" : "NO APROBADO"),
                        Curso = rdr["Curso"].ToString(),
                        FechaIngreso = (rdr["FechaIngreso"] != DBNull.Value) ? rdr["FechaIngreso"].ToString() : "",
                        Antiguedad = (rdr["Antiguedad"] != DBNull.Value) ? rdr["Antiguedad"].ToString() : "",
                        Leyenda = (rdr["Leyenda"] != DBNull.Value) ? rdr["Leyenda"].ToString() : "",
                        Tipo = (rdr["Tipo"] != DBNull.Value) ? rdr["Tipo"].ToString() : "",
                        Descripcion=rdr["Descripcion"].ToString()
                    }) ;
                }
            }
            var listaSinRepetidos = lst.GroupBy(x => x.NumEmpleado).Select(y=>y.FirstOrDefault()).ToList();
            return listaSinRepetidos;
        }

        //Metodo que trae las calificaciones por numero de empleado
        public List<CursosConCalificacion> CargarCursosConCalificacionxNumEmp(string NumEmp, string RFC)
        {
            
            List<CursosConCalificacion> lst = new List<CursosConCalificacion>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_CalificacionXUsuario", con);
                com.CommandType = CommandType.StoredProcedure;
                if (NumEmp == "" || NumEmp == null)
                {
                    com.Parameters.AddWithValue("@Usuario", DBNull.Value);
                }
                else
                {
                 
                    com.Parameters.AddWithValue("@Usuario", NumEmp);
                }

                if (RFC != "" || RFC != null)
                {
                    com.Parameters.AddWithValue("@RFC", RFC);
                }
                else
                {
                    com.Parameters.AddWithValue("@RFC", DBNull.Value);
                }
            
              
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new CursosConCalificacion
                    {
                        NumEmpleado = rdr["NumEmpleado"].ToString(),
                        RFC = rdr["RFC"].ToString(),
                        NombreCompleto = rdr["Nombre"].ToString(),
                        //Puesto = rdr["Puesto"].ToString(),
                        //Turno = rdr["Turno"].ToString(),
                        //Supervisor = rdr["Supervisor"].ToString(),
                        //Campana = rdr["Campania"].ToString(),
                        Calificacion = Convert.IsDBNull(rdr["Calificacion"]) ? 0 : Convert.ToInt32(rdr["Calificacion"]),

                        FechaCertificado = Convert.IsDBNull(rdr["Calificacion"]) ? "" : (Convert.ToInt32(rdr["Calificacion"]) >= 80 ? rdr["Tiempofin"].ToString().Substring(0,10) : ""),
                        Aprobado = Convert.IsDBNull(rdr["Calificacion"]) ? "NO APROBADO" : (Convert.ToInt32(rdr["Calificacion"]) >= 80 ? "APROBADO" : "NO APROBADO"),
                        Curso = rdr["Curso"].ToString(),
                        Leyenda = (rdr["Leyenda"] != DBNull.Value) ? rdr["Leyenda"].ToString() : "",
                        Tipo = (rdr["Tipo"] != DBNull.Value) ? rdr["Tipo"].ToString() : "",
                        Descripcion = rdr["Descripcion"].ToString()
                    }) ;
                }
            }
            //var listaSinRepetidos = lst.GroupBy(x => x.NumEmpleado).Select(y=>y.FirstOrDefault()).ToList();
            return lst;
        }

        //Busqueda de curso mas reciente aprovado por numero de empleado
        public FiltroCursos BusquedaCursoxNumEmp(string NumEmp)
        {
            FiltroCursos f = new FiltroCursos();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_ObtenerInfoCursoFecha", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@NumEmpleado", NumEmp);
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        f.IdCurso = Convert.ToInt32(rdr["Id_Evaluacion"].ToString());
                        f.Nom_curso = rdr["Curso"].ToString();
                        f.FechaInicio = Convert.ToDateTime(rdr["TiempoInicio"]).ToString("yyyy/MM/dd hh:mm:ss.fff");
                        f.FechaFin = Convert.ToDateTime(rdr["TiempoFin"]).ToString("yyyy/MM/dd hh:mm:ss.fff");
                    }
                }
            }
                return f;
        }

        //Envia los datos a actualizar 

    public int ActualizarFechasCursos(FiltroCursos fi)
        {
            int i = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CambiarFechaCurso", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_Evaluacion", fi.IdCurso);
                com.Parameters.AddWithValue("@TiempoInicio", fi.FechaInicio);
                com.Parameters.AddWithValue("@TiempoFin", fi.FechaFin);
                SqlDataReader rdr = com.ExecuteReader();

                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        if (Convert.ToInt32(rdr["Mensaje"].ToString()) == 1)
                        {
                            i = 1;
                        }
                    }
                }
            }
                return i;
        }

        //Metodo para asignar cursos a generadores, de manera masiva
        public List<tbl_Empleados> Lista_AsigarCurso_Generadores()
        {
            List<tbl_Empleados> lst = new List<tbl_Empleados>();
            string query = "select id_Empleado from tbl_Empleados where cast(FInsercion as date) = '2021/12/13'";
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand(query,con);
                com.CommandType = CommandType.Text;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Empleados
                    {
                        id_Empleado = Convert.ToInt32(rdr["id_Empleado"])
                    }) ;
                }
            }
                return lst;
        }

        //metodo para traer lista de tipo de curso
        public List<cat_tipo_curso> CargarTipoCurso()
        {
            List<cat_tipo_curso> lst = new List<cat_tipo_curso>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("select * from cat_tipo_curso", con);
                com.CommandType = CommandType.Text;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_tipo_curso
                    {
                        id_tipo_curso = Convert.ToInt32(rdr["id_tipo_curso"]),
                        Tipo = rdr["Tipo"].ToString()
                    });
                }
            }
                return lst;
        }
    }
}