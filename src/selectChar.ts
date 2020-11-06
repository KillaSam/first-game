import * as Phaser from "phaser"

export class SelectChar extends Phaser.Scene {
    constructor(){
        super({
            key: 'SelectChar'
        })
    }   

    centerX: number;
    centerY: number;
    currBody: string = '';
    currCloth: string = '';
    currHair: Array<string> = [];
    filled: string;
    item: string;
    form: Phaser.GameObjects.DOMElement;
    arr: Phaser.GameObjects.Sprite;
    reverseArr: Phaser.GameObjects.Sprite;
    body: Phaser.GameObjects.Sprite;
    hairBack: Phaser.GameObjects.Sprite;
    hairFront: Phaser.GameObjects.Sprite;
    cloths: Phaser.GameObjects.Sprite;

    init(data: any): void {
        if(data.newEp){
            this.currBody = '';
            this.currCloth = '';
            this.currHair = [];
        }
        this.centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    }

    preload(): void{
        this.load.image("bg", "https://github.com/KillaSam/first-game/blob/main/assets/ons-lux-party-balcony-7.jpg");
        this.load.image("body1", "https://github.com/KillaSam/first-game/blob/main/assets/MAINHERO/body/1/regular1.png ");
        this.load.image("body2", "https://github.com/KillaSam/first-game/blob/main/assets/MAINHERO/body/3/regular2.png ");
        this.load.image("back1", "https://github.com/KillaSam/first-game/blob/main/assets/MAINHERO/hair/back/back1.png")
        this.load.image("back2", "https://github.com/KillaSam/first-game/blob/main/assets/MAINHERO/hair/back/back2.png")
        this.load.image("front1", "https://github.com/KillaSam/first-game/blob/main/assets/MAINHERO/hair/front/var1.png")
        this.load.image("front2", "https://github.com/KillaSam/first-game/blob/main/assets/MAINHERO/hair/front/var2.png")
        this.load.image("defCloth", "https://github.com/KillaSam/first-game/blob/main/assets/MAINHERO/clothes/regular.png");
        this.load.image("var1", "https://github.com/KillaSam/first-game/blob/main/assets/MAINHERO/clothes/var1.png");
        this.load.image("var2", "https://github.com/KillaSam/first-game/blob/main/assets/MAINHERO/clothes/var2.png");
        this.load.image("arrow", "https://github.com/KillaSam/first-game/blob/main/assets/signs/vector.png");
        this.load.image('view', 'https://github.com/KillaSam/first-game/blob/main/assets/signs/View.png')
        this.load.image("item-choosen", 'https://github.com/KillaSam/first-game/blob/main/assets/signs/Item-choosen.png');
    }

