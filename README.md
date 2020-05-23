# Instrucciones para el desarrollo

Iniciar servicio de Ghost
```
docker-compose up -d
```

Instalar dependencias
```
docker-compose run node npm install
```

Gulp
```
docker-compose exec node node_modules/.bin/gulp
```
