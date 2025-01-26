import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const flowsourceJenkinsPlugin = createPlugin({
  id: 'flowsource-jenkins',
  routes: {
    root: rootRouteRef,
  },
});

export const FlowsourceJenkinsPage = flowsourceJenkinsPlugin.provide(
  createRoutableExtension({
    name: 'FlowsourceJenkinsPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
