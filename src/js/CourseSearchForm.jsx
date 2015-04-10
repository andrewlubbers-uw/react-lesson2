'use strict';

/**
 * Course search form.
 */
var CourseSearchForm = React.createClass({
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
    render: function() {
        return (
          <form className="courseSearchForm" onSubmit={this.handleSubmit}>
              <div>
                  <div>
                      <input type="text" placeholder="Search..." ref="searchString" />
                      <input type="submit" value="Search" className="button" />
                  </div>
              </div>
          </form>
        );
    }
});

module.exports = CourseSearchForm;
