function SummaryModel() {
    BaseModel.call(this);
    this.attributes = {
        totalScore: JSON.parse(localStorage.getItem('score')) || 0,
        bestScore: JSON.parse(localStorage.getItem('best')) || 0
    };

    var instance = this;
    SummaryModel = function() {
        return instance;
    };
}

SummaryModel.prototype = Object.create(BaseModel.prototype);
SummaryModel.prototype.constructor = SummaryModel;

SummaryModel.prototype.reset = function() {
    localStorage.removeItem('score');
    localStorage.setItem('addition', 0);
    this.attributes.totalScore = 0;
    this.publish('changeData');
};

SummaryModel.prototype.countTotalScore = function(total) {
    this.attributes.totalScore += total;
    localStorage.setItem('score', JSON.stringify(this.attributes.totalScore));
    localStorage.setItem('addition', JSON.stringify(total));
    this.publish('changeData');
};

SummaryModel.prototype.countBestScore = function() {
    if (this.attributes.bestScore > this.attributes.totalScore) {
        this.attributes.bestScore = JSON.parse(localStorage.getItem('best'));
    } else {
        this.attributes.bestScore = this.attributes.totalScore;
    }

    localStorage.setItem('best', JSON.stringify(this.attributes.bestScore));
    this.publish('changeData');
};