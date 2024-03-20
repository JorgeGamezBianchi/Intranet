using MED.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using static MED.Models.MonitoreoCalidad;

namespace CRM_NEW.Controllers
{
    public class MonitoreoCalidadController : Controller
    {
        MonitoreoCalidadBD mbd = new MonitoreoCalidadBD();

        // GET: MonitoreoCalidad
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult MonitoreoCalidad()
        {
            return View();
        }

        public ActionResult MonitoreoRVT()
        {
            return View();
        }

        public ActionResult ReportesMonitoreo()
        {
            return View();
        }
        public ActionResult ReporteGeneralMonitoreo()
        {
            return View();
        }



        //----------------------Transacciones---------------------
        public JsonResult BuscarEmpleado(MED.Models.tbl_Empleados emp1)
        {
            return Json(mbd.buscarEmpleado(emp1), JsonRequestBehavior.AllowGet);
        }

        //Carga las preguntas de monitoreo dependiendo de la campaña
        public JsonResult CargarValoresMonitoreo(Cat_Campana cc)
        {
            return Json(mbd.CargaValoresMonitoreo(cc), JsonRequestBehavior.AllowGet);
        }

        //Insertar tbl_Monitoreo
        public JsonResult InsertarMonitoreo(tbl_Monitoreo tm)
        {
            return Json(mbd.InsertarTablaMonitoreo(tm), JsonRequestBehavior.AllowGet);
        }

        //Insertar tbl_ValoresMonitoreo
        public JsonResult InsertarTablaValoresMonitoreo(tbl_ValoresMonitoreo tvm)
        {
            return Json(mbd.InsertarTablaValoresMonitoreo(tvm), JsonRequestBehavior.AllowGet);
        }


        //Cargar Select con las campañas que se tiene monitoreo
        public JsonResult CampanasMonitoreo(MED.Models.tbl_Empleados emp)
        {
            return Json(mbd.CampanasMonitoreo(emp), JsonRequestBehavior.AllowGet);
        }

        //Cargar Select con las campañas que se tiene monitoreo operacion
        public JsonResult CampanasMonitoreoOper(string RFC)
        {
            return Json(mbd.CampanasMonitoreoOper(RFC), JsonRequestBehavior.AllowGet);
        }

        //Crear reporte de monitoreo
        public JsonResult MonitoreoFeedback(int id_Empleado, int IdDepartamento, int IdVar)
        {
            return Json(mbd.MonitoreoFeedback(id_Empleado, IdDepartamento, IdVar), JsonRequestBehavior.AllowGet);
        }

        //Insertar compromiso RVT/Validador
        public JsonResult InsertarCompromiso(tbl_Monitoreo m)
        {
            return Json(mbd.InsertarCompromiso(m), JsonRequestBehavior.AllowGet);
        }

        //Cargar Validador
        public JsonResult CargarVal()
        {
            return Json(mbd.CargarVal(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CrearLayoutMonitoreo(tbl_Monitoreo tm)
        {
            return Json(mbd.CrearLayoutMonitoreo(tm), JsonRequestBehavior.AllowGet);
        }
        public JsonResult CrearLayoutMonitoreoGeneral(tbl_Monitoreo tm)
        {
            return Json(mbd.CrearLayoutMonitoreoGeneral(tm), JsonRequestBehavior.AllowGet);
        }

        //Cargar Supervisor
        public JsonResult CargarSuper()
        {
            return Json(mbd.CargarSuper(), JsonRequestBehavior.AllowGet);
        }

        //Carga el catalogo de las camapañas
        public JsonResult CargarCampanas()
        {
            return Json(mbd.CargarCampanas(), JsonRequestBehavior.AllowGet);
        }

        //Carga las tipificaciones
        public JsonResult CargarTipificaciones()
        {
            return Json(mbd.CargarTipificaciones(), JsonRequestBehavior.AllowGet);
        }

        //Carga los centros autorizados
        public JsonResult CargarCentroAutorizado()
        {
            return Json(mbd.CargarCentroAutorizado(), JsonRequestBehavior.AllowGet);
        }

        //Carga el Ejecutivo por ID
        public JsonResult buscarEmpleadoMoniID(MED.Models.MonitoreoCalidad.tbl_Empleados empl)
        {
            return Json(mbd.BuscarEmpleadoMoniID(empl), JsonRequestBehavior.AllowGet);
        }

        //Carga el Ejecutivo por RFC
        public JsonResult buscarEmpleadoMoniRFC(MED.Models.MonitoreoCalidad.tbl_Empleados empl)
        {
            return Json(mbd.BuscarEmpleadoMoniRFC(empl), JsonRequestBehavior.AllowGet);
        }

    }
}