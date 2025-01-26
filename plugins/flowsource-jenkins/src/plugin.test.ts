import { flowsourceJenkinsPlugin } from './plugin';

describe('flowsource-jenkins', () => {
  it('should export plugin', () => {
    expect(flowsourceJenkinsPlugin).toBeDefined();
  });
});
