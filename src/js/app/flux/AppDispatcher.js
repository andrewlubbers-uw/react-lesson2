var Dispatcher = require('flux').Dispatcher;

var AppDispatcher = new Dispatcher();

/*
 * This is the dispatcher for the entire application. It distinguishes actions
 * which originate from views (rather than someplace else).
 */
AppDispatcher.handleAction = function(action) {
    this.dispatch({
        source: 'VIEW_ACTION',
        action: action
    });
}

module.exports = AppDispatcher;
