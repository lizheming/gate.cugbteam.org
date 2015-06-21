var option = {
    input: {
        checkBox: document.querySelectorAll("input[type=checkbox]"),
        userInput: document.querySelector("input[name=username]"),
        passInput: document.querySelector("input[name=password]")
    },
    save: function() {
        localStorage.option = JSON.stringify(
            [].map.call( this.input.checkBox, function(item) {
                return item.checked ? item.value : ""
            })
        );
        localStorage.username = this.input.userInput.value;
        localStorage.password = this.input.passInput.value;
    },
    query: function() {
        var o = JSON.parse(localStorage.option || '["v4"]');
        [].forEach.call( this.input.checkBox, function(item) { if(o.indexOf(item.value) != -1) item.checked = true; 
        })
        this.input.userInput.value = localStorage.username || "";
        this.input.passInput.value = localStorage.password || "";
    }
}, URL = (function() {
    var hostname = { 
        v4: "http://202.204.105.195:3333", 
        v6: "http://[2001:da8:214:102:d6be:d9ff:feaa:422a]"
    }, method = {LOGIN: "do_login", LOGOUT: "force_logout", FORCELOGOUT: "do_logout", KEEPLIVE: "keeplive"};
    var type = Object.keys(hostname), res = {HOST:hostname};
    for(var m in method) {
        res[m] = {};
        type.forEach(function(t) {res[m][t] = hostname[t]+"/cgi-bin/"+method[m]})
    }
    return res
}());

var form = document.querySelector(".pure-form"),
    networkInputs = document.querySelectorAll("input[name='network[]']"),
    nInput = document.querySelector("input[name='n']"),
    iframe = {
        v4: document.querySelector("iframe#sendv4"),
        v6: document.querySelector("iframe#sendv6")
    };
var events = {
    login: function() {
        networkInputs.filter(function(item) {return item.checked}).forEach(function(item) {
            var t = option.input.passInput.value, url = [
            	"http://gate.cugbteam.org/request-time.php",
            	"?type=", item.value,
            	"&username=", option.input.userInput.value
            ].join('');
            get(url, function(time) {
                option.input.passInput.value = encrypt( option.input.passInput.value, +time );
                form.setAttribute('action', URL.LOGIN[item.value]);
                form.setAttribute('target', 'send'+item.value);
                iframe[item.value].classList.toggle('display');
                form.submit();
                option.input.passInput.value = t;
                option.save();
                setTimeout(function() {iframe[item.value].classList.toggle("display")}, 3000);
            })        
        })          
    },
    logout: function() {
        networkInputs.filter(function(item) {return item.checked}).forEach(function(item) {
            nInput.value = 1;
            form.setAttribute('action', URL.LOGOUT[item.value]);
            form.setAttribute('target', 'send'+item.value);
            iframe[item.value].classList.toggle('display');
            form.submit();
            option.save();
            setTimeout(function() {iframe[item.value].classList.toggle("display")}, 3000);          
        })
    },
    forcelogout: function(e) {
    	networkInputs.filter(function(item) {return item.checked}).forEach(function(item) {
    		iframe[item.value].src = URL.FORCELOGOUT[item.value];
            iframe[item.value].classList.toggle('display');
            setTimeout(function() {iframe[item.value].classList.toggle("display")}, 3000); 
    	})
		e.preventDefault();
    },
    autorelogin: function(second) {
        var that = this;
        setInterval(function() {
            ping("http://www.baidu.com/img/bdlogo.png", function() {
                that.login();
                console.log('relogined!');
            })
        }, (second||60) * 1000);
    },
    logoutswitch: function(e) {
    	e.preventDefault();
    	[].forEach.call(document.querySelectorAll(".logout-buttons button"), function(button) {
    		if( button.hasAttribute("hidden") ) button.removeAttribute("hidden");
    		else button.setAttribute("hidden", true);
    	})
    	this.classList.toggle("down");
    }
}

~function notifer() {
    var notifer = document.querySelector(".mirror-notifer span");
    notifer.parentNode.classList.toggle("display")
    notifer.addEventListener("click", function() {
        this.parentNode.classList.toggle("display");
        localStorage.notifer = 1;
    })
    if(localStorage.notifer && localStorage.notifer === "1") notifer.click();
}();
~function networkCheck() {
    function disable(type) {
        var checkbox = document.querySelector("input[value='"+type+"']");
        checkbox.disabled = true;
        checkbox.checked = false;
    }
    function pingLogo(server, callback) {
        ping(server+"/images/logo.gif", callback);
    }
    pingLogo(URL.HOST.v4, function() {
        disable('v4');
        show("IPv4 网络连接似乎不常","error");
    });
    pingLogo(URL.HOST.v6, function() {
        disable('v6');
        show("IPv6 网络连接似乎不正常","error");
    }); 
}();
document.querySelector('#login').addEventListener('click', events.login);
document.querySelector('#logout').addEventListener('click', events.logout);
document.querySelector("#force-logout").addEventListener("click", events.forcelogout);
document.querySelector(".logout-container .logout-switch").addEventListener("click", events.logoutswitch);
option.query();
if(option.input.checkBox[0].checked) events.login();
if(option.input.checkBox[1].checked) events.autorelogin(15);
option.input.passInput.addEventListener("keydown", function(e) {if(e.keyCode == 13) events.login()})
