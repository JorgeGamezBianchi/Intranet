using MED.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using static MED.Models.TablasCuestionarios;

namespace MED.Controllers
{
    public class EncuestasController : Controller
    {
        // GET: Encuestas
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult PrimerEnc()
        {
            return View();
        }

        public ActionResult EvaluacionLFDPPP()
        {
            return View();
        }

        public ActionResult EvaluacionClimaLabolal() //2020
        {
            return View();
        }
        //------Transacciones----------
        EncuestasDB edb = new EncuestasDB();
        public JsonResult Cargar_Guias(tbl_Examenes e)
        {
            return Json(edb.Cargar_Guias(e), JsonRequestBehavior.AllowGet);
        }

        //Trasaccion para guardar las respuestas 
        public JsonResult GuardarRespuestas_Enc(tbl_ValoresGuiaRef1 r)
        {
            return Json(edb.GuardarRespuestas_Enc(r), JsonRequestBehavior.AllowGet);
        }

        //Transaccion para iniciar la primer encuesta
        public JsonResult Iniciar_PrimerEnc(tbl_Empleados e)
        {
            return Json(edb.Iniciar_PrimerEnc(e), JsonRequestBehavior.AllowGet);
        }

        public JsonResult IniciarEvaluacionLFDPPP(Iniciar inicio)
        {
            return Json(edb.IniciarEvaluacionLFDPPP(inicio));
        }

        public JsonResult IniciarEvaluacion(Iniciar inicio)
        {
            return Json(edb.IniciarEvaluacion(inicio));
        }
        public JsonResult CargarEvaluacionLFDPPP(int idExamen) 
        {
            EvaluacionCompleta data = new EvaluacionCompleta();
            var preguntas = edb.ObtenerPreguntasEvaluacion(idExamen);
            var respuestas = edb.ObtenerRespuestasEvaluacion(idExamen);

            data.Preguntas = preguntas;
            data.Respuestas = respuestas;

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarEvaluacion(int idExamen)
        {
            EvaluacionCompleta data = new EvaluacionCompleta();
            var preguntas = edb.ObtenerPreguntasEvaluacion(idExamen);
            var respuestas = edb.ObtenerRespuestasEvaluacion(idExamen);

            data.Preguntas = preguntas;
            data.Respuestas = respuestas;

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarGrupo(int idExamen)
        {
            EvaluacionCompleta data = new EvaluacionCompleta();
            var preguntas = edb.ObtenerPreguntasEvaluacion(idExamen);
            data.Preguntas = preguntas;
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GuardarEva(int idExamen, string grupo, string opcion,int IdCurso)
        {
            return Json(edb.GuardarEva(idExamen, grupo, opcion, IdCurso), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GuardarEvaluacion(int idExamen, string grupo, string opcion)
        {
            return Json(edb.GuardarEvaluacion(idExamen, grupo, opcion), JsonRequestBehavior.AllowGet);
        }

        ///Evaluacion de clima laboral 2020
       //Inicar evaluacion
        public JsonResult IniciarEvaluacionClimaLaboral(tbl_ClimaLaboral_Dic2021 ev)
        {
            return Json(edb.IniciarEvaluacionClimaLaboral(ev), JsonRequestBehavior.AllowGet);
        }   
        //Cargar Evaluación
        public JsonResult CargarEvaluacionClimaLa()
        {
            return Json(edb.CargarEvaluacionClimaLa(), JsonRequestBehavior.AllowGet);
        }

        //Guaurdar evaluacion
        public JsonResult GuardarEvaluacionClimaLaboral(tbl_RespuestasAmbienteLaboral r)
        {
            return Json(edb.GuardarEvaluacionClimaLaboral(r), JsonRequestBehavior.AllowGet);
        }
    }
}