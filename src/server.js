const proffys = [
  {
    name: 'Diego Fernandes',
    avatar:
      'https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4',
    whatsapp: '1122-2211',
    bio:
      'Entusiasta das melhores tecnologias de química avançada. Apaixonado' +
      'por explodir coisas em laboratório e por mudar a vida das pessoas' +
      'através de experiências. Mais de 200.000 pessoas já passaram por uma' +
      ' das minhas explosões.',
    subject: 'Química',
    cost: '40',
    weekday: [0],
    time_from: [720],
    time_to: [1220],
  },
  {
    name: 'Daniele Evangelista',
    avatar:
      'https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4',
    whatsapp: '1122-2211',
    bio:
      'Entusiasta das melhores tecnologias de química avançada. Apaixonado' +
      'por explodir coisas em laboratório e por mudar a vida das pessoas' +
      'através de experiências. Mais de 200.000 pessoas já passaram por uma' +
      ' das minhas explosões.',
    subject: 'Química',
    cost: '40',
    weekday: [1],
    time_from: [720],
    time_to: [1220],
  },
];

const express = require('express');
const server = express();
const nunjucks = require('nunjucks');

// Configurar nunjucks

nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});

function pageLanding(req, res) {
  return res.render('index.html');
}

function pageStudy(req, res) {
  return res.render('study.html', { proffys });
}

function pageGiveClasses(req, res) {
  return res.render('give-classes.html');
}

server
  // configurar arquivos estáticos (css, scripts, imagens)
  .use(express.static('public'))
  // rotas da aplicação
  .get('/', pageLanding)
  .get('/study', pageStudy)
  .get('/give-classes', pageGiveClasses)
  .listen(5500);
