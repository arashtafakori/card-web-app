
import { Form, Row, Col, Modal, Container, Navbar, InputGroup, Stack, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { httpState, httpRequestStatus } from '../../../../utils/httpRequest';
import { PaginatedData } from '../../../../utils/paginatedData';
import { getBookletsList } from '../../redux/booklet/api';
import "../../redux/store";
import { Booklet } from '../../models/booklet';
import BookletItem from './BookletItem';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AiOutlineFilter, AiOutlinePlus } from 'react-icons/ai';
import CreateNewBooklet from './CreateNewBooklet';
import { PageSpinner } from '../../../../components/PageSpinner';
import { notifyError } from '../../redux/general/reducers/notificationReducer';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as formik from 'formik';
import * as yup from 'yup';
import { FormikHelpers } from 'formik';
import { RiFilterFill, RiFilterLine } from "react-icons/ri";
import './ShowBookletList.css';
import Search from './Search';

const ShowBookletList = () => {
  let dispatch = useDispatch<any>();

  //------------
  const [containerHeight, setContainerHeight] = useState(0);

  const handleResize = () => {
    setContainerHeight(window.innerHeight - 90);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  //---

  const [showNewItemModel, setShowNewItemModel] = useState(false);
  const handleNewItemModelClose = () => setShowNewItemModel(false);
  const handleNewItemModelShow = () => {
    setShowNewItemModel(true);
  }
  //---

  const navigate = useNavigate();
  // const handleCreateNewBookletClick = () => {
  //   navigate(`${BOOKLETS_CREATE_NEW_PATH}`);
  // };

  const httpState = useSelector(
    (state: any) => state.bookletsList as httpState<PaginatedData<Booklet>>);
  const isLoading = httpState.status === httpRequestStatus.Pending
    && httpState.typePrefix === getBookletsList.typePrefix;

  const fetchData = (pageNumber: number) => {
    dispatch(getBookletsList({
      pageNumber: pageNumber,
      pageSize: pageNumber == 1 ? 10 : 20
    }))
      .unwrap()
      .then((data: any) => {
      })
      .catch((error: any) => {
        dispatch(notifyError(error));
      });
  }

  useEffect(() => {
    fetchData(1);
  }, [dispatch]);

  const [selectedItemId, setSelectedItemId] = useState('available');

  const handleItemClick = (itemId: any) => {
    setSelectedItemId(itemId);
  };

 

  return (
    <>
      {
        isLoading &&
        <PageSpinner />
      }

      <div>
        <Navbar fixed="top" className="bg-body-tertiary"
          style={{ paddingLeft: '70px', height: '56px', zIndex: '999' }}>
          <div className="container-fluid">
            <div className="row">
              <Stack direction="horizontal" gap={2}>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                    {selectedItemId === 'available' ? <span className='item-auto-visible'>Show Available Booklets</span> : <span className='item-auto-visible'>Show Removed Items</span>}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      id="available"
                      active={selectedItemId === 'available'}
                      onClick={() => handleItemClick('available')}
                    >
                      Available Booklets
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="removed"
                      active={selectedItemId === 'removed'}
                      onClick={() => handleItemClick('removed')}
                    >
                      Removed Items
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Button variant="outline-primary" size="sm">
                  <RiFilterLine />
                </Button>

 <Search/>
              </Stack>
            </div>
            <div className="row">
              <Stack direction="horizontal" gap={2}>
                <Button variant="outline-primary" size="sm"
                  onClick={handleNewItemModelShow}>
                  <AiOutlinePlus /> <span className='item-auto-visible'>New Booklet</span>
                </Button>
              </Stack>
            </div>
          </div>
        </Navbar>

        <Container fluid>
          <InfiniteScroll
            dataLength={httpState.data?.items.length!}
            next={() => { fetchData(httpState.data?.pageNumber! + 1); }}
            hasMore={httpState.data?.hasNextPage!}
            loader={<h4>Loading...</h4>}
            height={containerHeight}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>All items have been retrieved.</b>
              </p>
            }
            // below props only if you need pull down functionality
            refreshFunction={() => { fetchData(1); }}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>Pull down to refresh</h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>Release to refresh</h3>
            }
          >
            {
              httpState.data?.items.map((booklet, index) => (
                <BookletItem index={index} booklet={booklet} key={booklet.id} />))
            }
          </InfiniteScroll>
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

export default ShowBookletList;
