
let host, apiUrl

const store = {
}


function setUrls() {
  host = window.location.protocol + '//' + window.location.host + window.location.pathname
  host = host.replace('BackOffice/', '')
  host = host.replace('index.html', '')
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


function getCookie(name) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  if (match) {
    return match[2]
  }
  return false
}


function hideLoader() {
  const elm = document.getElementById('loader')
  elm.style['display'] = 'none'
}


function showLoader() {
  const elm = document.getElementById('loader')
  elm.style['display'] = 'block'
}


function logout(evt) {
  evt.preventDefault()
  document.cookie = 'token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
  window.location.reload()
}


function getTrialList() {
  showLoader()
  return fetch(`${apiUrl}/api_trials_list.php`, {
    method: 'GET',
  })
    .then(parseResponse)
    .then(result => {
      if (result.status > 399) {
        console.log('Error ' + result.status)
      } else if (result.body) {
        const table = $('#trial-table').DataTable()
        table.clear()
        result.body.forEach(trial => {
          table.rows.add([[trial.Public_title, trial.TrialID]])
        })
        table.draw()
      }
      hideLoader()
    })
    .catch(error => {
      console.log('Error: ' + error)
    })
}


function getTrialDetail(TrialID) {
  return fetch(`${apiUrl}/api_trials_detail.php?TrialID=${TrialID}`, {
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

      console.log(result.body)
      store.trial = result.body
    })
    .catch(error =>{
      console.log('Error: '+ error)
    })
}


function saveTrial() {
  let url
  if (store.trial.TrialID) {
    url = `${apiUrl}/api_trials_update.php`
  } else {
    url = `${apiUrl}/api_trials_create.php`
  }

  return fetch(url, {
    method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(store.trial)
  })
    .then(parseResponse)
    .then(async result =>{
      if(result.status > 399){
        console.log( 'Error: '+ result.status)
      }
      await getTrialList()
      hideTrialForm()
      showTrialList()
    })
    .catch(error =>{
      console.log('Error: '+ error)
    })
}


