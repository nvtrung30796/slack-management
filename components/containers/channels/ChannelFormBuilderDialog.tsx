import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import { createNewAChannel } from '../../../services/app/channels.app';
import { ChannelFormBuilderDialogPropType } from '../../../src/models/ChannelsDTO';

const channelSchema = yup.object({
    name: yup.string().required()
}).required()

export default function ChannelFormBuilderDialog(props: ChannelFormBuilderDialogPropType) {
    const [open, setOpen] = React.useState(false);
    
    const {handleSubmit, control, formState:{errors}} = useForm({
        resolver: yupResolver(channelSchema)
    })
    
    const onAddChannel = (data:any, e: any) => {
        e.preventDefault();
        if(data.name){
            createNewAChannel(data).then(resp => {
              if(resp.status !== 200) return alert("Create channel fail");
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
          <DialogTitle>Add channel </DialogTitle>
  
  
          <DialogContent>
          <form onSubmit={(e) => handleSubmit(onAddChannel)(e)}>
            <Controller
                name={"name"}
                control = {control}
                rules={{required:true}}
                render={({field}) => {
                    return (
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          error={Object.hasOwn(errors, "name")}
                          helperText={`${errors?.name?.message || ""}`}
                          label="Channel name"
                          type="text"
                          fullWidth
                          variant="standard"
                          {...field}
                        />
                      )
                }

            }
            
            
            
            />

            
            
  
          </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} >Cancel</Button>
            <Button onClick={handleSubmit(onAddChannel)}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }