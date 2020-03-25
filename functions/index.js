const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fs = require('fs')//sistemas de arquivos - fire system
const uuid = require('uuid-v4');
const { Storage } = require('@google-cloud/storage')

//instanciando o Storage
const storage = new Storage({
    projectId: 'geek-center-cc6a3',
    keyFilename: 'geek-center.json'
})

exports.uploadImage = functions.https.onRequest((request, response) => {
    cors(request, response, () =>{
        try{
            //armazenando de forma assincrona as imagens temporareamente
            //local, de onde esta vindo a imagem, encode
            for(image in request.body.images){
            
            fs.writeFileSync('/tmp/imagesToSave.jpg', image, 'base64');

            const bucket = storage.bucket('geek-center-cc6a3.appspot.com');
            const id = request.body.productId;
            const imageId = uuid();

            //fazendo o upload da imagens
            bucket.upload('/tmp/imagesToSave.jpg', {
                uploadType: 'media',
                destination: `productsPicture/${id}/${imageId}.jpg`,
                metadata:{
                    metadata:{
                        contentType: 'image/jpg',
                        firebaseStorageDownloadTokens: imageId
                    }
                }
            }, (err, file) => {
                if(err){
                    console.log(err);
                    return response.status(500).json({ error: err})
                }else {
                    const fileName = encodeURIComponent(file.name);

                    const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/'
                            + bucket.name + '/o/' + fileName + '?alt=media&token=' + imageId;
                    return response.status(201).json({ imageUrl })
                }
            })
        }
        } catch (err) {
            console.log(err);
            return response.status(500).json({ error: err });
        }
    })
});
