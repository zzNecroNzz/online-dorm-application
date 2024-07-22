import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-modal";
import DormForm from "./DormForm";

const ManageDorms = () => {
  const [dorms, setDorms] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentDorm, setCurrentDorm] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/dorms")
      .then((res) => setDorms(res.data))
      .catch((err) => alert(err));
  }, []); // Fetch dorms on initial render only

  const handleModalClick = () => {
    setIsOpen(!isOpen);
    setCurrentDorm(null);
  };

  const appendDorm = (newData) => {
    if (currentDorm) {
      axios
        .put("http://localhost:8000/dorms/" + currentDorm.id, newData)
        .then((res) => {
          setDorms(
            dorms.map((dorm) => (dorm.id === currentDorm.id ? res.data : dorm))
          );
          alert("Dorm was updated successfully!");
        });
    } else {
      axios
        .post("http://localhost:8000/dorms", newData)
        .then((res) => {
          setDorms([...dorms, res.data]);
          alert("Dorm has been added!");
        })
        .catch((err) => alert(err));
    }
    handleModalClick(); // Close modal after adding dorm
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/dorms/${id}`)
      .then((res) => {
        setDorms(dorms.filter((dorm) => dorm.id !== id));
        alert("Dorm has been deleted!");
      })
      .catch((err) => alert(err));
  };

  const handleEdit = (dorm) => {
    setCurrentDorm(dorm);
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full h-full mx-auto">
      <div className="mt-20 w-full md:w-[90%] h-fit mx-auto shadow-lg border border-primary rounded-md px-4">
        <div className="flex justify-between items-center p-4 border-b border-primary">
          <h2 className="text-primary font-bold text-2xl">Dormitories</h2>
          <button
            onClick={handleModalClick}
            className="hover:bg-primary hover:text-white transition-all ease-in-out duration-300 flex items-center text-primary font-semibold border border-primary p-2 rounded-md"
          >
            <MdAdd size={20} />
            <span className="text-lg font-semibold">Add Dorm</span>
          </button>
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
                  <MdEdit
                    size={25}
                    className="text-blue-600 cursor-pointer"
                    onClick={() => handleEdit(dorm)}
                  />
                  <MdDelete
                    size={25}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(dorm.id)}
                  />
                </li>
              </ul>
            ))
          )}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleModalClick}
        className="fixed inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-primary rounded-md p-4 w-fit h-fit"
        overlayClassName="fixed inset-0 backdrop-blur-sm"
      >
        <DormForm
          onClose={handleModalClick}
          dormData={appendDorm}
          initialData={currentDorm}
        />
      </Modal>
    </div>
  );
};

export default ManageDorms;
