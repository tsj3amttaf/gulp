export const html = () => {

    // Определяем папку с исходниками
    return app.gulp.src( app.path.src.html )

    // Копируем в папку со сборкой
    .pipe( app.gulp.dest( app.path.build.html ) )
}