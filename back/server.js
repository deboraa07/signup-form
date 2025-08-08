import express from 'express';
import pkg from '@prisma/client';
const {PrismaClient} = pkg;
const prisma = new PrismaClient()

const app = express();
app.use(express.json());

app.post('/usuarios', async (req,res)=> {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            occupation: req.body.occupation
        }
    })
    res.status(201).json(req.body);
});

app.get('/usuarios', async (req, res) => {
    let usuarios = [];
    if(req.query){
        usuarios = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                occupation: req.query.occupation
            }
        })
    }else{
    usuarios = await prisma.user.findMany();
    }
    res.status(200).json(usuarios);
});

app.put('/usuarios/:id', async (req,res)=> {
    console.log(req);

     await prisma.user.update({
        where: {
         id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            occupation: req.body.occupation
        }
    })
    res.status(201).json(req.body);
}); 

    app.delete('/usuarios/:id', async (req,res) => {
        await prisma.user.delete({
            where:{
             id: req.params.id
            }
        })
        res.status(200).json({message: 'Usuario deletado'});
    })

app.listen(3000);


