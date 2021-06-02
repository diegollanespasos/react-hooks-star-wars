import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { getModalStyle, useStyles } from './CustomModal.utils';
import axios from 'axios';

const CustomModal = ({ movie }) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if(isFetching){     
        getCharactersOfMovie();
      }    
    },[isFetching]);

    const getCharactersOfMovie = async () => {
      const arrEndpoints = movie.characters;
      const arrPromises = arrEndpoints.map(url => axios.get(url));
      const response = await Promise.all(arrPromises);
      const characters = response.map(obj => obj.data);
      setCharacters(characters);
      setIsLoading(false);
    }

    const handleOpen = async () => {
        setIsModalOpen(true);
        setIsFetching(true);
    };
    
    const handleClose = () => {
        setIsModalOpen(false);
    };

    const CharactersList = ({ characters, numberCharacters }) => {
      const arr = characters.slice(0, numberCharacters);

      return(
        <div>
          <h3>Main Characters:</h3>
          {
          arr.map(character => <h4 key={`${character.name}${movie.id}`}>{character.name}</h4>)
          }
        </div>
      )
    }

    return (
        <div>
          <button type="button" onClick={handleOpen}>
            See Details
          </button>
          <Modal
            open={isModalOpen}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {
              <div style={modalStyle} className={classes.paper}>
                <h3>Title: {movie.title}</h3>
                <h3>Director: {movie.director}</h3>
                <h3>Producer: {movie.producer}</h3>
                <h4>{movie.opening_crawl}</h4>
                {
                  isLoading
                  ?
                  <h2>Loading characters...</h2>
                  :
                  <CharactersList characters={characters} numberCharacters={5} />
                }
              </div>
            }
          </Modal>
        </div>
    );
}

export default CustomModal;