module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: "./src/public",
                        src: ["**"],
                        dest: "./build/public"
                    },
                    {
                        expand: true,
                        cwd: "./src/views",
                        src: ["**"],
                        dest: "./build/views"
                    }
                ]
            }
        },
        ts: {
            app: {
                files: [{
                    src: ["src/\*\*/\*.ts", "!src/.baseDir.ts"],
                    dest: "./build"
                }],
                options: {
                    module: "commonjs",
                    target: "es6",
                    sourceMap: false,
                    rootDir: "src"
                }
            }
        },
        watch: {
            ts: {
                files: ["src/\*\*/\*.ts"],
                tasks: ["ts"]
            },
            views: {
                files: ["src/views/**/*.pug"],
                tasks: ["copy"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");

    grunt.registerTask("default", [
        "copy",
        "ts"
    ]);

};