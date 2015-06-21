function show(message, status) {
    var alert = document.querySelector('.alert');
    alert.classList.remove('success');
    alert.classList.remove('error');
    alert.innerHTML += message+"<br>";
    alert.classList.add('display');
    alert.classList.add(status);
    setTimeout("document.querySelector('.alert').classList.toggle('display')", 1000);
}
function ping(url, callback) {
    var img = new Image();
    img.src = url+"?v="+(new Date).getTime();
    img.onerror = function() {
        callback(img);
    }
}
function get(url, callback) {
    var xhr = new XMLHttpRequest;
    callback = callback || function() {};
    xhr.onload = function() {
        if(xhr.status === 200) callback(xhr.response);
    }
    xhr.open("GET", url, true);
    xhr.send();
}
function encrypt( password, time ) {
    var key = ''+ Math.floor(time / 60);
    return password.substring(0, 16).split("").map(function(p, i) {
        var k = key[ key.length - i%key.length - 1].charCodeAt() ^ p.charCodeAt(),
            l = String.fromCharCode( (k&0x0f) + 0x36 ),
            h = String.fromCharCode( ((k>>4)&0x0f) + 0x63 );
        return i%2 ? h+l : l+h;
    }).join("");
}
NodeList.prototype.filter = function() {return [].filter.apply(this, [].slice.call(arguments))}
