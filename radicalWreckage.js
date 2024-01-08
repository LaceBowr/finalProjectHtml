
function addCarYears() {
    const selectedMake = document.querySelector('input[name="carMake"]:checked');
    var selectElement = document.getElementById("modelSelector");
    // Get the selected option
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    var selectedModel = selectedOption.text;
    if (selectedMake) {
        const makeValue = selectedMake.value;
        fetch(`http://127.0.0.1:5000/car/${makeValue}/${selectedModel}`) // Update the URL to your endpoint
            .then(response => response.json())
            .then(data => {
                // Handle the JSON data here
                console.log('Car Years:', data);

                // Example: Create checkboxes dynamically
                const  yearsDiv = document.getElementById('yearsDiv');
                yearsDiv.innerHTML = '<H3>SELECT A YEAR:</H3>';
                const yearSelector = document.createElement('select');
                yearSelector.id = 'yearSelector';
                yearSelector.onchange = displayCar;
                yearSelector.onclick = displayCar;
                data.forEach(year => {
                        // add options to modelSelector
                        const option = document.createElement('option');
                        option.innerText = year;
                        yearSelector.appendChild(option);
                });
                yearsDiv.appendChild(yearSelector);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}
function radioMakes() {
    const selectedMake = document.querySelector('input[name="carMake"]:checked');
    if (selectedMake) {
        const makeValue = selectedMake.value;

        // Send a request to the server to retrieve data from the database
        fetch(`http://127.0.0.1:5000/car/models/${makeValue}`)
            .then(response => response.json())
            .then(data => {
                console.log('Car Models:', data);
                // Display the result
                const modelDiv = document.getElementById('modelDiv');
                modelDiv.innerHTML = '<H2>Select Model:</H2>';
                const modelSelector = document.createElement('select');
                modelSelector.onchange = addCarYears;
                modelSelector.onclick = addCarYears;
                modelSelector.id = 'modelSelector';
                //const modelSelector.onclick = function to populate years which you need to write;
                data.forEach(model => {
                    // add options to modelSelector
                    const option = document.createElement('option');
                    option.innerText = model;
                    modelSelector.appendChild(option);
                });
                modelDiv.appendChild(modelSelector);
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Please select a car make.');
    }
}
function addCarMakes() {
    fetch('http://127.0.0.1:5000/car/makes')  // Update the URL to your endpoint
        .then(response => response.json())
        .then(data => {
            // Handle the JSON data here
            console.log('Car Makes:', data);

            // Example: Create checkboxes dynamically
            const checkboxContainer = document.getElementById('makes_div');
            checkboxContainer.innerHTML = '';

            data.forEach(make => {
                const checkbox = document.createElement('input');
                checkbox.type = 'radio';
                checkbox.name = 'carMake';
                checkbox.value = make;
                checkbox.onclick = radioMakes; 

                const label = document.createElement('label');
                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(make));

                checkboxContainer.appendChild(label);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function displayCar() {
    const selectedMake = document.querySelector('input[name="carMake"]:checked');
    var selectElement = document.getElementById("modelSelector");
    var yearSelectElement = document.getElementById("yearSelector")
    // Get the selected option
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    var selectedYearOption = yearSelectElement.options[yearSelectElement.selectedIndex];

    var selectedModel = selectedOption.text;
    var selectedYear = selectedYearOption.text;

    if (selectedMake) {
        const makeValue = selectedMake.value;
        fetch(`http://127.0.0.1:5000/car/${makeValue}/${selectedModel}/${selectedYear}`) // Update the URL to your endpoint
            .then(response => response.json())
            .then(data => {
                // Handle the JSON data here
                console.log('Car Details:', data);
                data.forEach(car => {
                        handleImageData(car)
                });
                yearsDiv.appendChild(yearSelector);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}
function handleImageData(data) {
    // Assuming data is an array of image URLs
    // You can customize this function based on the actual structure of your data
    const imageContainer = document.getElementById('imageContainer');

    // Clear previous content
    imageContainer.innerHTML = '';

    // Iterate through the array of image URLs and create image elements
    data.images.forEach(imageUrl => {
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        // Append the image to the container
        imageContainer.appendChild(imageElement);
    });
}
function sendEmail() {
    // Get values from form fields
    var subject = document.getElementById('subject').value;
    var body = document.getElementById('send_message').value;

    // Create mailto link
    var mailtoLink = 'mailto:radicalmouse.jj@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    console.log(mailtoLink)
    // Open the link
    window.location.href = mailtoLink;
}