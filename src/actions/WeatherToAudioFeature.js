const FeatureWeather = (temp, cond, condDescription, wind) => {
  temp = Number(temp);
  wind = Number(wind);

  let featureObject = {};

  // Switch on condition affecting overall music features
  switch (cond) {
    case ('Clear') :
      featureObject.min_valence = 0.6;
      featureObject.mode = 1;
      featureObject.min_energy = 0.6;
      console.log('set CLEAR');
      break;
    case ('Clouds') :
      switch (condDescription) {
        case ('few clouds') :
          featureObject.min_valence = 0.6;
          featureObject.min_energy = 0.6;
          console.log('set few clouds');
          break;
        case ('scattered clouds') :
          featureObject.max_valence = 0.8;
          featureObject.max_energy = 0.6;
          console.log('set scattered clouds');
          break;
        case ('broken clouds') :
          featureObject.max_valence = 0.7;
          featureObject.max_energy = 0.6;
          console.log('set broken clouds');
          break;
        case ('overcast clouds') :
          featureObject.max_valence = 0.5;
          featureObject.max_energy = 0.6;
          console.log('set overcast cloudsS');
          break;
      }
      break;
    case ('Atmosphere') :
      featureObject.max_valence = 0.5;
      featureObject.mode = 0;
      featureObject.max_energy = 0.5;
      console.log('set ATM');
      break;
    case ('Snow') :
      featureObject.min_valence = 0.55;
      featureObject.mode = 1;
      featureObject.max_energy = 0.5;
      console.log('set SNOW');
      break;
    case ('Rain') :
      featureObject.max_valence = 0.4;
      featureObject.max_energy = 0.4;
      console.log('set RAIN');
      break;
    case ('Drizzle') :
      featureObject.max_valence = 0.55;
      featureObject.max_energy = 0.55;
      console.log('set DRZL');
      break;
    case ('Thunderstorm') :
      featureObject.max_valence = 0.5;
      featureObject.max_energy = 0.7;
      console.log('set TSTORM');
      break;
    default :
      featureObject.max_valence = 0.7;
      featureObject.max_energy = 0.7;
      console.log('set DEFAULT CONDITION');
  }

  // Switch on wind affecting energy
  switch (true) {
    case (wind < 0.3) :
      featureObject.max_energy += 0;
      console.log('set WIND 0.3');
      break;
    case (wind < 1.5) :
      featureObject.max_energy += 0.025;
      console.log('set WIND 1.5');
      break;
    case (wind < 3.3) :
      featureObject.max_energy += 0.05;
      console.log('set WIND 3.3');
      break;
    case (wind < 5.5) :
      featureObject.max_energy += 0.075;
      console.log('set WIND 5.5');
      break;
    case (wind < 10.7) :
      featureObject.max_energy += 0.1;
      console.log('set WIND 10.7');
      break;
    case (wind < 15) :
      featureObject.max_energy += 0.2;
      console.log('set WIND 15');
      break;
    case (wind < 25) :
      featureObject.max_energy += 0.2;
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
  "chill",
  "classical",
  "club",
  "country",
  "dance",
  "deep-house",
  "disco",
  "edm",
  "electronic",
  "folk",
  "french",
  "funk",
  "happy",
  "hip-hop",
  "house",
  "indie-pop",
  "jazz",
  "k-pop",
  "latin",
  "movies",
  "party",
  "pop",
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
  "work-out",
];

module.exports = { FeatureWeather, spotifyGenres };

