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
import { otfToTtf, ttfToWoff, fontStyle } from './gulp/tasks/fonts.js';
//import { copy } from './gulp/tasks/copy.js';
import { html } from './gulp/tasks/html.js';
import { images } from './gulp/tasks/images.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { server } from './gulp/tasks/server.js';

// Наблюдатель за изменениями в файлах
function watcher() {
    //gulp.watch( path.watch.files, copy );
    gulp.watch( path.watch.html, html );
    gulp.watch( path.watch.images, images );
    gulp.watch( path.watch.scss, scss );
    gulp.watch( path.watch.js, js );
}

// Последовательная обработка шрифтов
const fonts = gulp.series( otfToTtf, ttfToWoff, fontStyle );

// Основные задачи
const mainTasks = gulp.series( fonts, gulp.parallel( /*copy,*/ html, images, scss, js ) );

// Построение сценариев выполнения задач
const dev = gulp.series( reset, mainTasks, gulp.parallel( watcher, server ) );

// Выполнение сценария по умолчанию
gulp.task( 'default', dev );