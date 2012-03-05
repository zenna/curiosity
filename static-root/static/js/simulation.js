// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(/* function */callback, /* DOMElement */element) {
        window.setTimeout(callback, 1000 / 60);
    };

})();

var simulation = function(width,height,initialState,cssClass) {
	var width = typeof width === "undefined" ? 640 : width;
	var height = typeof height === "undefined" ? 480 : height;
	var css = typeof width === "undefined" ? 640 : width;
	var cssClass = typeof cssClass === "undefined" ? "simulationBox" : cssClass;
	var simDomElement = $("<canvas id='"+id+"' width='"+width+"' height='"+height+"' class='"+cssClass+"'></canvas>')");
	this.init = function() {
		
	};
	
	this.pause = function() {
		
	}
	
	this.
}


$(document).ready(function() {
    time = 0;
    var SCALE = 30;
    var NULL_CENTER = {
        x : null,
        y : null
    };

    function Entity(id, x, y, angle, center, color, strength, dynamic) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.angle = angle || 0;
        this.center = center;
        this.color = color || "red";
        this.isHit = false;
        this.strength = strength;
        this.dead = false;
        this.dynamic = typeof dynamic === 'undefined' ? true : dynamic;
    }


    Entity.prototype.hit = function(impulse, source) {
        this.isHit = true;
        if(this.strength) {
            this.strength -= impulse;
            if(this.strength <= 0) {
                this.dead = true
            }
        }

        //console.log(this.id + ", " + impulse + ", " + source.id + ", " + this.strength);
    }


    Entity.prototype.getColor = function() {
        if(this.isHit) {
            return 'black';
        }
        else {
            return this.color;
        }
    }


    Entity.prototype.update = function(state) {
        this.x = state.x;
        this.y = state.y;
        this.center = state.c;
        this.angle = state.a;
    }


    Entity.prototype.draw = function(ctx) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x * SCALE, this.y * SCALE, 4, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.center.x * SCALE, this.center.y * SCALE, 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        // clear
        this.isHit = false;
    }


    Entity.build = function(def) {
        if(def.radius) {
            return new CircleEntity(def.id, def.x, def.y, def.angle, NULL_CENTER, def.color, def.strength, def.radius, def.dynamic);
        }
        else if(def.polys) {
            return new PolygonEntity(def.id, def.x, def.y, def.angle, NULL_CENTER, def.color, def.strength, def.polys, def.dynamic);
        }
        else {
            return new RectangleEntity(def.id, def.x, def.y, def.angle, NULL_CENTER, def.color, def.strength, def.halfWidth, def.halfHeight, def.dynamic);
        }
    }

    function CircleEntity(id, x, y, angle, center, color, strength, radius, dynamic) {
        color = color || 'aqua';
        Entity.call(this, id, x, y, angle, center, color, strength, dynamic);
        this.radius = radius;
    }


    CircleEntity.prototype = new Entity();
    CircleEntity.prototype.constructor = CircleEntity;

    CircleEntity.prototype.draw = function(ctx) {
        ctx.save();
        ctx.translate(this.x * SCALE, this.y * SCALE);
        ctx.rotate(this.angle);
        ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);

        ctx.fillStyle = this.getColor();
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x * SCALE, this.y * SCALE, this.radius * SCALE, 0, Math.PI * 2, true);
        ctx.moveTo(this.x * SCALE, this.y * SCALE);
        ctx.lineTo((this.x) * SCALE, (this.y + this.radius) * SCALE);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        Entity.prototype.draw.call(this, ctx);
    }

    function RectangleEntity(id, x, y, angle, center, color, strength, halfWidth, halfHeight, dynamic) {
        Entity.call(this, id, x, y, angle, center, color, strength, dynamic);
        this.halfWidth = halfWidth;
        this.halfHeight = halfHeight;
    }


    RectangleEntity.prototype = new Entity();
    RectangleEntity.prototype.constructor = RectangleEntity;

    RectangleEntity.prototype.draw = function(ctx) {
        ctx.save();
        ctx.translate(this.x * SCALE, this.y * SCALE);
        ctx.rotate(this.angle);
        ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
        ctx.fillStyle = this.getColor();
        ctx.fillRect((this.x - this.halfWidth) * SCALE, (this.y - this.halfHeight) * SCALE, (this.halfWidth * 2) * SCALE, (this.halfHeight * 2) * SCALE);
        ctx.restore();

        Entity.prototype.draw.call(this, ctx);
    }

    function PolygonEntity(id, x, y, angle, center, color, strength, polys, dynamic) {
        Entity.call(this, id, x, y, angle, center, color, strength, dynamic);
        this.polys = polys;
    }


    PolygonEntity.prototype = new Entity();
    PolygonEntity.prototype.constructor = PolygonEntity;

    PolygonEntity.prototype.draw = function(ctx) {
        ctx.save();
        ctx.translate(this.x * SCALE, this.y * SCALE);
        ctx.rotate(this.angle);
        ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
        ctx.fillStyle = this.getColor();

        for(var i = 0; i < this.polys.length; i++) {
            var points = this.polys[i];
            ctx.beginPath();
            ctx.moveTo((this.x + points[0].x) * SCALE, (this.y + points[0].y) * SCALE);
            for(var j = 1; j < points.length; j++) {
                ctx.lineTo((points[j].x + this.x) * SCALE, (points[j].y + this.y) * SCALE);
            }
            ctx.lineTo((this.x + points[0].x) * SCALE, (this.y + points[0].y) * SCALE);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        ctx.restore();

        Entity.prototype.draw.call(this, ctx);
    }

    var world = {};
    var bodiesState = null;
    box = null;

    function update(animStart) {

        var degree = 270;

        var currentBallPos = box.bodiesMap.moon.GetPosition();
        var ball3pos = box.bodiesMap.earth.GetPosition();
        var forceX = ball3pos.x - currentBallPos.x;
        var forceY = ball3pos.y - currentBallPos.y;
        forceX *= -1;
        forceY *= -1;
        var distanceSquared = forceX * forceX + forceY * forceY;
        var power;
        if(distanceSquared === 0) {
            power = 0;
        }
        else {
            power = 10 * Math.exp(-0.1 * distanceSquared);
        }
        if(time % 30 == 0) {
            console.log(power);
        }
        // var power = 10;

        box.bodiesMap.moon.ApplyForce(new b2Vec2(power * forceX, power * forceY), box.bodiesMap.moon.GetWorldCenter());
        box.bodiesMap.earth.ApplyForce(new b2Vec2(power * -forceX, power * -forceY), box.bodiesMap.earth.GetWorldCenter());

        if(isMouseDown) {
            box.mouseDownAt(mouseX, mouseY);

        }
        else if(box.isMouseDown()) {
            box.mouseUp();
        }

        box.update();
        bodiesState = box.getState();

        var graveyard = [];

        for(var id in bodiesState) {
            var entity = world[id];

            if(entity && world[id].dead) {
                box.removeBody(id);
                graveyard.push(id);
            }
            else if(entity) {
                entity.update(bodiesState[id]);
            }
        }

        for(var i = 0; i < graveyard.length; i++) {
            delete world[graveyard[i]];
        }
        time += 1;
    }

    var canvas = document.getElementById("c0");
    var ctx = canvas.getContext("2d");
    var canvasWidth = ctx.canvas.width;
    var canvasHeight = ctx.canvas.height;

    function draw() {
        //console.log("d");

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        for(var id in world) {
            var entity = world[id];
            entity.draw(ctx);
        }
    }

    var initialState = [{
        id : "ground",
        x : ctx.canvas.width / 2 / SCALE,
        y : ctx.canvas.height / SCALE,
        halfHeight : 0.5,
        halfWidth : ctx.canvas.width / SCALE,
        color : 'yellow'
    }, {
        id : "ground2",
        x : ctx.canvas.width / 2 / SCALE,
        y : 0,
        halfHeight : 0.5,
        halfWidth : ctx.canvas.width / SCALE,
        color : 'blue',
        dynamic : false
    }, {
        id : "ground3",
        x : 0,
        y : ctx.canvas.height / 2 / SCALE,
        halfHeight : ctx.canvas.height / 2 / SCALE,
        halfWidth : 0.5,
        color : 'blue',
        dynamic : false
    }, {
        id : "ground4",
        x : ctx.canvas.width / SCALE,
        y : ctx.canvas.height / 2 / SCALE,
        halfHeight : ctx.canvas.height / 2 / SCALE,
        halfWidth : 0.5,
        color : 'blue',
        dynamic : false
    }, {
        id : "ball1",
        x : 9,
        y : 2,
        radius : 0.5
    }, {
        id : "ball2",
        x : 11,
        y : 4,
        radius : 0.5
    }, {
        id : "ball3",
        x : 10,
        y : 10,
        radius : 2
    }, {
        id : "moon",
        x : 10,
        y : 10,
        radius : 1,
        color : 'grey'
    }, {
        id : "earth",
        x : 10,
        y : 10,
        radius : 1,
        color : 'red'
    }];

    var running = true;

    function init() {
        for(var i = 0; i < initialState.length; i++) {
            world[initialState[i].id] = Entity.build(initialState[i]);
        }
        box = new bTest(60, false, canvasWidth, canvasHeight, SCALE);
        box.setBodies(world);

        var dampingRatio = parseInt(document.getElementById('damping-ratio').value);
        var frequencyHz = parseInt(document.getElementById('frequency-hz').value);
        params = {};
        if(dampingRatio != 0)
            params['dampingRatio'] = dampingRatio;
        if(frequencyHz != 0)
            params['frequencyHz'] = frequencyHz;
        console.log(params);
        box.addDistanceJoint('ball1', 'ball2', params);
        box.addDistanceJoint('ball3', 'ball2', params);

        setTimeout(function() {
            init();
        }, 50000);

    }

    /* ---- INPUT ----------------------------- */
    var mouseX, mouseY, isMouseDown;

    canvas.addEventListener("mousedown", function(e) {
        isMouseDown = true;
        handleMouseMove(e);
        document.addEventListener("mousemove", handleMouseMove, true);
    }, true);


    canvas.addEventListener("mouseup", function() {
        if(!isMouseDown)
            return;
        document.removeEventListener("mousemove", handleMouseMove, true);
        isMouseDown = false;
        mouseX = undefined;
        mouseY = undefined;
    }, true);

    function handleMouseMove(e) {
        mouseX = (e.clientX - canvas.getBoundingClientRect().left) / SCALE;
        mouseY = (e.clientY - canvas.getBoundingClientRect().top) / SCALE;
    };

    /* ------------------------------------------ */

    init(); (function loop(animStart) {
        update(animStart);
        draw();
        requestAnimFrame(loop);
    })();
});
