
var the_script_frame = parent.frames["scriptframe"];

function writeToFile(l) 
{
	if (useragent.indexOf("Windows NT") != -1)  // if we're on windows XP/NT (not the device)
	{
		try {
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

function Audio()
{
}
new Audio();

Audio.is_running = false;

function Audio.start(wav)
{ 
	writeToFile("DEBUG: Entered Audio.start("+wav+")");
	the_script_frame.Kinetics.CancelAudioPlay(); 
	the_script_frame.Kinetics.AudioPlay(wav);
	Audio.is_running = true; 
}
function Audio.stop()
{
	writeToFile("DEBUG: Entered Audio.stop()");
	the_script_frame.Kinetics.CancelAudioPlay(); 
	Audio.is_running = false; 
}
function Audio.isRunning()
{ 
	writeToFile("DEBUG: Entered Audio.isRunning(): "+Audio.is_running);
	return Audio.is_running; 
}
function Audio.stopEvent()
{
	Audio.is_running = false; 
}


