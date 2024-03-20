using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;


namespace MED.Models
{
    public class EmpleadoDB
    {
        string cs = ConfigurationManager.ConnectionStrings["MED"].ConnectionString;
        LogueoDB l = new LogueoDB();

        public tbl_Empleados InsertarEmpleado(tbl_Empleados emp)
        {
            try
            {
                tbl_Empleados e = new tbl_Empleados();
                using (SqlConnection con = new SqlConnection(cs))
                {
                    con.Open();
                    //SqlCommand com = new SqlCommand("usp_InsertarEmpleado",con);
                    SqlCommand com = new SqlCommand("usp_DEVInsertarEmpleado", con);
                    com.CommandType = CommandType.StoredProcedure;
                    com.Parameters.AddWithValue("@NumEmpleado", emp.NumeroEmpleado);
                    if (emp.Site != 0)
                    {
                        com.Parameters.AddWithValue("@Site", emp.Site);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@Site", DBNull.Value);
                    }
                    if (emp.IMSS != null)
                    {
                        com.Parameters.AddWithValue("@IMSS", emp.IMSS);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@IMSS", DBNull.Value);
                    }
                    com.Parameters.AddWithValue("@Puesto", emp.Puesto);
                    com.Parameters.AddWithValue("@APaterno", emp.APaterno);
                    com.Parameters.AddWithValue("@AMaterno", emp.AMaterno);
                    com.Parameters.AddWithValue("@Nombre_1", emp.Nombre_1);
                    if (emp.Nombre_2 == null)
                    {
                        com.Parameters.AddWithValue("@Nombre_2", DBNull.Value);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@Nombre_2", emp.Nombre_2);
                    }
                    if (emp.Recluto != 0)
                    {
                        com.Parameters.AddWithValue("@Recluto", emp.Recluto);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@Recluto", DBNull.Value);
                    }

                    com.Parameters.AddWithValue("@Genero", emp.Genero);
                    if (emp.RFC != null)
                    {
                        com.Parameters.AddWithValue("@RFC", emp.RFC);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@RFC", DBNull.Value);
                    }

                    if (emp.Homoclave == null)
                    {
                        com.Parameters.AddWithValue("@Homoclave", DBNull.Value);
                    }
                    else { com.Parameters.AddWithValue("@Homoclave", emp.Homoclave); }
                    if (emp.CURP != null)
                    {
                        com.Parameters.AddWithValue("@CURP", emp.CURP.ToString());
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@CURP", DBNull.Value);
                    }
                    com.Parameters.AddWithValue("@FNacimiento", Convert.ToDateTime(emp.FNacimiento));
                    if (emp.FIngreso != null)
                    {
                        com.Parameters.AddWithValue("@FIngreso", Convert.ToDateTime(emp.FIngreso));
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@FIngreso", DBNull.Value);
                    }
                    if (emp.FBaja != null)
                    {
                        com.Parameters.AddWithValue("@FBaja", Convert.ToDateTime(emp.FBaja));
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@FBaja", DBNull.Value);
                    }
                    com.Parameters.AddWithValue("@Turno", emp.Turno);
                    if (emp.NumeroCuenta != null)
                    {
                        com.Parameters.AddWithValue("@NumeroCuenta", l.Encriptar(emp.NumeroCuenta));
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@NumeroCuenta", DBNull.Value);
                    }
                    if (emp.CLABE != null)
                    {
                        com.Parameters.AddWithValue("@CLABE", l.Encriptar(emp.CLABE));
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@CLABE", DBNull.Value);
                    }
                    if (emp.Banco != 0)
                    {
                        com.Parameters.AddWithValue("@Banco", emp.Banco);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@Banco", DBNull.Value);
                    }

                    if (emp.TelefonoFijo == null)
                    {
                        com.Parameters.AddWithValue("@TelefonoFijo", DBNull.Value);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@TelefonoFijo", emp.TelefonoFijo);
                    }
                    if (emp.TelefonoMovil == null)
                    {
                        com.Parameters.AddWithValue("@TelefonoMovil", DBNull.Value);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@TelefonoMovil", emp.TelefonoMovil);

                    }
                    if (emp.ElaboroContrato != 0)
                    {
                        com.Parameters.AddWithValue("@ElaboroContrato", emp.ElaboroContrato);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@ElaboroContrato", DBNull.Value);
                    }

                    if (emp.Diagnostico == null)
                    {
                        com.Parameters.AddWithValue("@Diagnostico", DBNull.Value);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@Diagnostico", emp.Diagnostico);
                    }
                    if (emp.PrimerEmpleo != 0)
                    {
                        com.Parameters.AddWithValue("@PrimerEmpleo", emp.PrimerEmpleo);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@PrimerEmpleo", DBNull.Value);
                    }
                    if (emp.ExperienciaEnCallCenter != 0)
                    {
                        com.Parameters.AddWithValue("@ExperienciaEnCallCenter", emp.ExperienciaEnCallCenter);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@ExperienciaEnCallCenter", DBNull.Value);
                    }
                    if (emp.EstadoCivil != 0)
                    {
                        com.Parameters.AddWithValue("@EstadoCivil", emp.EstadoCivil);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@EstadoCivil", DBNull.Value);
                    }
                    if (emp.Hijos != 0)
                    {
                        com.Parameters.AddWithValue("@Hijos", emp.Hijos);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@Hijos", 0);
                    }
                    if (emp.UltimoGradoEstudios != 0)
                    {
                        com.Parameters.AddWithValue("@UltimoGradoEstudios", emp.UltimoGradoEstudios);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@UltimoGradoEstudios", DBNull.Value);
                    }

                    if (emp.Especialidad == null)
                    {
                        com.Parameters.AddWithValue("@Especialidad", DBNull.Value);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@Especialidad", emp.Especialidad);
                    }
                    if (emp.FuenteReclutamiento != 0)
                    {
                        com.Parameters.AddWithValue("@FuenteReclutamiento", emp.FuenteReclutamiento);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@FuenteReclutamiento", DBNull.Value);
                    }
                    if (emp.FAltaIMSS != null)
                    {
                        com.Parameters.AddWithValue("@FAltaIMSS", Convert.ToDateTime(emp.FAltaIMSS));
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@FAltaIMSS", DBNull.Value);
                    }
                    if (emp.Estatus != 0)
                    {
                        com.Parameters.AddWithValue("@Estatus", emp.Estatus);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@Estatus", DBNull.Value);
                    }
                    if (emp.IDDireccion != 0)
                    {
                        com.Parameters.AddWithValue("@IdDireccion", emp.IDDireccion);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@IdDireccion", DBNull.Value);
                    }
                    if (emp.IdDepartamento != 0)
                    {
                        com.Parameters.AddWithValue("@IdDepartamento", emp.IdDepartamento);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@IdDepartamento", DBNull.Value);
                    }

                    com.Parameters.AddWithValue("@Calle", emp.Calle);
                    com.Parameters.AddWithValue("@Numero", emp.Numero);
                    com.Parameters.AddWithValue("@Colonia", emp.Colonia);
                    if (emp.Delegacion == null)
                    {
                        com.Parameters.AddWithValue("@Delegacion", DBNull.Value);
                    }
                    else { com.Parameters.AddWithValue("@Delegacion", emp.Delegacion); }
                    com.Parameters.AddWithValue("@Ciudad", emp.Ciudad);
                    if (emp.CP != null)
                    {
                        com.Parameters.AddWithValue("@CP", emp.CP);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@CP", DBNull.Value);
                    }

                    com.Parameters.AddWithValue("@Usuario", emp.Usuario);
                    com.Parameters.AddWithValue("@Pass", l.Encriptar(emp.NumeroEmpleado));
                    //if (emp.SueldoDiario != null)
                    //{
                    //    com.Parameters.AddWithValue("@SueldoDiario", emp.SueldoDiario);
                    //}
                    //else
                    //{
                    //    com.Parameters.AddWithValue("@SueldoDiario", DBNull.Value);
                    //}
                    if (emp.Campania != 0)
                    {
                        com.Parameters.AddWithValue("@Campania", emp.Campania);
                    }
                    else
                    {
                        com.Parameters.AddWithValue("@Campania", DBNull.Value);
                    }
                    com.Parameters.AddWithValue("@TipoNomina", (emp.TipoNomina != "0") ? emp.TipoNomina : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@Sdo_Diario_IMSS", (emp.Sdo_Diario_IMSS != null) ? l.Encriptar(emp.Sdo_Diario_IMSS) : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@Sdo_Diario_Asimilados", (emp.Sdo_Diario_Asimilados != null) ? l.Encriptar(emp.Sdo_Diario_Asimilados) : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@SueldoDiario", (emp.SueldoDiario != null) ? emp.SueldoDiario : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@Celular2", (emp.Celular2 != null) ? emp.Celular2 : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@Enfermedad", (emp.Enfermedad != "0") ? emp.Enfermedad : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@OtraEnfermedad", (emp.OtraEnfermedad != null) ? emp.OtraEnfermedad : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@Alergias", (emp.Alergias != "0") ? emp.Alergias : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@AlregiaC", (emp.AlregiaC != null) ? emp.AlregiaC : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@OtroGrado", (emp.OtroGrado != null) ? emp.OtroGrado : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@TituloObtenido", (emp.TituloObtenido != null) ? emp.TituloObtenido : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@ContactoEmergencia1", (emp.ContactoEmergencia1 != null) ? emp.ContactoEmergencia1 : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@TelefonoEmergencia1", (emp.TelefonoEmergencia1 != null) ? emp.TelefonoEmergencia1 : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@ContactoEmergencia2", (emp.ContactoEmergencia2 != null) ? emp.ContactoEmergencia2 : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@TelefonoEmergencia2", (emp.TelefonoEmergencia2 != null) ? emp.TelefonoEmergencia2 : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@PasatiempoFav", (emp.PasatiempoFav != null) ? emp.PasatiempoFav : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@DeporteFav", (emp.DeporteFav != null) ? emp.DeporteFav : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@Talento", (emp.Talento != "0") ? emp.Talento : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@Instrumento", (emp.Instrumento != null) ? emp.Instrumento : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@OtroTalento", (emp.OtroTalento != null) ? emp.OtroTalento : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@Sdo_quincenal", (emp.Sdo_quincenal != null) ? l.Encriptar(emp.Sdo_quincenal) : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@Infonavit", (emp.Infonavit != null) ? emp.Infonavit : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@Fonacot", (emp.Fonacot != null) ? emp.Fonacot : DBNull.Value.ToString());
                    com.Parameters.AddWithValue("@Pensionado", (emp.Pensionado != null) ? emp.Pensionado : DBNull.Value.ToString());
                    SqlDataReader rdr = com.ExecuteReader();
                    if (rdr.HasRows)
                    {
                        if (rdr.Read())
                        {
                            e.NumeroEmpleado = rdr["NumEmpleado"].ToString();
                            e.id_Empleado = Convert.ToInt32(rdr["Id_empleado"]);
                        }
                    }
                }
            return e;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return null;
        }




        public int ActualizarEmpleado(tbl_Empleados emp)
        {
            int i = 0;
            using(SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_DEVActualizarEmpleado", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@id_Empleado", emp.id_Empleado );
                com.Parameters.AddWithValue("@num", emp.NumeroEmpleado);
                if (emp.Site != 0)
                {
                    com.Parameters.AddWithValue("@Site", emp.Site);
                }
                else
                {
                    com.Parameters.AddWithValue("@Site", DBNull.Value);
                }
                if (emp.IMSS != null)
                {
                    com.Parameters.AddWithValue("@IMSS", emp.IMSS);
                }
                else
                {
                    com.Parameters.AddWithValue("@IMSS", DBNull.Value);
                }
                com.Parameters.AddWithValue("@Puesto", emp.Puesto);
                com.Parameters.AddWithValue("@APaterno", emp.APaterno);
                com.Parameters.AddWithValue("@AMaterno", emp.AMaterno);
                com.Parameters.AddWithValue("@Nombre_1", emp.Nombre_1);
                if (emp.Nombre_2 == null)
                {
                    com.Parameters.AddWithValue("@Nombre_2", DBNull.Value);
                }
                else
                {
                    com.Parameters.AddWithValue("@Nombre_2", emp.Nombre_2);
                }
                if (emp.Recluto != 0)
                {
                    com.Parameters.AddWithValue("@Recluto", emp.Recluto);
                }
                else
                {
                    com.Parameters.AddWithValue("@Recluto", DBNull.Value);
                }

                com.Parameters.AddWithValue("@Genero", emp.Genero);
                if (emp.RFC != null)
                {
                    com.Parameters.AddWithValue("@RFC", emp.RFC);
                }
                else
                {
                    com.Parameters.AddWithValue("@RFC", DBNull.Value);
                }

                if (emp.Homoclave == null)
                {
                    com.Parameters.AddWithValue("@Homoclave", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@Homoclave", emp.Homoclave); }
                if (emp.CURP != null)
                {
                    com.Parameters.AddWithValue("@CURP", emp.CURP);
                }
                else
                {
                    com.Parameters.AddWithValue("@CURP", DBNull.Value);
                }
                com.Parameters.AddWithValue("@FNacimiento", Convert.ToDateTime(emp.FNacimiento));
                if (emp.FIngreso != null)
                {
                    com.Parameters.AddWithValue("@FIngreso", Convert.ToDateTime(emp.FIngreso));
                }
                else
                {
                    com.Parameters.AddWithValue("@FIngreso", DBNull.Value);
                }
                if (emp.FBaja != null)
                {
                    com.Parameters.AddWithValue("@FBaja", Convert.ToDateTime(emp.FBaja));
                }
                else
                {
                    com.Parameters.AddWithValue("@FBaja", DBNull.Value);
                }
                com.Parameters.AddWithValue("@Turno", emp.Turno);
                if (emp.NumeroCuenta != null)
                {
                    com.Parameters.AddWithValue("@NumeroCuenta", l.Encriptar(emp.NumeroCuenta));
                }
                else
                {
                    com.Parameters.AddWithValue("@NumeroCuenta", DBNull.Value);
                }
                if (emp.CLABE != null)
                {
                    com.Parameters.AddWithValue("@CLABE", l.Encriptar(emp.CLABE));
                }
                else
                {
                    com.Parameters.AddWithValue("@CLABE", DBNull.Value);
                }
                if (emp.Banco != 0)
                {
                    com.Parameters.AddWithValue("@Banco", emp.Banco);
                }
                else
                {
                    com.Parameters.AddWithValue("@Banco", DBNull.Value);
                }

                if (emp.TelefonoFijo == null)
                {
                    com.Parameters.AddWithValue("@TelefonoFijo", DBNull.Value);
                }
                else
                {
                    com.Parameters.AddWithValue("@TelefonoFijo", emp.TelefonoFijo);
                }
                if (emp.TelefonoMovil == null)
                {
                    com.Parameters.AddWithValue("@TelefonoMovil", DBNull.Value);
                }
                else
                {
                    com.Parameters.AddWithValue("@TelefonoMovil", emp.TelefonoMovil);

                }
                if (emp.ElaboroContrato != 0)
                {
                    com.Parameters.AddWithValue("@ElaboroContrato", emp.ElaboroContrato);
                }
                else
                {
                    com.Parameters.AddWithValue("@ElaboroContrato", DBNull.Value);
                }

                if (emp.Diagnostico == null)
                {
                    com.Parameters.AddWithValue("@Diagnostico", DBNull.Value);
                }
                else
                {
                    com.Parameters.AddWithValue("@Diagnostico", emp.Diagnostico);
                }
                if (emp.PrimerEmpleo != 0)
                {
                    com.Parameters.AddWithValue("@PrimerEmpleo", emp.PrimerEmpleo);
                }
                else
                {
                    com.Parameters.AddWithValue("@PrimerEmpleo", DBNull.Value);
                }
                if (emp.ExperienciaEnCallCenter != 0)
                {
                    com.Parameters.AddWithValue("@ExperienciaEnCallCenter", emp.ExperienciaEnCallCenter);
                }
                else
                {
                    com.Parameters.AddWithValue("@ExperienciaEnCallCenter", DBNull.Value);
                }
                if (emp.EstadoCivil != 0)
                {
                    com.Parameters.AddWithValue("@EstadoCivil", emp.EstadoCivil);
                }
                else
                {
                    com.Parameters.AddWithValue("@EstadoCivil", DBNull.Value);
                }
                if (emp.Hijos != 0)
                {
                    com.Parameters.AddWithValue("@Hijos", emp.Hijos);
                }
                else
                {
                    com.Parameters.AddWithValue("@Hijos", 0);
                }
                if (emp.UltimoGradoEstudios != 0)
                {
                    com.Parameters.AddWithValue("@UltimoGradoEstudios", emp.UltimoGradoEstudios);
                }
                else
                {
                    com.Parameters.AddWithValue("@UltimoGradoEstudios", DBNull.Value);
                }

                if (emp.Especialidad == null)
                {
                    com.Parameters.AddWithValue("@Especialidad", DBNull.Value);
                }
                else
                {
                    com.Parameters.AddWithValue("@Especialidad", emp.Especialidad);
                }
                if (emp.FuenteReclutamiento != 0)
                {
                    com.Parameters.AddWithValue("@FuenteReclutamiento", emp.FuenteReclutamiento);
                }
                else
                {
                    com.Parameters.AddWithValue("@FuenteReclutamiento", DBNull.Value);
                }
                if (emp.CapturaPlantilla == 0)
                {
                    com.Parameters.AddWithValue("@CapturaPlantilla", DBNull.Value);
                }
                else
                {
                    com.Parameters.AddWithValue("@CapturaPlantilla",emp.CapturaPlantilla);
                }
                if (emp.FAltaIMSS != null)
                {
                    com.Parameters.AddWithValue("@FAltaIMSS", Convert.ToDateTime(emp.FAltaIMSS));
                }
                else
                {
                    com.Parameters.AddWithValue("@FAltaIMSS", DBNull.Value);
                }
                if (emp.Estatus != 0)
                {
                    com.Parameters.AddWithValue("@Estatus", emp.Estatus);
                }
                else
                {
                    com.Parameters.AddWithValue("@Estatus", DBNull.Value);
                }
                if (emp.IDDireccion != 0)
                {
                    com.Parameters.AddWithValue("@IdDireccion", emp.IDDireccion);
                }
                else
                {
                    com.Parameters.AddWithValue("@IdDireccion", DBNull.Value);
                }
                if (emp.IdDepartamento != 0)
                {
                    com.Parameters.AddWithValue("@IdDepartamento", emp.IdDepartamento);
                }
                else
                {
                    com.Parameters.AddWithValue("@IdDepartamento", DBNull.Value);
                }

                com.Parameters.AddWithValue("@Calle", emp.Calle);
                com.Parameters.AddWithValue("@Numero", emp.Numero);
                com.Parameters.AddWithValue("@Colonia", emp.Colonia);
                if (emp.Delegacion == null)
                {
                    com.Parameters.AddWithValue("@Delegacion", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@Delegacion", emp.Delegacion); }
                com.Parameters.AddWithValue("@Ciudad", emp.Ciudad);
                if (emp.CP != null)
                {
                    com.Parameters.AddWithValue("@CP", emp.CP);
                }
                else
                {
                    com.Parameters.AddWithValue("@CP", DBNull.Value);
                }

                com.Parameters.AddWithValue("@Usuario", emp.Usuario);
                
                if (emp.Campania != 0)
                {
                    com.Parameters.AddWithValue("@Campania", emp.Campania);
                }
                else
                {
                    com.Parameters.AddWithValue("@Campania", DBNull.Value);
                }
                com.Parameters.AddWithValue("@TipoNomina", (emp.TipoNomina != "0") ? emp.TipoNomina : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@Sdo_Diario_IMSS", (emp.Sdo_Diario_IMSS != null) ? l.Encriptar(emp.Sdo_Diario_IMSS) : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@Sdo_Diario_Asimilados", (emp.Sdo_Diario_Asimilados != null) ? l.Encriptar(emp.Sdo_Diario_Asimilados) : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@SueldoDiario", (emp.SueldoDiario != null) ? emp.SueldoDiario : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@Celular2", (emp.Celular2 != null) ? emp.Celular2 : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@Enfermedad", (emp.Enfermedad != "0") ? emp.Enfermedad : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@OtraEnfermedad", (emp.OtraEnfermedad != null) ? emp.OtraEnfermedad : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@Alergias", (emp.Alergias != "0") ? emp.Alergias : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@AlregiaC", (emp.AlregiaC != null) ? emp.AlregiaC : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@OtroGrado", (emp.OtroGrado != null) ? emp.OtroGrado : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@TituloObtenido", (emp.TituloObtenido != null) ? emp.TituloObtenido : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@ContactoEmergencia1", (emp.ContactoEmergencia1 != null) ? emp.ContactoEmergencia1 : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@TelefonoEmergencia1", (emp.TelefonoEmergencia1 != null) ? emp.TelefonoEmergencia1 : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@ContactoEmergencia2", (emp.ContactoEmergencia2 != null) ? emp.ContactoEmergencia2 : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@TelefonoEmergencia2", (emp.TelefonoEmergencia2 != null) ? emp.TelefonoEmergencia2 : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@PasatiempoFav", (emp.PasatiempoFav != null) ? emp.PasatiempoFav : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@DeporteFav", (emp.DeporteFav != null) ? emp.DeporteFav : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@Talento", (emp.Talento != "0") ? emp.Talento : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@Instrumento", (emp.Instrumento != null) ? emp.Instrumento : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@OtroTalento", (emp.OtroTalento != null) ? emp.OtroTalento : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@Sdo_quincenal", (emp.Sdo_quincenal != null) ? l.Encriptar(emp.Sdo_quincenal) : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@Infonavit", (emp.Infonavit != null) ? emp.Infonavit : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@Fonacot", (emp.Fonacot != null) ? emp.Fonacot : DBNull.Value.ToString());
                com.Parameters.AddWithValue("@Pensionado", (emp.Pensionado != null) ? emp.Pensionado : DBNull.Value.ToString());
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    i = Convert.ToInt32(rdr["Mensaje"]);
                }
            }
            return i;
        }

        public tbl_Empleados buscarEmpleado(tbl_Empleados emp1)
        {
            tbl_Empleados emp = new tbl_Empleados();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_BuscarEmpleado", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@NumEmpleado", emp1.NumeroEmpleado);
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
                        if (rdr["NumEmpleado"] == DBNull.Value)
                        {
                            emp.NumeroEmpleado = "";
                        }
                        else { emp.NumeroEmpleado = rdr["NumEmpleado"].ToString(); }

                        if (rdr["Site"] == DBNull.Value)
                        {
                            emp.Site = 0;
                        }
                        else { emp.Site = Convert.ToInt32(rdr["Site"]); }
                        emp.IMSS = rdr["IMSS"].ToString();
                        if (rdr["Puesto"] == DBNull.Value)
                        {
                            emp.Puesto = 0;
                        }
                        else { emp.Puesto = Convert.ToInt32(rdr["Puesto"]); }

                        if (rdr["Recluto"] == DBNull.Value)
                        {
                            emp.Recluto = 0;
                        }
                        else { emp.Recluto = Convert.ToInt32(rdr["Recluto"]); }

                        if (rdr["Genero"] == DBNull.Value)
                        {
                            emp.Genero = 0;
                        }
                        else { emp.Genero = Convert.ToInt32(rdr["Genero"]); }

                        emp.RFC = rdr["RFC"].ToString();
                        emp.Homoclave = rdr["Homoclave"].ToString();
                        emp.CURP = rdr["CURP"].ToString();
                        emp.FNacimiento = rdr["FNacimiento"].ToString();
                        emp.FIngreso = rdr["FIngreso"].ToString();
                        emp.FBaja = rdr["FBaja"].ToString();

                        if (rdr["Turno"] == DBNull.Value)
                        {
                            emp.Turno = 0;
                        }
                        else { emp.Turno = Convert.ToInt32(rdr["Turno"]); }

                        emp.NumeroCuenta = (rdr["NumeroCuenta"] != DBNull.Value) ? l.DesEncriptar(rdr["NumeroCuenta"].ToString()) : "";
                        emp.CLABE = (rdr["CLABE"] != DBNull.Value) ?  l.DesEncriptar(rdr["CLABE"].ToString()) : "";

                        if (rdr["Banco"] == DBNull.Value)
                        {
                            emp.Banco = 0;
                        }
                        else { emp.Banco = Convert.ToInt32(rdr["Banco"]); }

                        emp.TelefonoFijo = rdr["TelefonoFijo"].ToString();
                        emp.TelefonoMovil = rdr["TelefonoMovil"].ToString();

                        if (rdr["ElaboroContrato"] == DBNull.Value)
                        {
                            emp.ElaboroContrato = 0;
                        }
                        else { emp.ElaboroContrato = Convert.ToInt32(rdr["ElaboroContrato"]); }

                        emp.Diagnostico = rdr["Diagnostico"].ToString();

                        if (rdr["PrimerEmpleo"] == DBNull.Value)
                        {
                            emp.PrimerEmpleo = 0;
                        }
                        else { emp.PrimerEmpleo = Convert.ToInt32(rdr["PrimerEmpleo"]); }

                        if (rdr["Edad"] == DBNull.Value)
                        {
                            emp.Edad = "0";
                        }
                        else { emp.Edad = rdr["Edad"].ToString(); }

                        if (rdr["ExperienciaEnCallCenter"] == DBNull.Value)
                        {
                            emp.ExperienciaEnCallCenter = 0;
                        }
                        else { emp.ExperienciaEnCallCenter = Convert.ToInt32(rdr["ExperienciaEnCallCenter"]); }

                        if (rdr["EstadoCivil"] == DBNull.Value)
                        {
                            emp.EstadoCivil = 0;
                        }
                        else { emp.EstadoCivil = Convert.ToInt32(rdr["EstadoCivil"]); }

                        if (rdr["Hijos"] == DBNull.Value)
                        {
                            emp.Hijos = 0;
                        }
                        else { emp.Hijos = Convert.ToInt32(rdr["Hijos"]); }

                        if (rdr["UltimoGradoEstudios"] == DBNull.Value)
                        {
                            emp.UltimoGradoEstudios = 0;
                        }
                        else { emp.UltimoGradoEstudios = Convert.ToInt32(rdr["UltimoGradoEstudios"]); }

                        emp.Especialidad = rdr["Especialidad"].ToString();

                        if (rdr["FuenteReclutamiento"] == DBNull.Value)
                        {
                            emp.FuenteReclutamiento = 0;
                        }
                        else { emp.FuenteReclutamiento = Convert.ToInt32(rdr["FuenteReclutamiento"]); }

                        if (rdr["CapturaPlantilla"] == DBNull.Value)
                        {
                            emp.CapturaPlantilla = 0;
                        }
                        else { emp.CapturaPlantilla = Convert.ToInt32(rdr["CapturaPlantilla"]); }

                        emp.FAltaIMSS = rdr["FAltaIMSS"].ToString();

                        if (rdr["Estatus"] == DBNull.Value)
                        {
                            emp.Estatus = 0;
                        }
                        else { emp.Estatus = Convert.ToInt32(rdr["Estatus"]); }

                        emp.FInsercion = rdr["FInsercion"].ToString();

                        if(rdr["IdDireccion"] == DBNull.Value)
                        {
                            emp.IDDireccion = 0;
                        }
                        else { emp.IDDireccion = Convert.ToInt32(rdr["IdDireccion"]); }

                        if (rdr["IdDepartamento"] == DBNull.Value)
                        {
                            emp.IdDepartamento = 0;
                        }
                        else { emp.IdDepartamento = Convert.ToInt32(rdr["IdDepartamento"]); }

                        //emp.Calle = rdr["Calle"].ToString();
                        //emp.Numero = rdr["Numero"].ToString();
                        //emp.Colonia = rdr["Colonia"].ToString();
                        //emp.Delegacion = rdr["Delegacion"].ToString();
                        //emp.Ciudad = rdr["Ciudad"].ToString();
                        //emp.CP = rdr["CP"].ToString();
                        emp.FFirmaBaja = rdr["FFirmaBaja"].ToString();
                        if (rdr["MotivoBaja"] == DBNull.Value)
                        {
                            emp.MotivoBaja = 0;
                        }
                        else { emp.MotivoBaja = Convert.ToInt32(rdr["MotivoBaja"]); }
                        emp.Observaciones = rdr["Observaciones"].ToString();
                        emp.TelefonoContacto = rdr["TelefonoContacto"].ToString();
                        emp.Horario = Convert.ToInt32(rdr["Horario"]);
                        emp.Sdo_Diario_Asimilados = (rdr["Sdo_Diario_Asimilados"] != DBNull.Value) ? l.DesEncriptar(rdr["Sdo_Diario_Asimilados"].ToString()) : "";
                        emp.Sdo_Diario_IMSS = (rdr["Sdo_Diario_IMSS"] != DBNull.Value) ? l.DesEncriptar(rdr["Sdo_Diario_IMSS"].ToString()) : "";
                        emp.TipoNomina = (rdr["TipoNomina"] != DBNull.Value) ? rdr["TipoNomina"].ToString() : "0";
                        emp.SueldoDiario = (rdr["SueldoDiario"] != DBNull.Value) ? rdr["SueldoDiario"].ToString() : "";
                        emp.Campania = (rdr["Campania"] != DBNull.Value) ? Convert.ToInt32(rdr["Campania"]) : 0;

                        emp.Celular2 = (rdr["Celular2"] != DBNull.Value) ? rdr["Celular2"].ToString() : "";
                        emp.Enfermedad = (rdr["Enfermedad"] != DBNull.Value) ? rdr["Enfermedad"].ToString() : "";
                        emp.OtraEnfermedad = (rdr["OtraEnfermedad"] != DBNull.Value) ? rdr["OtraEnfermedad"].ToString() : "";
                        emp.Alergias = (rdr["Alergias"] != DBNull.Value) ? rdr["Alergias"].ToString() : "";
                        emp.AlregiaC = (rdr["AlregiaC"] != DBNull.Value) ? rdr["AlregiaC"].ToString() : "";
                        emp.OtroGrado = (rdr["OtroGrado"] != DBNull.Value) ? rdr["OtroGrado"].ToString() : "";
                        emp.TituloObtenido = (rdr["TituloObtenido"] != DBNull.Value) ? rdr["TituloObtenido"].ToString() : "";
                        emp.ContactoEmergencia1 = (rdr["ContactoEmergencia1"] != DBNull.Value) ? rdr["ContactoEmergencia1"].ToString() : "";
                        emp.TelefonoEmergencia1 = (rdr["TelefonoEmergencia1"] != DBNull.Value) ? rdr["TelefonoEmergencia1"].ToString() : "";
                        emp.ContactoEmergencia2 = (rdr["ContactoEmergencia2"] != DBNull.Value) ? rdr["ContactoEmergencia2"].ToString() : "";
                        emp.TelefonoEmergencia2 = (rdr["TelefonoEmergencia2"] != DBNull.Value) ? rdr["TelefonoEmergencia2"].ToString() : "";
                        emp.PasatiempoFav = (rdr["PasatiempoFav"] != DBNull.Value) ? rdr["PasatiempoFav"].ToString() : "";
                        emp.DeporteFav = (rdr["DeporteFav"] != DBNull.Value) ? rdr["DeporteFav"].ToString() : "";
                        emp.Talento = (rdr["Talento"] != DBNull.Value) ? rdr["Talento"].ToString() : "";
                        emp.Instrumento = (rdr["Instrumento"] != DBNull.Value) ? rdr["Instrumento"].ToString() : "";
                        emp.OtroTalento = (rdr["OtroTalento"] != DBNull.Value) ? rdr["OtroTalento"].ToString() : "";
                        emp.Sdo_quincenal = (rdr["Sdo_quincenal"] != DBNull.Value) ? rdr["Sdo_quincenal"].ToString() : "";
                        emp.Infonavit = (rdr["Infonavit"] != DBNull.Value) ? rdr["Infonavit"].ToString() : "";
                        emp.Fonacot = (rdr["Fonacot"] != DBNull.Value) ? rdr["Fonacot"].ToString() : "";
                        emp.Pensionado = (rdr["Pensionado"] != DBNull.Value) ? rdr["Pensionado"].ToString() : "";
                    }
                }
            }
            //MandarCorreo();
            return emp;
        }

