import * as React from 'react';
import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import AppLayout from "../components/containers/AppLayout";
import Head from "next/head";
import DeleteIcon from "@mui/icons-material/Delete"
import {
  DataGrid,
  GridActionsCellItem,
  GridCellEditStopReasons,
  GridRowModel,
  GridRowParams,
  GridToolbar
} from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import moment from "moment";
import {DATE_FORMAT} from "../src/config/app.constant";
import {deleteUserById, getListOfUser, updateUserById} from "../services/app/users.app";
import {UserDataModel} from "../src/models/UsersDTO";
import UserFormBuilderDialog from "../components/containers/users/UserFormBuilderDialog";
import {Avatar} from "@mui/material";
import RoleSelectionBox from "../components/containers/roles/RoleSelectionBox";
import {getListOfRole} from "../services/app/roles.app";

export default function UsersPage() {

  return (
    <React.Fragment>
      <Head>
        <title>Users Page</title>
        <meta name="description" content="Trang quản lý người dùng"/>
        <link rel="icon"
              href="https://www.creativefabrica.com/wp-content/uploads/2019/04/Chat-icon-by-ahlangraphic-39.jpg"/>
      </Head>
      <AppLayout>
        <Typography variant={"h2"}>Users Management</Typography>

        <Box sx={{pt: 2}}>
          <UsersDataGridTableContainer/>
        </Box>
      </AppLayout>
    </React.Fragment>
  );
}


const UsersDataGridTableContainer = () => {
  const [dataTable, setDataTable] = useState([])
  const [roleOpts, setRoleOpts] = useState([])

  const loadDataList = () => {
    getListOfUser().then(res => {
    //   console.table(res.data.data)
      setDataTable(res.data.data)
    })

    loadRoleOpts()
  }

  const loadRoleOpts = () => {
    getListOfRole().then(res => {
    //   console.table(res.data.data)
      setRoleOpts(res.data.data)
    })
  }

  const onDeleteUser = React.useCallback((record: any) => {
    deleteUserById(`${record?.id}`).then(res => {
      if (res.status !== 200) return;
      loadDataList()
    })
  }, [])

  const updateUserRole = (userData: any, roleUpdate: any) => {
    let payloadUpdate: UserDataModel = {
      id: userData.id,
      ...userData,
      role: roleUpdate
    }
    updateUserById(payloadUpdate).then(resp => {
      if(resp.status === 200) loadDataList();
    })
  }

  useEffect(() => {
    loadDataList()
  }, [])

  const columns = [
    {
      "field": "id",
      "hide": true
    },
    {
      "field": "uid",
      "hide": true
    },
    {
      "field": "displayName",
      "headerName": "User name",
      "sortable": true,
      "filterable": true,
      "disableExport": false,
      "width": 240,
      "editable": true
    },
    {
      "field": "photoURL",
      "headerName": "Avatar",
      "sortable": true,
      "filterable": true,
      "disableExport": false,
      "width": 80,
      "editable": true,
      "renderCell": (param: any) => {
        return (<Avatar src={param.value} />)
      }
    },
    {
      "field": "role",
      "headerName": "Role",
      "sortable": true,
      "filterable": true,
      "disableExport": false,
      "width": 380,
      "editable": false,
      "renderCell": (param: any) => {
        return <RoleSelectionBox role={param.value} user={param.row} roleOpts={roleOpts} onUpdate={updateUserRole} />
      }
    },
    {
      "field": "email",
      "headerName": "Email",
      "sortable": true,
      "filterable": true,
      "disableExport": false,
      "width": 320
    },
    {
      "field": "active",
      "headerName": "Active",
      "type": "boolean",
      "sortable": true,
      "filterable": true,
      "disableExport": false,
      "valueOptions": [true, false],
      "editable": true,
      "width": 80
    },
    {
      "field": "phoneNumber",
      "headerName": "Phone",
      "sortable": true,
      "filterable": true,
      "disableExport": false,
      "width": 100
    },
    {
      "field": "created_at",
      "headerName": "Created At",
      "width": 220,
      valueGetter: (record: any) => {
        return moment.unix(record?.value?._seconds).format(DATE_FORMAT.FULL);
      }
    },
    // refs: column definition: https://mui.com/x/react-data-grid/column-definition/#column-types
    {
      field: 'actions',
      "headerName": "Actions",
      type: 'actions',
      width: 200,
      getActions: (param: GridRowParams) => [
        //@ts-ignore
        <GridActionsCellItem key={"delete"} icon={<DeleteIcon/>} onClick={() => onDeleteUser(param)}
                             label="Delete"/>,
      ]
    }
  ]

  const onUpdateRow = React.useCallback(
    async (newRow: GridRowModel) => {
      let payloadUpdate: UserDataModel = {
        id: newRow.id,
        ...newRow
      }
      const res: any = await updateUserById(payloadUpdate);
      return res.status === 200 ? Promise.resolve(newRow) : Promise.reject(null)
    },
    []
  );

  const onUpdateRowError = React.useCallback((err: any) => console.log('log::err err', err), [])
  // editing docs:  https://mui.com/x/react-data-grid/editing/

  // example: https://mui.com/x/react-data-grid/editing/#AskConfirmationBeforeSave.tsx
  return (
    <Box sx={{width: '100%'}}>
      <UserFormBuilderDialog onRefresh={loadDataList}/>

      <Box sx={{pt: 2, height: "calc(100vh - 320px)"}}>
        <DataGrid
          initialState={{
            "columns": {
              "columnVisibilityModel": {
                "id": false,
                "uid": false,
              }
            }
          }}
          /*@ts-ignore*/
          columns={columns}
          rows={dataTable}
          components={{Toolbar: GridToolbar}}
          componentsProps={{
            toolbar: {
              //refs: https://mui.com/x/react-data-grid/filtering/#quick-filter
              showQuickFilter: true,
              quickFilterProps: {debounceMs: 500},
            }
          }}
          experimentalFeatures={{newEditingApi: true}}
          onCellEditStop={(param, event) => {
            if (param.reason === GridCellEditStopReasons.cellFocusOut) {
              event.defaultMuiPrevented = true;
            }
          }}
          getRowId={(row) => row?.id}
          processRowUpdate={onUpdateRow}
          onProcessRowUpdateError={onUpdateRowError}
        />
      </Box>
    </Box>
  );
}