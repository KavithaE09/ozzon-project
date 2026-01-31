import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContainerBlockRequestForm = () => {
  const navigate = useNavigate();
  
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    requestNo: 'R-1',
    requestDate: getTodayDate(),
    proformaInvoiceNo: 'PI-1',
    proformaInvoiceDate: getTodayDate(),
    customerName: 'Kavitha',
    proformaInvoiceCost: '25000',
    containerNo: ''
  });

  const containerData = [
    {
      sNo: 1,
      containerNo: 'TCKU 1524662',
      partyName: 'Christine Brooks',
      szType: '20"',
      liner: 'Global',
      mfgDate: '04-09-2019',
      inDate: '04-09-2019',
      deliveryDate: '04-09-2019',
      status: 'Hold'
    },
    {
      sNo: 2,
      containerNo: 'TCKU 1524662',
      partyName: 'Rosie Pearson',
      szType: '20"',
      liner: 'Global',
      mfgDate: '04 Sep 2019',
      inDate: '04 Sep 2019',
      deliveryDate: '04 Sep 2019',
      status: 'Available'
    },
    {
      sNo: 3,
      containerNo: 'ABCD',
      partyName: 'Rosie Pearson',
      szType: '20"',
      liner: 'Global',
      mfgDate: '04 Sep 2019',
      inDate: '04 Sep 2019',
      deliveryDate: '04 Sep 2019',
      status: 'Available'
    },
  ];

  const [filteredContainers, setFilteredContainers] = useState(containerData);

  const handleSearch = () => {
    if (formData.containerNo.trim() === '') {
      setFilteredContainers(containerData);
    } else {
      const searchTerm = formData.containerNo.toLowerCase();
      const filtered = containerData.filter(container =>
        container.containerNo.toLowerCase().includes(searchTerm)
      );
      setFilteredContainers(filtered);
    }
  };

  const handleChange = (key) => (e) =>
    setFormData({ ...formData, [key]: e.target.value });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <main className="main-section">
          <div className="content-card">
            <h1 className="page-title">Container Block Request</h1>

            {/* Row 1 - 4 Fields */}
            <div className="filter-grid mb-6">
              <Field
                label="Request No"
                value={formData.requestNo}
                onChange={handleChange('requestNo')}
              />
              <Field
                label="Request Date"
                type="date"
                value={formData.requestDate}
                onChange={handleChange('requestDate')}
              />
              <Field
                label="Proforma Invoice No"
                value={formData.proformaInvoiceNo}
                onChange={handleChange('proformaInvoiceNo')}
              />
              <Field
                label="Proforma Invoice Date"
                type="date"
                value={formData.proformaInvoiceDate}
                onChange={handleChange('proformaInvoiceDate')}
              />
            </div>

            {/* Row 2 - Remaining Fields */}
            <div className="filter-grid mb-6">
              <Field
                label="Customer Name"
                value={formData.customerName}
                onChange={handleChange('customerName')}
              />
              <Field
                label="Proforma Invoice Cost"
                value={formData.proformaInvoiceCost}
                onChange={handleChange('proformaInvoiceCost')}
              />
              <div className="filter-grid-green">
                <label htmlFor="containerNo" className="filter-label">Container No</label>
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
                  className="filter-input"
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end justify-end">
                <button
                  onClick={handleSearch}
                  type="button"
                  aria-label="Search containers"
                  className="btn-search"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>

            {/* Container List */}
            <h2 className="section-title">Container List</h2>

            <div className="table-container">
              <table className="data-table">
                <thead className="table-header">
                  <tr>
                    <th className="table-th-center">Select</th>
                    <th className="table-th">S/No</th>
                    <th className="table-th">Container No</th>
                    <th className="table-th">Party Name</th>
                    <th className="table-th">Sz/Type</th>
                    <th className="table-th">Liner</th>
                    <th className="table-th">MFG Date</th>
                    <th className="table-th">In Date</th>
                    <th className="table-th">Delivery Date</th>
                    <th className="table-th">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContainers.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="no-data-cell">
                        No containers found
                      </td>
                    </tr>
                  ) : (
                    filteredContainers.map((row, i) => (
                      <tr key={i} className="table-row">
                        <td className="table-cell-center">
                          <input 
                            type="checkbox" 
                            className="accent-primary"
                            aria-label={`Select container ${row.containerNo}`}
                          />
                        </td>
                        <td className="table-cell">{row.sNo}</td>
                        <td className="table-cell">{row.containerNo}</td>
                        <td className="table-cell">{row.partyName}</td>
                        <td className="table-cell">{row.szType}</td>
                        <td className="table-cell">{row.liner}</td>
                        <td className="table-cell">{row.mfgDate}</td>
                        <td className="table-cell">{row.inDate}</td>
                        <td className="table-cell">{row.deliveryDate}</td>
                        <td className="table-cell font-semibold">
                          <span className={row.status === 'Hold' ? 'text-orange-500' : 'add-primary'}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-7">
              <button
                onClick={() => navigate("/proformainvoice/block/submit")}
                className="btn-search"
              >
                ✓ Submit
              </button>
            </div>
          </div>

          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="btn-back"
          >
            ← Back
          </button>
        </main>
      </div>
    </div>
  );
};

/* Field Component */
const Field = ({ label, value, onChange, type = 'text' }) => (
  <div className="filter-grid-red">
    <label className="filter-label">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="filter-input"
    />
  </div>
);

export default ContainerBlockRequestForm;