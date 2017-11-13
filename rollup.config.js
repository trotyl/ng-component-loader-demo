import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourcemaps from 'rollup-plugin-sourcemaps'
import uglify from 'rollup-plugin-uglify'
import buildOptimizer from 'rollup-plugin-angular-optimizer'

const globals = {
  '@angular/animations': 'ng.animations',
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/compiler': 'ng.compiler',
  '@angular/forms': 'ng.forms',
  '@angular/platform-browser': 'ng.platformBrowser',
  '@angular/platform-browser/animations': 'ng.platformBrowser.animations',
  'rxjs/Observable': 'Rx',
  'rxjs/Subject': 'Rx',
  'rxjs/observable/fromPromise': 'Rx.Observable',
  'rxjs/observable/forkJoin': 'Rx.Observable',
  'rxjs/operator/map': 'Rx.Observable.prototype'
}

module.exports = {
  entry: 'out-tsc/src/main.js',
  dest: 'dist/bundle.js',
  format: 'umd',
  exports: 'named',
  amd: {id: 'ngDemos.platform'},
  moduleName: 'ngDemos.platform',
  plugins: [resolve(), commonjs(), sourcemaps(), buildOptimizer(), uglify()],
  external: Object.keys(globals),
  globals: globals
}
