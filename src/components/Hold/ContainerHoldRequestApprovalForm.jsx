import { CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContainerHoldRequestApprovalForm() {
  const navigate = useNavigate();
  const [approvals, setApprovals] = useState({});

  const containerData = [
    {
      sNo: 1,
      leadNo: 101,
      leadDate: '04-09-2019',
      qNo: 'Q-101',
      qDate: '04 Sep 2019',
      salesPerson: 'Raneesh',
      containerNo: 'TCKU 1524662',
      partyName: 'Sasi',
      szType: '20"',
      grade: '',
      liner: '',
      inDate: '04-09-2019',
      deliveryDate: '04-09-2019',
      photo: ''
    },
    {
      sNo: 2,
      leadNo: 101,
      leadDate: '04 Sep 2019',
      qNo: 'Q-101',
      qDate: '04 Sep 2019',
      salesPerson: 'Raneesh',
      containerNo: 'TCKU 1524662',
      partyName: 'Varshini',
      szType: '20"',
      grade: '',
      liner: '',
      inDate: '04 Sep 2019',
      deliveryDate: '04 Sep 2019',
      photo: ''
    },
    {
      sNo: 3,
      leadNo: 101,
      leadDate: '04-09-2019',
      qNo: 'Q-101',
      qDate: '04 Sep 2019',
      salesPerson: 'Raneesh',
      containerNo: 'TCKU 1524662',
      partyName: 'Sasi',
      szType: '20"',
      grade: '',
      liner: '',
      inDate: '04-09-2019',
      deliveryDate: '04-09-2019',
      photo: ''
    },
    {
      sNo: 4,
      leadNo: 101,
      leadDate: '04 Sep 2019',
      qNo: 'Q-101',
      qDate: '04 Sep 2019',
      salesPerson: 'Raneesh',
      containerNo: 'TCKU 1524662',
      partyName: 'Varshini',
      szType: '20"',
      grade: '',
      liner: '',
      inDate: '04 Sep 2019',
      deliveryDate: '04 Sep 2019',
      photo: ''
    },
    {
      sNo: 5,
      leadNo: 101,
      leadDate: '04-09-2019',
      qNo: 'Q-101',
      qDate: '04 Sep 2019',
      salesPerson: 'Raneesh',
      containerNo: 'TCKU 1524662',
      partyName: 'Sasi',
      szType: '20"',
      grade: '',
      liner: '',
      inDate: '04-09-2019',
      deliveryDate: '04-09-2019',
      photo: ''
    },
    {
      sNo: 6,
      leadNo: 101,
      leadDate: '04 Sep 2019',
      qNo: 'Q-101',
      qDate: '04 Sep 2019',
      salesPerson: 'Raneesh',
      containerNo: 'TCKU 1524662',
      partyName: 'Varshini',
      szType: '20"',
      grade: '',
      liner: '',
      inDate: '04 Sep 2019',
      deliveryDate: '04 Sep 2019',
      photo: ''
    },
  ];

  const filteredData = containerData;

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const paginatedData = filteredData.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleApprove = (sNo) => {
    console.log('Approved:', sNo);
    setApprovals(prev => ({ ...prev, [sNo]: 'approved' }));
  };

  const handleReject = (sNo) => {
    console.log('Rejected:', sNo);
    setApprovals(prev => ({ ...prev, [sNo]: 'rejected' }));
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <main className="main-section">
          <div className="content-card">
            <h2 className="page-title">Container Hold Request Approval</h2>

            <div className="table-container">
              <table className="data-table">
                <thead className="table-header">
                  <tr>
                    <th className="table-th">S/No</th>
                    <th className="table-th">Lead No</th>
                    <th className="table-th">Lead Date</th>
                    <th className="table-th">Q.No</th>
                    <th className="table-th">Q.Date</th>
                    <th className="table-th">Sales Person</th>
                    <th className="table-th">Container No</th>
                    <th className="table-th">Party Name</th>
                    <th className="table-th">Sz/Type</th>
                    <th className="table-th">Grade</th>
                    <th className="table-th">Liner</th>
                    <th className="table-th">In Date</th>
                    <th className="table-th">Delivery Date</th>
                    <th className="table-th">Photo</th>
                    <th className="table-th">Approval</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedData.map((row, index) => (
                    <tr key={index} className="table-row">
                      <td className="table-cell">{row.sNo}.</td>
                      <td className="table-cell">{row.leadNo}</td>
                      <td className="table-cell">{row.leadDate}</td>
                      <td className="table-cell">{row.qNo}</td>
                      <td className="table-cell">{row.qDate}</td>
                      <td className="table-cell">{row.salesPerson}</td>
                      <td className="table-cell">{row.containerNo}</td>
                      <td className="table-cell">{row.partyName}</td>
                      <td className="table-cell">{row.szType}</td>
                      <td className="table-cell">{row.grade}</td>
                      <td className="table-cell">{row.liner}</td>
                      <td className="table-cell">{row.inDate}</td>
                      <td className="table-cell">{row.deliveryDate}</td>
                      <td className="table-cell">{row.photo}</td>

                      <td className="table-cell">
                        {approvals[row.sNo] === 'approved' ? (
                          <span className="add-primary font-semibold text-sm">
                            Approved
                          </span>
                        ) : approvals[row.sNo] === 'rejected' ? (
                          <span className="text-red-500 font-semibold text-sm">
                            Rejected
                          </span>
                        ) : (
                          <div className="filter-grid">
                            <button 
                              onClick={() => handleApprove(row.sNo)}
                              className="btn-action"
                            >
                              <CheckCircle size={18} className="text-green-600" />
                            </button>
                            <button 
                              onClick={() => handleReject(row.sNo)}
                              className="btn-action"
                            >
                              <XCircle size={18} className="text-red-600" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
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
                onClick={() => setCurrentPage(p => p + 1)}
                className={`pagination-btn ${
                  currentPage === totalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          <button onClick={() => navigate(-1)} className="btn-back">
            <span>←</span>
            <span>Back</span>
          </button>
          </div>
        </main>
      </div>
    </div>
  );
}