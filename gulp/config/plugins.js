/* 
    Этот файл (plugins.js) необходим.
    Была идея импортировать browserSync непосредственно в файл
    server.js. НО, так как "слушать" приходится из множества
    файлов (scss, html, js...) то есть смысл его вынести отдельно
    и вызывать от сюда. Код станет проще, меньше и вроде как
    понятнее...

    Для работы этого плагина нужен настроеный Path Autocomplete в VSCode.
    Устанавливает в готовых файлах правильную директорию.
    Например: заменяет @img на img/
    Используется в файле tasks/html.js
*/

import replace from 'gulp-replace';

// Обработка ошибок
import plumber from 'gulp-plumber';

// Сообщения об ошибках (уведомления)
import notify from 'gulp-notify';

/*
    Уф
*/

import browsersync from 'browser-sync';

// Экспортируем плагины
export const plugins = {

    replace:     replace,
    plumber:     plumber,
    notify:      notify,
    browsersync: browsersync,

}