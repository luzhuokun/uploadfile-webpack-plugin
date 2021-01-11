### Usage

```
// webpack.config.js
const UploadfileWebpackPlugin = require('uploadfile-webpack-plugin')
plugins: [
  new UploadfileWebpackPlugin({
    host: 'host',
    port: 'port',
    username: 'username',
    password: 'password',
    localpath: 'localpath',
    remotepath: 'remotepath',
    finishUpload: async()=>{}
  })
]
```
