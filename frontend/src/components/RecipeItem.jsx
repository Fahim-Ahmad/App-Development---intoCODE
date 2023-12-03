import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useRecipeContext } from './RecipeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faHeart, faHeartCirclePlus, faUserClock, faClock } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';

export const RecipeItem = observer(({ recipeItem }) => {
  const {removeRecipeItem, updateRecipeItem} = useRecipeContext();
  const [showModal, setShowModal] = useState(false);

  const onIsFavoriteChange = (event) => {
    const newRecipeItem = { ...recipeItem, isFavorite: event.target.checked };
    updateRecipeItem(newRecipeItem);
  };

  const onDeleteClick = () => {
    setShowModal(true);
  };

  const handleDelete = () => {
    removeRecipeItem(recipeItem);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="col-12 mb-4">
      <div id={recipeItem.id} className="shadow p-3 bg-white rounded border border-info recipe-item equal-height-container">
        <div className="d-flex justify-content-between row">
          <div className="col-md-8">
            <h3 className="display-6">{recipeItem.name}</h3>
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            <div className="favorite-icon" onClick={onIsFavoriteChange}>
              <FontAwesomeIcon
                icon={recipeItem.isFavorite ? faHeart : faHeartCirclePlus}
                color={recipeItem.isFavorite ? 'red' : 'gray'}
              />
            </div>
          </div>
        </div>
        <p className='display-12'>{recipeItem.instructions}</p>
        <div className="d-flex justify-content-between">
          <p className='display-10'>{recipeItem.calories100g} Kcal/100g</p>
          <p className='display-10'><FontAwesomeIcon icon={faClock} style={{ color: 'gray' }}  /> {recipeItem.totalCookingTimeMinutes} minutes</p>
        </div>

        <div className="d-flex justify-content-between">
          <Link to={`/recipes/${recipeItem.id}`}>
            <button className="btn btn-primary">Show Recipe</button>
          </Link>
          <button onClick={onDeleteClick} className="btn btn-danger">
            <FontAwesomeIcon icon={faTrash} /> Delete
          </button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this recipe?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
});