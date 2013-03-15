var projectJSON = 'portfolio/portfolio.json';
var projects = {};

/* INTERFACE */

var mouse_is_inside = false;
var site_title = document.title;
var scroller, scrollItemsLeftPos, scrollBoxLeftPos, scrollItemsRightPos, scrollBoxRightPos;

function loadHash() {
    var hash = window.location.hash;
    switch(hash) {
        case '#resume':
            $('#n-resume').click();
            break;
        case '#projects':
            $('#n-projects').click();
            break;
        case '#contact':
            $('#n-contact').click();
            break;
        case '#portfolio':
            $('#n-portfolio').click();
            break;
        case '':
            $('#n-portfolio').click();
            break;
    }
    if (hash.match(/\//)) {
        var splitHash = hash.split(/\//);
        var section = splitHash[0];
        var projectID = splitHash[1];
        // Open portfolio item
        if(section == '#portfolio'){
            $('#d-portfolio').show();
            $('#port-menu').hide();
            $('#port-project').show();
            if(projectID){
                loadProject(projectID);
            }
        }
    }
}

function menuArrows(row) {
    // row is passed if we want to only test a specific menu row
    // but we don't actually need to do it - even if just one row is interacted with, we can still
    // test the entire menu without much trouble
    $('.menu-row').each(function() {
        scroller = $(this).find('.scroller');
        scrollItemsLeftPos = $(scroller).offset().left;
        scrollBoxLeftPos = $(this).offset().left;
        scrollItemsRightPos = $(scroller).find('img:last').offset().left + $(scroller).find('img:last').width() - 15;
        scrollBoxRightPos = $(this).offset().left + $(this).width();
        if (scrollItemsLeftPos < scrollBoxLeftPos) {
            $(this).parent().find('.menu-leftarrow img').fadeIn(200);
        }
        if (scrollItemsLeftPos >= scrollBoxLeftPos) {
            $(this).parent().find('.menu-leftarrow img').fadeOut(200);
        }
        if (scrollItemsRightPos > scrollBoxRightPos) {
            $(this).parent().find('.menu-rightarrow img').fadeIn(200);
        }
        if (scrollItemsRightPos <= scrollBoxRightPos) {
            $(this).parent().find('.menu-rightarrow img').fadeOut(200);
        }
    });
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
    // don't manually set hash here, it will trigger hashchange a second time
    // window.location.hash = 'portfolio/'+projectID;
    // clear screen
    $('#port-loader:hidden').show();
    if ($('#port-menu').is(':visible')) {
        $('#port-menu').fadeOut(200, function(){
            $('#port-project').fadeIn(200);
        });
    }
    else {
        $('#port-projectdata').fadeOut(200);
    }       
    // load and display project
    $('#port-projectdata').delay(100).queue(function(){
        $.getJSON(projectJSON, function(project) {
            console.log(project);
        });
        $(this).load('portfolio/portfolio.html #' + projectID + ' > *', function() {
            // Cufon.refresh();
            if ($(this).html() != ''){
                document.title = $(this).find('h4').text() + ' - ' + site_title;
                $('#port-projectdata').fadeIn(200, function() { 
                    $('#port-loader').hide();
                    portArrows();
                });
            }
            else {
                // Show menu if project is not found
                backToMenu();
            }
        });
        $(this).dequeue();
    });
}

function backToMenu() {
    if ($('#port-menu').is(':hidden')) {
        $('#port-projectdata').fadeOut(200);
        $('#port-project').fadeOut(200, function(){
            $('#port-menu').fadeIn(200);
            menuArrows();
        });
        document.title = 'Portfolio - ' + site_title;
        window.location.hash = 'portfolio';
    }
}

function debug(text) {
    $('#debugtext').append('<br />' + text);
    $('#debugtext').attr({ scrollTop: $("#debugtext").attr("scrollHeight") });
}

/* INITIALIZE */

$(document).ready(function() {

    // CUFON
    /*
    Cufon.replace('h1', { fontFamily: 'Montserrat' });
    Cufon.replace('h2', { fontFamily: 'Montserrat' });
    Cufon.replace('h3', { fontFamily: 'Montserrat' });
    Cufon.replace('h4', { fontFamily: 'Montserrat' });
    Cufon.replace('h5', { fontFamily: 'Montserrat' });
    Cufon.replace('#navbox li', { fontFamily: 'Montserrat' });
    */

    // LOAD PROJECTS JSON
    $.ajax({
        url: projectJSON,
        async: false,
        dataType: 'json',
        success: function(data) {
            projects = data;
        }
    });

    // CREATE PORTFOLIO MENU
    var item = null;
    var m_menu_item = $('#m_menu_item').html();
    var m_dropdown_item = $('#m_dropdown_item').html();
    // Urban Design Menu
    for (var i = 0; i < projects.items.length; i++) {
        item = projects.items[i];
        if (item.type == 'urbandesign' && item.status == 'portfolio') {
            $('#menu-cpln div.scroller').append(Mustache.render(m_menu_item, item));
            $('#drop-cpln').append(Mustache.render(m_dropdown_item, item));
        }
    }
    // Architecture Menu
    for (var i = 0; i < projects.items.length; i++) {
        item = projects.items[i];
        if (item.type == 'architecture' && item.status == 'portfolio') {
            $('#menu-arch div.scroller').append(Mustache.render(m_menu_item, item));
            $('#drop-arch').append(Mustache.render(m_dropdown_item, item));
        }
    }
    // Other (Web & Print)
    for (var i = 0; i < projects.items.length; i++) {
        item = projects.items[i];
        if (item.type == 'other' && item.status == 'portfolio') {
            $('#menu-misc div.scroller').append(Mustache.render(m_menu_item, item));
            $('#drop-misc').append(Mustache.render(m_dropdown_item, item));
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
            $('#d-contact:visible').fadeOut(200);
            $('#n-contact span.active').removeClass('active');
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
            window.location.hash = 'portfolio';
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
            $('#d-contact:visible').fadeOut(200);
            $('#n-contact span.active').removeClass('active');
            // Open Resume
            $('#d-resume:hidden').fadeIn(300, function(){
                document.title = 'Resume - ' + site_title;
                window.location.hash = 'resume';
            });
            $('#n-resume span').addClass('active');
        }
    );

    // Projects
    $('#n-projects').click(
        function() {
            // Close all other tabs if open
            $('#d-portfolio:visible').fadeOut(200);
            $('#n-portfolio span.active').removeClass('active');
            $('#d-resume:visible').fadeOut(200);
            $('#n-resume span.active').removeClass('active');
            $('#d-contact:visible').fadeOut(200);
            $('#n-contact span.active').removeClass('active');
            // Open Projects
            $('#d-projects:hidden').fadeIn(300, function(){
                document.title = 'Current Projects - ' + site_title;
                window.location.hash = 'projects';
            });
            $('#n-projects span').addClass('active');
        }
    );

    // Contact
    $('#n-contact').click(
        function() {
            // Close all other tabs if open
            $('#d-portfolio:visible').fadeOut(200);
            $('#n-portfolio span.active').removeClass('active');
            $('#d-resume:visible').fadeOut(200);
            $('#n-resume span.active').removeClass('active');
            $('#d-projects:visible').fadeOut(200);
            $('#n-projects span.active').removeClass('active');
            // Open Contact
            $('#d-contact:hidden').fadeIn(300, function(){
                document.title = 'Contact - ' + site_title;
                window.location.hash = 'contact';
            });
            $('#n-contact span').addClass('active');
        }
    );

    // Portfolio - Menu navigation
    $('div.menu-leftarrow').click(function(){
        // not the most elegant way of stopping overscrolling, but it works, and what are the odds
        // someone is looking at this?!
        scroller = $(this).parent().find('.scroller');
        scrollItemsLeftPos = $(scroller).offset().left + 90;
        scrollBoxLeftPos = $(this).offset().left;
        if (scrollItemsLeftPos <= scrollBoxLeftPos) {
            $(this).parent().find('.scroller').filter(':not(:animated)').animate({'marginLeft': '+=290px'}, 200, function(){
                menuArrows($(this).parent());
            });
        }
    });
    $('div.menu-rightarrow').click(function(){
        scroller = $(this).parent().find('.scroller');
        scrollItemsRightPos = $(scroller).find('img:last').offset().left + $(scroller).find('img:last').width();
        scrollBoxRightPos = $(this).offset().left + $(this).width();
        if (scrollItemsRightPos >= scrollBoxRightPos) {
            $(this).parent().find('.scroller').filter(':not(:animated)').animate({'marginLeft': '-=290px'}, 200, function(){
                menuArrows($(this).parent());
            });
        }
    });
    
    // Portfolio - Menu - Open project
    $('div.menu-row a').click(function(event){
        event.preventDefault();
        // change location
        var path = $(this).attr('href');
        var projectID = path.replace(/portfolio\/portfolio.html#/,'');
        window.location.hash = 'portfolio/'+projectID;
        // loadProject(projectID);
    });

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
    $('#port-dropbutton').click(function(){
        $('#port-dropdown:hidden').slideDown(300);
    });
    // Portfolio - Dropdown - View project
    $('#port-dropdown ul ul li').click(function(event){
        // stop link from firing
        event.preventDefault();
        // reset dropdown menu
        $('#port-dropdown:visible').fadeOut(200);
        $('#port-dropbutton').animate({opacity: 0.5}, 200);
        // load project
        var path = $(this).find('a').attr('href');
        var projectID = path.replace(/portfolio\/portfolio.html#/,'');
        window.location.hash = 'portfolio/'+projectID;
        // loadProject(projectID);
    });
    // Portfolio - Dropdown - Return to menu
    $('#port-dropback').click(function(event){
        event.preventDefault();
        $('#port-dropdown').hide();
        backToMenu();
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

    // Portfolio - Project navigation
    // var projectWidth = 650;
    var projectWidth;
    $('.port-leftarrow img').live('click', function(){
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
    $('.port-rightarrow img').live('click', function(){
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
    $('#port-images').live('mouseover', function() {
        $('.port-leftarrow img').stop(true, true).fadeIn(200);  
        $('.port-rightarrow img').stop(true, true).fadeIn(200);
    });
    $('#port-images').live('mouseout', function() {
        $('.port-leftarrow img').delay(150).fadeOut(200);
        $('.port-rightarrow img').delay(150).fadeOut(200);
    });

    // Portfolio - Project - Image captions
    $('#port-images .scroller img').live('mouseenter', function (){
        $(this).next('div').stop(true, true).fadeIn(200);
    });
    $('#port-images .scroller img').live('mouseleave', function (){
        $(this).next('div').delay(150).fadeOut(200);
    });
    
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

    // Initialize portfolio menu arrows
    menuArrows();

    $(window).resize(function() {
        if ($('#port-menu').is(':visible')) {
            menuArrows();
        }
    });

    
});