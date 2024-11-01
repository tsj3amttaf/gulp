// Подключаем плагины
//import fs from 'fs';
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

    //let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;

    // получаем массив файлов
    //fs.readdir( app.path.build.fonts, ( err, fontsFile ) => {

        // проверяем, существует ли файл fonts.scss
        //if( fs.existsSync( fontsFile ) == true ) {

            // Если файла нет, создаём его используя цикл
            //fs.writeFile( fontsFile, '', cb );

            return app.gulp.src( `${app.path.srcFolder}/fonts/*.{woff,woff2}`, {} )

            .pipe(
                fontface( {
                    filepath: `${app.path.srcFolder}/scss`,
                    filename: 'fonts.scss',
                    //destpath: `${app.path.srcFolder}/scss`
                } )
            )
        //}

        //function cb() {};
    //} )
}