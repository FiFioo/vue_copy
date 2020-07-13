let app = new Vue({
    name: "Card Game",
    el: "#app",
    data: state,

    computed: {
        testCard(){
            return cards.archers;
        },
        cssClass(){
            return {
                'can-play': this.canPlay,
            }
        }
    },

    methods: {
        handlePlayCard(card){
            playCard(card);
        },
        handleCardLeaveEnd () {
            applyCard();
        },
        handleOverlayClose () {
            overlayCloseHandlers[this.activeOverlay]();
        },
    },

    created() {
        //this.testHand = this.createTestHand()
    },
    mounted(){
      beginGame()  
    },
    
    template: `<div id="#app" :class="cssClass">
        <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players" />

        <div class="world">
            <castle v-for="(player, index) in players" :player="player" :index="index" />
            <div class="land" />
            <div class="clouds">
                <cloud v-for="index in 10" :type="(index - 1) % 5 + 1" />
            </div>
        </div>

        <transition name="hand">
            <hand v-if="!activeOverlay" :cards="currentHand"  @card-play="handlePlayCard" @card-leave-end="handleCardLeaveEnd" />
        </transition>

        <transition name="fade">
            <div class="overlay-background" v-if="activeOverlay"></div>
        </transition>

        <transition name="zoom">
            <overlay v-if="activeOverlay" :key="activeOverlay" @close="handleOverlayClose">
                <component :is="'overlay-content-' + activeOverlay" 
                    :player="currentPlayer" 
                    :opponent="currentOpponent"
                    :players="players" />
            </overlay>
        </transition>
    </div>`
})

var overlayCloseHandlers = {
    'player-turn'() {
      if (state.turn > 1) {
        state.activeOverlay = 'last-play'
      } else {
        newTurn()
      }
    },
  
    'last-play'() {
      newTurn()
    },
  
    'game-over'() {
      document.location.reload()
    },
}

window.addEventListener("resize", () => {
    state.worldRatio = getWorldRatio();
})

requestAnimationFrame(animate);

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}

state.activeOverlay = 'player-turn';

function beginGame() {
    state.players.forEach(drawinitialHand);
}

function playCard(card) {
    if (state.canPlay) {
      state.canPlay = false
      currentPlayingCard = card
  
      // Remove the card from player hand
      const index = state.currentPlayer.hand.indexOf(card)
      state.currentPlayer.hand.splice(index, 1)
  
      // Add the card to the discard pile
      addCardToPile(state.discardPile, card.id)
    }
}
 
function applyCard() {
    const card = currentPlayingCard;
    applyCardEffect(card);

    setTimeout(() => {
        // Check if the players are dead
        state.players.forEach(checkPlayerLost)
    
        if (isOnePlayerDead()) {
          endGame()
        } else {
          nextTurn()
        }
    }, 700)
}

function nextTurn(){
    state.turn++;
    state.currentPlayerIndex = state.currentOpponentId;
    state.activeOverlay = "player-turn";
}

function newTurn() {
    state.activeOverlay = null
    if (state.currentPlayer.skipTurn) {
      skipTurn()
    } else {
      startTurn()
    }
}

function skipTurn() {
    state.currentPlayer.skippedTurn = true
    state.currentPlayer.skipTurn = false
    nextTurn()
} 

function startTurn() {
    state.currentPlayer.skippedTurn = false
    if (state.turn > 2) {
      // Draw new card
      setTimeout(() => {
        state.currentPlayer.hand.push(drawCard())
        state.canPlay = true
      }, 800)
    } else {
      state.canPlay = true
    }
}
  

function endGame(){
    state.activeOverlay = 'game-over'
}

{/* <overlay-content-player-turn 
                v-if="activeOverlay === 'player-turn'"
                :player="currentPlayer" />
            <overlay-content-last-play
                v-if="activeOverlay === 'last-play'"
                :opponent="currentOpponent" />
            <overlay-content-game-over 
                v-if="activeOverlay === 'game-over'" /> */}