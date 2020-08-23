new Vue({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        curas: 3,
        espec: 5
    },
    computed: {
        hasResult () {
            return this.playerLife == 0 || this.monsterLife == 0
        }

    },
    methods: {
        iniciar () {
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.curas = 3
            this.espec = 5
        },

        desistir () {
            this.running = false
            this.playerLife = 100
            this.monsterLife = 100
        },

        atacar (especial) {
            if ((!especial) || ((especial) && (!this.espec == 0))) {
                this.monsterLife = Math.max(this.monsterLife - this.getRandom(5, especial ? 12 : 10), 0)
                this.atacarMonstro()
                if (especial) {
                    this.espec -= 1
                }
            }
        },

        atacarMonstro () {
            this.playerLife = Math.max(this.playerLife - this.getRandom(6, 11), 0)
        },

        curar () {
            const heart = this.playerLife + this.getRandom(7, 12)

            if (!this.curas == 0) {
                this.curas -= 1
                this.playerLife = Math.min(heart, 100);
                this.atacarMonstro()
            }
        },

        getRandom (min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
    },
    watch: {
        hasResult (value) {
            if (value) {
                this.running = false
            }
        }

    }


})