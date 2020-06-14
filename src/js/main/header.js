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