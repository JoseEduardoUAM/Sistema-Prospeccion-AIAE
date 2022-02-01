let params = new URLSearchParams(location.search);
var IdPro = params.get('idProspecto');

let Retroalimentacion = [];

fetch( '/DatosProspecto' , { method: 'POST' , body : JSON.stringify( {IdPro} ) , headers: {'Content-Type': 'application/json'} } )
    .then( res => res.json() )
    .then( (res) => {
        pintarDatos_agregarDatosForm(res);
    })
    .catch( (err) => {
        console.log( err );
    })

function pintarDatos_agregarDatosForm(data) {
    [ 'Nombre' , 'Telefono' , 'Email' , 'Cargo' , 'Observaciones' ].forEach( x => {
        document.getElementById( x ).innerText = data[x];
        document.getElementById( `${x}M` ).value = data[x];
    })
    let Retroalimentaciones = document.getElementById('Retroalimentaciones');
    Retroalimentacion.innerText = "";
    data['Retroalimentaciones'].forEach( x => {
        console.log( x );
        let IdRet = x.IdRet;
        let Nombre = x.Nombre;
        let div = document.createElement('div');
        div.className = "rounded p-2 mb-2";
        div.style.cssText = "background-color: rgb(28, 93, 146); color: aliceblue;";
        div.innerText = Nombre;
        Retroalimentaciones.appendChild(div);
        Retroalimentacion.push( x );
        let ListaRetroalimentacion = document.getElementById('ListaRetroalimentacion');
        let li = document.createElement('li');
        li.className = "list-group-item";
        li.id = `li-${IdRet}`;
        li.innerText = IdRet + " " + Nombre;
        ListaRetroalimentacion.appendChild(li);
        ////////////////////////////////
    })
}

document.getElementById('btn_eliminar').onclick = () =>{
    fetch( '/EliminarProspect' , { method: 'POST' , body : JSON.stringify( {IdPro} ) , headers: {'Content-Type': 'application/json'} } )
    .then( res => res.json() )
    .then( (res) => {
        alert('Se Elimino el prospecto', 'success');
        seccion_botones.style.display = null;
        seccion_modificacion.style.display = 'none';
    })
    .catch( (err) => {
        console.log( err );
        alert('Ocurrio un error al Eliminar el prospecto', 'danger');
    })
}

document.getElementById('btn_modificar').onclick = () =>{
    seccion_botones.style.display = 'none';
    seccion_modificacion.style.display = null;
}

document.getElementById('btn_cancelar').onclick = () =>{
    seccion_botones.style.display = null;
    seccion_modificacion.style.display = 'none';
}

document.getElementById('btn_agregar_retro').onclick = () =>{
    let OpcionesRetroalimentacion_Agregar = document.getElementById('OpcionesRetroalimentacion_Agregar');
    if( !Retroalimentacion[ OpcionesRetroalimentacion_Agregar.value ] & OpcionesRetroalimentacion_Agregar.value != "Selecciona las Retroalimentaciones" ){
        let ListaRetroalimentacion = document.getElementById('ListaRetroalimentacion');
        let li = document.createElement('li');
        li.className = "list-group-item";
        li.id = `li-${OpcionesRetroalimentacion_Agregar.value}`;
        li.innerText = OpcionesRetroalimentacion_Agregar.value + " " + OpcionesRetroalimentacion_Agregar[ OpcionesRetroalimentacion_Agregar.value ].text;
        ListaRetroalimentacion.appendChild(li);
        Retroalimentacion[ OpcionesRetroalimentacion_Agregar.value ] = OpcionesRetroalimentacion_Agregar[ OpcionesRetroalimentacion_Agregar.value ].text;
    }
}

document.getElementById('btn_quitar_retro').onclick = () =>{
    let valorRetroalimentacion = document.getElementById('OpcionesRetroalimentacion_Quitar');
    console.log( valorRetroalimentacion.value );
    if( !Retroalimentacion[ valorRetroalimentacion.value ] === false & valorRetroalimentacion.value != "Selecciona las Retroalimentaciones" ){
        let ListaRetroalimentacion = document.getElementById('ListaRetroalimentacion');
        let hijo = document.getElementById(`li-${valorRetroalimentacion.value}`)
        ListaRetroalimentacion.removeChild( hijo );
        console.log( "Dentro" );
        delete Retroalimentacion[valorRetroalimentacion.value];
    }
}

document.getElementById('btn_enviar').onclick = () =>{
    let {valido,input} = validarDatos();
    if(valido){
        let data = {};
        data['IdPro'] = IdPro;
        [ 'Nombre' , 'Telefono' , 'Email' , 'Cargo' , 'Observaciones' ].forEach( x => {
            data[ x ] = document.getElementById(`${x}M`).value
        })
        data["Retroalimentaciones"]= [ Retroalimentacion];
        modificarDatos( data );
    }else{
        alert_Formulario(`Se debe completar el campo ${input}`, 'warning')
    }
}

function modificarDatos(data){
    fetch( '/ModificarProspecto' , { method: 'POST' , body : JSON.stringify( data ) , headers: {'Content-Type': 'application/json'} } )
    .then( res => res.json() )
    .then( (res) => {
        console.log( res );
        alert('Se modifico el prospecto', 'success');
        seccion_botones.style.display = null;
        seccion_modificacion.style.display = 'none';
        pintarDatos_agregarDatosForm(data);
    })
    .catch( (err) => {
        alert('¡Ocurrio un Error!', 'danger')
    })
}

function validarDatos(){
    let formulario = document.getElementById('Formulario');
    for( let i = 0 ; i < 5 ; i++ ){
        if( !formulario[i].value ){
            return { valido : false , input : formulario[i].id }
        }
    }
    return { valido : true , input : '' }
}

function alert(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  
    document.getElementById('liveAlertPlaceholder').append(wrapper)
}

function alert_Formulario(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  
    document.getElementById('liveAlertPlaceholder_Formulario').append(wrapper)
}

let seccion_botones = document.getElementById('seccion_botones');
let seccion_modificacion = document.getElementById('seccion_modificacion');

