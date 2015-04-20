'use strict';

var CourseActions = require("../flux/CourseActions");
var CourseStore = require("../flux/CourseStore");
var CourseConstants = require("../flux/CourseConstants");
var CourseCreateForm = require("./CourseCreateForm");

/*
 * A form to create or update a course.
 */
var CourseCreate = React.createClass({
    /*
     * Get the course id from new or existing props
     */
    parseCourseId: function(props) {
        props = props || this.props;
        return props.params.courseId;
    },

    /*
     * Get the current course from the store.
     */
    getStateFromStore: function() {
        var course = CourseStore.getCourse();
        return({
            "course": course
        });
    },

    /*
     * Register a callback for course changes.
     */
    componentWillMount: function() {
        CourseStore.addChangeListener(this._onChange);
    },

    componentDidMount: function() {
        this.courseDidChange(this.props);
    },

    /*
     * Remove the callback for course changes.
     */
    componentWillUnmount: function() {
        CourseStore.removeChangeListener(this._onChange);
    },

    /*
     * Called when the URL is refreshed with a new course id.
     */
    componentWillReceiveProps: function(nextProps) {
        //  If the course Id changes then reload course data
        if (this.parseCourseId(nextProps) !== this.parseCourseId(this.props)) {
            this.courseDidChange(nextProps);
        }
    },

    courseDidChange: function(props) {
        var courseId = this.parseCourseId(props);
        //  If there is no course id then assume this is a create instead of an update
        if (courseId) {
            CourseActions.loadCourse(courseId);
        } else {
            //  Create an empty course and set the flag. This triggers another render.
            this.setState({
                isUpdate: false,
                course: {}
            });
        }
    },

    /*
     * Callback for the store to trigger a state change when the course has changed.
     */
    _onChange: function() {
       this.setState(this.getStateFromStore());
    },

    /*
     * A callback to allow inputs on the form to communicate their values as they are changed.
     */
    doPropertyChange: function(property, value) {
        //  Merge the changes using immutability helper.
        var c = {};
        c[property] = value;
        var newState = React.addons.update(this.state, {
          course: {$merge: c}
        });
        this.setState(newState);
    },

    doSave: function() {
        CourseActions.saveCourse(this.state.course);
        this.props.success = true;
    },

    render: function() {
        var c = <div>Loading ...</div>;

        var feedbackMessage = null;
        if (this.state && this.state.course) {
            c = <CourseCreateForm course={this.state.course} saveMethod={this.doSave} propertyChangeMethod={this.doPropertyChange} />;
            if (this.props.success) {
                feedbackMessage = <span>Course was saved!</span>;
                this.props.success = null;
            }
        }
        return(
            <div>
                {feedbackMessage}
                {c}
            </div>);
    }
});

module.exports = CourseCreate;
