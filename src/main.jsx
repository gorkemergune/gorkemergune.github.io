import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { LangProvider } from './i18n.jsx';
import App from './App.jsx';

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(e) { return { error: e }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ fontFamily: 'monospace', padding: 40, background: '#0a0a0f', color: '#ff6b35', minHeight: '100vh' }}>
          <h2 style={{ color: '#00d4ff', marginBottom: 16 }}>Render Error</h2>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#e0e0e8' }}>{this.state.error?.message}</pre>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#5a5a70', marginTop: 16, fontSize: 11 }}>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <LangProvider>
          <App />
        </LangProvider>
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
