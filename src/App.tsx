import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

import ProductList from 'pages/ProductList';

import './App.css';

const App = () => {
  let routes = useRoutes([
    {
      path: '/',
      element: <ProductList />,
    },
  ]);

  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
