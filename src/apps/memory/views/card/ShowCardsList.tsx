
import { Modal, Container, Navbar, Stack, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from 'react';
import { httpState, httpRequestStatus } from '../../../../utils/httpRequest';
import { PaginatedData } from '../../../../utils/paginatedData';
import { getCardsList } from '../../redux/card/api';
import "../../redux/store";
import { Card } from '../../models/card';
import CardItem from './CardItem';
import { Button } from 'react-bootstrap';
import { AiOutlinePlus } from 'react-icons/ai';
import AddCard from './AddCard';
import { PageSpinner } from '../../../../components/PageSpinner';
import { closeNotification, notifyError } from '../../redux/general/reducers/notificationReducer';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../../../../layouts/general.css';
import { SearchInput, SearchInputRef } from '../../../../components/SearchInput';
import { IoTrashBinOutline } from "react-icons/io5";
import EmptyCardsTrash from './EmptyCardsTrash';
import NotificationToast from '../../../../components/NotificationToast';
import UndoToast from '../../../../components/UndoToast';
import { closeUndoAction } from '../../redux/general/reducers/undoActionReducer';
import { useParams } from 'react-router-dom';

enum availabilityStatus {
  available,
  deleted
}

const ShowCardsList = () => {
  const { bookletId } = useParams();
  const { indexId } = useParams();
  
  let dispatch = useDispatch<any>();

  //------------
  const [containerHeight, setContainerHeight] = useState(window.innerHeight - 90);

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

  const [openNewItemModel, setShowNewItemModel] = useState(false);
  const handleNewItemModelClose = () => setShowNewItemModel(false);
  const handleNewItemModelShow = () => {
    setShowNewItemModel(true);
  }

  const [openEmptyTrashModel, setOpenEmptyTrashModel] = useState(false);
  const handleEmptyTrashModelClose = () => setOpenEmptyTrashModel(false);
  const handleEmptyTrashModelOpen = () => {
    setOpenEmptyTrashModel(true);
  }

  //---

  const cardsListState = useSelector(
    (state: any) => state.cardsList as httpState<PaginatedData<Card>>);

  const isLoading = cardsListState.status === httpRequestStatus.Pending
    && cardsListState.typePrefix === getCardsList.typePrefix;

  const fetchData = (pageNumber: number, status: availabilityStatus, searchValue: string) => {
    if(pageNumber == 1)
    {       
      // It means that the page has been reloaded.
      dispatch(closeNotification());
      dispatch(closeUndoAction());
    }

    dispatch(getCardsList({
      bookletId: bookletId,
      indexId: indexId,
      pageNumber: pageNumber,
      pageSize: pageNumber == 1 ? 50 : 20,
      isDeleted: status == availabilityStatus.deleted,
      searchValue: searchValue
    }))
      .unwrap()
      .then((data: any) => {
      })
      .catch((error: any) => {
        dispatch(notifyError(error));
      });
  }

  useEffect(() => {
    clearSearchInput();
    fetchData(1, filterAvailabilityStatus, '');
  }, [dispatch]);

  const [filterAvailabilityStatus, setFilterAvailabilityStatus] = useState(availabilityStatus.available);

  const handleAvailabilityStatusClick = (status: any) => {
    clearSearchInput();
    setFilterAvailabilityStatus(status);
    setSearchValue('');
    fetchData(1, status, '');
  };

  // make url parametric
  const [searchValue, setSearchValue] = useState('');

  const search = (value: string) => {
    setSearchValue(value);
    fetchData(1, filterAvailabilityStatus, value);
  };

  const searchInputRef = useRef<SearchInputRef>(null);
  const clearSearchInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.clear();
      setSearchValue('');
      fetchData(1, filterAvailabilityStatus, '');
    }
  };

  return (
    <>
      {
        isLoading &&
        <PageSpinner />
      }
      
      <NotificationToast />
      <UndoToast />

      <div>
        <Navbar fixed="top" className="bg-body-tertiary"
          style={{ paddingLeft: '70px', height: '56px', zIndex: '999' }}>
          <div className="container-fluid">
            <div className="row">
              <Stack direction="horizontal" gap={2}>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                    {filterAvailabilityStatus === availabilityStatus.available
                      ? <span className='item-auto-visible'>Available Cards</span>
                      : <span className='item-auto-visible'>Deleted Cards</span>}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      active={filterAvailabilityStatus === availabilityStatus.available}
                      onClick={() => handleAvailabilityStatusClick(availabilityStatus.available)}
                    >
                      Available Cards
                    </Dropdown.Item>
                    <Dropdown.Item
                      active={filterAvailabilityStatus === availabilityStatus.deleted}
                      onClick={() => handleAvailabilityStatusClick(availabilityStatus.deleted)}
                    >
                      Deleted Cards
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* <Button variant="outline-primary" size="sm">
                  <RiFilterLine />
                </Button> */}
                <SearchInput ref={searchInputRef} onSearch={(value: string) => { search(value); }} />
              </Stack>
            </div>
            <div className="row">
              <Stack direction="horizontal" gap={2}>
                {
                  filterAvailabilityStatus == availabilityStatus.available &&
                  <Button variant="outline-primary" size="sm"
                    onClick={handleNewItemModelShow}>
                    <AiOutlinePlus /> <span className='item-auto-visible'>New Card</span>
                  </Button>
                }
                {
                  filterAvailabilityStatus == availabilityStatus.deleted &&
                  <Button variant="outline-primary" size="sm"
                    onClick={handleEmptyTrashModelOpen}>
                    <IoTrashBinOutline /> <span className='item-auto-visible'>Empty Trash</span>
                  </Button>
                }
              </Stack>
            </div>
          </div>
        </Navbar>

        <Container fluid>
          <InfiniteScroll
            dataLength={cardsListState.data?.items.length!}
            next={() => { fetchData(cardsListState.data?.pageNumber! + 1, filterAvailabilityStatus, searchValue); }}
            hasMore={cardsListState.data?.hasNextPage!}
            loader={<h4>Loading...</h4>}
            height={containerHeight}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                {
                  cardsListState.data?.numberOfTotalItems == 0
                    ? 'There is no item to show.'
                    : 'All items have been retrieved.'
                }
              </p>
            }
          >
            {
              cardsListState.data?.items.map((card, itemIndex) => (
                <CardItem itemIndex={itemIndex} card={card} key={card.id} />))
            }
          </InfiniteScroll>
        </Container>
      </div>

      <Modal
        size="lg"
        show={openNewItemModel}
        onHide={handleNewItemModelClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '14px' }}>Create new card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCard onHide={handleNewItemModelClose} bookletId={bookletId} indexId={indexId}></AddCard>
        </Modal.Body>
      </Modal>

      <Modal
        show={openEmptyTrashModel}
        onHide={handleEmptyTrashModelClose}
        backdrop="static"
      >
        <Modal.Body className="p-4">
        <EmptyCardsTrash onHide={handleEmptyTrashModelClose}  bookletId={bookletId} indexId={indexId}></EmptyCardsTrash>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShowCardsList;
