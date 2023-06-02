document.onload = function() {
  const input = document.getElementById('logpass')
  console.log('hihi')
  document.getElementById('show').onclick = function() {
    console.log('hihi')
    input.type = 'text'
    this.classList.add('none')
    this.classList.remove('show')
    document.getElementById('hide').classList.add('show')
   document.getElementById('hide').classList.remove('none')
  }

  document.getElementById('hide').onclick = function() {
    input.type = 'password'
      this.classList.add('none')
    this.classList.remove('show')
      document.getElementById('show').classList.add('show')
   document.getElementById('show').classList.remove('none')
  }}
