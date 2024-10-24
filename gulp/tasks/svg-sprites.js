import svgSprite from 'gulp-svg-sprite';

export const svg = () => {

    // Получаем путь до исходников
    return app.gulp.src( `${app.path.src.svgIco}`, {} )

    // Добавляем уведомление об ошибке
    .pipe(
        app.plugins.plumber(
            app.plugins.notify.onError( {
                title: 'SVG',
                message: 'Error: <%= error.message %>'
            } )
        )
    )

    // Объединяем svg иконки/изображения в один файл
    .pipe(
        svgSprite( {
            mode: {
                stack: {
                    sprite: `../icons/icons.svg`,

                    /*
                        Создаёт папку stack с файлом sprite.stack.html внутри (dist/img).
                        Там подробное описание как использовать созданный svg спрайт.
                    */

                    example: true
                }
            }
        } )
    )

    // Собираем в папку dest/img
    .pipe( app.gulp.dest( `${app.path.build.images}` ) )
}