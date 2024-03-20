using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Web;

namespace MED.Models
{
    [Table("tbl_Programa")]
    public class tbl_Programa
    {
        public int Id_programa { get; set; }
        public string Nombre { get; set; }
        public string NombreEmpleado { get; set; }
        public DateTime FechaInsercion { get; set; }
    }

    [Table("tbl_Curso")]
    public class tbl_Curso
    {
        public int Id_curso { get; set; }
        public int ID { get; set; }
        public int Id_programa { get; set; }
        public int Score { get; set; }
        public int IdExamen { get; set; }
        public string Nombre_Curso { get; set; }
        public string Descripcion { get; set; }
        public string Status { get; set; }
        public string FechaRealizado { get; set; }
        public List<tbl_Archivo> Archivos { get; set; }
        public List<tbl_Curso> Curso { get; set; }
        public int Id_CursoA { get; set; }
        public String Leyenda { get; set; }
    }

    [Table("tbl_Archivo")]
    public class tbl_Archivo
    {
        public int ID { get; set; }
        public int Id_archivo { get; set; }
        public int Id_curso { get; set; }
        public string Nombre_archivo { get; set; }
        public string Ruta { get; set; }
        public string Tipo { get; set; }
        public int Id_examen { get; set; }
        public int IdExamen { get; set; }
        public string Estado { get; set; }
        public int Tiempo { get; set; }
    }

    public class list_Programas
    {
        public List<tbl_Programa> Programas { get; set; }
    }

    public class List_CursosRealizados
    {
        public List<tbl_Curso> CursosRealizados { get; set; }
    }

    public class CursoArchivo
    {
        public int Id_programa { get; set; }
        public int Id_curso { get; set; }
        public string Nombre_Curso { get; set; }
        public string Descripcion { get; set; }
        public List<int> Tiempo { get; set; }
        public List<HttpPostedFileBase> File { get; set; }
        public int TiempoAct { get; set; }
        
        public HttpPostedFileBase Actividad { get; set; }
        public string HostInit { get; set; }
        public int id_tipo_curso { get; set; }
        public string Leyenda { get; set; }
        public int ActividadBit { get; set; }
    }

    public class CursoConArchivos
    {
        public int Id_curso { get; set; }
        public string Nombre_Curso { get; set; }
        public string Nombre_Archivo { get; set; }
        public string Descripcion { get; set; }
        public List<tbl_Archivo> Archivos { get; set; }
        public string Usuario { get; set; }
        public int Estatus { get; set; }
        public List<tbl_Curso> Cursos { get; set; }

    }
  


    public class Tbl_Pregunta
    {
        public string Pregunta { get; set; }
        public string Respuesta { get; set; }
        public int Grupo { get; set; }
        public int IdExamen { get; set; }
        public string Retroalimentacion { get; set; }
    }

    public class Tbl_Respuesta
    {
        public int IdRespuesta { get; set; }
        public string Opcion { get; set; }
        public string Respuesta { get; set; }
        public int Grupo { get; set; }
    }

    public class CursosConCalificacion
    {
        public int IdEvaluacion { get; set; }
        public string NumEmpleado { get; set; }
        public string RFC { get; set; }
        public string NombreCompleto { get; set; }
        public string Puesto { get; set; }
        public string Turno { get; set; }
        public string Supervisor { get; set; }
        public string FechaIngreso { get; set; }
        public string Antiguedad { get; set; }
        public string Campana { get; set; }
        public double Calificacion { get; set; }
        public string FechaCertificado { get; set; }
        public string Aprobado { get; set; }
        public string Curso { get; set; }
        public string Leyenda { get; set; }
        public string Tipo { get; set; }
        public string Descripcion { get; set; }
    }

    public class ListCursos
    {
        public List<tbl_Curso> Cursos { get; set; }
    }

    public class FiltroCursos
    {
        public int IdCurso { get; set; }
        public string FechaInicio { get; set; }
        public string FechaFin { get; set; }
        public string NumEmp { get; set; }
        public string RFC { get; set; }
        public string Nom_curso { get; set; }

    }

    public class cat_tipo_curso
    {
        public int id_tipo_curso { get; set; }
        public string Tipo { get; set; }
    }

    public class List_tipo_curso
    {
        public List<cat_tipo_curso> TipoCursos { get; set; }
    }
}