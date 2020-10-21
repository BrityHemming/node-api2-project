//npm package imports
const express = require('express');

// local module imports
//local module imports 
const Data = require('./data/db.js');
// this creates the server
const server = express();
// this tells the server how to read JSON
server.use(express.json());

// test that server is running
server.get('/', (req, res)=>{
    res.status(200).send('Hello World');
});

//Get Requests 
// show all posts
server.get('/api/posts', (req, res)=>{
    Data.find()
    .then(posts =>{
        res.status(200).json({data: posts})
    })
    .catch(error =>{
        res.status(500).json({message: error.message})
    })
});
// get post by id 
server.get('/api/posts/:id', (req, res)=>{
    Data.findById(req.params.id)
    .then(post =>{
        if(post){
            res.status(200).json({data: post})
        }else{
            res.status(404).json({message: 'post does not exist'});
        }
    })
    .catch(error =>{
        res.status(500).json({message: error.message})
    });
});
//show comments


//Post Requests
//create a post 
server.post('/api/posts', (req, res)=>{
    if(req.body.title  && req.body.contents){
        Data.insert(req.body)
        .then(post =>{
            res.status(201).json({data: post});    
        })
        .catch(error=>{
            res.status(500).json({message: error.message});
        });
    }else{
        res.status(404).json({message: 'Please provide title and contents for the post.'})
    }
});

//creates comments for a post
server.post('/api/posts/:id/comments', (req, res)=>{
    Data.insertComment(req.body)
    .then(comment =>{
        res.status(201).json({data: comment})
    })
    .catch(error =>{
        res.status(500).json({message: error.message})
    })
})

//Put Requests 


//Delete Requests


//flip
server.get('/flip', (req, res)=>{
    const coin = Math.random() >= 0.5 ? "heads": "tails";
    res.status(200).send(coin);
});




// define the port
const port = 5002;
//tell the server to listen for this port
server.listen(port, ()=> console.log('server is running'));