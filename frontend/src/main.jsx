import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import GlobalStyles from './components/GlobalStyles';
import { UserProvider } from './contexts/UserContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <GlobalStyles>
            <UserProvider>
                <App />
            </UserProvider>
        </GlobalStyles>
    </StrictMode>,
);
