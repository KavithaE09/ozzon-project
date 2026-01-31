import React, { useState } from 'react';
import { Search, ChevronRight, Edit2, Trash2, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SizeType() {
  const navigate = useNavigate();
  const [sizeTypeName, setSizeTypeName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;

  const [sizeTypes, setSizeTypes] = useState([
    { id: 1, name: '20' },
    { id: 2, name: '40' },
    { id: 3, name: '60' },
    { id: 4, name: '80' }
  ]);
  const [filteredGroups, setFilteredGroups] = useState([
    { id: 1, name: '20' },
    { id: 2, name: '40' },
    { id: 3, name: '60' },
    { id: 4, name: '80' }
  ]);
  const [editingId, setEditingId] = useState(null);
  
  const totalPages = Math.ceil(filteredGroups.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentGroups = filteredGroups.slice(indexOfFirst, indexOfLast);

  const handleSubmit = () => {
    if (sizeTypeName.trim() !== '') {
      if (editingId) {
        // Update existing record
        const updatedTypes = sizeTypes.map(type =>
          type.id === editingId ? { ...type, name: sizeTypeName.toUpperCase() } : type
        );
        setSizeTypes(updatedTypes);
        setFilteredGroups(updatedTypes);
        setEditingId(null);
      } else {
        // Add new record
        const newType = {
          id: sizeTypes.length > 0 ? Math.max(...sizeTypes.map(g => g.id)) + 1 : 1,
          name: sizeTypeName.toUpperCase()
        };
        setSizeTypes([...sizeTypes, newType]);
        setFilteredGroups([...sizeTypes, newType]);
      }
      setSizeTypeName('');
      setCurrentPage(1);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredGroups(sizeTypes);
    } else {
      const filtered = sizeTypes.filter(type =>
        type.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGroups(filtered);
      setCurrentPage(1);
    }
  };

  const handleEdit = (type) => {
    setEditingId(type.id);
    setSizeTypeName(type.name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (typeId) => {
    const updatedTypes = sizeTypes.filter(type => type.id !== typeId);
    setSizeTypes(updatedTypes);
    setFilteredGroups(updatedTypes);
    setCurrentPage(1);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            {/* Size Type Section */}
            <h2 className="page-title">Size Type Master</h2>
            
            <div className="filter-section">
              <div className="filter-grid">
                <div className="filter-grid-red">
                  <label className="filter-label">Size Type</label>
                  <input
                    type="text"
                    value={sizeTypeName}
                    onChange={(e) => setSizeTypeName(e.target.value)}
                    placeholder="Enter Size Type"
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
                    placeholder="Size Type Name"
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
                <span className="master-table-title">Module Name</span>
              </div>
              <div className="master-table-body">
                {currentGroups.length > 0 ? (
                  currentGroups.map((type, idx) => (
                    <div key={type.id} className="master-table-row">
                      <div className="master-table-content">
                        <ChevronRight size={16} style={{ color: '#374151' }} />
                        <span className="master-name-text">{type.name}</span>
                      </div>
                      <div className="table-actions">
                        <button
                          onClick={() => handleEdit(type)}
                          className="btn-action"
                          title="Edit"
                        >
                          <Edit2 size={18} className="text-[#374151]" />
                        </button>
                        <button
                          onClick={() => handleDelete(type.id)}
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