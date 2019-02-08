var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postHTML = require("gulp-posthtml");
var include = require("posthtml-include");
var autoprefixer = require('gulp-autoprefixer');
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var uglify = require("gulp-uglify");
var rigger = require("gulp-rigger");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var run = require("run-sequence");
var del = require("del");
var sourcemaps = require("gulp-sourcemaps");
var normalizeSCSS = require("node-normalize-scss");

gulp.task("style", function(){
    return gulp.src("source/sass/main.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: normalizeSCSS.includePaths
          }))
        .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("build/css"))
        .pipe(server.stream())
        .pipe(minify())
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest("build/css"))
        .pipe(server.stream());
});

gulp.task('script', function () {
	return gulp.src("source/js/script.js")
		.pipe(plumber(function (error) {
			console.log('Scripts Task Error');
			console.log(error);
			this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(rigger())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("build/js"))
        .pipe(uglify())
        .pipe(rename("script.min.js"))
        .pipe(gulp.dest("build/js"));
});

gulp.task("sprite", function(){
    return gulp.src("source/img/sprite-*.svg")
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("build/img/svg-sprite"));
});

gulp.task("html", function(){
    return gulp.src("source/*.html")
        .pipe(postHTML([include()]))
        .pipe(gulp.dest("build"))
});

gulp.task("images", function(){
    return gulp.src("source/img/**/*.{png, jpg, svg")
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("source/img/min"));
});

gulp.task("webp", function(){
    return gulp.src("source/img/**/*.{png, jpg}")
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest("source/img/webp"));
});

gulp.task("serve", function(){
    server.init({
        server: "build/"
    });

    gulp.watch("source/sass/**/*.{scss, sass}", ["style"]);
    gulp.watch("source/js/**/*.js", ["script"]).on('change', server.reload);
    gulp.watch("source/*.html", ["html"]).on('change', server.reload);
});

gulp.task("copy", function(){
    return gulp.src("source/fonts/**/*.{woff, woff2}", { base: "source" })
        .pipe(gulp.dest("build"));
});

gulp.task("clean", function(){
    return del("build");
});

gulp.task("build", function(done){
    run(
        "clean",
        "copy",
        "style",
        "script",
        "sprite",
        "html",
        done
    );
});