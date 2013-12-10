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

  var CURRENT_PAGE = _getCurrentPage()

  // Page methods
  var page = {

    projectGrid: null,

    init: function () {
      this._initFoundation()
    },

    displayFeaturedProjects: function (projects) {
      // Displays all current / featured / recent projects
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
    },

    displayProjectGrid: function (projects) {
      // Displays all portfolio projects
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

      // Hide preloader
      $('#portfolio .preloader').hide()
    },

    filterProjectGrid: function (filters, clicked) {
      // Filters projects by type
      var type = $(clicked).data('type')

      // Cache project grid
      if (this.projectGrid === null) {
        this.projectGrid = $('#portfolio-grid').find('.portfolio-grid-item')
      }
      var projectGrid = this.projectGrid

      // Toggle filter off, if already on
      if ($(clicked).hasClass('highlight')) {
        $(clicked).removeClass('highlight')
        $(projectGrid).removeClass('faded')
        return
      }

      // Reset
      $(filters).removeClass('highlight')
      $(projectGrid).removeClass('faded')

      // Filter projects
      $(clicked).addClass('highlight')
      for (var i = 0; i < projectGrid.length; i++) {
        if (type != $(projectGrid[i]).data('project-type')) {
          $(projectGrid[i]).addClass('faded')
        }
      }
    },

    displayRandomQuote: function (quotes) {
      // Display a random quote on the page
      var i = Math.floor(Math.random() * quotes.length)
      document.querySelector('.quote').innerHTML  = quotes[i].quote
      document.querySelector('.author').innerHTML = quotes[i].author
    },

    _initFoundation: function () {
      // Set up Foundation plugins
      $(document).foundation({
        orbit: {
          animation_speed: 250,
          slide_number: false,
          bullets: true,
          timer: false,
          variable_height: true
        }
      })
      $(document).foundation({
        topbar: {
          scrolltop: false
        }
      })

      // Initalize Foundation
      $(document).foundation()
    }
  }

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
    if (!CURRENT_PAGE) {
      page.displayFeaturedProjects(DATA_PROJECTS)
      page.displayProjectGrid(DATA_PROJECTS)
    }
  })

  /* INTERFACE */
  $(document).ready(function() {
    
    page.init()

    // Main page UI
    if (!CURRENT_PAGE) {
      // Filter project grid
      var filters = $('#portfolio').find('.filter')
      filters.click(function (e) {
        e.preventDefault()
        page.filterProjectGrid(filters, this)
      })
    }

    // Project page UI
    else if (CURRENT_PAGE == 'portfolio') {
      var projectEl = document.getElementById('project')

      // Set image max-width for legacy portfolio projects
      if (projectEl.dataset.projectStatus == 'portfolio-legacy') {
        $('.slideshow-wrapper').addClass('legacy')
      }

      // Disable Orbit interface if there is only one image.
      if ($('#orbit').find('li').length == 1) {
        $('.orbit-prev').hide()
        $('.orbit-next').hide()
        $('.orbit-bullets-container').hide()
      }
    }
    
  })

  /* UTILITY FUNCTIONS */
  function _getCurrentPage () {
    var path = window.location.pathname
    var currentPage = path.split('/')[1]
    if (currentPage.substring(0,5) == 'index') {
      return undefined
    }
    else {
      return currentPage
    }
  }

}())
