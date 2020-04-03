# html-split-webpack-plugin

## 简介

`html-split-webpack-plugin`是`html-webpack-plugin`的扩展插件，能够将html文件中的指定代码片段拆分出来，生成单独的html文件。

## 使用

#### Webpack

````
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlSplitWebpackPlugin = require("html-split-webpack-plugin")

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlSplitWebpackPlugin()
  ]
}
````

#### HTML

````
<#-- build:产出文件路径:占位符 -->
待拆分代码
<#-- endbuild -->
````

## 示例

#### 产出前

````
# index.html

<div>
    <#-- build:./newFile.html:xxx -->
    <h1>newFile</h1>
    <#-- endbuild -->
</div>
````

#### 产出后

````
# index.html

<div>
    xxx
</div>

# newFile.html

<h1>newFile</h1>
````