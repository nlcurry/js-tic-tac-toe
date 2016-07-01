function TicTacToe() {
  this.player1 = "X"
  this.player2 = "O"
  this.player1_spots = []
  this.player2_spots = []
  this.win_combo = [['1','2','3'],['4','5','6'],['7','8','9'],['1','4','7'],['2','5','8'],['3','6','9'],['1','5','9'],['3','5','7']]
  // count until game stops
  this.gamecount = 1
  this.current_player = "X"
  this.filled_slots = []
  this.winner = ""
}

TicTacToe.prototype = {
  play: function(id){
    if (this.check_slot(id)){
      // keep track of filled squares by each player and in the game
      box = $('#'+id)
      if (this.current_player === this.player1){
        this.player1_spots.push(id.toString())
        this.filled_slots.push(id.toString())
        box.text("X")
      } else {
        this.player2_spots.push(id.toString())
        this.filled_slots.push(id.toString())
        box.text("O")
      }
      console.log(this.win_check())
      if (this.win_check()) {
        console.log('YAYYYY')
        alert(this.winner+ " wins!")
        this.reset()
      } else if (this.draw_check()){
        alert("It's a draw!")
        this.reset()
      }
      this.switch_turns()
    }
  },

  check_slot: function(id){
    for (var slots of this.filled_slots){
      if (slots === id.toString()) {
        alert("This slot is occupied!")
        return false
      }
    }
    return true
  },

  switch_turns: function(){
    if (this.current_player === this.player1){
      this.current_player = this.player2
    } else {
      this.current_player = this.player1
    }
  },

  win_check: function(){
    var count = 0
    for (var combo of this.win_combo){
      for (var slot of combo){
        if (this.current_player === this.player1){
          if (this.find(slot, this.player1_spots)){
            count++
          }
        } else {
          if (this.find(slot, this.player2_spots)){
           count++
          }
        }
      }
      if (count === 3){
        this.winner = this.current_player
        return true
      } else {
        count = 0
      }
    }
    return false
  },

  draw_check: function(){
    if (this.filled_slots.length === 9){
      return true
    }
    return false
  },

  find: function(slot, array){
    for(var i=0; i<array.length; i++) {
      if (array[i] === slot) return true
    }
    return false
  },
  reset: function(){
    this.player1_spots = []
    this.player2_spots = []
    this.filled_slots = []
    this.gamecount = 0
    this.winner = ""
    this.current_player = "X"
  },
  clean_board: function(){
    this.reset()
    tds = $('td')
    tds.text('')
  }
}

$(document).ready(function () {
  console.log("Yay! Hi!")
  game = new TicTacToe()
  var tds = $('td')
  var reset_button = $('.resetbutton')
  tds.on('click', function(event){
    event.preventDefault()
    var td = $(this).attr('id')
    game.play(td)
  })

  reset_button.on('click', function(event){
    event.preventDefault()
    game.clean_board()
  })
})