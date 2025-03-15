import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import NoteCard from '../../components/NoteCard';
import { MdAdd } from "react-icons/md";
import AddEditNotes from '../../components/AddEditNotes';
import axios from 'axios';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]); // State to store filtered notes
    const [loading, setLoading] = useState(true);
    const [currentNote, setCurrentNote] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // State to store search query

    useEffect(() => {
        // Fetch notes from the backend
        const fetchNotes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get-notes', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setNotes(response.data.notes);
                setFilteredNotes(response.data.notes); // Initially set filtered notes to all notes
                setLoading(false);
            } catch (error) {
                console.error('Error fetching notes', error);
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const handleOpenModal = (note = null) => {
        setCurrentNote(note);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentNote(null);
    };

    const handleSaveNote = async (noteData) => {
        try {
            if (currentNote) {
                // Update note
                await axios.put(`http://localhost:8000/update-note/${currentNote._id}`, noteData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setNotes(notes.map(note => (note._id === currentNote._id ? { ...note, ...noteData } : note)));
            } else {
                // Create new note
                const response = await axios.post('http://localhost:8000/add-note', noteData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setNotes([...notes, response.data.note]);
            }
            handleCloseModal();
        } catch (error) {
            console.error('Error saving note', error);
        }
    };

    const handleDeleteNote = async (noteId) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                await axios.delete(`http://localhost:8000/delete-note/${noteId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setNotes(notes.filter(note => note._id !== noteId));
            } catch (error) {
                console.error('Error deleting note', error);
            }
        }
    };

    const handlePinNote = (noteId) => {
        setNotes(notes.map(note =>
            note._id === noteId ? { ...note, isPinned: !note.isPinned } : note
        ));
    };

    // Handle search functionality
    const handleSearch = (query) => {
        console.log('Search Query:', query); // Add console log for debugging
        setSearchQuery(query);
        const filtered = notes.filter(note => 
            note.title.toLowerCase().includes(query.toLowerCase()) || 
            note.content.toLowerCase().includes(query.toLowerCase()) || 
            note.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
        setFilteredNotes(filtered);
    };

    const sortedNotes = [...filteredNotes].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdOn) - new Date(a.createdOn);
    });

    return (
        <>
            <Navbar handleSearch={handleSearch} /> {/* Pass the handleSearch function to Navbar */}

            <button 
                className='bg-blue-500 flex items-center rounded font-semibold text-white p-2 px-4 mt-10 ml-5 md:ml-20 lg:ml-40 hover:bg-blue-700'
                onClick={() => handleOpenModal()}
            >
                <MdAdd size={20} />
                ADD NOTE
            </button>

            {isModalOpen && (
                <>
                    <div
                        onClick={handleCloseModal}
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
                    ></div>

                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <AddEditNotes 
                            onClose={handleCloseModal} 
                            onSave={handleSaveNote}
                            editNote={currentNote}
                        />
                    </div>
                </>
            )}

            {loading ? (
                <div className="flex justify-center mt-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mt-20"></div>
                </div>
            ) : filteredNotes.length === 0 ? (
                <div className="text-center mt-20 text-gray-500">
                    No notes found. Click the "ADD NOTE" button to create your first note.
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-5 md:px-20 lg:px-40 mt-10'>
                    {sortedNotes.map(note => (
                        <NoteCard 
                            key={note._id}
                            title={note.title}
                            date={formatDate(note.createdOn)}
                            content={note.content}
                            tags={note.tags}
                            isPinned={note.isPinned}
                            onEdit={() => handleOpenModal(note)}
                            onDelete={() => handleDeleteNote(note._id)}
                            onPinNote={() => handlePinNote(note._id)}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default Home;
