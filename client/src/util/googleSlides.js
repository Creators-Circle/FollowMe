// Google Slides

import $ from 'jquery';

var CLIENT_ID = '472492304712-1omf26gq2el8ovmleturcihefs6o8463.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/presentations.readonly"];

var TEST_PRESENTATION = '1P8JoeBQLlygBHmuD3IteIFJXCo4NSAnC1OZ1e2SMXY8';

var pres;
/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    authorizeDiv.style.display = 'none';
    loadSlidesApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.style.display = 'inline';
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * Load Slides API client library.
 */
function loadSlidesApi() {
  gapi.client.load('slides', 'v1').then(listSlides);
}

/**
 * Prints the number of slides and elements in a sample presentation:
 * https://docs.google.com/presentation/d/1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc/edit
 */
function listSlides() {
  gapi.client.slides.presentations.get({
    presentationId: TEST_PRESENTATION || '1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc'
  }).then(function(response) {
    var presentation = response.result;
    var length = presentation.slides.length;
    // appendPre('The presentation contains ' + length + ' slides:');
    // for (i = 0; i < length; i++) {
    //   var slide = presentation.slides[i];
    //   appendPre('- Slide #' + (i + 1) + ' contains ' +
    //       slide.pageElements.length + ' elements.')
    // }
  }, function(response) {
    appendPre('Error: ' + response.result.error.message);
  });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('output');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

export default checkAuth;