import React, { useState } from 'react';
import { Menu, Bell, User, ChevronDown, Home, FileText, List, Plus, Edit2, Trash2, X, MoreVertical, Printer, ChevronRight, ChevronLeft, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TemplateSettings() {
  const navigate = useNavigate();
  const [templateName, setTemplateName] = useState('Office Container');
 const [currentPage, setCurrentPage] = useState(1);
 const rowsPerPage = 5;


  const [rows, setRows] = useState([
    { id: 1, slNo: 1, group: 'Door', specification: '(7 X 3 )FT Size Metal safety door with UPVC door SS hinges, lock and canopy above door', dimension: "20*8*8.6", noOfUnit: 1, amount: 10000.00, hiddenAmount: 10000.00 },
     { id: 2, slNo: 2, group: 'Window', specification: 'UPVC sliding window with mesh', dimension: '20*8*8.6', noOfUnit: 2, amount: 500000, hiddenAmount: 500000 },
    { id: 3, slNo: 3, group: 'Flooring', specification: 'Vitrified tiles 2x2 feet', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 },
    { id: 4, slNo: 4, group: 'Roofing', specification: 'MS sheet roofing with insulation', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 },
     { id: 5, slNo: 5, group: 'Door', specification: '(7 X 3 )FT Size Metal safety door with UPVC door SS hinges, lock and canopy above door', dimension: "20*8*8.6", noOfUnit: 1, amount: 10000.00, hiddenAmount: 10000.00 },
     { id: 6, slNo: 6, group: 'Window', specification: 'UPVC sliding window with mesh', dimension: '20*8*8.6', noOfUnit: 2, amount: 500000, hiddenAmount: 500000 },
    { id: 7, slNo: 7, group: 'Flooring', specification: 'Vitrified tiles 2x2 feet', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 },
    { id: 8, slNo: 8, group: 'Roofing', specification: 'MS sheet roofing with insulation', dimension: '20*8*8.6', noOfUnit: 1, amount: 100000, hiddenAmount: 100000 },
  ])
  
const totalPages = Math.ceil(rows.length / rowsPerPage);

const indexOfLastRow = currentPage * rowsPerPage;
const indexOfFirstRow = indexOfLastRow - rowsPerPage;

const currentRows = rows.slice(
  indexOfFirstRow,
  indexOfLastRow
);

  const [editingRow, setEditingRow] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showSpecModal, setShowSpecModal] = useState(false);
  const [currentRowForModal, setCurrentRowForModal] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [insertAfterRowId, setInsertAfterRowId] = useState(null);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [showGroupDropdown, setShowGroupDropdown] = useState(null);
  const [showSpecDropdown, setShowSpecDropdown] = useState(null);


  const groupMasters = ['Door', 'Window', 'Flooring', 'Roofing', 'Electrical'];
  const specMasters = [
    '(7 X 3 )FT Size Metal safety door with UPVC door SS hinges, lock and canopy above door',
    'UPVC sliding window with mesh',
    'Vitrified tiles 2x2 feet',
    'MS sheet roofing with insulation'
  ];

  const [newRowData, setNewRowData] = useState({
    slNo: '',
    group: '',
    specification: '',
    dimension: '',
    noOfUnit: '',
    amount: '',
    hiddenAmount: ''
  });

  const [discount, setDiscount] = useState(10000);
  const [gstPercentage, setGstPercentage] = useState(18);


  const handleAddButtonClick = () => {
    setShowAddForm(true);
    setInsertAfterRowId(null);
  };

  const handleInsertRow = (afterRowId) => {
    setShowAddForm(true);
    setInsertAfterRowId(afterRowId);
  };

  const handleDropdownKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      stopEditing();
    }
  };

  const handleSaveNewRow = () => {
    const row = {
      id: Date.now(),
      slNo: newRowData.slNo || rows.length + 1,
      group: newRowData.group,
      specification: newRowData.specification,
      dimension: newRowData.dimension,
      noOfUnit: parseFloat(newRowData.noOfUnit) || 0,
      amount: parseFloat(newRowData.amount) || 0,
      hiddenAmount: parseFloat(newRowData.hiddenAmount) || 0
    };

    if (insertAfterRowId) {
      const index = rows.findIndex(r => r.id === insertAfterRowId);
      const newRows = [...rows];
      newRows.splice(index + 1, 0, row);
      setRows(newRows);
    } else {
      setRows([...rows, row]);
    }

    setShowAddForm(false);
    setInsertAfterRowId(null);
    setCurrentPage(1);

    setNewRowData({
      slNo: '',
      group: '',
      specification: '',
      dimension: '',
      noOfUnit: '',
      amount: '',
      hiddenAmount: ''
    });
  };

  const toggleMenu = (index) => {
  setOpenMenuIndex(prev => (prev === index ? null : index));
  };

  const handleEdit = (index) => {
  setEditingRow(rows[index].id);
  setOpenMenuIndex(null);
};
const handleSubmit = () => {
    alert('Form submitted successfully!');
  };

