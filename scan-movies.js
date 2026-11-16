const fs = require('fs');
const path = require('path');

const moviesDir = path.join(__dirname, 'movie files'); // Palitan mo ng pangalan ng iyong movie folder kung iba
const extensions = ['.mp4', '.mkv', '.webm'];

function scanMovies(dir, fileList = []) {
    if (!fs.existsSync(dir)) {
        console.log(`⚠️ Folder na "${dir}" ay hindi makita. Gumagawa ng sample entry...`);
        return [];
    }
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            scanMovies(filePath, fileList);
        } else if (extensions.includes(path.extname(file).toLowerCase())) {
            fileList.push({
                id: fileList.length + 1,
                name: path.basename(file, path.extname(file)),
                url: path.relative(__dirname, filePath).replace(/\\/g, '/')
            });
        }
    });
    return fileList;
}

console.log("🔍 Sinascan ang movies folder...");
const movies = scanMovies(moviesDir);
fs.writeFileSync(path.join(__dirname, 'movies.json'), JSON.stringify(movies, null, 2), 'utf-8');
console.log(`✅ Tagumpay! Na-scan at nai-save ang ${movies.length} na pelikula sa movies.json`);