        public int BajaEmpleado(tbl_Empleados emp)
        {
            int i;
            using(SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_InsertarBaja", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@NumEmpleado", emp.NumeroEmpleado);
                com.Parameters.AddWithValue("@FBaja", emp.FBaja);
                com.Parameters.AddWithValue("@FFirmaBaja", emp.FFirmaBaja);
                com.Parameters.AddWithValue("@MotivoBaja", emp.MotivoBaja);
                if(emp.Observaciones == null)
                {
                    com.Parameters.AddWithValue("@Observaciones", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@Observaciones", emp.Observaciones); }
                
                if(emp.TelefonoContacto == null)
                {
                    com.Parameters.AddWithValue("@TelefonoContacto", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@TelefonoContacto", emp.TelefonoContacto); }
                
                com.Parameters.AddWithValue("@AutorizoBaja", emp.AutorizoBaja);
                com.Parameters.AddWithValue("@TipoBaja", emp.TipoBaja);
                com.Parameters.AddWithValue("@Usuario", emp.Usuario);
                i = com.ExecuteNonQuery();

                if (i == 0)
                {
                    i = 3;
                }
                if(i < 0)
                {
                    i = 3;
                }
                
            }
            return i;
        }

        public List<cat_Generos> CargarGeneros()
        {
            List<cat_Generos> lst = new List<cat_Generos>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_Generos", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_Generos
                    {
                        Valor = Convert.ToInt32(rdr["Valor"]),
                        Texto = rdr["Texto"].ToString()
                    });
                }
            }
            return lst;
        }

