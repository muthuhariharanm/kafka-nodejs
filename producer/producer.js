const { Kafka } = require('kafkajs')
const config = require('./config')
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path');
var hbs = require('express-hbs');
const pool = require("./db");

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

const publicPath = path.resolve(__dirname, "pages");
app.use(express.static(publicPath)); 

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/pages'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/pages');

const client = new Kafka({
  brokers: config.kafka.BROKERS,
  clientId: config.kafka.CLIENTID
})

const topic = config.kafka.TOPIC
const producer = client.producer()

app.listen(8000,()=>{
  console.log('Producer running 8000')
})

app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/pages/producer.html')
})

app.get('/mail/:mail',async (req,res)=>{
  let data = await getAllFor(req.params.mail)
  res.render('review-page.hbs',{reviewee_email: req.params.mail , data: data })
})

app.post('/send',(req,res)=>{
  let data = req.body
  sendMessage(producer, topic, data)
  res.redirect('/')
})

app.post('/review/:email',(req,res)=>{
  let data = req.body
  let reviewee_email = req.params.email
  sendMessage(producer, topic, data, reviewee_email)
  res.redirect('/mail/'+reviewee_email)
})

getAllFor = async function (revieweeEmail) {
  const result = await pool.query('select * from "reviews" where reviewee_email = $1', [revieweeEmail])
  console.log(result.rows)
  return result.rows
}

const sendMessage = async (producer, topic, data, reviewee_email) => {
  await producer.connect()
  payloads = {
    topic: topic,
    messages: [
      { key: reviewee_email, value: JSON.stringify(data) }
    ]
  }
  console.log('payloads=', payloads)
  producer.send(payloads)
}


