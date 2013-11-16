'use strict'

var projectJSON = 'portfolio.json'
var projects = {}

/* INTERFACE */

var mouse_is_inside = false;
var site_title = document.title;
var scroller, scrollItemsLeftPos, scrollBoxLeftPos, scrollItemsRightPos, scrollBoxRightPos;

function loadHash() {
  var hash = window.location.hash;
  switch(hash) {
    case '#/resume':
      $('#n-resume').click();
      break;
    case '#/projects':
      $('#n-projects').click();
      break;
    case '#/portfolio':
      $('#n-portfolio').click();
      break;
    case '':
      $('#n-portfolio').click();
      break;
  }
  if (hash.match(/\/portfolio\//)) {
    var splitHash = hash.split(/\/portfolio\//);
    var projectID = splitHash[1];
    if (projectID) {
      $('#d-portfolio').show();
      $('#port-menu').hide();
      $('#port-project').show();
      loadProject(projectID);
    }
  }
}


function portArrows() {
  // Test project's image scroller to see if arrows are needed.
  // Call this function after #port-projectdata is fully visible, otherwise offset() might return
  // unpredictable results (depending on browser)
  scroller = $('#port-images').find('.scroller');
  scrollItemsLeftPos = $(scroller).offset().left;
  scrollBoxLeftPos = $('#port-images').offset().left;
  scrollItemsRightPos = $(scroller).find('img:last').offset().left + $(scroller).find('img:last').width() - 15;
  scrollBoxRightPos = $('#port-images').offset().left + $('#port-images').width();
  if (scrollItemsLeftPos < scrollBoxLeftPos) {
    $('#port-images').find('.port-leftarrow').fadeIn(200);
  }
  if (scrollItemsLeftPos >= scrollBoxLeftPos) {
    $('#port-images').find('.port-leftarrow').fadeOut(200);
  }
  if (scrollItemsRightPos > scrollBoxRightPos) {
    $('#port-images').find('.port-rightarrow').fadeIn(200);
  }
  if (scrollItemsRightPos <= scrollBoxRightPos) {
    $('#port-images').find('.port-rightarrow').fadeOut(200);
  }
}

function loadProject(projectID) {

  // Clear screen
  $('#port-loader:hidden').show();
  if ($('#port-menu').is(':visible')) {
    $('#port-menu').fadeOut(200, function(){
      $('#port-project').fadeIn(200);
    });
  }

  // Display the project, clear the old project first, if it is there
  $('#port-projectdata').fadeOut(200, function () {
    // Create the project html snippet
    var item = null;
    var m_project = $('#m_project').html();
    for (var i = 0; i < projects.items.length; i++) {
      item = projects.items[i];
      if (item.id == projectID) {
        $('#port-projectdata').html(Mustache.render(m_project, item)).fadeIn(200, function() { 
          $('#port-loader').hide();
          initProjectNav();
          portArrows();
        });
         document.title = item.name + ' - ' + site_title;
         return true;
      }
    }
  });
  /*
    else {
      // Show menu if project is not found
      backToMenu();
    }
  */
}

function backToMenu() {
  if ($('#port-menu').is(':hidden')) {
    $('#port-projectdata').fadeOut(200);
    $('#port-project').fadeOut(200, function(){
      $('#port-menu').fadeIn(200);
      menuArrows();
    });
    document.title = 'Portfolio - ' + site_title;
    window.location.hash = '/portfolio';
  }
}

function initProjectNav () {
  // Portfolio - Project navigation
  // var projectWidth = 650;
  var projectWidth;

  $('.port-leftarrow img').on('click', function(){
    var projectWidth = $('#port-images').width();
    // Overscroll stopper - like the menu one, not that elegant but it works
    scroller = $('#port-images .scroller')
    scrollItemsLeftPos = $(scroller).offset().left + projectWidth;
    scrollBoxLeftPos = $('#port-images').offset().left;
    if (scrollItemsLeftPos <= scrollBoxLeftPos) {
      $('#port-images .scroller').filter(':not(:animated)').animate({'marginLeft': '+='
      +projectWidth}, 300, function(){
        portArrows();
      });
    }
  });
  $('.port-rightarrow img').on('click', function(){
    var projectWidth = $('#port-images').width();
    scroller = $('#port-images .scroller')
    scrollItemsRightPos = $(scroller).find('img:last').offset().left + $(scroller).find('img:last').width() - 15;
    scrollBoxRightPos = $('#port-images').offset().left + $('#port-images').width();
    if (scrollItemsRightPos > scrollBoxRightPos) {
      $('#port-images .scroller').filter(':not(:animated)').animate({'marginLeft': '-='+projectWidth}, 300, function(){
        portArrows();
      });
    }
  });
  
  // Portfolio - Project - Fade out arrows when not hovering over images
  $('#port-images').on('mouseover', function() {
    $('.port-leftarrow img').stop(true, true).fadeIn(200);  
    $('.port-rightarrow img').stop(true, true).fadeIn(200);
  });
  $('#port-images').on('mouseout', function() {
    $('.port-leftarrow img').delay(150).fadeOut(200);
    $('.port-rightarrow img').delay(150).fadeOut(200);
  });

  // Portfolio - Project - Image captions
  $('#port-images .scroller img').on('mouseenter', function (){
    $(this).next('div').stop(true, true).fadeIn(200);
  });
  $('#port-images .scroller img').on('mouseleave', function (){
    $(this).next('div').delay(150).fadeOut(200);
  });
  
}

/* INITIALIZE */

var quotes = []

$(document).ready(function() {

  // LOAD QUOTES FILE
  $.ajax({
    url: 'quotes.json',
    async: true,
    dataType: 'json',
    success: function (data) {
      quotes = data.quotes
      var i = Math.floor(Math.random() * quotes.length)
      $('.quote').html(quotes[i].quote)
      $('.author').html(quotes[i].author)
    },
    error: function (jqxhr, status, error) {
      console.log('Error loading quotes file. Status: ' + status + '. Error: ' + error)
    }
  })


  // LOAD PROJECTS JSON
  $.ajax({
    url: projectJSON,
    async: false,
    dataType: 'json',
    success: function(data) {
      projects = data;
    }
  });

  // POPULATE 'CURRENT PROJECTS' PAGE
  var item
  var m_current_project = $('#m_current_project').html()
  for (var i = 0; i < projects.items.length; i++) {
    item = projects.items[i]
    if (item.status == 'current') {
      $('#projects').append(Mustache.render(m_current_project, item))
    }
  }

  // CREATE PORTFOLIO MENU
  var project = null
  var m_portfolio_grid = $('#m_portfolio_grid').html()
  for (var i = 0; i < projects.items.length; i++) {
    project = projects.items[i]
    if (project.status == 'portfolio') {
      $('#portfolio-grid').append(Mustache.render(m_portfolio_grid, project))
    }
  }

  // Portfolio
  $('#n-portfolio').click(
    function() {
      // Close all other tabs if open
      $('#d-resume:visible').fadeOut(200);
      $('#n-resume span.active').removeClass('active');
      $('#d-projects:visible').fadeOut(200);
      $('#n-projects span.active').removeClass('active');
      // Open portfolio window
      $('#d-portfolio:hidden').fadeIn(300);
      $('#n-portfolio span').addClass('active');
      // Reset to main menu
      $('#port-projectdata').fadeOut(200);
      $('#port-project').fadeOut(200, function(){
        $('#port-menu').fadeIn(200);
      });
      menuArrows();
      document.title = 'Portfolio - ' + site_title;
      window.location.hash = '/portfolio';
    }
  );

  // Resume
  $('#n-resume').click(
    function() {
      // Close all other tabs if open
      $('#d-portfolio:visible').fadeOut(200);
      $('#n-portfolio span.active').removeClass('active');
      $('#d-projects:visible').fadeOut(200);
      $('#n-projects span.active').removeClass('active');
      // Open Resume
      $('#d-resume:hidden').fadeIn(300, function(){
        document.title = 'Resume - ' + site_title;
        window.location.hash = '/resume';
      });
      $('#n-resume span').addClass('active');
    }
  );


  // Portfolio - Dropdown menu
  $('#port-dropbutton').hover(
    function() {
      $('#port-dropbutton').stop(false,true).animate({opacity: 1}, 200);
    },
    function() {
      if ($('#port-dropdown').is(":hidden")) {
        $('#port-dropbutton').stop(false,true).animate({opacity: 0.5}, 200);
      }
    }
  );
  $('#port-dropbutton').click( function () {
    $('#port-dropdown:hidden').slideDown(300);
  });

  // Portfolio - Dropdown - View project
  $('#port-dropdown a').click( function () {
    $('#port-dropdown:visible').fadeOut(200);
    $('#port-dropbutton').animate({opacity: 0.5}, 200);
  });

  // Portfolio - Dropdown - Close if clicked outside
  $('#port-dropdown').hover(function(){ 
    mouse_is_inside=true; 
  }, function(){ 
    mouse_is_inside=false; 
  });
  $('body').mouseup(function(){ 
    if((! mouse_is_inside) && ($('#port-dropdown').is(':visible'))) {
      $('#port-dropdown').slideUp(200);
      $('#port-dropbutton').stop(false,true).animate({opacity: 0.5}, 200);
    }
  });
  
  // Portfolio - Back button
  $('#port-backbutton').click(function(event){
    backToMenu();
  });
  $('#port-backbutton').hover(
    function() {
      $('#port-backbutton').stop(false,true).animate({opacity: 1}, 200);
    },
    function() {
      $('#port-backbutton').stop(false,true).animate({opacity: 0.5}, 200);
    }
  );

  // Keybindings
  $(document).keydown(function (e) {
    if (e.which == 80 && e.ctrlKey == false && e.metaKey == false) {    // key 'p'      opens "portfolio" window
      $('#n-portfolio').click(); return false; 
    }
    if (e.which == 82 && e.ctrlKey == false && e.metaKey == false) {    // key 'r'      opens "resume" window
      $('#n-resume').click(); return false; 
    }
    if (e.which == 37) {            // key 'left'   scrolls portfolio left
    //  $('.port-leftarrow img').fadeIn(0);
      $('.port-leftarrow img').click();
    //  $('.port-leftarrow img').fadeOut(300);
      return false;
    }
    if (e.which == 39) {            // key 'right'  scrolls portfolio right
    //  $('.port-rightarrow img').fadeIn(0);
      $('.port-rightarrow img').click();
    //  $('.port-rightarrow img').fadeOut(300);
      return false;
    }
    if (e.which == 38) {            // key 'up'     returns to main menu or closes dropdown
      if ($('#port-dropdown').is(':visible')){
        $('#port-dropdown').slideUp(200);
        $('#port-dropbutton').stop(false,true).animate({opacity: 0.5}, 200);
      }
      else {
        $('#port-dropback').click();
      }
      return false;
    }
    if (e.which == 40) {            // key 'down'   opens dropdown menu
      if ($('#port-dropdown').is(':hidden') && $('#port-project').is(':visible')){
        $('#port-dropbutton').click();
      }
      return false;
    }
  });
  
  // INITIALISE
  
  // Load portfolio or resume items immediately if link contains hash elements
  // Currently using BBQ's hashchange plugin for this functionality.
  // Bind hashchange event to window

  $(window).hashchange(function(){
    loadHash();
  });
  // Trigger hashchange immediately
  $(window).hashchange();

  $(window).resize(function() {
    if ($('#port-menu').is(':visible')) {
      menuArrows();
    }
  });

  
});
