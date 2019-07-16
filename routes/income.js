import routerx from 'express-promise-router'
import incomeController from '../controllers/IncomeController'
import auth from '../middlewares/auth'

const router= routerx();

router.post('/add', auth.verifyStorekeeper, incomeController.add)
router.get('/query', auth.verifyStorekeeper, incomeController.query)
router.get('/list', auth.verifyStorekeeper, incomeController.list)
router.get('/graphic_last_months', auth.verifyUser, incomeController.graphicLastTwelveMonths)
router.put('/activate', auth.verifyStorekeeper, incomeController.activate)
router.put('/deactivate', auth.verifyStorekeeper, incomeController.deactivate)

export default router;