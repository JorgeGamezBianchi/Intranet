using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MED.Models
{
    public class BovedaDB
    {
        string cs = ConfigurationManager.ConnectionStrings["MED"].ConnectionString;

        public int ObtenerIdFrase(int numEmpleado)
        {
            var id = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_ConsultarFrase", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@num_emp", numEmpleado);
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.HasRows)
                {
                    if (rdr.Read())
                    {
                        id = Convert.ToInt32(rdr["id_frase"]);
                    }
                }
                con.Close();
            }
            return id;
        }

        public string ObtenerLlave(int idFrase)
        {
            var llave = "";
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_ObtenerFrase", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@id_frase", idFrase);
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.HasRows)
                {
                    if (rdr.Read())
                    {
                        llave = rdr["frase"].ToString();
                    }
                }
                con.Close();
            }
            return llave;
        }

        public List<Tbl_Cuenta> CargarCuentas(int idFrase)
        {
            List<Tbl_Cuenta> lst = new List<Tbl_Cuenta>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_Obtener_Boveda", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@id_frase", idFrase);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Tbl_Cuenta
                    {
                        IdBP = Convert.ToInt32(rdr["id_bp"]),
                        Aplicacion = rdr["aplicacion"].ToString(),
                        Usuario = rdr["usuario"].ToString(),
                    });
                }
                con.Close();
            }
            return lst;
        }

        public int GuardarFrase(Tbl_Frase modelFrase)
        {
            LogueoDB objeto = new LogueoDB();
            var row = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("isp_InsertarFrase", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@num_emp", modelFrase.NumEmpleado);
                com.Parameters.AddWithValue("@frase", objeto.Encriptar(modelFrase.Frase));
                row = com.ExecuteNonQuery();
                con.Close();
            }
            return row;
        }

        public int GuardarCuenta(Tbl_Cuenta cuenta)
        {
            LogueoDB objeto = new LogueoDB();
            var row = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("isp_Insertar_ElementoBobeda", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@id_frase", cuenta.IdFrase);
                com.Parameters.AddWithValue("@aplicacion", cuenta.Aplicacion);
                com.Parameters.AddWithValue("@usuario", cuenta.Usuario);
                com.Parameters.AddWithValue("@pass", cuenta.Pass);
                com.Parameters.AddWithValue("@llave", objeto.DesEncriptar(ObtenerLlave(cuenta.IdFrase)));
                row = com.ExecuteNonQuery();
                con.Close();
            }
            return row;
        }

        public int ValidarConsidenciasFrases(string frase, int idFrase)
        {
            var exist = 0;
            LogueoDB obj = new LogueoDB();
            if (frase == obj.DesEncriptar(ObtenerLlave(idFrase)))
            {
                exist = 1;
            }
            return exist;
        }

        public int ActualizarCuenta(Tbl_Cuenta cuenta)
        {
            LogueoDB objeto = new LogueoDB();
            var row = 0;
            var llave = objeto.DesEncriptar(ObtenerLlave(cuenta.IdFrase));
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_ModificarBoveda", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@id_bp", cuenta.IdBP);
                com.Parameters.AddWithValue("@aplicacion", cuenta.Aplicacion);
                com.Parameters.AddWithValue("@usuario", cuenta.Usuario);
                com.Parameters.AddWithValue("@pass", cuenta.Pass);
                com.Parameters.AddWithValue("@llave", llave);
                row = com.ExecuteNonQuery();
                con.Close();
            }
            return row;
        }

        public int EliminarCuenta(int idCuenta)
        {
            var row = 0;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("dsp_EliminarBoveda", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@id_bp", idCuenta);
                row = com.ExecuteNonQuery();
                con.Close();
            }
            return row;
        }

        public string ObtenerPasswordCuenta(int idCuenta, string frase)
        {
            var pass = "";
            LogueoDB objeto = new LogueoDB();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_VerPassBoveda", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@id_bp", idCuenta);
                com.Parameters.AddWithValue("@llave", frase);
                SqlDataReader rdr = com.ExecuteReader();
                if (rdr.HasRows)
                {
                    if (rdr.Read())
                    {
                        pass = rdr["PASSWORD"].ToString();
                    }
                }
                con.Close();
            }
            return pass;
        }
    }
}