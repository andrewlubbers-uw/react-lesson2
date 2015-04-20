'use strict';

var React = require('react/addons');
var cx = React.addons.classSet;

/*
 * A component for text fields and text areas.
 */
var TextField = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string,
        errorMessages: React.PropTypes.array
    },
    getInitialState: function() {
        var value = "";
        if (this.props.initialValue) {
            value = this.props.initialValue;
        }
        return {value: value};
    },
    handleChange: function(e) {
        this.setState({value: e.target.value});
    },
    handleBlur: function(e) {
        //var message = e.target.value + "? What are you thinking?"
        //this.props.addPropertyError(this.props.name, message)
    },
    render: function () {
        var id = this._rootNodeID;

        var errorsClass = "error";
        var hasErrors = false;
        var errorMessagesComponent = null;
        var errorMessages = this.props.errorMessages;
        if (errorMessages) {
            hasErrors = true;
            errorMessagesComponent = <small className={errorsClass}>{errorMessages}</small>
        }

        var classes = cx({'error': hasErrors});

        var descriptionComponent = null
        var description = this.props.description
        if (description) {
            descriptionComponent = <span className="rf-Hint">{description}</span>
        }

        var labelComponent = null
        var label = this.props.label
        if (label) {
            labelComponent =
                <label htmlFor={id} className={classes}>
                    <span>{label}</span>
                    {descriptionComponent}
                </label>
        }

        var value = this.state.value
        var name = this.props.name
        var placeholder = this.props.placeholder
        var type = this.props.type || "text"
        var input = null;
        if (type == "textarea") {
            input = <textarea id={id} className={classes} name={name} value={value}
                    placeholder={placeholder} onChange={this.handleChange} onBlur={this.handleBlur}/>
        } else {
            input = <input id={id} type={type} className={classes} name={name} value={value}
                    placeholder={placeholder} onChange={this.handleChange} onBlur={this.handleBlur} />
        }

        return (
            <div className="inputField">
                {labelComponent}
                {input}
                {errorMessagesComponent}
            </div>
        )
    }
});

module.exports = TextField;
