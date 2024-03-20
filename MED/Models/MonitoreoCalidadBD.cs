using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using static MED.Models.MonitoreoCalidad;

namespace MED.Models
{
    public class MonitoreoCalidadBD
    {
        //Conexion para CRM nuevo
        string cs = ConfigurationManager.ConnectionStrings["MED2"].ConnectionString;

        //Conexion para Intranet
        string cs2 = ConfigurationManager.ConnectionStrings["MED"].ConnectionString;


        //Carga las preguntas para el monitoreo dependiendo de la camapaña
        public List<Cat_ValoresMonitoreo> CargaValoresMonitoreo(Cat_Campana cc)
        {
            List<Cat_ValoresMonitoreo> lst = new List<Cat_ValoresMonitoreo>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_Monitoreo", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@IdCampana", cc.Id_Campana);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Cat_ValoresMonitoreo
                    {
                        //IdAtributo = Convert.ToInt32(rdr["IdAtributo"]),
                        IdMonitoreo = Convert.ToInt32(rdr["IdMonitoreo"]),
                        IdCampana = Convert.ToInt32(rdr["IdCampana"]),
                        Atributo = rdr["Atributo"].ToString(),
                        Rubro = rdr["Rubro"].ToString(),
                        Variable = rdr["Variable"].ToString(),
                        MaxPonderacion = Double.Parse(rdr["MaxPonderacion"].ToString()),
                        MinPonderacion = Double.Parse(rdr["MinPonderacion"].ToString()),
                        Id_Departamento = Convert.ToInt32(rdr["Id_Departamento"]),
                        IdRubro = Convert.ToInt32(rdr["IdRubro"]),
                        //Sum = (Convert.ToInt32(rdr["Sum"]) != 0) ? Convert.ToInt32(rdr["Sum"]) : 0,
                        //Sum2 = (Convert.ToInt32(rdr["Sum2"]) != 0) ? Convert.ToInt32(rdr["Sum2"]) : 0

                    });
                }
            }
            return lst;
        }

        //Inserta en la tabla de Monitoreo
        public tbl_Monitoreo InsertarTablaMonitoreo(tbl_Monitoreo tm)
        {
            tbl_Monitoreo i = new tbl_Monitoreo();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("isp_InsertarMonitoreoCalidad", con);
                com.CommandType = CommandType.StoredProcedure;

                com.Parameters.AddWithValue("@IdRVTECS", (tm.IdRVTECS != 0) ? tm.IdRVTECS : 0);
                com.Parameters.AddWithValue("@SuperRvt", (tm.SuperRVT != null) ? tm.SuperRVT : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@Status", (tm.StatusTramite != null) ? tm.StatusTramite : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@Calibracion", (tm.Calibracion != null) ? tm.Calibracion : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@Centro", (tm.Centro != null) ? tm.Centro : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@NombreCliente", (tm.NombreCliente != null) ? tm.NombreCliente : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@Telefonico", (tm.Telefonico != null) ? tm.Telefonico : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@FolioECS", (tm.FolioECS != null) ? tm.FolioECS : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@FechaVentaECS", (tm.FechaVentaECS != null) ? tm.FechaVentaECS : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@FechaEscucha", (tm.FechaEscucha != null) ? tm.FechaEscucha : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@CalificacionTotalRVT", (tm.CalificacionTotalRVT != 0) ? tm.CalificacionTotalRVT : 0);
                com.Parameters.AddWithValue("@ErrorCriticoRVTECS", (tm.ErrorCriticoRVTECS != null) ? tm.ErrorCriticoRVTECS : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@Comentarios", (tm.Comentarios != null) ? tm.Comentarios : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@TipiECS", (tm.TipiECS != null) ? tm.TipiECS : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@TotalLlamada", (tm.TotalLlamada != 0) ? tm.TotalLlamada : 0);

                if (tm.StatusTramite == "No Venta" || tm.StatusTramite == "Venta Declinada" || tm.StatusTramite == "Venta Precreada" || tm.StatusTramite == "Sin status")
                {
                    com.Parameters.AddWithValue("@SuperVal", (tm.SuperVal != null) ? tm.SuperVal : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@IdVal_ECS", tm.IdVal_ECS);
                    com.Parameters.AddWithValue("@CalificacionTotalVal", tm.CalificacionTotalValidador);
                    com.Parameters.AddWithValue("@ErrorCriticoValECS", (tm.ErrorCriticoValECS != null) ? tm.ErrorCriticoValECS : DBNull.Value.ToString());                    
                }
                else
                {
                    com.Parameters.AddWithValue("@SuperVal", DBNull.Value);
                    com.Parameters.AddWithValue("@IdVal_ECS", DBNull.Value);
                    com.Parameters.AddWithValue("@CalificacionTotalVal", DBNull.Value);
                    com.Parameters.AddWithValue("@ErrorCriticoValECS", DBNull.Value);
                }
                if (tm.Id_Campana == 26 || tm.Id_Campana == 27 || tm.Id_Campana == 32)
                {
                    if (tm.StatusTramite == "No Venta" || tm.StatusTramite == "Venta Declinada" || tm.StatusTramite == "Venta Precreada" || tm.StatusTramite == "Sin status")
                    {
                        com.Parameters.AddWithValue("@RevisadoRVT", 0);
                        com.Parameters.AddWithValue("@RevisadoVal", 0);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@RevisadoRVT", 0);
                        com.Parameters.AddWithValue("@RevisadoVal", DBNull.Value);
                    }
                }

                com.Parameters.AddWithValue("@NivelS", (tm.NivelS != null) ? tm.NivelS : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@audioc", (tm.audioc != null) ? tm.audioc : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@audioe", (tm.audioe != null) ? tm.audioe : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@audiov", (tm.audiov != null) ? tm.audiov : DBNull.Value.ToString());

                com.Parameters.AddWithValue("@Serie", (tm.Serie != null) ? tm.Serie : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@Folio", (tm.Folio != null) ? tm.Folio : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@Telefono", (tm.Telefono != null) ? tm.Telefono : "0000000000");
                com.Parameters.AddWithValue("@FechaVenta", (tm.FechaVenta != null) ? tm.FechaVenta : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@FechaEva", (tm.FechaEva != null) ? tm.FechaEva : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@Id_Campana", tm.Id_Campana);
                com.Parameters.AddWithValue("@IdAnalista", tm.IdAnalista);
                com.Parameters.AddWithValue("@IdRVT", tm.IdRVT);
                com.Parameters.AddWithValue("@TipoLlamada", (tm.TipoLlamada != null) ? tm.TipoLlamada : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@TipificacionRVT", (tm.TipificacionRVT != null) ? tm.TipificacionRVT : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@TipificacionCorrecta", (tm.TipificacionCorrecta != null) ? tm.TipificacionCorrecta : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@RVTTipiCorrect", (tm.RVTTipiCorrect != null) ? tm.RVTTipiCorrect : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@CalificacionRVT", (tm.CalificacionRVT != 0) ? tm.CalificacionRVT : 0);
                com.Parameters.AddWithValue("@ErrorCriticoRVT", tm.ErrorCriticoRVT);
                if (tm.TipoLlamada == "VENTA")
                {
                    com.Parameters.AddWithValue("@IdValidador", tm.IdVal);
                }
                else
                {
                    com.Parameters.AddWithValue("@IdValidador", DBNull.Value);
                }
                if (tm.TipoLlamada == "VENTA")
                {
                    com.Parameters.AddWithValue("@CalificacionVal", tm.CalificacionVal);
                }
                else
                {
                    com.Parameters.AddWithValue("@CalificacionVal", DBNull.Value);
                }
                if (tm.TipoLlamada == "VENTA")
                {
                    com.Parameters.AddWithValue("@ErrorCriticoVal", tm.ErrorCriticoVal);
                }
                else
                {
                    com.Parameters.AddWithValue("@ErrorCriticoVal", DBNull.Value);
                }
                com.Parameters.AddWithValue("@FechaIniciomonitoreo", DateTime.Now);
           
                if (tm.DescripcionLlamadaRVT != null)
                {
                    com.Parameters.AddWithValue("@DescripcionLlamadaRVT", tm.DescripcionLlamadaRVT);
                }
                else
                {
                    com.Parameters.AddWithValue("@DescripcionLlamadaRVT", DBNull.Value);
                }
                if (tm.FeedbakRVT != null)
                {
                    com.Parameters.AddWithValue("@FeedbakRVT", tm.FeedbakRVT);
                }
                else
                {
                    com.Parameters.AddWithValue("@FeedbakRVT", DBNull.Value);
                }
                if (tm.DescripcionLlamadaValidador != null)
                {
                    com.Parameters.AddWithValue("@DescripcionLlamadaValidador", tm.DescripcionLlamadaValidador);
                }
                else
                {
                    com.Parameters.AddWithValue("@DescripcionLlamadaValidador", DBNull.Value);
                }
                if (tm.FeedbakValidador != null)
                {
                    com.Parameters.AddWithValue("@FeedbakValidador", tm.FeedbakValidador);
                }
                else
                {
                    com.Parameters.AddWithValue("@FeedbakValidador", DBNull.Value);
                }
                if (tm.Id_Campana != 26 && tm.Id_Campana != 27 && tm.Id_Campana != 32)
                {
                    if (tm.TipoLlamada == "VENTA")
                    {
                        com.Parameters.AddWithValue("@RevisadoRVT", 0);
                        com.Parameters.AddWithValue("@RevisadoVal", 0);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@RevisadoRVT", 0);
                        com.Parameters.AddWithValue("@RevisadoVal", DBNull.Value);
                    }
                }
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.HasRows)
                {
                    if (rdr.Read())
                    {
                        i.IdVariable = Convert.ToInt32(rdr["IdVariable"]);
                    }
                }
            }
            return i;
        }

        //Insertar en la tabla de ValoresMonitoreo
        public int InsertarTablaValoresMonitoreo(tbl_ValoresMonitoreo tvm)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("isp_InsertarValoresMonitoreo", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@IdVariable", tvm.IdVariable);
                com.Parameters.AddWithValue("@IdMonitoreo", tvm.IdMonitoreo);
                com.Parameters.AddWithValue("@Ponderacion", tvm.Ponderacion);
                com.Parameters.AddWithValue("@Respuesta", tvm.Respuesta);
                i = com.ExecuteNonQuery();
                con.Close();
            }
            return i;
        }



        //Carga el select con las capañas que se tiene monitoreo
        public List<Cat_Campana> CampanasMonitoreo(tbl_Empleados emp)
        {
            List<Cat_Campana> lst = new List<Cat_Campana>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CampanasMonitoreo", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@RFC", emp.RFC);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Cat_Campana
                    {
                        IdVariable = Convert.ToInt32(rdr["IdVariable"]),
                        Nombre_Campana = rdr["Nombre_Campana"].ToString(),
                        FechaMonitoreo = rdr["FechaFinMonitoreo"].ToString(),
                        IdDepartamento = Convert.ToInt32(rdr["IdDepartamento"]),
                        IdEmpleado = Convert.ToInt32(rdr["id_Empleado"])
                    });
                }
                con.Close();
            }
            return lst;
        }


        //Carga el select con las capañas que se tiene monitoreo operacion
        public List<Cat_Campana> CampanasMonitoreoOper(string RFC)
        {
            List<Cat_Campana> lst = new List<Cat_Campana>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CampanasMonitoreoOper", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@numemp", RFC);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Cat_Campana
                    {
                        IdVariable = Convert.ToInt32(rdr["IdVariable"]),
                        Nombre_Campana = rdr["Nombre_Campana"].ToString(),
                        FechaMonitoreo = rdr["FechaEva"].ToString(),
                        IdDepartamento = Convert.ToInt32(rdr["IdDepartamento"]),
                        IdEmpleado = Convert.ToInt32(rdr["id_Empleado"])
                    });
                }
                con.Close();
            }
            return lst;
        }


        //Crea reporte de monitoreo
        public List<Cat_ValoresMonitoreo> MonitoreoFeedback(int id_Empleado, int IdDepartamento, int IdVar)
        {
            List<Cat_ValoresMonitoreo> lst = new List<Cat_ValoresMonitoreo>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_MonitoreoFeedback", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@idempleado", id_Empleado);
                com.Parameters.AddWithValue("@tipo", IdDepartamento);
                com.Parameters.AddWithValue("@IdVariable", IdVar);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    if (IdDepartamento == 14)
                    {
                        lst.Add(new Cat_ValoresMonitoreo
                        {
                            IdAtributo = Convert.ToInt32(rdr["IdVariable"]),
                            Atributo = rdr["Atributo"].ToString(),
                            Rubro = rdr["Rubro"].ToString(),
                            Variable = rdr["Variable"].ToString(),
                            Ponderacion = Double.Parse(rdr["Ponderacion"].ToString()),
                            CalificacionTotalRVT = Convert.ToInt32(rdr["CalificacionRVT"]),
                            CalificacionTotalValidador = (rdr["CalificacionVal"] != DBNull.Value) ? Convert.ToInt32(rdr["CalificacionVal"]) : 0,
                            DescripcionLlamadaRVT = (rdr["DescripcionLlamadaRVT"] != DBNull.Value) ? rdr["DescripcionLlamadaRVT"].ToString() : "",
                            FeedbakRVT = (rdr["FeedbakRVT"] != DBNull.Value) ? rdr["FeedbakRVT"].ToString() : "",
                            MaxPonderacion = Double.Parse(rdr["MaxPonderacion"].ToString()),
                            IdCampana= Convert.ToInt32(rdr["Id_Campana"]),
                            Comentarios = rdr["Comentarios"].ToString()

                            //DescripcionLlamadaValidador = (rdr["DescripcionLlamadaValidador"] != DBNull.Value) ? rdr["DescripcionLlamadaValidador"].ToString() : "",
                            //FeedbakValidador = (rdr["FeedbakValidador"] != DBNull.Value) ? rdr["FeedbakValidador"].ToString() : ""
                        });
                    }
                    else if (IdDepartamento == 26)
                    {
                        lst.Add(new Cat_ValoresMonitoreo
                        {
                            IdAtributo = Convert.ToInt32(rdr["IdVariable"]),
                            Atributo = rdr["Atributo"].ToString(),
                            Rubro = rdr["Rubro"].ToString(),
                            Variable = rdr["Variable"].ToString(),
                            Ponderacion = Double.Parse(rdr["Ponderacion"].ToString()),
                            CalificacionTotalRVT = Convert.ToInt32(rdr["CalificacionRVT"]),
                            CalificacionTotalValidador = (rdr["CalificacionVal"] != DBNull.Value) ? Convert.ToInt32(rdr["CalificacionVal"]) : 0,
                            //DescripcionLlamadaRVT = (rdr["DescripcionLlamadaRVT"] != DBNull.Value) ? rdr["DescripcionLlamadaRVT"].ToString() : "",
                            //FeedbakRVT = (rdr["FeedbakRVT"] != DBNull.Value) ? rdr["FeedbakRVT"].ToString() : "",
                            DescripcionLlamadaValidador = (rdr["DescripcionLlamadaValidador"] != DBNull.Value) ? rdr["DescripcionLlamadaValidador"].ToString() : "",
                            FeedbakValidador = (rdr["FeedbakValidador"] != DBNull.Value) ? rdr["FeedbakValidador"].ToString() : "",
                            MaxPonderacion = Double.Parse(rdr["MaxPonderacion"].ToString()),
                            IdCampana = Convert.ToInt32(rdr["Id_Campana"]),
                            Comentarios = rdr["Comentarios"].ToString()
                        });
                    }

                }
            }
            return lst;
        }

    

        //Metodo que carga a los validadores
        public List<tbl_Empleados> CargarVal()
        {
            List<tbl_Empleados> lst = new List<tbl_Empleados>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CargarValidadores", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Empleados
                    {
                        id_Empleado = Convert.ToInt32(rdr["id_Empleado"]),
                        Nombre_1 = rdr["NombreCompleto"].ToString()
                    });
                }
            }
            return lst;
        }


        //Carga el catalogo de las campañas
        public List<Cat_Campana> CargarCampanas()
        {
            List<Cat_Campana> lst = new List<Cat_Campana>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_LlenarCatCampana", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Cat_Campana
                    {
                        Id_Campana = Convert.ToInt32(rdr["Id_Campana"]),
                        Nombre_Campana = rdr["Nombre_Campana"].ToString()
                    });
                }
            }
            return lst;
        }


        //Metodo que carga a los validadores
        public List<tbl_Empleados> CargarSuper()
        {
            List<tbl_Empleados> lst = new List<tbl_Empleados>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CargarSupervisores", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Empleados
                    {
                        id_Empleado = Convert.ToInt32(rdr["id_Empleado"]),
                        Nombre_1 = rdr["NombreCompleto"].ToString()
                    });
                }
                con.Close();
            }
            return lst;
        }


        //Consulta y regresa información para generar el reporte de Rondines
        public List<tbl_Monitoreo> CrearLayoutMonitoreo(tbl_Monitoreo tm)
        {
            List<tbl_Monitoreo> lst = new List<tbl_Monitoreo>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_ReporteMonitoreoCalidad", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_Campana", tm.Id_Campana);
                com.Parameters.AddWithValue("@FechaInicio", tm.FechaInicio);
                com.Parameters.AddWithValue("@FechaFin", tm.FechaFin);
                com.Parameters.AddWithValue("@usuario", tm.IdAnalista);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    if (tm.Id_Campana == 26 || tm.Id_Campana == 27 || tm.Id_Campana == 32)
                    {
                        lst.Add(new tbl_Monitoreo
                        {
                            //Campaña ECS
                            StatusTramite = rdr["StatusTramite"].ToString(),
                            Calibracion = rdr["Calibracion"].ToString(),
                            NombreRVT = rdr["Nombre del ejecutivo"].ToString(),
                            SuperRVT = rdr["Nombre del supervisor"].ToString(),
                            NombreValidador = (rdr["Nombre de Validador"] != DBNull.Value) ? rdr["Nombre de Validador"].ToString() : "N/A ",
                            SuperVal = (rdr["Nombre del supervisor"] != DBNull.Value) ? rdr["Nombre del supervisor"].ToString() : "N/A ",
                            Centro = rdr["Centro"].ToString(),
                            NombreAnalista = rdr["Nombre de Analista"].ToString(),
                            NombreCliente = rdr["NombreCliente"].ToString(),
                            FechaVenta = rdr["FechaVenta"].ToString(),
                            FechaEva = rdr["FechaEva"].ToString(),
                            FolioECS = rdr["FolioECS"].ToString(),
                            Telefonico = rdr["Telefonico"].ToString(),
                            Comentarios = (rdr["Comentarios"] != DBNull.Value) ? rdr["Comentarios"].ToString() : "",
                            CalificacionRVT = Convert.ToInt32(rdr["CalificacionRVT"]),
                            CalificacionVal = (rdr["CalificacionVal"] != DBNull.Value) ? Convert.ToInt32(rdr["CalificacionVal"].ToString()) : 0,
                            TotalLlamada = Convert.ToInt32(rdr["TotalLlamada"]),
                            TipiECS = (rdr["TipificacionRVT"] != DBNull.Value) ? rdr["TipificacionRVT"].ToString() : " ",

                            ErrorCriticoRVTECS = rdr["ErrorCriticoRVT"].ToString(),

                            ErrorCriticoValECS = (rdr["ErrorCriticoVal"] != DBNull.Value) ? rdr["ErrorCriticoVal"].ToString() : "N/A ",
                            NivelS = rdr["NivelS"].ToString(),
                            audioc = rdr["AudioC"].ToString(),
                            audioe = rdr["AudioE"].ToString(),
                            audiov = rdr["AudioV"].ToString(),

                            Pregunta1 = (rdr["P1"] != DBNull.Value) ? rdr["P1"].ToString() : "N/A",
                            Pregunta2 = (rdr["P2"] != DBNull.Value) ? rdr["P2"].ToString() : "N/A",
                            Pregunta3 = (rdr["P3"] != DBNull.Value) ? rdr["P3"].ToString() : "N/A",
                            Pregunta4 = (rdr["P4"] != DBNull.Value) ? rdr["P4"].ToString() : "N/A",
                            Pregunta5 = (rdr["P5"] != DBNull.Value) ? rdr["P5"].ToString() : "N/A ",
                            Pregunta6 = (rdr["P6"] != DBNull.Value) ? rdr["P6"].ToString() : "N/A ",
                            Pregunta7 = (rdr["P7"] != DBNull.Value) ? rdr["P7"].ToString() : "N/A ",
                            Pregunta8 = (rdr["P8"] != DBNull.Value) ? rdr["P8"].ToString() : "N/A ",
                            Pregunta9 = (rdr["P9"] != DBNull.Value) ? rdr["P9"].ToString() : "N/A ",
                            Pregunta10 = (rdr["P10"] != DBNull.Value) ? rdr["P10"].ToString() : "N/A ",
                            Pregunta11 = (rdr["P11"] != DBNull.Value) ? rdr["P11"].ToString() : "N/A ",
                            Pregunta12 = (rdr["P12"] != DBNull.Value) ? rdr["P12"].ToString() : "N/A ",
                            Pregunta13 = (rdr["P13"] != DBNull.Value) ? rdr["P13"].ToString() : "N/A ",
                            Pregunta14 = (rdr["P14"] != DBNull.Value) ? rdr["P14"].ToString() : "N/A ",
                            Pregunta15 = (rdr["P15"] != DBNull.Value) ? rdr["P15"].ToString() : "N/A ",
                            Pregunta16 = (rdr["P16"] != DBNull.Value) ? rdr["P16"].ToString() : "N/A ",
                            Pregunta17 = (rdr["P17"] != DBNull.Value) ? rdr["P17"].ToString() : "N/A ",
                            Pregunta18 = (rdr["P18"] != DBNull.Value) ? rdr["P18"].ToString() : "N/A ",
                            Pregunta19 = (rdr["P19"] != DBNull.Value) ? rdr["P19"].ToString() : "N/A ",
                            Pregunta20 = (rdr["P20"] != DBNull.Value) ? rdr["P20"].ToString() : "N/A ",
                            Pregunta21 = (rdr["P21"] != DBNull.Value) ? rdr["P21"].ToString() : "N/A ",
                            Pregunta22 = (rdr["P22"] != DBNull.Value) ? rdr["P22"].ToString() : "N/A ",
                            Pregunta23 = (rdr["P23"] != DBNull.Value) ? rdr["P23"].ToString() : "N/A ",
                            Pregunta24 = (rdr["P24"] != DBNull.Value) ? rdr["P24"].ToString() : "N/A ",
                            Pregunta25 = (rdr["P25"] != DBNull.Value) ? rdr["P25"].ToString() : "N/A ",
                            Pregunta26 = (rdr["P26"] != DBNull.Value) ? rdr["P26"].ToString() : "N/A ",
                            Pregunta27 = (rdr["P27"] != DBNull.Value) ? rdr["P27"].ToString() : "N/A ",
                            Pregunta28 = (rdr["P28"] != DBNull.Value) ? rdr["P28"].ToString() : "N/A ",
                            Pregunta29 = (rdr["P29"] != DBNull.Value) ? rdr["P29"].ToString() : "N/A ",
                            Pregunta30 = (rdr["P30"] != DBNull.Value) ? rdr["P30"].ToString() : "N/A ",
                            Pregunta31 = (rdr["P31"] != DBNull.Value) ? rdr["P31"].ToString() : "N/A ",
                            Pregunta32 = (rdr["P32"] != DBNull.Value) ? rdr["P32"].ToString() : "N/A ",
                            Pregunta33 = (rdr["P33"] != DBNull.Value) ? rdr["P33"].ToString() : "N/A ",
                            Pregunta34 = (rdr["P34"] != DBNull.Value) ? rdr["P34"].ToString() : "N/A ",
                            Pregunta35 = (rdr["P35"] != DBNull.Value) ? rdr["P35"].ToString() : "N/A ",
                            Pregunta36 = (rdr["P36"] != DBNull.Value) ? rdr["P36"].ToString() : "N/A ",

                            Pregunta37 = (rdr["P37"] != DBNull.Value) ? rdr["P37"].ToString() : "N/A ",
                            Pregunta38 = (rdr["P38"] != DBNull.Value) ? rdr["P38"].ToString() : "N/A ",
                            Pregunta39 = (rdr["P39"] != DBNull.Value) ? rdr["P39"].ToString() : "N/A ",
                            Pregunta40 = (rdr["P40"] != DBNull.Value) ? rdr["P40"].ToString() : "N/A ",
                            Pregunta41 = (rdr["P41"] != DBNull.Value) ? rdr["P41"].ToString() : "N/A ",
                            Pregunta42 = (rdr["P42"] != DBNull.Value) ? rdr["P42"].ToString() : "N/A ",
                            Pregunta43 = (rdr["P43"] != DBNull.Value) ? rdr["P43"].ToString() : "N/A ",
                            Pregunta44 = (rdr["P44"] != DBNull.Value) ? rdr["P44"].ToString() : "N/A ",
                            Pregunta45 = (rdr["P45"] != DBNull.Value) ? rdr["P45"].ToString() : "N/A ",
                            Pregunta46 = (rdr["P46"] != DBNull.Value) ? rdr["P46"].ToString() : "N/A ",
                            Pregunta47 = (rdr["P47"] != DBNull.Value) ? rdr["P47"].ToString() : "N/A ",
                            Pregunta48 = (rdr["P48"] != DBNull.Value) ? rdr["P48"].ToString() : "N/A ",
                            Pregunta49 = (rdr["P49"] != DBNull.Value) ? rdr["P49"].ToString() : "N/A ",
                            Pregunta50 = (rdr["P50"] != DBNull.Value) ? rdr["P50"].ToString() : "N/A ",
                            Pregunta51 = (rdr["P51"] != DBNull.Value) ? rdr["P51"].ToString() : "N/A ",
                            Pregunta52 = (rdr["P52"] != DBNull.Value) ? rdr["P52"].ToString() : "N/A ",
                            Pregunta53 = (rdr["P53"] != DBNull.Value) ? rdr["P53"].ToString() : "N/A ",
                            Pregunta54 = (rdr["P54"] != DBNull.Value) ? rdr["P54"].ToString() : "N/A ",
                            Pregunta55 = (rdr["P55"] != DBNull.Value) ? rdr["P55"].ToString() : "N/A ",
                            Pregunta56 = (rdr["P56"] != DBNull.Value) ? rdr["P56"].ToString() : "N/A ",
                            Pregunta57 = (rdr["P57"] != DBNull.Value) ? rdr["P57"].ToString() : "N/A ",
                            Pregunta58 = (rdr["P58"] != DBNull.Value) ? rdr["P58"].ToString() : "N/A ",
                            Pregunta59 = (rdr["P59"] != DBNull.Value) ? rdr["P59"].ToString() : "N/A ",
                            Pregunta60 = (rdr["P60"] != DBNull.Value) ? rdr["P60"].ToString() : "N/A ",
                            Pregunta61 = (rdr["P61"] != DBNull.Value) ? rdr["P61"].ToString() : "N/A ",
                            Pregunta62 = (rdr["P62"] != DBNull.Value) ? rdr["P62"].ToString() : "N/A ",
                            Pregunta63 = (rdr["P63"] != DBNull.Value) ? rdr["P63"].ToString() : "N/A ",
                            Pregunta64 = (rdr["P64"] != DBNull.Value) ? rdr["P64"].ToString() : "N/A ",
                            Pregunta65 = (rdr["P65"] != DBNull.Value) ? rdr["P65"].ToString() : "N/A ",
                            Pregunta66 = (rdr["P66"] != DBNull.Value) ? rdr["P66"].ToString() : "N/A ",
                            Pregunta67 = (rdr["P67"] != DBNull.Value) ? rdr["P67"].ToString() : "N/A ",
                            Pregunta68 = (rdr["P68"] != DBNull.Value) ? rdr["P68"].ToString() : "N/A ",
                            Pregunta69 = (rdr["P69"] != DBNull.Value) ? rdr["P69"].ToString() : "N/A ",
                            Pregunta70 = (rdr["P70"] != DBNull.Value) ? rdr["P70"].ToString() : "N/A ",
                            Pregunta71 = (rdr["P71"] != DBNull.Value) ? rdr["P71"].ToString() : "N/A ",
                            Pregunta72 = (rdr["P72"] != DBNull.Value) ? rdr["P72"].ToString() : "N/A ",
                            Pregunta73 = (rdr["P73"] != DBNull.Value) ? rdr["P73"].ToString() : "N/A ",
                            Pregunta74 = (rdr["P74"] != DBNull.Value) ? rdr["P74"].ToString() : "N/A ",
                            Pregunta75 = (rdr["P75"] != DBNull.Value) ? rdr["P75"].ToString() : "N/A ",
                            Pregunta76 = (rdr["P76"] != DBNull.Value) ? rdr["P76"].ToString() : "N/A ",
                            Pregunta77 = (rdr["P77"] != DBNull.Value) ? rdr["P77"].ToString() : "N/A ",
                            Pregunta78 = (rdr["P78"] != DBNull.Value) ? rdr["P78"].ToString() : "N/A ",
                            Pregunta79 = (rdr["P79"] != DBNull.Value) ? rdr["P79"].ToString() : "N/A ",
                            Pregunta80 = (rdr["P80"] != DBNull.Value) ? rdr["P80"].ToString() : "N/A ",
                            Pregunta81 = (rdr["P81"] != DBNull.Value) ? rdr["P81"].ToString() : "N/A ",
                            Pregunta82 = (rdr["P82"] != DBNull.Value) ? rdr["P82"].ToString() : "N/A ",
                            Pregunta83 = (rdr["P83"] != DBNull.Value) ? rdr["P83"].ToString() : "N/A ",
                            Pregunta84 = (rdr["P84"] != DBNull.Value) ? rdr["P84"].ToString() : "N/A ",
                            Pregunta85 = (rdr["P85"] != DBNull.Value) ? rdr["P85"].ToString() : "N/A ",
                            Pregunta86 = (rdr["P86"] != DBNull.Value) ? rdr["P86"].ToString() : "N/A ",
                            Pregunta87 = (rdr["P87"] != DBNull.Value) ? rdr["P87"].ToString() : "N/A ",
                            Pregunta88 = (rdr["P88"] != DBNull.Value) ? rdr["P88"].ToString() : "N/A ",
                            Pregunta89 = (rdr["P89"] != DBNull.Value) ? rdr["P89"].ToString() : "N/A ",
                            Pregunta90 = (rdr["P90"] != DBNull.Value) ? rdr["P90"].ToString() : "N/A ",
                            Pregunta91 = (rdr["P91"] != DBNull.Value) ? rdr["P91"].ToString() : "N/A ",
                            Pregunta92 = (rdr["P92"] != DBNull.Value) ? rdr["P92"].ToString() : "N/A ",
                            Pregunta93 = (rdr["P93"] != DBNull.Value) ? rdr["P93"].ToString() : "N/A ",
                            Pregunta94 = (rdr["P94"] != DBNull.Value) ? rdr["P94"].ToString() : "N/A ",
                            Pregunta95 = (rdr["P95"] != DBNull.Value) ? rdr["P95"].ToString() : "N/A ",
                            Pregunta96 = (rdr["P96"] != DBNull.Value) ? rdr["P96"].ToString() : "N/A ",
                            Pregunta97 = (rdr["P97"] != DBNull.Value) ? rdr["P97"].ToString() : "N/A ",
                            Pregunta98 = (rdr["P98"] != DBNull.Value) ? rdr["P98"].ToString() : "N/A ",
                            Pregunta99 = (rdr["P99"] != DBNull.Value) ? rdr["P99"].ToString() : "N/A ",
                            Pregunta100 = (rdr["P100"] != DBNull.Value) ? rdr["P100"].ToString() : "N/A ",
                            Pregunta101 = (rdr["P101"] != DBNull.Value) ? rdr["P101"].ToString() : "N/A ",
                            Pregunta102 = (rdr["P102"] != DBNull.Value) ? rdr["P102"].ToString() : "N/A ",
                            Pregunta103 = (rdr["P103"] != DBNull.Value) ? rdr["P103"].ToString() : "N/A ",
                            Pregunta104 = (rdr["P104"] != DBNull.Value) ? rdr["P104"].ToString() : "N/A ",
                            Pregunta105 = (rdr["P105"] != DBNull.Value) ? rdr["P105"].ToString() : "N/A ",
                            Pregunta106 = (rdr["P106"] != DBNull.Value) ? rdr["P106"].ToString() : "N/A ",
                            Pregunta107 = (rdr["P107"] != DBNull.Value) ? rdr["P107"].ToString() : "N/A ",
                            Pregunta108 = (rdr["P108"] != DBNull.Value) ? rdr["P108"].ToString() : "N/A ",
                            Pregunta109 = (rdr["P109"] != DBNull.Value) ? rdr["P109"].ToString() : "N/A ",
                            Pregunta110 = (rdr["P110"] != DBNull.Value) ? rdr["P110"].ToString() : "N/A ",
                            Pregunta111 = (rdr["P111"] != DBNull.Value) ? rdr["P111"].ToString() : "N/A ",
                            Pregunta112 = (rdr["P112"] != DBNull.Value) ? rdr["P112"].ToString() : "N/A ",
                            Pregunta113 = (rdr["P113"] != DBNull.Value) ? rdr["P113"].ToString() : "N/A ",
                            Pregunta114 = (rdr["P114"] != DBNull.Value) ? rdr["P114"].ToString() : "N/A ",
                            Pregunta115 = (rdr["P115"] != DBNull.Value) ? rdr["P115"].ToString() : "N/A ",
                            Pregunta116 = (rdr["P116"] != DBNull.Value) ? rdr["P116"].ToString() : "N/A ",
                            Pregunta117 = (rdr["P117"] != DBNull.Value) ? rdr["P117"].ToString() : "N/A ",
                            Pregunta118 = (rdr["P118"] != DBNull.Value) ? rdr["P118"].ToString() : "N/A ",
                            Pregunta119 = (rdr["P119"] != DBNull.Value) ? rdr["P119"].ToString() : "N/A ",
                            Pregunta120 = (rdr["P120"] != DBNull.Value) ? rdr["P120"].ToString() : "N/A ",
                            Pregunta121 = (rdr["P121"] != DBNull.Value) ? rdr["P121"].ToString() : "N/A ",
                            Pregunta122 = (rdr["P122"] != DBNull.Value) ? rdr["P122"].ToString() : "N/A ",
                            Pregunta123 = (rdr["P123"] != DBNull.Value) ? rdr["P123"].ToString() : "N/A ",
                            Pregunta124 = (rdr["P124"] != DBNull.Value) ? rdr["P124"].ToString() : "N/A ",
                            Pregunta125 = (rdr["P125"] != DBNull.Value) ? rdr["P125"].ToString() : "N/A ",
                            Pregunta126 = (rdr["P126"] != DBNull.Value) ? rdr["P126"].ToString() : "N/A ",
                            Pregunta127 = (rdr["P127"] != DBNull.Value) ? rdr["P127"].ToString() : "N/A ",
                            RvtCompromiso = (rdr["RvtCompromiso"] != DBNull.Value) ? rdr["RvtCompromiso"].ToString() : "N/A ",
                            ValidadorCompromiso = (rdr["ValidadorCompromiso"] != DBNull.Value) ? rdr["ValidadorCompromiso"].ToString() : "N/A "


                        });
                    }

                    else
                    {
                        lst.Add(new tbl_Monitoreo

                        {

                          

                            //Todas las campañas

                            Serie = rdr["Serie"].ToString(),
                            Folio = rdr["Folio"].ToString(),
                            Telefono = rdr["Telefono"].ToString(),
                            FechaVenta = rdr["FechaVenta"].ToString(),
                            FechaEva = rdr["FechaEva"].ToString(),
                            Campana = rdr["Nombre_Campana"].ToString(),
                            NombreAnalista = rdr["Nombre de Analista"].ToString(),
                            NombreRVT = rdr["Nombre del ejecutivo"].ToString(),
                            TipoLlamada = rdr["TipoLlamada"].ToString(),
                            TipificacionRVT = rdr["TipificacionRVT"].ToString(),
                            TipificacionCorrecta = rdr["TipificacionCorrecta"].ToString(),
                            RVTTipiCorrect = rdr["RVTTipiCorrect"].ToString(),
                            CalificacionRVT = Convert.ToInt32(rdr["CalificacionRVT"]),
                            ErrorCriticoRVT = rdr["ErrorCriticoRVT"].ToString(),
                            NombreValidador = (rdr["Nombre de Validador"] != DBNull.Value) ? rdr["Nombre de Validador"].ToString() : "N/A ",
                            CalificacionVal = (rdr["CalificacionVal"] != DBNull.Value) ? Convert.ToInt32(rdr["CalificacionVal"].ToString()) : 0,
                            ErrorCriticoVal = (rdr["ErrorCriticoVal"] != DBNull.Value) ? rdr["ErrorCriticoVal"].ToString() : "N/A ",
                            DescripcionLlamadaRVT = (rdr["DescripcionLlamadaRVT"] != DBNull.Value) ? rdr["DescripcionLlamadaRVT"].ToString() : " ",
                            FeedbakRVT = (rdr["FeedbakRVT"] != DBNull.Value) ? rdr["FeedbakRVT"].ToString() : " ",
                            
                            RvtCompromiso = (rdr["RVTCompromiso"] != DBNull.Value) ? rdr["RVTCompromiso"].ToString() : " ",
                            DescripcionLlamadaValidador = (rdr["DescripcionLlamadaValidador"] != DBNull.Value) ? rdr["DescripcionLlamadaValidador"].ToString() : " ",
                            FeedbakValidador = (rdr["FeedbakValidador"] != DBNull.Value) ? rdr["FeedbakValidador"].ToString() : " ",
                            ValidadorCompromiso = (rdr["ValidadorCompromiso"] != DBNull.Value) ? rdr["ValidadorCompromiso"].ToString() : " ",
                            //FechaMonitoreo = rdr["FechaMonitoreo"].ToString(),
                            //FolioGrabacion = rdr["FolioGrabacion"].ToString(),
                            Pregunta1 = rdr["P1"].ToString(),
                            Pregunta2 = rdr["P2"].ToString(),
                            Pregunta3 = rdr["P3"].ToString(),
                            Pregunta4 = (rdr["P4"] != DBNull.Value) ? rdr["P4"].ToString() : "N/A",
                            Pregunta5 = (rdr["P5"] != DBNull.Value) ? rdr["P5"].ToString() : "N/A ",
                            Pregunta6 = rdr["P6"].ToString(),
                            Pregunta7 = rdr["P7"].ToString(),
                            Pregunta8 = rdr["P8"].ToString(),
                            Pregunta9 = rdr["P9"].ToString(),
                            Pregunta10 = rdr["P10"].ToString(),
                            Pregunta11 = rdr["P11"].ToString(),
                            Pregunta12 = rdr["P12"].ToString(),
                            Pregunta13 = (rdr["P13"] != DBNull.Value) ? rdr["P13"].ToString() : "N/A ",
                            Pregunta14 = rdr["P14"].ToString(),
                            Pregunta15 = rdr["P15"].ToString(),
                            Pregunta16 = rdr["P16"].ToString(),
                            Pregunta17 = rdr["P17"].ToString(),
                            Pregunta18 = rdr["P18"].ToString(),
                            Pregunta19 = rdr["P19"].ToString(),
                            Pregunta20 = rdr["P20"].ToString(),
                            Pregunta21 = rdr["P21"].ToString(),
                            Pregunta22 = rdr["P22"].ToString(),
                            Pregunta23 = rdr["P23"].ToString(),
                            Pregunta24 = rdr["P24"].ToString(),
                            Pregunta25 = rdr["P25"].ToString(),
                            Pregunta26 = rdr["P26"].ToString(),
                            Pregunta27 = rdr["P27"].ToString(),
                            Pregunta28 = rdr["P28"].ToString(),
                            Pregunta29 = rdr["P29"].ToString(),
                            Pregunta30 = rdr["P30"].ToString(),
                            Pregunta31 = rdr["P31"].ToString(),
                            Pregunta32 = rdr["P32"].ToString(),
                            Pregunta33 = rdr["P33"].ToString(),
                            Pregunta34 = rdr["P34"].ToString(),
                            Pregunta35 = rdr["P35"].ToString(),
                            Pregunta36 = rdr["P36"].ToString(),


                            Pregunta37 = (rdr["P37"] != DBNull.Value) ? rdr["P37"].ToString() : "N/A ",
                            Pregunta38 = (rdr["P38"] != DBNull.Value) ? rdr["P38"].ToString() : "N/A ",
                            Pregunta39 = (rdr["P39"] != DBNull.Value) ? rdr["P39"].ToString() : "N/A ",
                            Pregunta40 = (rdr["P40"] != DBNull.Value) ? rdr["P40"].ToString() : "N/A ",
                            Pregunta41 = (rdr["P41"] != DBNull.Value) ? rdr["P41"].ToString() : "N/A ",
                            Pregunta42 = (rdr["P42"] != DBNull.Value) ? rdr["P42"].ToString() : "N/A ",
                            Pregunta43 = (rdr["P43"] != DBNull.Value) ? rdr["P43"].ToString() : "N/A ",
                            Pregunta44 = (rdr["P44"] != DBNull.Value) ? rdr["P44"].ToString() : "N/A ",
                            Pregunta45 = (rdr["P45"] != DBNull.Value) ? rdr["P45"].ToString() : "N/A ",
                            Pregunta46 = (rdr["P46"] != DBNull.Value) ? rdr["P46"].ToString() : "N/A ",
                            Pregunta47 = (rdr["P47"] != DBNull.Value) ? rdr["P47"].ToString() : "N/A ",
                            Pregunta48 = (rdr["P48"] != DBNull.Value) ? rdr["P48"].ToString() : "N/A ",
                            Pregunta49 = (rdr["P49"] != DBNull.Value) ? rdr["P49"].ToString() : "N/A ",
                            Pregunta50 = (rdr["P50"] != DBNull.Value) ? rdr["P50"].ToString() : "N/A ",
                            Pregunta51 = (rdr["P51"] != DBNull.Value) ? rdr["P51"].ToString() : "N/A ",
                            Pregunta52 = (rdr["P52"] != DBNull.Value) ? rdr["P52"].ToString() : "N/A ",
                            Pregunta53 = (rdr["P53"] != DBNull.Value) ? rdr["P53"].ToString() : "N/A ",
                            Pregunta54 = (rdr["P54"] != DBNull.Value) ? rdr["P54"].ToString() : "N/A ",
                            Pregunta55 = (rdr["P55"] != DBNull.Value) ? rdr["P55"].ToString() : "N/A ",
                            Pregunta56 = (rdr["P56"] != DBNull.Value) ? rdr["P56"].ToString() : "N/A ",
                            Pregunta57 = (rdr["P57"] != DBNull.Value) ? rdr["P57"].ToString() : "N/A ",
                            Pregunta58 = (rdr["P58"] != DBNull.Value) ? rdr["P58"].ToString() : "N/A ",
                            Pregunta59 = (rdr["P59"] != DBNull.Value) ? rdr["P59"].ToString() : "N/A ",
                            Pregunta60 = (rdr["P60"] != DBNull.Value) ? rdr["P60"].ToString() : "N/A ",
                            Pregunta61 = (rdr["P61"] != DBNull.Value) ? rdr["P61"].ToString() : "N/A ",
                            Pregunta62 = (rdr["P62"] != DBNull.Value) ? rdr["P62"].ToString() : "N/A ",
                            Pregunta63 = (rdr["P63"] != DBNull.Value) ? rdr["P63"].ToString() : "N/A ",
                            Pregunta64 = (rdr["P64"] != DBNull.Value) ? rdr["P64"].ToString() : "N/A ",
                            Pregunta65 = (rdr["P65"] != DBNull.Value) ? rdr["P65"].ToString() : "N/A ",

                        });
                    }
                }

            }
            return lst;
        }


        public List<tbl_Monitoreo> CrearLayoutMonitoreoGeneral(tbl_Monitoreo tm)
        {
            List<tbl_Monitoreo> lst = new List<tbl_Monitoreo>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_ReporteGeneralMonitoreoCalidad", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_Campana", tm.Id_Campana);
                com.Parameters.AddWithValue("@FechaInicio", tm.FechaInicio);
                com.Parameters.AddWithValue("@FechaFin", tm.FechaFin);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    if (tm.Id_Campana == 2)
                    {
                        lst.Add(new tbl_Monitoreo
                        {
                            //Campaña ECS
                            Campana = rdr["Nombre_Campana"].ToString(),
                            StatusTramite = rdr["StatusTramite"].ToString(),
                            Calibracion = rdr["Calibracion"].ToString(),
                            NombreRVT = rdr["Nombre del ejecutivo"].ToString(),
                            SuperRVT = rdr["Nombre del supervisor"].ToString(),
                            NombreValidador = (rdr["Nombre de Validador"] != DBNull.Value) ? rdr["Nombre de Validador"].ToString() : "N/A ",
                            SuperVal = (rdr["Nombre del supervisor"] != DBNull.Value) ? rdr["Nombre del supervisor"].ToString() : "N/A ",
                            Centro = rdr["Centro"].ToString(),
                            NombreAnalista = rdr["Nombre de Analista"].ToString(),
                            NombreCliente = rdr["NombreCliente"].ToString(),
                            FechaVenta = rdr["FechaVenta"].ToString(),
                            FechaEva = rdr["FechaEva"].ToString(),
                            FolioECS = rdr["FolioECS"].ToString(),
                            Telefonico = rdr["Telefonico"].ToString(),
                            Comentarios = (rdr["Comentarios"] != DBNull.Value) ? rdr["Comentarios"].ToString() : "",
                            CalificacionRVT = Convert.ToInt32(rdr["CalificacionRVT"]),
                            CalificacionVal = (rdr["CalificacionVal"] != DBNull.Value) ? Convert.ToInt32(rdr["CalificacionVal"].ToString()) : 0,
                            TotalLlamada = Convert.ToInt32(rdr["TotalLlamada"]),
                            TipiECS = (rdr["TipificacionRVT"] != DBNull.Value) ? rdr["TipificacionRVT"].ToString() : " ",

                            ErrorCriticoRVTECS = rdr["ErrorCriticoRVT"].ToString(),
                            ErrorCriticoValECS = (rdr["ErrorCriticoVal"] != DBNull.Value) ? rdr["ErrorCriticoVal"].ToString() : "N/A ",
                            NivelS = rdr["NivelS"].ToString(),
                            audioc = rdr["AudioC"].ToString(),
                            audioe = rdr["AudioE"].ToString(),
                            audiov = rdr["AudioV"].ToString(),

                            Pregunta1 = (rdr["P1"] != DBNull.Value) ? rdr["P1"].ToString() : "N/A",
                            Pregunta2 = (rdr["P2"] != DBNull.Value) ? rdr["P2"].ToString() : "N/A",
                            Pregunta3 = (rdr["P3"] != DBNull.Value) ? rdr["P3"].ToString() : "N/A",
                            Pregunta4 = (rdr["P4"] != DBNull.Value) ? rdr["P4"].ToString() : "N/A",
                            Pregunta5 = (rdr["P5"] != DBNull.Value) ? rdr["P5"].ToString() : "N/A ",
                            Pregunta6 = (rdr["P6"] != DBNull.Value) ? rdr["P6"].ToString() : "N/A ",
                            Pregunta7 = (rdr["P7"] != DBNull.Value) ? rdr["P7"].ToString() : "N/A ",
                            Pregunta8 = (rdr["P8"] != DBNull.Value) ? rdr["P8"].ToString() : "N/A ",
                            Pregunta9 = (rdr["P9"] != DBNull.Value) ? rdr["P9"].ToString() : "N/A ",
                            Pregunta10 = (rdr["P10"] != DBNull.Value) ? rdr["P10"].ToString() : "N/A ",
                            Pregunta11 = (rdr["P11"] != DBNull.Value) ? rdr["P11"].ToString() : "N/A ",
                            Pregunta12 = (rdr["P12"] != DBNull.Value) ? rdr["P12"].ToString() : "N/A ",
                            Pregunta13 = (rdr["P13"] != DBNull.Value) ? rdr["P13"].ToString() : "N/A ",
                            Pregunta14 = (rdr["P14"] != DBNull.Value) ? rdr["P14"].ToString() : "N/A ",
                            Pregunta15 = (rdr["P15"] != DBNull.Value) ? rdr["P15"].ToString() : "N/A ",
                            Pregunta16 = (rdr["P16"] != DBNull.Value) ? rdr["P16"].ToString() : "N/A ",
                            Pregunta17 = (rdr["P17"] != DBNull.Value) ? rdr["P17"].ToString() : "N/A ",
                            Pregunta18 = (rdr["P18"] != DBNull.Value) ? rdr["P18"].ToString() : "N/A ",
                            Pregunta19 = (rdr["P19"] != DBNull.Value) ? rdr["P19"].ToString() : "N/A ",
                            Pregunta20 = (rdr["P20"] != DBNull.Value) ? rdr["P20"].ToString() : "N/A ",
                            Pregunta21 = (rdr["P21"] != DBNull.Value) ? rdr["P21"].ToString() : "N/A ",
                            Pregunta22 = (rdr["P22"] != DBNull.Value) ? rdr["P22"].ToString() : "N/A ",
                            Pregunta23 = (rdr["P23"] != DBNull.Value) ? rdr["P23"].ToString() : "N/A ",
                            Pregunta24 = (rdr["P24"] != DBNull.Value) ? rdr["P24"].ToString() : "N/A ",
                            Pregunta25 = (rdr["P25"] != DBNull.Value) ? rdr["P25"].ToString() : "N/A ",
                            Pregunta26 = (rdr["P26"] != DBNull.Value) ? rdr["P26"].ToString() : "N/A ",
                            Pregunta27 = (rdr["P27"] != DBNull.Value) ? rdr["P27"].ToString() : "N/A ",
                            Pregunta28 = (rdr["P28"] != DBNull.Value) ? rdr["P28"].ToString() : "N/A ",
                            Pregunta29 = (rdr["P29"] != DBNull.Value) ? rdr["P29"].ToString() : "N/A ",
                            Pregunta30 = (rdr["P30"] != DBNull.Value) ? rdr["P30"].ToString() : "N/A ",
                            Pregunta31 = (rdr["P31"] != DBNull.Value) ? rdr["P31"].ToString() : "N/A ",
                            Pregunta32 = (rdr["P32"] != DBNull.Value) ? rdr["P32"].ToString() : "N/A ",
                            Pregunta33 = (rdr["P33"] != DBNull.Value) ? rdr["P33"].ToString() : "N/A ",
                            Pregunta34 = (rdr["P34"] != DBNull.Value) ? rdr["P34"].ToString() : "N/A ",
                            Pregunta35 = (rdr["P35"] != DBNull.Value) ? rdr["P35"].ToString() : "N/A ",
                            Pregunta36 = (rdr["P36"] != DBNull.Value) ? rdr["P36"].ToString() : "N/A ",

                            Pregunta37 = (rdr["P37"] != DBNull.Value) ? rdr["P37"].ToString() : "N/A ",
                            Pregunta38 = (rdr["P38"] != DBNull.Value) ? rdr["P38"].ToString() : "N/A ",
                            Pregunta39 = (rdr["P39"] != DBNull.Value) ? rdr["P39"].ToString() : "N/A ",
                            Pregunta40 = (rdr["P40"] != DBNull.Value) ? rdr["P40"].ToString() : "N/A ",
                            Pregunta41 = (rdr["P41"] != DBNull.Value) ? rdr["P41"].ToString() : "N/A ",
                            Pregunta42 = (rdr["P42"] != DBNull.Value) ? rdr["P42"].ToString() : "N/A ",
                            Pregunta43 = (rdr["P43"] != DBNull.Value) ? rdr["P43"].ToString() : "N/A ",
                            Pregunta44 = (rdr["P44"] != DBNull.Value) ? rdr["P44"].ToString() : "N/A ",
                            Pregunta45 = (rdr["P45"] != DBNull.Value) ? rdr["P45"].ToString() : "N/A ",
                            Pregunta46 = (rdr["P46"] != DBNull.Value) ? rdr["P46"].ToString() : "N/A ",
                            Pregunta47 = (rdr["P47"] != DBNull.Value) ? rdr["P47"].ToString() : "N/A ",
                            Pregunta48 = (rdr["P48"] != DBNull.Value) ? rdr["P48"].ToString() : "N/A ",
                            Pregunta49 = (rdr["P49"] != DBNull.Value) ? rdr["P49"].ToString() : "N/A ",
                            Pregunta50 = (rdr["P50"] != DBNull.Value) ? rdr["P50"].ToString() : "N/A ",
                            Pregunta51 = (rdr["P51"] != DBNull.Value) ? rdr["P51"].ToString() : "N/A ",
                            Pregunta52 = (rdr["P52"] != DBNull.Value) ? rdr["P52"].ToString() : "N/A ",
                            Pregunta53 = (rdr["P53"] != DBNull.Value) ? rdr["P53"].ToString() : "N/A ",
                            Pregunta54 = (rdr["P54"] != DBNull.Value) ? rdr["P54"].ToString() : "N/A ",
                            Pregunta55 = (rdr["P55"] != DBNull.Value) ? rdr["P55"].ToString() : "N/A ",
                            Pregunta56 = (rdr["P56"] != DBNull.Value) ? rdr["P56"].ToString() : "N/A ",
                            Pregunta57 = (rdr["P57"] != DBNull.Value) ? rdr["P57"].ToString() : "N/A ",
                            Pregunta58 = (rdr["P58"] != DBNull.Value) ? rdr["P58"].ToString() : "N/A ",
                            Pregunta59 = (rdr["P59"] != DBNull.Value) ? rdr["P59"].ToString() : "N/A ",
                            Pregunta60 = (rdr["P60"] != DBNull.Value) ? rdr["P60"].ToString() : "N/A ",
                            Pregunta61 = (rdr["P61"] != DBNull.Value) ? rdr["P61"].ToString() : "N/A ",
                            Pregunta62 = (rdr["P62"] != DBNull.Value) ? rdr["P62"].ToString() : "N/A ",
                            Pregunta63 = (rdr["P63"] != DBNull.Value) ? rdr["P63"].ToString() : "N/A ",
                            Pregunta64 = (rdr["P64"] != DBNull.Value) ? rdr["P64"].ToString() : "N/A ",
                            Pregunta65 = (rdr["P65"] != DBNull.Value) ? rdr["P65"].ToString() : "N/A ",
                            Pregunta66 = (rdr["P66"] != DBNull.Value) ? rdr["P66"].ToString() : "N/A ",
                            Pregunta67 = (rdr["P67"] != DBNull.Value) ? rdr["P67"].ToString() : "N/A ",
                            Pregunta68 = (rdr["P68"] != DBNull.Value) ? rdr["P68"].ToString() : "N/A ",
                            Pregunta69 = (rdr["P69"] != DBNull.Value) ? rdr["P69"].ToString() : "N/A ",
                            Pregunta70 = (rdr["P70"] != DBNull.Value) ? rdr["P70"].ToString() : "N/A ",
                            Pregunta71 = (rdr["P71"] != DBNull.Value) ? rdr["P71"].ToString() : "N/A ",
                            Pregunta72 = (rdr["P72"] != DBNull.Value) ? rdr["P72"].ToString() : "N/A ",
                            Pregunta73 = (rdr["P73"] != DBNull.Value) ? rdr["P73"].ToString() : "N/A ",
                            Pregunta74 = (rdr["P74"] != DBNull.Value) ? rdr["P74"].ToString() : "N/A ",
                            Pregunta75 = (rdr["P75"] != DBNull.Value) ? rdr["P75"].ToString() : "N/A ",
                            Pregunta76 = (rdr["P76"] != DBNull.Value) ? rdr["P76"].ToString() : "N/A ",
                            Pregunta77 = (rdr["P77"] != DBNull.Value) ? rdr["P77"].ToString() : "N/A ",
                            Pregunta78 = (rdr["P78"] != DBNull.Value) ? rdr["P78"].ToString() : "N/A ",
                            Pregunta79 = (rdr["P79"] != DBNull.Value) ? rdr["P79"].ToString() : "N/A ",
                            Pregunta80 = (rdr["P80"] != DBNull.Value) ? rdr["P80"].ToString() : "N/A ",
                            Pregunta81 = (rdr["P81"] != DBNull.Value) ? rdr["P81"].ToString() : "N/A ",
                            Pregunta82 = (rdr["P82"] != DBNull.Value) ? rdr["P82"].ToString() : "N/A ",
                            Pregunta83 = (rdr["P83"] != DBNull.Value) ? rdr["P83"].ToString() : "N/A ",
                            Pregunta84 = (rdr["P84"] != DBNull.Value) ? rdr["P84"].ToString() : "N/A ",
                            Pregunta85 = (rdr["P85"] != DBNull.Value) ? rdr["P85"].ToString() : "N/A ",
                            Pregunta86 = (rdr["P86"] != DBNull.Value) ? rdr["P86"].ToString() : "N/A ",
                            Pregunta87 = (rdr["P87"] != DBNull.Value) ? rdr["P87"].ToString() : "N/A ",
                            Pregunta88 = (rdr["P88"] != DBNull.Value) ? rdr["P88"].ToString() : "N/A ",
                            Pregunta89 = (rdr["P89"] != DBNull.Value) ? rdr["P89"].ToString() : "N/A ",
                            Pregunta90 = (rdr["P90"] != DBNull.Value) ? rdr["P90"].ToString() : "N/A ",
                            Pregunta91 = (rdr["P91"] != DBNull.Value) ? rdr["P91"].ToString() : "N/A ",
                            Pregunta92 = (rdr["P92"] != DBNull.Value) ? rdr["P92"].ToString() : "N/A ",
                            Pregunta93 = (rdr["P93"] != DBNull.Value) ? rdr["P93"].ToString() : "N/A ",
                            Pregunta94 = (rdr["P94"] != DBNull.Value) ? rdr["P94"].ToString() : "N/A ",
                            Pregunta95 = (rdr["P95"] != DBNull.Value) ? rdr["P95"].ToString() : "N/A ",
                            Pregunta96 = (rdr["P96"] != DBNull.Value) ? rdr["P96"].ToString() : "N/A ",
                            Pregunta97 = (rdr["P97"] != DBNull.Value) ? rdr["P97"].ToString() : "N/A ",
                            Pregunta98 = (rdr["P98"] != DBNull.Value) ? rdr["P98"].ToString() : "N/A ",
                            Pregunta99 = (rdr["P99"] != DBNull.Value) ? rdr["P99"].ToString() : "N/A ",
                            Pregunta100 = (rdr["P100"] != DBNull.Value) ? rdr["P100"].ToString() : "N/A ",
                            Pregunta101 = (rdr["P101"] != DBNull.Value) ? rdr["P101"].ToString() : "N/A ",
                            Pregunta102 = (rdr["P102"] != DBNull.Value) ? rdr["P102"].ToString() : "N/A ",
                            Pregunta103 = (rdr["P103"] != DBNull.Value) ? rdr["P103"].ToString() : "N/A ",
                            Pregunta104 = (rdr["P104"] != DBNull.Value) ? rdr["P104"].ToString() : "N/A ",
                            Pregunta105 = (rdr["P105"] != DBNull.Value) ? rdr["P105"].ToString() : "N/A ",
                            Pregunta106 = (rdr["P106"] != DBNull.Value) ? rdr["P106"].ToString() : "N/A ",
                            Pregunta107 = (rdr["P107"] != DBNull.Value) ? rdr["P107"].ToString() : "N/A ",
                            Pregunta108 = (rdr["P108"] != DBNull.Value) ? rdr["P108"].ToString() : "N/A ",
                            Pregunta109 = (rdr["P109"] != DBNull.Value) ? rdr["P109"].ToString() : "N/A ",
                            Pregunta110 = (rdr["P110"] != DBNull.Value) ? rdr["P110"].ToString() : "N/A ",
                            Pregunta111 = (rdr["P111"] != DBNull.Value) ? rdr["P111"].ToString() : "N/A ",
                            Pregunta112 = (rdr["P112"] != DBNull.Value) ? rdr["P112"].ToString() : "N/A ",
                            Pregunta113 = (rdr["P113"] != DBNull.Value) ? rdr["P113"].ToString() : "N/A ",
                            Pregunta114 = (rdr["P114"] != DBNull.Value) ? rdr["P114"].ToString() : "N/A ",
                            Pregunta115 = (rdr["P115"] != DBNull.Value) ? rdr["P115"].ToString() : "N/A ",
                            Pregunta116 = (rdr["P116"] != DBNull.Value) ? rdr["P116"].ToString() : "N/A ",
                            Pregunta117 = (rdr["P117"] != DBNull.Value) ? rdr["P117"].ToString() : "N/A ",
                            Pregunta118 = (rdr["P118"] != DBNull.Value) ? rdr["P118"].ToString() : "N/A ",
                            Pregunta119 = (rdr["P119"] != DBNull.Value) ? rdr["P119"].ToString() : "N/A ",
                            Pregunta120 = (rdr["P120"] != DBNull.Value) ? rdr["P120"].ToString() : "N/A ",
                            Pregunta121 = (rdr["P121"] != DBNull.Value) ? rdr["P121"].ToString() : "N/A ",
                            Pregunta122 = (rdr["P122"] != DBNull.Value) ? rdr["P122"].ToString() : "N/A ",
                            Pregunta123 = (rdr["P123"] != DBNull.Value) ? rdr["P123"].ToString() : "N/A ",
                            Pregunta124 = (rdr["P124"] != DBNull.Value) ? rdr["P124"].ToString() : "N/A ",
                            Pregunta125 = (rdr["P125"] != DBNull.Value) ? rdr["P125"].ToString() : "N/A ",
                            Pregunta126 = (rdr["P126"] != DBNull.Value) ? rdr["P126"].ToString() : "N/A ",
                            Pregunta127 = (rdr["P127"] != DBNull.Value) ? rdr["P127"].ToString() : "N/A ",
                            RvtCompromiso = (rdr["RvtCompromiso"] != DBNull.Value) ? rdr["RvtCompromiso"].ToString() : "N/A ",
                            ValidadorCompromiso = (rdr["ValidadorCompromiso"] != DBNull.Value) ? rdr["ValidadorCompromiso"].ToString() : "N/A "
                        });
                    }

                    else if(tm.Id_Campana == 1)
                    {
                        lst.Add(new tbl_Monitoreo
                        {
                            //Todas las campañas
                            Serie = rdr["Serie"].ToString(),
                            Folio = rdr["Folio"].ToString(),
                            Telefono = rdr["Telefono"].ToString(),
                            FechaVenta = rdr["FechaVenta"].ToString(),
                            FechaEva = rdr["FechaEva"].ToString(),
                            Campana = rdr["Nombre_Campana"].ToString(),
                            NombreAnalista = rdr["Nombre de Analista"].ToString(),
                            NombreRVT = rdr["Nombre del ejecutivo"].ToString(),
                            TipoLlamada = rdr["TipoLlamada"].ToString(),
                            TipificacionRVT = rdr["TipificacionRVT"].ToString(),
                            TipificacionCorrecta = rdr["TipificacionCorrecta"].ToString(),
                            RVTTipiCorrect = rdr["RVTTipiCorrect"].ToString(),
                            CalificacionRVT = Convert.ToInt32(rdr["CalificacionRVT"]),
                            ErrorCriticoRVT = rdr["ErrorCriticoRVT"].ToString(),
                            NombreValidador = (rdr["Nombre de Validador"] != DBNull.Value) ? rdr["Nombre de Validador"].ToString() : "N/A ",
                            CalificacionVal = (rdr["CalificacionVal"] != DBNull.Value) ? Convert.ToInt32(rdr["CalificacionVal"].ToString()) : 0,
                            ErrorCriticoVal = (rdr["ErrorCriticoVal"] != DBNull.Value) ? rdr["ErrorCriticoVal"].ToString() : "N/A ",
                            DescripcionLlamadaRVT = (rdr["DescripcionLlamadaRVT"] != DBNull.Value) ? rdr["DescripcionLlamadaRVT"].ToString() : " ",
                            FeedbakRVT = (rdr["FeedbakRVT"] != DBNull.Value) ? rdr["FeedbakRVT"].ToString() : " ",

                            RvtCompromiso = (rdr["RVTCompromiso"] != DBNull.Value) ? rdr["RVTCompromiso"].ToString() : " ",
                            DescripcionLlamadaValidador = (rdr["DescripcionLlamadaValidador"] != DBNull.Value) ? rdr["DescripcionLlamadaValidador"].ToString() : " ",
                            FeedbakValidador = (rdr["FeedbakValidador"] != DBNull.Value) ? rdr["FeedbakValidador"].ToString() : " ",
                            ValidadorCompromiso = (rdr["ValidadorCompromiso"] != DBNull.Value) ? rdr["ValidadorCompromiso"].ToString() : " ",
                            //FechaMonitoreo = rdr["FechaMonitoreo"].ToString(),
                            //FolioGrabacion = rdr["FolioGrabacion"].ToString(),
                            Pregunta1 = rdr["P1"].ToString(),
                            Pregunta2 = rdr["P2"].ToString(),
                            Pregunta3 = rdr["P3"].ToString(),
                            Pregunta4 = (rdr["P4"] != DBNull.Value) ? rdr["P4"].ToString() : "N/A",
                            Pregunta5 = (rdr["P5"] != DBNull.Value) ? rdr["P5"].ToString() : "N/A ",
                            Pregunta6 = rdr["P6"].ToString(),
                            Pregunta7 = rdr["P7"].ToString(),
                            Pregunta8 = rdr["P8"].ToString(),
                            Pregunta9 = rdr["P9"].ToString(),
                            Pregunta10 = rdr["P10"].ToString(),
                            Pregunta11 = rdr["P11"].ToString(),
                            Pregunta12 = rdr["P12"].ToString(),
                            Pregunta13 = (rdr["P13"] != DBNull.Value) ? rdr["P13"].ToString() : "N/A ",
                            Pregunta14 = rdr["P14"].ToString(),
                            Pregunta15 = rdr["P15"].ToString(),
                            Pregunta16 = rdr["P16"].ToString(),
                            Pregunta17 = rdr["P17"].ToString(),
                            Pregunta18 = rdr["P18"].ToString(),
                            Pregunta19 = rdr["P19"].ToString(),
                            Pregunta20 = rdr["P20"].ToString(),
                            Pregunta21 = rdr["P21"].ToString(),
                            Pregunta22 = rdr["P22"].ToString(),
                            Pregunta23 = rdr["P23"].ToString(),
                            Pregunta24 = rdr["P24"].ToString(),
                            Pregunta25 = rdr["P25"].ToString(),
                            Pregunta26 = rdr["P26"].ToString(),
                            Pregunta27 = rdr["P27"].ToString(),
                            Pregunta28 = rdr["P28"].ToString(),
                            Pregunta29 = rdr["P29"].ToString(),
                            Pregunta30 = rdr["P30"].ToString(),
                            Pregunta31 = rdr["P31"].ToString(),
                            Pregunta32 = rdr["P32"].ToString(),
                            Pregunta33 = rdr["P33"].ToString(),
                            Pregunta34 = rdr["P34"].ToString(),
                            Pregunta35 = rdr["P35"].ToString(),
                            Pregunta36 = rdr["P36"].ToString(),

                            Pregunta37 = (rdr["P37"] != DBNull.Value) ? rdr["P37"].ToString() : "N/A ",
                            Pregunta38 = (rdr["P38"] != DBNull.Value) ? rdr["P38"].ToString() : "N/A ",
                            Pregunta39 = (rdr["P39"] != DBNull.Value) ? rdr["P39"].ToString() : "N/A ",
                            Pregunta40 = (rdr["P40"] != DBNull.Value) ? rdr["P40"].ToString() : "N/A ",
                            Pregunta41 = (rdr["P41"] != DBNull.Value) ? rdr["P41"].ToString() : "N/A ",
                            Pregunta42 = (rdr["P42"] != DBNull.Value) ? rdr["P42"].ToString() : "N/A ",
                            Pregunta43 = (rdr["P43"] != DBNull.Value) ? rdr["P43"].ToString() : "N/A ",
                            Pregunta44 = (rdr["P44"] != DBNull.Value) ? rdr["P44"].ToString() : "N/A ",
                            Pregunta45 = (rdr["P45"] != DBNull.Value) ? rdr["P45"].ToString() : "N/A ",
                            Pregunta46 = (rdr["P46"] != DBNull.Value) ? rdr["P46"].ToString() : "N/A ",
                            Pregunta47 = (rdr["P47"] != DBNull.Value) ? rdr["P47"].ToString() : "N/A ",
                            Pregunta48 = (rdr["P48"] != DBNull.Value) ? rdr["P48"].ToString() : "N/A ",
                            Pregunta49 = (rdr["P49"] != DBNull.Value) ? rdr["P49"].ToString() : "N/A ",
                            Pregunta50 = (rdr["P50"] != DBNull.Value) ? rdr["P50"].ToString() : "N/A ",
                            Pregunta51 = (rdr["P51"] != DBNull.Value) ? rdr["P51"].ToString() : "N/A ",
                            Pregunta52 = (rdr["P52"] != DBNull.Value) ? rdr["P52"].ToString() : "N/A ",
                            Pregunta53 = (rdr["P53"] != DBNull.Value) ? rdr["P53"].ToString() : "N/A ",
                            Pregunta54 = (rdr["P54"] != DBNull.Value) ? rdr["P54"].ToString() : "N/A ",
                            Pregunta55 = (rdr["P55"] != DBNull.Value) ? rdr["P55"].ToString() : "N/A ",
                            Pregunta56 = (rdr["P56"] != DBNull.Value) ? rdr["P56"].ToString() : "N/A ",
                            Pregunta57 = (rdr["P57"] != DBNull.Value) ? rdr["P57"].ToString() : "N/A ",
                            Pregunta58 = (rdr["P58"] != DBNull.Value) ? rdr["P58"].ToString() : "N/A ",
                            Pregunta59 = (rdr["P59"] != DBNull.Value) ? rdr["P59"].ToString() : "N/A ",
                            Pregunta60 = (rdr["P60"] != DBNull.Value) ? rdr["P60"].ToString() : "N/A ",
                            Pregunta61 = (rdr["P61"] != DBNull.Value) ? rdr["P61"].ToString() : "N/A ",
                            Pregunta62 = (rdr["P62"] != DBNull.Value) ? rdr["P62"].ToString() : "N/A ",
                            Pregunta63 = (rdr["P63"] != DBNull.Value) ? rdr["P63"].ToString() : "N/A ",
                            Pregunta64 = (rdr["P64"] != DBNull.Value) ? rdr["P64"].ToString() : "N/A ",
                            Pregunta65 = (rdr["P65"] != DBNull.Value) ? rdr["P65"].ToString() : "N/A ",
                        });
                    }
                }
            }
            return lst;
        }


        //Buscar empleado para Monitoreo
        public tbl_Empleados buscarEmpleado(tbl_Empleados emp1)
        {
            tbl_Empleados emp = new tbl_Empleados();
            using (SqlConnection con = new SqlConnection(cs2))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_BuscarEmpleado2", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@RFC", emp1.RFC);
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.HasRows)
                {
                    if (rdr.Read())
                    {
                        emp.id_Empleado = Convert.ToInt32(rdr["id_Empleado"]);
                        //emp.APaterno = rdr["APaterno"].ToString();
                        //emp.AMaterno = rdr["AMaterno"].ToString();
                        emp.Nombre_1 = rdr["NombreCompleto"].ToString();
                        emp.Nombre_2 = rdr["NombreCompletoSuper"].ToString();
                    }
                }
            }
            return emp;
        }


        //Insertar compromiso o desacuerdo del RVT y/o Validador
        public int InsertarCompromiso(tbl_Monitoreo m)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_InsertaCompromiso", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@IdEmpleado", m.IdEmpleado);
                com.Parameters.AddWithValue("@IdVariable", m.IdVariable);
                if (m.RvtCompromiso == null)
                {
                    com.Parameters.AddWithValue("@RvtCompromiso", DBNull.Value);
                }
                else
                {
                    com.Parameters.AddWithValue("@RvtCompromiso", m.RvtCompromiso);
                }

                if (m.ValidadorCompromiso == null)
                {
                    com.Parameters.AddWithValue("@ValidadorCompromiso", DBNull.Value);
                }
                else
                {
                    com.Parameters.AddWithValue("@ValidadorCompromiso", m.ValidadorCompromiso);
                }

                i = com.ExecuteNonQuery();
            }
            return i;
        }


        //Cargar tipificaciones
        public List<cat_CalificacionAPI_2_New_> CargarTipificaciones()
        {
            List<cat_CalificacionAPI_2_New_> lst = new List<cat_CalificacionAPI_2_New_>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CargarTipificaciones", con);
                com.CommandType = CommandType.StoredProcedure;
                //com.Parameters.AddWithValue("@campana",1);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_CalificacionAPI_2_New_
                    {
                        ID_CALIFICACION = Convert.ToInt32(rdr["ID_CALIFICACION"]),
                        catalogo_de_estatus_operacion = rdr["catalogo_de_estatus_operacion"].ToString()
                    });
                }
            }
            return lst;
        }


        //Cargar centros autorizados
        public List<cat_Plazas> CargarCentroAutorizado()
        {
            List<cat_Plazas> lst = new List<cat_Plazas>();
            using (SqlConnection con = new SqlConnection(cs2))
            {
                con.Open();
                SqlCommand com = new SqlCommand("[ssp_CentrosAutorizados]", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_Plazas
                    {
                        Id_plaza = Convert.ToInt32(rdr["Id_plaza"]),
                        Plaza = rdr["Plaza"].ToString()
                    });
                }
            }
            return lst;
        }


        //Buscar empleado para Monitoreo por ID
        public MED.Models.MonitoreoCalidad.tbl_Empleados BuscarEmpleadoMoniID(MED.Models.MonitoreoCalidad.tbl_Empleados empl)
        {
            MED.Models.MonitoreoCalidad.tbl_Empleados emp = new MED.Models.MonitoreoCalidad.tbl_Empleados();
            using (SqlConnection con = new SqlConnection(cs2))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_BuscarEmpleadoMoniID", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@NumEmpleado",empl.NumeroEmpleado);
                com.Parameters.AddWithValue("@Centro", empl.Site);
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.HasRows)
                {
                    if (rdr.Read())
                    {
                        emp.id_Empleado = Convert.ToInt32(rdr["id_Empleado"]);
                        emp.APaterno = rdr["APaterno"].ToString();
                        emp.AMaterno = rdr["AMaterno"].ToString();
                        emp.Nombre_1 = rdr["Nombre_1"].ToString();
                        emp.Nombre_2 = rdr["Nombre_2"].ToString();
                        emp.NumeroEmpleado = rdr["NumEmpleado"].ToString();
                        emp.RFC = rdr["RFC"].ToString();
                    }
                }
                con.Close();
            }
            return emp;
        }


        //Buscar empleado para Monitoreo por RFC
        public MED.Models.MonitoreoCalidad.tbl_Empleados BuscarEmpleadoMoniRFC(MED.Models.MonitoreoCalidad.tbl_Empleados empl)
        {
            MED.Models.MonitoreoCalidad.tbl_Empleados emp = new MED.Models.MonitoreoCalidad.tbl_Empleados();
            using (SqlConnection con = new SqlConnection(cs2))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_BuscarEmpleadoMoniRFC", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@RFC", empl.RFC);
                com.Parameters.AddWithValue("@Centro", empl.Site);
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.HasRows)
                {
                    if (rdr.Read())
                    {
                        //emp.id_Empleado = Convert.ToInt32(rdr["id_Empleado"]);
                        emp.APaterno = rdr["APaterno"].ToString();
                        emp.AMaterno = rdr["AMaterno"].ToString();
                        emp.Nombre_1 = rdr["Nombre_1"].ToString();
                        emp.Nombre_2 = rdr["Nombre_2"].ToString();
                        //emp.NumeroEmpleado = rdr["NumEmpleado"].ToString();
                        emp.RFC = rdr["RFC"].ToString();
                    }
                }
                con.Close();
            }
            return emp;
        }
    }
}