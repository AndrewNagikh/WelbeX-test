# WelbeX-test  
Для запуск понадобится:  
    -- установить все зависимости - npm i  
    -- Настроить .env файл (см  env exapmle):  
            - PORT для выбора порта на котором будет запускаться сервер  
            - DATABASE_URL для настройки БД (postgresUser - ваш пользователь postgres, postgresUserPass - пароль пользователя,       databaseName - название БД произвольное)  
    -- Создать БД - npx sequelize db:create  
    -- Создать миграции - npx sequelize db:migrate  
    -- Заполнить таблицу - npx sequelize db:seed:all  
    -- Скрипт запуска клиента npm start; Скрипт запуска сервера для разработки npm run dev (подключается nodemon и morgan) или npm start 
