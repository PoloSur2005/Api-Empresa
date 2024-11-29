import baseUrl from './config.js';

const idArea = document.getElementById('idArea');
const numeroDepartamento = document.getElementById('numeroDepartamento');
const numeroEmpleado = document.getElementById('numeroEmpleado');
const idEncargadoEncargado = document.getElementById('idEncargadoEncargado');

const areaResult = document.getElementById('areaResult');
const departamentoResult = document.getElementById('departamentoResult');
const empleadoResult = document.getElementById('empleadoResult');
const encargadoResult = document.getElementById('encargadoResult');

particlesJS.load('particles-js', 'particles.json', function() {
    console.log('Particles.js config loaded');
});

window.getAreabyId = function() {
    const url = idArea.value ? `${baseUrl}/api/areas/${idArea.value}` : `${baseUrl}/api/areas`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                areaResult.innerHTML = data.map(area => formatArea(area)).join('');
            } else {
                areaResult.innerHTML = formatArea(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            areaResult.innerHTML = `<p >Error al obtener el área</p>`;
        });
}

window.getDepartamentoById = function() {
    const url = numeroDepartamento.value ? `${baseUrl}/api/departamentos/${numeroDepartamento.value}` : `${baseUrl}/api/departamentos`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                departamentoResult.innerHTML = data.map(departamento => formatDepartamento(departamento)).join('');
            } else {
                departamentoResult.innerHTML = formatDepartamento(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            departamentoResult.innerHTML = `<p >Error al obtener el departamento</p>`;
        });
}

window.getEmpleadoById = function() {
    const url = numeroEmpleado.value ? `${baseUrl}/api/empleados/${numeroEmpleado.value}` : `${baseUrl}/api/empleados`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                empleadoResult.innerHTML = data.map(empleado => formatEmpleado(empleado)).join('');
            } else {
                empleadoResult.innerHTML = formatEmpleado(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            empleadoResult.innerHTML = `<p >Error al obtener el empleado</p>`;
        });
}

window.getEncargadoById = function() {
    const url = idEncargadoEncargado.value ? `${baseUrl}/api/encargados/${idEncargadoEncargado.value}` : `${baseUrl}/api/encargados`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                encargadoResult.innerHTML = data.map(encargado => formatEncargado(encargado)).join('');
            } else {
                encargadoResult.innerHTML = formatEncargado(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            encargadoResult.innerHTML = `<p >Error al obtener el encargado</p>`;
        });
}

function formatArea(area) {
    return `
        <div class="card mt-3" style="background-color: #475C58;">
            <div class="card-body">
                <h5 class="card-title">Área</h5>
                <p><strong>ID:</strong> ${area.IdArea}</p>
                <p><strong>Nombre:</strong> ${area.Nombre}</p>
                <p><strong>Edificio:</strong> ${area.Edificio}</p>
            </div>
        </div>
    `;
}

function formatDepartamento(departamento) {
    if (departamento.IdEncargado && departamento.IdArea) {
        return `
            <div class="card mt-3" style="background-color: #475C58;">
                <div class="card-body">
                    <h5 class="card-title">Departamento</h5>
                    <p><strong>Número:</strong> ${departamento.NumeroDepartamento}</p>
                    <p><strong>Nombre:</strong> ${departamento.Nombre}</p>
                    <p><strong>ID Encargado:</strong> ${departamento.IdEncargado}</p>
                    <p><strong>ID Área:</strong> ${departamento.IdArea}</p>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="card mt-3" style="background-color: #475C58;">
                <div class="card-body">
                    <h5 class="card-title">Departamento</h5>
                    <p><strong>Número:</strong> ${departamento.NumeroDepartamento}</p>
                    <p><strong>Nombre:</strong> ${departamento.Nombre}</p>
                    <h6>Encargado</h6>
                    <p><strong>ID:</strong> ${departamento.encargado.IdEncargado}</p>
                    <p><strong>Nombre:</strong> ${departamento.encargado.Nombre}</p>
                    <p><strong>Estudio:</strong> ${departamento.encargado.Estudio}</p>
                    <p><strong>Turno:</strong> ${departamento.encargado.Turno}</p>
                    <h6>Área</h6>
                    <p><strong>ID:</strong> ${departamento.area.IdArea}</p>
                    <p><strong>Nombre:</strong> ${departamento.area.Nombre}</p>
                    <p><strong>Edificio:</strong> ${departamento.area.Edificio}</p>
                </div>
            </div>
        `;
    }
}

function formatEmpleado(empleado) {
    if (empleado.Departamento1Id && empleado.Departamento2Id && empleado.Departamento3Id) {
        return `
            <div class="card mt-3" style="background-color: #475C58;">
                <div class="card-body">
                    <h5 class="card-title">Empleado</h5>
                    <p><strong>Número:</strong> ${empleado.NumeroEmpleado}</p>
                    <p><strong>Nombre:</strong> ${empleado.Nombre}</p>
                    <p><strong>Apellido:</strong> ${empleado.Apellido}</p>
                    <p><strong>Edad:</strong> ${empleado.Edad}</p>
                    <p><strong>Género:</strong> ${empleado.Genero}</p>
                    <p><strong>ID Departamento 1:</strong> ${empleado.Departamento1Id}</p>
                    <p><strong>ID Departamento 2:</strong> ${empleado.Departamento2Id}</p>
                    <p><strong>ID Departamento 3:</strong> ${empleado.Departamento3Id}</p>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="card mt-3" style="background-color: #475C58;">
                <div class="card-body">
                    <h5 class="card-title">Empleado</h5>
                    <p><strong>Número:</strong> ${empleado.NumeroEmpleado}</p>
                    <p><strong>Nombre:</strong> ${empleado.Nombre}</p>
                    <p><strong>Apellido:</strong> ${empleado.Apellido}</p>
                    <p><strong>Edad:</strong> ${empleado.Edad}</p>
                    <p><strong>Género:</strong> ${empleado.Genero}</p>
                    ${empleado.departamento1 ? formatDepartamento(empleado.departamento1) : ''}
                    ${empleado.departamento2 ? formatDepartamento(empleado.departamento2) : ''}
                    ${empleado.departamento3 ? formatDepartamento(empleado.departamento3) : ''}
                </div>
            </div>
        `;
    }
}

function formatEncargado(encargado) {
    return `
        <div class="card mt-3" style="background-color: #475C58;">
            <div class="card-body">
                <h5 class="card-title">Encargado</h5>
                <p><strong>ID:</strong> ${encargado.IdEncargado}</p>
                <p><strong>Nombre:</strong> ${encargado.Nombre}</p>
                <p><strong>Estudio:</strong> ${encargado.Estudio}</p>
                <p><strong>Turno:</strong> ${encargado.Turno}</p>
            </div>
        </div>
    `;
}