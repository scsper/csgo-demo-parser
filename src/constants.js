// Demo messages, taken from https://github.com/ValveSoftware/csgo-demoinfo/blob/master/demoinfogo/demofile.h#L47-L71
export const DemoMessages = {
	// it's a startup message, process as fast as possible
  SIGN_ON: 1,

	// it's a normal network packet that we stored off
  PACKET: 2,

	// sync client clock to demo tick
  SYNC_TICK: 3,

  // console command
  CONSOLE_COMMAND: 4,

  // user command
  USER_COMMAND: 5,

  // network data tables
  DATA_TABLES: 6,

  // end of time.
  STOP: 7,

  // a blob of binary data understood by a callback function
  CUSTOM_DATA: 8,
  STRING_TABLES: 9,

  // equal to the last value in this object.  used for validation.
  LAST_COMMAND: 9
}
