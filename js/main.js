(function () {
  'use strict';

  /* INITIALIZE */

  // Constants
  var SITE_TITLE    = document.title

  var DATA_PATH          = '/data/',
      DATA_PROJECTS_PATH = DATA_PATH + 'portfolio.json',
      DATA_QUOTES_PATH   = DATA_PATH + 'quotes.json',
      DATA_PROJECTS      = {},
      DATA_QUOTES        = []

  // Page object
  var page = {}

  // Object variables
  page.projectGrid = null

  // Recalculate DOM element for video player depending on screen size
  page.recalculateVideoPlayer = function () {
    var ratio  = 0.562 // ratio for video width/height
    var width  = $('.video-wrapper').width()
    var height = width * ratio
    $('.video-wrapper').css('height', height + 'px')
  }

  // Displays all current / featured / recent projects
  page.displayFeaturedProjects = function (projects) {
    var template = document.getElementById('template-featured').innerHTML
    var snippet = _.template(template)
    for (var i = 0; i < projects.items.length; i++) {
      var project = projects.items[i]
      if (project.status == 'featured') {
        document.getElementById('projects').innerHTML += snippet(project)
      }
    }
    // Hide preloader
    $('#projects .preloader').hide()
  }

  // Displays all portfolio projects
  page.displayProjectGrid = function (projects) {
    var template = document.getElementById('template-portfolio-grid-item').innerHTML
    var snippet  = _.template(template)
    var multiple = 6
    var items    = []

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
      $('#portfolio-grid').append(snippet(items[j]))
    }

    $('#portfolio .preloader').hide()
  }

  // Display a random quote on the page
  page.displayRandomQuote = function (quotes) {
    var i = Math.floor(Math.random() * quotes.length)
    document.querySelector('.quote').innerHTML  = quotes[i].quote
    document.querySelector('.author').innerHTML = quotes[i].author
  }

  // Filters projects by type
  page.filterProjectGrid = function (filters, clicked) {
    // Cache project grid
    if (this.projectGrid === null) {
      this.projectGrid = $('#portfolio-grid').find('.portfolio-grid-item')
    }
    var projectGrid = this.projectGrid

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


  // Initalize Foundation
  $(document).foundation()

  // Set up Foundation plugins
  $(document).foundation({
    orbit: {
      animation_speed: 250,
      slide_number: false,
      bullets: false,
      timer: false,
      variable_height: true
    }
  })
  /*
    interchange: {
      named_queries: {
        medium: 'only screen and (min-width: 481px)',
        large: 'only screen and (min-width: 768px)'
      }
    }
  })
  */

  /* LOAD DATAS */

  // QUOTES
  $.when(
    $.ajax({
      url: DATA_QUOTES_PATH,
      async: true,
      dataType: 'json',
      success: function (data) {
        DATA_QUOTES = data.quotes
      },
      error: function (jqxhr, status, error) {
        console.log('Error loading quotes. Status: ' + status + '. Error: ' + error)
      }
    })
  ).then(function() {
    page.displayRandomQuote(DATA_QUOTES)
  })

  // PROJECTS
  $.when(
    $.ajax({
      url: DATA_PROJECTS_PATH,
      async: true,
      dataType: 'json',
      success: function (data) {
        DATA_PROJECTS = data
      },
      error: function (jqxhr, status, error) {
        console.log('Error loading projects. Status: ' + status + '. Error: ' + error)
      }
    })
  ).then(function() {
    page.displayFeaturedProjects(DATA_PROJECTS)
    page.displayProjectGrid(DATA_PROJECTS)
  })

  /* INTERFACE */
  $(document).ready(function() {
    
    // INIT
    page.recalculateVideoPlayer()

    // Actions to perform whenever the screen size changes
    $(window).resize(function () {
      page.recalculateVideoPlayer()
    })

    // Filter
    var filters = $('#portfolio').find('.filter')
    filters.click(function (e) {
      e.preventDefault()
      page.filterProjectGrid(filters, this)
    })

  })


  /* FUNCTIONS */
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
    /*
    $('#orbit').on('orbit:ready', function(event) {
      console.log('Orbit is ready.')
    })
    */
    /*
    $('#orbit').on('orbit:orbit:after-slide-change', function(event) {
      $('.preloader').hide()
    })
    // Hide prev/next arrows if there is only one image.
    if (item.images.length <= 1) {
      $('#orbit').attr('data-options', 'navigation_arrows: false')
    }

    // Force Interchange to reflow after being replaced.
    $(document).on('replace', 'img.interchange', function (e, new_path, original_path) {
      $(document).foundation('interchange', 'reflow')
      // console.log(e.currentTarget, new_path, original_path);
    })
    */

    // Force orbit to recalculate itself after loading new stuff.
    $(document).foundation('reflow')
  }

}())
