import axios from "axios";
import React, { useEffect, useState } from "react";

const DormApplications = () => {
  const [dorms, setDorms] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/dorms")
      .then((res) => setDorms(res.data))
      .catch((err) => alert(err));
  });
  const handleApplication = (dorm) => {
    console.log(dorm);
  };

  return (
    <div className="w-full h-full mx-auto">
      <div className="mt-20 w-full md:w-[90%] h-fit mx-auto shadow-lg border border-primary rounded-md px-4">
        <div className="flex justify-between items-center p-4 border-b border-primary">
          <h2 className="text-primary font-bold text-2xl">Dormitories</h2>
        </div>
        <div className="w-full overflow-x-auto">
          <ul className="flex justify-between py-4 text-center w-full font-bold">
            <li className="md:w-[20%]">Dormitory</li>
            <li className="md:w-[20%]">Monthly Rental</li>
            <li className="md:w-[20%]">Bed Capacity</li>
            <li className="md:w-[20%]">No. of Rooms</li>
            <li className="md:w-[20%]">Available Rooms</li>
            <li className="md:w-[20%]">Occupants</li>
            <li className="md:w-[20%]">Location</li>
            <li className="md:w-[20%]">Action</li>
          </ul>

          {dorms.length === 0 ? (
            <div className="w-full text-center py-4 text-xl text-primary">
              No Data Available
            </div>
          ) : (
            dorms.map((dorm) => (
              <ul
                className="flex justify-between py-4 text-center w-full"
                key={dorm.id}
              >
                <li className="md:w-[20%]">{dorm.name}</li>
                <li className="md:w-[20%]">{dorm.rental}</li>
                <li className="md:w-[20%]">{dorm.capacity}</li>
                <li className="md:w-[20%]">{dorm.rooms}</li>
                <li className="md:w-[20%]">{dorm.availableBeds}</li>
                <li className="md:w-[20%]">{dorm.occupants}</li>
                <li className="md:w-[20%]">{dorm.location}</li>
                <li className="md:w-[20%] flex justify-evenly items-center">
                  <button
                    onClick={() => handleApplication(dorm)}
                    className="px-4 py-3 rounded-md font-semibold bg-primary text-white"
                  >
                    Apply
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

export default DormApplications;
