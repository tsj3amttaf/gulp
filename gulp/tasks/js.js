import webpack from 'webpack-stream';

export const js = () => {

    // Получаем путь до исходников
    return app.gulp.src( app.path.src.js, { sourcemap: true } )

    // Добавляем уведомление об ошибке
    .pipe(
        app.plugins.plumber(
            app.plugins.notify.onError( {
                title: 'JavaScript',
                message: 'Error: <%= error.message %>'
            } )
        )
    )

    // Меняем название scripts.js на scripts.min.js
    .pipe( webpack( {
        mode: 'development',
        output: {
            filename: 'scripts.min.js'
        }
    } ) )

    // Собираем в JS
    .pipe( app.gulp.dest( app.path.build.js ) )

    // Обновляем изменения в браузере на лету
    .pipe( app.plugins.browsersync.stream() )
}