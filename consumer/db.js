const pg = require('pg')

let dbConnectionUri = "postgres://postgres:12345678@kafka-db-statefulset-0.kafka-db-svc:5432/postgres"
const pool = new pg.Pool({ 'connectionString': dbConnectionUri })

const CREATE_SQL = `CREATE TABLE IF NOT EXISTS "reviews" (
        "reviewee_email" VARCHAR (256),
        "reviewer_email" VARCHAR (256),
        "rating" VARCHAR(10),
        PRIMARY KEY (reviewee_email, reviewer_email))`

const tableInitialized = pool.query(CREATE_SQL).then(function () {
	console.log("Database connection established")
}).catch(function (error) {
	console.error(`Could not establish database connection: '${dbConnectionUri}'`)
	console.error(error.stack)
	process.exit(1)
})

module.exports = pool
