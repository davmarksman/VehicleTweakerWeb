export function toLuaConfigFile(configContents) {
  let sections = {}
  for (const [key, value] of Object.entries(configContents)) {
      console.log(key, value);
      sections[key] = sectionToString(value);
  }
  console.log("Hellow");
  let str = `-- Purpose of this configuration file is to be changed individually. It may be freely distributed as a separate file in connection with Transport Fever 2 savegames.
-- Zweck dieser Konfigurationsdatei ist es, individuell geändert zu werden. Sie darf als separate Datei in Verbindung mit Transport Fever 2 Savegames frei verbreitet werden.

-- As 'search term' apply distinct mod or model file names or directories (for Steam: workshop ID) respective character strings occurring within them.
-- Wildcards are rarely required and only occasionally within a search term. The typical Lua spelling applies:
-- . single character .* character string. The dot as such is written as %. ! For more see www.lua.org/pil/20.2.html.
-- Als 'Suchbegriff' gelten sind eindeutige Mod- oder Modell-Dateinamen oder -verzeichnisse (für Steam: Workshop-ID) bzw. darin vorkommende Zeichenketten.
-- Platzhalter werden selten und nur gelegentlich innerhalb eines Suchbegriffs benötigt. Es gilt die typische Lua-Schreibweise:
-- . einzelnes Zeichen .* Zeichenkette. Der Punkt als solcher wird %. geschrieben! Weiteres siehe www.lua.org/pil/20.2.html.
return {
	-- Enter search term and the specific top speed in km/h:*
	-- Trage* Suchbegriff und die spezifische Höchstgeschwindigkeit in km/h ein:
	speed = {
        ${sections['speed']}
	},

	-- Enter search term, first and last year of availability.* -1 as the respective year stands for 'unchanged'.
	-- For general availability, enter 0 for the beginning and end year in each case, for infinite availability only at the end year:
	-- Trage* Suchbegriff, erstes und letztes Jahr der Verfügbarkeit ein. -1 als jeweilige Jahreszahl steht für 'unverändert'.
	-- Für generelle Verfügbarkeit trage für Anfangs- und Endjahr jeweils 0 ein, für unendliche Verfügbarkeit nur beim Endjahr:
	availability = {
        ${sections['availability']}
	},

	-- Enter search term, real (!) capacity and cargo type (optional).* Enter capacity 0 to exclude a cargo type.
	-- If you put the capacity in quotation marks, the original capacity will be multiplied by this value (up to a maximum of 10).
	-- Decimal values < 1 (with dot) can be used to reduce the original capacity:
	-- Trage* Suchbegriff, reale (!) Kapazität und Ladegut (optional) ein.* Trage Kapazität 0 ein, um ein Ladegut auszuschliessen.
	-- Wenn du die Kapazität in Anführungszeichen setzt, wird die ursprüngliche Kapazität mit diesem Wert (bis maximal 10) multipliziert.
	-- Dezimalwerte < 1 (mit Punkt) können benutzt werden, um die ursprüngliche Kapazität zu reduzieren:
	capacity = {
        ${sections['capacity']}
	},

	-- Enter search term and the load speed, usually a factor up to approx. 20, proportional e.g. to the number of doors:*
	-- Trage* Suchbegriff und die Ladegeschwindigkeit, meistens ein Faktor bis ca. 20, proportional z.B. zur Anzahl Türen, ein:
	loadSpeed = {
        ${sections['loadSpeed']}
	},

	-- Enter search term and the specific power in kW and the tractive effort in kN (optional, only for land vehicles).*
	-- For aircraft, always specify the idle AND maximum thrust in N instead:
	-- Trage* Suchbegriff und die spezifische Leistung in kW und die Anfahrzugkraft in kN (optional, nur für Landfahrzeuge) ein.
	-- Für Flugzeuge stattdessen stets Leerlauf- UND Maximalschub in N angeben:
	power = {
        ${sections['power']}
	},

	-- Enter search term and the weight in t*:
	-- Trage* Suchbegriff und das Gewicht in t ein:
	weight = {
        ${sections['weight']}
	},

	-- Enter search term and the purchase price.*
	-- To activate automatic price calculation, set the price to -1:
	-- Trage* Suchbegriff und den Kaufpreis ein.
	-- Setze den Preis auf -1, um die automatische Preiskalkulation zu aktivieren:
	price = {
        ${sections['price']}
	},

	-- The same for the running costs ...
	-- Dasselbe für die laufenden Kosten ...
	runningCosts = {
	},

	-- ... and for the lifespan in years. Decimal values (with dot) are allowed, too:
	-- ... und für die Lebensdauer in Jahren. Auch Dezimalwerte (mit Punkt) sind erlaubt:
	lifespan = {
        ${sections['lifespan']}
	},

	-- Enter search term and 'true' or 'false' (without quotation marks) for push-pull/reversible trains:
	-- Trage* Suchbegriff und 'true' oder 'false' (ohne Anführungszeichen) für Wende-/Pendelzüge ein:
	reversible = {
        ${sections['reversible']}
	},

	-- *) as in the example, but without dashes at the beginning
	-- *) wie im Beispiel, jedoch ohne Striche am Anfang
}

-- Don't remove - Nicht entfernen: wkvt1.3`

    return str;
}

function sectionToString(vals) {
  let sectionStr = ''
  for (let index = 0; index < vals.length; index++) {
    const element = vals[index]
    let lineStr = JSON.stringify(element)
      .replaceAll('"', "'")
      .replaceAll(',', ', ')
      .replace('[', '{')
      .replace(']', '}')
    sectionStr = sectionStr + `\n\t\t${lineStr},`
  }
  return sectionStr;
}

export function readConfigFile(data) {
  let configContents = []
  let section = ''
  let lines = data.split(/\r?\n|\r|\n/g)

  for (let i = 0; i < lines.length; i++) {
    const element = lines[i]
    if (element.trim().startsWith('--')) {
      console.log('Skip')
      continue
    }

    if (element.includes('= {')) {
      console.log(element)
      section = element.match(/([\w\-]+)/)[0]
      console.log(section)
      configContents[section] = []
    } else if (element.trim() === '},') {
      section = ''
      console.log('end of section')
    } else {
      let braces = element.match(/\{(.+)\}/)
      if (braces && braces.length && braces.length > 1) {
        console.log(braces)
        let jsonStr = '[' + braces[1].replaceAll("'", '"') + ']'
        console.log(jsonStr)
        let vals = JSON.parse(jsonStr)
        console.log(vals)
        configContents[section].push(vals)
      }
    }
  }

  return configContents;
}