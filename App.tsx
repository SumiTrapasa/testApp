import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import StackNavigator from './src/navigation/stackNavigation';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </Provider>
      </QueryClientProvider>
    </PaperProvider>

  );
}
