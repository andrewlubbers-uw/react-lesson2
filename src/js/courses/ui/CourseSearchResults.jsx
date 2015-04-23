'use strict';

var { Link } = require('react-router');

var CourseActions = require('../flux/CourseActions');

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
                <td>
                    <span onClick={this.props.deleteClickHandler} title="Delete this course">X</span>
                    <span> </span>
                    <Link to="courseUpdate" params={{courseId: courseModel.id}} title="See course details">?</Link>
                </td>
            </tr>);
    }
});

/**
 * A component to render data in a table.
 */
var CourseSearchResults = React.createClass({
    /* The initial state of the component when it is mounted. */
    getInitialState: function() {
        return {"sortColumn": "name"};
    },

    /* Handler for the clicks on a column header */
    handleSortClick: function(column) {
        //  Resort if the column changed.
        if (this.state.sortColumn !== column) {
            this.setState({"sortColumn": column});
        }
    },

    handleDeleteClick: function(id) {
        CourseActions.deleteCourse(id);
    },

    /* Sort the given array of objects by the given property */
    _sort: function(data, prop) {
        //  Not React specific, but pass a comparator method to the Array sort function to sort on the given column.
        data.sort(function(o1, o2) {
            var p1 = o1.props.courseModel[prop];
            var p2 = o2.props.courseModel[prop];
            if (p1 > p2) {
                return 1;
            }
            if (p1 < p2) {
                return -1;
            }
            return 0;
        })
    },

    render: function() {
        var sortColumn = this.state.sortColumn;
        //  Make a copy of the course list and sort it.
        var courses = this.props.courses;

        //  Create the rows for the table
        var self = this;
        var rows = courses.map(function(course, i) {
            return(<Row key={i} courseModel={course} deleteClickHandler={self.handleDeleteClick.bind(null, course.id)} />);
        });
        //  Sort the rows
        this._sort(rows, sortColumn);
        
        return(
            <div className="courseSearchResults">
                <table>
                    <thead>
                        <tr>
                            <th onClick={this.handleSortClick.bind(this, "code")}>Code</th>
                            <th onClick={this.handleSortClick.bind(this, "title")}>Title</th>
                            <th>Credits</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
              </table>
          </div>);
    }
});

module.exports = CourseSearchResults;
