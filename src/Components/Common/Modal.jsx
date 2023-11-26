import React from 'react';
export default function Modal({props, action}) {
    const { modalSettings: settings, modalContent: content } = props;

    if (!settings && !content) {
        return null;
    }

    const { actionButtons, title, className, dialogClassName } = settings;
    const { handleCloseModal } = action;

    return (
        <div className={ "modal fade " + className } id="baseModal" tabIndex="-1" aria-labelledby="baseModalLabel"
             aria-hidden="true">
            <div className={ "modal-dialog modal-dialog-centered " + dialogClassName }>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="baseModalLabel">{ title }</h5>
                        <button type="button" className="btn-close"
                                data-bs-dismiss="modal" aria-label="Close"
                                onClick={handleCloseModal}
                        ></button>
                    </div>
                    <div className="modal-body">
                        { content }
                    </div>
                    <div className="modal-footer justify-content-center">
                        {
                            ( actionButtons && actionButtons.length > 0 ) ?
                                actionButtons.map(
                                    (btn, index) => (
                                        <button key={index} {...btn.attributes}>{btn.label}</button>
                                    )
                                )
                            : <div></div>
                        }
                        <button type="button" className="btn btn-outline-secondary"
                                 data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}