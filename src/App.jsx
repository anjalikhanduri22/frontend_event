
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
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import EventListAdmin from "./components/EventListAdmin";
import AllBookedEvents from './components/AllBookedEvents';

const App = () => {
  

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter >
    <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/login" element={<Login />} />
       

      <Route path ="/admin" element={<AdminDashboard />}>
      <Route path ="/admin/addevent" element={<EventForm />}></Route>
      <Route path ="/admin/allEvents" element={<EventListAdmin />}></Route>
      <Route path ="/admin/showBookedEvents" element ={ <AllBookedEvents />} />
      
      <Route path ="/admin/showcustomers" element ={ <ShowCustomers />} />
    
      </Route>

      <Route path ="/user" element={<UserDashboard />}>
      <Route path="/user/events/all" element={<EventList />} />
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
