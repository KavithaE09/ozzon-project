import React from 'react';
import { Menu, Bell, User, ChevronDown, Home, FileText, List, Plus, Edit2, Trash2 } from 'lucide-react';

export default function PreviousMaterialIssueReturnList() {
  const [rows, setRows] = React.useState([
    { id: 1, slNo: 1, code: '101', product: 'TCU 152682', unit: 'Number', qty: 2, rate: '₹ 1000', amount: '₹ 2,000', isEditing: false },
    { id: 2, slNo: 2, code: 'Code', product: 'Product', unit: 'Unit', qty: 2, rate: '₹ 10,000', amount: '₹ 1,00,000', isEditing: false }
  ]);
  const [openMenuIndex, setOpenMenuIndex] = React.useState(null);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleAddRowAfter = (index) => {
    const newRow = {
      id: Date.now(),
      slNo: rows.length + 1,
      code: 'Code',
      product: 'Product',
      unit: 'Unit',
      qty: 0,
      rate: '₹ 0',
      amount: '₹ 0',
      isEditing: false
    };
    const newRows = [...rows];
    newRows.splice(index + 1, 0, newRow);
    newRows.forEach((row, idx) => {
      row.slNo = idx + 1;
    });
    setRows(newRows);
    setOpenMenuIndex(null);
  };

  const handleEdit = (index) => {
    const newRows = [...rows];
    newRows[index].isEditing = true;
    setRows(newRows);
    setOpenMenuIndex(null);
  };

  const handleDelete = (index) => {
    const newRows = rows.filter((_, idx) => idx !== index);
    newRows.forEach((row, idx) => {
      row.slNo = idx + 1;
    });
    setRows(newRows);
    setOpenMenuIndex(null);
  };

  const handleFieldChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const calculateTotalAmount = () => {
    return rows.reduce((sum, row) => {
      const amountNumber =
        typeof row.amount === "string"
          ? Number(row.amount.replace(/[^0-9]/g, ""))
          : Number(row.amount || 0);
      return sum + amountNumber;
    }, 0);
  };

  const handleSubmit = () => {
    const newRows = rows.map(row => ({ ...row, isEditing: false }));
    setRows(newRows);
    alert('Form submitted!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Menu size={20} style={{ color: '#374151', cursor: 'pointer' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontWeight: 'bold', fontSize: '24px', lineHeight: '1', letterSpacing: '0.02em' }}>
              <span style={{ color: '#4b5563' }}>O</span>
              <span style={{ color: '#dc2626' }}>ZZ</span>
              <span style={{ color: '#4b5563' }}>O</span>
              <span style={{ color: '#4b5563' }}>N</span>
            </div>
            <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '500', letterSpacing: '0.05em' }}>TECH SERVICES</div>
          </div>
        </div>
        
        <div style={{ flex: 1, marginLeft: '48px', marginRight: '48px' }}>
          <div style={{ fontSize: '14px', color: '#4b5563' }}>
            Home / <span style={{ fontWeight: '600' }}>Vessel Master</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <Bell size={22} style={{ color: '#374151', cursor: 'pointer' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#4b5563', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={20} style={{ color: 'white' }} />
            </div>
            <div style={{ fontSize: '14px' }}>
              <div style={{ color: '#9ca3af', fontSize: '11px' }}>User Name</div>
              <div style={{ fontWeight: '600', color: '#111827' }}>ADMIN</div>
            </div>
            <ChevronDown size={16} style={{ color: '#6b7280' }} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
         <div style={{ width: '160px', background: 'linear-gradient(180deg, #7f1d1d 0%, #991b1b 50%, #7f1d1d 100%)' }}>
                   <nav style={{ padding: '16px 8px' }}>
                     <div style={{ marginBottom: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', cursor: 'pointer', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                       <Home size={18} style={{ color: 'white' }} />
                       <span style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>Dashboard</span>
                     </div>
                     <div style={{ marginBottom: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', backgroundColor: 'white', cursor: 'pointer' }}>
                       <FileText size={18} style={{ color: '#7f1d1d' }} />
                       <span style={{ fontSize: '14px', fontWeight: '500', color: '#7f1d1d' }}>Lead</span>
                     </div>
                     <div style={{ marginBottom: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', cursor: 'pointer' }}>
                       <List size={18} style={{ color: 'white' }} />
                       <span style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>From</span>
                     </div>
                   </nav>
                 </div>

        <div style={{ flex: 1, overflow: 'auto', backgroundColor: '#fce7e9', padding: '48px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '40px' }}>
            
            <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#111827', margin: '0 0 48px 0', textAlign: 'center' }}>Previous Material Issue Return List</h1>
            
            <div style={{ overflowX: 'auto', marginBottom: '5px' }}>
              <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr style={{ backgroundColor: '#fef2f2' }}>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', color: '#111827', fontSize: '13px', borderTop: '1px solid #fee2e2', borderBottom: '1px solid #fee2e2', borderLeft: '1px solid #fee2e2' }}>S/No</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', color: '#111827', fontSize: '13px', borderTop: '1px solid #fee2e2', borderBottom: '1px solid #fee2e2' }}>Code</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', color: '#111827', fontSize: '13px', borderTop: '1px solid #fee2e2', borderBottom: '1px solid #fee2e2' }}>Product</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', color: '#111827', fontSize: '13px', borderTop: '1px solid #fee2e2', borderBottom: '1px solid #fee2e2' }}>Unit</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', color: '#111827', fontSize: '13px', borderTop: '1px solid #fee2e2', borderBottom: '1px solid #fee2e2' }}>Qty</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', color: '#111827', fontSize: '13px', borderTop: '1px solid #fee2e2', borderBottom: '1px solid #fee2e2' }}>Rate</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', color: '#111827', fontSize: '13px', borderTop: '1px solid #fee2e2', borderBottom: '1px solid #fee2e2' }}>Amount</th>
                    <th style={{ padding: '14px 16px', textAlign: 'center', fontWeight: '600', color: '#111827', fontSize: '13px', borderTop: '1px solid #fee2e2', borderBottom: '1px solid #fee2e2', borderRight: '1px solid #fee2e2' }}>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={row.id} style={{ backgroundColor: 'white' }}>
                      <td style={{ padding: '14px 16px', color: '#374151', fontSize: '13px', borderLeft: '1px solid #fee2e2', borderBottom: index === rows.length - 1 ? '1px solid #fee2e2' : 'none' }}>{row.slNo}</td>
                      <td style={{ padding: '14px 16px', color: '#374151', fontSize: '13px', borderBottom: index === rows.length - 1 ? '1px solid #fee2e2' : 'none' }}>
                        {row.isEditing ? (
                          <input
                            type="text"
                            value={row.code}
                            onChange={(e) => handleFieldChange(index, 'code', e.target.value)}
                            style={{ width: '100%', padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}
                          />
                        ) : (
                          row.code
                        )}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#374151', borderBottom: index === rows.length - 1 ? '1px solid #fee2e2' : 'none' }}>
                        {row.isEditing ? (
                          <select
                            value={row.product}
                            onChange={(e) => handleFieldChange(index, 'product', e.target.value)}
                            style={{ width: '100%', padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}
                          >
                            <option value="Product">Product</option>
                            <option value="TCU 152682">TCU 152682</option>
                            <option value="Product A">Product A</option>
                            <option value="Product B">Product B</option>
                          </select>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '13px' }}>{row.product}</span>
                            <ChevronDown size={16} style={{ color: '#6b7280' }} />
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#374151', borderBottom: index === rows.length - 1 ? '1px solid #fee2e2' : 'none' }}>
                        {row.isEditing ? (
                          <select
                            value={row.unit}
                            onChange={(e) => handleFieldChange(index, 'unit', e.target.value)}
                            style={{ width: '100%', padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}
                          >
                            <option value="Unit">Unit</option>
                            <option value="Number">Number</option>
                            <option value="Kg">Kg</option>
                            <option value="Litre">Litre</option>
                          </select>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '13px' }}>{row.unit}</span>
                            <ChevronDown size={16} style={{ color: '#6b7280' }} />
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#374151', fontSize: '13px', borderBottom: index === rows.length - 1 ? '1px solid #fee2e2' : 'none' }}>
                        {row.isEditing ? (
                          <input
                            type="number"
                            value={row.qty}
                            onChange={(e) => handleFieldChange(index, 'qty', e.target.value)}
                            style={{ width: '100%', padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}
                          />
                        ) : (
                          row.qty
                        )}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#374151', fontSize: '13px', borderBottom: index === rows.length - 1 ? '1px solid #fee2e2' : 'none' }}>
                        {row.isEditing ? (
                          <input
                            type="text"
                            value={row.rate}
                            onChange={(e) => handleFieldChange(index, 'rate', e.target.value)}
                            style={{ width: '100%', padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}
                          />
                        ) : (
                          row.rate
                        )}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#374151', fontSize: '13px', borderBottom: index === rows.length - 1 ? '1px solid #fee2e2' : 'none' }}>
                        {row.isEditing ? (
                          <input
                            type="text"
                            value={row.amount}
                            onChange={(e) => handleFieldChange(index, 'amount', e.target.value)}
                            style={{ width: '100%', padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px' }}
                          />
                        ) : (
                          row.amount
                        )}
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'center', borderRight: '1px solid #fee2e2', borderBottom: index === rows.length - 1 ? '1px solid #fee2e2' : 'none', position: 'relative' }}>
                        <button 
                          onClick={() => toggleMenu(index)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                          title="Menu"
                        >
                          <Menu size={18} style={{ color: '#6b7280' }} />
                        </button>
                        
                        {openMenuIndex === index && (
                          <div style={{ 
                            position: 'absolute', 
                            right: '16px', 
                            top: '50%',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb', 
                            borderRadius: '6px', 
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            zIndex: 10,
                            display: 'flex',
                            gap: '8px',
                            padding: '8px 12px'
                          }}>
                            <button
                              onClick={() => handleAddRowAfter(index)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                              title="Add Row"
                            >
                              <Plus size={18} style={{ color: '#374151' }} />
                            </button>
                            
                            <button
                              onClick={() => handleEdit(index)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                              title="Edit"
                            >
                              <Edit2 size={18} style={{ color: '#374151' }} />
                            </button>
                            
                            <button
                              onClick={() => handleDelete(index)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                              title="Delete"
                            >
                              <Trash2 size={18} style={{ color: '#dc2626' }} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                alignItems: 'center',
                borderLeft: '1px solid #fee2e2',
                borderRight: '1px solid #fee2e2',
                borderBottom: '1px solid #fee2e2',
                backgroundColor: 'white',
                padding: '8px 16px'
              }}>
                <button 
                  onClick={() => handleAddRowAfter(rows.length - 1)}
                  style={{ 
                    backgroundColor: 'white',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Plus size={16} style={{ color: '#374151' }} />
                  <span>Row</span>
                </button>
              </div>
            </div>

            <div style={{ 
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '12px'
            }}>
              <div style={{ 
                border: '1px solid #e5e7eb', 
                borderRadius: '6px', 
                padding: '12px 20px',
                backgroundColor: '#f9fafb',
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>Total Amount :</span>
                <span style={{ fontSize: '14px', color: '#111827', fontWeight: '600' }}>₹ {calculateTotalAmount().toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '20px' }}>
              <button 
                onClick={handleSubmit}
                style={{ 
                  backgroundColor: '#991b1b', 
                  color: 'white', 
                  border: 'none', 
                  padding: '10px 48px', 
                  borderRadius: '4px', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  cursor: 'pointer' 
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}