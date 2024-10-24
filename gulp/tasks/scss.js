// Подключаю плагины
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import webpCss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import cssShortner from 'gulp-shorthand-candy';
import cleanCss from 'gulp-clean-css';
import rename from 'gulp-rename';

const sass = gulpSass( dartSass );

export const scss = () => {

    // Получаем путь до исходников
    return app.gulp.src( app.path.src.scss, {

        // Если нет флага --prod для gulp, от включим карту
        sourcemap: app.isDev
    } )

    // Добавляем уведомление об ошибке
    .pipe(
        app.plugins.plumber(
            app.plugins.notify.onError( {
                title: 'SCSS',
                message: 'Error: <%= error.message %>'
            } )
        )
    )

    // Используем мощный инструмент SASS
    .pipe( sass() )

    // Меняю пути в итоговом файле, вместо @img от плагина Path Autocomplete, на img/
    .pipe( app.plugins.replace( /@img\//g, '../img/' ) )

    // Выполняет функцию, если указан флаг --prod для gulp
    .pipe(
        app.plugins.if(
            app.isProd,

            /*
                Сокращает некоторые свойства для селекторов css.
                https://github.com/frankmarineau/shrthnd.js
            */
            
            cssShortner()
        )
    )

    // Выполняет функцию, если указан флаг --prod для gulp
    .pipe(
        app.plugins.if(
            app.isProd,

            // Группируем @media в итоговом CSS файле
            groupCssMediaQueries()
        )
    )

    // Выполняет функцию, если указан флаг --prod для gulp
    .pipe(
        app.plugins.if(
            app.isProd,

            /*
                Добавляем класс webp и no-webp
                -webkit-apperance: none - всё ещё не достаточно популярен, чтобы его
                использовать повсеместно. Хотя это бы упростило задачу в разы, и сайт
                нормально работал на старых устройствах без JS. Но это излишне, поэтому
                такое решение.

                Для работы этого плагина нужен webp-converter@2.2.3
            */

            webpCss( {
                webpClass: '.webp',
                noWebpClass: '.no-webp',
            } )
        )
    )

    // Выполняет функцию, если указан флаг --prod для gulp
    .pipe(
        app.plugins.if(
            app.isProd,

            // Добавляет префиксы для работы в старых браузерах
            autoprefixer( {

                // Не уверен что в версии 8.0.0 нужно указывать grid
                grid: true,
                overrideBrowserslist: [ 'last 3 version' ],
                cascade: true
            } )
        )
    )

    // Выполняет функцию, если указан флаг --prod для gulp
    .pipe(
        app.plugins.if(
            app.isProd,

            // Сжатие css
            cleanCss()
        )
    )

    // Меняем название style.css на style.min.css
    .pipe( rename( { extname: '.min.css' } ) )

    // Собираем в CSS
    .pipe( app.gulp.dest( app.path.build.css ) )

    // Обновляем изменения в браузере на лету
    .pipe( app.plugins.browsersync.stream() )
}