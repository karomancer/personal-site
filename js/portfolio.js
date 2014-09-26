var moving = false; //If the box is moving


/***** individual portfolio pages *****/
function activateCarousel(color) {
	var carousel = $("#carousel")
	var roll = $("#roll")

	var pages = carousel.children()
	var height = $(window).height()
	/*****Create page roll and boundary array *****/
	createBreadcrumbs(color)

	var boundary = []
	console.log( $("#projectHeader").height())
	var headerHeight = $("#projectHeader").height() + pxToInt($("#projectHeader").css("padding-top")) + pxToInt($("#projectHeader").css("padding-bottom"))
	var sectionHeight = $(window).height() - headerHeight
	$("#carousel").css("margin-top", headerHeight + "px")
	for(var i=0; i<pages.length; i++) {
		$(pages[i]).height(sectionHeight)
		if (i!=0) $(pages[i]).css("padding-top", $("#projectHeader").height() - pxToInt($("#projectHeader").css("padding-top")) - pxToInt($("#projectHeader").css("padding-bottom")))
		boundary[i] = i*sectionHeight-100
	}


	$(window).scroll(function(){
		var pages = $("#carousel").children()
		var space = $("#carousel").width()/($("#breadcrumbs").children().length - 1)
		var scroll = $("body").scrollTop()
		var boxPos = Math.round(pxToInt($("#selectBox").css("left"))/space)
		//Base cases...
		//If scroll is after last boundary element...
		if(!moving && scroll >= boundary[boundary.length-1] && boxPos != boundary.length-1) {
			moving = true
			selectBreadcrumb(document.getElementById(boundary.length-1), true)
		}
		for(var i=0; i<boundary.length-1;i++) {
			if(!moving && scroll > boundary[i] && scroll < boundary[i+1] && i != boxPos) {
				moving = true
				selectBreadcrumb(document.getElementById(i), true)
				break
			}	
		}

	})


}

function createBreadcrumbs(color) {
	var titles = document.getElementsByTagName("pt")
	var breadcrumbs = document.createElement("div")
	breadcrumbs.setAttribute("id", "breadcrumbs")

	var space = $("#carousel").width()/titles.length

	for(var i=0;i<titles.length;i++) {
		var span = document.createElement("a")
		span.setAttribute("id", i)
		span.setAttribute("href", "#")
		var text = document.createTextNode((i+1) + ".   " + toTitleCase(titles[i].innerHTML))
		span.appendChild(text)
		breadcrumbs.appendChild(span)		
	}
	$("#projectHeader").append($(breadcrumbs))

	var children = $(breadcrumbs).children()
	for(var i=0;i<children.length;i++) {
		var kerning = (space - $(children[i]).width()) - 16
		if(i != children.length-1)
			children[i].style.padding = "4px " + kerning + "px 4px 16px"
		else 
			children[i].style.padding = "4px 16px 4px 16px"
		$("#"+i).click(function(e) {
	    e.preventDefault();
			selectBreadcrumb(this, false)
		})
	}

	//set up selector box
	var selectBox = document.createElement("div")
	selectBox.setAttribute("id", "selectBox")
	selectBox.setAttribute("onMouseDown")
	selectBox.style.width = space + "px"
	selectBox.style.height = $("#0").height() + 8 + "px"
	selectBox.style.top = $("#0").position().top + "px"
	if(color != null) {
		selectBox.style.backgroundColor = color
		var tags = document.getElementById("carousel").getElementsByTagName("pt")
		for (var i=0; i<tags.length;i++) {
			tags[i].style.color = color
		}
		var links = document.getElementById("whitebox").getElementsByTagName("a")
		for (var i=0;i<links.length;i++) {
			//Change color
			if(links[i].getAttribute("href") != "#")
				links[i].style.color = color
		}
	}
	$("#0").css("color", "white")


	breadcrumbs.appendChild(selectBox)

	$("#selectBox").animate({
		left:($("#0").position().left)
	}, 800, "swing")

}

