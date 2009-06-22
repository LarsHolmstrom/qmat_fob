
/*******************************************************
* MENU.JS
*******************************************************/
		
var menuItems;		// total menu items (menuItems) must be set in each HTML page
var currentItem;	// updated during keyUp event to maintain an index into the correspond URL in the "links" array
var links = new Array;		
var left;
var mid;
var right;

// select a menu item
function menuSelect(id)
{
		
	// first unselect everything
	for (i = 1; i < (menuItems + 1); i++)
	{
		left = document.getElementById("m"+i+"-left");
		mid = document.getElementById("m"+i+"-mid");
		right = document.getElementById("m"+i+"-right");
		
		left.style.backgroundImage = "url(images/button-unselected-left.gif)";
		left.style.backgroundRepeat = "no-repeat";
		left.style.backgroundPositionX = 9;
		left.style.backgroundPositionY = 9;
		mid.style.backgroundImage = "url(images/button-unselected-middle.gif)";
		mid.style.color = "#234368";
		right.style.backgroundImage = "url(images/button-unselected-right.gif)";			
	}
	
	// now get the menu item we're selecting
	left = document.getElementById("m"+id+"-left");
	mid = document.getElementById("m"+id+"-mid");
	right = document.getElementById("m"+id+"-right");
	
	// and select it
	left.style.backgroundImage = "url(images/button-selected-left.gif)";
	left.style.backgroundPositionX = 0;
	left.style.backgroundPositionY = 0;			
	mid.style.backgroundImage = "url(images/button-selected-middle.gif)";
	mid.style.color = "#FFFFFF";
	right.style.backgroundImage = "url(images/button-selected-right.gif)";		
	
	// update the state variable so we know who is selected next time
	currentItem = id;	
}
	
// detect keypress event and move menu selection accordingly
function keyDown()
{
	//alert(event.keyCode);
	parent.frames["scriptframe"].resetActivityTimer();
	
	// up key
	if (event.keyCode == 38)
	{
		if ( currentItem > 1 )
			menuSelect(currentItem-1);
	}
	
	// down key
	if (event.keyCode == 40)
	{
		if ( currentItem < menuItems )
			menuSelect(currentItem+1);
	}

	// enter key
	if (event.keyCode == 13)
	{
		if ( links[currentItem] == "RESUME" )
		{
			history.go(-1);
		}
		else
		{
			parent.frames["scriptframe"].Kinetics.CancelAudioPlay();  
			window.location = links[currentItem];		
		}
	}
	
	// m key (debug menu)
	if (event.keyCode == 77)
	{
		parent.frames["scriptframe"].Kinetics.CancelAudioPlay(); 		
		window.location = "debug-menu.html";
	}	

	// s key 
	if (event.keyCode == 83)
	{
		parent.frames["scriptframe"].Kinetics.CancelAudioPlay(); 		
		window.location = "session-saving.html";
	}		

	// a key 
	if (event.keyCode == 65)
	{
		parent.frames["scriptframe"].Kinetics.CancelAudioPlay(); 		
		window.location = "actiwatch-saving.html";
	}				

	// e key 
	if (event.keyCode == 69)
	{
		parent.frames["scriptframe"].Kinetics.CancelAudioPlay(); 		
		window.location = "about.html";
	}	
			
}
		
