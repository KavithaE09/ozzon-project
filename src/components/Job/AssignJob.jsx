import React, { useState, useRef, useEffect } from 'react';
import { Printer, Edit2, Trash2, ChevronDown, Search,Send,Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AssignJob() {
  const navigate = useNavigate();
  
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    jobOrderNo: '85127436',
    salesPersonName: 'Raneesh',
    containerNo: 'TCKU 1524662',
    customerName: 'Raneesh',
    leadNo: 'L-1',
    quotationNo: 'Q-1',
    piNo: 'PI-1',
    expectdate: getTodayDate()
  });

  const allJobOrders = [
    { id: 1, selected: false, sNo: 1, leadNo: 'L-1', quotationNo: 'Q-1', piNo: 'P-1', salesPerson: 'Raneesh', customerName: 'Raneesh', advanceAmount: '₹ 10,00,000', isEditing: false },
    { id: 2, selected: false, sNo: 2, leadNo: 'L-2', quotationNo: 'Q-1', piNo: 'P-1', salesPerson: 'Raneesh', customerName: 'Raneesh', advanceAmount: '₹ 10,00,000', isEditing: false },
    { id: 3, selected: false, sNo: 3, leadNo: 'L-1', quotationNo: 'Q-2', piNo: 'P-2', salesPerson: 'Christine Brooks', customerName: 'Sasi', advanceAmount: '₹ 5,00,000', isEditing: false },
    { id: 4, selected: false, sNo: 4, leadNo: 'L-3', quotationNo: 'Q-3', piNo: 'P-3', salesPerson: 'Rosie Pearson', customerName: 'Varshini', advanceAmount: '₹ 8,00,000', isEditing: false }
  ];

  const [filteredJobOrders, setFilteredJobOrders] = useState(allJobOrders);

  const [containers, setContainers] = useState([
    { id: 1, selected: false, sNo: 1, containerNo: 'TCKU 1524662', partyName: 'Christine Brooks', szType: '20"', grade: '', liner: '', yard: 'Golbal', mfgDate: '04-09-2019', inDate: '04-09-2019', deliveryDate: '04-09-2019', photo: '', status: '' },
    { id: 2, selected: false, sNo: 2, containerNo: 'TCKU 1524662', partyName: 'Rosie Pearson', szType: '20"', grade: '', liner: '', yard: 'Golbal', mfgDate: '04-09-2019', inDate: '04-09-2019', deliveryDate: '04 Sep 2019', photo: '', status: '' }
  ]);

  const [supervisor, setSupervisor] = useState('');
  const [supervisorSearch, setSupervisorSearch] = useState('');
  const [isSupervisorOpen, setIsSupervisorOpen] = useState(false);
  const [hoveredSupervisor, setHoveredSupervisor] = useState(null);
  const [remark, setRemark] = useState('');
  
  // Dropdown states for form fields
  const [formSalesPersonDropdown, setFormSalesPersonDropdown] = useState({ isOpen: false, searchTerm: '', hovered: null });
  const [formCustomerDropdown, setFormCustomerDropdown] = useState({ isOpen: false, searchTerm: '', hovered: null });
  
  const salesPersonOptions = ['Raneesh', 'Christine Brooks', 'Rosie Pearson'].sort();
  const customerOptions = ['Raneesh', 'Sasi', 'Varshini'].sort();
  const supervisorOptions = ['Supervisor-1', 'Supervisor-2', 'Supervisor-3'].sort();
  
  const formSalesPersonRef = useRef(null);
  const formCustomerRef = useRef(null);
  const supervisorRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (supervisorRef.current && !supervisorRef.current.contains(event.target)) {
        setIsSupervisorOpen(false);
      }
      if (formSalesPersonRef.current && !formSalesPersonRef.current.contains(event.target)) {
        setFormSalesPersonDropdown(prev => ({ ...prev, isOpen: false }));
      }
      if (formCustomerRef.current && !formCustomerRef.current.contains(event.target)) {
        setFormCustomerDropdown(prev => ({ ...prev, isOpen: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleJobOrderSelect = (id) => {
    setFilteredJobOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, selected: !order.selected } : { ...order, selected: false }
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContainerSelect = (id) => {
    setContainers(prev =>
      prev.map(container =>
        container.id === id ? { ...container, selected: !container.selected } : container
      )
    );
  };

  const handlePrintJobOrder = (index, e) => {
    e.stopPropagation();
    const row = filteredJobOrders[index];
    alert(`Print Job Order: ${row.leadNo}`);
  };

  const handleEditJobOrder = (index, e) => {
    e.stopPropagation();
    setFilteredJobOrders(prev =>
      prev.map((order, i) => 
        i === index ? { ...order, isEditing: true } : order
      )
    );
  };

  const handleSaveJobOrder = (index, e) => {
    e.stopPropagation();
    setFilteredJobOrders(prev =>
      prev.map((order, i) => 
        i === index ? { ...order, isEditing: false } : order
      )
    );
  };

  const handleJobOrderFieldChange = (index, field, value) => {
    setFilteredJobOrders(prev =>
      prev.map((order, i) => 
        i === index ? { ...order, [field]: value } : order
      )
    );
  };

  const handleDeleteJobOrder = (index, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this job order?')) {
      const updatedData = filteredJobOrders.filter((_, i) => i !== index);
      setFilteredJobOrders(updatedData);
    }
  };

  const handleSearch = () => {
    let results = [...allJobOrders];
    if (formCustomerDropdown.searchTerm) {
      results = results.filter(item => 
        item.customerName.toLowerCase().includes(formCustomerDropdown.searchTerm.toLowerCase())
      );
    }

    setFilteredJobOrders(results);
  };

  const handleSubmit = () => {
    console.log('Submit clicked');
    alert('Form submitted!');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
        
<div className="page-header">
              <h1 className="page-title">Assign Job Order</h1>
              <button 
                onClick={() => navigate(-1)} 
                className="page-back-btn"
                aria-label="Go back"
              >
                <Undo2   className="page-back-icon" />
              </button>
            </div>
        {/* First Row - Form Fields */}
        <div className="filter-grid">
          <div className="filter-grid-blue">
            <label className="filter-label">Job Order No</label>
            <input
              type="text"
              value={formData.jobOrderNo}
              readOnly
              className="filter-input"
            />
          </div>
          
          <div className="filter-grid-red">
            <label className="filter-label">Sales Person Name</label>
            <div ref={formSalesPersonRef} className="dropdown-wrapper">
              <input
                type="text"
                value={formSalesPersonDropdown.searchTerm}
                onChange={(e) => setFormSalesPersonDropdown({ ...formSalesPersonDropdown, searchTerm: e.target.value, isOpen: true })}
                onFocus={() => setFormSalesPersonDropdown({ ...formSalesPersonDropdown, isOpen: true })}
                placeholder="Type or select..."
                className="dropdown-input"
              />
              <ChevronDown size={16} className="dropdown-icon" />
              {formSalesPersonDropdown.isOpen && (
                <div className="dropdown-menu">
                  {salesPersonOptions.filter(option => option.toLowerCase().includes(formSalesPersonDropdown.searchTerm.toLowerCase())).length > 0 ? (
                    salesPersonOptions.filter(option => option.toLowerCase().includes(formSalesPersonDropdown.searchTerm.toLowerCase())).map((option, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setFormSalesPersonDropdown({ searchTerm: option, isOpen: false, hovered: null });
                          setFormData({ ...formData, salesPersonName: option });
                        }}
                        onMouseEnter={() => setFormSalesPersonDropdown({ ...formSalesPersonDropdown, hovered: option })}
                        onMouseLeave={() => setFormSalesPersonDropdown({ ...formSalesPersonDropdown, hovered: null })}
                        className={`dropdown-item-option ${
                          formSalesPersonDropdown.hovered === option 
                            ? 'dropdown-item-hovered' 
                            : formSalesPersonDropdown.searchTerm === option 
                            ? 'dropdown-item-selected' 
                            : 'dropdown-item-default'
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
          
          <div className="filter-grid-red">
            <label className="filter-label">Container No</label>
            <input
              type="text"
              name="containerNo"
              value={formData.containerNo}
              onChange={handleInputChange}
              className="filter-input"
            />
          </div>
          
          <div className="filter-grid-red">
            <label className="filter-label">Customer Name</label>
            <div ref={formCustomerRef} className="dropdown-wrapper">
              <input
                type="text"
                value={formCustomerDropdown.searchTerm}
                onChange={(e) => setFormCustomerDropdown({ ...formCustomerDropdown, searchTerm: e.target.value, isOpen: true })}
                onFocus={() => setFormCustomerDropdown({ ...formCustomerDropdown, isOpen: true })}
                placeholder="Type or select..."
                className="dropdown-input"
              />
              <ChevronDown size={16} className="dropdown-icon" />
              {formCustomerDropdown.isOpen && (
                <div className="dropdown-menu">
                  {customerOptions.filter(option => option.toLowerCase().includes(formCustomerDropdown.searchTerm.toLowerCase())).length > 0 ? (
                    customerOptions.filter(option => option.toLowerCase().includes(formCustomerDropdown.searchTerm.toLowerCase())).map((option, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setFormCustomerDropdown({ searchTerm: option, isOpen: false, hovered: null });
                          setFormData({ ...formData, customerName: option });
                        }}
                        onMouseEnter={() => setFormCustomerDropdown({ ...formCustomerDropdown, hovered: option })}
                        onMouseLeave={() => setFormCustomerDropdown({ ...formCustomerDropdown, hovered: null })}
                        className={`dropdown-item-option ${
                          formCustomerDropdown.hovered === option 
                            ? 'dropdown-item-hovered' 
                            : formCustomerDropdown.searchTerm === option 
                            ? 'dropdown-item-selected' 
                            : 'dropdown-item-default'
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
        </div>

        {/* Second Row */}
        <div className="filter-grid" style={{ marginBottom: '32px' }}>
          <div className="filter-grid-green">
            <label className="filter-label">Lead No</label>
            <input
              type="text"
              name="leadNo"
              value={formData.leadNo}
              onChange={handleInputChange}
              className="filter-input"
            />
          </div>
          
          <div className="filter-grid-green">
            <label className="filter-label">Quotation No</label>
            <input
              type="text"
              name="quotationNo"
              value={formData.quotationNo}
              onChange={handleInputChange}
              className="filter-input"
            />
          </div>
          
          <div className="filter-grid-green">
            <label className="filter-label">PI No</label>
            <input
              type="text"
              name="piNo"
              value={formData.piNo}
              onChange={handleInputChange}
              className="filter-input"
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <button onClick={handleSearch} className="btn-search">
              <Search size={18} /> Search
            </button>
          </div>
        </div>

        {/* Job Orders Table */}
        <div className="table-container">
          <table className="data-table">
            <thead className="table-header">
              <tr>
                <th className="table-th">Select</th>
                <th className="table-th">S/No</th>
                <th className="table-th">Lead No</th>
                <th className="table-th">Quotation No</th>
                <th className="table-th">PI No</th>
                <th className="table-th">Sales Person</th>
                <th className="table-th">Customer Name</th>
                <th className="table-th">Advance Amount</th>
                <th className="table-th-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobOrders.map((order, index) => (
                <tr key={order.id} className="table-row">
                  <td className="table-cell">
                    <input
                      type="radio"
                      checked={order.selected}
                      onChange={() => handleJobOrderSelect(order.id)}
                      className="radio-input accent-primary"
                    />
                  </td>
                  <td className="table-cell">{order.sNo}.</td>
                  <td className="table-cell">
                    {order.isEditing ? (
                      <input
                        type="text"
                        value={order.leadNo}
                        onChange={(e) => handleJobOrderFieldChange(index, 'leadNo', e.target.value)}
                        className="master-edit-input"
                      />
                    ) : (
                      order.leadNo
                    )}
                  </td>
                  <td className="table-cell">
                    {order.isEditing ? (
                      <input
                        type="text"
                        value={order.quotationNo}
                        onChange={(e) => handleJobOrderFieldChange(index, 'quotationNo', e.target.value)}
                        className="master-edit-input"
                      />
                    ) : (
                      order.quotationNo
                    )}
                  </td>
                  <td className="table-cell">
                    {order.isEditing ? (
                      <input
                        type="text"
                        value={order.piNo}
                        onChange={(e) => handleJobOrderFieldChange(index, 'piNo', e.target.value)}
                        className="master-edit-input"
                      />
                    ) : (
                      order.piNo
                    )}
                  </td>
                  <td className="table-cell">
                    {order.isEditing ? (
                      <input
                        type="text"
                        value={order.salesPerson}
                        onChange={(e) => handleJobOrderFieldChange(index, 'salesPerson', e.target.value)}
                        className="master-edit-input"
                      />
                    ) : (
                      order.salesPerson
                    )}
                  </td>
                  <td className="table-cell">
                    {order.isEditing ? (
                      <input
                        type="text"
                        value={order.customerName}
                        onChange={(e) => handleJobOrderFieldChange(index, 'customerName', e.target.value)}
                        className="master-edit-input"
                      />
                    ) : (
                      order.customerName
                    )}
                  </td>
                  <td className="table-cell">
                    {order.isEditing ? (
                      <input
                        type="text"
                        value={order.advanceAmount}
                        onChange={(e) => handleJobOrderFieldChange(index, 'advanceAmount', e.target.value)}
                        className="master-edit-input"
                      />
                    ) : (
                      order.advanceAmount
                    )}
                  </td>
                  <td className="table-cell-center">
                    <div className="table-actions">
                      {order.isEditing ? (
                        <button 
                          onClick={(e) => handleSaveJobOrder(index, e)}
                          className="btn-smallbtn"
                        >
                          Save
                        </button>
                      ) : (
                        <>
                          <button onClick={(e) => handlePrintJobOrder(index, e)} className="btn-action" title="Print">
                            <Printer size={18}className="print-primary"/>
                          </button>
                          <button onClick={(e) => handleEditJobOrder(index, e)} className="btn-action" title="Edit">
                            <Edit2 size={18} />
                          </button>
                          <button onClick={(e) => handleDeleteJobOrder(index, e)} className="btn-action" title="Delete">
                            <Trash2 size={18} className="text-primary" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Container List */}
        <div className="filter-section">
          <h3 className="section-title">Container List</h3>
          <div className="table-container">
            <table className="data-table">
              <thead className="table-header">
                <tr>
                  <th className="table-th">Select</th>
                  <th className="table-th">S/No</th>
                  <th className="table-th">Container No</th>
                  <th className="table-th">Party Name</th>
                  <th className="table-th">Sz/Type</th>
                  <th className="table-th">Grade</th>
                  <th className="table-th">Liner</th>
                  <th className="table-th">Yard</th>
                  <th className="table-th">MFG Date</th>
                  <th className="table-th">In Date</th>
                  <th className="table-th">Delivery Date</th>
                  <th className="table-th">Photo</th>
                  <th className="table-th">Status</th>
                </tr>
              </thead>
              <tbody>
                {containers.map((container) => (
                  <tr key={container.id} className="table-row">
                    <td className="table-cell">
                      <input
                        type="checkbox"
                        checked={container.selected}
                        onChange={() => handleContainerSelect(container.id)}
                        className="radio-input accent-primary"
                      />
                    </td>
                    <td className="table-cell">{container.sNo}.</td>
                    <td className="table-cell">{container.containerNo}</td>
                    <td className="table-cell">{container.partyName}</td>
                    <td className="table-cell">{container.szType}</td>
                    <td className="table-cell">{container.grade}</td>
                    <td className="table-cell">{container.liner}</td>
                    <td className="table-cell">{container.yard}</td>
                    <td className="table-cell">{container.mfgDate}</td>
                    <td className="table-cell">{container.inDate}</td>
                    <td className="table-cell">{container.deliveryDate}</td>
                    <td className="table-cell">{container.photo}</td>
                    <td className="table-cell">{container.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Supervisor and Remark */}
        <div className="filter-grid" style={{ gridTemplateColumns: '200px 1fr', marginTop: '24px', marginBottom: '10px' }}>
          <div ref={supervisorRef} className="filter-grid-red">
            <label className="filter-label">Supervisor</label>
            <div className="dropdown-wrapper">
              <input
                type="text"
                value={supervisorSearch}
                onChange={(e) => {
                  setSupervisorSearch(e.target.value);
                  setIsSupervisorOpen(true);
                }}
                onFocus={() => setIsSupervisorOpen(true)}
                placeholder="SuperVisor"
                className="dropdown-input"
              />
              <ChevronDown size={16} className="dropdown-icon" />
              {isSupervisorOpen && (
                <div className="dropdown-menu">
                  {supervisorOptions.filter(option => 
                    option.toLowerCase().includes(supervisorSearch.toLowerCase())
                  ).length > 0 ? (
                    supervisorOptions
                      .filter(option => option.toLowerCase().includes(supervisorSearch.toLowerCase()))
                      .map((option, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setSupervisorSearch(option);
                            setSupervisor(option);
                            setIsSupervisorOpen(false);
                            setHoveredSupervisor(null);
                          }}
                          onMouseEnter={() => setHoveredSupervisor(option)}
                          onMouseLeave={() => setHoveredSupervisor(null)}
                          className={`dropdown-item-option ${
                            hoveredSupervisor === option 
                              ? 'dropdown-item-hovered' 
                              : supervisorSearch === option 
                              ? 'dropdown-item-selected' 
                              : 'dropdown-item-default'
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
          
          <div className="filter-grid-red">
            <label className="filter-label">Remark</label>
            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              rows={1}
              className="multiline-field"
              placeholder="Enter remarks here..."
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
          </div>
        </div>

        {/* Expected Date */}
        <div className="filter-grid" style={{ marginBottom: '24px' }}>
          <div className="filter-grid-red">
            <label className="filter-label">Expected Date of Completion</label>
            <input
              type="date"
              value={formData.expectdate}
              onChange={(e) => setFormData({ ...formData, expectdate: e.target.value })}
              className="filter-input"
            />
          </div>
          <div></div>
          <div></div>
           {/* Submit Button */}
        <div className="btn-container">
          <button onClick={handleSubmit} className="btn-search">
            <Send size={18} />  Submit
          </button>
        </div>
        </div>

      </div>
        </div>
      </div>
    </div>
  );
}