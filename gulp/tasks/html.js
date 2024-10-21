// Подключаю плагин
import fileInclude from 'gulp-file-include';

export const html = () => {

    // Определяем папку с исходниками
    return app.gulp.src( app.path.src.html )

    // Собираю html в один файл из сегментов
    .pipe( fileInclude() )

    // Копируем в папку со сборкой
    .pipe( app.gulp.dest( app.path.build.html ) )
}