const express = require('express');

const router = express.Router();
const db = require('./data/db.js')
router.use(express.json());


router.get("/", (req, res) => {
    db.find()
    .then(posts => {
        res.json(posts)
    })
    .catch(err=>{res.status(500).json({err: err})});
});

router.get("/:id", (req, res) => {
    const {id} = req.params;
    
    db.findById(id)
    .then(post => {
        res.json(post);
    })
    .catch(err => {res.status(500).json({err: err})})
})

router.get('/:id/comments', (req, res) => {
    const {id} = req.params;
    db.findPostComments(id)
    .then(comment => {
        res.json(comment);
    })
    .catch(err => {res.status(500).json({err: err})})
})

router.post('/', (req, res) => {
    const newPost = req.body;
    db.insert(newPost)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(err=> {res.status(500).json({err: err})})
})

router.post("/:id/comments", (req, res) =>  {
    const {id} = req.params;
    const newComment = req.body;

    // db.findById(id).then(post => {
    //     console.log(post)
    //     db.insertComment(newComment)
    //     .then(comment => {res.status(201).json(comment)})
    // }
    // )
    db.insertComment(newComment)
    .then(comment => {
        {res.status(201).json(comment)}
    })


//     db.findById(id)
//     .then(
//         db.insertComment(newComment)
//         .then(comment => {
//             console.log(comment);
//             res.status(201).json(comment)
//         })
        
//         .catch(err=>{console.log("hitERROR1");res.status(500).json({err: err})})
//     )
//     .catch(err=> {console.log("hitERROR2");res.status(500).json({err:err})})
})

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    db.update(id, changes)
    .then(updated => {
        if (updated) {
            res.json(updated)
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'failed to update'
        })
    })
})

router.delete("/:id", (req, res) => {
    const {id} = req.params;

    db.remove(id)
    .then(deleted => {
        res.json(deleted);
    })
    .catch(err => {
        res.status.json({err: err})
    })
})

module.exports = router;