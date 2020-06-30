module.exports = {
  kafka: {
    TOPIC: 'reviews',
    BROKERS: ['<kafka-service-ip:port>'],
    GROUPID: 'reviews-consumer-group',
    CLIENTID: 'sample-kafka-client'
  }
}
