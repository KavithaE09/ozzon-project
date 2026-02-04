import MasterForm from './MasterForm';
import { getAllMaterialGroups, createMaterialGroup, updateMaterialGroup, deleteMaterialGroup } from '../../api/masterApi';

export default function MaterialGroupMaster() {
  return <MasterForm
    title="Material Group"
    fetchAll={getAllMaterialGroups}
    createItem={createMaterialGroup}
    updateItem={updateMaterialGroup}
    deleteItem={deleteMaterialGroup}
    nameKey="MaterialGroup"
    idKey="MaterialGroupMId"
  />
}
