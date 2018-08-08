const FeatureWeather = (temp, cond, condDescription, wind) => {
  temp = Number(temp);
  wind = Number(wind);

  let featureObject = {};

  // Switch on condition affecting overall music features
  switch (cond) {
    case ('Clear') :
      featureObject.target_valence = 0.8;
      featureObject.mode = 1;
      featureObject.target_energy = 0.65;
      console.log('set CLEAR');
      break;
    case ('Clouds') :
      featureObject.target_valence = 0.5;
      featureObject.mode = 0;
      featureObject.target_energy = 0.4;
      console.log('set CLOUDS');
      break;
    case ('Atmosphere') :
      featureObject.target_valence = 0.3;
      featureObject.mode = 0;
      featureObject.target_energy = 0.3;
      console.log('set ATM');
      break;
    case ('Snow') :
      featureObject.target_valence = 0.7;
      featureObject.mode = 1;
      featureObject.max_instrumentalness = 0.75;
      featureObject.max_energy = 0.3;
      console.log('set SNOW');
      break;
    case ('Rain') :
      featureObject.target_valence = 0.3;
      featureObject.max_mode = 0;
      featureObject.max_energy = 0.5;
      console.log('set RAIN');
      break;
    case ('Drizzle') :
      featureObject.target_valence = 0.4;
      featureObject.mode = 0;
      featureObject.max_energy = 0.4;
      console.log('set DRZL');
      break;
    case ('Thunderstorm') :
      featureObject.target_valence = 0.2;
      featureObject.mode = 0;
      featureObject.max_energy = 0.7;
      console.log('set TSTORM');
      break;
    default :
      featureObject.target_valence = 0.6;
      featureObject.mode = 1;
      featureObject.target_energy = 0.5;
      console.log('set DEFAULT CONDITION');
  }
/*
  // Switch on temperature affecting danceability
  switch (true) {
    case (temp < -30) :
      featureObject.target_danceability = 0.2;
      console.log('set TEMP -30');
      break;
    case (temp < -15) :
      featureObject.target_danceability = 0.3;
      console.log('set TEMP -15');
      break;
    case (temp < -5) :
      featureObject.target_danceability = 0.4;
      console.log('set TEMP -5');
      break;
    case (temp < 5) :
      featureObject.target_danceability = 0.5;
      console.log('set TEMP 5');
      break;
    case (temp < 15) :
      featureObject.target_danceability = 0.6;
      console.log('set TEMP 15');
      break;
    case (temp < 25) :
      featureObject.target_danceability = 0.7;
      console.log('set TEMP 25');
      break;
    case (temp < 35) :
      featureObject.target_danceability = 0.8;
      console.log('set TEMP 35');
      break;
    default :
      featureObject.target_danceability = 0.8;
      console.log('set DEFAULT TEMP');
  }*/

  // Switch on wind affecting energy
  switch (true) {
    case (wind < 0.3) :
      featureObject.target_energy += 0;
      console.log('set WIND 0.3');
      break;
    case (wind < 1.5) :
      featureObject.target_energy += 0.025;
      console.log('set WIND 1.5');
      break;
    case (wind < 3.3) :
      featureObject.target_energy += 0.05;
      console.log('set WIND 3.3');
      break;
    case (wind < 5.5) :
      featureObject.target_energy += 0.075;
      console.log('set WIND 5.5');
      break;
    case (wind < 10.7) :
      featureObject.target_energy += 0.1;
      console.log('set WIND 10.7');
      break;
    case (wind < 15) :
      featureObject.target_energy += 0.2;
      console.log('set WIND 15');
      break;
    case (wind < 25) :
      featureObject.target_energy += 0.2;
      console.log('set WIND 25');
      break;
    default :
      console.log('set DEFAULT WIND');
  }

  return featureObject;
};

const spotifyGenres = [
  "acoustic",
  "alternative",
  "ambient",
  "blues",
  "chill",
  "classical",
  "club",
  "country",
  "dance",
  "deep-house",
  "disco",
  "dubstep",
  "edm",
  "electronic",
  "folk",
  "french",
  "funk",
  "guitar",
  "happy",
  "hip-hop",
  "house",
  "indie",
  "indie-pop",
  "jazz",
  "k-pop",
  "latin",
  "movies",
  "party",
  "piano",
  "punk",
  "r-n-b",
  "rainy-day",
  "road-trip",
  "rock",
  "romance",
  "sad",
  "soul",
  "study",
  "summer",
  "trance",
  "work-out",
];

export { FeatureWeather, spotifyGenres }

