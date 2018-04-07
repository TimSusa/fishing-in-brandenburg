import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'
import DeleteIcon from 'material-ui-icons/Delete'
import DirectionsIcon from 'material-ui-icons/Directions'
import FilterListIcon from 'material-ui-icons/FilterList'
import { lighten } from 'material-ui/styles/colorManipulator'

const toolbarStyles = (theme) => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
		theme.palette.type === 'light'
		  ? {
		    color: theme.palette.secondary.main,
		    backgroundColor: lighten(theme.palette.secondary.light, 0.85)
		  }
		  : {
		    color: theme.palette.text.primary,
		    backgroundColor: theme.palette.secondary.dark
		  },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
})

let EnhancedTableToolbar = (props) => {
  const { numSelected, selectedItems, classes } = props
  console.log('toolbar', props)
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <div>
            <Typography color='inherit' variant='subheading'>
              {numSelected} Gewässer für Route ausgewählt:
            </Typography>
            {selectedItems.map((item, i) => {
              return (
                <Typography key={i} color='inherit'>
                  {item.name}
                </Typography>
              )
            })}
          </div>
        ) : (
          <Typography variant='title' />
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <div>
            <Tooltip title='Open Route on Google Maps'>
              <IconButton aria-label='Open Route on Google Maps'>
                <DirectionsIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title='Delete'>
              <IconButton aria-label='Delete'>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <Tooltip title='Filter list'>
            <IconButton aria-label='Filter list'>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  selectedItems: PropTypes.array
}

export default EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar)
