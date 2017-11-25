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
    // 他她圈
const sof = resolve => {
    import ('@/components/sof/sof').then(module => {
        resolve(module)
    })
}
const sofcomment = resolve => {
    import ('@/components/sof/sofcomment').then(module => {
        resolve(module)
    })
}
const sofDetail = resolve => {
        import ('@/components/sof/sofDetail').then(module => {
            resolve(module)
        })
    }
    // end
const shopcart = resolve => {
        import ('@/components/shopcart/shopcart').then(module => {
            resolve(module)
        })
    }
    // 个人中心
const personalcenter = resolve => {
    import ('@/components/personalcenter/personalcenter').then(module => {
        resolve(module)
    })
}
const activities = resolve => {
    import ('@/components/personalcenter/activities').then(module => {
        resolve(module)
    })
}
const collection = resolve => {
    import ('@/components/personalcenter/collection').then(module => {
        resolve(module)
    })
}
const my_comment = resolve => {
    import ('@/components/personalcenter/comment').then(module => {
        resolve(module)
    })
}
const help = resolve => {
    import ('@/components/personalcenter/help').then(module => {
        resolve(module)
    })
}
const personalinfo = resolve => {
    import ('@/components/personalinfo/personalinfo').then(module => {
        resolve(module)
    })
}
const feedback = resolve => {
        import ("@/components/personalcenter/feedback").then(module => {
            resolve(module)
        })
    }
    // end
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
const fDetail = resolve => {
    import ('@/components/index/fashionDetail').then(module => {
        resolve(module)
    })
}
const order = resolve => {
    import ('@/components/order/ordercenter').then(module => {
        resolve(module)
    })
}
const orderdetail = resolve => {
    import ('@/components/order/detail').then(module => {
        resolve(module)
    })
}
const returnGoods = resolve => {
    import ('@/components/returnGoods/returnGoods').then(module => {
        resolve(module)
    })
}
const seller = resolve => {
    import ('@/components/seller/seller').then(module => {
        resolve(module)
    })
}
const sellerTypes = resolve => {
    import ('@/components/seller/sellerTypes').then(module => {
        resolve(module)
    })
}

const hyh = resolve => {
    import ('@/components/index/hyh').then(module => {
        resolve(module)
    })
}


Vue.use(Router)


export const router = new Router({
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
            path: '/sof/comment/:id',
            component: sofcomment
        }, {
            path: '/sof/detail/:id',
            component: sofDetail
        }, {
            path: '/shopcart',
            name: 'shopcart',
            component: shopcart
        },
        //个人中心 
        {
            path: '/personalcenter',
            name: 'personalcenter',
            component: personalcenter
        }, {
            path: '/personalcenter/activities',
            component: activities
        }, {
            path: '/personalcenter/collection',
            component: collection
        }, {
            path: '/personalcenter/my_comment',
            component: my_comment
        }, {
            path: '/personalcenter/help',
            component: help
        }, {
            path: '/personalcenter/feedback',
            component: feedback
        }, {
            path: '/personalcenter/personalinfo',
            name: 'personalinfo',
            component: personalinfo
        },
        // end
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
            path: '/good/:id',
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
        }, {
            path: '/fashion/:id',
            component: fDetail
        }, {
            path: '/order',
            name: 'order',
            component: order
        }, {
            path: '/order/:id',
            component: orderdetail
        },
        {
            path: '/returnGoods',
            component: returnGoods
        },
        {
            path: '/seller',
            component: seller
        },
        {
            path: '/seller/types',
            component: sellerTypes
        },
        {
            path: '/hyh',
            component: hyh
        }
    ]
})

router.beforeEach((to, from, next) => {
    next();
})