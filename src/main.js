// import required staff
import { k } from "./kaboomCtx";
import { displayDialogue } from "./utils";

// load spritesheet to kaboom
k.loadSprite("spritesheet", "./spritesheet.png", {
    sliceX: 39,
    sliceY: 31,
    anims: {
        "idle-down": 936,
        "walk-down": {from: 936, to: 939, loop: true, speed: 8},
        "idle-side": 936,
        "walk-side": {from: 975, to: 978, loop: true, speed: 8},
        "idle-up": 936,
        "walk-up": {from: 1014, to: 1017, loop: true, speed: 8},

    }
});

// load map to kaboom
k.loadSprite("map", "./map.png");

// set background for game
k.setBackground(k.Color.fromHex("#311047"));

// create game scene
k.scene("main", async () => {
    // game logic

    const mapData = await (await fetch("./map.json")).json();
    const layers = mapData.layers;
    const map = k.add([k.sprite("map"), k.pos(0), k.scale(4)]);

    // inicialise player

    const player = k.make([
        k.sprite("spritesheet", { anim: "idle-down"}), 
        k.area({
            shape: new k.Rect(k.vec2(0,3), 10, 10),
        }),
        k.body(),
        k.anchor("center"),
        k.pos(),
        k.scale(4),
        {
            speed: 250,
            direction: "down",
            isInDialogue: false,
        },
        "player",
    ]);

    for (const layer of layers) {
        if(layer.name === "boundaries") {
            for (const boundary of layer.objects) { 
                map.add([
                    k.area({
                        shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
                    }),
                    k.body({isStatic: true}),
                    k.pos(boundary.x, boundary.y),
                    boundary.name
                ])
                
                if(boundary.name) {
                    player.onCollide(boundary.name, () => {
                        player.isInDialogue = true;
                        //display dialog window
                        displayDialogue("TEST", () => (player.isInDialogue = false));
                    });
                }
            }

            continue;
        }

        if(layer.name == "spawnpoints") {
            for(const entity of layers.objects) {
                if(entity.name === "player") {
                    player.pos = k.vec2(
                        (map.pos.x + entity.x) * 4,
                        (map.pos.y + entity.y) * 4,
                    );
                    k.add(player);
                    continue;
                }
            }
        }
    }
});

// specify main scene
k.go("main");