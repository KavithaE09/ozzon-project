import React, { useState } from 'react';
import { Search, ChevronRight, Edit2, Trash2, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TemplateSpecification() {
  const navigate = useNavigate();
  const [templateGroupName, setTemplateGroupName] = useState('');
  const [templateSpecificationName, setTemplateSpecificationName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;

  const [templateSpecs, setTemplateSpecs] = useState([
    { id: 1, name: 'ADMIN' },
    { id: 2, name: 'RANEESH' },
    { id: 3, name: 'BALA' },
    { id: 4, name: 'NAVEEN' }
  ]);
  const [filteredSpecs, setFilteredSpecs] = useState([
    { id: 1, name: 'ADMIN' },
    { id: 2, name: 'RANEESH' },
    { id: 3, name: 'BALA' },
    { id: 4, name: 'NAVEEN' }
  ]);
  const [editingId, setEditingId] = useState(null);
  
  const totalPages = Math.ceil(filteredSpecs.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = filteredSpecs.slice(indexOfFirst, indexOfLast);

  const handleSubmit = () => {
    if (templateSpecificationName.trim() !== '') {
      if (editingId) {
        // Update existing record
        const updatedSpecs = templateSpecs.map(spec =>
          spec.id === editingId ? { ...spec, name: templateSpecificationName.toUpperCase() } : spec
        );
        setTemplateSpecs(updatedSpecs);
        setFilteredSpecs(updatedSpecs);
        setEditingId(null);
      } else {
        // Add new record
        const newSpec = {
          id: templateSpecs.length > 0 ? Math.max(...templateSpecs.map(s => s.id)) + 1 : 1,
          name: templateSpecificationName.toUpperCase()
        };
        setTemplateSpecs([...templateSpecs, newSpec]);
        setFilteredSpecs([...templateSpecs, newSpec]);
      }
      setTemplateGroupName('');
      setTemplateSpecificationName('');
      setCurrentPage(1);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredSpecs(templateSpecs);
    } else {
      const filtered = templateSpecs.filter(spec =>
        spec.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSpecs(filtered);
      setCurrentPage(1);
    }
  };

  const handleEdit = (spec) => {
    setEditingId(spec.id);
    setTemplateSpecificationName(spec.name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (specId) => {
    const updatedSpecs = templateSpecs.filter(spec => spec.id !== specId);
    setTemplateSpecs(updatedSpecs);
    setFilteredSpecs(updatedSpecs);
    setCurrentPage(1);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            {/* Template Specification Section */}
            <h2 className="page-title">Template specification</h2>
            
            <div className="filter-section">
              <div className="filter-grid">
                <div className="filter-grid-red">
                  <label className="filter-label">Template Group Name</label>
                  <input
                    type="text"
                    value={templateGroupName}
                    onChange={(e) => setTemplateGroupName(e.target.value)}
                    placeholder="Enter group name"
                    className="filter-input"
                  />
                </div>

                <div className="filter-grid-red">
                  <label className="filter-label">Template Specification Name</label>
                  <input
                    type="text"
                    value={templateSpecificationName}
                    onChange={(e) => setTemplateSpecificationName(e.target.value)}
                    placeholder="Enter specification name"
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
                    placeholder="Template Specification Name"
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
                <span className="master-table-title">Template Specification Name</span>
              </div>
              <div className="master-table-body">
                {currentRows.length > 0 ? (
                  currentRows.map((spec, idx) => (
                    <div key={spec.id} className="master-table-row">
                      <div className="master-table-content">
                        <ChevronRight size={16} style={{ color: '#374151' }} />
                        <span className="master-name-text">{spec.name}</span>
                      </div>
                      <div className="table-actions">
                        <button
                          onClick={() => handleEdit(spec)}
                          className="btn-action"
                          title="Edit"
                        >
                          <Edit2 size={18} className="text-[#374151]" />
                        </button>
                        <button
                          onClick={() => handleDelete(spec.id)}
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
            {filteredSpecs.length > rowsPerPage && (
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