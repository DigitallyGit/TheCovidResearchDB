let host, apiUrl


function setUrls() {
  host = window.location.protocol + '//' + window.location.host + window.location.pathname
  host = host.replace('/form.html', '')
  host = host.replace('/index.html', '')
  host = host.replace('/Registro.html', '')
  apiUrl = host + '/api'
}


function parseResponse(response) {
  return response.text().then(
    data => {
      let body
      try {
        body = JSON.parse(data)
      } catch(error) {
        body = null
      }
      return { status: response.status, body: body}
    }
  )
}


function getLastUpdate() {
  return fetch(`${apiUrl}/api_last_update.php`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(parseResponse)
    .then(result => {
      if (result.status > 399) {
        console.log('Error '+ result.status)
        return
      }
      document.querySelector('#last-update').innerHTML = result.body
    })
    .catch(error =>{
      console.log('Error: '+ error)
    })
}


function hideLoader() {
  const elm = document.getElementById('loader')
  elm.style['display'] = 'none'
}


function showLoader() {
  const elm = document.getElementById('loader')
  elm.style['display'] = 'block'
}


async function initApp() {
  setUrls()
  await getLastUpdate()

  const uploadTrialsForm = document.querySelector('#upload-trials-form');
  if (uploadTrialsForm) {
    uploadTrialsForm.onsubmit = function(evt) {
      evt.preventDefault()
      showLoader()

      const input = document.getElementById('file')
      file = input.files[0]

      const fd = new FormData()
      fd.append('file', file)

      fetch(`${apiUrl}/api_trials_upload.php`, {
        method:'POST',
        body: fd,
      })
      .then(parseResponse)
      .then(async result => {
        if (result.status > 399) {
          console.log('Error ' + result.status)
          hideLoader()
          return
        }
        hideLoader()
        window.location.href = host + '/mapa.html'
      })
      .catch(error => {
        hideLoader()
        console.log('Error: ' + error)
      })
    }
  }
}

const typeTxt = () => {
    /* ---------------------------------------------
  typing
  --------------------------------------------- */
  var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function() {
      that.tick();
    }, delta);
  };

  window.onload = function() {
    var elements = document.getElementsByClassName('typing');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }

    // INJECT CSS
    var css = document.createElement("style");
    css.innerHTML = ".typing > .wrap { border-right: 0.08em solid #fff }";
    document.body.appendChild(css);
  };
}


initApp();
typeTxt();
