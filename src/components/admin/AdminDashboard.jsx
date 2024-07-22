import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/applications")
      .then((res) => setApplications(res.data))
      .catch((err) => alert(err));
  }, []);
  return (
    <div className="w-full h-screen  p-4">
      <div className="w-full  flex flex-col md:flex-row items-center justify-evenly space-y-4  mt-[10%]">
        <div className="w-full md:w-[350px] h-32 text-xl font-semibold flex items-center justify-center border border-primary rounded-md">
          Total Applications: {applications.length}
        </div>
        <div className="w-full md:w-[350px] h-32 text-xl font-semibold flex items-center justify-center border border-primary rounded-md">
          Total Accepted Applications: 9
        </div>
        <div className="w-full md:w-[350px] h-32 text-xl font-semibold flex items-center justify-center border border-primary rounded-md">
          Total Rejected Applications: 90
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
