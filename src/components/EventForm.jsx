import React,{ useState } from 'react';
import axios from 'axios';

const EventForm = ({ onEventAdd }) => {

  const[title,setTitle] = useState("");
  const[date,setDate] = useState("");
  


    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Create a new event
      axios.post('http://localhost:3000/api/events',
        {
          title,
          date
          

      })
        .then(response => {
          onEventAdd(response.data);
          setTitle("");
          setDate("");
          
          window.location.reload();
        })
        .catch(error => console.error(error));
    };

  return (
    <div className="flex my-10 mx-10 px-10">
      
    
      <div className="card card-border bg-sky-950 w-90 m-5">
  <div className="card-body">
    <h2 className="card-title justify-center">Add New Events</h2>

    <fieldset className="fieldset">
  <legend className="fieldset-legend">Enter Event Title</legend>
  <input type="text" className="input" placeholder="Type here" value={title} onChange={(e)=>setTitle(e.target.value)}  />

  <legend className="fieldset-legend">Enter Event Date and Time</legend>
  <input type="datetime-local" className="input" value={date} onChange={(e)=>setDate(e.target.value)}  />

  
 
</fieldset>
    
    <div className="card-actions ">
      <button className="btn bg-pink-500 w-80 mt-5" onClick={handleSubmit}>Add Event</button>
    </div>
  </div>
</div>

    </div>
  )
}

export default EventForm;