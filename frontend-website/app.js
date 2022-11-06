
const closeIcon = document.querySelector('.close-icon')
const ambulanceBanner = document.querySelector('.ambulance-banner')
const dashboard = document.querySelector('.dashboard');


closeIcon.addEventListener('click',()=>{
  if (ambulanceBanner.style.display === "none") {
    ambulanceBanner.style.display = "block";

    // opacity: 0;
		// pointer-events: none;
		// visibility: hidden;
    

  } else {
    ambulanceBanner.style.display = "none";
    dashboard.style.gridRowStart = 1;
  }
})