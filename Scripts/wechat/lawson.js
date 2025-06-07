let url = $request.url;
let body = $response.body;
let resp_data = JSON.parse(body);
try {
    // 处理弹窗和悬浮广告
    if (url.includes("/portal/app/globalLaunch/listAdvert?")) {
        console.log('去除弹窗、悬浮广告');
        if (resp_data?.data) {
            console.log('【已处理】去除弹窗、悬浮广告');
            resp_data.data = {};
        }
    }

    // 处理预购列表
    if (url.includes("/app/v1/home/getReservation/?")) {
        console.log('去除预购列表');
        if (resp_data?.data) {
            console.log('【已处理】去除预购列表');
            resp_data.data = {};
        }
    }

    // 处理推荐列表
    if (url.includes("/app/v1/home/getRecommendations/?")) {
        console.log('去除推荐列表');
        if (resp_data?.data) {
            console.log('【已处理】去除推荐列表');
            resp_data.data = {};
        }
    }

    // 处理首页banner推广
    if (url.includes("/app/v1/home/getConfigInfo/?")) {
        console.log('去除首页banner推广');
        if (resp_data?.data?.dysmorphismPictureList) {
            console.log('【已处理】去除首页banner推广');
            resp_data.data.dysmorphismPictureList = [];
        }
    }

    // 处理首页栏目
    if (url.includes("/app/v1/mina/systemSetting?")) {
        console.log('去除首页栏目');    
        if (resp_data?.data) {
            resp_data.data = resp_data.data.map(item => {
                if (item.type === 'HOMETAB') {
                    console.log('【已处理】去除首页栏目');
                    item.openFlg = false;
                    item.typeValue = {};
                }
                return item;
            });
        }
    }
} catch (e) {
    console.log('脚本运行出现错误，部分广告未去除⚠️');
    console.log('错误信息：' + e.message);
}

$done({ body: JSON.stringify(resp_data) });
