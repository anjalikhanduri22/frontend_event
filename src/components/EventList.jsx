import React, { useState, useEffect } from 'react';

import axios from 'axios';
import EventForm from './EventForm';



const EventList = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleEventDelete = (id) => {
		console.log("delete event " + id)
		// Delete an event
		axios.delete(`http://localhost:3000/api/events/${id}`)
			.then(
				() =>
					setEvents(events.filter(event => event._id !== id)))
			.catch(error => console.error(error));
	};

  const handleEditEvent =  (id, updatedTitle, updatedDate) => {
    // Update event by ID
    axios
        .put(`http://localhost:3000/api/events/${id}`, {
            title: updatedTitle,
            date: updatedDate,
        })
        .then((response) => {
            const updatedEvent = events.map((event) =>
                event._id === id ? response.data : event
            );
            setEvents(updatedEvent);
        })
        .catch((error) => console.error("Error updating note:", error));
};

const handleEventAdd = (newEvent) => {
  setEvents([...events, newEvent]);
};

  return (
    

      <div className='flex'>
      

        

      <div className="flex flex-wrap  justify-center">
      
      

      {events.map(event => (
      <div className="card card-border bg-sky-950 basis-xs m-2" key={event._id}>
        <h2 className='mx-5'>Event Name :  {event.title}</h2>
        
        <p className='mx-5'>Event On : {new Date(event.date).toLocaleDateString()}</p>
        <p className='mx-5'>Event Time: {new Date(event.date).toLocaleTimeString()}</p>
        <div className='flex flex-row'>
        <button className="btn btn-xs w-20 p-5 m-5 btn-info" onClick={()=>handleEditEvent(
          event._id,
          prompt("Enter updated title:", event.title),
          prompt("Enter updated date:", event.date)
          
          
        )}>Edit</button>
        <button className="btn btn-xs w-20 p-5 m-5 bg-pink-500" onClick={()=>handleEventDelete(event._id)}>Delete</button> </div>
        

      </div>)
      
        
      )}
      </div>
      </div>
      
    )}


        
      
    
   
  

export default EventList