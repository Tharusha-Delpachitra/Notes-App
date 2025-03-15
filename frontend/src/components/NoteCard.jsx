import React from 'react';
import { MdPushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({ title, date, content, tags = [], isPinned, onEdit, onDelete, onPinNote }) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex flex-col items-start gap-3">
        <MdPushPin
          className={`cursor-pointer ${isPinned ? 'text-blue-600' : 'text-gray-400'}`}
          onClick={onPinNote}
        />
        
        <div>
          <h1 className="text-sm font-medium">{title}</h1>
          <h1 className="text-xs text-slate-500">{date}</h1>
        </div>
        
        <p className="text-sm">{content}</p>
        
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row gap-1 flex-wrap">
            {tags && tags.length > 0 ? (
              tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500">No tags</span>
            )}
          </div>
          <div className="flex flex-row items-center gap-2">
            <MdCreate
              className="hover:text-green-500 cursor-pointer"
              onClick={onEdit}
            />
            <MdDelete
              className="hover:text-red-500 cursor-pointer"
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;