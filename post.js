import baseUrl from './config.js';

function postArea() {
    const form = document.getElementById('areaForm');
    const data = {
        IdArea: form.IdArea.value,
        Nombre: form.Nombre.value,
        Edificio: form.Edificio.value
    };

    fetch(`${baseUrl}/api/areas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('areaResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"> <p style="background-color: #475C58;"> ${JSON.stringify(data)}</p> </div></div>`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('areaResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"> <p style="background-color: #475C58;">Error al crear el área</p> </div></div>`;
    });
}

function postDepartamento() {
    const form = document.getElementById('departamentoForm');
    const data = {
        NumeroDepartamento: form.NumeroDepartamento.value,
        Nombre: form.Nombre.value,
        IdEncargado: form.IdEncargado.value,
        IdArea: form.IdArea.value
    };

    fetch(`${baseUrl}/api/departamentos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('departamentoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"> <p style="background-color: #475C58;" >${JSON.stringify(data)}</p> </div></div>`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('departamentoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"> <p style="background-color: #475C58;" >Error al crear el departamento</p> </div></div>`;
    });
}

function postEmpleado() {
    const form = document.getElementById('empleadoForm');
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

    fetch(`${baseUrl}/api/empleados`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('empleadoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"> <p style="background-color: #475C58;" >${JSON.stringify(data)}</p> </div></div>`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('empleadoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"> <p style="background-color: #475C58;" >Error al crear el empleado</p> </div></div>`;
    });
}

function postEncargado() {
    const form = document.getElementById('encargadoForm');
    const data = {
        IdEncargado: form.IdEncargado.value,
        Nombre: form.Nombre.value,
        Estudio: form.Estudio.value,
        Turno: form.Turno.value
    };

    fetch(`${baseUrl}/api/encargados`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('encargadoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"> <p style="background-color: #475C58;" >${JSON.stringify(data)}</p> </div></div>`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('encargadoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"> <p style="background-color: #475C58;" >Error al crear el encargado</p> </div></div>`;
    });
}

window.postArea = postArea;
window.postDepartamento = postDepartamento;
window.postEmpleado = postEmpleado;
window.postEncargado = postEncargado;