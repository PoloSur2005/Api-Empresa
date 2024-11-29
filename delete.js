import baseUrl from './config.js';

function deleteArea() {
    const form = document.getElementById('areaForm');
    const id = form.IdArea.value;

    fetch(`${baseUrl}/api/areas/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('areaResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"><p style="background-color: #475C58;">Área eliminada con éxito</p></div></div>`;
        } else {
            document.getElementById('areaResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"><p style="background-color: #475C58;">Error al eliminar el área</p> </div></div>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('areaResult').innerHTML = `<p style="background-color: #475C58;">Error al eliminar el área</p>`;
    });
}

function deleteDepartamento() {
    const form = document.getElementById('departamentoForm');
    const id = form.IdDepartamento.value;

    fetch(`${baseUrl}/api/departamentos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('departamentoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"><p style="background-color: #475C58;">Departamento eliminado con éxito</p></div></div>`;
        } else {
            document.getElementById('departamentoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"><p style="background-color: #475C58;">Error al eliminar el departamento</p></div></div>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('departamentoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"><p style="background-color: #475C58;">Error al eliminar el departamento</p></div></div>`;
    });
}

function deleteEmpleado() {
    const form = document.getElementById('empleadoForm');
    const id = form.IdEmpleado.value;

    fetch(`${baseUrl}/api/empleados/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('empleadoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><p style="background-color: #475C58;" >Empleado eliminado con éxito</p><div class="card-body"> </div></div>`;
        } else {
            document.getElementById('empleadoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"><p style="background-color: #475C58;" >Error al eliminar el empleado</p></div></div>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('empleadoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"><p style="background-color: #475C58;" >Error al eliminar el empleado</p></div></div>`;
    });
}

function deleteEncargado() {
    const form = document.getElementById('encargadoForm');
    const id = form.IdEncargado.value;

    fetch(`${baseUrl}/api/encargados/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('encargadoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"><p">Encargado eliminado con éxito</p></div></div>`;
        } else {

            document.getElementById('encargadoResult').innerHTML = ` <div class="card mt-3" style="background-color: #475C58;"><div class="card-body"><p>Error al eliminar el encargado</p> </div></div>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('encargadoResult').innerHTML = `<div class="card mt-3" style="background-color: #475C58;"><div class="card-body"><p>Error al eliminar el encargado</p></div></div>`;
    });
}

window.deleteArea = deleteArea;
window.deleteDepartamento = deleteDepartamento;
window.deleteEmpleado = deleteEmpleado;
window.deleteEncargado = deleteEncargado;