import Navbar from './components/Navbar';
import { Route } from 'react-router';
import Home from './pages/Home';
import Products from './pages/Products';

function App() {
  return (
    <div>
      {/*<Navbar />*/}
      <Route exact path="/" component={Home} />
      <Route path="/products" component={Products} />
    </div>
  );
}

export default App;
