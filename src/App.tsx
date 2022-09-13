import './App.css';
import Grid from './components/Grid';
import { data } from './data/animal-information';

function App() {
  return (
    <div className="app">
      <Grid cards={data} />
    </div>
  );
}

export default App;
