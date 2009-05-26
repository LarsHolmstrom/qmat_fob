
/*******************************************************
* CONSTANTS.JS
*******************************************************/

// minimum amount of free space on disk to comlete tests (mb)
MIN_DISK_SPACE				= 20;

// general max time without activity before aborting session  (msecs)
INACTIVITY_TIMEOUT			= 60 * 60 * 1000;

// length of time to complete one round of the reaction or other untimed test.  (msecs)
TEST_TIMEOUT				= 2 * 60 * 1000;
// length of time to complete one round of the peg test
PEG_TIMEOUT					= TEST_TIMEOUT;
// length of time to complete one round of the reaction test
REACTION_TIMEOUT			= TEST_TIMEOUT;
// length of time to complete one round of the tap test
TAP_TIMEOUT					= 20000;
// length of time to complete one round of the keyboard test
KEY_TIMEOUT					= 30000;

// fixed time to say "ahh" (in SECONDS)
VOICE_AHH_FIXED_TIMEOUT		= 35;
// fixed time to describe picture (in SECONDS)
VOICE_TALK_FIXED_TIMEOUT	= 30;

// length of time in between activities (msecs)
ACTIVITY_SPACING_TIME		= 5000;
// time to wait for "get ready" audio to play (msecs)
GET_READY_DELAY				= 3000;
// time to wait for "wait for the tone get ready" audio to play (msecs)
WAIT_GET_READY_DELAY		= 5000;

// number of times a reaction test beeps
NUM_REACTION_BEEPS 			= 10;
// Min number of milliseconds between reaction time beeps (msecs)
REACTION_BEEP_MIN_MSEC		= 2000;
// Max number of milliseconds between reaction time beeps (msecs)
REACTION_BEEP_MAX_MSEC		= 6000;

