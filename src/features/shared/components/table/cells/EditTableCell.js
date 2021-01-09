import { TableCell as MuiTableCell, withStyles } from '@material-ui/core';

const EditTableCell = withStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        '&:last-child': {
            paddingRight: theme.spacing(1)
        },
        '&:first-child': {
            paddingLeft: theme.spacing(1)
        }
    }
}))(MuiTableCell);

export default EditTableCell;