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
      return {
          "hasPerformedSearch": false
      };
    },

    /*
     * Register a callback for course changes.
     */
    componentWillMount: function() {
        CourseStore.addChangeListener(this._update);
    },

    /*
     * Remove the callback for course changes.
     */
    componentWillUnmount: function() {
        CourseStore.removeChangeListener(this._update);
    },

    /*
     * Hander for search.
     */
    performCourseSearch: function(searchString) {

        //  If the user has never performed a search the set the performed search flag to true.
        if (! this.state.hasPerformedSearch) {
            var newState = React.addons.update(this.state, {"hasPerformedSearch": {$set: true}});
            this.setState(newState);
        }

        //  Perform the search
        CourseActions.findCourses(searchString);
    },

    /*
     * Callback to allow changes to the store to trigger an update.
     */
    _update: function() {
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
            resultsComponent = <CourseSearchResults courses={courses} />;
        } else {
            if (this.state.hasPerformedSearch) {
                resultsComponent = <span>Your query produced no results.</span>
            }
        }

        return(
            <div>
                <CourseSearchForm onCourseSearch={this.performCourseSearch} />
                {resultsComponent}
            </div>);
    }
});

module.exports = CourseSearch;
