//Install Command:
//npm init
//npm i express express-handlebars body-parser

//Common Project Heirarchy
//  Project Folder
//    = views (required for handlebars)
//        = layouts
//        = partials
//    = public
//    = routes
//    = node_modules
//    = app.js
//    = package.json

//Handlebars is an embeded technology that can be used to include one
//page into another. This is similar to how to how PhP and Servlets
//organize their views.
//https://www.npmjs.com/package/express-handlebars

const { User_accModel, ProfileModel, ReplyModel, ReviewsModel, ShopOwnerModel, LaundryShopModel } = require('./model/database/mongoose');

const fs = require('fs/promises');
async function importData() {
    try {
        // Read data from JSON files
        const userData = await fs.readFile('./model/database/sampledata/user_accSample.json', 'utf8');
        const profileData = await fs.readFile('./model/database/sampledata/profileSample.json', 'utf8');
        const repliesData = await fs.readFile('./model/database/sampledata/replySample.json', 'utf8');
        const reviewsData = await fs.readFile('./model/database/sampledata/reviewsSample.json', 'utf8');
        const shopOwnerData = await fs.readFile('./model/database/sampledata/laundry_shop_ownerSample.json', 'utf8');
        const laundryShopData = await fs.readFile('./model/database/sampledata/laundry_shopSample.json', 'utf8');

        // Parse JSON data
        const users = JSON.parse(userData);
        const profiles = JSON.parse(profileData);
        const reviews = JSON.parse(reviewsData);
        const replies = JSON.parse(repliesData);
        const shopOwners = JSON.parse(shopOwnerData);
        const laundryShops = JSON.parse(laundryShopData);

        // Check if data already exists in collections
        const existingUsers = await User_accModel.countDocuments();
        const existingProfiles = await ProfileModel.countDocuments();
        const existingReviews = await ReviewsModel.countDocuments();
        const existingReplies = await ReplyModel.countDocuments();
        const existingShopOwners = await ShopOwnerModel.countDocuments();
        const existingLaundryShops = await LaundryShopModel.countDocuments();

        // Insert data into MongoDB collections if they don't exist
        if (existingUsers === 0) {
            await User_accModel.insertMany(users);
            console.log('User accounts imported');
        }

        if (existingProfiles === 0) {
            await ProfileModel.insertMany(profiles);
            console.log('Profiles imported');
        }

        if (existingReviews === 0) {
            await ReviewsModel.insertMany(reviews);
            console.log('Reviews imported');
        }

        if (existingReplies === 0) {
            await ReplyModel.insertMany(replies);
            console.log('Replies imported');
        }

        if (existingShopOwners === 0) {
            await ShopOwnerModel.insertMany(shopOwners);
            console.log('Shop owners imported');
        }

        if (existingLaundryShops === 0) {
            await LaundryShopModel.insertMany(laundryShops);
            console.log('Laundry shops imported');
        }

        console.log('Data import completed');
    } catch (error) {
        console.error('Error importing data:', error);
    }
}
importData();

const express = require('express');
const server = express();

//This is a new library called Body Parser. This system will parse the data
//from its internal JSon system to make request messages simpler.
const bodyParser = require('body-parser')
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

//The system must use the hbs view engine. When this is used,
//it will require a folder called "views" where all the embeded
//javascript files will be used. Sub-foldering may also be used.
const handlebars = require('express-handlebars');
server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

// Define the helper function
const generateStars = function(rating) {
    let starsHTML = '';
    for (let i = 0; i < rating; i++) {
        starsHTML += '<img src="image/star.png" alt="" class="starsImg">';
    }
    return starsHTML;
};

const checkEqual = function (value1, value2) {
    if (value1 ===  value2) {
        return true;
    }
    return false;
};

// Use the helper function when setting up the Handlebars engine
server.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        generateStars: generateStars,
        checkEqual : checkEqual
    }
}))

//Note: it is also possible to use the keyword 'handlebars' and the
//      extension '.handlebars". In this example, the shorthand is used.

