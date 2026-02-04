import MasterForm from './singlefieldMasterForm';
import { getAllSizeTypes, createSizeType, updateSizeType, deleteSizeType } from '../../api/masterApi';

export default function SizeTypeMaster() {
  return <MasterForm
    title="Size Type"
    fetchAll={getAllSizeTypes}
    createItem={createSizeType}
    updateItem={updateSizeType}
    deleteItem={deleteSizeType}
    nameKey="SizeType"
    idKey="SizeTypeId"
  />
}
