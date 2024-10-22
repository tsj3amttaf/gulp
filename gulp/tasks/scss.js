// Подключаю плагины
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import webpCss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass( dartSass );

export const scss = () => {

    // Получаем путь до исходников
    return app.gulp.src( app.path.src.scss, { sourcemap: true } )

    // Добавляем уведомление об ошибке
    .pipe(
        app.plugins.plumber(
            app.plugins.notify.onError( {
                title: 'SCSS',
                message: 'Error: <%= error.message %>'
            } )
        )
    )

    // Меняю пути в итоговом файле, вместо @img от плагина Path Autocomplete, на img/
    .pipe( app.plugins.replace( /@img\//g, '../img/' ) )

    // Используем мощный инструмент SASS
    .pipe( sass() )

    // Группируем @media в итоговом CSS файле
    .pipe( groupCssMediaQueries() )

    /*
        Добавляем класс webp и no-webp
        -webkit-apperance: none - всё ещё не достаточно популярен, чтобы его
        использовать повсеместно. Хотя это бы упростило задачу в разы, и сайт
        нормально работал на старых устройствах без JS. Но это излишне, поэтому
        такое решение.

        Для работы этого плагина нужен webp-converter@2.2.3
    */

    .pipe( webpCss( {
        webpClass: '.webp',
        noWebpClass: '.no-webp',
    } ) )

    // Не уверен что в версии 8.0.0 нужно указывать grid
    .pipe( autoprefixer( {
        grid: true,
        overrideBrowserslist: [ 'last 3 version' ],
        cascade: true
    } ) )

    // Сжатие
    //.pipe( cleanCss() )

    // Меняем название style.css на style.min.css
    .pipe( rename( { extname: '.min.css' } ) )

    // Собираем в CSS
    .pipe( app.gulp.dest( app.path.build.css ) )

    // Обновляем изменения в браузере на лету
    .pipe( app.plugins.browsersync.stream() )
}