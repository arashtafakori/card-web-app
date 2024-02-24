import { Spinner } from 'react-bootstrap';
import './custom.css';

export const PageSpinner = () => {
    return (
        <div className="flex-center">
            <Spinner animation="border" variant="primary" />
        </div>
    );
}