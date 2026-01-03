import { Routes as Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/ToastContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateContact from "./pages/CreateContact";
import AllContact from "./pages/AllContact";
import EditContact from "./pages/EditContact";

const App = () => {
  return (
    <ToastContextProvider>
      <AuthContextProvider>
        <Switch>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Layout navbar={false} container={false}><Login /></Layout>} />
          <Route path="/register" element={<Layout navbar={false} container={false}><Register /></Layout>} />
          <Route path="/create" element={<Layout><CreateContact /></Layout>} />
          <Route path="/mycontacts" element={<Layout><AllContact /></Layout>} />
          <Route path="/edit/:id" element={<Layout><EditContact /></Layout>} />
        </Switch>
      </AuthContextProvider>
    </ToastContextProvider>
  );
};

export default App;
