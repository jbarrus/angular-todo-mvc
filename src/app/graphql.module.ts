import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache, NormalizedCacheObject} from 'apollo-cache-inmemory';
import {ApolloClientOptions} from 'apollo-client';

const uri = 'http://localhost:4000/graphql';
export function createApollo(httpLink: HttpLink): ApolloClientOptions<NormalizedCacheObject> {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
    connectToDevTools: true,
    defaultOptions: {
      watchQuery: {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-and-network'
      }
    }
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    },
  ],
})
export class GraphQLModule {}
