const mobileCardSwitcherItems = document.querySelectorAll('.mobile-card-switcher--item');

if(mobileCardSwitcherItems != null) {

	const mqMinLg = window.matchMedia('(min-width: 992px)');



	mobileCardSwitcherItems.forEach( (item, idx, arr) => item.addEventListener('mouseenter', function(){

		if(mqMinLg.matches) {
			arr.forEach(item => item.classList.remove('active'))
			item.classList.add('active');
		}
	}))
}