function selectBreadcrumb(element, scroll) {
	moving = true	
	var offset = $("#0").position().left
	var num = element.id
	var width = ($("#selectBox").css("width").split("px")[0])
	var newPos = (num*width)+offset
	var oldPos = $("#selectBox").position().left

	var oldNum = Math.round(oldPos/($("#selectBox").css("width").split("px")[0]))
	if (oldNum == num) return

	$("#selectBox").animate({
		left:newPos
	}, 1500, function() {
		moving = false
		document.getElementById(num).removeAttribute("href", "")
	})
	$("#"+oldNum).animate({
		color:"#231F20"
	}, 800, function() {
		document.getElementById(oldNum).setAttribute("href", "#")
	})
	$("#"+num).animate({
		color:"white"
	}, 800)

	if(!scroll) pageTurn(element, oldNum, num)
}

function pageTurn(element, oldnum, num) {
	var id = element.id
	var n = $("#breadcrumbs").children().length - 1 //one is the selector box
	var height = $("#carousel").height()
	var scroll = Math.ceil(num*(height/n + pxToInt($("#projectHeader").css("padding-bottom")))) 
	console.log(scroll)
	$("html, body").animate({
		scrollTop: scroll + "px"
	}, 1500)

}

function resizeVideo() {
	var height = $("#carousel").children()[1].getElementsByTagName("img")[0].height
	$("#video").height(height)
}

function addMouseOvers(color) {
	var links = document.getElementById("whitebox").getElementsByTagName("a")
	for (var i=0;i<links.length;i++) {
		//If (lightbox) image link, add mouseOver
		if(links[i].getAttribute("data-lightbox") != null) {
			var tooltip = document.createElement("div")
			tooltip.setAttribute("class", "image-tooltip")

			var tooltipSpan = document.createElement("span")
			tooltipSpan.innerHTML = toTitleCase(links[i].getAttribute("caption"))
			tooltip.appendChild(tooltipSpan)


			var image = $(links[i]).children()[0]
			$(links[i]).prepend(tooltip)
			$(tooltip).css("max-width", $(image).css("width"))
			$(tooltip).css("width", $(image).css("width"))
			$(tooltip).css("padding-top", $(image).height()*0.1)
			$(tooltip).height($(image).height()*0.2)
			if(color) $(tooltip).css("background-color", color)
			if(color == "white") $(tooltipSpan).css("color", "black")
			$(tooltip).css("margin-top", pxToInt($(image).css("height"))*0.5 + "px")
			if ($(image).css("float") == "right") {
				$(tooltip).css("margin-left", 0.01*$("#carousel").width() + "px") 
			}


			$(links[i]).mouseenter(function() {
				var tooltip = $(this).children()[0] 
				tooltip.style.display="inline-block"
			})
			$(links[i]).mouseleave(function() {
				var tooltip = $(this).children()[0]
				tooltip.style.display="none"
			})

		}
	}
}


/***** portfolio.html page code *****/

function populatePortfolio() {
		$.getJSON("portfolioThumbnails/port.json", function(data) {
			for (var i=0; i<data.length; i++) {
				var files = data[i].Files
				switch(files.length) {
					case 1:
						single(files)
						break
					case 3:
						trio(files)
				}
				

				
			}
		})
}

function single(files) {
	var div = $("#portfolio")
	var thumb = files[0]
	var id = thumb.File.split(".")[0]
	var title = toTitleCase(thumb.File.split(".")[0].split("_").join(" "))
	console.log(title)
	var titleSize = title.split("").length < 15 && title != "Communitree" ? "52px" : "30px"
	var desSize = title.split("").length < 15 && title != "Communitree" ? "24px" : "18px" 
	var url = "portfolio/" + thumb.File.split(".")[0] + "/"
	var cover = '<div style="background-color:'+thumb.Color+'" class="cover"><div class="thumb_label"><span style="font-size:'+titleSize+'">'+title+'</span><br /><span class="thumb_des" style="font-size:'+desSize+'">' + thumb.Type +'<br />'+thumb.Year+'</span></div></div>'
	var element = '<a class="thumb_link" href="'+url+'"><div id="'+id+'" class="parentThumb">'+cover+'<img class="thumb" src="portfolioThumbnails/'+thumb.File+'"></img></div></a>' 
	exists(url, div, element, id)
}

