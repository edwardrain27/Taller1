const {request, response} = require('express');
const {prismaClient} = require('../database/config');

const languages = {
    "ES":"Hola, ",
    "EN":"Hello, ",
    "FR":"Salut, "
}


const greeting = async(req=request, res=response) =>{
    try {
        const {name} = req.query;
        const usuario = await prismaClient.user.findFirst({where:{name}});
        if(usuario){
            const content = languages[usuario.lang] + usuario.name;
            return res.status(200).json({
                id:usuario.id,
                content
            })
        }

        return res.status(404).json({
            ok:false,
            msg:`No está registrado el usuario con el nombre ${name}`
        })
        
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error'
        })
    }

}

const register = async(req=request, res=response)=>{
    try {
        const {name, lang} = req.query;
        const usuario = await prismaClient.user.create({data:{
            name,
            lang
        }})
        res.status(201).json({
            ok:true,
            usuario
        })

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'Error'
        })
    }
}


module.exports = {register,greeting}