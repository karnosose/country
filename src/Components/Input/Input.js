import React from "react";
import TextField from "@material-ui/core/TextField";

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ""
    };
  }

  componentDidMount() {
    this.inputNode.focus();
  }

  onInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  onEnter = e => {
    if (e.key === "Enter") {
      this.props.onInputClick(this.state.inputValue);
    }
  };

  render() {
    return (
      <div>
        <TextField
          onChange={this.onInputChange}
          onKeyDown={e => this.onEnter(e)}
          ref={node => (this.inputNode = node)}
          id="outlined-basic"
          label="country name"
          type="text"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
          value={this.state.inputValue}
        />
      </div>
    );
  }
}
