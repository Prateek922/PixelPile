// This function handles uploading of multiple images
const get_photo = async () => {
  const photo = document.querySelector("#photo");
  const category = document.querySelector("#category");
  const btn = document.getElementById('btn')
  btn.innerHTML = "Uploading..";
  const arr = [];
  for (var i = 0; i < photo.files.length; i++) {
    arr.push(i);
  }

  // Using cloudinary to store images and recieving the image url
  await Promise.all(arr.map(async (item) => {
    const data = new FormData();
    data.append("file", photo.files[item]);
    data.append("upload_preset", "insta_clone");
    data.append("cloud_name", "dwq3jyfgb");
    console.log(data);
    await fetch("https://api.cloudinary.com/v1_1/dwq3jyfgb/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        upload(data.url, category.value);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  )).then(() => {
    btn.innerHTML = "Uploaded";
    window.location.reload();
  });
}

// Using my /upload endpoint to store only the image url in mongodb
upload = async (photo, category) => {
  const result = await fetch("/upload", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      photo: photo,
      category: category,
    }),
  }).then((res) => res.json())
  console.log(result);
}