using System.Web.Mvc;

namespace MED.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Conexion()
        {
            return View();
        }

        public ActionResult Med()
        {
            return View();
        }

        //public ActionResult Login()
        //{
        //    if (Session["usuario"] == null)
        //    {
        //        Session.Timeout = 6000;
        //        Session["usuario"] = "";
        //    }
        //    ViewBag.Usuario = Session["usuario"];
        //    return View();
        //}

        
    }
}