import Home from './pages/Home';
import Employees from './pages/Employees';
import DeletedEmployees from './pages/DeletedEmployees';

const routes = [
  {
    path: '/',
    element: <Home />,
    loader: () => Promise.resolve({data: "dummyDataForHome"}),
    name: 'Home'
  },
  {
    path: '/employees',
    element: <Employees />,
    loader: () => Promise.resolve({data: "dummyDataForEmployees"}),
    name: 'Employees',
  },
  {
    path: '/deleted',
    element: <DeletedEmployees deletedEmployees={[]} />,
    loader: () => Promise.resolve({data: "dummyDataForDeletedEmployees"}),
    name: 'Deleted Employees',
  }
];

export default routes;