const handleDelete = (index) => {
     setRows(prevRows => prevRows.filter((_, i) => i !== index));
    setOpenMenuIndex(null);
    setCurrentPage(1);

};

const stopEditing = () => {
    setEditingRow(null);
    setShowGroupDropdown(null);
    setShowSpecDropdown(null);
  };


  const updateRow = (id, field, value) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const selectFromMaster = (type, value) => {
    if (type === 'group') {
      if (currentRowForModal === 'newRow') {
        setNewRowData({ ...newRowData, group: value });
      } else {
        updateRow(currentRowForModal, 'group', value);
      }
      setShowGroupModal(false);
    } else {
      if (currentRowForModal === 'newRow') {
        setNewRowData({ ...newRowData, specification: value });
      } else {
        updateRow(currentRowForModal, 'specification', value);
      }
      setShowSpecModal(false);
    }
    setCurrentRowForModal(null);
  };

  const calculateTotal = () => {
    return rows.reduce((sum, row) => sum + row.amount, 0);
  };

  const calculateGST = () => {
    const taxableValue = calculateTaxableValue();
    return taxableValue * (gstPercentage / 100);
  };

  const calculateTaxableValue = () => {
    return calculateTotal() - discount;
  };

  const calculateNetAmount = () => {
    return calculateTaxableValue() + calculateGST();
  };

  return (
    <div className="page-container">
     

      <div className="content-wrapper">
    
        <div className="main-section">
          <div className="content-card">
            <h2 className="page-title">Template Settings</h2>

            <div className="filter-grid-red mb-6">
              <label className="filter-label">Template Name</label>
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="filter-input w-[300px]"
              />
            </div>

            {/* Table */}
            <div className="table-container mb-5">
              <table className="data-table">
                <thead className="table-header">
                  <tr>
                    <th className="table-th">Sl No</th>
                    <th className="table-th">Template Group</th>
                    <th className="table-th">Template Specification</th>
                    <th className="table-th">Dimension</th>
                    <th className="table-th">No. of Unit</th>
                    <th className="table-th">Amount</th>
                    <th className="table-th">Hidden Amount</th>
                    <th className="table-th-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row, index) => (

             <tr key={row.id} className="table-row">
               <td className="table-cell">{row.slNo}</td>
           
               {/* GROUP */}
               <td className="table-cell relative">
                 {editingRow === row.id ? (
                   <div>
                     <div
                       onClick={(e) => {
                         e.stopPropagation();
                         setShowGroupDropdown(showGroupDropdown === row.id ? null : row.id);
                       }}
                       onKeyDown={handleDropdownKeyDown}
                       tabIndex={0}
                       className="w-full px-2 py-1.5 border border-gray-300 rounded flex justify-between items-center cursor-pointer bg-white text-sm"
                     >
                       <span>{row.group}</span>
                       <ChevronDown size={20} className="text-black" />
                     </div>
           
                     {showGroupDropdown === row.id && (
                       <div
                         onClick={(e) => e.stopPropagation()}
                         className="absolute top-full left-2 right-2 bg-white border border-gray-300 rounded mt-1 z-10 shadow-md"
                       >
                         {groupMasters.map((option, idx) => (
                           <div
                             key={idx}
                             onClick={() => {
                               updateRow(row.id, "group", option);
                               setShowGroupDropdown(null);
                               stopEditing();
                             }}
                             tabIndex={0}
                             className="px-3 py-2 cursor-pointer text-sm hover:bg-gray-50"
                           >
                             {option}
                           </div>
                         ))}
                       </div>
                     )}
                   </div>
                 ) : (
                   <span>{row.group}</span>
                 )}
               </td>
           
               {/* SPECIFICATION */}
               <td className="table-cell relative">
                 {editingRow === row.id ? (
                   <div>
                     <div
                       onClick={(e) => {
                         e.stopPropagation();
                         setShowSpecDropdown(showSpecDropdown === row.id ? null : row.id);
                       }}
                       onKeyDown={handleDropdownKeyDown}
                       tabIndex={0}
                       className="w-full px-2 py-1.5 border border-gray-300 rounded flex justify-between items-center cursor-pointer bg-white text-sm"
                     >
                       <span>{row.specification}</span>
                       <ChevronDown size={20} className="text-black" />
                     </div>
           
                     {showSpecDropdown === row.id && (
                       <div
                         onClick={(e) => e.stopPropagation()}
                         className="absolute top-full left-2 right-2 bg-white border border-gray-300 rounded mt-1 z-10 shadow-md"
                       >
                         {specMasters.map((option, idx) => (
                           <div
                             key={idx}
                             onClick={() => {
                               updateRow(row.id, "specification", option);
                               setShowSpecDropdown(null);
                               stopEditing();
                             }}
                             tabIndex={0}
                             className="px-3 py-2 cursor-pointer text-sm hover:bg-gray-50"
                           >
                             {option}
                           </div>
                         ))}
                       </div>
                     )}
                   </div>
                 ) : (
                   <span>{row.specification}</span>
                 )}
               </td>
           
               {/* DIMENSION */}
               <td className="table-cell">
                 {editingRow === row.id ? (
                   <input
                     type="text"
                     value={row.dimension}
                     onChange={(e) => updateRow(row.id, "dimension", e.target.value)}
                     onKeyDown={(e) => e.key === "Enter" && stopEditing()}
                     className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                   />
                 ) : (
                   <span>{row.dimension}</span>
                 )}
               </td>
           
               {/* NO OF UNIT */}
               <td className="table-cell">
                 {editingRow === row.id ? (
                   <input
                     type="number"
                     value={row.noOfUnit}
                     onChange={(e) =>
                       updateRow(row.id, "noOfUnit", parseInt(e.target.value))
                     }
                     onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                     className="w-20 px-2 py-1.5 border border-gray-300 rounded text-sm"
                   />
                 ) : (
                   <span>{row.noOfUnit}</span>
                 )}
               </td>
           
               {/* AMOUNT */}
               <td className="table-cell">
                 {editingRow === row.id ? (
                   <input
                     type="number"
                     value={row.amount}
                     onChange={(e) =>
                       updateRow(row.id, "amount", parseFloat(e.target.value))
                     }
                     onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                     className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
                   />
                 ) : (
                   <span>₹ {row.amount.toFixed(2)}</span>
                 )}
               </td>
           
               {/* HIDDEN AMOUNT */}
               <td className="table-cell">
                 {editingRow === row.id ? (
                   <input
                     type="number"
                     value={row.hiddenAmount}
                     onChange={(e) =>
                       updateRow(row.id, "hiddenAmount", parseFloat(e.target.value))
                     }
                     onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                     className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
                   />
                 ) : (
                   <span>₹ {row.hiddenAmount.toFixed(2)}</span>
                 )}
               </td>
           
               {/* ACTIONS */}
               <td className="table-cell-center">
                 <div className="table-actions relative">
                   <button
                     onClick={() => toggleMenu(index)}
                     className="btn-action"
                   >
                     <Menu size={18} className="text-gray-700" />
                   </button>
           
                   {openMenuIndex === index && (
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-md shadow-md flex gap-2 p-2 z-10">
                       <Plus size={18} 
                       className="text-green-600 cursor-pointer" 
                        onClick={() => {
                        handleInsertRow(row.id);
                        setOpenMenuIndex(null);
                        }}
                       />
                       <Edit2 size={18} 
                       className="text-gray-700 cursor-pointer"
                        onClick={() => {
                        handleEdit(index);
                        setOpenMenuIndex(null);
                        }} />
                       <Trash2 size={18} 
                       className="text-red-600 cursor-pointer" 
                       onClick={() => {
                       handleDelete(index);
                       setOpenMenuIndex(null);
                       }}/>
                     </div>
                   )}
                 </div>
               </td>
             </tr>
           ))}
           
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination-container">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className={currentPage === 1 ? 'pagination-btn pagination-btn-disabled' : 'pagination-btn pagination-btn-active'}
              >
                <ChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? 'pagination-page-btn pagination-page-active' : 'pagination-page-btn pagination-page-inactive'}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className={currentPage === totalPages ? 'pagination-btn pagination-btn-disabled' : 'pagination-btn pagination-btn-active'}
              >
                <ChevronRight />
              </button>
            </div>

           
            <div className="flex justify-end mb-5">
              <button
                onClick={handleAddButtonClick}
                className="btn-smallbtn flex items-center gap-2"
              >
                <Plus size={18} />
                Add Row
              </button>
            </div>

            {showAddForm && (
                <div className="grid grid-cols-8 gap-3 items-end pb-2">
                  <div className="bg-red-50 p-2.5 rounded border border-gray-300">
                    <label className="block text-[11px] text-gray-600 mb-1.5 font-bold">Sl No</label>
                    <input
                      type="text"
                      placeholder="Input"
                      value={newRowData.slNo}
                      onChange={(e) => setNewRowData({ ...newRowData, slNo: e.target.value })}
                      className="filter-input text-[13px]"
                    />
                  </div>

                  <div className="bg-white p-2.5 rounded border border-gray-300">
                    <div className="flex items-center gap-2 mb-1.5">
                      <label className="text-[11px] text-gray-600 font-bold m-0">Template Group</label>
                      <button
                        onClick={() => { setCurrentRowForModal('newRow'); setShowGroupModal(true); }}
                        className="p-0 border-none bg-transparent cursor-pointer flex items-center"
                      >
                        <ChevronDown size={14} className="text-gray-600" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Input"
                      value={newRowData.group}
                      onChange={(e) => setNewRowData({ ...newRowData, group: e.target.value })}
                      className="filter-input text-[13px]"
                    />
                  </div>

                  <div className="bg-white p-2.5 rounded border border-gray-300">
                    <div className="flex items-center gap-2 mb-1.5">
                      <label className="text-[11px] text-gray-600 font-bold m-0">Template Specification</label>
                      <button
                        onClick={() => { setCurrentRowForModal('newRow'); setShowSpecModal(true); }}
                        className="p-0 border-none bg-transparent cursor-pointer flex items-center"
                      >
                        <ChevronDown size={14} className="text-gray-600" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Input"
                      value={newRowData.specification}
                      onChange={(e) => setNewRowData({ ...newRowData, specification: e.target.value })}
                      className="filter-input text-[13px]"
                    />
                  </div>

                  <div className="bg-white p-2.5 rounded border border-gray-300">
                    <label className="block text-[11px] text-gray-600 mb-1.5 font-bold">Dimension</label>
                    <input
                      type="text"
                      placeholder="Input"
                      value={newRowData.dimension}
                      onChange={(e) => setNewRowData({ ...newRowData, dimension: e.target.value })}
                      className="filter-input text-[13px]"
                    />
                  </div>

                  <div className="bg-white p-2.5 rounded border border-gray-300">
                    <label className="block text-[11px] text-gray-600 mb-1.5 font-bold">No. of Unit</label>
                    <input
                      type="text"
                      placeholder="20*8*8.6"
                      value={newRowData.noOfUnit}
                      onChange={(e) => setNewRowData({ ...newRowData, noOfUnit: e.target.value })}
                      className="filter-input text-[13px]"
                    />
                  </div>

                  <div className="bg-white p-2.5 rounded border border-gray-300">
                    <label className="block text-[11px] text-gray-600 mb-1.5 font-bold">Amount</label>
                    <input
                      type="text"
                      placeholder="₹ 10,00,000"
                      value={newRowData.amount}
                      onChange={(e) => setNewRowData({ ...newRowData, amount: e.target.value })}
                      className="filter-input text-[13px]"
                    />
                  </div>

                  <div className="bg-white p-2.5 rounded border border-gray-300">
                    <label className="block text-[11px] text-gray-600 mb-1.5 font-bold">Hidden Amount</label>
                    <input
                      type="text"
                      placeholder="₹ 10,00,000"
                      value={newRowData.hiddenAmount}
                      onChange={(e) => setNewRowData({ ...newRowData, hiddenAmount: e.target.value })}
                      className="filter-input text-[13px]"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={handleSaveNewRow}
                      className="btn-smallbtn w-full"
                    >
                      Save
                    </button>
                  </div>
                </div>
            )}
      

            <div className="mb-5 border border-gray-400 rounded-md overflow-hidden">
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-400 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-900 m-0">Terms And Conditions</h3>
                <button className="p-1 border-none bg-transparent text-gray-600 cursor-pointer">
                  <Edit2 size={18} />
                </button>
              </div>
              <div className="p-4 text-xs text-gray-600 leading-relaxed">
                <p className="m-0 mb-2">1. This rate is valid for 2 weeks from the quotation date</p>
                <p className="m-0 mb-2">2. Delivery: Fabrication will take a minimum of 21 days to complete.</p>
                <p className="m-0 mb-2">3. Payment Terms: 50% advance & balance 40% on completion and before loading</p>
                <p className="m-0 mb-2">4. Transportation & Unloading: To be arranged by the customer at site.</p>
                <p className="m-0 mb-2">5. Warranty: Seller has a buy-back policy once the container or cabin duration expires.</p>
                <p className="m-0 mb-2">6. Warranty: Six months from the date of delivery. Warranty excludes physical damage, misuse and unauthorised alterations.</p>
                <p className="m-0">7. Transit Insurance: Transit insurance can be arranged on request and will be billed separately, subject to customer acceptance.</p>
              </div>
            </div>

            <div className="mb-5 border border-gray-400 rounded-md p-3">
              <h3 className="section-title">Total Amount</h3>
              
              <div className="grid grid-cols-4 gap-4 pb-1.5">
                <div className="filter-grid-red">
                  <div className="filter-label">Total</div>
                   <input
                           readOnly
                            value={`₹ ${calculateTotal().toFixed(2)}`}
                             className="filter-input bg-transparent"
                        />
                </div>
                
                <div className="filter-grid-red">
                  <div className="filter-label">Discount</div>
                  <input
        type="number"
        value={discount}
        onChange={(e) => setDiscount(Number(e.target.value) || 0)}
         className="filter-input bg-transparent"
      />
                </div>
                
                <div className="filter-grid-red">
                  <div className="filter-label">Taxable Value</div>
                    <input
        readOnly
        value={`₹ ${calculateTaxableValue().toFixed(2)}`}
         className="filter-input bg-transparent"
      />
                  </div>
                
                <div className="filter-grid-red">
                  <div className="filter-label">GST 18%</div>
                    <input
        type="number"
        value={gstPercentage}
        onChange={(e) => setGstPercentage(Number(e.target.value) || 0)}
        className="filter-input bg-transparent"
      />
                  </div>
              </div>

              <div className="filter-grid-red">
                <div className="filter-label">Net Amount</div>
                <input
      readOnly
      value={`₹ ${calculateNetAmount().toFixed(2)}`}
       className="filter-input bg-transparent"
    />
                </div>
            </div>

            <div className="flex justify-end">
               <button 
            onClick={handleSubmit}
            className="btn-all"
                  >
                    <span>✓</span>
                <span>Submit</span>
                  </button>
            </div>
             <div className="footer-container">
              <button onClick={() => navigate(-1)} className="btn-back">
                <span>←</span>
                <span>Back</span>
              </button>
            </div> 
             
          </div>
          
        </div>
      </div>

      {showGroupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg p-6 w-[400px] max-h-[500px] overflow-auto">
            <h3 className="text-lg font-semibold mb-4">Select Group</h3>
            <div className="flex flex-col gap-2">
              {groupMasters.map((group, idx) => (
                <button
                  key={idx}
                  onClick={() => selectFromMaster('group', group)}
                  className="p-3 border border-gray-200 rounded cursor-pointer text-left bg-white text-sm hover:bg-gray-50"
                >
                  {group}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowGroupModal(false)}
              className="mt-4 py-2.5 px-5 border-none rounded bg-gray-600 text-white cursor-pointer w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showSpecModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg p-6 w-[500px] max-h-[500px] overflow-auto">
            <h3 className="text-lg font-semibold mb-4">Select Specification</h3>
            <div className="flex flex-col gap-2">
              {specMasters.map((spec, idx) => (
                <button
                  key={idx}
                  onClick={() => selectFromMaster('spec', spec)}
                  className="p-3 border border-gray-200 rounded cursor-pointer text-left bg-white text-[13px] hover:bg-gray-50"
                >
                  {spec}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowSpecModal(false)}
              className="mt-4 py-2.5 px-5 border-none rounded bg-gray-600 text-white cursor-pointer w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

       
    </div>

    
    
  );
}