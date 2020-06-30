# kafka-postgres-setup

In this section lets look at how to set kafka and postgres instances up and running on kubernetes using google cloud.

Note: Ensure that you have google cloud account and kubectl configured to use gcp project.

# Postgres

- You will find the configuration yaml files in this folder
- Run the following 
```
kubectl apply -f db.yaml
```
- Now the postgres instance is up and running on kubernetes cluster

# Kafka-setup

- To setup kafka, first create a zookeeper instance by 
```
kubectl apply -f zookeper.yaml
```
- Now create the service for kafka instance
```
kubectl apply -f kafkasvc.yaml
```
- After that run the following command and note down the Loadbalancer IP
```
kubectl describe service kafka-service
```
- Next in kafkadep.yaml, replace the value under KAFKA_ADVERTISED_HOST_NAME with the ip you got as output from above and save the file.
```
kubectl apply -f kafkadep.yaml
```

Now the kafka and Postgres instances are running on kubernetes
