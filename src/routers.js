const express = require('express');
const jwt = require('jsonwebtoken');
const route = express.Router();

route.get( '/' , autentificar , (req,res) => {
    res.render('index');
})

route.get( '/tabla' , autentificar , (req,res) => {
    res.render('tabla');
})

route.get( '/registro' , autentificar , (req,res) => {
    res.render('registrar');
})

route.get( '/login' , (req,res) => {
    res.render('login',{mensaje:false});
})

route.get( '/cerraSesion' , (req,res) => {
    res.clearCookie('jwt');
    res.redirect('/login');
})

route.post( '/login' , (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    if( !email & !password ){
        return res.render('login',{ mensaje : true , alert: false , title: 'Se debe colocar el email y contraseña'});
    }else{
        req.getConnection( (err,conn) => {
            if(err)
                return res.render('login',{ mensaje : true , alert: false , title: 'Por favor espere, ocurrio un error'});
            conn.query( 'SELECT IdAdm FROM Administrador WHERE Email = ? AND Password = aes_encrypt( ? , ? )' , [ email , password , process.env.KEY_SECRET ] , (err,results) => {
                if(err) 
                    return res.render('login',{ mensaje : true , alert: false , title: 'Por favor espere, ocurrio un error'});
                if( results.length !== 1 ) 
                    return res.render('login',{ mensaje : true , alert: false , title: 'El usuario y/o contraseña son incorrectos'});
                let IdAdm = results[0].IdAdm;
                let token = jwt.sign( {IdAdm} , process.env.KEY_SECRET , {
                    expiresIn: '1h' 
                })
                const cookieOptions = {
                    expires: new Date(Date.now() + (60 * 60 * 1000) ),
                    httpOnly: true
                }
                res.cookie( 'jwt' , token , cookieOptions );
                res.render('login',{ mensaje : true , alert: true , title: 'Bienvenido' , url: '/' });
            })
        })
    }
})

route.get( '/Prospecto' , (req,res) => {
    res.render( 'prospecto' );
})

route.post( '/DatosProspecto' , (req,res) => {
    let IdPro = req.body.IdPro;
    console.log( req.body );
    req.getConnection( (err,conn) => {
        if(err)
            return res.json( {} );
        conn.query( 'SELECT * FROM Prospecto WHERE IdPro = ?' , [ IdPro ] , (err,results) => {
            if(err)
                return res.json( {} );
            if( results.length !== 1 ) 
                return res.json( {} );
            let prospecto = results[0];
            conn.query( ' SELECT Retroalimentacion.IdRet , Nombre FROM RelacionRetro , Retroalimentacion WHERE RelacionRetro.IdRet = Retroalimentacion.IdRet and IdPro = ?' , [ IdPro ] , (err,results) => {
                if(err)
                    return res.json( {} );
                prospecto["Retroalimentaciones"] = results;
                res.json( prospecto );
            })
        })
    })
})

route.post( '/MostrarTabla' , (req,res) => {
    req.getConnection( (err,conn) => {
        conn.query( 'SELECT IdPro , Nombre , Cargo , Telefono , Email FROM Prospecto' , ( err , result ) => {
            if(err)
                return res.json([]);
            res.json( result );
        })
    })
})

route.post( '/EliminarProspecto' , (req,res) => {
    console.log( "Segun se elimino el prospecto" + req.body.IdPro );
    res.json({OK:"OK"})
})

route.post( '/ModificarProspecto' , (req,res) => {
    console.log( "Segun se modifico el prospecto" + req.body.IdPro );
    res.json({OK:"OK"})
})

route.post( '/CrearProspecto' , (req,res) => {
    // let Prospecto = req.body.Prospecto;
    // req.getConnection( (err,conn) => {
    //     if(err)
    //         return res.json([]); //  <<----
    //     conn.query( 'INSERT INTO Prospecto set ?' , [ Prospecto ] , ( err , result ) => {
    //         if(err)
    //             return res.json([]);
    //         res.json( result );
    //     })
    // })
    res.json( { "OK":"OK" } );
})

route.post( '/ObtenerObservaciones' , (req,res) => {
    req.getConnection( (err,conn) => {
        if(err)
            return res.json([]);
        conn.query( 'SELECT * FROM Retroalimentacion' , ( err , result ) => {
            if(err)
                return res.json([]);
            res.json( result );
        })
    })
})

route.post( '/ObtenerEstadisticas' , (req,res) => {
    if( req.cookies.jwt ){
        let fecha = [];
        let numeroProspectos = []
        jwt.verify( req.cookies.jwt , process.env.KEY_SECRET , ( err , decodificada ) => {
            let IdAdm = decodificada.IdAdm;
            if(err)
                return res.json( { fecha , numeroProspectos } );
            req.getConnection( (err,conn) => {
                if(err)
                    return res.json( { fecha , numeroProspectos } );
                conn.query( 'select Fecha , count(*) as num from (select Fecha , IdAdm from Creacion where IdAdm = ?) as tabla group by Fecha ORDER BY Fecha asc' , [IdAdm] , ( err , result ) => {
                    if(err)
                        return res.json( { fecha , numeroProspectos } );
                    result.forEach( dato => {
                        fecha.push( dato.Fecha.getDate() + "-" + (dato.Fecha.getMonth()+1) + "-" + dato.Fecha.getFullYear() );
                        numeroProspectos.push( dato.num );
                    });
                    res.json( { fecha , numeroProspectos } );
                })
            })
        })
    }else{
        return res.json( { fecha , numeroProspectos } );
    }
})

async function autentificar( req , res , next ){
    if( req.cookies.jwt ){
        jwt.verify( req.cookies.jwt , process.env.KEY_SECRET , ( err , decodificada ) => {
            if(err)
                return res.render('login',{mensaje:false});
            req.getConnection( ( err , conn ) => {
                if( err )
                    return res.redirect('/login');
                conn.query( 'SELECT * FROM Administrador WHERE idAdm = ?' , [ decodificada.IdAdm ] , (err,results) => {
                    if( err ){
                        res.render('login',{mensaje:false});
                    }else if( results.length == 1 ){
                        req.idPersona = results[0];
                        next();
                    }else{
                        res.render('login',{mensaje:false});
                    }
                })
            })
        })
    }else{
        res.redirect('/login');
    }
}

module.exports = route;