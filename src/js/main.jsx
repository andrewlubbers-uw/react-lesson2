'use strict';

var React = window.React = require('react');

var {create: createRouter, HistoryLocation, HashLocation, Route, Routes,
    DefaultRoute, NotFoundRoute, Link, Redirect, RouterHander} = require('react-router');

/*
 * Pull in the components so that they can be used as handlers.
 */
var App = require("./app/ui/App");
var ActionsPage = require("./actions/ui/ActionsPage");
var CoursesSubNav = require("./courses/ui/CoursesSubNav");
var CourseCreate = require("./courses/ui/CourseCreate");
var CourseSearch = require("./courses/ui/CourseSearch");

/**
 * Setup routes.
 */
var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="courses" handler={CoursesSubNav}>
            <Route name="courseSearch" path="/courses/search" handler={CourseSearch}/>
            <Route name="courseCreate" path="/courses/create"handler={CourseCreate}/>
            <Route name="courseUpdate" path="/courses/update/:courseId" handler={CourseCreate}/>
            <DefaultRoute handler={CourseSearch}/>
        </Route>
        <Route name="actions" handler={ActionsPage}/>
        <DefaultRoute handler={ActionsPage}/>
    </Route>
);

var router = createRouter({
    // location: process.env.NODE_ENV === 'production' ? HashLocation : HistoryLocation,
    location: HashLocation,
    routes: routes
});

/**
 * Put everything on the page.
 */
router.run((Handler, state) => {
    React.render(<Handler {...state} />, document.body);
});
