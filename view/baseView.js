function BaseView() {
    this.rootElement = document.createElement('div');
}

BaseView.prototype.show = function(element) {
    this.beforeRender();
    this.rootElement.innerHTML = this.render();
    this.rootElement.classList.add(this.className);
    element.appendChild(this.rootElement);
    this.aftRender();
};

BaseView.prototype.render = function() {
    throw new Error('Need to override render method');
};

BaseView.prototype.beforeUpdate = function() {};

BaseView.prototype.reRender = function() {
    this.beforeUpdate();
    this.rootElement.innerHTML = this.render();
    this.aftRender();
};

BaseView.prototype.aftUpdate = function() {};

BaseView.prototype.aftRender = function() {};
BaseView.prototype.beforeRender = function() {};