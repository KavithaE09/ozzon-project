import {Home,Building2,List,ClipboardList,ChevronRight,CheckCircle,BarChart3,ShoppingCart,BriefcaseBusiness} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Sidebar({ open, onNavigate }) {
   const isDark = document.documentElement.classList.contains("dark");
  const location = useLocation();
  const [active, setActive] = useState("Dashboard");
  const [leadOpen, setLeadOpen] = useState(false);
  const [formsOpen, setFormsOpen] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);
  const [accountsOpen, setAccountsOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [jobOpen, setJobOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);

  useEffect(() => {
  const path = location.pathname.toLowerCase();


    // Reset all
  setFormsOpen(false);
  setSalesOpen(false);
  setAccountsOpen(false);
  setPurchaseOpen(false);
  setInventoryOpen(false);
  setApprovalOpen(false);
  setJobOpen(false);

  //purchase routes
   if (path.includes("/containermaster")) {
      setActive("ContainerMaster");
      setAccountsOpen(false);
     setInventoryOpen(false);
     setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(false);
      setPurchaseOpen(true);
    } else if (path.includes("/purchasemaster")) {
      setActive("PurchaseMaster");
      setAccountsOpen(false);
     setInventoryOpen(false);
     setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(false);
      setPurchaseOpen(true);
    } else if (path.includes("/containerpurchase")) {
      setActive("ContainerPurchase");
      setAccountsOpen(false);
     setInventoryOpen(false);
     setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(false);
      setPurchaseOpen(true);
    } else if (path.includes("/containerstatus")) {
      setActive("ContainerStatus");
      setAccountsOpen(false);
     setInventoryOpen(false);
     setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(false);
      setPurchaseOpen(true);
    } 

    
      // inventory routes
    if (path.includes("/purchaseorder")) {
      setActive("PurchaseOrder");
      setInventoryOpen(true);
      setSalesOpen(false);
      setAccountsOpen(false);
      setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(false);
      setPurchaseOpen(false);
    }else if (path.includes("/purchasesearch")) {
      setActive("PurchaseSearch");
      setInventoryOpen(true);
      setSalesOpen(false);
      setAccountsOpen(false);
      setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(false);
      setPurchaseOpen(false);
    } else if (path.includes("/purchasereturn") && path.includes("search")) {
      setActive("PurchaseReturnSearch");
      setInventoryOpen(true);
      setSalesOpen(false);
      setAccountsOpen(false);
      setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(false);
      setPurchaseOpen(false);
    } else if (path.includes("/purchasereturn")) {
      setActive("PurchaseReturn");
      setInventoryOpen(true);
      setSalesOpen(false);
      setAccountsOpen(false);
      setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(false);
      setPurchaseOpen(false);
    } else if (path.includes("/purchase")) {
      setActive("Purchase");
      setInventoryOpen(true);
      setSalesOpen(false);
      setAccountsOpen(false);
      setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(false);
      setPurchaseOpen(false);
  } else if (path.includes("/stockissuereturn")) {
      setActive("StockIssueReturn");
      setInventoryOpen(true);
      setAccountsOpen(false);
      setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(false);
      setPurchaseOpen(false);
    } else if (path.includes("/stockissue")) {
      setActive("StockIssue");
      setInventoryOpen(true);
     setAccountsOpen(false);
      setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(false);
      setPurchaseOpen(false);
    }



    // Master Forms routes
    if (path.includes("/usermaster")) {
      setActive("UserMaster");
      setFormsOpen(true);
    } else if (path.includes("/userrolesettings")) {
      setActive("UserRoleSettings");
      setFormsOpen(true);
    } else if (path.includes("/departmentmaster")) { 
      setActive("DepartmentMaster");
      setFormsOpen(true); 
    } else if (path.includes("/templategroup")) {
      setActive("TemplateGroup");
      setFormsOpen(true);
    } else if (path.includes("/templatespecification")) {
      setActive("TemplateSpecification");
      setFormsOpen(true);
    } else if (path.includes("/materialgroup")) {
      setActive("MaterialGroup");
      setFormsOpen(true);
    } else if (path.includes("/materiallist")) {
      setActive("MaterialList");
      setFormsOpen(true);
    } else if (path.includes("/leadstatusmaster")) {
      setActive("LeadStatusMaster");
      setFormsOpen(true); 
    } else if (path.includes("/unitmaster")) {
      setActive("UnitMaster");
      setFormsOpen(true); 
    } else if (path.includes("/leadsourcemaster")) {
      setActive("LeadSourceMaster");
      setFormsOpen(true);
    } else if (path.includes("/templatesettings")) {
      setActive("TemplateSettings");
      setFormsOpen(true);
    } else if (path.includes("/rolemaster")) {
      setActive("RoleMaster");
      setFormsOpen(true);
    } else if (path.includes("/grade")) {
      setActive("Grade");
      setFormsOpen(true);
    } else if (path.includes("/groupunder")) {
      setActive("GroupUnder");
      setFormsOpen(true);
    } else if (path.includes("/group")) {
      setActive("Group");
      setFormsOpen(true);
    } else if (path.includes("/settings")) {
      setActive("Settings");
      setFormsOpen(true);
    } else if (path.includes("/sizetype")) {
      setActive("SizeType");
      setFormsOpen(true);
    } else if (path.includes("/supervisor")) {
      setActive("Supervisor");
      setFormsOpen(true);
    } else if (path.includes("/yard")) {
      setActive("Yard");
      setFormsOpen(true);
    } else if (path.includes("/leadowner")) {
      setActive("LeadOwner");
      setFormsOpen(true);
    } else if (path.includes("/receiver")) {
      setActive("Receiver");
      setFormsOpen(true);
    }  else if (path.includes("/ledgermastergroupform")) {
      setActive("LedgerMasterGroupForm");
      setAccountsOpen(true);
     setInventoryOpen(false);
     setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(false);
      setPurchaseOpen(false);
    }

    //sales routes
    else if (path.includes("/lead")) {
      setActive("Lead");
      setAccountsOpen(false);
     setInventoryOpen(false);
     setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(true);
      setPurchaseOpen(false);
    } 
    else if (path.includes("/FollowUp")) {
      setActive("FollowUp");
      setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(true);
      setPurchaseOpen(false);
      setApprovalOpen(false);
      setJobOpen(false);
    }
    else if (path.includes("/quotation")) {
      setActive("Quotation");
      setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(true);
      setPurchaseOpen(false);
      setApprovalOpen(false);
      setJobOpen(false);
    }
    else if (path.includes("/proformainvoice")) {
      setActive("ProformaInvoice");
      setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(true);
      setPurchaseOpen(false);
      setApprovalOpen(false);
      setJobOpen(false);
    }
   else if (path.includes("/containerstatusupdateform")) {
      setActive("ContainerStatusUpdateForm");
      setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(true);
      setPurchaseOpen(false);
      setApprovalOpen(false);
      setJobOpen(false);
    }

   
    // Account routes
    else if (path.includes("/advancereceipt")) {
      setActive("AdvanceReceipt");
      setAccountsOpen(true);
     setInventoryOpen(false);
     setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(false);
      setPurchaseOpen(false);
    }else if (path.includes("/accounts/ledgermasterform")) {
    setActive("LedgerMasterForm");
    setAccountsOpen(true);
    setFormsOpen(false);
    setInventoryOpen(false);
     setLeadOpen(false);
     setSalesOpen(false);
      setPurchaseOpen(false);
    }


    // inventory routes
    else if (path.includes("/purchaseorder")) {
      setActive("PurchaseOrder");
      setInventoryOpen(true);
       setSalesOpen(false);
         setAccountsOpen(false);
    }else if (path.includes("/purchasesearch")) {
      setActive("PurchaseSearch");
      setInventoryOpen(true);
       setSalesOpen(false);
         setAccountsOpen(false);
    } else if (path.includes("/purchasereturn") && path.includes("search")) {
      setActive("PurchaseReturnSearch");
      setInventoryOpen(true);
       setSalesOpen(false);
        setAccountsOpen(false);
    } else if (path.includes("/purchasereturn")) {
      setActive("PurchaseReturn");
      setInventoryOpen(true);
       setSalesOpen(false);
        setAccountsOpen(false);
    } else if (path.includes("/purchase")) {
      setActive("Purchase");
      setInventoryOpen(true);
       setSalesOpen(false);
        setAccountsOpen(false);
  } else if (path.includes("/stockissuereturn")) {
      setActive("StockIssueReturn");
      setInventoryOpen(true);
       setAccountsOpen(false);
    } else if (path.includes("/stockissue")) {
      setActive("StockIssue");
      setInventoryOpen(true);
     setAccountsOpen(false);
    }

    //production routes
    else if (path.includes("/assignjob")) {
      setActive("AssignJob");
      setJobOpen(true);
    } else if (path.includes("/assigntask")) {
      setActive("AssignTask");
      setJobOpen(true);
    } else if (path.includes("/taskcompletion")) {
      setActive("TaskCompletion");
      setJobOpen(true);
    } else if (path.includes("/joborderstatus")) {
      setActive("JobOrderStatus");
      setJobOpen(true);
    }

    // Approval routes
    else if (path.includes("/quotationapproval")) {
      setActive("QuotationApproval");
      setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(false);
      setPurchaseOpen(false);
      setApprovalOpen(true);
      setJobOpen(false);
    } else if (path.includes("/proformainvoiceapproval")) {
      setActive("ProformaInvoiceApproval");
      setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(false);
      setPurchaseOpen(false);
      setApprovalOpen(true);
      setJobOpen(false);
    } else if (path.includes("/containerholdrequestapproval")) {
      setActive("ContainerHoldRequestApprovalForm");
      setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(false);
      setPurchaseOpen(false);
      setApprovalOpen(true);
      setJobOpen(false);
    } else if (path.includes("/containerblockrequestapproval")) {
      setActive("ContainerBlockApproval");
      setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(false);
      setPurchaseOpen(false);
      setApprovalOpen(true);
      setJobOpen(false);
    } else if (path.includes("/joborderacceptance")) {
      setActive("JobOrderAcceptance");
      setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(false);
      setPurchaseOpen(false);
      setApprovalOpen(true);
      setJobOpen(false);
    }



    // Dashboard
    else if (path === "/layout" || path === "/layout/") {
      setActive("Dashboard");
      setLeadOpen(false);
      setFormsOpen(false);
      setSalesOpen(false);
      setPurchaseOpen(false);
      setApprovalOpen(false);
      setJobOpen(false);
       setInventoryOpen(false);
    }
  }, [location.pathname]);

  const handleClick = (itemName, navigateKey) => {
    setActive(itemName);
    onNavigate && onNavigate(navigateKey || itemName);
  };

  return (
   <aside
  className={`sidebar ${
    open ? "sidebar-open" : "sidebar-closed"
  }`}
>

      {open && (
        <div
          className="w-full h-full flex flex-col overflow-y-auto sidebar-scroll"
          style={{
            paddingTop: "16px",
            paddingBottom: "16px",
            paddingLeft: "20px",
            paddingRight: "12px",
            scrollbarWidth: "thin",
            scrollbarColor: "#FFFFFF40 transparent",
          }}
        >
          <style>{`
            .sidebar-scroll::-webkit-scrollbar {
              width: 6px;
            }
            .sidebar-scroll::-webkit-scrollbar-track {
              background: transparent;
            }
            .sidebar-scroll::-webkit-scrollbar-thumb {
              background: #FFFFFF40;
              border-radius: 3px;
            }
            .sidebar-scroll::-webkit-scrollbar-thumb:hover {
              background: #FFFFFF60;
            }
          `}</style>

          {/* DASHBOARD */}
          <MainButton
            label="Dashboard"
            icon={<Home size={22} />}
            active={active === "Dashboard"}
             isDark={isDark}
            onClick={() => {
              setActive("Dashboard");
              setLeadOpen(false);
              setFormsOpen(false);
              setSalesOpen(false);
              setPurchaseOpen(false);
              setApprovalOpen(false);
              setJobOpen(false);
               setAccountsOpen(false);
                setInventoryOpen(false);
              onNavigate && onNavigate("Dashboard");
            }}
          />

          {/* MASTER FORMS */}
          <MainButton
            label="Master Forms"
            icon={<List size={22} />}
            active={formsOpen}
            isDark={isDark}
            hasArrow
            arrowOpen={formsOpen}
            onClick={() => {
              setFormsOpen(!formsOpen);
              setLeadOpen(false);
              setSalesOpen(false);
              setPurchaseOpen(false);
              setApprovalOpen(false);
              setJobOpen(false);
              setAccountsOpen(false);
              setInventoryOpen(false);
            }}
          />
          {formsOpen && (
            <>
              <SubButton label="Role Master" active={active === "RoleMaster"}isDark={isDark} onClick={() => handleClick("RoleMaster")} />
              <SubButton label="User Role Settings" active={active === "UserRoleSettings"} isDark={isDark} onClick={() => handleClick("UserRoleSettings")} />
              <SubButton label="User Master" active={active === "UserMaster"} isDark={isDark} onClick={() => handleClick("UserMaster")} />
              <SubButton label="Department Master" active={active === "DepartmentMaster"} isDark={isDark} onClick={() => handleClick("DepartmentMaster")} /> 
              <SubButton label="LeadOwner" active={active === "LeadOwner"} isDark={isDark} onClick={() => handleClick("LeadOwner")} />
              <SubButton label="Lead Status Master" active={active === "LeadStatusMaster"}isDark={isDark} onClick={() => handleClick("LeadStatusMaster")} />
              <SubButton label="Lead Source Master" active={active === "LeadSourceMaster"} isDark={isDark} onClick={() => handleClick("LeadSourceMaster")} />
              <SubButton label="SizeType" active={active === "SizeType"}isDark={isDark} onClick={() => handleClick("SizeType")} />
              <SubButton label="Template Group" active={active === "TemplateGroup"}isDark={isDark} onClick={() => handleClick("TemplateGroup")} />
              <SubButton label="Template Specification" active={active === "TemplateSpecification"}isDark={isDark} onClick={() => handleClick("TemplateSpecification")} />
              <SubButton label="Template Settings" active={active === "TemplateSettings"}isDark={isDark} onClick={() => handleClick("TemplateSettings")} />
              <SubButton label="Material Group" active={active === "MaterialGroup"}isDark={isDark} onClick={() => handleClick("MaterialGroup")} />
              <SubButton label="Material List" active={active === "MaterialList"}isDark={isDark} onClick={() => handleClick("MaterialList")} />
             <SubButton label="Unit Master" active={active === "UnitMaster"}isDark={isDark} onClick={() => handleClick("UnitMaster")} />
              <SubButton label="AssignLabour" active={active === "AssignLabour"}isDark={isDark} onClick={() => handleClick("AssignLabour")} />
            <SubButton label="Supervisor" active={active === "Supervisor"}isDark={isDark} onClick={() => handleClick("Supervisor")} />
              <SubButton label="Receiver/Giver"  active={active === "Receiver"}isDark={isDark} onClick={() => handleClick("Receiver")} />
              <SubButton label="Yard" active={active === "Yard"}isDark={isDark} onClick={() => handleClick("Yard")} />
             <SubButton label="Grade" active={active === "Grade"}isDark={isDark} onClick={() => handleClick("Grade")} />
              <SubButton label="Settings" active={active === "Settings"}isDark={isDark} onClick={() => handleClick("Settings")} />
             {/*<SubButton label="Group" active={active === "Group"} onClick={() => handleClick("Group", "Group")} />
              <SubButton label="GroupUnder" active={active === "GroupUnder"} onClick={() => handleClick("GroupUnder", "GroupUnder")} />*/}
              </>
          )}

          {/* SALES */}
          <MainButton
            label="Sales"
            icon={<BarChart3 size={22} />}
            active={salesOpen}
            isDark={isDark}
            hasArrow
            arrowOpen={salesOpen}
            onClick={() => {
              setSalesOpen(!salesOpen);
              setLeadOpen(false);
              setFormsOpen(false);
              setPurchaseOpen(false);
              setApprovalOpen(false);
              setJobOpen(false);
              setAccountsOpen(false);
              setInventoryOpen(false);
            }}
          />
          {salesOpen && (
            <>
              <SubButton label="Lead" active={active === "Lead"}isDark={isDark} onClick={() => handleClick("Lead")} />
              <SubButton label="Follow Up" active={active === "FollowUp"} isDark={isDark} onClick={() => handleClick("FollowUp")} />
              <SubButton label="Quotation" active={active === "Quotation"}isDark={isDark} onClick={() => handleClick("Quotation", "QuotationSearch")} />
              <SubButton label="Proforma Invoice" active={active === "ProformaInvoice"} isDark={isDark} onClick={() => handleClick("ProformaInvoice", "ProformaInvoiceSearch")} />
              <SubButton label="Container Status Update " active={active === "ContainerStatusUpdateForm"} isDark={isDark} onClick={() => handleClick("ContainerStatusUpdateForm", "ContainerStatusUpdateForm")} />
            </>
          )}
          {/* Account */}
          <MainButton
            label="Accounts"
            icon={<ClipboardList size={22} />}
            active={accountsOpen}
            isDark={isDark}
            hasArrow
            arrowOpen={accountsOpen}
            onClick={() => {
              setAccountsOpen(!accountsOpen)
              setSalesOpen(false);
              setLeadOpen(false);
              setFormsOpen(false);
              setPurchaseOpen(false);
              setApprovalOpen(false);
              setJobOpen(false);
               setInventoryOpen(false);
              
            }}
          />
          {accountsOpen && (

            <>
              <SubButton label="Account Group Form" active={active === "LedgerMasterGroupForm"}isDark={isDark} onClick={() => handleClick("LedgerMasterGroupForm")} />
                <SubButton
  label="Ledger Master Form"
    active={active === "LedgerMasterForm"} isDark={isDark}
  onClick={() => handleClick("LedgerMasterForm", "LedgerMasterForm_Accounts")}
/>
 <SubButton label="Advance Receipt" active={active === "AdvanceReceipt"}isDark={isDark} onClick={() => handleClick("AdvanceReceipt")} />

            </>
          )}
          {/* PURCHASE */}
          <MainButton
            label="Purchase"
            icon={<ShoppingCart size={22} />}
            active={purchaseOpen}
            isDark={isDark}
            hasArrow
            arrowOpen={purchaseOpen}
            onClick={() => {
              setPurchaseOpen(!purchaseOpen);
              setLeadOpen(false);
              setFormsOpen(false);
              setSalesOpen(false);
              setApprovalOpen(false);
              setJobOpen(false);
              setAccountsOpen(false);
              setInventoryOpen(false);
            }}
          />
          {purchaseOpen && (
            <>
              <SubButton label="Container Master" active={active === "ContainerMaster"}isDark={isDark} onClick={() => handleClick("ContainerMaster")} />
               <SubButton label="Purchase Master" active={active === "PurchaseMaster"} isDark={isDark}onClick={() => handleClick("PurchaseMaster", "PurchaseMaster")} />
              <SubButton label="Container Purchase" active={active === "ContainerPurchase"}isDark={isDark} onClick={() => handleClick("ContainerPurchase", "ContainerPurchase")} />
            <SubButton label="Container Status" active={active === "ContainerStatus"}isDark={isDark} onClick={() => handleClick("ContainerStatus", "ContainerStatus")} />
            </>
          )}

           {/* Job */}
          <MainButton
            label="Production"
            icon={<BriefcaseBusiness size={22} />}
            active={jobOpen}
            isDark={isDark}
            hasArrow
            arrowOpen={jobOpen}
            onClick={() => {
              setJobOpen(!jobOpen);
              setLeadOpen(false);
              setFormsOpen(false);
              setSalesOpen(false);
              setPurchaseOpen(false);
              setApprovalOpen(false);
               setAccountsOpen(false);
                setInventoryOpen(false);
            }}
          />
          {jobOpen && (
            <>
              <SubButton label="Assign Job" active={active === "AssignJob"}isDark={isDark} onClick={() => handleClick("AssignJob", "AssignJob")} />
              <SubButton label="Assign Task" active={active === "AssignTask"}isDark={isDark} onClick={() => handleClick("AssignTask", "AssignTask")} />
              <SubButton label="Task Completion" active={active === "TaskCompletion"}isDark={isDark} onClick={() => handleClick("TaskCompletion", "TaskCompletion")} />
              <SubButton label="Job Order Status" active={active === "JobOrderStatus"}isDark={isDark} onClick={() => handleClick("JobOrderStatus", "JobOrderStatus")} />
            </>
          )}

          {/* Inventory */}
          <MainButton
            label="Inventory"
            icon={<Building2 size={22} />}
            active={inventoryOpen}
            isDark={isDark}
            hasArrow
            arrowOpen={inventoryOpen}
            onClick={() => {
              setInventoryOpen(!inventoryOpen);
              setFormsOpen(false);
              setSalesOpen(false);
              setPurchaseOpen(false);
              setApprovalOpen(false);
              setJobOpen(false);
              setAccountsOpen(false);
            }}
          />
          {inventoryOpen && (
            <>
              <SubButton label="Purchase Order " active={active === "PurchaseOrder"}isDark={isDark} onClick={() => handleClick("PurchaseOrder", "PurchaseOrder")} />
              <SubButton label="Goods Receipt Note" active={active === "GoodsReceiptNote"}isDark={isDark} onClick={() => handleClick("GoodsReceiptNote", "GoodsReceiptNote")} />
              <SubButton label="Purchase " active={active === "PurchaseSearch"}isDark={isDark} onClick={() => handleClick("PurchaseSearch", "PurchaseSearch")} />
              <SubButton label="Purchase Return " active={active === "PurchaseReturnSearch"}isDark={isDark} onClick={() => handleClick("PurchaseReturnSearch", "PurchaseReturnSearch")} />
              <SubButton label="Stock Issue" active={active === "StockIssue"}isDark={isDark} onClick={() => handleClick("StockIssue", "StockIssue")} />
              <SubButton label="Stock Issue Return" active={active === "StockIssueReturn"}isDark={isDark} onClick={() => handleClick("StockIssueReturn", "StockIssueReturn")} />
              <SubButton label="Sales" active={active === "SalesSearch"}isDark={isDark} onClick={() => handleClick("SalesSearch", "SalesSearch")} />
              <SubButton label="Sales Return" active={active === "SalesReturnSearch"}isDark={isDark} onClick={() => handleClick("SalesReturnSearch", "SalesReturnSearch")} />
            </>
          )}

         

          {/* APPROVAL */}
          <MainButton
            label="Approval"
            icon={<CheckCircle size={22} />}
            active={approvalOpen}
            isDark={isDark}
            hasArrow
            arrowOpen={approvalOpen}
            onClick={() => {
              setApprovalOpen(!approvalOpen);
              setLeadOpen(false);
              setFormsOpen(false);
              setSalesOpen(false);
              setPurchaseOpen(false);
              setJobOpen(false);
               setAccountsOpen(false);
               setInventoryOpen(false);
            }}
          />
          {approvalOpen && (
            <>
              <SubButton label="Quotation Approval" active={active === "QuotationApproval"}isDark={isDark} onClick={() => handleClick("QuotationApproval", "QuotationApproval")} />
              <SubButton label="Proforma Invoice Approval" active={active === "ProformaInvoiceApproval"}isDark={isDark} onClick={() => handleClick("ProformaInvoiceApproval", "ProformaInvoiceApproval")} />
              <SubButton label="Container Hold Request Approval" active={active === "ContainerHoldRequestApprovalForm"}isDark={isDark} onClick={() => handleClick("ContainerHoldRequestApprovalForm", "ContainerHoldRequestApprovalForm")} />
              <SubButton label="Container Block Request Approval" active={active === "ContainerBlockApproval"}isDark={isDark} onClick={() => handleClick("ContainerBlockRequestApprovalForm", "ContainerBlockRequestApprovalForm")} />
              <SubButton label="Job Order Acceptance" active={active === "JobOrderAcceptance"}isDark={isDark} onClick={() => handleClick("JobOrderAcceptance", "JobOrderAcceptance")} />
            </>
          )}

        </div>
      )}
    </aside>
  );
}

