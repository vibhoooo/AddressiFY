import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import LogIn from './Login';
import Form from './Form';
import Display from './Display';

function App() {
	return(
		<BrowserRouter>
			<Routes>
				<Route
					path={"/signup"}
					element={<SignUp />}
				/>
				<Route
					path={"/login"}
					element={<LogIn />}
				/>
				<Route
					path={"/home/:id"}
					element={<Display />}
				/>
				<Route
					path={"/add/:id"}
					element={<Form />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;