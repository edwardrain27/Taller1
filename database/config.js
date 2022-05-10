const {PrismaClient} = require('@prisma/client');

const prismaClient = new PrismaClient();

const dbConnect = async()=>{
    try {
        await prismaClient.$connect();
        console.log('base de datos online');
    } catch (error) {
        console.log(error);
        console.log('Error de conexión con la base de datos');
    }
}

module.exports = {dbConnect, prismaClient};