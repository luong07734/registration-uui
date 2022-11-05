import Form from './components/form';
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Form />
      </div>
    </QueryClientProvider>
  );
}
export default App;
