Drupal.locale = { 'pluralFormula': function ($n) { return Number(($n!=1)); }, 'strings': {"":{"An AJAX HTTP error occurred.":"Der opstod en AJAX HTTP-fejl.","HTTP Result Code: !status":"HTTP resultatkode: !status","An AJAX HTTP request terminated abnormally.":"En AJAX HTTP-foresp\u00f8rgsel afsluttede p\u00e5 unormal vis.","Debugging information follows.":"Information til fejls\u00f8gning f\u00f8lger.","Path: !uri":"Sti: !uri","StatusText: !statusText":"StatusText: !statusText","ResponseText: !responseText":"ResponseText: !responseText","ReadyState: !readyState":"ReadyState: !readyState","@title dialog":"@title dialog","Configure":"Konfigur\u00e9r","Show shortcuts":"Vis genveke","Hide shortcuts":"Gem genveje","Loading":"Indl\u00e6ser","(active tab)":"(aktiv fane)","Fullscreen":"Fuldsk\u00e6rm","Please wait...":"Vent venligst\u2026","Hide":"Skjul","Show":"Vis","Select all rows in this table":"V\u00e6lg alle r\u00e6kker i tabellen","Deselect all rows in this table":"Frav\u00e6lg alle r\u00e6kker i tabellen","Not restricted":"Ikke begr\u00e6nset","Restricted to certain pages":"Begr\u00e6nset til bestemte sider","Not customizable":"Kan ikke tilpasses","The changes to these blocks will not be saved until the \u003Cem\u003ESave blocks\u003C\/em\u003E button is clicked.":"\u00c6ndringerne bliver ikke gemt f\u00f8r du trykker p\u00e5 knappen \u003Cem\u003EGem blokke\u003C\/em\u003E.","The block cannot be placed in this region.":"Blokken kan ikke placeres i denne region.","Re-order rows by numerical weight instead of dragging.":"Sort\u00e9r r\u00e6kker med numeriske v\u00e6gte i stedet for at tr\u00e6kke dem.","Show row weights":"Vis r\u00e6kkev\u00e6gte","Hide row weights":"Skjul r\u00e6kkev\u00e6gte","Drag to re-order":"Tr\u00e6k for at (om)sortere","Changes made in this table will not be saved until the form is submitted.":"\u00c6ndringer i tabellen bliver ikke gemt, f\u00f8r du indsender formularen.","Edit":"Redig\u00e9r","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"Den valgte fil %filename kan ikke uploades. Kun filer med f\u00f8lgende filendelser er tilladt: %extensions.","Autocomplete popup":"Autocomplete popup","Searching for matches...":"S\u00f8ger efter resultater...","New revision":"Ny version","No revision":"Ingen version","By @name on @date":"Af @name, @date","By @name":"Af @name","Not published":"Ikke udgivet","Alias: @alias":"Alias: @alias","No alias":"Intet alias","@number comments per page":"@number kommentarer pr. side","Remove group":"Fjern gruppe","Apply (all displays)":"Anvend (alle displays)","Revert to default":"Gendan til standard","Apply (this display)":"Anvend (dette display)","Customize dashboard":"Tilpas dashboard","Done":"F\u00e6rdig","There is nothing in your media library. Select the Upload tab above to add a file.":"Dit medie-bibliotek er tomt. V\u00e6lg upload-fanen ovenfor for at tilf\u00f8je en fil.","Loading...":"Indl\u00e6ser...","Error getting media.":"Fejl ved hentning af media.","Submit":"Indsend","Cancel":"Annull\u00e9r","Cannot continue, nothing selected":"Kan ikke forts\u00e6tte, intet valgt","This permission is inherited from the authenticated user role.":"Denne tilladelse er arvet fra den godkendte brugerrolle.","Insert this token into your form":"Inds\u00e6t dette token i din formular","First click a text field to insert your tokens into.":"Klik p\u00e5 et tekstfelt som tokens skal s\u00e6ttes ind i.","Requires a title":"Kr\u00e6ver en titel","Don\u0027t display post information":"Vis ikke information om indl\u00e6gget","OK":"O.k.","Not in menu":"Ikke i menu","closed":"lukket","Disabled":"Deaktiveret","Enabled":"Aktiveret","none":"ingen","Save":"Gem","If you switch views, you will lose your selection.":"Hvis du skifter views mister du dine valg.","all":"alle","Select":"V\u00e6lg","Delete instance":"Slet instans"}} };;

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
(function($) {

  Drupal.behaviors.bookmarkSubmit = {
      attach:function(context, settings) {
          $('.ding-bookmark-reservation-button', context).click(function() {
              $('#ding-reservation-reserve-form-' + this.id + ' input[type=submit]').mousedown();
              return false;
          });
      }
  };

  // reload page after closing reservation pop-up
  Drupal.behaviors.reloadBookmarkOnPopupClose = {
    attach: function(context) {
      // Capture link clicks.
      $('body.page-user-bookmarks a.ui-dialog-titlebar-close').each( function(context) {
        // Unbind existing click behaviors.
        $(this).unbind('click');
        // Handle clicks.
        $(this).click( function(e) {
          // Remove the default click handler.
          e.preventDefault();
          location.reload();
          return false;
        });
      });
    }
  };


})(jQuery);

;
(function ($) {

Drupal.behaviors.tableSelect = {
  attach: function (context, settings) {
    // Select the inner-most table in case of nested tables.
    $('th.select-all', context).closest('table').once('table-select', Drupal.tableSelect);
  }
};

Drupal.tableSelect = function () {
  // Do not add a "Select all" checkbox if there are no rows with checkboxes in the table
  if ($('td input:checkbox', this).length == 0) {
    return;
  }

  // Keep track of the table, which checkbox is checked and alias the settings.
  var table = this, checkboxes, lastChecked;
  var strings = { 'selectAll': Drupal.t('Select all rows in this table'), 'selectNone': Drupal.t('Deselect all rows in this table') };
  var updateSelectAll = function (state) {
    $('th.select-all input:checkbox', table).each(function () {
      $(this).attr('title', state ? strings.selectNone : strings.selectAll);
      this.checked = state;
    });
  };

  // Find all <th> with class select-all, and insert the check all checkbox.
  $('th.select-all', table).prepend($('<input type="checkbox" class="form-checkbox" />').attr('title', strings.selectAll)).click(function (event) {
    if ($(event.target).is('input:checkbox')) {
      // Loop through all checkboxes and set their state to the select all checkbox' state.
      checkboxes.each(function () {
        this.checked = event.target.checked;
        // Either add or remove the selected class based on the state of the check all checkbox.
        $(this).closest('tr').toggleClass('selected', this.checked);
      });
      // Update the title and the state of the check all box.
      updateSelectAll(event.target.checked);
    }
  });

  // For each of the checkboxes within the table that are not disabled.
  checkboxes = $('td input:checkbox:enabled', table).click(function (e) {
    // Either add or remove the selected class based on the state of the check all checkbox.
    $(this).closest('tr').toggleClass('selected', this.checked);

    // If this is a shift click, we need to highlight everything in the range.
    // Also make sure that we are actually checking checkboxes over a range and
    // that a checkbox has been checked or unchecked before.
    if (e.shiftKey && lastChecked && lastChecked != e.target) {
      // We use the checkbox's parent TR to do our range searching.
      Drupal.tableSelectRange($(e.target).closest('tr')[0], $(lastChecked).closest('tr')[0], e.target.checked);
    }

    // If all checkboxes are checked, make sure the select-all one is checked too, otherwise keep unchecked.
    updateSelectAll((checkboxes.length == $(checkboxes).filter(':checked').length));

    // Keep track of the last checked checkbox.
    lastChecked = e.target;
  });
};

Drupal.tableSelectRange = function (from, to, state) {
  // We determine the looping mode based on the the order of from and to.
  var mode = from.rowIndex > to.rowIndex ? 'previousSibling' : 'nextSibling';

  // Traverse through the sibling nodes.
  for (var i = from[mode]; i; i = i[mode]) {
    // Make sure that we're only dealing with elements.
    if (i.nodeType != 1) {
      continue;
    }

    // Either add or remove the selected class based on the state of the target checkbox.
    $(i).toggleClass('selected', state);
    $('input:checkbox', i).each(function () {
      this.checked = state;
    });

    if (to.nodeType) {
      // If we are at the end of the range, stop.
      if (i == to) {
        break;
      }
    }
    // A faster alternative to doing $(i).filter(to).length.
    else if ($.filter(to, [i]).r.length) {
      break;
    }
  }
};

})(jQuery);
;
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
