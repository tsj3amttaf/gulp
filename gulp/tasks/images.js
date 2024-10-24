// Импортирую плагины
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import mozjpeg from 'imagemin-mozjpeg';
import gifsicle from 'imagemin-gifsicle';
import svgo from 'imagemin-svgo';

/*
    Выполз нюанс.
    Не стоит называть файлы своим расширением, например: jpg.jpg
    Всё ломается
*/

export const images = () => {

    // Получаем путь до исходников
    return app.gulp.src( app.path.src.images )

    // Добавляем уведомление об ошибке
    .pipe(
        app.plugins.plumber(
            app.plugins.notify.onError( {
                title: 'Images',
                message: 'Error: <%= error.message %>'
            } )
        )
    )

    // Обрабатываем только те изображени, которых нет в папке dist
    .pipe( app.plugins.newer( app.path.build.images ) )

    // Выполняет функцию, если указан флаг --prod для gulp
    .pipe(
        app.plugins.if(
            app.isProd,

            /*
                Конвертируем png, jpeg, tiff в webp.

                Переносим webp изображения в папку dist и проверяем,
                нет ли уже обработанных изображений в папке с результатом
            */

            webp()
        )
    )

    // Выполняет функцию, если указан флаг --prod для gulp
    .pipe(
        app.plugins.if(
            app.isProd,

            // Переносим конвертированые webp в dist
            app.gulp.dest( app.path.build.images )
        )
    )

    // Выполняет функцию, если указан флаг --prod для gulp
    .pipe(
        app.plugins.if(
            app.isProd,

            // Определяем путь для исходных изображений
            app.gulp.src( app.path.src.images )
        )
    )

    // Выполняет функцию, если указан флаг --prod для gulp
    .pipe(
        app.plugins.if(
            app.isProd,

            // Предотвращает сборку уже обработанных изображений
            app.plugins.newer( app.path.build.images )
        )
    )

    // Выполняет функцию, если указан флаг --prod для gulp
    .pipe(
        app.plugins.if(
            app.isProd,

            // Сжимаем картинки
            imagemin( [
                
                pngquant( {
                    quality: [ 0.6, 0.8 ]
                } ),

                mozjpeg( {
                    quality: 75,
                    progressive: true
                } ),

                gifsicle( {
                    interlaced: true,
                } ),

                svgo( {
                    plugins: [
                        { removeViewBox: false },
                        //{ cleanupIDs: false }
                    ]
                } )
            ] )
        )
    )

    // Перемещаем в папку с результатом, но это ещё не всё...
    .pipe( app.gulp.dest( app.path.build.images ) )

    /*
        Получаем путь к svg исходникам
        и копируем в папку с результатом
    */

    .pipe( app.gulp.src( app.path.src.svg ) )
    .pipe( app.gulp.dest( app.path.build.images ) )

    // Обновляем изменения в браузере на лету
    .pipe( app.plugins.browsersync.stream() )
}