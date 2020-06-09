const hbs = require('hbs');
const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
 
app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.use(express.static(publicDirectoryPath));

hbs.registerPartials(partialsPath);

app.get('/weather', (req, res) => {
	const address = req.query.address;

	if (!address) {
		return res.send({
			error: 'You must provide address'
		})
	}

	geocode(address, (error, {latitude, longitude, location} = {}) => {
		if (error) {
			return console.log(error);
		} 
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return console.log(error);
			}
			res.send({
				address,
				location,
				forecastData
			});
		})
	});
});

app.get('', (req, res) => {
	res.render('index', {
		title: "Weather",
		name: "John Connor"
	})
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: "About Me",
		name: "John Connor"
	})
});

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'This is some helpfull text',
		title: "Help",
		name: "John Connor"
	})
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		})
	}
	
	res.send({
		prosucts: []
	})
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: "404",
		errorMessage: "Help article not found",
		name: "John Connor"
	})
});

app.get('*', (req, res) => {
	res.render("404", {
		title: "404",
		errorMessage: "Page not found",
		name: "John Connor"
	})
});

app.listen(3000, () => {
	console.log('The server is running on localhost: 3000');
});