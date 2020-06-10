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
const mobileCardSwitcherItems = document.querySelectorAll('.mobile-card-switcher--item');

if(mobileCardSwitcherItems != null) {

	const mqMinLg = window.matchMedia('(min-width: 992px)');



	mobileCardSwitcherItems.forEach( (item, idx, arr) => item.addEventListener('mouseenter', (function(){

		if(mqMinLg.matches) {
			arr.forEach(item => item.classList.remove('active'))
			item.classList.add('active');
		}
	})))
}