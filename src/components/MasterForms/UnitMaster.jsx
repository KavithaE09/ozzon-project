import MasterForm from './singlefieldMasterForm';
import { getAllUnits, createUnit, updateUnit, deleteUnit } from '../../api/masterApi';

export default function UnitMaster() {
  return <MasterForm
    title="Unit"
    fetchAll={getAllUnits}
    createItem={createUnit}
    updateItem={updateUnit}
    deleteItem={deleteUnit}
    nameKey="Unit"
    idKey="UnitId"
  />
}
