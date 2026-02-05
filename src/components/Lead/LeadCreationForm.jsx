import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown,Send,Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LeadCreationForm(){
  
  const jobList = [
    {
      leadNo: 'L-1',
      quotationNo: 'Q-1',
      piNo: 'P-1',
      jobOrderNo: 'J-1',
      jobOrderDate: '01-01-2026',
      assignDate: '01-01-2026',
      salesPerson: 'Raneesh',
      customerName: 'Raneesh'
    },
    {
      leadNo: 'L-2',
      quotationNo: 'Q-1',
      piNo: 'P-1',
      jobOrderNo: 'J-1',
      jobOrderDate: '01-01-2026',
      assignDate: '01-01-2026',
      salesPerson: 'Raneesh',
      customerName: 'Raneesh'
    }
  ];

  const navigate = useNavigate();
  const leadOwnerDropdownRef = useRef(null);
  const leadStatusDropdownRef = useRef(null);
  const leadSourceDropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    leadOwner: '',
    company: '',
    firstName: '',
    lastName: '',
    leadName: '',
    title: '',
    email: '',
    phoneNo: '',
    mobileNo: '',
    website: '',
    city: '',
    leadStatus: '',
    leadSource: '',
    requirements: '',
    otherRequirements: '',
    leadPriority: '',
    brokerName: '',  
    remark: '',
    description: ''
  });

  const [leadOwnerSearch, setLeadOwnerSearch] = useState('');
  const [isLeadOwnerOpen, setIsLeadOwnerOpen] = useState(false);
  const [hoveredLeadOwner, setHoveredLeadOwner] = useState(null);
  const [leadStatusSearch, setLeadStatusSearch] = useState('');
  const [isLeadStatusOpen, setIsLeadStatusOpen] = useState(false);
  const [hoveredLeadStatus, setHoveredLeadStatus] = useState(null);
  const [leadSourceSearch, setLeadSourceSearch] = useState('');
  const [isLeadSourceOpen, setIsLeadSourceOpen] = useState(false);
  const [hoveredLeadSource, setHoveredLeadSource] = useState(null);

  const leadOwnerOptions = [
    'Sales Team',
    'Services Team',
    'Production Team'
  ];
  const leadStatusOptions = [
    'New',
    'Contacted',
    'Qualified',
    'Converted'
  ];
  const leadSourceOptions = [
    'Website',
    'Referral',
    'Social Media',
    'Advertisement'
  ];

  const filteredLeadOwners = leadOwnerOptions.filter(opt =>
    opt.toLowerCase().includes(leadOwnerSearch.toLowerCase())
  );

  const filteredLeadStatuses = leadStatusOptions.filter(opt =>
    opt.toLowerCase().includes(leadStatusSearch.toLowerCase())
  );

  const filteredLeadSources = leadSourceOptions.filter(opt =>
    opt.toLowerCase().includes(leadSourceSearch.toLowerCase())
  );

  const handleLeadOwnerInput = (e) => {
    setLeadOwnerSearch(e.target.value);
    setIsLeadOwnerOpen(true);
  };

  const handleLeadOwnerSelect = (option) => {
    setFormData({ ...formData, leadOwner: option });
    setLeadOwnerSearch(option);
    setIsLeadOwnerOpen(false);
  };

  const handleLeadStatusInput = (e) => {
    setLeadStatusSearch(e.target.value);
    setIsLeadStatusOpen(true);
  };

  const handleLeadStatusSelect = (option) => {
    setFormData({ ...formData, leadStatus: option });
    setLeadStatusSearch(option);
    setIsLeadStatusOpen(false);
  };

  const handleLeadSourceInput = (e) => {
    setLeadSourceSearch(e.target.value);
    setIsLeadSourceOpen(true);
  };

  const handleLeadSourceSelect = (option) => {
    setFormData({ ...formData, leadSource: option });
    setLeadSourceSearch(option);
    setIsLeadSourceOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDescriptionChange = (e) => {
    setFormData({
      ...formData,
      description: e.target.value
    });
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

  const handleClear = () => {
    setFormData({
      leadOwner: '',
      company: '',
      firstName: '',
      lastName: '',
      leadName: '',
      title: '',
      email: '',
      phoneNo: '',
      mobileNo: '',
      website: '',
      city: '',
      leadStatus: '',
      leadSource: '',
      requirements: '',
      otherRequirements: '',
      leadPriority: '',
      brokerName: '',
      remark: '',
      description: ''
    });
    setLeadOwnerSearch('');
    setLeadStatusSearch('');
    setLeadSourceSearch('');
  };

  const handleBack = () => {
    alert('Going back...');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (leadOwnerDropdownRef.current && !leadOwnerDropdownRef.current.contains(e.target)) {
        setIsLeadOwnerOpen(false);
      }
      if (leadStatusDropdownRef.current && !leadStatusDropdownRef.current.contains(e.target)) {
        setIsLeadStatusOpen(false);
      }
      if (leadSourceDropdownRef.current && !leadSourceDropdownRef.current.contains(e.target)) {
        setIsLeadSourceOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [containers, setContainers] = useState([
    { id: 1, selected: false, sNo: 1, containerNo: 'TCKU 1524662', partyName: 'Christine Brooks', szType: '20"', grade: '', liner: '', yard: 'Golbal', mfgDate: '04-09-2019', inDate: '04-09-2019', deliveryDate: '04-09-2019', photo: '', status: 'Available'},
    { id: 2, selected: false, sNo: 2, containerNo: 'TCKU 1524662', partyName: 'Rosie Pearson', szType: '20"', grade: '', liner: '', yard: 'Golbal', mfgDate: '04-09-2019', inDate: '04-09-2019', deliveryDate: '04 Sep 2019', photo: '', status: 'Hold'}
  ]);

  const [openRow, setOpenRow] = useState(null);
  const [tableData, setTableData] = useState([
    {
      sNo: 1,
      leadNo: 101,
      leadDate: '04-09-2019',
      qNo: 'Q-101',
      qDate: '04 Sep 2019',
      piNo: '',
      piDate: '04 Sep 2019',
      salesPerson: 'Raneesh',
      containerNo: 'TCKU 1524662',
      partyName: 'Christine Brooks',
      szType: '20"',
      grade: '',
      liner: '',
      inDate: '04-09-2019',
      deliveryDate: '04-09-2019',
      photo: '',
      status: 'Sold Out'
    },
    {
      sNo: 2,
      leadNo: 101,
      leadDate: '04 Sep 2019',
      qNo: 'Q-101',
      qDate: '04 Sep 2019',
      piNo: '',
      piDate: '04 Sep 2019',
      salesPerson: 'Raneesh',
      containerNo: 'TCKU 1524662',
      partyName: 'Rosie Pearson',
      szType: '20"',
      grade: '',
      liner: '',
      inDate: '04 Sep 2019',
      deliveryDate: '04 Sep 2019',
      photo: '',
      status: 'Sold Out'
    }
  ]);

  const jobOrders = [
    {
      jobOrderNo: 'TCKU 1524662',
      jobDate: '20-01-25',
      customerName: 'Raneesh',
      salesPerson: 'Ramesh',
      narration: 'Ramesh',
      status: 'Unit',
      remark: 'Unit'
    },
    {
      jobOrderNo: 'TCKU 1524662',
      jobDate: '20-01-25',
      customerName: 'Raneesh',
      salesPerson: 'Ramesh',
      narration: 'Ramesh',
      status: 'Unit',
      remark: 'Unit'
    },
    {
      jobOrderNo: 'TCKU 1524663',
      jobDate: '21-01-25',
      customerName: 'Bala',
      salesPerson: 'Suresh',
      narration: 'Suresh',
      status: 'Pending',
      remark: 'Pending'
    },
    {
      jobOrderNo: 'TCKU 1524664',
      jobDate: '22-01-25',
      customerName: 'Naveen',
      salesPerson: 'Kumar',
      narration: 'Kumar',
      status: 'Completed',
      remark: 'Done'
    },
    {
      jobOrderNo: 'TCKU 1524665',
      jobDate: '23-01-25',
      customerName: 'Raja',
      salesPerson: 'Vijay',
      narration: 'Vijay',
      status: 'In Progress',
      remark: 'Working'
    }
  ];

  const jobReviewList = [
    {
      description: 'Door - MODIFICATION OF PLAIN OFFICE WITH COUNTER WINDOW',
      dimension: '20*8*8.6',
      unit: 1,
      amount: 1000000,
      hiddenAmount: 1000000
    },
    {
      description: 'Window - UPVC sliding window with mesh',
      dimension: '20*8*8.6',
      unit: 2,
      amount: 500000,
      hiddenAmount: 500000
    },
    {
      description: 'Flooring - Vitrified tiles 2x2 feet',
      dimension: '20*8*8.6',
      unit: 1,
      amount: 100000,
      hiddenAmount: 100000
    },
    {
      description: 'Roofing - MS sheet roofing with insulation',
      dimension: '20*8*8.6',
      unit: 1,
      amount: 100000,
      hiddenAmount: 100000
    }
  ];

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          
          <div className="content-card">
            {/* Progress Stepper - Responsive */}
            <div className="flex justify-center overflow-x-auto pb-4 px-2">
              <div className="flex min-w-max">
                {[
                  'Lead',
                  'Quotation',
                  'Proforma Invoice',
                  'Advance',
                  'Job assign',
                  'Job completed',
                  'Sold out'
                ].map((label, index) => (
                  <div key={index} className="relative flex flex-col items-center w-[100px] sm:w-[120px] md:w-[140px]">
                    {/* LINE (except last) */}
                    {index !== 6 && <div className="absolute top-[18px] left-1/2 w-full h-0.5 bg-gray-300 z-[1]" />}

                    {/* CIRCLE */}
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-semibold z-[2] text-sm ${
                      index === 0 
                        ? 'bg-red-600 text-white' 
                        : 'border-2 border-gray-400 bg-white text-gray-700'
                    }`}>
                      {index === 0 ? '✓' : index + 1}
                    </div>

                    {/* LABEL */}
                    <div className={`mt-2 text-[10px] sm:text-xs text-center px-1 ${
                      index === 0 ? 'text-red-600 font-semibold' : ''
                    }`}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

           <div className="page-header">
              <h1 className="page-title">Lead</h1>
              <button 
                onClick={() => navigate(-1)} 
                className="page-back-btn"
                aria-label="Go back"
              >
                <Undo2   className="page-back-icon" />
              </button>
            </div>

            
            {/* Form Grid - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6">
              {/* Lead Owner Dropdown */}
              <div ref={leadOwnerDropdownRef} className="filter-grid-red">
                <label className="filter-label">Lead Owner</label>
                <div className="dropdown-wrapper">
                  <input
                    type="text"
                    value={leadOwnerSearch}
                    onChange={handleLeadOwnerInput}
                    onFocus={() => setIsLeadOwnerOpen(true)}
                    placeholder="Type or select..."
                    className="dropdown-input"
                  />
                  <ChevronDown size={20} className="dropdown-icon" />
                </div>
                {isLeadOwnerOpen && (
                  <div className="dropdown-menu">
                    {filteredLeadOwners.length > 0 ? (
                      filteredLeadOwners.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleLeadOwnerSelect(option)}
                          onMouseEnter={() => setHoveredLeadOwner(option)}
                          onMouseLeave={() => setHoveredLeadOwner(null)}
                          className={`dropdown-item-option ${
                            hoveredLeadOwner === option 
                              ? 'dropdown-item-hovered' 
                              : formData.leadOwner === option 
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

              <div className="filter-grid-red">
                <label className="filter-label">Company</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Logic-Tech" className="filter-input" />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Raneesh" className="filter-input" />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Kumar" className="filter-input" />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">Lead Name</label>
                <input type="text" name="leadName" value={formData.leadName} onChange={handleChange} placeholder="Ranee" className="filter-input" />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Figma-Design" className="filter-input" />
              </div>

              <div className="filter-grid-blue">
                <label className="filter-label">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Nathan@gmail.com" className="filter-input" />
              </div>

              <div className="filter-grid-blue">
                <label className="filter-label">Phone No</label>
                <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleChange} placeholder="2481-7764" className="filter-input" />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">Mobile No</label>
                <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder="9638527410" className="filter-input" />
              </div>

              <div className="filter-grid-blue">
                <label className="filter-label">Website</label>
                <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="WWW.com" className="filter-input" />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Tirupatpur" className="filter-input" />
              </div>

              {/* Lead Status Dropdown */}
              <div ref={leadStatusDropdownRef} className="filter-grid-red">
                <label className="filter-label">Lead Status</label>
                <div className="dropdown-wrapper">
                  <input
                    type="text"
                    value={leadStatusSearch}
                    onChange={handleLeadStatusInput}
                    onFocus={() => setIsLeadStatusOpen(true)}
                    placeholder="Type or select..."
                    className="dropdown-input"
                  />
                  <ChevronDown size={20} className="dropdown-icon" />
                </div>
                {isLeadStatusOpen && (
                  <div className="dropdown-menu">
                    {filteredLeadStatuses.length > 0 ? (
                      filteredLeadStatuses.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleLeadStatusSelect(option)}
                          onMouseEnter={() => setHoveredLeadStatus(option)}
                          onMouseLeave={() => setHoveredLeadStatus(null)}
                          className={`dropdown-item-option ${
                            hoveredLeadStatus === option 
                              ? 'dropdown-item-hovered' 
                              : formData.leadStatus === option 
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

              {/* Lead Source Dropdown */}
              <div ref={leadSourceDropdownRef} className="filter-grid-red">
                <label className="filter-label">Lead Source</label>
                <div className="dropdown-wrapper">
                  <input
                    type="text"
                    value={leadSourceSearch}
                    onChange={handleLeadSourceInput}
                    onFocus={() => setIsLeadSourceOpen(true)}
                    placeholder="Type or select..."
                    className="dropdown-input"
                  />
                  <ChevronDown size={20} className="dropdown-icon" />
                </div>
                {isLeadSourceOpen && (
                  <div className="dropdown-menu">
                    {filteredLeadSources.length > 0 ? (
                      filteredLeadSources.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleLeadSourceSelect(option)}
                          onMouseEnter={() => setHoveredLeadSource(option)}
                          onMouseLeave={() => setHoveredLeadSource(null)}
                          className={`dropdown-item-option ${
                            hoveredLeadSource === option 
                              ? 'dropdown-item-hovered' 
                              : formData.leadSource === option 
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

              <div className="filter-grid-red">
                <label className="filter-label">Requirements</label>
                <input type="text" name="requirements" value={formData.requirements} onChange={handleChange} placeholder="House Model" className="filter-input" />
              </div>

              <div className="filter-grid-blue">
                <label className="filter-label">Other Requirements</label>
                <input type="text" name="otherRequirements" value={formData.otherRequirements} onChange={handleChange} placeholder="Reffer Container" className="filter-input" />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">Lead Priority</label>
                <input type="text" name="leadPriority" value={formData.leadPriority} onChange={handleChange} placeholder="Warm" className="filter-input" />
              </div>

              <div className="filter-grid-red">
                <label className="filter-label">Broker Name</label>
                <input type="text" name="brokerName" value={formData.brokerName} onChange={handleChange} placeholder="Broker Name" className="filter-input" />
              </div>

              {/* Remark field - full width on mobile, spans 3 cols on larger screens */}
              <div className="filter-grid-blue col-span-1 sm:col-span-2 lg:col-span-3">
                <label className="filter-label">Remark</label>
                <input type="text" name="remark" value={formData.remark} onChange={handleChange} placeholder="Enter remark" className="filter-input" />
              </div>
            </div>

            {/* Action Buttons - Responsive */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 px-4 sm:px-6 mt-8">
              <button onClick={handleClear} className="btn-back sm:ml-auto order-2 sm:order-1">
                <span>✕</span>
                <span>Clear</span>
              </button> 
              
              <button onClick={handleSubmit} className="btn-all order-1 sm:order-2">
               <Send size={18} />  Submit
              </button>
            </div>

            {/* Tables Section - Responsive */}
            <div className="flex w-full mt-6 flex-col bg-gray-50 rounded-xl shadow-sm">
              
              {/* Container List Table */}
              <div className="mt-4 px-2 sm:px-4">
                <h3 className="section-title ml-2 sm:ml-[18px]">Container List</h3>
                <div className="table-container w-full sm:w-[98%] ml-0 sm:ml-[18px]">
                  <div className="overflow-x-auto">
                    <table className="data-table min-w-[800px]">
                      <thead className="table-header">
                        <tr>
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
              </div>

              {/* Job Order Table */}
              <div className="mt-4 px-2 sm:px-4">
                <h3 className="section-title ml-2 sm:ml-[18px]">Job order</h3>
                <div className="table-container w-full sm:w-[98%] ml-0 sm:ml-[18px]">
                  <div className="overflow-x-auto">
                    <table className="data-table min-w-[700px]">
                      <thead className="table-header">
                        <tr>
                          {[
                            'S/No',
                            'Job Order No',
                            'Job Date',
                            'Customer Name',
                            'Sales Person',
                            'Narration',
                            'Status',
                            'Remark'
                          ].map((head, i) => (
                            <th key={i} className="table-th-center">
                              {head}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {jobOrders.map((row, index) => (
                          <tr key={index} className="table-row">
                            <td className="table-cell-center">{index + 1}.</td>
                            <td className="table-cell-center">{row.jobOrderNo}</td>
                            <td className="table-cell-center">{row.jobDate}</td>
                            <td className="table-cell-center">{row.customerName}</td>
                            <td className="table-cell-center">{row.salesPerson}</td>
                            <td className="table-cell-center">{row.narration}</td>
                            <td className="table-cell-center">{row.status}</td>
                            <td className="table-cell-center">{row.remark}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Task Assign Table */}
              <div className="mt-4 px-2 sm:px-4">
                <h3 className="section-title ml-2 sm:ml-[18px]">task assign</h3>
                <div className="table-container w-full sm:w-[98%] ml-0 sm:ml-[18px]">
                  <div className="overflow-x-auto">
                    <table className="data-table min-w-[900px]">
                      <thead className="table-header">
                        <tr>
                          {[
                            'S/No',
                            'Lead No',
                            'Quotation No',
                            'PI No',
                            'Job Order No',
                            'Job Order Date',
                            'Assign Date',
                            'Sales Person',
                            'Customer Name'
                          ].map((head, index) => (
                            <th key={index} className="table-th-center">
                              {head}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {jobList.map((row, index) => (
                          <tr key={index} className="table-row">
                            <td className="table-cell-center">{index + 1}.</td>
                            <td className="table-cell-center">{row.leadNo}</td>
                            <td className="table-cell-center">{row.quotationNo}</td>
                            <td className="table-cell-center">{row.piNo}</td>
                            <td className="table-cell-center">{row.jobOrderNo}</td>
                            <td className="table-cell-center">{row.jobOrderDate}</td>
                            <td className="table-cell-center">{row.assignDate}</td>
                            <td className="table-cell-center">{row.salesPerson}</td>
                            <td className="table-cell-center">{row.customerName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Task Completion Table */}
              <div className="mt-4 px-2 sm:px-4 pb-4">
                <h3 className="section-title ml-2 sm:ml-[18px]">task completion</h3>
                <div className="table-container w-full sm:w-[98%] ml-0 sm:ml-[18px]">
                  <div className="overflow-x-auto">
                    <table className="data-table min-w-[700px]">
                      <thead className="table-header">
                        <tr>
                          {[
                            'Sl No',
                            'Description',
                            'Dimension',
                            'No. of Unit',
                            'Amount',
                            'Hidden Amount'
                          ].map((head, index) => (
                            <th key={index} className={index === 1 ? 'table-th' : 'table-th-center'}>
                              {head}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {jobReviewList.map((row, index) => (
                          <tr key={index} className="table-row">
                            <td className="table-cell-center">{index + 1}</td>
                            <td className="table-cell">{row.description}</td>
                            <td className="table-cell-center">{row.dimension}</td>
                            <td className="table-cell-center">{row.unit}</td>
                            <td className="table-cell text-right whitespace-nowrap">₹ {row.amount.toLocaleString()}</td>
                            <td className="table-cell text-right whitespace-nowrap">₹ {row.hiddenAmount.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}