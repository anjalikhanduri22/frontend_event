import React,{ useState } from 'react';
import axios from 'axios';
import { addEvents } from '../utils/eventSlice';
import { useDispatch, useSelector } from "react-redux";

const EventForm = () => {
  const events = useSelector((store) => store.events);
      const dispatch = useDispatch();
  

  const[title,setTitle] = useState("");
  const[date,setDate] = useState("");
  const[description, setDescription] = useState("");
  const [location,setLocation]= useState("");
  const [imageUrl,setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);


    const handleSubmit = async (e) => {
      setError("");
      e.preventDefault();
  
      // Create a new event
      const res = await axios.post('http://localhost:3000/admin/event',
        {
          title,
          date,
          description,
          location,
          imageUrl,
      },{
        withCredentials: true,
      })
        .then(response => {
          dispatch(addEvents(response.data.data));
          setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
          setTitle("");
          setDate("");
          setDescription("");
          setLocation("");
          
          
          
        }
      )
        .catch(err => setError(err.response.data));
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

  <legend className="fieldset-legend">Enter Description</legend>
  <input type="text" className="input" value={description} onChange={(e)=>setDescription(e.target.value)}  />

  <legend className="fieldset-legend">Enter location</legend>
  <input type="text" className="input" value={location} onChange={(e)=>setLocation(e.target.value)}  />

  <legend className="fieldset-legend">Enter photoUrl</legend>
  <input type="text" className="input input-bordered w-full max-w-xs" 
  value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)}  />

  
 
</fieldset>

<p className="text-red-500">{error}</p>
    <div className="card-actions ">
      <button className="btn bg-pink-500 w-80 mt-5" onClick={handleSubmit}>Add Event</button>
    </div>
  </div>
</div>

{showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>New Event Added  successfully.</span>
          </div>
        </div>
      )}

    </div>
  )
}

export default EventForm;