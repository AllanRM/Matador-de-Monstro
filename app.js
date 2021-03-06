new Vue({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        curas: 3,
        espec: 3,
        logs: [],
        nivel: 3 // 1-Facil, 2-médio, 3-Impossível
    },
    computed: {
        hasResult () {
            return this.playerLife == 0 || this.monsterLife == 0
        }

    },
    methods: {
        iniciar (nivel) {
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.curas = 3
            this.espec = 3
            this.logs = []
            this.nivel = nivel
            this.log(`Lutar no nível ${nivel}`, 'player')
        },

        desistir () {
            this.running = false
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
        },

        atacar (especial) {
            if ((!especial) || ((especial) && (!this.espec == 0))) {
                const forca = this.getRandom((this.nivel == 1 || this.nivel == 2 ? 5 : 4), especial ? 8 : 6)
                this.monsterLife = Math.max(this.monsterLife - forca, 0)
                if (this.monsterLife > 0) { // Se o monstro ja morreu nao me contra-ataca
                    this.atacarMonstro()
                }
                if (especial) {
                    this.espec -= 1
                }
                this.log(`Jogador atingiu o monstro com ${forca}`, 'player')
            }
        },

        atacarMonstro () {
            const forca = this.getRandom(4, (this.nivel == 1 ? 6 : 8))
            this.playerLife = Math.max(this.playerLife - forca, 0)
            this.log(`Monstro atingiu o jogador com ${forca}`, 'monster')
        },

        curar () {
            const rCura = this.getRandom(4, 8)
            const heart = this.playerLife + rCura

            if (!this.curas == 0) {
                this.curas -= 1
                this.playerLife = Math.min(heart, 100);
                this.atacarMonstro()
                this.log(`Jogador foi curado com força ${rCura}`, "player")
            }
        },

        getRandom (min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },

        log (text, cls) {
            this.logs.unshift({ text, cls })
        }
    },
    watch: {
        hasResult (value) {
            if (value) {
                this.running = false
            }
        }

    }


})