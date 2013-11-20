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
$(document).foundation('orbit', {
  animation_speed: 300,
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
    if (currentProject) {
      loadProject(currentProject)
    }
  })
  // Trigger hashchange immediately
  $(window).hashchange()
  
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
      $('#n-resume').click();
      break;
    default:
      $('body').css('overflow', 'visible')
      $('#project-view').hide()
      break;
  }
}

// Displays all current / featured / recent projects
function displayFeaturedProjects(projects) {
  var template = $('#m_current_project').html()
  for (var i = 0; i < projects.items.length; i++) {
    var project = projects.items[i]
    if (project.status == 'current') {
      $('#projects').append(Mustache.render(template, project))
    }
  }
}

// Displays all portfolio projects
function displayProjectGrid(projects) {
  var template = $('#m_portfolio_grid').html()
  for (var i = 0; i < projects.items.length; i++) {
    var project = projects.items[i]
    if (project.status == 'portfolio') {
      $('#portfolio-grid').append(Mustache.render(template, project))
    }
  }
}

function displayRandomQuote (quotes) {
  // Quotes should be an array
  var i = Math.floor(Math.random() * quotes.length)
  $('.quote').html(quotes[i].quote)
  $('.author').html(quotes[i].author)
}


function loadProject(projectID) {
  // Adjust DOM
  $('body').css('overflow', 'hidden')
  $('#project-view').show()
  $('#main').hide()

  // Create the project html snippet
  var template = $('#m_project').html()
  for (var i = 0; i < projects.items.length; i++) {
    var item = projects.items[i]
    if (item.id == projectID) {
      $('#project-data').html(Mustache.render(template, item))

      // Set up orbit
      $('#orbit').on('orbit:ready', function(event) {
        $('.preloader').hide()
      })
      $(document).foundation('reflow')

      // Initialize Foundation Orbit
      document.title = item.name + ' - ' + site_title
      return true
    }
  }
}


