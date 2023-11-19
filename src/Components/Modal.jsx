import React from 'react';
function Modal({props}) {
    const { modalSettings: settings, modalContent: content } = props;
    const { hasActionButton, modalTitle, modalClass } = settings;

    return (
        <div className={ "modal fade " + modalClass } id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{ modalTitle }</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        { content }
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        { ( hasActionButton ) ?( <button type="button" className="btn btn-primary">Save changes</button> ) : null }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;