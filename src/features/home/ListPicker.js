import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { LANGUAGE } from 'app/utils/constants.js';
import makeStyles from '@material-ui/core/styles/makeStyles.js';
import { Typography } from '@material-ui/core';
import ToolTip from "../shared/buttons/ToolTip";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    title: {
        marginRight: theme.spacing(4)
    },
    required: {
        color: 'red',
        marginLeft: theme.spacing(1),
    },
    root: {
        width: 320,
        height: 230,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 4,
        overflow: 'auto',
        borderColor: props => props.error
            ? theme.palette.danger.main
            : theme.palette.grey.light,
    }
}));

const {
    titles,
    roles,
    hints
} = LANGUAGE.home.newUserButton;

const ListPicker = React.memo(function ListPicker({ items, chosenItems, onSelect, required, error }) {
    const classes = useStyles({ error });

    return (
        <Box className={ classes.container }>
            <Typography className={ classes.title } variant="subtitle1">
                { titles.rolePicker }
                { required && <span className={ classes.required }>*</span> }
            </Typography>
            <List className={ classes.root } dense component="div" role="list">
                { items.map((item) =>
                    <ListItem key={ item } role="listitem" button onClick={ onSelect(item) }>
                        <ListItemIcon>
                            <Checkbox
                                checked={ chosenItems?.indexOf(item) !== -1 }
                                tabIndex={ -1 }
                                disableRipple
                                color="primary"
                            />
                        </ListItemIcon>
                        <ListItemText primary={ roles[item] }/>
                        <ListItemIcon>
                            <ToolTip hint={hints[item]} />
                        </ListItemIcon>
                    </ListItem>
                ) }
            </List>
        </Box>
    );
});

ListPicker.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    chosenItems: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelect: PropTypes.func.isRequired,
    required: PropTypes.bool,
    error: PropTypes.bool
};

export default ListPicker;