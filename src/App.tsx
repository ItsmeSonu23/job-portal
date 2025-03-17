/**
 * Main App Component
 * 
 * Root component that sets up core application providers and configuration:
 * - Redux store provider for state management
 * - Mantine UI provider with dark theme
 * - Notifications system
 * - Application routing
 * 
 * Imports required Mantine component styles and configures providers
 * to wrap the main application routes.
 * 
 * @component
 * @example
 * // In index.tsx/main.tsx
 * ReactDOM.render(
 *   <App />,
 *   document.getElementById('root')
 * )
 */

import './App.css'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import Store from './Store';
import { AppRoutes } from './Pages/AppRoutes';

function App() {
  return (
    <Provider store={Store}>
      <MantineProvider defaultColorScheme='dark'>
        <Notifications position='top-center' zIndex={1000} />
        <AppRoutes />
      </MantineProvider>
    </Provider>
  )
}

export default App
