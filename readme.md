# Sprint Planner
POC project

# Използвани технологии
```
Front-End: html / css / javascript
Back-End: PHP
DB: MySql
```

# Инсталация и настройки

_инструкции XAMPP:_
  - стартиране на Apache 
  - стартиране на MySQL

_настройка на база данни_
- инициализиране на database sprint_planner 
```
create database sprint_planner;
```
- създаване на таблиците на приложението
- посетете този адрес, който ще изпълни подготовката 
  ```
  localhost/sprint-planner/repository/db/DatabaseInit.php
  ```
  - ако авторът на този документ не е забравил да настрои скриптовете, в базата ще има заредени данни 
  - ако все пак е забравил, изпълнете следните стъпки 
  - копирайте съдържанието на файла  
    ```
    V2__prepopulate_users_and_sprint
    (sprint-planner/repository/db/db-scripts)
    ```
  - отворете php my admit страницата  http://localhost/phpmyadmin/
  - отворете новосъздадената база sprint_planner и изпълнете съдържанието от скрипта в SQL прозорец

Време е за планиране на спринт :)

посетете http://localhost/sprint-planner/ 

# Кратко ръководство на потребителя
Документация и повече информация може да намерите в документа _**w17prj_SI_REQ_final**_