
import React, {useEffect }  from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addBookings } from "../utils/bookingSlice";

import axios from 'axios';


const AllBookedEvents = () => {
const bookings = useSelector((store) => store.bookings);
    const dispatch = useDispatch();

    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:3000/admin/view/eventsBooking",{
          withCredentials: true,
        });
        dispatch(addBookings(res.data.data));
        console.log(res.data.data);
  
      }catch (err) {
        // Handle Error Case
        console.error(err);
      }
    };

    useEffect(() => {
    
      fetchBookings();
      }, []);


  return (
    <div>
      
    <h1 className="text-bold text-white text-3xl">All Bookings</h1>
    
     <div className="overflow-x-auto rounded-box border border-base-content/5 bg-pink-500 m-3">

     <table className="table-sm">
<thead>
      <tr>
        <th>Booking Id</th>
        <th>User Id</th>
        <th>User Name</th>
        <th>User Email</th>
        <th>Event Id</th>
        <th>Event Title</th>
        <th>Event location</th>
        <th>Event On</th>
        <th>Event Time</th>
        <th>registration Date</th>
      </tr>
    </thead>
  
    <tbody>

    {Array.isArray(bookings) && bookings.length > 0 ? (
          bookings.map((booking) => (
            
        <tr key={booking._id}>
        <td>{booking._id}</td>
        <td>{booking.userId._id}</td>
        <td>{booking.userId.name}</td>
        <td>{booking.userId.email}</td>
        <td>{booking.eventId._id}</td>
        <td>{booking.eventId.title}</td>
        <td>{booking.eventId.location}</td>
        <td>{new Date(booking.eventId.date).toLocaleDateString()}</td>
        <td>{new Date(booking.eventId.date).toLocaleTimeString()}</td>
        <td>{booking.registrationDate}</td>
      </tr>
      ))):(
        <tr>
            <td colSpan="10" className="text-white text-center">
              No bookings available.
            </td>
          </tr>
      )
    }
    </tbody>
    </table>
    </div>
  
    </div>
    
  )
}

export default AllBookedEvents