import React, {useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addEvents } from "../utils/eventSlice";
import axios from 'axios';

const EventList = () => {

  const events = useSelector((store) => store.events);
  const dispatch = useDispatch();

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

if (!events) return;

  if (events.length === 0) return <h1> No events Found</h1>;

  return (
  
      <div className='flex'>
      <div className="flex flex-wrap  justify-center">
      <h1 className="text-bold text-white text-3xl">All Events</h1>

      {events.map((event) => {
        const { _id, imageUrl,title, date, description, location } =
          event;

          return  (
      <div className="card card-border bg-sky-950 basis-xs m-2" key={_id}>
        <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={imageUrl}
              />
            </div>
            <h2 className='mx-5'>Event Title :  {title}</h2>
        <h2 className='mx-5'>Event description :  {description}</h2>
        
        
        <p className='mx-5'>Event On : {new Date(date).toLocaleDateString()}</p>
        <p className='mx-5'>Event Time: {new Date(date).toLocaleTimeString()}</p>
        <h2 className='mx-5'>Event location :  {location}</h2>
        
        

      </div>)
      
        
      })
    }
      </div>
      </div>
      
    )
  }


        
      
    
   
  

export default EventList