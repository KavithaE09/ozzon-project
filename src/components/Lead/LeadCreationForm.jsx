import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
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
    // Auto-resize textarea
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
   const stepWrapper = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 140
};

const circleStyle = {
  width: 36,
  height: 36,
  borderRadius: '50%',
  border: '2px solid #9CA3AF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 600,
  background: '#fff',
  color: '#374151',
  zIndex: 2
};

const activeCircle = {
  ...circleStyle,
  background: '#DC2626',
  color: '#fff',
  border: 'none'
};

const lineStyle = {
  position: 'absolute',
  top: 18,             
  left: '50%',
  width: '100%',
  height: 2,
  backgroundColor: '#D1D5DB',
  zIndex: 1
};

const labelStyle = {
  marginTop: 8,
  fontSize: 12,
  textAlign: 'center'
};

const activeLabel = {
  ...labelStyle,
  color: '#DC2626',
  fontWeight: 600
};
const tdStyle = {
  padding: '12px 10px',
  textAlign: 'center',
  whiteSpace: 'nowrap'
};
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
const tdCenter = {
  padding: '12px 10px',
  textAlign: 'center',
  whiteSpace: 'nowrap'
};

const tdLeft = {
  padding: '12px 10px',
  textAlign: 'left'
};

const tdRight = {
  padding: '12px 10px',
  textAlign: 'right',
  whiteSpace: 'nowrap'
  
};
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
    
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F9FAFB' }}>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ flex: 1, overflow: 'auto', padding: '20px', backgroundColor: '#F3E8E8' }}>
          
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>

  {[
    'Lead',
    'Quotation',
    'Performa Invoice',
    'Advance',
    'Job assign',
    'Job completed',
    'Sold out'
  ].map((label, index) => (
    <div key={index} style={stepWrapper}>

      {/* LINE (except last) */}
      {index !== 6 && <div style={lineStyle} />}

      {/* CIRCLE */}
      <div style={index === 0 ? activeCircle : circleStyle}>
        {index === 0 ? '✓' : index + 1}
      </div>

      {/* LABEL */}
      <div style={index === 0 ? activeLabel : labelStyle}>
        {label}
      </div>

    </div>
  ))}

