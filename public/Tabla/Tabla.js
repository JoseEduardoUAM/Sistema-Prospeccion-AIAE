
//let TablaProspectos = document.getElementById('TablaProspectos');
let TituloColumnas = document.getElementById('TituloColumnas');
let SeccionRegistros = document.getElementById('SeccionRegistros');

fetch( '/MostrarTabla' , { method: 'POST' , body : JSON.stringify({id:"id"}) , headers: {'Content-Type': 'application/json'} } )
.then( res => res.json() )
.then( (res) => {
    agregarTituloColumnas( res[0] );
    agregarRegistrros(res)
    const table = new simpleDatatables.DataTable("#TablaProspectos");
})
.catch( (err) => {
    console.log( err );
})

function agregarTituloColumnas( data ) {
    Object.keys( data ).forEach( x => {
        let th = document.createElement('th');
        th.innerText = x;
        TituloColumnas.appendChild( th );
    })
    let th = document.createElement('th');
    TituloColumnas.appendChild( th );
}

function agregarRegistrros(data) {
    data.forEach( registro => {
        let tr = document.createElement('tr');
        Object.keys(registro).forEach( dato => {
            let td = document.createElement('td');
            td.innerText = registro[dato];
            tr.appendChild( td );
        })
        let td = document.createElement('td');
        td.innerText = registro['IdPro'];
        td.innerHTML = `<button type="button" onclick="mostrarProspecto( ${registro['IdPro']} )">Mostrar</button>`;
        tr.appendChild( td );
        SeccionRegistros.appendChild( tr );
    })
}

function mostrarProspecto(id){
    window.location.replace(`/Prospecto?idProspecto=${id}`);
}