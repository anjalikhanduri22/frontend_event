import React from 'react';
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEventRequests, removeEventRequest } from '../utils/eventRequestSlice';
import {addBookings} from "../utils/bookingSlice";

const HandleEventRequest = () => {

  const eventRequests = useSelector((store) => store.eventRequests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/view/pending/eventBookings", {
        withCredentials: true,
      });
      dispatch(addBookings(res.data.data));
      dispatch(addEventRequests(res.data.data));
      
    } catch (err) {
      // Handle Error Case
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);


  const reviewRequest = async (status, regId) => {
    try {
      const res = axios.post(
        "http://localhost:3000/event/review/" + status + "/" + regId,
        {},
        { withCredentials: true }
      );
     
      dispatch(removeEventRequest(regId));
      
      
    } catch (err) {}
  };
  
  if (!eventRequests) return;

  if (eventRequests.length === 0) return <h1 className='text-center'> No Request Found</h1>;




  return (
    
      <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Event Requests</h1>

      {Array.isArray(eventRequests) && eventRequests.length > 0 ?(
      eventRequests.map((request) => {
        const { _id, userId, eventId } =
          request;

          return (
            <div
              key={_id}
              className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
            >
              
              <div className="text-left mx-4 ">
                <h2 className="font-bold text-xl">
                  userId:  {userId._id}
                </h2>
                <h2 className="font-bold text-xl">
                  user Name:  {userId.name}
                </h2>
                <h2 className="font-bold text-xl">
                  user Email:  {userId.email}
                </h2>

                <h2 className="font-bold text-xl">
                  eventId: {eventId._id}
                </h2>
                <h2 className="font-bold text-xl">
                  event title: {eventId.title}
                </h2>
                <h2 className="font-bold text-xl">
                  event date: {eventId.date}
                </h2>

                 
              </div>

              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>

    </div>
  )
})):(
  <h1 className='text-white text-center text-3xl mx-90'>No new  Request received</h1> // Display a message when no event requests are available.
)
}
</div>
  )
}

export default HandleEventRequest;