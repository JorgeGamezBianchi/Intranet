using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;

namespace MED.Models
{
    [Table("tbl_Empleados")]
    public class Reportes
    {
        public int id_Empleado { get; set; }

        public int NumeroEmpleado { get; set; }

        public string Site { get; set; }

        public string IMSS { get; set; }

        public string Puesto { get; set; }

        public string IdDepartamento { get; set; }

        public string APaterno { get; set; }

        public string AMaterno { get; set; }

        public string Nombre_1 { get; set; }

        public string Nombre_2 { get; set; }

        public string Recluto { get; set; }

        public string  Genero { get; set; }

        public string RFC { get; set; }

        public string Homoclave { get; set; }

        public string CURP { get; set; }

        public string FNacimiento { get; set; }

        public string FIngreso { get; set; }

        public string FBaja { get; set; }

        public string Turno { get; set; }

        public string NumeroCuenta { get; set; }

        public string CLABE { get; set; }

        public string Banco { get; set; }

        public string TelefonoFijo { get; set; }

        public string TelefonoMovil { get; set; }

        public string ElaboroContrato { get; set; }

        public string Diagnostico { get; set; }

        public String Edad { get; set; }

        public string PrimerEmpleo { get; set; }

        public string ExperienciaEnCallCenter { get; set; }

        public string EstadoCivil { get; set; }

        public string Hijos { get; set; }

        public string UltimoGradoEstudios { get; set; }

        public string Especialidad { get; set; }

        public string FuenteReclutamiento { get; set; }

        public string CapturaPlantilla { get; set; }

        public string FAltaIMSS { get; set; }

        public string Estatus { get; set; }

        public string FInsercion { get; set; }

        public string Calle { get; set; }

        public string Numero { get; set; }

        public string Colonia { get; set; }

        public string Delegacion { get; set; }

        public string Ciudad { get; set; }

        public string CP { get; set; }

        public string Direccion { get; set; }

        public string FFirmaBaja { get; set; }

        public string TipoBaja { get; set; }

        public string MotivoBaja { get; set; }

        public string Observaciones { get; set; }

        public string TelefonoContacto { get; set; }

        public string AutorizoBaja { get; set; }

        public string Fechainicio { get; set; }

        public string Fechafin { get; set; }

        public int DiasT { get; set; }

        public int tipoReporte { get; set; }

        public string numUsuario { get; set; }

        public string usuario { get; set; }

        public string MotivoBaja1 { get; set; }

        public string Dias_labora { get; set; }

        public string TurnoH { get; set; }

        public string Entrada { get; set; }

        public string Salida { get; set; }

        public string IDDireccion { get; set; }

        public string Descripcion { get; set; }

        public string Sdo_Diario_Asimilados { get; set; }

        public string SueldoDiario { get; set; }

        public string Campania { get; set; }

        public string TipoNomina { get; set; }
    }

    [Table("cat_Motivo")]
    public class cat_Motivo2
    {
        public int Id_Motivo { get; set; }
        public string Motivo { get; set; }
    }

    [Table("cat_TipoBaja")]
    public class cat_TipoBaja2
    {
        public int Id_TipoBaja { get; set; }
        public string TipoBaja { get; set; }
    }

    [Table("tbl_Usuarios")]
    public class tbl_Usuarios
    {
        public int Id_usuario { get; set; }

        public string Usuario { get; set; }

        public string Nombre { get; set; }

        public string Ape_pat { get; set; }

        public string Ape_mat { get; set; }
    }

    public class Tbl_EncuestaSalida
    {
        public int IdEntrevista { get; set; }
        public int NoEmpleado { get; set; }
        public string NombreCompleto { get; set; }
        public string MotivoBaja { get; set; }
        public string OtroMotivo { get; set; }
        public string Pregunta1 { get; set; }
        public string Pregunta2 { get; set; }
        public string Pregunta3 { get; set; }
        public string Pregunta4 { get; set; }
        public string Pregunta5 { get; set; }
        public string Pregunta6 { get; set; }
        public string Pregunta7 { get; set; }
        public string Pregunta8 { get; set; }
        public string Pregunta9 { get; set; }
        public string Pregunta10 { get; set; }
        public string Pregunta11 { get; set; }
        public string Pregunta12 { get; set; }
        public string Pregunta13 { get; set; }
        public string Pregunta14 { get; set; }
        public string Pregunta15 { get; set; }
        public string Pregunta16 { get; set; }
        public string Pregunta17 { get; set; }
        public string Pregunta18 { get; set; }
        public string Pregunta19 { get; set; }
        public string Pregunta20 { get; set; }
        public string Pregunta21 { get; set; }
        public string Pregunta22 { get; set; }
        public string Pregunta23 { get; set; }
        public string Pregunta24 { get; set; }
        public string Pregunta25 { get; set; }
        public string Pregunta26 { get; set; }
        public string Pregunta27 { get; set; }
        public string Pregunta28 { get; set; }
        public string Pregunta29 { get; set; }
        public string Pregunta30 { get; set; }
        public string Pregunta31 { get; set; }
        public string Pregunta32 { get; set; }
        public string Pregunta33 { get; set; }
        public string Pregunta34 { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string UltimoDiaLaborado { get; set; }
    }

    public class DatosEntrevistador
    {
        public int IdEntrevista { get; set; }
        public int NumEmpleado { get; set; }
        public DateTime UltimoDiaLaborado { get; set; }
        public string Comentarios { get; set; }
    }
}