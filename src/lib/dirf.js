import path from 'path';

/**
 * Creates a function like `path.join` that is prepended with a directory
 * path.
 *
 * @example
 *   let foo = dirf('/foo/bar');
 *   foo('baz'); // "/foo/bar/baz"
 *
 * @param  {String} dir
 * @return {Function}
 */
const dirf = dir => (...args) => path.join(dir || process.cwd(), ...args);

export default dirf;
