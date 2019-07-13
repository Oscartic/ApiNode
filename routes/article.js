import routerx from 'express-promise-router'
import articleController from '../controllers/ArticleController'
import auth from '../middlewares/auth'

const router= routerx();

router.post('/add', auth.verifyStorekeeper, articleController.add)
router.get('/query', auth.verifyStorekeeper, articleController.query)
router.get('/list', auth.verifyStorekeeper, articleController.list)
router.put('/update', auth.verifyStorekeeper, articleController.update)
router.delete('/remove', auth.verifyStorekeeper, articleController.remove)
router.put('/activate', auth.verifyStorekeeper, articleController.activate)
router.put('/deactivate', auth.verifyStorekeeper, articleController.deactivate)

export default router;