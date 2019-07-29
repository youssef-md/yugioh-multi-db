## Multi DB YuGiOh Cards
### Installation of dependencies
1. Install docker

2. Install postgres by running:
```
docker run \
  --name postgres \
  -e POSTGRES_USER=YourUserName \
  -e POSTGRES_PASSWORD=YourPassword \
  -e POSTGRES_DB=yugioh \
  -p 5432:5432 \
  -d \
  postgres
```

3. Install adminer by running:
```
docker run \
  --name adminer \
  -p 8080:8080 \
  --link postgres:postgres \
  -d \
  adminer
```
Then login in localhost:8080, where the ```system``` is PostgreSQL, the ```server``` is postgres the ```user``` is the name you entered in ```-e POSTGRES_USER=YourUserHere```, the password is the value you entered in ```-e POSTGRES_PASSWORD=YourPasswordHere``` and the database is ```yugioh```

4. Install mongoDB by running:
```
docker run \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin \
  -d \
  mongo
```
5. Install mongodb client: 
```
docker run \
  --name mongoclient \
  -p 3000:3000 \
  --link mongodb:mongodb \
  -d \
  mongoclient/mongoclient
```
Then add a connection into localhost:3000 for the created admin
6. Create a user in the mongodb for accessing just the created yugioh database:
```
docker exec -it mongodb \
  mongo --host localhost -u admin -p admin --authenticationDatabase admin \
  --eval "db.getSiblingDB('yugioh').createUser({user: 'YourUserName', pwd: 'YourPassword', roles: [{role: 'readWrite', db: 'yugioh'}]})"
```

7. Install Node JS to use the npm or install yarn

8. In the root folder run:
```
$ npm i
```

9. Change just the strings to your login in /src/dbLogin.js:
```
const POSTGRES_USERNAME = 'YOUR POSTGRES USERNAME'
const POSTGRES_PASSWORD = 'YOUR POSTGRES PASSWORD'
const MONGODB_USERNAME = 'YOUR MONGODB USERNAME'
const MONGODB_PASSWORD = 'YOUR MONGODB PASSWORD'
```

### Basic cheat sheet
* ```$ docker ps``` or ```$ docker container ls```: See all the containers that docker is running.
* ```$ docker stop ContainerName```: Stop a container giving a change to stop it gracefully.
* ```$ docker start ContainerName```: Start a container that already exists.
* ```$ docker restart ContainerName```: Restart a container that already exists.
* ```$ docker pause ContainerName```: Pause a container that already exists.
* ```$ docker unpause ContainerName```: Unpause a container that already exists.
* ```$ docker container ls -a```: List all containers.
* ```$ docker images -a```: List all images.
* ```$ docker rm ContainerName```: Delete a container.
* ```$ docker rmi ImageName ```: Delete an image.

