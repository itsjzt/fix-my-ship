/* Resize textarea's height according to the content inside */
var textarea = null;
window.addEventListener(
  'load',
  function() {
    textarea = window.document.querySelector('textarea');
    textarea.addEventListener(
      'keypress',
      function() {
        if (textarea.scrollTop != 0) {
          textarea.style.height = textarea.scrollHeight + 'px';
        }
      },
      false
    );
  },
  false
);
