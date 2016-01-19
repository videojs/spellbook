
/**
 * Removes the "@foo" scope from a package name.
 *
 * @param  {String} name
 */
const descope = name => name.split('/').reverse()[0];

export default descope;
