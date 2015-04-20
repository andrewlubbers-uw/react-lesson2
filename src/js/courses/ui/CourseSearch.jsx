'use strict';

var CourseStore = require('../flux/CourseStore');
var CourseActions = require('../flux/CourseActions');

var CourseSearchResults = require('./CourseSearchResults');
var CourseSearchForm = require('./CourseSearchForm');

/**
 * A component to render data in a table.
 */
var CourseSearch = React.createClass({
    getInitialState: function() {
      return({
          "searchString": "",
          "hasPerformedSearch": false
      });
    },

    /*
     * Hander for search.
     */
    performCourseSearch: function(searchString) {
        searchString = searchString.replace(/[^0-9A-Za-z\-_ ()]/g, "");
        //  Use immuability helpers to prevent clobbering other properties on the state object.
        var newState = React.addons.update(this.state, {"searchString": {$set: searchString}});

        //  If the user has never performed a search the set the performed search flag to true.
        if (! this.state.hasPerformedSearch) {
            newState = React.addons.update(newState, {"hasPerformedSearch": {$set: true}});
        }

        this.setState(newState);
        
        //  Perform the search
        CourseActions.findCourses(searchString);
    },

    _forceUpdate: function() {
        this.forceUpdate();
    },

    render: function() {
        //  Fetch search results.
        var courses = CourseStore.getCourseSearchResults();

        /*
         * Conditionally render the results component based on whether there are
         * any courses to display and whether or not a search has been performed.
         */
        var resultsComponent = null;
        if (courses.length > 0) {
            resultsComponent = <CourseSearchResults courses={courses} forceUpdate={this._forceUpdate} />;
        } else {
            if (this.state.hasPerformedSearch) {
                resultsComponent = <span>Your query produced no results.</span>
            }
        }

        return(
            <div>
                <CourseSearchForm onCourseSearch={this.performCourseSearch} />
                <div className="courseSearchResults">{resultsComponent}</div>
            </div>);
    }
});

module.exports = CourseSearch;