import React, { useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function PurchaseOrder() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [rows, setRows] = useState([
    { code: "", product: "", unit: "", qty: 1, rate: 0, amount: 0 }
  ]);

  const handleChange = (i, field, value) => {
    const updated = [...rows];
    updated[i][field] = value;

    if (field === "qty" || field === "rate") {
      updated[i].amount =
        Number(updated[i].qty || 0) * Number(updated[i].rate || 0);
    }
    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { code: "", product: "", unit: "", qty: 1, rate: 0, amount: 0 }
    ]);
  };

  const deleteRow = (i) => {
    setRows(rows.filter((_, index) => index !== i));
  };

  const totalAmount = rows.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <main className="main-section">
          <div className="content-card">
            <h1 className="page-title">Purchase Order</h1>

            {/* Top Form */}
            <div className="filter-grid mb-6">
              <TopInput label="PO No" value="PONO001" />
              <TopInput label="PO Date" type="date" value={today} />
              <TopSelect
                label="Supplier"
                options={["Safi & Co", "ABC Traders", "Global Supplies"]}
              />
              <TopInput label="Expect Date" type="date" value={today} />
            </div>

            {/* Material List */}
        
          
                <h2 className="master-table-title">Material List</h2>
              

              <div className="table-container">
                <table className="data-table">
                  <thead className="table-header">
                    <tr>
                      <th className="table-th">S.No</th>
                      <th className="table-th">Code</th>
                      <th className="table-th">Product</th>
                      <th className="table-th">Unit</th>
                      <th className="table-th">Qty</th>
                      <th className="table-th">Rate</th>
                      <th className="table-th">Amount</th>
                      <th className="table-th">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i} className="table-row">
                        <td className="table-cell">{i + 1}</td>

                        {/* CODE INPUT */}
                        <td className="table-cell">
                          <input
                            className="w-[90px] px-1.5 py-1.5 border border-gray-300 rounded text-sm outline-none"
                            placeholder="Code"
                            value={row.code}
                            onChange={e =>
                              handleChange(i, "code", e.target.value)
                            }
                          />
                        </td>

                        <td className="table-cell">
                          <select
                            className="w-[140px] px-1.5 py-1.5 border border-gray-300 rounded text-sm outline-none"
                            value={row.product}
                            onChange={e =>
                              handleChange(i, "product", e.target.value)
                            }
                          >
                            <option value="">Select</option>
                            <option>Cement</option>
                            <option>Steel</option>
                            <option>Bricks</option>
                          </select>
                        </td>

                        <td className="table-cell">
                          <select
                            className="w-[140px] px-1.5 py-1.5 border border-gray-300 rounded text-sm outline-none"
                            value={row.unit}
                            onChange={e =>
                              handleChange(i, "unit", e.target.value)
                            }
                          >
                            <option value="">Select</option>
                            <option>Kg</option>
                            <option>Nos</option>
                            <option>Bag</option>
                          </select>
                        </td>

                        <td className="table-cell">
                          <input
                            type="number"
                            min="0"
                            className="w-[80px] px-1.5 py-1.5 border border-gray-300 rounded text-sm outline-none"
                            value={row.qty}
                            onChange={e =>
                              handleChange(i, "qty", e.target.value)
                            }
                          />
                        </td>

                        <td className="table-cell">
                          <input
                            type="number"
                            min="0"
                            className="w-[120px] px-1.5 py-1.5 border border-gray-300 rounded text-sm outline-none"
                            value={row.rate}
                            onChange={e =>
                              handleChange(i, "rate", e.target.value)
                            }
                          />
                        </td>

                        <td className="table-cell">
                          ₹ {row.amount.toLocaleString()}
                        </td>

                        <td className="table-cell">
                          <div className="flex gap-2">
                            <Plus 
                              size={18} 
                             className="add-primary"
                              onClick={addRow} 
                            />
                            <Edit2 
                              size={18} 
                              
                            />
                            <Trash2
                              size={18}
                              className="cursor-pointer text-[#B91C1C] hover:text-[#DC2626]"
                              onClick={() => deleteRow(i)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-3 text-right font-bold text-base pr-2">
                  Total Amount : ₹ {totalAmount.toLocaleString()}
                </div>
              </div>
            
            {/* Remarks & Submit */}
            <div className="flex gap-5 mt-5">
              <textarea
                placeholder="Remarks"
                rows={3}
                className="w-[70%] p-2.5 rounded-md border border-gray-300 outline-none resize-none"
              />
              <button 
                className="btn-search ml-auto mt-2.5"
              >
                Submit
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
}

/* Top Input Component */
const TopInput = ({ label, type = "text", value }) => (
  <div className="filter-grid-red">
    <label className="filter-label">{label}</label>
    <input 
      type={type} 
      defaultValue={value} 
      className="filter-input"
    />
  </div>
);

/* Top Select Component */
const TopSelect = ({ label, options }) => (
  <div className="filter-grid-red">
    <label className="filter-label">{label}</label>
    <select className="filter-input">
      {options.map(o => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);