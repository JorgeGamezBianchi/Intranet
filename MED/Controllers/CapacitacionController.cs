using MED.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MED.Controllers
{
    public class CapacitacionController : Controller
    {
        CapacitacionDB cdb = new CapacitacionDB();
        // GET: Capacitacion
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Capacitacion()
        {
            return View();
        }

        public ActionResult ECS()
        {
            return View();
        }

        public ActionResult ADICIONALES()
        {
            return View();
        }
        public ActionResult BALCOMECM()
        {
            return View();
        }
        public ActionResult BALCOMDISP()
        {
            return View();
        }

        public ActionResult DISPONIBLE()
        {
            return View();
        }

        public ActionResult CNC()
        {
            return View();
        }

        public ActionResult CPC()
        {
            return View();
        }

        public ActionResult PAGARE()
        {
            return View();
        }

        public ActionResult PYME()
        {
            return View();
        }

        public ActionResult REDIS()
        {
            return View();
        }

        public JsonResult CargarRespuestas()
        {
            return Json(cdb.CargarRespuestas(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertarRespuesta(tbl_RespuestasCampanias resp)
        {
            return Json(cdb.InsertarRespuesta(resp), JsonRequestBehavior.AllowGet);
        }

        //---------------------Cuestionario De seguridad-------------------
        public ActionResult QSInfo()
        {
            return View();
        }

        public JsonResult LlenarTblExamen(tbl_Examenes ex)
        {
            return Json(cdb.LlenarTblExamen(ex), JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertarRespuestasQSI(tbl_QSegInf_Respuestas_Usuarios respuestas)
        {
            return Json(cdb.InsertarRespuestasQSI(respuestas), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Score(tbl_Examenes e)
        {
            return Json(cdb.Score(e), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Calificar(retro r)
        {
            return Json(cdb.Calificar(r), JsonRequestBehavior.AllowGet);
        }
    }
}