/*!
 * External js:
 * MoveTo https://github.com/hsnaydd/moveTo MIT
 * lite-youtube-embed https://github.com/paulirish/lite-youtube-embed MIT
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./source/js/components/accord.js
const accord = () => {
  const tabsBtn = document.querySelectorAll('.tabs-btn');
  const tabsItems = document.querySelectorAll('.tabs-item');
  tabsBtn.forEach(item => {
    item.addEventListener('click', () => {
      const currentBtn = item;
      const tabId = currentBtn.getAttribute('data-tab');
      const currentTab = document.querySelector(tabId);
      if (!currentBtn.classList.contains('active')) {
        tabsBtn.forEach(item => {
          item.classList.remove('active');
        });
        currentBtn.classList.add('active');
        tabsItems.forEach(item => {
          item.classList.remove('active');
        });
        currentTab.classList.add('active');
      }
    });
  });
};
/* harmony default export */ const components_accord = (accord);
;// CONCATENATED MODULE: ./source/js/components/MainMenu.js
const menu = () => {
  const burgerEl = document?.querySelector('[data-burger]');
  const menu = document?.querySelector('[data-menu]');
  const navLink = document?.querySelectorAll('.nav__link');
  burgerEl?.addEventListener('click', () => {
    burgerEl?.classList.toggle('burger--active');
    menu?.classList.toggle('active');
    if (menu?.classList.contains('active')) {
      burgerEl?.setAttribute('aria-expanded', 'true');
      burgerEl?.setAttribute('aria-label', 'Сlose menu');
      window.fullpage_api.setAllowScrolling(false);
    } else {
      burgerEl?.setAttribute('aria-expanded', 'false');
      burgerEl?.setAttribute('aria-label', 'Open menu');
      window.fullpage_api.setAllowScrolling(true);
    }
  });
  navLink?.forEach(item => {
    item.addEventListener('click', () => {
      menu.classList.remove('active');
      burgerEl.classList.remove('burger--active');
      window.fullpage_api.setAllowScrolling(true);
    });
  });
};
/* harmony default export */ const MainMenu = (menu);
;// CONCATENATED MODULE: ./node_modules/graph-modal/src/graph-modal.js
class GraphModal {
  constructor(options) {
    let defaultOptions = {
      isOpen: () => {},
      isClose: () => {},
    }
    this.options = Object.assign(defaultOptions, options);
    this.modal = document.querySelector('.graph-modal');
    this.speed = 300;
    this.animation = 'fade';
    this._reOpen = false;
    this._nextContainer = false;
    this.modalContainer = false;
    this.isOpen = false;
    this.previousActiveElement = false;
    this._focusElements = [
      'a[href]',
      'input',
      'select',
      'textarea',
      'button',
      'iframe',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])'
    ];
    this._fixBlocks = document.querySelectorAll('.fix-block');
    this.events();
  }

  events() {
    if (this.modal) {
      document.addEventListener('click', function (e) {
        const clickedElement = e.target.closest(`[data-graph-path]`);
        if (clickedElement) {
          let target = clickedElement.dataset.graphPath;
          let animation = clickedElement.dataset.graphAnimation;
          let speed = clickedElement.dataset.graphSpeed;
          this.animation = animation ? animation : 'fade';
          this.speed = speed ? parseInt(speed) : 300;
          this._nextContainer = document.querySelector(`[data-graph-target="${target}"]`);
          this.open();
          return;
        }

        if (e.target.closest('.js-modal-close')) {
          this.close();
          return;
        }
      }.bind(this));

      window.addEventListener('keydown', function (e) {
        if (e.keyCode == 27 && this.isOpen) {
          this.close();
        }

        if (e.which == 9 && this.isOpen) {
          this.focusCatch(e);
          return;
        }
      }.bind(this));

      document.addEventListener('click', function (e) {
        if (e.target.classList.contains('graph-modal') && e.target.classList.contains("is-open")) {
          this.close();
        }
      }.bind(this));
    }

  }

  open(selector) {
    this.previousActiveElement = document.activeElement;

    if (this.isOpen) {
      this.reOpen = true;
      this.close();
      return;
    }

    this.modalContainer = this._nextContainer;

    if (selector) {
      this.modalContainer = document.querySelector(`[data-graph-target="${selector}"]`);
    }
    
    this.modalContainer.scrollTo(0, 0)

    this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
    this.modal.classList.add('is-open');

    document.body.style.scrollBehavior = 'auto';
    document.documentElement.style.scrollBehavior = 'auto';

    this.disableScroll();

    this.modalContainer.classList.add('graph-modal-open');
    this.modalContainer.classList.add(this.animation);

    setTimeout(() => {
      this.options.isOpen(this);
      this.modalContainer.classList.add('animate-open');
      this.isOpen = true;
      this.focusTrap();
    }, this.speed);
  }

  close() {
    if (this.modalContainer) {
      this.modalContainer.classList.remove('animate-open');
      this.modalContainer.classList.remove(this.animation);
      this.modal.classList.remove('is-open');
      this.modalContainer.classList.remove('graph-modal-open');

      this.enableScroll();

      document.body.style.scrollBehavior = 'auto';
      document.documentElement.style.scrollBehavior = 'auto';

      this.options.isClose(this);
      this.isOpen = false;
      this.focusTrap();

      if (this.reOpen) {
        this.reOpen = false;
        this.open();
      }
    }
  }

  focusCatch(e) {
    const nodes = this.modalContainer.querySelectorAll(this._focusElements);
    const nodesArray = Array.prototype.slice.call(nodes);
    const focusedItemIndex = nodesArray.indexOf(document.activeElement)
    if (e.shiftKey && focusedItemIndex === 0) {
      nodesArray[nodesArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
      nodesArray[0].focus();
      e.preventDefault();
    }
  }

  focusTrap() {
    const nodes = this.modalContainer.querySelectorAll(this._focusElements);
    if (this.isOpen) {
      if (nodes.length) nodes[0].focus();
    } else {
      this.previousActiveElement.focus();
    }
  }

  disableScroll() {
    let pagePosition = window.scrollY;
    this.lockPadding();
    document.body.classList.add('disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
  }

  enableScroll() {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    this.unlockPadding();
    document.body.style.top = 'auto';
    document.body.classList.remove('disable-scroll');
    window.scrollTo({
      top: pagePosition,
      left: 0
    });
    document.body.removeAttribute('data-position');
  }

  lockPadding() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    this._fixBlocks.forEach((el) => {
      el.style.paddingRight = paddingOffset;
    });
    document.body.style.paddingRight = paddingOffset;
  }

  unlockPadding() {
    this._fixBlocks.forEach((el) => {
      el.style.paddingRight = '0px';
    });
    document.body.style.paddingRight = '0px';
  }
}

