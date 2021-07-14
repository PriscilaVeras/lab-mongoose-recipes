const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    const recipeOne = await Recipe.create({
      title: "rice",
      level: "Easy Peasy",
      ingredients: ["rice", "garlic", "onion", "water", "salt"],
      cuisine: "brazilian meal",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 10,
      creator: "priscila",
      created: 2021 - 7 - 13,
    });

    console.log(recipeOne);

    const allRecipes = await Recipe.insertMany(data);

    //console.log(allRecipes);

    const updateRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );

    console.log("update recipe!");

    const deleteRecipe = await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("delete recipe carrot cake!");

    close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
