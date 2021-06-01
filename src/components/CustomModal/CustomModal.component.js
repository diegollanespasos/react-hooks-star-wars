import React from 'react';
import Modal from '@material-ui/core/Modal';
import { getModalStyle,useStyles } from './CustomModal.utils';

const CustomModal = ({ movie }) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const urlCharacters = movie.characters;

    const handleOpen = () => {
        setIsModalOpen(true);
    };
    
    const handleClose = () => {
        setIsModalOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Text in a modal</h2>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </div>
    );

    return (
        <div>
          <button type="button" onClick={handleOpen}>
            Open Modal
          </button>
          <Modal
            open={isModalOpen}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {
              <div style={modalStyle} className={classes.paper}>
                <h1>{movie.title}</h1>
                <h1>{movie.director}</h1>
                <h1>{movie.producer}</h1>
              </div>
            }
          </Modal>
        </div>
    );
}

export default CustomModal;