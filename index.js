const chalk = require('chalk')
const Client = new require('ssh2-sftp-client')
const sftp = new Client()

const PLUGIN_NAME = 'UploadfileWebpackPlugin'

class UploadfileWebpackPlugin {
  constructor(options = {
    host: '',
    port: '',
    username: '',
    password: '',
    localpath: '',
    remotepath: ''
  }) {
    this.options = options
  }
  async execute(compilation) {
    await sftp.connect({
      host: this.options.host,
      port: this.options.port,
      username: this.options.username,
      password: this.options.password
    }).then(() => {
      return sftp.put(this.options.localpath, this.options.remotepath)
    }).then(res => {
      if (this.options.finishUpload) await this.options.finishUpload(res)
      return sftp.end()
    })
    console.log(chalk.green('uploadfile success'))
  }
  apply(compiler) {
    compiler.hooks.done.tapPromise(PLUGIN_NAME, this.execute.bind(this))
  }
}

module.exports = UploadfileWebpackPlugin
