# ToDo List

Тестовый проект на стажировку, создание to-do листа, с акторизацие, фильтрацей задачи, возможностью открыть отдельно каждую задачу для просмотра полной информации о ней. Все задачи приватны для каждого из двух тестовых клиентов. Доступ к спискам задач как и к отдельной задачи без авторазции заблокирован. Запрос с сервера происходит при открытии страниц списка задач и страницы отдельной задачи, а так же повторяется каждые 5 минут. Имитация back-end сделана с помощью сторонней библиотеки.

## Установка

`npm i`

## Используемые материалы

Проект сделан на React через create-react-app c использованием react-router-dom для навигации
Верстка на готовой библиотеке компонентов - @mui/material, @mui/x-data-grid
Бэк-энд сервер с возможность авторизации - json-server, json-server-auth
Работа с авторизацией внутри приложения - react-auth-kit
Запросы реализованы с помощью - axios

### Запуск и проверка проекта

Для проверки проекта нужно после его установки создать два терминала:

1. Для запуска json-server с авторизацией командой `json-server db.json -m ./node_modules/json-server-auth`
2. Для pапуска самого приложения, стандартный `npm run start`

Терминалы нужно запустить именно в таком порядке, так как сейчас логика для запросов идет на 3000 порт, от json-server, само приложение можно запустить на любом порте.
Логика всех запросов находится в директории `src/api/requests`

Для тестирования функционала созданы два пользователя:
login: test1@mail.com, password: test1 и login: test2@mail.com, password: test2 со своими отдельными задачами
