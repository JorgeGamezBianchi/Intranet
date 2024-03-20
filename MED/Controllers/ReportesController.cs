using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MED.Models;

namespace MED.Controllers
{
    public class ReportesController : Controller
    {
        ReportesDB rdb = new ReportesDB();
        // GET: Reportes
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ReportesAltas()
        {
            return View();
        }

        public ActionResult Reportes()
        {
            return View();
        }

        public ActionResult ReportesPermanencia()
        {
            return View();
        }

        public ActionResult ReportesUsuario()
        {
            return View();
        }

        public ActionResult ReportesCampaniasCargos()
        {
            return View();
        }

        public ActionResult ReportesMCF()
        {
            return View();
        }

        public ActionResult Contrato()
        {
            return View();
        }

        public ActionResult ReporteHorarios()
        {
            return View();
        }

        public ActionResult ReporteRondines()
        {
            return View();
        }

        public ActionResult ReporteEncuestaSalida()
        {
            return View();
        }
       
        //Genera Reportes

        public JsonResult ReporteAlta(Reportes rep)
        {
            return Json(rdb.ReporteAlta(rep), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarReporte02(Reportes emp)
        {
            return Json(rdb.CargarReporte02(emp), JsonRequestBehavior.AllowGet);

        }

        public JsonResult ReportePermanencia(Reportes rep)
        {
            return Json(rdb.ReportePermanencia(rep), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ReporteUsuario(Reportes rep)
        {
           return Json(rdb.ReporteUsuario(rep), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ReporteMCF(Reportes rep)
        {
            return Json(rdb.ReporteMCF(rep), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GenerarReportesHorarios(tbl_Empleados r)
        {
            return Json(rdb.GenerarReporteHorarios(r), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GenerarReporteRondin(tbl_BitacorasRondines b)
        {
            return Json(rdb.GenerarReporteRondin(b), JsonRequestBehavior.AllowGet);
        }

        //Carga select
        public JsonResult carcarUsuarios()
        {
            return Json(rdb.carcarUsuarios(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ReporteCampañiaCargo(Reportes emp1)
        {
            return Json(rdb.ReporteCampañiaCargo(emp1), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Contratos(Reportes rep)
        {
            return Json(rdb.Contratos(rep), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarOperacion()
        {
            return Json(rdb.CargarOperacion(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarReporteEncuestaSalida(Tbl_EncuestaSalida rep)
        {
            return Json(rdb.GenerarReporteEncuestaSalida(rep), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GuardarDatosEntrevistador(DatosEntrevistador data)
        {
            return Json(rdb.GuardarDatosEntrevistador(data), JsonRequestBehavior.AllowGet);
        }
    }
}