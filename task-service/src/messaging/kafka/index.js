const { Kafka, logLevel } = require ('kafkajs');

const kafka = new Kafka({
  brokers: ['distinct-pig-7926-us1-kafka.upstash.io:9092'],
  ssl: true,
  sasl: {
      mechanism: 'scram-sha-256',
      username: 'ZGlzdGluY3QtcGlnLTc5MjYkfARsjlr8zFBu4f0zkSACDUCo_4waADOz8VfW6FI',
      password: 'NTU5YjMyOWYtNDY0Ni00OTFkLWExNzktMTYwZDEwYTdmMWU1'
  },
  logLevel: logLevel.ERROR,
});


module.exports = kafka