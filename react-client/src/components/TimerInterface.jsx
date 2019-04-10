import React from 'react';

class TimerInterFace extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      toggleEdit: false,
      // bottomCSS: -69
    }
   this.setWrapperRef = this.setWrapperRef.bind(this) 
   this.onOutsideThisComponentClick = this.onOutsideThisComponentClick.bind(this)
   this.toggleEdit = this.toggleEdit.bind(this)
   
  }

  componentDidMount() {
    this.setState({bottomCSS: this.props})
    document.addEventListener('click', this.onOutsideThisComponentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onOutsideThisComponentClick)

  }
  setWrapperRef(node) {
    this.wrapperRef = node
  }

  onOutsideThisComponentClick(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      event.stopPropagation()
      this.props.updateBottomCSS(event, true)
      this.props.toggleInterface(event)      
    }
  }

  toggleEdit(event) {
    event.stopPropagation()
    this.props.updateBottomCSS(event)
    this.setState({toggleEdit: !this.state.toggleEdit})
  }

  render() {

    const interfaceContainer = {
      fontFamily: 'Montserrat',
      fontSize: '14px',
      position: 'absolute',
      // margin: 'auto auto',
      width:'90px',
      padding: '12px',
      border: '1px solid',
      borderRadius: '2px',
      backgroundColor: '#eeeff3',
      right: 7,
      bottom: this.props.bottomCSS,
      zIndex: 999
    }

    return (
      <div style={interfaceContainer} ref={this.setWrapperRef}>
        <div style={button}>Reset</div>
        <div style={button} onClick={this.toggleEdit}>Edit</div>
        {this.state.toggleEdit ? 
          <div style={edit}>
            <div style={inputsGrid}>
              <div style={letter}>m:</div>
              <input style={input} type="number"/>
              <div style={letter}>s:</div>
              <input style={input} type="number"/>
            </div>
            <div style={button} >Save</div>
          </div>  
          : null}
      </div>
    )
  }
}

export default TimerInterFace

const button = {
  border: '1px solid',
  textAlign: 'center',
  padding: 0,
  fontSize:'11px'
}

const edit = {
  // border: '1px solid',
}

const letter = {
  width: '30%',
  padding: '8px'
}

const inputsGrid = {
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  // margin: 'auto'
}

const input = {
  // border: 'none',
  // outline: 'none',
  // textAlign: 'center',
  fontFamily: 'Montserrat',
  fontSize: '18px',
  width: '70%',
  padding:'7px'
  // margin: 'auto auto',
  // display: 'block',
  // appearance: 'none'
}

