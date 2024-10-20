
// Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename( nodePath.resolve() );

// Папка готовой сборки проекта
const buildFolder = './dist';

// Папка с исходными файлами проекта
const srcFolder   = './src';

const path = {
    build: {
        files: '${srcFolder}/files/'
    },
    src: {
        files: '${srcFolder}/files/**/*.*'
    },
    watch: {},
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder
}