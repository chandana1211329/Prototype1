/*! This script in this file is minified but the premium maps include a full file */
function isTouchEnabled() {
    return (("ontouchstart" in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))
}
jQuery(function() {
    jQuery("path[id^=tryjs]").each(function(i, e) {
        tryaddEvent(jQuery(e).attr("id"))
    })
});

function tryaddEvent(id, relationId) {
    var _obj = jQuery("#" + id);
    // force clicks to open modal (preserve explicit "none")
    tryjsconfig[id] = tryjsconfig[id] || {};
    tryjsconfig[id].target = (tryjsconfig[id].target === "none") ? "none" : "modal";
    // clear any external URL so clicks don't navigate away
    if (tryjsconfig[id].target !== "none") tryjsconfig[id].url = "";
    var arr = id.split("");
    var _Textobj = jQuery("#" + id + "," + "#tryjsvn" + arr.slice(5).join(""));
    jQuery("#" + ["visnames"]).attr({
        "fill": tryjsconfig.general.visibleNames
    });
    // _obj.attr({
    //     "fill": tryjsconfig[id].upColor,
    //     "stroke": tryjsconfig.general.borderColor
    // });
    _Textobj.attr({
        "cursor": "default"
    });
    if (tryjsconfig[id].active === !0) {
        _Textobj.attr({
            "cursor": "pointer"
        });
        _Textobj.hover(function() {
            jQuery("#tryjstip").show().html(tryjsconfig[id].hover);
            // _obj.css({
            //     "fill": tryjsconfig[id].overColor
            // })
        }, function() {
            jQuery("#tryjstip").hide();
            // jQuery("#" + id).css({
            //     "fill": tryjsconfig[id].upColor
            // })
        });
        if (tryjsconfig[id].target !== "none") {
            _Textobj.mousedown(function() {
                // jQuery("#" + id).css({
                //     "fill": tryjsconfig[id].downColor
                // })
            })
        }
        _Textobj.mouseup(function(e) {
            // jQuery("#" + id).css({
            //     "fill": tryjsconfig[id].overColor
            // });
            // Redirect to dedicated state page (default behavior)
            var stateName = jQuery("#" + id).attr("title");
            if (stateName) {
                var targetUrl = 'state.php?name=' + encodeURIComponent(stateName);
                // open in new tab if Ctrl/Cmd is pressed
                if (e.ctrlKey || e.metaKey) {
                    window.open(targetUrl, '_blank', 'noopener');
                } else {
                    window.location.href = targetUrl;
                }
            }
            return false;
        });
        _Textobj.mousemove(function(e) {
            var x = e.pageX + 10,
                y = e.pageY + 15;
            var tipw = jQuery("#tryjstip").outerWidth(),
                tiph = jQuery("#tryjstip").outerHeight(),
                x = (x + tipw > jQuery(document).scrollLeft() + jQuery(window).width()) ? x - tipw - (20 * 2) : x;
            y = (y + tiph > jQuery(document).scrollTop() + jQuery(window).height()) ? jQuery(document).scrollTop() + jQuery(window).height() - tiph - 10 : y;
            jQuery("#tryjstip").css({
                left: x,
                top: y
            })
        });
        if (isTouchEnabled()) {
            _Textobj.on("touchstart", function(e) {
                var touch = e.originalEvent.touches[0];
                var x = touch.pageX + 10,
                    y = touch.pageY + 15;
                var tipw = jQuery("#tryjstip").outerWidth(),
                    tiph = jQuery("#tryjstip").outerHeight(),
                    x = (x + tipw > jQuery(document).scrollLeft() + jQuery(window).width()) ? x - tipw - (20 * 2) : x;
                y = (y + tiph > jQuery(document).scrollTop() + jQuery(window).height()) ? jQuery(document).scrollTop() + jQuery(window).height() - tiph - 10 : y;
                // jQuery("#" + id).css({
                //     "fill": tryjsconfig[id].downColor
                // });
                jQuery("#tryjstip").show().html(tryjsconfig[id].hover);
                jQuery("#tryjstip").css({
                    left: x,
                    top: y
                })
            });
            _Textobj.on("touchend", function() {
                // jQuery("#" + id).css({
                //     "fill": tryjsconfig[id].upColor
                // });
                if (tryjsconfig[id].target === "new_window") {
                    window.open(tryjsconfig[id].url)
                } else if (tryjsconfig[id].target === "same_window") {
                    window.parent.location.href = tryjsconfig[id].url
                }
                // For touch, redirect to state page as well
                var stateName = jQuery("#" + id).attr("title");
                if (stateName) {
                    var targetUrl = 'state.php?name=' + encodeURIComponent(stateName);
                    window.location.href = targetUrl;
                }
            })
        }
    }
}

