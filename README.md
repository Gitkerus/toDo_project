# ToDo List

Тестовый проект, создание to-do листа, с акторизацие, фильтрацей задачи, возможностью открыть отдельно каждую задачу для просмотра полной информации о ней. Все задачи приватны для каждого из двух тестовых клиентов. Доступ к спискам задач как и к отдельной задачи без авторазции заблокирован. Запрос с сервера происходит при открытии страниц списка задач и страницы отдельной задачи, а так же повторяется каждые 5 минут. Имитация back-end сделана с помощью сторонней библиотеки.

## Установка

`npm i`

## Используемые материалы

Проект сделан на React через `create-react-app` c использованием `react-router-dom` для навигации

Верстка на готовой библиотеке компонентов - `@mui/material @emotion/react @emotion/styled`

Бэк-энд сервер с возможность авторизации - `json-server`, `json-server-auth`

Работа с авторизацией внутри приложения - `react-auth-kit`

Запросы реализованы с помощью - `axios`

### Запуск и проверка проекта

Для проверки проекта нужно после его установки создать два терминала:

1. Для запуска json-server с авторизацией командой `json-server db.json -m ./node_modules/json-server-auth`
2. Для pапуска самого приложения, стандартный `npm run start`

Терминалы нужно запустить именно в таком порядке, так как сейчас логика для запросов прописана в `.env` на 3000 порт, от json-server, само приложение можно запустить на любом порте.
Логика всех запросов находится в директории `src/api/apiRequests` и `src/api/createRequests`

Для тестирования функционала созданы два пользователя:

1. login: `test1@mail.com`, password: `test1`
2. login: `test2@mail.com`, password: `test2`

Для каждого пользователя созданы тестовые задачи

## Пункты для реализации в будущем:

1. Отображение задач в виде Scrum доски по трем статусам.
2. Перемещение задач через drag-&-drop между столбцами с последующим изменением статуса задачи.
3. Возможность добавления/удаления/редактирования всех задачи
4. Коррективка `dependencies`, добработка кода.