function trio(files) {
	var div = $("#portfolio")

	// Process longer file
	var longThumb = files[0]
	var lid = longThumb.File.split(".")[0]+"trio"
	// div.append('<div class="trio" id="'+lid+'Trio"></div>')
	var trioDiv = document.createElement('div')
	trioDiv.setAttribute("class", "trio")
	trioDiv.setAttribute("id", lid)
	console.log(trioDiv)

	for (var i=0; i<files.length; i++) {
		var thumb = files[i]
		var id = thumb.File.split(".")[0]
		var title = toTitleCase(thumb.File.split(".")[0].split("_").join(" "))
		var titleSize = title.split("").length < 7 && title != "Ctf" ? "52px" : "30px"
		var desSize = title.split("").length < 7 && title != "Ctf" ? "24px" : "18px" 
		var url = "portfolio/" + thumb.File.split(".")[0] + "/"
		console.log(url)
		var cover = '<div style="background-color:'+thumb.Color+'" class="cover"><div class="thumb_label"><span style="font-size:'+titleSize+'">'+title+'</span><br /><span class="thumb_des" style="font-size:'+desSize+'">' + thumb.Type +'<br />'+thumb.Year+'</span></div></div>'
		var element = '<a class="thumb_link" href="'+url+'"><div id="'+id+'" class="parentThumb">'+cover+'<img class="thumb"></img></div></a>' 
		$(trioDiv).append(element)
		exists(url, null, null, id)
	}
	div.append($(trioDiv))
}

function exists(url, div, element, id) {
 var client = new XMLHttpRequest();
 client.onreadystatechange = function() {
  // in case of network errors this might not give reliable results
  if(this.readyState == 4) {
  	if (this.status == 200) {
  		//If the given div is null, then it's a multiple block.
  		//The element is then replaced with the image. Replace the dummy image with the real one.
  		if(div) {
  			div.append(element)	
  		}
  		else {
  			console.log(document.getElementById(id).children[1].setAttribute("src", 'portfolioThumbnails/'+id))
  		}
  		console.log("Found page!")

  		var jqelement = $("#"+id) 
		jqelement.ready(function() {
			jqelement.mouseenter(function() {
				mouseEnter(jqelement[0])
			})
			jqelement.mouseleave(function() {
				mouseLeave(jqelement[0])
			})
		})
  	}
  }
   
 }
 client.open("HEAD", url);
 client.send();
}


function mouseEnter(div) {
	// Ensuring widths and heights are what they should be
	var image = div.children[1]
	var cover = div.children[0]
	var span = cover.children[0]
	// var topMargin = image.height/4 - 20 + "px"
	var height = image.height
	var width = image.width
	div.style.height = height + "px"
	div.style.width = width + "px"
	cover.style.height = height + "px"
	cover.style.width = width + "px"
	cover.children[0].width = width
	// span.style.marginTop = topMargin
	$(cover).slideDown('fast')


}

function mouseLeave(div) {
	var image = div.children[1]
	var cover = div.children[0]
	$(cover).slideUp('fast')
}

function toTitleCase(str) {
	var title = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	var split = title.split(" ")
	for (var i = 0; i<split.length; i++) {
		if (split[i] == "&Amp;") {
			split[i] = "&"
		}
	}
	return split.join(" ")
}

function pxToInt(str) {
	return parseInt(str.split("px")[0])
}