import React, { useState } from 'react';
import { Edit2, Trash2, ChevronLeft, ChevronRight,Send,Undo2 } from 'lucide-react';
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

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
           <div className="page-header">
              <h1 className="page-title">Container Status Master</h1>
              <button 
                onClick={() => navigate(-1)} 
                className="page-back-btn"
                aria-label="Go back"
              >
                <Undo2   className="page-back-icon" />
              </button>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', gap: '40px', marginBottom: '24px' }}>
              {/* Container Status Name Input */}
              <div className="filter-grid-red" style={{ width: '300px' }}>
                <label className="filter-label">Container Status Name</label>
                <input
                  type="text"
                  value={formData.containerStatusName}
                  onChange={(e) => setFormData({ ...formData, containerStatusName: e.target.value })}
                  className="filter-input"
                />
              </div>

              {/* Submit Button */}
              <button className="btn-all">
                <Send size={18} />  Submit
              </button>
            </div>

            <h3 className="section-title" style={{ marginTop: '32px' }}>Container List</h3>

            {/* Table */}
            <div className="table-container">
              <table className="data-table">
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
                    <th className="table-th">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, index) => (
                    <tr key={index} className="table-row">
                      <td className="table-cell">
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.sNo}
                            onChange={(e) => handleEditFieldChange('sNo', e.target.value)}
                            className="master-edit-input"
                          />
                        ) : (
                          `${row.sNo}.`
                        )}
                      </td>
                      <td className="table-cell">
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.containerNo}
                            onChange={(e) => handleEditFieldChange('containerNo', e.target.value)}
                            className="master-edit-input"
                          />
                        ) : (
                          row.containerNo
                        )}
                      </td>
                      <td className="table-cell">
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.partyName}
                            onChange={(e) => handleEditFieldChange('partyName', e.target.value)}
                            className="master-edit-input"
                          />
                        ) : (
                          row.partyName
                        )}
                      </td>
                      <td className="table-cell">
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.szType}
                            onChange={(e) => handleEditFieldChange('szType', e.target.value)}
                            className="master-edit-input"
                          />
                        ) : (
                          row.szType
                        )}
                      </td>
                      <td className="table-cell">
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.grade}
                            onChange={(e) => handleEditFieldChange('grade', e.target.value)}
                            className="master-edit-input"
                          />
                        ) : (
                          row.grade
                        )}
                      </td>
                      <td className="table-cell">
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.liner}
                            onChange={(e) => handleEditFieldChange('liner', e.target.value)}
                            className="master-edit-input"
                          />
                        ) : (
                          row.liner
                        )}
                      </td>
                      <td className="table-cell">
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.yard}
                            onChange={(e) => handleEditFieldChange('yard', e.target.value)}
                            className="master-edit-input"
                          />
                        ) : (
                          row.yard
                        )}
                      </td>
                      <td className="table-cell">
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.mfgDate}
                            onChange={(e) => handleEditFieldChange('mfgDate', e.target.value)}
                            className="master-edit-input"
                          />
                        ) : (
                          row.mfgDate
                        )}
                      </td>
                      <td className="table-cell">
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.inDate}
                            onChange={(e) => handleEditFieldChange('inDate', e.target.value)}
                            className="master-edit-input"
                          />
                        ) : (
                          row.inDate
                        )}
                      </td>
                      <td className="table-cell">
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.deliveryDate}
                            onChange={(e) => handleEditFieldChange('deliveryDate', e.target.value)}
                            className="master-edit-input"
                          />
                        ) : (
                          row.deliveryDate
                        )}
                      </td>
                      <td className="table-cell">
                        {editingIndex === indexOfFirstRow + index ? (
                          <input
                            type="text"
                            value={editingData.photo}
                            onChange={(e) => handleEditFieldChange('photo', e.target.value)}
                            className="master-edit-input"
                          />
                        ) : (
                          row.photo
                        )}
                      </td>
                      <td className="table-cell">
                        {editingIndex === indexOfFirstRow + index ? (
                          <div className="table-actions">
                            <button onClick={() => handleUpdate(index)} className="btn-smallbtn">
                              Update
                            </button>
                            <button onClick={handleCancelEdit} className="btn-smallbtn">
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="table-actions">
                            <button onClick={() => handleEdit(index)} className="btn-action">
                              <Edit2 size={18}  />
                            </button>
                            <button onClick={() => handleDelete(index)} className="btn-action">
                              <Trash2 size={18} style={{ color: '#DC2626' }} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          

          {/* Pagination */}
          {tableData.length > rowsPerPage && (
            <div className="pagination-container">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className={`pagination-btn ${currentPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'}`}
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`pagination-page-btn ${currentPage === page ? 'pagination-page-active' : 'pagination-page-inactive'}`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className={`pagination-btn ${currentPage === totalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'}`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

        
        </div>
        </div>
      </div>
    </div>
  );
}