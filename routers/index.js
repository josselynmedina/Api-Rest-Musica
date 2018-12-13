var express = require('express');
var router = express.Router(); 


router.get('/',function (req, res) {
	res.send('Bienvenidos A la API_REST .');
});


module.exports = router;