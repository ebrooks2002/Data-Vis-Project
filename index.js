
var myFullpage = new fullpage('#fullpage', {
  // Navigation
  menu: '#menu',
  lockAnchors: false,
  anchors:['firstPage', 'secondPage'],
  navigation: false,
  navigationPosition: 'right',
  navigationTooltips: ['firstSlide', 'secondSlide'],
  showActiveTooltip: false,
  slidesNavigation: false,
  slidesNavPosition: 'bottom',

  // Scrolling
  css3: true,
  scrollingSpeed: 600,
  autoScrolling: false,
  fitToSection: true,
  fitToSectionDelay: 600,
  scrollBar: false,
  easing: 'easeInOutCubic',
  easingcss3: 'ease',
  loopBottom: false,
  loopTop: false,
  loopHorizontal: true,
  continuousVertical: false,
  continuousHorizontal: false,
  scrollHorizontally: false,
  interlockedSlides: false,
  dragAndMove: false,
  offsetSections: false,
  resetSliders: false,
  fadingEffect: false,
  normalScrollElements: '#element1, .element2',
  scrollOverflow: true,
  scrollOverflowMacStyle: false,
  scrollOverflowReset: false,
  touchSensitivity: 15,
  bigSectionsDestination: null,

  // Accessibility
  keyboardScrolling: true,
  animateAnchor: true,
  recordHistory: true,

  //License Key
  //licenseKey: null,

  // Design
  controlArrows: true,
  controlArrowsHTML: [
      '<div class="fp-arrow"></div>', 
      '<div class="fp-arrow"></div>'
  ],
  verticalCentered: false,
  sectionsColor : ['#ccc', '#fff'],
  paddingTop: '3em',
  paddingBottom: '10px',
  fixedElements: '#header, .footer',
  responsiveWidth: 0,
  responsiveHeight: 0,
  responsiveSlides: false,
  parallax: false,
  parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
  dropEffect: false,
  dropEffectOptions: { speed: 2300, color: '#F82F4D', zIndex: 9999},
  waterEffect: false,
  waterEffectOptions: { animateContent: true, animateOnMouseMove: true},
  cards: false,
  cardsOptions: {perspective: 100, fadeContent: true, fadeBackground: true},

  // Custom selectors
  sectionSelector: '.section',
  slideSelector: '.slide',

  lazyLoading: true,
  observer: true,
  

  // Events
  beforeLeave: function(origin, destination, direction, trigger){},
  onLeave: function(origin, destination, direction, trigger){},
  afterLoad: function(origin, destination, direction, trigger){},
  afterRender: function(){},
  afterResize: function(width, height){},
  afterReBuild: function(){},
  afterResponsive: function(isResponsive){},
  afterSlideLoad: function(section, origin, destination, direction, trigger){},
  onSlideLeave: function(section, origin, destination, direction, trigger){},
  onScrollOverflow: function(section, slide, position, direction){}
});
