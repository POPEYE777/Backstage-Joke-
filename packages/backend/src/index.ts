import { createBackend } from '@backstage/backend-defaults';
import { createBackendModule } from '@backstage/backend-plugin-api';
import { githubAuthenticator } from '@backstage/plugin-auth-backend-module-github-provider';
import { authProvidersExtensionPoint, createOAuthProviderFactory } from '@backstage/plugin-auth-node';
import { stringifyEntityRef } from '@backstage/catalog-model';

async function setupBackend() {
  // Create the backend instance
  const backend = createBackend();

  // Add Backstage plugins to the backend using dynamic imports and accessing the default export
  backend.add((await import('@backstage/plugin-app-backend')).default);
  backend.add((await import('@backstage/plugin-proxy-backend')).default);
  backend.add((await import('@backstage/plugin-scaffolder-backend')).default);
  backend.add((await import('@backstage/plugin-scaffolder-backend-module-github')).default);
  backend.add((await import('@backstage/plugin-techdocs-backend')).default);

  // Authentication plugin (Guest Provider and other authentication modules)
  backend.add((await import('@backstage/plugin-auth-backend')).default);
  backend.add((await import('@backstage/plugin-auth-backend-module-guest-provider')).default);

  // Catalog plugin
  backend.add((await import('@backstage/plugin-catalog-backend')).default);
  backend.add((await import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model')).default);
  backend.add((await import('@backstage/plugin-catalog-backend-module-logs')).default);

  // Permissions plugin
  backend.add((await import('@backstage/plugin-permission-backend')).default);
  backend.add((await import('@backstage/plugin-permission-backend-module-allow-all-policy')).default);

  // Search plugin
  backend.add((await import('@backstage/plugin-search-backend')).default);
  backend.add((await import('@backstage/plugin-search-backend-module-pg')).default);
  backend.add((await import('@backstage/plugin-search-backend-module-catalog')).default);
  backend.add((await import('@backstage/plugin-search-backend-module-techdocs')).default);

  // Kubernetes plugin
  backend.add((await import('@backstage/plugin-kubernetes-backend')).default);

  // Custom authentication provider module
  
  const customAuth = createBackendModule({
    pluginId: 'auth',
    moduleId: 'custom-auth-provider',
    register(reg) {
      reg.registerInit({
        deps: { providers: authProvidersExtensionPoint },
        async init({ providers }) {
          providers.registerProvider({
            providerId: 'github',
            factory: createOAuthProviderFactory({
              authenticator: githubAuthenticator,
              async signInResolver(info, ctx) {
                // The profile from the OAuth provider (GitHub in this case)
                //const profile = info.profile;
  
                // We can safely assume that the GitHub username is available as 'login'
                const username = 'POPEYE777';  // GitHub username
  
                if (!username) {
                  throw new Error('GitHub user profile contained no login (username)');
                }
  
                // Create a user entity using the GitHub username (or any other identifier from the profile)
                const userEntity = stringifyEntityRef({
                  kind: 'User',
                  name: username,  // Using GitHub username here
                  namespace: 'default',  // Default namespace
                });
  
                // Issue a token for the user
                return ctx.issueToken({
                  claims: {
                    sub: userEntity,
                    ent: [userEntity],
                  },
                });
              },
            }),
          });
        },
      });
    },
  });
  
  // Add the custom authentication provider to the backend
  backend.add(customAuth);
  

  
  // Start the backend
  backend.add(import('@internal/backstage-plugin-flowsource-backend'));
  await backend.start();
}

// Call the setupBackend function
setupBackend().catch((error) => {
  console.error("Failed to set up the backend:", error);
  
});
