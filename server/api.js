const api = require('express')();

api.use((req,res,next))

myObject = {}

Object.defineProperty(myObject, food, {value:'fruit'})

api.get((req, res) => {

   res.send('food');
 });

 api.listen(8076)

module.exports = api;
