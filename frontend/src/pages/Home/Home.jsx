import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import NoteCard from '../../components/NoteCard'
import { MdAdd } from "react-icons/md"
import AddEditNotes from '../../components/AddEditNotes'

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
        <Navbar/>

        <button className='bg-blue-500 flex items-center rounded font-semibold text-white p-2 px-4 mt-10 ml-5 md:ml-20 lg:ml-40 hover:bg-blue-700'  onClick={handleOpenModal}>
            <MdAdd size={20}/>
            ADD NOTE
        </button>

        {isModalOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={handleCloseModal}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          ></div>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <AddEditNotes onClose={handleCloseModal} />
          </div>
        </>
      )}

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-5 md:px-20 lg:px-40 mt-10'>
            <NoteCard 
                title="Meeting on 12th February"
                date="12-02-2025"
                content="Discussing the SDGP project implementation phase and the member issues"
                tags="#meeting"
                isPinned={true}
                onEdit={() => {}}
                onDelete={() => {}}
                onPinNote={() => {}}
            />
            <NoteCard 
                title="Meeting on 12th February"
                date="12-02-2025"
                content="Discussing the SDGP project implementation phase and the member issues"
                tags="#meeting"
                isPinned={true}
                onEdit={() => {}}
                onDelete={() => {}}
                onPinNote={() => {}}
            />
            <NoteCard 
                title="Meeting on 12th February"
                date="12-02-2025"
                content="Discussing the SDGP project implementation phase and the member issues"
                tags="#meeting"
                isPinned={true}
                onEdit={() => {}}
                onDelete={() => {}}
                onPinNote={() => {}}
            />
            <NoteCard 
                title="Meeting on 12th February"
                date="12-02-2025"
                content="Discussing the SDGP project implementation phase and the member issues"
                tags="#meeting"
                isPinned={true}
                onEdit={() => {}}
                onDelete={() => {}}
                onPinNote={() => {}}
            />
            <NoteCard 
                title="Meeting on 12th February"
                date="12-02-2025"
                content="Discussing the SDGP project implementation phase and the member issues"
                tags="#meeting"
                isPinned={true}
                onEdit={() => {}}
                onDelete={() => {}}
                onPinNote={() => {}}
            />
            <NoteCard 
                title="Meeting on 12th February"
                date="12-02-2025"
                content="Discussing the SDGP project implementation phase and the member issues"
                tags="#meeting"
                isPinned={true}
                onEdit={() => {}}
                onDelete={() => {}}
                onPinNote={() => {}}
            />
        
        </div>
       
    </>
  )
}

export default Home