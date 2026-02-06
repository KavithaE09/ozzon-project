import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, Search, Edit2, Trash2, ChevronLeft, Send, Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import materialApi from "../../api/materialApi.js";
import { getAllMaterialGroups, getAllUnits } from "../../api/masterApi.js";

export default function MaterialList() {
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchBy, setSearchBy] = useState('');
  const [groupName, setGroupName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [groupOptions, setGroupOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('materialFormData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return {
      ProductCode: '',
      ProductName: '',
      MaterialGroupId: '',
      UnitId: '',
      SellingRate: '',
      MaxStockQty: '',
      MinStockQty: '',
      GSTAmount: '',
      HSNCode: '',
      ReOrderLevel: ''
    };
  });

  const [allRecords, setAllRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
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
  const [groupSearch, setGroupSearch] = useState(() => {
    return localStorage.getItem('materialGroupSearch') || '';
  });
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const groupRef = useRef(null);
  const [unitSearch, setUnitSearch] = useState(() => {
    return localStorage.getItem('materialUnitSearch') || '';
  });
  const [isUnitOpen, setIsUnitOpen] = useState(false);
  const [hoveredUnit, setHoveredUnit] = useState(null);
  const unitRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('materialFormData', JSON.stringify(formData));
  }, [formData]);
  useEffect(() => {
    localStorage.setItem('materialGroupSearch', groupSearch);
  }, [groupSearch]);
  useEffect(() => {
    localStorage.setItem('materialUnitSearch', unitSearch);
  }, [unitSearch]);
  const filteredGroups = groupOptions.filter(group => {
    if (!group) return false;
    const name = group.MaterialGroupName || group.materialgroupName || group.groupName || group.GroupName || '';
    return name.toLowerCase().includes(groupSearch.toLowerCase());
  });
  
  const filteredUnits = unitOptions.filter(unit => {
    if (!unit) return false;
    const unitName = String(unit.UnitId || unit.unitid || '');
    return unitName.toLowerCase().includes(String(unitSearch).toLowerCase());
  });

  useEffect(() => {
    fetchAllData();
  }, []);
  const fetchAllData = async () => {
    try {
      setLoading(true);
    
      const materialsRes = await materialApi.getAllMaterials();
      if (materialsRes.success) {
        setAllRecords(materialsRes.data);
        setFilteredRecords(materialsRes.data);
      }
      const groupsRes = await getAllMaterialGroups();
      if (groupsRes && groupsRes.data) {
        setGroupOptions(groupsRes.data);
      }
      const unitsRes = await getAllUnits();
      if (unitsRes && unitsRes.data) {
        setUnitOptions(unitsRes.data);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (groupRef.current && !groupRef.current.contains(event.target)) {
        setIsGroupOpen(false);
      }
      if (unitRef.current && !unitRef.current.contains(event.target)) {
        setIsUnitOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async () => {
    if (!searchBy.trim()) {
      setFilteredRecords(allRecords);
      return;
    }

    try {
      setLoading(true);
      const response = await materialApi.searchMaterials(searchBy);
      
      if (response.success) {
        setFilteredRecords(response.data);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error('Error searching materials:', error);
      alert('Failed to search materials');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (formData.ProductName.trim() === '') {
      alert('Product Name is required');
      return;
    }

    try {
      setLoading(true);
      const response = await materialApi.createMaterial(formData);
      
      if (response.success) {
        alert('Material created successfully');
        
        const emptyForm = {
          ProductCode: '',
          ProductName: '',
          MaterialGroupId: '',
          UnitId: '',
          SellingRate: '',
          MaxStockQty: '',
          MinStockQty: '',
          GSTAmount: '',
          HSNCode: '',
          ReOrderLevel: ''
        };
        setFormData(emptyForm);
        setGroupSearch('');
        setUnitSearch('');
        localStorage.removeItem('materialFormData');
        localStorage.removeItem('materialGroupSearch');
        localStorage.removeItem('materialUnitSearch');
        
  
        await fetchAllData();
        setCurrentPage(1);
      }
    } catch (error) {
      console.error('Error creating material:', error);
      alert('Failed to create material');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    const emptyForm = {
      ProductCode: '',
      ProductName: '',
      MaterialGroupId: '',
      UnitId: '',
      SellingRate: '',
      MaxStockQty: '',
      MinStockQty: '',
      GSTAmount: '',
      HSNCode: '',
      ReOrderLevel: ''
    };
    setFormData(emptyForm);
    setGroupSearch('');
    setUnitSearch('');
    localStorage.removeItem('materialFormData');
    localStorage.removeItem('materialGroupSearch');
    localStorage.removeItem('materialUnitSearch');
  };

  const handleEdit = (record) => {
    setEditingId(record.MaterialListMId);
    setEditingData({ 
      name: record.ProductName, 
      rate: record.SellingRate ? record.SellingRate.toString() : '' 
    });
  };

  const handleUpdate = async (recordId) => {
    if (editingData.name.trim() === '') {
      alert('Product Name is required');
      return;
    }

    try {
      setLoading(true);
      const updateData = {
        ProductName: editingData.name,
        SellingRate: editingData.rate || 0
      };

      const response = await materialApi.updateMaterial(recordId, updateData);
      
      if (response.success) {
        alert('Material updated successfully');
        setEditingId(null);
        setEditingData({ name: '', rate: '' });
        await fetchAllData();
      }
    } catch (error) {
      console.error('Error updating material:', error);
      alert('Failed to update material');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingData({ name: '', rate: '' });
  };

  const handleDelete = async (recordId) => {
    if (!window.confirm('Are you sure you want to delete this material?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await materialApi.deleteMaterial(recordId);
      
      if (response.success) {
        alert('Material deleted successfully');
        await fetchAllData();
        setCurrentPage(1);
      }
    } catch (error) {
      console.error('Error deleting material:', error);
      alert('Failed to delete material');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <div className="page-header">
              <h1 className="page-title">Material List</h1>
              <button 
                onClick={() => navigate(-1)} 
                className="page-back-btn"
                aria-label="Go back"
              >
                <Undo2 className="page-back-icon" />
              </button>
            </div>

            {/* Form Section */}
            <div className="filter-grid mb-4">
              <div className="filter-grid-red">
                <label className="filter-label">Product Code</label>
                <input
                  type="text"
                  value={formData.ProductCode}
                  onChange={(e) => setFormData({ ...formData, ProductCode: e.target.value })}
                  className="filter-input text-xs"
                />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">Product Name</label>
                <input
                  type="text"
                  value={formData.ProductName}
                  onChange={(e) => setFormData({ ...formData, ProductName: e.target.value })}
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
                      filteredGroups.map((group, index) => {
                        const displayName = group.MaterialGroupName || group.materialgroupName || group.groupName || group.GroupName || 'Unknown';
                        const groupId = group.MaterialGroupMId || group.MaterialGroupId || group.id;
                        return (
                          <div
                            key={index}
                            onClick={() => {
                              setFormData({ ...formData, MaterialGroupId: groupId });
                              setGroupSearch(displayName);
                              setIsGroupOpen(false);
                            }}
                            onMouseEnter={() => setHoveredGroup(displayName)}
                            onMouseLeave={() => setHoveredGroup(null)}
                            className={`dropdown-item-option ${
                              hoveredGroup === displayName ? 'dropdown-item-hovered' : 'dropdown-item-default'
                            }`}
                          >
                            {displayName}
                          </div>
                        );
                      })
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
                      filteredUnits.map((unit, index) => {
                        const displayName = unit.UnitId || unit.unitid || 'Unknown';
                        const unitId = unit.UnitMId || unit.UnitId || unit.id;
                        return (
                          <div
                            key={index}
                            onClick={() => {
                              setFormData({ ...formData, UnitId: unitId });
                              setUnitSearch(String(displayName));
                              setIsUnitOpen(false);
                            }}
                            onMouseEnter={() => setHoveredUnit(displayName)}
                            onMouseLeave={() => setHoveredUnit(null)}
                            className={`dropdown-item-option ${
                              hoveredUnit === displayName ? 'dropdown-item-hovered' : 'dropdown-item-default'
                            }`}
                          >
                            {displayName}
                          </div>
                        );
                      })
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
                  value={formData.SellingRate}
                  onChange={(e) => setFormData({ ...formData, SellingRate: e.target.value })}
                  className="filter-input text-xs"
                />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">Maximum Stock Quantity</label>
                <input
                  type="text"
                  value={formData.MaxStockQty}
                  onChange={(e) => setFormData({ ...formData, MaxStockQty: e.target.value })}
                  className="filter-input text-xs"
                />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">Minimum Stock Quantity</label>
                <input
                  type="text"
                  value={formData.MinStockQty}
                  onChange={(e) => setFormData({ ...formData, MinStockQty: e.target.value })}
                  className="filter-input text-xs"
                />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">GST %</label>
                <input
                  type="text"
                  value={formData.GSTAmount}
                  onChange={(e) => setFormData({ ...formData, GSTAmount: e.target.value })}
                  className="filter-input text-xs"
                />
              </div>
            </div>

            <div className="filter-grid mb-4">
              <div className="filter-grid-red">
                <label className="filter-label">HSN Code</label>
                <input
                  type="text"
                  value={formData.HSNCode}
                  onChange={(e) => setFormData({ ...formData, HSNCode: e.target.value })}
                  className="filter-input text-xs"
                />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">Re-Order Level</label>
                <input
                  type="text"
                  value={formData.ReOrderLevel}
                  onChange={(e) => setFormData({ ...formData, ReOrderLevel: e.target.value })}
                  className="filter-input text-xs"
                />
              </div>
              
              <div></div>

              <div className="btn-container">
                 
                <button 
                  onClick={handleSubmit}
                  className="btn-all"
                  disabled={loading}
                >
                  <Send size={18} /> Submit
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
              
              <div></div>
              <div></div>

              <div className="btn-container">
                <button 
                  onClick={handleSearch} 
                  className="btn-all"
                  disabled={loading}
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
                      <tr key={record.MaterialListMId} className="table-row">
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
                          {editingId === record.MaterialListMId ? (
                            <input
                              type="text"
                              value={editingData.name}
                              onChange={(e) => setEditingData({ ...editingData, name: e.target.value })}
                              className="px-2 py-1 border border-gray-400 rounded text-[11px] outline-none bg-white"
                            />
                          ) : (
                            record.ProductName
                          )}
                        </td>
                        <td className="table-cell text-[11px]">
                          {editingId === record.MaterialListMId ? (
                            <input
                              type="text"
                              value={editingData.rate}
                              onChange={(e) => setEditingData({ ...editingData, rate: e.target.value })}
                              placeholder="Enter amount"
                              className="w-[100px] px-2 py-1 border border-gray-400 rounded text-[11px] outline-none bg-white"
                            />
                          ) : (
                            record.SellingRate ? `₹ ${record.SellingRate}` : '₹ 0'
                          )}
                        </td>
                        <td className="table-cell-center">
                          {editingId === record.MaterialListMId ? (
                            <div className="table-actions">
                              <button
                                onClick={() => handleUpdate(record.MaterialListMId)}
                                className="btn-smallbtn text-[11px]"
                                disabled={loading}
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
                                className="cursor-pointer"
                                onClick={() => handleEdit(record)}
                              />
                              <Trash2 
                                size={18} 
                                className="text-red-600 cursor-pointer"
                                onClick={() => handleDelete(record.MaterialListMId)}
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
        </div>
      </div>
    </div>
  );
}