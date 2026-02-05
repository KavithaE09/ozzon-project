import MasterForm from './singlefieldMasterForm';
import { getAllTempGroups, createTempGroup, updateTempGroup, deleteTempGroup } from '../../api/masterApi';

export default function TempGroupMaster() {
  return <MasterForm
    title="Temp Group"
    fetchAll={getAllTempGroups}
    createItem={createTempGroup}
    updateItem={updateTempGroup}
    deleteItem={deleteTempGroup}
    nameKey="TempGroupName"
    idKey="TempGroupId"
  />
}
