// holds all the content that will be hiding under the cards
var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];
// empty array for storing memory values
var memory_values = [];

// empty array that stores memory tile ids
var memory_tile_ids = [];

// keeps track of how many tiles are flipped
var tiles_flipped = 0;

// add a shuffle method to all the array object, since js does not have a shuffle method we improvise

Array.prototype.memory_tile_shuffle = function () {

	
	var i = this.length, j, temp;
	while(--i > 0){
		
      j = Math.floor(Math.random () * (i+1))
      temp = this[j];
      this[j] = this[i];
      this[i] = temp;
	}
}

// function for generating a new board

function newBoard () {

	// each time a new board is generated let the tiles_flipped be 0
	tiles_flipped = 0;
	var output = '';
	// we run the memory tile shuffle method on the memory_array
	// you run this one line whenever you want to shuffle the array
	memory_array.memory_tile_shuffle();
	for(var i=0; i < memory_array.length; i++){

		// this represents the actual div that is being clicked memory_array[i] represents the content within the array element
       // each little div gets an id of a dynamic tile number
       output += '<div id="tile_' +i+ '" onclick ="memoryFlipTile(this, \''+memory_array[i]+'\')"></div>';
	}
	document.getElementById('memory_board').innerHTML = output;
}

window.addEventListener('load', newBoard);

function memoryFlipTile(tile, val){
	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.style.background = '#fff';
		tile.innerHTML = val;

		if(memory_values.length == 0){
			// push val into the memory values array
			memory_values.push(val);
			// push the tile id into the memory tile ids array
			memory_tile_ids.push(tile.id);
            }
			// this little condition is set in place to check if both cards are matched
            else if( memory_values.length ==1){
            	memory_values.push(val);
            	memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				tiles_flipped += 2;

				// clear both arrays

				memory_values = [];
				memory_tile_ids = [];

				// check to see if the whole board is cleared

				if(tiles_flipped == memory_array.length){
                   alert("Board cleared...generating new board");
                   document.getElementById('memory_board').innerHTML = "";
                   newBoard();
				}
			}
              // this little condition is set in place to check if both cards are not matched
			else{
				function flip2Back (){
					// flip the two tiles back over
					var tile_1 =  document.getElementById(memory_tile_ids[0]);
					var tile_2 =  document.getElementById(memory_tile_ids[1]);
					tile_1.style.background = 'url(download.jpg) no-repeat';
					tile_1.innerHTML = "";
					tile_2.style.background = 'url(download.jpg) no-repeat';
					tile_2.innerHTML = "";
					// clear both arrays

				memory_values = [];
				memory_tile_ids = [];

				}

				setTimeout(flip2Back, 700);
			}
         
		}
	}

}




