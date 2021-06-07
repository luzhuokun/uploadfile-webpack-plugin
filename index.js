const Client = require('ssh2-sftp-client')
const sftp = new Client()
const chalk = require('chalk')
class UploadfileWebpackPlugin {
  constructor(options) {
    this.options = options
  }
  async execute(compilation) {
    const { host, port, username, password, localpath, remotepath, finishUpload } = this.options
    await sftp.connect({ host, port, username, password })
    try {
      const res = await sftp.put(localpath, remotepath)
      await finishUpload(res)
    } catch (error) {
      console.error(error)
    } finally {
      await sftp.end()
      console.log(chalk.green(`文件上传服务器成功！`))
    }
  }
  apply(compiler) {
    compiler.hooks.done.tapPromise(this.__pluginName, this.execute.bind(this))
  }
}

module.exports = UploadfileWebpackPlugin
