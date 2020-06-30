module.exports = {
  kafka: {
    TOPIC: 'reviews',
    BROKERS: ['<kafka-service-ip:port>'],
    GROUPID: 'bills-consumer-group',
    CLIENTID: 'sample-kafka-client'
  }
}
