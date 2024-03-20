using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Services.Description;

namespace MED.Models
{
    [Table("tbl_Empleados")]
    public class tbl_Empleados
    {
        public int id_Empleado { get; set; }

        public string NumeroEmpleado { get; set; }

        public int Site { get; set; }

        public string IMSS { get; set; }

        public int Puesto { get; set; }

        public int IdDepartamento { get; set; }

        public string APaterno { get; set; }

        public string AMaterno { get; set; }

        public string Nombre_1 { get; set; }

        public string Nombre_2 { get; set; }

        public int Recluto { get; set; }

        public int Genero { get; set; }

        public string RFC { get; set; }

        public string Homoclave { get; set; }

        public string CURP { get; set; }

        public string FNacimiento { get; set; }

        public string FIngreso { get; set; }

        public string FBaja { get; set; }

        public int Turno { get; set; }

        public string NumeroCuenta { get; set; }

        public string CLABE { get; set; }

        public int Banco { get; set; }

        public string TelefonoFijo { get; set; }

        public string TelefonoMovil { get; set; }

        public int ElaboroContrato { get; set; }

        public string Diagnostico { get; set; }

        public string Edad { get; set; }

        public int PrimerEmpleo { get; set; }

        public int ExperienciaEnCallCenter { get; set; }

        public int EstadoCivil { get; set; }

        public int Hijos { get; set; }

        public int UltimoGradoEstudios { get; set; }

        public string Especialidad { get; set; }

        public int FuenteReclutamiento { get; set; }

        public int CapturaPlantilla { get; set; }

        public string FAltaIMSS { get; set; }

        public int Estatus { get; set; }

        public string FInsercion { get; set; }

        public string Calle { get; set; }

        public string Numero { get; set; }

        public string Colonia { get; set; }

        public string Delegacion { get; set; }

        public string Ciudad { get; set; }

        public string CP { get; set; }

        public string FFirmaBaja { get; set; }

        public int TipoBaja { get; set; }
        
        public int MotivoBaja { get; set; }

        public string Observaciones { get; set; }

        public string TelefonoContacto { get; set; }

        public string AutorizoBaja { get; set; }
        
        public string Usuario { get; set; }

        public int Horario { get; set; }

        public int IDDireccion { get; set; }

        public string TipoNomina { get; set; }

        public string Sdo_Diario_Asimilados { get; set; }

        public string Sdo_Diario_IMSS { get; set; }

        public string SueldoDiario { get; set; }

        public int Campania { get; set; }

        public string Celular2 { get; set; }

        public string Enfermedad { get; set; }

        public string OtraEnfermedad { get; set; }

        public string Alergias { get; set; }

        public string AlregiaC { get; set; }

        public string OtroGrado { get; set; }

        public string TituloObtenido { get; set; }

        public string ContactoEmergencia1 { get; set; }

        public string TelefonoEmergencia1 { get; set; }

        public string ContactoEmergencia2 { get; set; }

        public string TelefonoEmergencia2 { get; set; }

        public string PasatiempoFav { get; set; }

        public string DeporteFav { get; set; }

        public string Talento { get; set; }

        public string Instrumento { get; set; }

        public string Antiguedad { get; set; }

        public string OtroTalento { get; set; }
        public string Sdo_quincenal { get; set; }
        public string Infonavit { get; set; }
        public string Fonacot { get; set; }
        public string Pensionado { get; set; }
        public object IdVar { get; internal set; }
    }

    //Lista de empleados
    public class ListEmpleados
    {
        public List<tbl_Empleados> LstEmp { get; set; }
    }

    [Table("tbl_DatosBanEmp")]
    public class tbl_DatosBanEmp
    {
        public int ID { get; set; }

        public int Id_Empleado { get; set; }

        public int Banco { get; set; }

        public string CLABE { get; set; }

        public string NumeroCuenta { get; set; }

        public string TipoNomina { get; set; }

        public string Sdo_Diario_Asimilados { get; set; }

        public string Sdo_Diario_IMSS { get; set; }
    }

    [Table("tbl_ControlPlantilla")]
    public class tbl_ControlPlantilla
    {
        public int Id_Plantilla { get; set; }

        public string Fechainicial { get; set; }

        public string FechaFinal { get; set;  }

        public int IdUsuarioAutorizo { get; set; }

        public int IdPuestoAutorizo { get; set; }

        public int IdCampana { get; set; }

        public int IdEmpleado { get; set;  }

        public int IdPuesto { get; set;  }

        public int IdEmpleadoJefe { get; set;  }

        public int IdPuestoJefe { get; set; }

        public int Estatus { get; set; }

        public int Serie { get; set; }

        public string Fecha { get; set; }

        public string Campana { get; set; }

        //Para cargar a todos los RVTs que seran cambiados de camapaña

        public int IdJerarquia { get; set; }
        
        public string NumEmpleado { get; set; }

        public string CampanaOrigen { get; set; }

        public string RVT { get; set; }

        public string COORDINADORORIGEN { get; set; }

        public string SUPERVISORORIGEN { get; set; }

        public string GERENTEORIGEN { get; set; }

        public string DIRECTORORIGEN { get; set; }

        public int IdCampanaDestino { get; set; }

        public string CampanaDestino { get; set; }

        public int IdSupervisorDestino { get; set; }

        public string SUPERVISORDESTINO { get; set; }

        public int IDCoordinadorDestino { get; set; }

        public string COORDINADORDESTINO { get; set; }

        public int IDGerenteDestino { get; set; }

        public string GERENTEDESTINO { get; set; }

        public int IDDIrectorDestino { get; set; }

        public string DIRECTORDESTINO { get; set; }
    }

