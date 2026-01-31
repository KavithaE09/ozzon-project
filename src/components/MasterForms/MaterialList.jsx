import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, Search, Edit2, Trash2,ChevronLeft, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MaterialList() {
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchBy, setSearchBy] = useState('');
  const [groupName, setGroupName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);


  const groupOptions = ["Group 1", "Group 2", "Group 3"];
  const groupnameOptions = ["Group 1", "Group 2", "Group 3"];
  const unitOptions = ["Box", "Kg", "Liter"];
  
  const [formData, setFormData] = useState({
    productCode: '',
    productName: '',
    group: '',
    unit: '',
    sellingRate: '',
    maxStock: '',
    minStock: '',
    gst: '',
    hsnCode: '',
    reOrderLevel: ''
  });

  const [allRecords, setAllRecords] = useState([
    { id: 1, name: 'ADMIN', rate: '₹ 78962', group: 'Group 1' },
    { id: 2, name: 'RANEESH', rate: '₹ 78962', group: 'Group 2' },
    { id: 3, name: 'BALA', rate: '₹ 78962', group: 'Group 1' },
    { id: 4, name: 'NAVEEN', rate: '₹ 78962', group: 'Group 3' }
  ]);

  const [filteredRecords, setFilteredRecords] = useState([
    { id: 1, name: 'ADMIN', rate: '₹ 78962', group: 'Group 1' },
    { id: 2, name: 'RANEESH', rate: '₹ 78962', group: 'Group 2' },
    { id: 3, name: 'BALA', rate: '₹ 78962', group: 'Group 1' },
    { id: 4, name: 'NAVEEN', rate: '₹ 78962', group: 'Group 3' }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({ name: '', rate: '' });
  const rowsPerPage = 2;
const totalPages = Math.max(
  1,
  Math.ceil(filteredRecords.length / rowsPerPage)
);


const indexOfLast = currentPage * rowsPerPage;
const indexOfFirst = indexOfLast - rowsPerPage;

const currentRecords = filteredRecords.slice(
  indexOfFirst,
  indexOfLast
);


  // Group dropdown state
  const [groupSearch, setGroupSearch] = useState('');
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const groupRef = useRef(null);
  
  // Group name dropdown state
  const [groupnameSearch, setGroupnameSearch] = useState('');
  const [isGroupnameOpen, setIsGroupnameOpen] = useState(false);
  const [hoveredGroupname, setHoveredGroupname] = useState(null);
  const groupnameRef = useRef(null);
  
  // Unit dropdown state
  const [unitSearch, setUnitSearch] = useState('');
  const [isUnitOpen, setIsUnitOpen] = useState(false);
  const [hoveredUnit, setHoveredUnit] = useState(null);
  const unitRef = useRef(null);

  const filteredGroups = groupOptions.filter(opt =>
    opt.toLowerCase().includes(groupSearch.toLowerCase())
  );
  
  const filteredGroupsname = groupnameOptions.filter(opt =>
    opt.toLowerCase().includes(groupnameSearch.toLowerCase())
  );
  
  const filteredUnits = unitOptions.filter(opt =>
    opt.toLowerCase().includes(unitSearch.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (groupRef.current && !groupRef.current.contains(event.target)) {
        setIsGroupOpen(false);
      }
      if (groupnameRef.current && !groupnameRef.current.contains(event.target)) {
        setIsGroupnameOpen(false);
      }
      if (unitRef.current && !unitRef.current.contains(event.target)) {
        setIsUnitOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    let filtered = allRecords;

    if (searchBy.trim()) {
      filtered = filtered.filter(record =>
        record.name.toLowerCase().includes(searchBy.toLowerCase())
      );
    }

    if (groupnameSearch && groupnameSearch !== 'Group Name') {
      filtered = filtered.filter(record =>
        record.group === groupnameSearch
      );
    }

    setFilteredRecords(filtered);
    setCurrentPage(1);
  };

  const handleSubmit = () => {
    if (formData.productName.trim() !== '') {
      const newRecord = {
        id: allRecords.length > 0 ? Math.max(...allRecords.map(r => r.id)) + 1 : 1,
        name: formData.productName.toUpperCase(),
        rate: formData.sellingRate ? `₹ ${formData.sellingRate}` : '₹ 0',
        group: formData.group || 'N/A'
      };
      setAllRecords([...allRecords, newRecord]);
      setFilteredRecords([...allRecords, newRecord]);
      
      // Reset form
      setFormData({
        productCode: '',
        productName: '',
        group: '',
        unit: '',
        sellingRate: '',
        maxStock: '',
        minStock: '',
        gst: '',
        hsnCode: '',
        reOrderLevel: ''
      });
      setGroupSearch('');
      setUnitSearch('');
      setCurrentPage(1);
    }
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    setEditingData({ name: record.name, rate: record.rate.replace('₹ ', '') });
  };

  const handleUpdate = (recordId) => {
    if (editingData.name.trim() !== '') {
      const updatedRecords = allRecords.map(record =>
        record.id === recordId ? { 
          ...record, 
          name: editingData.name.toUpperCase(),
          rate: editingData.rate ? `₹ ${editingData.rate}` : record.rate
        } : record
      );
      setAllRecords(updatedRecords);
      setFilteredRecords(updatedRecords);
      setEditingId(null);
      setEditingData({ name: '', rate: '' });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingData({ name: '', rate: '' });
  };

  const handleDelete = (recordId) => {
    const updatedRecords = allRecords.filter(record => record.id !== recordId);
    setAllRecords(updatedRecords);
    setFilteredRecords(updatedRecords);
    setCurrentPage(1);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <h2 className="page-title">Material List</h2>

            <div className="filter-grid mb-4">
              <div className="filter-grid-red">
                <label className="filter-label">Product Code</label>
                <input
                  type="text"
                  value={formData.productCode}
                  onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                  className="filter-input text-xs"
                />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">Product Name</label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className="filter-input text-xs"
                />
              </div>

              <div ref={groupRef} className="filter-grid-red">
                <label className="filter-label">Group</label>
                <div className="dropdown-wrapper">
                  <input
                    type="text"
                    value={groupSearch}
                    onChange={(e) => {
                      setGroupSearch(e.target.value);
                      setIsGroupOpen(true);
                    }}
                    onFocus={() => setIsGroupOpen(true)}
                    placeholder="Type or select..."
                    className="dropdown-input text-xs"
                  />
                  <ChevronDown size={20} className="dropdown-icon" />
                </div>
                {isGroupOpen && (
                  <div className="dropdown-menu">
                    {filteredGroups.length > 0 ? (
                      filteredGroups.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setFormData({ ...formData, group: option });
                            setGroupSearch(option);
                            setIsGroupOpen(false);
                          }}
                          onMouseEnter={() => setHoveredGroup(option)}
                          onMouseLeave={() => setHoveredGroup(null)}
                          className={`dropdown-item-option ${
                            hoveredGroup === option ? 'dropdown-item-hovered' : 'dropdown-item-default'
                          }`}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-no-matches">No matches found</div>
                    )}
                  </div>
                )}
              </div>

              <div ref={unitRef} className="filter-grid-red">
                <label className="filter-label">Unit</label>
                <div className="dropdown-wrapper">
                  <input
                    type="text"
                    value={unitSearch}
                    onChange={(e) => {
                      setUnitSearch(e.target.value);
                      setIsUnitOpen(true);
                    }}
                    onFocus={() => setIsUnitOpen(true)}
                    placeholder="Type or select..."
                    className="dropdown-input text-xs"
                  />
                  <ChevronDown size={20} className="dropdown-icon" />
                </div>
                {isUnitOpen && (
                  <div className="dropdown-menu">
                    {filteredUnits.length > 0 ? (
                      filteredUnits.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setFormData({ ...formData, unit: option });
                            setUnitSearch(option);
                            setIsUnitOpen(false);
                          }}
                          onMouseEnter={() => setHoveredUnit(option)}
                          onMouseLeave={() => setHoveredUnit(null)}
                          className={`dropdown-item-option ${
                            hoveredUnit === option ? 'dropdown-item-hovered' : 'dropdown-item-default'
                          }`}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-no-matches">No matches found</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="filter-grid mb-4">
              <div className="filter-grid-red">
                <label className="filter-label">Selling Rate</label>
                <input
                  type="text"
                  value={formData.sellingRate}
                  onChange={(e) => setFormData({ ...formData, sellingRate: e.target.value })}
                  className="filter-input text-xs"
                />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">Maximum Stock Quantity</label>
                <input
                  type="text"
                  value={formData.maxStock}
                  onChange={(e) => setFormData({ ...formData, maxStock: e.target.value })}
                  className="filter-input text-xs"
                />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">Minimum Stock Quantity</label>
                <input
                  type="text"
                  value={formData.minStock}
                  onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                  className="filter-input text-xs"
                />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">GST %</label>
                <input
                  type="text"
                  value={formData.gst}
                  onChange={(e) => setFormData({ ...formData, gst: e.target.value })}
                  className="filter-input text-xs"
                />
              </div>
            </div>

            <div className="filter-grid mb-4">
              <div className="filter-grid-red">
                <label className="filter-label">HSN Code</label>
                <input
                  type="text"
                  value={formData.hsnCode}
                  onChange={(e) => setFormData({ ...formData, hsnCode: e.target.value })}
                  className="filter-input text-xs"
                />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">Re-Order Level</label>
                <input
                  type="text"
                  value={formData.reOrderLevel}
                  onChange={(e) => setFormData({ ...formData, reOrderLevel: e.target.value })}
                  className="filter-input text-xs"
                />
              </div>
              
              <div></div>

              <div className="grid justify-start mt-5">
                <button 
                  onClick={handleSubmit}
                  className="btn-all"
                >
                  <span>✓</span>
                  <span>Submit</span>
                </button>
              </div>
            </div>

            <h2 className="section-title">Record List</h2>

            <div className="filter-grid mb-4">
              <div className="filter-grid-red">
                <label className="filter-label">Search By</label>
                <input
                  type="text"
                  placeholder="Material List Name"
                  value={searchBy}
                  onChange={(e) => setSearchBy(e.target.value)}
                  className="filter-input text-xs"
                />
              </div>

              <div ref={groupnameRef} className="filter-grid-red">
                <label className="filter-label">Group Name</label>
                <div className="dropdown-wrapper">
                  <input
                    type="text"
                    value={groupnameSearch}
                    onChange={(e) => {
                      setGroupnameSearch(e.target.value);
                      setIsGroupnameOpen(true);
                    }}
                    onFocus={() => setIsGroupnameOpen(true)}
                    placeholder="Type or select..."
                    className="dropdown-input text-xs"
                  />
                  <ChevronDown size={20} className="dropdown-icon" />
                </div>
                {isGroupnameOpen && (
                  <div className="dropdown-menu">
                    {filteredGroupsname.length > 0 ? (
                      filteredGroupsname.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setGroupName(option);
                            setGroupnameSearch(option);
                            setIsGroupnameOpen(false);
                          }}
                          onMouseEnter={() => setHoveredGroupname(option)}
                          onMouseLeave={() => setHoveredGroupname(null)}
                          className={`dropdown-item-option ${
                            hoveredGroupname === option ? 'dropdown-item-hovered' : 'dropdown-item-default'
                          }`}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-no-matches">No matches found</div>
                    )}
                  </div>
                )}
              </div>
              
              <div></div>

              <div className="grid justify-start mt-5">
                <button
                  onClick={handleSearch}
                  className="btn-all"
                >
                  <Search size={18} /> Search
                </button>
              </div>
            </div>

            <div className="border border-gray-400 rounded-md overflow-hidden">
              <table className="data-table">
                <thead className="table-header">
                  <tr>
                    <th className="table-th w-[50px]"></th>
                    <th className="table-th uppercase">Material List Name</th>
                    <th className="table-th uppercase">Selling Rate</th>
                    <th className="table-th-center uppercase w-[120px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.length > 0 ? (
                  currentRecords.map((record, idx) => (
                      <tr key={record.id} className="table-row">
                        <td className="table-cell">
                          <button
                          onClick={() => setExpandedRow(expandedRow === idx ? null : idx)}
                            className="bg-transparent border-none cursor-pointer p-0 flex items-center"
                          >
                            {expandedRow === idx ?
                              <ChevronDown className="w-4 h-4" /> :
                              <ChevronRight className="w-4 h-4" />
                            }
                          </button>
                        </td>
                        <td className="table-cell text-[11px]">
                          {editingId === record.id ? (
                            <input
                              type="text"
                              value={editingData.name}
                              onChange={(e) => setEditingData({ ...editingData, name: e.target.value })}
                              className="px-2 py-1 border border-gray-400 rounded text-[11px] outline-none bg-white"
                            />
                          ) : (
                            record.name
                          )}
                        </td>
                        <td className="table-cell text-[11px]">
                          {editingId === record.id ? (
                            <input
                              type="text"
                              value={editingData.rate}
                              onChange={(e) => setEditingData({ ...editingData, rate: e.target.value })}
                              placeholder="Enter amount"
                              className="w-[100px] px-2 py-1 border border-gray-400 rounded text-[11px] outline-none bg-white"
                            />
                          ) : (
                            record.rate
                          )}
                        </td>
                        <td className="table-cell-center">
                          {editingId === record.id ? (
                            <div className="table-actions">
                              <button
                                onClick={() => handleUpdate(record.id)}
                                className="btn-smallbtn text-[11px]"
                              >
                                Update
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="px-3 py-1 bg-gray-600 text-white border-none rounded text-[11px] cursor-pointer font-medium"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="table-actions">
                              <Edit2 
                                size={18} 
                                className="text-gray-600 cursor-pointer"
                                onClick={() => handleEdit(record)}
                              />
                              <Trash2 
                                size={18} 
                                className="text-red-600 cursor-pointer"
                                onClick={() => handleDelete(record.id)}
                              />
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="no-data-cell">
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Pagination */}
          <div className="pagination-container mt-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className={currentPage === 1 ? 'pagination-btn pagination-btn-disabled' : 'pagination-btn pagination-btn-active'}
            >
              <ChevronLeft />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? 'pagination-page-btn pagination-page-active' : 'pagination-page-btn pagination-page-inactive'}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className={currentPage === totalPages ? 'pagination-btn pagination-btn-disabled' : 'pagination-btn pagination-btn-active'}
            >
              <ChevronRight />
            </button>
          </div>

          {/* Back Button */}
          <button onClick={() => navigate(-1)} className="btn-back">
            <span>←</span>
            <span>Back</span>
          </button>
            
        </div>
        
      </div>
    </div>
  );
}