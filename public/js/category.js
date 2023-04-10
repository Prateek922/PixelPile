var gallery = document.querySelector('#gal');

const addImagesInDom = images => {
    // Iterating over each category element and creating gallery-item
    images.map((image, index) => {
        const container = document.createElement('div')
        container.setAttribute("class", "gallery-item")

        const inContainer = document.createElement('div');
        inContainer.setAttribute("class", "content")

        const img = document.createElement('img')
        img.src = image
        img.setAttribute("onclick", `openModal();currentSlide(${index + 1})`);

        inContainer.append(img)
        container.append(inContainer)
        gallery.append(container)

        const model_content = document.querySelector(".modal-content")
        const mySlide = document.createElement('div')
        mySlide.setAttribute("class", "mySlides")

        const img1 = document.createElement('img')
        img1.src = image
        img1.setAttribute("class", "sld")

        mySlide.appendChild(img1)
        model_content.appendChild(mySlide)
    })
    load_image();
}

const intializeImages = async () => {
    var category = window.location.href;

    // Get selected category name from the url
    category = category.split("category/")[1];

    // Fetch all the photos of the selected category through API POST: /get_photos
    const result = await fetch("/get_photos", {
        method: "post",
        headers: {// var captionText = document.getElementById("caption");
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            category: category,
        })
    }).then((res) => res.json());

    let capitalizedStr = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    document.getElementById('heading').innerHTML = capitalizedStr

    // Extract image urls from the response
    images = result.message.map(image => image.photo)

    // Place all the images in the DOM
    addImagesInDom(images)
}

intializeImages()

// Algorithmic implementation to auto-adjust all images within the grid
var getVal = function (elem, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };

var getHeight = function (item) { return item.querySelector('.content').getBoundingClientRect().height; };

var resizeAll = function () {
    var altura = getVal(gallery, 'grid-auto-rows');
    var gap = getVal(gallery, 'grid-row-gap');
    gallery.querySelectorAll('.gallery-item').forEach(function (item) {
        var el = item;
        el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
    });
};
// var captionText = document.getElementById("caption");
const load_image = () => {
    gallery.querySelectorAll('img').forEach(function (item) {
        item.classList.add('byebye');
        if (item.complete) {
            console.log(item.src);
        }
        else {
            item.addEventListener('load', function () {
                var altura = getVal(gallery, 'grid-auto-rows');
                var gap = getVal(gallery, 'grid-row-gap');
                var gitem = item.parentElement.parentElement;
                gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
                item.classList.remove('byebye');
            });
        }
    });
    window.addEventListener('resize', resizeAll);
    gallery.querySelectorAll('.gallery-item').forEach(function (item) {
        item.addEventListener('click', function () {
            item.classList.toggle('full');
        });
    });
}

// Handling Slideshow on image clicks
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}        

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    console.log(slideIndex);
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

