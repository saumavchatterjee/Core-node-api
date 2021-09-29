const fs = require('fs');
const path = require('path');


const datamodel = {};

datamodel.baseurl = path.join(__dirname,'/../.data');

//Create 

datamodel.create=(dir , file , data , callback) =>{

    fs.open(`${datamodel.baseurl}`+`/${dir}`+`/${file}`+`.json`, 'wx',(err, fd)=>{
        const processdata =  JSON.stringify(data);
        if(!err && fd)
        {
           
            fs.writeFile(fd, processdata,'utf8',(err)=>
            {

                if(!err)
                {
                    fs.close(fd, (err)=>{
                        if(!err){
                            console.log('File created sucessfully!');
                        }else 
                        {
                           callback('Unable to close file!');
                        }
                    });
                }
                else 
                {
                    callback('Unable to create  file!');
                }

            })
            


        }else 
        {
            callback('Unable to open file!');
        }

    })

}


//Read 

datamodel.read = (dir, file , callback) =>{

fs.readFile(`${datamodel.baseurl}`+`/${dir}`+`/${file}`+`.json`,'utf8',(err , data)=>{

    if(!err){
        callback(err,data);
    }
    else 
    {
        callback(err);
    }
})

}


//Update 

datamodel.update = (dir, file , data , callback) =>{
const processdata = JSON.stringify(data);

fs.open(`${datamodel.baseurl}`+`/${dir}`+`/${file}`+`.json`,'r+',(err, fd)=>{

    if(!err && fd){

        fs.ftruncate(fd,(err)=>{

            if(!err)
            {
                fs.writeFile(fd, processdata , 'utf8', (err)=>{
                    if(!err){

                        console.log('File updated sucessfully');

                    }else 
                    {
                        callback('Unable to update file ');
                    }
                })

            }else 
            {
                callback('File is locked')
            }

        })

    }
    else 
    {
        callback('Unable to open file !');
    }
})


}


//delete 


datamodel.delete = (dir , file , callback) =>{

    fs.unlink(`${datamodel.baseurl}`+`/${dir}`+`/${file}`+`.json`,(err)=>{

        if(!err)
        {
            console.log('Files deleted successfully!');
        }
        else{
            callback('Unable delte file!');
        }

    })
}


module.exports = datamodel;
