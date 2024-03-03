import { Col, Dropdown, Modal, ProgressBar, Row, Spinner } from 'react-bootstrap';
import { Booklet } from '../../models/booklet';
import { useState } from 'react';
import EditBookletTitle from './EditBookletTitle';
import DeleteBookletPermanently from './DeleteBookletPermanently';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBooklet, restoreBooklet } from '../../redux/booklet/api';
import { notifyError } from '../../redux/general/reducers/notificationReducer';
import { showUndoAction, undoItemData } from '../../redux/general/reducers/undoActionReducer';
import { httpState } from '../../../../utils/httpRequest';
import { PaginatedData } from '../../../../utils/paginatedData';
import { undoItem } from '../../redux/booklet/bookletsListReducer';

interface BookletProps {
  booklet: Booklet;
  index: number;
}

const BookletItem = ({ booklet, index }: BookletProps) => {
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

  const bookletsListState = useSelector(
    (state: any) => state.bookletsList as httpState<PaginatedData<Booklet>>);

  const handleDeleteBooklet = (calledFromUndo: boolean = false) => {
    setIsLoading(true);
    dispatch(deleteBooklet(booklet.id))
      .unwrap()
      .then((data: any) => {
        setIsLoading(false);

        if (calledFromUndo === false) {
          dispatch(showUndoAction({
            description: 'Booklet deleted.',
            onUndo: () => { handleRestoreBooklet(true); }
          }));
        }else{
          dispatch(undoItem({index: index, item: booklet} as any));
        }
      })
      .catch((error: any) => {
        setIsLoading(false);
        dispatch(notifyError(error));
      });
  };

  const handleRestoreBooklet = (calledFromUndo: boolean = false) => {
    setIsLoading(true);
    dispatch(restoreBooklet(booklet.id))
      .unwrap()
      .then((data: any) => {
        setIsLoading(false);

        if (calledFromUndo === false) {
          dispatch(showUndoAction({
            description: 'Booklet restored.',
            onUndo: () => { handleDeleteBooklet(true); }
          }));
        }else{
          dispatch(undoItem({index: index, item: booklet} as any));
        }
      })
      .catch((error: any) => {
        setIsLoading(false);
        dispatch(notifyError(error));
      });
  };

  return (
    <>
      <div className="border-bottom">
        <Row className="gx-2">
          <Col className="col-auto">
            <p onClick={handleShowModelOpen}>
              {booklet.title}
            </p>
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

                  {!booklet.isDeleted && <Dropdown.Item onClick={handleEditModelOpen}>Edit</Dropdown.Item>}
                  {!booklet.isDeleted && <Dropdown.Item onClick={() => handleDeleteBooklet()}>Delete</Dropdown.Item>}

                  {booklet.isDeleted && <Dropdown.Item onClick={() => handleRestoreBooklet()}>Restore</Dropdown.Item>}
                  {booklet.isDeleted && <Dropdown.Item onClick={handleDeletePermanentlyModelOpen}>Delete forever</Dropdown.Item>}
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
          <Modal.Title style={{ fontSize: '14px' }}>Booklet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookletDetail {...booklet}></BookletDetail>
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        show={openEditModel}
        onHide={handleEditModelClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '14px' }}>Edit booklet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditBookletTitle onHide={handleEditModelClose} booklet={booklet}></EditBookletTitle>
        </Modal.Body>
      </Modal>

      <Modal
        show={openDeletePermanentlyModel}
        onHide={handleDeletePermanentlyModelClose}
        backdrop="static"
      >
        <Modal.Body className="p-4">
          <DeleteBookletPermanently onHide={handleDeletePermanentlyModelClose} booklet={booklet}></DeleteBookletPermanently>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BookletItem;

const BookletDetail: React.FC<Booklet> = (booklet) => {
  return (
    <Row className="row justify-content-center">
      <Col>
        <div className="email-detail-content px-4">
          <div className="text-1000 fs-9 w-100 w-md-75 mb-8">
            <span style={{ fontSize: '12px' }}> Title: <span style={{ fontSize: '15px' }}> {booklet.title}  </span> </span>
          </div>
        </div>
      </Col>
    </Row>
  );
};

