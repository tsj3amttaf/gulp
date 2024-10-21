// Подключаю плагины
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

const sass = gulpSass( dartSass );

export const scss = () => {

    // Получаем путь до исходников
    return app.gulp.src( app.path.build.scss, { sourcemap: true } )

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
    .pipe( app.plugins.replace( /@img\//g, 'img/' ) )

    // Используем мощный инструмент SASS
    .pipe( sass() )

    // Меняем название style.css на style.min.css
    .pipe( rename( { extname: '.min.css' } ) )

    // Собираем в CSS
    .pipe( app.gulp.dest( app.path.build.css ) )

    // Обновляем изменения в браузере на лету
    .pipe( app.plugins.browsersync.stream() )
}