const axios = require('axios');
const fs = require('fs');
const xlsx = require('xlsx');

async function downloadFile(url, destination) {
  const response = await axios({
    method: 'get',
    url,
    responseType: 'stream',
  });

  const writer = fs.createWriteStream(destination);

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function processExcelFile(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const rows = xlsx.utils.sheet_to_json(sheet, { header: ['url', 'filename'] });

  const failedDownloads = [];

  for (const row of rows) {
    const { url, filename } = row;
    const destination = `./download/${filename}`;

    try {
      console.log(`Downloading ${filename} from ${url}`);
      await downloadFile(url, destination);
      console.log(`Downloaded ${filename}`);
    } catch (error) {
      console.error(`Error downloading ${filename}: ${error.message}`);
      failedDownloads.push({ filename, error: error.message });
    }
  }

  return failedDownloads;
}

const excelFilePath = './Files.xlsx';
const failedDownloads = processExcelFile(excelFilePath);

if (failedDownloads.length > 0) {
  console.log('\nFiles failed to download:');
  failedDownloads.forEach(({ filename, error }) => {
    console.log(`${filename}: ${error}`);
  });
} else {
  console.log('\nAll files downloaded successfully!');
}