;// CONCATENATED MODULE: ./source/js/components/modal.js

const modal = new GraphModal({
  isOpen: modal => {
    window.fullpage_api.setAllowScrolling(false);
  },
  isClose: () => {
    window.fullpage_api.setAllowScrolling(true);
  }
});
/* harmony default export */ const components_modal = (modal);
;// CONCATENATED MODULE: ./source/js/index.js



// import cursorS   from './components/cursor';



// Init
function init() {
  components_accord();
  // cursorS();
  MainMenu();
  components_modal;
  function jaw() {
    const jaw = document?.querySelectorAll('.jaw__item');
    const jawInput = document?.getElementById('jaw-input');
    const jaws = [];
    jaw.forEach(e => {
      e.addEventListener('click', function () {
        e.classList.toggle('active');
        const indx = jaws.indexOf(this.dataset.value);
        if (~indx) {
          jaws.splice(indx, 1);
        } else {
          jaws.push(this.dataset.value);
        }
        jawInput.value = jaws;
        if (jawInput.value === '') {
          jawInput.classList.remove('active');
        } else {
          jawInput.classList.add('active');
        }
      });
    });
  }
  jaw();
  function steps() {
    const stepBtn = document?.querySelectorAll('.btn-step');
    const counter = 0;
    stepBtn.forEach(item => {
      item.addEventListener('click', e => {
        if (e.target.classList.contains('btn-step--prev')) {
          document.querySelector('.form__step--one').classList.add('active');
          document.querySelector('.form__step--two').classList.remove('active');
          document.querySelector('.counter').innerHTML = 1;
        }
        if (e.target.classList.contains('btn-step--next')) {
          document.querySelector('.form__step--one').classList.remove('active');
          document.querySelector('.form__step--two').classList.add('active');
          document.querySelector('.counter').innerHTML = counter + 2;
        }
      });
    });
  }
  steps();
  function checked() {
    const checkbox = document.getElementById('checkbox');
    const patient = document.querySelector('.patient');
    const doctor = document.querySelector('.doctor');
    checkbox.addEventListener('click', () => {
      if (checkbox.checked) {
        doctor.classList.add('active');
        patient.classList.remove('active');
      } else {
        patient.classList.add('active');
        doctor.classList.remove('active');
      }
    });
  }
  checked();
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  };
  window.addEventListener('resize', appHeight);
  appHeight();
}
(function () {
  init();
})();
/******/ })()
;
//# sourceMappingURL=app.js.map