// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(/* function */callback, /* DOMElement */element) {
        window.setTimeout(callback, 1000 / 60);
    };

})();
$(document).ready(function() {
    var canvas = document.getElementById("c");
    var ctx = canvas.getContext("2d");

    var world;

    function init() {
        var b2Vec2 = Box2D.Common.Math.b2Vec2
        var b2BodyDef = Box2D.Dynamics.b2BodyDef
        var b2Body = Box2D.Dynamics.b2Body
        var b2FixtureDef = Box2D.Dynamics.b2FixtureDef
        var b2Fixture = Box2D.Dynamics.b2Fixture
        var b2World = Box2D.Dynamics.b2World
        var b2MassData = Box2D.Collision.Shapes.b2MassData
        var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
        var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
        var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
        
        world = new b2World(new b2Vec2(0, 10)//gravity
        , true                 //allow sleep
        );

        var SCALE = 30;

        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.2;

        var bodyDef = new b2BodyDef;

        //create ground
        bodyDef.type = b2Body.b2_staticBody;

        // positions the center of the object (not upper left!)
        bodyDef.position.x = canvas.width / 2 / SCALE;
        bodyDef.position.y = canvas.height / SCALE;

        fixDef.shape = new b2PolygonShape;

        // half width, half height. eg actual height here is 1 unit
        fixDef.shape.SetAsBox((600 / SCALE) / 2, (10 / SCALE) / 2);
        world.CreateBody(bodyDef).CreateFixture(fixDef);

        //create some objects
        bodyDef.type = b2Body.b2_dynamicBody;
        for(var i = 0; i < 150; ++i) {
            if(Math.random() > 0.5) {
                fixDef.shape = new b2PolygonShape;
                fixDef.shape.SetAsBox(Math.random() + 0.1//half width
                , Math.random() + 0.1 //half height
                );
            }
            else {
                fixDef.shape = new b2CircleShape(Math.random() + 0.1 //radius
                );
            }
            bodyDef.position.x = Math.random() * 25;
            bodyDef.position.y = Math.random() * 10;
            world.CreateBody(bodyDef).CreateFixture(fixDef);
        }

        //setup debug draw
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(document.getElementById("c").getContext("2d"));
        debugDraw.SetDrawScale(SCALE);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        world.SetDebugDraw(debugDraw);

        setTimeout(init, 6000);
    }; // init()

    function update() {
        world.Step(1 / 60//frame-rate
        , 10//velocity iterations
        , 10       //position iterations
        );
        world.DrawDebugData();
        world.ClearForces();

        // stats.update();
        requestAnimFrame(update);
    }; // update()

    init();
    requestAnimFrame(update);
});