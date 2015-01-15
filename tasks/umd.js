module.exports = function () {
  'use strict';
  return {
    lib: {
      template: require('path').join(process.cwd(), './tasks/template/umd.hbs'),
      indent: '  ',
      src: 'dist/<%= pkg.name.replace(/.js$/, "") %>.js',
      dest: 'dist/<%= pkg.name.replace(/.js$/, "") %>.js',
      objectToExport: 'Hashmapper',
      deps: {
        default: [],
        amd: [],
        cjs: [],
        global: []
      }
    }
  };
};
