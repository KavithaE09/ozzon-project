import React, { useState } from 'react';
import { ChevronRight, Search , ChevronLeft,} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SalesPerson() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
const rowsPerPage = 2;

  const [templateGroups, setTemplateGroups] = useState(['Admin', 'Raneesh', 'Vinoth', 'Bala']);
  const [filteredGroups, setFilteredGroups] = useState(['Admin', 'Raneesh', 'Vinoth', 'Bala']);
const totalPages = Math.ceil(filteredGroups.length / rowsPerPage);

const indexOfLast = currentPage * rowsPerPage;
const indexOfFirst = indexOfLast - rowsPerPage;

const currentGroups = filteredGroups.slice(
  indexOfFirst,
  indexOfLast
);

  const handleSubmit = () => {
    if (groupName.trim() !== '') {
      
      setTemplateGroups([...templateGroups, groupName.toUpperCase()]);
      setFilteredGroups([...templateGroups, groupName.toUpperCase()]);
      
      setGroupName('');
      setCurrentPage(1);
    }
  };
  
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredGroups(templateGroups);
    } else {
      const filtered = templateGroups.filter(group =>
        group.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGroups(filtered);
      setCurrentPage(1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f5f5' }}>
      
        {/* Form Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '20px', backgroundColor: '#f5e6e8' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '15px' }}>
            {/* Template Group Section */}
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
              Sales Person Master
            </h2>
            
            <div style={{ 
              marginBottom: '24px',
              display: 'flex', 
              alignItems: 'flex-end', 
               justifyContent: 'flex-start',
              gap: '40px',
            }}>
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid  #9CA3AF',borderRight: '3px solid #DC2626' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Sales Person
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Raneesh"
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
              
            </div>

            {/* Record List Section */}
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
              Record List
            </h2>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-end', 
               justifyContent: 'flex-start',
              gap: '40px',
              marginBottom: '24px' 
            }}>
              <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px solid #9CA3AF',borderRight: '3px solid #DC2626' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Sales person Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
              <button 
                    onClick={handleSearch}
                    style={{ 
                      width: '150px',
                      height:'50px',
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

            {/* Table */}
            <div style={{ 
              border: '1px solid  #9CA3AF', 
              borderRadius: '8px', 
              overflow: 'hidden' 
            }}>
              <div style={{ 
                backgroundColor: '#fde2e2', 
                padding: '10px 16px', 
                borderBottom: '1px solid  #9CA3AF' 
              }}>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#0000000' }}>
                  Module Name
                </span>
              </div>
              <div style={{ backgroundColor: 'white' }}>
                {currentGroups.map((group, idx) => (

                  <div 
                    key={idx}
                    style={{ 
                      padding: '10px 16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      borderBottom: idx !== filteredGroups.length - 1 ? '1px solid #f3f4f6' : 'none'
                    }}
                  >
                    <ChevronRight size={16} style={{ color: '#374151' }} />
                    <span style={{ fontSize: '14px', color: '#111827' }}>{group}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
             <div style={{
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
  marginTop: '12px'
}}>
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(p => p - 1)}
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
    onClick={() => setCurrentPage(p => p + 1)}
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
          <button 
            onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: '500', color: '#B91C1C', border: '2px solid #B91C1C', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer' }}>
              <span>←</span>
              <span>Back</span>
            </button>
        </div>
      </div>
  
  );
}