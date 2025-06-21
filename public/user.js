document.getElementById("name").addEventListener("click", () => {change("#name")});
document.getElementById("age").addEventListener("click", () => {change("#age")});
document.getElementById("location").addEventListener("click", () => {change("#location")});

function change(id) {
    const form = document.querySelector(`${id} > form`);
    const txt = document.querySelector(`${id} > h3`);

    if (form.classList.contains("hide")) {
        txt.classList.add("hide");
        form.classList.remove("hide");
        form.querySelector("input").focus();
    }
}