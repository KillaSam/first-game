import * as Phaser from "phaser"

export class DialogSys extends Phaser.Scene {
    constructor(){
        super({
            key: "DialogSys"
        })
    }
    
    centerX: number;
    centerY: number;
    body: string;
    cloth: string;
    hair: Array<string>;
    currIdOfScene: string;
    currScene: any;
    json: Array<any>;
    bg: Phaser.GameObjects.Image;
    mood: Phaser.GameObjects.Image;
    middleIn: string;    
    middleOut: string;
    background: Phaser.GameObjects.Image;
    isPrevLeft: boolean = false;    
    layout: Phaser.GameObjects.Sprite;
    layout2: Phaser.GameObjects.Sprite;
    body2: Phaser.GameObjects.Image;
    cloth2: Phaser.GameObjects.Image;
    hairBack: Phaser.GameObjects.Image;
    hairFront: Phaser.GameObjects.Image;
    emot: Phaser.GameObjects.Image;
    text: Phaser.GameObjects.DOMElement;
    name: Phaser.GameObjects.DOMElement;
 
    init(data: any) {
        this.centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.body = data.body;
        this.cloth = data.cloths;
        this.hair = data.hair;    
        this.json = require('./ons2.json');
        this.middleOut = "<div style='display: flex; justify-content: center; align-items: center; background: linear-gradient(132.91deg, rgba(255, 255, 255, 0.09) 31.51%, rgba(255, 255, 255, 0) 42.57%), #C62D6E; width: 332px; height: 124px; border: 2px solid #DC4D81; box-sizing: border-box; border-radius: 20px;'>"
        this.middleIn = "<div style=\"display: flex; justify-content: center; align-items: center; background-color: #FFFFFF; width: 312px; height: 105px; box-sizing: border-box; box-shadow: 0 4px 12px rgba(0, 0, 0, .12); border-radius: 14px;\"><p style=\"font-size: 18px; text-align: center; line-height: 22px; color: #141A3D; font-family: 'Nunito Sans'; \">";        
        if(typeof this.currIdOfScene === 'undefined'){
            this.currIdOfScene = '0';
        }
        this.json.forEach(element => {
            if(element.id === this.currIdOfScene){
                this.currScene = element
            }
        });        
    }

    preload() {     
        this.load.image('close', './../assets/signs/Close.png')   
        if(this.currScene.type === "background"){
            this.textures.remove('bg');
            const fileName = this.currScene.backgroundName.split('_');            
            this.load.image('bg', './../assets/'+fileName[1]+'.jpg');            
        } else if(this.currScene.type === "right" || this.currScene.type === 'left'){                  
            this.load.image('Russell_body', './../assets/Russell/1/body.png');
            this.load.image('Russell_cloths', './../assets/Russell/1/cloths.png');
            this.load.image('Russell_back_hair', './../assets/Russell/1/hair/back.png');
            this.load.image('Russell_front_hair', './../assets/Russell/1/hair/front.png');
            this.load.image('emotion', './../assets/'+this.currScene.character+'/'+(this.body === 'body1' ? '1': (this.currScene.character==="Russell" ? '1' : '2'))+'/'+this.currScene.emotion+'.png')                            
            this.load.image('emotion_layout', './../assets/layout_emotions/'+this.currScene.emotion+'.png');
            this.load.image('dialogWindow', './../assets/boxTypes/'+this.currScene.boxType+'.png');
            if(this.currScene.boxType === "thought"){
                this.load.image('dialogWindow-1', './../assets/boxTypes/'+this.currScene.boxType+'-1.png');
            }
            
        }

    }

