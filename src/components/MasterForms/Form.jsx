import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Edit2, Trash2, ChevronLeft, Search, ChevronDown, Send, Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import formApi from '../../api/formApi'; 

export default function Form() {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [forms, setForms] = useState([]);

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentSearch, setDepartmentSearch] = useState('');
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);
  const [hoveredDepartment, setHoveredDepartment] = useState(null);
  
  const [formName, setFormName] = useState('');
  
  const [searchText, setSearchText] = useState('');
  const [displayForms, setDisplayForms] = useState([]);
  const [showRecordList, setShowRecordList] = useState(false);
  const [editingForm, setEditingForm] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [nextFormCode, setNextFormCode] = useState('1'); 
  const rowsPerPage = 5;
  
  const departmentDropdownRef = useRef(null);
  
  useEffect(() => {
    loadDepartments();
    fetchAllForms();
    
    // Load saved form data from localStorage
    const savedDepartment = localStorage.getItem('formMaster_department');
    const savedDepartmentSearch = localStorage.getItem('formMaster_departmentSearch');
    const savedFormName = localStorage.getItem('formMaster_formName');
    
    if (savedDepartment) {
      setSelectedDepartment(JSON.parse(savedDepartment));
    }
    if (savedDepartmentSearch) {
      setDepartmentSearch(savedDepartmentSearch);
    }
    if (savedFormName) {
      setFormName(savedFormName);
    }
  }, []);

  // Load departments from API
  const loadDepartments = async () => {
    try {
      const response = await formApi.getDepartments();
      console.log('Departments response:', response); 
      
      const deptData = response.success ? response.data : (response.data || response);
      
      setDepartments(deptData || []);
    } catch (error) {
      console.error('Failed to load departments:', error);
      console.error('Error details:', error.response); 
      // Removed alert - just silently fail
    }
  };

  // Fetch all forms from API
  const fetchAllForms = async () => {
    try {
      setLoading(true);
      const response = await formApi.getAllForms();
      console.log('Fetch forms response:', response);
      
      const formsData = response.success ? response.data : (response.data || response);
      
      setForms(formsData || []);
      setDisplayForms(formsData || []);
      if (formsData && formsData.length > 0) {
        setShowRecordList(true);
        
        // Calculate next form code
        const maxCode = Math.max(...formsData.map(f => parseInt(f.FormCode) || 0));
        setNextFormCode((maxCode + 1).toString());
      } else {
        setNextFormCode('1');
      }
    } catch (error) {
      console.error('Failed to fetch forms:', error);
      console.error('Error details:', error.response);
      // Removed alert - just silently fail
    } finally {
      setLoading(false);
    }
  };

  const filteredDepartments = departments.filter(dept =>
    dept.DepartmentName?.toLowerCase().includes(departmentSearch.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (departmentDropdownRef.current && !departmentDropdownRef.current.contains(event.target)) {
        setIsDepartmentDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Pagination calculations
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const paginatedData = displayForms.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(displayForms.length / rowsPerPage);

  const handleDepartmentInput = (e) => {
    const value = e.target.value;
    setDepartmentSearch(value);
    setSelectedDepartment(null);
    
    // Update localStorage
    localStorage.setItem('formMaster_departmentSearch', value);
    localStorage.removeItem('formMaster_department'); 
  };

  const handleDepartmentSelect = (dept) => {
    setSelectedDepartment(dept);
    setDepartmentSearch(dept.DepartmentName);
    setIsDepartmentDropdownOpen(false);
    
    // Save to localStorage
    localStorage.setItem('formMaster_department', JSON.stringify(dept));
    localStorage.setItem('formMaster_departmentSearch', dept.DepartmentName);
  };

  // Create new form
  const handleSubmit = async () => {
    console.log('Submit clicked!');
    console.log('Selected Department:', selectedDepartment);
    console.log('Form Name:', formName);
    
    if (!selectedDepartment) {
      alert('Please select a department');
      return;
    }
    if (!formName.trim()) {
      alert('Please enter form name');
      return;
    }

    try {
      setLoading(true);
      
      const formData = {
        departmentId: selectedDepartment.DepartmentId, 
        formName: formName.trim()  
      };

      console.log('Sending form data:', formData);
      console.log('departmentId value:', selectedDepartment.DepartmentId);
      console.log('formName value:', formName.trim());
      
      const response = await formApi.createForm(formData);
      console.log('Response received:', response);
      
      if (response.success || response.data || response.message) {
        await fetchAllForms();
        alert(response.message || 'Form created successfully');
      
        setSelectedDepartment(null);
        setDepartmentSearch('');
        setFormName('');
        
        // Clear ALL localStorage items
        localStorage.removeItem('formMaster_department');
        localStorage.removeItem('formMaster_departmentSearch');
        localStorage.removeItem('formMaster_formName');
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Failed to save form:', error);
      console.error('Error details:', error.response);
      console.error('Error data:', error.response?.data);
      alert(error.response?.data?.message || error.message || 'Failed to save form');
    } finally {
      setLoading(false);
    }
  };

  // Search forms - auto search as user types
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await formApi.getAllForms(searchText.trim());
      console.log('Search response:', response);
      
      const formsData = response.success ? response.data : (response.data || response);
      
      setDisplayForms(formsData || []);
      setCurrentPage(1);
    } catch (error) {
      console.error('Failed to search forms:', error);
      // Removed alert - just silently fail
    } finally {
      setLoading(false);
    }
  };

  // Auto-search as user types
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch();
    }, 300); 

    return () => clearTimeout(delayDebounce);
  }, [searchText]); 

  // Save form name to localStorage when it changes
  useEffect(() => {
    if (formName) {
      localStorage.setItem('formMaster_formName', formName);
    }
  }, [formName]);

  // Edit button click - populate form fields with selected row data
  const handleEdit = (form) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  
    const matchingDept = departments.find(dept => dept.DepartmentId === form.DepartmentId);
   
    setSelectedDepartment(matchingDept || null);
    setDepartmentSearch(form.DepartmentName);
    setFormName(form.FormName);
    
    setEditingForm(form.FormID);
    setEditingData({ ...form });
  };

  // Update the record when Submit is clicked while editing
  const handleUpdate = async () => {
    if (!formName.trim()) {
      alert('Please enter form name');
      return;
    }

    try {
      setLoading(true);
      
      const updateData = {
        formName: formName.trim()  
      };

      if (selectedDepartment && selectedDepartment.DepartmentId !== editingData.DepartmentId) {
        updateData.departmentId = selectedDepartment.DepartmentId; 
      }
      
      console.log('Updating form:', editingData.FormID, updateData); 
      const response = await formApi.updateForm(editingData.FormID, updateData);
      console.log('Update response:', response); 
      
      // Check multiple response formats
      if (response.success || response.data || response.message) {
        await fetchAllForms();
        alert(response.message || 'Form updated successfully');
        
        // Clear ALL form fields and editing state
        setSelectedDepartment(null);
        setDepartmentSearch('');
        setFormName('');
        setEditingForm(null);
        setEditingData(null);
        
        // Clear ALL localStorage items
        localStorage.removeItem('formMaster_department');
        localStorage.removeItem('formMaster_departmentSearch');
        localStorage.removeItem('formMaster_formName');
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Failed to update form:', error);
      console.error('Error details:', error.response); 
      alert(error.response?.data?.message || error.message || 'Failed to update form');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    // Clear all form fields and editing state
    setSelectedDepartment(null);
    setDepartmentSearch('');
    setFormName('');
    setEditingForm(null);
    setEditingData(null);
    
    // Clear localStorage
    localStorage.removeItem('formMaster_department');
    localStorage.removeItem('formMaster_departmentSearch');
    localStorage.removeItem('formMaster_formName');
  };

  // Delete form
  const handleDelete = async (form) => {
    if (window.confirm(`Are you sure you want to delete ${form.FormName}?`)) {
      try {
        setLoading(true);
        
        console.log('Deleting form:', form.FormID); 
        const response = await formApi.deleteForm(form.FormID);
        console.log('Delete response:', response); 
      
        if (response.success || response.data || response.message) {
          alert(response.message || 'Form deleted successfully');
          await fetchAllForms();
          
          // Adjust pagination if needed
          const newTotalPages = Math.ceil((displayForms.length - 1) / rowsPerPage);
          if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
          }
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        console.error('Failed to delete form:', error);
        console.error('Error details:', error.response);
        alert(error.response?.data?.message || error.message || 'Failed to delete form');
      } finally {
        setLoading(false);
      }
    }
  };

  // Modified submit handler to check if we're in edit mode
  const handleFormSubmit = () => {
    if (editingForm) {
      handleUpdate();
    } else {
      handleSubmit();
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <div className="page-header">
              <h1 className="page-title">Form Master</h1>
              <button 
                onClick={() => navigate(-1)} 
                className="page-back-btn"
                aria-label="Go back"
              >
                <Undo2 className="page-back-icon" />
              </button>
            </div>

            {/* Form Input Section */}
            <div className="filter-grid">
              <div ref={departmentDropdownRef} className="filter-grid-red">
                <label className="filter-label">
                  Department Name 
                </label>
                <div className="dropdown-wrapper">
                  <input
                    type="text"
                    value={departmentSearch}
                    onChange={handleDepartmentInput}
                    onFocus={() => setIsDepartmentDropdownOpen(true)}
                    placeholder="Type or select..."
                    className="dropdown-input"
                  />
                  <ChevronDown size={20} className="dropdown-icon" />
                </div>
                {isDepartmentDropdownOpen && (
                  <div className="dropdown-menu">
                    {filteredDepartments.length > 0 ? (
                      filteredDepartments.map((dept) => (
                        <div
                          key={dept.DepartmentId}
                          onClick={() => handleDepartmentSelect(dept)}
                          onMouseEnter={() => setHoveredDepartment(dept.DepartmentId)}
                          onMouseLeave={() => setHoveredDepartment(null)}
                          className={`dropdown-item-option ${
                            hoveredDepartment === dept.DepartmentId
                              ? 'dropdown-item-hovered'
                              : selectedDepartment?.DepartmentId === dept.DepartmentId
                              ? 'dropdown-item-selected'
                              : 'dropdown-item-default'
                          }`}
                        >
                          {dept.DepartmentName}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-no-matches">No matches found</div>
                    )}
                  </div>
                )}
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">
                  Form Name 
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Enter Form Name"
                  className="filter-input"
                />
              </div>

              <div className="filter-grid-gray">
                <label className="filter-label">Form Code</label>
                <input
                  type="text"
                  value={editingForm ? editingData?.FormCode : nextFormCode}
                  readOnly
                  placeholder="Auto-generated"
                  className="filter-input bg-gray-100"
                />
              </div>

              <div className="btn-container">
                <button 
                  onClick={handleFormSubmit} 
                  className="btn-search"
                  disabled={loading}
                >
                  <Send size={18} /> {loading ? (editingForm ? 'Updating...' : 'Saving...') : (editingForm ? 'Update' : 'Submit')}
                </button>
                
                {editingForm && (
                  <button 
                    onClick={handleCancelEdit} 
                    className="btn-search bg-red-600 hover:bg-red-700 ml-2"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Record List */}
            {showRecordList && (
              <>
                <h2 className="section-title mt-8">Record List</h2>

                <div className="filter-grid">
                  <div className="filter-grid-green">
                    <label className="filter-label">Search By Form Name</label>
                    <input
                      type="text"
                      placeholder="Type to search..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="filter-input"
                    />
                  </div>
                  <div className="btn-container">
                        <button onClick={handleSearch} className="btn-all" disabled={loading}>
                            <Search size={18} /> Search
                        </button>
                  </div>
                </div>

                {/* Table */}
                <div className="table-container">
                  <table className="data-table">
                    <thead className="table-header">
                      <tr>
                        <th className="table-th" style={{ width: '50px' }}></th>
                        <th className="table-th">Form Name</th>
                        <th className="table-th">Department Name</th>
                        <th className="table-th">Form Code</th>
                        <th className="table-th-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="5" className="no-data-cell">Loading...</td>
                        </tr>
                      ) : paginatedData.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="no-data-cell">No records found</td>
                        </tr>
                      ) : (
                        paginatedData.map((form) => (
                          <tr 
                            key={form.FormID} 
                            className={`table-row ${editingForm === form.FormID ? 'bg-blue-50' : ''}`}
                          >
                            <td className="table-cell" style={{ width: '50px' }}>
                              <ChevronRight size={18} className="text-gray-600" />
                            </td>
                            <td className="table-cell">{form.FormName}</td>
                            <td className="table-cell">{form.DepartmentName}</td>
                            <td className="table-cell">{form.FormCode}</td>
                            <td className="table-cell-center">
                              <div className="flex items-center justify-center gap-3">
                                <button
                                  onClick={() => handleEdit(form)}
                                  className="btn-action"
                                  disabled={loading}
                                  title="Edit"
                                >
                                  <Edit2 size={18} />
                                </button>
                                <button
                                  onClick={() => handleDelete(form)}
                                  className="btn-action"
                                  disabled={loading}
                                  title="Delete"
                                >
                                  <Trash2 size={18} className="text-red-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* Pagination */}
            {showRecordList && displayForms.length > rowsPerPage && (
              <div className="pagination-container">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className={`pagination-btn ${
                    currentPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'
                  }`}
                >
                  <ChevronLeft size={16} />
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
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className={`pagination-btn ${
                    currentPage === totalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'
                  }`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}