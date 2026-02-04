import MasterForm from './MasterForm';
import { getAllRecGives, createRecGive, updateRecGive, deleteRecGive } from '../../api/masterApi';

export default function RecGiveMaster() {
  return <MasterForm
    title="Rec Give"
    fetchAll={getAllRecGives}
    createItem={createRecGive}
    updateItem={updateRecGive}
    deleteItem={deleteRecGive}
    nameKey="RecGiveName"
    idKey="RecGiveId"
  />
}
