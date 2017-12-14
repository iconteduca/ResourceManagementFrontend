"use strict";
var gulp = require('gulp');
var config_1 = require('../../config');
module.exports = function () {
    return gulp.src(config_1.default.FONTS_SRC)
        .pipe(gulp.dest(config_1.default.FONTS_DEST));
};
//# sourceMappingURL=/home/admin/Programmi/resourceManagement/AISMfrontend/ts-node/b61f017baedc8124135103582969e704d5dad573/aa39cec255991e90b9b74c13b7e1d1ec0e81490e.js.map