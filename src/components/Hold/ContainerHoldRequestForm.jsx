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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (id) => {
    setContainers(prev =>
      prev.map(container =>
        container.id === id ? { ...container, selected: !container.selected } : container
      )
    );
    setFilteredContainers(prev =>
      prev.map(container =>
        container.id === id ? { ...container, selected: !container.selected } : container
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
    <div className="page-container">
      <div className="content-wrapper">
        <main className="main-section">
          <div className="content-card">
            <h1 className="page-title">Container Hold Request</h1>

            {/* Form Fields - First Row */}
            <div className="filter-grid mb-6">
              {/* Lead No */}
              <div className="filter-grid-red">
                <label className="filter-label">Lead No</label>
                <input
                  type="text"
                  name="leadNo"
                  value={formData.leadNo}
                  onChange={handleInputChange}
                  className="filter-input"
                  title="Lead Number"
                  aria-label="Lead Number"
                />
              </div>

              {/* Lead Date */}
              <div className="filter-grid-red">
                <label className="filter-label">Lead Date</label>
                <input
                  type="date"
                  name="leadDate"
                  value={formData.leadDate}
                  onChange={handleInputChange}
                  className="filter-input"
                  title="Lead Date"
                  aria-label="Lead Date"
                />
              </div>

              {/* Quotation No */}
              <div className="filter-grid-red">
                <label className="filter-label">Quotation No</label>
                <input
                  type="text"
                  name="quotationNo"
                  value={formData.quotationNo}
                  onChange={handleInputChange}
                  className="filter-input"
                  title="Quotation Number"
                  aria-label="Quotation Number"
                />
              </div>

              {/* Quotation Date */}
              <div className="filter-grid-red">
                <label className="filter-label">Quotation Date</label>
                <input
                  type="date"
                  name="quotationDate"
                  value={formData.quotationDate}
                  onChange={handleInputChange}
                  className="filter-input"
                  title="Quotation Date"
                  aria-label="Quotation Date"
                />
              </div>
            </div>

            {/* Form Fields - Second Row */}
            <div className="filter-grid mb-6">
              {/* Sales Person */}
              <div className="filter-grid-red">
                <label className="filter-label">Sales Person</label>
                <input
                  type="text"
                  name="salesPerson"
                  value={formData.salesPerson}
                  onChange={handleInputChange}
                  className="filter-input"
                  title="Sales Person"
                  aria-label="Sales Person"
                />
              </div>

              {/* Container No */}
              <div className="filter-grid-red">
                <label className="filter-label">Container No</label>
                <input
                  type="text"
                  name="containerNo"
                  value={formData.containerNo}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="filter-input"
                  placeholder="Enter container number..."
                  title="Container Number"
                  aria-label="Container Number"
                />
              </div>

              {/* Search Button Placeholder */}
              <div className="flex items-end justify-end col-span-2">
                <button
                  onClick={handleSearch}
                  className="btn-search"
                  title="Search Container"
                  aria-label="Search Container"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>

            {/* Container List */}
          
              
                <h2 className="master-table-title">Container List</h2>
            

              <div className="table-container">
                <table className="data-table">
                  <thead className="table-header">
                    <tr>
                      <th className="table-th-center">Select</th>
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
                    {filteredContainers.length === 0 ? (
                      <tr>
                        <td colSpan="13" className="no-data-cell">
                          No containers found
                        </td>
                      </tr>
                    ) : (
                      filteredContainers.map((container, index) => (
                        <tr key={container.id} className="table-row">
                          <td className="table-cell-center">
                            <input
                              type="checkbox"
                              checked={container.selected}
                              onChange={() => handleCheckboxChange(container.id)}
                              className="accent-primary"
                              title={`Select container ${container.containerNo}`}
                              aria-label={`Select container ${container.containerNo}`}
                            />
                          </td>
                          <td className="table-cell">{index + 1}.</td>
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
                      ))
                    )}
                  </tbody>
                </table>
            
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                className="btn-search"
                title="Submit Form"
                aria-label="Submit Form"
              >
                ✓ Submit
              </button>
            </div>

            {/* Footer */}
            <div className="footer-container mt-6">
              <button
                onClick={() => navigate(-1)}
                className="btn-back"
                title="Go Back"
                aria-label="Go Back"
              >
                ← Back
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-fade-in">
          Form submitted successfully!
        </div>
      )}
    </div>
  );
}