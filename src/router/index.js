import Vue from 'vue'
import Router from 'vue-router'
const index = (resolve) => {
    import ('@/components/index/index').then((module) => {
        resolve(module)
    })
}
const classify = resolve => {
    import ('@/components/classify/classify').then(module => {
        resolve(module)
    })
}
const sof = resolve => {
    import ('@/components/sof/sof').then(module => {
        resolve(module)
    })
}
const shopcart = resolve => {
    import ('@/components/shopcart/shopcart').then(module => {
        resolve(module)
    })
}
const personalcenter = resolve => {
    import ('@/components/personalcenter/personalcenter').then(module => {
        resolve(module)
    })
}
const coupon = resolve => {
    import ('@/components/Coupon/coupon').then(module => {
        resolve(module)
    })
}
const bargain = resolve => {
    import ('@/components/bargain/bargain').then(module => {
        resolve(module)
    })
}
const lover = resolve => {
    import ('@/components/lover/lover').then(module => {
        resolve(module)
    })
}
const sales = resolve => {
    import ('@/components/sales/sales').then(module => {
        resolve(module)
    })
}
const good_all = resolve => {
    import ('@/components/good_all/good_all').then(module => {
        resolve(module)
    })
}
const gooddetail = resolve => {
    import ('@/components/gooddetail/gooddetail').then(module => {
        resolve(module)
    })
}
const personalinfo = resolve => {
    import ('@/components/personalinfo/personalinfo').then(module => {
        resolve(module)
    })
}

const address = resolve => {
        import ('@/components/address/address').then(module => {
            resolve(module)
        })
    }
    // 寝室
const dorm = resolve => {
    import ('@/components/index/dorm').then(module => {
        resolve(module)
    })
}
const fashion = resolve => {
    import ('@/components/index/fashion').then(module => {
        resolve(module)
    })
}

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: index
        }, {
            path: '/classify',
            name: 'classify',
            component: classify
        }, {
            path: '/sof',
            name: 'sof',
            component: sof
        }, {
            path: '/shopcart',
            name: 'shopcart',
            component: shopcart
        }, {
            path: '/personalcenter',
            name: 'personalcenter',
            component: personalcenter
        }, {
            path: '/personalcenter/personalinfo',
            name: 'personalinfo',
            component: personalinfo
        },
        {
            path: '/coupon',
            name: 'coupon',
            component: coupon
        }, {
            path: '/bargain',
            name: 'bargain',
            component: bargain
        }, {
            path: '/lover',
            name: 'lover',
            component: lover
        }, {
            path: '/sales',
            name: 'sales',
            component: sales
        }, {
            path: '/good_all/:id',
            component: gooddetail
        }, {
            path: '/good_all',
            name: 'good_all',
            component: good_all,
        }, {
            path: '/address',
            component: address
        }, {
            path: '/dorm',
            component: dorm
        }, {
            path: '/fashion',
            component: fashion
        }
    ]
})