//This is where static resources are loaded. Client side files like
//CSS and JS files can be stored here. Images can be placed as well.
server.use(express.static('public'));

//To use the HBS functionality, use the function called render
//and render the HBS file from the view folder. It will require
//a layout hbs from the layouts folder which will serve as a
//frame to the webpage.
server.get('/', function(req, resp){
    resp.render('homepage',{
        layout: 'index',
        title: 'Homepage',
        cssFile: 'homepage',
        javascriptFile: 'homepage'
    });
});

// NAVIGATION BAR LINKS
    server.get('/homepage', function(req, resp){
        resp.render('homepage',{
            layout: 'index',
            title: 'Homepage',
            cssFile: 'homepage',
            javascriptFile: 'homepage'
        });
    });

    server.get('/log_in', function(req, resp){
        resp.render('log_in', {
            layout: 'index',
            title: 'Login Page',
            cssFile: 'log_in_style',
            javascriptFile: 'log_in'
        });
    });

    server.post('/log_in', function(req, resp){
        try {
            resp.redirect('/homepage');
        
        } catch (error) {
            console.error(error);
            // Handle the error, e.g., render an error page or send an error response
            resp.status(500).send('Internal Server Error');
        }
    });
    
    server.get('/search', function(req, resp){
        resp.render('search',{
            layout: 'index',
            title: 'Search',
            cssFile: 'search',
            javascriptFile: 'search'
        });
    });

    server.get('/profile', async function(req, resp){
        try {
            const loggedin = await User_accModel.find({isLoggedin : true}).lean();
            const profileInfo = await ProfileModel.find({username : loggedin[0].username}).lean();
            const profileReviews = await ReviewsModel.find({username : loggedin[0].username}).lean();
            const profileReplies = await ReplyModel.find({username : loggedin[0].username}).lean();
            resp.render('profile',{
                layout: 'index',
                title: 'Profile Page',
                cssFile: 'profile_style',
                profile : profileInfo[0],
                reviews : profileReviews,
                replies : profileReplies
                //no javascript yet
            });
        } catch(error) {
            console.error(error);
            // Handle the error, e.g., render an error page or send an error response
            resp.status(500).send('Internal Server Error');
        }
    });

    server.get('/sign_up', function(req, resp){
        resp.render('sign_up',{
            layout: 'index',
            title: 'Sign up Page',
            cssFile: 'sign_up_style',
            javascriptFile: 'sign_up'
        });
    });
//

server.get('/establishment_owner_response_:username', async function(req, resp){
    try {
        const username = req.params.username;
        const ownerProfile = await ShopOwnerModel.find({username : username}).lean();
        const profileReplies = await ReplyModel.find({username : username}).lean();
        resp.render('establishment_owner_response',{
        layout: 'index',
        title: 'Establishment Owner Response Page',
        cssFile: 'establishment_owner_response',
        javascriptFile: 'establishment_owner_response',
        owner_profile : ownerProfile[0],
        replies : profileReplies
    });
    } catch (error) {
        console.error(error);
        // Handle the error, e.g., render an error page or send an error response
        resp.status(500).send('Internal Server Error');
    }
});

server.get('/search_result', function(req, resp){
    resp.render('search_result',{
        layout: 'index',
        title: 'Search Result Page',
        cssFile: 'search_result',
        javascriptFile: 'search',
        javascriptFile2: 'homepage'
    });
});

server.get('/edit_profile', async function(req, resp){
    try {
        const loggedin = await User_accModel.find({isLoggedin : true}).lean();
        const profileInfo = await ProfileModel.find({username : loggedin[0].username}).lean();
        const OwnerProfileInfo = await ProfileModel.find({username : loggedin[0].username}).lean();

        resp.render('edit_profile',{
            layout: 'index',
            title: 'Edit Profile Page',
            cssFile: 'edit-profile',
            javascriptFile: 'edit-profile',
            profile : profileInfo[0] != null ? profileInfo[0] : OwnerProfileInfo[0]
        });
    } catch (error) {
        console.error(error);
        // Handle the error, e.g., render an error page or send an error response
        resp.status(500).send('Internal Server Error');
    }
});

