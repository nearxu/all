import admin from './admin'
import shop from './shop'
import article from './article'

export default app => {
  app.use('/admin', admin)
  app.use('/shop', shop)
  app.use('/article', article)
}
