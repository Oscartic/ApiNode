import routerx from 'express-promise-router'
import purchaseController from '../controllers/PurchaseController'
import auth from '../middlewares/auth'

const router= routerx();

router.post('/add', auth.verifySeller, purchaseController.add)
router.get('/query', auth.verifySeller, purchaseController.query)
router.get('/list', auth.verifySeller, purchaseController.list)
router.put('/activate', auth.verifySeller, purchaseController.activate)
router.put('/deactivate', auth.verifySeller, purchaseController.deactivate)

export default router;