/**
 * Created by maade on 4/7/17.
 */


exports.cards = {

    BasicCard: function BasicCard(front, back) {
        if (this instanceof BasicCard) {
            this.front = front;
            this.back = back;
        } else {
            return new BasicCard(front, back);
        }
    },


    ClozeCard: function ClozeCard(text, cloze) {
        if (this instanceof ClozeCard) {
            this.front = text;
            this.back = cloze;
            this.fullText = text;
            if (this.front.indexOf(this.back) === -1) {
                console.log("This doesn't work", "oops");
            } else {
                this.front = this.front.replace(this.back, "...");
            }
        } else {
            return new ClozeCard(text, cloze);
        }
    }

// BasicCard.prototype = new ClozeCard();
};

