import routerx from 'express-promise-router'
import categoryController from '../controllers/CategoryController'
import auth from '../middlewares/auth'

const router= routerx();

router.post('/add', auth.verifyStorekeeper, categoryController.add)
router.get('/query', auth.verifyStorekeeper, categoryController.query)
router.get('/list', auth.verifyStorekeeper, categoryController.list)
router.put('/update', auth.verifyStorekeeper, categoryController.update)
router.delete('/remove', auth.verifyStorekeeper, categoryController.remove)
router.put('/activate', auth.verifyStorekeeper, categoryController.activate)
router.put('/deactivate', auth.verifyStorekeeper, categoryController.deactivate)

export default router;