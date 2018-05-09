const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');

//svg
// const svgmin = require('gulp-svgmin');
// const svgstore = require('gulp-svgstore');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
//images
const imagemin = require('gulp-imagemin');
// styles
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
// scripts
const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

// All paths in on place
const paths = {
    root: './build',
    styles: {
        src: 'src/sass/**/*.scss',
        dest: 'build/assets/css/'
    },
    scripts: {
        src: 'src/js/*.js',
        dest: 'build/assets/js/'
    },
    vendorScripts: {
        src: 'src/js/vendor/*.js',
        dest: 'build/assets/js/'
    },
    templates: {
        src: 'src/pug/**/*.pug',
        dest: 'build/assets/'
    },
    images: {
        src: 'src/images/*/*.*',
        dest: 'build/assets/img/'
    },
    // svgIcons: {
    //     src: 'src/svg/*.svg',
    //     dest: 'build/assets/img/sprite/'
    // },
    fonts: {
        src: 'src/fonts/**/*.*',
        dest: 'build/assets/fonts/'
    }
};

// SVG Sprite Build task
// function SVGSpriteBuild() {
//     return gulp
//         .src(paths.svgIcons.src)
//         // .pipe(cheerio({
//         //     run: function ($) {
//         //         $('[fill]').removeAttr('fill');
//         //         $('[stroke]').removeAttr('stroke');
//         //         $('[style]').removeAttr('style');
//         //     },
//         //     parserOptions: { xmlMode: true }
//         // }))
//         .pipe(svgmin(function (file) {
//             //var prefix = path.basename(file.relative, path.svgIcons(file.relative));
//             return {
//                 plugins: [{
//                     cleanupIDs: {
//                         //prefix: prefix + '-',
//                         minify: true
//                     }
//                 }]
//             }
//         }))
//         .pipe(replace('&gt;', '>'))
//         .pipe(svgstore({ inlineSvg: true }))
//         .pipe(rename({
//             basename: "sprite",
//             suffix: ".min"
//         }))
//         .pipe(gulp.dest(paths.svgIcons.dest));
// }

// pug
function templates() {
    return gulp.src('./src/pug/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root));
}

// scss
function styles() {
    return gulp.src('./src/sass/app.scss')
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest))       
}

// webpack
function scripts() {
    return gulp.src('src/js/app.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(paths.scripts.dest));
}

// очистка папки build
function clean() {
    return del(paths.root);
}

// copy images
function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5
        }))
        .pipe(gulp.dest(paths.images.dest));
}
// copy fonts
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}
// copy vendorScripts
function vendorScripts() {
    return gulp.src(paths.vendorScripts.src)
        .pipe(gulp.dest(paths.vendorScripts.dest));
}

// look at the changes and compilation
function watch() {
    // gulp.watch(paths.svgIcons.src, SVGSpriteBuild);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.vendorScripts.src, vendorScripts);
}

// следим за build и релоадим браузер
function server() {
    browserSync.init({
        server: paths.root   
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// экспортируем функции для доступа из терминала (gulp clean)
exports.clean = clean;
// exports.SVGSpriteBuild = SVGSpriteBuild;
exports.styles = styles;
exports.scripts = scripts;
exports.templates = templates;
exports.images = images;
exports.vendorScripts = vendorScripts;
exports.watch = watch;
exports.server = server;


// сборка и слежка
gulp.task('default', gulp.series(
    clean,
    // gulp.parallel(SVGSpriteBuild, fonts, styles, scripts, templates, images),
    gulp.parallel( fonts, styles, scripts,vendorScripts, templates, images),
    gulp.parallel(watch, server)
));
