# kafka-nodejs
Headstart to kafka with simple implementation in nodejs

## What is Kafka?
Apache Kafka is a distributed publish-subscribe messaging system and a robust queue that can handle a high volume of data and enables you to pass messages from one end-point to 
another. Kafka messages are persisted on the disk and replicated within the cluster to prevent data loss. Kafka is built on top of the ZooKeeper synchronization service. 
It integrates very well with Apache Storm and Spark for real-time streaming data analysis.

## Why Kafka?
- Reliability : Kafka is distributed, partitioned, replicated and fault tolerance.
- Scalability : Kafka messaging system scales easily without down time..
- Durability  : Kafka uses Distributed commit log which means messages persists on disk as fast as possible, hence it is durable..
- Performance : Kafka has high throughput for both publishing and subscribing messages. It maintains stable performance even many TB of messages are stored.

## Qucick terms...
### Topics
A stream of messages belonging to a particular category is called a topic. Data is stored in topics.Topics are split into partitions. For each topic, 
Kafka keeps a mini-mum of one partition. Each such partition contains messages in an immutable ordered sequence. A partition is implemented as a set of segment files of 
equal sizes.

### Producers
Producers are the publisher of messages to one or more Kafka topics. Producers send data to Kafka brokers. Every time a producer pub-lishes a message to a broker, 
the broker simply appends the message to the last segment file. Actually, the message will be appended to a partition. Producer can also send messages to a partition of 
their choice.

### Consumers
Consumers read data from brokers. Consumers subscribes to one or more topics and consume published messages by pulling data from the brokers.


# simple-app-demo

To get in touch with the implementation, lets create a very simple app that store reviews for a specific vendor using nodejs. 
Here we use kafka to get data from server and write it into the database

Note: Before heading on create a project on google cloud and have cloud sdk setup for that project. ALso make sure you have docker and kubectl.

Follow the steps sequentially:
- [kafka-database-setup](./kafka-postgres-setup)
- [producer-setup](./producer)
- [consumer-setup](./consumer)

### Test
- After done, head to the loadbalancer ip of producer-service to demo the app! 

