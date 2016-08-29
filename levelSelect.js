Main.LevelSelect = function (game) 
{
    this.game = game;
};

Main.LevelSelect.prototype = 
{
    bg: Phaser.Sprite,
    titletext: Phaser.Sprite,
    logo: Phaser.Sprite,
    caption: Phaser.Sprite,
    group: Phaser.Group,
    choice: [Phaser.Button, Phaser.Button, Phaser.Button, Phaser.Button, Phaser.Button, Phaser.Button, Phaser.Button, Phaser.Button, Phaser.Button, Phaser.Button, Phaser.Button],
    magLab: Phaser.Text,
    descLab: Phaser.Text,
    incrBut: Phaser.Button,
    decrBut: Phaser.Button,
    levelsLab: Phaser.Text,
    instrLab1: Phaser.Text,
    instrLab2: Phaser.Text,
    instrLab3: Phaser.Text,
    instrTitle: Phaser.Text,


    //lvl1: Phaser.Button,

    create: function () 
    {
        var y_off = 120;         
        Main.counter = 0;

        this.group = this.game.add.group();
        this.group.alpha = 1.0;
        
        this.bg = this.game.add.sprite(0, 0, 'bg');
        this.bg.alpha=1.0;
        this.group.add(this.bg);

        var name = 0;
        var init_val = 3.0;
        var style = { font:'24px \'Arial Rounded MT Bold\'', fill:'#2140B0', align: 'left' };
        var bigstyle = { font:'32px \'Arial Rounded MT Bold\'', fill:'#2140B0', align: 'left' };
        var smallstyle = { font:'24px \'Arial Rounded MT Bold\'', fill:'#000000', align: 'left' };

        var stylered = { font:'24px \'Arial Rounded MT Bold\'', fill:'#FF0000', align: 'left' };
        var stylegreen = { font:'24px \'Arial Rounded MT Bold\'', fill:'#009900', align: 'left' };
        var styleblue = { font:'24px \'Arial Rounded MT Bold\'', fill:'#0000FF', align: 'left' };

        var mobile = 1;
        if(this.game.device.iOS || this.game.device.android)
        {
            mobile = 1;
        }
        else
        {
            mobile = 0;
        }


        this.titletext = this.game.add.sprite(130, 00, 'title');
        this.logo = this.game.add.sprite(60, 40, 'logo');
        this.logo.scale = {x: 0.5, y: 0.5};

        if(mobile == 1){

            this.instrTitle = this.game.add.text(40, 70 + y_off, 'Instructions', bigstyle); // 230, 210

            this.instrLab2 = this.game.add.text(40, 100 + y_off, '* Fix your phone to portrait mode');
            this.game.add.text(40, 130 + y_off, '  - on iPhone swipe up to the control center', smallstyle);
            this.game.add.text(40, 160 + y_off, '  - on Android go to settings', smallstyle); // 230, 210
           
            this.instrLab1 = this.game.add.text(40, 190 + y_off, '* Guide the ball to the flag; avoid the holes'); // 230, 210
            
            this.instrLab3 = this.game.add.text(40, 220 + y_off, '* Each level will be repeated three times');
                             this.game.add.text(40, 250 + y_off, '  with different settings:'); // 230, 210
                             this.game.add.text(40, 280 + y_off, '  Setting A, ', stylered);
                             this.game.add.text(160, 280 + y_off, ' Setting B, ', stylegreen);
                             this.game.add.text(280, 280 + y_off, ' Setting C', styleblue);
                             this.game.add.text(40, 310 + y_off, '  At the end of each level, you will be asked');
                             this.game.add.text(40, 340 + y_off, '  to rate the difficulty of each setting.');

            this.levelsLab = this.game.add.text(80, 395 + y_off, 'Levels in Increasing Order of Hardness', style); // 230, 210


            var bigstylered = { font:'32px \'Arial Rounded MT Bold\'', fill:'#990000', align: 'left' };
            var stylered = { font:'24px \'Arial Rounded MT Bold\'', fill:'#990000', align: 'left' };

            if(Main.lastLevel >= 5){
                this.game.add.text(40, 700 + y_off, 'Congratuations!  You beat the game!', bigstylered);
                this.game.add.text(50, 740 + y_off, 'Thanks for playing through all the levels', stylered);

            }
            


            /*
            //this.magLab = this.game.add.text(230, 310, 'Noise/Quantization Level:'); // 230, 210
            this.magLab = this.game.add.text(120, 250, 'Noise/Quantization Level:'); // 230, 210

            //MAGNITUDE LABEL
            this.magLab = this.game.add.text(230, 350, String(name)); //230, 250
            this.magLab.setText('5');

            var init_val = 3.0;
            this.magLab.name = init_val;
            name = init_val;
            this.magLab.setText(String(name));
            */

            Main.noiseVal = init_val;

            //0 1 2 3 4 are choices

            //PASSING IN VALUE BUTTON
            this.choice[8] = this.game.add.button(0, 0, 'setting' + (1));
            this.choice[8].name = init_val;
            this.choice[8].alpha=0.0;
            this.choice[8].input.stop();
            this.choice[8].scale = {x: 0.0, y: 0.0};

            //INCREMENT BUTTON
            this.choice[9] = this.game.add.button(120, 290, 'increment'); //120, 170
            this.choice[9].scale = {x: 0.65, y: 0.65};
            this.choice[9].name = 1;
            this.choice[9].alpha=0.0;
            this.choice[9].input.stop();
            this.choice[9].onInputDown.add(this.incrementMag, this.magLab);

            //this.incrBut.onInputUp.add(this.incrementMag, this.incrBut);
            //DECREMENT BUTTON
            this.choice[10] = this.game.add.button(120, 390, 'decrement'); //120, 270
            this.choice[10].scale = {x: 0.65, y: 0.65};
            this.choice[10].name = 1;
            this.choice[10].alpha=0.0;
            this.choice[10].input.stop();
            this.choice[10].onInputDown.add(this.decrementMag, this.magLab);

            for(var i = 0; i < 5; i++)
            {
                
                var lvl = this.game.add.button(190+i*130-Math.floor(i/3)*390, 490+Math.floor(i/3)*130 + y_off, 'lvl' + (i+1));
                lvl.scale = {x: 0.5, y: 0.5};
                lvl.anchor = {x: 0.5, y: 0.5};
                lvl.orgWidth = 100;
                lvl.orgHeight = 100;
                lvl.name = i;
                
                lvl.onInputDown.add(this.buttonDown, lvl);
                lvl.onInputUp.add(this.playGame, lvl);
                //this.input.onUp.add(this.buttonUp, lvl);
                
                /*
                if(Main.progress.length >=  0)// i)
                {
                     lvl.onInputDown.add(this.buttonDown, lvl);
                     lvl.onInputUp.add(this.playGame, lvl);
                     this.input.onUp.add(this.buttonUp, lvl);   
                }
                else
                {
                     lvl.alpha = 0.5;;
                     lvl.input.stop();
                }
                */
                lvl.alpha=1.0;
                
                if(i > Main.lastLevel){
                    lvl.alpha=0.5;
                    lvl.input.stop();
                }
                this.group.add(lvl);
            }

            
            
            
            
            for(var i = 0; i < 7; i++)
            {
                //this.choice[i] = this.game.add.button(170+i*150-Math.floor(i/3)*(150 * 3), 100+Math.floor(i/3)*100, 'setting' + (i+1));
                this.choice[i] = this.game.add.button(130+i*140-Math.floor(i/4)*(120 * 4), 100+Math.floor(i/4)*80, 'setting' + (i+1));
                //this.choice[i] = this.game.add.button(60+i*130-Math.floor(i/5)*390, 100, 'setting' + (i+1));
                this.choice[i].scale = {x: 0.625, y: 0.625};
                this.choice[i].anchor = {x: 0.625, y: 0.625};
                this.choice[i].orgWidth = 100;
                this.choice[i].orgHeight = 100;
                this.choice[i].name = i;
                
                this.choice[i].onInputDown.add(this.buttonDown, this.choice[i]);
                this.choice[i].onInputUp.add(this.makeChoice, this.choice[i]);
                
                //this.choice[i].alpha=1.0;
                this.choice[i].alpha=0.0;
                this.choice[i].input.stop();
                this.group.add(this.choice[i]);
            }
            
           
            /* 
            this.exitButton = this.game.add.button(320,850, 'exit');
            this.exitButton.scale = {x: 0.75, y: 0.75};
            this.exitButton.anchor = {x: 0.5, y: 0.5};
            this.exitButton.orgWidth = 128*0.5;
            this.exitButton.orgHeight = 128*0.5;
            
            this.exitButton.onInputDown.add(this.buttonDown, this.exitButton);
            this.exitButton.onInputUp.add(this.exitGame, this);
            this.input.onUp.add(this.buttonUp, this.exitButton);
            
            this.group.add(this.exitButton);
            */
            var fade = this.game.add.tween(this.group);
            fade.to({alpha: 1.0}, 300);
            fade.start();

            //this.lvl1.alpha=1.0;
            //this.lvl1.input.start();
            
            /*added*/
            this.stage.scaleMode = Phaser.StageScaleMode.EXACT_FIT;
            this.game.stage.scale.refresh();
        }
        else{
            this.game.add.text(40, 310 + y_off, 'To play this game, please use a mobile device');
        }
    },

    incrementMag: function()
    {
        
        var name = this.name;
        //Main.LevelSelect.prototype.magLab.destroy();
        var val = parseFloat(name) + 0.25;
        //this = this.game.add.text(500, 500, String(name));
        this.setText(String(name));
        this.name = String(val);

        Main.LevelSelect.prototype.choice[8].name =  parseFloat(name);

    
    },

    decrementMag: function()
    {
        
        var name = this.name;
        //Main.LevelSelect.prototype.magLab.destroy();
        var val = 0.25;
        if(parseFloat(name) > 0.25){
            val = parseFloat(name) - 0.25;
        }
        //this = this.game.add.text(500, 500, String(name));
        this.setText(String(name));
        this.name = String(val);

        Main.LevelSelect.prototype.choice[8].name = parseFloat(name);

    
    },
    
    makeChoice: function ()
    {
        var fade = this.game.add.tween(this.group);
        fade.to({alpha: 1.0}, 300);
        fade.start();

        Main.setting = this.name;

        Main.noiseVal = parseFloat(Main.LevelSelect.prototype.choice[8].name);
        
        gyro.setSettings(this.name, parseFloat(Main.LevelSelect.prototype.choice[8].name));

        for(var i = 0; i < 5; i++)
        {
            var lvl = this.game.add.button(190+i*130-Math.floor(i/3)*390, 520+Math.floor(i/3)*130, 'lvl' + (i+1));
            lvl.scale = {x: 0.5, y: 0.5};
            lvl.anchor = {x: 0.5, y: 0.5};
            lvl.orgWidth = 100;
            lvl.orgHeight = 100;
            lvl.name = i;
            
            lvl.onInputDown.add(Main.LevelSelect.prototype.buttonDown, lvl);
            lvl.onInputUp.add(Main.LevelSelect.prototype.playGame, lvl);
            
            lvl.alpha=1.0;
           
            //this.group.add(lvl);
        }

        for(var i = 0; i < 7; i++)
        {
            if(i != this.name){
                Main.LevelSelect.prototype.choice[i].alpha=0.5;
                Main.LevelSelect.prototype.choice[i].input.stop();
            }
        }
        Main.LevelSelect.prototype.choice[9].alpha=0.5;
        Main.LevelSelect.prototype.choice[9].input.stop();
        Main.LevelSelect.prototype.choice[10].alpha=0.5;
        Main.LevelSelect.prototype.choice[10].input.stop();

        var self = this;
        
        
        
    },

    playGame: function ()
    {
        var fade = this.game.add.tween(this.group);
        fade.to({alpha: 1.0}, 300);
        fade.start();
        
        Main.level = this.name;
        Main.time = 0;
        Main.time1 = 0;
        Main.time2 = 0;
        Main.time3 = 0;

        var max = 5;
        var min = 0;
        var rand = Math.floor(Math.random() * (max - min + 1)) + min;
        //0 is normal, 1 is basic, 3 is polar
        switch(rand) {
            case 0:
                Main.randSettings = [0, 1, 2];
                gyro.setSettings(0, 0); // normal
                break;
            case 1:
                Main.randSettings = [0, 2, 1];
                gyro.setSettings(0, 0); // normal
                break;
            case 2:
                Main.randSettings = [1, 0, 2];
                gyro.setSettings(5, 0); // normal
                break;
            case 3:
                Main.randSettings = [1, 2, 0];
                gyro.setSettings(5, 0); // normal
                break;
            case 4:
                Main.randSettings = [2, 0, 1];
                gyro.setSettings(4, 6); // polar
                break;
            case 5:
                Main.randSettings = [2, 1, 0];
                gyro.setSettings(4, 6); // polar
                break;
        }
        var self = this;
        
        setTimeout(function () {
            self.game.state.start('game');
        }, 350);
    },

    exitGame: function ()
    {
        var fade = this.game.add.tween(this.group);
        fade.to({alpha: 1}, 300);
        fade.start();
        
        var self = this;
        
        setTimeout(function () {
            self.game.state.start('mainMenu');
        }, 350);
    },
    buttonDown: function ()
    {
        var bounce = this.game.add.tween(this);
        bounce.to({width: this.orgWidth*1.1, height: this.orgHeight*1.1}, 300, Phaser.Easing.Back.Out);
        bounce.start();
    },
    buttonUp: function ()
    {
        var bounce = this.game.add.tween(this);
        bounce.to({width: this.orgWidth, height: this.orgHeight}, 300, Phaser.Easing.Back.Out);
        bounce.start();
    },
    
}
