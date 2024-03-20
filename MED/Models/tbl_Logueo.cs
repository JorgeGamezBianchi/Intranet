using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MED.Models
{
    [Table("tbl_Logueo")]
    public class tbl_Logueo
    {

        public int Id_usuario { get; set; }

        public int Id_tipo_u { get; set; }

        [StringLength(25)]
        public string usuario { get; set; }

        [StringLength(20)]
        public string Pass { get; set; }

        [StringLength(20)]
        public string NewPass { get; set; }

        public int Id_status { get; set; }

        public DateTime Fecha_actualizada { get; set; }

        public DateTime Fecha_caducar { get; set; }

        public int opcion { get; set; }

        public string Nombre1 { get; set; }

        public string Nombre2 { get; set; }

        public string APaterno { get; set; }

        public string AMaterno { get; set; }

        public string fecha { get; set; }

        public int Id_RVT { get; set; }

        public int id_puesto { get; set; }

        public int BitActualizar { get; set; }

        public int RolUsuario { get; set; }
    }


}