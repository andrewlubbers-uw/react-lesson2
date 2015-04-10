'use strict';

var React = window.React = require('react/addons');

var CourseSearch = require('./CourseSearch');

var React = require('react');

var App = React.createClass({

  render: function() {
    return (
      <div>
        <div className="app_header"><h2>Our App</h2></div>
        <CourseSearch/>
        <div className="app_footer"><span>UW-IT Student Program</span></div>
      </div>
    );
  }

});

React.render(<App/>, document.body);
