import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function CRUDSelect(props: any) {
  return (
    <FormControl className={"self-center"} sx={{width:300}} variant="outlined" color={`secondary`}>
      <InputLabel id="query-type-select">Query Type</InputLabel>
      <Select
        labelId="query-type-select"
        id="query-type"
        label="Query Type"
        onChange={props.onChange}
      >
        <MenuItem value={"Create"}>Create</MenuItem>
        <MenuItem value={"Read"}>Read</MenuItem>
        <MenuItem value={"Update"}>Update</MenuItem>
        <MenuItem value={"Delete"}>Delete</MenuItem>
      </Select>
    </FormControl>
  )
}