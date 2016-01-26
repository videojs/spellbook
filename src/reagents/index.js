import afterEachHook from './hooks/after-each';
import beforeEachHook from './hooks/before-each';
import playerMock from './mocks/player';
import timerMock from './mocks/timer';

export default {
  hooks: {
    afterEach: afterEachHook,
    beforeEach: beforeEachHook
  },
  mocks: {
    player: playerMock,
    timer: timerMock
  }
};
