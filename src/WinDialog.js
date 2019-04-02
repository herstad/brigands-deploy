import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import BrigandContext from "./BrigandContext";

class WinDialog extends Component {

  render() {
    return (
      <div>
        <BrigandContext.Consumer>
          {({winner, restart}) => {
            return (
              <Dialog
                open={!!winner}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle
                  id="alert-dialog-title">{`The winner is ${winner}!`}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Play another round?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={restart} color="primary" autoFocus>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>)
          }}
        </BrigandContext.Consumer>
      </div>
    );
  }
}

export default WinDialog;