module.exports = class UserService {
    constructor(db, bcrypt) {
        this.db = db
        this.bcrypt = bcrypt
    }

    signUp = async (firstName, lastName, username, password) => {
        const hashPassword = await this.bcrypt.hash(password, 10)
        await this.db.insertUser(firstName, lastName, username, hashPassword)
    }

    membershipSignUp = async (userid) => {
        await this.db.addMembership(userid)
    }

    addMessage = async (userid, message) => {
        await this.db.addMessage(userid, message)
    }

    becomeAdmin = async (userid) => {
        await this.db.addAdmin(userid)
    }
    deletePost = async (id) => {
        await this.db.deletePost(id)
    }
}
