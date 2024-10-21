// Импортирую основной модуль
import gulp from 'gulp';

// Импорт путей
import { path } from './gulp/config/path.js';

// Импорт плагинов
import { plugins } from './gulp/config/plugins.js';

global.app = {
    path:    path,
    gulp:    gulp,
    plugins: plugins
}

// Ипорт задач
import { reset } from './gulp/tasks/reset.js';
import { copy } from './gulp/tasks/copy.js';
import { html } from './gulp/tasks/html.js';

// Наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch( path.watch.files, copy );
    gulp.watch( path.watch.html, html );
}

// В основном нужна для watcher'а
const mainTasks = gulp.parallel( copy, html );

// Построение сценариев выполнения задач
const dev = gulp.series( reset, mainTasks, watcher );

// Выполнение сценария по умолчанию
gulp.task( 'default', dev );