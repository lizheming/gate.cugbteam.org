var gulp = require("gulp"),
	watch = require("gulp-watch"),
	inject = require("gulp-inline-source");

gulp.task("default", function() {
	return watch("./src/*", function() {
		return gulp.src("./src/index.html")
		.pipe(inject())
		.pipe(gulp.dest("./"))
	})
})