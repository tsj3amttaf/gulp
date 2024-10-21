// Подключаю плагины
import fileInclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';

export const html = () => {

    // Определяем папку с исходниками
    return app.gulp.src( app.path.src.html )

    // Собираю html в один файл из сегментов
    .pipe( fileInclude() )

    // Меняю пути в итоговом файле, вместо @img от плагина Path Autocomplete, на img/
    .pipe( app.plugins.replace( /@img\//g, 'img/' ) )

    // Обертка <picture> для webp и оригинального формата
    .pipe( webpHtmlNosvg() )

    // Копируем в папку со сборкой
    .pipe( app.gulp.dest( app.path.build.html ) )
}