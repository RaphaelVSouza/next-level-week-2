const express = require('express');
const server = express();
const nunjucks = require('nunjucks');

const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages');

 // Configurar nunjucks
 nunjucks.configure('src/views', {
   express: server,
   noCache: true,
 });
 
server
  .use(express.urlencoded({extended: true}))
  // configurar arquivos estáticos (css, scripts, imagens)
  .use(express.static('public'))
  // rotas da aplicação
  .get('/', pageLanding)
  .get('/study', pageStudy)
  .get('/give-classes', pageGiveClasses)
  .post('/save-class', saveClasses)
  .listen(5500);
