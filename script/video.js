console.log("video");
//1- Fetch , Load and Show catagories

//Create loadCatagories function
const loadCatagories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((error) => console.error(error));
}

// {category_id: '1001', category: 'Music'}

//Create displayCatagories function
const displayCatagories = (categories) => {
    const categoryContainer = document.getElementById("categories")
    //add data in html
    categories.forEach((item) => {
        console.log(item);
        //create a button
        const button = document.createElement("button")
        button.classList = "btn";
        button.innerText = item.category;

        //add button to category container
        categoryContainer.append(button);
    })
}

loadCatagories();