</div>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937', marginBottom: '20px' }}>Lead</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {/* Lead Owner Dropdown */}
              <div
                ref={leadOwnerDropdownRef}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #9CA3AF',
                  borderRight: '3px solid #DC2626',
                  position: 'relative'
                }}
              >
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: '600' }}>
                  Lead Owner
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={leadOwnerSearch}
                    onChange={handleLeadOwnerInput}
                    onFocus={() => setIsLeadOwnerOpen(true)}
                    placeholder="Type or select..."
                    style={{ width: '100%', padding: '1px 1px', border: 'none', fontSize: '14px', outline: 'none', backgroundColor: 'white' }}
                  />
                  <ChevronDown size={20} style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', color: '#000000', pointerEvents: 'none' }} />
                </div>
                {isLeadOwnerOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', backgroundColor: 'white', border: '1px solid #D1D5DB', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxHeight: '180px', overflowY: 'auto', zIndex: 1000 }}>
                    {filteredLeadOwners.length > 0 ? (
                      filteredLeadOwners.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleLeadOwnerSelect(option)}
                          onMouseEnter={() => setHoveredLeadOwner(option)}
                          onMouseLeave={() => setHoveredLeadOwner(null)}
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: hoveredLeadOwner === option ? 'white' : '#374151',
                            backgroundColor: hoveredLeadOwner === option ? '#A63128' : formData.leadOwner === option ? '#FEE2E2' : 'white',
                            borderBottom: index < filteredLeadOwners.length - 1 ? '1px solid #E5E7EB' : 'none'
                          }}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '8px', fontSize: '14px', color: '#9CA3AF' }}>No matches found</div>
                    )}
                  </div>
                )}
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: '600' }}>Company</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Logic-Tech" style={{ width: '100%', padding: '1px 1px', fontSize: '14px', border: 'none', borderRadius: '4px', outline: 'none' }} />
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: '600' }}>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Raneesh" style={{ width: '100%', padding: '1px 1px', fontSize: '14px', border: 'none', borderRadius: '4px', outline: 'none' }} />
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: '600' }}>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Kumar" style={{ width: '100%', padding: '1px 1px', fontSize: '14px', border: 'none', borderRadius: '4px', outline: 'none' }} />
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: '600' }}>Lead Name</label>
                <input type="text" name="leadName" value={formData.leadName} onChange={handleChange} placeholder="Ranee" style={{ width: '100%', padding: '1px 1px', fontSize: '14px', border: 'none', borderRadius: '4px', outline: 'none' }} />
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: '600' }}>Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Figma-Design" style={{ width: '100%', padding: '1px 1px', fontSize: '14px', border: 'none', borderRadius: '4px', outline: 'none' }} />
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #2c1eed'}}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: '600' }}>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Nathan@gmail.com" style={{ width: '100%', padding: '1px 1px', fontSize: '14px', border: 'none', borderRadius: '4px', outline: 'none' }} />
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #2c1eed'}}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: '600' }}>Phone No</label>
                <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleChange} placeholder="2481-7764" style={{ width: '100%', padding: '1px 1px', fontSize: '14px', border: 'none', borderRadius: '4px', outline: 'none' }} />
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: '600' }}>Mobile No</label>
                <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder="9638527410" style={{ width: '100%', padding: '1px 1px', fontSize: '14px', border: 'none', borderRadius: '4px', outline: 'none' }} />
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid #9CA3AF',borderRight: '3px solid #2c1eed'}}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: '600' }}>Website</label>
                <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="WWW.com" style={{ width: '100%', padding: '1px 1px', fontSize: '14px', border: 'none', borderRadius: '4px', outline: 'none' }} />
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: '600' }}>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Tirupatpur" style={{ width: '100%', padding: '1px 1px', fontSize: '14px', border: 'none', borderRadius: '4px', outline: 'none' }} />
              </div>

              {/* Lead Status Dropdown */}
              <div
                ref={leadStatusDropdownRef}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #9CA3AF',
                  borderRight: '3px solid #DC2626',
                  position: 'relative'
                }}
              >
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: '600' }}>
                  Lead Status
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={leadStatusSearch}
                    onChange={handleLeadStatusInput}
                    onFocus={() => setIsLeadStatusOpen(true)}
                    placeholder="Type or select..."
                    style={{ width: '100%', padding: '1px 1px', border: 'none', fontSize: '14px', outline: 'none', backgroundColor: 'white' }}
                  />
                  <ChevronDown size={20} style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', color: '#000000', pointerEvents: 'none' }} />
                </div>
                {isLeadStatusOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', backgroundColor: 'white', border: '1px solid #D1D5DB', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxHeight: '180px', overflowY: 'auto', zIndex: 1000 }}>
                    {filteredLeadStatuses.length > 0 ? (
                      filteredLeadStatuses.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleLeadStatusSelect(option)}
                          onMouseEnter={() => setHoveredLeadStatus(option)}
                          onMouseLeave={() => setHoveredLeadStatus(null)}
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: hoveredLeadStatus === option ? 'white' : '#374151',
                            backgroundColor: hoveredLeadStatus === option ? '#A63128' : formData.leadStatus === option ? '#FEE2E2' : 'white',
                            borderBottom: index < filteredLeadStatuses.length - 1 ? '1px solid #E5E7EB' : 'none'
                          }}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '8px', fontSize: '14px', color: '#9CA3AF' }}>No matches found</div>
                    )}
                  </div>
                )}
              </div>

              {/* Lead Source Dropdown */}
              <div
                ref={leadSourceDropdownRef}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #9CA3AF',
                  borderRight: '3px solid #DC2626',
                  position: 'relative'
                }}
              >
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: '600' }}>
                  Lead Source
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={leadSourceSearch}
                    onChange={handleLeadSourceInput}
                    onFocus={() => setIsLeadSourceOpen(true)}
                    placeholder="Type or select..."
                    style={{ width: '100%', padding: '1px 1px', border: 'none', fontSize: '14px', outline: 'none', backgroundColor: 'white' }}
                  />
                  <ChevronDown size={20} style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', color: '#000000', pointerEvents: 'none' }} />
                </div>
                {isLeadSourceOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', backgroundColor: 'white', border: '1px solid #D1D5DB', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxHeight: '180px', overflowY: 'auto', zIndex: 1000 }}>
                    {filteredLeadSources.length > 0 ? (
                      filteredLeadSources.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleLeadSourceSelect(option)}
                          onMouseEnter={() => setHoveredLeadSource(option)}
                          onMouseLeave={() => setHoveredLeadSource(null)}
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: hoveredLeadSource === option ? 'white' : '#374151',
                            backgroundColor: hoveredLeadSource === option ? '#A63128' : formData.leadSource === option ? '#FEE2E2' : 'white',
                            borderBottom: index < filteredLeadSources.length - 1 ? '1px solid #E5E7EB' : 'none'
                          }}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '8px', fontSize: '14px', color: '#9CA3AF' }}>No matches found</div>
                    )}
                  </div>
                )}
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: '600' }}>Requirements</label>
                <input type="text" name="requirements" value={formData.requirements} onChange={handleChange} placeholder="House Model" style={{ width: '100%', padding: '1px 1px', fontSize: '14px', border: 'none', borderRadius: '4px', outline: 'none' }} />
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #2c1eed'}}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: '600' }}>Other Requirements</label>
                <input type="text" name="otherRequirements" value={formData.otherRequirements} onChange={handleChange} placeholder="Reffer Container" style={{ width: '100%', padding: '1px 1px', fontSize: '14px', border: 'none', borderRadius: '4px', outline: 'none' }} />
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: '600' }}>Lead Priority</label>
                <input type="text" name="leadPriority" value={formData.leadPriority} onChange={handleChange} placeholder="Warm" style={{ width: '100%', padding: '1px 1px', fontSize: '14px', border: 'none', borderRadius: '4px', outline: 'none' }} />
              </div>
            </div>

            {/* Description with Auto-expand */}
            <div style={{ marginTop: '16px', backgroundColor: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #2c1eed'}}>
              <label style={{ display: 'block', fontSize: '16px', color: '#374151', marginBottom: '6px', fontWeight: '600' }}>Remark</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleDescriptionChange} 
                placeholder="Enter Remarks here..." 
                rows="1" 
                style={{ 
                  width: '100%', 
                  padding: '1px 1px', 
                  fontSize: '16px', 
                  border: 'none', 
                  borderRadius: '4px', 
                  outline: 'none', 
                  fontFamily: 'inherit',
                  resize: 'none',
                  minHeight: '24px',
                  lineHeight: '20px',
                  overflow: 'hidden'
                }} 
              />
            </div>
          </div>

          
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={handleClear} style={{ display: 'flex',  marginTop: '30px' , marginLeft: 'auto' ,alignItems: 'center', gap: '8px', padding: '8px 24px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>
                <span>✕</span>
                <span>Clear</span>
              </button> 
              
              <button onClick={handleSubmit} style={{ display: 'flex', marginTop: '30px', alignItems: 'center', gap: '8px', padding: '8px 24px', fontSize: '13px', fontWeight: '500', color: 'white', backgroundColor: '#B91C1C', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                <span>✓</span>
                <span>Submit</span>
              </button>
            </div>
            <div style={{ display: 'flex',width: '100%', marginTop: "24px", flexDirection: 'column', backgroundColor: '#F9FAFB',borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              
              <div style={{ marginTop: '15px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', marginLeft: '18px' }}>Container List</h3>
          <div style={{ overflowX: 'auto', borderRadius: '4px', border: '1px solid #d1d5db' , width: '98%',marginLeft: '18px' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                   <tr style={{ backgroundColor: '#fde2e2' }}>
                   
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
      <div style={{ marginTop: '15px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', marginLeft: '18px' }}>Job order</h3>
          <div
  style={{
    overflowX: 'auto',
    border: '1px solid #9ca3af',
    borderRadius: '6px',
    width: '98%',
    marginLeft: '18px',
    backgroundColor: '#fff'
  }}
>
  <table
    style={{
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '13px'
    }}
  >
    <thead>
      <tr style={{ backgroundColor: '#fde2e2' }}>
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
          <th
            key={i}
            style={{
              padding: '12px 10px',
              textAlign: 'center',
              fontWeight: 600,
              borderBottom: '1px solid #9ca3af',
              whiteSpace: 'nowrap'
            }}
          >
            {head}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {jobOrders.map((row, index) => (
        <tr
          key={index}
          style={{
            borderBottom: '1px solid #e5e7eb'
          }}
        >
          <td style={tdStyle}>{index + 1}.</td>
          <td style={tdStyle}>{row.jobOrderNo}</td>
          <td style={tdStyle}>{row.jobDate}</td>
          <td style={tdStyle}>{row.customerName}</td>
          <td style={tdStyle}>{row.salesPerson}</td>
          <td style={tdStyle}>{row.narration}</td>
          <td style={tdStyle}>{row.status}</td>
          <td style={tdStyle}>{row.remark}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
<div style={{ marginTop: '15px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', marginLeft: '18px' }}>task assign</h3>
          </div>
<div
  style={{
    overflowX: 'auto',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    width: '98%',
    marginLeft: '18px',
    backgroundColor: '#fff'
  }}
>
  <table
    style={{
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '13px'
    }}
  >
    <thead>
      <tr style={{ backgroundColor: '#fde2e2' }}>
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
          <th
            key={index}
            style={{
              padding: '12px 10px',
              textAlign: 'center',
              fontWeight: 600,
              borderBottom: '1px solid #d1d5db',
              whiteSpace: 'nowrap'
            }}
          >
            {head}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {jobList.map((row, index) => (
        <tr
          key={index}
          style={{
            borderBottom: '1px solid #e5e7eb'
          }}
        >
          <td style={tdStyle}>{index + 1}.</td>
          <td style={tdStyle}>{row.leadNo}</td>
          <td style={tdStyle}>{row.quotationNo}</td>
          <td style={tdStyle}>{row.piNo}</td>
          <td style={tdStyle}>{row.jobOrderNo}</td>
          <td style={tdStyle}>{row.jobOrderDate}</td>
          <td style={tdStyle}>{row.assignDate}</td>
          <td style={tdStyle}>{row.salesPerson}</td>
          <td style={tdStyle}>{row.customerName}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
<div style={{ marginTop: '15px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', marginLeft: '18px' }}>task completion</h3>
          </div>
          <div
  style={{
    overflowX: 'auto',
    border: '1px solid #9ca3af',
    borderRadius: '6px',
    width: '98%',
    marginLeft: '18px',
    backgroundColor: '#fff'
  }}
>
  <table
    style={{
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '13px'
    }}
  >
    <thead>
      <tr style={{ backgroundColor: '#fde2e2' }}>
        {[
          'Sl No',
          'Description',
          'Dimension',
          'No. of Unit',
          'Amount',
          'Hidden Amount'
        ].map((head, index) => (
          <th
            key={index}
            style={{
              padding: '12px 10px',
              textAlign: index === 1 ? 'left' : 'center',
              fontWeight: 600,
              borderBottom: '1px solid #9ca3af',
              whiteSpace: 'nowrap',
              padding: '12px 10px',
    textAlign: 'center',     // 🔥 IMPORTANT
    fontWeight: 600,
    borderBottom: '1px solid #9ca3af',
    whiteSpace: 'nowrap'
            }}
          >
            {head}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {jobReviewList.map((row, index) => (
        <tr
          key={index}
          style={{ borderBottom: '1px solid #e5e7eb' }}
        >
          <td style={tdCenter}>{index + 1}</td>

          <td style={tdLeft}>
            {row.description}
          </td>

          <td style={tdCenter}>{row.dimension}</td>
          <td style={tdCenter}>{row.unit}</td>

          <td style={tdRight}>₹ {row.amount.toLocaleString()}</td>
          <td style={tdRight}>₹ {row.hiddenAmount.toLocaleString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

            </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '30px', maxWidth: '1250px' }}>
            <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>
              <span>←</span>
              <span>Back</span>
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}