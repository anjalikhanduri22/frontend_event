
import React from 'react';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import Login from "./components/Login";
import ShowBookings from './components/ShowBookings';
import ShowCustomers from './components/ShowCustomers';
import EventCard from './components/EventCard';
import Logout from './components/Logout';
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const App = () => {

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
    <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/logout" element={<Logout />} />

      <Route path ="/admin" element={<AdminDashboard />}>
      <Route path ="/admin/addevent" element={<EventForm />}></Route>

      <Route path ="/admin/showevents"  element ={<EventList />} />
      <Route path ="/admin/showbookings" element ={<ShowBookings /> } />
      <Route path ="/admin/showcustomers" element ={ <ShowCustomers />} />
    
      </Route>

      <Route path ="/user" element={<UserDashboard />}>
      <Route path="/user/events" element={<EventList />} />
      <Route path="/user/bookings" element={<ShowBookings />} />
      <Route path="/user/events/:targetEventId" element={<EventCard />} />
      
      </Route>
      

      

      

      
    </Routes>
    </BrowserRouter>
    </Provider>
    
    </>
  )
}

export default App
