import baseUrl from './config.js';

function patchArea() {
    const form = document.getElementById('areaForm');
    const data = {
        IdArea: form.IdArea.value,
        Nombre: form.Nombre.value,
        Edificio: form.Edificio.value
    };

    fetch(`${baseUrl}/api/areas/${data.IdArea}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('areaResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"> <p style="background-color: #475C58;" > ${JSON.stringify(data)}</p> </div></div>`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('areaResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"> <p style="background-color: #475C58;" >Error al actualizar el área</p> </div></div>`;
    });
}

function patchDepartamento() {
    const form = document.getElementById('departamentoForm');
    const id = form.IdDepartamento.value;
    const data = {
        NumeroDepartamento: form.NumeroDepartamento.value,
        Nombre: form.Nombre.value,
        IdEncargado: form.IdEncargado.value,
        IdArea: form.IdArea.value
    };

    fetch(`${baseUrl}/api/departamentos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('departamentoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"> <p style="background-color: #475C58;" > ${JSON.stringify(data)}</p> </div></div>`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('departamentoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"> <p style="background-color: #475C58;" >Error al actualizar el departamento</p> </div></div> `;
    });
}

function patchEmpleado() {
    const form = document.getElementById('empleadoForm');
    const id = form.IdEmpleado.value;
    const data = {
        NumeroEmpleado: form.NumeroEmpleado.value,
        Nombre: form.Nombre.value,
        Apellido: form.Apellido.value,
        Edad: form.Edad.value,
        Genero: form.Genero.value,
        Departamento1Id: form.Departamento1Id.value,
        Departamento2Id: form.Departamento2Id.value,
        Departamento3Id: form.Departamento3Id.value
    };

    fetch(`${baseUrl}/api/empleados/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('empleadoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"> <p style="background-color: #475C58;" > ${JSON.stringify(data)}</p> </div></div>`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('empleadoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"> <p style="background-color: #475C58;" >Error al actualizar el empleado</p> </div></div>`;
    });
}

function patchEncargado() {
    const form = document.getElementById('encargadoForm');
    const id = form.IdEncargado.value;
    const data = {
        Nombre: form.Nombre.value,
        Estudio: form.Estudio.value,
        Turno: form.Turno.value
    };

    fetch(`${baseUrl}/api/encargados/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('encargadoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"> <p style="background-color: #475C58;" > ${JSON.stringify(data)}</p> </div></div> `;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('encargadoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"> <p style="background-color: #475C58;" >Error al actualizar el encargado</p> </div></div>`;
    });
}

window.patchArea = patchArea;
window.patchDepartamento = patchDepartamento;
window.patchEmpleado = patchEmpleado;
window.patchEncargado = patchEncargado;