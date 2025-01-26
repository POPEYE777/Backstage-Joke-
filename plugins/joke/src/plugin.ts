import {
  createPlugin,
  createRoutableExtension,
  createComponentExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const jokePlugin = createPlugin({
  id: 'joke',
  routes: {
    root: rootRouteRef,
  },
});


export const JokeCard = jokePlugin.provide(
  createComponentExtension({
    component: {
      lazy: () => import('./components/JokeCard').then(m => m.JokeCard),
    },
  }),
);


export const JokePage = jokePlugin.provide(
  createRoutableExtension({
    name: 'JokePage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
