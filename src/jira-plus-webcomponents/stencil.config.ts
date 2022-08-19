import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';


export const config: Config = {
  namespace: 'jira-plus-webcomponents',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      generateTypeDeclarations: true,
      autoDefineCustomElements: true,
      dir: 'build',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [sass()]
};
