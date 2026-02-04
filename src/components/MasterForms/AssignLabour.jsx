import React, { useState } from 'react';
import { Search, ChevronRight, Edit2, Trash2, ChevronLeft,Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AssignLabour() {
  const navigate = useNavigate();
  const [labourName, setLabourName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;

  const [labourList, setLabourList] = useState([
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
    if (labourName.trim() !== '') {
      if (editingId) {
        // Update existing record
        const updatedList = labourList.map(labour =>
          labour.id === editingId ? { ...labour, name: labourName.toUpperCase() } : labour
        );
        setLabourList(updatedList);
        setFilteredGroups(updatedList);
        setEditingId(null);
      } else {
        // Add new record
        const newLabour = {
          id: labourList.length > 0 ? Math.max(...labourList.map(g => g.id)) + 1 : 1,
          name: labourName.toUpperCase()
        };
        setLabourList([...labourList, newLabour]);
        setFilteredGroups([...labourList, newLabour]);
      }
      setLabourName('');
      setCurrentPage(1);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredGroups(labourList);
    } else {
      const filtered = labourList.filter(labour =>
        labour.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGroups(filtered);
      setCurrentPage(1);
    }
  };

  const handleEdit = (labour) => {
    setEditingId(labour.id);
    setLabourName(labour.name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (labourId) => {
    const updatedList = labourList.filter(labour => labour.id !== labourId);
    setLabourList(updatedList);
    setFilteredGroups(updatedList);
    setCurrentPage(1);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            {/* Assign Labour Section */}
            <h2 className="page-title">Assign Labour</h2>
            
            <div className="filter-section">
              <div className="filter-grid">
                <div className="filter-grid-red">
                  <label className="filter-label">Labour List</label>
                  <input
                    type="text"
                    value={labourName}
                    onChange={(e) => setLabourName(e.target.value)}
                    placeholder="Enter Labour name"
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
                    placeholder="Labour List"
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
                <span className="master-table-title">Labour List</span>
              </div>
              <div className="master-table-body">
                {currentGroups.length > 0 ? (
                  currentGroups.map((labour, idx) => (
                    <div key={labour.id} className="master-table-row">
                      <div className="master-table-content">
                        <ChevronRight size={16} style={{ color: '#374151' }} />
                        <span className="master-name-text">{labour.name}</span>
                      </div>
                      <div className="table-actions">
                        <button
                          onClick={() => handleEdit(labour)}
                          className="btn-action"
                          title="Edit"
                        >
                          <Edit2 size={18}  />
                        </button>
                        <button
                          onClick={() => handleDelete(labour.id)}
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