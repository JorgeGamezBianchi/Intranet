using MED.Models;
using System.Web.Mvc;

namespace MED.Controllers
{
    public class CursoController : Controller
    {
        CursosDB obj = new CursosDB();
        // GET: Curso
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AdminProg()
        {
            list_Programas ls = new list_Programas();
            ls.Programas = obj.CargarProgramas();
            ViewData["Programas"] = ls;
            List_tipo_curso lst = new List_tipo_curso();
            lst.TipoCursos = obj.CargarTipoCurso();
            ViewData["TipoCursos"] = lst;
            return View();
        }

        //Vista para asignar los cursos
        public ActionResult AsignarCurso()
        {
            list_Programas ls = new list_Programas();
            ls.Programas = obj.CargarProgramas();
            ViewData["Programas"] = ls;
            return View();
        }

        //Vista para visualizar los cursos asignados
        public ActionResult CursosAsignados()
        {
            return View();
        }

        //Vista para visualizar las calificaciones de los cursos realizados por empleados
        public ActionResult CalificacionesCursos()
        {
            ListCursos ls = new ListCursos();
            ls.Cursos = obj.CargarTotalCursos();
            ViewData["Cursos"] = ls;
            return View();
        }

        public ActionResult Certificado()
        {
            return View();
        }
        
        //Vista para Chrome
        public ActionResult CertificadoC()
        {
            return View();
        }

        public ActionResult BuscarCalifxNumEmp()
        {
            return View();
        }

        //Vista para actualizar fechas 
        public ActionResult ActualizarFechas()
        {
            return View();
        }

        //Vista para asignar cursos de manera masiva
        public ActionResult AsignarCursos_Generadores()
        {
            ListEmpleados ls = new ListEmpleados();
            ls.LstEmp = obj.Lista_AsigarCurso_Generadores();
            ViewData["LstEmp"] = ls;
            return View();
        }

        //Vista para CANYRET
        public ActionResult CANYRET()
        {
            return View();
        }

        public JsonResult CrearPrograma(string nombre,string numEmpleado)
        {
            return Json(obj.CrearPrograma(nombre,numEmpleado), JsonRequestBehavior.AllowGet);
        }

        public JsonResult EliminarPrograma(string idPrograma)
        {
            return Json(obj.EliminarPrograma(idPrograma), JsonRequestBehavior.AllowGet);
        }

