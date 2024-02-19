
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { httpState, httpRequestStatus } from '../../../../utils/httpRequest'
import { PaginatedData } from '../../../../utils/paginatedData';
import { getBookletsList } from '../../redux/booklet/api';
import "../../redux/store";
import { Booklet } from '../../models/booklet';
import BookletItem from './BookletItem';
import { useNavigate } from 'react-router-dom';
import { BOOKLETS_DEFINE_NEW_PATH } from '../../../../paths';

import { Button } from 'react-bootstrap';
import { AiOutlinePlus } from 'react-icons/ai';

const BookletListPage = () => {
  const navigate = useNavigate();
  const handleDefineNewBookletClick = () => {
    navigate(`${BOOKLETS_DEFINE_NEW_PATH}`);
  };

  let dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getBookletsList());
  }, [dispatch]);

  const httpState = useSelector((state: any) => state.bookletsList as httpState<PaginatedData<Booklet>>)

  return (
    <Row className="row justify-content-center">
      <Col xs={12} md={10} lg style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <div className="d-flex align-items-center flex-wrap gap-x-5 gap-y-3 mb-3">
          {/* <SearchBox placeholder="Search booklets" style={{ maxWidth: '30rem' }} /> */}
          <div>
            <Button variant="outline-primary" size="sm" onClick={handleDefineNewBookletClick}>
              <AiOutlinePlus /> New booklet
            </Button>
          </div>
        </div>

        <div className="px-lg-1">
          {
            httpState.status == httpRequestStatus.Fullfilled &&
            httpState.data?.items.map((booklet, index) => (
              <BookletItem index={index} booklet={booklet} key={booklet.id} />))
          }
        </div>
      </Col>
    </Row>
  );
};

export default BookletListPage;
