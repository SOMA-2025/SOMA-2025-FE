import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <Header />
      </div>
    </BrowserRouter>
  );
}

export default App;