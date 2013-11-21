'use strict'

/* INITIALIZE */

var projectJSON = 'portfolio.json'
var projects = {}
var quotes = []
var site_title = document.title

var currentProject = null
var currentPage = null

// Initalize Foundation
$(document).foundation()

// Set up orbit
$(document).foundation('orbit', {
  animation_speed: 250,
  slide_number: false,
  bullets: false,
  timer: false,
  variable_height: true
})


/* LOAD DATAS */

// QUOTES
$.when(
  $.ajax({
    url: 'quotes.json',
    async: true,
    dataType: 'json',
    success: function (data) {
      quotes = data.quotes
    },
    error: function (jqxhr, status, error) {
      console.log('Error loading quotes. Status: ' + status + '. Error: ' + error)
    }
  })
).then(function() {
  // Do stuff with quotes
  displayRandomQuote(quotes)
})

// PROJECTS
$.when(
  $.ajax({
    url: projectJSON,
    async: true,
    dataType: 'json',
    success: function(data) {
      projects = data;
    },
    error: function (jqxhr, status, error) {
      console.log('Error loading projects. Status: ' + status + '. Error: ' + error)
    }
  })
).then(function() {
  // Do stuff with projects
  if (currentProject) {
    loadProject(currentProject)    
  }
  displayFeaturedProjects(projects)
  displayProjectGrid(projects)
})

/* INTERFACE */
$(document).ready(function() {


  /* INITIALIZE HASHCHANGE PLUGIN */
  // Load portfolio or resume items immediately if link contains hash elements
  // Currently using BBQ's hashchange plugin for this functionality.
  // Bind hashchange event to window
  $(window).hashchange(function(){
    loadHash()
    if (currentProject && !_.isEmpty(projects)) {
      loadProject(currentProject)
    }
  })
  // Trigger hashchange immediately
  $(window).hashchange()

  // Do this one time
  _recalculateVideoPlayer()

  // Bind to the window to do this more
  $(window).resize(function () {
    _recalculateVideoPlayer()
  })
  
});


/* FUNCTIONS */

function loadHash() {
  var rawHash = window.location.hash
  var hash = rawHash.split('/')
  currentPage = hash[1]
  if (rawHash.match(/\/portfolio\//)) {
    currentProject = hash[2]
  }
  else {
    currentProject = null
  }
  switch(currentPage) {
    case 'resume':
      $('#n-resume').click()
      break
    default:
      _unloadProject()
      _loadMainPage()
      break
  }
}

function _loadMainPage () {
  $('body').css('overflow', 'visible')
  $('#main').show()
}

function _hideMainPage () {
  $('body').css('overflow', 'hidden')
  $('#main').hide()
}

function _unloadProject () {
  $('#project-view').hide()
}

function _recalculateVideoPlayer () {
  var ratio  = 0.562 // ratio for video width/height
  var width  = $('.video-wrapper').width()
  var height = width * ratio 
  $('.video-wrapper').css('height', height + 'px')
}

// Displays all current / featured / recent projects
function displayFeaturedProjects (projects) {
  var template = $('#m_current_project').html()
  for (var i = 0; i < projects.items.length; i++) {
    var project = projects.items[i]
    if (project.status == 'current') {
      $('#projects').append(Mustache.render(template, project))
      $('#projects .preloader').hide()
    }
  }
}

// Displays all portfolio projects
function displayProjectGrid (projects) {
  var template = $('#m_portfolio_grid').html()
  for (var i = 0; i < projects.items.length; i++) {
    var project = projects.items[i]
    if (project.status == 'portfolio') {
      $('#portfolio-grid').append(Mustache.render(template, project))
      $('#portfolio .preloader').hide()
    }
  }
}

function displayRandomQuote (quotes) {
  // Quotes should be an array
  var i = Math.floor(Math.random() * quotes.length)
  $('.quote').html(quotes[i].quote)
  $('.author').html(quotes[i].author)
}


function loadProject (projectID) {
  // Adjust DOM
  _hideMainPage()
  $('#project-view').show()

  // Create the project html snippet
  var template = $('#m_project').html()
  for (var i = 0; i < projects.items.length; i++) {
    var item = projects.items[i]
    if (item.id === projectID) {
      $('#project-data').html(Mustache.render(template, item))
      document.title = item.name + ' - ' + site_title
      break
    }
  }

  // To do: handle an error where project isn't found.

  // Orbit stuff
  $('#orbit').on('orbit:ready', function(event) {
    console.log('Orbit is ready.')
  })
  $('#orbit').on('orbit:orbit:after-slide-change', function(event) {
    $('.preloader').hide()
  })
  // Hide prev/next arrows if there is only one image.
  if (item.images.length <= 1) {
    $('#orbit').attr('data-options', 'navigation_arrows: false')
  }
  // Force orbit to recalculate itself after loading new stuff.
  $(document).foundation('reflow')


}


