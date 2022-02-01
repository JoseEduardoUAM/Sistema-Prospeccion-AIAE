    
fetch( '/ObtenerEstadisticas' , { method: 'POST' , headers: {'Content-Type': 'application/json'} } )
.then( res => res.json() )
.then( (res) => {
    pintarEstadisticas(res);
})
.catch( (err) => {
    console.log( err );
})

feather.replace({ 'aria-hidden': 'true' })
var ctx = document.getElementById('myChart')

function pintarEstadisticas( data ){
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: data.fecha ,
        datasets: [{
            data: data.numeroProspectos,
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#007bff',
            borderWidth: 4,
            pointBackgroundColor: '#007bff'
        }]
        },
        options: {
        scales: {
            yAxes: [{
            ticks: {
                beginAtZero: false
            }
            }]
        },
        legend: {
            display: false
        }
        }
    })
}

