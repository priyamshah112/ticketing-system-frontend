import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './component/login'; 
import User from './component/user';
import Ticket from './component/tickets';
import Roles from './component/roles';
import ProtectedRoute from './component/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import TicketDetails from './component/ticketDetails';
import 'antd/dist/antd.css';
import './App.css';
import HardwareInventory from './component/inventory/hardware';
import SoftwareInventory from './component/inventory/software';
import Faq from './component/faqs';
import UserDashboard from './component/userDashboard';
import ForgotPassword from './component/forgotpassword';
import ResetPassword from './component/resetpassword';
import ChangePassword from './component/changepassword';
import AdminDashboard from "./component/AdminDashboard/admin-dashboard";


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/user/resetpassword" component={ResetPassword} />
          <Route exact path="/changepassword" component={ChangePassword} />
          <ProtectedRoute exact path="/dashboard" component={AdminDashboard} />
          <ProtectedRoute exact path="/userdashboard" component={UserDashboard} />
          <ProtectedRoute exact path="/user" component={User} />
          <ProtectedRoute exact path="/faqs" component={Faq} />              
          <ProtectedRoute exact path="/role" component={Roles} />
          <ProtectedRoute exact path="/tickets" component={Ticket} />
          <ProtectedRoute path="/ticket/details" exact component={TicketDetails} />
          <ProtectedRoute exact path="/inventory/hardware" component={HardwareInventory} />
          <ProtectedRoute exact path="/inventory/hardware/:userid" component={HardwareInventory} />
          <ProtectedRoute exact path="/inventory/software" component={SoftwareInventory} />
          <ProtectedRoute exact path="/inventory/software/:userid" component={SoftwareInventory} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
