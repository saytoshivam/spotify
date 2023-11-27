import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<div>hello</div>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
