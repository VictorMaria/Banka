// Function for responsive navigation bars
function removeBorderRadius(){
    const logo = document.getElementById('logo')
    logo.style.borderRadius = '0';
}
function addBorderRadius(){
    const logo = document.getElementById('logo')
    logo.style.borderRadius = '5px';
}
function myFunction() {
      const x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
        removeBorderRadius()
      } else {
      addBorderRadius()
    x.className = "topnav";
      }
}