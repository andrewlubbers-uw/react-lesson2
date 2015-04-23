'use strict';

var React = require("react");
var { Link } = require('react-router');
var TextField = require("../../lib/ui/TextField");
var Utils = require("../../lib/utils/Utils");
var v = Utils.v;

var CourseCreateForm = React.createClass({

    onChange: function(e) {
        var property = e.target.name;
        var value = e.target.value;
        this.props.propertyChangeMethod(property, value);
    },

    onSubmit: function(e) {
        e.preventDefault();  //  Don't POST and reload.
        this.props.saveMethod();
    },

    render: function() {
        var form =
            <form onSubmit={this.onSubmit} onChange={this.onChange} onInput={this.onInput} className="createCourseForm">
                <fieldset>
                    <legend>Course Information</legend>

                    <div className="">
                        <div className="">
                            <TextField label="Subject Code" name="subjectCode"
                                addMessage={this.addMessage} addPropertyError={this.addPropertyError}
                                placeholder="CSE"
                                initialValue={v('subjectCode', this.props.course)}/>
                        </div>
                        <div className="">
                            <TextField label="Course Number" name="courseNumber"
                                addMessage={this.addMessage} addPropertyError={this.addPropertyError}
                                placeholder="142"
                                initialValue={v('courseNumber', this.props.course)}/>
                        </div>
                        <div className="">
                            <TextField label="Credits" name="credits"
                                addMessage={this.addMessage} addPropertyError={this.addPropertyError}
                                placeholder="3"
                                initialValue={v('credits', this.props.course)}/>
                        </div>
                    </div>
                    <div className="">
                        <TextField value="Start" label="Title" name="title"
                            addMessage={this.addMessage} addPropertyError={this.addPropertyError}
                            description="Title should be a title"
                            placeholder="Histry of the World"
                            initialValue={v('title', this.props.course)}/>
                    </div>
                    <div className="">
                        <TextField type="textarea" label="Description" name="description"
                            addMessage={this.addMessage} addPropertyError={this.addPropertyError}
                            description="The description of a course"
                            placeholder="Lorum ipsum descriptions go here ..."
                            initialValue={v('description', this.props.course)}/>
                    </div>
                </fieldset>
                <div className="">
                    <button type="submit">Submit</button>
                    <Link to="courseSearch">Cancel</Link>
                </div>
            </form>
        /*
         * If this is an update and we haven't gotten the course data back then render a loading message instead of the form.
         * Otherwise, just render the form.
         */
        var component = form
        if (v('id', this.props.course.id)) {
            component = <div>Loading...</div>
        }

        return (component)
    }
});

module.exports = CourseCreateForm;
