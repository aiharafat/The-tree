import { createBrowserRouter } from 'react-router-dom';
import Mainlayouts from './components/layouts/Mainlayouts';  // Import Mainlayouts
import Home from './components/ui/pages/home';  // Import your Home component
import Family from './components/ui/pages/Family';
import ErrorElement from './components/ErrorElement'; // Import ErrorElement
import Election from './components/ui/pages/Election';
import News from './components/ui/pages/News';
import Airdrop from './components/ui/pages/Airdrop';
import infoPage from './components/ui/pages/infoPage';
const MainRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayouts />,    // The main layout component
    errorElement: <ErrorElement />, // Error component when route fails
    children: [
      {
        index: true,
        path: 'Home',
        element: <Home />, 
              
      },
      {
        path: 'Family',
        element: <Family />,

      },
      {
        path: 'News',
        element: <News />
      },
      {
        path: 'Election',
        element: <Election />
      }, 
      {
        path: 'Airdrop',
        element: <Airdrop />
      },
      {
        path: 'infoPage',
        element: <infoPage />
      }

    ],
  },
]);

export default MainRoutes;
