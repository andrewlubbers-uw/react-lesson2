'use strict';

var React = require('react'),
    { RouteHandler, Link } = require('react-router');

/**
 * Action list and stuff like that.
 */
var ActionsPage = React.createClass({
    render: function() {
        return (
           <div>
               <h4>Action List</h4>
               <ul>
                   <li><Link to="courseUpdate" params={{courseId: "c3"}}>CSE 200</Link> - Needs approval</li>
                   <li><Link to="courseUpdate" params={{courseId: "c2"}}>CSE 142</Link> - Is retiring</li>
                   <li><Link to="courseUpdate" params={{courseId: "c10"}}>PHYS 110</Link> - Boing boing boing</li>
               </ul>
           </div>
        );
    }
});

module.exports = ActionsPage;
