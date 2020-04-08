/*
Description: This takes the address that is passed in by the user
			 and cooks the address to match the format of that in the database by 
			 using regular expressions to shorten the string and replace words to 
			 their abbreviations. Accounts for both one or multiple cardinal directions,
			 as well as ordinal numbers.

Parameter(s):
	- rawAddress:The address to be cooked, inputed by user

Return(s): 
	- cookedAddress: address in the format of the database
 */
function cook_address_regex(rawAddress) {
  let cookedAddress = rawAddress;
  cookedAddress = cook_cardinals_and_miscellaneous(cookedAddress);
  cookedAddress = cook_ordinals(cookedAddress);
  return cookedAddress;
}

/*
Description: This takes the address that is passed in by the user 
			 and cooks cardinal directions to match the format of that in the database

Parameter(s):
	- cookedAddress: The address to be cooked, inputted by the user

Return(s):
	- cookedAddress: addres cooked into the format of the database
*/
function cook_cardinals_and_miscellaneous(cookedAddress) {
  //List containing all cardinal directions
  let cardinal = [" N ", " S ", " E ", " W ", "NORTH", "SOUTH", "EAST", "WEST"];

  let cardinalCounter = 0;

  for (
    let i = 0;
    i < cardinal.length;
    i++ // searches for each direction listed in "cardinal" array
  ) {
    // if a cardinal direction is found within the entered address string, increment the cardinal count
    if (cookedAddress.includes(cardinal[i])) {
      cardinalCounter = cardinalCounter + 1;
    }
  }

  // if address contains more than one cardinal direction
  if (cardinalCounter > 1) {
    //If there is one cardinal direction before the next
    cookedAddress = cookedAddress.replace(/NORTH EAST/g, "N EAST");
    cookedAddress = cookedAddress.replace(/SOUTH EAST/g, "S EAST");
    cookedAddress = cookedAddress.replace(/NORTH WEST/g, "N WEST");
    cookedAddress = cookedAddress.replace(/SOUTH WEST/g, "S WEST");

    cookedAddress = cookedAddress.replace(/EAST NORTH/g, "E NORTH");
    cookedAddress = cookedAddress.replace(/EAST SOUTH/g, "E SOUTH");
    cookedAddress = cookedAddress.replace(/WEST NORTH/g, "W NORTH");
    cookedAddress = cookedAddress.replace(/WEST SOUTH/g, "W SOUTH");

    //ODD CASES
    cookedAddress = cookedAddress.replace(/NORTH NORTH/g, "N NORTH");
    cookedAddress = cookedAddress.replace(/NORTH SOUTH/g, "N SOUTH");
    cookedAddress = cookedAddress.replace(/SOUTH NORTH/g, "S NORTH");
    cookedAddress = cookedAddress.replace(/SOUTH SOUTH/g, "S SOUTH");
    cookedAddress = cookedAddress.replace(/EAST EAST/g, "E EAST");
    cookedAddress = cookedAddress.replace(/EAST WEST/g, "E WEST");
    cookedAddress = cookedAddress.replace(/WEST WEST/g, "W WEST");
    cookedAddress = cookedAddress.replace(/WEST EAST/g, "W EAST");
  }

  // if address contains 1 or 0 cardinal directions
  // Note: an address with 0 directions will make 0 replacements
  else {
    // Handle cardinal direction abbreviations
    cookedAddress = cookedAddress.replace(/EAST/g, "E");
    cookedAddress = cookedAddress.replace(/WEST/g, "W");
    cookedAddress = cookedAddress.replace(/NORTH/g, "N");
    cookedAddress = cookedAddress.replace(/SOUTH/g, "S");
    cookedAddress = cookedAddress.replace(/NORTHEAST/g, "NE");
    cookedAddress = cookedAddress.replace(/SOUTHEAST/g, "SE");
    cookedAddress = cookedAddress.replace(/NORTHWEST/g, "NW");
    cookedAddress = cookedAddress.replace(/SOUTHWEST/g, "SW");
  }

  // Handle miscellanous abbreviations
  cookedAddress = cookedAddress.replace(/STREET/g, "ST");
  cookedAddress = cookedAddress.replace(/AVENUE/g, "AVE");
  cookedAddress = cookedAddress.replace(/BUILDING/g, "BLDG");
  cookedAddress = cookedAddress.replace(/APARTMENT/g, "APT");
  cookedAddress = cookedAddress.replace(/FLOOR/g, "FL");
  cookedAddress = cookedAddress.replace(/BOULEVARD/g, "BLVD"); //Added boulevard GG- 2/5/20
  cookedAddress = cookedAddress.replace(/NUMBER/g, "#"); //Added number GG- 2/19/20
  cookedAddress = cookedAddress.replace(/UPPER/g, "UPPR"); //Added upper GG - 2/19/20
  cookedAddress = cookedAddress.replace(/LOWER/g, "LOWR"); //Added lower GG - 2/19/20

  return cookedAddress;
}

