import React, { useState } from 'react';
import { MdClose, MdAdd } from 'react-icons/md';

const AddEditNotes = ({ onClose, onSave, editNote = null }) => {
  const [title, setTitle] = useState(editNote?.title || '');
  const [content, setContent] = useState(editNote?.content || '');
  const [tags, setTags] = useState(editNote?.tags || []);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Title is required');
      return;
    }
    if (!content.trim()) {
      alert('Content is required');
      return;
    }

    onSave({
      title,
      content,
      tags
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{editNote ? 'Edit Note' : 'Add Note'}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <MdClose size={24} />
        </button>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-medium">Title</label>
          <input
            type="text"
            placeholder="Add the title"
            className="border px-2 py-1 w-full rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="font-medium">Content</label>
          <textarea
            placeholder="Add the content"
            className="border px-2 py-1 w-full rounded min-h-24"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="font-medium">Tags</label>
          
          {/* Tag Input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add tags"
              className="border px-2 py-1 w-full rounded"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagInputKeyPress}
            />
            <button 
              onClick={handleAddTag}
              className="bg-blue-500 text-white rounded px-3 flex items-center justify-center hover:bg-blue-600"
            >
              <MdAdd size={20} />
            </button>
          </div>
          
          {/* Tags Display */}
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <div key={index} className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full flex items-center">
                {tag}
                <MdClose 
                  className="ml-1 cursor-pointer" 
                  onClick={() => handleRemoveTag(tag)}
                  size={16}
                />
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={handleSave}
          className="w-full bg-blue-500 text-white rounded py-2 mt-4 hover:bg-blue-600"
        >
          {editNote ? 'UPDATE' : 'ADD'}
        </button>
      </div>
    </div>
  );
};

export default AddEditNotes;