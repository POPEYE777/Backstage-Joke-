import { jokePlugin } from './plugin';

describe('joke', () => {
  it('should export plugin', () => {
    expect(jokePlugin).toBeDefined();
  });
});
