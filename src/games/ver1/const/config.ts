let width = window.innerWidth;
let height = window.innerHeight;
let sizeWidth = 1334;
let sizeHeight = 750;
// let disX = (42 / sizeWidth) * width;
let disX = 0;
export let customConfig = {
    width: width,
    height: height,
    title: "Holes Game",
    url: "",
    version: "1.0",
    zoom: 1,
    backgroundColor: "#24292e",
    camera: {
        bound: [0, - height, width, height * 2]
    },
    matter: {
        bound: [0, -height, width, height * 2]
    },
    textGameover: {
        yTween: 1 / 2 * height - 100 / sizeHeight * height
    },
    hole: {
        startY: (6.5 / 10) * height,
        radius: (105 / sizeWidth) * width,
        numFrames: 4,
        distanceY: 0.15 * height,
        randomStepY: 0.05 * height,
        randomStepX: 0.02 * width
    },
    planet: {
        startY: (8 / 10) * height,
        startX: (2 / 5) * width,
        radius: (95 / sizeWidth) * width,
        friction: 0.005,
        bounce: 0.6,
        velocityX: 2,
        anguVel: 0.15,
        limitDown: 170 / sizeHeight * height
    },
    bar: {
        startY: (8.3 / 10) * height,
        x: (1 / 2 * width),
        angle: 0,
        friction: 0.005,
        isStatic: true,
        key: "bar",
        limitDown: 50 / sizeHeight * height,
        stepMoveUp: 1,
        stepMoveDown: 1,
        upToHide: 100
    },
    collider: {
        ballWithHoles: (40 / sizeWidth) * width,
        holeWithHole: (120 / sizeWidth) * width,

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
    playScore: {
        keyBackground: "backScore",
        x: 100 / sizeWidth * width,
        y: 30 / sizeHeight * height,
        yText: 50 / sizeHeight * height,
        width: 200 / sizeWidth * width,
        fontSize: 40 / sizeWidth * width,
        color: "red",
        fontSizeGO: 60 / sizeWidth * width
    },
    backLeft: {
        x: (42 / sizeWidth) * width,
        y: height / 2,
        width: (84 / sizeWidth) * width,
        height: height,
        key: "backLeft"
    },
    btnVolume: {
        x: (1230 / sizeWidth) * width + disX,
        y: (45 / sizeHeight) * height,
        width: (55 / sizeWidth) * width,
        height: (55 / sizeHeight) * height,
        key: "speak",
        keyBackground: "blue"
    },
    btnVolumeMute: {
        key: "speakMute"
    },
    btnHelp: {
        x: (1230 / sizeWidth) * width + disX,
        y: (120 / sizeHeight) * height,
        width: (55 / sizeWidth) * width,
        height: (55 / sizeHeight) * height,
        key: "help",
        keyBackground: "blue"
    },
    imgTitle: {
        x: (1 / 2) * width + disX,
        y: (80 / sizeHeight) * height,
        width: (300 / sizeWidth) * width,
        height: (94 / sizeHeight) * height,
        key: "title"
    },
    cup: {
        x: (1 / 2) * width + disX,
        y: (175 / sizeHeight) * height,
        width: (90 / sizeWidth) * width,
        height: (90 / sizeHeight) * height,
        key: "cup"
    },
    btnfriendsScore: {
        x: (505 / sizeWidth) * width + disX,
        y: (190 / sizeHeight) * height,
        width: (225 / sizeWidth) * width,
        height: (70 / sizeHeight) * height,
        keyBackground: "buttonOrange",
        keyInactive: "buttonRank",
        key: "friend",
        xIcon: (457 / sizeWidth) * width + disX,
        yIcon: (177 / sizeHeight) * height,
        widthIcon: 0.15 * (225 / sizeWidth) * width,
        heightIcon: 0.4 * (70 / sizeHeight) * height,
        textIcon: "Overall",
        fontSizeIcon: (18 / sizeWidth) * width,
        colorText: "white",
        fontWeight: "bold",
        fontFamily: "Arial",
        xTextIcon: (457 / sizeWidth) * width + disX,
        yTextIcon: (200 / sizeHeight) * height,
        textContent: "Friends",
        fontSize: (30 / sizeWidth) * width,
        xText: (540 / sizeWidth) * width + disX,
        yText: (185 / sizeHeight) * height
    },
    btnGlobalScore: {
        x: (830 / sizeWidth) * width + disX,
        y: (190 / sizeHeight) * height,
        width: (225 / sizeWidth) * width,
        height: (70 / sizeHeight) * height,
        keyBackground: "buttonRank",
        keyActive: "buttonOrange",
        key: "global",
        xIcon: (890 / sizeWidth) * width + disX,
        yIcon: (177 / sizeHeight) * height,
        widthIcon: 0.15 * (225 / sizeWidth) * width,
        heightIcon: 0.4 * (70 / sizeHeight) * height,
        textIcon: "Weekly",
        fontSizeIcon: (18 / sizeWidth) * width,
        colorText: "white",
        fontWeight: "bold",
        fontFamily: "Arial",
        xTextIcon: (890 / sizeWidth) * width + disX,
        yTextIcon: (205 / sizeHeight) * height,
        textContent: "Global",
        fontSize: (30 / sizeWidth) * width,
        xText: (800 / sizeWidth) * width + disX,
        yText: (185 / sizeHeight) * height
    },
    myScore: {
        x: (1 / 2) * width + disX,
        y: (285 / sizeHeight) * height,
        width: (490 / sizeWidth) * width,
        height: (55 / sizeHeight) * height,
        keyBackground: "rank1Background",
        profile: {
            key: "profile",
            x: (530 / sizeWidth) * width + disX,
            y: (285 / sizeHeight) * height,
            width: 0.12 * (490 / sizeWidth) * width,
            height: 0.8 * (60 / sizeHeight) * height,
            name: {
                x: (610 / sizeWidth) * width + disX,
                y: (285 / sizeHeight) * height,
                text: "Nguyen",
                colorText: "black",
                fontWeight: "bold",
                fontFamily: "Arial",
                fontSize: (25 / sizeWidth) * width
            }
        },
        iconMyRank: {
            key: "rank",
            x: (475 / sizeWidth) * width + disX,
            y: (285 / sizeHeight) * height,
            width: 0.1 * (490 / sizeWidth) * width,
            height: 0.75 * (55 / sizeHeight) * height,
            fontSize: (20 / sizeWidth) * width,
            score: "1",
            colorText: "black",
            fontWeight: "bold",
            fontFamily: "Arial"
        },
        textMyScore: {
            x: (775 / sizeWidth) * width + disX,
            y: (285 / sizeHeight) * height,
            score: "10",
            colorText: "black",
            fontWeight: "bold",
            fontFamily: "Arial",
            rank: 1
        }

    },
    itemScore: {
        x: (1 / 2) * width + disX,
        y: (370 / sizeHeight) * height,
        width: (470 / sizeWidth) * width,
        height: (50 / sizeHeight) * height,
        marginTop: (70 / sizeHeight) * height,
        key: "rankBackground",
        profile: {
            key: "profile",
            x: (535 / sizeWidth) * width + disX,
            y: (370 / sizeHeight) * height,
            width: 0.1 * (470 / sizeWidth) * width,
            height: 0.65 * (70 / sizeHeight) * height,
            name: {
                x: (600 / sizeWidth) * width + disX,
                y: (365 / sizeHeight) * height,
                text: "Ha",
                colorText: "black",
                fontWeight: "bold",
                fontFamily: "Arial",
                fontSize: (20 / sizeWidth) * width
            }
        },
        iconMyRank: {
            key: "rank",
            x: (475 / sizeWidth) * width + disX,
            y: (370 / sizeHeight) * height,
            width: 0.1 * (470 / sizeWidth) * width,
            height: 0.75 * (50 / sizeHeight) * height,
            fontSize: (20 / sizeWidth) * width,
            score: "10",
            colorText: "white",
            fontWeight: "bold",
            fontFamily: "Arial",
            marginTop: 55
        },
        textMyScore: {
            x: (775 / sizeWidth) * width + disX,
            y: (370 / sizeHeight) * height,
            score: "0000",
            scoreGlobal: "1212",
            colorText: "white",
            fontWeight: "bold",
            fontFamily: "Arial",
        },
        buttonItemFight: {
            keyBackground: "buttonBlueMini",
            icon: {
                key: "solo",
                x: (850 / sizeWidth) * width + disX,
                y: (370 / sizeHeight) * height,
                width: 0.08 * (470 / sizeWidth) * width,
                height: 0.05 * (470 / sizeWidth) * width
            },
            x: (850 / sizeWidth) * width + disX,
            y: (370 / sizeHeight) * height,
            width: 0.2 * (470 / sizeWidth) * width,
            height: 0.8 * (60 / sizeHeight) * height
        }

    },
    btnPlayWithFriends: {
        x: (1 / 2) * width + disX,
        y: (610 / sizeHeight) * height,
        width: (490 / sizeWidth) * width,
        height: (70 / sizeHeight) * height,
        keyBackground: "backGreen",
        textContent: "Play with friends.",
        fontSize: (30 / sizeWidth) * width,
        xText: (600 / sizeWidth) * width + disX,
        colorText: "white",
        fontWeight: "bold",
        fontFamily: "Arial",
    },
    btnIconPlayWithFriends: {
        keyBackground: "buttonBlueMini",
        x: (850 / sizeWidth) * width + disX,
        y: (610 / sizeHeight) * height,
        width: 0.2 * (490 / sizeWidth) * width,
        height: 0.7 * (70 / sizeHeight) * height,
        key: "playfriend",
        widthIcon: 0.2 * (490 / sizeWidth) * width,
        heightIcon: 0.6 * (70 / sizeHeight) * height,
    },
    btnChooseSkin: {
        x: (525 / sizeWidth) * width + disX,
        y: (700 / sizeHeight) * height,
        width: (245 / sizeWidth) * width,
        height: (100 / sizeHeight) * height,
        keyBackground: "buttonBlue",
        key: "ball1",
        xIcon: (455 / sizeWidth) * width + disX,
        yIcon: (700 / sizeHeight) * height,
        widthIcon: 0.08 * (535 / sizeWidth) * width + disX,
        heightIcon: 0.04 * (700 / sizeHeight) * height,
        colorText: "white",
        fontWeight: "bold",
        fontFamily: "Arial",
        textContent: "Skins",
        fontSize: (40 / sizeWidth) * width,
        xText: (550 / sizeWidth) * width + disX,
        yText: (700 / sizeHeight) * height

    },
    btnPlayGame: {
        x: (810 / sizeWidth) * width + disX,
        y: (700 / sizeHeight) * height,
        width: (245 / sizeWidth) * width,
        height: (100 / sizeHeight) * height,
        key: "buttonOrange",
        colorText: "white",
        fontWeight: "bold",
        fontFamily: "Arial",
        textContent: "Play",
        fontSize: (40 / sizeWidth) * width,
        xText: (810 / sizeWidth) * width + disX,
        yText: (700 / sizeHeight) * height
    },
    sliderSkin: {
        title: {
            y: 100 / sizeHeight * height
        },
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
            keyO: "buttonOrange",
            keyB: "buttonBlue",
            width: (250 / sizeWidth) * width
        },
        btnClose: {
            paddingRight: (50 / sizeWidth) * width,
            paddingTop: (100 / sizeHeight) * height,
            key: "closeBackground",
            width: (60 / sizeWidth) * width
        },
        iconClose: {
            key: "close",
            width: 0.5 * (80 / sizeWidth) * width
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
    },
    sliderHelp: {
        title: {
            y: 100 / sizeHeight * height
        },
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
            keyO: "buttonOrange",
            keyB: "buttonBlue",
            width: (250 / sizeWidth) * width
        },
        btnClose: {
            paddingRight: (50 / sizeWidth) * width,
            paddingTop: (100 / sizeHeight) * height,
            key: "closeBackground",
            width: (60 / sizeWidth) * width
        },
        iconClose: {
            key: "close",
            width: 0.5 * (80 / sizeWidth) * width
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
            key: ["help1", "help2", "help3", "help4"],
            x: 0.9 * width / 2 + 50 / sizeWidth * width,
            y: 1 / 2 * height,
            tweenX: 0.05 * width,
            duration: 1000,
            ease: "Power1",
            width: 300 / sizeWidth * width
        },
    },
    skin: [//type==0> defauft, =1 invite =2 watch
        { type: 0 },
        { type: 1, limit: 3600, text: "Watch", key: "buttonOrange", textIfHad: "OK" },
        { type: 1, limit: 3000, text: "Watch", key: "buttonOrange", textIfHad: "OK" },
        { type: 1, limit: 1500, text: "Watch", key: "buttonOrange", textIfHad: "OK" },
        { type: 1, limit: 500, text: "Watch", key: "buttonOrange", textIfHad: "OK" },
        { type: 1, limit: 700, text: "Watch", key: "buttonOrange", textIfHad: "OK" },
        { type: 2, limit: 3600, text: "Invite 5F", key: "buttonBlueMini", textIfHad: "OK" },
        { type: 2, limit: 3600, text: "Invite 10F", key: "buttonBlueMini", textIfHad: "OK" },
        { type: 2, limit: 3600, text: "Invite 10F", key: "buttonBlueMini", textIfHad: "OK" },
        { type: 2, limit: 3600, text: "Invite 10F", key: "buttonBlueMini", textIfHad: "OK" },
        { type: 2, limit: 3600, text: "Invite 15F", key: "buttonBlueMini", textIfHad: "OK" }
    ],
    backgroundPopupDie: {
        x: width / 2,
        y: height / 2,
        width: 0.6 * width,
        fontSize: 40 / sizeWidth * width,
        fontSizeTime: 40 / sizeWidth * width,
        fontSizeScore: 60 / sizeWidth * width,
        color: "white",
        colorTime:"red",
        key: "background"
    }
}
export let HolesConfig = {

}
export let AssetsMenu = [
    { key: "play", url: "./src/games/ver1/assets/play.png", type: 0 },
    { key: "playwfriends", url: "./src/games/ver1/assets/playfriends.png", type: 0 },
    { key: 'skin', url: './src/games/ver1/assets/skinl.png', type: 0 },
    { key: 'closeBackground', url: './src/games/ver1/assets/Red.png', type: 0 },
    { key: 'background', url: './src/games/ver1/assets/backpopup.png', type: 0 },
    { key: 'planets', url: './src/games/ver1/assets/planets-sheet.png', type: 1 },
    { key: "ball", url: "./src/games/ver1/assets/ball.png", type: 0 },
    { key: "ball1", url: "./src/games/ver1/assets/ball11.png", type: 0 },
    { key: "prev", url: "./src/games/ver1/assets/Left.png", type: 0 },
    { key: "next", url: "./src/games/ver1/assets/Right.png", type: 0 },
    { key: "ok", url: "./src/games/ver1/assets/stripe.png", type: 0 },
    { key: "title", url: "./src/games/ver1/assets/Banner name.png", type: 0 },
    { key: "cup", url: "./src/games/ver1/assets/Cup-1.png", type: 0 },
    { key: "buttonOrange", url: "./src/games/ver1/assets/Button-orange.png", type: 0 },
    { key: "buttonRank", url: "./src/games/ver1/assets/Button-rank-unactive.png", type: 0 },
    { key: "buttonBlue", url: "./src/games/ver1/assets/Button-blue.png", type: 0 },
    { key: "friend", url: "./src/games/ver1/assets/Friend.png", type: 0 },
    { key: "global", url: "./src/games/ver1/assets/Global.png", type: 0 },
    { key: "help", url: "./src/games/ver1/assets/Help.png", type: 0 },
    { key: "speak", url: "./src/games/ver1/assets/Speak.png", type: 0 },
    { key: "speakMute", url: "./src/games/ver1/assets/Speak-mute.png", type: 0 },
    { key: "red", url: "./src/games/ver1/assets/Red.png", type: 0 },
    { key: "blue", url: "./src/games/ver1/assets/Blue.png", type: 0 },
    { key: "buttonBlueMini", url: "./src/games/ver1/assets/Button-blue-mini.png", type: 0 },
    { key: "myScore", url: "./src/games/ver1/assets/yellow.jpeg", type: 0 },
    { key: "rankBackground", url: "./src/games/ver1/assets/Rank-n-bg.png", type: 0 },
    { key: "rank1Background", url: "./src/games/ver1/assets/Rank-1-bg.png", type: 0 },

    { key: "backLeft", url: "./src/games/ver1/assets/backleft.jpg", type: 0 },
    { key: "backGreen", url: "./src/games/ver1/assets/Play wwith friend.png", type: 0 },
    { key: "profile", url: "./src/games/ver1/assets/profile.jpg", type: 0 },
    { key: "rank1", url: "./src/games/ver1/assets/Rank-1.png", type: 0 },
    { key: "rank2", url: "./src/games/ver1/assets/Rank-2.png", type: 0 },
    { key: "rank3", url: "./src/games/ver1/assets/Rank-3.png", type: 0 },
    { key: "rank", url: "./src/games/ver1/assets/Rank-n.png", type: 0 },
    { key: "solo", url: "./src/games/ver1/assets/Solo-with.png", type: 0 },
    { key: "playfriend", url: "./src/games/ver1/assets/friend-invite.png", type: 0 },
    { key: "close", url: "./src/games/ver1/assets/Close x.png", type: 0 },
    { key: "help1", url: "./src/games/ver1/assets/help1.gif", type: 0 },
    { key: "help2", url: "./src/games/ver1/assets/help2.gif", type: 0 },
    { key: "help3", url: "./src/games/ver1/assets/help3.gif", type: 0 },
    { key: "help4", url: "./src/games/ver1/assets/help4.gif", type: 0 },
    { key: "backScore", url: "./src/games/ver1/assets/backitem.jpeg", type: 0 },
    { key: "background0", url: "./src/games/ver1/assets/BG-cloud.png", type: 0 },
    { key: "background1", url: "./src/games/ver1/assets/BG-cloud 2.png", type: 0 },
    { key: "background2", url: "./src/games/ver1/assets/BG-star 2.png", type: 0 },
    { key: "music", url: "./src/games/ver1/assets/music.mp3", type: 2 },
    { key: "ball1", url: "./src/games/ver1/assets/ball.png", type: 0 },
    { key: "ball1", url: "./src/games/ver1/assets/ball11.png", type: 0 },
    { key: "area", url: "./src/games/ver1/assets/ballback.png", type: 0 },
    { key: 'bar', url: './src/games/ver1/assets/Bar.png', type: 0 },
    { key: 'zone', url: './src/games/ver1/assets/zone.png', type: 0 },
    { key: 'warn', url: './src/games/ver1/assets/gift5.png', type: 0 },
    { key: 'planets', url: './src/games/ver1/assets/planets-sheet.png', type: 1 },
    { key: 'gift5', url: './src/games/ver1/assets/gift5a.png', type: 0 },
    { key: 'gift10', url: './src/games/ver1/assets/gift10.png', type: 0 },
    { key: 'holes', url: './src/games/ver1/assets/holes-sheet.png', type: 1 },
    { key: "music", url: "./src/games/ver1/assets/music.mp3", type: 2 },
];
export let AssetsMain = [
    { key: "ball1", url: "./src/games/ver1/assets/ball.png", type: 0 },
    { key: "ball1", url: "./src/games/ver1/assets/ball11.png", type: 0 },
    { key: "area", url: "./src/games/ver1/assets/ballback.png", type: 0 },
    { key: 'bar', url: './src/games/ver1/assets/Bar.png', type: 0 },
    { key: 'zone', url: './src/games/ver1/assets/zone.png', type: 0 },
    { key: 'warn', url: './src/games/ver1/assets/gift5.png', type: 0 },
    { key: 'planets', url: './src/games/ver1/assets/planets-sheet.png', type: 1 },
    { key: 'gift5', url: './src/games/ver1/assets/gift5a.png', type: 0 },
    { key: 'gift10', url: './src/games/ver1/assets/gift10.png', type: 0 },
    { key: 'holes', url: './src/games/ver1/assets/holes-sheet.png', type: 1 },
    { key: "music", url: "./src/games/ver1/assets/music.mp3", type: 2 },
    { key: "background0", url: "./src/games/ver1/assets/BG-cloud.png", type: 0 },
    { key: "background1", url: "./src/games/ver1/assets/BG-cloud 2.png", type: 0 },
    { key: "background2", url: "./src/games/ver1/assets/BG-star 2.png", type: 0 },
];