using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;

namespace MED.Models
{
    public class ServiciosGenerales
    {
    }
    //Aquellos atributos con una "R" al final son ocupados para los reportes
    [Table("tbl_BitacorasRondines")]
    public class tbl_BitacorasRondines
    {
        public int IdR { get; set; }

        public string Usuario { get; set; }

        public string MotivoCaptura { get; set; }

        public int Reporta { get; set; }

        public string FechaInsercion { get; set; }

        public string Actividad_Incidencia { get; set; }

        public string Persona { get; set; }

        public int Direccion { get; set; }

        public int Departamento { get; set; }

        public int Campana { get; set; }

        public string FechaIncidente { get; set; }

        public string Hora { get; set; }

        public string Observaciones { get; set; }

        public string Fechainicio { get; set; }

        public string Fechafin { get; set; }

        public string DireccionR { get; set; }

        public string DepartamentoR { get; set; }

        public string CampanaR { get; set; }

        public string ReportaR { get; set; }
    }

    [Table("tbl_RevisionRondines")]
    public class tbl_RevisionRondines
    {
        public int Id_Revision { get; set; }

        public int IdR { get; set; }

        public string Usuario { get; set;}

        public int Revision { get; set; }

        public string FechaRevision { get; set; }
    }
    [Table("tbl_HomeOffice")]
    public class tbl_HomeOffice
    {
        public int Id_Empleado { get; set; }

        public string P1 { get; set; }
        public string P2 { get; set; }
        public string P3 { get; set; }
        public string P4 { get; set; }

        public string Telefono { get; set; }

        public int Id_campana { get; set; }
    }

    [Table("tbl_SolicitudCompras")]

    public class tbl_SolicitudCompras
    {
        public int Id { get; set; }

        public string FolioCompra { get; set; }

        public int Solicitante { get; set; }

        public int Direccion { get; set; }

        public int Departamento { get; set; }

        public int Tipo { get; set; }

        public int Subtipo { get; set; }

        public string Razon { get; set; }

        public int Aturizacion { get; set; }

        public string FechaRequesicion { get; set; }

        public string Prioridad { get; set; }
    }

    [Table("cat_TipoCompra")]
    public class cat_TipoCompra
    {
        public int Id { get; set; }

        public string Tipo { get; set; }

        public int Autorizacion { get; set; }
    }
    [Table("cat_SubtipoCompra")]
    public class cat_SubtipoCompra
    {
        public int Id { get; set; }

        public string subtipo { get; set; }

        public int Tipo { get; set; }
    }

    public class SolicitudPendiente
    {
        public string Folio { get; set; }
        public string Solicitante { get; set; }
        public DateTime FechaSolicitud { get; set; }
        public string Descripcion { get; set; }
        public string Prioridad { get; set; }
    }

    public class ListaSolicitudes
    {
        public List<SolicitudPendiente> Solicitud { get; set; }
    }
}