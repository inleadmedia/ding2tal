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
(function($) {

  Drupal.behaviors.toggleFormat = {
    attach: function(context, settings) {
      $('#ding-toggle-format', context).click(function() {
        var toFormat = ($.cookie("ding_toggle_format") == 'short') ? 'long': 'short';
        Drupal.setFormat(toFormat);
        return false;
      });
    }
  };

  Drupal.behaviors.readyFormat = {
    attach: function(context, settings) {
      $('#ding-toggle-format', context).ready(function() {
        var format = ($.cookie("ding_toggle_format")) ? $.cookie("ding_toggle_format") : 'long';
        Drupal.setFormat(format);
      });
    }
  };

  Drupal.setFormat = function(format) {
    $("#ding-toggle-format").removeClass('ding-toggle-format-long');
    $("#ding-toggle-format").removeClass('ding-toggle-format-short');
    $("#ding-toggle-format").addClass('ding-toggle-format-' + format);
    $("li.search-result").removeClass('ding-format-long');
    $("li.search-result").removeClass('ding-format-short');
    $("li.search-result").addClass('ding-format-' + format);
    $.cookie("ding_toggle_format", format, {
      expires: 30
    });
  };

} (jQuery));

;
/*!
 * jQuery Cookie Plugin v1.3
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function(a,b,c){function e(a){return a}function f(a){return decodeURIComponent(a.replace(d," "))}var d=/\+/g,g=a.cookie=function(d,h,i){if(h!==c){if(i=a.extend({},g.defaults,i),null===h&&(i.expires=-1),"number"==typeof i.expires){var j=i.expires,k=i.expires=new Date;k.setDate(k.getDate()+j)}return h=g.json?JSON.stringify(h):h+"",b.cookie=[encodeURIComponent(d),"=",g.raw?h:encodeURIComponent(h),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}for(var l=g.raw?e:f,m=b.cookie.split("; "),n=0,o=m.length;o>n;n++){var p=m[n].split("=");if(l(p.shift())===d){var q=l(p.join("="));return g.json?JSON.parse(q):q}}return null};g.defaults={},a.removeCookie=function(b,c){return null!==a.cookie(b)?(a.cookie(b,null,c),!0):!1}})(jQuery,document);;
(function($) {

  $(document).ready(function() {
    Drupal.setSelectedLabel();
    Drupal.extendedQueryDisplay();
  });

  $.TingExtendedForm = {};
  $.TingExtendedForm.showExtended = false;


  Drupal.behaviors.clearExtendForm = {
      attach:function(context, settings) {
          $('#extend-form-clear', context).click(function() {
              $("#edit-creator").val('');
              $("#edit-title").val('');
              $("#edit-subject").val('');
              $("#edit-search-block-form--2").val('');
              return false;
          });
      }
  };

  Drupal.behaviors.readyExtendedForm = {
    // If there's no 'Show advanced search' link, set display: block.
    attach: function(context, settings) {
      $('#extend-form', context).ready(function() {
        if (!$('#extend-form-show')) {
          $("#search-extend-form").addClass('extend-form-show');
        }
      });
    }
  };

  Drupal.behaviors.clearExtendForm = {
    attach:function(context, settings) {
      $('#extend-form-clear', context).click(function() {
        $("#edit-creator").val('');
        $("#edit-title").val('');
        $("#edit-subject").val('');
        $("#edit-search-block-form--2").val('');
        return false;
      });
    }
  };

  Drupal.behaviors.toggleSort = {
    attach: function(context, settings) {
      $('#edit-sort').change(function() {
        $('#ting-search-sort-form').trigger("submit");
      });
    }
  };

  Drupal.setSelectedLabel = function() {
    $('.form-item-size').find('label').removeClass('labelSelected');
    $('input[name=size]').filter(':checked').parent().find('label').addClass('labelSelected');
  };

  Drupal.extendedQueryDisplay = function() {

    var queryText = $("input").filter("[name='search_block_form']").val()
    var parts = [];
    if (queryText) {
      parts.push(queryText);
    }
    var val;
    var label;
    $('#edit-advanced .form-item').each(function (i, elem) {
      if ((val = $('input', elem).val()) && (label = $('label', elem).text())) {
        parts.push(label + " = " + val);
        console.dir(parts);
      }
    });

    if (parts.length > 0) {
      $('#search-query-string').text(parts.join(Drupal.t(" AND ")));
    }
  };

} (jQuery));

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
/*!
 * jQuery Cookie Plugin v1.3
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function(a,b,c){function e(a){return a}function f(a){return decodeURIComponent(a.replace(d," "))}var d=/\+/g,g=a.cookie=function(d,h,i){if(h!==c){if(i=a.extend({},g.defaults,i),null===h&&(i.expires=-1),"number"==typeof i.expires){var j=i.expires,k=i.expires=new Date;k.setDate(k.getDate()+j)}return h=g.json?JSON.stringify(h):h+"",b.cookie=[encodeURIComponent(d),"=",g.raw?h:encodeURIComponent(h),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}for(var l=g.raw?e:f,m=b.cookie.split("; "),n=0,o=m.length;o>n;n++){var p=m[n].split("=");if(l(p.shift())===d){var q=l(p.join("="));return g.json?JSON.parse(q):q}}return null};g.defaults={},a.removeCookie=function(b,c){return null!==a.cookie(b)?(a.cookie(b,null,c),!0):!1}})(jQuery,document);;

(function($) {

  Drupal.behaviors.facetbrowser = {
    attach: function(context, settings) {
      Drupal.FoldFacetGroup();

      var main_element = $(Drupal.settings.dingFacetBrowser.mainElement);

      // Wrap all facet fieldsets marked as hidden in a container so we can hide
      // em. The link text is show less and will be changed to show more if the
      // cookie is false.
      var show_more = $('<a href="#" class="expand-facets expand-facets-visible">' + Drupal.t('Show less filters') + '</a>');
      main_element.find('fieldset.hidden').wrapAll('<div id="hidden-facets" class="hidden-facets-group" />');
      main_element.find('#hidden-facets').after(show_more);

      // Check the cookie.
      if ($.cookie("ding_factbrowers_toggle") != 'true') {
        main_element.find('#hidden-facets').hide();
        show_more.text(Drupal.t('Show more filters'));
        show_more.removeClass().addClass("expand-facets expand-facets-hidden");
      }

      show_more.click(function(e) {
        e.preventDefault();

        // Toggle facts groups and update link/button text.
        main_element.find('#hidden-facets').toggle('fast', function () {
          var visible = $(this).is(':visible');
          show_more.text(
            visible ? Drupal.t('Show less filters') : Drupal.t('Show more filters')
          );
          show_more.removeClass().addClass(
            visible ? "expand-facets expand-facets-visible" : "expand-facets expand-facets-hidden"
          );

          // Set cookie, so to remember if they where shown.
          $.cookie("ding_factbrowers_toggle", visible);
        });

        return false;
      });

      // Check for click in checkbox, and execute search.
      main_element.find('.form-type-checkbox input').change(function(e) {
        $('body').prepend('<div class="facetbrowser_overlay"><div class="spinner"></div></div>');
        window.location = $(e.target).parent().find('a').attr('href');
      });
    }
  };

  /**
  * Fold facet groups to show only x unselected checkboxes per group.
  */
  Drupal.FoldFacetGroup = function() {

    var main_element = $(Drupal.settings.dingFacetBrowser.mainElement);

    // Add show more button to each facet group and hide some terms.
    main_element.find('fieldset.form-wrapper').each(function() {
      var facetGroup = $(this);

      // Limit the number of visible terms in the group.
      var number_of_terms = Drupal.settings.dingFacetBrowser.number_of_terms;
      var terms_not_checked = facetGroup.find('.form-type-checkbox input:not(:checked)');
      if (terms_not_checked.size() > number_of_terms) {
        terms_not_checked.slice(number_of_terms).parent().hide();
      }

      // Add expand button, if there are more to show.
      if (terms_not_checked.length > number_of_terms) {
        facetGroup.append('<a href="#" class="expand expand-more" id="expand_more">' + Drupal.t('Show more') + '</a>');
      }

      // Add some classes to checkbox wrappers.
      facetGroup.find('.form-type-checkbox input:checked').parent().addClass('selected-checkbox');
      facetGroup.find('.form-type-checkbox input:not(:checked)').parent().addClass('unselected-checkbox');

      // Add some div wrappers around selected and unselected checkboxes.
      facetGroup.find('.selected-checkbox').wrapAll('<div class="selected-checkbox-group" />');
      facetGroup.find('.unselected-checkbox').wrapAll('<div class="unselected-checkbox-group" />');

      // Add a unselect all link.
      if (facetGroup.find('.selected-checkbox-group').length) {
        facetGroup.find('.selected-checkbox-group').append('<a href="#" class="unselect">' + Drupal.t('Remove all selected') + '</a>');
      }

    });

    /**
    * Bind click function to show more and show less links.
    */
    main_element.find('.expand').live('click', function(e) {
      e.preventDefault();

      var clickedKey = this;
      var facetGroup = $(clickedKey).parent();

      facetGroup.find('.form-type-checkbox.unselected-checkbox:' + (clickedKey.id == 'expand_more' ? 'hidden': 'visible')).each(function(count, facetElement) {
        if (clickedKey.id == 'expand_more' && count < Drupal.settings.dingFacetBrowser.number_of_terms) {
          $(facetElement).slideDown('fast', function() {
            if (facetGroup.find('.form-type-checkbox.unselected-checkbox:visible').size() >= Drupal.settings.dingFacetBrowser.number_of_terms &&
                facetGroup.find('#expand_less').size() === 0 &&
                count % Drupal.settings.dingFacetBrowser.number_of_terms === 0) {
              facetGroup.append('<a href="#" class="expand expand-less" id="expand_less">' + Drupal.t('Show less') + '</a>');
            }
          });
        }
        else if (clickedKey.id == 'expand_less' && count >= Drupal.settings.dingFacetBrowser.number_of_terms) {
          $(facetElement).slideUp('fast', function() {
            if (facetGroup.find('.form-type-checkbox.unselected-checkbox:visible').size() == Drupal.settings.dingFacetBrowser.number_of_terms &&
                facetGroup.find('#expand_less:visible')) {
              facetGroup.find('#expand_less').fadeOut().remove();
            }
          });
        }
      });

      // Need to make sure we have the correct amount of unselected checkboxes to check against when wanting to remove the show more link.
      var unselectedSize = facetGroup.attr('count')-facetGroup.find('.form-type-checkbox.selected-checkbox').size();

      if ((facetGroup.find('.form-type-checkbox.unselected-checkbox:visible').size() >= unselectedSize) && (clickedKey.id == 'expand_more')) {
          facetGroup.find('#expand_more').remove();
      }

      if (clickedKey.id == 'expand_less'){
        if (!(facetGroup.find('#expand_more').length)) {
          facetGroup.append('<span class="expand expand-more" id="expand_more">' + Drupal.t('Show more') + '</span>');
        }
      }

      return false;
    });

    /**
    * Bind click function to the unselect all selected checkboxes link.
    */
    main_element.find('.unselect').live('click', function(e) {
      e.preventDefault();

      var clickedKey = this;
      var facetGroup = $(clickedKey).parent();
      var checkedFacets = '';
      facetGroup.find('.form-type-checkbox.selected-checkbox').each(function() {
        var element = $(this);
        // Uncheck checkboxes (for the visual effect).
        element.find('input').click();

        // Find the facets to be deselected and generate new URL.
        var facetMatch = element.find('a').attr('href').match(/&facets\[\]=-facet.*/);
        checkedFacets += facetMatch[0];
        if (checkedFacets) {
          $('body').prepend('<div class="facetbrowser_overlay"><div class="spinner"></div></div>');
          window.location.href += checkedFacets;
        }
      });

      return false;
    });
  };

})(jQuery);


;
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
