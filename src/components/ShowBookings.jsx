import React,{useEffect }  from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addBookings } from "../utils/bookingSlice";

import axios from 'axios';

const ShowBookings = () => {

  const bookings = useSelector((store) => store.bookings);
    const dispatch = useDispatch();

    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/view/allevents",{
          withCredentials: true,
        });
        dispatch(addBookings(res.data.data));
  
      }catch (err) {
        // Handle Error Case
        console.error(err);
      }
    };

    useEffect(() => {
    
      fetchBookings();
      }, []);

  return (
  
    <div className='flex'>
    <div className="flex flex-wrap  justify-center">
    
    {Array.isArray(bookings) && bookings.length > 0 ? (
          bookings.map((booking) => {
            const { _id, eventId, status, registrationDate } = booking;
            console.log(booking);
  
        return  (
    <div className="card card-border bg-sky-950 basis-xs m-2" key={_id}>
      
      <h2 className='mx-5'>Event Title :  {eventId.title}</h2>
      <h2 className='mx-5'>Event status :  {status}</h2>
      <p className='mx-5'>Event On : {new Date(eventId.date).toLocaleDateString()}</p>
      <p className='mx-5'>Event Time: {new Date(eventId.date).toLocaleTimeString()}</p>
      <h2 className='mx-5'>registration Date  :  {registrationDate}</h2>
  
    </div>)
    
      
    })):(
      <h1 className='text-white text-center text-3xl mx-90'>No bookings available.</h1> // Display a message when no bookings are available.
    )}
  
    </div>
    </div>
    
  )
}

export default ShowBookings