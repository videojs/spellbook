import sh from 'shelljs';

const dirs = ['dist', 'dist-test', 'es5'];

const clean = (pkg, argv) => {
  sh.rm('-rf', dirs);
  sh.mkdir('-p', dirs);
  console.log('clean complete.');
};

clean.help = () => 'help me!';

export default clean;
