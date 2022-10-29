import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

type RoleSelectionBoxPropType = {
  roleOpts: any[];
  onUpdate: (user: any, role: any) => void;
  user: any;
  role: any;
}

const RoleSelectionBox = (props: RoleSelectionBoxPropType) => {
  const {roleOpts, onUpdate, user, role} = props;
  const [roleActive, setRoleActive] = useState<string>("");

  useEffect(() => {
    if(role?.id) setRoleActive(role.id)
  }, [role])

  const handleChange = (event: SelectChangeEvent) => {
    setRoleActive(event.target.value as string);
    onUpdate(user, {
      ...roleOpts.find(x => x.id === event.target.value)
    })
  };

  return (
    <Box sx={{minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="role-select">Role</InputLabel>
        <Select
          labelId="role-select"
          id="role-select-box"
          value={roleActive}
          defaultValue={roleActive}
          label="Role"
          onChange={handleChange}
        >
          {roleOpts.map(roleItem => {
            return (
              <MenuItem key={roleItem.id} value={roleItem.id}>{roleItem.name} - {roleItem?.description}</MenuItem>
            )
          })}

        </Select>
      </FormControl>
    </Box>
  );
};
export default RoleSelectionBox;