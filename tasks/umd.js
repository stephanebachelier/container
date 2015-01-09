module.exports = {
  lib: {
    template: 'umd',
    indent: '  ',
    src: 'dist/<%= pkg.name.replace(/.js$/, "") %>.js',
    dest: 'dist/<%= pkg.name.replace(/.js$/, "") %>.js',
    returnExportsGlobal: 'container',
    deps: {
      default: [],
      amd: [],
      cjs: [],
      global: []
    }
  }
};
