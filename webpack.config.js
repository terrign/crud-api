import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from 'path';

const dirname = import.meta.dirname;

const config = {
  mode: 'production',
  entry: './src/index.ts',
  target: 'es2023',
  output: {
    path: path.resolve(dirname, 'dist'),
    chunkFormat: 'module',
    filename: 'app.js',
  },
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: { loader: 'swc-loader' },
      },
    ],
  },
  resolve: { extensions: ['.ts'] },
};

export default config;
