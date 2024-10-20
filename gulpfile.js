// Импортирую основной модуль
import gulp from 'gulp';

// Импорт путей
import { path } from './gulp/config/path.js';

global.app = {
    path: path,
    gulp: gulp
}

// 
import { copy } from './gulp/tasks/copy.js';

// Выполнение сценария по умолчанию
gulp.task( 'default', copy );