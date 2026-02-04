import MasterForm from './MasterForm';
import { getAllLeadOwners, createLeadOwner, updateLeadOwner, deleteLeadOwner } from '../../api/masterApi';

export default function LeadOwnerMaster() {
  return <MasterForm
    title="Lead Owner"
    fetchAll={getAllLeadOwners}
    createItem={createLeadOwner}
    updateItem={updateLeadOwner}
    deleteItem={deleteLeadOwner}
    nameKey="LeadOwnerName"
    idKey="LeadOwnerId"
  />
}
