class Character {
    static MAX_HEALTH = 100;

    constructor(name) {
        this.name = name;
        this.health = Character.MAX_HEALTH;
        this.inventory = [];
    }

    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
    }
}

class Companion extends Character {
    constructor(name, type, belongings) {
        super(name);
        this.type = type;
        this.belongings = belongings;
    }
}

class Adventurer extends Character {
    static ROLES = ["Fighter", "Healer", "Wizard"];

    constructor(name, role) {
        super(name);
        if (!Adventurer.ROLES.includes(role)) {
            throw new Error(`Invalid role "${role}". Allowed roles are: ${Adventurer.ROLES.join(", ")}`);
        }
        this.role = role;
        this.inventory.push("bedroll", "50 gold coins");
    }

    scout() {
        console.log(`${this.name} is scouting ahead...`);
        super.roll();
    }

    duel(opponent) {
        console.log(`Duel between ${this.name} and ${opponent.name} begins!`);

        while (this.health > 50 && opponent.health > 50) {
            this.roll();
            opponent.roll();
            if (this.health > opponent.health) {
                opponent.health--;
            } else {
                this.health--;
            }
            console.log(`${this.name} health: ${this.health}, ${opponent.name} health: ${opponent.health}`);
        }

        const winner = this.health > 50 ? this.name : opponent.name;
        console.log(`${winner} wins the duel!`);
    }
}

class AdventurerFactory {
    constructor(role) {
        if (!Adventurer.ROLES.includes(role)) {
            throw new Error(`Invalid role "${role}". Allowed roles are: ${Adventurer.ROLES.join(", ")}`);
        }
        this.role = role;
        this.adventurers = [];
    }

    generate(name) {
        const newAdventurer = new Adventurer(name, this.role);
        this.adventurers.push(newAdventurer);
        return newAdventurer;
    }

    findByIndex(index) {
        return this.adventurers[index];
    }

    findByName(name) {
        return this.adventurers.find((adv) => adv.name === name);
    }
}

const healersFactory = new AdventurerFactory("Healer");
const lucy = healersFactory.generate("Lucy");
const mike = healersFactory.generate("Mike");

const john = new Adventurer("John", "Fighter");
const robin = new Adventurer("Robin", "Wizard");

john.scout();
robin.duel(john);

console.log(robin);
console.log(lucy);
