'use strict';

var CourseStore = require('../flux/CourseStore');

/**
 * Course search form.
 */
var CourseSearchForm = React.createClass({
    getInitialState: function() {
        return {"inputValue": CourseStore.getSearchString()};
    },
    handleSubmit: function(e) {
        e.preventDefault(); //  Prevent the form from being posted.

        //  Get the current value of the input.
        var searchString = this.refs.searchString.getDOMNode().value.trim();
        if (! searchString) {
            return;
        }
        //  Call the callback with the search string.
        this.props.onCourseSearch(searchString);
    },
    handleChange: function(e) {
        this.setState({inputValue: e.target.value});
    },
    render: function() {
        return (
            <form className="courseSearchForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Search..." ref="searchString" value={this.state.inputValue} onChange={this.handleChange}/>
                <input type="submit" value="Search" className="button" />
            </form>
        );
    }
});

module.exports = CourseSearchForm;
