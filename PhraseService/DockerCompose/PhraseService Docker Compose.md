# Build:
## из готовых образов:
linux:
```bash
docker compose \
	-f ./PhraseService/DockerCompose/docker-compose.yml \
	build
```
windows:
```bash
docker compose `
	-f ./PhraseService/DockerCompose/docker-compose.yml `
	build
```
## с использованием volumes:
linux:
```bash
docker compose \
	-f ./PhraseService/DockerCompose/docker-compose-volumes.yml \
	build
```
windows:
```bash
docker compose `
	-f ./PhraseService/DockerCompose/docker-compose-volumes.yml `
	build
```

! По умолчанию Compose устанавливает единую сеть для контейнеров.

# Docker Compose Up:
## из готовых образов:
linux:
```bash
docker compose \
	-f ./PhraseService/DockerCompose/docker-compose.yml \
	up -d
```
windows:
```bash
docker compose `
	-f ./PhraseService/DockerCompose/docker-compose.yml `
	up -d
```
## с использованием volumes:
linux:
```bash
docker compose \
	-f ./PhraseService/DockerCompose/docker-compose-volumes.yml \
	up -d
```
windows:
```bash
docker compose `
	-f ./PhraseService/DockerCompose/docker-compose-volumes.yml `
	up -d
```
# Проверка работы Docker Compose:

```bash
docker ps
```

```bash
curl http://127.0.0.1:8080/
```

# Docker Compose Down:
## из готовых образов:
linux:
```bash
docker compose \
	-f ./PhraseService/DockerCompose/docker-compose.yml \
	down
```
windows:
```bash
docker compose `
	-f ./PhraseService/DockerCompose/docker-compose.yml `
	down
```
## с использованием volumes:
linux:
```bash
docker compose \
	-f ./PhraseService/DockerCompose/docker-compose-volumes.yml \
	down
```
windows:
```bash
docker compose `
	-f ./PhraseService/DockerCompose/docker-compose-volumes.yml `
	down
```
