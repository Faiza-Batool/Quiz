const express = require('express');
const knex = require('../db/client');
const router = express.Router();

//clucks
router.get("/", (req, res) => {   
    knex.select('*')
        .from('clucks')
        .orderBy('createdAt', 'desc')
        .then(data => {
            console.log(data);
            res.render("clucks/clucks", { list: data });
        })
    });

    router.get('/create_cluck', (req, res) => {
        res.render("cluck/create_cluck");
    })
    
    router.post("/", (req, res) => {
        // all the data from the form, gonna be stored inside the request.body
        // it has to be a post request
        knex("clucks")
            .insert({
                
                content: req.body.content,
                imageUrl: req.body.imageUrl
            })
            .returning('*') // 
            .then(data => {
                res.redirect(`/cluck/${data[0].id}`)
            })
    
    })
show
    // router.get('/:id', (req, res) => {
    //     const id = req.params.id;
    //     console.log(id);
    //     knex("cluck")
    //         .where("id", id)
    //         .first()
    //         .then(data => {
    //             res.render("cluck/index", { cluck: data });
    //         })
    
    // })

////////////
router.get("/clucks", (req, res) => {   
    knex('clucks')
        .orderBy('createdAt', 'desc')
        .then(data => {
            console.log(data);
            res.render("cluck/clucks", { list: data });
        })
});

// creating new cluck
router.get('/create_cluck', (req, res) => {
    res.render('cluck/create_cluck',{ 
    })
})
//submitting new cluck
router.post('/',(req,res)=>{
    const cluck = {
        content: req.params.content,
        imageUrl: req.params.url  
   }
   
   knex('clucks').insert(cluck).returning("*")
   .then(data => { 
       console.log(data)
       res.redirect(`clucks/${data[0].id}`)
       //console.log(data)
   })
})
////showing clucks
router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    knex("clucks")
        .where("id", id)
        .first()
        .then(data => {
            res.render("clucks/clucks", { post: data });
        })
})

module.exports = router;