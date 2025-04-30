import axios from "axios";
import React ,{useEffect} from 'react';
import { addRequests , removeRequests} from '../utils/adminRequestSlice';
import { useDispatch, useSelector } from "react-redux";

export const HandleAdminRequest = () => {
  const adminRequests = useSelector((store) => store.adminRequest);
  const dispatch = useDispatch();



  const fetchRequests = async ()=>{
    try{
      const res = await axios.get("http://localhost:3000/admin/requests/received",{ withCredentials: true });
      dispatch(addRequests(res.data.data));

    }catch(err){
      console.log(err.message);
    }
  }
  useEffect(() => {
      fetchRequests();
    }, []);


    const reviewRequest = async (status, reqId) => {
      try {
        const res = axios.post(
          "http://localhost:3000/request/review/" + status + "/" + reqId,
          {},
          { withCredentials: true }
        );
        dispatch(removeRequests( reqId));
        
        
        
      } catch (err) {}
    };


  return (
    <div className="text-center my-10">
     

      {Array.isArray(adminRequests) && adminRequests.length > 0 ?
      (adminRequests.map(
        (request) => {
        const { _id, fromUserId } =
          request;

          return (
            <div
              key={_id}
              className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
            >
              
              <div className="text-left mx-4 ">
                <h2 className="font-bold text-xl">
                  userId:  {fromUserId._id}
                </h2>
                <h2 className="font-bold text-xl">
                  user Name:  {fromUserId.name}
                </h2>
                <h2 className="font-bold text-xl">
                  user Email:  {fromUserId.email}
                </h2>

                <h2 className="font-bold text-xl">
                  Request Id: {_id}
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
  <h1 className='text-white text-center text-3xl mx-90'>No new  Request received</h1> // Display a message when no bookings are available.
)
}
</div>

  )
}

export default HandleAdminRequest;