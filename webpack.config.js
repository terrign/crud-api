import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import path from 'path';

const dirname = import.meta.dirname;

const builtInNodeModules = [
  'assert',
  'buffer',
  'cluster',
  'crypto',
  'dgram',
  'dns',
  'events',
  'fs',
  'http',
  'http2',
  'https',
  'net',
  'os',
  'path',
  'process',
  'querystring',
  'readline',
  'stream',
  'timers',
  'tls',
  'tty',
  'url',
  'util',
  'v8',
  'vm',
  'zlib',
  'fs/promises',
  'child_process',
  'string_decoder',
  'diagnostics_channel',
];

const config = {
  mode: 'production',
  entry: './src/index.ts',
  target: ['es2022'],
  output: {
    path: path.resolve(dirname, 'dist'),
    filename: 'app.js',
    module: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      ignoreStub: true,
      path: path.resolve(dirname, '.env.production'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: { loader: 'swc-loader' },
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
    alias: { '@': path.resolve(dirname, 'src') },
    conditionNames: ['import', 'node'],
  },
  async externals({ request }) {
    const isBuiltIn = request.startsWith('node:')
      || builtInNodeModules.includes(request);

    if (isBuiltIn) {
      return Promise.resolve(`module ${request}`);
    }
  },
  experiments: { outputModule: true },
};

export default config;