    create(): void{
        if(this.currBody === ''){        
            this.item = "character";    
        } else if(this.currHair.length === 0){
            this.item = "hair"
        } else {
            this.item = "cloths"
        }        
        this.add.image(this.centerX, this.centerY, 'bg').setOrigin(0.5);   
        this.hairBack = this.add.sprite(this.centerX, this.centerY+100, ((this.currHair.length === 0)? "back1" : this.currHair[0])).setOrigin(0.5); 
        this.body = this.add.sprite(this.centerX, this.centerY+100, ((this.currBody === '') ? "body1" : this.currBody)).setOrigin(0.5);                     
        this.cloths = this.add.sprite(this.centerX, this.centerY+100, 'defCloth').setOrigin(0.5);
        this.hairFront = this.add.sprite(this.centerX, this.centerY+100, ((this.currHair.length === 0)? "front1" : this.currHair[1])).setOrigin(0.5); 
        this.arr = this.add.sprite(this.centerX+this.centerX/1.5, this.centerY, "arrow").setOrigin(0.5).setInteractive();
        this.reverseArr = this.add.sprite(this.centerX-this.centerX/1.5, this.centerY, "arrow").setOrigin(0.5).setInteractive();
        this.reverseArr.scale = -1;              
        this.filled = "<div style=\"margin: 0 auto; margin-top: -1px; font-size: 15px; font-weight: bold; line-height: 25px; background-image: url('.\/..\/assets\/signs\/head.png'); width: 120px; height: 25px; color: #FFFFFF\">Choise "+'1/'+((this.currHair.length === 0)? '2' : '3')+'</div>Choose your '+this.item;                
        this.form = this.add.dom(this.centerX, this.centerY+this.centerY/2, 'div', 'line-height: 47px; text-align: center; font-family: "Nunito Sans"; font-size: 20px; font-weight: bold; color: #141A3D; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.12); width : 288px; height: 88px; background-color: rgba(255, 255, 255, 0.8); box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.24); border-radius : 12px;');            
        this.form.setHTML(this.filled);
        const groupButton = this.add.dom(this.centerX, this.cameras.main.height-150, 'div', 'cursor: pointer; width: 216px; height: 42px; background: linear-gradient(180deg, #DB4186 0%, #C6236A 100%); border-radius: 30px; box-sizing: border-box; border: 2px solid #D34E7E; font-size: 15px; font-weight: bold; line-height: 35px; color: #FFFFFF; font-family: \'Nunito Sans\'; text-align: center; box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.24);', 'Confirm').setInteractive();
        const downButton = this.add.image(this.centerX+130, this.cameras.main.height-148, 'view');
        const changeBody = () => {
            if(this.currBody === ''){
                if(this.body.texture.key === "body1"){
                    this.body.setTexture("body2")
                    this.filled = "<div style=\"margin: 0 auto; margin-top: -1px; font-size: 15px; font-weight: bold; line-height: 25px; background-image: url('.\/..\/assets\/signs\/head.png'); width: 120px; height: 25px; color: #FFFFFF\">Choise "+((this.body.texture.key === "body1") ? '1' : '2')+'/2</div>Choose your '+this.item;        
                } else {
                    this.body.setTexture("body1")
                    this.filled = "<div style=\"margin: 0 auto; margin-top: -1px; font-size: 15px; font-weight: bold; line-height: 25px; background-image: url('.\/..\/assets\/signs\/head.png'); width: 120px; height: 25px; color: #FFFFFF\">Choise "+((this.body.texture.key === "body1") ? '1' : '2')+'/2</div>Choose your '+this.item;        
                }
            } else if(this.currHair.length === 0){
                if(this.hairFront.texture.key === "front1"){
                    this.hairFront.setTexture("front2");
                    this.hairBack.setTexture("back2")
                    this.filled = "<div style=\"margin: 0 auto; margin-top: -1px; font-size: 15px; font-weight: bold; line-height: 25px; background-image: url('.\/..\/assets\/signs\/head.png'); width: 120px; height: 25px; color: #FFFFFF\">Choise "+((this.hairFront.texture.key === "front1") ? '1' : '2')+'/2</div>Choose your '+this.item;        
                } else {
                    this.hairFront.setTexture("front1");
                    this.hairBack.setTexture('back1');
                    this.filled = "<div style=\"margin: 0 auto; margin-top: -1px; font-size: 15px; font-weight: bold; line-height: 25px; background-image: url('.\/..\/assets\/signs\/head.png'); width: 120px; height: 25px; color: #FFFFFF\">Choise "+((this.hairFront.texture.key === "front1") ? '1' : '2')+'/2</div>Choose your '+this.item;        
                }
            } else {

                if(this.cloths.texture.key === "defCloth"){
                    this.cloths.setTexture("var1")
                    this.filled = "<div style=\"margin: 0 auto; margin-top: -1px; font-size: 15px; font-weight: bold; line-height: 25px; background-image: url('.\/..\/assets\/signs\/head.png'); width: 120px; height: 25px; color: #FFFFFF\">Choise "+2+'/3</div>Choose your '+this.item;        
                } else if(this.cloths.texture.key === "var1"){
                    this.cloths.setTexture("var2")
                    this.filled = "<div style=\"margin: 0 auto; margin-top: -1px; font-size: 15px; font-weight: bold; line-height: 25px; background-image: url('.\/..\/assets\/signs\/head.png'); width: 120px; height: 25px; color: #FFFFFF\">Choise "+3+'/3</div>Choose your '+this.item;        
                } else {
                    this.cloths.setTexture("defCloth")
                    this.filled = "<div style=\"margin: 0 auto; margin-top: -1px; font-size: 15px; font-weight: bold; line-height: 25px; background-image: url('.\/..\/assets\/signs\/head.png'); width: 120px; height: 25px; color: #FFFFFF\">Choise "+1+'/3</div>Choose your '+this.item;        
                }
            }
        }     
        const nextItem = () => {
            if(this.currBody === ''){
                this.currBody = this.body.texture.key;
            } else if (this.currHair.length === 0){
                this.currHair.push(this.hairBack.texture.key);
                this.currHair.push(this.hairFront.texture.key);
            } else {
                this.currCloth = this.cloths.texture.key;
            }
            this.form.destroy();
            groupButton.destroy();
            downButton.destroy();
            this.arr.destroy();
            this.reverseArr.destroy();
            const pop = this.add.sprite(this.centerX, 0, 'item-choosen').setInteractive();
            pop.scale = 0.5;
            const text = this.add.dom(this.centerX, 15, 'div', 'font-family: \'Nunito Sans\'; font-size: 16px; text-align: center; line-height: 40px; color: #FFFFFF', 'ITEM CHOOSEN');                                                
            this.add.tween({
                targets: text,
                duration: 500,
                completeDelay: 500,
                alpha: {from: 0, to: 1},          
                onComplete: () => {
                    if(this.currBody !== '' && this.currHair.length !== 0 && this.currCloth !== ''){
                        this.textures.remove('arrow');
                        this.scene.start("DialogSys", {cloths: this.currCloth, hair: this.currHair, body: this.currBody})
                    } else {
                        this.scene.start("SelectChar", { newEp: false });
                    }                    
                }      
            })                        
        }   
        groupButton.on('pointerup', nextItem);
        this.arr.on('pointerup', changeBody)   
        this.reverseArr.on('pointerup', changeBody);                
    }

    

    update(): void{             
        this.form.setHTML(this.filled);
    }
}