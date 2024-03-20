using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Helpers;
using System.Text;

namespace MED.Models
{
    public class LogueoDB 
    {
        string cs = ConfigurationManager.ConnectionStrings["ASF_ERP"].ConnectionString;
        
        public tbl_Logueo login(tbl_Logueo log)
        {
            tbl_Logueo l = new tbl_Logueo();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_LogAdmin2", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@usuario", log.usuario);
                if (log.usuario.All(char.IsDigit))
                {
                    com.Parameters.AddWithValue("@Pass", Encriptar(log.Pass));
                }
                else
                {
                    com.Parameters.AddWithValue("@Pass", Encriptar(log.Pass));
                }
                //com.Parameters.AddWithValue("@Pass", log.Pass);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    if (Convert.ToInt32(rdr["Opcion"]) == 3) //Opcion 3 es que los datos son correctos
                    {
                        l.opcion = Convert.ToInt32(rdr["Opcion"]);
                        l.Nombre1 = rdr["Nombre_1"].ToString();
                        l.Nombre2 = rdr["Nombre_2"].ToString();
                        l.APaterno = rdr["APaterno"].ToString();
                        l.AMaterno = rdr["AMaterno"].ToString();
                        l.Id_RVT = Convert.ToInt32(rdr["id_Empleado"]);
                        l.id_puesto = Convert.ToInt32(rdr["Puesto"]);
                        l.fecha = rdr["FechaCaducar"].ToString();
                        l.BitActualizar = Convert.ToInt32(rdr["BitActualizar"]); //bit para verificar si se va a pedir actualizacion o no 
                        
                        if (log.usuario.All(char.IsDigit))//Se verifica que el usuario sera el numero de empleado
                        {
                            if (l.BitActualizar == 1)//Se valida si se pide cambio o no de contr<aseña
                            {
                                l.Pass = DesEncriptar(rdr["Pass"].ToString());
                                DateTime fechaF = Convert.ToDateTime(l.fecha).Date;
                                
                                if (DateTime.Now.Date >= fechaF)//Valida si se solicita cambio de contraseña por fecha caducada
                                {
                                    l.opcion = 2;
                                }
                                if (l.Pass == log.usuario)//Valida si se solicita cambio de contraseña por usuario igual que la contraseña (solo administrativos)
                                {
                                    l.opcion = 2;
                                }
                            }
                            else
                            {
                                l.opcion = 3;
                            }
                        }
                        else
                        {
                            l.Pass = rdr["Pass"].ToString();
                        }     
                    }
                    else { l.opcion= Convert.ToInt32(rdr["Opcion"]); }
                }
                con.Close();
            }
            return l;
        }

        public int bloquearUsuario(tbl_Logueo log)
        {
            int i;
            using(SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_BloqStatus", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@usuario", log.usuario);
                SqlDataReader rdr = com.ExecuteReader();
                rdr.Read();
                i = Convert.ToInt32(rdr[0]);
                con.Close();
            }
            return i;
        }


        //Metodo para actualizar el Password
        public int vCambioContra(tbl_Logueo log)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_ValiCambioContra", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@usuario", log.usuario);
                com.Parameters.AddWithValue("@newpass",Encriptar(log.NewPass));
                SqlDataReader rdr = com.ExecuteReader();
                rdr.Read();
                i = Convert.ToInt32(rdr[0]);
            }
                return i;
        }


        //Metodo para restaurar el Password, poniendo el número de empleado como Password y se solicitara cambio de contraseña de nuevo al iniciar sesion
        public int Restaurar_Pass(tbl_Empleados e)
        {
            int i = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_Restarurar_Pass", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@NumEmpleado", Encriptar(e.NumeroEmpleado));
                com.Parameters.AddWithValue("@Id_Empleado", e.id_Empleado);
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        i = Convert.ToInt32(rdr["Mensaje"]);
                    }
                }
            }
            return i;
        }


        //ENCRIPTAR CONTRASEÑAS
        public string Encriptar(String _cadenaAencriptar)
        {
            string result = string.Empty;
            byte[] encryted = Encoding.Unicode.GetBytes(_cadenaAencriptar);
            result = Convert.ToBase64String(encryted);
            return result;
        }


        //DESENCRIPTAR CONTRASEÑAS
        public string DesEncriptar(string _cadenaAdesencriptar)
        {
            string result = string.Empty;
            byte[] decryted = Convert.FromBase64String(_cadenaAdesencriptar);
            result = Encoding.Unicode.GetString(decryted);
            return result;
        }


        //Metodo provicional para encriptar campos necesarios
        public List<tbl_Empleados> Select_Encrypt_Pass()
        {
            List<tbl_Empleados> lst = new List<tbl_Empleados>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                string sql = "select top (1000) id_Empleado, NumEmpleado from db_IntranetMEDC.dbo.tbl_Empleados where id_Empleado not in (select id_Empleado from db_IntranetMEDC.dbo.tbl_Logueo)";
                SqlCommand com = new SqlCommand(sql,con);
                com.CommandType = CommandType.Text;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new tbl_Empleados
                    {
                        //CLABE = rdr["CLABE"].ToString(),
                        NumeroEmpleado = rdr["NumEmpleado"].ToString(),
                        id_Empleado = Convert.ToInt32(rdr["id_Empleado"])
                    });
                }
                con.Close();
            }
            return lst;
        }


        //ENCRIPTAR CONTRASEÑA CON EL METODO "Encriptar"
        public int Encriptar_Pass(tbl_Empleados e)
        {
            int i = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                //string CLABE = Encriptar(d.CLABE);
                string Pass = Encriptar(e.NumeroEmpleado);
                //string NumeroCuenta = Encriptar(d.NumeroCuenta);
                //string sql = "update db_IntranetMEDC.dbo.tbl_DatosBanEmp set CLABE = '"+ CLABE +"', NumeroCuenta = '"+ NumeroCuenta+"' where Id_Empleado ="+ d.Id_Empleado+" ";
                string sql = "insert into db_IntranetMEDC.dbo.tbl_Logueo (Id_Empleado,Id_tipo_u,Pass,Id_status,Fecha_actualizada, Fecha_caducar,BitActualizar) values (" + e.id_Empleado+",5,'"+Pass+ "',0,getDate(),getDate(),0) insert into db_IntranetMEDC.dbo.tbl_DatosBanEmp (Id_Empleado) values ("+ e.id_Empleado + ")";
                SqlCommand com = new SqlCommand(sql, con);
                com.CommandType = CommandType.Text;
                i = com.ExecuteNonQuery();
                con.Close();
            }
            return i;
        }


    }
}