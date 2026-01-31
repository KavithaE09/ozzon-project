import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Plus, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Purchase() {
  const navigate = useNavigate();
  const [editingRow, setEditingRow] = useState(null);
  const purchaseTypeDropdownRef = useRef(null);
  const supplierDropdownRef = useRef(null);
  const cashAccountDropdownRef = useRef(null);
  const purchaseAccountDropdownRef = useRef(null);

  const [form, setForm] = useState({
    purchaseDate: "24-01-2026",
    purchaseType: "",
    supplier: "",
    cashAccount: "",
    purchaseAccount: "",
    billNo: "88447755127436",
    remarks: "kavitha",
    includingTax: false,
    voucherNo: "1234",
    supplierBal: "₹ 1,00,000",
    purchaseBal: "₹ 1,00,000",
    gstin: "33ABCDE1234F2Z5",
  });

  const addRowAbove = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 0, { code: "", product: "", unit: "", qty: 0, rate: 0, disc: 0 });
    setRows(newRows);
  };

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
  const [purchaseTypeSearch, setPurchaseTypeSearch] = useState('');
  const [isPurchaseTypeOpen, setIsPurchaseTypeOpen] = useState(false);
  const [hoveredPurchaseType, setHoveredPurchaseType] = useState(null);

  const [supplierSearch, setSupplierSearch] = useState('');
  const [isSupplierOpen, setIsSupplierOpen] = useState(false);
  const [hoveredSupplier, setHoveredSupplier] = useState(null);

  const [cashAccountSearch, setCashAccountSearch] = useState('');
  const [isCashAccountOpen, setIsCashAccountOpen] = useState(false);
  const [hoveredCashAccount, setHoveredCashAccount] = useState(null);

  const [purchaseAccountSearch, setPurchaseAccountSearch] = useState('');
  const [isPurchaseAccountOpen, setIsPurchaseAccountOpen] = useState(false);
  const [hoveredPurchaseAccount, setHoveredPurchaseAccount] = useState(null);

  // Options
  const purchaseTypeOptions = ["Credit / Cash Purchase", "Credit", "Cash"];
  const supplierOptions = ["Safi & Co", "Global Traders", "Logic-Tech Solutions"];
  const cashAccountOptions = ["Cash", "Bank"];
  const purchaseAccountOptions = ["Material Purchase Account", "Equipment Purchase Account"];

  // Filtered options
  const filteredPurchaseTypes = purchaseTypeOptions.filter(opt =>
    opt.toLowerCase().includes(purchaseTypeSearch.toLowerCase())
  );
  const filteredSuppliers = supplierOptions.filter(opt =>
    opt.toLowerCase().includes(supplierSearch.toLowerCase())
  );
  const filteredCashAccounts = cashAccountOptions.filter(opt =>
    opt.toLowerCase().includes(cashAccountSearch.toLowerCase())
  );
  const filteredPurchaseAccounts = purchaseAccountOptions.filter(opt =>
    opt.toLowerCase().includes(purchaseAccountSearch.toLowerCase())
  );

  // Handlers
  const handlePurchaseTypeInput = (e) => {
    setPurchaseTypeSearch(e.target.value);
    setIsPurchaseTypeOpen(true);
  };

  const handlePurchaseTypeSelect = (option) => {
    setForm({ ...form, purchaseType: option });
    setPurchaseTypeSearch(option);
    setIsPurchaseTypeOpen(false);
  };

  const handleSupplierInput = (e) => {
    setSupplierSearch(e.target.value);
    setIsSupplierOpen(true);
  };

  const handleSupplierSelect = (option) => {
    setForm({ ...form, supplier: option });
    setSupplierSearch(option);
    setIsSupplierOpen(false);
  };

  const handleCashAccountInput = (e) => {
    setCashAccountSearch(e.target.value);
    setIsCashAccountOpen(true);
  };

  const handleCashAccountSelect = (option) => {
    setForm({ ...form, cashAccount: option });
    setCashAccountSearch(option);
    setIsCashAccountOpen(false);
  };

  const handlePurchaseAccountInput = (e) => {
    setPurchaseAccountSearch(e.target.value);
    setIsPurchaseAccountOpen(true);
  };

  const handlePurchaseAccountSelect = (option) => {
    setForm({ ...form, purchaseAccount: option });
    setPurchaseAccountSearch(option);
    setIsPurchaseAccountOpen(false);
  };

  const handleChange = (key) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (purchaseTypeDropdownRef.current && !purchaseTypeDropdownRef.current.contains(e.target)) {
        setIsPurchaseTypeOpen(false);
      }
      if (supplierDropdownRef.current && !supplierDropdownRef.current.contains(e.target)) {
        setIsSupplierOpen(false);
      }
      if (cashAccountDropdownRef.current && !cashAccountDropdownRef.current.contains(e.target)) {
        setIsCashAccountOpen(false);
      }
      if (purchaseAccountDropdownRef.current && !purchaseAccountDropdownRef.current.contains(e.target)) {
        setIsPurchaseAccountOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const purchaseTotals = rows.reduce(
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
    purchaseTotals.taxableValue +
    purchaseTotals.cgstTotal +
    purchaseTotals.sgstTotal +
    chargesTotal;

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="main-section">
          <div className="content-card">
            <h2 className="page-title">Purchase</h2>

            <div className="flex gap-5 mt-6">
              <div className="flex-1">
                <div className="flex gap-5">
                  <FloatingInput
                    label="Purchase Date"
                    type="date"
                    value={form.purchaseDate}
                    onChange={handleChange("purchaseDate")}
                  />

                  {/* Purchase Type Dropdown */}
                  <div ref={purchaseTypeDropdownRef} className="filter-grid-red dropdown-wrapper w-[255px]" style={{ zIndex: isPurchaseTypeOpen ? 1001 : 1 }}>
                    <label className="filter-label text-sm mb-1.5">Purchase Type</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={purchaseTypeSearch}
                        onChange={handlePurchaseTypeInput}
                        onFocus={() => setIsPurchaseTypeOpen(true)}
                        placeholder="Type or select..."
                        className="dropdown-input filter-input cursor-text pr-[30px]"
                      />
                      <ChevronDown size={16} className="dropdown-icon" />
                    </div>
                    {isPurchaseTypeOpen && (
                      <div className="dropdown-menu">
                        {filteredPurchaseTypes.length > 0 ? (
                          filteredPurchaseTypes.map((option, index) => (
                            <div
                              key={index}
                              onClick={() => handlePurchaseTypeSelect(option)}
                              onMouseEnter={() => setHoveredPurchaseType(option)}
                              onMouseLeave={() => setHoveredPurchaseType(null)}
                              className={`dropdown-item-option ${
                                hoveredPurchaseType === option 
                                  ? 'dropdown-item-hovered' 
                                  : form.purchaseType === option 
                                    ? 'dropdown-item-selected' 
                                    : 'dropdown-item-default'
                              }`}
                            >
                              {option}
                            </div>
                          ))
                        ) : (
                          <div className="dropdown-no-matches">No matches found</div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Supplier Dropdown */}
                  <div ref={supplierDropdownRef} className="filter-grid-red dropdown-wrapper w-[255px]" style={{ zIndex: isSupplierOpen ? 1001 : 1 }}>
                    <label className="filter-label text-sm mb-1.5">Supplier</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={supplierSearch}
                        onChange={handleSupplierInput}
                        onFocus={() => setIsSupplierOpen(true)}
                        placeholder="Type or select..."
                        className="dropdown-input filter-input cursor-text pr-[30px]"
                      />
                      <ChevronDown size={20} className="dropdown-icon" />
                    </div>
                    {isSupplierOpen && (
                      <div className="dropdown-menu">
                        {filteredSuppliers.length > 0 ? (
                          filteredSuppliers.map((option, index) => (
                            <div
                              key={index}
                              onClick={() => handleSupplierSelect(option)}
                              onMouseEnter={() => setHoveredSupplier(option)}
                              onMouseLeave={() => setHoveredSupplier(null)}
                              className={`dropdown-item-option ${
                                hoveredSupplier === option 
                                  ? 'dropdown-item-hovered' 
                                  : form.supplier === option 
                                    ? 'dropdown-item-selected' 
                                    : 'dropdown-item-default'
                              }`}
                            >
                              {option}
                            </div>
                          ))
                        ) : (
                          <div className="dropdown-no-matches">No matches found</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-5 mt-5">
                  {/* Cash Account Dropdown */}
                  <div ref={cashAccountDropdownRef} className="filter-grid-red dropdown-wrapper w-[255px]" style={{ zIndex: isCashAccountOpen ? 1001 : 1 }}>
                    <label className="filter-label text-sm mb-1.5">Cash Account</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cashAccountSearch}
                        onChange={handleCashAccountInput}
                        onFocus={() => setIsCashAccountOpen(true)}
                        placeholder="Type or select..."
                        className="dropdown-input filter-input cursor-text pr-[30px]"
                      />
                      <ChevronDown size={16} className="dropdown-icon" />
                    </div>
                    {isCashAccountOpen && (
                      <div className="dropdown-menu">
                        {filteredCashAccounts.length > 0 ? (
                          filteredCashAccounts.map((option, index) => (
                            <div
                              key={index}
                              onClick={() => handleCashAccountSelect(option)}
                              onMouseEnter={() => setHoveredCashAccount(option)}
                              onMouseLeave={() => setHoveredCashAccount(null)}
                              className={`dropdown-item-option ${
                                hoveredCashAccount === option 
                                  ? 'dropdown-item-hovered' 
                                  : form.cashAccount === option 
                                    ? 'dropdown-item-selected' 
                                    : 'dropdown-item-default'
                              }`}
                            >
                              {option}
                            </div>
                          ))
                        ) : (
                          <div className="dropdown-no-matches">No matches found</div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Purchase Account Dropdown */}
                  <div ref={purchaseAccountDropdownRef} className="filter-grid-red dropdown-wrapper w-[255px]" style={{ zIndex: isPurchaseAccountOpen ? 1001 : 1 }}>
                    <label className="filter-label text-sm mb-1.5">Purchase Account</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={purchaseAccountSearch}
                        onChange={handlePurchaseAccountInput}
                        onFocus={() => setIsPurchaseAccountOpen(true)}
                        placeholder="Type or select..."
                        className="dropdown-input filter-input cursor-text pr-[30px]"
                      />
                      <ChevronDown size={16} className="dropdown-icon" />
                    </div>
                    {isPurchaseAccountOpen && (
                      <div className="dropdown-menu">
                        {filteredPurchaseAccounts.length > 0 ? (
                          filteredPurchaseAccounts.map((option, index) => (
                            <div
                              key={index}
                              onClick={() => handlePurchaseAccountSelect(option)}
                              onMouseEnter={() => setHoveredPurchaseAccount(option)}
                              onMouseLeave={() => setHoveredPurchaseAccount(null)}
                              className={`dropdown-item-option ${
                                hoveredPurchaseAccount === option 
                                  ? 'dropdown-item-hovered' 
                                  : form.purchaseAccount === option 
                                    ? 'dropdown-item-selected' 
                                    : 'dropdown-item-default'
                              }`}
                            >
                              {option}
                            </div>
                          ))
                        ) : (
                          <div className="dropdown-no-matches">No matches found</div>
                        )}
                      </div>
                    )}
                  </div>

                  <FloatingInput
                    label="Bill No"
                    value={form.billNo}
                    onChange={handleChange("billNo")}
                  />
                </div>
              </div>

              <div className="w-[284px] border border-gray-400 rounded-lg p-3.5 bg-white flex flex-col gap-3">
                <InfoRow label="Purchase Voucher No" value={form.voucherNo} />
                <InfoRow label="Supplier Cur. Balance" value={form.supplierBal} />
                <InfoRow label="Purchase A/c Cur. Balance" value={form.purchaseBal} />
                <InfoRow label="GSTIN" value={form.gstin} />
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

            <h3 className="section-title mt-8">Purchase List</h3>

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
                      "Actions",
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
                            className="w-full h-[27px] leading-[27px] border border-gray-400 rounded px-1.5 text-[13px] box-border"
                          />
                        </td>
                        <td className="table-cell">
                          <input
                            value={row.product}
                            onChange={(e) => updateRow(i, "product", e.target.value)}
                            className="w-full h-[27px] leading-[27px] border border-gray-400 rounded px-1.5 text-[13px] box-border"
                          />
                        </td>
                        <td className="table-cell">
                          <input
                            value={row.unit}
                            onChange={(e) => updateRow(i, "unit", e.target.value)}
                            className="w-full h-[27px] leading-[27px] border border-gray-400 rounded px-1.5 text-[13px] box-border"
                          />
                        </td>
                        <td className="table-cell">
                          <input
                            type="number"
                            value={row.qty}
                            onChange={(e) => updateRow(i, "qty", e.target.value)}
                            className="w-full h-[27px] leading-[27px] border border-gray-400 rounded px-1.5 text-[13px] box-border"
                          />
                        </td>
                        <td className="table-cell">
                          <input
                            type="number"
                            value={row.rate}
                            onChange={(e) => updateRow(i, "rate", e.target.value)}
                            className="w-full h-[27px] leading-[27px] border border-gray-400 rounded px-1.5 text-[13px] box-border"
                          />
                        </td>
                        <td className="table-cell">₹ {amount.toLocaleString()}</td>
                        <td className="table-cell">
                          <input
                            type="number"
                            value={row.disc}
                            onChange={(e) => updateRow(i, "disc", e.target.value)}
                            className="w-full h-[27px] leading-[27px] border border-gray-400 rounded px-1.5 text-[13px] box-border"
                          />
                        </td>
                        <td className="table-cell">₹ {discAmount.toLocaleString()}</td>
                        <td className="table-cell">₹ {taxable.toLocaleString()}</td>
                        <td className="table-cell">{cgstPer}%</td>
                        <td className="table-cell">₹ {cgstAmt.toLocaleString()}</td>
                        <td className="table-cell">{sgstPer}%</td>
                        <td className="table-cell">₹ {sgstAmt.toLocaleString()}</td>
                        <td className="table-cell font-semibold">
                          ₹ {total.toLocaleString()}
                        </td>
                        <td className="table-cell-center">
                          <div className="table-actions">
                            <Plus
                              size={16}
                              className="cursor-pointer text-black"
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
                  value={`₹ ${purchaseTotals.totalAmount.toLocaleString()}`}
                />

                <TotalRow
                  label="Total Discount"
                  value={`₹ ${purchaseTotals.totalDiscount.toLocaleString()}`}
                />

                <TotalRow
                  label="Taxable Value Total"
                  value={`₹ ${purchaseTotals.taxableValue.toLocaleString()}`}
                />

                <TotalRow
                  label="CGST Total"
                  value={`₹ ${purchaseTotals.cgstTotal.toLocaleString()}`}
                />

                <TotalRow
                  label="SGST Total"
                  value={`₹ ${purchaseTotals.sgstTotal.toLocaleString()}`}
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
        type="text"
        value={value}
        onChange={onChange}
        className="filter-input pt-[22px] text-sm"
      />
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