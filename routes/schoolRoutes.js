const express = require('express');
const router = express.Router();
const { addSchool, listSchools } = require('../controllers/schoolController');

console.log("Setting up school routes...");

router.get('/', (req, res) => {
    res.render('index'); 
  });
router.post('/addSchool', addSchool);
router.get('/listSchools', listSchools);

module.exports = router;