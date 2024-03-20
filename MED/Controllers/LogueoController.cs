using MED.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MED.Controllers
{
    public class LogueoController : Controller
    {
        LogueoDB ldb = new LogueoDB();
        // GET: Logueo
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Encriptar_Pass()
        {
            return View();
        }
        
        //-------------------------------PROCESOS--------------------------------

        public JsonResult Logueo(tbl_Logueo log)
        {
            return Json(ldb.login(log), JsonRequestBehavior.AllowGet);
        }

        public JsonResult BloqueoU(tbl_Logueo log)
        {
            return Json(ldb.bloquearUsuario(log), JsonRequestBehavior.AllowGet);
        }

        public JsonResult vCambioContra(tbl_Logueo log)
        {
            return Json(ldb.vCambioContra(log), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Select_Encrypt_Pass()
        {
            return Json(ldb.Select_Encrypt_Pass(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Encriptar_Pass_DB(tbl_Empleados l)
        {
            return Json(ldb.Encriptar_Pass(l), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Restaurar_Pass(tbl_Empleados e)
        {
            return Json(ldb.Restaurar_Pass(e), JsonRequestBehavior.AllowGet);
        }
    }
}