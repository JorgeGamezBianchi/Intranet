using MED.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MED.Controllers
{
    public class SistemasController : Controller
    {
        SistemasBD obj = new SistemasBD();
        // GET: Sistemas
        public ActionResult BuscarFolio()
        {
            return View();
        }

        public JsonResult CargarFolio(string folio)
        {
            return Json(obj.CargarFolio(folio), JsonRequestBehavior.AllowGet);
        }
    }
}