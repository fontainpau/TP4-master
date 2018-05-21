class Troop {
    constructor(timeFactor, city) {
        this.timeFactor_ = timeFactor || 1000;
        this.city_ = city;

        this.action_ = "Just chilling"; //Just chilling || Attack Merchant || Attack City || Defense || Injured
        this.cityToAttack_ = "";
        this.life_ = "100";
        this.proressBar_ = 100;

    }

    init()  {
        this.gaiaInterval_ = setInterval(() => {

            //ProgressBar
            if (this.proressBar_ < 100) {
                this.proressBar_ = this.proressBar_ + 10;

                if (this.proressBar_ >= 100) {

                    if (this.action_ === "Attack Merchant") {
                        this.cityToAttack_.merchant.attackMerchant();
                    }

                    if (this.action_ === "Attack City"){

                        let defenseTroop = "";

                        this.cityToAttack_.listTroop.forEach(function(troop){
                            if(troop.action === "Defense") {
                                defenseTroop = troop
                            }
                        });

                        if(defenseTroop === ""){
                            this.cityToAttack_.takeCorn(60);
                            this.cityToAttack_.takeGold(30);
                            this.city_.offerCorn(60);
                            this.city_.offerGold(30);
                        } else {
                            if(Math.random() > 0.5){
                                //Attack win
                                this.cityToAttack_.takeCorn(60);
                                this.cityToAttack_.takeGold(30);
                                this.city_.offerCorn(60);
                                this.city_.offerGold(30);
                                defenseTroop.injure();
                            } else {
                                //Attack loose
                                this.killTroop();
                            }
                        }
                    }

                    this.action_ = "Just chilling";
                    this.cityToAttack_ = "";
                    this.proressBar_ = 100;
                }
            }
            //Life
            if (this.life_ >= 0){
                this.life_ = this.life_ - 2;

                if (this.life_ <= 0) {
                    this.killTroop();
                }
            }
        }, this.timeFactor_);
    }

    killTroop() {
        this.life_ = 0;
        clearInterval(this.gaiaInterval_);
    }

    makeAttackOnCity(city){
        if(this.action_ === "Just chilling") {
            this.action_ = "Attack City";
            this.cityToAttack_ = city;
            this.proressBar_ = 0;
        } else {
            console.log("Troop already busy")
        }
    }

    makeAttackOnMerchant(city) {
        if (this.action_ === "Just chilling") {
            this.action_ = "Attack Merchant";
            this.cityToAttack_ = city;
            this.proressBar_ = 0;
        } else {
            console.log("Troop already busy")
        }
    }

    defend() {
        if (this.action_ === "Just chilling") {
            this.action_ = "Defense";
            this.cityToAttack_ = "";
            this.proressBar_ = 0;
        } else {
            console.log("Troop already busy")
        }
    }

    injure() {
        this.action_ = "Injured";
        this.cityToAttack_ = "";
        this.proressBar_ = 0;
    }

    get progressBar() {
        return this.proressBar_;
    }

    get action() {
        return this.action_;
    }

    get cityToAttack() {
        return this.cityToAttack_;
    }

    get life() {
        return this.life_;
    }

    get timeFactor() {
        return this.timeFactor_;
    }
}


module.exports = {Troop};
