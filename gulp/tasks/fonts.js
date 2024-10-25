// Подключаем плагины
import fs from 'fs';
import fonter from 'gulp-fonter-2';
import ttf2woff2 from 'gulp-ttf2woff2';
import fontface from 'gulp-fontfacegen-mod';

// Экспорт функции конвертации OTF файла
export const otfToTtf = () => {

    // Получаем путь до исходников в папке src/fonts
    return app.gulp.src( `${app.path.srcFolder}/fonts/*.otf`, {} )

    // Добавляем уведомление об ошибке
    .pipe(
        app.plugins.plumber(
            app.plugins.notify.onError( {
                title: 'Fonts',
                message: 'Error: <%= error.message %>'
            } )
        )
    )

    // Конвертируем в из otf в ttf
    .pipe( fonter( { formats: [ 'ttf' ] } ) )

    // Собираем в папку src/fonts
    .pipe( app.gulp.dest( `${app.path.srcFolder}/fonts/` ) )
}

// Экспорт функции конвертации TTF файла
export const ttfToWoff = () => {

    // Получаем путь до исходников
    return app.gulp.src( `${app.path.srcFolder}/fonts/*.ttf`, {} )

    // Добавляем уведомление об ошибке
    .pipe(
        app.plugins.plumber(
            app.plugins.notify.onError( {
                title: 'Fonts',
                message: 'Error: <%= error.message %>'
            } )
        )
    )

    // Конвертируем в woff
    .pipe( fonter( { formats: [ 'woff' ] } ) )

    // Выгружаем в папку с результатом
    .pipe( app.gulp.dest( `${app.path.build.fonts}` ) )

    // Ищем файлы для следующей конвертации из ttf в woff2
    .pipe( app.gulp.src( `${app.path.srcFolder}/fonts/*.ttf` ) )

    // Конвертируем в woff2
    .pipe( ttf2woff2() )

    // Выгружаем в папку с результатом
    .pipe( app.gulp.dest( `${app.path.build.fonts}` ) )
}

/*
    Создаём в src/scss папке файл стилей для подключения
    в основной файл стилей (style.scss).
    Чтобы ручками не писать подключение шрифтов.

    Всё будет хорошо работать, если у шрифта будет подходящее
    имя файла для этой функции, например:
        src/fonts > Roboto-Light.ttf
        src/scss/fonts.scss > @font-face {
            font-family: Roboto;
            font-display: swap;
            src: url( "../fonts/Roboto-Light.woff2" ) format( "woff2" ), url( "../fonts/Roboto-Light.woff" ) format( "woff" );
            font-weight: 300;
            font-style: normal;
        }

    Можно добавить и другие значения в имя файла, для более детальной
    обрабоки, написать для этого дополнительные условия, но этого достаточно
*/

export const fontStyle = () => {

    // Файл стилей подключения шрифтов
    //let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;

    return app.gulp.src( app.path.src.fonts )

    // Проверяем, существует ли файл шрифтов fonts.scss
    //fs.readdir( app.path.build.fonts, function( err, fontsFile ) {

        /*
            Это условие необходимо для однократной записи шрифтов в файл fonts.scss.
            Теперь есть возможность делать изменения в fonts.scss в ручную без
            автоматического обновления файла.
            
            Функция запишет в файл fonts.scss загруженные шрифты в папку src/fonts,
            ОДНОКРАТНО и больше не будет предпринимать действий по обработке шрифтов.

            Однако, если всё же нужно по какой то причине обновить шрифт(ы),
            необходимо удалить fonts.scss чтобы начать обработку шрифтов заного.
        */

        .pipe(
            fontface({
                filepath: '../../src/fonts/',
			    filename: 'fonts.scss',
            })
        )

        .pipe( app.gulp.dest( `${app.path.build.fonts}` ) )
    //} )
}