        public ActionResult CrearCurso(CursoArchivo curso)
        {
            var id = obj.CrearCurso(curso);
            int contador = 0;
            if (id > 0)
            {
                if (curso.File.Count > 0)
                {
                    for (int i = 0; i < curso.File.Count; i++)
                    {
                        contador = obj.GuardarArchivo(curso.File[i], curso.Nombre_Curso, id,"Contenido",curso.Descripcion,curso.Tiempo[i]);
                    }
                }
                if(curso.Actividad != null)
                {
                    contador = obj.GuardarArchivo(curso.Actividad, curso.Nombre_Curso, id,"Actividad",curso.Descripcion,curso.TiempoAct);
                }
            }
            return Json(contador, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarCursos(string idPrograma)
        {
            return Json(obj.CargarCursos(idPrograma), JsonRequestBehavior.AllowGet);
        }

        public JsonResult EditarCurso(CursoArchivo curso)
        {
            var id = obj.ActualizarCurso(curso);
            int contador = 0;
            if (id > 0)
            {
                if (curso.File != null)
                {
                    for (int i = 0; i < curso.File.Count; i++)
                    {
                        contador = obj.GuardarArchivo(curso.File[i], curso.Nombre_Curso, curso.Id_curso,"Contenido",curso.Descripcion,curso.Tiempo[i]);
                    }
                }
                if (curso.Actividad != null)
                {
                    contador = obj.GuardarArchivo(curso.Actividad, curso.Nombre_Curso, curso.Id_curso, "Actividad",curso.Descripcion,curso.TiempoAct);
                    
                }
            }
            return Json(contador == 0 ? id : contador, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EliminarCurso(int idCurso, string nombreCurso)
        {
            return Json(obj.EliminarCurso(idCurso, nombreCurso), JsonRequestBehavior.AllowGet);
        }
        public JsonResult CargarArchivos(int idCurso)
        {
            return Json(obj.CargarArchivos(idCurso), JsonRequestBehavior.AllowGet);
        }

        public JsonResult EliminarArchivoPorId(int idArchivo, string nombreCurso, string nombreArchivo, int idExamen)
        {
            return Json(obj.EliminarArchivo(idArchivo, nombreCurso, nombreArchivo, idExamen), JsonRequestBehavior.AllowGet);

        }

        /////CURSO ASIGNADO
        /////CURSO ASIGNADO
        public JsonResult CargarCursosAsignados(string Usuario, int Id)
        {
            return Json(obj.CargarCursosAsignados(Usuario, Id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CargarArchivosEstatus(int idCurso, string Usuario)
        {
            return Json(obj.CargarArchivosEstatus(idCurso, Usuario), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GuardarEstatus(string NumEmpleado, int IdArchivo, string EstatusVideo, int ID)
        {
            return Json(obj.GuardarEstatus(NumEmpleado, IdArchivo, EstatusVideo, ID), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Calificar(retro r)
        {
            return Json(obj.Calificar(r), JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateEstatus(int IdVariable, string calificacion)
        {
            return Json(obj.UpdateEstatus(IdVariable, calificacion), JsonRequestBehavior.AllowGet);
        }


        public JsonResult CargarCursosRealizados(string Usuario,int id)
        {
            return Json(obj.CargarCursosRealizados(Usuario,id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult IntentosEvaluacion(int idexamen,string NumEmpleado,string fecha,int ID)
        {
            return Json(obj.IntentosEvaluacion(idexamen, NumEmpleado, fecha, ID), JsonRequestBehavior.AllowGet);
        }

        /////-------------------Asignar curso

        //Cargar los empleados que tengan el id de la direccion seleccionada
        public JsonResult CargarEmp_Direccion(int id)
        {
            return Json(obj.CargarEmp_Direccion(id), JsonRequestBehavior.AllowGet);
        }

        //Carga a los empleados que tengas el id de la direccion y departamento seleccionado
        public JsonResult Cargar_EmpDirecDepart(int id_dir, int id_dep)
        {
            return Json(obj.Cargar_EmpDirecDepart(id_dir, id_dep), JsonRequestBehavior.AllowGet);
        }

        //Carga a los empleados dependiendo de la camapaña que tengan asignadas
        public JsonResult Cargar_EmpCamp(int id_camp)
        {
            return Json(obj.Cargar_EmpCamp(id_camp), JsonRequestBehavior.AllowGet);
        }

        //Trae a un empleado en especifico
        public JsonResult Buscar_Emp(string num_emp)
        {
            return Json(obj.Buscar_Emp(num_emp), JsonRequestBehavior.AllowGet);
        }

        //Cargar los cursos dependiendo del programa
        public JsonResult Cargar_CursosPrograma(int id)
        {
            return Json(obj.Cargar_CursosPrograma(id), JsonRequestBehavior.AllowGet);
        }

        //Manda los datos para asignar el curso
        public JsonResult Asignar_Curso(int id_curso, string id_emp, string capacitador)
        {
            return Json(obj.Asignar_Curso(id_curso, id_emp, capacitador), JsonRequestBehavior.AllowGet);
        }

        //Manda a traer los cursos con sus respectivas calificaciones
        public JsonResult CargarCursosConCalificaciones(FiltroCursos filtro)
        {
            return Json(obj.CargarCursosConCalificacion(filtro), JsonRequestBehavior.AllowGet);
        }
        //Manda a traer los cursos por empleado con sus respectivas calificaciones 
        public JsonResult CargarCursosConCalificacionesxNumEmp(string NumEmp, string RFC)
        {
            return Json(obj.CargarCursosConCalificacionxNumEmp(NumEmp,RFC), JsonRequestBehavior.AllowGet);
        }

        //Buqueda de curso mas reciente aprobado del empleado 
        public JsonResult BuscarCursoxEmpleado(string NumEmp)
        {
            return Json(obj.BusquedaCursoxNumEmp(NumEmp), JsonRequestBehavior.AllowGet);
        }

        //Actualiza Fechas de curso
        public JsonResult ActualizarFechasCursos(FiltroCursos fi)
        {
            return Json(obj.ActualizarFechasCursos(fi), JsonRequestBehavior.AllowGet);
        }
    }

}