function Controller() {
    this.matrixModel = new MatrixModel();
    this.summaryModel = new SummaryModel();
}

Controller.prototype.onKeyPress = function(event) {
    var key;
    switch (event.keyCode) {
        case 87:
            key = 'up';
            break;
        case 83:
            key = 'down';
            break;
        case 65:
            key = 'left';
            break;
        case 68:
            key = 'right';
            break;
        default:
            return false;
    }
    var total = this.matrixModel.displayActionResult(key);
    this.summaryModel.countTotalScore(total);
    this.summaryModel.countBestScore();
};

Controller.prototype.onClickNewGame = function() {
    this.matrixModel.startNewGame();
    this.summaryModel.reset();
};