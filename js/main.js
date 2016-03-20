$(document).ready(function() {
  var projectProperties = {
    'interactive-data-publics': {
      'numOfImages': 15,
      'title': 'Interactive Data Publics',
      'desc': 'My thesis project recombines existing lifestyle and demographic data of Cleveland’s neighborhoods in order to image the potential for latent and vital collectives to emerge through architectural interventions. Information generated through this data mapping is a powerful way to define new publics and suitable spots for connecting and activating challenging points in the city, that face urban issues of diversity, population decline, and high crime rate. The interventions are designed to be flexible, mobile, and contradicting to generate a broad range of responses from the city collectives. The interventions are evocative and iconic objects, taking on the literal form of data patterns, and maintaining a loop connection between the initial data and its open-end translation. They are designed with programs that support and also refute the interpretation of existing data.'
    },
    'professional-projects': {
      'numOfImages': 13,
      'title': 'Professional Projects',
      'desc': 'This is the collection of projects I worked on during my Architectural practice in Indonesia. The projects are mostly located in Indonesia and feature the trends of Asian property development, which come in the types of mixed-use, commercial, residential high-rise, superblock, and hospitality design.'
    },
    'redo-glass-house': {
      'numOfImages': 13,
      'title': 'Redo Glass House',
      'desc': 'Building up my deep interest in the “Layering of Views” in the precedent Glass House by Philip Johnson through my series of analysis of the house, this project is a total adoption of and a new design built upon the past. My analysis of light and layering of views in the Glass House was being taken further into designing a new architecture that incorporates both the ideas of light, reflection and transparencies of glass to create a layering of spaces. This project has an objective to rearrange previous conceptions in the service of originating new ones.'
    },
    'the-road-to-sustainable-world-jakarta': {
      'numOfImages': 31,
      'title': 'The Road to Sustainable World - Jakarta',
      'desc': 'New Road is a fictional non-profit organization that I established, with a focus to work on policy-making project that is designed to improve existing transportation systems to achieve sustainability goals, which include reducing transportation impacts on energy use and greenhouse gas emissions. Jakarta was selected as the initial site to start develop a method of solution for a balanced transportation system, with consideration of its complex transportation problems. You can view & download the booklet with the detailed strategies on https://goo.gl/PeJDWY or drop me an email. Note that this project was based on cases and conditions in 2014.'
    },
    'activate-the-fringes': {
      'numOfImages': 15,
      'title': 'Activate the Fringes',
      'desc': 'My team of three was selected to represent the University of Michigan in the 2014 Vertical Cities Asia Competition that was held in Singapore (published on http://verticalcitiesasia.com/?q=archive/2014). The competition site was located in Mumbai, India, in which the challenge was to deal with the issues of urban connectivity. During our visit to Mumbai, we identified critical problems such as limited space and access to resources, informal settlement, and were interested in how culture plays a big role in the local society. We started from small-scale strategy through designing housing for 100,000 people on the site, then progressed to larger-scale strategies, which are to connect to fishing as the major economies and water transport, connect through flexible housing, and connect through water conservation.'
    },
    'nexus': {
      'numOfImages': 11,
      'title': 'Nexus',
      'desc': 'Situated between major urban spaces, the NEXUS acts as a link between Chicago and Toronto, New Center and Detroit and within the site.  It utilizes the transit hub as the center and nexus between the regions as a catalyst and stem for people to connect with each other. The NEXUS is designed for pedestrian friendly walkways and transportation centers for commuters, residents and visitors. Reacting to the existing site conditions, the NEXUS creates a flow within the block for pedestrians and cyclists.  Through a meandering central axis, the architecture curves to suggest a flow around the site and the spaces in and around buildings.  The street side is perforated with entrances that welcome pedestrians into the spaces within.'
    },
    'event-balloon': {
      'numOfImages': 13,
      'title': 'Event Balloon',
      'desc': 'This project asked to design a museum on an existing parking lot site in the Pittsburgh Strip District. The idea is about archiving as much types of events (objects, performances, and moment) as possible. In order to achieve this objective, the building design used the concept of inflatability of a balloon, in which different programs can be loaded into and taken out from the building. The plans, sections, and the massing studies focused on the initial partis, which are characterized with diagonal grains on the plan to utilize the corner condition of the site and a stack of undulating surfaces in the section which are connected together and create a variation of voids that can hold changing programs.'
    }
  };

  var SHOWCASE_FADE_TIMEOUT = 500,
      SHOWCASE_DEFAULT_IMAGE_IDX = 1,
      DATA_KEY_PROJECT_ID = 'data-ri-projectId',
      DATA_KEY_NUM_OF_IMGS = 'data-ri-numOfImages',
      DATA_KEY_CURR_IMG_IDX = 'data-ri-currentImageIndex';

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
        default: break;
      }
    }
  });

  $('#showcase-next, #showcase-image').on('click', function(event) {
    // Stop the click event from getting bubbled up
    event.stopPropagation();

    // Get attributes from #showcase
    var projectId = $('#showcase').attr(DATA_KEY_PROJECT_ID),
        numOfImages = $('#showcase').attr(DATA_KEY_NUM_OF_IMGS),
        currentImageIndex = $('#showcase').attr(DATA_KEY_CURR_IMG_IDX);

    // Change the image if necessary
    currentImageIndex++;
    if (currentImageIndex <= numOfImages) {
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
    var projectId = $('#showcase').attr(DATA_KEY_PROJECT_ID),
        numOfImages = $('#showcase').attr(DATA_KEY_NUM_OF_IMGS),
        currentImageIndex = $('#showcase').attr(DATA_KEY_CURR_IMG_IDX);

    // Change the image if necessary
    currentImageIndex--;
    if (currentImageIndex >= 1) {
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

$('.filter-button').on('click', function() {
  // Remove class "active" from all .filter-button
  $('.filter-button').filter(function() {
    return $(this).hasClass('active')
  }).removeClass('active');

  // Add class "active" to $(this)
  $(this).addClass('active');

  // Show all hidden .project-trait
  $('.project-trait').show();

  // Get chosen category.
  var category = $(this).attr('data-ri-category');

  // Filter irrelevant .project-trait
  if (category !== 'all') {
    $('.project-trait')
      .filter(function() {
        return !$(this).hasClass(category)
      })
      .hide();
  };
});
