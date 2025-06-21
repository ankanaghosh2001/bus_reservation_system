import './App.css'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import SeatBookingPage from './components/SeatBookingPage';
import UserProfile from './components/UserProfile';

function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Navbar/><LandingPage/><Footer/></>
    },
    {
      path: '/aboutUs',
      element: <><Navbar/><AboutUs/><Footer/></>
    },
    {
      path: '/contactUs',
      element: <><Navbar/><ContactUs/><Footer/></>
    },
    {
      path: '/seat-booking',
      element: <><Navbar/><SeatBookingPage/><Footer/></>
    },
    {
      path: '/user/:username',
      element: <><Navbar/><UserProfile /><Footer/></>
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
