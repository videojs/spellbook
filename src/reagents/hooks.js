
/**
 * Performs common QUnit testing setup tasks.
 *
 * @param  {Object}   env
 *         Should contain various references to libraries and objects that
 *         are required to run the setup.
 * @param  {Object}   env.document
 * @param  {Object}   env.sinon
 * @param  {Object}   env.videojs
 * @param  {Function} [cb]
 *         Custom callback to perform any additional setup that needs to
 *         happen AFTER the common setup tasks.
 */
const beforeEach = (env, cb) => {
  return function() {

    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5. This MUST come
    // before any player is created; otherwise, timers could get created
    // with the actual timer methods!
    this.clock = env.sinon.useFakeTimers();

    this.fixture = env.document.getElementById('qunit-fixture');
    this.video = env.document.createElement('video');
    this.fixture.appendChild(this.video);
    this.player = env.videojs(this.video);

    if (typeof cb === 'function') {
      cb.call(this);
    }
  };
};

/**
 * Performs common QUnit testing teardown tasks.
 *
 * @param  {Object}   env
 *         Reserved for the future. Not currently used; pass `null`.
 * @param  {Function} [cb]
 *         Custom callback to perform any teardown that needs to happen
 *         BEFORE the common teardown tasks.
 */
const afterEach = (env, cb) => {
  return function() {
    if (typeof cb === 'function') {
      cb.call(this);
    }

    this.player.dispose();
    this.clock.restore();
  };
};

export {beforeEach, afterEach};
