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
        html:  `${buildFolder}/`,
        css:   `${buildFolder}/css/`,
        js:    `${buildFolder}/js/`,
        files: `${buildFolder}/files/`,
    },

    // Исходники
    src: {
        html:  `${srcFolder}/*.html`,
        scss:  `${srcFolder}/scss/style.scss`,
        js:    `${srcFolder}/js/scripts.js`,
        files: `${srcFolder}/files/**/*.*`,
    },

    watch: {
        html:  `${srcFolder}/**/*.html`,
        scss:  `${srcFolder}/scss/**/*.scss`,
        js:    `${srcFolder}/js/**/*.js`,
        files: `${srcFolder}/files/**/*.*`,
    },
    clean:       buildFolder,
    buildFolder: buildFolder,
    srcFolder:   srcFolder,
    rootFolder:  rootFolder,
}