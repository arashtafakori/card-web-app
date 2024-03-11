import { Button, Col, Container, Dropdown, Modal, ProgressBar, Row, Spinner, Stack } from 'react-bootstrap';
import { Card } from '../../models/card';
import { useState } from 'react';
import EditCardTitle from './EditCard';
import DeleteCardPermanently from './DeleteCardPermanently';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCard, restoreCard } from '../../redux/card/api';
import { notifyError } from '../../redux/general/reducers/notificationReducer';
import { showUndoAction, undoItemData } from '../../redux/general/reducers/undoActionReducer';
import { undoItem } from '../../redux/card/cardsListReducer';
import { useNavigate } from 'react-router-dom';
import { PiSpeakerHigh } from "react-icons/pi";

import axios from 'axios';


declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

interface CardProps {
  card: Card;
  itemIndex: number;
}

const CardItem = ({ card, itemIndex }: CardProps) => {
  const navigate = useNavigate();

  const [openShowModal, setOpenShowModal] = useState(false);
  const handleShowModelClose = () => setOpenShowModal(false);
  const handleShowModelOpen = () => setOpenShowModal(true);

  const [openEditModel, setOpenEditModel] = useState(false);
  const handleEditModelClose = () => setOpenEditModel(false);
  const handleEditModelOpen = () => {
    setOpenEditModel(true);
  }

  const [openDeletePermanentlyModel, setOpenDeletePermanentlyModel] = useState(false);
  const handleDeletePermanentlyModelClose = () => {
    setOpenDeletePermanentlyModel(false);
  };
  const handleDeletePermanentlyModelOpen = () => {
    setOpenDeletePermanentlyModel(true);
  };

  //

  let dispatch = useDispatch<any>();
  const [isLoading, setIsLoading] = useState(false);

 

  const handleDeleting = (calledFromUndo: boolean = false) => {
    setIsLoading(true);
    dispatch(deleteCard(card.id))
      .unwrap()
      .then((data: any) => {
        setIsLoading(false);

        if (calledFromUndo === false) {
          dispatch(showUndoAction({
            description: 'Card deleted.',
            onUndo: () => { handleRestoring(true); }
          }));
        } else {
          dispatch(undoItem({ index: itemIndex, item: card } as any));
        }
      })
      .catch((error: any) => {
        setIsLoading(false);
        dispatch(notifyError(error));
      });
  };

  const handleRestoring = (calledFromUndo: boolean = false) => {
    setIsLoading(true);
    dispatch(restoreCard(card.id))
      .unwrap()
      .then((data: any) => {
        setIsLoading(false);

        if (calledFromUndo === false) {
          dispatch(showUndoAction({
            description: 'Card restored.',
            onUndo: () => { handleDeleting(true); }
          }));
        } else {
          dispatch(undoItem({ index: itemIndex, item: card } as any));
        }
      })
      .catch((error: any) => {
        setIsLoading(false);
        dispatch(notifyError(error));
      });
  };

  //

 
  const speak = async (text: string, language: string) => {
 let lang = '';
    if(language == 'DE')
    lang = 'de-de';
  else if(language == 'EN')
    lang = 'en-us';

  const encodedParams = new URLSearchParams();
  encodedParams.set('src', text);
  encodedParams.set('hl', lang);
  encodedParams.set('r', '0');
  encodedParams.set('c', 'mp3');
  encodedParams.set('f', '8khz_8bit_mono');
  
  const options = {
    method: 'POST',
    url: 'https://voicerss-text-to-speech.p.rapidapi.com/',
    params: {key: '<REQUIRED>'},
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
      'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com'
    },
    data: encodedParams,
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  };
  
  return (
    <>
      <div className="border-bottom">
        <Row className="gx-2">
          <Col >
            <Container>
              <Row>
                <Col sm={6}>
                  <span >
                    <PiSpeakerHigh onClick={() => {speak(card.expression, card.expressionLanguage);}} />
                  </span>
                  <span style={{ paddingLeft: '5px' }}>
                    {card.expression}
                  </span>
                </Col>
                <Col sm={6}>
                  <span >
                    <PiSpeakerHigh onClick={() => {speak(card.translation, card.translationLanguage);}}/>
                  </span>
                  <span style={{ paddingLeft: '5px' }}>
                    {card.translation}
                  </span>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col className="col-auto ms-auto">
            <div className="hover-actions end-0">
              <Dropdown>
                <Dropdown.Toggle
                  variant=" -secondary"
                  className="btn-icon"
                  disabled={isLoading}
                >
                  {isLoading && <Spinner animation="border" variant="primary" style={{ width: '15px', height: '15px' }} />}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleShowModelOpen}>View</Dropdown.Item>
                  {!card.isDeleted && <Dropdown.Item onClick={handleEditModelOpen}>Edit</Dropdown.Item>}
                  {!card.isDeleted && <Dropdown.Item onClick={() => handleDeleting()}>Delete</Dropdown.Item>}

                  {card.isDeleted && <Dropdown.Item onClick={() => handleRestoring()}>Restore</Dropdown.Item>}
                  {card.isDeleted && <Dropdown.Item onClick={handleDeletePermanentlyModelOpen}>Delete forever</Dropdown.Item>}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>

      <Modal
        size="lg"
        show={openShowModal}
        onHide={handleShowModelClose}
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <CardDetail {...card}></CardDetail>
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        show={openEditModel}
        onHide={handleEditModelClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '14px' }}>Edit card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditCardTitle onHide={handleEditModelClose} card={card}></EditCardTitle>
        </Modal.Body>
      </Modal>

      <Modal
        show={openDeletePermanentlyModel}
        onHide={handleDeletePermanentlyModelClose}
        backdrop="static"
      >
        <Modal.Body className="p-4">
          <DeleteCardPermanently onHide={handleDeletePermanentlyModelClose} card={card}></DeleteCardPermanently>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardItem;

const CardDetail: React.FC<Card> = (card) => {
  return (
    <Container>
      <Row>
        <Col sm={6}>
          {card.expression}
        </Col>
        <Col sm={6}>
          {card.translation}
        </Col>
      </Row>
    </Container>
  );
};

