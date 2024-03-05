import { Col, Dropdown, Modal, ProgressBar, Row, Spinner } from 'react-bootstrap';
import { Index } from '../../models/index';
import { useState } from 'react';
import EditBookletTitle from './EditIndexName';
import DeleteBookletPermanently from './DeleteIndexPermanently';
import { useDispatch, useSelector } from 'react-redux';
import { deleteIndex, restoreIndex } from '../../redux/index/api';
import { notifyError } from '../../redux/general/reducers/notificationReducer';
import { showUndoAction, undoItemData } from '../../redux/general/reducers/undoActionReducer';
import { httpState } from '../../../../utils/httpRequest';
import { PaginatedData } from '../../../../utils/paginatedData';
import { undoItem } from '../../redux/index/indicesListReducer';

interface BookletProps {
  index: Index;
  itemIndex: number;
}

const IndexItem = ({ index, itemIndex }: BookletProps) => {
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

  const indicesListState = useSelector(
    (state: any) => state.bookletsList as httpState<PaginatedData<Index>>);

  const handleDeleteBooklet = (calledFromUndo: boolean = false) => {
    setIsLoading(true);
    dispatch(deleteIndex(index.id))
      .unwrap()
      .then((data: any) => {
        setIsLoading(false);

        if (calledFromUndo === false) {
          dispatch(showUndoAction({
            description: 'Index deleted.',
            onUndo: () => { handleRestoreBooklet(true); }
          }));
        }else{
          dispatch(undoItem({index: itemIndex, item: index} as any));
        }
      })
      .catch((error: any) => {
        setIsLoading(false);
        dispatch(notifyError(error));
      });
  };

  const handleRestoreBooklet = (calledFromUndo: boolean = false) => {
    setIsLoading(true);
    dispatch(restoreIndex(index.id))
      .unwrap()
      .then((data: any) => {
        setIsLoading(false);

        if (calledFromUndo === false) {
          dispatch(showUndoAction({
            description: 'Index restored.',
            onUndo: () => { handleDeleteBooklet(true); }
          }));
        }else{
          dispatch(undoItem({index: itemIndex, item: index} as any));
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
              {index.name}
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
                  {!index.isDeleted && <Dropdown.Item onClick={handleEditModelOpen}>Index Index</Dropdown.Item>}
                  {!index.isDeleted && <Dropdown.Divider />}
                  <Dropdown.Item onClick={handleShowModelOpen}>View</Dropdown.Item>
                  {!index.isDeleted && <Dropdown.Item onClick={handleEditModelOpen}>Edit</Dropdown.Item>}
                  {!index.isDeleted && <Dropdown.Item onClick={() => handleDeleteBooklet()}>Delete</Dropdown.Item>}

                  {index.isDeleted && <Dropdown.Item onClick={() => handleRestoreBooklet()}>Restore</Dropdown.Item>}
                  {index.isDeleted && <Dropdown.Item onClick={handleDeletePermanentlyModelOpen}>Delete forever</Dropdown.Item>}
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
          <Modal.Title style={{ fontSize: '14px' }}>Index</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <IndexDetail {...index}></IndexDetail>
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        show={openEditModel}
        onHide={handleEditModelClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '14px' }}>Edit index</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditBookletTitle onHide={handleEditModelClose} index={index}></EditBookletTitle>
        </Modal.Body>
      </Modal>

      <Modal
        show={openDeletePermanentlyModel}
        onHide={handleDeletePermanentlyModelClose}
        backdrop="static"
      >
        <Modal.Body className="p-4">
          <DeleteBookletPermanently onHide={handleDeletePermanentlyModelClose} index={index}></DeleteBookletPermanently>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default IndexItem;

const IndexDetail: React.FC<Index> = (index) => {
  return (
    <Row className="row justify-content-center">
      <Col>
        <div className="email-detail-content px-4">
          <div className="text-1000 fs-9 w-100 w-md-75 mb-8">
            <span style={{ fontSize: '12px' }}> Title: <span style={{ fontSize: '15px' }}> {index.name}  </span> </span>
          </div>
        </div>
      </Col>
    </Row>
  );
};

