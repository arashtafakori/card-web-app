import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';

const NotificationToast = () => {
    const [show, setShow] = useState(false);

    const notificationState = useSelector((state: any) => state.notification);
    
    useEffect(() => {
        if(notificationState.type == 'CLOSE_NOTIFICATION')
        setShow(false);

        if (show !== true && notificationState.type == 'SHOW_NOTIFICATION'
         && notificationState.message !== '')
            setShow(true)
    }, [notificationState]);

    return (
        <ToastContainer
            className="toast-container"
            position={'top-end'}
            style={{ zIndex: 1080, position: 'fixed' }}
        >
            <Toast bg={"warning"} show={show} onClose={() => setShow(false)} delay={8000} autohide>
                <Toast.Header>
                    <strong className="mr-auto">Message</strong>
                </Toast.Header>
                <Toast.Body>{notificationState.message}</Toast.Body>
            </Toast>
        </ToastContainer>

    );
};

const mapStateToProps = (state: any) => ({
    error: state.error,
});

export default connect(mapStateToProps)(NotificationToast);
