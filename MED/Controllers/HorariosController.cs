using MED.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MED.Controllers
{
    public class HorariosController : Controller
    {
        HorariosDB hdb = new HorariosDB();
        // GET: Horarios
        public ActionResult HorariosEmp()
        {
            return View();
        }

        public JsonResult InsertarHorarios(tbl_Horarios h)
        {
            return Json(hdb.InsertarHorarios(h), JsonRequestBehavior.AllowGet);
        }
    }
}