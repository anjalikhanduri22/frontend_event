import React,{ useState } from 'react';
import axios from 'axios';

const EventForm = ({ onEventAdd }) => {

  const [newEvent, setNewEvent] =
		useState({ title: '', date: '', reminder: false });

    const handleInputChange = (e) => {
      setNewEvent(
        {
          ...newEvent,
          [e.target.name]: e.target.value
        }
      );
    };
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Create a new event
      axios.post('http://localhost:3000/api/events', newEvent)
        .then(response => {
          onEventAdd(response.data);
          setNewEvent({ title: '', date: '', reminder: false });
        })
        .catch(error => console.error(error));
    };

  return (
    <div className="flex justify-center my-10">
      
    
      <div className="card card-border bg-blue-500 w-96 m-5">
  <div className="card-body">
    <h2 className="card-title">Event management App</h2>

    <fieldset className="fieldset">
  <legend className="fieldset-legend">Title</legend>
  <input type="text" className="input" placeholder="Type here" value={newEvent.title} onChange={handleInputChange} required />

  <legend className="fieldset-legend">Enter Date</legend>
  <input type="date" className="input" value={newEvent.date} onChange={handleInputChange} required />
 
</fieldset>
    
    <div className="card-actions ">
      <button className="btn bg-pink-500 w-80 mt-2" onSubmit={handleSubmit}>Add Event</button>
    </div>
  </div>
</div>

    </div>
  )
}

export default EventForm;