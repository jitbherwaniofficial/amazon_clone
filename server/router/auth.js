const express = require('express');

const router = express.Router();

router.get('/', function(req,res){
    res.json({Hii:"Jit Bherwani, How are you?"})
})

module.exports = router;