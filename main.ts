namespace SpriteKind {
    export const Door = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Key = SpriteKind.create()
}
sprites.onCreated(SpriteKind.Enemy, function (sprite) {
    sprite.setImage(img`
        . . . . c c c c c c . . . . . . 
        . . . c 6 7 7 7 7 6 c . . . . . 
        . . c 7 7 7 7 7 7 7 7 c . . . . 
        . c 6 7 7 7 7 7 7 7 7 6 c . . . 
        . c 7 c 6 6 6 6 c 7 7 7 c . . . 
        . f 7 6 f 6 6 f 6 7 7 7 f . . . 
        . f 7 7 7 7 7 7 7 7 7 7 f . . . 
        . . f 7 7 7 7 6 c 7 7 6 f c . . 
        . . . f c c c c 7 7 6 f 7 7 c . 
        . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
        . c 7 7 2 7 7 c f c 6 7 7 6 c c 
        c 1 1 1 1 7 6 f c c 6 6 6 c . . 
        f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
        f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
        . f 6 1 1 1 1 1 1 6 6 6 f . . . 
        . . c c c c c c c c c f . . . . 
        `)
    animation.runImageAnimation(
    sprite,
    [img`
        . . . . c c c c c c . . . . . . 
        . . . c 6 7 7 7 7 6 c . . . . . 
        . . c 7 7 7 7 7 7 7 7 c . . . . 
        . c 6 7 7 7 7 7 7 7 7 6 c . . . 
        . c 7 c 6 6 6 6 c 7 7 7 c . . . 
        . f 7 6 f 6 6 f 6 7 7 7 f . . . 
        . f 7 7 7 7 7 7 7 7 7 7 f . . . 
        . . f 7 7 7 7 6 c 7 7 6 f c . . 
        . . . f c c c c 7 7 6 f 7 7 c . 
        . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
        . c 7 7 2 7 7 c f c 6 7 7 6 c c 
        c 1 1 1 1 7 6 f c c 6 6 6 c . . 
        f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
        f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
        . f 6 1 1 1 1 1 1 6 6 6 f . . . 
        . . c c c c c c c c c f . . . . 
        `,img`
        . . . c c c c c c . . . . . . . 
        . . c 6 7 7 7 7 6 c . . . . . . 
        . c 7 7 7 7 7 7 7 7 c . . . . . 
        c 6 7 7 7 7 7 7 7 7 6 c . . . . 
        c 7 c 6 6 6 6 c 7 7 7 c . . . . 
        f 7 6 f 6 6 f 6 7 7 7 f . . . . 
        f 7 7 7 7 7 7 7 7 7 7 f . . . . 
        . f 7 7 7 7 6 c 7 7 6 f . . . . 
        . . f c c c c 7 7 6 f c c c . . 
        . . c 6 2 7 7 7 f c c 7 7 7 c . 
        . c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
        . c 1 1 1 1 7 6 6 c 6 6 6 c c c 
        . c 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . c 6 1 1 1 1 1 6 6 6 6 6 c . . 
        . . c 6 1 1 1 1 1 7 6 6 c c . . 
        . . . c c c c c c c c c c . . . 
        `],
    300,
    true
    )
})
function can_exit_level () {
    if (current_level == 2) {
        // Checks if the current level is 3 and then requires all the coins to be collected before leaving the level.
        if (sprites.allOfKind(SpriteKind.Coin).length != 0) {
            game.splash("Collect all the coins", "to leave the level")
        } else {
            current_level = current_level + 1
            set_level(current_level)
        }
    } else if (current_level == 4) {
        // In level 4, you need the key to leave the level
        if (has_key) {
            current_level = current_level + 1
            set_level(current_level)
        } else {
            game.splash("The door is locked")
        }
    } else {
        current_level = current_level + 1
        set_level(current_level)
    }
}
function climb_ladder () {
    // Adds the ability to climb ladders
    if (hero.tileKindAt(TileDirection.Center, sprites.dungeon.stairSouth)) {
        hero.ay = 0
        controller.moveSprite(hero, player_speed, player_speed)
    } else if (hero.tileKindAt(TileDirection.Center, sprites.dungeon.stairWest)) {
        hero.ay = 0
        controller.moveSprite(hero, player_speed, player_speed)
    } else {
        controller.moveSprite(hero, player_speed, 0)
        hero.ay = gravity
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
    music.baDing.play()
})
function adjust_healthbar () {
    if (tiles.tileAtLocationEquals(tiles.locationOfSprite(hero), assets.tile`myTile1`)) {
        statusbar.value += -1
    } else {
        statusbar.value += 0.05
    }
    if (statusbar.value == 100) {
        statusbar.attachToSprite(hero)
        statusbar.setBarSize(0, 0)
    } else {
        statusbar.setBarSize(20, 4)
        statusbar.setOffsetPadding(0, 2)
    }
}
function set_level (level_number: number) {
    level1 = tiles.createMap(tilemap`level1`)
    level2 = tiles.createMap(tilemap`level2`)
    level3 = tiles.createMap(tilemap`level8`)
    level4 = tiles.createMap(tilemap`level9`)
    if (level_number == 1) {
        game.splash("A Simple Platformer", "by Trevor McGarrah")
        game.splash("Level 1")
        game.splash("Press B ", "to use the Door")
        pause(100)
        tiles.loadMap(level1)
        tiles.placeOnRandomTile(hero, assets.tile`myTile2`)
    }
    if (level_number == 2) {
        clear_level()
        game.splash("Level 2")
        game.splash("Collect all the coins", "to complete level")
        tiles.loadMap(level2)
        tiles.placeOnRandomTile(hero, assets.tile`myTile2`)
        replace_tiles()
    }
    if (level_number == 3) {
        clear_level()
        game.splash("Level 3")
        game.splash("Use the UP and DOWN", "arrows to use ladder")
        tiles.loadMap(level3)
        tiles.placeOnRandomTile(hero, assets.tile`myTile2`)
        replace_tiles()
    }
    if (level_number == 4) {
        clear_level()
        game.splash("Level 4")
        game.splash("Find the key", "to unlock the door")
        tiles.loadMap(level4)
        has_key = false
        tiles.placeOnRandomTile(hero, assets.tile`myTile2`)
        replace_tiles()
    }
    if (level_number == 5) {
        game.over(true, effects.smiles)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (tiles.tileAtLocationEquals(tiles.locationOfSprite(hero), assets.tile`myTile1`)) {
        hero.vy = -110
    } else if (hero.isHittingTile(CollisionDirection.Bottom)) {
        do_jump(hero, jump_height)
    }
})
function clear_level () {
    tiles.destroySpritesOfKind(SpriteKind.Enemy)
    tiles.destroySpritesOfKind(SpriteKind.Door)
    tiles.destroySpritesOfKind(SpriteKind.Coin)
    tiles.destroySpritesOfKind(SpriteKind.Key)
}
function do_jump (sprite: Sprite, height: number) {
    hero.vy = 0 - Math.sqrt(2 * (height * gravity))
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Door, function (sprite, otherSprite) {
    if (controller.B.isPressed()) {
        can_exit_level()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Key, function (sprite, otherSprite) {
    otherSprite.destroy()
    has_key = true
    music.baDing.play()
})
sprites.onCreated(SpriteKind.Coin, function (sprite) {
    sprite.setImage(img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `)
    animation.runImageAnimation(
    sprite,
    [img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `,img`
        . . b b b . . . 
        . b 5 5 5 b . . 
        b 5 d 3 d 5 b . 
        b 5 3 5 1 5 b . 
        c 5 3 5 1 d c . 
        c 5 d 1 d d c . 
        . f d d d f . . 
        . . f f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . b 5 d 1 5 b . 
        . b 5 3 1 5 b . 
        . c 5 3 1 d c . 
        . c 5 1 d d c . 
        . . f d d f . . 
        . . . f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . . b 1 1 b . . 
        . . b 5 5 b . . 
        . . b d d b . . 
        . . c d d c . . 
        . . c 3 3 c . . 
        . . . f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . b 5 1 d 5 b . 
        . b 5 1 3 5 b . 
        . c d 1 3 5 c . 
        . c d d 1 5 c . 
        . . f d d f . . 
        . . . f f . . . 
        `,img`
        . . . b b b . . 
        . . b 5 5 5 b . 
        . b 5 d 3 d 5 b 
        . b 5 1 5 3 5 b 
        . c d 1 5 3 5 c 
        . c d d 1 d 5 c 
        . . f d d d f . 
        . . . f f f . . 
        `],
    100,
    true
    )
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.over(false, effects.dissolve)
})
sprites.onCreated(SpriteKind.Door, function (sprite) {
    sprite.setImage(img`
        . . f f f f f f f f f f f f . . 
        . . f e e e e e e e e e e f . . 
        . . f e e e e e e e e e e f . . 
        . . f e e e e e e e e e e f . . 
        . . f e e e e e e e e e e f . . 
        . . f e e e e e e e e e e f . . 
        . . f e e e e e e e e e e f . . 
        . . f e e e e e e e e e e f . . 
        . . f e e e e e e e 5 5 e f . . 
        . . f e e e e e e e 5 4 e f . . 
        . . f e e e e e e e e e e f . . 
        . . f e e e e e e e e e e f . . 
        . . f e e e e e e e e e e f . . 
        . . f e e e e e e e e e e f . . 
        . . f e e e e e e e e e e f . . 
        . . f e e e e e e e e e e f . . 
        `)
})
function enemy_contact (sprite: Sprite, otherSprite: Sprite) {
    if (sprite.vy <= 0) {
        otherSprite.destroy()
        scene.cameraShake(4, 500)
        statusbar.value += -25
        music.playMelody("C D D C - - - - ", 800)
    } else {
        otherSprite.destroy()
        sprite.vy = -75
        music.playMelody("F G E - - - - - ", 900)
    }
}
function replace_tiles () {
    tiles.createSpritesOnTiles(assets.tile`myTile4`, SpriteKind.Enemy)
    tiles.replaceAllTiles(assets.tile`myTile4`, assets.tile`transparency16`)
    tiles.createSpritesOnTiles(assets.tile`myTile5`, SpriteKind.Door)
    tiles.replaceAllTiles(assets.tile`myTile5`, assets.tile`transparency16`)
    tiles.replaceAllTiles(assets.tile`myTile2`, assets.tile`transparency16`)
    tiles.createSpritesOnTiles(assets.tile`myTile3`, SpriteKind.Coin)
    tiles.replaceAllTiles(assets.tile`myTile3`, assets.tile`transparency16`)
    tiles.createSpritesOnTiles(assets.tile`myTile6`, SpriteKind.Key)
    tiles.replaceAllTiles(assets.tile`myTile6`, assets.tile`transparency16`)
}
sprites.onCreated(SpriteKind.Key, function (sprite) {
    sprite.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . 5 5 . . . . . . . . . . . 
        . . 5 4 4 5 5 5 5 5 5 5 5 5 . . 
        . . 5 . . 4 4 4 4 4 4 4 4 4 . . 
        . . 4 5 5 4 . . . . . 4 . 4 . . 
        . . . 4 4 . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
})
function animate_player (sprite9: Sprite) {
    characterAnimations.loopFrames(
    hero,
    [img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f . . . . . 
        . c d f d d f d e e f . . . . . 
        . c d f d d f d e e f f . . . . 
        c d e e d d d d e e d d f . . . 
        c d d d d c d d e e b d c . . . 
        c c c c c d d e e e b d c . f f 
        . f d d d d e e e f f c . f e f 
        . f f f f f f e e e e f . f e f 
        . f f f f e e e e e e e f f e f 
        f d d f d d f e f e e e e f f . 
        f d b f d b f e f e e e e f . . 
        f f f f f f f f f f f f e f . . 
        . . . . . . . . . f c d d f . . 
        . . . . . . . . . . f f f f . . 
        `],
    200,
    characterAnimations.rule(Predicate.MovingLeft, Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    hero,
    [img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f f f . . . . 
        . . f d d d e e e e d d f . . . 
        . c d d d d d e e e b d c . . . 
        . c d d d d d d e e b d c . . . 
        c d d f d d f d e e f c . f f . 
        c d d f d d f d e e f . . f e f 
        c d e e d d d d e e f . . f e f 
        . f d d d c d e e f f . . f e f 
        . . f f f d e e e e e f . f e f 
        . . . . f e e e e e e e f f f . 
        . . . . f f e e e e e b f f . . 
        . . . f e f f e e c d d f f . . 
        . . f d d b d d c f f f . . . . 
        . . f d d c d d d f f . . . . . 
        . . . f f f f f f f . . . . . . 
        `],
    200,
    characterAnimations.rule(Predicate.MovingLeft, Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    hero,
    [img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . . f e e d f d d f d c . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d d d d e e d c 
        . . . c d b e e d d c d d d d c 
        f f . c d b e e e d d c c c c c 
        f e f . c f f e e e d d d d f . 
        f e f . f e e e e f f f f f f . 
        f e f f e e e e e e e f f f f . 
        . f f e e e e f e f d d f d d f 
        . . f e e e e f e f b d f b d f 
        . . f e f f f f f f f f f f f f 
        . . f d d c f . . . . . . . . . 
        . . f f f f . . . . . . . . . . 
        `],
    200,
    characterAnimations.rule(Predicate.MovingRight, Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    hero,
    [img`
        . . . . . . . f f f f f . . . . 
        . . . . f f f e e e e e f . . . 
        . . . f d d e e e e d d d f . . 
        . . . c d b e e e d d d d d c . 
        . . . c d b e e d d d d d d c . 
        . f f . c f e e d f d d f d d c 
        f e f . . f e e d f d d f d d c 
        f e f . . f e e d d d d e e d c 
        f e f . . f f e e d c d d d f . 
        f e f . f e e e e e d f f f . . 
        . f f f e e e e e e e f . . . . 
        . . f f b e e e e e f f . . . . 
        . . f f d d c e e f f e f . . . 
        . . . . f f f c d d b d d f . . 
        . . . . . f f d d d c d d f . . 
        . . . . . . f f f f f f f . . . 
        `],
    200,
    characterAnimations.rule(Predicate.MovingRight, Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    hero,
    [img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d f d d f d c . 
        . . . c d b e e d d d d e e d c 
        . . . c d b e e d d c d d d d c 
        . . . . c f e e e d d c c c c c 
        . . . . . f f e e e d d d d f . 
        . . . . f e e e e f f f f f . . 
        f f . f e e e e e e f f . . . . 
        f e . f e e f e e f e e f . . . 
        f e . f e e e f e e f e e f . . 
        f e f f e f b b f b d f d b f . 
        f f f f e b d d f d d f d d f . 
        . f f f f f f f f f f f f f . . 
        `,img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d f d d f d c . 
        . . . c d b e e d d d d e e d c 
        . . . c d b e e d d c d d d d c 
        . . . . c f e e e d d c c c c c 
        . . . . . f f e e e d d d d f . 
        . . . . f e e e f f e e e f . . 
        f f . f e e e e e f f f f f . . 
        f e . f e e f f e e f b d f . . 
        f e . f e e e f f e f d d f f . 
        f e f f e f b b e f f f f f f . 
        f f f f e b d d e e e f d d f . 
        . f f f f f f f f f f f f f . . 
        `,img`
        . . . . . . f f f f f . . . . . 
        . . . . . f e e e e e f . . . . 
        . . . . f e e d d d d d f . . . 
        . . . f f e d f f d d f f f . . 
        . . f d d e d d d d e e d d c . 
        . f f f d e d d c d d d d c c . 
        f d b f d e d d d c c c c d c . 
        f d d f f e e d d d d d d c . . 
        f f f e f f e e d d d d c . . . 
        . . f e e e f e e f f f . . . . 
        . f f f e e e e e e e f . . . . 
        . f e f f f e e e e e e f . . . 
        . f e f f f f f e e e e f f . . 
        . f e f f f b b f e e f d b f . 
        . f f f f b d d f e e f d d f . 
        . . f f f f f f f f f f f f f . 
        `,img`
        . . . . . . f f f f f . . . . . 
        . . . . . f e e e e e f . . . . 
        . . . . f e d d d d d d f . . . 
        . . . f f d f f d d f f d f . . 
        . . f d e d d d d e e d d d c . 
        . . f f e d d c d d d d c d c . 
        f f f f e d d d c c c c d d c . 
        f d b f f e d d d d d d d c . . 
        f d d f f f e e d d d d c . . . 
        f f f e e e f e e f f f . . . . 
        . f f f e e e e e e e f . . . . 
        . f e f f f e e e e e e f . . . 
        . f e f f f f f e e e e f f . . 
        . f e f f f b b f e e f d b f . 
        . f f f f b d d f f f f d d f . 
        . . f f f f f f f f f f f f f . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . f f e e d d d d d f . . 
        . . . f d d e e d f f d d d c . 
        . . . c d b e e d d d d e e d c 
        . . . c d b e e d d c d d f f c 
        . . . . f e e e f f f e f d d f 
        . . . . f f f f f e e e f d d f 
        . f f . f f e e e e e f f f f f 
        . f e . f f e e e f f e f f f . 
        . f e f f f b b f f e f d b f . 
        . f e f f b d d f e e f d d f . 
        . . f f f f f f f f f f f f f . 
        `,img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . f f e e d d f d d f . . 
        . . . f d d e e d d f d d d c . 
        . . . c d b e e d d d d e e d c 
        . . . c d b e e d d c d d d d c 
        . . . f c f e e d d d f f f f c 
        . . . . f e e e e f f f d b f . 
        . . . . f e e f f f e f d d f . 
        . f f . f f f e e e e f f f . . 
        . f e . f f e e e e f e e f . . 
        . f e f f f f f f f e e e f f . 
        . f e f f f b b f e e f d b f . 
        . f f f f b d d e e f f d d f . 
        . . f f f f f f f f f f f f f . 
        `],
    300,
    characterAnimations.rule(Predicate.NotMoving, Predicate.HittingWallDown)
    )
    characterAnimations.runFrames(
    hero,
    [img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . . f e e d f d d f d c . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d d d d e e d c 
        . . . c d b e e d d c d d d d c 
        f f . c d b e e e d d c c c c c 
        f e f . c f f e e e d d d d f . 
        f e f . f e e e e f f f f f f . 
        f e f f e e e e e e e f f f f . 
        . f f e e e e f e f d d f d d f 
        . . f e e e e f e f b d f b d f 
        . . f e f f f f f f f f f f f f 
        . . f d d c f . . . . . . . . . 
        . . f f f f . . . . . . . . . . 
        `],
    500,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.runFrames(
    hero,
    [img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f f f . . . . 
        . . f d d d e e e e d d f . . . 
        . c d d d d d e e e b d c . . . 
        . c d d d d d d e e b d c . . . 
        c d d f d d f d e e f c . f f . 
        c d d f d d f d e e f . . f e f 
        c d e e d d d d e e f . . f e f 
        . f d d d c d e e f f . . f e f 
        . . f f f d e e e e e f . f e f 
        . . . . f e e e e e e e f f f . 
        . . . . f f e e e e e b f f . . 
        . . . f e f f e e c d d f f . . 
        . . f d d b d d c f f f . . . . 
        . . f d d c d d d f f . . . . . 
        . . . f f f f f f f . . . . . . 
        `],
    500,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    hero,
    [img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e f e f e e f . . . 
        . . . f e e e f e f e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e f e e f e e e 3 f . . 
        . . c 3 e f e f e e e e 3 c . . 
        . . c c e f e f e e e e c c . . 
        . f e f e f e e f e e e f . . . 
        . f e e f e f e e f e f . . . . 
        . . f e e f e f e f f e f . . . 
        . . . f e e e f e f e e e f . . 
        . . . . f f e e e e e f e e f . 
        . . . . f e e e e e e f f e f . 
        . . . . f e e f f e e f . f . . 
        . . . . . f f . f e e f . . . . 
        . . . . . . . . . f f . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e e e e e e f . . . 
        . . . f e e e f f f e e f . . . 
        . . f 3 e e f e e e f e 3 f . . 
        . . f 3 e f e e f f e e 3 f . . 
        . . c 3 e f e f e e e e 3 c . . 
        . . c c e f e f e e e e c c . . 
        . . . f e f e e f e e e f . . . 
        . f f f f e f e e f e f f f f . 
        . f e e e f e f e f f e e e f . 
        . . f f e e e f e f e e f f . . 
        . . . . f f e e e e e f . . . . 
        . . . . f e e e e e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . . f f . . f f . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e f e f e e f . . . 
        . . . f e e e f e f e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e f e e f e e e 3 f . . 
        . . c 3 e f e f e e e e 3 c . . 
        . . c c e f e f e e e e c c . . 
        . . . f e f e e f e e e f e f . 
        . . . . f e f e e f e f e e f . 
        . . . f e f e f e f f e e f . . 
        . . f e e e e f e f e e f . . . 
        . f e e f e e e e e f f . . . . 
        . f e f f e e e e e e f . . . . 
        . . f . f e e f f e e f . . . . 
        . . . . f e e f . f f . . . . . 
        . . . . . f f . . . . . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e f e f e e f . . . 
        . . . f e e e f e f e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e e f e f e e e 3 f . . 
        . . c 3 e e f e f e e e 3 c . . 
        . . c c e e f e f e e e c c . . 
        . . . f e e f e f e e e f . . . 
        . f f f f e f e f f e f f f f . 
        . f e e e f f e f e f e e e f . 
        . . f f e e f e f e e e f f . . 
        . . . . f f e e e e e f . . . . 
        . . . . f e e e e e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . . f f . . f f . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e f e f e e e f . . . 
        . . . f e e f e f e e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e e e f e e f e 3 f . . 
        . . c 3 e e e e f e f e 3 c . . 
        . . c c e e e e f e f e c c . . 
        . f e f e e e f e e f e f . . . 
        . f e e f e f e e f e f . . . . 
        . . f e e f f e f e f e f . . . 
        . . . f e e f e f e e e e f . . 
        . . . . f f e e e e e f e e f . 
        . . . . f e e e e e e f f e f . 
        . . . . f e e f f e e f . f . . 
        . . . . . f f . f e e f . . . . 
        . . . . . . . . . f f . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e e e e e e f . . . 
        . . . f e e f f f e e e f . . . 
        . . f 3 e f e e e f e e 3 f . . 
        . . f 3 e e f f e e f e 3 f . . 
        . . c 3 e e e e f e f e 3 c . . 
        . . c c e e e e f e f e c c . . 
        . . . f e e e f e e f e f . . . 
        . f f f f e f e e f e f f f f . 
        . f e e e f f e f e f e e e f . 
        . . f f e e f e f e e e f f . . 
        . . . . f f e e e e e f . . . . 
        . . . . f e e e e e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . . f f . . f f . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e f e f e e e f . . . 
        . . . f e e f e f e e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e e e f e e f e 3 f . . 
        . . c 3 e e e e f e f e 3 c . . 
        . . c c e e e e f e f e c c . . 
        . . . f e e e f e e f e f e f . 
        . . . . f e f e e f e f e e f . 
        . . . f e f f e f e f e e f . . 
        . . f e e e f e f e e e f . . . 
        . f e e f e e e e e f f . . . . 
        . f e f f e e e e e e f . . . . 
        . . f . f e e f f e e f . . . . 
        . . . . f e e f . f f . . . . . 
        . . . . . f f . . . . . . . . . 
        `],
    200,
    characterAnimations.rule(Predicate.MovingUp, Predicate.FacingUp)
    )
    characterAnimations.loopFrames(
    hero,
    [img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e f e f e e f . . . 
        . . . f e e e f e f e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e f e e f e e e 3 f . . 
        . . c 3 e f e f e e e e 3 c . . 
        . . c c e f e f e e e e c c . . 
        . f e f e f e e f e e e f . . . 
        . f e e f e f e e f e f . . . . 
        . . f e e f e f e f f e f . . . 
        . . . f e e e f e f e e e f . . 
        . . . . f f e e e e e f e e f . 
        . . . . f e e e e e e f f e f . 
        . . . . f e e f f e e f . f . . 
        . . . . . f f . f e e f . . . . 
        . . . . . . . . . f f . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e e e e e e f . . . 
        . . . f e e e f f f e e f . . . 
        . . f 3 e e f e e e f e 3 f . . 
        . . f 3 e f e e f f e e 3 f . . 
        . . c 3 e f e f e e e e 3 c . . 
        . . c c e f e f e e e e c c . . 
        . . . f e f e e f e e e f . . . 
        . f f f f e f e e f e f f f f . 
        . f e e e f e f e f f e e e f . 
        . . f f e e e f e f e e f f . . 
        . . . . f f e e e e e f . . . . 
        . . . . f e e e e e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . . f f . . f f . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e f e f e e f . . . 
        . . . f e e e f e f e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e f e e f e e e 3 f . . 
        . . c 3 e f e f e e e e 3 c . . 
        . . c c e f e f e e e e c c . . 
        . . . f e f e e f e e e f e f . 
        . . . . f e f e e f e f e e f . 
        . . . f e f e f e f f e e f . . 
        . . f e e e e f e f e e f . . . 
        . f e e f e e e e e f f . . . . 
        . f e f f e e e e e e f . . . . 
        . . f . f e e f f e e f . . . . 
        . . . . f e e f . f f . . . . . 
        . . . . . f f . . . . . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e f e f e e f . . . 
        . . . f e e e f e f e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e e f e f e e e 3 f . . 
        . . c 3 e e f e f e e e 3 c . . 
        . . c c e e f e f e e e c c . . 
        . . . f e e f e f e e e f . . . 
        . f f f f e f e f f e f f f f . 
        . f e e e f f e f e f e e e f . 
        . . f f e e f e f e e e f f . . 
        . . . . f f e e e e e f . . . . 
        . . . . f e e e e e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . . f f . . f f . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e f e f e e e f . . . 
        . . . f e e f e f e e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e e e f e e f e 3 f . . 
        . . c 3 e e e e f e f e 3 c . . 
        . . c c e e e e f e f e c c . . 
        . f e f e e e f e e f e f . . . 
        . f e e f e f e e f e f . . . . 
        . . f e e f f e f e f e f . . . 
        . . . f e e f e f e e e e f . . 
        . . . . f f e e e e e f e e f . 
        . . . . f e e e e e e f f e f . 
        . . . . f e e f f e e f . f . . 
        . . . . . f f . f e e f . . . . 
        . . . . . . . . . f f . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e e e e e e f . . . 
        . . . f e e f f f e e e f . . . 
        . . f 3 e f e e e f e e 3 f . . 
        . . f 3 e e f f e e f e 3 f . . 
        . . c 3 e e e e f e f e 3 c . . 
        . . c c e e e e f e f e c c . . 
        . . . f e e e f e e f e f . . . 
        . f f f f e f e e f e f f f f . 
        . f e e e f f e f e f e e e f . 
        . . f f e e f e f e e e f f . . 
        . . . . f f e e e e e f . . . . 
        . . . . f e e e e e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . . f f . . f f . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e f e f e e e f . . . 
        . . . f e e f e f e e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e e e f e e f e 3 f . . 
        . . c 3 e e e e f e f e 3 c . . 
        . . c c e e e e f e f e c c . . 
        . . . f e e e f e e f e f e f . 
        . . . . f e f e e f e f e e f . 
        . . . f e f f e f e f e e f . . 
        . . f e e e f e f e e e f . . . 
        . f e e f e e e e e f f . . . . 
        . f e f f e e e e e e f . . . . 
        . . f . f e e f f e e f . . . . 
        . . . . f e e f . f f . . . . . 
        . . . . . f f . . . . . . . . . 
        `],
    200,
    characterAnimations.rule(Predicate.MovingDown, Predicate.FacingDown)
    )
    characterAnimations.loopFrames(
    hero,
    [img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e f e f e e f . . . 
        . . . f e e e f e f e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e f e e f e e e 3 f . . 
        . . c 3 e f e f e e e e 3 c . . 
        . . c c e f e f e e e e c c . . 
        . f e f e f e e f e e e f . . . 
        . f e e f e f e e f e f . . . . 
        . . f e e f e f e f f e f . . . 
        . . . f e e e f e f e e e f . . 
        . . . . f f e e e e e f e e f . 
        . . . . f e e e e e e f f e f . 
        . . . . f e e f f e e f . f . . 
        . . . . . f f . f e e f . . . . 
        . . . . . . . . . f f . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e e e e e e f . . . 
        . . . f e e e f f f e e f . . . 
        . . f 3 e e f e e e f e 3 f . . 
        . . f 3 e f e e f f e e 3 f . . 
        . . c 3 e f e f e e e e 3 c . . 
        . . c c e f e f e e e e c c . . 
        . . . f e f e e f e e e f . . . 
        . f f f f e f e e f e f f f f . 
        . f e e e f e f e f f e e e f . 
        . . f f e e e f e f e e f f . . 
        . . . . f f e e e e e f . . . . 
        . . . . f e e e e e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . . f f . . f f . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e f e f e e f . . . 
        . . . f e e e f e f e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e f e e f e e e 3 f . . 
        . . c 3 e f e f e e e e 3 c . . 
        . . c c e f e f e e e e c c . . 
        . . . f e f e e f e e e f e f . 
        . . . . f e f e e f e f e e f . 
        . . . f e f e f e f f e e f . . 
        . . f e e e e f e f e e f . . . 
        . f e e f e e e e e f f . . . . 
        . f e f f e e e e e e f . . . . 
        . . f . f e e f f e e f . . . . 
        . . . . f e e f . f f . . . . . 
        . . . . . f f . . . . . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e f e f e e f . . . 
        . . . f e e e f e f e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e e f e f e e e 3 f . . 
        . . c 3 e e f e f e e e 3 c . . 
        . . c c e e f e f e e e c c . . 
        . . . f e e f e f e e e f . . . 
        . f f f f e f e f f e f f f f . 
        . f e e e f f e f e f e e e f . 
        . . f f e e f e f e e e f f . . 
        . . . . f f e e e e e f . . . . 
        . . . . f e e e e e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . . f f . . f f . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e f e f e e e f . . . 
        . . . f e e f e f e e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e e e f e e f e 3 f . . 
        . . c 3 e e e e f e f e 3 c . . 
        . . c c e e e e f e f e c c . . 
        . f e f e e e f e e f e f . . . 
        . f e e f e f e e f e f . . . . 
        . . f e e f f e f e f e f . . . 
        . . . f e e f e f e e e e f . . 
        . . . . f f e e e e e f e e f . 
        . . . . f e e e e e e f f e f . 
        . . . . f e e f f e e f . f . . 
        . . . . . f f . f e e f . . . . 
        . . . . . . . . . f f . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e e e e e e f . . . 
        . . . f e e f f f e e e f . . . 
        . . f 3 e f e e e f e e 3 f . . 
        . . f 3 e e f f e e f e 3 f . . 
        . . c 3 e e e e f e f e 3 c . . 
        . . c c e e e e f e f e c c . . 
        . . . f e e e f e e f e f . . . 
        . f f f f e f e e f e f f f f . 
        . f e e e f f e f e f e e e f . 
        . . f f e e f e f e e e f f . . 
        . . . . f f e e e e e f . . . . 
        . . . . f e e e e e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . . f f . . f f . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e f e f e e e f . . . 
        . . . f e e f e f e e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e e e f e e f e 3 f . . 
        . . c 3 e e e e f e f e 3 c . . 
        . . c c e e e e f e f e c c . . 
        . . . f e e e f e e f e f e f . 
        . . . . f e f e e f e f e e f . 
        . . . f e f f e f e f e e f . . 
        . . f e e e f e f e e e f . . . 
        . f e e f e e e e e f f . . . . 
        . f e f f e e e e e e f . . . . 
        . . f . f e e f f e e f . . . . 
        . . . . f e e f . f f . . . . . 
        . . . . . f f . . . . . . . . . 
        `],
    200,
    characterAnimations.rule(Predicate.FacingRight, Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    hero,
    [img`
        . . . . f f f f f f f . . . . . 
        . . . f e e e e e e e f . . . . 
        . . c 3 e e e e e e e 3 c . . . 
        . . c 3 e e e e e e e 3 c . . . 
        . f c 3 e e e e e e e 3 c . . . 
        . f e f e e e e e e e f . . . . 
        . f e e f e e e e e f e f . . . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e f f e f . . 
        . . . . f f f f e e f . f f . . 
        . f f . f e e e e e f . . . . . 
        f e e f e e f e e e f . . . . . 
        f e e e e f e f e e f . . . . . 
        . f f f f e f . f e f . . . . . 
        . . . . f f f . f e f . . . . . 
        . . . . . . . . f f f . . . . . 
        `,img`
        . . . . f f f f f f f . . . . . 
        . . . f e e e e e e e f . . . . 
        . . c 3 e e e e e e e 3 c . . . 
        . . c 3 e e e e e e e 3 c . . . 
        . . c 3 e e e e e e e 3 c . . . 
        . . . f e e e e e e e f . . . . 
        . f f f f e e e e e f f f f . . 
        . f e e e e e e e e e e e f . . 
        . f f f e e e e e e f f f f . . 
        . . . . f f f f e e f . . . . . 
        . . . . f e e e e e f . . . . . 
        . f f f e e f e e e f . . . . . 
        f e e e e f e f e e f . . . . . 
        f e f f f e e f e e f . . . . . 
        f e e f f f f f f f f . . . . . 
        . f f . . . . . . . . . . . . . 
        `,img`
        . . . f f f f f f f . . . . . . 
        . . f e e e e e e e f . . . . . 
        . c 3 e e e e e e e 3 c . . . . 
        . c 3 e e e e e e e 3 c . . . . 
        . c 3 e e e e e e e 3 c f f . . 
        . . f e e e e e e e f e e f . . 
        . f e f e e e e e f e e e f . . 
        . f e e e e e e e e e e f . . . 
        . f e f f e e e e e e f . . . . 
        . f f . f e e e e e f . . . . . 
        . . . . f e e e e e f . . . . . 
        . . . f e e f e e e f . . . . . 
        . . f e e f e f e e f . . . . . 
        . . f e f f f . f e f . . . . . 
        . . f e e e f . f f f . . . . . 
        . . . f f f f . . . . . . . . . 
        `,img`
        . . . f f f f f f f . . . . . . 
        . . f e e e e e e e f . . . . . 
        . c 3 e e e e e e e 3 c . . . . 
        . c 3 e e e e e e e 3 c . . . . 
        . c 3 e e e e e e e 3 c . . . . 
        . . f e e e e e e e f . . . . . 
        . f f f f e e e e e f f f f . . 
        . f e e e e e e e e e e e f . . 
        . f f f e e e e e e f f f f . . 
        . . . . f f f f e e f . . . . . 
        . . . f f e e e e e f . . . . . 
        . . f e e e f e e e f . . . . . 
        . f e e f f e f e e f . . . . . 
        . f e f f e e f e e f . . . . . 
        . f e f f f f f f f f . . . . . 
        . f f f . . . . . . . . . . . . 
        `,img`
        . . . . f f f f f f f . . . . . 
        . . . f e e e e e e e f . . . . 
        . . c 3 e e e e e e e 3 c . . . 
        . . c 3 e e e e e e e 3 c . . . 
        . f c 3 e e e e e e e 3 c . . . 
        . f e f e e e e e e e f . . . . 
        . f e e f e e e e e f e f . . . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e f f e f . . 
        . . . . f f f f e e f . f f . . 
        . f f . f e e e e e f . . . . . 
        f e e f e e f e e e f . . . . . 
        f e e e e f e f e e f . . . . . 
        . f f f f e f . f e f . . . . . 
        . . . . f f f . f e f . . . . . 
        . . . . . . . . f f f . . . . . 
        `,img`
        . . . . f f f f f f f . . . . . 
        . . . f e e e e e e e f . . . . 
        . . c 3 e e e e e e e 3 c . . . 
        . . c 3 e e e e e e e 3 c . . . 
        . . c 3 e e e e e e e 3 c . . . 
        . . . f e e e e e e e f . . . . 
        . f f f f e e e e e f f f f . . 
        . f e e e e e e e e e e e f . . 
        . f f f e e e e e e f f f f . . 
        . . . . f f f f e e f . . . . . 
        . . . . f e e e e e f . . . . . 
        . f f f e e f e e e f . . . . . 
        f e e e e f e f e e f . . . . . 
        f e f f f e e f e e f . . . . . 
        f e e f f f f f f f f . . . . . 
        . f f . . . . . . . . . . . . . 
        `,img`
        . . . . . f f f f f f f . . . . 
        . . . . f e e e e e e e f . . . 
        . . . c 3 e e e e e e e 3 c . . 
        . . . c 3 e e e e e e e 3 c . . 
        . . . c 3 e e e e e e e 3 c . . 
        . . . f f e e e e e e e f e . . 
        . . f e f e e e e e f e e f . . 
        . f e e e e e e e e e e f . . . 
        . f e f f e e e e e e . . . . . 
        . f f . f f f f e e f . . . . . 
        . . . . f e e e e e f . . . . . 
        . . . . f e f e e e f . . . . . 
        . . . . f e f f e e f . . . . . 
        . . . f f e f . f e f . . . . . 
        . . f e e e f . f f f . . . . . 
        . . . f f f f . . . . . . . . . 
        `,img`
        . . . . . f f f f f f f . . . . 
        . . . . f e e e e e e e f . . . 
        . . . c 3 e e e e e e e 3 c . . 
        . . . c 3 e e e e e e e 3 c . . 
        . . . c 3 e e e e e e e 3 c . . 
        . . . . f e e e e e e e f . . . 
        . f f f f e e e e e f f f f . . 
        . f e e e e e e e e e e e f . . 
        . f f f e e e e e e f f f f . . 
        . . . . f f f f e e f . . . . . 
        . . . . f e e e e e f . . . . . 
        . . . f e e f e e e f . . . . . 
        . f f e e f e f e e f . . . . . 
        f e f e f e e f e e f . . . . . 
        f e e e f f f f f f f . . . . . 
        . f f f . . . . . . . . . . . . 
        `],
    200,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    hero,
    [img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e f e f e e f . . . 
        . . . f e e e f e f e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e f e e f e e e 3 f . . 
        . . c 3 e f e f e e e e 3 c . . 
        . . c c e f e f e e e e c c . . 
        . f e f e f e e f e e e f . . . 
        . f e e f e f e e f e f . . . . 
        . . f e e f e f e f f e f . . . 
        . . . f e e e f e f e e e f . . 
        . . . . f f e e e e e f e e f . 
        . . . . f e e e e e e f f e f . 
        . . . . f e e f f e e f . f . . 
        . . . . f e e f f e e f . . . . 
        . . . . . f f . . f f . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e e e e e e f . . . 
        . . . f e e e f f f e e f . . . 
        . . f 3 e e f e e e f e 3 f . . 
        . . f 3 e f e e f f e e 3 f . . 
        . . c 3 e f e f e e e e 3 c . . 
        . . c c e f e f e e e e c c . . 
        . f e f e f e e f e e e f . . . 
        . f e e f e f e e f e f f f f . 
        . . f e e f e f e f f e e e f . 
        . . . f e e e f e f e e f f . . 
        . . . . f f e e e e e f . . . . 
        . . . . f e e e e e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . . f f . . f f . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e f e f e e f . . . 
        . . . f e e e f e f e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e f e e f e e e 3 f . . 
        . . c 3 e f e f e e e e 3 c . . 
        . . c c e f e f e e e e c c . . 
        . f e f e f e e f e e e f . . . 
        . f e e f e f e e f e f f f f . 
        . . f e e f e f e f f e e e f . 
        . . . f e e e f e f e e f f . . 
        . . . . f f e e e e e f . . . . 
        . . . . f e e e e e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . . f f . . f f . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e f e f e e f . . . 
        . . . f e e e f e f e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e e f e f e e e 3 f . . 
        . . c 3 e e f e f e e e 3 c . . 
        . . c c e e f e f e e e c c . . 
        . f e f e e f e f e e e f e f . 
        . f e e f e f e f f e f e e f . 
        . . f e e f f e f e f e e f f . 
        . . . f e e f e f e e e f f . . 
        . . . . f f e e e e e f . . . . 
        . . . . f e e e e e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . . f f . . f f . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e f e f e e e f . . . 
        . . . f e e f e f e e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e e e f e e f e 3 f . . 
        . . c 3 e e e e f e f e 3 c . . 
        . . c c e e e e f e f e c c . . 
        . f e f e e e f e e f e f . . . 
        . f e e f e f e e f e f f f f . 
        . . f e e f f e f e f e e e f . 
        . . . f e e f e f e e e f f . . 
        . . . . f f e e e e e f . . . . 
        . . . . f e e e e e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . . f f . . f f . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e e e e e e e f . . . 
        . . . f e e f f f e e e f . . . 
        . . f 3 e f e e e f e e 3 f . . 
        . . f 3 e e f f e e f e 3 f . . 
        . . c 3 e e e e f e f e 3 c . . 
        . . c c e e e e f e f e c c . . 
        . f e f e e e f e e f e f . . . 
        . f e e f e f e e f e f f f f . 
        . . f e e f f e f e f e e e f . 
        . . . f e e f e f e e e f f . . 
        . . . . f f e e e e e f . . . . 
        . . . . f e e e e e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . . f f . . f f . . . . . 
        `,img`
        . . . . f f f f f f f f . . . . 
        . . . f e e f e f e e e f . . . 
        . . . f e e f e f e e e f . . . 
        . . f 3 e e f e e f e e 3 f . . 
        . . f 3 e e e f e e f e 3 f . . 
        . . c 3 e e e e f e f e 3 c . . 
        . . c c e e e e f e f e c c . . 
        . f e f e e e f e e f e f . . . 
        . f e e f e f e e f e f f f f . 
        . . f e e f f e f e f e e e f . 
        . . . f e e f e f e e e f f . . 
        . . . . f f e e e e e f . . . . 
        . . . . f e e e e e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . f e e f f e e f . . . . 
        . . . . . f f . . f f . . . . . 
        `],
    200,
    characterAnimations.rule(Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    hero,
    [img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f . . . . . 
        . c d f d d f d e e f f . . . . 
        . c d f d d f d e e d d f . . . 
        c d e e d d d d e e b d c . . . 
        c d d d d c d d e e b d c . . . 
        c c c c c d d e e e f c . . . . 
        . f d d d d e e e f f . . . . . 
        . . f f f f f e e e e f . . . . 
        . . . . f f e e e e e e f . f f 
        . . . f e e f e e f e e f . e f 
        . . f e e f e e f e e e f . e f 
        . f b d f d b f b b f e f f e f 
        . f d d f d d f d d b e f f f f 
        . . f f f f f f f f f f f f f . 
        `,img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f . . . . . 
        . c d f d d f d e e f f . . . . 
        . c d f d d f d e e d d f . . . 
        c d e e d d d d e e b d c . . . 
        c d d d d c d d e e b d c . . . 
        c c c c c d d e e e f c . . . . 
        . f d d d d e e e f f . . . . . 
        . . f e e e f f e e e f . . . . 
        . . f f f f f e e e e e f . f f 
        . . f d b f e e f f e e f . e f 
        . f f d d f e f f e e e f . e f 
        . f f f f f f e b b f e f f e f 
        . f d d f e e e d d b e f f f f 
        . . f f f f f f f f f f f f f . 
        `,img`
        . . . . . f f f f f . . . . . . 
        . . . . f e e e e e f . . . . . 
        . . . f d d d d d e e f . . . . 
        . . f f f d d f f d e f f . . . 
        . c d d e e d d d d e d d f . . 
        . c c d d d d c d d e d f f f . 
        . c d c c c c d d d e d f b d f 
        . . c d d d d d d e e f f d d f 
        . . . c d d d d e e f f e f f f 
        . . . . f f f e e f e e e f . . 
        . . . . f e e e e e e e f f f . 
        . . . f e e e e e e f f f e f . 
        . . f f e e e e f f f f f e f . 
        . f b d f e e f b b f f f e f . 
        . f d d f e e f d d b f f f f . 
        . f f f f f f f f f f f f f . . 
        `,img`
        . . . . . f f f f f . . . . . . 
        . . . . f e e e e e f . . . . . 
        . . . f d d d d d d e f . . . . 
        . . f d f f d d f f d f f . . . 
        . c d d d e e d d d d e d f . . 
        . c d c d d d d c d d e f f . . 
        . c d d c c c c d d d e f f f f 
        . . c d d d d d d d e f f b d f 
        . . . c d d d d e e f f f d d f 
        . . . . f f f e e f e e e f f f 
        . . . . f e e e e e e e f f f . 
        . . . f e e e e e e f f f e f . 
        . . f f e e e e f f f f f e f . 
        . f b d f e e f b b f f f e f . 
        . f d d f f f f d d b f f f f . 
        . f f f f f f f f f f f f f . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f . . . . . 
        . . f d d d d d e e f f . . . . 
        . c d d d f f d e e d d f . . . 
        c d e e d d d d e e b d c . . . 
        c f f d d c d d e e b d c . . . 
        f d d f e f f f e e e f . . . . 
        f d d f e e e f f f f f . . . . 
        f f f f f e e e e e f f . f f . 
        . f f f e f f e e e f f . e f . 
        . f b d f e f f b b f f f e f . 
        . f d d f e e f d d b f f e f . 
        . f f f f f f f f f f f f f . . 
        `,img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f . . . . . 
        . . f d d f d d e e f f . . . . 
        . c d d d f d d e e d d f . . . 
        c d e e d d d d e e b d c . . . 
        c d d d d c d d e e b d c . . . 
        c f f f f d d d e e f c f . . . 
        . f b d f f f e e e e f . . . . 
        . f d d f e f f f e e f . . . . 
        . . f f f e e e e f f f . f f . 
        . . f e e f e e e e f f . e f . 
        . f f e e e f f f f f f f e f . 
        . f b d f e e f b b f f f e f . 
        . f d d f f e e d d b f f f f . 
        . f f f f f f f f f f f f f . . 
        `],
    300,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving, Predicate.HittingWallDown)
    )
    characterAnimations.loopFrames(
    hero,
    [img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d f d d f d c . 
        . . . c d b e e d d d d e e d c 
        . . . c d b e e d d c d d d d c 
        . . . . c f e e e d d c c c c c 
        . . . . . f f e e e d d d d f . 
        . . . . f e e e e f f f f f . . 
        f f . f e e e e e e f f . . . . 
        f e . f e e f e e f e e f . . . 
        f e . f e e e f e e f e e f . . 
        f e f f e f b b f b d f d b f . 
        f f f f e b d d f d d f d d f . 
        . f f f f f f f f f f f f f . . 
        `,img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d f d d f d c . 
        . . . c d b e e d d d d e e d c 
        . . . c d b e e d d c d d d d c 
        . . . . c f e e e d d c c c c c 
        . . . . . f f e e e d d d d f . 
        . . . . f e e e f f e e e f . . 
        f f . f e e e e e f f f f f . . 
        f e . f e e f f e e f b d f . . 
        f e . f e e e f f e f d d f f . 
        f e f f e f b b e f f f f f f . 
        f f f f e b d d e e e f d d f . 
        . f f f f f f f f f f f f f . . 
        `,img`
        . . . . . . f f f f f . . . . . 
        . . . . . f e e e e e f . . . . 
        . . . . f e e d d d d d f . . . 
        . . . f f e d f f d d f f f . . 
        . . f d d e d d d d e e d d c . 
        . f f f d e d d c d d d d c c . 
        f d b f d e d d d c c c c d c . 
        f d d f f e e d d d d d d c . . 
        f f f e f f e e d d d d c . . . 
        . . f e e e f e e f f f . . . . 
        . f f f e e e e e e e f . . . . 
        . f e f f f e e e e e e f . . . 
        . f e f f f f f e e e e f f . . 
        . f e f f f b b f e e f d b f . 
        . f f f f b d d f e e f d d f . 
        . . f f f f f f f f f f f f f . 
        `,img`
        . . . . . . f f f f f . . . . . 
        . . . . . f e e e e e f . . . . 
        . . . . f e d d d d d d f . . . 
        . . . f f d f f d d f f d f . . 
        . . f d e d d d d e e d d d c . 
        . . f f e d d c d d d d c d c . 
        f f f f e d d d c c c c d d c . 
        f d b f f e d d d d d d d c . . 
        f d d f f f e e d d d d c . . . 
        f f f e e e f e e f f f . . . . 
        . f f f e e e e e e e f . . . . 
        . f e f f f e e e e e e f . . . 
        . f e f f f f f e e e e f f . . 
        . f e f f f b b f e e f d b f . 
        . f f f f b d d f f f f d d f . 
        . . f f f f f f f f f f f f f . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . f f e e d d d d d f . . 
        . . . f d d e e d f f d d d c . 
        . . . c d b e e d d d d e e d c 
        . . . c d b e e d d c d d f f c 
        . . . . f e e e f f f e f d d f 
        . . . . f f f f f e e e f d d f 
        . f f . f f e e e e e f f f f f 
        . f e . f f e e e f f e f f f . 
        . f e f f f b b f f e f d b f . 
        . f e f f b d d f e e f d d f . 
        . . f f f f f f f f f f f f f . 
        `,img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . f f e e d d f d d f . . 
        . . . f d d e e d d f d d d c . 
        . . . c d b e e d d d d e e d c 
        . . . c d b e e d d c d d d d c 
        . . . f c f e e d d d f f f f c 
        . . . . f e e e e f f f d b f . 
        . . . . f e e f f f e f d d f . 
        . f f . f f f e e e e f f f . . 
        . f e . f f e e e e f e e f . . 
        . f e f f f f f f f e e e f f . 
        . f e f f f b b f e e f d b f . 
        . f f f f b d d e e f f d d f . 
        . . f f f f f f f f f f f f f . 
        `],
    300,
    characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving, Predicate.HittingWallDown)
    )
    characterAnimations.loopFrames(
    hero,
    [img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d f d d f d c . 
        . . . c d b e e d d d d e e d c 
        f f . c d b e e d d c d d d d c 
        f e f . c f e e d d d c c c c c 
        f e f . . f f e e d d d d d f . 
        f e f . f e e e e f f f f f . . 
        f e f f e e e e e e e f . . . . 
        . f f e e e e f e f f e f . . . 
        . . f e e e e f e f f e f . . . 
        . . . f e f f b d f b d f . . . 
        . . . f d b b d d c d d f . . . 
        . . . f f f f f f f f f . . . . 
        `,img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . . f e e d f d d f d c . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d d d d e e d c 
        . . . c d b e e d d c d d d d c 
        f f . c d b e e e d d c c c c c 
        f e f . c f f e e e d d d d f . 
        f e f . f e e e e f f f f f f . 
        f e f f e e e e e e e f f f f . 
        . f f e e e e f e f d d f d d f 
        . . f e e e e f e f b d f b d f 
        . . f e f f f f f f f f f f f f 
        . . f d d c f . . . . . . . . . 
        . . f f f f . . . . . . . . . . 
        `,img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . f f e e e d d d d f . . 
        . . . f d d e e d d d d d d c . 
        . . . c d b e e d f d d f d c . 
        f f . c d b e e d f d d f d d c 
        f e f . c f e e d d d d e e d c 
        f e f . . f e e e d c d d d d c 
        f e f . . f f e e e d c c c f . 
        f e f . f e e e e f f f f f . . 
        . f f f e e e e e e e f . . . . 
        . . f e e e e f e e f e f f . . 
        . . f e e e f f f e e f f e f . 
        . f b f f f f f f c d d b d d f 
        . f d d c f . . f d d d c d d f 
        . . f f f . . . f f f f f f f . 
        `,img`
        . . . . . . . f f f f f . . . . 
        . . . . f f f e e e e e f . . . 
        . . . f d d e e e e d d d f . . 
        . . . c d b e e e d d d d d c . 
        . . . c d b e e d d d d d d c . 
        . f f . c f e e d f d d f d d c 
        f e f . . f e e d f d d f d d c 
        f e f . . f e e d d d d e e d c 
        f e f . . f f e e d c d d d f . 
        f e f . f e e e e e d f f f . . 
        . f f f e e e e e e e f . . . . 
        . . f f b e e e e e f f . . . . 
        . . f f d d c e e f f e f . . . 
        . . . . f f f c d d b d d f . . 
        . . . . . f f d d d c d d f . . 
        . . . . . . f f f f f f f . . . 
        `,img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d f d d f d c . 
        . . . c d b e e d d d d e e d c 
        . . . c d b e e d d c d d d d c 
        . . . . c f e e e d d c c c c c 
        . . . . . f f e e e d d d d f . 
        . . . . f e e e e f f f f f . . 
        f f . f e e e e e e f f . . . . 
        f e . f e e f e e f e e f . . . 
        f e . f e e e f e e f e e f . . 
        f e f f e f b b f b d f d b f . 
        f f f f e b d d f d d f d d f . 
        . f f f f f f f f f f f f f . . 
        `],
    200,
    characterAnimations.rule(Predicate.MovingRight, Predicate.FacingRight, Predicate.HittingWallDown)
    )
    characterAnimations.loopFrames(
    hero,
    [img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f . . . . . 
        . c d f d d f d e e f f . . . . 
        . c d f d d f d e e d d f . . . 
        c d e e d d d d e e b d c . . . 
        c d d d d c d d e e b d c . f f 
        c c c c c d d d e e f c . f e f 
        . f d d d d d e e f f . . f e f 
        . . f f f f f e e e e f . f e f 
        . . . . f e e e e e e e f f e f 
        . . . f e f f e f e e e e f f . 
        . . . f e f f e f e e e e f . . 
        . . . f d b f d b f f e f . . . 
        . . . f d d c d d b b d f . . . 
        . . . . f f f f f f f f f . . . 
        `,img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f . . . . . 
        . c d f d d f d e e f . . . . . 
        . c d f d d f d e e f f . . . . 
        c d e e d d d d e e d d f . . . 
        c d d d d c d d e e b d c . . . 
        c c c c c d d e e e b d c . f f 
        . f d d d d e e e f f c . f e f 
        . f f f f f f e e e e f . f e f 
        . f f f f e e e e e e e f f e f 
        f d d f d d f e f e e e e f f . 
        f d b f d b f e f e e e e f . . 
        f f f f f f f f f f f f e f . . 
        . . . . . . . . . f c d d f . . 
        . . . . . . . . . . f f f f . . 
        `,img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f f . . . . 
        . c d d d d d d e e d d f . . . 
        . c d f d d f d e e b d c . . . 
        c d d f d d f d e e b d c . f f 
        c d e e d d d d e e f c . f e f 
        c d d d d c d e e e f . . f e f 
        . f c c c d e e e f f . . f e f 
        . . f f f f f e e e e f . f e f 
        . . . . f e e e e e e e f f f . 
        . . f f e f e e f e e e e f . . 
        . f e f f e e f f f e e e f . . 
        f d d b d d c f f f f f f b f . 
        f d d c d d d f . . f c d d f . 
        . f f f f f f f . . . f f f . . 
        `,img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f f f . . . . 
        . . f d d d e e e e d d f . . . 
        . c d d d d d e e e b d c . . . 
        . c d d d d d d e e b d c . . . 
        c d d f d d f d e e f c . f f . 
        c d d f d d f d e e f . . f e f 
        c d e e d d d d e e f . . f e f 
        . f d d d c d e e f f . . f e f 
        . . f f f d e e e e e f . f e f 
        . . . . f e e e e e e e f f f . 
        . . . . f f e e e e e b f f . . 
        . . . f e f f e e c d d f f . . 
        . . f d d b d d c f f f . . . . 
        . . f d d c d d d f f . . . . . 
        . . . f f f f f f f . . . . . . 
        `,img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f . . . . . 
        . c d f d d f d e e f f . . . . 
        . c d f d d f d e e d d f . . . 
        c d e e d d d d e e b d c . . . 
        c d d d d c d d e e b d c . . . 
        c c c c c d d e e e f c . . . . 
        . f d d d d e e e f f . . . . . 
        . . f f f f f e e e e f . . . . 
        . . . . f f e e e e e e f . f f 
        . . . f e e f e e f e e f . e f 
        . . f e e f e e f e e e f . e f 
        . f b d f d b f b b f e f f e f 
        . f d d f d d f d d b e f f f f 
        . . f f f f f f f f f f f f f . 
        `],
    200,
    characterAnimations.rule(Predicate.MovingLeft, Predicate.FacingLeft, Predicate.HittingWallDown)
    )
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    enemy_contact(sprite, otherSprite)
})
let level4: tiles.WorldMap = null
let level3: tiles.WorldMap = null
let level2: tiles.WorldMap = null
let level1: tiles.WorldMap = null
let has_key = false
let statusbar: StatusBarSprite = null
let player_speed = 0
let jump_height = 0
let gravity = 0
let current_level = 0
let hero: Sprite = null
hero = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
hero.z = 200
current_level = 1
set_level(current_level)
scene.setBackgroundColor(9)
tiles.placeOnRandomTile(hero, assets.tile`myTile2`)
replace_tiles()
hero.setImage(img`
    . . . . . . . f f f f f . . . . 
    . . . . . . f e e e e e f . . . 
    . . . . . f e e e d d d d f . . 
    . . . . f f e e d f d d f d c . 
    . . . f d d e e d f d d f d c . 
    . . . c d b e e d d d d e e d c 
    f f . c d b e e d d c d d d d c 
    f e f . c f e e d d d c c c c c 
    f e f . . f f e e d d d d d f . 
    f e f . f e e e e f f f f f . . 
    f e f f e e e e e e e f . . . . 
    . f f e e e e f e f f e f . . . 
    . . f e e e e f e f f e f . . . 
    . . . f e f f b d f b d f . . . 
    . . . f d b b d d c d d f . . . 
    . . . f f f f f f f f f . . . . 
    `)
gravity = 500
let number_of_blocks = 2
jump_height = 4 + 16 * number_of_blocks
player_speed = 100
hero.ay = gravity
controller.moveSprite(hero, player_speed, 0)
animate_player(hero)
scene.cameraFollowSprite(hero)
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.value = 100
game.onUpdate(function () {
    adjust_healthbar()
    climb_ladder()
})
