using MED.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MED.Controllers
{
    public class BovedaController : Controller
    {
        BovedaDB obj = new BovedaDB();
        // GET: Boveda
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AdminBoveda()
        {
            return View();
        }

        public JsonResult ValidarFrase(int numEmpleado)
        {
            return Json(obj.ObtenerIdFrase(numEmpleado), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GuardarFrase(Tbl_Frase modelFrase)
        {
            return Json(obj.GuardarFrase(modelFrase), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarCuentas(int idFrase)
        {
            return Json(obj.CargarCuentas(idFrase), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GuardarCuenta(Tbl_Cuenta cuenta)
        {
            return Json(obj.GuardarCuenta(cuenta), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ValidarConsidenciasFrases(string frase, int idFrase)
        {
            return Json(obj.ValidarConsidenciasFrases(frase, idFrase), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ActualizarCuenta(Tbl_Cuenta cuenta)
        {
            return Json(obj.ActualizarCuenta(cuenta), JsonRequestBehavior.AllowGet);
        }

        public JsonResult EliminarCuenta(int idCuenta)
        {
            return Json(obj.EliminarCuenta(idCuenta), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ObtenerPass(int idCuenta,string frase)
        {
            return Json(obj.ObtenerPasswordCuenta(idCuenta, frase), JsonRequestBehavior.AllowGet);
        }
    }
}