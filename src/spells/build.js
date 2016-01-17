import os from 'os';
import stream from 'stream';

class OutputStream extends stream.Readable {

  _read() {
    this.push('run the build!');
    this.push(os.EOL);
    this.push(null);
  }
};

const build = () => new OutputStream();

build.help = () => 'help me!';

export default build;
