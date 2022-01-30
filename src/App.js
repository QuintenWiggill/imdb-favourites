import { StoreProvider } from 'easy-peasy';
import { store } from './Store';
import Home from './screens/Home';



function App() {

  return (
    <StoreProvider store={store}>
      <Home />
    </StoreProvider>
  );
}

export default App;
