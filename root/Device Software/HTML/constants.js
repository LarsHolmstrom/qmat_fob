
/*******************************************************
* CONSTANTS.JS
*******************************************************/

// minimum amount of free space on disk to comlete tests (mb)
MIN_DISK_SPACE				= 10;

// general max time without activity before aborting session  (msecs)
INACTIVITY_TIMEOUT			= 60 * 60 * 1000;

// length of time to complete one round of the reaction or other untimed test.  (msecs)
TEST_TIMEOUT				= 2 * 60 * 1000;
//TEST_TIMEOUT                = 60;
// length of time to complete one round of the peg test
PEG_TIMEOUT					= TEST_TIMEOUT;
// length of time to complete one round of the reaction test
REACTION_TIMEOUT			= TEST_TIMEOUT;
// length of time to complete one round of the tap test
TAP_TIMEOUT					= 30000;
//TAP_TIMEOUT                 = 60;
// length of time to complete one round of the keyboard test
KEY_TIMEOUT					= 20000;
//KEY_TIMEOUT                 = 60;

// fixed time to say "ahh" (in SECONDS), also used for DDK tests.
VOICE_AHH_FIXED_TIMEOUT		= 12;
// fixed time to read first two passages (in SECONDS)
VOICE_TALK_FIXED_TIMEOUT	= 50;
// fixed time to read last passage (in SECONDS)
VOICE_TALK_FIXED_TIMEOUT_2    = 60;
//VOICE_TALK_FIXED_TIMEOUT    = 10;
// length of time to complete one round of the foot tapping test (in SECONDS)
FOOT_TIMEOUT                = 30;
//FOOT_TIMEOUT                = 10;

// length of time in between activities (msecs)
ACTIVITY_SPACING_TIME		= 2000;
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

// If this is set to true, then video instructions are automatically
// started at the beginning of each test. In either case, the subject
// has the opportunity to (re)view the video instructions.
AUTO_INSTRUCTIONS           = true;

// If this is set to true, then the question page asking about the user's
// identity is displayed.
AT_HOME                     = false;
