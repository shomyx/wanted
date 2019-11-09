import { TweenMax, TimelineLite, Linear } from 'gsap';

let animations = new TimelineLite({ paused: true });

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

export const flyAway = (item, params) => {
  animations
    .to(item, 1.5, {
      bezier:{curviness: 3, values: params.path},
      scale: 0.3,
      ease: Linear.easeOut,
      onComplete: () => animations.stop(),
    })
    .to(item, 1, {
      repeat: -1,
      rotation: params.rotation,
      ease: Linear.easeNone,
    },'-=1.5')
    .play();
};