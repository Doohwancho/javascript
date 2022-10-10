const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//export this object{} using node.js syntax to webpack using .exports()
module.exports = {
    //webpack has 4 core concepts
    //1. entry point
    //2. output
    //3. loaders
    //4. plug-ins
    //but we will keep it simple

    

    //. == current folder
    //.. == parent folder    
    entry: ['babel-polyfill','./src/js/index.js'],//where webpack starts bundling. guides where to look.
    output: {//tell webpack where to save bundle files
        path: path.resolve(__dirname, 'dist'), //needs an absolute path. for that, we use built-in node package(const path). plus, join the current absolute path with the one that we want bundle to be in.
        filename: 'js/bundle.js', //inject bundle.js into the dist/index.html 
    },
    //webpack4 has development mode and production mode.
    //development mode = builds a bundle with minified code, in order to boost production speed 
    //production mode = automatically enable optimization like minification, tree-shaking in order to reduce final bundle size.
    // mode: 'development'
    devServer: {
        contentBase: './dist'
    },

    plugins: [ //receives an array of all the plug-ins we are using
        new HtmlWebpackPlugin({
            filename: 'index.html', //we want to copy src/index.html into dist/index.html
            template: './src/index.html' //we can also automatically create an index.html from scratch on the fly with webpack, but it's outside this tutorial so google it!   
        })
    ],
    //once setup, works constantly
    module: { //loaders
        rules:[ //receives array of loaders
            { //each loader needs an object
                test: /\.js$/, //reg exp. $ means ends. find files that ends with .js === find javascript files
                exclude: /node_modules/, //no need to check all the unnecessary files in node_modules
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets:['@babel/preset-env']
                    }
                }
            }
        ]
    }
};