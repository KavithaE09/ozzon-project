import React, { useState } from 'react';
import { Search, ChevronRight, Edit2, Trash2, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Supervisor() {
  const navigate = useNavigate();
  const [supervisorName, setSupervisorName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;

  const [supervisorList, setSupervisorList] = useState([
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
    if (supervisorName.trim() !== '') {
      if (editingId) {
        // Update existing record
        const updatedList = supervisorList.map(supervisor =>
          supervisor.id === editingId ? { ...supervisor, name: supervisorName.toUpperCase() } : supervisor
        );
        setSupervisorList(updatedList);
        setFilteredGroups(updatedList);
        setEditingId(null);
      } else {
        // Add new record
        const newSupervisor = {
          id: supervisorList.length > 0 ? Math.max(...supervisorList.map(g => g.id)) + 1 : 1,
          name: supervisorName.toUpperCase()
        };
        setSupervisorList([...supervisorList, newSupervisor]);
        setFilteredGroups([...supervisorList, newSupervisor]);
      }
      setSupervisorName('');
      setCurrentPage(1);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredGroups(supervisorList);
    } else {
      const filtered = supervisorList.filter(supervisor =>
        supervisor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGroups(filtered);
      setCurrentPage(1);
    }
  };

  const handleEdit = (supervisor) => {
    setEditingId(supervisor.id);
    setSupervisorName(supervisor.name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (supervisorId) => {
    const updatedList = supervisorList.filter(supervisor => supervisor.id !== supervisorId);
    setSupervisorList(updatedList);
    setFilteredGroups(updatedList);
    setCurrentPage(1);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            {/* Supervisor Section */}
            <h2 className="page-title">Supervisor</h2>
            
            <div className="filter-section">
              <div className="filter-grid">
                <div className="filter-grid-red">
                  <label className="filter-label">Supervisor List</label>
                  <input
                    type="text"
                    value={supervisorName}
                    onChange={(e) => setSupervisorName(e.target.value)}
                    placeholder="Enter Supervisor name"
                    className="filter-input"
                  />
                </div>
                <div className="btn-container">
                  <button onClick={handleSubmit} className="btn-all">
                    <span>✓</span>
                    <span>Submit</span>
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
                    placeholder="Supervisor List"
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
                <span className="master-table-title">Supervisor List</span>
              </div>
              <div className="master-table-body">
                {currentGroups.length > 0 ? (
                  currentGroups.map((supervisor, idx) => (
                    <div key={supervisor.id} className="master-table-row">
                      <div className="master-table-content">
                        <ChevronRight size={16} style={{ color: '#374151' }} />
                        <span className="master-name-text">{supervisor.name}</span>
                      </div>
                      <div className="table-actions">
                        <button
                          onClick={() => handleEdit(supervisor)}
                          className="btn-action"
                          title="Edit"
                        >
                          <Edit2 size={18} className="text-[#374151]" />
                        </button>
                        <button
                          onClick={() => handleDelete(supervisor.id)}
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