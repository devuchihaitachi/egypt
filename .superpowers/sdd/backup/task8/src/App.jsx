import { NavigationProvider } from './components/Router';

function App() {
  return (
    <NavigationProvider>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="glass-panel glass-panel-interactive" style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px' }}>
          <h1>Eternal Egypt</h1>
          <p style={{ marginTop: '1rem', color: 'var(--color-papyrus)' }}>
            Experience the majesty of ancient history.
          </p>
        </div>
      </div>
    </NavigationProvider>
  );
}

export default App;
