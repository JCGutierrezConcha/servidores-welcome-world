import { readFile, writeFile, rename, unlink } from 'fs/promises'
import path from 'path'

const __dirname = import.meta.dirname
const pathFile = path.join(__dirname, '../data')


const inicio = (req, res) => {
    return res.sendFile(path.join(__dirname, '../index.html'))
}

const crearArchivo = async (req, res) => {
    const { archivo, contenido } = req.query
    const fecha = new Date();
    const fechaFormato = fecha.toLocaleDateString("en-GB")
    try {
        await writeFile(path.join(pathFile, `/${archivo}.txt`), `${fechaFormato}\n${contenido}`)
        return res.send("Archivo creado con éxito!")
    } catch (error) {
        return res.status(500).send("Algo salió mal...")
    }
}

const leerArchivo = async (req, res) => {
    const { archivo } = req.query
    try {
        const data = await readFile(path.join(pathFile, `/${archivo}.txt`), 'utf8')
        console.log(data)
        return res.send("Archivo leído con éxito")
    }
    catch (error) {
        if (archivo == "") {
            return res.status(500).send("Algo salió mal... no se recibio nombre del archivo")
        } else {
            return res.status(500).send("Algo salió mal... no existe el archivo: " + archivo)
        }
    }
}

const renombrarArchivo = async (req, res) => {
    const { nombre, nuevoNombre } = req.query;
    try {
        await rename(path.join(pathFile, `/${nombre}.txt`), path.join(pathFile, `/${nuevoNombre}.txt`));
        return res.send(`Archivo ${nombre}.txt renombrado por ${nuevoNombre}.txt`);
    } catch (error) {
        return res.status(500).send("Algo salió mal...");
    }
}

const eliminarArchivo = async (req, res) => {
    const { archivo } = req.query;
    if (!archivo) {
        return res.status(400).send("Nombre de archivo no proporcionado");
    }
    try {
        await unlink(path.join(pathFile, `/${archivo}.txt`));
        return res.send(`Archivo ${archivo}.txt eliminado con éxito`);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Algo salió mal... no existe el archivo: " + archivo);
    }
}

export const servidoresController = {
    inicio,
    crearArchivo,
    leerArchivo,
    renombrarArchivo,
    eliminarArchivo
}