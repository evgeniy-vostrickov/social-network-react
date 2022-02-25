import React from 'react';
import logoToast from '../../assets/images/logoToast.png';

const MyAlert = () => {
    return (
        <div className="position-fixed bottom-0 end-0 p-3 z-index-11">
            <div id="toastNotice" className="toast fs1-3r" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <img src={logoToast} className="rounded me-2 toast-img" />
                    <strong className="me-auto">KOOBNET</strong>
                    <small className="text-muted">1 секунду назад</small>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body"></div>
            </div>
        </div>
    )
}

export default MyAlert;