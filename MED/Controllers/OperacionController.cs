using MED.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MED.Controllers
{
    public class OperacionController : Controller
    {
        OperacionBD obd = new OperacionBD();
        // GET: Operacion
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ControlPlantillaOpe()
        {
            return View();
        }

        //Vista para dar de baja con RFC
        public ActionResult BajaOperacionalView()
        {
            return View();
        }

        public ActionResult AutorizacionCambio()
        {
            return View();
        }
        //--------------------Transacciones--------------------------------


        //Cargar camapañas
        public JsonResult CargarCampanias()
        {
            return Json(obd.CargarCampanias(), JsonRequestBehavior.AllowGet);
        }

        //Metodo para cargar los supervisores dependiendo de la camapaña
        public JsonResult CargarSupervisoresCamapana(cat_Campanias c)
        {
            return Json(obd.CargarSupervisoresCamapana(c), JsonRequestBehavior.AllowGet);
        }

        //Metodo para cargar los RVTs que dependen del supervisor seleccionado
        public JsonResult CargarRvts(tbl_Empleados e)
        {
            return Json(obd.CargarRVTs(e), JsonRequestBehavior.AllowGet);
        }

        //Metodo para cargar los RVTs sin campaña asignada
        public JsonResult CargarRVTsSinAsignar()
        {
            return Json(obd.CargarRVTsSinAsignar(), JsonRequestBehavior.AllowGet);
        }

        //Metodo para realizar la baja operacional
        public JsonResult BajaOperacional(tbl_Empleados e)
        {
            return Json(obd.BajaOperacional(e),JsonRequestBehavior.AllowGet);
        }

        //Metodo para asignar campaña a un RVT
        public JsonResult AsignarCampana(tbl_Empleados emp)
        {
            return Json(obd.AsignarCampana(emp), JsonRequestBehavior.AllowGet);
        }

        //Metodo para mandar a informacion de la autorizacion de cambio de campaña
        public JsonResult CambioCampana(tbl_ControlPlantilla cp)
        {
            return Json(obd.CambioCampana(cp), JsonRequestBehavior.AllowGet);
        }

        //Metodo para llenar el combo con los cambios solicitados
        public JsonResult CargarComboCambios(tbl_Empleados emp)
        {
            return Json(obd.CargarComboCambios(emp), JsonRequestBehavior.AllowGet);
        }

        //Metodo que trae la informacion de los RVTs que seran cambiados de campaña
        public JsonResult CargarRvts_CambioCampana(tbl_ControlPlantilla cp)
        {
            return Json(obd.CargarRvts_CambioCampana(cp), JsonRequestBehavior.AllowGet);
        }

        //Metodo para realizar la autorizacion o la negacion del cambio de campaña
        public JsonResult Autorizar_Negar_Cambio(tbl_ControlPlantilla cp)
        {
            return Json(obd.Autorizar_Negar_Cambio(cp), JsonRequestBehavior.AllowGet);
        }

        //Metodo para mandar el correo de respuesta de la aturizacion de cambio de campaña
        public JsonResult RespuestaCorreo_Autorizacion(tbl_Empleados emp)
        {
            return Json(obd.RespuestaCorreo_Autorizacion(emp),JsonRequestBehavior.AllowGet);
        }

        //Metodo para mandar correo de notificacion de la solicitud de cambio de camapaña
        public JsonResult Notificar_Cambio(tbl_Empleados emp)
        {
            return Json(obd.Notificar_Cambio(emp), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Notificar_Solicitud_Cambio(tbl_Empleados emp)
        {
            return Json(obd.Notificar_Cambio(emp), JsonRequestBehavior.AllowGet);
        }
    }
}