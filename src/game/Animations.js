import { TweenMax, TimelineLite, Linear, Power1, Back } from 'gsap';
import win_sound from '../assets/sounds/win.mp3';
import lose_sound from '../assets/sounds/lose.mp3';

const winSound = new Audio(win_sound);
const loseSound = new Audio(lose_sound);
let animations = new TimelineLite({ paused: true, autoRemoveChildren:true });

const getFlyAwayParams = (choice) => {
  const settings = {};

  switch (choice) {
    case 'left':
      settings.path = [{x:0, y:0}, {x:100, y:-50}, {x:200, y:-80}, {x:300, y:-100}, {x:500, y:-120}];
      settings.rotation = 360;
      break;
    case 'right':
      settings.path = [{x:0, y:0}, {x:-100, y:-50}, {x:-200, y:-80}, {x:-300, y:-100}, {x:-500, y:-120}];
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
		.to(item, 1, {
    	repeat: -1,
    	rotation: -360,
    	ease: Linear.easeNone
  	})
  	.to(item, 5, {
      x: -1000,
      ease: Linear.easeNone,
    }, 0)
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
    .to(item, 1.5, {
      bezier:{curviness: 3, values: params.path},
      scale: 0.3,
      ease: Linear.easeOut,
      onComplete: () => {
        animations.clear();
        winSound.play();
        animateMessage(callback);
      },
    })
    .to(item, 1, {
      repeat: -1,
      rotation: params.rotation,
      ease: Linear.easeNone,
    }, 0)
    .play();
};

export const showBulletHoles = (callback) => {
  animations
    .set('.bullets', {
      autoAlpha: 0,
    })
    .to('.bullets', 0.2, {
      autoAlpha: 1,
      onComplete: () => {
        loseSound.play();
        animateMessage(callback);
      },
    });
};

export const animateNumber = (obj, toVal, update, callback) => {
  TweenMax.to(obj, 2, {
    val: toVal,
    onUpdate: () => update(obj.val.toFixed(0)),
    ease: Power1.easeOut,
    onComplete: () => callback && callback(toVal),
  });
};

export const animateMessage = (callback) => {
  animations
    .set('.message-wrap', {
      autoAlpha: 0,
    })
    .set('.message', {
      scale: 0.2, 
      autoAlpha: 0,
    })
    .to('.message-wrap', 0.5, {
      autoAlpha: 1,
    })
    .to('.message', 0.6, {
      scale: 1, 
      autoAlpha: 1,
      ease: Back.easeOut.config(4),
    }, '-=0.5')
    .to('.message-wrap', 0.5, {
      autoAlpha: 0,
    }, '+=3')
    .to('.message', 0.5, {
      scale: 0.2, 
      autoAlpha: 0,
      ease: Back.easeIn.config(4),
      onComplete: () => callback(),
    }, '-=0.5')
    .play();
};

// NA OVOME MORA DA SE RADI! OVAKO NE IDE!!

export const clearAnimations = (weed, hat) => {
  animations
    .to(hat, 0, {
      bezier:{curviness: 3, values: [{x:0, y:0}]},
      scale: 1,
      rotation: 0,
    })
    .to('.bullets', 0.3, {
      autoAlpha: 0,
      onComplete: () => {
        animations.clear();
        weed.style = '';
        hat.style = '';
      }
    });
};
