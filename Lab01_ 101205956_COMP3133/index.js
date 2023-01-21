const fs = require("fs")
const csv = require('csv-parser')
const results = []

const canada = "canada.txt"
const usa = "usa.txt"
const countries = "input_countries.csv"

const readCountries = fs.createReadStream(countries)

if (fs.existsSync(canada)) {
    fs.unlinkSync(canada)
} else {
    let writeCanada = fs.createWriteStream(canada)
    readCountries
        .pipe(csv())
        .on('data', (data) => {
            results.push(data)
        })
        .on('error', (error) => console.log(error))
        .on('end', () => {
            let realResults = results.filter(function (a) {
                return a.country == 'Canada';
            });
            writeCanada.write(JSON.stringify(realResults))
        });
}

if (fs.existsSync(usa)) {
    fs.unlinkSync(usa)
} else {
    let writeUsa = fs.createWriteStream(usa)
    readCountries
        .pipe(csv())
        .on('data', (data) => {
            results.push(data)
        })
        .on('error', (error) => console.log(error))
        .on('end', () => {
            let realResults = results.filter(function (a) {
                return a.country == 'United States';
            });
            writeUsa.write(JSON.stringify(realResults))
        });
}
