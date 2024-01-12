# Excel File Downloader (Node.js)
This Node.js script downloads files from URLs specified in an Excel sheet, renames them as per the provided filenames, and keeps track of any failed downloads.

## Requirements
Node.js installed on your machine

## Installation

Clone this repository:

``git clone https://github.com/your-username/excel-file-downloader-nodejs.git``

Navigate to the project directory:

``cd excel-file-downloader-nodejs``

Install dependencies:

``npm install``

## Usage
Place your Excel file with the URLs and filenames in the root directory. Ensure that the Excel file follows the format:

url	    filename
url1	filename1
url2	filename2
...	    ...

Run the script:

``node downloadFiles.js``

The script will create a downloads directory and save the downloaded files with the specified filenames.

## Notes
1. Successful downloads and errors will be logged in the console.
2. At the end of the execution, a list of files that failed to download will be displayed.

## License
This project is licensed under the MIT License.

