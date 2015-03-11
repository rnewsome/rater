module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jshint");

    grunt.initConfig({
        "pkg": grunt.file.readJSON('package.json'),
        // less/css
        "less": {
            "dist": {
                "files": {
                      "resources/css/icomoon/icomoon.css": ["resources/css/icomoon/icomoon.less"]
                    , "resources/css/bootstrap/custom-bootstrap.css": ["resources/css/bootstrap/custom-bootstrap.less"]
                    , "resources/css/rater.css": ["resources/css/rater.less"]
                }
            }
        },
        "cssmin": {
            "dist": {
                "files": {
                      "dist/resources/css/icomoon/icomoon.min.css": ["resources/css/icomoon/icomoon.css"]
                    , "dist/resources/css/bootstrap/custom-bootstrap.min.css": ["resources/css/bootstrap/custom-bootstrap.css"]
                    , "dist/resources/css/srs.min.css": ["resources/css/srs.css"]
                }
            },
            "options": {
                "report": "min"
            }
        },
        "watch": {
            "all": {
                "files": ["**/*.less", "**/*.css", "gruntfile.js"],
                "tasks": ["default"]
            }
        }
    });

    grunt.registerTask("default", ["less", "cssmin"]);
    //grunt.registerTask("javascript", ["clean", "concat", "uglify"]);
    //grunt.registerTask("lint", ["jshint"]);
    
};
