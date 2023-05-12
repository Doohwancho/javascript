import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Nav from './components/Nav';
import Board from './components/Board';


export function AppRouter() {
  return (
	  <>
	  <BrowserRouter>
		<Nav />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/board" element={<Board/>} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	  </BrowserRouter>
	  </>
  );
}

export default AppRouter;
