let Retroalimentacion = {};

document.getElementById('btn_enviar').onclick = () =>{
    let {valido,input} = validarDatos();
    if(valido){
        let Prospecto = {};
        Prospecto['IdPro'] = 0;
        let formulario = document.getElementById('Formulario');
        for( let i = 0 ; i < 5 ; i++ ){
            Prospecto[ formulario[i].id ] = formulario[i].value;
        }
        let Retroalimentaciones = [];
        Object.keys( Retroalimentacion ).forEach( x => {
            Retroalimentaciones.push( x );
        })
        enviarDatos( { Prospecto , Retroalimentaciones } );
    }else{
        alert(`Se debe completar el campo ${input}`, 'warning')
    }
}

document.getElementById('btn_agregar').onclick = () =>{
    let OpcionesRetroalimentacion = document.getElementById('OpcionesRetroalimentacion');
    if( !Retroalimentacion[ OpcionesRetroalimentacion.value ] & OpcionesRetroalimentacion.value != "Selecciona las Retroalimentaciones" ){
        let ListaRetroalimentacion = document.getElementById('ListaRetroalimentacion');
        let li = document.createElement('li');
        li.className = "list-group-item";
        li.innerText = OpcionesRetroalimentacion.value + " " + OpcionesRetroalimentacion[ OpcionesRetroalimentacion.value ].text;
        ListaRetroalimentacion.appendChild(li);
        Retroalimentacion[ OpcionesRetroalimentacion.value ] = OpcionesRetroalimentacion.value;
    }
}

function alert(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  
    document.getElementById('liveAlertPlaceholder').append(wrapper)
}

function enviarDatos( data ){
    fetch( '/CrearProspecto' , { method: 'POST' , body : JSON.stringify( data ) , headers: {'Content-Type': 'application/json'} } )
        .then( res => res.json() )
        .then( (res) => {
            if( res.status ){
                limpiarFormulario();
                alert('Se agrego un nuevo Prospecto', 'success')
            }else{
                alert('¡Ocurrio un Error, por favor intente de nuevo!', 'danger')
            }
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

function limpiarFormulario(){
    let formulario = document.getElementById('Formulario');
    for( let i = 0 ; i < 5 ; i++ ){
        formulario[i].value = "";
    }
    let ListaRetroalimentacion = document.getElementById('ListaRetroalimentacion');
    let elementos = ListaRetroalimentacion.getElementsByTagName('li');
    while( elementos.length > 1 ){
        ListaRetroalimentacion.removeChild( elementos[1] );
    }
    Retroalimentacion = {};
}

function  obtenerObservaciones(){
    fetch( '/ObtenerObservaciones' , { method: 'POST' , headers: {'Content-Type': 'application/json'} } )
    .then( res => res.json() )
    .then( (res) => {
        agregarOpcionesRetroalimentacion(res);
    })
    .catch( (err) => {
        console.log( err );
        agregarOpcionesRetroalimentacion([])
    })
}

function agregarOpcionesRetroalimentacion(data){
    let OpcionesRetroalimentacion = document.getElementById('OpcionesRetroalimentacion');
    data.forEach( retro => {
        let IdRet = retro.IdRet;
        let Nombre = retro.Nombre;
        let option = document.createElement('option');
        option.value = IdRet;
        option.innerText = Nombre;
        OpcionesRetroalimentacion.appendChild(option);
    });
}

obtenerObservaciones();