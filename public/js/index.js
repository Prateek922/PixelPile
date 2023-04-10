var gallery = document.querySelector('#gallery');

const getCategories = async ()=>{
    return await fetch("/getall",{
        method:"post",
        headers:{
            "Content-Type": "application/json",
        },
    }).then((res)=>res.json());
}

const addImagesInDom = (images) => {

    // Iterating over each category element and creating gallery-item
	images.forEach(image => {
        
		const container = document.createElement('div')
        container.setAttribute("class", "gallery-item")

        const inContainer = document.createElement('div');
        inContainer.setAttribute("class","content")

		const img = document.createElement('img')
		img.src = image.photo

        const overlay= document.createElement('div')
        overlay.setAttribute("class","overlay")
        const text= document.createElement('div')
        text.setAttribute("class","text")

        overlay.append(text)
		inContainer.append(img)
        inContainer.append(overlay)
        container.append(inContainer)
		gallery.append(container)

        let capitalizedStr = image.category.charAt(0).toUpperCase() + image.category.slice(1).toLowerCase()
        text.innerHTML=capitalizedStr

        // open category's images on click in new tab
        inContainer.addEventListener('click',()=>{
            window.open("http://localhost:5000/category/"+image.category)
        })

        // Load images in DOM after creating gallery-item
        load_image();
	})
}

const intializeImages = async () => {
	
    // Fetch all categories along with preview images
	const result = await getCategories()
	images = result.message

    // Add category elements to the DOM
	addImagesInDom(images)
}

// Initialize page by fetching categories and loading the elements
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

const load_image = ()=>{

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
            console.log(item)
            window.open("http://localhost:5000/category/"+item.name);
        });
    });
}


