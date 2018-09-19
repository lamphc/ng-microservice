const webpack = require('webpack');

module.exports = {

    // "externals": {
    //     "rxjs": "rxjs",
    //     "@angular/core": "ng.core",
    //     "@angular/common": "ng.common",
    //     "@angular/platform-browser": "ng.platformBrowser",
    //     "@angular/elements": "ng.elements",
    //     // "ng-cosmos-ui": "ngZorro.antd"
    // },
    plugins: [ // Just an example for adding plugins
        new webpack.DefinePlugin({
            "VERSION": JSON.stringify("1.0.0")
        })
    ]
}