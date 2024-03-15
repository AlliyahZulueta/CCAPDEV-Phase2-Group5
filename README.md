NOTE: The node_modules folder already exists in our zip file, but in case any issues arise, here are the npm commands we used to install the external libraries.

Install Command:
npm init -y
npm i express express-handlebars body-parser mongoose

For importing the JSON files into MongoDB, there's a function that automatically handles it. Ensure that upon the initial run, there are no existing Laundry_Shop databases in the MongoDB database to ensure that the JSON files are updated. 
This is because the function, when it detects that the database and its schema already exist, will not add any more data. This function will be changed to match the MCO3 requirement.

Common Project Heirarchy
  Project Folder
    = views (required for handlebars)
        = layouts
        = partials
    = public (images, js, css)
    = node_modules
    = node.js
    = package.json