import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react';
import { Button, CloseButton, Row, Col, Toast, ToastContainer, Stack } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';

const UndoToast = () => {
    const [show, setShow] = useState(false);

    const undoActionState = useSelector((state: any) => state.undoAction);

    useEffect(() => {
        if(undoActionState.type == 'CLOSE_UNDO_ACTION')
        setShow(false);

        if (show !== true && undoActionState.type == 'SHOW_UNDO_ACTION' 
        && undoActionState.payload.onUndo != null)
            setShow(true)
    }, [undoActionState]);

    const handleUndoClick = () => {
        if (undoActionState.payload && undoActionState.payload.onUndo != null)
        {
            undoActionState.payload.onUndo();
            setShow(false);
        }
    };

    return (
        <ToastContainer
            className="toast-container"
            position={'bottom-start'}
            style={{ zIndex: 1081, position: 'fixed' }}
        >
            <Toast bg='primary' show={show} onClose={() => setShow(false)} delay={10000} autohide>
                <Toast.Body>
                    <div className="container-fluid">
                        <Row>
                            <Col xs={8}>
                                {undoActionState.payload && <span style={{ fontWeight: 'bold' }}>{undoActionState.payload.description}</span>}
                            </Col>

                            <Col className="d-flex justify-content-end">
                                <Stack direction="horizontal" gap={2}>
                                    <Button size="sm" onClick={handleUndoClick} >
                                        Undo
                                    </Button>
                                    <CloseButton onClick={() => setShow(false)} />
                                </Stack>
                            </Col>
                        </Row>
                    </div>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

const mapStateToProps = (state: any) => ({
    error: state.error,
});

export default connect(mapStateToProps)(UndoToast);
