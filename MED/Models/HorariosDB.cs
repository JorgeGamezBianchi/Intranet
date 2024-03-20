using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MED.Models
{
    public class HorariosDB
    {
        string cs = ConfigurationManager.ConnectionStrings["MED"].ConnectionString;

        public int InsertarHorarios(tbl_Horarios h)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("usp_Horarios", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@IdEmp", h.Id_Empleado);
                //com.Parameters.AddWithValue("@NumEmp", h.NumEmp);
                com.Parameters.AddWithValue("@Dias", h.Dias_labora);
                com.Parameters.AddWithValue("@Turno", h.Turno);
                com.Parameters.AddWithValue("@Entrada", h.Entrada);
                com.Parameters.AddWithValue("@Salida", h.Salida);
                i = com.ExecuteNonQuery();
            }
            return i;
        }
    }
}