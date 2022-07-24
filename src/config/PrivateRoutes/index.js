import Roles from '../Roles'
import AdminDashboard from '../../component/AdminDashboard/admin-dashboard'
import User from '../../component/user'
import Ticket from '../../component/tickets';
import Login from '../../component/Login';
import RolesComponent from '../../component/roles'
import UserDashboard from '../../component/userDashboard';
import SoftwareInventory from '../../component/inventory/software';
import HardwareInventory from '../../component/inventory/hardware';
import TicketDetails from '../../component/ticketDetails';
import Faqs from '../../component/Faqs';
import UsefulInformation from '../../component/UsefulInformation';

export default [
 {
  component: Login,
  path: '/',
  title: 'Login',
  exact: true,
  permission: [
    Roles.ADMIN,
    Roles.SUPPORT,
    Roles.USER,
  ],
 },
 {
  component: AdminDashboard,
  path: '/dashboard',
  title: 'Dashboard',
  exact: true,
  permission: [
   Roles.ADMIN,
  ],
 },
 {
  component: Ticket,
  path: '/tickets',
  title: 'Tickets',
  exact: true,
  permission: [
   Roles.ADMIN,
   Roles.SUPPORT,
   Roles.USER,
  ],
  },
 {
  component: TicketDetails,
  path: '/ticket/details',
  title: 'Ticket Details',
  exact: true,
  permission: [
   Roles.ADMIN,
   Roles.SUPPORT,
  ],
  },
 {
  component: SoftwareInventory,
  path: '/inventory/software',
  title: 'Software Inventory',
  exact: true,
  permission: [
   Roles.ADMIN,
   Roles.SUPPORT,
   Roles.USER,
  ],
  },
 {
  component: SoftwareInventory,
  path: '/inventory/software/:userid',
  title: 'Software Inventory',
  exact: true,
  permission: [
   Roles.ADMIN,
   Roles.SUPPORT,
   Roles.USER,
  ],
  },
 {
  component: HardwareInventory,
  path: '/inventory/hardware',
  title: 'Hardware Inventory',
  exact: true,
  permission: [
   Roles.ADMIN,
   Roles.SUPPORT,
   Roles.USER,
  ],
  },
 {
  component: HardwareInventory,
  path: '/inventory/hardware/:userid',
  title: 'Hardware Inventory',
  exact: true,
  permission: [
   Roles.ADMIN,
   Roles.SUPPORT,
   Roles.USER,
  ],
  },
  {
  component: User,
  path: '/user',
  title: 'Users',
  exact: true,
  permission: [
   Roles.ADMIN,
  ],
  },
  {
  component: RolesComponent,
  path: '/role',
  title: 'Roles',
  exact: true,
  permission: [
   Roles.ADMIN,
  ],
  },
  {
  component: Faqs,
  path: '/faqs',
  title: 'Faqs',
  exact: true,
  permission: [
   Roles.ADMIN,
   Roles.USER,
  ],
  },
  {
  component: UsefulInformation,
  path: '/useful-information',
  title: 'Use Information',
  exact: true,
  permission: [
   Roles.ADMIN,
   Roles.USER,
  ],
  },
  {
   component: UserDashboard,
   path: '/userdashboard',
   title: 'Dashboard',
   exact: true,
   permission: [
    Roles.USER,
   ],
  },
];