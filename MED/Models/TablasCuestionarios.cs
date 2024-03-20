using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Services.Description;

namespace MED.Models
{
    public class TablasCuestionarios
    {
        [Table("cat_Seccion")]
        public class cat_Seccion
        {
            public int Id_seccion { get; set; }

            public string Seccion { get; set; }

            //Para cargar las preguntas 

            public int Id_pregunta { get; set; }

            public string Pregunta { get; set; }
        }

        [Table("cat_GuiaRef1")]
        public class cat_GuiaRef1
        {
            public int Id_pregunta { get; set; }

            public int Id_seccion { get; set; }

            public string Pregunta { get; set; }
        }

        [Table("tbl_GuiaRef1")]
        public class tbl_GuiaRef1
        {
            public int Id_cuestionario { get; set; }

            public int Id_empleado { get; set; }

            public int Id_campana { get; set; }

            public int Id_puesto { get; set; }

            public string AtencionClinica { get; set; }

            public string Mensaje { get; set; }
        }


        [Table("tbl_ValoresGuiaRef1")]
        public class tbl_ValoresGuiaRef1
        {
            public int Id_cuestionario { get; set; }

            public int Id_pregunta { get; set; }

            public string Respuesta { get; set; }

            public string AtencionClinica { get; set; }

            public int Id_Examen { get; set; }
        }

        public class tbl_EvaluacionPreguntas
        {
            public int IdRespuesta { get; set; }
            public int Grupo { get; set; }
            public string Pregunta { get; set; }
            public string Respuesta { get; set; }
        }

        public class tbl_EvaluacionRespuestas
        {
            public int Grupo { get; set; }
            public string Opcion { get; set; }
            public string Respuesta { get; set; }
        }

        public class EvaluacionCompleta
        {
            public List<tbl_EvaluacionPreguntas> Preguntas { get; set; }
            public List<tbl_EvaluacionRespuestas> Respuestas { get; set; }
        }

        public class Iniciar
        {
            public string NumeroEmpleado { get; set; }
            public int IdExamen { get; set; }
        }

        //Clases para la evaluacion de clima laboral 2020
        public class tbl_EncustaAmbienteLaboral
        {
            public int Id_Encuesta { get; set; }

            public int Id_Examen { get; set; }

            public int Id_Empleado { get; set; }

            public int Id_Campana { get; set; }

            public string FechaI { get; set; }
            public int Genero { get; set; }

            public string Edad { get; set; }
            public int Direccion { get; set; }

            public int Departamento { get; set; }

            public int EstadoCivil { get; set; }
        }

        //Tabla de tbl_ClimaLaboral_Dic2021

        public class tbl_ClimaLaboral_Dic2021
        {
            public int Id_Examen { get; set; }
            public int Id_Empleado { get; set; }
            public string Genero { get; set; }
            public string Edad { get; set; }
            public string Nivel_estudio { get; set; }
            public string Centro { get; set; }
            public string Turno { get; set; }
            public string Antiguedad { get; set; }
            public string Staff { get; set; }
            public string RVT { get; set; }
            public string Jefe_inmediato { get; set; }
            public string Fecha_I { get; set; }
        }

        public class cat_PreguntasAmbienteLaboral
        {
            public int Id_Pregunta { get; set; }
            public int Factor { get; set; }
            public string Pregunta { get; set; }
        }

        public class tbl_RespuestasAmbienteLaboral
        {
            public int Id_Encuesta { get; set; }
            public int Id_Pregunta { get; set; }
            public string Respuesta { get; set; }
        }
    } 
}
