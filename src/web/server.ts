import express from "express";
import { BibliotecaService } from "../application/BibliotecaService";
import { Estudiante } from "../domain/Estudiante";
import { Docente } from "../domain/Docente";

const app = express();
const port = 3000;

const biblioteca = new BibliotecaService();

app.use(express.json());
app.use(express.static("src/web/public"));

// --------------------
// REGISTRAR USUARIO
// --------------------
app.post("/usuarios", (req, res) => {
    try {
        const { id, nombre, tipo } = req.body;

        let usuario;

        if (tipo === "estudiante") {
            usuario = new Estudiante(id, nombre);
        } else if (tipo === "docente") {
            usuario = new Docente(id, nombre);
        } else {
            return res.status(400).json({ error: "Tipo inválido" });
        }

        biblioteca.registrarUsuario(usuario);

        res.json({ mensaje: "Usuario registrado correctamente ✔" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// --------------------
// LISTAR USUARIOS
// --------------------
app.get("/usuarios", (req, res) => {
    const usuarios = biblioteca.listarUsuarios();

    res.json(
        usuarios.map(u => ({
            id: u.getId(),
            nombre: u.getNombre(),
            limite: u.obtenerLimitePrestamos()
        }))
    );
});

// --------------------
// PRESTAR RECURSO
// --------------------
app.post("/prestamos", (req, res) => {
    const { idUsuario, idRecurso } = req.body;
    const mensaje = biblioteca.prestarPorId(idUsuario, idRecurso);
    res.json({ mensaje });
});

// --------------------
// DEVOLVER RECURSO
// --------------------
app.post("/devoluciones", (req, res) => {
    const { idRecurso } = req.body;
    const mensaje = biblioteca.devolverPorId(idRecurso);
    res.json({ mensaje });
});

// --------------------
// PAGAR MULTA
// --------------------
app.post("/multas/pagar", (req, res) => {
    const { idUsuario } = req.body;
    const mensaje = biblioteca.pagarMultaPorId(idUsuario);
    res.json({ mensaje });
});

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});