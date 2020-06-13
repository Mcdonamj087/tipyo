const mobileNav = document.getElementById('mobile-nav');

// Toggle the mobile nav in and out based on which target the user clicks
window.addEventListener('click', e => {
  const target = e.target;
  if(['mobile-nav-trigger', 'mobile-nav-close-trigger', 'mobile-nav--underlay'].includes(target.id)) {

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



// // 2. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav).
// // Specifically, the target element is the one we would like to allow scroll on (NOT a parent of that element).
// // This is also the element to apply the CSS '-webkit-overflow-scrolling: touch;' if desired.
// const targetElement = document.querySelector('#someElementId');

// // 3. ...in some event handler after showing the target element...disable body scroll
// disableBodyScroll(targetElement);

// // 4. ...in some event handler after hiding the target element...
// enableBodyScroll(targetElement);


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