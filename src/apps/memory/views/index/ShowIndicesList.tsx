
import { Modal, Container, Navbar, Stack, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from 'react';
import { httpState, httpRequestStatus } from '../../../../utils/httpRequest';
import { PaginatedData } from '../../../../utils/paginatedData';
import "../../redux/store";
import { Button } from 'react-bootstrap';
import { AiOutlinePlus } from 'react-icons/ai';
import { PageSpinner } from '../../../../components/PageSpinner';
import { closeNotification, notifyError } from '../../redux/general/reducers/notificationReducer';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../../../../layouts/general.css';
import { IoTrashBinOutline } from "react-icons/io5";
import EmptyIndicesTrash from './EmptyIndicesTrash';
import NotificationToast from '../../../../components/NotificationToast';
import UndoToast from '../../../../components/UndoToast';
import { closeUndoAction } from '../../redux/general/reducers/undoActionReducer';
import { Index } from '../../models';
import { getIndicesList } from '../../redux/index/api';
import { SearchInput, SearchInputRef } from '../../../../components/SearchInput';
import IndexItem from './IndexItem';
import AddIndex from './AddIndex';

enum availabilityStatus {
  available,
  deleted
}

const ShowIndicesList = () => {
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

  const indicesListState = useSelector(
    (state: any) => state.indicesList as httpState<PaginatedData<Index>>);

  const isLoading = indicesListState.status === httpRequestStatus.Pending
    && indicesListState.typePrefix === getIndicesList.typePrefix;

  const fetchData = (pageNumber: number, status: availabilityStatus, searchValue: string) => {
    if(pageNumber == 1)
    {       
      // It means that the page has been reloaded.
      dispatch(closeNotification());
      dispatch(closeUndoAction());
    }

    dispatch(getIndicesList({
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
                      ? <span className='item-auto-visible'>Available Indices</span>
                      : <span className='item-auto-visible'>Deleted Indices</span>}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      active={filterAvailabilityStatus === availabilityStatus.available}
                      onClick={() => handleAvailabilityStatusClick(availabilityStatus.available)}
                    >
                      Available Indices
                    </Dropdown.Item>
                    <Dropdown.Item
                      active={filterAvailabilityStatus === availabilityStatus.deleted}
                      onClick={() => handleAvailabilityStatusClick(availabilityStatus.deleted)}
                    >
                      Deleted Indices
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
                    <AiOutlinePlus /> <span className='item-auto-visible'>New Index</span>
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
            dataLength={indicesListState.data?.items.length!}
            next={() => { fetchData(indicesListState.data?.pageNumber! + 1, filterAvailabilityStatus, searchValue); }}
            hasMore={indicesListState.data?.hasNextPage!}
            loader={<h4>Loading...</h4>}
            height={containerHeight}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                {
                  indicesListState.data?.numberOfTotalItems == 0
                    ? 'There is no item to show.'
                    : 'All items have been retrieved.'
                }
              </p>
            }
            // below props only if you need pull down functionality
            refreshFunction={() => { fetchData(1, filterAvailabilityStatus, searchValue); }}
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
              indicesListState.data?.items.map((index, itemIndex) => (
                <IndexItem itemIndex={itemIndex} index={index} key={index.id} />))
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
          <Modal.Title style={{ fontSize: '14px' }}>Create new booklet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddIndex onHide={handleNewItemModelClose}></AddIndex>
        </Modal.Body>
      </Modal>

      <Modal
        show={openEmptyTrashModel}
        onHide={handleEmptyTrashModelClose}
        backdrop="static"
      >
        <Modal.Body className="p-4">
        <EmptyIndicesTrash onHide={handleEmptyTrashModelClose}></EmptyIndicesTrash>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShowIndicesList;
