using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MED.Models
{
    public class SistemasBD
    {
        string cs = ConfigurationManager.ConnectionStrings["MED"].ConnectionString;
        public List<Sitemas> CargarFolio(string folio)
        {
            List<Sitemas> lst = new List<Sitemas>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("ssp_CargarFolioSistemas", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@folio", folio);
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Sitemas
                    {
                   
                        FOLIO = rdr["FOLIO ECS+"].ToString(),
                        F_VENTA = rdr["FECHA VENTA"].ToString(),
                        F_PROCESOS = rdr["FECHA PROCESO"].ToString(),
                        CAMPAÑA = rdr["CAMPAÑA"].ToString(),
                        PRODUCTO = rdr["PRODUCTO"].ToString(),
                        NM_RVT = rdr["NM_RVT"].ToString(),
                        SITE = rdr["SITE"].ToString(),
                        TELEFONO = rdr["TELEFONO"].ToString()

                    });
                }
                con.Close();
            }
            return lst;
        }

     
    }
}