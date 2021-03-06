import React, { Component } from 'react';
import LoadListItem from './LoadListItem.js'

// this component builds the load selection menu. It receives its own isHidden state and the toggleModal method 
// from Header.js, the DrawGrid method of App.js and the loadArray & arraySize states of App.js passed to it via props from Header.js
class LoadMenu extends Component {

  // click handler for 'cancel' button hides this component by calling the toggleModal method of Header.js
  closeMenu = () => {
    this.props.toggleLoad('load');
  }

  // builds the list of clickable items to show representing all available pictures to load
  makeOptionList = () => {
    // map through the global array of loadable items; for each object in the array
    let optionList = this.props.loadArray.map((pictureObject, index) => {
      // since grid size varies with viewport size, we need to only show loading options that match
      // if the object size matches the grid size this viewport is displaying, then
      if(pictureObject.arraySize === this.props.arraySize) {
        // pass that object's name, grid data and this component's closeMenu method to a LoadListItem component as props
        return(
          <LoadListItem key={'ll'+ index} name={pictureObject.pictureName} drawGrid={this.props.drawGrid} pictureGrid={pictureObject.pictureGrid} closeMenu={this.closeMenu} />
        );
      } else {
        return null;
      }
    });

    return optionList;
  }

  render(){
    return(
      <div className={"loadMenu " + (this.props.isHidden ? 'isHidden': null)}>
        <div className="modalBorder silver-border">
          <div className="loadMenuBody modalBody">
            <h2>Choose a picture!</h2>
            <p>Note: pictures saved on phones can only be loaded on phones. Same for large images made on desktop!</p>
            { this.makeOptionList() }
            <button onClick={this.closeMenu} className="control-button button-clear" >Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoadMenu;