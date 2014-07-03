$(document).ready(function() {
  var projectProperties = {
    'occupy-a-pool': {
      'numOfImages': 3,
      'title': 'Occupy A Pool',
      'desc': '<strong>This project is about re-programming an interior test site that is paired with a modeling technique</strong> focusing the design efforts through a particular approach to material and spatial concerns, leaving room for individual translation and invention. The site is an olympic pool and the space is re-programmed to accommodate performances. The pool is flipped vertically and floating above the emptied original pool, which now functions as a performance space. The wall of the new pool is made of <strong>a cast of rockite</strong> and the water is represented by <strong>casted soap</strong> which allows light to penetrate through.'
    },
    'pcp-mall-extension': {
      'numOfImages': 9,
      'title': 'PCP Mall Extension',
      'desc': 'In this project, we designed an addition to an existing shopping mall in the city of Palembang, Indonesia. The addition is much larger than the existing mall and accommodates high-class entertainment center. The design adopts the “Super-Block” concept and Green design with a wide variety of programs and green parks on each level. The challenge of the design is to keep the existing sport center at the center of the shopping mall visible and exposed to the street, but can still utilize as much land as possible for commercial development.'
    },
    'nexus': {
      'numOfImages': 11,
      'title': 'Nexus',
      'desc': 'Situated between major urban spaces, the NEXUS acts as a link between Chicago and Toronto, New Center and Detroit and within the site.  It utilizes the transit hub as the center and nexus between the regions as a catalyst and stem for people to connect with each other.<br />The NEXUS is designed for pedestrian friendly walkways and transportation centers for commuters, residents and visitors. Reacting to the existing site conditions, the NEXUS creates a flow within the block for pedestrians and cyclists.  Through a meandering central axis, the architecture curves to suggest a flow around the site and the spaces in and around buildings.  The street side is perforated with entrances that welcome pedestrians into the spaces within.'
    },
    'parahyangan-residences': {
      'numOfImages': 4,
      'title': 'Parahyangan Residences',
      'desc': 'In this project, I designed an apartment together with my team intended mainly for, but not restricted to students. Strategically located near two known public institutions/universities, the apartment is designed to be simple and modern. It has two towers and features vast natural and man-made green environments to promote its function as a living and study space for a diverse range of students. The front tower is more exclusive and upclass. Facilities include infinite and lagoon pools, with pool side cafe and cafetaria facing the valley at the back of the structures, gym, courts, and shops to accommodate the needs of its users.<br /><br />(published on www.parahyanganresidences.com)'
    },
    'redo-glass-house': {
      'numOfImages': 4,
      'title': 'Redo Glass House',
      'desc': 'Building up my deep interest in the “Layering of Views” in the precedent Glass House by Philip Johnson through my series of analysis of the house, this project is a total adoption of and a new design built upon the past.<br />My analysis of light and layering of views in the Glass House was being taken further into designing a new architecture that incorporates both the ideas of light, reflection and transparencies of glass to create a layering of spaces.<br />This project has an objective to rearrange previous conceptions in the service of originating new ones.'
    },
    'event-balloon': {
      'numOfImages': 13,
      'title': 'Event Balloon',
      'desc': 'This project asked to design a museum on an existing parking lot site in the Pittsburgh Strip District. The idea is about archiving as much types of events (objects, performances, and moment) as possible. In order to achieve this objective, the building design used the concept of inflatability of a balloon, in which different programs can be loaded into and taken out from the building. The plans, sections, and the massing studies focused on the initial partis, which are characterized with diagonal grains on the plan to utilize the corner condition of the site and a stack of undulating surfaces in the section which are connected together and create a variation of voids that can hold changing programs.'
    }
  };

  var SHOWCASE_FADE_TIMEOUT = 500
    , SHOWCASE_DEFAULT_IMAGE_IDX = 1
    , DATA_KEY_PROJECT_ID = 'data-ri-projectId'
    , DATA_KEY_NUM_OF_IMGS = 'data-ri-numOfImages'
    , DATA_KEY_CURR_IMG_IDX = 'data-ri-currentImageIndex';

  var showcaseClose = function() {
    $('#showcase').fadeOut(SHOWCASE_FADE_TIMEOUT);
    $('body').removeClass('modal-open');
  };

  var showcaseChangeImage = function(projectId, imageNum) {
    if (!projectId) {
      console.log('Empty projectId was passed while changing a showcase image');
    }

    if (!imageNum || imageNum < 1) {
      console.log('Empty or illegal [imageNum: ' + imageNum + '] was passed while changing a showcase image');
    }

    var imagePath = './img/architecture/' + projectId + '/' + imageNum + '.jpg';
    $('#showcase-image').attr('src', imagePath);

    // Update the metadata
    $('#showcase').attr(DATA_KEY_CURR_IMG_IDX, imageNum);
  };

  $('.project-trait').on('click', function() {
    // Getting the project name from .project-trait's attribute
    var projectId = $(this).attr(DATA_KEY_PROJECT_ID);
    if (!projectId) {
      console.log('Empty projectId was passed while opening a showcase');
    }

    // Getting the project property from a 'map' of properties
    var projectProperty = projectProperties[projectId];
    if (!projectProperty) {
      console.log('No projectProperty found for projectId: ' + projectId);
    }

    // Setting values inside showcase
    $('#showcase-title').text(projectProperty.title);
    $('#showcase-desc').text(projectProperty.desc);
    $('#showcase').attr(DATA_KEY_PROJECT_ID, projectId);
    $('#showcase').attr(DATA_KEY_NUM_OF_IMGS, projectProperty.numOfImages);

    // By default open the first image of the project
    $('#showcase').attr(DATA_KEY_CURR_IMG_IDX, SHOWCASE_DEFAULT_IMAGE_IDX);
    showcaseChangeImage(projectId, SHOWCASE_DEFAULT_IMAGE_IDX);

    // Disable scrolling and show showcase
    $('body').addClass('modal-open');
    $('#showcase').fadeIn(SHOWCASE_FADE_TIMEOUT);
  });

  $('#showcase').on('click', showcaseClose);

  // Keyboard shortcut to navigate popup
  $(document).keyup(function(event) {
    if ($('#showcase').is(":visible")) {
      switch (event.keyCode) {
        case 13: // Enter
          $('#showcase-next').click();
          break;
        case 27: // Esc
          showcaseClose();
          break;
        case 37: // Left Arrow
          $('#showcase-prev').click();
          break;
        case 39: // Right Arrow
          $('#showcase-next').click();
          break;
      }
    }
  });

  $('#showcase-next, #showcase-image').on('click', function(event) {
    // Stop the click event from getting bubbled up
    event.stopPropagation();

    // Get attributes from #showcase
    var projectId = $('#showcase').attr(DATA_KEY_PROJECT_ID)
      , numOfImages = $('#showcase').attr(DATA_KEY_NUM_OF_IMGS)
      , currentImageIndex = $('#showcase').attr(DATA_KEY_CURR_IMG_IDX);

    // Change the image if necessary
    if (++currentImageIndex <= numOfImages) {
      showcaseChangeImage(projectId, currentImageIndex);
    } else {
      // Rollover? Get the first image
      showcaseChangeImage(projectId, SHOWCASE_DEFAULT_IMAGE_IDX);
    }
  });

  $('#showcase-prev').on('click', function(event) {
    // Stop the click event from getting bubbled up
    event.stopPropagation();

    // Get attributes from #showcase
    var projectId = $('#showcase').attr(DATA_KEY_PROJECT_ID)
      , numOfImages = $('#showcase').attr(DATA_KEY_NUM_OF_IMGS)
      , currentImageIndex = $('#showcase').attr(DATA_KEY_CURR_IMG_IDX);

    // Change the image if necessary
    if (--currentImageIndex >= 1) {
      showcaseChangeImage(projectId, currentImageIndex);
    } else {
      // Rollover? Get the last image
      showcaseChangeImage(projectId, numOfImages);
    }
  });

  $('a[href*=#]:not([href=#])').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});