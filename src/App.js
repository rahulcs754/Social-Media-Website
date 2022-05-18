import Routespaths from "./frontend/Routes";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="App">
      <Routespaths />
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
