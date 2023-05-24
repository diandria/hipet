import { Router } from 'express'
import { makeCreatePostController, makeFindPostByIdController, makeListAllPostController, makeListPostByUserController, makeListPostByAnimalTypeController, makeGetPostShareUrlController, makeDeletePostController } from '../../factories'
import { adaptRoute } from '../../../../config/web/adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/post/create', adaptRoute(makeCreatePostController()))
  router.get('/post/find-by-id/:id', adaptRoute(makeFindPostByIdController()))
  router.get('/post/list-all', adaptRoute(makeListAllPostController()))
  router.get('/post/list-by-user/:customer_id', adaptRoute(makeListPostByUserController()))
  router.get('/post/list-by-animal', adaptRoute(makeListPostByAnimalTypeController()))
  router.get('/post/share-url/:id', adaptRoute(makeGetPostShareUrlController()))
  router.delete('/post/:id', adaptRoute(makeDeletePostController()))
}
