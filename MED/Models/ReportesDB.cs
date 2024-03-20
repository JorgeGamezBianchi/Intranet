using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace MED.Models
{
    public class ReportesDB
    {
        string cs = ConfigurationManager.ConnectionStrings["MED"].ConnectionString;

        public List<Reportes> ReporteAlta(Reportes rep)
        {
            List<Reportes> lst = new List<Reportes>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                LogueoDB l = new LogueoDB();
                con.Open();
                SqlCommand com = new SqlCommand("usp_Reporte01", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Fechainicio", rep.Fechainicio);
                com.Parameters.AddWithValue("@Fechafin", rep.Fechafin);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Reportes
                    {
                        NumeroEmpleado = Convert.ToInt32(rdr["NumEmpleado"]),
                        Nombre_1 = rdr["NombreCompleto"].ToString(),
                        //Nombre_2 = rdr["Nombre_2"].ToString(),
                        //APaterno = rdr["APaterno"].ToString(),
                        //AMaterno = rdr["AMaterno"].ToString(),
                        Site = rdr["Site"].ToString(),
                        IMSS = rdr["IMSS"].ToString(),
                        Puesto = rdr["Puesto"].ToString(),
                        IDDireccion = rdr["Direccion"].ToString(),
                        IdDepartamento = rdr["Departamento"].ToString(),
                        Recluto = rdr["Recluto"].ToString(),
                        Genero = rdr["Sexo"].ToString(),
                        RFC = rdr["RFC"].ToString(),
                        Homoclave = rdr["Homoclave"].ToString(),
                        CURP = rdr["CURP"].ToString(),
                        FNacimiento = rdr["FNacimiento"].ToString(),
                        FIngreso = rdr["FIngreso"].ToString(),
                        Turno = rdr["Turno"].ToString(),
                        Direccion = rdr["Domicilio"].ToString(),
                        //Calle = rdr["Calle"].ToString(),
                        //Numero = rdr["Numero"].ToString(),
                        //Colonia = rdr["Colonia"].ToString(),
                        //Delegacion = rdr["Delegacion"].ToString(),
                        //Ciudad = rdr["Ciudad"].ToString(),
                        //CP = rdr["CP"].ToString(),
                        TelefonoFijo = rdr["TelefonoFijo"].ToString(),
                        TelefonoMovil = rdr["TelefonoMovil"].ToString(),
                        ElaboroContrato = rdr["ElaboroContrato"].ToString(),
                        Diagnostico = rdr["Diagnostico"].ToString(),
                        Edad = rdr["Edad"].ToString(),
                        PrimerEmpleo = rdr["PrimerEmpleo"].ToString(),
                        ExperienciaEnCallCenter = rdr["ExperenciaEnCallCenter"].ToString(),
                        EstadoCivil = rdr["EstadoCivil"].ToString(),
                        Hijos = rdr["Hijos"].ToString(),
                        UltimoGradoEstudios = rdr["NivelAcademico"].ToString(),
                        Especialidad = rdr["Especialidad"].ToString(),
                        FuenteReclutamiento = rdr["FuenteReclutamiento"].ToString(),
                        CapturaPlantilla = rdr["CapturaPlantilla"].ToString(),
                        FInsercion = rdr["FInsercion"].ToString(),
                        Campania = rdr["Campania"].ToString(),
                        TipoNomina = rdr["TipoNomina"].ToString(),
                        CLABE = l.DesEncriptar(rdr["CLABE"].ToString()),
                        SueldoDiario = rdr["SueldoDiario"].ToString(),
                        Banco = rdr["Banco"].ToString(),
                        //TipoBaja = rdr["TipoBaja"].ToString(),
                        //MotivoBaja = rdr["Motivo"].ToString(),
                        //FBaja = rdr["FBaja"].ToString()
                    });
                }
            }
            return lst;
        }

        public List<Reportes> CargarReporte02(Reportes emp1)
        {
            Reportes emp = new Reportes();
            List<Reportes> lst = new List<Reportes>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_Reporte02", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Fechainicio", emp1.Fechainicio);
                com.Parameters.AddWithValue("@Fechafin", emp1.Fechafin);
                SqlDataReader rdr = com.ExecuteReader();

                while (rdr.Read())
                {
                    lst.Add(new Reportes
                    {
                        NumeroEmpleado = Convert.ToInt32(rdr["NumEmpleado"]),
                        Nombre_1 = rdr["Nombre_1"].ToString(),
                        Nombre_2 = rdr["Nombre_2"].ToString(),
                        APaterno = rdr["APaterno"].ToString(),
                        AMaterno = rdr["AMaterno"].ToString(),
                        TipoBaja = rdr["TipoBaja"].ToString(),
                        MotivoBaja = rdr["Motivo"].ToString(),
                        FBaja = rdr["FBaja"].ToString()
                    });
                }

                return lst;

            }

        }

        public List<Reportes> ReportePermanencia(Reportes emp1)
        {
            List<Reportes> lst = new List<Reportes>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_Reporte03", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@FECHA1", emp1.Fechainicio);
                com.Parameters.AddWithValue("@FECHA2", emp1.Fechafin);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Reportes
                    {
                        NumeroEmpleado = Convert.ToInt32(rdr["NumEmpleado"]),
                        Nombre_1 = rdr["Nombre_1"].ToString(),
                        Nombre_2 = rdr["Nombre_2"].ToString(),
                        APaterno = rdr["APaterno"].ToString(),
                        AMaterno = rdr["AMaterno"].ToString(),
                        TipoBaja = rdr["TipoBaja"].ToString(),
                        MotivoBaja = rdr["Motivo"].ToString(),
                        FBaja = rdr["FBaja"].ToString(),
                        DiasT = Convert.ToInt32(rdr["DiasT"])
                    });
                }
            }
            return lst;
        }

        public List<Reportes> ReporteUsuario(Reportes emp1)
        {
            Reportes emp = new Reportes();
            List<Reportes> lst = new List<Reportes>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_Reporte04", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Fechainicio", emp1.Fechainicio);
                com.Parameters.AddWithValue("@Fechafin", emp1.Fechafin);
                com.Parameters.AddWithValue("@Tipo", emp1.tipoReporte);
                com.Parameters.AddWithValue("@Num", emp1.numUsuario);
                SqlDataReader rdr = com.ExecuteReader();
                switch (emp1.tipoReporte)
                {
                    case 1:
                        while (rdr.Read())
                        {
                            lst.Add(new Reportes
                            {
                                NumeroEmpleado = Convert.ToInt32(rdr["NumEmpleado"]),
                                Nombre_1 = rdr["Nombre_1"].ToString(),
                                Nombre_2 = rdr["Nombre_2"].ToString(),
                                APaterno = rdr["APaterno"].ToString(),
                                AMaterno = rdr["AMaterno"].ToString(),
                                //TipoBaja = rdr["TipoBaja"].ToString(),
                                //MotivoBaja = rdr["Motivo"].ToString(),
                                //FBaja = rdr["FBaja"].ToString(),
                                FIngreso = rdr["FIngreso"].ToString(),
                                usuario = rdr["Usuario"].ToString()
                                //AutorizoBaja = rdr["AutorizoBaja"].ToString()
                            });
                        }
                        break;
                    case 2:
                        while (rdr.Read())
                        {
                            lst.Add(new Reportes
                            {
                                NumeroEmpleado = Convert.ToInt32(rdr["NumEmpleado"]),
                                Nombre_1 = rdr["Nombre_1"].ToString(),
                                Nombre_2 = rdr["Nombre_2"].ToString(),
                                APaterno = rdr["APaterno"].ToString(),
                                AMaterno = rdr["AMaterno"].ToString(),
                                TipoBaja = rdr["TipoBaja"].ToString(),
                                MotivoBaja = rdr["Motivo"].ToString(),
                                FBaja = rdr["FBaja"].ToString(),
                                //FIngreso = rdr["FIngreso"].ToString(),
                                AutorizoBaja = rdr["AutorizoBaja"].ToString()
                            });
                        }
                        break;
                }
                return lst;

            }

        }

        public List<Reportes> ReporteMCF(Reportes rep)
        {
            List<Reportes> lst = new List<Reportes>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_Reporte06", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@FechaInicio", rep.Fechainicio);
                com.Parameters.AddWithValue("@FechaFin", rep.Fechafin);
                com.Parameters.AddWithValue("@Motivo", rep.MotivoBaja);
                com.Parameters.AddWithValue("@IDDepartamento", rep.IdDepartamento);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Reportes
                    {
                        NumeroEmpleado = Convert.ToInt32(rdr["NumEmpleado"]),
                        Nombre_1 = rdr["Nombre_1"].ToString(),
                        Nombre_2 = rdr["Nombre_2"].ToString(),
                        APaterno = rdr["APaterno"].ToString(),
                        AMaterno = rdr["AMaterno"].ToString(),
                        TipoBaja = rdr["TipoBaja"].ToString(),
                        MotivoBaja = rdr["Motivo"].ToString(),
                        FBaja = rdr["FechaBaja"].ToString(),
                        IdDepartamento = rdr["IDDepartamento"].ToString()
                    });
                }
            }
            return lst;
        }

        public List<tbl_Usuarios> carcarUsuarios()
        {
            List<tbl_Usuarios> lst = new List<tbl_Usuarios>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_ReporteUsuario", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Usuarios
                    {
                        Usuario = rdr["Usuario"].ToString(),
                        Nombre = rdr["Nombre"].ToString(),
                        Ape_pat = rdr["Ape_pat"].ToString(),
                        Ape_mat = rdr["Ape_mat"].ToString()
                    });
                }
            }
            return lst;
        }

        public List<Reportes> ReporteCampañiaCargo(Reportes emp1)
        {
            Reportes emp = new Reportes();
            List<Reportes> lst = new List<Reportes>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_Reporte05", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Tipo", emp1.tipoReporte);
                com.Parameters.AddWithValue("@Fechainicio", emp1.Fechainicio);
                com.Parameters.AddWithValue("@Fechafin", emp1.Fechafin);
                com.Parameters.AddWithValue("@Puesto", emp1.Puesto);
                com.Parameters.AddWithValue("@Campaña", emp1.IdDepartamento);
                SqlDataReader rdr = com.ExecuteReader();
                switch (emp1.tipoReporte)
                {
                    case 1:
                        while (rdr.Read())
                        {
                            lst.Add(new Reportes
                            {

                                NumeroEmpleado = Convert.ToInt32(rdr["NumEmpleado"]),
                                Nombre_1 = rdr["Nombre_1"].ToString(),
                                Nombre_2 = rdr["Nombre_2"].ToString(),
                                APaterno = rdr["APaterno"].ToString(),
                                AMaterno = rdr["AMaterno"].ToString(),
                                FIngreso = rdr["Fingreso"].ToString(),
                                Descripcion = rdr["Descripcion"].ToString(),
                                Puesto = rdr["Puesto"].ToString()

                            });

                        }
                        break;
                    case 2:

                        while (rdr.Read())
                        {
                            lst.Add(new Reportes
                            {
                                NumeroEmpleado = Convert.ToInt32(rdr["NumEmpleado"]),
                                Nombre_1 = rdr["Nombre_1"].ToString(),
                                Nombre_2 = rdr["Nombre_2"].ToString(),
                                APaterno = rdr["APaterno"].ToString(),
                                AMaterno = rdr["AMaterno"].ToString(),
                                TipoBaja = rdr["TipoBaja"].ToString(),
                                MotivoBaja = rdr["Motivo"].ToString(),
                                FBaja = rdr["FechaBaja"].ToString(),
                                IdDepartamento = rdr["IdDepartamento"].ToString(),
                                Puesto = rdr["Puesto"].ToString()

                            });
                        }
                        break;
                }
                return lst;
            }
        }

        public List<Reportes> Contratos(Reportes rep1)
        {
            List<Reportes> lst = new List<Reportes>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_BuscaBusca", con);
                com.CommandType = CommandType.StoredProcedure;
                if (rep1.numUsuario == null)
                {
                    com.Parameters.AddWithValue("@num", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@num", rep1.numUsuario); }

                if (rep1.Nombre_1 == null)
                {
                    com.Parameters.AddWithValue("@nombre1", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@nombre1", rep1.Nombre_1); }
                if (rep1.Nombre_2 == null)
                {
                    com.Parameters.AddWithValue("@nombre2", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@nombre2", rep1.Nombre_2); }
                if (rep1.APaterno == null)
                {
                    com.Parameters.AddWithValue("@apep", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@apep", rep1.APaterno); }
                if (rep1.AMaterno == null)
                {
                    com.Parameters.AddWithValue("@apem", rep1.AMaterno);
                }
                else { com.Parameters.AddWithValue("@apem", rep1.AMaterno); }
                if (rep1.Fechainicio == "31/12/1900")
                {
                    com.Parameters.AddWithValue("@fechainicio", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@fechainicio", rep1.Fechainicio); }
                if (rep1.Fechafin == "31/12/1900")
                {
                    com.Parameters.AddWithValue("@fechafin", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@fechafin", rep1.Fechafin); }

                SqlDataReader rdr = com.ExecuteReader();
                LogueoDB l = new LogueoDB();
                while (rdr.Read())
                {
                    lst.Add(new Reportes
                    {
                        Nombre_1 = rdr["NombreCompleto"].ToString(),
                        //Nombre_2 = rdr["Nombre_2"].ToString(),
                        //APaterno = rdr["APaterno"].ToString(),
                        //AMaterno = rdr["AMaterno"].ToString(),
                        //Calle = rdr["Calle"].ToString(),
                        //Numero = rdr["Numero"].ToString(),
                        //Colonia = rdr["Colonia"].ToString(),
                        //Ciudad = rdr["Ciudad"].ToString(),
                        //Delegacion = (rdr["Delegacion"] != DBNull.Value) ? rdr["Delegacion"].ToString() : "",
                        //CP = rdr["CP"].ToString(),
                        Direccion = rdr["Direccion"].ToString(),
                        FIngreso = rdr["FIngreso"].ToString(),
                        RFC = rdr["RFC"].ToString(),
                        //Sdo_Diario_Asimilados = l.DesEncriptar(rdr["SueldoDiario"].ToString()),
                        SueldoDiario = rdr["SueldoDiario"].ToString(),
                        Puesto = rdr["Puesto"].ToString(),
                        Genero = rdr["Sexo"].ToString()
                    });
                }
            }
            return lst;
        }

        public List<Reportes> GenerarReporteHorarios(tbl_Empleados r)
        {
            List<Reportes> lst = new List<Reportes>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_RHorarios", con);
                com.CommandType = CommandType.StoredProcedure;
                if (r.NumeroEmpleado == null)
                {
                    com.Parameters.AddWithValue("@NumEmp", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@NumEmp", r.NumeroEmpleado); }
                if (r.IdDepartamento == 0)
                {
                    com.Parameters.AddWithValue("@area", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@area", r.IdDepartamento); }
                if (r.Estatus == 0)
                {
                    com.Parameters.AddWithValue("@status", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@status", r.Estatus); }

                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Reportes
                    {
                        NumeroEmpleado = Convert.ToInt32(rdr["NumEmpleado"]),
                        Nombre_1 = rdr["Nombre"].ToString(),
                        Puesto = rdr["Puesto"].ToString(),
                        Dias_labora = rdr["Dias_labora"].ToString(),
                        TurnoH = rdr["Turno"].ToString(),
                        Entrada = rdr["Entrada"].ToString(),
                        Salida = rdr["Salida"].ToString()
                    });
                }
            }
            return lst;
        }

        public List<cat_Departamentos> CargarOperacion()
        {
            List<cat_Departamentos> lst = new List<cat_Departamentos>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CatDepartamentosOperacion", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_Departamentos
                    {
                        IDDepartamento = Convert.ToInt32(rdr["IDDepartamento"]),
                        Descripcion = rdr["Descripcion"].ToString()
                    });
                }
            }
            return lst;
        }

        //Consulta y regresa información para generar el reporte de Rondines
        public List<tbl_BitacorasRondines> GenerarReporteRondin(tbl_BitacorasRondines b)
        {
            List<tbl_BitacorasRondines> lst = new List<tbl_BitacorasRondines>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_ReporteBitacorasRondines", con);
                com.CommandType = CommandType.StoredProcedure;
                if (b.Usuario != "")
                {
                    com.Parameters.AddWithValue("@NumEmp", b.Usuario);
                }
                else
                {
                    com.Parameters.AddWithValue("@NumEmp", DBNull.Value);
                }
                if (b.Departamento != 0)
                {
                    com.Parameters.AddWithValue("@area", b.Departamento);
                }
                else
                {
                    com.Parameters.AddWithValue("@area", DBNull.Value);
                }
                if (b.Fechainicio != "31/12/1900")
                {
                    com.Parameters.AddWithValue("@FechaInicio", b.Fechainicio);
                }
                else
                {
                    com.Parameters.AddWithValue("@FechaInicio", DBNull.Value);
                }
                if (b.Fechafin != "31/12/1900")
                {
                    com.Parameters.AddWithValue("@FechaFin", b.Fechafin);
                }
                else
                {
                    com.Parameters.AddWithValue("@FechaFin", DBNull.Value);
                }

                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_BitacorasRondines
                    {
                        Usuario = rdr["Usuario"].ToString(),
                        FechaInsercion = rdr["FechaInsercion"].ToString(),
                        Actividad_Incidencia = rdr["Actividad/Incidencia"].ToString(),
                        Persona = rdr["Persona"].ToString(),
                        DireccionR = rdr["Direccion"].ToString(),
                        DepartamentoR = rdr["Departamento"].ToString(),
                        CampanaR = rdr["Campania"].ToString(),
                        Hora = rdr["Hora"].ToString(),
                        Observaciones = rdr["Observaciones"].ToString(),
                        FechaIncidente = rdr["FechaIncidente"].ToString(),
                        MotivoCaptura = rdr["MotivoCaptura"].ToString(),
                        ReportaR = rdr["Reporta"].ToString(),
                    });
                }
            }
            return lst;
        }

        public List<Tbl_EncuestaSalida> GenerarReporteEncuestaSalida(Tbl_EncuestaSalida rep)
        {
            List<Tbl_EncuestaSalida> tbl_Encuesta = new List<Tbl_EncuestaSalida>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_ReporteEncuestaSalida", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Fechainicio", rep.FechaInicio);
                com.Parameters.AddWithValue("@Fechafin", rep.FechaFin);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    tbl_Encuesta.Add(new Tbl_EncuestaSalida
                    {
                        IdEntrevista = Convert.ToInt32(rdr["IdEntrevista"]),
                        NoEmpleado = Convert.ToInt32(rdr["NumEmpleado"]),
                        NombreCompleto = rdr["NombreCompleto"].ToString(),
                        MotivoBaja = BuscarMotivoBaja(Convert.ToInt32(rdr["1"])),
                        OtroMotivo = rdr["2"].ToString(),
                        Pregunta1 = rdr["3"].ToString() == "1" ? "No" : "Si",
                        Pregunta2 = rdr["4"].ToString() == "1" ? "No" : "Si",
                        Pregunta3 = rdr["5"].ToString() == "1" ? "No" : "Si",
                        Pregunta4 = rdr["6"].ToString(),
                        Pregunta5 = rdr["7"].ToString() == "1" ? "No" : "Si",
                        Pregunta6 = rdr["8"].ToString() == "1" ? "No" : "Si",
                        Pregunta7 = rdr["9"].ToString() == "1" ? "No" : "Si",
                        Pregunta8 = rdr["10"].ToString() == "1" ? "No" : "Si",
                        Pregunta9 = rdr["11"].ToString() == "1" ? "No" : "Si",
                        Pregunta10 = rdr["12"].ToString() == "1" ? "No" : "Si",
                        Pregunta11 = rdr["13"].ToString() == "1" ? "No" : "Si",
                        Pregunta12 = rdr["14"].ToString() == "1" ? "No" : "Si",
                        Pregunta13 = rdr["15"].ToString() == "1" ? "No" : "Si",
                        Pregunta14 = rdr["16"].ToString() == "1" ? "No" : "Si",
                        Pregunta15 = rdr["17"].ToString(),
                        Pregunta16 = rdr["18"].ToString(),
                        Pregunta17 = rdr["19"].ToString(),
                        Pregunta18 = rdr["20"].ToString(),
                        Pregunta19 = rdr["21"].ToString(),
                        Pregunta20 = rdr["22"].ToString(),
                        Pregunta21 = rdr["23"].ToString(),
                        Pregunta22 = rdr["24"].ToString() == "1" ? "No" : "Si",
                        Pregunta23 = rdr["25"].ToString() == "1" ? "No" : "Si",
                        Pregunta24 = rdr["26"].ToString() == "1" ? "No" : "Si",
                        Pregunta26 = rdr["28"].ToString() == "1" ? "No" : "Si",
                        Pregunta27 = rdr["29"].ToString() == "1" ? "No" : "Si",
                        Pregunta28 = rdr["30"].ToString() == "1" ? "No" : "Si",
                        Pregunta29 = rdr["31"].ToString() == "1" ? "No" : "Si",
                        Pregunta30 = rdr["32"].ToString() == "1" ? "No" : "Si",
                        Pregunta31 = rdr["33"].ToString() == "1" ? "No" : "Si",
                        Pregunta32 = rdr["34"].ToString() == "1" ? "No" : "Si",
                        Pregunta33 = rdr["35"].ToString(),
                        Pregunta34 = rdr["36"].ToString(),
                        UltimoDiaLaborado = rdr["UltimoDiaLaborado"] != DBNull.Value ? rdr["UltimoDiaLaborado"].ToString() : "",
                    }) ;
                }
                con.Close();
            }
            return tbl_Encuesta;
        }
        public string BuscarMotivoBaja(int idMotivo)
        {
            string motivo = "";
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_CargarMotivoBaja", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@IdMotivo", idMotivo);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    motivo = rdr["Motivo"].ToString();
                }
            }
            return motivo;
        }

        public int GuardarDatosEntrevistador(DatosEntrevistador data)
        {
            var row = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_ActualizarDatosEntrevistador", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@UltimoDiaLaborado", data.UltimoDiaLaborado);
                com.Parameters.AddWithValue("@NumEmpleadoEntrevistador", data.NumEmpleado);
                com.Parameters.AddWithValue("@Comentarios", data.Comentarios);
                com.Parameters.AddWithValue("@IdEntrevista", data.IdEntrevista);
                row = com.ExecuteNonQuery();
            }
            return row;
        }
    }
}