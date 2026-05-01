const WIDTH = 1024;
const HEIGHT = 768;

class Game extends Phaser.Scene {
    constructor() {
        super('Game');
        this.ball=null;
        this.paddle=null;
        this.count=0;
        this.block = null;
        this.counttext=null;
        this.reset=null;
    }

    preload() {
        this.load.image("ball", "public/assets/ball.png");
        this.load.image("background", "public/assets/background.png");
        this.load.image("paddle", "public/assets/paddle.png");
        this.load.audio('bgm', 'public/sound/1.wav');
        this.load.audio('gbm', 'public/sound/2.wav');
    }

    create() {
        this.ball=this.physics.add.image(WIDTH/2,650,'ball').setScale(.05,.05).refreshBody();
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1,1);
        this.ball.setVelocity(0,0);
        this.paddle=this.physics.add.image(WIDTH/2,700,'paddle').setScale(10,0.15);
        this.paddle.setImmovable(true);
        this.input.keyboard.on('keydown-SPACE',this.startball,this);
        this.cursors=this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.ball, this.paddle, this.hitpaddle, null, this);
        this.block = this.physics.add.group();
        for(let j =0;j<5;j++){
        for(let i =0;i<9;i++){
        let b=this.block.create(100*i+70, 80*j+100, 'paddle').setScale(5.5,0.5).refreshBody();
        b.setOrigin(0, 0);
        b.setImmovable(true)
        this.counttext=this.add.text(0,0," ",{
            fontSize:"70px"
        })
        }
    }
        this.physics.add.collider(this.ball, this.block , this.kill, null, this);
    }

    update() {
        if(this.cursors.left.isDown&&this.paddle.x>=0){
            this.paddle.x-=10;
        } else if(this.cursors.right.isDown&&this.paddle.x<=WIDTH){
            this.paddle.x+=10;
        }     
        if (this.block.countActive(true)==0&&this.ballInMotion==true){
        for(let j=0;j<5;j++){
        for(let i=0;i<9;i++){
        let b=this.block.create(100*i+105, 80*j+75, 'paddle').setScale(5.5,0.5).refreshBody();
        b.setOrigin(0, 0);
        b.setImmovable(true)
        }
    }
        }else{
            this.count=this.block.countActive(false)
        }
        if(this.ball.y>720){
            this.ball.disableBody(true,true)
            this.sound.play("gbm")
            this.ball.setY(0)
            this.block.clear(true,true)
            this.ballInMotion=false
        }else{
            this.counttext.setText(this.block.countActive(false))
            
        }
    }
    startball(){
    if(!this.ballInMotion){
        let initialVelocityX = 300*(Phaser.Math.Between(0,1) ? 1 : -1);
        let initialVelocityY = 300*(Phaser.Math.Between(0,1) ? 1 : -1);
        this.ball.setVelocity(initialVelocityX,300);
        this.ballInMotion=true
        
    }
}
hitpaddle(ball,paddle){
      let Velocityfactor=1;
      let newVelocityX=ball.body.velocity.x*Velocityfactor
      let newVelocityY=ball.body.velocity.y*Velocityfactor
      let angdeg=Phaser.Math.Between(-20,20)
      let angrad=Phaser.Math.DegToRad(angdeg)
      let newVelocity=new Phaser.Math.Vector2(newVelocityX,newVelocityY).rotate(angrad)
      ball.setVelocity(newVelocity.x,newVelocity.y)
      this.sound.play('bgm');
    }
kill(ball,block){
    block.disableBody(true,true)
    let Velocityfactor=1 ;
    let newVelocityX=ball.body.velocity.x*Velocityfactor
    let newVelocityY=ball.body.velocity.y*Velocityfactor
    let angdeg=Phaser.Math.Between(-20,20)
    let angrad=Phaser.Math.DegToRad(angdeg)
    let newVelocity=new Phaser.Math.Vector2(newVelocityX,newVelocityY).rotate(angrad)
    ball.setVelocity(newVelocity.x,newVelocity.y)
    this.sound.play('bgm');

}

}