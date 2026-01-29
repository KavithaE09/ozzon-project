import { CheckCircle,XCircle , ChevronLeft , ChevronRight} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContainerHoldRequestApprovalForm() {
  const navigate = useNavigate();
  const [approvals, setApprovals] = useState({});
const icon = {
  cursor: 'pointer',
  color: '#374151'
};
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
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <main style={{ flex: 1, backgroundColor: '#F6EAEA', padding: '24px', overflowY: 'auto' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', fontSize: '14px',marginBottom:'10px'  }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Container Hold Request Approval</h2>
            
            <div style={{ overflowX: 'auto', borderRadius: '8px', marginTop: '40px', border: '1px solid #D1D5DB', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#fde2e2' }}>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#000000', borderBottom: '1px solid #E5E7EB' }}>S/No</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#000000', borderBottom: '1px solid #E5E7EB' }}>Lead No</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#000000', borderBottom: '1px solid #E5E7EB' }}>Lead Date</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#000000', borderBottom: '1px solid #E5E7EB' }}>Q.No</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#000000', borderBottom: '1px solid #E5E7EB' }}>Q.Date</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#000000', borderBottom: '1px solid #E5E7EB' }}>Sales Person</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#000000', borderBottom: '1px solid #E5E7EB' }}>Container No</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#000000', borderBottom: '1px solid #E5E7EB' }}>Party Name</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#000000', borderBottom: '1px solid #E5E7EB' }}>Sz/Type</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#000000', borderBottom: '1px solid #E5E7EB' }}>Grade</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#000000', borderBottom: '1px solid #E5E7EB' }}>Liner</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#000000', borderBottom: '1px solid #E5E7EB' }}>In Date</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#000000', borderBottom: '1px solid #E5E7EB' }}>Delivery Date</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#000000', borderBottom: '1px solid #E5E7EB' }}>Photo</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#000000', borderBottom: '1px solid #E5E7EB' }}>Approval</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedData.map((row, index) => (


                    <tr 
                      key={index} 
                      style={{ borderBottom: '1px solid #E5E7EB' }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '8px' }}>{row.sNo}.</td>
                      <td style={{ padding: '8px' }}>{row.leadNo}</td>
                      <td style={{ padding: '8px' }}>{row.leadDate}</td>
                      <td style={{ padding: '8px' }}>{row.qNo}</td>
                      <td style={{ padding: '8px' }}>{row.qDate}</td>
                      <td style={{ padding: '8px' }}>{row.salesPerson}</td>
                      <td style={{ padding: '8px' }}>{row.containerNo}</td>
                      <td style={{ padding: '8px' }}>{row.partyName}</td>
                      <td style={{ padding: '8px' }}>{row.szType}</td>
                      <td style={{ padding: '8px' }}>{row.grade}</td>
                      <td style={{ padding: '8px' }}>{row.liner}</td>
                      <td style={{ padding: '8px' }}>{row.inDate}</td>
                      <td style={{ padding: '8px' }}>{row.deliveryDate}</td>
                      <td style={{ padding: '8px' }}>{row.photo}</td>

                      <td style={{ padding: '8px' }}>
                        {approvals[row.sNo] === 'approved' ? (
                          <span style={{ 
                            color: '#22C55E', 
                            fontWeight: '600',
                            fontSize: '14px'
                          }}>
                            Approved
                          </span>
                        ) : approvals[row.sNo] === 'rejected' ? (
                          <span style={{ 
                            color: '#EF4444', 
                            fontWeight: '600',
                            fontSize: '14px'
                          }}>
                            Rejected
                          </span>
                        ) : (
                           <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                          <button onClick={() => handleApprove(row.sNo)}
                          style={{background:'none',border:'none',cursor:'pointer'}}>
                            <CheckCircle size={18} style={{ ...icon, color: '#16a34a' }} />
                        </button>
                          <button onClick={() => handleReject(row.sNo)}
                          style={{background:'none',border:'none',cursor:'pointer'}}>
                          <XCircle size={18} style={{ ...icon, color: '#dc2626' }} />
                        </button>
                        </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
  <div style={{
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    marginTop: '12px'
  }}>

    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(p => p - 1)}
    >
      <ChevronLeft />
    </button>

    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        style={{
          backgroundColor: currentPage === page ? '#7F1D1D' : '#fff',
          color: currentPage === page ? '#fff' : '#000',
          border: '1px solid #D1D5DB',
          padding: '6px 12px',
          borderRadius: '4px'
        }}
      >
        {page}
      </button>
    ))}

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(p => p + 1)}
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
        </main>

      </div>
    </div>
  );
}