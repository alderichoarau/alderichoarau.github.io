import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

// Fade in animation
export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('600ms ease-out', style({ opacity: 1 }))
  ])
]);

// Fade in up animation
export const fadeInUpAnimation = trigger('fadeInUp', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(30px)'
    }),
    animate('600ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({
      opacity: 1,
      transform: 'translateY(0)'
    }))
  ])
]);

// Fade in left animation
export const fadeInLeftAnimation = trigger('fadeInLeft', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateX(-30px)'
    }),
    animate('600ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({
      opacity: 1,
      transform: 'translateX(0)'
    }))
  ])
]);

// Fade in right animation
export const fadeInRightAnimation = trigger('fadeInRight', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateX(30px)'
    }),
    animate('600ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({
      opacity: 1,
      transform: 'translateX(0)'
    }))
  ])
]);

// Slide in up animation
export const slideInUpAnimation = trigger('slideInUp', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(100%)'
    }),
    animate('800ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({
      opacity: 1,
      transform: 'translateY(0)'
    }))
  ])
]);

// Scale in animation
export const scaleInAnimation = trigger('scaleIn', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'scale(0.8)'
    }),
    animate('500ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({
      opacity: 1,
      transform: 'scale(1)'
    }))
  ])
]);

// Stagger animation for lists
export const staggerAnimation = trigger('stagger', [
  transition('* => *', [
    query(':enter', [
      style({
        opacity: 0,
        transform: 'translateY(20px)'
      }),
      stagger('100ms', [
        animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ])
    ], { optional: true })
  ])
]);

// Hover scale animation
export const hoverScaleAnimation = trigger('hoverScale', [
  state('normal', style({ transform: 'scale(1)' })),
  state('hovered', style({ transform: 'scale(1.05)' })),
  transition('normal <=> hovered', animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
]);

// Bounce in animation
export const bounceInAnimation = trigger('bounceIn', [
  transition(':enter', [
    animate('1000ms cubic-bezier(0.25, 0.8, 0.25, 1)', keyframes([
      style({ opacity: 0, transform: 'scale(0)', offset: 0 }),
      style({ opacity: 1, transform: 'scale(1.1)', offset: 0.6 }),
      style({ transform: 'scale(0.95)', offset: 0.8 }),
      style({ transform: 'scale(1)', offset: 1 })
    ]))
  ])
]);

// Rotate in animation
export const rotateInAnimation = trigger('rotateIn', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'rotate(-180deg) scale(0.8)'
    }),
    animate('600ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({
      opacity: 1,
      transform: 'rotate(0deg) scale(1)'
    }))
  ])
]);

// List item animations
export const listItemAnimation = trigger('listItem', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateX(-100%)'
    }),
    animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({
      opacity: 1,
      transform: 'translateX(0)'
    }))
  ]),
  transition(':leave', [
    animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({
      opacity: 0,
      transform: 'translateX(100%)'
    }))
  ])
]);

// Card hover animation
export const cardHoverAnimation = trigger('cardHover', [
  state('idle', style({
    transform: 'scale(1) translateY(0)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
  })),
  state('hovered', style({
    transform: 'scale(1.02) translateY(-5px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
  })),
  transition('idle <=> hovered', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
]);

// Progressive reveal animation for sections
export const progressiveRevealAnimation = trigger('progressiveReveal', [
  transition('* => *', [
    query('.animate-item', [
      style({
        opacity: 0,
        transform: 'translateY(50px) scale(0.95)'
      })
    ], { optional: true }),
    query('.animate-item', stagger('150ms', [
      animate('600ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({
        opacity: 1,
        transform: 'translateY(0) scale(1)'
      }))
    ]), { optional: true })
  ])
]);