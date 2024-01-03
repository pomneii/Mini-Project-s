let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let number = Math.ceil(Math.random() * 15000);
let point = 3;



btn.onclick = function() {

    if (point > 0) {
        document.querySelector("#spin").disabled = true;
        container.style.transform = "rotate(" + number + "deg)";
        console.log(number);
        let rand = Math.random();
        number = Math.ceil(rand * 15000);
        setTimeout(function() {
            point -= 1;
            document.getElementById('spin').innerHTML = "กดสุ่ม <br>(คุณมีสิทธิ์ " +
                point + " ครั้ง)";
        }, 5000);
        setTimeout(function() {
            document.querySelector(".arrow").style.animation = "Aarrow 2s infinite";
        }, 5000);
        setTimeout(function() {
            document.querySelector("#spin").disabled = false;
            document.querySelector(".arrow").style.animation = "none";
        }, 9000);

    }


}
fetch('https://gamertocoder.garena.co.th/api/assets')
    .then((response) => {
        if (response.status !== 200) {
            return response.status;
        }
        return response.json();
    })
    .then((data) => {
        if (typeof data == "number") {
            alert(data)
        } else {
            console.log(data)
            const url = data.wallpaper[1]
            const character1 = data.characters[3]
            document.body.style.backgroundImage = "url(" + "'" + url + "'" + ")";

        }
    })

document.querySelector("#close1").addEventListener("click", function() {
    document.querySelector("#pitem2").style.display = "none";
    document.querySelector("#spin").style.display = "block";

});

document.querySelector("#close2").addEventListener("click", function() {
    document.querySelector("#pitem3").style.display = "none";
    document.querySelector("#spin").style.display = "block";

});


document.querySelector(".item2").addEventListener("click", function() {
    setTimeout(
        function open(event) {
            document.querySelector("#pitem2").style.display = "block";
            document.querySelector("#spin").style.display = "none";
            document.backgroundcolor = "black";

        },
        1000
    )
});

document.querySelector(".item3").addEventListener("click", function() {
    setTimeout(
        function open(event) {
            document.querySelector("#pitem3").style.display = "block";
            document.querySelector("#spin").style.display = "none";
            document.backgroundcolor = "black";

        },
        1000
    )
});