/* ---------- State info modal logic ---------- */
(function(){
  var statesCache = null;

  function populateModalContent(stateName){
    var $title = jQuery('#stateModalTitle');
    var $overview = jQuery('#stateOverview');
    var $districts = jQuery('#stateDistricts');
    var $tour = jQuery('#stateTourism');
    var $food = jQuery('#stateFood');
    var $culture = jQuery('#stateCulture');
    var $history = jQuery('#stateHistory');
    var $key = jQuery('#stateKeyStats');
    var $fest = jQuery('#stateFestivals');

    $title.text(stateName || 'State');
    // update link to full page
    jQuery('#openStatePage').attr('href', 'state.php?name=' + encodeURIComponent(stateName));

    if (!statesCache || !statesCache[stateName]){
      $overview.text('No data available');
      $districts.html('<li>No data available</li>');
      $tour.html('<li>No data available</li>');
      $food.text('No data available');
      $culture.text('No data available');
      $history.text('No data available');
      $key.html('');
      $fest.html('');
      return;
    }
    var s = statesCache[stateName];
    // overview
    $overview.text(s.overview || 'No data');
    // districts
    if (Array.isArray(s.districts)){
      $districts.html(s.districts.map(function(x){ return '<li>' + x + '</li>'; }).join(''));
    } else { $districts.html('<li>' + (s.districts || 'No data') + '</li>'); }
    // tourism
    if (Array.isArray(s.tourism)){
      $tour.html(s.tourism.map(function(x){ return '<li>' + x + '</li>'; }).join(''));
    } else { $tour.html('<li>' + (s.tourism || 'No data') + '</li>'); }
    // food
    $food.text(s.food || 'No data');
    // culture
    $culture.text(s.culture || 'No data');
    // history
    $history.text(s.history || 'No data');
    // key stats
    if (s.key_stats && typeof s.key_stats === 'object'){
      var ks = Object.keys(s.key_stats).map(function(k){ return '<li><strong>' + k + ':</strong> ' + s.key_stats[k] + '</li>'; }).join('');
      $key.html(ks);
    } else {
      $key.html('');
    }
    // festivals
    if (Array.isArray(s.festivals)){
      $fest.html(s.festivals.map(function(x){ return '<li>' + x + '</li>'; }).join(''));
    } else { $fest.html('<li>' + (s.festivals || 'No data') + '</li>'); }
  }

  window.showStateModal = function(stateName){
    if (!stateName) return;
    if (statesCache){
      populateModalContent(stateName);
      jQuery('#stateModal').fadeIn(150);
      return;
    }
    jQuery.getJSON('data/statesData.json').done(function(data){
      statesCache = data;
      populateModalContent(stateName);
      jQuery('#stateModal').fadeIn(150);
    }).fail(function(){
      // fallback
      statesCache = {};
      populateModalContent(stateName);
      jQuery('#stateModal').fadeIn(150);
    });
  };

  function hideModal(){ jQuery('#stateModal').fadeOut(150); }

  jQuery(function(){
    jQuery('#stateModalClose').on('click', hideModal);
    jQuery('#stateModal').on('click', hideModal);
    jQuery('.state-modal-content').on('click', function(e){ e.stopPropagation(); });
    jQuery(document).on('keyup', function(e){ if (e.key === 'Escape') hideModal(); });

    // prevent any anchor navigation inside the map wrapper
    jQuery('#mapwrapper').on('click', 'a', function(e){ e.preventDefault(); e.stopPropagation(); });
  });
})();
