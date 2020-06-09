const request = require("request");

// const forecast = (latitude, longitude, callback) => {
// 	const url = `http://api.weatherstack.com/current?access_key=9a7287b244321b72a8ddd53b670924c4&query=${latitude},${longitude}&units=f`;
// 	request({ url, json: true }, (error, { body }) => {
// 		if (error) {
// 			callback('Unable to connect to forecast services', undefined)
// 		} else if (body.error) {
// 			callback('Unable to find location, try another search', undefined);
// 		} else {
// 			callback(undefined, {
// 				current: body.current.temperature,
// 				feelslike: body.current.feelslike,
// 			})
// 		}
// 	});
// };

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=9a7287b244321b72a8ddd53b670924c4&query=${latitude},${longitude}`;


	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined)
		} else if (body.error) {
			callback('Unable to find location', undefined)
		} else {
			callback(undefined, `Current temperature is ${body.current.temperature} degrees and it is feels like ${body.current.feelslike} degrees`)
		}
	})
}


module.exports = forecast;