async function registrarUsuario() {
    const id = parseInt(document.getElementById("id").value);
    const nombre = document.getElementById("nombre").value;
    const tipo = document.getElementById("tipo").value;

    const response = await fetch("/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nombre, tipo })
    });

    const data = await response.json();
    alert(data.mensaje || data.error);
}

async function listarUsuarios() {
    const response = await fetch("/usuarios");
    const usuarios = await response.json();

    const lista = document.getElementById("listaUsuarios");
    lista.innerHTML = "";

    usuarios.forEach(u => {
        const li = document.createElement("li");
        li.textContent = `ID: ${u.id} - ${u.nombre} (Límite: ${u.limite})`;
        lista.appendChild(li);
    });
}

async function prestarRecurso() {
    const idUsuario = parseInt(document.getElementById("idUsuarioPrestamo").value);
    const idRecurso = parseInt(document.getElementById("idRecursoPrestamo").value);

    const response = await fetch("/prestamos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idUsuario, idRecurso })
    });

    const data = await response.json();
    alert(data.mensaje);
}

async function devolverRecurso() {
    const idRecurso = parseInt(document.getElementById("idRecursoDevolver").value);

    const response = await fetch("/devoluciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idRecurso })
    });

    const data = await response.json();
    alert(data.mensaje);
}

async function pagarMulta() {
    const idUsuario = parseInt(document.getElementById("idUsuarioMulta").value);

    const response = await fetch("/multas/pagar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idUsuario })
    });

    const data = await response.json();
    alert(data.mensaje);
}