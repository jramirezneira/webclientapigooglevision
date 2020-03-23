
function getObjectDetection() {
	
	const img = document.querySelector('[type=file]').files[0]
    const http = new XMLHttpRequest();
    const url = "http://35.238.97.163/objects";
   
	http.open("POST", url, true);
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	http.onreadystatechange = () => {//Call a function when the state changes.
	console.log(http);
		if (http.readyState == 4 && http.status == 200) {
			labels.innerHTML = formatText(JSON.parse(http.responseText));
		}
	}
	const formData = new FormData();
	formData.append("uploads", img);
	http.send(formData);
   
}


function getExplicitContent() {
	
	const img = document.querySelector('[type=file]').files[0]
    const http = new XMLHttpRequest();
    const url = "http://35.238.97.163/explicit";
   
	http.open("POST", url, true);
	http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	http.onreadystatechange = () => {//Call a function when the state changes.
	console.log(http);
		if (http.readyState == 4 && http.status == 200) {
			const explicitContentJSON = JSON.parse(http.responseText);
			
			let outputtext = '';
			Object.keys(explicitContentJSON).forEach(key => {				
				outputtext += "<li>" + key +  ": "+ explicitContentJSON[key] + "</li>";				
			})
			
			ContentExplicit.innerHTML ="<ul>"+outputtext+"</ul>";
			
		}
	}
	const formData = new FormData();
	formData.append("uploads", img);
	http.send(formData);
   
}

function formatText(labels) {
    let formattedText = '';
    labels.forEach((item)=>{
        formattedText += "<li>" + item.description +  " - score: "+ (item.score*100).toFixed(2) + "% </li>";
    });
    console.log(formattedText);
    return "<ul>"+formattedText+"</ul>";
}

function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}