// Подключаем плагины
import fs from 'fs';
import fonter from 'gulp-fonter-2';
import ttf2woff2 from 'gulp-ttf2woff2';

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
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;

    // Проверяем, существуют ли файл шрифтов fonts.scss
    fs.readdir( app.path.build.fonts, function( err, fontsFiles ) {

        /*
            Это условие необходимо для однократной записи шрифтов в файл fonts.scss.
            Теперь есть возможность делать изменения в fonts.scss в ручную без
            автоматического обновления файла.
            
            Функция запишет в файл fonts.scss загруженные шрифты в папку src/fonts,
            ОДНОКРАТНО и больше не будет предпринимать действий по обработке шрифтов.

            Однако, если всё же нужно по какой то причине обновить шрифт(ы),
            необходимо удалить fonts.scss чтобы начать обработку шрифтов заного.
        */

        if( fontsFiles ) {

            // Проверяем, существуют ли файлы стилей в папке src/scss
            if( !fs.existsSync( fontsFile ) ) {

                // Если файла нет, создаём его используя цикл
                fs.writeFile( fontsFile, '', cb );

                // Проверяем уникальность файла
                let newFileOnly;

                // Создаём цикл
                for (var i = 0; i < fontsFiles.length; i++ ) {

                    // Записываем шрифты в файл стилей fonts.scss
                    let fontFileName = fontsFiles[i].split( '.' )[0];

                    // Если шрифт новый, то запускаем запись в scss файл
                    if( newFileOnly !== fontFileName ) {

                        // Определяем названия шрифта
                        let fontName = fontFileName.split( '-' )[0] ? fontFileName.split( '-' )[0] : fontFileName;

                        // Определяем толщину шрифта
                        let fontWeight = fontFileName.split( '-' )[1] ? fontFileName.split( '-' )[1] : fontFileName;

                        // Блок условий для толщины шрифта
                        if( fontWeight.toLowerCase() === 'thin' ) {
                            fontWeight = 100;
                        } else if( fontWeight.toLowerCase() === 'extralight' ) {
                            fontWeight = 200;
                        } else if( fontWeight.toLowerCase() === 'light' ) {
                            fontWeight = 300;
                        } else if( fontWeight.toLowerCase() === 'medium' ) {
                            fontWeight = 500;
                        } else if( fontWeight.toLowerCase() === 'semibold' ) {
                            fontWeight = 600;
                        } else if( fontWeight.toLowerCase() === 'bold' ) {
                            fontWeight = 700;
                        } else if( fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy' ) {
                            fontWeight = 800;
                        } else if( fontWeight.toLowerCase() === 'black' ) {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }

                        /*
                            Это для наглядности, чтобы понимать, как будет всё выглядеть.
                            На практике всё должно быть в одну строку

                        fs.appendFile(

                            fontFile,
                            `@font-face {
                                font-family: ${fontName};
                                font-display: swap;
                                src: url( "../fonts/${fontFileName}.woff2" ) format( "woff2" ), url( "../fonts/${fontFileName}.woff" ) format( "woff" );
                                font-weight: ${fontWeight};
                                font-style: normal;
                            }\r\n`, cb
                        );
                        */

                        fs.appendFile( fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url( "../fonts/${fontFileName}.woff2" ) format( "woff2" ), url( "../fonts/${fontFileName}.woff" ) format( "woff" );\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb );

                        newFileOnly = fontFileName;
                    }
                }
            }

        /*
            Если файл fonts.scss есть, выводим сообщение в консоль браузера.
            После нужно как от изящней придумать способ вывести эту информацию
        */
        } else {

            console.log( 'Файл scss/fonts.scss уже существует. Для обновления файла его нужно удалить!' )
        }
    } )

    // 
    return app.gulp.src( `${app.path.srcFolder}` );
    function cb() {}
}