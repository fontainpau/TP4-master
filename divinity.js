const EventEmitter = require('events');
const {Merchant} = require('./merchant');
const {Troop} = require('./troop');


class Divinity {
  constructor(name, timeFactor) {
    this.name_ = name || 'UNKDIVINITY';
    this.corn_ = 100;
    this.gold_ = 100;
    this.listTroop_ = [];
    this.merchant_ = "";
    this.worldEvents_ = new EventEmitter();
    this.timeFactor_ = timeFactor || 1000;
  }

  init() {
    this.gaiaInterval_ = setInterval(() => {

      if(this.gold_ > 0) {

          this.corn_ = this.corn_ + 2;
          this.gold_ = this.gold_ + 1;

          for (let i = this.listTroop.length - 1; i >= 0; i--) {
              if (this.listTroop[i].life === 0) {
                  this.listTroop.splice(i, 1)
              }
          }

      } else {
        this.endWorld();
      }
    }, this.timeFactor);
  }

  get corn() {
    return this.corn_;
  }

  get gold() {
    return this.gold_;
  }

  get worldEvents() {
    return this.worldEvents_;
  }

  get name() {
    return this.name_;
  }

  get timeFactor() {
    return this.timeFactor_;
  }

  get merchant() {
    return this.merchant_;
  }

  get listTroop() {
    return this.listTroop_;
  }

  buyMerchant(){
      if(this.gold_ !== 0) {

          if (this.merchant_ === "") {
              this.merchant_ = new Merchant(this.timeFactor_, this);
              this.merchant_.init();
              this.gold_ = this.gold_ - 50;
          } else {
              console.log("You already own a merchant")
          }
      }
  }

  buyTroop(){
      if(this.gold_ !== 0) {

          if (this.listTroop_.length <= 3) {
              let troop = new Troop(this.timeFactor_, this);
              troop.init();
              this.listTroop_.push(troop);
              this.gold_ = this.gold_ - 50;
          } else {
              console.log("You can't have more than 3 troops")
          }
      }
  }

  offerCorn(number){
    this.corn_ += number;
  }

  takeCorn(number){
    this.corn_ -= number;
  }

  offerGold(number){
    this.gold_ += number;
  }

  takeGold(number){
    this.gold_ -= number;
  }

  endWorld() {
    clearInterval(this.gaiaInterval_);
    this.listTroop_ = [];
    this.merchant_ = "";
    this.gold_ = 0;
    this.corn_ = 0;
  }
}

module.exports = {Divinity};
