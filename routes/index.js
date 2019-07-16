import routerx from 'express-promise-router'
import categoryRouter from './category'
import articleRouter from './article'
import userRouter from './user'
import personRouter from './person'
import incomeRouter from './income'
import purchaseRouter from './purchase'

const router= routerx();
router.use('/category', categoryRouter)
router.use('/article', articleRouter)
router.use('/user', userRouter)
router.use('/person', personRouter)
router.use('/income', incomeRouter)
router.use('/purchase', purchaseRouter)

export default router