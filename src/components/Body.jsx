import React from 'react';
import EventList from './EventList';

const Body = () => {

  return (

    <div >
      <div className="flex justify-between">
              <h1 className="font-serif text-2xl text-shadow-sm font-bold text-pink-800 border p-2 bg-sky-950 ">EventScheduler</h1>
              <h1 className='font-serif text-xl justify-items-center mr-90 font-bold text-sky-950'>All Events</h1>
      
              </div>

              <EventList />



    </div>
  )
}

export default Body