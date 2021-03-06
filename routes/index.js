const { Router } = require('express');
var express = require('express');
const app = require('express')();
const http = require('http');
var router = express.Router();
const Link = require('../models/link');
 const port = process.env.PORT || 3000;

router.get('/:code/stats', async (req, res, next) => {
  const code = req.params.code;
  const resultado = await Link.findOne({where: {code} });
  if (!resultado) return res.sendStatus(404);
  res.render('stats', resultado.dataValues);
})

router.get('/:code', async(req, res, next) => {
const code = req.params.code;

const resultado = await Link.findOne({where: {code} });
if (!resultado) return res.sendStatus(404);

resultado.hists++;
await resultado.save();

res.redirect(resultado.url);
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Encurtador de URL' });
});

function generateCode() {
  let text = '';
  const possible = 'ABCDEFGHIJLMNOPQRSTUVXWYZabcdefghijlmnopqrstuvxwyx0123456789';
  for (let i = 0; i < 5; i++)
  text += possible.charAt(Math.floor(Math.random() * possible.length));
return text;
}

router.post('/new', async(req, res, next) => {
  const url = req.body.url;
  const code = generateCode();
 
  const resultado = await Link.create({
    url,
    code
  })

  res.render('stats', resultado.dataValues);
})
module.exports = function (app) {
  app.get('/users/:id', (req, res) => {
    const filtro = req.query.filtro;
    return res.status(404).send(false);
  })
}

module.exports = router;