// ALL THE LAUNDRY SHOPS
    server.get('/Weclean', async function(req, resp){
        try {
            const reviews = await ReviewsModel.find({shop : "Weclean Laundry Shop"}).lean();
            const Weclean = await LaundryShopModel.find({_id : "Weclean Laundry Shop"}).lean();

            console.log(reviews[0].replies)
            resp.render('Weclean', {
                layout: 'index',
                title: 'Weclean Laundry Shop',
                cssFile: 'style',
                javascriptFile: 'javascript',
                reviews: reviews,
                Weclean: Weclean[0],
                content: Weclean[0]
            });
        } catch (error) {
            console.error(error);
            resp.status(500).send('Internal Server Error');
        }
    });

    server.get('/7FoldsLaundry', async function(req, resp){
        try {
            const reviews = await ReviewsModel.find({shop : "7Folds Laundry Shop"}).lean();
            const _7Folds = await LaundryShopModel.find({_id : "7Folds Laundry Shop"}).lean();
            resp.render('7FoldsLaundry',{
                layout: 'index',
                title: '7Folds Laundry Shop Page',
                cssFile: 'style',
                javascriptFile: 'javascript',
                reviews: reviews,
                _7Folds: _7Folds[0],
                content: _7Folds[0]
            });
        } catch (error) {
            console.error(error);
            resp.status(500).send('Internal Server Error');
        }
    });

    server.get('/XYZLaundryService', async function(req, resp){
        try {
            const reviews = await ReviewsModel.find({shop : "XYZ Laundry Service"}).lean();
            const XYZ = await LaundryShopModel.find({_id : "XYZ Laundry Service"}).lean();
            resp.render('XYZLaundryService',{
                layout: 'index',
                title: 'XYZ Laundry Shop Page',
                cssFile: 'style',
                javascriptFile: 'javascript',
                reviews: reviews,
                XYZ : XYZ[0],
                content: XYZ[0]
            });
        } catch (error) {
            console.error(error);
            resp.status(500).send('Internal Server Error');
        }
        
    });

    server.get('/NonstopLaundryShopMalate', async function(req, resp){
        const reviews = await ReviewsModel.find({shop : "Nonstop Laundry Shop Malate"}).lean();
        const Nonstop = await LaundryShopModel.find({_id : "Nonstop Laundry Shop Malate"}).lean();
        try {
            resp.render('NonstopLaundryShopMalate',{
                layout: 'index',
                title: 'Nonstop Laundry Shop Malate Page',
                cssFile: 'style',
                javascriptFile: 'javascript',
                reviews : reviews,
                Nonstop : Nonstop[0],
                content: Nonstop[0]
            });
        } catch (error) {
            console.error(error);
            // Handle the error, e.g., render an error page or send an error response
            resp.status(500).send('Internal Server Error');
        }
    });
//

server.get('/view_other_profile_:username', async function(req, resp){
    try {
        const username = req.params.username;
        const profileInfo = await ProfileModel.find({username : username}).lean();
        const OwnerProfileInfo = await ShopOwnerModel.find({username : username}).lean();
        const profileReviews = await ReviewsModel.find({username : username}).lean();
        const profileReplies = await ReplyModel.find({username : username}).lean();

        resp.render('view_other_profile', {
        layout: 'index',
        title: `Profile Page of ${username}`, 
        cssFile: 'view_other_profile',
        javascriptFile: 'view_other_profile',
        username: username, 
        profile : profileInfo[0] != null ? profileInfo[0] : OwnerProfileInfo[0],
        reviews : profileReviews,
        replies : profileReplies
    });
    } catch (error) {
        console.error(error);
        // Handle the error, e.g., render an error page or send an error response
        resp.status(500).send('Internal Server Error');
    }
    
});

//Debugging 



// Start the server
const port = process.env.PORT || 3000;
server.listen(port, function(){
    console.log('Listening at port '+ port);
});
