import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App.jsx';
import PwaInstaller from './components/PwaInstaller.tsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <PwaInstaller />
      <App />
    </ChakraProvider>
  </StrictMode>
);
