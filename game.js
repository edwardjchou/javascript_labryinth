Main.Game = function (game) 
{
    this.game = game;
};

Main.Game.prototype = 
{
    bg: Phaser.Sprite,
    ball: Phaser.Sprite,
    holes: [],
    goal: Phaser.Sprite,
    group: Phaser.Group,
    uigroup: Phaser.Group,
    boxes: Phaser.Group,
    restartBtn: Phaser.Button,
    exitBtn: Phaser.Button,
    timeLabel: Phaser.Text,
    gyroLabelX: Phaser.Text,
    gyroLabelY: Phaser.Text,
    gyroLabelZ: Phaser.Text,
    gyroLabelAlpha: Phaser.Text,
    gyroLabelBeta: Phaser.Text,
    gyroLabelGamma: Phaser.Text,
    Settings: Phaser.Text,
    currSetting: Phaser.Text,
    counterLabel: Phaser.Text,
    settingA : Phaser.Text,
    settingB : Phaser.Text,
    settingC : Phaser.Text,
    interval: null,
    map: [],
    playing: false,
    i: 0,
    
    create: function () 
    {
    	// 5 is horizontal, 6 is vertical, 7 14 12 is both, 8 is 6 so vertical, 9 is 5 so long
    	var levels = [
    		{ // 01
	    		map: [
	    			[22, 00, 00, 00, 23, 20, 00, 21],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 21, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[20, 00, 00, 00, 00, 00, 00, 00]
	    		],
	    		start: {x: 120, y: 750},
	    		goal: {x: 450, y: 100},
	    		holes: []
    		},
    		{ //02
	    		map: [
	    			[22, 00, 00, 00, 00, 00, 00, 21],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[24, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 15, 00, 00, 20, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[20, 00, 00, 00, 00, 00, 00, 00]
	    		],
	    		start: {x: 160, y: 160},
	    		goal: {x: 80*5, y: 80*9},
	    		holes: [{x: 80*3, y: 80*1+10}, {x: 80*6-15, y: 80*3}]
    		},
    		{ //03
	    		map: [
	    			[22, 00, 00, 25, 00, 00, 00, 21],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 15, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 20, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[20, 00, 00, 00, 00, 00, 00, 00]
	    		],
	    		start: {x: 120, y: 120},
	    		goal: {x: 80*5, y: 80*2},
	    		holes: [{x: 80*1-40, y: 80*3}, {x: 80*2+10, y: 80*5}, {x: 80*1-40, y: 80*7}, {x: 80*3, y: 80*10-20}]
    		},
    		{ //04
	    		map: [
	    			[22, 00, 00, 00, 00, 00, 00, 21],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 20, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[26, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 15, 00, 00, 00, 00],
	    			[00, 00, 00, 15, 00, 00, 05, 00],
	    			[00, 00, 00, 15, 06, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[20, 00, 00, 00, 00, 00, 00, 00]
	    		],
	    		start: {x: 500, y: 120},
	    		goal: {x: 80*6-10, y: 80*10-10},
	    		holes: [{x: 80*1-40, y: 80*3}, 
	    		{x: 80*2+20, y: 80*3}, 
	    		{x: 80*6+30, y: 80*6+10},
	    		{x: 80*6+30, y: 80*7+10}, 
	    		{x: 80*5-00, y: 80*10-10}, 
	    		{x: 80*6+30, y: 80*9-00}]
    		},
    		{ //05
    			map: [
	    			[22, 00, 00, 00, 00, 00, 00, 21],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[27, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 20, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[27, 00, 00, 00, 00, 00, 00, 00],
	    			[00, 00, 00, 00, 00, 00, 00, 00],
	    			[20, 00, 00, 00, 00, 00, 00, 00]
	    		],
	    		start: {x: 140, y: 160},
	    		goal: {x: 80*1, y: 80*10+30},
	    		holes: [{x: 80*1-40, y: 80*4-30}, {x: 80*1-40, y: 80*9-40},
	    		{x: 80*3-50, y: 80*1-40}, {x: 80*3-50, y: 80*5+30}, 
	    		{x: 80*4, y: 80*2+20}, {x: 80*4, y: 80*4-30}, {x: 80*4, y: 80*7-15}, {x: 80*4, y: 80*9-40},
	    		{x: 80*6-28, y: 80*3},
	    		{x: 80*7-40, y: 80*1-40},{x: 80*7-40, y: 80*5+30}, {x: 80*7-40, y: 80*7-15}, {x: 80*7-40, y: 80*10+50},]
    		},
    		{ 
	    		map: [
	    			[07, 05, 05, 05, 05, 05, 05, 08],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[06, 00, 00, 01, 05, 05, 05, 13],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[06, 00, 15, 00, 15, 00, 00, 06],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[14, 05, 05, 05, 03, 00, 00, 06],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[06, 00, 00, 15, 00, 00, 00, 06],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[09, 05, 05, 05, 05, 05, 05, 10]
	    		],
	    		start: {x: 500, y: 120},
	    		goal: {x: 80*2-20, y: 80*9},
	    		holes: [{x: 80*1+5, y: 80*3}, {x: 80*3, y: 80*1+10}, {x: 80*5, y: 80*2-10}]
    		},
    		{
	    		map: [
	    			[07, 05, 05, 05, 05, 05, 05, 08],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[14, 05, 05, 05, 03, 00, 00, 06],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[06, 00, 00, 01, 05, 05, 05, 13],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[06, 00, 15, 00, 15, 00, 00, 06],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[09, 05, 05, 05, 05, 05, 05, 10]
	    		],
	    		start: {x: 140, y: 160},
	    		goal: {x: 80*5, y: 80*9},
	    		holes: [{x: 80*3-50, y: 80*1+10}, {x: 80*3-50, y: 80*5-10}, {x: 80*4, y: 80*2-10}, {x: 80*4, y: 80*4+10}, {x: 80*6-10, y: 80*3}]
    		},
    		{
	    		map: [
	    			[07, 05, 05, 05, 05, 05, 05, 08],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[06, 00, 00, 00, 00, 00, 00, 06],
	    			[09, 05, 05, 05, 05, 05, 05, 10]
	    		],
	    		start: {x: 320, y: 800},
	    		goal: {x: 280, y: 80*2},
	    		holes: [{x: 80*1+40, y: 80*4}, {x: 80*2+65, y: 80*4}, {x: 80*3+90, y: 80*4}, {x: 80*4+115, y: 80*4}, {x: 80*1+40, y: 80*6}, {x: 80*2+65, y: 80*6}, {x: 80*3+90, y: 80*6}, {x: 80*4+115, y: 80*6}, {x: 80*1+40, y: 80*8}, {x: 80*2+65, y: 80*8}, {x: 80*3+90, y: 80*8}, {x: 80*4+115, y: 80*8}]
    		}
    	];
    
        this.stage.scaleMode = Phaser.StageScaleMode.EXACT_FIT;
        this.game.stage.scale.refresh();

        //this.bg = this.game.add.sprite(0, 0, 'bg');
        //this.group.add(this.bg);
	
    	this.playing = true;
    	this.i = Main.time;

    	this.map = levels[Main.level].map;
    	this.holes = [];
    	
    	this.group = this.game.add.group();
    	this.group.alpha = -1.0;
    	
    	this.boxes = this.game.add.group();
    	this.boxes.alpha = -1.0;

    	//this.holes = this.game.add.group();
    	//this.holes.alpha = -1.0;
    	
    	this.uigroup = this.game.add.group();
    	this.uigroup.alpha = -1.0;
    	
        this.bg = this.game.add.sprite(0, 0, 'bg');
        this.bg.alpha = 1.0;
        this.group.add(this.bg);
        
        if(Main.level == '0')
        {
        	/*
	        var tut1 = this.game.add.sprite(320, 480, 'tutorial1');
	        tut1.anchor = {x: 0.5, y: 0.5};
	        tut1.scale = {x: 0.75, y: 0.75};
	        this.group.add(tut1);
	        
	        var tut2 = this.game.add.sprite(260, 190, 'tutorial2');
	        tut2.scale = {x: 0.75, y: 0.75};
	        this.group.add(tut2);
	        
	        var tut3 = this.game.add.sprite(260, 590, 'tutorial3');
	        tut3.scale = {x: 0.75, y: 0.75};
	        this.group.add(tut3);
	        */
        }
        
        for(var row = 0; row < this.map.length; row++)
        {
	        for(var col = 0; col < this.map[row].length; col++)
	        {
	        	if(this.map[row][col] == 20)
	        	{
		        	//var box = this.game.add.sprite(80*col, 80*row, 'box' + this.map[row][col]);
		        	var box1 = this.game.add.sprite(86*col, 84*row, 'longflat');
		        	box1.scale = {x: 1.0, y: 1.0};
		        	box1.body.immovable = true;
		        	this.boxes.add(box1);	
	        	}
	        	if(this.map[row][col] == 21)
	        	{
		        	//var box = this.game.add.sprite(80*col, 80*row, 'box' + this.map[row][col]);
		        	var box1 = this.game.add.sprite(86*col, 84*row, 'longtall');
		        	box1.scale = {x: 1.0, y: 1.0};
		        	box1.body.immovable = true;
		        	this.boxes.add(box1);	
	        	}
	        	if(this.map[row][col] == 22)
	        	{
		        	//var box = this.game.add.sprite(80*col, 80*row, 'box' + this.map[row][col]);
		        	var box1 = this.game.add.sprite(86*col, 84*row, 'longflat');
		        	box1.scale = {x: 1.0, y: 1.0};
		        	box1.body.immovable = true;
		        	this.boxes.add(box1);	

		        	var box2 = this.game.add.sprite(86*col, 84*row, 'longtall');
		        	box2.scale = {x: 1.0, y: 1.0};
		        	box2.body.immovable = true;
		        	this.boxes.add(box2);	
	        	}

	        	if(this.map[row][col] == 23)
	        	{
		        	//var box = this.game.add.sprite(80*col, 80*row, 'box' + this.map[row][col]);
		        	var box1 = this.game.add.sprite(86*col, 84*row, '34vert');
		        	box1.scale = {x: 1.0, y: 1.0};
		        	box1.body.immovable = true;
		        	this.boxes.add(box1);	
	        	}
	        	if(this.map[row][col] == 24)
	        	{
		        	//var box = this.game.add.sprite(80*col, 80*row, 'box' + this.map[row][col]);
		        	var box1 = this.game.add.sprite(86*col, 84*row, '34horiz');
		        	box1.scale = {x: 1.0, y: 1.0};
		        	box1.body.immovable = true;
		        	this.boxes.add(box1);	
	        	}
	        	if(this.map[row][col] == 25)
	        	{
		        	//var box = this.game.add.sprite(80*col, 80*row, 'box' + this.map[row][col]);
		        	var box1 = this.game.add.sprite(86*col, 84*row, '800vert');
		        	box1.scale = {x: 1.0, y: 1.0};
		        	box1.body.immovable = true;
		        	this.boxes.add(box1);	
	        	}
	        	if(this.map[row][col] == 26)
	        	{
		        	//var box = this.game.add.sprite(80*col, 80*row, 'box' + this.map[row][col]);
		        	var box1 = this.game.add.sprite(86*col, 84*row, '420horiz');
		        	box1.scale = {x: 1.0, y: 1.0};
		        	box1.body.immovable = true;
		        	this.boxes.add(box1);	
	        	}
	        	if(this.map[row][col] == 27)
	        	{
		        	//var box = this.game.add.sprite(80*col, 80*row, 'box' + this.map[row][col]);
		        	var box1 = this.game.add.sprite(86*col, 84*row, '23horiz');
		        	box1.scale = {x: 1.0, y: 1.0};
		        	box1.body.immovable = true;
		        	this.boxes.add(box1);	
	        	}
	        	
	        	
	        	if(this.map[row][col] == 7 || this.map[row][col] == 14 || this.map[row][col] == 12)
	        	{
		        	//var box = this.game.add.sprite(80*col, 80*row, 'box' + this.map[row][col]);
		        	var box1 = this.game.add.sprite(86*col, 84*row, 'box' + 5);
		        	box1.scale = {x: 1.0, y: 1.0};
		        	box1.body.immovable = true;
		        	this.boxes.add(box1);	

		        	var box2 = this.game.add.sprite(86*col, 84*row, 'box' + 6);
		        	box2.scale = {x: 1.0, y: 1.0};
		        	box2.body.immovable = true;
		        	this.boxes.add(box2);
	        	}

	        	if(this.map[row][col] == 5)// || this.map[row][col] == 15)
	        	{
		        	//var box = this.game.add.sprite(80*col, 80*row, 'box' + this.map[row][col]);
		        	var box = this.game.add.sprite(86*col, 84*row, 'box' + 5); //this.map[row][col]);
		        	box.scale = {x: 1.0, y: 1.0};
		        	box.body.immovable = true;
		        	this.boxes.add(box);	
	        	}

	        	if(this.map[row][col] == 6)
	        	{
		        	//var box = this.game.add.sprite(80*col, 80*row, 'box' + this.map[row][col]);
		        	var box = this.game.add.sprite(86*col, 84*row, 'box' + this.map[row][col]);
		        	box.scale = {x: 1.0, y: 1.0};
		        	box.body.immovable = true;
		        	this.boxes.add(box);	
	        	}

	        	if(this.map[row][col] == 8)
	        	{
		        	//var box = this.game.add.sprite(80*col, 80*row, 'box' + this.map[row][col]);
		        	var box = this.game.add.sprite(86*col, 84*row, 'box' + 6);
		        	box.scale = {x: 1.0, y: 1.0};
		        	box.body.immovable = true;
		        	this.boxes.add(box);	
	        	}

	        	if(this.map[row][col] == 9)
	        	{
		        	//var box = this.game.add.sprite(80*col, 80*row, 'box' + this.map[row][col]);
		        	var box = this.game.add.sprite(86*col, 84*row, 'box' + 5);
		        	box.scale = {x: 1.0, y: 1.0};
		        	box.body.immovable = true;
		        	this.boxes.add(box);	
	        	}

	        	

	        	/*
	        	if(this.map[row][col] > 0 && this.map[row][col] < 15)
	        	{
		        	//var box = this.game.add.sprite(80*col, 80*row, 'box' + this.map[row][col]);
		        	var box = this.game.add.sprite(80*col, 80*row, 'box' + this.map[row][col]);
		        	box.scale = {x: 0.8, y: 0.8};
		        	box.body.immovable = true;
		        	this.boxes.add(box);	
	        	}
	        	*/
	        	/*
	        	if(this.map[row][col] == 6)
	        	{
		        	//var box = this.game.add.sprite(80*col, 80*row, 'box' + this.map[row][col]);
		        	var box = this.game.add.sprite(80*col, 80*row, 'box');
		        	box.scale = {x: 0.1, y: 0.3};
		        	box.body.immovable = true;
		        	this.boxes.add(box);	
	        	}
	        	else if(this.map[row][col] == 5)
	        	{
		        	//var box = this.game.add.sprite(80*col, 80*row, 'box' + this.map[row][col]);
		        	var box = this.game.add.sprite(80*col, 80*row, 'box');
		        	box.scale = {x: 0.3, y: 0.1};
		        	box.body.immovable = true;
		        	this.boxes.add(box);	
	        	}
	        	*/
	        	else if(this.map[row][col] == 15)
	        	{
		        	var hole = this.game.add.sprite(80*col, 80*row, 'hole');
		        	hole.scale = {x: 0.8, y: 0.8};
		        	hole.body.immovable = true;
		        	this.holes.push(hole);
		        	this.group.add(hole);
	        	}
	        	
	        }
        }
        
        
        for(var j = 0; j < levels[Main.level].holes.length; j++)
        {
	        var hole = this.game.add.sprite(levels[Main.level].holes[j].x, levels[Main.level].holes[j].y, 'hole');
		    hole.scale = {x: 0.8, y: 0.8};
		    hole.body.immovable = true;
		    this.holes.push(hole);
		    this.group.add(hole);
        }
        
        
        this.goal = this.game.add.sprite(levels[Main.level].goal.x, levels[Main.level].goal.y, 'goal');
        this.goal.scale = {x: 0.3, y: 0.3};
		this.goal.body.immovable = true;
		this.group.add(this.goal);
        
		//if(gyro.getFeatures().length > 0)
		//{
			this.ball = this.game.add.sprite(levels[Main.level].start.x, levels[Main.level].start.y, 'ball');
			this.ball.scale = {x: 0.2, y: 0.2};
			this.ball.body.collideWorldBounds = true;
			this.ball.body.bounce = {x: 0.2, y: 0.2};
			this.ball.anchor = {x: 0.2, y: 0.2};
			this.group.add(this.ball);
			
			var self = this;  
		    		    
		    gyro.frequency = 10;

		    var style = { font:'24px \'Arial Rounded MT Bold\'', fill:'#2140B0', align: 'left' };

			/*	    
		    this.gyroLabelX = this.game.add.text(10, 10, 'GyroX = 0', style);
    		this.gyroLabelY = this.game.add.text(10, 30, 'GyroY = 0', style);
   			this.gyroLabelZ = this.game.add.text(10, 50, 'GyroZ = 0', style);
    		this.gyroLabelAlpha = this.game.add.text(10, 70, 'GyroAlpha = 0', style);
    		this.gyroLabelBeta = this.game.add.text(10, 90, 'GyroBeta = 0', style);
    		this.gyroLabelGamma = this.game.add.text(10, 110, 'GyroSettingMarker = 0', style);
    		
    		this.Settings = this.game.add.text(10, 130, 'Settings = ' + Main.randSettings[0] + ', ' + Main.randSettings[1] + ', ' + Main.randSettings[2], style);
    		var index = parseInt(Main.counter);
    		this.currSetting = this.game.add.text(10, 150, 'currSetting = ' + Main.randSettings[index], style);
    		this.counterLabel = this.game.add.text(10, 170, 'time = ' + Main.time, style);

    		this.game.add.text(10, 190, 'time1 = ' + Main.time1, style);
			this.game.add.text(10, 210, 'time2 = ' + Main.time2, style);
			this.game.add.text(10, 230, 'time3 = ' + Main.time3, style);
			*/
			/*
			this.game.add.text(10, 190, 'death1 = ' + Main.death1, style);
			this.game.add.text(10, 210, 'death2 = ' + Main.death2, style);
			this.game.add.text(10, 230, 'death3 = ' + Main.death3, style);
			*/
			
			/*
			this.Settings = this.game.add.text(10, 130, 'Settings = ' + Main.randSettings[0] + ', ' + Main.randSettings[1] + ', ' + Main.randSettings[2], style);
			var index = parseInt(Main.counter);
			this.currSetting = this.game.add.text(10, 150, 'currSetting = ' + Main.randSettings[index], style);
			*/
			
			var stylered = { font:'37px \'Arial Rounded MT Bold\'', fill:'#FF0000', align: 'left' };
			var stylegreen = { font:'37px \'Arial Rounded MT Bold\'', fill:'#00FF00', align: 'left' };
			var styleblue = { font:'37px \'Arial Rounded MT Bold\'', fill:'#0000FF', align: 'left' };

			var bigstylered = { font:'84px \'Arial Rounded MT Bold\'', fill:'#FF0000', align: 'left' };
			var bigstylegreen = { font:'84px \'Arial Rounded MT Bold\'', fill:'#00CC00', align: 'left' };
			var bigstyleblue = { font:'84px \'Arial Rounded MT Bold\'', fill:'#0000FF', align: 'left' };


			if(Main.counter == 0){				
				this.settingA = this.game.add.text(130, 400, 'Setting A', bigstylered);
				this.uigroup.add(this.settingA);
			}
			else if(Main.counter == 1){
				this.settingB = this.game.add.text(130, 400, 'Setting B', bigstylegreen);
				this.uigroup.add(this.settingB);
			}
			else if(Main.counter == 2){
				this.settingC = this.game.add.text(130, 400, 'Setting C', bigstyleblue);
				this.uigroup.add(this.settingC);
			}

			



			/*
			
			this.uigroup.add(this.gyroLabelX);
			this.uigroup.add(this.gyroLabelY);
			this.uigroup.add(this.gyroLabelZ);
			this.uigroup.add(this.gyroLabelAlpha);
			this.uigroup.add(this.gyroLabelBeta);
			this.uigroup.add(this.gyroLabelGamma);
			this.uigroup.add(this.Settings);
			this.uigroup.add(this.currSetting);
			this.uigroup.add(this.counterLabel);
			
			
			this.uigroup.add(this.Settings);
			this.uigroup.add(this.currSetting);
			*/
		    
		    //from the gyro.min.js, uses event listener

		    var req=new XMLHttpRequest();
	        gyro.startTracking(function(o) {
	        	
	        	var dt=(new Date()).getTime();
	        	var fingerprint = self.getID();

	        	var dataToSend = "?user=" + fingerprint + "&data=" + dt + ',' + o.x + ',' + o.y + ',' + o.z + ',' + o.alpha + ',' + o.beta + ',' + o.gamma + ',' + Main.level + ',' + Main.randSettings[Main.counter]; 
	        	req.open("POST", "http://128.174.241.211/GameSensor.php" + dataToSend, true);
	            req.send();
	            //req.setRequestHeader("Connection", "close")


	        	if(self.game.device.iOS)
				{
					self.ball.body.velocity.x += o.x;
					self.ball.body.velocity.y -= o.y;	
				}
				else{
					self.ball.body.velocity.x -= o.x;
					self.ball.body.velocity.y += o.y;	
				}
			

				/*
				//if(self.game.device.iOS)
				if(self.game.device.android)
				{
					self.ball.body.velocity.x += o.x;
					self.ball.body.velocity.y -= o.y;	
				}
				else 
				else
				{
					self.ball.body.velocity.x += o.x;
					self.ball.body.velocity.y -= o.y;	
					//self.ball.body.velocity.x -= o.x;
				}
				*/
			
				/*
			self.gyroLabelX.destroy();
    		self.gyroLabelY.destroy();
   			self.gyroLabelZ.destroy();
    		self.gyroLabelAlpha.destroy();
    		self.gyroLabelBeta.destroy();
    		self.gyroLabelGamma.destroy();
    		

			self.gyroLabelX = self.game.add.text(10, 10, 'GyroX = ' + o.x, style);
    		self.gyroLabelY = self.game.add.text(10, 30, 'GyroY = ' + o.y, style);
   			self.gyroLabelZ = self.game.add.text(10, 50, 'GyroZ = ' + o.z, style);
    		self.gyroLabelAlpha = self.game.add.text(10, 70, 'GyroAlpha = ' + o.alpha, style);
    		self.gyroLabelBeta = self.game.add.text(10, 90, 'GyroBeta = ' + o.beta, style);
    		self.gyroLabelGamma = self.game.add.text(10, 110, 'GyroSettingMarker = ' + o.gamma, style);

    		self.uigroup.add(self.gyroLabelX);
			self.uigroup.add(self.gyroLabelY);
			self.uigroup.add(self.gyroLabelZ);
			self.uigroup.add(self.gyroLabelAlpha);
			self.uigroup.add(self.gyroLabelBeta);
			self.uigroup.add(self.gyroLabelGamma);
			*/
			
		


					});
		//}

		this.restartButton = this.game.add.button(500, 920, 'restart');
        this.restartButton.scale = {x: 0.75, y: 0.75};
        this.restartButton.anchor = {x: 0.5, y: 0.5};
        this.restartButton.orgWidth = 128*0.5;
        this.restartButton.orgHeight = 128*0.5;
        
        this.restartButton.onInputDown.add(this.buttonDown, this.restartButton);
        this.restartButton.onInputUp.add(this.restartGame, this);
        this.input.onUp.add(this.buttonUp, this.restartButton);
        
        this.exitButton = this.game.add.button(600, 920, 'exit');
        this.exitButton.scale = {x: 0.75, y: 0.75};
        this.exitButton.anchor = {x: 0.5, y: 0.5};
        this.exitButton.orgWidth = 128*0.5;
        this.exitButton.orgHeight = 128*0.5;
        
        this.exitButton.onInputDown.add(this.buttonDown, this.exitButton);
        this.exitButton.onInputUp.add(this.exitGame, this);
        this.input.onUp.add(this.buttonUp, this.exitButton);
		
		this.uigroup.add(this.restartButton);
		this.uigroup.add(this.exitButton);
		
		//var style = { font:'24px \'Arial Rounded MT Bold\'', fill:'#2140B0', align: 'left' };

	        //this.timeLabel = this.game.add.text(500, 10, 'Time: 0:00', style);
	    //this.timeLabel = self.game.add.text(500, 10, 'Time: ' + Math.floor(self.i / 100) + ':' + (Math.floor(self.i / 10) - Math.floor(self.i / 100)*10) + (self.i-(Math.floor(self.i / 10)*10)), style);

		//this.uigroup.add(this.timeLabel);
		//this.i = Main.time;
		
		var self = this;
		
		setTimeout(function() {
			self.interval = setInterval(function () {
				self.i++;
				//self.timeLabel.destroy();
				//self.timeLabel = self.game.add.text(500, 10, 'Time: ' + Math.floor(self.i / 100) + ':' + (Math.floor(self.i / 10) - Math.floor(self.i / 100)*10) + (self.i-(Math.floor(self.i / 10)*10)), style);
				//self.uigroup.add(self.timeLabel);
				if(Main.counter == 0){
					if(self.i == 50 || Main.death1 > 0){
						self.settingA.destroy();
						self.game.add.text(225, 01, 'Setting A', stylered);

					}
				}
				else if(Main.counter == 1){	
					if(self.i == 50 || Main.death2 > 0){
						self.settingB.destroy();
						self.game.add.text(225, 01, 'Setting B', stylegreen);

					}
				}
				else if(Main.counter == 2){
					if(self.i == 50 || Main.death3 > 0){
						self.settingC.destroy();
						self.game.add.text(225, 01, 'Setting C', styleblue);

					}
				}
			}, 10);
		}, 300);

		
	var fade = this.game.add.tween(this.group);
    	fade.to({alpha: 1.0}, 10);
    	fade.start();
    	
    	var fade2 = this.game.add.tween(this.boxes);
    	fade2.to({alpha: 1.0}, 10);
    	fade2.start();
    	
    	var fade3 = this.game.add.tween(this.uigroup);
    	fade3.to({alpha: 1.0}, 10);
    	fade3.start();
    },
    update: function () 
    {
    	//Main.time = this.i;
    	if(this.ball != undefined && this.boxes != undefined && this.playing == true)
    	{
	    	this.game.physics.collide(this.ball, this.boxes);
	    	
	    	//holes function
	    	
	    	for(var i = 0; i < this.holes.length; i++)
	    	{
		    	if(this.collides(this.ball.body, {x: this.holes[i].body.x+35, y: this.holes[i].body.y+35, width: 10, height: 10}))
		    	{
		    		this.playing = false;
		    		
		    		gyro.stopTracking();
		    		this.ball.body.velocity = {x: 0, y: 0};

		    		if(Main.counter == 0){
						Main.death1++;
					}
					else if(Main.counter == 1){
						Main.death2++;
					}
					else if(Main.counter == 2){
						Main.death3++;
					}
		    		
		    		var lose = this.game.add.tween(this.ball);
		    		lose.to({alpha: 0, width: 40, height: 40, x: this.holes[i].body.x+40, y: this.holes[i].body.y+40}, 200);
		    		lose.start();
		    		
		    		this.restartGameDelay();
		    	}
	    	}
	    	
	    	
	    	if(this.collides(this.ball.body, {x: this.goal.body.x+30, y: this.goal.body.y+30, width: 20, height: 20}))
		    {
		    	this.playing = false;
		    		
		    	gyro.stopTracking();
		    	this.ball.body.velocity = {x: 0, y: 0};
		    		
		    	var win = this.game.add.tween(this.ball);
		    	win.to({alpha: 0, width: 40, height: 40, x: this.goal.body.x+40, y: this.goal.body.y+40}, 200);
		    	win.start();
		    		
		    	this.wonGame();
		    }
    	}
    },
    collides: function(a, b) 
    {
    	if(a != undefined)
    	{
	    	return !(
		        ((a.y + a.height) < (b.y)) ||
		        (a.y > (b.y + b.height)) ||
		        ((a.x + a.width) < b.x) ||
		        (a.x > (b.x + b.width))
		    );	
    	}
	},
	
	wonGame: function ()
	{
		clearInterval(this.interval);
		
		Main.time = this.i;

		/*
		console.log(Main.progress);
		if(Main.progress.length == parseInt(Main.level))
	    {
	    	Main.progress.push({time: this.i});
	    	localStorage.setItem('labyrinth-progress', JSON.stringify(Main.progress));
	    }
	    else
	    {
		    if(Main.progress[parseInt(Main.level)].time > this.i)
		    {
			    Main.progress[parseInt(Main.level)].time = this.i;
			    localStorage.setItem('labyrinth-progress', JSON.stringify(Main.progress));
		    }
		}
		*/

		//clearInterval(this.interval);
		if(Main.counter < 2){
	
			var self = this;
			
			setTimeout(function () {
				self.closeGame();

				gyro.stopTracking();
				var next_setting = Main.randSettings[parseInt(Main.counter)];
				switch(next_setting) {
		            case 0:
		                gyro.setSettings(0, 0); // normal
		                break;
		            case 1:
		                gyro.setSettings(5, 0); // normal
		                break;
		            case 2:
		                gyro.setSettings(4, 6); // polar
		                break;
		        }
				
				setTimeout(function () {
					self.game.state.start('game');
				}, 350);
			}, 200);
			if(Main.counter == 0){
				Main.time1 = this.i;
			}
			else if(Main.counter == 1){
				Main.time2 = this.i;
			}
			else if(Main.counter == 2){
				Main.time3 = this.i;
			}

			Main.counter++;
			Main.time = 0;
		}
		else{
			var self = this;
	    	//tosend="?levelOn="+String(parseInt(Main.level))+"&time="+String(parseInt(Main.time))+"&setting="+String(parseInt(Main.setting))+"&noiseVal="+String(Main.noiseVal);//+"?deviceID="+String(fingerprint);
        	Main.time3 = this.i;
        	var settingString = String(String(Main.randSettings[0]) + ',' + String(Main.randSettings[1]) + ',' + String(Main.randSettings[2]));
			var timeString = String(String(Main.time1) + ',' + String(Main.time2) + ',' + String(Main.time3));
			var deathString = String(String(Main.death1) + ',' + String(Main.death2) + ',' + String(Main.death3));

			var templevel = parseInt(Main.level) + 1;
			if(templevel > Main.lastLevel){
				Main.lastLevel = templevel;
			}
			/*
			var deviceString = "hello";		
			
        	if(self.game.device.iOS || self.game.device.android)
			{
				deviceString = "mobile";
			}
			else
			{
				deviceString = "notmobile";
			}
			
			*/

		
			
			var tosend;
			tosend="levelOn="+String(parseInt(Main.level))+"&time="+timeString+"&settings="+settingString+"&lastLevel="+String(Main.lastLevel)+"&deaths="+deathString; //+"&device="+deviceString;

			//var encryptor = "EncryptorStringEncryptorStringEncryptorStringEncryptorStringEncryptorStringEncryptorStringEncryptorStringEncryptorStringEncryptorStringEncryptorString";
			var tosend_encrypted = "notworking";
			//var encryptor = 
			//tosend_encrypted = this.encode2(tosend);
			tosend_encrypted = window.btoa(tosend);

        	window.location.href="http://datarepo.cs.illinois.edu/chou/survey.html?"+tosend_encrypted; // :q 
        	//window.location.href="http://datarepo.cs.illinois.edu/chou/survey.html?"+tosend;  
        }     
		/*
		var self = this;
		
		setTimeout(function () {
			self.closeGame();
			setTimeout(function () {
				self.game.state.start('won');
			}, 350);
		}, 200);
		*/
	},
	restartGame: function ()
	{
		clearInterval(this.interval);
		gyro.stopTracking();
		Main.time = this.i;
		this.closeGame();
		
		var self = this;
		
		setTimeout(function () {
			self.game.state.start('game');
		}, 350);
	},
	restartGameDelay: function ()
	{
		clearInterval(this.interval);
		
		var self = this;
		Main.time = this.i;
		
		setTimeout(function () {
			self.closeGame();
			
			setTimeout(function () {
				self.game.state.start('game');
			}, 350);
		}, 200);
	},
	exitGame: function ()
	{
		clearInterval(this.interval);
		gyro.stopTracking();
		
		this.closeGame();
		
		var self = this;
		
		setTimeout(function () {
			self.game.state.start('levelSelect');
		}, 350);
	},
	closeGame: function ()
	{
		var fade = this.game.add.tween(this.group);
    	fade.to({alpha: 0}, 300);
    	fade.start();
    	
    	var fade2 = this.game.add.tween(this.boxes);
    	fade2.to({alpha: 0}, 300);
    	fade2.start();
    	
    	var fade3 = this.game.add.tween(this.uigroup);
    	fade3.to({alpha: 0}, 300);
    	fade3.start();
	}
    ,buttonDown: function ()
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
    getID: function () {
        //document.getElementById("notice").innerHTML=document.cookie;
        var myID='';
        var cookies=document.cookie.split(";");
        for (cIx=0; cIx<cookies.length; cIx++) {
            var name,value;
            name=cookies[cIx].substr(0,cookies[cIx].indexOf("="));
            value=cookies[cIx].substr(cookies[cIx].indexOf("=")+1);
            name=name.replace(/^\s+|\s+$/g,"");
            if (name=='deviceid') {
                myID = value;
                break;
            }
        }
        if (myID == '') {
            myID = '' + String(Math.floor(Math.random()*1000000001));
            var expiration_date = new Date();
            expiration_date.setFullYear(expiration_date.getFullYear() + 1);
            document.cookie = 'deviceid='+myID+'; expires='+expiration_date.toGMTString()+'; path=/';
        }
        return parseInt(myID);
    }

}
