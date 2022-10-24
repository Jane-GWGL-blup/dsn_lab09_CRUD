//definiendo la l+ogica
//referencia al sdk
const S3 = require('aws-sdk/clients/s3')
//referencia convertir el archivo en la carpeta temporal en string
const fs = require('fs');

//para que el sdk acceso a los objetos
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

//Creamos el objeto storage
const storage = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

//Retornar los buckets
const getBuckets = () => {
    return storage.listBuckets().promise();
}

//Recargar un archivo a un bucket específico
const uploadToBucket = (bucketName,file) => {
    const stream = fs.createReadStream(file.tempFilePath);
    const params = {
        Bucket:bucketName,
        Key:file.name,
        Body:stream
    };
    return storage.upload(params).promise();
};

const deleteObject = (params) => {
    storage.deleteObject(params, function(err, data){
        if(err){
            console.log(err, err.stack);  // error
        }else{
            console.log('Eliminado correctamente');
        } 
    })
}

/* const deleteObject = (params) =>{
    fs.deleteObject(params, function(err, data) {
        if (err) console.log(err, err.stack);  // error
        else     console.log();                 // deleted
      });
} */




module.exports = {
    getBuckets,
    uploadToBucket,
    deleteObject
};