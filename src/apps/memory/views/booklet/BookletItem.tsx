import { Col, Dropdown, Modal, Row } from 'react-bootstrap';
import { Booklet } from '../../models/booklet';
import { CiMenuKebab } from "react-icons/ci";
import BookletDetail from './BookletDetail';
import { useState } from 'react';
import EditBookletTitle from './EditBookletTitle';
import DeleteBooklet from './DeleteBooklet';

interface BookletProps {
  booklet: Booklet;
  index: number;
  onCatchPageState: () => void;
}

const BookletItem = ({ booklet, index, onCatchPageState }: BookletProps) => {
  const [showDetailModel, setShowDetailModel] = useState(false);
  const handleDetailModelClose = () => setShowDetailModel(false);
  const handleDetailModelShow = () => setShowDetailModel(true);

  const [showEditModel, setShowEditModel] = useState(false);
  const handleEditModelClose = () => setShowEditModel(false);
  const handleEditModelShow = () => {
    setShowEditModel(true);
    onCatchPageState();
  }

  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const handleDeleteModelClose = () => {
    setShowDeleteModel(false);
  };
  const handleDeleteModelShow = () => {
    setShowDeleteModel(true);
    onCatchPageState();
  };

  return (
    <>
      <div className="border-bottom">
        <Row className="gx-2">
          <Col className="col-auto">
            <p onClick={handleDetailModelShow}>
              {booklet.title}
            </p>
          </Col>
          <Col className="col-auto ms-auto">
            <div className="hover-actions end-0">
              <Dropdown>
                <Dropdown.Toggle
                  variant=" -secondary"
                  className="btn-icon"
                >
                  <CiMenuKebab />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleDetailModelShow}>View</Dropdown.Item>
                  <Dropdown.Item onClick={handleEditModelShow}>Edit</Dropdown.Item>
                  <Dropdown.Item onClick={handleDeleteModelShow} className="text-danger">Delete</Dropdown.Item>
                  {/* <Dropdown.Item onClick={handleEditModelShow}>Archive</Dropdown.Item>
                  <Dropdown.Item onClick={handleEditModelShow}>Restore</Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>

      <Modal
        size="lg"
        show={showDetailModel}
        onHide={handleDetailModelClose}
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
        show={showEditModel}
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
        size="lg"
        show={showDeleteModel}
        onHide={handleDeleteModelClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '14px' }}>Delete booklet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteBooklet onHide={handleDeleteModelClose} booklet={booklet}></DeleteBooklet>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BookletItem;
