import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const DormForm = ({ onClose, dormData, initialData }) => {
  const [dorm, setDorm] = useState({
    name: "",
    rental: "",
    capacity: "",
    rooms: "",
    availableBeds: "",
    occupants: null, // Default value
    location: null, // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDorm({
      ...dorm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dormData(dorm);
    setDorm({
      name: "",
      rental: "",
      capacity: "",
      rooms: "",
      availableBeds: "",
      occupants: "", // Reset to default
      location: "", // Reset to default
    });
    onClose();
  };
  useEffect(() => {
    if (initialData) {
      setDorm(initialData);
    }
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit} className="text-primary w-[500px] px-4">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-2xl">
          {initialData ? "Edit" : "Add"} Dorm
        </span>
        <MdClose
          onClick={onClose}
          className="text-gray-600 cursor-pointer"
          size={24}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Dorm Name
        </label>
        <input
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter Dorm Name"
          name="name"
          value={dorm.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Monthly Rental
        </label>
        <input
          type="number"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter Monthly Rental"
          name="rental"
          value={dorm.rental}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Bed Capacity
        </label>
        <input
          type="number"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter Bed Capacity"
          name="capacity"
          value={dorm.capacity}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          No. of Rooms
        </label>
        <input
          type="number"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter Number of Rooms"
          name="rooms"
          value={dorm.rooms}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Available Beds
        </label>
        <input
          type="number"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter Available Beds"
          name="availableBeds"
          value={dorm.availableBeds}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Occupants
        </label>
        <select
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          name="occupants"
          value={dorm.occupants}
          onChange={handleChange}
        >
          <option disabled selected>
            Select Dorm Occupants Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <select
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          name="location"
          value={dorm.location}
          onChange={handleChange}
        >
          <option disabled selected>
            Select Dorm Location
          </option>
          <option value="Upper Campus">Upper Campus</option>
          <option value="Lower Campus">Lower Campus</option>
        </select>
      </div>
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-opacity-80"
        >
          Add Dorm
        </button>
      </div>
    </form>
  );
};

export default DormForm;
