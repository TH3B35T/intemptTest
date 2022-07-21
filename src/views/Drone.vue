<template>
  <v-app>
    <v-main id="body">
      <div class="drone" id="drone">
        <div class="wings"></div>
        <div class="leftspinner"></div>
        <div class="camera"></div>
        <div class="rightspinner"></div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
   data: () => ({
      Steps:150,
       dLeft:null,
       dTop:null,
       sWidth:null,
       sHeight:null,
   }),
  async mounted() {
    document.title = this.$route.meta.title;
    this.sWidth = window.innerWidth/2- 50 ;
    this.dLeft = 0 ;
    this.sHeight = window.innerHeight/2- 50;
    this.dTop = 0;

        /////////////////////////
        
        var anim;
        var item = document.getElementById('drone');


/////////////////////////
    document.addEventListener("keyup", (event) =>{
    event.preventDefault();
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    switch (key) { // change to event.key to key to use the above variable
        case "ArrowLeft":
        // Left pressed
        if(this.Steps+50<this.dLeft+this.sWidth ){
        this.dLeft=this.myMoveLeft(this.dLeft,this.dTop,item)
        }
        break;
        case "ArrowRight":
        // Right pressed
        if(this.dLeft+this.sWidth< this.sWidth*2 -this.Steps ){
        this.dLeft=this.myMoveRight(this.dLeft,this.dTop,item)
        }
        break;
        case "ArrowUp":
        // Up pressed
        if(this.Steps< this.dTop+this.sHeight ){
         this.dTop=  this.myMoveUp(this.dLeft,this.dTop,item)
        }
        break;
        case "ArrowDown":
        // Down pressed
        if(this.dTop+this.sHeight <this.sHeight*2 - this.Steps){
        this.dTop=  this.myMoveDown(this.dLeft,this.dTop,item)
          }
        break;
        }
    });
  },
  methods:{
    log(event){
    console.log( event.type );
    },
     myMoveLeft(x,y,item){

      let anim=item.animate([
      // keyframes
      { transform: `translate(${x}px, ${y}px) rotate(0deg)` }, 
      { transform: `translate(${x-this.Steps}px, ${y}px) rotate(-15deg)` }, 
      { transform: `translate(${x-this.Steps}px, ${y}px) rotate(0deg)` }, 
      ], {
     duration: 1000,
     iterations: 1,
     fill: 'forwards'
  });
   return (x -= this.Steps)
},
     myMoveRight(x,y,item){
      let anim=item.animate([
      // keyframes
      { transform: `translate(${x}px, ${y}px) rotate(0deg)` }, 
      { transform: `translate(${x+this.Steps}px, ${y}px) rotate(+15deg)` }, 
      { transform: `translate(${x+this.Steps}px, ${y}px) rotate(0deg)` }, 
      ], {
     duration: 1000,
     iterations: 1,
     fill: 'forwards'
  });
   return (x += this.Steps)
},
     myMoveUp(x,y,item){
      let anim=item.animate([
      // keyframes
      { transform: `translate(${x}px, ${y}px) rotate(0deg)` }, 
      { transform: `translate(${x}px, ${y-this.Steps}px) rotate(0deg)` }, 
      ], {
     duration: 1000,
     iterations: 1,
     fill: 'forwards'
  });
   return (y -= this.Steps)
},
     myMoveDown(x,y,item){
      let anim=item.animate([
      // keyframes
      { transform: `translate(${x}px, ${y}px) rotate(0deg)` }, 
      { transform: `translate(${x}px, ${y+this.Steps}px) rotate(0deg)` }, 
      ], {
     duration: 1000,
     iterations: 1,
     fill: 'forwards'
  });
   return (y += this.Steps)
},
  },
};
</script>

<style>
#body {
  height: 100vh;
  width: 100vw;
  background-color: darkgreen;
}
.drone {
  position: absolute;
  top: 50vh;
  left: 50vw;
  margin-left: -50px;
  margin-top: -50px;
  border-radius: 50%;
  background-color: black;
  animation-fill-mode: forwards;
  /* animation: lefttoright 8s infinite alternate linear; */
  z-index: 99;
}
.camera {
  position: absolute;
  height: 30px;
  width: 30px;
  background-color: black;
  border-radius: 50%;
  left: 25px;
  top: 10px;
  z-index: 5;
}
.camera::before {
  position: absolute;
  content: "";
  height: 10px;
  width: 150px;
  background-color: #ff3838;
  border-radius: 1rem;
  top: 30px;
  left: -60px;
  z-index: 5;
}
.camera::after {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  border-radius: 50%;
  top: 7.5px;
  left: 7.5px;
  z-index: 5;
}
.wings {
  position: absolute;
  width: 200px;
  height: 20px;
  background-color: black;
  border-radius: 1rem;
  left: -60px;
  top: 40px;
}
.wings::before {
  position: absolute;
  content: "";
  width: 10px;
  height: 50px;
  background-color: black;
  border-radius: 1rem;
  left: 50px;
  top: 10px;
  transform: rotate(30deg);
}
.wings::after {
  position: absolute;
  content: "";
  width: 10px;
  height: 50px;
  background-color: black;
  border-radius: 1rem;
  left: 144px;
  top: 10px;
  transform: rotate(-30deg);
}
.leftspinner {
  position: absolute;
  left: -35px;
  top: 20px;
  height: 20px;
  width: 15px;
  background-color: black;
  border-radius: 1rem 1rem 0 0;
}
.leftspinner::before {
  position: absolute;
  content: "";
  top: -10px;
  left: 4px;
  height: 20px;
  width: 6px;
  background-color: black;
  border-radius: 1rem 1rem 0 0;
}
.leftspinner::after {
  position: absolute;
  content: "";
  top: -7.5px;
  left: -22.5px;
  height: 4px;
  width: 60px;
  background-color: black;
  border-radius: 3rem;
  animation: spinwing 1s infinite linear;
}
.rightspinner {
  position: absolute;
  left: 100px;
  top: 20px;
  height: 20px;
  width: 15px;
  background-color: black;
  border-radius: 1rem 1rem 0 0;
}
.rightspinner::before {
  position: absolute;
  content: "";
  top: -10px;
  left: 4px;
  height: 20px;
  width: 6px;
  background-color: black;
  border-radius: 1rem 1rem 0 0;
}
.rightspinner::after {
  position: absolute;
  content: "";
  top: -7.5px;
  left: -22.5px;
  height: 4px;
  width: 60px;
  background-color: black;
  border-radius: 3rem;
  animation: spinwing 1s infinite linear;
}
.drone::before {
  position: absolute;
  content: "";
  height: 40px;
  width: 80px;
  border-radius: 90px 90px 0 0;
  background: #ff3838;
}
.drone::after {
  position: absolute;
  content: "";
  top: -6px;
  left: 10px;
  height: 60px;
  width: 60px;
  background-color: #ff3838;
  border-radius: 50%;
}
/*  */
#drone {

  width: 80px;
  height: 80px;
  animation-fill-mode: forwards;
  /* animation-duration: 1000ms;
  animation-delay: 0ms;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-iteration-count: infinite; */
}

@keyframes flyRight {
  0% {transform:translate(0px, 0px) scale(1) rotate(0deg) }
  50% {transform:translate(50px, 0px) scale(1) rotate(+25deg) }
  100% {transform:translate(100px, 0px) scale(1) rotate(0deg) }
}
/*  */
@keyframes spinwing {
  to {
    transform: rotateY(0deg);
  }
  from {
    transform: rotateY(720deg);
  }
}
</style>
