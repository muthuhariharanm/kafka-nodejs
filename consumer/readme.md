# Kafka consumer

Follow the steps to setup the consumer,

- Replace the BrokerIP with the IP of kafka-service in config.js file

- Build the docker image
```
docker build -t gcr.io/[PROJECT_ID]/consumer .
```

- Push the docker image to gcr
```
docker push gcr.io/[PROJECT_ID]/consumer
```

- Create deployment for the producer
```
kubectl create deployment producer --image=gcr.io/kafkatry/consumer
```

- Create service for the created deployment
```
kubectl expose deployment consumer --type LoadBalancer  --port 8080 --target-port 8080
```
