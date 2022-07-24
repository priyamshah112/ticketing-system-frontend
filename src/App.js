import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './component/Login'; 
import PrivateRoute from './routes/PrivateRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'antd/dist/antd.css';
import './App.css';
import ForgotPassword from './component/ForgetPassword';
import ResetPassword from './component/ResetPassword';


function App() {
  return (
    <div className="App">
      <ToastContainer
      rtl
      theme="light"
      />
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <PrivateRoute />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
