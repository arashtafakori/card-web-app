import { Col, Dropdown, Modal, Row } from 'react-bootstrap';
import { Booklet } from '../../models/booklet';
import { CiMenuKebab } from "react-icons/ci";
import { useState } from 'react';
import EditBookletTitle from './EditBookletTitle';
import DeleteBooklet from './DeleteBooklet';
import ArchiveBooklet from './ArchiveBooklet';
import RestoreBooklet from './RestoreBooklet';

interface BookletProps {
  booklet: Booklet;
  index: number;
  onCatchPageState: () => void;
}

const BookletItem = ({ booklet, index, onCatchPageState }: BookletProps) => {
  const [openShowModal, setOpenShowModal] = useState(false);
  const handleShowModelClose = () => setOpenShowModal(false);
  const handleShowModelOpen = () => setOpenShowModal(true);

  const [openEditModel, setOpenEditModel] = useState(false);
  const handleEditModelClose = () => setOpenEditModel(false);
  const handleEditModelOpen = () => {
    setOpenEditModel(true);
    onCatchPageState();
  }

  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const handleDeleteModelClose = () => {
    setOpenDeleteModel(false);
  };
  const handleDeleteModelOpen = () => {
    setOpenDeleteModel(true);
    onCatchPageState();
  };

  const [openArchiveModel, setOpenArchiveModel] = useState(false);
  const handleArchiveModelClose = () => setOpenArchiveModel(false);
  const handleArchiveModelOpen = () => {
    setOpenArchiveModel(true);
    onCatchPageState();
  }

  const [openRestoreModel, setOpenRestoreModel] = useState(false);
  const handleRestoreModelClose = () => setOpenRestoreModel(false);
  const handleRestoreModelOpen = () => {
    setOpenRestoreModel(true);
    onCatchPageState();
  }

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
                >
                  <CiMenuKebab />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleShowModelOpen}>View</Dropdown.Item>
                  <Dropdown.Item onClick={handleEditModelOpen}>Edit</Dropdown.Item>
                  <Dropdown.Item onClick={handleDeleteModelOpen} className="text-danger">Delete</Dropdown.Item>
                  <Dropdown.Item onClick={handleArchiveModelOpen}>Archive</Dropdown.Item>
                  <Dropdown.Item onClick={handleRestoreModelOpen}>Restore</Dropdown.Item>
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
        size="lg"
        show={openDeleteModel}
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

      <Modal
        size="lg"
        show={openArchiveModel}
        onHide={handleArchiveModelClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '14px' }}>Archive booklet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ArchiveBooklet onHide={handleArchiveModelClose} booklet={booklet}></ArchiveBooklet>
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        show={openRestoreModel}
        onHide={handleRestoreModelClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '14px' }}>Restore booklet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RestoreBooklet onHide={handleRestoreModelClose} booklet={booklet}></RestoreBooklet>
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