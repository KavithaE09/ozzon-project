import { Plus, Pencil, Trash2, ChevronDown, ArrowUp, ArrowDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react"; 
import { useNavigate } from 'react-router-dom';
 
export default function PurchaseReturn() {
  const navigate = useNavigate();
  const [editingRow, setEditingRow] = useState(null);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [form, setForm] = useState({
    salesDate: getTodayDate(),
    salesType: "",
    customer: "",
    cashAccount: "",
    salesAccount: "",
    billNo: "88447755127436",
    remarks: "kavitha",
    includingTax: false,
    voucherNo: "1234",
    customerBal: "₹ 1,00,000",
    salesBal: "₹ 1,00,000",
    gstin: "33ABCDE1234F2Z5",
  }); 

  const [charges, setCharges] = useState({
    weighing: "",
    freight: "",
    other: "",
    cgst2_5: "",
    sgst2_5: "",
    igst5: "",
    cgst6: "",
    sgst6: "",
    igst12: "",
    cgst9: "",
    sgst9: "",
    igst18: "",
    cgst14: "",
    sgst14: "",
    igst28: "",
  });

  // Dropdown states
  const [salesTypeSearch, setSalesTypeSearch] = useState('');
  const [isSalesTypeOpen, setIsSalesTypeOpen] = useState(false);
  const [hoveredSalesType, setHoveredSalesType] = useState(null);
  const salesTypeRef = useRef(null);

  const [customerSearch, setCustomerSearch] = useState('');
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [hoveredCustomer, setHoveredCustomer] = useState(null);
  const customerRef = useRef(null);

  const [cashAccountSearch, setCashAccountSearch] = useState('');
  const [isCashAccountOpen, setIsCashAccountOpen] = useState(false);
  const [hoveredCashAccount, setHoveredCashAccount] = useState(null);
  const cashAccountRef = useRef(null);

  const [salesAccountSearch, setSalesAccountSearch] = useState('');
  const [isSalesAccountOpen, setIsSalesAccountOpen] = useState(false);
  const [hoveredSalesAccount, setHoveredSalesAccount] = useState(null);
  const salesAccountRef = useRef(null);

  // Options
  const salesTypeOptions = ["Credit / Cash Purchase", "Credit", "Cash"];
  const customerOptions = ["Safi & Co", "Global Traders"];
  const cashAccountOptions = ["Cash", "Bank"];
  const salesAccountOptions = ["Material Sales Account", "Material Purchase Account"];

  // Filtered options
  const filteredSalesTypes = salesTypeOptions.filter(opt =>
    opt.toLowerCase().includes(salesTypeSearch.toLowerCase())
  );
  const filteredCustomers = customerOptions.filter(opt =>
    opt.toLowerCase().includes(customerSearch.toLowerCase())
  );
  const filteredCashAccounts = cashAccountOptions.filter(opt =>
    opt.toLowerCase().includes(cashAccountSearch.toLowerCase())
  );
  const filteredSalesAccounts = salesAccountOptions.filter(opt =>
    opt.toLowerCase().includes(salesAccountSearch.toLowerCase())
  );

  const [rows, setRows] = useState([
    {
      code: "101",
      product: "TCKU 1524662",
      unit: "Number",
      qty: 2,
      rate: 1000,
      disc: 10,
    },
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (salesTypeRef.current && !salesTypeRef.current.contains(event.target)) {
        setIsSalesTypeOpen(false);
      }
      if (customerRef.current && !customerRef.current.contains(event.target)) {
        setIsCustomerOpen(false);
      }
      if (cashAccountRef.current && !cashAccountRef.current.contains(event.target)) {
        setIsCashAccountOpen(false);
      }
      if (salesAccountRef.current && !salesAccountRef.current.contains(event.target)) {
        setIsSalesAccountOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [key]: value });
  };

  const updateRow = (index, key, value) => {
    const newRows = [...rows];
    newRows[index][key] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { code: "", product: "", unit: "", qty: 0, rate: 0, disc: 0 },
    ]);
  };

  const addRowAbove = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 0, { code: "", product: "", unit: "", qty: 0, rate: 0, disc: 0 });
    setRows(newRows);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return; // Cannot move up if it's the first row
    const newRows = [...rows];
    // Swap with previous row
    [newRows[index - 1], newRows[index]] = [newRows[index], newRows[index - 1]];
    setRows(newRows);
  };

  const handleMoveDown = (index) => {
    if (index === rows.length - 1) return; // Cannot move down if it's the last row
    const newRows = [...rows];
    // Swap with next row
    [newRows[index], newRows[index + 1]] = [newRows[index + 1], newRows[index]];
    setRows(newRows);
  };

  const salesTotals = rows.reduce(
    (acc, row) => {
      const qty = Number(row.qty) || 0;
      const rate = Number(row.rate) || 0;
      const disc = Number(row.disc) || 0;

      const amount = qty * rate;
      const discAmount = (amount * disc) / 100;
      const taxable = amount - discAmount;

      const cgst = (taxable * 9) / 100;
      const sgst = (taxable * 9) / 100;

      acc.totalAmount += amount;
      acc.totalDiscount += discAmount;
      acc.taxableValue += taxable;
      acc.cgstTotal += cgst;
      acc.sgstTotal += sgst;

      return acc;
    },
    {
      totalAmount: 0,
      totalDiscount: 0,
      taxableValue: 0,
      cgstTotal: 0,
      sgstTotal: 0,
    }
  );

  const chargesTotal = Object.values(charges).reduce(
    (sum, val) => sum + (Number(val) || 0),
    0
  );

  const netAmount =
    salesTotals.taxableValue +
    salesTotals.cgstTotal +
    salesTotals.sgstTotal +
    chargesTotal;

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <h2 className="page-title">Purchase Return</h2>

            <div className="flex gap-5 mt-6">
              <div className="flex-1">
                <div className="flex gap-5">
                  <FloatingInput
                    label="Purchase Return Date"
                    type="date"
                    value={form.salesDate}
                    onChange={handleChange("salesDate")}
                  />

                  <FloatingDropdown
                    label="Purchase Return Type"
                    value={salesTypeSearch}
                    setValue={setSalesTypeSearch}
                    isOpen={isSalesTypeOpen}
                    setIsOpen={setIsSalesTypeOpen}
                    hovered={hoveredSalesType}
                    setHovered={setHoveredSalesType}
                    options={filteredSalesTypes}
                    dropdownRef={salesTypeRef}
                    onSelect={(option) => {
                      setForm({ ...form, salesType: option });
                      setSalesTypeSearch(option);
                      setIsSalesTypeOpen(false);
                    }}
                  />

                  <FloatingDropdown
                    label="Customer"
                    value={customerSearch}
                    setValue={setCustomerSearch}
                    isOpen={isCustomerOpen}
                    setIsOpen={setIsCustomerOpen}
                    hovered={hoveredCustomer}
                    setHovered={setHoveredCustomer}
                    options={filteredCustomers}
                    dropdownRef={customerRef}
                    onSelect={(option) => {
                      setForm({ ...form, customer: option });
                      setCustomerSearch(option);
                      setIsCustomerOpen(false);
                    }}
                  />
                </div>

                <div className="flex gap-5 mt-5">
                  <FloatingDropdown
                    label="Cash Account"
                    value={cashAccountSearch}
                    setValue={setCashAccountSearch}
                    isOpen={isCashAccountOpen}
                    setIsOpen={setIsCashAccountOpen}
                    hovered={hoveredCashAccount}
                    setHovered={setHoveredCashAccount}
                    options={filteredCashAccounts}
                    dropdownRef={cashAccountRef}
                    onSelect={(option) => {
                      setForm({ ...form, cashAccount: option });
                      setCashAccountSearch(option);
                      setIsCashAccountOpen(false);
                    }}
                  />

                  <FloatingDropdown
                    label="Purchase Return Account"
                    value={salesAccountSearch}
                    setValue={setSalesAccountSearch}
                    isOpen={isSalesAccountOpen}
                    setIsOpen={setIsSalesAccountOpen}
                    hovered={hoveredSalesAccount}
                    setHovered={setHoveredSalesAccount}
                    options={filteredSalesAccounts}
                    dropdownRef={salesAccountRef}
                    onSelect={(option) => {
                      setForm({ ...form, salesAccount: option });
                      setSalesAccountSearch(option);
                      setIsSalesAccountOpen(false);
                    }}
                  />

                  <FloatingInput
                    label="Bill No"
                    type="number"
                    value={form.billNo}
                    onChange={handleChange("billNo")}
                  />
                </div>
              </div>

              <div className="w-[284px] border border-gray-400 rounded-lg p-3.5 bg-white flex flex-col gap-3">
                <InfoRow label="Purchase Return Voucher No : " value={form.voucherNo} />
                <InfoRow label="Customer Cur. Balance : " value={form.customerBal} />
                <InfoRow label="Purchase Return A/c Cur. Balance : " value={form.salesBal} />
                <InfoRow label="GSTIN :" value={form.gstin} />
              </div>
            </div>

            <div className="flex items-end mt-6">
              <FloatingInput
                label="Remarks"
                value={form.remarks}
                onChange={handleChange("remarks")}
                width={975}
                multiline
              />
              <label className="ml-5 flex items-center text-base">
                <input
                  type="checkbox"
                  checked={form.includingTax}
                  onChange={handleChange("includingTax")}
                  className="accent-primary"
                />
                <span className="ml-2">Including Tax</span>
              </label>
            </div>

            <h3 className="section-title mt-8">Purchase Return List</h3>

            <div className="table-container">
              <table className="data-table">
                <thead className="table-header">
                  <tr>
                    {[
                      "S.No",
                      "Code",
                      "Product",
                      "Unit",
                      "Qty",
                      "Rate",
                      "Amount",
                      "Disc %",
                      "Disc Amount",
                      "Taxable Value",
                      "CGST %",
                      "CGST Amount",
                      "SGST %",
                      "SGST Amount",
                      "Total Amount",
                      "Action",
                    ].map((h) => (
                      <th key={h} className="table-th">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row, i) => {
                    const qty = Number(row.qty) || 0;
                    const rate = Number(row.rate) || 0;
                    const disc = Number(row.disc) || 0;

                    const amount = qty * rate;
                    const discAmount = (amount * disc) / 100;
                    const taxable = amount - discAmount;

                    const cgstPer = 9;
                    const sgstPer = 9;

                    const cgstAmt = (taxable * cgstPer) / 100;
                    const sgstAmt = (taxable * sgstPer) / 100;

                    const total = taxable + cgstAmt + sgstAmt;

                    return (
                      <tr key={i} className="table-row">
                        <td className="table-cell">{i + 1}</td>

                        <td className="table-cell">
                          <input
                            value={row.code}
                            onChange={(e) => updateRow(i, "code", e.target.value)}
                            className="w-full min-w-[100px] h-[27px] leading-[27px] border border-gray-400 rounded px-1.5 text-[13px] box-border"
                          />
                        </td>

                        <td className="table-cell">
                          <input
                            value={row.product}
                            onChange={(e) => updateRow(i, "product", e.target.value)}
                            className="w-full min-w-[180px] h-[27px] leading-[27px] border border-gray-400 rounded px-1.5 text-[13px] box-border"
                          />
                        </td>

                        <td className="table-cell">
                          <input
                            value={row.unit}
                            onChange={(e) => updateRow(i, "unit", e.target.value)}
                            className="w-full min-w-[100px] h-[27px] leading-[27px] border border-gray-400 rounded px-1.5 text-[13px] box-border"
                          />
                        </td>

                        <td className="table-cell">
                          <input
                            type="number"
                            value={row.qty}
                            onChange={(e) => updateRow(i, "qty", e.target.value)}
                            className="w-full min-w-[80px] h-[27px] leading-[27px] border border-gray-400 rounded px-1.5 text-[13px] box-border"
                          />
                        </td>

                        <td className="table-cell">
                          <input
                            type="number"
                            value={row.rate}
                            onChange={(e) => updateRow(i, "rate", e.target.value)}
                            className="w-full min-w-[100px] h-[27px] leading-[27px] border border-gray-400 rounded px-1.5 text-[13px] box-border"
                          />
                        </td>

                        <td className="table-cell min-w-[120px]">₹ {amount.toLocaleString()}</td>

                        <td className="table-cell">
                          <input
                            type="number"
                            value={row.disc}
                            onChange={(e) => updateRow(i, "disc", e.target.value)}
                            className="w-full min-w-[70px] h-[27px] leading-[27px] border border-gray-400 rounded px-1.5 text-[13px] box-border"
                          />
                        </td>

                        <td className="table-cell min-w-[120px]">₹ {discAmount.toLocaleString()}</td>
                        <td className="table-cell min-w-[120px]">₹ {taxable.toLocaleString()}</td>

                        <td className="table-cell min-w-[80px]">{cgstPer}%</td>
                        <td className="table-cell min-w-[120px]">₹ {cgstAmt.toLocaleString()}</td>

                        <td className="table-cell min-w-[80px]">{sgstPer}%</td>
                        <td className="table-cell min-w-[120px]">₹ {sgstAmt.toLocaleString()}</td>

                        <td className="table-cell font-semibold min-w-[130px]">
                          ₹ {total.toLocaleString()}
                        </td>

                        <td className="table-cell-center">
                          <div className="table-actions">
                            <ArrowUp
                              size={16}
                              className={`${i === 0 ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer text-black-600 hover:text-blue-800'}`}
                              onClick={() => {
                                if (i !== 0) {
                                  handleMoveUp(i);
                                }
                              }}
                              title={i === 0 ? 'Already at top' : 'Move up'}
                            />

                            <ArrowDown
                              size={16}
                              className={`${i === rows.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer text-black-600 hover:text-blue-800'}`}
                              onClick={() => {
                                if (i !== rows.length - 1) {
                                  handleMoveDown(i);
                                }
                              }}
                              title={i === rows.length - 1 ? 'Already at bottom' : 'Move down'}
                            />

                            <Plus
                              size={16}
                              className="add-primary"
                              onClick={() => addRowAbove(i)}
                            />

                            <Pencil
                              size={16}
                              className="cursor-pointer text-black"
                              onClick={() => setEditingRow(i)}
                            />

                            <Trash2
                              size={16}
                              className="cursor-pointer text-red-600"
                              onClick={() => {
                                const updated = rows.filter((_, index) => index !== i);
                                setRows(updated);
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              
            </div>
            <div className="flex justify-end">
                <button onClick={addRow} className="btn-search">
                  <Plus size={18} /> Row
                </button>
              </div>

            <div className="flex gap-6 mt-8 items-start">
              <div className="flex-1">
                <div className="grid grid-cols-3 gap-5">
                  <ChargeBox
                    label="Weighing And Loading"
                    value={charges.weighing}
                    onChange={(e) =>
                      setCharges({ ...charges, weighing: e.target.value })
                    }
                  />

                  <ChargeBox
                    label="Freight Charges"
                    value={charges.freight}
                    onChange={(e) =>
                      setCharges({ ...charges, freight: e.target.value })
                    }
                  />

                  <ChargeBox
                    label="Other Charges"
                    value={charges.other}
                    onChange={(e) =>
                      setCharges({ ...charges, other: e.target.value })
                    }
                  />

                  <ChargeBox
                    label="CGST 2.5%"
                    value={charges.cgst2_5}
                    onChange={(e) =>
                      setCharges({ ...charges, cgst2_5: e.target.value })
                    }
                  />

                  <ChargeBox
                    label="SGST 2.5%"
                    value={charges.sgst2_5}
                    onChange={(e) =>
                      setCharges({ ...charges, sgst2_5: e.target.value })
                    }
                  />

                  <ChargeBox
                    label="IGST 5%"
                    value={charges.igst5}
                    onChange={(e) =>
                      setCharges({ ...charges, igst5: e.target.value })
                    }
                  />

                  <ChargeBox
                    label="CGST 6%"
                    value={charges.cgst6}
                    onChange={(e) =>
                      setCharges({ ...charges, cgst6: e.target.value })
                    }
                  />

                  <ChargeBox
                    label="SGST 6%"
                    value={charges.sgst6}
                    onChange={(e) =>
                      setCharges({ ...charges, sgst6: e.target.value })
                    }
                  />

                  <ChargeBox
                    label="IGST 12%"
                    value={charges.igst12}
                    onChange={(e) =>
                      setCharges({ ...charges, igst12: e.target.value })
                    }
                  />

                  <ChargeBox
                    label="CGST 9%"
                    value={charges.cgst9}
                    onChange={(e) =>
                      setCharges({ ...charges, cgst9: e.target.value })
                    }
                  />

                  <ChargeBox
                    label="SGST 9%"
                    value={charges.sgst9}
                    onChange={(e) =>
                      setCharges({ ...charges, sgst9: e.target.value })
                    }
                  />

                  <ChargeBox
                    label="IGST 18%"
                    value={charges.igst18}
                    onChange={(e) =>
                      setCharges({ ...charges, igst18: e.target.value })
                    }
                  />

                  <ChargeBox
                    label="CGST 14%"
                    value={charges.cgst14}
                    onChange={(e) =>
                      setCharges({ ...charges, cgst14: e.target.value })
                    }
                  />

                  <ChargeBox
                    label="SGST 14%"
                    value={charges.sgst14}
                    onChange={(e) =>
                      setCharges({ ...charges, sgst14: e.target.value })
                    }
                  />

                  <ChargeBox
                    label="IGST 28%"
                    value={charges.igst28}
                    onChange={(e) =>
                      setCharges({ ...charges, igst28: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="w-[300px] border border-gray-400 rounded-lg p-4 bg-white flex flex-col gap-2.5 text-base">
                <TotalRow
                  label="Total Amount"
                  value={`₹ ${salesTotals.totalAmount.toLocaleString()}`}
                />

                <TotalRow
                  label="Total Discount"
                  value={`₹ ${salesTotals.totalDiscount.toLocaleString()}`}
                />

                <TotalRow
                  label="Taxable Value Total"
                  value={`₹ ${salesTotals.taxableValue.toLocaleString()}`}
                />

                <TotalRow
                  label="CGST Total"
                  value={`₹ ${salesTotals.cgstTotal.toLocaleString()}`}
                />

                <TotalRow
                  label="SGST Total"
                  value={`₹ ${salesTotals.sgstTotal.toLocaleString()}`}
                />

                <TotalRow
                  label="Other Charges Total"
                  value={`₹ ${chargesTotal.toLocaleString()}`}
                />

                <TotalRow
                  label="Net Amount"
                  value={`₹ ${netAmount.toLocaleString()}`}
                  bold
                />
              </div>
            </div>

            <div className="flex justify-end mt-7">
              <button className="btn-search">
                <span>✓</span>Submit
              </button>
            </div>
          

          <button onClick={() => navigate(-1)} className="btn-back">
            <span>←</span>
            <span>Back</span>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

const FloatingInput = ({
  label,
  value,
  onChange,
  width = 255,
  type = "date",
  multiline = false
}) => (
  <div className="filter-grid-red" style={{ width, boxSizing: "border-box" }}>
    <label className="filter-label text-sm mb-1.5">
      {label}
    </label>

    {multiline ? (
      <textarea
        value={value}
        onChange={onChange}
        rows={3}
        className="multiline-field pt-[22px] h-[60px] overflow-y-auto"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="filter-input pt-[22px] text-sm"
      />
    )}
  </div>
);

const FloatingDropdown = ({
  label,
  value,
  setValue,
  isOpen,
  setIsOpen,
  hovered,
  setHovered,
  options,
  dropdownRef,
  onSelect,
  width = 255,
}) => (
  <div ref={dropdownRef} className="filter-grid-red dropdown-wrapper" style={{ width, zIndex: isOpen ? 1001 : 1 }}>
    <label className="filter-label text-sm mb-1.5">
      {label}
    </label>
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Type or select..."
        className="dropdown-input filter-input cursor-text pr-[30px]"
      />
      <ChevronDown
        size={16}
        className="dropdown-icon"
      />
    </div>
    {isOpen && (
      <div className="dropdown-menu">
        {options.length > 0 ? (
          options.map((option, index) => (
            <div
              key={index}
              onClick={() => onSelect(option)}
              onMouseEnter={() => setHovered(option)}
              onMouseLeave={() => setHovered(null)}
              className={`dropdown-item-option ${hovered === option ? 'dropdown-item-hovered' : 'dropdown-item-default'}`}
            >
              {option}
            </div>
          ))
        ) : (
          <div className="dropdown-no-matches">
            No matches found
          </div>
        )}
      </div>
    )}
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex text-[13px]">
    <div className="w-[170px] text-gray-600">{label}</div>
    <div className="font-medium">{value}</div>
  </div>
);

const ChargeBox = ({ label, value, onChange }) => (
  <div className="filter-grid-red w-[255px]">
    <label className="filter-label text-sm mb-1.5">
      {label}
    </label>
    <input
      type="number"
      value={value}
      onChange={onChange}
      className="filter-input pt-[22px]"
    />
  </div>
);

const TotalRow = ({ label, value, bold }) => (
  <div className="flex justify-between">
    <div>{label}</div>
    <div className={bold ? 'font-semibold' : 'font-medium'}>{value}</div>
  </div>
);