import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-hidden">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex h-[calc(100vh-85px)]">
        {/* SIDEBAR */}
        <Sidebar
          open={sidebarOpen}
          onNavigate={(page) => {
            if (page === "Dashboard") navigate("/layout");
            if (page === "Lead") navigate("/layout/lead");
            if (page === "QuotationSearch") navigate("/layout/quotation");
            if (page === "ProformaInvoiceSearch") navigate("/layout/proformainvoice");
            if (page === "ContainerPurchase") navigate("/layout/containerpurchase");
            if (page === "ContainerStatusUpdateForm") navigate("/layout/containerstatusupdateform");
            if (page === "UserRoleSettings") navigate("/layout/usermaster");
            if (page === "ContainerMaster") navigate("/layout/containermaster");
            if (page === "DepartmentMaster") navigate("/layout/departmentmaster");
            if (page === "UserRoleSettings") navigate("/layout/userrolesettingsmaster");
            if (page === "ContainerMaster") navigate("/layout/containermaster");
            if (page === "TemplateGroup") navigate("/layout/templategroup");
        
            if (page === "LedgerMasterGroupForm" ) navigate ("/layout/ledgermastergroupform");
            if (page === "MaterialGroup") navigate("/layout/materialgroup");
            if (page === "MaterialList") navigate("/layout/materiallist");
            if (page === "TemplateSpecification") navigate("/layout/templatespecification");
            if (page === "LeadSourceMaster") navigate("/layout/leadsourcemaster");
            if (page === "LeadStatusMaster") navigate("/layout/leadstatusmaster");
            if (page === "Sales") navigate("/layout/sales");
            if (page === "SalesSearch") navigate("/layout/salessearch");
            if (page === "SalesReturn") navigate("/layout/salesreturn");
            if (page === "SalesReturnSearch") navigate("/layout/salesreturnsearch");
            if (page === "Purchase") navigate("/layout/purchase");
            if (page === "PurchaseSearch") navigate("/layout/purchasesearch");
            if (page === "StockIssue") navigate("/layout/stockissue");
            if (page === "StockIssueReturn") navigate("/layout/stockissuereturn");
            if (page === "PurchaseReturn") navigate("/layout/purchasereturn");
            if (page === "PurchaseReturnSearch") navigate("/layout/purchasereturnsearch");
            if (page === "TemplateSettings") navigate("/layout/templatesettings");
            if (page === "RoleMaster") navigate("/layout/rolemaster");
            if (page === "UserMaster") navigate("/layout/usermaster");
            if (page === "QuotationApproval") navigate("/layout/quotationapproval");
            if (page === "ProformaInvoiceApproval") navigate("/layout/proformainvoiceapproval");
            if (page === "ContainerHoldRequestApprovalForm") navigate("/layout/containerholdrequestapproval");
            if (page === "ContainerBlockRequestApprovalForm") navigate("/layout/containerblockrequestapproval");
            if (page === "UnitMaster") navigate("/layout/unitmaster");
            if (page === "SalesType") navigate("/layout/salestype");
            if (page === "CashAccount") navigate("/layout/CashAccount");
            if (page === "ContainerStatus") navigate("/layout/containerstatus");
           if (page === "LedgerMasterForm_Master")
  navigate("/layout/master/ledgermasterform");

if (page === "LedgerMasterForm_Accounts")
  navigate("/layout/accounts/ledgermasterform");

           
            if (page === "Giver") navigate("/layout/giver");
            if (page === "Grade") navigate("/layout/grade");
            if (page === "Group") navigate("/layout/group");
            if (page === "GroupUnder") navigate("/layout/groupunder");
            if (page === "Settings") navigate("/layout/settings");
            if (page === "SizeType") navigate("/layout/sizetype");
            if (page === "Supervisor") navigate("/layout/supervisor");
            if (page === "Supplier") navigate("/layout/supplier");
            if (page === "Settings") navigate("/layout/settings");
            if (page === "Yard") navigate("/layout/yard");
            if (page === "Product") navigate("/layout/product");
            if (page === "PurchaseAccount") navigate("/layout/purchaseaccount");
            if (page === "PurchaseReturnAccount") navigate("/layout/purchasereturnaccount");
            if (page === "PurchaseType") navigate("/layout/purchasetype");
            if (page === "PurchaseReturnType") navigate("/layout/purchasereturntype");
            if (page === "SalesType") navigate("/layout/salestype");
            if (page === "SalesReturnType") navigate("/layout/salesreturntype");
            if (page === "SalesAccount") navigate("/layout/salesaccount");
            if (page === "SalesReturnAccount") navigate("/layout/salesreturnaccount");
            if (page === "SalesPerson") navigate ("/layout/salesperson");
            if (page === "LeadOwner") navigate ("/layout/leadowner");
            if (page === "Receiver") navigate ("/layout/receiver");
            if (page === "LedgerMasterGroupForm") navigate ("/layout/ledgermastergroupform");
            if (page === "AssignJob") navigate ("/layout/assignjob");
            if (page === "AssignTask") navigate ("/layout/assigntask");
            if (page === "JobOrderStatus") navigate ("/layout/joborderstatus");
            if (page === "TaskCompletion") navigate ("/layout/taskcompletion");
            if (page === "JobOrderAcceptance") navigate ("/layout/joborderacceptance");
            if (page === "AssignLabour") navigate ("/layout/assignlabour");
            if (page === "AdvanceReceipt") navigate ("/layout/advancereceipt");
           if (page === "FollowUp") navigate ("/layout/FollowUp");
            if(page === "PurchaseOrder") navigate("/layout/purchaseorder");
            if(page === "GoodsReceiptNote") navigate("/layout/goodsreceiptnote");
            if(page === "PurchaseMaster") navigate("/layout/purchasemaster")
          }}
        />

        {/* MAIN CONTENT */}
         <main 
        
          style={{
            marginLeft: sidebarOpen ? '240px' : '0',
            width: sidebarOpen ? 'calc(100% - 240px)' : '100%',
          }}
        >
          <div >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
