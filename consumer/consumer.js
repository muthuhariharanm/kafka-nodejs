const { Kafka } = require('kafkajs')
const config = require('./config')
const pool = require("./db");


const kafka = new Kafka({
  clientId: config.kafka.CLIENTID,
  brokers: config.kafka.BROKERS
})

const topic = config.kafka.TOPIC
const consumer = kafka.consumer({
  groupId: config.kafka.GROUPID
})

getAll = async function () {
	const result = await pool.query('select * from "reviews"')
	console.log(result.rows)
	return result.rows
}

getAllFor = async function (revieweeEmail) {
  const result = await pool.query('select * from "reviews" where reviewee_email = $1', [revieweeEmail])
  return result.rows
}

create = async function (review,email) {
	const query = 'insert into "reviews" ("reviewee_email", "reviewer_email", "rating") values ($1, $2, $3)'
	const values = [email, review.reviewer_email, review.rating]
	await pool.query(query, values)
}


const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const email = message.key.toString()
        const jsonObj = message.value.toString()
          console.log(
            '******* Alert!!!!! message *********',
            email,jsonObj
          )
          await create(JSON.parse(jsonObj),email)
          getAll()

      } catch (error) {
        console.log('err=', error)
      }
    }
  })
}

run().catch(e => console.error(`[example/consumer] ${e.message}`, e))



