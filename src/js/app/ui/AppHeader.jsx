'use strict';

var React = window.React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var AppHeader = React.createClass({
    render: function() {
        return (
            <div className="app_header">
                <h2>Our App</h2>
                <ul>
                    <li><Link to="actions">Actions</Link></li>
                    <li><Link to="courses">Courses</Link></li>
                </ul>
            </div>
        );
    }
});

module.exports = AppHeader;
