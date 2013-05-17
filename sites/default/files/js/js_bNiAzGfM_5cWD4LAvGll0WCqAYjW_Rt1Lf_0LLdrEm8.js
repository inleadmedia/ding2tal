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
/**
 * Attaches the calendar behavior to all required fields
 */
(function ($) {
Drupal.behaviors.date_popup = {
  attach: function (context) {
  for (var id in Drupal.settings.datePopup) {
    $('#'+ id).bind('focus', Drupal.settings.datePopup[id], function(e) {
      if (!$(this).hasClass('date-popup-init')) {
        var datePopup = e.data;
        // Explicitely filter the methods we accept.
        switch (datePopup.func) {
          case 'datepicker':
            $(this)
              .datepicker(datePopup.settings)
              .addClass('date-popup-init')
            $(this).click(function(){
              $(this).focus();
            });
            break;

          case 'timeEntry':
            $(this)
              .timeEntry(datePopup.settings)
              .addClass('date-popup-init')
            $(this).click(function(){
              $(this).focus();
            });
            break;
          case 'timepicker':
            // Translate the PHP date format into the style the timepicker uses.
            datePopup.settings.timeFormat = datePopup.settings.timeFormat
              // 12-hour, leading zero,
              .replace('h', 'hh')
              // 12-hour, no leading zero.
              .replace('g', 'h')
              // 24-hour, leading zero.
              .replace('H', 'HH')
              // 24-hour, no leading zero.
              .replace('G', 'H')
              // AM/PM.
              .replace('A', 'p')
              // Minutes with leading zero.
              .replace('i', 'mm')
              // Seconds with leading zero.
              .replace('s', 'ss');

            datePopup.settings.startTime = new Date(datePopup.settings.startTime);
            $(this)
              .timepicker(datePopup.settings)
              .addClass('date-popup-init');
            $(this).click(function(){
              $(this).focus();
            });
            break;
        }
      }
    });
  }
  }
};
})(jQuery);
;
(function ($) {

Drupal.toolbar = Drupal.toolbar || {};

/**
 * Attach toggling behavior and notify the overlay of the toolbar.
 */
Drupal.behaviors.toolbar = {
  attach: function(context) {

    // Set the initial state of the toolbar.
    $('#toolbar', context).once('toolbar', Drupal.toolbar.init);

    // Toggling toolbar drawer.
    $('#toolbar a.toggle', context).once('toolbar-toggle').click(function(e) {
      Drupal.toolbar.toggle();
      // Allow resize event handlers to recalculate sizes/positions.
      $(window).triggerHandler('resize');
      return false;
    });
  }
};

/**
 * Retrieve last saved cookie settings and set up the initial toolbar state.
 */
Drupal.toolbar.init = function() {
  // Retrieve the collapsed status from a stored cookie.
  var collapsed = $.cookie('Drupal.toolbar.collapsed');

  // Expand or collapse the toolbar based on the cookie value.
  if (collapsed == 1) {
    Drupal.toolbar.collapse();
  }
  else {
    Drupal.toolbar.expand();
  }
};

/**
 * Collapse the toolbar.
 */
Drupal.toolbar.collapse = function() {
  var toggle_text = Drupal.t('Show shortcuts');
  $('#toolbar div.toolbar-drawer').addClass('collapsed');
  $('#toolbar a.toggle')
    .removeClass('toggle-active')
    .attr('title',  toggle_text)
    .html(toggle_text);
  $('body').removeClass('toolbar-drawer').css('paddingTop', Drupal.toolbar.height());
  $.cookie(
    'Drupal.toolbar.collapsed',
    1,
    {
      path: Drupal.settings.basePath,
      // The cookie should "never" expire.
      expires: 36500
    }
  );
};

/**
 * Expand the toolbar.
 */
Drupal.toolbar.expand = function() {
  var toggle_text = Drupal.t('Hide shortcuts');
  $('#toolbar div.toolbar-drawer').removeClass('collapsed');
  $('#toolbar a.toggle')
    .addClass('toggle-active')
    .attr('title',  toggle_text)
    .html(toggle_text);
  $('body').addClass('toolbar-drawer').css('paddingTop', Drupal.toolbar.height());
  $.cookie(
    'Drupal.toolbar.collapsed',
    0,
    {
      path: Drupal.settings.basePath,
      // The cookie should "never" expire.
      expires: 36500
    }
  );
};

/**
 * Toggle the toolbar.
 */
Drupal.toolbar.toggle = function() {
  if ($('#toolbar div.toolbar-drawer').hasClass('collapsed')) {
    Drupal.toolbar.expand();
  }
  else {
    Drupal.toolbar.collapse();
  }
};

Drupal.toolbar.height = function() {
  var $toolbar = $('#toolbar');
  var height = $toolbar.outerHeight();
  // In modern browsers (including IE9), when box-shadow is defined, use the
  // normal height.
  var cssBoxShadowValue = $toolbar.css('box-shadow');
  var boxShadow = (typeof cssBoxShadowValue !== 'undefined' && cssBoxShadowValue !== 'none');
  // In IE8 and below, we use the shadow filter to apply box-shadow styles to
  // the toolbar. It adds some extra height that we need to remove.
  if (!boxShadow && /DXImageTransform\.Microsoft\.Shadow/.test($toolbar.css('filter'))) {
    height -= $toolbar[0].filters.item("DXImageTransform.Microsoft.Shadow").strength;
  }
  return height;
};

})(jQuery);
;
