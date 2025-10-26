import React from "react";

const AddBanner = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold text-[#7B542F] mb-4">Add Banners</h1>
      <form className="bg-white p-5 rounded-lg shadow-md border border-gray-200 space-y-4">
        <input type="text" placeholder="Banner Title" className="border p-2 w-full rounded-md"/>
        <input type="file" className="border p-2 w-full rounded-md"/>
        <button className="bg-[#7B542F] text-white px-5 py-2 rounded-md hover:bg-[#6b4523]">
          Upload Banner
        </button>
      </form>
    </div>
  );
};

export default AddBanner;
