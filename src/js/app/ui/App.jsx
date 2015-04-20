'use strict';

var React = window.React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var AppHeader = require('./AppHeader');
var AppFooter = require('./AppFooter');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <AppHeader/>
                <div className="app_content">
                    <RouteHandler {...this.props} />
                </div>
                <AppFooter/>
            </div>
        );
    }
});

module.exports = App;
