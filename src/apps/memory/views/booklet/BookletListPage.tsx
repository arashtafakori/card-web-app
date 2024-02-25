
import { Row, Col, Modal, Spinner, Container, Navbar } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from 'react';
import { httpState, httpRequestStatus } from '../../../../utils/httpRequest';
import { PaginatedData } from '../../../../utils/paginatedData';
import { createNewBooklet, getBookletsList } from '../../redux/booklet/api';
import "../../redux/store";
import { Booklet } from '../../models/booklet';
import BookletItem from './BookletItem';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AiOutlinePlus } from 'react-icons/ai';
import CreateNewBooklet from './CreateNewBooklet';
import { PageSpinner } from '../../../../components/PageSpinner';

const BookletListPage = () => {
  const [showNewItemModel, setShowNewItemModel] = useState(false);
  const handleNewItemModelClose = () => setShowNewItemModel(false);
  const handleNewItemModelShow = () => {
    setShowNewItemModel(true);
    catchPageState();
  }

  const navigate = useNavigate();
  // const handleCreateNewBookletClick = () => {
  //   navigate(`${BOOKLETS_CREATE_NEW_PATH}`);
  // };

  let dispatch = useDispatch<any>();

  const scrollRef = useRef(0);

  useEffect(() => {
    dispatch(getBookletsList());
  }, [dispatch]);

  const httpState = useSelector(
    (state: any) => state.bookletsList as httpState<PaginatedData<Booklet>>);
  const isLoading = httpState.status === httpRequestStatus.Pending
    && httpState.typePrefix === getBookletsList.typePrefix;

  useEffect(() => {
    if (httpState.typePrefix == createNewBooklet.typePrefix)
      window.scrollTo(0, 0);
    else
      window.scrollTo(0, scrollRef.current);
  }, [httpState]);

  const catchPageState = () => {
    scrollRef.current = window.scrollY;
  };

  return (
    <>
      {
        isLoading &&
        <PageSpinner />
      }

      <div>
        <Navbar fixed="top" className="bg-body-tertiary" style={{ height: '56px', zIndex: '999' }}>
          <div className="d-flex align-items-center flex-wrap gap-x-5 gap-y-3">
            {<Row className="row justify-content-center">
              <Col xs={12} md={10} lg style={{ paddingLeft: '100px', paddingRight: '20px' }}>
                {/* <SearchBox placeholder="Search booklets" style={{ maxWidth: '30rem' }} /> */}
                <div>
                  <Button variant="outline-primary" size="sm" onClick={handleNewItemModelShow}>
                    <AiOutlinePlus /> New booklet
                  </Button>
                </div>
              </Col>
            </Row>}
          </div>
        </Navbar>

        <Container fluid>
          <div className="px-lg-1">
            {
              httpState.data?.items.map((booklet, index) => (
                <BookletItem onCatchPageState={catchPageState} index={index} booklet={booklet} key={booklet.id} />))
            }
          </div>
        </Container>
      </div>
      <Modal
        size="lg"
        show={showNewItemModel}
        onHide={handleNewItemModelClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '14px' }}>Create new booklet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateNewBooklet onHide={handleNewItemModelClose}></CreateNewBooklet>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BookletListPage;
