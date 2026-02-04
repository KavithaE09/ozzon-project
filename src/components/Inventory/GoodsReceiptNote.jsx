import React, { useState } from "react";
import { Plus, Trash2, Edit2, Printer,Send } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function GoodsReceiptNotes() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [rows, setRows] = useState([
    {
      code: "001",
      product: "Steel",
      unit: "Kg",
      orderQty: 1000,
      prevQty: 0,
      arrivalQty: 0,
      rejectedQty: 0,
      acceptedQty: 0,
      remark: ""
    }
  ]);

  const handleChange = (i, field, value) => {
    const updated = [...rows];
    updated[i][field] = value;

    if (field === "arrivalQty" || field === "rejectedQty") {
      updated[i].acceptedQty =
        Number(updated[i].arrivalQty || 0) -
        Number(updated[i].rejectedQty || 0);
    }

    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        code: "",
        product: "",
        unit: "",
        orderQty: 0,
        prevQty: 0,
        arrivalQty: 0,
        rejectedQty: 0,
        acceptedQty: 0,
        remark: ""
      }
    ]);
  };

  const deleteRow = (i) => {
    setRows(rows.filter((_, index) => index !== i));
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <main className="main-section">
          <div className="content-card">
            <h1 className="page-title">G.R.N (Goods Receipt Note)</h1>

            {/* PO LIST */}
            <div className="master-table-container mb-4">
              
                <table className="data-table">
                  <thead className="table-header">
                    <tr>
                      <th className="table-th">Select</th>
                      <th className="table-th">S.No</th>
                      <th className="table-th">PO No</th>
                      <th className="table-th">PO Date</th>
                      <th className="table-th">Supplier</th>
                      <th className="table-th">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2].map((r, i) => (
                      <tr key={i} className="table-row">
                        <td className="table-cell-center">
                          <input 
                            type="radio" 
                            name="po-selection"
                            className="accent-primary"
                          />
                        </td>
                        <td className="table-cell">{r}</td>
                        <td className="table-cell">PONO00{r}</td>
                        <td className="table-cell">20-05-2025</td>
                        <td className="table-cell">Raneesh</td>
                        <td className="table-cell">
                          <div className="table-actions">
                            <Printer 
                              size={18} 
                              className="cursor-pointer print-primary hover:text-[#3730a3]"
                            />
                            <Edit2 
                              size={18}
                              className="cursor-pointer" 
                              
                            />
                            <Trash2 
                              size={18} 
                              className="cursor-pointer text-[#B91C1C] hover:text-[#DC2626]"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              
            </div>

            {/* MATERIAL LIST */}
            <h2 className="section-title">Material List</h2>
          
           <div className="master-table-container mb-4">
                <table className="data-table">
                  <thead className="table-header">
                    <tr>
                      <th className="table-th">S.No</th>
                      <th className="table-th">Code</th>
                      <th className="table-th">Product</th>
                      <th className="table-th">Unit</th>
                      <th className="table-th">Order Qty</th>
                      <th className="table-th whitespace-nowrap">Previous Received Qty</th>
                      <th className="table-th">Arrival Qty</th>
                      <th className="table-th">Rejected Qty</th>
                      <th className="table-th">Accepted Qty</th>
                      <th className="table-th">Remark</th>
                      <th className="table-th">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i} className="table-row">
                        <td className="table-cell">{i + 1}</td>
                        <td className="table-cell">{row.code}</td>
                        <td className="table-cell">{row.product}</td>
                        <td className="table-cell">{row.unit}</td>
                        <td className="table-cell">{row.orderQty}</td>
                        <td className="table-cell">{row.prevQty}</td>

                        <td className="table-cell">
                          <input
                            type="number"
                            className="w-20 h-8 px-1.5 py-1 rounded-md border border-gray-300 text-sm outline-none"
                            value={row.arrivalQty}
                            onChange={e =>
                              handleChange(i, "arrivalQty", e.target.value)
                            }
                          />
                        </td>

                        <td className="table-cell">
                          <input
                            type="number"
                            className="w-20 h-8 px-1.5 py-1 rounded-md border border-gray-300 text-sm outline-none"
                            value={row.rejectedQty}
                            onChange={e =>
                              handleChange(i, "rejectedQty", e.target.value)
                            }
                          />
                        </td>

                        <td className="table-cell">
                          <input
                            type="number"
                            className="w-20 h-8 px-1.5 py-1 rounded-md border border-gray-300 text-sm outline-none bg-gray-100"
                            value={row.acceptedQty}
                            readOnly
                          />
                        </td>

                        <td className="table-cell">
                          <input
                            placeholder="Remark"
                            className="w-[140px] h-8 px-1.5 py-1 rounded-md border border-gray-300 text-sm outline-none"
                            value={row.remark}
                            onChange={e =>
                              handleChange(i, "remark", e.target.value)
                            }
                          />
                        </td>

                        <td className="table-cell">
                          <div className="table-actions">
                            <Plus 
                              size={22} 
                             className="add-primary cursor-pointer"
                              onClick={addRow} 
                            />
                            <Edit2 
                              size={18} 
                              className="cursor-pointer "
                              
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
</div>
                {/* ADD ROW */}
              <div className="flex justify-end mt-4">
                            <button onClick={addRow} className="btn-search">
                              <Plus size={18} /> Row
                            </button>
                          </div>
              

            {/* SUBMIT BUTTON */}
            <div className="flex justify-end mt-6">
              <button className="btn-search">
                 <Send size={18} />  Submit
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