/*!
 * tipyo_website v2.0.0
 * A website built for TipYo - a touchless tipping mobile app
 * (c) 2020 Matt McDonald
 * MIT License
 * 
 */

/**
 * Element.matches() polyfill (simple version)
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 */
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
const mobileNav = document.getElementById('mobile-nav');

// Toggle the mobile nav in and out based on which target the user clicks
window.addEventListener('click', e => {
  const target = e.target;
  if(['mobile-nav-trigger', 'mobile-nav-close-trigger', 'mobile-nav--underlay'].includes(target.id)) {

    // Lock the body from scrolling if mobile nav is open
    if(document.body.classList.contains('mobile-nav-is-open')) {
      bodyScrollLock.enableBodyScroll(mobileNav);
    } else {
      bodyScrollLock.disableBodyScroll(mobileNav);
    }

    toggleMobileNav();
  }
})

function toggleMobileNav() {
  document.body.classList.toggle('mobile-nav-is-open');
}

// Headroom Initialization - Makes the top nav hide and show depending on scroll direction
const header = document.getElementById("master-header");
var headroom  = new Headroom(header, {
  offset: 80,
  tolerance: 10,
  classes: {
    pinned: 'pinned',
    unpinned: 'unpinned',
    top: 'top'
  }
});

headroom.init();
const mobileCardSwitcherItems = document.querySelectorAll('.mobile-card-switcher--item');

if(mobileCardSwitcherItems != null) {

	const mqMinLg = window.matchMedia('(min-width: 992px)');

	// Init Carousel
	let mobileCardSwitcherCarousel;
	function initSlider() {
		mobileCardSwitcherCarousel = new Siema({
			selector: '.mobile-card-switcher--wrapper',
			loop: true,
			duration: 500,
			easing: 'cubic-bezier(.17,.84,.44,1)',
			onChange() {
				const allDots = [...this.paginationDotWrapper.children];
				const currentDot = allDots[this.currentSlide];
				allDots.forEach(item => item.classList.remove('active'));
				currentDot.classList.add('active');
			}
		})
		mobileCardSwitcherCarousel.addPaginationBullets();
	}

	// Function to add pagination dots
	Siema.prototype.addPaginationBullets = function(){
		const sliderParent = document.querySelector(this.config.selector).parentElement;
		this.paginationDotWrapper = document.createElement('div');
		this.paginationDotWrapper.classList.add('pagination-dot-wrapper');
		sliderParent.appendChild(this.paginationDotWrapper);

		this.innerElements.forEach( (item, idx) => {
			const dot = document.createElement('div');
			idx === 0 ? dot.classList.add('dot', 'active') : dot.classList.add('dot');
			dot.addEventListener('click', e => {
				const allDots = [...e.currentTarget.parentElement.children];
				allDots.forEach( dot => dot.classList.remove('active'));
				e.currentTarget.classList.add('active');
				this.goTo(idx)
			})
			this.paginationDotWrapper.appendChild(dot);
		})
	}

	// Initialize the slider only if page loads on mobile
	!mqMinLg.matches && initSlider();

	// Listen for media query change.  Destroy if matches, init if not.
	mqMinLg.addListener((function(e){
		if(e.matches) {
			mobileCardSwitcherCarousel.paginationDotWrapper.remove();
			mobileCardSwitcherCarousel.destroy(true);
		} else {
			initSlider();
		}
	}))

	// Change active card and screenshot on mouse hover over card
	mobileCardSwitcherItems.forEach( (item, idx, arr) => item.addEventListener('mouseenter', (function(){
		if(mqMinLg.matches) {
			arr.forEach(item => item.classList.remove('active'))
			item.classList.add('active');
		}
	})))

}