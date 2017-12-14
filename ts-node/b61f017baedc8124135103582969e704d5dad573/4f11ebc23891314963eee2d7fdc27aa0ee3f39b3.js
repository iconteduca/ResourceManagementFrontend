"use strict";
var gulpLoadPlugins = require('gulp-load-plugins');
var path_1 = require('path');
var config_1 = require('../../config');
var plugins = gulpLoadPlugins();
var tsProjects = {};
function makeTsProject(options) {
    if (options === void 0) { options = {}; }
    var optionsHash = JSON.stringify(options);
    if (!tsProjects[optionsHash]) {
        var config = Object.assign({
            typescript: require('typescript')
        }, options);
        tsProjects[optionsHash] =
            plugins.typescript.createProject(path_1.join(config_1.default.APP_SRC, 'tsconfig.json'), config);
    }
    return tsProjects[optionsHash];
}
exports.makeTsProject = makeTsProject;
//# sourceMappingURL=/home/admin/Programmi/resourceManagement/AISMfrontend/ts-node/b61f017baedc8124135103582969e704d5dad573/4f11ebc23891314963eee2d7fdc27aa0ee3f39b3.js.map