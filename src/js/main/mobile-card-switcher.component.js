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
	mqMinLg.addListener(function(e){
		if(e.matches) {
			mobileCardSwitcherCarousel.paginationDotWrapper.remove();
			mobileCardSwitcherCarousel.destroy(true);
		} else {
			initSlider();
		}
	})

	// Change active card and screenshot on mouse hover over card
	mobileCardSwitcherItems.forEach( (item, idx, arr) => item.addEventListener('mouseenter', function(){
		if(mqMinLg.matches) {
			arr.forEach(item => item.classList.remove('active'))
			item.classList.add('active');
		}
	}))

}