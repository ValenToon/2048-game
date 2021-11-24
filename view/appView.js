function AppView() {
    var summaryView = new SummaryView();
    var matrixView = new MatrixView();

    this.render = function(selector) {
        var element = document.getElementById(selector);
        summaryView.show(element);
        matrixView.show(element);
    }
}

var appView = new AppView();
appView.render('root');