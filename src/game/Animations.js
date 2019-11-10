import { TweenMax, TimelineLite, Linear } from 'gsap';

let animations = new TimelineLite({ paused: true });

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
    .to(item, 0, {
      x: 0,
      ease: Linear.easeNone,
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
        animations.stop();
        callback();
      },
    })
    .to(item, 1, {
      repeat: -1,
      rotation: params.rotation,
      ease: Linear.easeNone,
    }, 0)
    .play();
};

export const animateNumber = (num, update) => {

};
// const updateHandler = (item) => {
//   item.innerHTML = game.score;
// };

// export const score = (item) => {
//   TweenLite.to(item, 1, {
//     score:"+=20",
//     roundProps: "score",
//     onUpdate: updateHandler,
//     ease:Linear.easeNone
//   });
// };
