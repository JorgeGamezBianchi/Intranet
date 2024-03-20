using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MED.Models
{
    public class Capacitacion
    {
    }
    [Table("tbl_RespuestasCampanias")]
    public class tbl_RespuestasCampanias
    {
        public int Id_respuesta { get; set; }

        public int Id_Examen { get; set; }

        public int RespuestaUser { get; set; }

        public int Audio { get; set; }

        public int RespuestaCorrecta { get; set; }

        public int Campania { get; set; }
    }

    [Table("cat_Respuestas")]
    public class cat_Respuestas
    {
        public int Code { get; set; }

        public string Descripcion { get; set; }
    }

    [Table("cat_Audio")]
    public class cat_Audio
    {
        public int Id_audio { get; set; }

        public string Audio { get; set; }

        public int RespuestaCorrecta { get; set; }
    }

    [Table("tbl_QSegInf_Respuestas_Usuarios")]
    public class tbl_QSegInf_Respuestas_Usuarios
    {
        public int IDrespuesta { get; set; }

        public int Id_Examen { get; set; }

        public int Grupo { get; set; }

        public string Opcion { get; set; }

        public string RespuestaCorrecta { get; set; }
    }

    [Table("tbl_Examenes")]
    public class tbl_Examenes
    {
        public int ID { get; set; }

        public int Id_Examen { get; set; }

        public int NumEmpleado { get; set; }

        public string FechaInsercion { get; set; }

        public string NumEmpleadoRH { get; set; }

        public string Tiempo { get; set; }

        public int IdCampana { get; set; }

        public int IdDepartamento { get; set; }
    }

    public class retro
    {
        public int Grupo { get; set; }
        public int IdEvaluacion { get; set; }
        public int Score { get; set; }

        public string Respuesta { get; set; }

        public string Descripcion { get; set; }
        public string Retroalimentacion { get; set; }
    }
}