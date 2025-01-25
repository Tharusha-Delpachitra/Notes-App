import React from 'react'
import { MdPushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote}) => {
  return (
    <div className="border rounded p-4 bg-whie hover:shadow-xl transition-all ease-in-out">
      <div className="flex flex-col items-start gap-3">
        <MdPushPin
          className="text-blue-600 cursor-pointer"
          onClick={onPinNote}
        />

        <div>
          <h1 className="text-sm font-medium">{title}</h1>
          <h1 className="text-xs text-slate-500">{date}</h1>
        </div>

        <p className="text-sm">{content}</p>

        <div className="flex flex-row justify-between items-center w-full">
         
          <div className="text-xs text-slate-500 truncate">{tags}</div>

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
}

export default NoteCard