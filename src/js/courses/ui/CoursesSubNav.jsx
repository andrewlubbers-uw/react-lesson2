'use strict';

var React = require('react'),
    { RouteHandler, Link } = require('react-router');

var CoursesSubnav = React.createClass({

    render: function() {
        return (
            <div>
                <div className="subnav">
                    <Link to="courseSearch">Search Courses</Link>
                    <Link to="courseCreate">Create Course</Link>
                </div>
                <RouteHandler {...this.props} />
            </div>
        );
    }
});

module.exports = CoursesSubnav;
