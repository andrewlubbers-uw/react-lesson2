'use strict';

var AppDispatcher = require('../../app/flux/AppDispatcher');
var Constants = require('./CourseConstants');

var CourseActions = {
    /*
     * Loads a particular course.
     */
    loadCourse: function(courseId) {
        AppDispatcher.handleAction({
            actionType: Constants.GET_COURSE,
            data: courseId
        });
    },

    /*
     * Saves a course, new or existing.
     */
    saveCourse: function(course) {
        AppDispatcher.handleAction({
            actionType: Constants.SAVE_COURSE,
            data: course
        });
    },

    /*
     * Deletes a course.
     */
    deleteCourse: function(courseId) {
        AppDispatcher.handleAction({
            actionType: Constants.DELETE_COURSE,
            data: courseId
        });
    },

    /*
     * Performs a search for courses
     */
    findCourses: function(query) {
        AppDispatcher.handleAction({
            actionType: Constants.FIND_COURSES,
            data: query
        });
    }
};

module.exports = CourseActions;
