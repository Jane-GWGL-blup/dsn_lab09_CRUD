const btnUpload = document.querySelector('#submit1')
const imageResult = document.querySelector('#imagen');
 

btnUpload.addEventListener('click',event => {
    event.preventDefault();
    const file= document.querySelector('#file1').files[0]
    const name=document.querySelector('#nombre1').value
    const apellido=document.querySelector('#apellido1').value
    //const imagen=document.querySelector('#file')
    const email=document.querySelector('#email1').value
    const telefono=document.querySelector('#telefono1').value
    const direccion=document.querySelector('#direccion1').value
    /*
    const { url } = await fetch("/s3Url").then((res) => res.json());
    document.querySelector("#imagen").value = url.split("?")[0];

    await fetch(url, {
    method: "PUT",
    headers: {
        "Content-Type": "multipart/form-data",
    },
    body: file,
    });
    */
     const formData = new FormData()

    formData.append('imagen', file);
    formData.append('nombre',name)
    formData.append('apellido',apellido)
   // formData.append('imagen',imagen)
    formData.append('email',email)
    formData.append('telefono',telefono)
    formData.append('direccion',direccion) 
    console.log(name)
    uploadFile(formData); 
    

})

 const uploadFile = (formData) => {

        fetch('/contactos/addcontacto',{
            method:'POST',
            redirect: 'follow',
            body:formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                //imageResult.src = data.Location;
            })
    }; 


const updateFile = (formData) => {

        fetch('/contactos/addcontacto',{
            method:'PUT',
            body:formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                //imageResult.src = data.Location;
            })
    }; 