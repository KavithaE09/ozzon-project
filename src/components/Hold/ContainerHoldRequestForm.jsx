import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function ContainerHoldRequestForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    leadNo: 'L-1',
    leadDate: '2026-01-14',
    quotationNo: 'Q-1',
    quotationDate: '2026-01-14',
    salesPerson: 'Raneesh',
    containerNo: ''
  });

  const allContainers = [
    {
      id: 1,
      selected: false,
      sNo: '1.',
      containerNo: 'TCKU 1524662',
      partyName: 'Sasi',
      szType: '20"',
      grade: '',
      liner: '',
      yard: 'Golbal',
      mfgDate: '04-09-2019',
      inDate: '04-09-2019',
      deliveryDate: '04-09-2019',
      photo: '',
      status: 'Available'
    },
    {
      id: 2,
      selected: false,
      sNo: '2.',
      containerNo: 'ABCD 9876543',
      partyName: 'Varshini',
      szType: '20"',
      grade: '',
      liner: '',
      yard: 'Golbal',
      mfgDate: '04 Sep 2019',
      inDate: '04 Sep 2019',
      deliveryDate: '04 Sep 2019',
      photo: '',
      status: 'Available'
    }
  ];

  const [containers, setContainers] = useState(allContainers);
  const [filteredContainers, setFilteredContainers] = useState(allContainers);
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (id) => {
    setContainers(prev =>
      prev.map(container =>
        container.id === id
          ? { ...container, selected: !container.selected }
          : container
      )
    );
    setFilteredContainers(prev =>
      prev.map(container =>
        container.id === id
          ? { ...container, selected: !container.selected }
          : container
      )
    );
  };

  const handleSearch = () => {
    if (formData.containerNo.trim() === '') {
      setFilteredContainers(containers);
    } else {
      const searchTerm = formData.containerNo.toLowerCase();
      const filtered = containers.filter(container =>
        container.containerNo.toLowerCase().includes(searchTerm)
      );
      setFilteredContainers(filtered);
    }
  };

  const handleSubmit = () => {
    const selectedContainers = containers.filter(c => c.selected);
    console.log('Submitting selected containers:', selectedContainers);
    setShowPopup(true);
 
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };
  

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <main style={{ flex: 1, backgroundColor: '#F6EAEA', padding: '24px', overflowY: 'auto' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>Container Hold Request</h2>

            {/* Form Fields - First Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '16px' }}>
              {/* Lead No */}
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label htmlFor="leadNo" style={{ display: 'block', fontSize: '16px',  color: '#374151', marginBottom: '8px', fontWeight: '700' }}>Lead No</label>
                <input
                  type="text"
                  id="leadNo"
                  name="leadNo"
                  value={formData.leadNo}
                  onChange={handleInputChange}
                  title="Lead Number"
                  aria-label="Lead Number"
                  style={{ width: '100%', padding: '4px 8px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {/* Lead Date */}
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label htmlFor="leadDate" style={{ display: 'block', fontSize: '16px',  color: '#374151', marginBottom: '8px', fontWeight: '700' }}>Lead Date</label>
                <input
                  type="date"
                  id="leadDate"
                  name="leadDate"
                  value={formData.leadDate}
                  onChange={handleInputChange}
                  title="Lead Date"
                  aria-label="Lead Date"
                  style={{ width: '100%', padding: '4px 8px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}
                />
              </div>

              {/* Quotation No */}
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label htmlFor="quotationNo" style={{ display: 'block', fontSize: '16px',  color: '#374151', marginBottom: '8px', fontWeight: '700' }}>Quotation No</label>
                <input
                  type="text"
                  id="quotationNo"
                  name="quotationNo"
                  value={formData.quotationNo}
                  onChange={handleInputChange}
                  title="Quotation Number"
                  aria-label="Quotation Number"
                  style={{ width: '100%', padding: '4px 8px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {/* Quotation Date */}
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '6px',border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label htmlFor="quotationDate" style={{ display: 'block', fontSize: '16px',  color: '#374151', marginBottom: '8px', fontWeight: '700' }}>Quotation Date</label>
                <input
                  type="date"
                  id="quotationDate"
                  name="quotationDate"
                  value={formData.quotationDate}
                  onChange={handleInputChange}
                  title="Quotation Date"
                  aria-label="Quotation Date"
                  style={{ width: '100%', padding: '4px 8px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Form Fields - Second Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '16px' }}>
              {/* Sales Person */}
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label htmlFor="salesPerson" style={{ display: 'block', fontSize: '16px',  color: '#374151', marginBottom: '8px', fontWeight: '700' }}>Sales Person</label>
                <input
                  type="text"
                  id="salesPerson"
                  name="salesPerson"
                  value={formData.salesPerson}
                  onChange={handleInputChange}
                  title="Sales Person Name"
                  aria-label="Sales Person Name"
                  style={{ width: '100%', padding: '4px 8px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Form Fields - Third Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
              {/* Container No */}
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #9CA3AF', borderRight: '3px solid #22C55E' }}>
                <label htmlFor="containerNo" style={{ display: 'block', fontSize: '16px',  color: '#374151', marginBottom: '8px', fontWeight: '700' }}>Container No</label>
                <input
                  type="text"
                  id="containerNo"
                  name="containerNo"
                  value={formData.containerNo}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Enter container number..."
                  title="Container Number"
                  aria-label="Container Number"
                  style={{ width: '100%', padding: '4px 8px', border: 'none', borderRadius: '4px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div></div>
              <div></div>

              {/* Search Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end',marginTop:'28px' }}>
                <button
                  onClick={handleSearch}
                  type="button"
                  aria-label="Search containers"
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
                  <Search size={18} /> Search
                </button>
              </div>
            </div>

            {/* Container List */}
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Container List</h3>
              
              <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #D1D5DB', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F3E8E8' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '16px', fontWeight: '500', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Select</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '16px', fontWeight: '500', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>S/No</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '16px', fontWeight: '500', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Container No</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '16px', fontWeight: '500', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Party Name</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '16px', fontWeight: '500', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Sz/Type</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '16px', fontWeight: '500', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Grade</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '16px', fontWeight: '500', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Liner</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '16px', fontWeight: '500', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Yard</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '16px', fontWeight: '500', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>MFG Date</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '16px', fontWeight: '500', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>In Date</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '16px', fontWeight: '500', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Delivery Date</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '16px', fontWeight: '500', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Photo</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '16px', fontWeight: '500', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContainers.length === 0 ? (
                      <tr>
                        <td colSpan="13" style={{ padding: '40px', textAlign: 'center', color: '#6b7280', fontSize: '16px' }}>
                          No containers found
                        </td>
                      </tr>
                    ) : (
                      filteredContainers.map((container, index) => (
                        <tr key={container.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                          <td style={{ padding: '12px 16px' }}>
                            <input
                              type="checkbox"
                              id={`container-select-${container.id}`}
                              name={`container-select-${container.id}`}
                              checked={container.selected}
                              onChange={() => handleCheckboxChange(container.id)}
                              title={`Select container ${container.containerNo}`}
                              aria-label={`Select container ${container.containerNo}`}
                              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                            />
                          </td>
                          <td style={{ padding: '12px 16px', fontSize: '14px' }}>{index + 1}.</td>
                          <td style={{ padding: '12px 16px', fontSize: '14px' }}>{container.containerNo}</td>
                          <td style={{ padding: '12px 16px', fontSize: '14px' }}>{container.partyName}</td>
                          <td style={{ padding: '12px 16px', fontSize: '14px' }}>{container.szType}</td>
                          <td style={{ padding: '12px 16px', fontSize: '14px' }}>{container.grade}</td>
                          <td style={{ padding: '12px 16px', fontSize: '14px' }}>{container.liner}</td>
                          <td style={{ padding: '12px 16px', fontSize: '14px' }}>{container.yard}</td>
                          <td style={{ padding: '12px 16px', fontSize: '14px' }}>{container.mfgDate}</td>
                          <td style={{ padding: '12px 16px', fontSize: '14px' }}>{container.inDate}</td>
                          <td style={{ padding: '12px 16px', fontSize: '14px' }}>{container.deliveryDate}</td>
                          <td style={{ padding: '12px 16px', fontSize: '14px' }}>{container.photo}</td>
                          <td style={{ padding: '12px 16px' }}>
                            <span
                              style={{
                                fontSize: '12px',
                                fontWeight: '500',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                backgroundColor: container.status === 'Hold' ? '#FEF3C7' : '#D1FAE5',
                                color: container.status === 'Hold' ? '#92400E' : '#065F46'
                              }}
                            >
                              {container.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
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
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '30px', maxWidth: '1250px' }}>
            <button 
              onClick={() => navigate(-1)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}
            >
              <span>←</span>
              <span>Back</span>
            </button>
          </div>
        </main>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#16A34A',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span style={{ fontWeight: '600' }}>Form submitted successfully!</span>
        </div>
      )}
    </div>
  );
}