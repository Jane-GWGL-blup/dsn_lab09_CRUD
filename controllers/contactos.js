const { errorMonitor } = require('events');
const { getBuckets,uploadToBucket,deleteObject } = require("../helpers/s3")
const path = require('path');
const Contacto = require('../models/contactos');

module.exports.upload = async (req, res ) => {
        console.log(req);
        const bucket = req.body.bucket
        const file = req.files.file;
        console.log("Hola")
        const result = await uploadToBucket(bucket, file);
        res.json(result)
    };
    

exports.index = function (req, res) {
        
    res.sendFile(path.resolve('views/contactos.html'));
};

exports.create = async (req, res) => {
        const { nombre, apellido, email, file, telefono, direccion, _id } = req.body;

        //const file = req.files.file;

    
        console.log(req.body);
        console.log(_id);

        if (req.body._id) {
                console.log("ID: "+ req.body._id);
                await Contacto.findByIdAndUpdate(_id, {
                        nombre: nombre,
                        apellido: apellido,
                        imagen: file,
                        email: email,
                        telefono: telefono,
                        direccion: direccion,    
                }, { new: true });
                res.redirect('/contactos');
        } else {
        //
        console.log(req);
        const bucket = 's3-bucket-nclab09'
        const file = req.files.imagen
        console.log("Hola")
        const result = await uploadToBucket(bucket, file);
        console.log("Hola2")
        //res.json(result)
        //
        saveNewData(req,result.Location,res)

    }
    
};

const saveNewData = (req, url, res) => {

        
        var newContacto = new Contacto({
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                imagen:url,
                email:req.body.email,
                telefono:req.body.telefono,
                direccion:req.body.direccion,
        });
        
        newContacto.save( function (err) {
                if(err) {
                //res.status(400).send('Unable to save contactos database, probably email ');
                console.log(err)
                res.status(400).render('errorcontacto')    
               
            } else { 
                console.log("new Contacto "+newContacto);
                //console.log(req.body)
                res.redirect('/contactos');
            }
      });
}

exports.deleteContacto = async (req, res) => {
        const  id  = req.params.id;
        Contacto.findById({_id:id}).exec(function(err, contactos){
                if(err){
                        console.log(err)
                }else{
                        const imageName = contactos.imagen.split('/')
                        console.log(imageName[3])
                        let params = {  Bucket: 's3-bucket-nclab09', Key: imageName[3] };
                        Contacto.findByIdAndRemove(id,function(err, contacto){
                                if(err){
                                        return res.send(500, err);
                                }
                                        
                                deleteObject(params);
                                res.redirect('/contactos');
                                console.log("Contacto eliminado")
                                
                        });
                }
        })
        console.log("Entre al delete")
        console.log("ID: "+ id)
        
        
    }

exports.list = async (req, res) => {

        Contacto.find({}).exec(async (err, contactos) => {
                if (err) {
                        return res.send(500, err);
                }

                const data = await getBuckets();
                console.log(data.Buckets);

                res.render('getcontacto', {
                        contactos: contactos,
                        buckets:data.Buckets
             });
        });
};
