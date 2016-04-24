window.onload = function () {
    var container = document.getElementById("ppt_container");
    var list = document.getElementById('list');
    var buttons = document.getElementById("ppt_buttons").getElementsByTagName("li");
    var index = 1;
    var isanimated = false;
    var interval = 4500;
    var timer;

    function animate (offset) {
        if (offset == 0) {
            return;
        }

        isanimated = true;
        var time = 245;
        var inteval = 5;
        var speed = offset/(time/inteval);
        var top = parseInt(list.style.top) + offset;

        if (top < -196) {
            top = 0;
            speed = -2*speed;
        }

        var go = function () {
            if ((speed > 0 && parseInt(list.style.top) < top) || (speed < 0 && parseInt(list.style.top) > top)) {
                list.style.top = parseInt(list.style.top) + speed + 'px';
                setTimeout(go, inteval);
            } else {
                list.style.top = -98*(index-1);
                isanimated = false;
            }
        }
        go();
    }

    function showButton() {
        for (var i = 0; i < buttons.length ; i++) {
            if( buttons[i].className === "button active"){
                buttons[i].className = "button";
                break;
            }
        }
        buttons[index-1].className = "button active";
    }

    function autoplay() {
        timer = setInterval(function () {
            nextpicture();
        }, interval);
    }

    function stop() {
        clearTimeout(timer);
    }

    nextpicture = function () {
        if (index === 3) {
            index = 1;
        }
        else {
            index += 1;
        }
        animate(-98);
        showButton();
    }

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            if (isanimated) {
                return;
            }
            if (this.className === 'button active') {
                return;
            }

            var newIndex = parseInt(this.getAttribute('index'));
            var offset = -98 * (newIndex - index);

            index = newIndex;
            animate(offset);
            showButton();
        }
    }

    container.onmouseover = stop;
    container.onmouseout = autoplay;

    autoplay();
}