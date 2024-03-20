using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MED.Models
{
    public class MonitoreoCalidad
    {
        [Table("tbl_Monitoreo")]
        public class tbl_Monitoreo
        {

            public int IdVariable { get; set; }

            public string Serie { get; set; }

            public string Folio { get; set; }

            public string Telefono { get; set; }

            public string FechaVenta { get; set; }
            public string FechaVentaECS { get; set; }
            public string FechaEva { get; set; }
            public string FechaEscucha { get; set; }
            public string Comentarios { get; set; }
            public string TipiECS { get; set; }
            public string NivelS { get; set; }
            public string audioc { get; set; }
            public string audioe { get; set; }
            public string audiov { get; set; }       
            public int Id_Campana { get; set; }
            public int IdAnalista { get; set; } //Esta logueado
            public int IdRVT { get; set; } //Empleado buscado
            public int IdRVTECS { get; set; } //Empleado buscado

            public string TipoLlamada { get; set; }
            public string TipificacionRVT { get; set; }
            public string TipificacionCorrecta { get; set; }
            public string RVTTipiCorrect { get; set; }
            public int CalificacionRVT { get; set; }
            public float TotalLlamada { get; set; }

            public string StatusTramite { get; set; }
            public string Calibracion { get; set; }
            public string Centro { get; set; }
            public string NombreCliente { get; set; }
            public string Telefonico { get; set; }
            public string FolioECS { get; set; }
            public string SuperRVT { get; set; }
            public string SuperVal { get; set; }

            public string ErrorCriticoRVT { get; set; }
            public string ErrorCriticoRVTECS { get; set; }

            public int IdVal { get; set; }
            public int IdVal_ECS { get; set; }
            public int CalificacionVal { get; set; }
            public int CalificacionValECS { get; set; }
            public string ErrorCriticoVal { get; set; }
            public string ErrorCriticoValECS { get; set; }
            public int IdEmpleado { get; set; } //Esta logueado

            public int CalificacionTotalRVT { get; set; }

            public int CalificacionTotalValidador { get; set; }


            public string FechaIniciomonitoro { get; set; }// En cuanto se conecte

            public string FechaFinMonitoreo { get; set; }//Cuando guarde
            public string RvtCompromiso { get; set; }
            public string ValidadorCompromiso { get; set; }
            public string DescripcionLlamadaRVT { get; set; }
            public string DescripcionLlamadaValidador { get; set; }
            public string FeedbakRVT { get; set; }
            public string FeedbakValidador { get; set; }
            public string NombreRVT { get; set; }

            public string NombreValidador { get; set; }



            public string Campana { get; set; }

            public string NombreAnalista { get; set; }

            public int PorcentajePresicion { get; set; }

            public int PorcentajeEstilo { get; set; }



            public string FechaInicio { get; set; }

            public string FechaFin { get; set; }

            public int Id_Supervisor { get; set; }

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

            public string Pregunta35 { get; set; }

            public string Pregunta36 { get; set; }

            public string Pregunta37 { get; set; }

            public string Pregunta38 { get; set; }

            public string Pregunta39 { get; set; }

            public string Pregunta40 { get; set; }

            public string Pregunta41 { get; set; }

            public string Pregunta42 { get; set; }

            public string Pregunta43 { get; set; }

            public string Pregunta44 { get; set; }

            public string Pregunta45 { get; set; }

            public string Pregunta46 { get; set; }

            public string Pregunta47 { get; set; }

            public string Pregunta48 { get; set; }

            public string Pregunta49 { get; set; }

            public string Pregunta50 { get; set; }

            public string Pregunta51 { get; set; }

            public string Pregunta52 { get; set; }

            public string Pregunta53 { get; set; }

            public string Pregunta54 { get; set; }

            public string Pregunta55 { get; set; }

            public string Pregunta56 { get; set; }

            public string Pregunta57 { get; set; }

            public string Pregunta58 { get; set; }

            public string Pregunta59 { get; set; }

            public string Pregunta60 { get; set; }

            public string Pregunta61 { get; set; }

            public string Pregunta62 { get; set; }

            public string Pregunta63 { get; set; }

            public string Pregunta64 { get; set; }

            public string Pregunta65 { get; set; }

            public string Pregunta66 { get; set; }

            public string Pregunta67 { get; set; }

            public string Pregunta68 { get; set; }

            public string Pregunta69 { get; set; }

            public string Pregunta70 { get; set; }

            public string Pregunta71 { get; set; }

            public string Pregunta72 { get; set; }

            public string Pregunta73 { get; set; }

            public string Pregunta74 { get; set; }

            public string Pregunta75 { get; set; }

            public string Pregunta76 { get; set; }

            public string Pregunta77 { get; set; }

            public string Pregunta78 { get; set; }

            public string Pregunta79 { get; set; }

            public string Pregunta80 { get; set; }

            public string Pregunta81 { get; set; }

            public string Pregunta82 { get; set; }

            public string Pregunta83 { get; set; }

            public string Pregunta84 { get; set; }

            public string Pregunta85 { get; set; }

            public string Pregunta86 { get; set; }

            public string Pregunta87 { get; set; }

            public string Pregunta88 { get; set; }

            public string Pregunta89 { get; set; }

            public string Pregunta90 { get; set; }

            public string Pregunta91 { get; set; }

            public string Pregunta92 { get; set; }

            public string Pregunta93 { get; set; }

            public string Pregunta94 { get; set; }

            public string Pregunta95 { get; set; }

            public string Pregunta96 { get; set; }

            public string Pregunta97 { get; set; }

            public string Pregunta98 { get; set; }

            public string Pregunta99 { get; set; }

            public string Pregunta100 { get; set; }

            public string Pregunta101 { get; set; }

            public string Pregunta102 { get; set; }

            public string Pregunta103 { get; set; }

            public string Pregunta104 { get; set; }

            public string Pregunta105 { get; set; }

            public string Pregunta106 { get; set; }

            public string Pregunta107 { get; set; }

            public string Pregunta108 { get; set; }

            public string Pregunta109 { get; set; }

            public string Pregunta110 { get; set; }

            public string Pregunta111 { get; set; }

            public string Pregunta112 { get; set; }

            public string Pregunta113 { get; set; }

            public string Pregunta114 { get; set; }

            public string Pregunta115 { get; set; }

            public string Pregunta116 { get; set; }

            public string Pregunta117 { get; set; }

            public string Pregunta118 { get; set; }

            public string Pregunta119 { get; set; }

            public string Pregunta120 { get; set; }
            public string Pregunta121 { get; set; }
            public string Pregunta122 { get; set; }
            public string Pregunta123 { get; set; }
            public string Pregunta124 { get; set; }
            public string Pregunta125 { get; set; }
            public string Pregunta126 { get; set; }
            public string Pregunta127 { get; set; }
            public string Pregunta128 { get; set; }





        }

        [Table("tbl_ValoresMonitoreo")]
        public class tbl_ValoresMonitoreo
        {
            public int IdMonitoreo { get; set; }//Cat_ValMonitoreo

            public int IdVariable { get; set; } //tbl_Monitoreo

            public string Ponderacion { get; set; }//Ponderacion por pregunta
            public string Respuesta { get; set; }//Respuesta por pregunta
        }

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

            //public int id_Empleadob { get; set; }

            //public string NumeroEmpleadob { get; set; }

            //public string APaternob { get; set; }

            //public string AMaternob { get; set; }

            //public string Nombre_1b { get; set; }

            //public string Nombre_2b { get; set; }

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

            //public string Direccion { get; set; }

            public string FFirmaBaja { get; set; }

            public int TipoBaja { get; set; }

            public int MotivoBaja { get; set; }

            public string Observaciones { get; set; }

            public string TelefonoContacto { get; set; }

            public string AutorizoBaja { get; set; }

            public string Usuario { get; set; }

            public int Horario { get; set; }

            public int IDDireccion { get; set; }

            public int Id_Campana { get; set; }

            public int IdVariable { get; set; }

            public string Campana { get; set; }

            public string R_Puesto { get; set; }

            //public string NumEmpleado { get; set; }
        }

        [Table("tbl_Logueo")]
        public class tbl_Logueo
        {

            public int Id_usuario { get; set; }

            public int Id_tipo_u { get; set; }

            public string usuario { get; set; }

            public string Pass { get; set; }

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

            public int Site { get; set; }
        }


        [Table("Cat_ValoresMonitoreo")]
        public class Cat_ValoresMonitoreo
        {
            public int IdMonitoreo { get; set; }

            public int IdAtributo { get; set; }

            public int IdRubro { get; set; }

            public string Variable { get; set; }

            public Double MinPonderacion { get; set; }

            public Double MaxPonderacion { get; set; }

            public int IdCampana { get; set; }

            public int Orden { get; set; }

            public int Id_Departamento { get; set; }

            public int Activo { get; set; }

            public string Rubro { get; set; }
            public string Comentarios { get; set; }

            public string Atributo { get; set; }

            public int CalificacionTotalRVT { get; set; }

            public int CalificacionTotalValidador { get; set; }

            public Double Ponderacion { get; set; }
            public int Sum { get; set; }
            public int Sum2 { get; set; }

            //-----------------------------------------------Feedback

            public string DescripcionLlamadaRVT { get; set; }

            public string FeedbakRVT { get; set; }

            public string DescripcionLlamadaValidador { get; set; }

            public string FeedbakValidador { get; set; }
        }
        [Table("Cat_Campana")]
        public class Cat_Campana
        {
            public int Id_Campana { get; set; }

            public string Nombre_Campana { get; set; }

            public string Nombre_BD { get; set; }

            public string Val_Buro { get; set; }

            public string Val_Duplicidad { get; set; }

            public int Limite_dias { get; set; }

            public int Id_Tipo_Venta { get; set; }

            public int Id_Tipo { get; set; }

            public int Activo { get; set; }

            public string FechaMonitoreo { get; set; }

            public int IdDepartamento { get; set; }

            public int IdEmpleado { get; set; }

            public int IdVariable { get; set; }

        }
        [Table("NUXIBA_OLD.dbo.cat_CalificacionAPI_2_New_")]

        public class cat_CalificacionAPI_2_New_
        {
            public int id_cat_Calificacion { get; set; }

            public string Bloqueo_Telefonia { get; set; }

            public int volverAmarcar { get; set; }

            public string Acción { get; set; }

            public string Instrucción { get; set; }

            public string contacto_efectivo { get; set; }

            public string Venta { get; set; }

            public string status { get; set; }

            public int Rechazos { get; set; }

            public string TIPO_CONTACTO { get; set; }

            public string catalogo_de_estatus_operacion { get; set; }

            public string catalogo_de_nuxiba { get; set; }

            public int ID_CALIFICACION { get; set; }

            public string Descripción { get; set; }

            public int CLI { get; set; }

            public int CNC { get; set; }

            public int CPC { get; set; }

            public int DISPONIBLE { get; set; }

            public int DISPONIBLE_REF { get; set; }

            public int TDC_MA { get; set; }

            public int PAGARE { get; set; }

            public int TDC_PAP { get; set; }

            public int TDC_Low { get; set; }

            public int PROSPECTOR { get; set; }

            public int PYME { get; set; }

            public int HIPOTECARIO { get; set; }

            public int HIPOTECAIO_INBOUND { get; set; }

            public int REDIS_CLI { get; set; }

            public int REDIS_APP { get; set; }

            public int INACTIVOS { get; set; }

            public int RECOVERY_CNC { get; set; }

            public int RECOVERY_CPC { get; set; }

            public int DISPONIBLE_RECOVERY { get; set; }

            public int CLI_RECOVERY { get; set; }

            public int ID_VIGENTE { get; set; }

            public int Inversión_Contratos_Duplicados { get; set; }

            public int Portabilidad_Clientes_Priority { get; set; }

            public int MCI { get; set; }

            public int Portabilidad_Michoacan_Flagship_Winback_Ret_Empresas { get; set; }

            public int Clientes_No_R2B { get; set; }

            public int Retencion_de_Contratos { get; set; }

            public int Remediacion_de_Contratos { get; set; }

            public int Ret_Clientes_sin_Datos_Biométricos { get; set; }

            public int Recovery_Portabilidad { get; set; }

            public int Control_Tower_CLI { get; set; }

            public int Control_Tower_CNC { get; set; }

            public int Control_Tower_CPC { get; set; }     

            public int Control_Tower_DISPO { get; set; }

            public int Control_Tower_TDC { get; set; }

            public int ABANICO_INV { get; set; }

            public int JERARQUIA { get; set; }

            public string Status_BC { get; set; }

            public int ACTUALIZACION_APP { get; set; }

            public int shortname { get; set; }

            public int ID_locked { get; set; }

            public string description { get; set; }
        }
        [Table("cat_Plazas")]
        public class cat_Plazas
        {
            public int Id_plaza { get; set; }

            public string Plaza { get; set; }
        }
    }
}