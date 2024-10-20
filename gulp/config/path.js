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
        files: `${buildFolder}/files/`,
    },

    // Исходники
    src: {
        files: `${srcFolder}/files/**/*.*`,
    },

    watch: {
        files: `${srcFolder}/files/**/*.*`,
    },
    clean:       buildFolder,
    buildFolder: buildFolder,
    srcFolder:   srcFolder,
    rootFolder:  rootFolder,
}