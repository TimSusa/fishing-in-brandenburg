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
import { lighten } from 'material-ui/styles/colorManipulator'

let EnhancedTableToolbar = (props) => {
  const { numSelected, selectedItems, classes, handleOpenGoogleClick, handleDeleteSelection } = props
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
                <Typography key={`${i}-selected`} color='inherit'>
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
            <Tooltip title='Auf Google Maps öffnen'>
              <IconButton
                aria-label='Open Route on Google Maps'
                onClick={handleOpenGoogleClick}>
                <DirectionsIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title='Auswahl verwerfen'>
              <IconButton
                aria-label='Delete'
                onClick={handleDeleteSelection}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        ) : null}
      </div>
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  selectedItems: PropTypes.array
}

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

export default EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar)
