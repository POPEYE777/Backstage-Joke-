import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { flowsourceJenkinsPlugin, FlowsourceJenkinsPage } from '../src/plugin';

createDevApp()
  .registerPlugin(flowsourceJenkinsPlugin)
  .addPage({
    element: <FlowsourceJenkinsPage />,
    title: 'Root Page',
    path: '/flowsource-jenkins',
  })
  .render();
