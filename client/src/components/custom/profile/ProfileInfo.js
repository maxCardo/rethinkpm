import React, {Component, Fragment} from 'react'
import ProfileIcon from '../common/ProfileIcon';
import {connect} from 'react-redux';
import {getData} from "../../../util/commonFunctions";
import commonFormatters from "../../../util/commonDataFormatters";
import Select from "react-select";
import {agentStatus} from "../../../util/statusSchemas";


export class ProfileInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      agentStatusSelect: agentStatus,
      statusSelected: {
        label: props.inquiry.status[0] ? (props.inquiry.status[0].toUpperCase() + props.inquiry.status.slice(1)) : '',
        value: props.inquiry.status ? props.inquiry.status : ''
      },
      UI: {
        statusEditable: true
      }
    };
    this.makeEditable=this.makeEditable.bind(this)

  }

  formatData(formatter, data) {
    if (typeof formatter == 'string') {
      return commonFormatters(formatter)(data)
    }
  }

  toggleAgentsMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    if (document.getElementsByClassName('profile__main-container')[0].classList.contains('left__sidebar-open')) {
      document.getElementsByClassName('profile__main-container')[0].classList.remove('left__sidebar-open');
    } else {
      document.getElementsByClassName('profile__main-container')[0].classList.add('left__sidebar-open');
    }
  }

  toggleChat(event) {
    event.preventDefault();
    event.stopPropagation();
    if (document.getElementsByClassName('profile__main-container')[0].classList.contains('chat__sidebar-open')) {
      document.getElementsByClassName('profile__main-container')[0].classList.remove('chat__sidebar-open');
    } else {
      document.getElementsByClassName('profile__main-container')[0].classList.add('chat__sidebar-open');
    }
  }

  makeEditable() {
    this.setState({
      UI: {
        statusEditable: !this.state.UI.statusEditable
      }
    });
  }

  render() {

    let col1 = [];
    let col2 = [];
    let col3 = [];
    this.props.attributes.map((attribute, idx) => {

      if (attribute.col === 1) {
        col1.push(
          (attribute.formatter) ?
            (<div key={idx} dangerouslySetInnerHTML={{
              __html: (
                `<p>
                 <b>${attribute.name}</b>: ${this.formatData(attribute.formatter, getData(this.props.inquiry, attribute))}
               </p>`
              )
            }}/>) :
            (<p key={idx}>
              <b>{attribute.name}</b>: {getData(this.props.inquiry, attribute) ? getData(this.props.inquiry, attribute) : 'Not Implemented'}
              {attribute.editable ? 'shet' : ''}
            </p>)
        );
      } else if (attribute.col === 2) {
        col2.push(
          (attribute.formatter) ?
            (<div key={idx} dangerouslySetInnerHTML={{
              __html: (
                `<p>
                 <b>${attribute.name}</b>: ${this.formatData(attribute.formatter, getData(this.props.inquiry, attribute))}
               </p>`
              )
            }}/>) :
            (<p key={idx}>
              <b>{attribute.name}</b>: {getData(this.props.inquiry, attribute) ? getData(this.props.inquiry, attribute) : 'Not Implemented'}
              {attribute.editable ? 'shet' : ''}
            </p>)
        );
      } else if (attribute.col === 3) {
        col3.push(
          (attribute.formatter) ?
            (<div key={idx} dangerouslySetInnerHTML={{
              __html: (
                `<p>
                 <b>${attribute.name}:</b> ${this.formatData(attribute.formatter, getData(this.props.inquiry, attribute))}
               </p>`
              )
            }}/>) :
            (<div key={idx}>
              <b>{attribute.name}</b>:
              {attribute.editable
                ?
                ((attribute.editable === 'select') ? (
                  <Fragment>
                    <Select
                      className={`editable-${!this.state.UI.statusEditable} agentStatusEdit`}
                      onChange={value => console.log(value)}
                      defaultValue={this.state.statusSelected}
                      options={this.state.agentStatusSelect}
                      placeholder='Select Status'
                      isDisabled={this.state.UI.statusEditable}
                    />
                    <button className='action-buttons__button singleFieldEdit'  onClick={this.makeEditable}>
                      <i className="fas fa-edit"></i>
                    </button>
                  </Fragment>
                ) : '')
                :
                (getData(this.props.inquiry, attribute) ? getData(this.props.inquiry, attribute) : 'Not Implemented')
              }
            </div>)
        );
      }
    });
    return (
      <div className='profile-info__main-container'>
        <div className='profile-info__icon-container'>
          <ProfileIcon name={'Tests'} size={80}/>
          <button className='action-buttons__button edit-profile__button'>
            <i className="fas fa-cogs"></i>
          </button>
        </div>
        <div className='profile-info__data-container'>
          {col1.length > 0 ? (<div className="column">
            <div className="column-content">
              <h2>Personal Info</h2>
              {col1}
            </div>
          </div>) : ''}
          {col2.length > 0 ? (<div className="column">
            <div className="column-content">
              <h2>Sales Info</h2>
              {col2}
            </div>
          </div>) : ''}
          {col3.length > 0 ? (<div className="column">
            <div className="column-content">
              <h2>Communication Info</h2>
              {col3}
            </div>
          </div>) : ''}
        </div>
        <div className="profile-info__actions-container">
          {this.props.isAgent ?
            (
              <a className='action-buttons__button' href='#' onClick={this.toggleAgentsMenu}>
                <i className="fas fa-user-tag"></i>
              </a>
            ) : ''}

          <a className='action-buttons__button' href='#' onClick={this.toggleChat}>
            <i className="fas fa-comments"></i>
          </a>
          <a className='action-buttons__button' href={`tel:${this.props.phoneNumber}`}>
            <i className="fas fa-phone"></i>
          </a>
          <a className='action-buttons__button' href={`mailto:${this.props.email}`}>
            <i className="fas fa-envelope"></i>
          </a>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  inquiries: state.dashboard.inquiriesRaw
})


export default connect(mapStateToProps)(ProfileInfo)
