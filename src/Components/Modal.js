import React from 'react'

const Modal = (props) => {
  return (
    <div  id="token-modal"tabindex="-1" role="dialog">
        {props.modalState && <div class="modal-dialog" role="document">
          <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Select Token</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" onClick={(e) => props.closeModal(e)}>&times;</span>
            </button>
          </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>
       </div>
        
      </div>
    </div>}
        
  
  </div>
  )
}

export default Modal