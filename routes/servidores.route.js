import { Router } from "express"
import { servidoresController } from "../controllers/servidores.controller.js"

const router = Router()

router.get('/', servidoresController.inicio)

router.get('/crear', servidoresController.crearArchivo)

router.get('/leer', servidoresController.leerArchivo)

router.get('/renombrar', servidoresController.renombrarArchivo)

router.get('/eliminar', servidoresController.eliminarArchivo)

export default router;