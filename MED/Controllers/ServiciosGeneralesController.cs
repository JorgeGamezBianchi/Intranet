using MED.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MED.Controllers
{
    public class ServiciosGeneralesController : Controller
    {
        ServiciosGeneralesDB sgbd = new ServiciosGeneralesDB();
        // GET: ServiciosGenerales
        public ActionResult Index()
        {
            return View();
        } 

        public ActionResult Rondines()
        {
            return View();
        }

        public ActionResult RevisionRondines()
        {
            return View();
        }

        public ActionResult Restaurar_Pass()
        {
            return View();
        }

        public ActionResult SolicitudCompra()
        {
            return View();
        }

        public ActionResult AdminSolicitudes()
        {
            ListaSolicitudes solicitudes = new ListaSolicitudes();
            solicitudes.Solicitud = sgbd.CargarSolicitudesPendientes();
            ViewData["Solicitudes"] = solicitudes;
            return View();
        }

        //Transacciones
        public JsonResult GuardarRondin(tbl_BitacorasRondines b)
        {
            return Json(sgbd.GuardarRondin(b), JsonRequestBehavior.AllowGet);
        }
        public JsonResult CargarGuardias()
        {
            return Json(sgbd.CargarGuardias(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GenerarRevisionRondines(tbl_BitacorasRondines b)
        {
            return Json(sgbd.GenerarRevisionRondines(b), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GuardarRevisionRondin(tbl_RevisionRondines r)
        {
            return Json(sgbd.GuardarRevisionRondin(r), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Inserta_HommeOffice(tbl_HomeOffice h)
        {
            return Json(sgbd.Inserta_HommeOffice(h), JsonRequestBehavior.AllowGet);
        }

        //Metodo para cargar el combo de tipo de compra 
        public JsonResult CargarTipoCompra()
        {
            return Json(sgbd.CargarTipoCompra(), JsonRequestBehavior.AllowGet);
        }

        //Metodo para llenar el combo de productos dependiendo del tipo de compra 
        public JsonResult CargarProductos(int id)
        {
            return Json(sgbd.CargarProductos(id), JsonRequestBehavior.AllowGet);
        }

        //Metodo para insertar una solicitud de compra
        public JsonResult InsertarSolicitud(tbl_SolicitudCompras sc)
        {
            return  Json(sgbd.InsertarSolicitud(sc), JsonRequestBehavior.AllowGet);
        }

        //Metodo para cambiar el estatus de la solicitud de compra
        public JsonResult CambiarEstatusSolicitud(string folio, string estatus)
        {
            return Json(sgbd.CambiarEstatusSolicitud(folio, estatus), JsonRequestBehavior.AllowGet);
        }
    }
}