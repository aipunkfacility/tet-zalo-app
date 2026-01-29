const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../src/assets');
const files = fs.readdirSync(assetsDir);

async function optimize() {
    console.log('🚀 Starting asset optimization...');

    for (const file of files) {
        if (file.endsWith('.png')) {
            const inputPath = path.join(assetsDir, file);
            const outputPath = path.join(assetsDir, file.replace('.png', '.webp'));

            const statsBefore = fs.statSync(inputPath);

            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath);

            const statsAfter = fs.statSync(outputPath);

            const reduction = ((1 - statsAfter.size / statsBefore.size) * 100).toFixed(2);
            console.log(`✅ Converted ${file} -> ${path.basename(outputPath)}`);
            console.log(`   Size: ${(statsBefore.size / 1024 / 1024).toFixed(2)}MB -> ${(statsAfter.size / 1024 / 1024).toFixed(2)}MB (-${reduction}%)`);
        }
    }

    console.log('\n✨ Optimization complete!');
}

optimize().catch(err => {
    console.error('❌ Error during optimization:', err);
    process.exit(1);
});
