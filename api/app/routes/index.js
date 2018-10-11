import admin from './admin'
import shop from './shop'

export default app => {
    app.use('/admin',admin)
    app.use('/shop',shop)
}