import Form from './components/form';
import { QueryClient, QueryClientProvider } from "react-query";
import Signin from './components/signin';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import RequireAuth from './components/RequireAuth';
import HomeGuard from './components/HomeGuard';
import ErrorPage from './components/router_error';

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="App">
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="signin" element={<Signin />} />
            <Route path="register" element={<Form />} />
          </Route>

          <Route element={<HomeGuard />}>
            <Route path="/" element={<Home />} />
          </Route>


          <Route path="*" element={<ErrorPage />} />
        </Routes>

      </main>
    </QueryClientProvider>
  );
}
export default App;
