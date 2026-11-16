const fs = require('fs');
const path = require('path');

// Nakatutok sa iyong 'song files' folder
const videoDir = path.join(__dirname, 'song files');
const outputFile = path.join(__dirname, 'songs.json');

function scanFolder(dir, baseDir = dir) {
    let results = [];
    if (!fs.existsSync(dir)) {
        console.log("⚠️ Walang nakitang 'song files' folder.");
        return results;
    }

    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat && stat.isDirectory()) {
            // Babasahin nito ang lahat ng subfolders sa loob ng song files
            results = results.concat(scanFolder(filePath, baseDir));
        } else if (file.toLowerCase().endsWith('.mp4')) {
            // Kunin ang relative path mula sa loob ng song files folder
            const relativePath = path.relative(baseDir, filePath).replace(/\\/g, '/');
            const category = path.basename(path.dirname(filePath));
            
            // Kung ang kanta ay nasa root ng song files, gamitin ang "VIDEOS" bilang category
            const folderCategory = (category.toLowerCase() === 'song files') ? 'KARAOKE HITS' : category;
            
            // Linisin ang filename para maging magandang Song Title
            let rawName = path.basename(file, '.mp4');
            let cleanName = rawName.replace(/[_]/g, ' ').replace(/-/g, ' ').trim();
            
            // I-encode ang path para ligtas basahin ng browser ang mga space (hal. "song files/OPM/my song.mp4")
            const encodedPath = relativePath.split('/').map(encodeURIComponent).join('/');
            
            results.push({
                name: cleanName,
                category: folderCategory.toUpperCase(),
                logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg",
                url: `song files/${encodedPath}`
            });
        }
    });
    return results;
}

console.log("🔍 Sinascan ang 'song files' folder at mga subfolder nito...");
const rawSongs = scanFolder(videoDir);

// Bigyan ng automatic sequential song code (1, 2, 3...)
const karaokeSongs = rawSongs.map((song, index) => ({
    id: index + 1,
    ...song
}));

fs.writeFileSync(outputFile, JSON.stringify(karaokeSongs, null, 2));
console.log(`✅ Tagumpay! Na-scan at nai-save ang ${karaokeSongs.length} na kanta sa songs.json`);