/*
Description: This takes the address that is passed in by the user 
			 and cooks ordinals to match the format of that in the database

Parameter(s):
	- cookedAddress: The address with cooked cardinal directions

Return(s):
	- cookedAddress: address cooked with cardinal directions and ordinals matching
	  the format of that in the database
*/
function cook_ordinals(cookedAddress) {
  //Ordinal Numbers

  //Get rid of ands and hyphens
  cookedAddress = cookedAddress.replace(/AND/g, "");
  cookedAddress = cookedAddress.replace(/-/g, "");

  //Special Cases 1- Beginning Numbers
  cookedAddress = cookedAddress.replace(/FIRST/g, "1ST");
  cookedAddress = cookedAddress.replace(/SECOND/g, "2ND");
  cookedAddress = cookedAddress.replace(/THIRD/g, "3RD");
  cookedAddress = cookedAddress.replace(/FOURTH/g, "4TH");
  cookedAddress = cookedAddress.replace(/FIFTH/g, "5TH");
  cookedAddress = cookedAddress.replace(/SIXTH/g, "6TH");
  cookedAddress = cookedAddress.replace(/SEVENTH/g, "7TH");
  cookedAddress = cookedAddress.replace(/EIGHTH/g, "8TH");
  cookedAddress = cookedAddress.replace(/NINTH/g, "9TH");

  //Special Cases 2 - Teens
  cookedAddress = cookedAddress.replace(/ELEVENTH/g, "11TH");
  cookedAddress = cookedAddress.replace(/TWELFTH/g, "12TH");
  cookedAddress = cookedAddress.replace(/THIRTEENTH/g, "13TH");
  cookedAddress = cookedAddress.replace(/FOURTEENTH/g, "14TH");
  cookedAddress = cookedAddress.replace(/FIFTEENTH/g, "15TH");
  cookedAddress = cookedAddress.replace(/SIXTEENTH/g, "16TH");
  cookedAddress = cookedAddress.replace(/SEVENTEENTH/g, "17TH");
  cookedAddress = cookedAddress.replace(/EIGHTEENTH/g, "18TH");
  cookedAddress = cookedAddress.replace(/NINETEENTH/g, "19TH");

  //Special Cases 3 - Multiples of Ten
  cookedAddress = cookedAddress.replace(/TENTH/g, "10TH");
  cookedAddress = cookedAddress.replace(/TWENTIETH/g, "20TH");
  cookedAddress = cookedAddress.replace(/THIRTIETH/g, "30TH");
  cookedAddress = cookedAddress.replace(/FOURTIETH/g, "40TH");
  cookedAddress = cookedAddress.replace(/FIFTIETH/g, "50TH");
  cookedAddress = cookedAddress.replace(/SIXTIETH/g, "60TH");
  cookedAddress = cookedAddress.replace(/SEVENTIETH/g, "70TH");
  cookedAddress = cookedAddress.replace(/EIGHTIETH/g, "80TH");
  cookedAddress = cookedAddress.replace(/NINETIETH/g, "90TH");

  //Special Cases 4 - Multiple of Ten in 1st digit

  cookedAddress = cookedAddress.replace(/TWENTY/g, "2");
  cookedAddress = cookedAddress.replace(/THIRTY/g, "3");
  cookedAddress = cookedAddress.replace(/FORTY/g, "4");
  cookedAddress = cookedAddress.replace(/FIFTY/g, "5");
  cookedAddress = cookedAddress.replace(/SIXTY/g, "6");
  cookedAddress = cookedAddress.replace(/SEVENTY/g, "7");
  cookedAddress = cookedAddress.replace(/EIGHTYY/g, "8");
  cookedAddress = cookedAddress.replace(/NINETY/g, "9");

  //Hundredth- includes a space beforehand

  cookedAddress = cookedAddress.replace(/ HUNDREDTH /g, "00");

  //Hundred- delete, whatever number is beforehand will concat with whatever is beyond it.

  cookedAddress = cookedAddress.replace(/ HUNDRED /g, "");

  //Digits
  cookedAddress = cookedAddress.replace(/ONE/g, "1");
  cookedAddress = cookedAddress.replace(/TWO/g, "2");
  cookedAddress = cookedAddress.replace(/THREE/g, "3");
  cookedAddress = cookedAddress.replace(/FOUR/g, "4");
  cookedAddress = cookedAddress.replace(/FIVE/g, "5");
  cookedAddress = cookedAddress.replace(/SIX/g, "6");
  cookedAddress = cookedAddress.replace(/SEVEN/g, "7");
  cookedAddress = cookedAddress.replace(/EIGHT/g, "8");
  cookedAddress = cookedAddress.replace(/NINE/g, "9");

  return cookedAddress;
}
