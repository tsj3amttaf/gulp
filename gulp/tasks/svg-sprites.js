import svgSprite from 'gulp-svg-sprite';

export const svgIcons = () => {

    // Получаем путь до исходников
    return app.gulp.src( app.path.src.svgIco, {} )

    // Добавляем уведомление об ошибке
    .pipe(
        app.plugins.plumber(
            app.plugins.notify.onError( {
                title: 'SVG',
                message: 'Error: <%= error.message %>'
            } )
        )
    )

    //
    .pipe(
        svgSprite( {
            mode: {
                stack: {
                    sprite: `../icons/icons.svg`,
                    example: true
                }
            }
        } )
    )

    // Собираем в папку dest/img
    .pipe( app.gulp.dest( app.path.build.images ) )
}