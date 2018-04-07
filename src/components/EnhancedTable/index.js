import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
    TableBody,
    TableCell,
    TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';

import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'

class EnhancedTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            order: 'asc',
            orderBy: 'area',
            selected: [],
            data: []
        };
    }

    componentWillMount() {
        this.setState({
            data: this.props.data.map((item, index) => {
                return {
                    ...item,
                    index
                };
            })
        });
    }

    render() {
        const { classes, data } = this.props;
        const { order, orderBy, selected } = this.state;

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar 
                numSelected={selected.length} 
                selectedItems={this.getSelectedItems()} 
                handleOpenGoogleClick={this.handleOpenGoogleClick}
                handleDeleteSelection={this.handleDeleteSelection}
                />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {data.map((n, i) => {
                                const isSelected = this.isSelected(i);
                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => this.handleClick(event, i)}
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={`${i}`}
                                        selected={isSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isSelected} />
                                        </TableCell>
                                        <TableCell padding="none">{n.name}</TableCell>
                                        <TableCell numeric>{n.area}</TableCell>
                                        <TableCell>{n.community}</TableCell>
                                        <TableCell>
                                            <a target="_blank" href={`https://maps.google.com/?q=${n.coods}`}>
                                                show
                                            </a>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        );
    }

    handleDeleteSelection = () => {
        this.setState({selected: []})
    }

    handleOpenGoogleClick = (stuff) => {
        const coods = this.getSelectedItems()
        .map( (item) => {
                return item.coods
            } )
        .filter ((ob) => !!ob)
        window.location.href = `https://www.google.com/maps/dir/${coods.join('/')}`
    } 

    getSelectedItems = () => {
        const selectedItems = this.state.selected.map((item) => {
            return this.state.data[item];
        });
        return selectedItems;
    };

    handleRequestSort = (event, property) => {
        const orderBy = 'area';
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data = order === 'desc' ? this.props.data.sort((a, b) => a.area - b.area) : this.props.data.reverse();

        this.setState({ data, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.data.map((n) => n.index) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, index) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(index);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, index);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    isSelected = (index) => this.state.selected.indexOf(index) !== -1;
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired
};

const styles = (theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3
    },
    table: {
        minWidth: 800
    },
    tableWrapper: {
        overflowX: 'auto'
    }
});

export default withStyles(styles)(EnhancedTable);
