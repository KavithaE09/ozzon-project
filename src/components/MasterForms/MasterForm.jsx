import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, Edit2, Trash2, ChevronLeft, Send, Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MasterForm({
  title,          // e.g. "Lead Owner"
  fetchAll,       // API function to get all records
  createItem,     // API function to create record
  updateItem,     // API function to update record
  deleteItem,     // API function to delete record
  nameKey,        // e.g. "LeadOwnerName"
  idKey,          // e.g. "LeadOwnerId"
}) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch all records
  const fetchItems = async () => {
    try {
      const res = await fetchAll();
      setItems(res.data);
      setFilteredItems(res.data);
    } catch (err) {
      console.error(`Failed to fetch ${title}:`, err);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  // Add / Update
  const handleSubmit = async () => {
    if (!inputValue.trim()) return;
    try {
      if (editingId) {
        await updateItem(editingId, { [nameKey]: inputValue.toUpperCase() });
        setEditingId(null);
      } else {
        await createItem({ [nameKey]: inputValue.toUpperCase() });
      }
      setInputValue('');
      fetchItems();
      setCurrentPage(1);
    } catch (err) {
      console.error(`Error saving ${title}:`, err);
    }
  };

  // Reset
  const handleReset = () => { setInputValue(''); setEditingId(null); };

  // Search
  const handleSearch = () => {
    if (!searchTerm.trim()) setFilteredItems(items);
    else {
      const filtered = items.filter(i => i[nameKey].toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredItems(filtered);
      setCurrentPage(1);
    }
  };

  // Edit
  const handleEdit = (item) => { setEditingId(item[idKey]); setInputValue(item[nameKey]); window.scrollTo({top:0, behavior:'smooth'}); };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure to delete this ${title}?`)) return;
    try { await deleteItem(id); fetchItems(); setCurrentPage(1); }
    catch (err) { console.error(`Error deleting ${title}:`, err); }
  };

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentItems = filteredItems.slice(indexOfFirst, indexOfLast);

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">

            <div className="page-header">
              <h1 className="page-title">{title} Master</h1>
              <button onClick={() => navigate(-1)} className="page-back-btn"><Undo2 className="page-back-icon" /></button>
            </div>

            {/* Form */}
            <div className="filter-section">
              <div className="filter-grid">
                <div className="filter-grid-red">
                  <label className="filter-label">{title} Name</label>
                  <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder={`Enter ${title} Name`} className="filter-input" />
                </div>
                <div className="btn-container">
                  <button onClick={handleSubmit} className="btn-all"><Send size={18} /> {editingId ? 'Update' : 'Submit'}</button>
                  {editingId && <button onClick={handleReset} className="btn-all ml-2"><Undo2 size={18} /> Reset</button>}
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="filter-section">
              <div className="filter-grid">
                <div className="filter-grid-green">
                  <label className="filter-label">Search By</label>
                  <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder={`${title} Name`} className="filter-input" />
                </div>
                <div className="btn-container"><button onClick={handleSearch} className="btn-all"><Search size={18} /> Search</button></div>
              </div>
            </div>

            {/* Table */}
            <div className="master-table-container">
              <div className="master-table-header"><span className="master-table-title">{title} Name</span></div>
              <div className="master-table-body">
                {currentItems.length > 0 ? currentItems.map(item => (
                  <div key={item[idKey]} className="master-table-row">
                    <div className="master-table-content"><ChevronRight size={16} style={{color:'#374151'}} /> <span className="master-name-text">{item[nameKey]}</span></div>
                    <div className="table-actions">
                      <button onClick={() => handleEdit(item)} className="btn-action" title="Edit"><Edit2 size={18} /></button>
                      <button onClick={() => handleDelete(item[idKey])} className="btn-action" title="Delete"><Trash2 size={18} className="text-[#dc2626]" /></button>
                    </div>
                  </div>
                )) : <div className="no-data-cell">No records found</div>}
              </div>
            </div>

            
                       {/* Pagination */}
{filteredItems.length > rowsPerPage && (
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

          </div>
        </div>
      </div>
    </div>
  );
}
