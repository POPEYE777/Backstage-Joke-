import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { jokePlugin, JokePage } from '../src/plugin';

createDevApp()
  .registerPlugin(jokePlugin)
  .addPage({
    element: <JokePage />,
    title: 'Root Page',
    path: '/joke',
  })
  .render();
