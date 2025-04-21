import React from 'react'
import { Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Admin Dashboard</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><a>Link</a></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
            <li><Link to ="/admin/addevent">Add events</Link></li>
            <li><Link to ="/admin/showevents">All Events</Link></li>
            <li><Link to ="/admin/showbookings">Show Bookings</Link></li>
            <li><Link to ="/admin/showcustomers">view Customer</Link></li>
            <li><Link to ="/logout">Logout</Link></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>
<Outlet />
    </div>
  )
}

export default AdminDashboard