    [Table("cat_Generos")]
    public class cat_Generos
    {
        public int Valor { get; set; }

        public string Texto { get; set; }
    }

    [Table("cat_EstadosCiviles")]
    public class cat_EstadosCiviles
    {
        public int id_EstadoCivil { get; set; }

        public string EstadoCivil { get; set; }
    }

    [Table("cat_Estudios")]
    public class cat_Estudios
    {
        public int Id_Estudios { get; set; }

        public String NivelAcademico { get; set; }
    }

    [Table("cat_Bancos")]
    public class cat_Bancos
    {
        public int id_Banco { get; set; }

        public string Banco { get; set; }
    }

    [Table("cat_Plazas")]
    public class cat_Plazas
    {
        public int Id_plaza { get; set; }
        public string Plaza { get; set; }
    }
    [Table("cat_Puestos")]
    public class cat_Puestos
    {
        public int id_Puesto { get; set; }
        public string Puesto { get; set; }
    }

    [Table("cat_Tuernos")]
    public class cat_Turnos
    {
        public int id_Turno { get; set; }
        public string Turno { get; set; }
    }

    [Table("cat_EstatusMED")]
    public class cat_EstatusMED
    {
        public int id_Estatus { get; set; }
        public string EstatusMed { get; set; }
    }

    [Table("cat_FuentesReclutamiento")]
    public class cat_FuentesReclutamiento
    {
        public int id_FuenteReclutamiento { get; set; }
        public string FuenteReclutamiento { get; set; }
    }

    [Table("cat_SiNo")]
    public class cat_SiNo
    {
        public int Valor { get; set; }
        public string Respuesta { get; set; }
    }

    [Table("cat_Proveedor_candidatos")]
    public class cat_Proveedor_candidatos
    {
        public int id_Proveedor { get; set; }
        public string Proveedor { get; set; }
    }

    [Table("cat_estatusReclutamiento")]
    public class cat_estatusReclutamiento
    {
        public int ID_EstatusReclu { get; set; }
        public string Estatus { get; set; }
    }

    [Table("cat_Campanias")]
    public class cat_Campanias
    {
        public int Id_Campania { get; set; }
        public string Campania { get; set; }
    }

    [Table("cat_Diagnostico")]
    public class cat_Diagnostico
    {
        public int id_Diagnostico { get; set; }
        public string Diagnostico { get; set; }
    }

    [Table("cat_Motivo")]
    public class cat_Motivo
    {
        public int Id_Motivo { get; set; }
        public string Motivo { get; set; }
    }

    [Table("cat_TipoBaja")]
    public class cat_TipoBaja
    {
        public int Id_TipoBaja { get; set; }
        public string TipoBaja { get; set; }
    }

    [Table("cat_Direccion")]
    public class cat_Direccion
    {
        public int IDDireccion { get; set; }
        public string Descripcion { get; set; }
    }

    [Table("cat_Departamentos")]
    public class cat_Departamentos
    {
        public int IDDepartamento { get; set; }
        public int IDDireccion { get; set; }
        public string Descripcion { get; set; }
    }
    [Table("tbl_UpdateEmpleados")]
    public class tbl_UpdateEmpleados
    {
        public int Id_Empleado { get; set; }

        public int NumEmpleado { get; set; }

        public int Site { get; set; }

        public int Puesto { get; set; }

        public int IdCampana { get; set; }

        public string NombreCompleto { get; set; }

        //public string AMaterno { get; set; }

        //public string Nombre_1 { get; set; }

        //public string Nombre_2 { get; set; }

        public int Sexo { get; set; }

        public string FNacimiento { get; set; }

        public string FIngreso { get; set; }

        public int Turno { get; set; }

        public string Calle { get; set; }

        public string Numero { get; set; }

        public string Colonia { get; set; }

        public string Delegacion { get; set; }

        public string Ciudad { get; set; }

        public string CP { get; set; }

        public string TelefonoFijo { get; set; }

        public string Celular1 { get; set; }

        public string Celular2 { get; set; }

        public string Enfermedad { get; set; }

        public string OtraEnfermedad { get; set; }

        public string Alergias { get; set; }

        public string AlregiaC { get; set; }

        public string Edad { get; set; }

        public int EstadoCivil { get; set; }

        public int Hijos { get; set; }

        public string UltimoGradoEstudios { get; set; }

        public string OtroGrado { get; set; }

        public string TituloObtenido { get; set; }

        public string ContactoEmergencia1 { get; set; }

        public string TelefonoEmergencia1 { get; set; }

        public string ContactoEmergencia2 { get; set; }

        public string TelefonoEmergencia2 { get; set; }

        public string PasatiempoFav { get; set; }

        public string OtroPasatiempoFav { get; set; }

        public string DeporteFav { get; set; }

        public string OtroDeporteFav { get; set; }

        public string Talento { get; set; }

        public string Instrumento { get; set; }

        public string OtroTalento { get; set; }
        public string Sdo_quincenal { get; set; }
        public string Infonavit { get; set; }
        public string Fonacot { get; set; }
        public string Pensionado { get; set; }
    }

    [Table("tbl_HijosEmpleados")]
    public class tbl_HijosEmpleados
    {
        public int Id_Empleado { get; set; }

        public int Edad { get; set; }

        public string FechaNacHijo { get; set; }
    }

    [Table("cat_TipoRegimen")]
    public class cat_TipoRegimen
    {
        public int ID_TipoRegimen { get; set; }
        public string Tipo_Regimen { get; set; }
    }

    [Table("cat_Segmento")]
    public class cat_Segmento
    {
        public int ID_Segmento { get; set; }
        public string Segmento { get; set; }
    }
}