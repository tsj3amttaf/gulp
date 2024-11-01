// Импортирую основной модуль
import gulp from 'gulp';

// Импорт путей
import { path } from './gulp/config/path.js';

// Импорт плагинов
import { plugins } from './gulp/config/plugins.js';

global.app = {

    /*
        Добавляет флаг к gulp, для сборки под продакшн.
        Добаляет в сборку webp (html, css, images), сжатие изображений,
        группировка @media в css, префиксы для браузеров в css, 
    */

    isProd:  process.argv.includes( 'prod' ),

    // Можно в функциях использовать !isProd, но так проще читать код
    isDev:   !process.argv.includes( 'prod' ),

    // Если нужно посмотреть на готовый результ под продакш с помощью сервера
    watch:   process.argv[3] == '--server',

    // Упаковываем в ZIP
    zip:     process.argv[3] == '--zip',

    path:    path,
    gulp:    gulp,
    plugins: plugins,
}

// Ипорт задач
import { reset } from './gulp/tasks/reset.js';
import { otfToTtf, ttfToWoff, fontStyle } from './gulp/tasks/fonts.js';
//import { copy } from './gulp/tasks/copy.js';
import { html } from './gulp/tasks/html.js';
import { images } from './gulp/tasks/images.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { svg } from './gulp/tasks/svg-sprites.js';
import { server } from './gulp/tasks/server.js';
import { zip } from './gulp/tasks/zip.js';

// Наблюдатель за изменениями в файлах
function watcher() {
    //gulp.watch( path.watch.files, copy );
    gulp.watch( path.watch.html, html );
    gulp.watch( path.watch.images, images );
    gulp.watch( path.watch.scss, scss );
    gulp.watch( path.watch.js, js );
    gulp.watch( path.watch.svgIco, svg );
}

/*
    Экспорт нужен для отдельного вызова сборщика спрайтов.
    Эта функция не будет включена в watcher и основные задачи gulp.
*/

export { svg };

export { fontStyle };

// Последовательная обработка шрифтов
export const fonts = gulp.series( otfToTtf, ttfToWoff, fontStyle );

// Основные задачи
const mainTasks = gulp.series( fonts, gulp.parallel( /*copy,*/ html, images, scss, js ), svg );

// Запуск сервера и наблюдателя
const serverWatcher = gulp.parallel( watcher, server );

// Построение сценариев выполнения задач
const dev = gulp.series( reset, mainTasks, serverWatcher );

// Построение задач для продакшена
const production = gulp.series( reset, mainTasks );

// Выполнение сценария по умолчанию (gulp)
gulp.task( 'default', dev );

// Выполнение сценария для продакшена
gulp.task( 'prod', production );

// Выполнение сценария для продакшена c наблюдателем и сервером
if ( app.watch ) {
    gulp.task( 'prod', gulp.series( production, serverWatcher ) );
}

// Упаковка в ZIP
//export { zip };

if ( app.zip ) {
    gulp.task( 'prod', gulp.series( production, zip ) );
}