        public List<cat_EstadosCiviles> CargarEstadosCiviles()
        {
            List<cat_EstadosCiviles> lst = new List<cat_EstadosCiviles>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_EstadosCiviles",con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_EstadosCiviles
                    {
                        id_EstadoCivil=Convert.ToInt32(rdr["id_EstadoCivil"]),
                        EstadoCivil = rdr["EstadoCivil"].ToString()
                    });
                }
            }
            return lst;
        }

        public List<cat_Estudios> CargarEstudios()
        {
            List<cat_Estudios> lst = new List<cat_Estudios>();
            using(SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_Estudios", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_Estudios
                    {
                        Id_Estudios = Convert.ToInt32(rdr["Id_Estudios"]),
                        NivelAcademico = rdr["NivelAcademico"].ToString()
                    });
                }
            }
            return lst;
        }

        public List<cat_Bancos> CargarBancos()
        {
            List<cat_Bancos> lst = new List<cat_Bancos>();
            using(SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CatBancos",con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_Bancos
                    {
                        id_Banco = Convert.ToInt32(rdr["id_Banco"]),
                        Banco = rdr["Banco"].ToString()
                    });
                }
            }
            return lst;
        }

        public List<cat_Plazas> CargarSite()
        {
            List<cat_Plazas> lst = new List<cat_Plazas>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_Plazas", con);
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


        public List<cat_Puestos> CargarPuesto()
        {
            List<cat_Puestos> lst = new List<cat_Puestos>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_Puestos", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_Puestos
                    {
                        id_Puesto = Convert.ToInt32(rdr["id_Puesto"]),
                        Puesto = rdr["Puesto"].ToString()
                    });
                }
            }
            return lst;
        }



        public List<cat_Turnos> CargarTurnos()
        {
            List<cat_Turnos> lst = new List<cat_Turnos>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_Turnos", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_Turnos
                    {
                        id_Turno = Convert.ToInt32(rdr["id_Turno"]),
                        Turno = rdr["Turno"].ToString()
                    });
                }
            }
            return lst;
        }


        public List<cat_EstatusMED> CargarEstatus()
        {
            List<cat_EstatusMED> lst = new List<cat_EstatusMED>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_EstatusMed", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_EstatusMED
                    {
                        id_Estatus = Convert.ToInt32(rdr["id_Estatus"]),
                        EstatusMed = rdr["EstatusMed"].ToString()
                    });
                }
            }
            return lst;
        }




        public List<cat_FuentesReclutamiento> CargarFRecultamiento()
        {
            List<cat_FuentesReclutamiento> lst = new List<cat_FuentesReclutamiento>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_FuentesReclu", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_FuentesReclutamiento
                    {
                        id_FuenteReclutamiento = Convert.ToInt32(rdr["id_FuenteReclutamiento"]),
                        FuenteReclutamiento = rdr["FuenteReclutamiento"].ToString()
                    });
                }
            }
            return lst;
        }

        public List<tbl_Empleados> CargarEmpleados()
        {
            List<tbl_Empleados> lst = new List<tbl_Empleados>();
            using(SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_SelectEmpleado", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while(rdr.Read())
                {
                    lst.Add(new tbl_Empleados
                    {
                        id_Empleado = Convert.ToInt32(rdr["id_Empleado"]),
                        APaterno = rdr["APaterno"].ToString(),
                        AMaterno = rdr["AMaterno"].ToString(),
                        Nombre_1 = rdr["Nombre_1"].ToString(),
                        Nombre_2 = rdr["Nombre_2"].ToString(),
                    });
                }
                con.Close();
            }
            return lst;
        }


        public List<cat_SiNo> CargarSiNo()
        {
            List<cat_SiNo> lst = new List<cat_SiNo>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_SiNo", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_SiNo
                    {
                        Valor = Convert.ToInt32(rdr["Valor"]),
                        Respuesta = rdr["Respuesta"].ToString()
                    });
                }
                con.Close();
            }
            return lst;
        }

        public List<cat_Proveedor_candidatos> CargarProveedores()
        {
            List<cat_Proveedor_candidatos> lst = new List<cat_Proveedor_candidatos>();
            using(SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_Recluto", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_Proveedor_candidatos
                    {
                        id_Proveedor = Convert.ToInt32(rdr["id_Proveedor"]),
                        Proveedor = rdr["Proveedor"].ToString()
                    });
                }
                con.Close();
            }
            return lst;
        }

        public List<cat_estatusReclutamiento> CargarEstatusReclu()
        {
            List<cat_estatusReclutamiento> lst = new List<cat_estatusReclutamiento>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_EstatusReclu", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_estatusReclutamiento
                    {
                        ID_EstatusReclu = Convert.ToInt32(rdr["id_Estatus"]),
                        Estatus = rdr["EstatusMed"].ToString()
                    });
                }
                con.Close();
            }
            return lst;
        }


        public List<cat_Segmento> CargarSegmento()
        {
            List<cat_Segmento> lst = new List<cat_Segmento>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("[usp_cargaSegmento]", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_Segmento
                    {
                        ID_Segmento = Convert.ToInt32(rdr["ID_Segmento"]),
                        Segmento = rdr["Segmento"].ToString()
                    });
                }
                con.Close();
            }
            return lst;
        }



        public List<cat_Diagnostico> CargarDiagnosticos()
        {
            List<cat_Diagnostico> lst = new List<cat_Diagnostico>();
            using(SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_Diagnostico", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_Diagnostico
                    {
                        id_Diagnostico = Convert.ToInt32(rdr["id_Diagnostico"]),
                        Diagnostico = rdr["Diagnostico"].ToString()
                    });
                }
                con.Close();
            }
            return lst;
        }

        public List<cat_Motivo> CargarMotivoBaja()
        {
            List<cat_Motivo> lst = new List<cat_Motivo>();
            using(SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CatMotivo", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_Motivo
                    {
                        Id_Motivo = Convert.ToInt32(rdr["Id_Motivo"]),
                        Motivo = rdr["Motivo"].ToString()
                    });
                }
                con.Close();
            }
            return lst;
        }

        public List<cat_TipoBaja> cargarTipoBaja()
        {
            List<cat_TipoBaja> lst = new List<cat_TipoBaja>();
            using(SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CatTipoBaja", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_TipoBaja
                    {
                        Id_TipoBaja = Convert.ToInt32(rdr["Id_TipoBaja"]),
                        TipoBaja = rdr["TipoBaja"].ToString()
                    });
                }
                con.Close();
            }
            return lst;
        }

        public List<cat_Direccion> CargarDireccion()
        {
            List<cat_Direccion> lst = new List<cat_Direccion>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CatDireccion", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_Direccion
                    {
                        IDDireccion = Convert.ToInt32(rdr["IDDireccion"]),
                        Descripcion = rdr["Descripcion"].ToString()
                    });
                }
                con.Close();
            }
                return lst;
        }

        public List<cat_Departamentos> CargarDepartamentos(cat_Direccion d)
        {
            List<cat_Departamentos> lst = new List<cat_Departamentos>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CatDepartamento", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_Dire",d.IDDireccion);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_Departamentos
                    {
                        IDDepartamento = Convert.ToInt32(rdr["IDDepartamento"]),
                        Descripcion = rdr["Descripcion"].ToString(),
                        IDDireccion = Convert.ToInt32(rdr["IDDireccion"])
                    });
                }
                con.Close();
            }
            return lst;
        }

        public List<cat_Departamentos> CargarDepartamentos2()
        {
            List<cat_Departamentos> lst = new List<cat_Departamentos>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CatDepartamento2", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_Departamentos
                    {
                        IDDepartamento = Convert.ToInt32(rdr["IDDepartamento"]),
                        Descripcion = rdr["Descripcion"].ToString(),
                        IDDireccion = Convert.ToInt32(rdr["IDDireccion"])
                    });
                }
                con.Close();
            }
                return lst;
        }

        public List<tbl_Empleados> BuscarEmpleados(tbl_Empleados bus)
        {
            List<tbl_Empleados> lst = new List<tbl_Empleados>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_BuscarEmpleados", con);
                com.CommandType = CommandType.StoredProcedure;
                if (bus.NumeroEmpleado == null)
                {
                    com.Parameters.AddWithValue("@num", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@num", bus.NumeroEmpleado); }

                if (bus.Nombre_1 == null)
                {
                    com.Parameters.AddWithValue("@nombre1", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@nombre1", bus.Nombre_1); }
                if (bus.Nombre_2 == null)
                {
                    com.Parameters.AddWithValue("@nombre2", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@nombre2", bus.Nombre_2); }
                if (bus.APaterno == null)
                {
                    com.Parameters.AddWithValue("@apep", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@apep", bus.APaterno); }
                if (bus.AMaterno == null)
                {
                    com.Parameters.AddWithValue("@apem", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@apem", bus.AMaterno); }


                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Empleados
                    {
                        NumeroEmpleado = rdr["NumEmpleado"].ToString(),
                        Nombre_1 = rdr["Nombre_1"].ToString(),
                        Nombre_2 = rdr["Nombre_2"].ToString(),
                        APaterno = rdr["APaterno"].ToString(),
                        AMaterno = rdr["AMaterno"].ToString(),

                    });
                }
                con.Close();
            }
            return lst;
        }


        //public List<tbl_Empleados> BuscarEmpleadosBaja(tbl_Empleados bus)
        //{
        //    try
        //    {
        //        List<tbl_Empleados> lst = new List<tbl_Empleados>();
        //        using (SqlConnection con = new SqlConnection(cs))
        //        {
        //            con.Open();
        //            SqlCommand com = new SqlCommand("[usp_BuscarEmpleadosBaja]", con);
        //            com.CommandType = CommandType.StoredProcedure;
        //            com.Parameters.AddWithValue("@num", bus.NumeroEmpleado);
        //            SqlDataReader rdr = com.ExecuteReader();
        //            while (rdr.Read())
        //            {
        //                lst.Add(new tbl_Empleados
        //                {
        //                    NumeroEmpleado = rdr["NumEmpleado"].ToString(),
        //                    Nombre_1 = rdr["Nombre_1"].ToString(),
        //                    RFC = rdr["RFC"].ToString(),
        //                    //Puesto = Convert.ToInt32(rdr["Puesto"]),
        //                    //Turno = Convert.ToInt32((rdr["Turno"] != DBNull.Value) ? rdr["Turno"] : ""),
        //                    //Campania = Convert.ToInt32((rdr["Campania"] != DBNull.Value) ? rdr["Campania"] : ""),
        //                    //FIngreso = (rdr["FIngreso"] != DBNull.Value) ? rdr["FIngreso"].ToString() : "",
        //                    //Antiguedad = (rdr["Permanencia"] != DBNull.Value) ? rdr["Permanencia"].ToString() : "",
        //                    Estatus = Convert.ToInt32((rdr["Estatus"] != DBNull.Value) ? rdr["Estatus"] : "")
        //                });
        //            }
        //            con.Close();
        //        }
        //        return lst;
        //    }
        //    catch(Exception e)
        //    {
        //        Console.Write(e.Message);
        //    }
        //}


        //public List<tbl_Empleados> BuscarEmpleadosBaja()
        //{
        //    List<tbl_Empleados> lista = new List<tbl_Empleados>();

        //    try
        //    {
        //        SqlConnection con = new SqlConnection(cs);

        //        con.Open();
        //        SqlCommand cmd = new SqlCommand("[ssp_CargarDetalleEmpleado]", con);
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        SqlDataReader dr = cmd.ExecuteReader();
        //        while (dr.Read())
        //        {
        //            lista.Add(
        //                new tbl_Empleados()
        //                {
        //                    ID_Usuario = Convert.ToInt32(dr["id_Empleado"]),
        //                    NumEmpleado = Convert.ToInt32(dr["NumEmpleado"]),
        //                    NombreCompleto = dr["NombreCompleto"].ToString(),
        //                    Puesto = dr["Puesto"].ToString(),
        //                    Activo = Convert.ToBoolean(dr["Estatus"])
        //                }
        //            );
        //        }
        //        con.Close();
        //    }
        //    catch (Exception e)
        //    {
        //        lista = new List<tbl_Empleados>();
        //        Console.Write(e.Message);
        //    }
        //    return lista;
        //}


        //Metodo para Insertar los datos bancarios del empleado
        public int Insertar_Sueldo(tbl_DatosBanEmp d)
        {
            
            int i = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_Ingresa_Sueldo_Emp", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_Empleado",d.Id_Empleado);
                //com.Parameters.AddWithValue("@Banco",d.Banco);
                //com.Parameters.AddWithValue("@CLABE", l.Encriptar(d.CLABE));
                //com.Parameters.AddWithValue("@NumeroCuenta", l.Encriptar(d.NumeroCuenta));
                com.Parameters.AddWithValue("@TipoNomina ", d.TipoNomina);
                if (d.Sdo_Diario_Asimilados == "" || d.Sdo_Diario_Asimilados == null)
                {
                    com.Parameters.AddWithValue("@Sdo_Diario_Asimilados", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@Sdo_Diario_Asimilados", l.Encriptar(d.Sdo_Diario_Asimilados)); }

                if (d.Sdo_Diario_IMSS == "" || d.Sdo_Diario_IMSS == null)
                {
                    com.Parameters.AddWithValue("@Sdo_Diario_IMSS", DBNull.Value);
                }
                else { com.Parameters.AddWithValue("@Sdo_Diario_IMSS", l.Encriptar(d.Sdo_Diario_IMSS)); }
                
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.HasRows)
                {
                    while(rdr.Read()){
                        i = Convert.ToInt32(rdr["Mensaje"]);
                    }
                }
                con.Close();
            }
            return i;
        }

        //Metodo para buscar datos de un empleado en especifico por Num de empleado
        public tbl_Empleados BuscarDatos_Empleado( int num_emp)
        {
            tbl_Empleados emp = new tbl_Empleados();
            using (SqlConnection con= new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("select * from tbl_empleados where NumEmpleado =" + num_emp,con);
                com.CommandType = CommandType.Text;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    emp.id_Empleado = Convert.ToInt32(rdr["Id_Empleado"]);
                    emp.Puesto = Convert.ToInt32(rdr["Puesto"]);
                    emp.IDDireccion = Convert.ToInt32(rdr["IdDireccion"]);
                    emp.IdDepartamento = Convert.ToInt32(rdr["IdDepartamento"]);
                }
                con.Close();
            }
                return emp;
        }

        //-------------Actualizacon de datos de los empleados RH

        //Actualización de datos de los empleados RH
        public tbl_UpdateEmpleados Buscar_Info_Emp(tbl_UpdateEmpleados e)
        {
            tbl_UpdateEmpleados emp = new tbl_UpdateEmpleados();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_CargarEmpleado", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@NumEmpleado", e.NumEmpleado);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    emp.Id_Empleado = Convert.ToInt32(rdr["Id_Empleado"]);
                    emp.NumEmpleado = Convert.ToInt32(rdr["NumEmpleado"]);
                    emp.Site = (rdr["Site"] != DBNull.Value) ? Convert.ToInt32(rdr["Site"]) : 0;
                    emp.Puesto = (rdr["Puesto"] != DBNull.Value) ? Convert.ToInt32(rdr["Puesto"]) : 0;
                    emp.IdCampana = (rdr["IdCampana"] != DBNull.Value) ? Convert.ToInt32(rdr["IdCampana"]) : 0;
                    emp.NombreCompleto = (rdr["NombreCompleto"] != DBNull.Value) ? rdr["NombreCompleto"].ToString() : "";
                    emp.Sexo = (rdr["Sexo"] != DBNull.Value) ? Convert.ToInt32(rdr["Sexo"]) : 0;
                    emp.FNacimiento = (rdr["FNacimiento"] != DBNull.Value) ? rdr["FNacimiento"].ToString() : "";
                    emp.FIngreso = (rdr["FIngreso"] != DBNull.Value) ? rdr["FIngreso"].ToString() : "";
                    emp.Turno = (rdr["Turno"] != DBNull.Value) ? Convert.ToInt32(rdr["Turno"]) : 0;
                }
            }
            return emp;
        }

        //Metodo que manda la información para la actualización
        public int ActualizarDatos_Emp(tbl_UpdateEmpleados emp)
        {
            int i = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_UpdateEmpleado", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_Empleado", emp.Id_Empleado);
                com.Parameters.AddWithValue("@Calle", emp.Calle);
                com.Parameters.AddWithValue("@Numero", emp.Numero);
                com.Parameters.AddWithValue("@Colonia", emp.Colonia);
                if (emp.Delegacion != null)
                {
                    com.Parameters.AddWithValue("@Delegacion", emp.Delegacion);
                }
                else
                {
                    com.Parameters.AddWithValue("@Delegacion", DBNull.Value);
                }

                com.Parameters.AddWithValue("@Ciudad", emp.Ciudad);
                com.Parameters.AddWithValue("@CP", emp.CP);
                if (emp.TelefonoFijo == null)
                {
                    com.Parameters.AddWithValue("@TelefonoFijo", DBNull.Value);
                }
                else
                {
                    com.Parameters.AddWithValue("@TelefonoFijo", emp.TelefonoFijo);
                }
                com.Parameters.AddWithValue("@Celular1", emp.Celular1);
                if (emp.Celular2 != null)
                {
                    com.Parameters.AddWithValue("@Celular2", emp.Celular2);
                }
                else
                {
                    com.Parameters.AddWithValue("@Celular2", DBNull.Value);
                }

                com.Parameters.AddWithValue("@Enfermedad", emp.Enfermedad);
                if (emp.OtraEnfermedad != null)
                {
                    com.Parameters.AddWithValue("@OtraEnfermedad", emp.OtraEnfermedad);
                }
                else
                {
                    com.Parameters.AddWithValue("@OtraEnfermedad", DBNull.Value);
                }

                com.Parameters.AddWithValue("@Alergias", emp.Alergias);
                if (emp.AlregiaC != null)
                {
                    com.Parameters.AddWithValue("@AlregiaC", emp.AlregiaC);
                }
                else
                {
                    com.Parameters.AddWithValue("@AlregiaC", DBNull.Value);
                }

                com.Parameters.AddWithValue("@Edad", emp.Edad);
                com.Parameters.AddWithValue("@EstadoCivil", emp.EstadoCivil);
                com.Parameters.AddWithValue("@Hijos", emp.Hijos);
                com.Parameters.AddWithValue("@UltimoGradoEstudios", emp.UltimoGradoEstudios);
                if (emp.OtroGrado != null)
                {
                    com.Parameters.AddWithValue("@OtroGrado", emp.OtroGrado);
                }
                else
                {
                    com.Parameters.AddWithValue("@OtroGrado", DBNull.Value);
                }

                com.Parameters.AddWithValue("@TituloObtenido", emp.TituloObtenido);
                com.Parameters.AddWithValue("@ContactoEmergencia1", emp.ContactoEmergencia1);
                com.Parameters.AddWithValue("@TelefonoEmergencia1", emp.TelefonoEmergencia1);
                if (emp.ContactoEmergencia2 == null)
                {
                    com.Parameters.AddWithValue("@ContactoEmergencia2",DBNull.Value);
                }
                else
                {
                    com.Parameters.AddWithValue("@ContactoEmergencia2", emp.ContactoEmergencia2);
                }
                if (emp.TelefonoEmergencia2 == null)
                {
                    com.Parameters.AddWithValue("@TelefonoEmergencia2", DBNull.Value);
                }
                else
                {
                    com.Parameters.AddWithValue("@TelefonoEmergencia2", emp.TelefonoEmergencia2);
                }
                com.Parameters.AddWithValue("@PasatiempoFav", emp.PasatiempoFav);
                //com.Parameters.AddWithValue("@OtroPasatiempoFav", emp.OtroDeporteFav);
                com.Parameters.AddWithValue("@DeporteFav", emp.DeporteFav);
                //com.Parameters.AddWithValue("@OtroDeporteFav", emp.OtroDeporteFav);
                com.Parameters.AddWithValue("@Talento", emp.Talento);
                if (emp.Instrumento != null)
                {
                    com.Parameters.AddWithValue("@Instrumento", emp.Instrumento);
                }
                else
                {
                    com.Parameters.AddWithValue("@Instrumento", DBNull.Value);
                }
                if (emp.OtroTalento != null)
                {
                    com.Parameters.AddWithValue("@OtroTalento", emp.OtroTalento);
                }
                else
                {
                    com.Parameters.AddWithValue("@OtroTalento", DBNull.Value);
                }
                i = com.ExecuteNonQuery();
                con.Close();
            }
            return i;
        }

        //Método para insertar la cantidad de hijos que se tiene
        public string InsertaHijos(tbl_HijosEmpleados hi)
        {
            string h = "";
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_HijosEmpleado", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id_Empleado", hi.Id_Empleado);
                com.Parameters.AddWithValue("@FechaNacHijo", hi.FechaNacHijo);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    h = rdr["Insertado"].ToString();
                }
                con.Close();
            }
                return h;
        }


        public List<cat_TipoRegimen> CargarTipoRegimen()
        {
            List<cat_TipoRegimen> lst = new List<cat_TipoRegimen>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_TipoRegimen", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new cat_TipoRegimen
                    {
                        ID_TipoRegimen = Convert.ToInt32(rdr["ID_TipoRegimen"]),
                        Tipo_Regimen = rdr["Tipo_Regimen"].ToString()
                    });
                }
                con.Close();
            }
            return lst;
        }



        public List<tbl_Empleados> CargarDetalleEmpleados()
        {
            List<tbl_Empleados> lst = new List<tbl_Empleados>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("[ssp_CargarDetalleEmpleado]", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Empleados
                    {
                        id_Empleado = Convert.ToInt32(rdr["id_Empleado"]),
                        APaterno = rdr["APaterno"].ToString(),
                        AMaterno = rdr["AMaterno"].ToString(),
                        Nombre_1 = rdr["Nombre_1"].ToString(),
                        Nombre_2 = rdr["Nombre_2"].ToString(),
                    });
                }
                con.Close();
            }
            return lst;
        }



    }
}