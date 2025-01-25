import React from 'react';
import { MdClose } from 'react-icons/md';

const AddEditNotes = ({ onClose }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Add Note</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <MdClose size={24} />
        </button>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="w-20">Title</label>
          <input
            type="text"
            placeholder="Add the title"
            className="border px-2 py-1 w-full rounded"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="w-20">Content</label>
          <textarea
            placeholder="Add the content"
            className="border px-2 py-1 w-full rounded"
          ></textarea>
        </div>
        <div>
          <label>TAGS</label>
          <input
            type="text"
            placeholder="Add tags"
            className="border px-2 py-1 w-full rounded"
          />
        </div>
        <button className="w-full bg-blue-500 text-white rounded py-2 mt-4 hover:bg-blue-700">
          ADD
        </button>
      </div>
    </div>
  );
};

export default AddEditNotes;
