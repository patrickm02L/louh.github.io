'use strict'

/* INITIALIZE */

var projectJSON = 'portfolio.json'
var projects = {}
var quotes = []
var siteTitle = document.title

var currentProject = null
var currentPage = checkHash()
var projectGrid = null

// Initalize Foundation
$(document).foundation()

// Set up Foundation plugins
$(document).foundation('orbit', {
  animation_speed: 250,
  slide_number: false,
  bullets: false,
  timer: false,
  variable_height: true
})
$(document).foundation('interchange', {
  named_queries: {
    medium: 'only screen and (min-width: 481px)',
    large: 'only screen and (min-width: 768px)'
  }
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
    _showProject(currentProject)    
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
    currentPage = checkHash()
    loadHash()
    if (currentProject && !_.isEmpty(projects)) {
      _showProject(currentProject)
    }
  })
  // Trigger hashchange immediately
  $(window).hashchange()

  // Actions to perform whenever the screen size changes
  $(window).resize(function () {
    _recalculateVideoPlayer()
  })

  // Filter
  var filters = $('#portfolio').find('.filter')
  filters.click(function (e) {
    e.preventDefault()
    filterProjectGrid(filters, this)
  })

  // Force Interchange to reflow after being replaced.
  $(document).on('replace', 'img.interchange', function (e, new_path, original_path) {
    console.log('Reflow interchange')
    $(document).foundation('interchange', 'reflow')
    // console.log(e.currentTarget, new_path, original_path);
  })
})


/* FUNCTIONS */

function checkHash () {
  var rawHash = window.location.hash
  var hash = rawHash.split('/')
  var currentPage = hash[1]
  if (rawHash.match(/\/portfolio\//)) {
    currentProject = hash[2]
  }
  else {
    currentProject = null
  }
  return currentPage
}

function loadHash () {
  switch(currentPage) {
    case 'resume':
      _showResume()
      break
    case 'portfolio':
      // Nothing here, because this is handled elsewhere.
    default:
      _showMainPage()
      break
  }
}

function _showMainPage () {
  _hideProject()
  _hideResume()
  $('#main').show()
  document.title = siteTitle
  _recalculateVideoPlayer()
}

function _hideMainPage () {
  $('#main').hide()
}

function _showProject (projectID) {
  // Adjust DOM
  _hideMainPage()
  $('#project-view').show()

  // Scroll to top of page
  $('body').scrollTop(0)

  // Create the project html snippet
  var template = $('#m_project').html()
  for (var i = 0; i < projects.items.length; i++) {
    var item = projects.items[i]
    if (item.id === projectID) {
      $('#project-view').html(Mustache.render(template, item))
      document.title = item.name + ' - ' + siteTitle
      break
    }
  }

  // Hack the max-width for legacy portfolio projects
  if (item.status == 'portfolio-legacy') {
    $('.slideshow-wrapper').addClass('legacy')
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

function _hideProject () {
  $('#project-view').hide()
}

function _showResume () {
  _hideMainPage()
  $('#resume-view').show()
  document.title = 'Resumé - ' + siteTitle

  // Scroll to top of page
  $('body').scrollTop(0)
}

function _hideResume () {
  $('#resume-view').hide()
}

function _recalculateVideoPlayer () {
  var ratio  = 0.562 // ratio for video width/height
  var width  = $('.video-wrapper').width()
  var height = width * ratio 
  $('.video-wrapper').css('height', height + 'px')
}

// Displays all current / featured / recent projects
function displayFeaturedProjects (projects) {
  var template = $('#m_featured_project').html()
  for (var i = 0; i < projects.items.length; i++) {
    var project = projects.items[i]
    if (project.status == 'featured') {
      $('#projects').append(Mustache.render(template, project))
      $('#projects .preloader').hide()
    }
  }
}

// Displays all portfolio projects
function displayProjectGrid (projects) {
  var template = $('#m_portfolio_grid').html()
  var multiple = 6

  var items = []

  for (var i = 0; i < projects.items.length; i++) {
    var project = projects.items[i]
    if (project.status == 'portfolio' || project.status == 'portfolio-legacy') {
      items.push(project)
    }
  }

  // Only display items up to a multiple of 6 to ensure that items are evenly spaced on either a 3x or 2x grid.
  // The actual multiple can be changed in the future, if the layout changes.
  var gridLength = Math.floor(items.length / multiple) * multiple

  for (var j = 0; j < gridLength; j++) {
    $('#portfolio-grid').append(Mustache.render(template, items[j]))    
  }

  $('#portfolio .preloader').hide()
}

function filterProjectGrid (filters, clicked) {

  // Toggle filter
  if ($(clicked).hasClass('highlight')) {
    $(clicked).removeClass('highlight')
    $(projectGrid).removeClass('faded')
    return
  }

  // Clear all previous buttons
  $(filters).removeClass('highlight')

  // Highlight button
  $(clicked).addClass('highlight')

  // Cache project grid on first filter click
  if (projectGrid === null) {
    projectGrid = $('#portfolio-grid').find('.portfolio-grid-item')
  }

  // Refresh all project opacities
  $(projectGrid).removeClass('faded')

  // Check types and fade out projects that don't match
  var type = $(clicked).data('type')
  for (var i = 0; i < projectGrid.length; i++) {
    if (type != $(projectGrid[i]).data('project-type')) {
      $(projectGrid[i]).addClass('faded')
    }
  }
}

function displayRandomQuote (quotes) {
  // Quotes should be an array
  var i = Math.floor(Math.random() * quotes.length)
  $('.quote').html(quotes[i].quote)
  $('.author').html(quotes[i].author)
}

