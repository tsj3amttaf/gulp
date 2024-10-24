// Получаем имя папки проекта ввиде названия директории (в данном случае папка со сборкой будет называться "gulp")
import * as nodePath from 'path';
const rootFolder = nodePath.basename( nodePath.resolve() );

// Получаем имя папки "dist" для готовой сборки
const buildFolder = './dist';

// Получаем имя папки с исходными файлами
const srcFolder   = './src';

// Объявление путей (тут главное кавычки правильные поставить, чтобы маски заработали ``)
export const path = {

    // Собрать в папке "dest"
    build: {
        html:   `${buildFolder}/`,
        images: `${buildFolder}/img/`,
        css:    `${buildFolder}/css/`,
        js:     `${buildFolder}/js/`,
        fonts:  `${buildFolder}/fonts/`,
        //files:  `${buildFolder}/files/`,
    },

    // Исходники
    src: {
        html:   `${srcFolder}/*.html`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg:    `${srcFolder}/img/**/*.svg`,
        scss:   `${srcFolder}/scss/style.scss`,
        js:     `${srcFolder}/js/scripts.js`,
        svgIco: `${srcFolder}/icons/*.svg`,
        //files:  `${srcFolder}/files/**/*.*`,
    },

    /*
        Обновлять в браузере на лету.

        Нужно запомнить на будущее и не тратить 2 часа в пустую пытаясь настроить
        плагины сжатия... {jpg,jpeg,png,gif,webp} вот тут не должно быть пробелов
        между расширениями... бля
    */

    watch: {
        html:   `${srcFolder}/**/*.html`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        scss:   `${srcFolder}/scss/**/*.scss`,
        js:     `${srcFolder}/js/**/*.js`,
        //svgIco: `${srcFolder}/icons/**/*.svg`,
        //files: `${srcFolder}/files/**/*.*`,
    },

    clean:       buildFolder,
    buildFolder: buildFolder,
    srcFolder:   srcFolder,
    rootFolder:  rootFolder,
}