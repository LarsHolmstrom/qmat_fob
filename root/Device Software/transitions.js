
var the_view_frame = parent.frames["viewframe"];

var fso = null, log_file = null;
var useragent = navigator.userAgent;

if (useragent.indexOf("Windows NT") != -1) // if we're on windows XP/NT (not the device)
{
	fso = new ActiveXObject("Scripting.FileSystemObject");
	if( fso ) log_file = fso.CreateTextFile("C:\\ParkinsonismBox.log", true);
}

function writeToFile(l) 
{
	if (useragent.indexOf("Windows NT") != -1)  // if we're on windows XP/NT (not the device)
	{
		try {
			if( log_file )
				log_file.writeline(l);
			//log_file.Close();
		}
		catch(err)
		{
			var strErr = 'Error:';
			strErr += '\nNumber:' + err.number;
			strErr += '\nDescription:' + err.description;
			document.write(strErr);
		}
	}
}
			
function States()
{}

new States();

States.states = {
	"Start" 				: false
	, "WaitingToStartRight"	: false
	, "WaitingToStartLeft"	: false
	, "PegTestToLeft"		: false
	, "PegTestToRight"		: false
	, "LeftPegsReady"		: false
	, "RightPegsReady"		: false
	, "LeftPegsNotReady"	: false
	, "RightPegsNotReady"	: false
	, "End"					: false
};

function States.setState( state )
{
	writeToFile("DEBUG: Entered setState: "+state);
	if( undefined != States.states[state] )
	{
		States.states[state] = true;
		States.debugStates();
	}
	else
		writeToFile("ERROR: setState invalid argument.");
}
function States.resetState( state )
{
	writeToFile("DEBUG: Entered resetState: "+state);
	if( undefined != States.states[state] )
	{
		States.states[state] = false;
		States.debugStates();
	}
	else
		writeToFile("ERROR: setState invalid argument.");
}
function States.setStateTF( state, b )
{
	if( b )
		States.setState( state );
	else
		States.resetState( state );
}
function isState(s)
{
	return States.states[s];
}
function States.debugStates()
{
	var ss = "";
	for( s in States.states )
	{
		ss += s;
		ss += ": "
		ss += States.states[s];
		ss += ", "
	}
	writeToFile("STATES: "+ss);
}

States.transitions = {
	TurnOn				: "TurnOn"
	, InsertPeg			: "InsertPeg"
	, LeftPegsFilled	: "LeftPegsFilled"
	, RightPegsFilled	: "RightPegsFilled"
	, LeftPegsUnfilled	: "LeftPegsUnfilled"
	, RightPegsUnfilled	: "RightPegsUnfilled"
	, AudioEnded		: "AudioEnded"
	, TurnOff			: "TurnOff"
};
States.currentTransitions = [];

/**
* Object to manage state transitions.
*/
function HandledStateTransition( on_transition, required_states, handler )
{
	this.transition_trigger = on_transition;
	this.required_states	= required_states;
	this.handler			= handler;
}
var handledStateTransitions = [
	new HandledStateTransition(
		"LeftPegsFilled"
		, ["Start"]
		, "HandledStateTransition.pegsFilledHandler()" 
	)
	, new HandledStateTransition(
		"RightPegsFilled"
		, ["Start"]
		, "HandledStateTransition.pegsFilledHandler()" 	
	)
	, new HandledStateTransition(
		"InsertPeg"
		, ["Start"]
		, "HandledStateTransition.insertPegHandler()"
	)
	, new HandledStateTransition(
		"AudioEnded"
		, ["Start", "WaitingToStartRight"]
		, "HandledStateTransition.waitingToStartRightHandler()"
	)
	, new HandledStateTransition(
		"AudioEnded"
		, ["Start", "WaitingToStartLeft"] 
		, "HandledStateTransition.waitingToStartLeftHandler()"
	)
];

function HandledStateTransition.transitionsHandler()
{
	var index=0;
	// For each transition not yet handled...
	while( index < States.currentTransitions.length )
	{
		var transition = States.currentTransitions[index];
		writeToFile("DEBUG: transition= "+transition);
		// For each transition that has a handler...
		for( key in handledStateTransitions )
		{
			var handled_transition = handledStateTransitions[key];
			// ... does the unhandled transition equal one that 
			// has a handler?
			if( transition == handled_transition.transition_trigger )
			{
				writeToFile("DEBUG: handled_transition.required_states= "
					+ handled_transition.required_states);
				// If so, does the current state of the app match
				// the state required to handle this transition?
				var is_states_match = true;
				for( s in handled_transition.required_states )
				{
					var state_required = 
						handled_transition.required_states[s];
					writeToFile("DEBUG: state_required= "+state_required);
					if( ! isState( state_required ))
					{
						writeToFile("DEBUG: false");
						is_states_match = false;
					}
				}
				// If so, then execute the transition handler.
				if( is_states_match )
				{
					writeToFile("DEBUG: handler called= "
						+ handled_transition.handler);
					eval( handled_transition.handler );
					break;
				}
			}
		}
		++index;
	}
	States.currentTransitions.length = 0;
}

function HandledStateTransition.pegsFilledHandler(side)
{
	if( the_view_frame.pegsReady )
	{
		the_view_frame.pegsReady();
	}
	else
		writeToFile("ERROR: invalid state. !the_view_frame.pegsReady")
	if( "Right" == side )
	{
		States.setState("RightPegsReady");
		States.resetState("LeftPegsReady");
	}	
	else if( "Left" == side )
	{
		States.resetState("RightPegsReady");
		States.setState("LeftPegsReady");
	}	
	else
		writeToFile("ERROR: pegsFilledHandler invalid argument: "+side);
}
function HandledStateTransition.pegsFilledHandlerRight()
{
	HandledStateTransition.pegsFilledHandler("Right");
}
function HandledStateTransition.pegsFilledHandlerLeft()
{
	HandledStateTransition.pegsFilledHandler("Left");
}

function HandledStateTransition.insertPegHandler()
{
	writeToFile("DEBUG: Entered insertPegHandler()");
	// tell the other frame if a peg just went in
	for(i=1; i<17; ++i)
	{
		if (pegIsIn(i))
		{
			writeToFile("DEBUG: "+i+" peg is in.");
			if( the_view_frame.pegIn )
			{
				the_view_frame.pegIn(i);
			}
			else
				writeToFile(
					"ERROR: invalid state. !parent.frames[viewframe].pegIn");
		}
		else
			writeToFile("DEBUG: "+i+" peg not in.");
	}
}
function HandledStateTransition.waitingToStartHandler(side)
{
	writeToFile("DEBUG: Entered waitingToStartHandler("+side+")");
	if( "Right" == side )
	{
		the_view_frame.startRight();
		States.resetState("WaitingToStartRight");
	}
	else if( "Left" == side )
	{
		the_view_frame.startLeft();
		States.resetState("WaitingToStartLeft");
	}
	else
		writeToFile("ERROR: waitingToStartHandler invalid argument.");
}
function HandledStateTransition.waitingToStartRightHandler()
{
	HandledStateTransition.waitingToStartHandler("Right")
}
function HandledStateTransition.waitingToStartLeftHandler()
{
	HandledStateTransition.waitingToStartHandler("Left")
}

