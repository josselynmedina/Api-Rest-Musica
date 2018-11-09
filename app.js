//bd
//mongodb://josselyn:v-1234@ds155243.mlab.com:55243/dbmusica
var express = require('express');
var bodyParser= require("body-parser");
var mongoose= require('mongoose');
var app = express();
var path = require('path');

app.listen(3000, function () {
    console.log('Conectado al puerto 3000!');
  });

app.use(bodyParser.urlencoded({ extended: true }));

//conexion ala bd
  mongoose.connect('mongodb://josselyn:v-1234@ds155243.mlab.com:55243/dbmusica',  { useNewUrlParser: true });

  //Public
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'public','index.html'));
});

//Esquema
var cancionesSchema = mongoose.Schema({
    _id: Number,
    cancion: String,
    artista: String,
    album: String,
    date: Date,
    pais: String
},{collection:'Canciones'});

//agregado metodos al esquema
cancionesSchema.methods.info = function () {
    var msj = "Hola, soy " + this.artista + " con la cancion" + this.cancion;
    console.log(msj);
};

//paseando el esquema al modelo
var Canciones = mongoose.model('Canciones', cancionesSchema);

//Consultar todas las canciones
app.get('/api/canciones', function (req, res) {
    Canciones.find(function (err, canciones){
        if (err)
            res.status(500).send('Error en la base de datos');
        else
            res.status(200).json(canciones);
    });
});

//Consultar una canción por ID
app.get('/api/canciones/:id',function(req,res){
    Canciones.findById(req.params.id,function(err, canciones) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else{
            if (canciones != null) {
                canciones.info();
                res.status(200).json(canciones);
            }
            else
                res.status(404).send('No se encontro esa cancion');
        }
    });
});

//Consulta de canciones que sean del año X o más reciente
//Consulta de canciones que estén entre dos años (desde – hasta)


//Crear una nueva canción en la base de datos
app.post('/api/canciones',function(req,res){
    //crea un objeto pero del modelo Persona
    var canciones1 = new Canciones({
        _id: req.body.id,
        cancion: req.body.cancion,
        artista: req.body.artista,
        album: req.body.album,
        date: req.body.date,
       pais: req.body.pais
    });
    
    //guarda una persona en la base de datos
    canciones1.save(function (error, canciones1) {
        if (error) {
            res.status(500).send('No se ha podido agregar.');
        }
        else {
            res.status(200).json('Agregado exitosamente'); 
        }
    });
});
//Modificar la información de una canción por su ID
app.put('/api/canciones/:id',function(req,res){

    //Modificar con Find ID
    Canciones.findById(req.params.id,function(err, canciones) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else{
            if (canciones != null){
                canciones.cancion = req.body.cancion;
                canciones.artista = req.body.artista;
                canciones.album = req.body.album;
                canciones.date = req.body.date;
                canciones.pais = req.body.pais;
                canciones.save(function (error, canciones1) {
                    if (error)
                        res.status(500).send('Error en la base de datos');
                    else {
                        res.status(200).send('Modificado exitosamente');
                    }
                });
            }
            else
                res.status(404).send('No se encontro esa cancion');
        }
    });
});
//Eliminar una canción por su ID
app.delete('/api/canciones/:id',function(req,res){
    //Eliminar con Find ID
    Canciones.findById(req.params.id,function(err, canciones) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else{
            if (canciones != null) {
                canciones.remove(function (error, result) {
                    if (error)
                        res.status(500).send('Error en la base de datos');
                    else {
                        res.status(200).send('Eliminado exitosamente');
                    }
                });
            }
            else
                res.status(404).send('No se encontro esa cancion');
        }
    });
});