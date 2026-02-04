import MasterForm from './singlefieldMasterForm';
import { getAllLabours, createLabour, updateLabour, deleteLabour } from '../../api/masterApi';

export default function LabourMaster() {
  return <MasterForm
    title="Labour"
    fetchAll={getAllLabours}
    createItem={createLabour}
    updateItem={updateLabour}
    deleteItem={deleteLabour}
    nameKey="LabourName"
    idKey="LabourId"
  />
}
