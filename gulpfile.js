
// Подключаю основной модуль
import gulp from "gulp";

// Импортирую пути, не путю
import { path } from "./builder/config/path.js";

//
global.app = {
    gulp: gulp,
    path: path
}

//
import { copy } from "./builder/tasks/copy.js";