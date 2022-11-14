import React from "react";
import { Collapse } from "react-collapse";

import { css } from "@emotion/css";

class DropdownItem extends React.Component {
  state = {
    isDropdownOpen: false,
    dropdownToggleIcon: "˅"
  };

  onDropdownClicked = () => {
    this.setState(prevState => ({
      isDropdownOpen: !prevState.isDropdownOpen,
      dropdownToggleIcon: prevState.dropdownToggleIcon === "˅" ? "^" : "˅"
    }));
  };

  render() {
    return (
      <div
        className={
          this.props.theme === "dark"
            ? accordionContainerDark
            : accordionContainerLight
        }
        id={this.props.id}
      >
        <div
          className={
            this.props.theme === "dark" ? headerBarDark : headerBarLight
          }
        >
          <div>{this.props.title}</div>
          <button
            className={
              this.props.theme === "dark"
                ? openAccordionToggleDark
                : openAccordionToggleLight
            }
            onClick={this.onDropdownClicked}
          >
            {this.state.dropdownToggleIcon}
          </button>
        </div>
        <Collapse isOpened={this.state.isDropdownOpen}>
          <div className={displayText}>{this.props.children}</div>
        </Collapse>
      </div>
    );
  }
}

export default DropdownItem;

//Light Theme
const headerBarLight = css`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px  #FAFAFA;
  margin-bottom: 12px;
  padding: 5px;
  font-size: 20px;
`;

const openAccordionToggleLight = css`
  background-color: transparent;
  border: none;
  font-size: 12px !important;
  font-family: 'Montserrat', sans-serif !important;
  cursor: pointer;
  color: #272D3B;
    font-weight: bold
`;

const displayText = css`
  text-align: left;
`;

const accordionContainerLight = css`
  margin: 20px;
  color: black;
`;

//Dark Theme
const headerBarDark = css`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid white;
  margin-bottom: 12px;
  padding: 5px;
  font-size: 12px !important;
  font-family: 'Montserrat', sans-serif !important;
  color: #272D3B;
    font-weight: bold
`;

const accordionContainerDark = css`
  margin: 20px;
  color: #272D3B;
  font-weight: bold
  font-size: 12px !important;
  font-family: 'Montserrat', sans-serif !important;
`;

const openAccordionToggleDark = css`
  background-color: transparent;
  border: none;
  font-size: 14px !important;
  font-family: 'Montserrat', sans-serif !important;
  cursor: pointer;
  color: #272D3B;
    font-weight: bold
`;
