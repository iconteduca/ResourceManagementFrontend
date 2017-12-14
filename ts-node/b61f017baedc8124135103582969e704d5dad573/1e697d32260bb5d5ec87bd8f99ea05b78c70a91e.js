"use strict";
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var path_1 = require('path');
var slash = require('slash');
var config_1 = require('../../config');
var utils_1 = require('../../utils');
var plugins = gulpLoadPlugins();
function inject(name) {
    return plugins.inject(gulp.src(getInjectablesDependenciesRef(name), { read: false }), {
        name: name,
        transform: transformPath()
    });
}
function getInjectablesDependenciesRef(name) {
    return config_1.default.DEPENDENCIES
        .filter(function (dep) { return dep['inject'] && dep['inject'] === (name || true); })
        .map(mapPath);
}
function mapPath(dep) {
    var envPath = dep.src;
    if (envPath.startsWith(config_1.default.APP_SRC) && !envPath.endsWith('.scss')) {
        envPath = path_1.join(config_1.default.APP_DEST, envPath.replace(config_1.default.APP_SRC, ''));
    }
    else if (envPath.startsWith(config_1.default.APP_SRC) && envPath.endsWith('.scss')) {
        envPath = envPath.replace(config_1.default.ASSETS_SRC, config_1.default.CSS_DEST).replace('.scss', '.css');
    }
    return envPath;
}
function transformPath() {
    return function (filepath) {
        if (filepath.startsWith("/" + config_1.default.APP_DEST)) {
            filepath = filepath.replace("/" + config_1.default.APP_DEST, '');
        }
        arguments[0] = path_1.join(config_1.default.APP_BASE, filepath) + ("?" + Date.now());
        return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
    };
}
module.exports = function () {
    return gulp.src(path_1.join(config_1.default.APP_SRC, 'index.html'))
        .pipe(inject('shims'))
        .pipe(inject('libs'))
        .pipe(inject())
        .pipe(plugins.template(utils_1.templateLocals()))
        .pipe(gulp.dest(config_1.default.APP_DEST));
};
//# sourceMappingURL=/home/admin/Programmi/resourceManagement/AISMfrontend/ts-node/b61f017baedc8124135103582969e704d5dad573/1e697d32260bb5d5ec87bd8f99ea05b78c70a91e.js.map