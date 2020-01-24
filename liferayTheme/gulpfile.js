const gulp = require('gulp');
const { task, watch, src, dest, series, parallel } = require('gulp');
const pug = require('gulp-pug');
const fs = require('fs');
const fsExt = require('fs-extra');
const path = require('path');
const fileExtension = require('file-extension');
const browserSync = require('browser-sync').create();
const config = require('./config');
const navigation = require('./navigation');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
	'ie >= 10',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4.4',
	'bb >= 10'
];

var data = {
	"base_url": config.baseUrl,
	"is_develop": true,
	"navigation": navigation,
	"projectsName": config.projectsName
}

/*======================================================================
**** FUNCIONES
======================================================================*/

function compileAllPugFiles(pathparam,buildDirectory,raplaceDirectory){
	fs.readdirSync(pathparam)
	.filter(function(file){
		var directoryConfirm = fs.statSync(path.join(pathparam, file)).isDirectory();
		if(directoryConfirm){
			compileAllPugFiles(path.join(pathparam, file), buildDirectory, raplaceDirectory);
		}else{
			var originalPath = path.join(pathparam, file),
			replaceParentDirectory = originalPath.replace(raplaceDirectory,''),
			finalPath = buildDirectory + replaceParentDirectory,
			destDirectory = finalPath.replace(file,'');
			if( fileExtension(file) === 'pug' )
				complilePugFile(path.join(pathparam, file) , destDirectory);
		}
	});
}

function setPugFileCompile(file,directory,destDirectory){
	var pathSplitFromDirectory = file.split(directory),
	pathSplitFiles = pathSplitFromDirectory[1].split('/'),
	destFile = destDirectory + pathSplitFromDirectory.pop();
	complilePugFile( file, destFile.replace( pathSplitFiles.pop(), '') );
}

function complilePugFile(file,_dest){
	src(file)
	.pipe(
		pug(
			{
				pretty:true,
				locals: data
			}
		)
	)
	.pipe(dest(_dest));
}

/*======================================================================
**** TAREAS
======================================================================*/

function _clean(cb){
	console.log('clean');
	cb();
}

function _buildDevelopHTML(cb){
	compileAllPugFiles(
		config.task.develop.pugFilesDirectory,
		config.task.develop.buildDirectory,
		config.task.develop.pugFilesDirectory
	);
	cb();
}

function _buildFragmentsHTML(cb){
	data.is_develop = false;
	compileAllPugFiles(
		config.task.buildFragments.pugFilesDirectory,
		config.task.buildFragments.buildDirectory,
		config.task.buildFragments.pugFilesDirectory
	);
	cb();
}

function _buildSiteHTML(cb){
	data.is_develop = false;
	compileAllPugFiles(
		config.task.buildSiteHTML.pugFilesDirectory,
		config.task.buildSiteHTML.buildDirectory,
		config.task.buildSiteHTML.pugFilesDirectory
	);
	cb();
}

function _serverDevelop(cb){
	browserSync.init({
		server: {
			baseDir: config.task.develop.buildDirectory
		}
	});
	cb();
}

function _watchDevelop(cb){
	watch(config.task.develop.utilitiesPugDirectory, function(cb) {
	  _buildDevelopHTML(cb);
		browserSync.reload();
	});
	watch(config.task.develop.watchPugDirectory).on('change',function(event){
		setPugFileCompile(
			event,
			config.task.develop.pugFilesDirectory,
			config.task.develop.buildDirectory
		);
		browserSync.reload();
	});
	cb();
}

//======================================================================
//**** Estilos
//======================================================================
// Crear una tarea para compilar un main.scss a un solo css y que se quede en site
gulp.task('styles', function () {
	return gulp.src('./src/assets/scss/**/*.scss')
	.pipe(sass({
		outputStyle: 'nested',
		precision: 10,
		includePaths: ['.'],
		onError: console.error.bind(console, 'Sass error:')
	}))
	.pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
	.pipe(csso())
	// Cargar un main css con todo en site para nuestras pruebas de sitio completo o el css siempre estará segmentado por modulos?
	// .pipe(gulp.dest('./dist/assets/css/')) // .pipe(gulp.dest('./src/site/css/'))
	.pipe(gulp.dest('./src/site-fragments/css/'))
	.pipe(browserSync.reload({stream: true}));
});

//======================================================================
// **** Observador que contendrá las demás tareas a observar
//======================================================================
// Include it in default task
gulp.task('watch', function() {
	gulp.watch(['./src/scss/**/*.scss'], ['styles'])
});

exports.develop        = series(_clean, parallel(_buildDevelopHTML), _serverDevelop, _watchDevelop);
exports.buildFragments = series(_clean, parallel(_buildFragmentsHTML));
exports.buildSite      = series(_clean, parallel(_buildSiteHTML));