// Подключаю плагины
import fileInclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';

export const html = () => {

    // Определяем папку с исходниками
    return app.gulp.src( app.path.src.html )

    // Добавляем уведомление об ошибке
    .pipe(

        app.plugins.plumber(

            app.plugins.notify.onError( {
                title: 'HTML',
                message: 'Error: <%= error.message %>'
            } )
            
        )
    )

    // Собираю html в один файл из сегментов
    .pipe( fileInclude() )

    // Меняю пути в итоговом файле, вместо @img от плагина Path Autocomplete, на img/
    .pipe( app.plugins.replace( /@img\//g, 'img/' ) )

    // Обертка <picture> для webp и оригинального формата
    .pipe( webpHtmlNosvg() )

    /*
        Этот плагин нужен исключительно в разработке.
        Указывает версию для CSS и JS файлов, тем самым
        предотвращая кэширование на стороне клиента.
        Теперь не придётся просить чистить кэш у заказчика
    */

    .pipe(

        // Полная документация на сайте: https://www.npmjs.com/package/gulp-version-number
        versionNumber( {

            'value': '%DT%', // Дата и время
            'append': {
                'key': '_v',
                'cover': 0,
                'to': [
                    'css',
                    'js'
                ]
            },

            'output': {
                'file': 'gulp/version.json' // Пока не понятно зачем хранить дату и время в файле
            }

        } )
    )

    // Копируем в папку со сборкой
    .pipe( app.gulp.dest( app.path.build.html ) )
}