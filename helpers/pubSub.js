function PubSub() {
    this.subscribers = [];
}

PubSub.prototype.subscribe = function(event, handler, context) {
    this.subscribers.push({ event: event, handler: handler.bind(context) });
};

PubSub.prototype.publish = function(event, args) {
    this.subscribers.forEach(function(action) {
        if (action.event === event) {
            action.handler(args);
        }
    })
};