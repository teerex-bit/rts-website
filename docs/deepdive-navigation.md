# Deep Dive navigation

Every reading screen has a Previous control; the welcome screen links back to the public website. The opening screens of See Clearly, Become, and Join now return to the preceding section.

Screen navigation uses semantic URL fragments and the browser History API. Browser Back and Forward follow screens visited in that tab. An explicitly opened screen address takes precedence over saved progress; the generic /deepdive/ address still restores the browser's saved screen. Refreshing retains the addressed screen. Reflection answers remain browser-local and never appear in addresses or history state. Standard browser behavior is preserved at the first entry: Back may leave the journey; Previous always offers the preceding reading screen.

Verification: six navigation checks, nine reflection regression checks, and all 127 existing website checks passed. Independent review found no blocking issues. Development-only navigation tests run with jsdom available: RTS_JSDOM_MODULE=/absolute/path/to/jsdom node --test validation/deepdive-navigation.cjs.
