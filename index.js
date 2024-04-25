import express from 'express'
import { readFile, writeFile, rename, unlink } from 'fs/promises'
import path from 'path'

const app = express()

// ruta absoluta
const __dirname = import.meta.dirname

app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, '/index.html'))
})

// Ruta crear
app.get("/crear", async (req, res) => {
    const { archivo, contenido } = req.query
    const fecha = new Date();
    const fechaFormato = fecha.toLocaleDateString("en-GB")
    try {
        await writeFile(path.join(__dirname, `/${archivo}.txt`), `${fechaFormato}\n${contenido}`)
        return res.send("Archivo creado con éxito!")
    } catch (error) {
        return res.status(500).send("Algo salió mal...")
    }
})
// Ruta leer
app.get("/leer", async (req, res) => {
    const { archivo } = req.query
    try {
        const data = await readFile(path.join(__dirname, `/${archivo}.txt`), 'utf8')
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
})
// Ruta renombrar
app.get("/renombrar", async (req, res) => {
    const { nombre, nuevoNombre } = req.query;
    try {
        await rename(path.join(__dirname, `/${nombre}.txt`), path.join(__dirname, `/${nuevoNombre}.txt`));
        return res.send(`Archivo ${nombre}.txt renombrado por ${nuevoNombre}.txt`);
    } catch (error) {
        return res.status(500).send("Algo salió mal...");
    }
});

// Ruta eliminar
app.get("/eliminar", async (req, res) => {
    const { archivo } = req.query;
    if (!archivo) {
        return res.status(400).send("Nombre de archivo no proporcionado");
    }
    try {
        await unlink(path.join(__dirname, `/${archivo}.txt`));
        return res.send(`Archivo ${archivo}.txt eliminado con éxito`);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Algo salió mal... no existe el archivo: " + archivo);
    }
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})