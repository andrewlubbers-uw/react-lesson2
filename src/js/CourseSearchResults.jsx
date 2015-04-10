'use strict';

/**
 * A row component for the table component below.
 */
var Row = React.createClass({
    render: function() {
        var courseModel = this.props.courseModel;
        return(
            <tr>
                <td>{courseModel.subjectCode} {courseModel.courseNumber}</td>
                <td title={courseModel.description}>{courseModel.title}</td>
                <td>{courseModel.credits}</td>
                <th onClick={this.props.deleteClickHandler} title="Delete this row">X</th>
            </tr>);
    }
});

/**
 * A component to render data in a table.
 */
var CourseSearchResults = React.createClass({
    /* The initial state of the component when it is mounted. */
    getInitialState: function() {
        return({"sortColumn": "name"});
    },

    /* Handler for the clicks on a column header */
    handleSortClick: function(column) {
        //  Calling setState causes the component to rerender.
        this.setState({"sortColumn": column});
    },

    handleDeleteClick: function(code) {
        var data = this.props.data;
        var index = -1;
        // Look for row with the given code and remove it.
        for (var i = 0; i < data.length; i++) {
            if (data[i].code == code) {
                index = i;
                data.splice(index, 1);
                break;
            }
        }
        if (index > -1) {
            //  Tell component to re-render. Can't call setState() here because the state didn't change.
            this.forceUpdate();
        }
    },

    /* Sort the given array of objects by the given property */
    _sort: function(data, prop) {
        //  Not React specific, but pass a comparator method to the Array sort function to sort on the given column.
        data.sort(function(o1, o2) {
            if (o1[prop] > o2[prop]) {
                return 1;
            }
            if (o1[prop] < o2[prop]) {
                return -1;
            }
            return 0;
        })
    },

    render: function() {
        var sortColumn = this.state.sortColumn;
        var courses = this.props.courses;
        this._sort(courses, sortColumn);

        //  Create the rows for the table
        var self = this;
        var rows = courses.map(function(course, i) {
            return(<Row key={i} courseModel={course} deleteClickHandler={self.handleDeleteClick.bind(null, course.id)} />);
        });

        return(
          <table>
            <thead>
              <tr>
                  <th onClick={this.handleSortClick.bind(this, "code")}>Code</th>
                  <th>Credits</th>
                  <th onClick={this.handleSortClick.bind(this, "name")}>Title</th>
                  <th>Actions</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>);
    }
});

module.exports = CourseSearchResults;
