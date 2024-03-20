using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MED.Models
{

    public class Tbl_Cuenta
    {
        public int IdBP { get; set; }
        public int IdFrase { get; set; }
        public string Aplicacion { get; set; }
        public string Usuario { get; set; }
        public string Pass { get; set; }
    }
    public class Tbl_Frase
    {
        public int IdFrase { get; set; }
        public int NumEmpleado { get; set; }
        public string Frase { get; set; }

    }

    public class ListaCuentas
    {
        public List<Tbl_Cuenta> Cuentas { get; set; }
    }
}