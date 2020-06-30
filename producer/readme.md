# Kafka producer

Follow the steps to setup the producer,

- Replace the BrokerIP with the IP of kafka-service in config.js file

- Build the docker image
```
docker build -t gcr.io/[PROJECT_ID]/producer .
```

- Push the docker image to gcr
```
docker push gcr.io/[PROJECT_ID]/producer
```

- Create deployment for the producer
```
kubectl create deployment producer --image=gcr.io/kafkatry/producer
```

- Create service for the created deployment
```
kubectl expose deployment producer --type LoadBalancer  --port 8000 --target-port 8000
```

- Now get the loadbalancer ip of the service by
```
kubectl get svc
```

- View the demo by heading to http://loadbalancer-ip:port 