    create(){        
        this.background = this.add.image((this.isPrevLeft? this.centerX+50 : this.centerX), this.centerY, 'bg');
        const closeButton = this.add.sprite(100, 100, 'close').setInteractive();
        closeButton.on('pointerup', () => {
            this.background.destroy()
            closeButton.destroy();
            this.hairBack.destroy();
            this.hairFront.destroy();
            this.body2.destroy();
            this.cloth2.destroy();
            this.emot.destroy();
            this.text.destroy()
            this.name.destroy();
            this.currIdOfScene = '0';
            this.textures.removeKey('bg');
            this.scene.start("SelectChar", { newEp: true })
        })
        if(this.currScene.type === 'middle'){            
            const middleText = this.add.dom(this.centerX, this.centerY, 'div')
            const middleHTML = this.middleOut+this.middleIn+'</p></div></div>'
            const text = this.add.dom(this.centerX, this.centerY, 'p', 'width: 312px; font-family: "Nunito Sans"; font-size: 18px; color: #141A3D; line-height: 22px; margin: 0; text-align: center;', this.currScene.text)
            middleText.setHTML(middleHTML);
            this.tweens.add({
                targets: text,
                alpha: {from: 0, to: 1},
                duration: 2000,
                onComplete: () => {
                }
            })
        } else if(this.currScene.type === 'left' || this.currScene.type === "right"){            
            this.createPerson(0.3, (this.currScene.type === "right" ? true : false));
            this.tweens.add({                    
                targets: this.background,
                x: (this.currScene.type === "right" ? this.centerX-50: this.centerX+50),
                duration: 250,                    
                onComplete: () => {
                    this.isPrevLeft = !this.isPrevLeft;
                    const dialog = this.add.image((this.currScene.type === "right" ? this.centerX+60 : this.centerX-60), (this.currScene.boxType === "thought" ? this.centerY-46 : this.centerY-30), 'dialogWindow');
                    dialog.setFlipX(this.currScene.type === "right")
                    if(this.currScene.boxType === "thought") {
                        const dialog2 = this.add.image((this.currScene.type === "right" ? this.centerX+60 : this.centerX-60), this.centerY-27, 'dialogWindow-1');
                        dialog2.setFlipX(this.currScene.type === "right");
                    }
                    this.name = this.add.dom((this.currScene.type === "right" ? this.centerX-1 : this.centerX+1), this.centerY-100, 'p', 'font-family: "Nunito Sans"; color: #FFFFFF; font-size: 20px; line-height: 25px;', this.currScene.character);
                    this.text = this.add.dom((this.currScene.type === "right" ? this.centerX+60 : this.centerX-60), this.centerY-20, 'p', 'width: 312px; font-family: "Nunito Sans"; font-size: 18px; color: #141A3D; line-height: 22px; margin: 0; text-align: center;', this.currScene.text)
                    this.tweens.add({
                            targets: this.text,
                            alpha: {from: 0, to: 1},                        
                            duration: 250,
                            onComplete: () => {         
                                this.textures.removeKey('emotion');
                                this.textures.removeKey('emotion_layout');
                                this.textures.removeKey('dialogWindow');
                            }
                    })         
                }
            })                
        }
        this.input.on('pointerup', () => {
            this.textures.removeKey('emotion');
            this.currIdOfScene = this.currScene.nextId;
            this.scene.start('DialogSys')
        })
    }    
    createPerson(scaling: number, isRight: boolean) {        
        this.layout = this.add.sprite((isRight? this.centerX+120 : this.centerX-120), this.centerY-150, 'emotion_layout');
        this.layout.scale = scaling;        
        this.layout.setFlipX(isRight);
        this.hairBack = this.add.image((isRight? this.centerX+120 : this.centerX-120), this.centerY-100, (this.currScene.character==="Russell" ? 'Russell_back_hair' : this.hair[0]));        
        this.hairBack.scale = scaling;
        this.hairBack.setFlipX(isRight);
        this.body2 = this.add.image((isRight? this.centerX+120 : this.centerX-120), this.centerY-100, (this.currScene.character==="Russell" ? 'Russell_body' : this.body));
        this.body2.scale = scaling;
        this.body2.setFlipX(isRight);
        this.layout2 = this.add.sprite((isRight? this.centerX+120 : this.centerX-120), this.centerY-158, 'emotion_layout').setVisible(false);
        this.layout2.scale = scaling;
        this.layout2.setFlipX(isRight);
        const mask = this.layout2.createBitmapMask();
        this.body2.setMask(mask);        
        this.cloth2 = this.add.image((isRight? this.centerX+120 : this.centerX-120), this.centerY-100, (this.currScene.character==="Russell" ? 'Russell_cloths' : this.cloth));
        this.cloth2.scale = scaling;
        this.cloth2.setFlipX(isRight);
        this.cloth2.setMask(mask);
        this.emot = this.add.image((isRight? this.centerX+120 : this.centerX-120), this.centerY-100, 'emotion');
        this.emot.scale = scaling;
        this.emot.setFlipX(isRight);
        this.hairFront = this.add.image((isRight? this.centerX+120 : this.centerX-120), this.centerY-100, (this.currScene.character==="Russell" ? 'Russell_front_hair' : this.hair[1]));
        this.hairFront.scale = scaling;
        this.hairFront.setFlipX(isRight);
    }
}