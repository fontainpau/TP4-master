class Merchant {

    constructor(timeFactor, city) {
        this.timeFactor_ = timeFactor || 1000;
        this.city_ = city;

        this.action_ = "Just chilling"; //Just chilling || Trading || Under attack
        this.cityToTrade_ = "";
        this.proressBar_ = 100;
    }

    init()  {
        this.gaiaInterval_ = setInterval(() => {

            if (this.proressBar_ < 100) {
                this.proressBar_ = this.proressBar_ + 10;

                if (this.proressBar_ >= 100) {

                    if (this.action_ === "Trading") {
                        let myCityCorn = this.city_.corn;

                        this.city_.takeCorn(myCityCorn / 3);
                        this.cityToTrade.offerCorn(myCityCorn / 3);

                        this.city_.offerGold(myCityCorn / 6);
                        this.cityToTrade.takeGold(myCityCorn / 6);

                    }

                    this.action_ = "Just chilling";
                    this.cityToTrade_ = "";
                    this.proressBar_ = 100;
                }
            }

        }, this.timeFactor)
    }

    get cityToTrade() {
        return this.cityToTrade_;
    }

    get timeFactor() {
        return this.timeFactor_;
    }

    get city() {
        return this.city_;
    }

    get progressBar() {
        return this.proressBar_;
    }

    get action() {
        return this.action_;
    }

    attackMerchant(){
        if(this.action_ === "Trading") {
            this.action_ = "Under attack";
            this.cityToTrade_ = "";
            this.proressBar_ = 0;
        } else {
            console.log("This merchant is not trading")
        }
    }

    makeTrade(city){
        if(this.action_ === "Just chilling") {
            this.action_ = "Trading";
            this.cityToTrade_ = city;
            this.proressBar_ = 0;
        } else {
            console.log("Merchant already busy")
        }
    }
}

module.exports = {Merchant};