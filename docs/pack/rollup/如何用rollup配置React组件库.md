# rollup 如何配置生成一个 React 组件库

## 安装 Rollup 及相关插件

```bash
npm install --save-dev rollup rollup-plugin-babel rollup-plugin-node-resolve rollup-plugin-commonjs rollup-plugin-peer-deps-external rollup-plugin-postcss rollup-plugin-uglify

```

## 新建 rollup.config.js 文件，配置 Rollup

```js
// rollup.config.js
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "src/index.js", // 入口文件路径
  output: [
    {
      // 输出文件配置
      file: "dist/bundle.js", // 输出文件路径
      format: "cjs", // 输出文件格式
      sourcemap: true, // 生成sourcemap文件
    },
  ],
  plugins: [
    // 插件配置
    peerDepsExternal(), // 排除peerDependencies中声明的依赖
    resolve({ browser: true }), // 解析npm中的模块
    commonjs(), // 将CommonJS模块转换为ES6模块
    babel({ exclude: "node_modules/**" }), // 使用Babel转换ES6代码
    postcss(), // 处理css模块
    uglify(), // 压缩输出文件
  ],
  external: ["react", "react-dom"], // 外部依赖声明
};
```

## 配置 babel

```js
// babel.config.js
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
};
```

## 配置 postcss

```js
// postcss.config.js
module.exports = {
  plugins: ["postcss-preset-env"],
};
```

## 在 package.json 文件中添加如下配置

```json
{
  "main": "dist/bundle.js",
  "module": "src/index.js",
  "peerDependencies": {
    "react": "^16.8.0",
    "react-dom": "^16.8.0"
  }
}
```

## 打包

执行 npm run build 命令进行打包，打包后的代码在 dist 文件夹下。

## 支持 Typescript

### 安装 TypeScript 及相关插件

```bash
npm install --save-dev typescript @rollup/plugin-typescript @rollup/plugin-dts rollup-plugin-typescript2

```

### 修改 rollup.config.js 配置

```js
import typescript from "@rollup/plugin-typescript";
import dts from "@rollup/plugin-dts";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

const plugins = [nodeResolve(), typescript(), commonjs(), postcss()];

export default [
  {
    input: "./src/index.tsx", // 入口文件路径
    output: [
      {
        name: "MyComponent",
        file: "dist/bundle.cjs.js", // 输出文件路径
        format: "cjs", // 输出文件格式
        sourcemap: true, // 生成sourcemap文件
      },
      {
        name: "MyComponent",
        file: "dist/bundle.esm.js", // 输出文件路径
        format: "esm", // 输出文件格式
        sourcemap: true, // 生成sourcemap文件
      },
      {
        name: "MyComponent",
        file: "dist/bundle.umd.js", // 输出文件路径
        format: "umd", // 输出文件格式
        sourcemap: true, // 生成sourcemap文件
      },
      {
        name: "MyComponent",
        file: "dist/bundle.min.js", // 输出文件路径
        format: "umd", // 输出文件格式
        plugins: [terser()], // 对输出文件进行压缩
        sourcemap: true, // 生成sourcemap文件
      },
    ],
    plugins: plugins,
  },
  {
    input: "./src/index.tsx", // 入口文件路径
    output: [
      {
        // 输出文件配置
        file: "dist/index.d.ts", // 输出文件路径
        format: "es",
      },
    ],
    plugins: [dts()],
  },
];
```

### 新增新增 tsconfig.json 文件

```json
{
  "compilerOptions": {
    "declaration": true,
    "jsx": "react",
    "module": "esnext",
    "moduleResolution": "node",
    "target": "es5"
  },
  "exclude": ["node_modules", "dist"]
}
```
