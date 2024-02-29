import typescript from '@rollup/plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import terser from '@rollup/plugin-terser';
import { dts } from 'rollup-plugin-dts';

export default [{
    input: 'src/index.ts',
    output: {
        name: 'schema2json',
        file: 'dist/cjs/index.js',
        format: 'cjs'
    },
    plugins: [
        typescript(),
        resolve(),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**'
        }),
        terser()
    ],
},
{
    input: 'src/index.ts',
    output: {
        name: 'schema2json',
        file: 'dist/esm/index.js',
        format: 'esm'
    },
    plugins: [
        typescript(),
        resolve(),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**'
        }),
        terser()
    ],
},
{
    input: "src/index.ts",
    output: [{ file: "dist/types/index.d.ts", format: "es" }],
    plugins: [dts()],
}];