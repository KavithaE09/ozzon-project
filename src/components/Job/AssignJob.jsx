
import React, { useState, useRef, useEffect } from 'react';
import { Printer, Edit2, Trash2, ChevronDown, Search } from 'lucide-react';
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
  const [expectdate, setExpectdate] = useState('');
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
  const containerRef = useRef(null);
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
    window.history.back();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F3E8E8', padding: '24px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px', marginBottom: '10px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', color: '#111827' }}>Assign Job Order</h2>

        {/* First Row - Form Fields */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #2c1eed' }}>
            <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Job Order No</label>
            <input
              type="text"
              value={formData.jobOrderNo}
              readOnly
              style={{ width: '100%', padding: '1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', backgroundColor: 'white' }}
            />
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
            <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Sales Person Name</label>
            <div ref={formSalesPersonRef} style={{ position: 'relative' }}>
              <input
                type="text"
                value={formSalesPersonDropdown.searchTerm}
                onChange={(e) => setFormSalesPersonDropdown({ ...formSalesPersonDropdown, searchTerm: e.target.value, isOpen: true })}
                onFocus={() => setFormSalesPersonDropdown({ ...formSalesPersonDropdown, isOpen: true })}
                placeholder="Type or select..."
                style={{ 
                  width: '100%', 
                  padding: '1px', 
                  border: 'none', 
                  borderRadius: '4px', 
                  fontSize: '14px', 
                  outline: 'none',
                  backgroundColor: 'white',
                  cursor: 'text'
                }}
              />
              <ChevronDown 
                size={16} 
                style={{ 
                  position: 'absolute', 
                  right: '4px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#6B7280',
                  pointerEvents: 'none'
                }} 
              />
              {formSalesPersonDropdown.isOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  right: '0',
                  marginTop: '4px',
                  backgroundColor: 'white',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  zIndex: 1000
                }}>
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
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          color: formSalesPersonDropdown.hovered === option ? 'white' : '#374151',
                          backgroundColor: formSalesPersonDropdown.hovered === option ? '#A63128' : (formSalesPersonDropdown.searchTerm === option ? '#FEE2E2' : 'white'),
                          borderBottom: index < salesPersonOptions.filter(option => option.toLowerCase().includes(formSalesPersonDropdown.searchTerm.toLowerCase())).length - 1 ? '1px solid #E5E7EB' : 'none',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {option}
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '8px 12px', fontSize: '14px', color: '#9CA3AF' }}>
                      No matches found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
            <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Container No</label>
            <input
              type="text"
              name="containerNo"
              value={formData.containerNo}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }}
            />
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
            <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Customer Name</label>
            <div ref={formCustomerRef} style={{ position: 'relative' }}>
              <input
                type="text"
                value={formCustomerDropdown.searchTerm}
                onChange={(e) => setFormCustomerDropdown({ ...formCustomerDropdown, searchTerm: e.target.value, isOpen: true })}
                onFocus={() => setFormCustomerDropdown({ ...formCustomerDropdown, isOpen: true })}
                placeholder="Type or select..."
                style={{ width: '100%', padding: '1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', backgroundColor: 'white', cursor: 'text' }}
              />
              <ChevronDown size={16} style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280', pointerEvents: 'none' }} />
              {formCustomerDropdown.isOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  right: '0',
                  marginTop: '4px',
                  backgroundColor: 'white',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  zIndex: 1000
                }}>
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
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          color: formCustomerDropdown.hovered === option ? 'white' : '#374151',
                          backgroundColor: formCustomerDropdown.hovered === option ? '#A63128' : (formCustomerDropdown.searchTerm === option ? '#FEE2E2' : 'white'),
                          borderBottom: index < customerOptions.filter(option => option.toLowerCase().includes(formCustomerDropdown.searchTerm.toLowerCase())).length - 1 ? '1px solid #E5E7EB' : 'none',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {option}
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '8px 12px', fontSize: '14px', color: '#9CA3AF' }}>
                      No matches found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #22C55E' }}>
            <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Lead No</label>
            <input
             type="text"
              name="leadNo"
              value={formData.leadNo}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }}
            />
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #22C55E' }}>
            <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Quotation No</label>
           <input
             type="text"
              name="quotationNo"
              value={formData.quotationNo}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }}
            />
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #22C55E' }}>
            <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>PI No</label>
            <input
             type="text"
              name="piNo"
              value={formData.piNo}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '1px 1px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none' }}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '28px' }}>
            <button 
              onClick={handleSearch}
              style={{ 
                width: '150px',
                height: '50px',
                padding: '10px 24px', 
                backgroundColor: '#A63128', 
                color: 'white', 
                borderRadius: '15px', 
                fontSize: '14px', 
                fontWeight: '500', 
                border: 'none', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background-color 0.2s ease'
              }}
            >
              <Search size={18} /> Search
            </button>
          </div>
        </div>

        {/* Job Orders Table */}
        <div style={{ overflowX: 'auto', borderRadius: '4px', border: '1px solid #d1d5db', marginBottom: '32px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#fde2e2' }}>
                <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Select</th>
                <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>S/No</th>
                <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Lead No</th>
                <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Quotation No</th>
                <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>PI No</th>
                <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Sales Person</th>
                <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Customer Name</th>
                <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Advance Amount</th>
                <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: '600' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobOrders.map((order, index) => (
                <tr key={order.id} style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 8px' }}>
                    <input
                      type="radio"
                      checked={order.selected}
                      onChange={() => handleJobOrderSelect(order.id)}
                      style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                    />
                  </td>
                  <td style={{ padding: '12px 8px' }}>{order.sNo}.</td>
                  <td style={{ padding: '12px 8px' }}>
                    {order.isEditing ? (
                      <input
                        type="text"
                        value={order.leadNo}
                        onChange={(e) => handleJobOrderFieldChange(index, 'leadNo', e.target.value)}
                        style={{ width: '80px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}
                      />
                    ) : (
                      order.leadNo
                    )}
                  </td>
                  <td style={{ padding: '12px 8px' }}>
                    {order.isEditing ? (
                      <input
                        type="text"
                        value={order.quotationNo}
                        onChange={(e) => handleJobOrderFieldChange(index, 'quotationNo', e.target.value)}
                        style={{ width: '80px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}
                      />
                    ) : (
                      order.quotationNo
                    )}
                  </td>
                  <td style={{ padding: '12px 8px' }}>
                    {order.isEditing ? (
                      <input
                        type="text"
                        value={order.piNo}
                        onChange={(e) => handleJobOrderFieldChange(index, 'piNo', e.target.value)}
                        style={{ width: '80px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}
                      />
                    ) : (
                      order.piNo
                    )}
                  </td>
                  <td style={{ padding: '12px 8px' }}>
                    {order.isEditing ? (
                      <input
                        type="text"
                        value={order.salesPerson}
                        onChange={(e) => handleJobOrderFieldChange(index, 'salesPerson', e.target.value)}
                        style={{ width: '100px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}
                      />
                    ) : (
                      order.salesPerson
                    )}
                  </td>
                  <td style={{ padding: '12px 8px' }}>
                    {order.isEditing ? (
                      <input
                        type="text"
                        value={order.customerName}
                        onChange={(e) => handleJobOrderFieldChange(index, 'customerName', e.target.value)}
                        style={{ width: '100px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}
                      />
                    ) : (
                      order.customerName
                    )}
                  </td>
                  <td style={{ padding: '12px 8px' }}>
                    {order.isEditing ? (
                      <input
                        type="text"
                        value={order.advanceAmount}
                        onChange={(e) => handleJobOrderFieldChange(index, 'advanceAmount', e.target.value)}
                        style={{ width: '120px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}
                      />
                    ) : (
                      order.advanceAmount
                    )}
                  </td>
                  <td style={{ padding: '12px 8px' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      {order.isEditing ? (
                        <button 
                          onClick={(e) => handleSaveJobOrder(index, e)}
                          style={{ padding: '4px 12px', backgroundColor: '#22C55E', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', fontWeight: '500' }}
                        >
                          Save
                        </button>
                      ) : (
                        <>
                          <button onClick={(e) => handlePrintJobOrder(index, e)} style={{ background: 'none', border: 'none', cursor: 'pointer' }} title="Print">
                            <Printer size={18} style={{ color: '#374151' }} />
                          </button>
                          <button onClick={(e) => handleEditJobOrder(index, e)} style={{ background: 'none', border: 'none', cursor: 'pointer' }} title="Edit">
                            <Edit2 size={18} style={{ color: '#374151' }} />
                          </button>
                          <button onClick={(e) => handleDeleteJobOrder(index, e)} style={{ background: 'none', border: 'none', cursor: 'pointer' }} title="Delete">
                            <Trash2 size={18} style={{ color: '#dc2626' }} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
              }
            </tbody>
          </table>
      </div>

        {/* Container List */}
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Container List</h3>
          <div style={{ overflowX: 'auto', borderRadius: '4px', border: '1px solid #d1d5db' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                   <tr style={{ backgroundColor: '#fde2e2' }}>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Select</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>S/No</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Container No</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Party Name</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Sz/Type</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Grade</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Liner</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Yard</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>MFG Date</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>In Date</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Delivery Date</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Photo</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {containers.map((container) => (
                    <tr key={container.id} style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 8px' }}>
                        <input
                          type="checkbox"
                          checked={container.selected}
                          onChange={() => handleContainerSelect(container.id)}
                          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                        />
                      </td>
                      <td style={{ padding: '12px 8px' }}>{container.sNo}.</td>
                      <td style={{ padding: '12px 8px' }}>{container.containerNo}</td>
                      <td style={{ padding: '12px 8px' }}>{container.partyName}</td>
                      <td style={{ padding: '12px 8px' }}>{container.szType}</td>
                      <td style={{ padding: '12px 8px' }}>{container.grade}</td>
                      <td style={{ padding: '12px 8px' }}>{container.liner}</td>
                      <td style={{ padding: '12px 8px' }}>{container.yard}</td>
                      <td style={{ padding: '12px 8px' }}>{container.mfgDate}</td>
                      <td style={{ padding: '12px 8px' }}>{container.inDate}</td>
                      <td style={{ padding: '12px 8px' }}>{container.deliveryDate}</td>
                      <td style={{ padding: '12px 8px' }}>{container.photo}</td>
                      <td style={{ padding: '12px 8px' }}>{container.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      </div>

        {/* Supervisor and Remark */}
<div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '24px', marginTop: '24px' ,marginBottom: '10px'}}>
          <div 
            ref={supervisorRef}
            style={{ 
              backgroundColor: 'white', 
              padding: '10px', 
              borderRadius: '4px', 
              border: '1px solid #9CA3AF', 
              borderRight: '3px solid #DC2626', 
              position: 'relative' 
            }}
          >
            <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>
              Supervisor
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={supervisorSearch}
                onChange={(e) => {
                  setSupervisorSearch(e.target.value);
                  setIsSupervisorOpen(true);
                }}
                onFocus={() => setIsSupervisorOpen(true)}
                placeholder="SuperVisor"
                style={{ 
                  width: '100%', 
                  padding: '1px', 
                  border: 'none', 
                  borderRadius: '4px', 
                  fontSize: '14px', 
                  outline: 'none',
                  backgroundColor: 'white',
                  cursor: 'text'
                }}
              />
              <ChevronDown 
                size={16} 
                style={{ 
                  position: 'absolute', 
                  right: '4px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#6B7280',
                  pointerEvents: 'none'
                }} 
              />
              {isSupervisorOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  right: '0',
                  marginTop: '4px',
                  backgroundColor: 'white',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  zIndex: 1000
                }}>
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
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: hoveredSupervisor === option ? 'white' : '#374151',
                            backgroundColor: hoveredSupervisor === option ? '#A63128' : (supervisorSearch === option ? '#FEE2E2' : 'white'),
                            borderBottom: index < supervisorOptions.filter(option => 
                              option.toLowerCase().includes(supervisorSearch.toLowerCase())
                            ).length - 1 ? '1px solid #E5E7EB' : 'none',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {option}
                        </div>
                      ))
                  ) : (
                    <div style={{ padding: '8px 12px', fontSize: '14px', color: '#9CA3AF' }}>
                      No matches found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '12px', 
            borderRadius: '4px',  
            border: '1px solid #9CA3AF', 
            borderRight: '3px solid #DC2626',
            minHeight: '60px'
          }}>
            <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>
              Remark
            </label>
            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              rows={1}
              style={{ 
                width: '100%', 
                border: 'none', 
                borderRadius: '4px', 
                fontSize: '13px', 
                outline: 'none', 
                resize: 'none',
                overflow: 'hidden',
                fontFamily: 'inherit',
                lineHeight: '1.5',
                minHeight: '20px'
              }}
              placeholder="Enter remarks here..."
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                <div style={{ backgroundColor: 'white',width: '180px', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                  <label style={{ display: 'block', fontSize: '14px', color: '#374151', marginBottom: '8px', fontWeight: '600' }}>Expected Date of Completion</label>
                  <input
                    type="date"
                    value={formData.expectdate}
                    onChange={(e) =>
                      setFormData({ ...formData, expectdate: e.target.value })
                    }
                    style={{ width: '100%', padding: '1px', border: 'none', outline: 'none' }}
                  />

                </div>
                </div>
      {/* Submit Button */}
         <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button
                  onClick={handleSubmit}
                  type="button"
                  aria-label="Submit selected containers"
                  style={{
                    width: '150px',
                    height: '50px',
                    padding: '10px 24px', 
                    backgroundColor: '#A63128', 
                    color: 'white', 
                    borderRadius: '15px', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    border: 'none', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span>✓</span>
                  Submit
                </button>
              </div>
              </div>
              <button 
            onclick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>
            <span>←</span>
            <span>Back</span>
          </button>
      </div>
     

  );
}