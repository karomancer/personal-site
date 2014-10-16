function populatePortfolio($selector) {
  var leftCols = $('.left-column');
  var rightCols = $('.right-column');
  for (var i = 0; i < leftCols.length; i++ ) {
    $(leftCols[i]).css('width', $(leftCols[i]).data('percentage'));
    $(rightCols[i]).css('width', $(rightCols[i]).data('percentage'));
  }
  
  var $children = $selector.find('.item');
  
  for (var i = 0; i < $children.length; i++) {
    var $child = $($children[i]);
    $child.css('width', $child.data('width'));
    $child.css('height', $child.data('height'));
    _createCover($child);
    _createImage($child);
    _createText($child);
  }

  $('.item').mouseenter(function(e) {
    var $target = $(e.target).closest('.item');
    var $cover = $target.find('.thumb-cover');
    $cover.slideDown('fast')
    $target.find('.thumb-year').fadeIn('fast');
  });

  $('.item').mouseleave(function(e) {
    var $target = $(e.target).closest('.item');
    var $cover = $target.find('.thumb-cover');
    $cover.slideUp('fast')
    $target.find('.thumb-year').fadeOut('fast');
  });
}

function _createImage($child) {
  var src = $child.data('img');
  var width = $child.data('width');
  var height = $child.data('height');
  $child.append('<img class="thumb" width="' + width + '" height="' + height + '" src="' + src + '"></img>');
}

function _createCover($child) {
  var width = $child.data('width');
  var height = $child.data('height');
  $child.append('<div class="thumb-cover" style="background-color:' + $child.data('color') + ';width:' + width + ';height:' + height + '"></div>');
}

function _createText($child) {
  var $thumbLabel = '<div class="thumb-label" style="background-color:' + $child.data('color') + '">\
    <span class="thumb-name">' + $child.data('name') + '</span><br><div class="thumb-type-container">'

  var typearr = $child.data('type').split(',');
  for (var i = 0; i < typearr.length; i++) {
    $thumbLabel += ((i > 0 ? '& ' : '') + '<span class="thumb-type">' + typearr[i] + '</span><br>');
  }

  if ($child.data('language')) {
    $thumbLabel += '<span class="thumb-language">' + $child.data('language') + '</span>'
  }
  $thumbLabel += '</div><span class="thumb-year">' + $child.data('year') + '</span></div>';
  
  $child.find('.thumb-cover').append($thumbLabel);
}