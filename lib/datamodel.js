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
                           // callback(200)
                           console.log('File created!')
                           callback(false);
                        }else 
                        {
                           callback(err);
                        }
                    });
                }
                else 
                {
                    callback(err);
                }

            })
            


        }else 
        {
            callback(err);
        }

    })

}


//Read 

datamodel.read = (dir, file , callback) =>{

fs.readFile(`${datamodel.baseurl}`+`/${dir}`+`/${file}`+`.json`,'utf8',(err , data)=>{
    //console.log(err);

   callback(err,data);

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

                       // console.log('File updated sucessfully');
                        callback(false);

                    }else 
                    {
                        callback(err);
                    }
                })

            }else 
            {
                callback(err)
            }

        })

    }
    else 
    {
        callback(err);
    }
})


}


//delete 


datamodel.delete = (dir , file , callback) =>{

    fs.unlink(`${datamodel.baseurl}`+`/${dir}`+`/${file}`+`.json`,(err)=>{

        if(!err)
        {
            callback(false);
        }
        else{
            callback(err)
        }

    })
}


module.exports = datamodel;
