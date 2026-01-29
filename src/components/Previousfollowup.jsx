import React, { useState } from 'react';
import { Home, Bell, User, Menu, ChevronDown } from 'lucide-react';
import Logo from '../assets/ozzon logo.jpeg';

export default function VesselMasterPage() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeSection, setActiveSection] = useState('followup');

  const followUpData = [
    {
      id: 1,
      sNo: 1,
      leadStatus: 'Following',
      contactDate: '27-04-26',
      nextFollowUpDate: '27-04-26',
      remark: 'The Container Was Loading'
    },
    {
      id: 2,
      sNo: 2,
      leadStatus: 'Following',
      contactDate: '27-04-26',
      nextFollowUpDate: '27-04-26',
      remark: 'The Container Was Loading'
    }
  ];

  const previousFollowUpData = [
    {
      id: 3,
      sNo: 1,
      leadStatus: 'Completed',
      contactDate: '20-04-26',
      nextFollowUpDate: '25-04-26',
      remark: 'Container Successfully Loaded'
    },
    {
      id: 4,
      sNo: 2,
      leadStatus: 'Pending',
      contactDate: '22-04-26',
      nextFollowUpDate: '26-04-26',
      remark: 'Waiting for Confirmation'
    }
  ];

  const toggleRowSelection = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  return (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F9FAFB' }}>
       {/* Top Bar */}
      <div style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
  <span style={{ fontSize: '45px', cursor: 'pointer' }}>≡</span>

  <div style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
  <img 
    src={Logo} 
    alt="Ozzon Logo" 
    style={{ height: '40px', width: 'auto', objectFit: 'contain' }} 
  />
</div>

</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
            <span style={{ color: '#374151',fontWeight: '600' }}>Home</span>
            <span style={{ color: '#9CA3AF' }}>/</span>
            <span style={{ color: '#374151', fontWeight: '600' }}>Vessel Master</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <Bell size={22} style={{ color: '#4B5563' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', backgroundColor: '#F9FAFB', padding: '6px 12px', borderRadius: '4px', border: '1px solid #E5E7EB' }}>
            <div style={{ backgroundColor: '#D1D5DB', borderRadius: '50%', padding: '6px' }}>
              <User size={16} style={{ color: '#4B5563' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12px', color: '#6B7280' }}>User Name</span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#374151' }}>ADMIN</span>
            </div>
            <ChevronDown size={16} style={{ color: '#6B7280' }} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: '176px', background: 'linear-gradient(to bottom, #7F1D1D, #991B1B)', display: 'flex', flexDirection: 'column' }}>
          <nav style={{ flex: 1, padding: '8px', paddingTop: '16px' }}>
            <div style={{ backgroundColor: '#991B1B', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '8px', borderLeft: '4px solid #FF6B35', borderRadius: '4px' }}>
              <Home size={18} color="white" />
              <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Dashboard</span>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '8px', borderRadius: '4px' }}>
              <div style={{ backgroundColor: '#7F1D1D', padding: '4px', borderRadius: '3px' }}>
                <User size={14} color="white" />
              </div>
              <span style={{ color: '#7F1D1D', fontSize: '14px', fontWeight: '500' }}>Lead</span>
            </div>
            
            <div style={{ backgroundColor: '#991B1B', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', borderRadius: '4px' }}>
              <Menu size={18} color="white" />
              <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Booking Lists</span>
            </div>
          </nav>
        </div>


        {/* Content Area */}
       <div style={{ flex: 1, overflow: 'auto', padding: '20px', backgroundColor: '#F3E8E8' }}>
          {/* Main Container Div */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Top Section - Follow Up Details and Previous Follow Up Details */}
            <div className="p-6"></div>
             
      <div
  className="grid grid-cols-2 divide-x divide-gray-400 border-b border-gray-400 rounded-lg mx-auto"
  style={{ 
    width: 'calc(100% - 8px)',
    boxShadow: '0 2px 6px rgba(0,0,0,0.5)' 
  }}
>
  
  <div 
    className={`p-3 cursor-pointer transition-colors hover:bg-gray-50`}
    onClick={() => setActiveSection('followup')}
  >
    <h2 className="font-medium text-center text-gray-700">
      Follow Up Details
    </h2>
  </div>

  <div 
    className={`p-3 cursor-pointer transition-colors hover:bg-gray-50`}
    onClick={() => setActiveSection('followup')}
  >
    <h2 className="font-medium text-center text-gray-700">
      Previous Follow Up Details
    </h2>
  </div>

</div>


            
            
            <div style={{ flex: 1, overflow: 'auto', padding: '50px' }}></div>
            {/* Table Section */}
            <div className="p-6">
              <div 
  className="overflow-x-auto rounded-lg border border-gray-300 shadow-md"
>

                <table className="w-full">
                  <thead style={{ backgroundColor: "#F3E8E8" }}>
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Select</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">S/No</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Lead Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Contact Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Next Follow Up Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(activeSection === 'followup' ? followUpData : previousFollowUpData).map((row) => (
                      <tr key={row.id} className=" hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(row.id)}
                            onChange={() => toggleRowSelection(row.id)}
                            className="w-4 h-4 text-red-800 border-gray-300 rounded focus:ring-red-800"
                          />
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{row.sNo}.</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{row.leadStatus}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{row.contactDate}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{row.nextFollowUpDate}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{row.remark}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-4">
                <button className="bg-red-800 hover:bg-red-900 text-white px-8 py-2.5 rounded font-medium  ">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}