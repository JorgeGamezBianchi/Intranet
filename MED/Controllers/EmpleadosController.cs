using MED.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MED.Controllers
{
    public class EmpleadosController : Controller
    {
        EmpleadoDB edb = new EmpleadoDB();

        // GET: Empleados
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult RegistrarEmpleado()
        {
            return View();
        }

        public ActionResult BajaEmpleados()
        {
            return View();
        }

        public ActionResult Registro_Sueldo()
        {
            return View();
        }

        public ActionResult HommeOffice()
        {
            return View();
        }

        public ActionResult Act_Datos_Sueldo()
        {
            return View();
        }

        public ActionResult RegistrarCandidato()
        {
            return View();
        }

        public ActionResult DetalleEmpleado()
        {
            return View();
        }



        //------------------------------------------Procesos

        public JsonResult InsertarEmpleado(tbl_Empleados emp)
        {
            return Json(edb.InsertarEmpleado(emp), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ActulalizarEmpleado(tbl_Empleados emp)
        {
            return Json(edb.ActualizarEmpleado(emp), JsonRequestBehavior.AllowGet);
        }

        public JsonResult BuscarEmpleado( tbl_Empleados emp)
        {
            return Json(edb.buscarEmpleado(emp), JsonRequestBehavior.AllowGet);
        }

        public JsonResult BajaEmpleado(tbl_Empleados emp)
        {
            return Json(edb.BajaEmpleado(emp), JsonRequestBehavior.AllowGet);
        }
        public JsonResult CargarGeneros()
        {
            return Json(edb.CargarGeneros(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarEstadosCiviles()
        {
            return Json(edb.CargarEstadosCiviles(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarEstudios()
        {
            return Json(edb.CargarEstudios(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarBancos()
        {
            return Json(edb.CargarBancos(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Site()
        {
            return Json(edb.CargarSite(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Puesto()
        {
            return Json(edb.CargarPuesto(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Turno()
        {
            return Json(edb.CargarTurnos(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Estatus()
        {
            return Json(edb.CargarEstatus(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult FReclutamiento()
        {
            return Json(edb.CargarFRecultamiento(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarEmpleados()
        {
            return Json(edb.CargarEmpleados(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarDetalleEmpleados()
        {
            return Json(edb.CargarDetalleEmpleados(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarSiNo()
        {
            return Json(edb.CargarSiNo(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarProveedores()
        {
            return Json(edb.CargarProveedores(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarEstatusReclu()
        {
            return Json(edb.CargarEstatusReclu(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarDiagnosticos()
        {
            return Json(edb.CargarDiagnosticos(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult cargarMotivoBaja()
        {
            return Json(edb.CargarMotivoBaja(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult cargarTipoBaja()
        {
            return Json(edb.cargarTipoBaja(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarDireccion()
        {
            return Json(edb.CargarDireccion(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarDepartamentos(cat_Direccion d)
        {
            return Json(edb.CargarDepartamentos(d), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarDepartamentos2()
        {
            return Json(edb.CargarDepartamentos2(),JsonRequestBehavior.AllowGet);
        }

        public JsonResult BuscarEmpleados( tbl_Empleados b)
        {
            return Json(edb.BuscarEmpleados(b), JsonRequestBehavior.AllowGet);
        }

        //public JsonResult BuscarEmpleadosBaja()
        //{
        //    return Json(edb.BuscarEmpleadosBaja, JsonRequestBehavior.AllowGet);
        //}

        public JsonResult Insertar_Sueldo(tbl_DatosBanEmp d)
        {
            return Json(edb.Insertar_Sueldo(d), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarTipoRegimen()
        {
            return Json(edb.CargarTipoRegimen(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarSegmento()
        {
            return Json(edb.CargarSegmento(), JsonRequestBehavior.AllowGet);
        }

        //Metodo para cargar datos de un empleado en especifico con numero de empleado
        public JsonResult BuscarDatos_Empleado(int num_emp)
        {
            return Json(edb.BuscarDatos_Empleado(num_emp), JsonRequestBehavior.AllowGet);
        }

        // ----------------------------------------Actuazalización de datos de los empleados de RH -------------------------------------

        public ActionResult ActualizarDatos_Emp() 
        {
            return View();
        }

        //Metodo para buscar la infomación de quien inicio sesión
        public JsonResult Buscar_Info_Emp(tbl_UpdateEmpleados e)
        {
            return Json(edb.Buscar_Info_Emp(e), JsonRequestBehavior.AllowGet);
        }

        //Metoo que manda la información para actualizar los datos 
        public JsonResult ActualizarDatos_Emp_T(tbl_UpdateEmpleados e)
        {
            return Json(edb.ActualizarDatos_Emp(e), JsonRequestBehavior.AllowGet);
        }

        //Metodo que guarda los hijos
        public JsonResult InsertaHijos(tbl_HijosEmpleados h)
        {
            return Json(edb.InsertaHijos(h), JsonRequestBehavior.AllowGet);
        }
    }
}