function deleteTrial(TrialID) {
  return fetch(`${apiUrl}/api_trials_delete.php?TrialID=${TrialID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(parseResponse)
    .then(async result => {
      if (result.status > 399) {
        console.log('Error ' + result.status)
      }
      await getTrialList()
    })
    .catch(error => {
      console.log('Error: ' + error)
    })
}


async function openTrialForm(TrialID) {
  document.querySelector('#trial-form').reset()

  if (TrialID == undefined) {
    store.trial = {}
    store.trial.TrialID = ''
    store.trial.Last_Refreshed_on = ''
    store.trial.Public_title = ''
    store.trial.Scientific_title = ''
    store.trial.Acronym = ''
    store.trial.Primary_sponsor = ''
    store.trial.Date_registration = ''
    store.trial.Date_registration3 = ''
    store.trial.Export_date = ''
    store.trial.Source_Register = ''
    store.trial.web_address = ''
    store.trial.Recruitment_Status = ''
    store.trial.other_records = ''
    store.trial.Inclusion_agemin = ''
    store.trial.Inclusion_agemax = ''
    store.trial.Inclusion_gender = ''
    store.trial.Date_enrollement = ''
    store.trial.Target_size = ''
    store.trial.Study_type = ''
    store.trial.Study_design = ''
    store.trial.Phase = ''
    store.trial.Countries = ''
    store.trial.Contact_Firstname = ''
    store.trial.Contact_Lastname = ''
    store.trial.Contact_Address = ''
    store.trial.Contact_Email = ''
    store.trial.Contact_Tel = ''
    store.trial.Contact_Affiliation = ''
    store.trial.Inclusion_Criteria = ''
    store.trial.Exclusion_Criteria = ''
    store.trial.Condition = ''
    store.trial.Intervention = ''
    store.trial.Primary_outcome = ''
    store.trial.results_date_posted = ''
    store.trial.results_date_completed = ''
    store.trial.results_url_link = ''
    store.trial.Retrospective_flag = ''
    store.trial.Bridging_flag_truefalse = ''
    store.trial.Bridged_type = ''
    store.trial.results_yes_no = ''
  } else {
    await getTrialDetail(TrialID)
  }

  document.querySelector('[name="Last_Refreshed_on"]').value = store.trial.Last_Refreshed_on
  document.querySelector('[name="Public_title"]').value = store.trial.Public_title
  document.querySelector('[name="Scientific_title"]').value = store.trial.Scientific_title
  document.querySelector('[name="Acronym"]').value = store.trial.Acronym
  document.querySelector('[name="Primary_sponsor"]').value = store.trial.Primary_sponsor
  document.querySelector('[name="Date_registration"]').value = store.trial.Date_registration
  document.querySelector('[name="Date_registration3"]').value = store.trial.Date_registration3
  document.querySelector('[name="Export_date"]').value = store.trial.Export_date
  document.querySelector('[name="Source_Register"]').value = store.trial.Source_Register
  document.querySelector('[name="web_address"]').value = store.trial.web_address
  document.querySelector('[name="Recruitment_Status"]').value = store.trial.Recruitment_Status
  document.querySelector('[name="other_records"]').value = store.trial.other_records
  document.querySelector('[name="Inclusion_agemin"]').value = store.trial.Inclusion_agemin
  document.querySelector('[name="Inclusion_agemax"]').value = store.trial.Inclusion_agemax
  document.querySelector('[name="Inclusion_gender"]').value = store.trial.Inclusion_gender
  document.querySelector('[name="Date_enrollement"]').value = store.trial.Date_enrollement
  document.querySelector('[name="Target_size"]').value = store.trial.Target_size
  document.querySelector('[name="Study_type"]').value = store.trial.Study_type
  document.querySelector('[name="Study_design"]').value = store.trial.Study_design
  document.querySelector('[name="Phase"]').value = store.trial.Phase
  document.querySelector('[name="Countries"]').value = store.trial.Countries
  document.querySelector('[name="Contact_Firstname"]').value = store.trial.Contact_Firstname
  document.querySelector('[name="Contact_Lastname"]').value = store.trial.Contact_Lastname
  document.querySelector('[name="Contact_Address"]').value = store.trial.Contact_Address
  document.querySelector('[name="Contact_Email"]').value = store.trial.Contact_Email
  document.querySelector('[name="Contact_Tel"]').value = store.trial.Contact_Tel
  document.querySelector('[name="Contact_Affiliation"]').value = store.trial.Contact_Affiliation
  document.querySelector('[name="Inclusion_Criteria"]').value = store.trial.Inclusion_Criteria
  document.querySelector('[name="Exclusion_Criteria"]').value = store.trial.Exclusion_Criteria
  document.querySelector('[name="Condition"]').value = store.trial.Condition
  document.querySelector('[name="Intervention"]').value = store.trial.Intervention
  document.querySelector('[name="Primary_outcome"]').value = store.trial.Primary_outcome
  document.querySelector('[name="results_date_posted"]').value = store.trial.results_date_posted
  document.querySelector('[name="results_date_completed"]').value = store.trial.results_date_completed
  document.querySelector('[name="results_url_link"]').value = store.trial.results_url_link
  document.querySelector('[name="Retrospective_flag"]').value = store.trial.Retrospective_flag
  document.querySelector('[name="Bridging_flag_truefalse"]').value = store.trial.Bridging_flag_truefalse
  document.querySelector('[name="Bridged_type"]').value = store.trial.Bridged_type
  document.querySelector('[name="results_yes_no"]').value = store.trial.results_yes_no

  hideTrialList()
  showTrialForm()
}


function openTrialUploadForm() {
  document.querySelector('#upload-trials-form').reset()
  hideTrialList()
  showTrialUploadForm()
}


function backToTrialList() {
  hideTrialForm()
  hideTrialUploadForm()
  showTrialList()
}


function showTrialList() {
  document.querySelector('#trial-list').style['display'] = 'block'
}


function hideTrialList() {
  document.querySelector('#trial-list').style['display'] = 'none'
}


function showTrialForm() {
  document.querySelector('#trial-form').style['display'] = 'block'
}


function hideTrialForm() {
  document.querySelector('#trial-form').style['display'] = 'none'
}


function showTrialUploadForm() {
  document.querySelector('#upload-trials-form').style['display'] = 'block'
}


function hideTrialUploadForm() {
  document.querySelector('#upload-trials-form').style['display'] = 'none'
}


(function($) {
  $('#trial-table').DataTable({
    processing: true,
    lengthChange: false,
    language: {
      info: 'Mostrando registros <strong>_START_</strong> a <strong>_END_</strong> de un total de <strong>_TOTAL_</strong> registros',
      zeroRecords: 'No hay resultados',
      search: 'Buscar:',
      paginate: {
        previous: 'Página anterior',
        next: 'Página siguiente',
      }
    },
    ordering: false,
    pageLength: 10,
    deferRender: true,
    columnDefs: [
      {
        targets: [0, 1],
        className: 'dt-center'
      },
    ],
    columns: [
      {title: 'Título'},
      {
        title: 'Acciones',
        render: function(data, type) {
          return `
            <div class="d-flex justify-content-center">
              <button class="edit-btn btn btn-primary me-2" data-id=${data}>
                <div class="label">
                  <span>Editar</span>
                </div>
              </button>
              <button class="btn-delete btn btn-danger" data-id=${data}>
                <div class="label">
                  <span>Eliminar</span>
                </div>
              </button>
            </div>
          `
        }
      }
    ],
  })

  $('#trial-table tbody').on('click', '.edit-btn', function () {
    openTrialForm(this.dataset.id)
  })

  $('#trial-table tbody').on('click', '.btn-delete', function () {
    if (confirm('Estás seguro/a de eliminar este elemento?')) {
      deleteTrial(this.dataset.id)
    }
  })
})(jQuery)


function showLoginForm() {
  const loginElm = document.getElementById('login')
  loginElm.style['display'] = 'block'
  const divhero = document.getElementById('hero')
  divhero.style['display']='block'
}


function hideLoginForm() {
  const loginElm = document.getElementById('login')
  loginElm.style['display'] = 'none'
  const divhero = document.getElementById('hero')
  divhero.style['display']='none'
}


function showPanel() {
  const panelElm = document.getElementById('panel')
  panelElm.style['display'] = 'block'
}


function hidePanel() {
  const panelElm = document.getElementById('panel')
  panelElm.style['display'] = 'none'
}


async function login(evt) {
  evt.preventDefault()

  const loginForm = document.getElementById('login-form')
  const credenciales = {
    correo: loginForm.querySelector('[name="correo"]').value,
    clave: loginForm.querySelector('[name="clave"]').value,
  }

  if (credenciales.correo == 'admin' && credenciales.clave == 'admin') {
    document.cookie = `token=dummytoken`
    initPanel()
  } else {
    alert('Credenciales incorrectas')
  }
}


async function initPanel() {
  hideLoginForm()
  hideTrialForm()
  hideTrialUploadForm()
  showPanel()

  await getTrialList()

  const newTrialBtn = document.querySelector('#new-trial-btn');
  newTrialBtn.onclick = function() {
    openTrialForm()
  }

  const newTrialUploadBtn = document.querySelector('#new-trial-upload-btn');
  newTrialUploadBtn.onclick = function() {
    openTrialUploadForm()
  }

  const backToListBtn = document.getElementsByClassName('back-to-trial-list-btn');
  Array.prototype.forEach.call(backToListBtn, item => {
    item.onclick = backToTrialList
  })

  const trialForm = document.querySelector('#trial-form');
  trialForm.onsubmit = function(evt) {
    evt.preventDefault()

    store.trial.Last_Refreshed_on = document.querySelector('[name="Last_Refreshed_on"]').value
    store.trial.Public_title = document.querySelector('[name="Public_title"]').value
    store.trial.Scientific_title = document.querySelector('[name="Scientific_title"]').value
    store.trial.Acronym = document.querySelector('[name="Acronym"]').value
    store.trial.Primary_sponsor = document.querySelector('[name="Primary_sponsor"]').value
    store.trial.Date_registration = document.querySelector('[name="Date_registration"]').value
    store.trial.Date_registration3 = document.querySelector('[name="Date_registration3"]').value
    store.trial.Export_date = document.querySelector('[name="Export_date"]').value
    store.trial.Source_Register = document.querySelector('[name="Source_Register"]').value
    store.trial.web_address = document.querySelector('[name="web_address"]').value
    store.trial.Recruitment_Status = document.querySelector('[name="Recruitment_Status"]').value
    store.trial.other_records = document.querySelector('[name="other_records"]').value
    store.trial.Inclusion_agemin = document.querySelector('[name="Inclusion_agemin"]').value
    store.trial.Inclusion_agemax = document.querySelector('[name="Inclusion_agemax"]').value
    store.trial.Inclusion_gender = document.querySelector('[name="Inclusion_gender"]').value
    store.trial.Date_enrollement = document.querySelector('[name="Date_enrollement"]').value
    store.trial.Target_size = document.querySelector('[name="Target_size"]').value
    store.trial.Study_type = document.querySelector('[name="Study_type"]').value
    store.trial.Study_design = document.querySelector('[name="Study_design"]').value
    store.trial.Phase = document.querySelector('[name="Phase"]').value
    store.trial.Countries = document.querySelector('[name="Countries"]').value
    store.trial.Contact_Firstname = document.querySelector('[name="Contact_Firstname"]').value
    store.trial.Contact_Lastname = document.querySelector('[name="Contact_Lastname"]').value
    store.trial.Contact_Address = document.querySelector('[name="Contact_Address"]').value
    store.trial.Contact_Email = document.querySelector('[name="Contact_Email"]').value
    store.trial.Contact_Tel = document.querySelector('[name="Contact_Tel"]').value
    store.trial.Contact_Affiliation = document.querySelector('[name="Contact_Affiliation"]').value
    store.trial.Inclusion_Criteria = document.querySelector('[name="Inclusion_Criteria"]').value
    store.trial.Exclusion_Criteria = document.querySelector('[name="Exclusion_Criteria"]').value
    store.trial.Condition = document.querySelector('[name="Condition"]').value
    store.trial.Intervention = document.querySelector('[name="Intervention"]').value
    store.trial.Primary_outcome = document.querySelector('[name="Primary_outcome"]').value
    store.trial.results_date_posted = document.querySelector('[name="results_date_posted"]').value
    store.trial.results_date_completed = document.querySelector('[name="results_date_completed"]').value
    store.trial.results_url_link = document.querySelector('[name="results_url_link"]').value
    store.trial.Retrospective_flag = document.querySelector('[name="Retrospective_flag"]').value
    store.trial.Bridging_flag_truefalse = document.querySelector('[name="Bridging_flag_truefalse"]').value
    store.trial.Bridged_type = document.querySelector('[name="Bridged_type"]').value
    store.trial.results_yes_no = document.querySelector('[name="results_yes_no"]').value

    saveTrial()
  }

  const uploadTrialsForm = document.querySelector('#upload-trials-form');
  uploadTrialsForm.onsubmit = function(evt) {
    evt.preventDefault()

    const input = document.getElementById('file')
    file = input.files[0]

    const fd = new FormData()
    fd.append('file', file)

    showLoader()
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
      await getTrialList()
      hideTrialUploadForm()
      showTrialList()
    })
    .catch(error => {
      hideLoader()
      console.log('Error: ' + error)
    })
  }

  const logoutBtn = document.getElementById('logout-btn')
  logoutBtn.onclick = logout
}


function initApp() {
  setUrls()

  hideLoginForm()
  hidePanel()

  const token = getCookie('token')
  if (!token) {
    showLoginForm()

    let loginForm = document.getElementById('login-form')
    loginForm.onsubmit = login
  } else {
    initPanel()
  }

  document.querySelector('#app').style['display'] = 'block'
}


initApp()
