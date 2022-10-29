import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {createNewAUser} from "../../../services/app/users.app";
import { UserFormBuilderDialogPropType} from "../../../src/models/UsersDTO";

const userSchema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
}).required()

export default function UserFormBuilderDialog(props: UserFormBuilderDialogPropType) {
  const [open, setOpen] = React.useState(false);

  const {handleSubmit, control, formState: {errors}} = useForm({
    resolver: yupResolver(userSchema)
  })

  const onAddAction = (data: any, e: any) => {
    e.preventDefault()
    if(data.value){
      createNewAUser(data).then(resp => {
        if(resp.status !== 200) return alert("Create user fail");
        handleClose()
        props.onRefresh()
      })
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>


        <DialogContent>
          <form onSubmit={(e) => handleSubmit(onAddAction)(e)}>

            <Controller
              name={"name"}
              control={control}
              rules={{required: true}}
              render={({field}) => {
                return (
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    error={Object.hasOwn(errors, "name")}
                    helperText={`${errors?.name?.message || ""}`}
                    label="User name"
                    type="text"
                    fullWidth
                    variant="standard"
                    {...field}
                  />
                )
              }}
            />

            <Controller
              name={"description"}
              control={control}
              rules={{required: true}}
              render={({field}) => {
                return (
                  <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    error={Object.hasOwn(errors, "description")}
                    helperText={`${errors?.description?.message || ""}`}
                    label="User description"
                    type="text"
                    fullWidth
                    variant="standard"
                    {...field}
                  />
                )
              }}
            />

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onAddAction)}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}