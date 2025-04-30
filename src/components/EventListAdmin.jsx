import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addEvents } from "../utils/eventSlice";
import { removeEvents } from '../utils/eventSlice';

import axios from 'axios';

const EventListAdmin = () => {

  const events = useSelector((store) => store.events);
  const dispatch = useDispatch();
  

  //1...fetch all events

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/events",{
        withCredentials: true,
      });
      dispatch(addEvents(res.data));

    }catch (err) {
      // Handle Error Case
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);


// 2...Delete an event

  const handleEventDelete = async (_id) => {
    console.log("delete event " + _id)
    try{
    const res = await axios.delete("http://localhost:3000/" + _id,{ withCredentials: true });
        dispatch(removeEvents(_id));
    }
    catch (err) {console.error(err)};
  };


//3....edit an event

  const handleEditEvent =  async (_id, newTitle, newDate, newLocation, newDescription) => {
    try{
      const res = await axios.put("http://localhost:3000/" + _id, {
        title: newTitle,
        date: newDate,
        location: newLocation,
        description: newDescription,
      },
      { withCredentials: true });
      dispatch(addEvents(res?.data));
      fetchEvents();
    }
     catch(error) { console.error("Error updating note:", error)
      
     };
};



if (!events) return;

  if (events.length === 0) return <h1> No events Found</h1>;


  return (
    <>
    <h1 className="text-bold text-center  text-3xl text-pink-500">All Events</h1>
  
      <div className='flex'>
       
      <div className="flex flex-wrap  justify-center">
      

      {Array.isArray(events) && events.length > 0 ?(
      events.map((event) => {
        const { _id, imageUrl,title, date,  description,location } =
          event;

          return  (
      <div className="card card-border bg-sky-950 basis-xs m-2" key={_id}>
        <div>
              <img
                alt="photo"
                className="w-80 h-50  object-cover"
                src={imageUrl}
              />
            </div>
            
        <h2 className='mx-5'>Event Title :  {title}</h2>
        <h2 className='mx-5'>Event description :  {description}</h2>
        
        <p className='mx-5'>Event On : {new Date(date).toLocaleDateString()}</p>
        <p className='mx-5'>Event Time: {new Date(date).toLocaleTimeString()}</p>
        <h2 className='mx-5'>Event location :  {location}</h2>



         
        <div className="flex flex-row">
    <button
      className="btn btn-xs w-20 p-5 m-5 btn-info"
      onClick={() => {
        const newTitle = prompt("Enter Title:", event.title);
        const newDate = prompt("Enter Date:", event.date);
        const newLocation = prompt("Enter Location:", event.location);
        const newDescription = prompt("Enter Description:", event.description);

        if (newTitle && newDate && newLocation && newDescription) {
          handleEditEvent(event._id, newTitle, newDate, newLocation, newDescription);
        }
      }}
    >
      Edit
    </button>

        <button className="btn btn-xs w-20 p-5 m-5 bg-pink-500" onClick={()=>handleEventDelete(event._id)}>Delete</button> </div>
        

      </div>)
      
        
      })):(
        <h1 className='text-white text-center text-3xl mx-90'>no events</h1> // Display a message when no event requests are available.
      )
    }
      </div>
      </div>
     
      </>
    )
  }

export default EventListAdmin;