const Database = require('./db');
const createProffy = require('./createProffy')

Database.then( async (db) => {
    // Inserir dados

    proffyValue = {
        name: 'Diego Fernandes',
    avatar:
      'https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4',
    whatsapp: '1122-2211',
    bio:
      'Entusiasta das melhores tecnologias de química avançada. Apaixonado' +
      'por explodir coisas em laboratório e por mudar a vida das pessoas' +
      'através de experiências. Mais de 200.000 pessoas já passaram por uma' +
      ' das minhas explosões.',
   
    }

    classValue = {
        subject: 'Química',
        cost: '40',
        // Gerar proffy_id

    }

    classScheduleValues = [
        // class_id virá pelo banco de dados, após cadastrarmos a aula
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    // Create proffy 
//await createProffy(db, { proffyValue, classValue, classScheduleValues})


    // Consultar dados inseridos

    // todos os proffys

  const selectedProffys = await db.all("SELECT * FROM proffys")
  //console.log(selectedProffys)

  const selectClassesAndProffys = await db.all(`
   
  `)
  //console.log(selectClassesAndProffys)

  const selectClassesSchedules = await db.all(`
  SELECT class_schedule.*
  FROM class_schedule
  WHERE class_schedule.class_id = "5"
  AND class_schedule.weekday = "0"
  AND class_schedule.time_from <= "520"
  AND class_schedule.time_to >= "1220"
  `)

    console.log(selectClassesSchedules)

})