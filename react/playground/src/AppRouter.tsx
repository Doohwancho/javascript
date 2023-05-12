import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Nav from './components/Nav';
import BoardList from './components/BoardList';
import BoardDetails from './components/BoardDetails';
import NotFound from './pages/NotFound';


export function AppRouter() {
  return (
	  <>
	  <BrowserRouter>
		<Nav />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/board" element={<BoardList/>} />
			<Route path="/boardDetails" element={<BoardDetails/>} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	  </BrowserRouter>
	  </>
  );
}

export default AppRouter;