function MainButton({ label, icon, active, onClick, hasArrow, arrowOpen , isDark }) {
  const [hover, setHover] = useState(false);
  return (
    
    

<button
  onClick={onClick}
  onMouseEnter={() => setHover(true)}
  onMouseLeave={() => setHover(false)}
  style={{
    backgroundColor: isDark
      ? active
        ? "#29333E"  
        : hover
        ? "#262F38"     
        : "#212830"     
      : active
      ? "#FFFFFF"      
      : "#A63028",     

    color: isDark
      ? "#FFFFFF"
      : active
      ? "#A63028"
      : "#FFFFFF",

    width: "200px",
    height: "40px",
    border: "none",
    marginBottom: "8px",
    paddingLeft: "16px",
    paddingRight: "12px",
    flexShrink: 0,
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  }}
  className="flex items-center justify-between rounded-[12px] font-poppins font-semibold text-[14px]"
>
  <div className="flex items-center gap-[12px]">
    {icon}
    {label}
  </div>

  {hasArrow && (
    <ChevronRight
      size={18}
      style={{
        transition: "transform 0.2s ease",
        transform: arrowOpen ? "rotate(90deg)" : "rotate(0deg)",
      }}
    />
  )}
</button>

  );
}

function SubButton({ label, active, onClick, isDark }) {
  const [hover, setHover] = useState(false);

  const backgroundColor = isDark
    ? active
      ? "#29333E"      // dark selected
      : hover
      ? "#262F38"      // dark hover
      : "#212830"      // dark normal
    : active
    ? "#FFFFFF"        // light selected
    : "#A63028";       // light normal

  const textColor = isDark
    ? "#FFFFFF"
    : active
    ? "#A63028"
    : "#FFFFFF";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor,
        width: "200px",
        height: "40px",
        border: "none",
        color: textColor,
        marginBottom: "8px",
        paddingLeft: "16px",
        paddingRight: "12px",
        opacity: hover ? 0.95 : 1,
        flexShrink: 0,
        cursor: "pointer",
        transition: "background-color 0.2s ease",
      }}
      className="flex items-center rounded-[10px] font-poppins text-[13px]"
    >
      {label}
    </button>
  );
}
