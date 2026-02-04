import React, { useState } from 'react';
import { Search, ChevronRight, Edit2, Trash2, ChevronLeft,Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Receiver() {
  const navigate = useNavigate();
  const [receiverName, setReceiverName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;

  const [receiverList, setReceiverList] = useState([
    { id: 1, name: 'INTERESTED' }
  ]);
  const [filteredGroups, setFilteredGroups] = useState([
    { id: 1, name: 'INTERESTED' }
  ]);
  const [editingId, setEditingId] = useState(null);
  
  const totalPages = Math.ceil(filteredGroups.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentGroups = filteredGroups.slice(indexOfFirst, indexOfLast);

  const handleSubmit = () => {
    if (receiverName.trim() !== '') {
      if (editingId) {
        // Update existing record
        const updatedList = receiverList.map(receiver =>
          receiver.id === editingId ? { ...receiver, name: receiverName.toUpperCase() } : receiver
        );
        setReceiverList(updatedList);
        setFilteredGroups(updatedList);
        setEditingId(null);
      } else {
        // Add new record
        const newReceiver = {
          id: receiverList.length > 0 ? Math.max(...receiverList.map(g => g.id)) + 1 : 1,
          name: receiverName.toUpperCase()
        };
        setReceiverList([...receiverList, newReceiver]);
        setFilteredGroups([...receiverList, newReceiver]);
      }
      setReceiverName('');
      setCurrentPage(1);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredGroups(receiverList);
    } else {
      const filtered = receiverList.filter(receiver =>
        receiver.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGroups(filtered);
      setCurrentPage(1);
    }
  };

  const handleEdit = (receiver) => {
    setEditingId(receiver.id);
    setReceiverName(receiver.name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (receiverId) => {
    const updatedList = receiverList.filter(receiver => receiver.id !== receiverId);
    setReceiverList(updatedList);
    setFilteredGroups(updatedList);
    setCurrentPage(1);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            {/* Receiver / Giver Section */}
            <h2 className="page-title">Receiver / Giver</h2>
            
            <div className="filter-section">
              <div className="filter-grid">
                <div className="filter-grid-red">
                  <label className="filter-label">Receiver/ Giver List</label>
                  <input
                    type="text"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    placeholder="Enter name"
                    className="filter-input"
                  />
                </div>
                <div className="btn-container">
                  <button onClick={handleSubmit} className="btn-all">
                    <Send size={18} />  Submit
                  </button>
                </div>
              </div>
            </div>

            {/* Record List Section */}
            <h2 className="page-title">Record List</h2>
            
            <div className="filter-section">
              <div className="filter-grid">
                <div className="filter-grid-green">
                  <label className="filter-label">Search By</label>
                  <input
                    type="text"
                    placeholder="Receiver List"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="filter-input"
                  />
                </div>
                
                <div className="btn-container">
                  <button onClick={handleSearch} className="btn-all">
                    <Search size={18} /> Search
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="master-table-container">
              <div className="master-table-header">
                <span className="master-table-title">Receiver/Giver List</span>
              </div>
              <div className="master-table-body">
                {currentGroups.length > 0 ? (
                  currentGroups.map((receiver, idx) => (
                    <div key={receiver.id} className="master-table-row">
                      <div className="master-table-content">
                        <ChevronRight size={16} style={{ color: '#374151' }} />
                        <span className="master-name-text">{receiver.name}</span>
                      </div>
                      <div className="table-actions">
                        <button
                          onClick={() => handleEdit(receiver)}
                          className="btn-action"
                          title="Edit"
                        >
                          <Edit2 size={18}  />
                        </button>
                        <button
                          onClick={() => handleDelete(receiver.id)}
                          className="btn-action"
                          title="Delete"
                        >
                          <Trash2 size={18} className="text-[#dc2626]" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-data-cell">
                    No records found
                  </div>
                )}
              </div>
            </div>

            {/* Pagination */}
            {filteredGroups.length > rowsPerPage && (
              <div className="pagination-container">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className={`pagination-btn ${
                    currentPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`pagination-page-btn ${
                      currentPage === page ? 'pagination-page-active' : 'pagination-page-inactive'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className={`pagination-btn ${
                    currentPage === totalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
            
            {/* Back Button */}
            <div className="footer-container">
              <button onClick={() => navigate(-1)} className="btn-back">
                <span>←</span>
                <span>Back</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}