import { Router } from 'express'
import { makeCreateReportController, makeFindReportByIdController, makeDeleteReportController } from '../../factories'
import { adaptRoute } from '../../../../config/web/adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/report/create', adaptRoute(makeCreateReportController()))
  router.get('/report/find-by-id/:id', adaptRoute(makeFindReportByIdController()))
  router.delete('/report/:id', adaptRoute(makeDeleteReportController()))
}
