import app from 'firebase/app'
import 'firebase/auth'
// import 'firebase/firebase-firestore'
import 'firebase/firestore'

import firebaseConfig from './firebaseConfig.json'

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig)
    this.auth = app.auth()
    this.db = app.firestore()
    // if (process.env.NODE_ENV === 'development') {
    //   this.db.settings({ host: 'localhost:8080', ssl: false })
    // }
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut()
  }

  async register(name, email, password, role) {
    await this.auth.createUserWithEmailAndPassword(email, password)
    return this.auth.currentUser.updateProfile({
      displayName: name,
    })
  }
  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName
  }
  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve)
    })
  }
}
export default new Firebase()
