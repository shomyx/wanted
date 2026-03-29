import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import win_sound from "../assets/sounds/win.mp3";
import lose_sound from "../assets/sounds/lose.mp3";

gsap.registerPlugin(MotionPathPlugin);

const winSound = new Audio(win_sound);
const loseSound = new Audio(lose_sound);
let animations = gsap.timeline({ paused: true, autoRemoveChildren: true });

const getFlyAwayParams = (choice) => {
  const settings = {};

  switch (choice) {
    case "left":
      settings.path = [
        { x: 0, y: 0 },
        { x: 100, y: -50 },
        { x: 200, y: -80 },
        { x: 300, y: -100 },
        { x: 500, y: -120 },
      ];
      settings.rotation = 360;
      break;
    case "right":
      settings.path = [
        { x: 0, y: 0 },
        { x: -100, y: -50 },
        { x: -200, y: -80 },
        { x: -300, y: -100 },
        { x: -500, y: -120 },
      ];
      settings.rotation = -360;
      break;
    default:
      settings.path = [];
      settings.rotation = 0;
  }

  return settings;
};

export const rotateAndMove = (item, callback) => {
  animations
    .to(item, {
      duration: 1,
      repeat: -1,
      rotation: -360,
      ease: "none",
    })
    .to(
      item,
      {
        duration: 5,
        x: -1000,
        ease: "none",
      },
      0, // position parameter stays after the vars object
    )
    .set(item, {
      x: 0,
      rotation: 0,
      delay: 2,
      onComplete: () => {
        animations.clear();
        callback();
      },
    })
    .play();
};

export const flyAway = (item, choice, callback) => {
  const params = getFlyAwayParams(choice);

  animations
    .to(item, {
      duration: 1.5,
      motionPath: {
        curviness: 3,
        path: params.path,
      },
      scale: 0.3,
      ease: "linear",
      onComplete: () => {
        animations.clear();
        winSound.play();
        animateMessage(callback);
      },
    })
    .to(
      item,
      {
        duration: 1,
        repeat: -1,
        rotation: params.rotation,
        ease: "none",
      },
      0,
    )
    .play();
};

export const showBulletHoles = (callback) => {
  animations
    .set(".bullets", {
      autoAlpha: 0,
    })
    .to(".bullets", {
      duration: 0.2,
      autoAlpha: 1,
      onComplete: () => {
        setTimeout(() => {
          animations.clear();
          loseSound.play();
          animateMessage(callback);
        }, 2000);
      },
    })
    .play();
};

export const animateNumber = (obj, toVal, update, callback) => {
  gsap.to(obj, {
    duration: 2,
    val: toVal,
    onUpdate: () => update(obj.val.toFixed(0)),
    ease: "power1.out",
    onComplete: () => callback && callback(toVal),
  });
};

export const animateMessage = (callback) => {
  animations
    .set(".message-wrap", {
      autoAlpha: 0,
    })
    .set(".message", {
      scale: 0.2,
      autoAlpha: 0,
    })
    .to(".message-wrap", {
      duration: 0.5,
      autoAlpha: 1,
    })
    .to(
      ".message",
      {
        duration: 0.6,
        scale: 1,
        autoAlpha: 1,
        ease: "back.out(4)",
      },
      "-=0.5",
    )
    .to(
      ".message-wrap",
      {
        duration: 0.5,
        autoAlpha: 0,
      },
      "+=3",
    )
    .to(
      ".message",
      {
        duration: 0.5,
        scale: 0.2,
        autoAlpha: 0,
        ease: "back.in(4)",
        onComplete: () => callback(),
      },
      "-=0.5",
    )
    .play();
};

export const animateMessageIn = () => {
  animations
    .set(".message-action", {
      autoAlpha: 0,
    })
    .set(".action-wrap", {
      scale: 0.2,
      autoAlpha: 0,
    })
    .to(".message-action", {
      duration: 0.5,
      autoAlpha: 1,
    })
    .to(
      ".action-wrap",
      {
        duration: 0.6,
        scale: 1,
        autoAlpha: 1,
        ease: "back.out(4)",
      },
      "-=0.5",
    )
    .play();
};

export const animateMessageOut = () => {
  animations
    .to(".message-action", {
      duration: 0.5,
      autoAlpha: 0,
    })
    .to(
      ".action-wrap",
      {
        duration: 0.5,
        scale: 0.2,
        autoAlpha: 0,
        ease: "back.in(4)",
      },
      "-=0.5",
    )
    .play();
};

// NA OVOME MORA DA SE RADI! OVAKO NE IDE!!

export const clearAnimations = (weed, hat) => {
  animations.clear();

  animations
    .set(hat, {
      motionPath: {
        curviness: 3,
        path: [{ x: 0, y: 0 }],
      },
      scale: 1,
      rotation: 0,
      clearProps: "all",
    })
    .set(weed, { clearProps: "all" })
    .to(".bullets", {
      duration: 0.3,
      autoAlpha: 0,
      onComplete: () => {
        animations.clear();
        weed.style = "";
        hat.style = "";
      },
    });
};
