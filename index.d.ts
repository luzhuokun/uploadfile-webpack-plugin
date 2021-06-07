interface Options {
  host: string;
  port: string;
  username: string;
  password: string;
  localpath: string;
  remotepath: string;
  finishUpload?: Function;
}

declare class UploadfileWebpackPlugin {
  constructor(options: Options)
  execute(compilation): void
  apply(compiler): void
}

export = UploadfileWebpackPlugin;
