import React, { useState } from 'react';
import { Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ContainerMaster() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    containerStatusName: 'Office Container'
  });

  const [tableData, setTableData] = useState([
    {
      sNo: 1,
      containerNo: 'TCKU 1524662',
      partyName: 'Christine Brooks',
      szType: '20"',
      grade: '',
      liner: '',
      yard: 'Golbal',
      mfgDate: '04-09-2019',
      inDate: '04-09-2019',
      deliveryDate: '04-09-2019',
      photo: '',
      approval: 'Approval'
    },
    {
      sNo: 2,
      containerNo: 'TCKU 1524662',
      partyName: 'Rosie Pearson',
      szType: '20"',
      grade: '',
      liner: '',
      yard: 'Golbal',
      mfgDate: '04 Sep 2019',
      inDate: '04 Sep 2019',
      deliveryDate: '04 Sep 2019',
      photo: '',
      approval: 'Approval'
    },
    {
      sNo: 3,
      containerNo: 'TCKU 1524663',
      partyName: 'John Doe',
      szType: '40"',
      grade: 'A',
      liner: '',
      yard: 'Golbal',
      mfgDate: '05-09-2019',
      inDate: '05-09-2019',
      deliveryDate: '05-09-2019',
      photo: '',
      approval: 'Approval'
    },
    {
      sNo: 4,
      containerNo: 'TCKU 1524664',
      partyName: 'Jane Smith',
      szType: '20"',
      grade: 'B',
      liner: '',
      yard: 'Golbal',
      mfgDate: '06-09-2019',
      inDate: '06-09-2019',
      deliveryDate: '06-09-2019',
      photo: '',
      approval: 'Approval'
    },
    {
      sNo: 5,
      containerNo: 'TCKU 1524665',
      partyName: 'Mike Johnson',
      szType: '40"',
      grade: '',
      liner: '',
      yard: 'Golbal',
      mfgDate: '07-09-2019',
      inDate: '07-09-2019',
      deliveryDate: '07-09-2019',
      photo: '',
      approval: 'Approval'
    },
    {
      sNo: 6,
      containerNo: 'TCKU 1524666',
      partyName: 'Sarah Williams',
      szType: '20"',
      grade: 'A',
      liner: '',
      yard: 'Golbal',
      mfgDate: '08-09-2019',
      inDate: '08-09-2019',
      deliveryDate: '08-09-2019',
      photo: '',
      approval: 'Approval'
    }
  ]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState({});

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Pagination calculations
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const paginatedData = tableData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const handleEdit = (index) => {
    const actualIndex = indexOfFirstRow + index;
    setEditingIndex(actualIndex);
    setEditingData({ ...tableData[actualIndex] });
  };

  const handleUpdate = (index) => {
    const actualIndex = indexOfFirstRow + index;
    const updatedTable = [...tableData];
    updatedTable[actualIndex] = editingData;
    setTableData(updatedTable);
    setEditingIndex(null);
    setEditingData({});
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingData({});
  };

  const handleDelete = (index) => {
    const actualIndex = indexOfFirstRow + index;
    if (window.confirm('Are you sure you want to delete this container?')) {
      const updatedTable = tableData.filter((_, i) => i !== actualIndex);
      // Renumber the S/No after deletion
      const renumberedTable = updatedTable.map((row, idx) => ({
        ...row,
        sNo: idx + 1
      }));
      setTableData(renumberedTable);

      // Adjust current page if needed
      const newTotalPages = Math.ceil(renumberedTable.length / rowsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const handleEditFieldChange = (field, value) => {
    setEditingData({ ...editingData, [field]: value });
  };

  const handleBack = () => {
    alert('Going back...');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F9FAFB' }}>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Main Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '20px', backgroundColor: '#F3E8E8' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>Container Status Master</h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                gap: '40px',
                marginBottom: '24px'
              }}
            >
              {/* Container Status Name Input */}
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF', borderRight: '3px solid #DC2626' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '8px'
                  }}
                >
                  Container Status Name
                </label>
                <input
                  type="text"
                  value={formData.containerStatusName}
                  onChange={(e) =>
                    setFormData({ ...formData, containerStatusName: e.target.value })
                  }
                  style={{
                    width: '256px',
                    padding: '4px 8px',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}
                />
              </div>

              <div></div>

              {/* Submit Button */}
              <div>
                <button
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
                  <span>Submit</span>
                </button>
              </div>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', marginTop: '32px' }}>Container List</h3>

            {/* Table */}
            <div style={{ borderRadius: '8px', border: '1px solid #D1D5DB', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#fde2e2' }}>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>S/No</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>Container No</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>Party Name</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>Sz/Type</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>Grade</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>Liner</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>Yard</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>MFG Date</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>In Date</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>Delivery Date</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>Photo</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: '16px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #E5E7EB' }}>
                      <td style={{ padding: '12px 8px', color: '#374151' }}>
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.sNo}
                            onChange={(e) => handleEditFieldChange('sNo', e.target.value)}
                            style={{ width: '100%', padding: '4px', border: '1px solid #9CA3AF', borderRadius: '4px', fontSize: '12px' }}
                          />
                        ) : (
                          `${row.sNo}.`
                        )}
                      </td>
                      <td style={{ padding: '12px 8px', color: '#374151' }}>
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.containerNo}
                            onChange={(e) => handleEditFieldChange('containerNo', e.target.value)}
                            style={{ width: '100%', padding: '4px', border: '1px solid #9CA3AF', borderRadius: '4px', fontSize: '12px' }}
                          />
                        ) : (
                          row.containerNo
                        )}
                      </td>
                      <td style={{ padding: '12px 8px', color: '#374151' }}>
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.partyName}
                            onChange={(e) => handleEditFieldChange('partyName', e.target.value)}
                            style={{ width: '100%', padding: '4px', border: '1px solid #9CA3AF', borderRadius: '4px', fontSize: '12px' }}
                          />
                        ) : (
                          row.partyName
                        )}
                      </td>
                      <td style={{ padding: '12px 8px', color: '#374151' }}>
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.szType}
                            onChange={(e) => handleEditFieldChange('szType', e.target.value)}
                            style={{ width: '100%', padding: '4px', border: '1px solid #9CA3AF', borderRadius: '4px', fontSize: '12px' }}
                          />
                        ) : (
                          row.szType
                        )}
                      </td>
                      <td style={{ padding: '12px 8px', color: '#374151' }}>
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.grade}
                            onChange={(e) => handleEditFieldChange('grade', e.target.value)}
                            style={{ width: '100%', padding: '4px', border: '1px solid #9CA3AF', borderRadius: '4px', fontSize: '12px' }}
                          />
                        ) : (
                          row.grade
                        )}
                      </td>
                      <td style={{ padding: '12px 8px', color: '#374151' }}>
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.liner}
                            onChange={(e) => handleEditFieldChange('liner', e.target.value)}
                            style={{ width: '100%', padding: '4px', border: '1px solid #9CA3AF', borderRadius: '4px', fontSize: '12px' }}
                          />
                        ) : (
                          row.liner
                        )}
                      </td>
                      <td style={{ padding: '12px 8px', color: '#374151' }}>
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.yard}
                            onChange={(e) => handleEditFieldChange('yard', e.target.value)}
                            style={{ width: '100%', padding: '4px', border: '1px solid #9CA3AF', borderRadius: '4px', fontSize: '12px' }}
                          />
                        ) : (
                          row.yard
                        )}
                      </td>
                      <td style={{ padding: '12px 8px', color: '#374151' }}>
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.mfgDate}
                            onChange={(e) => handleEditFieldChange('mfgDate', e.target.value)}
                            style={{ width: '100%', padding: '4px', border: '1px solid #9CA3AF', borderRadius: '4px', fontSize: '12px' }}
                          />
                        ) : (
                          row.mfgDate
                        )}
                      </td>
                      <td style={{ padding: '12px 8px', color: '#374151' }}>
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.inDate}
                            onChange={(e) => handleEditFieldChange('inDate', e.target.value)}
                            style={{ width: '100%', padding: '4px', border: '1px solid #9CA3AF', borderRadius: '4px', fontSize: '12px' }}
                          />
                        ) : (
                          row.inDate
                        )}
                      </td>
                      <td style={{ padding: '12px 8px', color: '#374151' }}>
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.deliveryDate}
                            onChange={(e) => handleEditFieldChange('deliveryDate', e.target.value)}
                            style={{ width: '100%', padding: '4px', border: '1px solid #9CA3AF', borderRadius: '4px', fontSize: '12px' }}
                          />
                        ) : (
                          row.deliveryDate
                        )}
                      </td>
                      <td style={{ padding: '12px 8px', color: '#374151' }}>
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.photo}
                            onChange={(e) => handleEditFieldChange('photo', e.target.value)}
                            style={{ width: '100%', padding: '4px', border: '1px solid #9CA3AF', borderRadius: '4px', fontSize: '12px' }}
                          />
                        ) : (
                          row.photo
                        )}
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        {editingIndex === indexOfFirstRow + index ? (
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => handleUpdate(index)}
                              style={{
                                padding: '4px 12px',
                                backgroundColor: '#A63128',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '12px',
                                cursor: 'pointer',
                                fontWeight: '500'
                              }}
                            >
                              Update
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              style={{
                                padding: '4px 12px',
                                backgroundColor: '#6B7280',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '12px',
                                cursor: 'pointer',
                                fontWeight: '500'
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <Edit2
                              size={18}
                              style={{ color: '#6B7280', cursor: 'pointer' }}
                              onClick={() => handleEdit(index)}
                            />
                            <Trash2
                              size={18}
                              style={{ color: '#DC2626', cursor: 'pointer' }}
                              onClick={() => handleDelete(index)}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {tableData.length > rowsPerPage && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '8px',
              marginBottom: '12px'
            }}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  backgroundColor: currentPage === 1 ? '#e5e7eb' : '#ffffff',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                <ChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid #d1d5db',
                    backgroundColor: currentPage === page ? '#A63128' : '#ffffff',
                    color: currentPage === page ? '#ffffff' : '#000000',
                    cursor: 'pointer'
                  }}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  backgroundColor: currentPage === totalPages ? '#e5e7eb' : '#ffffff',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
              >
                <ChevronRight />
              </button>
            </div>
          )}

          <button
            onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>
            <span>←</span>
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}