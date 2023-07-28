# Подготовка OpenShift Local
Создать CodeReady Containers:
```bash
crc setup
```
Проверка версии CRC:
```bash
crc version
```
Запуск CRC:
```bash
crc start --pull-secret-file "E:\OpenShift Install\pull-secret.txt"
```
Просмотр учетных данных для пользователей:
```bash
crc console --credentials
```
Запуск Web - консоли:
```bash
crc console
```
Остановить CRC:
```bash
crc stop
```
Удалить CRC:
```bash
crc delete
```


# Создание проекта
Создать новый проект в OpenShift
```bash
oc new-project architectural-sketches
```
Просмотр созданных проектов
```bash
oc get projects
```
Удаление проекта:
```bash
oc delete project architectural-sketches
```
# ConfigMap

## Создание командой от Артура Крюкова
[Проблема с кодировкой в PowerShell 7 и UTF8](https://pwsh.ru/%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BF%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC-%D1%81-%D0%BA%D0%BE%D0%B4%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%BE%D0%B9-%D0%B2%D1%8B%D0%B2%D0%BE%D0%B4%D0%B0-%D0%B2-po/)
Создание yaml файла для создания configMap для HTML из папки:
Явное указание кодировки для получаемых данных:
```bash
`[Console]::OutputEncoding = [System.Text.Encoding]::GetEncoding(``"UTF-8"``)`
```
! Только удалить после создания в yaml строку "creationTimestamp: null"
```bash
oc create configmap frontend-config-html `
	--from-file=./PhraseService/OpenShift/frontend-config/html `
	--dry-run=client -o yaml `
| Out-File -Encoding UTF8 ./PhraseService/OpenShift/frontend-config/frontend-configmap-html.yaml
```
Создание yaml файла для создания configMap для NGINX из папки:
! Только удалить после создания в yaml строку "creationTimestamp: null"
```bash
oc create configmap frontend-config-nginx `
	--from-file=./PhraseService/OpenShift/frontend-config/nginx `
	--dry-run=client -o yaml `
| Out-File -Encoding UTF8 ./PhraseService/OpenShift/frontend-config/frontend-configmap-nginx.yaml
```
Применение ConfigMap:
```bash
oc apply `
	-f ./PhraseService/OpenShift/frontend-config/frontend-configmap-html.yaml
```

```bash
oc apply `
	-f ./PhraseService/OpenShift/frontend-config/frontend-configmap-nginx.yaml
```
Просмотр созданных ConfigMap:
```bash
oc get configmap
```
Удаление ConfigMap:
```bash
oc delete configmap frontend-config-html
```

```bash
oc delete configmap frontend-config-nginx
```

## Создание командой от Архитектурные скетчи
Создание configMap с html
```bash
oc create configmap nginx-html --from-file=$(pwd)\nginx-cm\index.html
```
Создание configMap с конфигурацией nginx:
```bash
oc create configmap nginx-conf --from-file=$(pwd)\nginx-cm\nginx.conf
```

# Backend

## DeploymentConfig
Создание DeploymentConfig:
```bash
oc apply `
	-f ./PhraseService/OpenShift/Quote-01-DeploymentConfig-Backend.yaml
```
Удаление DeploymentConfig:
```bash
oc delete `
	-f ./PhraseService/OpenShift/Quote-01-DeploymentConfig-Backend.yaml
```
Просмотр подов:
```bash
oc get pods
```
Проверка работоспособности пода:
```bash
oc `
	exec quote-backend-deployment-1-v4hm8 `
	-- curl -s 127.0.0.1:3000
```
Просмотр логов пода:
```bash
oc logs quote-backend-deployment-1-v4hm8
```
Или, тоже просмотр логов:
```bash
oc logs -f <pod_name> -c <container_name>

oc logs -f quote-backend-deployment-1-v4hm8 -c quote-backend-container
```

## HPA
Создание HPA:
```bash
oc apply -f ./PhraseService/OpenShift/Quote-02-HPA-Backend.yaml
```
Удаление HPA:
```bash
oc delete -f ./PhraseService/OpenShift/Quote-02-HPA-Backend.yaml
```

## Service
Создание  сервиса:
```bash
oc apply `
	-f ./PhraseService/OpenShift/Quote-03-Service-Backend.yaml
```
Удаление сервиса:
```bash
oc delete `
	-f ./PhraseService/OpenShift/Quote-03-Service-Backend.yaml
```
Просмотр созданных сервисов:
```bash
oc get services
```
Вывод:
```
NAME                   TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)    AGE
phraseservice-server   ClusterIP   10.217.4.65   <none>        3000/TCP   9s
```

# Frontend

## DeploymentConfig
Создание DeploymentConfig:
```bash
oc apply `
	-f ./PhraseService/OpenShift/Quote-04-DeploymentConfig-Frontend.yaml
```
Удаление DeploymentConfig:
```bash
oc delete `
	-f ./PhraseService/OpenShift/Quote-04-DeploymentConfig-Frontend.yaml
```
Просмотр подов:
```bash
oc get pods
```
Проверка работоспособности пода:
```bash
oc `
	exec quote-frontend-deployment-1-dpwf9 `
	-- curl -s 127.0.0.1:8080
```

## HPA
Создание HPA:
```bash
oc apply -f ./PhraseService/OpenShift/Quote-05-HPA-Frontend.yaml
```
Удаление HPA:
```bash
oc delete -f ./PhraseService/OpenShift/Quote-05-HPA-Frontend.yaml
```

## Service
Создание Service:
```bash
oc apply `
	-f ./PhraseService/OpenShift/Quote-06-Service-Frontend.yaml
```
Удаление Service:
```bash
oc delete `
	-f ./PhraseService/OpenShift/Quote-06-Service-Frontend.yaml
```
Просмотр созданных сервисов:
```
NAME                     TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
phraseservice-server     ClusterIP   10.217.4.154   <none>        3000/TCP   159m
quote-frontend-service   ClusterIP   10.217.5.181   <none>        80/TCP     28s
```
## Route
Создание Route
```bash
oc apply `
	-f ./PhraseService/OpenShift/Quote-07-Ingress.yaml
```
Удаление Route
```bash
oc delete `
	-f ./PhraseService/OpenShift/Quote-07-Ingress.yaml
```
Проверка работы сервиса:
[quote.apps-crc.testing/](http://quote.apps-crc.testing/)
