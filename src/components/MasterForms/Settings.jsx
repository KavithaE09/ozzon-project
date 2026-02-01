import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();

  /* ===== BANK DETAILS ===== */
  const [bankDetails, setBankDetails] = useState([
    { label: 'BANK NAME', value: 'ICICI BANK' },
    { label: 'BRANCH', value: 'KURINJI NAGAR' },
    { label: 'A/C NO', value: '254005005364' },
    { label: 'IFSC', value: 'ICIC0002540' },
    { label: 'GSTIN No.', value: '33AFLPV1525R1ZT' },
    { label: 'PAN No.', value: 'AFLPV1525R' }
  ]);

  /* ===== PREFIX DETAILS ===== */
  const [financialYear, setFinancialYear] = useState('25-26');
  const [quotationPrefix, setQuotationPrefix] = useState('OQ');
  const [proformaPrefix, setProformaPrefix] = useState('Raneesh');
  const [invoicePrefix, setInvoicePrefix] = useState('Raneesh');

  const [container, setContainer] = useState('1');
  const [containerblock, setContainerblock] = useState('1');
  const [containerfabric, setContainerfabric] = useState('1');

  const terms = `1. This rate is valid for 2 weeks from the quotation date.
2. Delivery: Fabrication will take a minimum of 21 days to complete.
3. Payment Mode: 60% in advance & balance 40% on completion and before loading.
4. Transportation & Unloading: To be arranged by the customer at site.
5. Buy Back: Seller has a buy-back policy once the container is used.
6. Warranty: Six months from the date of delivery.
7. Transit Insurance: Transit insurance can be arranged on request and will be billed separately.`;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 mb-2.5 bg-[#f5e6e8] p-5 overflow-y-auto">
        <div className="bg-white rounded-lg p-[18px] mb-2.5">

          <h3 className="text-xl mb-3">Settings</h3>

          {/* ===== TOP SECTION ===== */}
          <div className="flex gap-5 mb-5">

            {/* ===== BANK DETAILS ===== */}
            <div className="flex-[1.4] border border-gray-200 text-base rounded-md p-3.5">
              <Label>Bank Details</Label>

              <div className="grid gap-1.5">
                {bankDetails.map((item, i) => (
                  <div key={i} className="flex items-center text-sm">
                    <span className="w-[120px] font-medium">{item.label}</span>
                    <span className="w-2.5">:</span>
                    <input
                      value={item.value}
                      onChange={(e) => {
                        const updated = [...bankDetails];
                        updated[i].value = e.target.value;
                        setBankDetails(updated);
                      }}
                      className="border-none outline-none text-sm w-full bg-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ===== RIGHT SIDE INPUTS ===== */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              <FloatingInput label="Financial Year" value={financialYear} setValue={setFinancialYear} />
              <FloatingInput label="Quotation Prefix" value={quotationPrefix} setValue={setQuotationPrefix} />
              <FloatingInput label="Proforma Invoice Prefix" value={proformaPrefix} setValue={setProformaPrefix} />
              <FloatingInput label="Invoice Prefix" value={invoicePrefix} setValue={setInvoicePrefix} />
            </div>
          </div>

          {/* ===== TERMS ===== */}
          <div className="border border-gray-200 text-base rounded-md p-3.5 mb-5">
            <Label>Terms And Conditions</Label>
            <div className="border border-gray-300 rounded-md p-3 text-sm whitespace-pre-line bg-gray-50">
              {terms}
            </div>
          </div>

          {/* ===== IMAGE UPLOAD + CONTAINER FIELDS ===== */}
          <div className="border border-gray-200 text-base rounded-md p-3.5">
            <Label>Logo Upload</Label>

            <div className="flex gap-6 mb-5">
              <UploadField label="Company Logo" />
              <UploadField label="Authorized Sign" />
            </div>

            {/* CONTAINER FIELDS */}
            <div className="grid grid-cols-3 gap-[70px]">
              <FloatingInput label="Container Hold Hours" value={container} setValue={setContainer} />
              <FloatingInput label="Container Block Days for Empty" value={containerblock} setValue={setContainerblock} />
              <FloatingInput label="Container Block Days for Fabric" value={containerfabric} setValue={setContainerfabric} />
            </div>
          </div>

          {/* ===== SAVE BUTTON ===== */}
          <div className="flex justify-end mt-5">
            <button className="bg-[#7f1d1d] text-white border-none py-2.5 px-8 rounded-md cursor-pointer hover:bg-[#991b1b] transition-colors">
              Save
            </button>
          </div>

        </div>

        {/* BACK BUTTON */}
        <button 
          onClick={() => navigate(-1)}
          className="btn-back"
        >
          <span>←</span>
          <span>Back</span>
        </button>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const FloatingInput = ({ label, value, setValue }) => (
  <div className="w-[255px] h-[59px] border border-gray-300 rounded-md p-2 px-2.5 flex flex-col justify-center">
    <span className="text-base font-bold text-gray-700 mb-1">
      {label}
    </span>
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
      className="border-none outline-none text-sm bg-transparent"
    />
  </div>
);

const Label = ({ children }) => (
  <div className="text-xs font-semibold mb-2">
    {children}
  </div>
);

const UploadField = ({ label }) => (
  <div className="flex-1">
    <Label>{label}</Label>
    <input 
      type="file" 
      className="w-full border border-gray-300 rounded-md p-2"
    />
  </div>
);