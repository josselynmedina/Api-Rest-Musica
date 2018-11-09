var express = require('express');
var path = require('path');
var router = express.Router(); 
var appRootDir = require('app-root-dir').get();


router.get('/', function (req, res) {   
    res.sendFile(path.join(appRootDir,'public','index.html'));

});

//1
router.get('/thebeatle', function (req, res) {
    res.download(path.join(appRootDir,'public','imagenes','letitbe.jpg'),
        function(err){
            if (err){
                console.log('Ocurrio un error en la descarga.');
                res.status(404).send('INCORRECTO!');
            }
            else
                console.log('Descarga exitosa.');
        });
});