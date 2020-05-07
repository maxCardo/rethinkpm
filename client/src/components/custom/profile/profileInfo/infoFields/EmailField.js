import React from 'react'



const EmailField = ({ field, data: { data } }) => {
    
    return (
        <div className={field.name}>
            <b>{field.name}:</b>
            <input type="text" name="emailPrimary"
                className= 'invalid'
                //{(this.state.UI.newEmailValid) ? 'valid' : 'invalid'}
                disabled={true}
                //{!this.state.UI.emailEditable}
                value='getemail@email.com'
                //{this.state.primaryEmail}
                //onChange={(evt) => this.onPrimaryEmailEdit(evt)}
                //ref={this.setEmailInputRef}
            />
            <button className='action-buttons__button singleFieldEdit'
                //onClick={() => this.editPrimaryEmail()}
            >
                <i className="fas fa-pencil-alt"></i>
            </button>                    
            <button className='action-buttons__button ab__confirm singleFieldEdit'
                disabled='true'
                //{!this.state.UI.newEmailValid}
                //onClick={() => this.confirmPrimaryEmailEdit()}
            >
                <i className="fas fa-check"></i>
            </button>
            <button className='action-buttons__button ab__cancel singleFieldEdit'
                //onClick={() => this.denyEmailChange()}
            >
                <i className="fas fa-times"></i>
            </button>     

            <button className='action-buttons__button addEmail'
                onClick={() => this.addEmailModal()}>
                <i className="fas fa-plus"></i>
            </button>
        </div>
    )
}

export default EmailField