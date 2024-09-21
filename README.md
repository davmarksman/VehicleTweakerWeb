# VehicleTweakerWeb



This is a great mod but instructions are not clear (no offence intended).

Here's my set of instructions for it

1. VERY IMPORTANT: YOU NEED TO EDIT A TEXT FILE

2. How to locate the text file: 
Check here to find the mod directory:
https://www.transportfever2.com/wiki/doku.php?id=gamemanual:gamefilelocations#overview

Then it's 
Steam:   /2668633703/res/scripts/wkvt_settings.lua
Downloaded: /wk_vehicle_tweaker_1/res/scripts/wkvt_settings.lua

3. Open the file in a text editor

4. Edit away (See next section)

5. Enable the mod in your save/game

6. Changes are applied on a load


Editing (Mods from steam)
To find the mod to edit:
1. look up the vehicle mod on the steam workshop. E.g.:
https://steamcommunity.com/sharedfiles/filedetails/?id=2801716013
2. Grab the numbers that come after the id=   E.g. 2801716013
3. Use that as the search term
```
availability = {
	{'2801716013', 1985, 2000}, -- Change Wright Streetdeck Lothian Pack to have a start date of 1985 and an end date of 2000
},
```
4. Editing models is a bit more tricky as you have to find the right model file. They are normally located somewhere within \res\models\model\vehicle\ in the mod folder
To check the model is correct open it in text editor and search for "description"
You can then add an entry with the file name of that file
```
	loadSpeed = {
		{'maikc_superliner_group.mdl', 2},
	},
```






Examples:
I want to hide a vehicles from the vehicles menu to decluter the interface
I want to change the start date
I want to change the end date

```
	availability = {
		-- {'example_model', 1910, 1960},
		-- {'my_example_modpack_1', 1985, 0},
		{'2715183358', 1985, 2000}, -- Change to 1985 - 2000
		{'2828249234', 1985, -1},  -- Change start date to 1985 but keep end date unchanged
		{'2755307705', 0, 0},  -- Availabilty for the entire duration of the game
		{'2754715053', 2000, 2000 },  -- Hide from menu by making end date lower than your current in game date or setting start and end to same date. Useful for decluttering the interface
	},
```
I want to change the capacity of a Vehicle
```
capacity = {
	-- Examples from document
	-- {'example_model', 40, 'MACHINES'}, -- Change Machines capacity to 40
	-- {'example_model', 0, 'TOOLS'}, -- Exclude tools cargo type
	-- {'my_example_modpack_1', 28},
	-- {'my_example_modpack_1', '.25'}, -- Multiply capacity by amount
	{'2740537310', 124, 'PASSENGERS'},  -- Change passengers of Wright Streetdeck to 31 (Passengers are divided by 4 by the base game)
},
```
I want to change the speed of a vehicle (speed is in km/h)
```
speed = {
	{'1953998936', 194},
},
```


@WernerK feel free to add this to the description. And danke for a wonder mod