import axios from "axios";
import React, { useEffect, useState } from "react";

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/applications")
      .then((res) => {
        setApplications(res.data);
      })
      .catch((err) => alert(err));
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
    console.log("refreshed");
  };
  return (
    <div className="w-full h-full mx-auto">
      <div className="mt-20 w-full md:w-[90%] h-fit mx-auto shadow-lg border border-primary rounded-md p-4">
        <div className="border-b border-primary w-full py-4 flex justify-between px-4">
          <span className="text-primary text-xl font-bold px-4 ">
            Applications
          </span>

          <div onClick={handleRefresh} className="cursor-pointer ">
            <span className="p-2 text-lg  rounded-md px-4 bg-primary text-white">
              refresh
            </span>
          </div>
        </div>
        <div className="overflow-x-auto p-4">
          <ul className="w-full flex text-center space-x-2 font-bold">
            <li className="w-[30%]">Student Name</li>
            <li className="w-[30%]">Dorm Name</li>
            <li className="w-[20%]">Available Beds</li>
            <li className="w-[30%]">Action</li>
          </ul>
          {applications.length === 0 ? (
            <div> </div>
          ) : (
            applications.map((application) => (
              <ul className="w-full flex text-center space-x-2 mt-4">
                <li className="w-[30%]">{application.student_name}</li>
                <li className="w-[30%]">{application.dorm_name}</li>
                <li className="w-[20%]">{application.availableBeds}</li>
                <li className="w-[30%] space-x-4">
                  <button className="px-4 py-2 bg-primary rounded-md text-white">
                    Accept
                  </button>
                  <button className="px-4 py-2 bg-red-600 rounded-md text-white">
                    Decline
                  </button>
                </li>
              </ul>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageApplications;
