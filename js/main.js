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
      var snippet  = _.template(template)
      var featured = this._getFeaturedProjects(projects)

      for (var item in featured) {
        document.getElementById('projects').innerHTML += snippet(featured[item])
      }
    },

    displayProjectGrid: function (projects) {
      // Displays all portfolio projects
      var template  = document.getElementById('template-portfolio-grid-item').innerHTML
      var snippet   = _.template(template)
      var gridItems = this._getPortfolioProjects(projects)

      for (var item in gridItems) {
        document.getElementById('portfolio-grid').innerHTML += (snippet(gridItems[item]))
      }
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

    projectNavigation: function (projects) {
      // Set up previous / next project navigation on project page
      var previousLink    = document.getElementById('previous-link'),
          nextLink        = document.getElementById('next-link'),
          previousProject = document.getElementById('previous-project'),
          nextProject     = document.getElementById('next-project')
      var portfolio = this._getAllProjects(projects)
      var projectId = document.getElementById('project').dataset.projectId

      for (var i = 0; i < portfolio.length; i++) {
        if (portfolio[i].id === projectId) {
          // Set previous / next index
          var prev = i - 1,
              next = i + 1

          if (i === 0) {
            prev = portfolio.length - 1
          } else if (i === portfolio.length - 1) {
            next = 0
          }

          // Display
          previousLink.href = '/projects/' + portfolio[prev].id + '/'
          nextLink.href     = '/projects/' + portfolio[next].id + '/'
          previousProject.innerHTML    = portfolio[prev].name
          nextProject.innerHTML        = portfolio[next].name
        }
      }
    },

    _getFeaturedProjects: function (projects) {
      var items = []
      for (var index in projects.items) {
        var project = projects.items[index]
        if (project.status == 'featured') {
          items.push(project)
        }
      }
      return items
    },

    _getPortfolioProjects: function (projects) {
      var multiple = 6
      var items    = []

      for (var item in projects.items) {
        var project = projects.items[item]
        if (project.status == 'portfolio' || project.status == 'portfolio-legacy') {
          items.push(project)
        }
      }

      // Only return items up to a multiple of 6 to ensure that items are evenly spaced on either a 3x or 2x grid.
      // The actual multiple can be changed in the future, if the layout changes.
      var gridLength = Math.floor(items.length / multiple) * multiple
      return _.first(items, gridLength)
    },

    _getAllProjects: function (projects) {
      // Just return a concatenation of featured + portfolio projects
      return _.union(this._getFeaturedProjects(projects), this._getPortfolioProjects(projects))
    },

    _initFoundation: function () {
      // Initalize Foundation
      $(document).foundation()

      // Set up Foundation plugins
      $(document).foundation({
        topbar: {
          scrolltop: false
        }
      })

      // Orbit options is buggy here. Use data-options in html instead
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
    } else if (CURRENT_PAGE === 'projects') {
      // Set up previous / next project navigation
      page.projectNavigation(DATA_PROJECTS)
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
    else if (CURRENT_PAGE === 'projects') {
      var projectEl = document.getElementById('project')

      // Set image max-width for legacy portfolio projects
      if (projectEl.dataset.projectStatus === 'portfolio-legacy') {
        $('.slideshow-wrapper').addClass('legacy')
      }

      // Disable Orbit interface if there is only one image.
      if ($('#orbit').find('li').length === 1) {
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
    } else {
      return currentPage
    }
  }

}())
