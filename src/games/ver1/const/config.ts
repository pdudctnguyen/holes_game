let width = window.innerWidth;
let height = window.innerHeight;
export let customConfig = {
    width: width,
    height: height,
    title: "Holes Game",
    url: "",
    version: "1.0",
    zoom: 1,
    backgroundColor: "#ffffff",
    camera: {
        bound: [0, -height, width, height * 2]
    },
    matter: {
        bound: [0, -height, width, height * 2]
    },
    hole: {
        startY: (6.5 / 10) * height,
        radius: 0.07 * width,
        numFrames: 4,
        distanceY: 0.14 * height,
        randomStepY: 0.05 * height,
        randomStepX: 0.02 * width
    },
    planet: {
        startY: (8 / 10) * height,
        startX: (2 / 5) * width,
        radius: (1 / 20) * width,
        friction: 0.005,
        bounce: 0.6,
        velocityX: 2,
        anguVel: 0.15,
        limitDown: 170
    },
    bar: {
        startY: (8.3 / 10) * height,
        x: (1 / 2 * width),
        angle: 0,
        friction: 0.005,
        isStatic: true,
        key: "bar",
        limitDown: 50,
        stepMoveUp: 1,
        stepMoveDown:1,
        upToHide : 100
    },
    collider: {
        ballWithHoles: (0.07 * width + (1 / 20) * width) / 2,
        holeWithHole: 0.1 * width
    },
    areaTouch: {
        width: (1 / 2) * width,
        height: height,
        x1: (1 / 4) * width,
        x2: (3 / 4) * width,
        y: (1 / 2) * height,
        limit: 150,
        keyArea: "area",
        keyParent: 'zone'
    },
    highScore: {
        fontSize: '60px',
        fill: 'black',
        fontWeight: '700',
        x: (1 / 2) * width,
        y: (1 / 10) * height,
        text: "HOLES",
        align: 'center'
    },
    cup: {
        x: (1 / 2) * width,
        y: (2 / 10) * height,
        key: "cup"
    },
    listHighScore: {
        x: (1 / 2) * width,
        y: (3 / 10) * height,
        fontSize: "32px",
        fill: "black",
        marginTop: 32
    },
    playWithFriends: {
        x: (1 / 2) * width,
        y: (7 / 10) * height,
        key: "playwfriends"
    },
    btnChooseSkin: {
        x: (1.1 / 3) * width,
        y: (8.5 / 10) * height,
        key: "skin"
    },
    btnChoosePlay: {
        x: (1.9 / 3) * width,
        y: (8.5 / 10) * height,
        key: "play"
    },
    sliderSkin: {
        background: {
            x: width / 2,
            y: height / 2,
            width: 0.9 * width,
            height: 0.9 * height,
            key: "background"
        },
        btnOK: {
            paddingBottom: 50,
            x: 0.9 * width / 2,
            key: "ok"
        },
        btnClose: {
            paddingRight: 50,
            paddingTop: 100,
            key: "close"
        },
        btnNext: {
            x: 0.9 * width - 50,
            y: (1 / 2) * height,
            key: "next"
        },
        btnPrev: {
            x: 0.1 * width + 50,
            y: (1 / 2) * height,
            key: "prev"
        },
        item: {
            padding: 0.2 * width,
            key: "planets",
            x: 0.9 * width / 2 + 50,
            tweenX: 0.05 * width,
            duration: 1000,
            ease: "Power1"
        },
    }
}
export let HolesConfig = {

}
export let AssetsMenu = [
    { key: "play", url: "./src/games/ver1/assets/play.png", type: 0 },
    { key: "playwfriends", url: "./src/games/ver1/assets/playfriends.png", type: 0 },
    { key: "cup", url: "./src/games/ver1/assets/cup.png", type: 0 },
    { key: 'skin', url: './src/games/ver1/assets/skinl.png', type: 0 },
    { key: 'close', url: './src/games/ver1/assets/close.png', type: 0 },
    { key: 'background', url: './src/games/ver1/assets/backpopup.png', type: 0 },
    { key: 'menuskin', url: './src/games/ver1/assets/menuskin.png', type: 0 },
    { key: 'planets', url: './src/games/ver1/assets/planets-sheet.png', type: 1 },
    { key: "ball", url: "./src/games/ver1/assets/ball.png", type: 0 },
    { key: "ball1", url: "./src/games/ver1/assets/ball11.png", type: 0 },
    { key: "prev", url: "./src/games/ver1/assets/arrow1.png", type: 0 },
    { key: "next", url: "./src/games/ver1/assets/arrow2.png", type: 0 },
    { key: "ok", url: "./src/games/ver1/assets/stripe.png", type: 0 }
];
export let AssetsMain = [
    { key: "ball1", url: "./src/games/ver1/assets/ball.png", type: 0 },
    { key: "ball1", url: "./src/games/ver1/assets/ball11.png", type: 0 },
    { key: "area", url: "./src/games/ver1/assets/ballback.png", type: 0 },
    { key: 'bar', url: './src/games/ver1/assets/bar.png', type: 0 },
    { key: 'zone', url: './src/games/ver1/assets/zone.png', type: 0 },
    { key: 'warn', url: './src/games/ver1/assets/gift5.png', type: 0 },
    { key: 'planets', url: './src/games/ver1/assets/planets-sheet.png', type: 1 },
    { key: 'gift5', url: './src/games/ver1/assets/gift5a.png', type: 0 },
    { key: 'gift10', url: './src/games/ver1/assets/gift10.png', type: 0 },
    { key: 'holes', url: './src/games/ver1/assets/holes-sheet.png', type: 1 },
];