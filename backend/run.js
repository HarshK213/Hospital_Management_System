require('./node_modules/esbuild-register/dist/node.js').register({
  jsx: 'automatic',
  jsxImportSource: 'react',
});

require('dotenv').config();
require('./src/index.js');
