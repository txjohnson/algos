
const ui = {
    button: document.querySelector('#command'),
    board: document.querySelector('#board'),
};

const images = [
	'images/animal_bird_100.png',
	'images/animal_bunny_100.png',
	'images/animal_cat_100.png',
	'images/animal_dog_100.png',
	'images/animal_duck_100.png',
	'images/animal_ferret_100.png',
	'images/animal_fish_100.png',
	'images/animal_gecko_100.png',
	'images/animal_snake_100.png',
	'images/animal_turtle_100.png',
	'images/food_apple_100.png',
	'images/food_banana_100.png',
	'images/food_burger_100.png',
	'images/food_carrot_100.png',
	'images/food_celery_100.png',
	'images/food_cherry_100.png',
	'images/food_corn_100.png',
	'images/food_cucumber_100.png',
	'images/food_eggs_100.png',
	'images/food_fries_100.png',
	'images/food_grapefruit_100.png',
	'images/food_grapes_100.png',
	'images/food_greenpepper_100.png',
	'images/food_lemon_100.png',
	'images/food_milkshake_100.png',
	'images/food_mushroom_100.png',
	'images/food_onion_100.png',
	'images/food_onionrings_100.png',
	'images/food_orange_100.png',
	'images/food_pancakes_100.png',
	'images/food_peapod_100.png',
	'images/food_pear_100.png',
	'images/food_pineapple_100.png',
	'images/food_pizza_100.png',
	'images/food_potato_100.png',
	'images/food_pumpkin_100.png',
	'images/food_sandwich_100.png',
	'images/food_soda_100.png',
	'images/food_soup_100.png',
	'images/food_steak_100.png',
	'images/food_strawberry_100.png',
	'images/food_tomato_100.png',
	'images/food_turkey_100.png',
	'images/food_waffles_100.png',
	'images/food_watermelon_100.png',
	'images/icon_ambulance_100.png',
	'images/icon_bus_100.png',
	'images/icon_car_100.png',
	'images/icon_helicopter_100.png',
	'images/icon_motorcycle_100.png',
	'images/icon_plane_100.png',
	'images/icon_police_car_100.png',
	'images/icon_ship_100.png',
	'images/icon_subway_100.png',
	'images/icon_train_100.png',
	'images/pastry_cookie01@2x.png',
	'images/pastry_cookie02@2x.png',
	'images/pastry_croissant@2x.png',
	'images/pastry_cupcake@2x.png',
	'images/pastry_donut@2x.png',
	'images/pastry_eclair@2x.png',
	'images/pastry_macaroon@2x.png',
	'images/pastry_pie@2x.png',
	'images/pastry_poptart01@2x.png',
	'images/pastry_poptart02@2x.png',
	'images/pastry_starcookie01@2x.png',
	'images/pastry_starcookie02@2x.png',
	'images/sport_baseball_100.png',
	'images/sport_basketball_100.png',
	'images/sport_boxing_100.png',
	'images/sport_football_100.png',
	'images/sport_hockey_100.png',
	'images/sport_skiing_100.png',
	'images/sport_soccer_100.png',
	'images/sport_swimming_100.png',
	'images/sport_tennis_100.png',
	'images/sport_volleyball_100.png'
];


function onCommand () {
    if (ui.button.innerHTML === 'Start') {
        play ();
    }

    else if (ui.button.innerHTML === 'Pause') {
        pause();
    }

    else {
        resume ();
    }
}

function play() {
    setupGame ();
    resume ();
}

function pause () {
    ui.button.innerHTML = 'Resume';
}

function resume () {
    ui.button.innerHTML = 'Pause';
}

function setupGame () {
    drawCards (6, 3);
}

function drawCards (width, height) {
    const total = width * height;
    const num_pics = total / 2;

	let picks = interleave (shuffle(num_pics), shuffle(num_pics));

    // for (let i = 0; i < num_pics; i++) {
    //     picks .push (i);
    //     picks .push (i);
    // }

	const cards = `
	<div id="board" style="grid-template-columns: repeat(${width}, auto")>
		${picks .map(item => `
			<div class
			  ="card" data-index="${item}">
			<div class="card-front"></div>
			<div class="card-back"><img src="${images[item]}"/></div>
			</div>
		`).join('')}
	</div>
	`;

    ui.board.innerHTML = cards;
}

function shuffle(howmany) {
	let list = [];

	while (list.length < howmany) {
		const r = Math.floor(Math.random () * howmany);

		if (list.indexOf(r) === -1) {
			list .push (r);
		}
	}

	return list;
}

function interleave (l1, l2) {
	let combined = [];

	for (let i = 0; i < l1.length; i++) {
		combined.push(l1[i]);
		combined.push(l2[i]);
	}

	return combined;
}