const Database = require('./database/db');
const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format');

function pageLanding(req, res) {
  return res.render('index.html');
}

async function pageStudy(req, res) {
   const filters = req.query;

   if(!filters.subject || !filters.weekday || !filters.time) {
    return res.render("study.html", { filters, subjects, weekdays })
   }

  // Converter horas em minutos
  const timeToMinutes = convertHoursToMinutes(filters.time)

   const query = `
   ${/* Seleciona todas linhas e colunas das tabelas classes e proffys */''}
   SELECT classes.*, proffys.*
   ${/* Seleciona a tabela base para a consulta */''}
   FROM proffys
   ${/* Junta as linhas da tabela classes que o proffy_id de classes corresponde ao proffy.id da tabela proffys*/''}
   JOIN classes ON (classes.proffy_id = proffys.id)
   ${/* Fará a busca somente se ela existir */''}
   WHERE EXISTS(
     SELECT class_schedule.*
     FROM class_schedule
     ${/* Faz a busca da tabela class_schedule onde o class.id é igual ao class_id de schedule */''}
     WHERE class_schedule.class_id = classes.id
     AND class_schedule.weekday = ${filters.weekday}
     AND class_schedule.time_from <= ${timeToMinutes}
     AND class_schedule.time_to >= ${timeToMinutes}
   )
   AND classes.subject = '${filters.subject}'
   `

   // Caso haja erro na consulta de dados

   try {
    const db = await Database;
    const proffys = await db.all(query);

    proffys.map((proffy) => {
        proffy.subject = getSubject(proffy.subject)
    })
    return res.render('study.html', { proffys, subjects, filters, weekdays})
   } catch(e) {
       console.log(e)
   }
   return res.render('study.html', { filters, subjects, weekdays });
}

function pageGiveClasses(req, res) {
  return res.render('give-classes.html', { weekdays, subjects});
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy');
    
   const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio,
    }

    const classValue = { 
        subject: req.body.subject,
        cost: req.body.cost,
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {

        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })
    try {
        const db = await Database;
        await createProffy(db, { proffyValue, classValue, classScheduleValues });

        let queryString = "?subject=" + req.body.subject;
        queryString += "&weekday=" + req.body.weekday[0];
        queryString += "&time=" + req.body.time_from[0];
        return res.redirect('/study' + queryString)
    }   catch(e) {
        console.log(e)
    }
   

     
    
}

module.exports = { pageLanding, pageStudy, pageGiveClasses, saveClasses }