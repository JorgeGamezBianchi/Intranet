using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MED.Models
{
    public class tbl_Horarios
    {
        public int idH { get; set; }

        public int Id_Empleado {get; set;}

        public int NumEmp { get; set; }

        public string Dias_labora { get; set; }

        public string Turno { get; set; }

        public string Entrada { get; set; }

        public string Salida { get; set; }
    }
}