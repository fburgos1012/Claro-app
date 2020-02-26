// Dom7
var $$ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
  console.log(theme);
}

// Init App
var app = new Framework7({
  id: 'com.claro.app',
  root: '#app',
  name: 'Claro',
  dialog: {
    title: 'Claro',
    buttonOk: 'Ok',
  },
  theme: theme,
  data: function () {
    return {
      name: 'Fernando Burgos',
      user: {
        firstName: 'Fernando',
        lastName: 'Burgos',
      },
    };
  },
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  routes: routes,
  input: {
    scrollIntoViewOnFocus: Framework7.device.cordova && !Framework7.device.electron,
    scrollIntoViewCentered: Framework7.device.cordova && !Framework7.device.electron,
  },
  popup: {
    closeOnEscape: true,
  },
  sheet: {
    closeOnEscape: true,
  },
  popover: {
    closeOnEscape: true,
  },
  actions: {
    closeOnEscape: true,
  },
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },
});

$$(document).on('deviceready', function() { 
 console.log('Device is ready');
 UserList();
});



function UserList(){
  app.request.json('https://jsonplaceholder.typicode.com/users', function (data) {
    console.log(data);
    var html ="";
    $.each(data, function(i, item) {
      var picURL = 'https://cdn.framework7.io/placeholder/abstract-88x88-' + (Math.floor(Math.random() * 10) + 1) + '.jpg';
      html +=`<li>
      <a href="#" class="item-link item-content popup-open" onclick="detalleUser(`+ item.id +`);" data-popup=".popup-user">
      <div class="item-media">
      <img src="`+ picURL  +`" style="width: 40px;">
      </div>
      <div class="item-inner">
      <div class="item-title">
      <div class="item-header">Nombre</div>
      | `+ item.name +`
      </div>
      <div class="item-after">Ver</div>
      </div>
      </a>
      </li>`;
      $$('#listUser').html(html);
    });

  });
}

function detalleUser(id){
  app.request.json('https://jsonplaceholder.typicode.com/users/'+id, function (resp) {
    console.log(resp);
    var html ="";

      var obj = JSON.parse(JSON.stringify(resp));
      $$('#IdUser').html('Usuario #'+ id); // ID del usuario
      $$('#idNum').html('000'+id);
      $$('#Username').html(obj.username);
      $$('#Nombre').html(obj.name);
      $$('#email').html(obj.email);
      $$('#phone').html(obj.phone);
      $$('#website').html(obj.website);
      var dir = JSON.parse(JSON.stringify(obj.address));
      $$('#calle').html(dir.street);
      $$('#suite').html(dir.suite);
      $$('#city').html(dir.city);
      $$('#zipcode').html(dir.zipcode);
      var gio = JSON.parse(JSON.stringify(dir.geo));
      $$('#lat').html(gio.lat);
      $$('#lng').html(gio.lng);
      var com = JSON.parse(JSON.stringify(obj.company));
      $$('#company').html(com.name);
      $$('#catchPhrase').html(com.catchPhrase);
      $$('#bs').html(com.bs);
  });
}

var $ptrContent = $$('.ptr-content');
$ptrContent.on('ptr:refresh', function (e) {

  setTimeout(function () {
    UserList();
    app.ptr.done();
  }, 2000);
});

