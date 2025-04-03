import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const config = defineConfig({
  input: ['src/index.ts'],
  output: [
    {
      dir: 'dist/mjs',
      format: 'esm',
      sourcemap: false,
      compact: true,
      minifyInternalExports: true,
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: false,
    },
  ],
  external: ['ethers', 'ethers/lib/utils', 'graphql', 'graphql-request', 'typechain'],
  plugins: [
    json(),
    resolve({
      preferBuiltins: true,
    }),
    commonjs({
      include: /node_modules/
    }),
    typescript({
      useTsconfigDeclarationDir: true,
      clean: true,
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
});

export default config;
