"use strict";
var util = require('gulp-util');
var rimraf = require('rimraf');
function clean(paths) {
    return function (done) {
        var pathsToClean;
        if (paths instanceof Array) {
            pathsToClean = paths;
        }
        else {
            pathsToClean = [paths];
        }
        var promises = pathsToClean.map(function (p) {
            return new Promise(function (resolve) {
                rimraf(p, function (e) {
                    if (e) {
                        util.log('Clean task failed with', e);
                    }
                    else {
                        util.log('Deleted', util.colors.yellow(p || '-'));
                    }
                    resolve();
                });
            });
        });
        Promise.all(promises).then(function () { return done(); });
    };
}
exports.clean = clean;
//# sourceMappingURL=/home/admin/Programmi/resourceManagement/AISMfrontend/ts-node/b61f017baedc8124135103582969e704d5dad573/a6c9bb01d680bab43a81f112de89860d6bf987e4.js.map