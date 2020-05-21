
/* 
    Short cuts for document querySelector and querySelectorAll
    which can handle being used as template tags dollarSign`main` or doubleDollarSign`div`
    
    Also if the first character is < then create a fragment instead
*/
const dollarSign = (...s) => {
    const str = Array.isArray(s[0]) ? String.raw(...s) : s[0];
    return str[0] === '<' ? document.createRange().createContextualFragment(str) : document.querySelector(str);
  }
  
  const doubleDollarSign = (...s) => {
    const str = Array.isArray(s[0]) ? String.raw(...s) : s[0];
    return Array.from(str[0] === '<' ? dollarSign(str).children : document.querySelectorAll(str));
  }
  
  /* Function for fetching a document fragment and replacing an element with it */
  function replace(el,url) {
    return fetch(url)
      .then(r => r.text())
      .then(html => {
        el.parentNode.insertBefore(dollarSign(html), el);
        el.remove();
      });
  }
  
  /* Update the window URL on swipe, this is throttled so that the history doesn't get filled with useless entries*/
  function updateHistory(hash) {
    clearTimeout(updateHistory.timeout);
    updateHistory.timeout = setTimeout(function () {
      if (window.location.hash !== hash) {
        history.pushState({}, window.title, hash);
      }
    }, 1000);
  }
  
  const iO = new IntersectionObserver(entries => entries.forEach(entry => {
      const hash = '#'+entry.target.id;
      const navEl = dollarSign`[href="${hash}"]`;
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          navEl.classList.add('focus');
          updateHistory(hash);
      } else {
          navEl.classList.remove('focus');
      }
  }), {
      root: dollarSign`main`,
      threshold: 0.5
  });
  
  window.addEventListener('DOMContentLoaded', () => doubleDollarSign`article`.map(a => iO.observe(a)));
  window.addEventListener('hashchange', function (e) {
    const articleToShow =  dollarSign(window.location.hash || '#' + dollarSign`article`.id);
    articleToShow.scrollIntoView();
    e.preventDefault();
  }, false);