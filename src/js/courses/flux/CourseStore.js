'use strict';

var AppDispatcher = require('../../app/flux/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./CourseConstants');
var CourseAPI = require("../../lib/api/CourseAPI");


var _ = require('underscore');

//  Storage
var _course = {};
var _courses = [];
var _searchString = "";

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
    var actionType = payload.action.actionType;
    var data = payload.action.data;
    /*
     * Respond to actions.
     */
    switch(actionType) {
        case Constants.GET_COURSE:
            loadCourse(data);
            break;
        case Constants.SAVE_COURSE:
            saveCourse(data);
            break;
        case Constants.DELETE_COURSE:
            deleteCourse(data);
            break;
        case Constants.FIND_COURSES:
            search(data);
            break;
        default:
           return true;
    }

    // If action was responded to, emit change event
    CourseStore.emitChange();

    return true;
});

/*
 * Load a course from the API.
 */
function loadCourse(id) {
    _course = CourseAPI.getCourse(id);
}

/*
 * Perform a course search
 */
function search(searchString) {
    _courses = CourseAPI.findCourses(searchString);
    _searchString = searchString;
}

/*
 * Save or update a course.
 */
function saveCourse(course) {
    _course = CourseAPI.saveCourse(course);
}

/*
 * Deletes a course.
 */
function deleteCourse(id) {
    CourseAPI.deleteCourse(id);
    //  Requery the search results since one of the items was deleted.
    search(_searchString);
}

/*
 * Extend CourseStore with EventEmitter to add eventing capabilities
 */
var CourseStore = _.extend({}, EventEmitter.prototype, {

    // Return Course data
    getCourse: function() {
        return _course;
    },

    getCourseSearchResults: function() {
        return _courses;
    },

    getSearchString: function() {
        return _searchString;
    },

    // Emit Change event
    emitChange: function() {
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    // Remove change listener
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

module.exports = CourseStore;
