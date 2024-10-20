
// Подключаю (импортирую) основной модуль
import gulp from 'gulp';

// Подключаю пути, не путю
import { path } from './builder/config/path.js';

/*
    Передаём значения в глобальную переменную, для того, чтобы все эти задачи
    выполнялись с помощью основной команды на запуск в консоле: GULP
*/

global.app = {
    gulp: gulp,
    path: path
}

//
import { copy } from './builder/tasks/copy.js';

// Выполняем копирование файлов
gulp.task( 'default', copy );