let game = document.querySelector(".game");
let movement = 5;

class Player{

  constructor(){
    this.left = 0
    this.bottom = 100
    this.visual = document.createElement("div")
    const visual = this.visual
    visual.classList.add("player")
    visual.style.bottom = this.bottom + "px"
    visual.style.left = this.left + "px"
    game.appendChild(visual);
  }

  movePlayer(){
    let moveId = setInterval(document.addEventListener("keydown",(e)=>{
      if(e.keyCode == 65){
        // A == 65
        this.left -= 10;
        this.visual.style.left = this.left + "px";
        if(this.left <= -10){
          this.left = 580;
          this.visual.style.left = this.left  + "px";
        }
      }
      else if(e.keyCode == 68){
        // D == 68
        this.left += 10;
        this.visual.style.left = this.left + "px";
        if(this.left >= 620){
          this.left = 0;
          this.visual.style.left = this.left + "px";
        }
      }
      else if(e.keyCode == 83){
        // S == 83
        this.shot();
      }
    }),200);
  }

  shot(){
    // console.log("PEW PEW PEW PEW");
    let missile = new Missile(162,this.left);
    missile.moveMissile();
  }
}


class Missile{
  constructor(up,left){
    this.left = left
    this.bottom = up;
    this.visual = document.createElement("div");
    const visual = this.visual
    visual.classList.add("missile");
    visual.style.bottom = this.bottom + "px"
    visual.style.left = this.left + "px"
    game.appendChild(visual);
  }

  moveMissile(){
    let missileId = setInterval(()=>{
      this.bottom += 10;
      this.visual.style.bottom = this.bottom + "px";

      if(this.bottom >= 600){
        game.removeChild(this.visual);
        clearInterval(missileId);
      }
      //540 -32   540+32 i create an hitbox
      else if((this.bottom >= 508 && this.bottom <= 572)&&((this.left <= enemy.left + 32) && (this.left >= enemy.left-32))){
        game.removeChild(this.visual);
        clearInterval(missileId);
        clearInterval(enemyId);
        game.removeChild(enemy.visual);

      }
    },60)
  }
}

class Enemy{
  constructor(bottomPos){
    this.bottom = bottomPos
    this.left = Math.floor(Math.random() * 540)
    this.visual = document.createElement("div");
    const visual = this.visual
    visual.classList.add("enemy")
    visual.style.left  = this.left + "px"
    visual.style.bottom = this.bottom + "px"
    game.appendChild(visual)
  }
  moveEnemy(){
    let enemyId = setInterval(()=>{
      this.left += movement;
      this.visual.style.left = this.left + "px";
      if(this.left >= 620 || this.left <= -10){
        movement = -movement;
      }
    },60);
  }
}

let player = new Player();
player.movePlayer();
let enemy = new Enemy(540);
let enemyId = enemy.moveEnemy();
