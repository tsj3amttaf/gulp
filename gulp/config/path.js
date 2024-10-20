// Получаем имя папки проекта ввиде названия директории (в данном случае папка со сборкой будет называться "gulp")
import * as nodePath from 'path';
const rootFolder = nodePath.basename( nodePath.resolve() );

// Получаем имя папки "dist" для готовой сборки
const buildFolder = './dist';

// Получаем имя папки с исходными файлами
const srcFolder   = './src';

//
export const path = {

    // Собрать в папке "dest"
    build: {
        files: `${buildFolder}/files/`,
    },

    // Исходники
    src: {
        files: `${srcFolder}/files/**/*.*`,
    },

    watch: {},
    clean:       buildFolder,
    buildFolder: buildFolder,
    srcFolder:   srcFolder,
    rootFolder:  rootFolder,
}