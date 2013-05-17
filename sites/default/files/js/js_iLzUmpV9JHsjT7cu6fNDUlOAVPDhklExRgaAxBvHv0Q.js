Drupal.locale = { 'pluralFormula': function ($n) { return Number(($n!=1)); }, 'strings': {"":{"An AJAX HTTP error occurred.":"Der opstod en AJAX HTTP-fejl.","HTTP Result Code: !status":"HTTP resultatkode: !status","An AJAX HTTP request terminated abnormally.":"En AJAX HTTP-foresp\u00f8rgsel afsluttede p\u00e5 unormal vis.","Debugging information follows.":"Information til fejls\u00f8gning f\u00f8lger.","Path: !uri":"Sti: !uri","StatusText: !statusText":"StatusText: !statusText","ResponseText: !responseText":"ResponseText: !responseText","ReadyState: !readyState":"ReadyState: !readyState","@title dialog":"@title dialog","Configure":"Konfigur\u00e9r","Show shortcuts":"Vis genveke","Hide shortcuts":"Gem genveje","Loading":"Indl\u00e6ser","(active tab)":"(aktiv fane)","Fullscreen":"Fuldsk\u00e6rm","Please wait...":"Vent venligst\u2026","Hide":"Skjul","Show":"Vis","Select all rows in this table":"V\u00e6lg alle r\u00e6kker i tabellen","Deselect all rows in this table":"Frav\u00e6lg alle r\u00e6kker i tabellen","Not restricted":"Ikke begr\u00e6nset","Restricted to certain pages":"Begr\u00e6nset til bestemte sider","Not customizable":"Kan ikke tilpasses","The changes to these blocks will not be saved until the \u003Cem\u003ESave blocks\u003C\/em\u003E button is clicked.":"\u00c6ndringerne bliver ikke gemt f\u00f8r du trykker p\u00e5 knappen \u003Cem\u003EGem blokke\u003C\/em\u003E.","The block cannot be placed in this region.":"Blokken kan ikke placeres i denne region.","Re-order rows by numerical weight instead of dragging.":"Sort\u00e9r r\u00e6kker med numeriske v\u00e6gte i stedet for at tr\u00e6kke dem.","Show row weights":"Vis r\u00e6kkev\u00e6gte","Hide row weights":"Skjul r\u00e6kkev\u00e6gte","Drag to re-order":"Tr\u00e6k for at (om)sortere","Changes made in this table will not be saved until the form is submitted.":"\u00c6ndringer i tabellen bliver ikke gemt, f\u00f8r du indsender formularen.","Edit":"Redig\u00e9r","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"Den valgte fil %filename kan ikke uploades. Kun filer med f\u00f8lgende filendelser er tilladt: %extensions.","Autocomplete popup":"Autocomplete popup","Searching for matches...":"S\u00f8ger efter resultater...","New revision":"Ny version","No revision":"Ingen version","By @name on @date":"Af @name, @date","By @name":"Af @name","Not published":"Ikke udgivet","Alias: @alias":"Alias: @alias","No alias":"Intet alias","@number comments per page":"@number kommentarer pr. side","Remove group":"Fjern gruppe","Apply (all displays)":"Anvend (alle displays)","Revert to default":"Gendan til standard","Apply (this display)":"Anvend (dette display)","Customize dashboard":"Tilpas dashboard","Done":"F\u00e6rdig","There is nothing in your media library. Select the Upload tab above to add a file.":"Dit medie-bibliotek er tomt. V\u00e6lg upload-fanen ovenfor for at tilf\u00f8je en fil.","Loading...":"Indl\u00e6ser...","Error getting media.":"Fejl ved hentning af media.","Submit":"Indsend","Cancel":"Annull\u00e9r","Cannot continue, nothing selected":"Kan ikke forts\u00e6tte, intet valgt","This permission is inherited from the authenticated user role.":"Denne tilladelse er arvet fra den godkendte brugerrolle.","Insert this token into your form":"Inds\u00e6t dette token i din formular","First click a text field to insert your tokens into.":"Klik p\u00e5 et tekstfelt som tokens skal s\u00e6ttes ind i.","Requires a title":"Kr\u00e6ver en titel","Don\u0027t display post information":"Vis ikke information om indl\u00e6gget","OK":"O.k.","Not in menu":"Ikke i menu","closed":"lukket","Disabled":"Deaktiveret","Enabled":"Aktiveret","none":"ingen","Save":"Gem","If you switch views, you will lose your selection.":"Hvis du skifter views mister du dine valg.","all":"alle","Select":"V\u00e6lg","Delete instance":"Slet instans"}} };;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
/**
 * @file
 * Script file for the periodical reservations.
 */
(function ($) {
  Drupal.extractPeriodicalId = function(ele) {
    classname = $(ele).attr('id');
    id = classname.match(/periodical-id-(.+)/);

    if (id != null) {
      return id[1];
    }
    else {
      return false;
    }
  }

  trigger_periodical_reservation = function(ajax, response, status) {
    var entity_id = response.data.replace(' ', '%20');
    var forms = $('form');
    var regex = new RegExp(entity_id, 'g');
    // Loop through all forms on a page, deeper filtering comes next.
    forms.each(function() {
      form = $(this);
      // Wee seek for reservations forms, thus specific form whose item was clicked.
      if (form.attr('id').match(/ding-reservation-reserve-form/g) && form.attr('action').match(regex)) {
        form.hide();
        // Make sure we don't miss the form.
        setTimeout(function() {
          // Call mousedown(), since click() event is forbidden by #ajax['prevent'].
          form.find('.form-submit').mousedown();
        }, 500);
      }
    });
  }

  Drupal.behaviors.ding_periodical_reservation = {
    attach: function (context, settings) {
      Drupal.ajax.prototype.commands.trigger_periodical_reservation = trigger_periodical_reservation;
      $('.ding-reservable-periodical', context).once('ding-reservable-periodical', function() {
        var id = Drupal.extractPeriodicalId($(this));
        if (id) {
          var element_settings = {};
          element_settings.url = '/ding_periodical_reservation/reserve/' + id;
          element_settings.event = 'click';
          element_settings.progress = { type: 'throbber' };
          base = $(this).attr('id');

          Drupal.ajax[base] = new Drupal.ajax(base, $(this).parent().find('.periodical-reserve button'), element_settings);
        }
      });
    }
  }
}(jQuery));
;

(function ($) {
  Drupal.Panels = {};

  Drupal.Panels.autoAttach = function() {
    if ($.browser.msie) {
      // If IE, attach a hover event so we can see our admin links.
      $("div.panel-pane").hover(
        function() {
          $('div.panel-hide', this).addClass("panel-hide-hover"); return true;
        },
        function() {
          $('div.panel-hide', this).removeClass("panel-hide-hover"); return true;
        }
      );
      $("div.admin-links").hover(
        function() {
          $(this).addClass("admin-links-hover"); return true;
        },
        function(){
          $(this).removeClass("admin-links-hover"); return true;
        }
      );
    }
  };

  $(Drupal.Panels.autoAttach);
})(jQuery);
;
/**
 * @file
 *
 * Provide event nodes/pages with ticket info from Place2book
 */
jQuery(document).ready(function($) {
	$('.place2book-ticketinfo').each(function() { 
	    var obj = this;
		$.getJSON(Drupal.settings.basePath + 'ding/place2book/ticketinfo/' + this.value, function(data) {
		  $(obj).replaceWith(data['markup']);
		});		
    });
});;
(function($) {
  "use strict";

  // Helper function to get information about a given cover place holder.
  var ting_covers_extract_data = function(e) {
    var classname = $(e).attr('class');
    var local_id = classname.match(/ting-cover-object-id-(\S+)/);
    var image_style = classname.match(/ting-cover-style-(\S+)/);
    var owner_id = classname.match(/ting-cover-owner-id-(\S+)/);
    if (!local_id) {
      return false;
    }
    return {
      local_id : local_id[1],
      owner_id : owner_id[1],
      image_style : image_style[1]
    };
  };

  var ting_cover_insert = function(covers) {
    $.each(covers, function(index, cover_info) {
      $('.ting-cover-processing' + '.ting-cover-object-id-' + cover_info.local_id + '.ting-cover-style-' + cover_info.image_style).html('<img src="' + cover_info.url + '"/>');
    });
  };

  Drupal.behaviors.tingCovers = {
    attach: function(context) {
      // Assemble information regarding covers.
      var cover_data = [];

      // Extract cover information from the dom.
      $('.ting-cover:not(.ting-cover-processing, .ting-cover-processed)', context).each(function(index, element) {
        cover_data.push(ting_covers_extract_data(element));
      }).addClass('ting-cover-processing');

      if (cover_data.length > 0) {
        //Retrieve covers
        var request = $.ajax({
          url: Drupal.settings.basePath + 'ting/covers',
          type: 'POST',
          data: {
            coverData: cover_data
          },
          dataType: 'json',
          success: ting_cover_insert,
          // Update processing state.
          complete: function(request, status) {
            var processing = $('.ting-cover-processing', context);
            if (status === 'success') {
              processing.addClass('ting-cover-processed');
            }
            processing.removeClass('ting-cover-processing');
          }
        });

        // Associate the request with the context so we can abort the request if
        // the context is detached removed before completion.
        $(context).data('request', request);
      }
    },
    detach: function(context) {
      // If we have a request associated with the context then abort it.
      var request = $(context).data('request');
      if (request) {
        request.abort();
      }
    }
  };
}(jQuery));
;
(function ($) {

/**
 * Attaches sticky table headers.
 */
Drupal.behaviors.tableHeader = {
  attach: function (context, settings) {
    if (!$.support.positionFixed) {
      return;
    }

    $('table.sticky-enabled', context).once('tableheader', function () {
      $(this).data("drupal-tableheader", new Drupal.tableHeader(this));
    });
  }
};

/**
 * Constructor for the tableHeader object. Provides sticky table headers.
 *
 * @param table
 *   DOM object for the table to add a sticky header to.
 */
Drupal.tableHeader = function (table) {
  var self = this;

  this.originalTable = $(table);
  this.originalHeader = $(table).children('thead');
  this.originalHeaderCells = this.originalHeader.find('> tr > th');
  this.displayWeight = null;

  // React to columns change to avoid making checks in the scroll callback.
  this.originalTable.bind('columnschange', function (e, display) {
    // This will force header size to be calculated on scroll.
    self.widthCalculated = (self.displayWeight !== null && self.displayWeight === display);
    self.displayWeight = display;
  });

  // Clone the table header so it inherits original jQuery properties. Hide
  // the table to avoid a flash of the header clone upon page load.
  this.stickyTable = $('<table class="sticky-header"/>')
    .insertBefore(this.originalTable)
    .css({ position: 'fixed', top: '0px' });
  this.stickyHeader = this.originalHeader.clone(true)
    .hide()
    .appendTo(this.stickyTable);
  this.stickyHeaderCells = this.stickyHeader.find('> tr > th');

  this.originalTable.addClass('sticky-table');
  $(window)
    .bind('scroll.drupal-tableheader', $.proxy(this, 'eventhandlerRecalculateStickyHeader'))
    .bind('resize.drupal-tableheader', { calculateWidth: true }, $.proxy(this, 'eventhandlerRecalculateStickyHeader'))
    // Make sure the anchor being scrolled into view is not hidden beneath the
    // sticky table header. Adjust the scrollTop if it does.
    .bind('drupalDisplaceAnchor.drupal-tableheader', function () {
      window.scrollBy(0, -self.stickyTable.outerHeight());
    })
    // Make sure the element being focused is not hidden beneath the sticky
    // table header. Adjust the scrollTop if it does.
    .bind('drupalDisplaceFocus.drupal-tableheader', function (event) {
      if (self.stickyVisible && event.clientY < (self.stickyOffsetTop + self.stickyTable.outerHeight()) && event.$target.closest('sticky-header').length === 0) {
        window.scrollBy(0, -self.stickyTable.outerHeight());
      }
    })
    .triggerHandler('resize.drupal-tableheader');

  // We hid the header to avoid it showing up erroneously on page load;
  // we need to unhide it now so that it will show up when expected.
  this.stickyHeader.show();
};

/**
 * Event handler: recalculates position of the sticky table header.
 *
 * @param event
 *   Event being triggered.
 */
Drupal.tableHeader.prototype.eventhandlerRecalculateStickyHeader = function (event) {
  var self = this;
  var calculateWidth = event.data && event.data.calculateWidth;

  // Reset top position of sticky table headers to the current top offset.
  this.stickyOffsetTop = Drupal.settings.tableHeaderOffset ? eval(Drupal.settings.tableHeaderOffset + '()') : 0;
  this.stickyTable.css('top', this.stickyOffsetTop + 'px');

  // Save positioning data.
  var viewHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  if (calculateWidth || this.viewHeight !== viewHeight) {
    this.viewHeight = viewHeight;
    this.vPosition = this.originalTable.offset().top - 4 - this.stickyOffsetTop;
    this.hPosition = this.originalTable.offset().left;
    this.vLength = this.originalTable[0].clientHeight - 100;
    calculateWidth = true;
  }

  // Track horizontal positioning relative to the viewport and set visibility.
  var hScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
  var vOffset = (document.documentElement.scrollTop || document.body.scrollTop) - this.vPosition;
  this.stickyVisible = vOffset > 0 && vOffset < this.vLength;
  this.stickyTable.css({ left: (-hScroll + this.hPosition) + 'px', visibility: this.stickyVisible ? 'visible' : 'hidden' });

  // Only perform expensive calculations if the sticky header is actually
  // visible or when forced.
  if (this.stickyVisible && (calculateWidth || !this.widthCalculated)) {
    this.widthCalculated = true;
    var $that = null;
    var $stickyCell = null;
    var display = null;
    var cellWidth = null;
    // Resize header and its cell widths.
    // Only apply width to visible table cells. This prevents the header from
    // displaying incorrectly when the sticky header is no longer visible.
    for (var i = 0, il = this.originalHeaderCells.length; i < il; i += 1) {
      $that = $(this.originalHeaderCells[i]);
      $stickyCell = this.stickyHeaderCells.eq($that.index());
      display = $that.css('display');
      if (display !== 'none') {
        cellWidth = $that.css('width');
        // Exception for IE7.
        if (cellWidth === 'auto') {
          cellWidth = $that[0].clientWidth + 'px';
        }
        $stickyCell.css({'width': cellWidth, 'display': display});
      }
      else {
        $stickyCell.css('display', 'none');
      }
    }
    this.stickyTable.css('width', this.originalTable.css('width'));
  }
};

})(jQuery);
;
/**
 * @file ding.availability.js
 * JavaScript behaviours for fetching and displaying availability.
 */

(function($) {

  // Cache of fetched availability information.
  Drupal.DADB = {};

  Drupal.behaviors.dingAvailabilityAttach = {
    attach: function(context, settings) {
      var ids = [];
      var html_ids = [];

      // Extract entity ids and add them to the settings array.
      if (settings.hasOwnProperty('ding_availability')) {
        $.each(settings.ding_availability, function(id, entity_ids) {
          $.each(entity_ids, function(index, entity_id) {
            if (Drupal.DADB[entity_id] === undefined) {
              Drupal.DADB[entity_id] = null;
              ids.push(entity_id);
              html_ids.push(id);
            }
          });
        });
      }

      $.each(html_ids, function(index, id) {
        $('#' + id).addClass('pending');
      });

      // Fetch availability.
      if (ids.length > 0) {
        $.getJSON(settings.basePath + 'ding_availability/' + (settings.ding_availability_mode ? settings.ding_availability_mode: 'items') + '/' + ids.join(','), {}, update);
      }
      else {
        // Apply already fetched availability
        $.each(settings.ding_availability, function(id, entity_ids) {
          updateAvailability(id, entity_ids);
        });
      }

      function update(data, textData) {
        $.each(data, function(id, item) {
          // Update cache.
          Drupal.DADB[id] = item;
        });

        $.each(settings.ding_availability, function(id, entity_ids) {
          if (id.match(/^availability-/)) {
            // Update availability indicators.
            updateAvailability(id, entity_ids);
          }
          else {
            // Update holding information.
            updateHoldings(id, entity_ids);
          }
        });
      }

      function updateAvailability(id, entity_ids) {
        var available = false;
        var reservable = false;
        var is_internet = false;
        $.each(entity_ids, function(index, entity_id) {
          if (Drupal.DADB[entity_id]) {
            available = available || Drupal.DADB[entity_id]['available'];
            reservable = reservable || Drupal.DADB[entity_id]['reservable'];
            is_internet = is_internet || Drupal.DADB[entity_id]['is_internet'];
          }
        });

        var element = $('#' + id);
        element.removeClass('pending').addClass('processed');

        if (available) {
          element.addClass('available');
        }
        else {
          element.addClass('unavailable');
        }

        if (reservable) {
          element.addClass('reservable');
        }
        else {
          element.addClass('not-reservable');
        }

        if (available && reservable || is_internet) {
          element.attr('title', Drupal.t('available'));
          // If availability is an link extrend information.
          if (settings.ding_availability_link === 1) {
            $('a', element).append('<span class="availability-status">' + Drupal.t('available') + '<span>');
          }
        }
        else if (!available && reservable) {
          element.attr('title', Drupal.t('on loan'));
          // If availability is an link extrend information.
          if (settings.ding_availability_link === 1) {
            $('a', element).append('<span class="availability-status">' + Drupal.t('on loan') + '<span>');
          }        }
        else if (available && ! reservable) {
          element.attr('title', Drupal.t('not reservable'));
          // If availability is an link extrend information.
          if (settings.ding_availability_link === 1) {
            $('a', element).append('<span class="availability-status">' + Drupal.t('not reservable') + '<span>');
          }
        }
        else if (!available && ! reservable) {
          element.attr('title', Drupal.t('unavailable'));
          // If availability is an link extrend information.
          if (settings.ding_availability_link === 1) {
            $('a', element).append('<span class="availability-status">' + Drupal.t('unavailable') + '<span>');
          }
        }
      }

      function updateHoldings(id, entity_ids) {
        var entity_id = entity_ids.pop();
        if (Drupal.DADB[entity_id] && (Drupal.DADB[entity_id]['holdings'])) {
          // Show status for material.
          $('#' + id).append('<h2>' + Drupal.t('Holdings available on the shelf') + '</h2>');
          $('#' + id).append(Drupal.DADB[entity_id].html) ;
        }
      }
    }
  };
})(jQuery);
;

(function($) {

/**
 * Drupal FieldGroup object.
 */
Drupal.FieldGroup = Drupal.FieldGroup || {};
Drupal.FieldGroup.Effects = Drupal.FieldGroup.Effects || {};
Drupal.FieldGroup.groupWithfocus = null;

Drupal.FieldGroup.setGroupWithfocus = function(element) {
  element.css({display: 'block'});
  Drupal.FieldGroup.groupWithfocus = element;
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processFieldset = {
  execute: function (context, settings, type) {
    if (type == 'form') {
      // Add required fields mark to any fieldsets containing required fields
      $('fieldset.fieldset', context).once('fieldgroup-effects', function(i) {
        if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
          $('legend span.fieldset-legend', $(this)).eq(0).append(' ').append($('.form-required').eq(0).clone());
        }
        if ($('.error', $(this)).length) {
          $('legend span.fieldset-legend', $(this)).eq(0).addClass('error');
          Drupal.FieldGroup.setGroupWithfocus($(this));
        }
      });
    }
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processAccordion = {
  execute: function (context, settings, type) {
    $('div.field-group-accordion-wrapper', context).once('fieldgroup-effects', function () {
      var wrapper = $(this);

      wrapper.accordion({
        autoHeight: false,
        active: '.field-group-accordion-active',
        collapsible: true,
        changestart: function(event, ui) {
          if ($(this).hasClass('effect-none')) {
            ui.options.animated = false;
          }
          else {
            ui.options.animated = 'slide';
          }
        }
      });

      if (type == 'form') {
        // Add required fields mark to any element containing required fields
        wrapper.find('div.accordion-item').each(function(i){
          if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
            $('h3.ui-accordion-header').eq(i).append(' ').append($('.form-required').eq(0).clone());
          }
          if ($('.error', $(this)).length) {
            $('h3.ui-accordion-header').eq(i).addClass('error');
            var activeOne = $(this).parent().accordion("activate" , i);
            $('.ui-accordion-content-active', activeOne).css({height: 'auto', width: 'auto', display: 'block'});
          }
        });
      }
    });
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processHtabs = {
  execute: function (context, settings, type) {
    if (type == 'form') {
      // Add required fields mark to any element containing required fields
      $('fieldset.horizontal-tabs-pane', context).once('fieldgroup-effects', function(i) {
        if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
          $(this).data('horizontalTab').link.find('strong:first').after($('.form-required').eq(0).clone()).after(' ');
        }
        if ($('.error', $(this)).length) {
          $(this).data('horizontalTab').link.parent().addClass('error');
          Drupal.FieldGroup.setGroupWithfocus($(this));
          $(this).data('horizontalTab').focus();
        }
      });
    }
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processTabs = {
  execute: function (context, settings, type) {
    if (type == 'form') {
      // Add required fields mark to any fieldsets containing required fields
      $('fieldset.vertical-tabs-pane', context).once('fieldgroup-effects', function(i) {
        if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
          $(this).data('verticalTab').link.find('strong:first').after($('.form-required').eq(0).clone()).after(' ');
        }
        if ($('.error', $(this)).length) {
          $(this).data('verticalTab').link.parent().addClass('error');
          Drupal.FieldGroup.setGroupWithfocus($(this));
          $(this).data('verticalTab').focus();
        }
      });
    }
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 *
 * TODO clean this up meaning check if this is really
 *      necessary.
 */
Drupal.FieldGroup.Effects.processDiv = {
  execute: function (context, settings, type) {

    $('div.collapsible', context).once('fieldgroup-effects', function() {
      var $wrapper = $(this);

      // Turn the legend into a clickable link, but retain span.field-group-format-toggler
      // for CSS positioning.

      var $toggler = $('span.field-group-format-toggler:first', $wrapper);
      var $link = $('<a class="field-group-format-title" href="#"></a>');
      $link.prepend($toggler.contents());

      // Add required field markers if needed
      if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
        $link.append(' ').append($('.form-required').eq(0).clone());
      }

      $link.appendTo($toggler);

      // .wrapInner() does not retain bound events.
      $link.click(function () {
        var wrapper = $wrapper.get(0);
        // Don't animate multiple times.
        if (!wrapper.animating) {
          wrapper.animating = true;
          var speed = $wrapper.hasClass('speed-fast') ? 300 : 1000;
          if ($wrapper.hasClass('effect-none') && $wrapper.hasClass('speed-none')) {
            $('> .field-group-format-wrapper', wrapper).toggle();
          }
          else if ($wrapper.hasClass('effect-blind')) {
            $('> .field-group-format-wrapper', wrapper).toggle('blind', {}, speed);
          }
          else {
            $('> .field-group-format-wrapper', wrapper).toggle(speed);
          }
          wrapper.animating = false;
        }
        $wrapper.toggleClass('collapsed');
        return false;
      });

    });
  }
};

/**
 * Behaviors.
 */
Drupal.behaviors.fieldGroup = {
  attach: function (context, settings) {
    if (settings.field_group == undefined) {
      return;
    }

    // Execute all of them.
    $.each(Drupal.FieldGroup.Effects, function (func) {
      // We check for a wrapper function in Drupal.field_group as
      // alternative for dynamic string function calls.
      var type = func.toLowerCase().replace("process", "");
      if (settings.field_group[type] != undefined && $.isFunction(this.execute)) {
        this.execute(context, settings, settings.field_group[type]);
      }
    });

    // Fixes css for fieldgroups under vertical tabs.
    $('.fieldset-wrapper .fieldset > legend').css({display: 'block'});
    $('.vertical-tabs fieldset.fieldset').addClass('default-fallback');

  }
};

})(jQuery);;
(function ($) {

/**
 * Retrieves the summary for the first element.
 */
$.fn.drupalGetSummary = function () {
  var callback = this.data('summaryCallback');
  return (this[0] && callback) ? $.trim(callback(this[0])) : '';
};

/**
 * Sets the summary for all matched elements.
 *
 * @param callback
 *   Either a function that will be called each time the summary is
 *   retrieved or a string (which is returned each time).
 */
$.fn.drupalSetSummary = function (callback) {
  var self = this;

  // To facilitate things, the callback should always be a function. If it's
  // not, we wrap it into an anonymous function which just returns the value.
  if (typeof callback != 'function') {
    var val = callback;
    callback = function () { return val; };
  }

  return this
    .data('summaryCallback', callback)
    // To prevent duplicate events, the handlers are first removed and then
    // (re-)added.
    .unbind('formUpdated.summary')
    .bind('formUpdated.summary', function () {
      self.trigger('summaryUpdated');
    })
    // The actual summaryUpdated handler doesn't fire when the callback is
    // changed, so we have to do this manually.
    .trigger('summaryUpdated');
};

/**
 * Sends a 'formUpdated' event each time a form element is modified.
 */
Drupal.behaviors.formUpdated = {
  attach: function (context) {
    // These events are namespaced so that we can remove them later.
    var events = 'change.formUpdated click.formUpdated blur.formUpdated keyup.formUpdated';
    $(context)
      // Since context could be an input element itself, it's added back to
      // the jQuery object and filtered again.
      .find(':input').andSelf().filter(':input')
      // To prevent duplicate events, the handlers are first removed and then
      // (re-)added.
      .unbind(events).bind(events, function () {
        $(this).trigger('formUpdated');
      });
  }
};

/**
 * Prepopulate form fields with information from the visitor cookie.
 */
Drupal.behaviors.fillUserInfoFromCookie = {
  attach: function (context, settings) {
    $('form.user-info-from-cookie').once('user-info-from-cookie', function () {
      var formContext = this;
      $.each(['name', 'mail', 'homepage'], function () {
        var $element = $('[name=' + this + ']', formContext);
        var cookie = $.cookie('Drupal.visitor.' + this);
        if ($element.length && cookie) {
          $element.val(cookie);
        }
      });
    });
  }
};

})(jQuery);
;
(function ($) {

/**
 * Toggle the visibility of a fieldset using smooth animations.
 */
Drupal.toggleFieldset = function (fieldset) {
  var $fieldset = $(fieldset);
  if ($fieldset.is('.collapsed')) {
    var $content = $('> .fieldset-wrapper', fieldset).hide();
    $fieldset
      .removeClass('collapsed')
      .trigger({ type: 'collapsed', value: false })
      .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));
    $content.slideDown({
      duration: 'fast',
      easing: 'linear',
      complete: function () {
        Drupal.collapseScrollIntoView(fieldset);
        fieldset.animating = false;
      },
      step: function () {
        // Scroll the fieldset into view.
        Drupal.collapseScrollIntoView(fieldset);
      }
    });
  }
  else {
    $fieldset.trigger({ type: 'collapsed', value: true });
    $('> .fieldset-wrapper', fieldset).slideUp('fast', function () {
      $fieldset
        .addClass('collapsed')
        .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));
      fieldset.animating = false;
    });
  }
};

/**
 * Scroll a given fieldset into view as much as possible.
 */
Drupal.collapseScrollIntoView = function (node) {
  var h = document.documentElement.clientHeight || document.body.clientHeight || 0;
  var offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
  var posY = $(node).offset().top;
  var fudge = 55;
  if (posY + node.offsetHeight + fudge > h + offset) {
    if (node.offsetHeight > h) {
      window.scrollTo(0, posY);
    }
    else {
      window.scrollTo(0, posY + node.offsetHeight - h + fudge);
    }
  }
};

Drupal.behaviors.collapse = {
  attach: function (context, settings) {
    $('fieldset.collapsible', context).once('collapse', function () {
      var $fieldset = $(this);
      // Expand fieldset if there are errors inside, or if it contains an
      // element that is targeted by the uri fragment identifier. 
      var anchor = location.hash && location.hash != '#' ? ', ' + location.hash : '';
      if ($('.error' + anchor, $fieldset).length) {
        $fieldset.removeClass('collapsed');
      }

      var summary = $('<span class="summary"></span>');
      $fieldset.
        bind('summaryUpdated', function () {
          var text = $.trim($fieldset.drupalGetSummary());
          summary.html(text ? ' (' + text + ')' : '');
        })
        .trigger('summaryUpdated');

      // Turn the legend into a clickable link, but retain span.fieldset-legend
      // for CSS positioning.
      var $legend = $('> legend .fieldset-legend', this);

      $('<span class="fieldset-legend-prefix element-invisible"></span>')
        .append($fieldset.hasClass('collapsed') ? Drupal.t('Show') : Drupal.t('Hide'))
        .prependTo($legend)
        .after(' ');

      // .wrapInner() does not retain bound events.
      var $link = $('<a class="fieldset-title" href="#"></a>')
        .prepend($legend.contents())
        .appendTo($legend)
        .click(function () {
          var fieldset = $fieldset.get(0);
          // Don't animate multiple times.
          if (!fieldset.animating) {
            fieldset.animating = true;
            Drupal.toggleFieldset(fieldset);
          }
          return false;
        });

      $legend.append(summary);
    });
  }
};

})(jQuery);
;
(function($) {
  Drupal.behaviors.tingSearchAutocomplete = {
    attach: function(context) {

      $('#edit-search-block-form--2').autocomplete({
        minLength: 3,
        source: function(request, response) {
          $.getJSON(Drupal.settings.basePath + 'ting/autocomplete', {
            query: request.term
          }, response);
        },
        search: function(event, ui) {
          // When a search is beginning, show the spinner
          $('#edit-search-block-form--2').parent().addClass('spinner');
          $('#edit-search-block-form--2').addClass('spinner');
        },
        open: function(event, ui) {
          // When a search is done, use this, to hide the spinner.
          $('#edit-search-block-form--2').parent().removeClass('spinner');
          $('#edit-search-block-form--2').removeClass('spinner');
        },
        select: function(event, ui) {
          // Add the chosen value to the searchbox and submit.
          if (ui.item) {
            $('#edit-search-block-form--2').val(ui.item.value);
            $('#search-block-form').submit();
          }
        }
      });
    }
  };
} (jQuery));

;
/**
 * equalize.js
 * Author & copyright (c) 2012: Tim Svensen
 * Dual MIT & GPL license
 *
 * Page: http://tsvensen.github.com/equalize.js
 * Repo: https://github.com/tsvensen/equalize.js/
 *
 * NOTE:
 * This script has been changed to support Drupal's markup hell.
 * Instead of only finding max height of nearest children of the specified element,
 * it cycles through all descendents.
 * 
 * Furthermore it sets the height of all descendents with a class containing "grid"
 * in the name. This is VERY Latto specific.
 * 
 */
;(function($) {

  $.fn.equalize = function(options) {
    var $containers = this, // this is the jQuery object
        reset       = false,
        equalize,
        type;

    // when options are an object
    if ($.isPlainObject(options)) {
      equalize = options.equalize || 'height';
      reset    = options.reset || false;
    } else { // otherwise, a string was passed in or default to height
      equalize = options || 'height';
    }

    if (!$.isFunction($.fn[equalize])) { return false; }

    // determine if the height or width is being equalized
    type = (equalize.indexOf('eight') > 0) ? 'height' : 'width';

    return $containers.each(function() {
      var $children = $(this).find('*'), // Iterate through all descendents to find the tallest one.
          max = 0; // reset for each container
                 
      $children.each(function() {
        var $element = $(this),
            value;
        if (reset) { $element.css(type, ''); } // remove existing height/width dimension
        value = $element[equalize]();          // call height(), outerHeight(), etc.
        if (value > max) { max = value; }      // update max
      });
      
      $(this).find('*').each(function() {
        var classAttribute = $(this).attr('class') == undefined ? '' : $(this).attr('class');
        if(classAttribute.indexOf('grid') > -1) { // Find all children containing grid in the class.
          $(this).css(type, max +'px');
        }
      });
    });
  };

}(jQuery));;
